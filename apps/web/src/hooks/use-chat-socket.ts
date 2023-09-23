import { useEffect } from 'react';
import { UseInfiniteQueryResult, useQueryClient } from '@tanstack/react-query';

import { MessageWithAuthor } from '@/types/db';

import useSocket from './use-socket';
import { MessagesWithAuthorResponse } from '@/services/message';

const useChatSocket = (queryKey: string, addKey: string) => {
  const { socket, isConnected } = useSocket();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!socket) return;
    socket.on(addKey, (message: MessageWithAuthor) => {
      queryClient.setQueryData<
        UseInfiniteQueryResult<MessagesWithAuthorResponse['data']>['data']
      >([queryKey], (oldData) => {
        if (!oldData || !oldData.pages || oldData.pages.length == 0)
          return {
            pages: [
              {
                messages: [message],
              },
            ],
            pageParams: [undefined],
          };
        const newData = [...oldData.pages];
        newData[0] = {
          ...newData[0],
          messages: [message, ...newData[0].messages],
        };
        return {
          ...oldData,
          pages: newData,
        };
      });
    });

    return () => {
      socket.off(addKey);
    };
  }, [socket, isConnected, addKey, queryClient, queryKey]);
};

export default useChatSocket;
