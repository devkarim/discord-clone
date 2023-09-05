import express from 'express';

import authRouter from './auth.routes';
import serverRouter from './server.routes';

const apiRouter = express.Router();

apiRouter.get('/', (req, res) => {
  res.send('Hello from API');
});

apiRouter.use('/auth', authRouter);

apiRouter.use('/servers', serverRouter);

export default apiRouter;
