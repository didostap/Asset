import { Entity, Enum, ManyToOne, PrimaryKey, Property } from '@mikro-orm/core';
import { Field, ID, ObjectType, registerEnumType } from 'type-graphql';
import { User } from './User';

export enum Currencies {
  UAH = 'UAH',
  USD = 'USD',
  EUR = 'EUR',
}

export enum Increases {
  NONE = '',
  DAILY = 'daily',
  WEEKLY = 'weekly',
  MONTHLY = 'monthly',
  YEARLY = 'yearly',
}

registerEnumType(Currencies, {
  name: 'Currencies',
  description: 'Possible asset currencies',
});

registerEnumType(Increases, {
  name: 'Increases',
  description: 'Possible asset increases',
});

@ObjectType({ description: 'Asset model' })
@Entity()
export class Asset {
  @Field(() => ID, { description: 'The id of the asset' })
  @PrimaryKey()
  id!: number;

  @Field(() => User, {
    description: 'The owner user of the asset',
    nullable: true,
  })
  @ManyToOne()
  user!: User;

  @Field(() => String, { description: 'The name of the asset' })
  @Property()
  name!: string;

  @Field(() => Number, { description: 'The amount of the asset' })
  @Property()
  amount!: number;

  // @ts-ignore: Unreachable code error
  @Field((type) => Currencies, { description: 'The currency of the asset' })
  @Enum(() => Currencies)
  currency!: Currencies;

  @Field(() => Number, {
    description: 'The percent of the asset',
    nullable: true,
  })
  @Property({ nullable: true })
  percent?: number;

  // @ts-ignore: Unreachable code error
  @Field((type) => Increases, {
    description: 'The type of increase interval of the asset',
    nullable: true,
  })
  @Enum(() => Increases)
  increase?: Increases;

  @Field(() => Number, {
    description: 'The increase interval of the asset',
    nullable: true,
  })
  @Property({ nullable: true })
  interval?: number;

  @Field(() => String, { description: 'Next update date', nullable: true })
  @Property({ type: 'date', nullable: true })
  nextIncreaseDate?: Date;

  @Field(() => String, { description: 'The asset created date' })
  @Property({ type: 'date' })
  createdAt? = new Date();

  @Field(() => String, { description: 'The asset updated date' })
  @Property({ type: 'date', onUpdate: () => new Date() })
  updatedAt? = new Date();
}
