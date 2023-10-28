import expressSession from 'express-session';

import { env } from '../config/env.js';
import { COOKIE_NAME, isProduction } from '../config/constants.js';

import redisStore from './redis.js';

const session = expressSession({
  name: COOKIE_NAME,
  cookie: {
    maxAge: 7 * 24 * 60 * 60 * 1000, // ms
    secure: isProduction,
    domain: isProduction ? '.karimwael.com' : 'localhost',
  },
  secret: env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: redisStore,
});

export default session;
