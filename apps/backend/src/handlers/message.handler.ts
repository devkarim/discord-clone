import { Socket } from 'socket.io';
import { v4 as uuidv4 } from 'uuid';

import {
  Errors,
  Exception,
  SendMessageSchema,
  SocketResponse,
  sendMessageSchema,
} from 'models';
import { DirectMessage, Message } from 'database';

import { handleSocketError } from '../lib/utils.js';
import { CHAT_ADD_KEY } from '../config/constants.js';
import { getChannelById } from '../services/channel.js';
import SocketHandler from '../models/socket-handler.js';
import { getMemberByChannelId } from '../services/member.js';
import {
  createCustomDirectMessage,
  createCustomMessage,
} from '../services/message.js';

const sendMessage =
  (socket: Socket) =>
  async (
    chatId: number,
    messageValues: SendMessageSchema,
    memberId: number,
    ack?: (res: SocketResponse<{ message: Message }>) => void
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
      if (!memberId || isNaN(memberId))
        return ack?.({
          success: false,
          message: Exception.parseError(Errors.member.invalidId),
        });
      const values = sendMessageSchema.safeParse(messageValues);
      if (!values.success)
        return ack?.({
          success: false,
          message: Exception.parseError(values.error),
        });
      const id = uuidv4();
      const createdAt = new Date();
      const message: Message = {
        ...values.data,
        fileUrl: values.data.fileUrl ?? null,
        id,
        channelId: chatId,
        authorId: memberId,
        status: 'PENDING',
        createdAt: createdAt,
        updatedAt: createdAt,
      };
      ack?.({ success: true, data: { message } });
      const author = await getMemberByChannelId(user.id, chatId);
      if (!author || author.id !== memberId) throw Errors.server.notInServer;
      socket.emit(`${CHAT_ADD_KEY}:${message.channelId}`, {
        ...message,
        status: 'SENT',
        author,
      });
      const channel = await getChannelById(chatId, user.id);
      if (!channel) throw Errors.channel.invalidId;
      const actualMessage = await createCustomMessage(message);
      SocketHandler.emitAuth(
        `${CHAT_ADD_KEY}:${message.channelId}`,
        actualMessage
      );
    } catch (err) {
      handleSocketError('sendMessage/message.handler', err);
    }
  };

const sendConversationMessage =
  (socket: Socket) =>
  async (
    chatId: number,
    messageValues: SendMessageSchema,
    ack?: (res: SocketResponse<{ message: DirectMessage }>) => void
  ) => {
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
    const id = uuidv4();
    const createdAt = new Date();
    const message: DirectMessage = {
      ...values.data,
      fileUrl: values.data.fileUrl ?? null,
      id,
      conversationId: chatId,
      authorId: user.id,
      status: 'PENDING',
      createdAt: createdAt,
      updatedAt: createdAt,
    };
    ack?.({ success: true, data: { message } });
    socket.emit(`${CHAT_ADD_KEY}:${message.conversationId}`, {
      ...message,
      status: 'SENT',
      author: {
        id: user.id,
        name: user.name,
        username: user.username,
        imageUrl: user.imageUrl,
        status: user.status,
      },
    });
    const actualMessage = await createCustomDirectMessage(message);
    SocketHandler.emitAuth(
      `${CHAT_ADD_KEY}:${actualMessage.conversationId}`,
      actualMessage
    );
  };

export default { sendMessage, sendConversationMessage };
