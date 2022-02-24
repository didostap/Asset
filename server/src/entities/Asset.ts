import { Entity, PrimaryKey, Property } from '@mikro-orm/core';
import { Field, ID, ObjectType } from 'type-graphql';

@ObjectType({ description: 'Asset model' })
@Entity()
export class Asset {
  @Field(() => ID, { description: 'The id of the asset' })
  @PrimaryKey()
  id!: number;

  @Field(() => String, { description: 'The name of the asset' })
  @Property()
  name!: string;

  @Field(() => Number, { description: 'The amount of the asset' })
  @Property()
  amount!: number;

  @Field(() => String, { description: 'The currency of the asset' })
  @Property()
  currency!: string;

  @Field(() => Number, {
    description: 'The percent of the asset',
    nullable: true,
  })
  @Property({ nullable: true })
  percent?: number;

  @Field(() => Number, {
    description: 'The increase interval of the asset',
    nullable: true,
  })
  @Property({ nullable: true })
  increaseInterval?: number;

  @Field(() => String, { description: 'The asset created date' })
  @Property({ type: 'date' })
  createdAt? = new Date();

  @Field(() => String, { description: 'The asset updated date' })
  @Property({ type: 'date', onUpdate: () => new Date() })
  updatedAt? = new Date();
}
