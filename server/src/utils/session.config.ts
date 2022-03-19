import connectRedis from 'connect-redis';
import {
  Request,
  ParamsDictionary,
  Response,
  NextFunction,
} from 'express-serve-static-core';
import session from 'express-session';
import Redis from 'ioredis';
import { ParsedQs } from 'qs';
import {
  APOLLO_STUDIO,
  CLIENT_DEV_HOST,
  COOKIE_NAME,
  ONE_WEEK,
  __prod__,
} from '../constants';

type TRequest = Request<
  ParamsDictionary,
  any,
  any,
  ParsedQs,
  Record<string, any>
>;

const gethttpOnly = (req: TRequest) => {
  if (!__prod__ && req.headers.origin === CLIENT_DEV_HOST) return false;

  return true;
};

const getSecure = (req: TRequest) => {
  if (!__prod__) {
    if (req.headers.origin === APOLLO_STUDIO) return true;
    if (req.headers.origin === CLIENT_DEV_HOST) return false;
  }

  return true;
};

const getSameSite = (req: TRequest) => {
  if (!__prod__) {
    if (req.headers.origin === APOLLO_STUDIO) return 'none';
    if (req.headers.origin === CLIENT_DEV_HOST) return 'lax';
  }

  return 'lax';
};

const sessConfig = (
  req: TRequest,
  res: Response<any, Record<string, any>, number>,
  next: NextFunction
) => {
  const redis = new Redis();
  const RedisStore = connectRedis(session);

  const sees = session({
    name: COOKIE_NAME,
    store: new RedisStore({ client: redis, disableTouch: true }),
    saveUninitialized: false,
    secret: process.env.SESSION_SECRET as string,
    resave: false,
    cookie: {
      maxAge: ONE_WEEK,
      secure: getSecure(req),
      httpOnly: gethttpOnly(req),
      sameSite: getSameSite(req),
    },
  });

  sees(req, res, next);
};

export default sessConfig;
