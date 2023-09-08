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

// @route     GET /servers/:id
// @desc      Get a specific server details
// @access    Private
serverRouter.get(
  '/:id',
  requireAuth,
  serverValidator.checkId,
  serverController.getServer
);

// @route     PATCH /servers/:id/invite
// @desc      Generate a new invite code for a server
// @access    Private
serverRouter.patch(
  '/:id/invite',
  requireAuth,
  serverValidator.checkId,
  serverController.generateInviteCode
);

// @route     GET /servers/invite/:id
// @desc      Get server by invite code
// @access    Private
serverRouter.get(
  '/invite/:id',
  requireAuth,
  serverValidator.checkId,
  serverController.getServerByInviteCode
);

// @route     POST /servers/join/:id
// @desc      Join a server by an invite code
// @access    Private
serverRouter.post(
  '/join/:id',
  requireAuth,
  serverValidator.checkId,
  serverController.joinServer
);

export default serverRouter;
