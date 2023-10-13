import { Errors } from 'models';

import { getUserById } from '../services/user.js';
import ServerResponse from '../models/response.js';
import { MESSAGES_BATCH } from '../services/message.js';
import conversationValidator from '../validators/conversation.validator.js';
import {
  getConversationById,
  getConversationByPairOfUsers,
  getMessagesByConversationId,
} from '../services/conversation.js';

const getConversationByPair: typeof conversationValidator.checkId = async (
  req,
  res
) => {
  if (!req.user) throw Errors.unauthenticated;
  const userId = +req.params.id;
  if (!userId || isNaN(userId)) throw Errors.user.invalidId;
  if (req.user.id === userId) throw Errors.conversation.notFound;
  const user = await getUserById(userId);
  if (!user) throw Errors.user.invalidId;
  const conversation = await getConversationByPairOfUsers(req.user.id, userId);
  return ServerResponse.success(res, conversation);
};

const getConversationMessages: typeof conversationValidator.getConversationMessages =
  async (req, res) => {
    if (!req.user) throw Errors.unauthenticated;
    const conversationId = +req.params.id;
    if (!conversationId || isNaN(conversationId))
      throw Errors.conversation.invalidId;
    const cursor = +(req.query.cursor ?? -1);
    if (!cursor || isNaN(cursor)) throw Errors.invalidCursor;
    const conversation = await getConversationById(conversationId);
    if (!conversation) throw Errors.conversation.invalidId;
    const messages = await getMessagesByConversationId(
      conversationId,
      cursor == -1 ? undefined : cursor
    );
    return ServerResponse.success(res, {
      messages,
      cursor:
        messages.length === MESSAGES_BATCH
          ? messages[MESSAGES_BATCH - 1].id
          : undefined,
    });
  };

export default { getConversationByPair, getConversationMessages };
