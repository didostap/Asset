import { Entity, ManyToOne, PrimaryKey, Property } from '@mikro-orm/core';
import { Field, ID, ObjectType } from 'type-graphql';
import { User } from './User';

@ObjectType({ description: 'Asset model' })
@Entity()
export class Asset {
  @Field(() => ID, { description: 'The id of the asset' })
  @PrimaryKey()
  id!: number;

  @Field(() => User, { description: 'The owner user of the asset' })
  @ManyToOne()
  user!: User;

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

  @Field(() => String, {
    description: 'The type of increase interval of the asset',
    nullable: true,
  })
  @Property({ nullable: true })
  increase?: string;

  @Field(() => Number, {
    description: 'The increase interval of the asset',
    nullable: true,
  })
  @Property({ nullable: true })
  interval?: number;

  @Field(() => String, { description: 'The asset created date' })
  @Property({ type: 'date' })
  createdAt? = new Date();

  @Field(() => String, { description: 'The asset updated date' })
  @Property({ type: 'date', onUpdate: () => new Date() })
  updatedAt? = new Date();
}
