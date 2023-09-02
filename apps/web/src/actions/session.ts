import { cookies } from 'next/headers';

import { BaseResponse } from 'models';
import { UserSession } from 'database';

import client from './client';

type UserResponse = BaseResponse<UserSession>;

export const getSession = () => {
  const cookieStore = cookies();
  const sessionId = cookieStore.get('connect.sid');
  return sessionId?.value;
};

export const getUser = async () => {
  const sessionId = getSession();
  if (!sessionId) return null;
  try {
    const user = await client
      .get<UserResponse>('/auth/me', {
        headers: {
          cookie: `connect.sid=${sessionId}`,
        },
      })
      .then((res) => res.data.data);
    return user;
  } catch (error) {
    return null;
  }
};
