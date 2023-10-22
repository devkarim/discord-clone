import { Message } from 'database';
import { BaseResponse, BaseResponseNoData, UpdateMessageSchema } from 'models';

import { MessageWithAuthor } from '@/types/db';

import client from './client';

type MessageResponse = BaseResponse<Message>;
export type MessagesWithAuthorResponse = BaseResponse<{
  messages: MessageWithAuthor[];
  cursor?: number;
}>;

export const getChannelMessages = (channelId: number, cursor?: number) =>
  client
    .get<MessagesWithAuthorResponse>(`/channels/${channelId}/messages`, {
      params: { cursor },
    })
    .then((res) => res.data.data);

export const updateMessage = (id: string, data: UpdateMessageSchema) =>
  client
    .patch<MessageResponse>(`/messages/${id}`, data)
    .then((res) => res.data.data);

export const deleteMessage = (id: string) =>
  client.delete<BaseResponseNoData>(`/messages/${id}`).then((res) => res.data);

/*

  DIRECT MESSAGES

*/

export const updateDirectMessage = (id: string, data: UpdateMessageSchema) =>
  client
    .patch<MessageResponse>(`/direct/${id}`, data)
    .then((res) => res.data.data);

export const deleteDirectMessage = (id: string) =>
  client.delete<BaseResponseNoData>(`/direct/${id}`).then((res) => res.data);
