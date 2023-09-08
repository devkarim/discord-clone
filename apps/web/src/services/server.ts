import { Server } from 'database';
import { BaseResponse, CreateServerSchema } from 'models';

import { ServerWithChannels } from '@/types/db';

import client from './client';

type ServerResponse = BaseResponse<Server>;
type ServerCodeResponse = BaseResponse<{ server: Server; isInServer: boolean }>;
type ServerWithChannelsResponse = BaseResponse<ServerWithChannels>;
type GetServersResponse = BaseResponse<Server[]>;

export const createServer = (data: CreateServerSchema) =>
  client
    .post<ServerResponse>('/servers/create', data)
    .then((res) => res.data.data);

export const getUserServers = () =>
  client.get<GetServersResponse>('/servers').then((res) => res.data.data);

export const getServer = (id: number) =>
  client
    .get<ServerWithChannelsResponse>(`/servers/${id}`)
    .then((res) => res.data.data);

export const getServerByCode = (code: string) =>
  client
    .get<ServerCodeResponse>(`/servers/invite/${code}`)
    .then((res) => res.data.data);

export const generateInviteCode = (serverId: number) =>
  client
    .patch<ServerResponse>(`/servers/${serverId}/invite`)
    .then((res) => res.data.data);

export const joinServerByCode = (code: string) =>
  client
    .post<ServerResponse>(`/servers/join/${code}`)
    .then((res) => res.data.data);
