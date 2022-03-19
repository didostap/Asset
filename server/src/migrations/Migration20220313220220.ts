import { Migration } from '@mikro-orm/migrations';

export class Migration20220313220220 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "asset" ("id" serial primary key, "name" varchar(255) not null, "amount" int not null, "currency" varchar(255) not null, "percent" int null, "increase" varchar(255) null, "interval" int null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null);');

    this.addSql('create table "user" ("id" serial primary key, "google_id" varchar(255) not null, "first_name" varchar(255) not null, "last_name" varchar(255) not null, "email" varchar(255) not null);');
    this.addSql('alter table "user" add constraint "user_google_id_unique" unique ("google_id");');
    this.addSql('alter table "user" add constraint "user_email_unique" unique ("email");');
  }

}
