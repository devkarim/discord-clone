import { Channel } from 'database';
import {
  BaseResponse,
  BaseResponseNoData,
  CreateChannelSchema,
  UpdateChannelSchema,
} from 'models';

import { FullChannel } from '@/types/db';

import client from './client';

export type ChannelResponse = BaseResponse<Channel>;
export type FullChannelResponse = BaseResponse<FullChannel>;

export const createChannel = (serverId: number, data: CreateChannelSchema) =>
  client
    .post<ChannelResponse>(`/servers/${serverId}/channel`, data)
    .then((res) => res.data.data);

export const getChannel = (channelId: number) =>
  client
    .get<FullChannelResponse>(`/channels/${channelId}`)
    .then((res) => res.data.data);

export const updateChannel = (channelId: number, data: UpdateChannelSchema) =>
  client
    .patch<ChannelResponse>(`/channels/${channelId}`, data)
    .then((res) => res.data.data);

export const deleteChannel = (channelId: number) =>
  client
    .delete<BaseResponseNoData>(`/channels/${channelId}`)
    .then((res) => res.data);
