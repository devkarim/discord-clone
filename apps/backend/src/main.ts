import 'dotenv/config';
import './services/passport.js';

import cors from 'cors';
import express from 'express';
import passport from 'passport';
import session from 'express-session';

import { env } from './config/env.js';
import redisStore from './lib/redis.js';
import apiRouter from './routes/api.js';
import errorLogger from './middlewares/error/error-logger.js';
import errorSender from './middlewares/error/error-sender.js';
import errorHandler from './middlewares/error/error-handler.js';
import {
  APP_DOMAIN,
  API_URL,
  APP_URL,
  isProduction,
} from './config/constants.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ credentials: true, origin: APP_URL }));
if (isProduction) app.set('trust proxy', 1);
app.use(
  session({
    name: 'discord_session',
    cookie: {
      maxAge: 7 * 24 * 60 * 60 * 1000, // ms
      secure: isProduction,
      domain: isProduction ? '.karimwael.com' : 'localhost',
    },
    secret: env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: redisStore,
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use('/', apiRouter);

// Error handlers
app.use(errorHandler);
app.use(errorLogger);
app.use(errorSender);

// Listen
app.listen(env.PORT, () => {
  console.log(`Listening on ${API_URL}...`);
});
