import express from 'express';

import authRouter from './auth.routes.js';
import serverRouter from './server.routes.js';
import inviteRouter from './invite.routes.js';

const apiRouter = express.Router();

apiRouter.get('/', (req, res) => {
  res.send('Hello from API');
});

apiRouter.use('/auth', authRouter);

apiRouter.use('/servers', serverRouter);

apiRouter.use('/invites', inviteRouter);

export default apiRouter;
