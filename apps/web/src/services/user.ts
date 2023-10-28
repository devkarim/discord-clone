import { User } from 'database';
import { BaseResponse, UpdateUserSchema } from 'models';

import { FullUser } from '@/types/db';

import client from './client';

type UserResponse = BaseResponse<User>;
type UsersResponse = BaseResponse<FullUser[]>;

export const updateUser = async (data: UpdateUserSchema) =>
  client.patch<UserResponse>(`/user`, data).then((res) => res.data.data);

export const getUserMutuals = async () =>
  client.get<UsersResponse>(`/user/mutuals`).then((res) => res.data.data);

export const logout = async () => client.post(`/user/logout`);
