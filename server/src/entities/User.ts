import {
  Collection,
  Entity,
  OneToMany,
  PrimaryKey,
  Property,
  Unique,
} from '@mikro-orm/core';
import { Field, ID, ObjectType } from 'type-graphql';
import { Asset } from './Asset';

@ObjectType({ description: 'User model' })
@Entity()
export class User {
  @Field(() => ID, { description: 'The id of the User' })
  @PrimaryKey()
  id!: number;

  @Field(() => String, {
    nullable: true,
    description: 'The google id of the User',
  })
  @Property()
  @Unique()
  googleId?: string;

  @Field(() => String, { description: 'The first name of the user' })
  @Property()
  firstName!: string;

  @Field(() => [Asset], { description: 'Assets of the user', nullable: true })
  @OneToMany(() => Asset, (asset) => asset.user, { nullable: true })
  assets? = new Collection<Asset>(this);

  @Field(() => String, { description: 'The last name of the user' })
  @Property()
  lastName!: string;

  @Field(() => String, { description: 'The email of the user' })
  @Property()
  @Unique()
  email!: string;

  @Field(() => String, {
    description: 'Last update date of user related entities',
    nullable: true,
  })
  @Property({ type: 'Date', nullable: true })
  lastEntityUpdateDate?: Date;
}
