import 'dotenv/config';
import 'reflect-metadata';
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core';
import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import http from 'http';
import { buildSchema } from 'type-graphql';
import { MikroORM } from '@mikro-orm/core';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';
import mikroConfig from './mikro-orm.config';
import { MyContext } from './types';
import { AssetResolver } from './resolvers/asset';
import corsConfig from './utils/cors.config';
import { __prod__ } from './constants';
import sessConfig from './utils/session.config';
import { UserResolver } from './resolvers/user';
import { authPermission } from './utils/permissions';

const main = async () => {
  const orm = await MikroORM.init<PostgreSqlDriver>(mikroConfig);
  // const generator = orm.getSchemaGenerator();
  // await generator.dropSchema();
  // await generator.createSchema();
  // await generator.updateSchema({ wrap: false });

  const app = express();

  if (!__prod__) {
    app.set('trust proxy', 1);
  }
  app.use(corsConfig);
  app.use(sessConfig);

  const httpServer = http.createServer(app);

  const server = new ApolloServer({
    schema: await buildSchema({
      resolvers: [UserResolver, AssetResolver],
    }),
    context: ({ req, res }): MyContext => {
      authPermission({
        isUser: !!req.session.userId,
        operationName: req.body.operationName,
      });

      return { em: orm.em.fork(), req, res };
    },
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  await server.start();

  server.applyMiddleware({
    app,
    path: '/',
    cors: false,
  });

  httpServer.listen({ port: 4000 });
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
};

main().catch((e) => {
  console.error(e);
});
