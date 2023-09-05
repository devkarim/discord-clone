import express from 'express';

import requireAuth from '@/middlewares/auth/requireAuth';
import serverValidator from '@/validators/server.validator';
import serverController from '@/controllers/server.controller';

const serverRouter = express.Router();

// @route     POST /servers/create
// @desc      Create a new server
// @access    Private
serverRouter.post(
  '/create',
  requireAuth,
  serverValidator.create,
  serverController.create
);

// @route     GET /servers
// @desc      Create a new server
// @access    Private
serverRouter.get('/', requireAuth, serverController.getServers);

export default serverRouter;
