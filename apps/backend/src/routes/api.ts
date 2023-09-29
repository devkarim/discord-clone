import express from 'express';

import authRouter from './auth.routes.js';
import serverRouter from './server.routes.js';
import inviteRouter from './invite.routes.js';
import channelRouter from './channel.routes.js';
import categoryRouter from './category.routes.js';
import messageRouter from './message.routes.js';

const apiRouter = express.Router();

apiRouter.get('/', (req, res) => {
  res.send('Hello from API');
});

apiRouter.use('/auth', authRouter);
apiRouter.use('/servers', serverRouter);
apiRouter.use('/invites', inviteRouter);
apiRouter.use('/channels', channelRouter);
apiRouter.use('/categories', categoryRouter);
apiRouter.use('/messages', messageRouter);

export default apiRouter;
