import { BaseResponse } from 'models';

import { ConversationWithUsers, FullDirectMessage, FullUser } from '@/types/db';

import client from './client';

export type ConversationResponse = BaseResponse<{
  conversation: ConversationWithUsers;
  user: FullUser;
}>;
export type ConversationMessagesResponse = BaseResponse<{
  messages: FullDirectMessage[];
  cursor?: number;
}>;

export const getConversationById = (conversationId: number) =>
  client
    .get<ConversationResponse>(`/conversations/${conversationId}`)
    .then((res) => res.data.data);

export const getPairConversation = (userId: number) =>
  client
    .get<ConversationResponse>(`/conversations/me/${userId}`)
    .then((res) => res.data.data);

export const getConversationMessages = (
  conversationId: number,
  cursor?: number
) =>
  client
    .get<ConversationMessagesResponse>(
      `/conversations/${conversationId}/messages`,
      { params: { cursor } }
    )
    .then((res) => res.data.data);
