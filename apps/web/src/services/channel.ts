import { Channel } from 'database';
import { BaseResponse, CreateChannelSchema } from 'models';

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
