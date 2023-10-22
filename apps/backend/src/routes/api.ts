import express from 'express';

import authRouter from './auth.routes.js';
import userRouter from './user.routes.js';
import serverRouter from './server.routes.js';
import inviteRouter from './invite.routes.js';
import channelRouter from './channel.routes.js';
import categoryRouter from './category.routes.js';
import messageRouter from './message.routes.js';
import directRouter from './direct-messages.routes.js';
import conversationRouter from './conversation.routes.js';

const apiRouter = express.Router();

apiRouter.get('/', (req, res) => {
  res.send('Hello from API');
});

apiRouter.use('/auth', authRouter);
apiRouter.use('/user', userRouter);
apiRouter.use('/servers', serverRouter);
apiRouter.use('/invites', inviteRouter);
apiRouter.use('/channels', channelRouter);
apiRouter.use('/categories', categoryRouter);
apiRouter.use('/messages', messageRouter);
apiRouter.use('/direct', directRouter);
apiRouter.use('/conversations', conversationRouter);

export default apiRouter;
