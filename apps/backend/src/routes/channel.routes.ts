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

export default channelRouter;
