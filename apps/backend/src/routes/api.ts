import express from 'express';

import authRouter from './auth.routes';

const apiRouter = express.Router();

apiRouter.get('/', (req, res) => {
  res.send('Hello from API');
});

apiRouter.use('/auth', authRouter);

export default apiRouter;
