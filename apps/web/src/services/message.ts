import { BaseResponse, SendMessageSchema } from 'models';

import { MessageWithAuthor } from '@/types/db';

import client from './client';

type MessageWithAuthorResponse = BaseResponse<MessageWithAuthor>;
export type MessagesWithAuthorResponse = BaseResponse<{
  messages: MessageWithAuthor[];
  cursor?: number;
}>;

export const createMessage = async (
  channelId: number,
  data: SendMessageSchema
) =>
  client
    .post<MessageWithAuthorResponse>(`/channels/${channelId}/messages`, data)
    .then((res) => res.data.data);

export const getChannelMessages = (channelId: number, cursor?: number) =>
  client
    .get<MessagesWithAuthorResponse>(`/channels/${channelId}/messages`, {
      params: { cursor },
    })
    .then((res) => res.data.data);
