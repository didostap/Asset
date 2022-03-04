import { Asset } from '../entities/Asset';
import { MyContext } from 'src/types';
import {
  Arg,
  Ctx,
  Field,
  Float,
  InputType,
  Mutation,
  ObjectType,
  Query,
  Resolver,
} from 'type-graphql';
import { IsIn, IsOptional, IsPositive, Length, Min } from 'class-validator';
import { CURRENCIES, INCREASES } from '../constants';
import { UserInputError } from 'apollo-server-express';
import { QueryOrder } from '@mikro-orm/core';

@InputType()
class AssetInput {
  @Field({ description: 'Asset name' })
  @Length(3, 30)
  name!: string;

  @Field({ description: 'Asset amount' })
  @IsPositive()
  amount!: number;

  @Field({ description: 'Asset currency' })
  @IsIn(CURRENCIES)
  currency!: string;

  @Field({ description: 'Asset percent', nullable: true })
  @IsOptional()
  @IsPositive()
  percent?: number;

  @Field({ description: 'Type of asset increase interval', nullable: true })
  @IsOptional()
  @IsIn(INCREASES)
  increase?: string;

  @Field({ description: 'Asset increase interval', nullable: true })
  @IsOptional()
  @IsPositive()
  interval?: number;
}

@InputType()
class CreateAssetInput {
  @Field({ description: 'Assets limit' })
  @Min(1)
  limit!: number;

  @Field({ description: 'Assets offset' })
  @Min(0)
  offset!: number;
}

@ObjectType()
class PaginatedAssets {
  @Field(() => [Asset])
  assets!: Asset[];

  @Field()
  hasNextPage!: boolean;
}

@Resolver()
export class AssetResolver {
  @Query(() => Asset, { nullable: true, description: 'Get asset by id' })
  asset(
    @Arg('id', () => Float) id: number,
    @Ctx() { em }: MyContext
  ): Promise<Asset | null> {
    return em.findOne(Asset, id);
  }

  @Query(() => PaginatedAssets, {
    nullable: true,
    description: 'Get all assets',
  })
  async assets(
    @Arg('input') input: CreateAssetInput,
    @Ctx() { em }: MyContext
  ): Promise<PaginatedAssets> {
    const assets = await em.find(
      Asset,
      {},
      {
        limit: input.limit,
        offset: input.offset,
        orderBy: { createdAt: QueryOrder.DESC },
      }
    );

    const hasNextPage = assets.length === input.limit;
    return { assets, hasNextPage };
  }

  @Mutation(() => Asset, { description: 'Create asset' })
  async createAsset(
    @Arg('input', { validate: true }) input: AssetInput,
    @Ctx() { em }: MyContext
  ): Promise<Asset | void> {
    if (
      (input.increase && !input.interval && !input.percent) ||
      (!input.increase && input.interval && !input.percent) ||
      (!input.increase && !input.interval && input.percent)
    )
      throw new UserInputError(
        'Percent and increaseInterval should be specified together',
        {
          argumentName: `${
            input.increase && input.interval
              ? 'percent'
              : input.increase && input.percent
              ? 'interval'
              : 'increase'
          }`,
        }
      );

    const asset = em.create(Asset, input);
    await em.persistAndFlush(asset);
    return asset;
  }
}
