import { useEffect } from 'react';
import { UseInfiniteQueryResult, useQueryClient } from '@tanstack/react-query';

import { MessageWithAuthor } from '@/types/db';
import { CHAT_ADD_KEY, CHAT_QUERY_KEY } from '@/config/constants';
import { MessagesWithAuthorResponse } from '@/services/message';

import useSocket from './use-socket';

const useChatSocket = (chatId?: number) => {
  const { socket, isConnected } = useSocket();
  const queryClient = useQueryClient();

  const addKey = `${CHAT_ADD_KEY}:${chatId}`;
  const queryKey = `${CHAT_QUERY_KEY}:${chatId}`;

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
  }, [socket, isConnected, queryClient, chatId, addKey, queryKey]);
};

export default useChatSocket;
