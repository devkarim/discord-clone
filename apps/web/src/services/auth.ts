import { User } from 'database';
import { LoginSchema, BaseResponse, RegisterSchema } from 'models';

import client from './client';

type UserResponse = BaseResponse<Omit<User, 'password'>>;

export const login = async (formData: LoginSchema) =>
  client
    .post<UserResponse>('/auth/login', formData)
    .then((res) => res.data.data);

export const register = async (formData: RegisterSchema) =>
  client
    .post<UserResponse>('/auth/register', formData)
    .then((res) => res.data.data);
