import { Member } from 'database';
import { BaseResponse, BaseResponseNoData } from 'models';

import { MemberWithPermissions } from '@/types/db';

import client from './client';

type MemberWithPermissionsResponse = BaseResponse<MemberWithPermissions>;
type MemberResponse = BaseResponse<Member>;

export const getCurrentMember = (serverId: number) =>
  client
    .get<MemberWithPermissionsResponse>(`/servers/${serverId}/member`)
    .then((res) => res.data.data);

export const leaveServer = (serverId: number) =>
  client.delete<BaseResponseNoData>(`/servers/${serverId}/leave`);

export const changeServerMemberRole = (
  serverId: number,
  memberId: number,
  roleId?: number
) =>
  client
    .patch<MemberResponse>(`/servers/${serverId}/members/${memberId}/role`, {
      roleId,
    })
    .then((res) => res.data.data);

export const kickServerMember = (serverId: number, memberId: number) =>
  client
    .delete<BaseResponseNoData>(`/servers/${serverId}/members/${memberId}`)
    .then((res) => res.data);

export const banServerMember = (serverId: number, memberId: number) =>
  client
    .delete<BaseResponseNoData>(`/servers/${serverId}/members/${memberId}/ban`)
    .then((res) => res.data);
