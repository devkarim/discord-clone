import { Channel } from 'database';
import { BaseResponse, CreateChannelSchema } from 'models';

import client from './client';

export type ChannelResponse = BaseResponse<Channel>;

export const createChannel = (serverId: number, data: CreateChannelSchema) =>
  client.post<ChannelResponse>(`/servers/${serverId}/channel`, data);
