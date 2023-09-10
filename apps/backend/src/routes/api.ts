import express from 'express';

import authRouter from './auth.routes.js';
import serverRouter from './server.routes.js';
import inviteRouter from './invite.routes.js';
import channelRouter from './channel.routes.js';

const apiRouter = express.Router();

apiRouter.get('/', (req, res) => {
  res.send('Hello from API');
});

apiRouter.use('/auth', authRouter);

apiRouter.use('/servers', serverRouter);

apiRouter.use('/invites', inviteRouter);

apiRouter.use('/channels', channelRouter);

export default apiRouter;
