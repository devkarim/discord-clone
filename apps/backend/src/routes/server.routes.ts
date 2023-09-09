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

// @route     GET /servers/:id/member
// @desc      Get member details of current user in a server
// @access    Private
serverRouter.get(
  '/:id/member',
  requireAuth,
  serverValidator.checkId,
  serverController.getCurrentMember
);

// @route     DELETE /servers/:id/leave
// @desc      Leave a server
// @access    Private
serverRouter.delete(
  '/:id/leave',
  requireAuth,
  serverValidator.checkId,
  serverController.leave
);

// @route     POST /servers/:id/channel
// @desc      Create a channel in a server
// @access    Private
serverRouter.post(
  '/:id/channel',
  requireAuth,
  serverValidator.createChannel,
  serverController.createChannel
);

// @route     POST /servers/:id/category
// @desc      Create a category in a server
// @access    Private
serverRouter.post(
  '/:id/category',
  requireAuth,
  serverValidator.createCategory,
  serverController.createCategory
);

// @route     DELETE /servers/:id
// @desc      Delete server
// @access    Private
serverRouter.delete(
  '/:id',
  requireAuth,
  serverValidator.checkId,
  serverController.deleteServer
);

export default serverRouter;
