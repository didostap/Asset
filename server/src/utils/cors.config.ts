import cors from 'cors';
import { APOLLO_STUDIO, CLIENT_DEV_HOST, __prod__ } from '../constants';

const corsConfig = cors({
  origin: (_, callback) => {
    if (!__prod__) {
      callback(null, [APOLLO_STUDIO, CLIENT_DEV_HOST]);
    }
  },
  credentials: true,
});

export default corsConfig;
