import express from 'express';

import requireAuth from '../middlewares/auth/requireAuth.js';
import serverValidator from '../validators/server.validator.js';
import serverController from '../controllers/server.controller.js';

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
