import { Errors } from 'models';

import ServerResponse from '../models/response.js';
import { getChannelById } from '../services/channel.js';
import {
  MESSAGES_BATCH,
  createMessage,
  getChannelMessages,
} from '../services/message.js';
import channelValidator from '../validators/channel.validator.js';
import SocketHandler from '../models/socket-handler.js';
import { getMemberByChannelId } from '../services/member.js';

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
  SocketHandler.emitAuth(`chat:${message.channelId}:message`, message);
  return ServerResponse.success(res, message);
};

const getMessages: typeof channelValidator.checkId = async (req, res) => {
  if (!req.user) throw Errors.unauthenticated;
  const channelId = +req.params.id;
  if (!channelId || isNaN(channelId)) throw Errors.channel.invalidId;
  const channel = await getChannelById(req.user.id, channelId);
  if (!channel) throw Errors.channel.invalidId;
  const messages = await getChannelMessages(channelId);
  return ServerResponse.success(res, {
    messages,
    cursor:
      messages.length === MESSAGES_BATCH
        ? messages[MESSAGES_BATCH - 1].id
        : undefined,
  });
};

export default { getChannel, sendMessage, getMessages };
