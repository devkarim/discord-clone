import { User } from 'database';
import { BaseResponse, UpdateUserSchema } from 'models';

import client from './client';

type UserResponse = BaseResponse<User>;

export const updateUser = async (data: UpdateUserSchema) =>
  client.patch<UserResponse>(`/user`, data).then((res) => res.data.data);
