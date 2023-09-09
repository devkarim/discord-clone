import { BaseResponse, BaseResponseNoData } from 'models';

import { MemberWithPermissions } from '@/types/db';

import client from './client';

type MemberResponse = BaseResponse<MemberWithPermissions>;

export const getCurrentMember = (serverId: number) =>
  client
    .get<MemberResponse>(`/servers/${serverId}/member`)
    .then((res) => res.data.data);

export const leaveServer = (serverId: number) =>
  client.delete<BaseResponseNoData>(`/servers/${serverId}/leave`);
