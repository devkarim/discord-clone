import { useEffect } from 'react';
import { UseQueryResult, useQueryClient } from '@tanstack/react-query';

import { Status } from 'database';

import {
  MEMBERS_QUERY_KEY,
  STATUS_CHANGE_KEY,
  USER_QUERY_KEY,
} from '@/config/constants';
import { MembersResponse } from '@/services/server';
import { UserSessionResponse } from '@/services/auth';

import useUser from './use-user';
import useSocket from './use-socket';

const useStatus = (serverId?: string) => {
  const { socket } = useSocket();
  const { data: user } = useUser();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!socket) return;
    // Set new status
    if (serverId) {
      socket.on(
        `${STATUS_CHANGE_KEY}:${serverId}`,
        (userId: number, status: Status) => {
          // Set new status for changed user
          if (serverId) {
            queryClient.setQueryData<
              UseQueryResult<MembersResponse['data']>['data']
            >([MEMBERS_QUERY_KEY, serverId], (oldData) => {
              if (!oldData || oldData.length == 0) return;
              const newData = oldData.map((m) =>
                m.userId === userId ? { ...m, user: { ...m.user, status } } : m
              );

              return newData;
            });
          }
        }
      );
    }

    socket.on(STATUS_CHANGE_KEY, (userId: number, status: Status) => {
      // Set new status for current user
      if (user && user.id === userId) {
        queryClient.setQueryData<
          UseQueryResult<UserSessionResponse['data']>['data']
        >([USER_QUERY_KEY], (oldData) => {
          if (!oldData) return;
          return { ...oldData, status };
        });
      }
    });

    return () => {
      if (serverId) {
        socket.off(`${STATUS_CHANGE_KEY}:${serverId}`);
      }
      socket.off(STATUS_CHANGE_KEY);
    };
  }, [socket, queryClient, serverId, user]);
};

export default useStatus;
