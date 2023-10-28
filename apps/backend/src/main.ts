import 'dotenv/config';
import './services/passport.js';

import http from 'http';
import cors from 'cors';
import express from 'express';
import passport from 'passport';

import prisma from './lib/prisma.js';
import { env } from './config/env.js';
import session from './lib/session.js';
import apiRouter from './routes/api.js';
import AppSocket from './models/socket.js';
import errorLogger from './middlewares/error/error-logger.js';
import errorSender from './middlewares/error/error-sender.js';
import errorHandler from './middlewares/error/error-handler.js';
import { API_URL, APP_URL, isProduction } from './config/constants.js';

const app = express();
const server = http.createServer(app);

// Create socket server
AppSocket.create(server);

/* Middlewares for REST API */

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ credentials: true, origin: APP_URL }));
if (isProduction) app.set('trust proxy', 1);
app.use(session);
app.use(passport.initialize());
app.use(passport.session());

app.use('/', apiRouter);

// Error handlers
app.use(errorHandler);
app.use(errorLogger);
app.use(errorSender);

const updateOfflineUsers = () =>
  prisma.user.updateMany({
    where: {
      status: {
        not: 'OFFLINE',
      },
    },
    data: { status: 'OFFLINE' },
  });

const main = async () => {
  // Update all users status to be OFFLINE
  await updateOfflineUsers();
  // Start server
  server.listen(env.PORT, () => {
    console.log(`Listening on ${API_URL}...`);
  });
};

main().catch((err) => console.error(err));
