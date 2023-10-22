import { Errors } from 'models';

import ServerResponse from '../models/response.js';
import messageValidator from '../validators/message.validator.js';
import {
  deleteDirectMessageById,
  editDirectMessage,
  getDirectMessageById,
} from '../services/message.js';
import SocketHandler from '../models/socket-handler.js';
import { CHAT_UPDATE_KEY } from '../config/constants.js';

const updateMessage: typeof messageValidator.updateMessage = async (
  req,
  res
) => {
  if (!req.user) throw Errors.unauthenticated;
  const messageId = req.params.id;
  const message = await getDirectMessageById(messageId);
  if (!message) throw Errors.message.invalidId;
  const isAuthor = message.author.id === req.user.id;
  if (!isAuthor) throw Errors.unauthorized;
  const newMessage = await editDirectMessage(messageId, req.body);
  SocketHandler.emitAuth(
    `${CHAT_UPDATE_KEY}:${newMessage.conversationId}`,
    newMessage
  );
  return ServerResponse.success(res, newMessage);
};

const deleteMessage: typeof messageValidator.checkId = async (req, res) => {
  if (!req.user) throw Errors.unauthenticated;
  const messageId = req.params.id;
  const message = await getDirectMessageById(messageId);
  if (!message) throw Errors.message.invalidId;
  const isAuthor = message.author.id === req.user.id;
  if (!isAuthor) throw Errors.unauthorized;
  const newMessage = await deleteDirectMessageById(messageId);
  SocketHandler.emitAuth(
    `${CHAT_UPDATE_KEY}:${message.conversationId}`,
    newMessage
  );
  return ServerResponse.success(res);
};

export default { updateMessage, deleteMessage };
