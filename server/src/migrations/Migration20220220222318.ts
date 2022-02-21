import { Migration } from '@mikro-orm/migrations';

export class Migration20220220222318 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "asset" ("id" serial primary key, "name" varchar(255) not null, "amount" int not null, "currency" varchar(255) not null, "percent" int not null, "increase_interval" int not null, "created_at" timestamptz(0) null, "updated_at" timestamptz(0) null);');
  }

}
