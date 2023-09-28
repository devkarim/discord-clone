import { nanoid } from 'nanoid';
import { Socket } from 'socket.io';

import {
  Errors,
  Exception,
  SendMessageSchema,
  SocketResponse,
  sendMessageSchema,
} from 'models';

import { handleSocketError } from '../lib/utils.js';
import { CHAT_ADD_KEY } from '../config/constants.js';
import { createMessage } from '../services/message.js';
import { getChannelById } from '../services/channel.js';
import SocketHandler from '../models/socket-handler.js';
import { getMemberByChannelId } from '../services/member.js';

const sendMessage =
  (socket: Socket) =>
  async (
    chatId: number,
    messageValues: SendMessageSchema,
    ack?: (res: SocketResponse<{ pendingMessageId: string }>) => void
  ) => {
    try {
      const user = socket.request.user;
      if (!user)
        return ack?.({
          success: false,
          message: Exception.parseError(Errors.unauthenticated),
        });
      if (!chatId || isNaN(chatId))
        return ack?.({
          success: false,
          message: Exception.parseError(Errors.channel.invalidId),
        });
      const values = sendMessageSchema.safeParse(messageValues);
      if (!values.success)
        return ack?.({
          success: false,
          message: Exception.parseError(values.error),
        });
      const pendingMessageId = nanoid();
      ack?.({ success: true, data: { pendingMessageId } });
      const channel = await getChannelById(user.id, chatId);
      if (!channel) throw Errors.channel.invalidId;
      const member = await getMemberByChannelId(user.id, chatId);
      if (!member) throw Errors.server.notInServer;
      const message = await createMessage(chatId, member.id, values.data);
      SocketHandler.emitAuth(
        `${CHAT_ADD_KEY}:${message.channelId}`,
        message,
        pendingMessageId
      );
    } catch (err) {
      handleSocketError('sendMessage/message.handler', err);
    }
  };

export default { sendMessage };
