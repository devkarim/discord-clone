import { Errors } from 'models';

import ServerResponse from '../models/response.js';
import {
  deleteChannel,
  getChannelById,
  updateChannel,
} from '../services/channel.js';
import { canMemberDoAction } from '../services/member.js';
import channelValidator from '../validators/channel.validator.js';
import { MESSAGES_BATCH, getChannelMessages } from '../services/message.js';

const getChannel: typeof channelValidator.checkId = async (req, res) => {
  if (!req.user) throw Errors.unauthenticated;
  const channelId = +req.params.id;
  if (!channelId || isNaN(channelId)) throw Errors.channel.invalidId;
  const channel = await getChannelById(channelId, req.user.id);
  if (!channel) throw Errors.channel.invalidId;
  return ServerResponse.success(res, channel);
};

const getMessages: typeof channelValidator.getMessages = async (req, res) => {
  if (!req.user) throw Errors.unauthenticated;
  const channelId = +req.params.id;
  if (!channelId || isNaN(channelId)) throw Errors.channel.invalidId;
  const channel = await getChannelById(channelId, req.user.id);
  if (!channel) throw Errors.channel.invalidId;
  const cursor = req.query.cursor;
  const messages = await getChannelMessages(channelId, cursor);
  return ServerResponse.success(res, {
    messages,
    cursor:
      messages.length === MESSAGES_BATCH
        ? messages[MESSAGES_BATCH - 1].id
        : undefined,
  });
};

const editChannel: typeof channelValidator.editChannel = async (req, res) => {
  if (!req.user) throw Errors.unauthenticated;
  const channelId = +req.params.id;
  if (!channelId || isNaN(channelId)) throw Errors.channel.invalidId;
  const channel = await getChannelById(channelId, req.user.id);
  if (!channel) throw Errors.channel.invalidId;
  const hasAccess = await canMemberDoAction(
    req.user.id,
    channel.serverId,
    'MANAGE_SERVER'
  );
  if (!hasAccess) throw Errors.unauthorized;
  const newChannel = await updateChannel(channelId, req.body);
  return ServerResponse.success(res, newChannel);
};

const deleteServerChannel: typeof channelValidator.checkId = async (
  req,
  res
) => {
  if (!req.user) throw Errors.unauthenticated;
  const channelId = +req.params.id;
  if (!channelId || isNaN(channelId)) throw Errors.channel.invalidId;
  const channel = await getChannelById(channelId, req.user.id);
  if (!channel) throw Errors.channel.invalidId;
  const hasAccess = await canMemberDoAction(
    req.user.id,
    channel.serverId,
    'MANAGE_SERVER'
  );
  if (!hasAccess) throw Errors.unauthorized;
  await deleteChannel(channelId);
  return ServerResponse.success(res);
};

export default { getChannel, getMessages, editChannel, deleteServerChannel };
