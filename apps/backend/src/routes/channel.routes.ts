import express from 'express';

import requireAuth from '../middlewares/auth/requireAuth.js';
import channelValidator from '../validators/channel.validator.js';
import channelController from '../controllers/channel.controller.js';

const channelRouter = express.Router();

// @route     GET /channels/:id
// @desc      Get specific channel data by ID
// @access    Private
channelRouter.get(
  '/:id',
  requireAuth,
  channelValidator.checkId,
  channelController.getChannel
);

// @route     GET /channels/:id/messages
// @desc      Get channel's messages
// @access    Private
channelRouter.get(
  '/:id/messages',
  requireAuth,
  channelValidator.getMessages,
  channelController.getMessages
);

export default channelRouter;
