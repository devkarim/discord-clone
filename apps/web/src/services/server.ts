import { Server } from 'database';
import { BaseResponse, CreateServerSchema } from 'models';

import client from './client';

type CreateServerResponse = BaseResponse<Server>;
type GetServersResponse = BaseResponse<Server[]>;

export const createServer = (data: CreateServerSchema) =>
  client
    .post<CreateServerResponse>('/servers/create', data)
    .then((res) => res.data.data);

export const getUserServers = () =>
  client.get<GetServersResponse>('/servers').then((res) => res.data.data);
