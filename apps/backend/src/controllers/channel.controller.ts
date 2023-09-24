import { Errors } from 'models';

import ServerResponse from '../models/response.js';
import { getChannelById } from '../services/channel.js';
import {
  MESSAGES_BATCH,
  createMessage,
  getChannelMessages,
} from '../services/message.js';
import { CHAT_ADD_KEY } from '../config/constants.js';
import SocketHandler from '../models/socket-handler.js';
import { getMemberByChannelId } from '../services/member.js';
import channelValidator from '../validators/channel.validator.js';

const getChannel: typeof channelValidator.checkId = async (req, res) => {
  if (!req.user) throw Errors.unauthenticated;
  const channelId = +req.params.id;
  if (!channelId || isNaN(channelId)) throw Errors.channel.invalidId;
  const channel = await getChannelById(req.user.id, channelId);
  if (!channel) throw Errors.channel.invalidId;
  return ServerResponse.success(res, channel);
};

const sendMessage: typeof channelValidator.sendMessage = async (req, res) => {
  if (!req.user) throw Errors.unauthenticated;
  const channelId = +req.params.id;
  if (!channelId || isNaN(channelId)) throw Errors.channel.invalidId;
  const channel = await getChannelById(req.user.id, channelId);
  if (!channel) throw Errors.channel.invalidId;
  const member = await getMemberByChannelId(req.user.id, channelId);
  if (!member) throw Errors.server.notInServer;
  const message = await createMessage(channelId, member.id, req.body);
  SocketHandler.emitAuth(`${CHAT_ADD_KEY}:${message.channelId}`, message);
  return ServerResponse.success(res, message);
};

const getMessages: typeof channelValidator.getMessages = async (req, res) => {
  if (!req.user) throw Errors.unauthenticated;
  const channelId = +req.params.id;
  if (!channelId || isNaN(channelId)) throw Errors.channel.invalidId;
  const cursor = +(req.query.cursor ?? -1);
  if (!cursor || isNaN(cursor)) throw Errors.invalidCursor;
  const channel = await getChannelById(req.user.id, channelId);
  if (!channel) throw Errors.channel.invalidId;
  const messages = await getChannelMessages(
    channelId,
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

export default { getChannel, sendMessage, getMessages };
