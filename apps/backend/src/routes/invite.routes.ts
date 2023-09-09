import express from 'express';

import requireAuth from '../middlewares/auth/requireAuth.js';
import inviteValidator from '../validators/invite.validator.js';
import inviteController from '../controllers/invite.controller.js';

const inviteRouter = express.Router();

// @route     GET /invites/:id
// @desc      Get server by invite code
// @access    Private
inviteRouter.get(
  '/:id',
  requireAuth,
  inviteValidator.checkId,
  inviteController.getServerByInviteCode
);

// @route     POST /invites/join/:id
// @desc      Join a server by an invite code
// @access    Private
inviteRouter.post(
  '/join/:id',
  requireAuth,
  inviteValidator.checkId,
  inviteController.joinServer
);

export default inviteRouter;
