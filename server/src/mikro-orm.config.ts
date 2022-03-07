import { Options } from '@mikro-orm/core';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';
import path from 'path';
import { __prod__ } from './constants';
import { Asset } from './entities/Asset';

const mikroConfig: Options<PostgreSqlDriver> = {
  entities: [Asset],
  dbName: 'postgres',
  type: 'postgresql',
  host: process.env.GCP_SQL_HOST,
  user: process.env.GCP_SQL_USER,
  password: process.env.GCP_SQL_USER_PASS,
  debug: !__prod__,
  migrations: {
    glob: '^[w-]+d+.[tj]s$',
    path: path.join(__dirname, './migrations'),
    pathTs: path.join(__dirname, './migrations'),
  },
};

export default mikroConfig;
