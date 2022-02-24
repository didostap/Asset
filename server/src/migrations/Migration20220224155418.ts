import { Migration } from '@mikro-orm/migrations';

export class Migration20220224155418 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'create table "asset" ("id" serial primary key, "name" varchar(255) not null, "amount" int not null, "currency" varchar(255) not null, "percent" int null, "increase_interval" int null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null);'
    );
  }
}
