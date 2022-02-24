import { Asset } from '../entities/Asset';
import { MyContext } from 'src/types';
import {
  Arg,
  Ctx,
  Field,
  Float,
  InputType,
  Mutation,
  Query,
  Resolver,
} from 'type-graphql';
import { IsIn, IsOptional, IsPositive, Length } from 'class-validator';
import { CURRENCIES } from '../constants';
import { UserInputError } from 'apollo-server-express';

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

  @Field({ description: 'Asset increase interval', nullable: true })
  @IsOptional()
  increaseInterval?: number;
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

  @Query(() => [Asset], { nullable: true, description: 'Get all assets' })
  assets(@Ctx() { em }: MyContext): Promise<Asset[]> {
    return em.find(Asset, {});
  }

  @Mutation(() => Asset, { description: 'Create asset' })
  async createAsset(
    @Arg('input', { validate: true }) input: AssetInput,
    @Ctx() { em }: MyContext
  ): Promise<Asset | void> {
    if (
      (input.increaseInterval && !input.percent) ||
      (!input.increaseInterval && input.percent)
    )
      throw new UserInputError(
        'Percent and increaseInterval should be specified together',
        {
          argumentName: `${
            input.increaseInterval ? 'percent' : 'increaseInterval'
          }`,
        }
      );

    const asset = em.create(Asset, input);
    console.log(asset);

    await em.persistAndFlush(asset);
    return asset;
  }
}
