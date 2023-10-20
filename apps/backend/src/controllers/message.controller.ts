import { Errors } from 'models';

import ServerResponse from '../models/response.js';
import { canMemberDoAction } from '../services/member.js';
import messageValidator from '../validators/message.validator.js';
import {
  deleteMessageById,
  editMessage,
  getMessageById,
} from '../services/message.js';
import SocketHandler from '../models/socket-handler.js';
import { CHAT_UPDATE_KEY } from '../config/constants.js';

const updateMessage: typeof messageValidator.updateMessage = async (
  req,
  res
) => {
  if (!req.user) throw Errors.unauthenticated;
  const messageId = req.params.id;
  const message = await getMessageById(messageId);
  if (!message) throw Errors.message.invalidId;
  const isAuthor = message.author.user.id === req.user.id;
  const canDoAction = await canMemberDoAction(
    req.user.id,
    message.channel.serverId,
    'EDIT_MESSAGES'
  );
  const hasAccess = isAuthor || canDoAction;
  if (!hasAccess) throw Errors.unauthorized;
  const newMessage = await editMessage(messageId, req.body);
  SocketHandler.emitAuth(
    `${CHAT_UPDATE_KEY}:${newMessage.channelId}`,
    newMessage
  );
  return ServerResponse.success(res, newMessage);
};

const deleteMessage: typeof messageValidator.checkId = async (req, res) => {
  if (!req.user) throw Errors.unauthenticated;
  const messageId = req.params.id;
  const message = await getMessageById(messageId);
  if (!message) throw Errors.message.invalidId;
  const isAuthor = message.author.user.id === req.user.id;
  const canDoAction = await canMemberDoAction(
    req.user.id,
    message.channel.serverId,
    'DELETE_MESSAGES'
  );
  const hasAccess = isAuthor || canDoAction;
  if (!hasAccess) throw Errors.unauthorized;
  const newMessage = await deleteMessageById(messageId);
  SocketHandler.emitAuth(`${CHAT_UPDATE_KEY}:${message.channelId}`, newMessage);
  return ServerResponse.success(res);
};

export default { updateMessage, deleteMessage };
