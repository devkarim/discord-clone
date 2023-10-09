import { Role, Server } from 'database';
import {
  BaseResponse,
  BaseResponseNoData,
  CreateRoleSchema,
  CreateServerSchema,
  UpdateServerSchema,
} from 'models';

import {
  ServerWithChannels,
  FullMember,
  FullRole,
  ServerWithMembersCount,
  UserWithoutStatus,
} from '@/types/db';

import client from './client';

type ServerResponse = BaseResponse<Server>;
type ServerCodeResponse = BaseResponse<{ server: Server; isInServer: boolean }>;
type ServerWithChannelsResponse = BaseResponse<ServerWithChannels>;
type ServersResponse = BaseResponse<Server[]>;
type ServersWithMembersCountResponse = BaseResponse<ServerWithMembersCount[]>;
export type MembersResponse = BaseResponse<FullMember[]>;
type RolesResponse = BaseResponse<FullRole[]>;
type RoleResponse = BaseResponse<Role>;
type UsersWithoutStatusResponse = BaseResponse<UserWithoutStatus[]>;

export const createServer = (data: CreateServerSchema) =>
  client
    .post<ServerResponse>('/servers/create', data)
    .then((res) => res.data.data);

export const getUserServers = () =>
  client.get<ServersResponse>('/servers').then((res) => res.data.data);

export const getPublicServers = () =>
  client
    .get<ServersWithMembersCountResponse>(`/servers/public`)
    .then((res) => res.data.data);

export const getServer = (id: number) =>
  client
    .get<ServerWithChannelsResponse>(`/servers/${id}`)
    .then((res) => res.data.data);

export const getServerByCode = (code: string) =>
  client
    .get<ServerCodeResponse>(`/invites/${code}`)
    .then((res) => res.data.data);

export const getServerRoles = (serverId: number) =>
  client
    .get<RolesResponse>(`/servers/${serverId}/roles`)
    .then((res) => res.data.data);

export const addServerRole = (serverId: number, data: CreateRoleSchema) =>
  client
    .post<RoleResponse>(`/servers/${serverId}/roles`, data)
    .then((res) => res.data.data);

export const deleteServerRole = (serverId: number, roleId: number) =>
  client.delete<BaseResponseNoData>(`/servers/${serverId}/roles/${roleId}`);

export const getServerBans = (serverId: number) =>
  client
    .get<UsersWithoutStatusResponse>(`/servers/${serverId}/bans`)
    .then((res) => res.data.data);

export const getServerMembers = (serverId: number) =>
  client
    .get<MembersResponse>(`/servers/${serverId}/members`)
    .then((res) => res.data.data);

export const generateInviteCode = (serverId: number) =>
  client
    .patch<ServerResponse>(`/servers/${serverId}/invite`)
    .then((res) => res.data.data);

export const joinServerByCode = (code: string) =>
  client
    .post<ServerResponse>(`/invites/join/${code}`)
    .then((res) => res.data.data);

export const updateServer = (
  serverId: number,
  data: Partial<UpdateServerSchema>
) =>
  client
    .patch<ServerResponse>(`/servers/${serverId}`, data)
    .then((res) => res.data.data);

export const deleteServer = (serverId: number) =>
  client.delete<BaseResponseNoData>(`/servers/${serverId}`);
