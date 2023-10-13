import express from 'express';

import requireAuth from '../middlewares/auth/requireAuth.js';
import conversationValidator from '../validators/conversation.validator.js';
import conversationController from '../controllers/conversation.controller.js';

const conversationRouter = express.Router();

// @route     GET /conversations/me/:id
// @desc      Fetch conversation by a pair of users
// @access    Private
conversationRouter.get(
  '/me/:id',
  requireAuth,
  conversationValidator.checkId,
  conversationController.getConversationByPair
);

// @route     GET /conversations/:id/messages
// @desc      Fetch conversation messages by a pair of users
// @access    Private
conversationRouter.get(
  '/:id/messages',
  requireAuth,
  conversationValidator.getConversationMessages,
  conversationController.getConversationMessages
);

export default conversationRouter;
