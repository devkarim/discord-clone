import express from 'express';

import requireAuth from '../middlewares/auth/requireAuth.js';
import messageValidator from '../validators/message.validator.js';
import messageController from '../controllers/message.controller.js';

const messageRouter = express.Router();

// @route     PATCH /messages/:id
// @desc      Update message's content
// @access    Private
messageRouter.patch(
  '/:id',
  requireAuth,
  messageValidator.updateMessage,
  messageController.updateMessage
);

// @route     DELETE /messages/:id
// @desc      Delete message
// @access    Private
messageRouter.delete(
  '/:id',
  requireAuth,
  messageValidator.checkId,
  messageController.deleteMessage
);

export default messageRouter;
