import { Errors } from 'models';

import ServerResponse from '../models/response.js';
import { getChannelById } from '../services/channel.js';
import channelValidator from '../validators/channel.validator.js';

const getChannel: typeof channelValidator.checkId = async (req, res) => {
  if (!req.user) throw Errors.unauthenticated;
  const channelId = +req.params.id;
  if (!channelId || isNaN(channelId)) throw Errors.channel.invalidId;
  const channel = await getChannelById(req.user.id, channelId);
  if (!channel) throw Errors.channel.invalidId;
  return ServerResponse.success(res, channel);
};

export default { getChannel };
