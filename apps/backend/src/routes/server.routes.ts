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

// @route     GET /servers/:id/roles
// @desc      Get roles with members info
// @access    Private
serverRouter.get(
  '/:id/roles',
  requireAuth,
  serverValidator.checkId,
  serverController.getRoles
);

// @route     GET /servers/:id/members
// @desc      Get members with roles and user info
// @access    Private
serverRouter.get(
  '/:id/members',
  requireAuth,
  serverValidator.checkId,
  serverController.getMembers
);

// @route     PATCH /servers/:id/members/:memberId/role
// @desc      Change member's role
// @access    Private
serverRouter.patch(
  '/:id/members/:memberId/role',
  requireAuth,
  serverValidator.changeMemberRole,
  serverController.changeMemberRole
);

// @route     DELETE /servers/:id/members/:memberId
// @desc      Kick member from server
// @access    Private
serverRouter.delete(
  '/:id/members/:memberId',
  requireAuth,
  serverValidator.checkMemberId,
  serverController.kickMember
);

// @route     DELETE /servers/:id/members/:memberId/ban
// @desc      Ban member from server
// @access    Private
serverRouter.delete(
  '/:id/members/:memberId/ban',
  requireAuth,
  serverValidator.checkMemberId,
  serverController.banMember
);

// @route     PATCH /servers/:id
// @desc      Update server
// @access    Private
serverRouter.patch(
  '/:id',
  requireAuth,
  serverValidator.updateServer,
  serverController.editServer
);

// @route     POST /servers/:id/roles
// @desc      Add new role to server
// @access    Private
serverRouter.post(
  '/:id/roles',
  requireAuth,
  serverValidator.addRole,
  serverController.addRole
);

// @route     DELETE /servers/:id/roles/:roleId
// @desc      Delete role from server
// @access    Private
serverRouter.delete(
  '/:id/roles/:roleId',
  requireAuth,
  serverValidator.deleteRole,
  serverController.deleteRole
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
