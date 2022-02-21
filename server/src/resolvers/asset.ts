import { Asset } from '../entities/Asset';
import { MyContext } from 'src/types';
import { Arg, Ctx, Float, Mutation, Query, Resolver } from 'type-graphql';

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
    @Arg('name') name: string,
    @Arg('amount') amount: number,
    @Arg('currency') currency: string,
    @Arg('percent') percent: number,
    @Arg('increaseInterval') increaseInterval: number,
    @Ctx() { em }: MyContext
  ): Promise<Asset> {
    const asset = em.create(Asset, {
      name,
      amount,
      currency,
      percent,
      increaseInterval,
    });
    await em.persistAndFlush(asset);
    return asset;
  }
}
