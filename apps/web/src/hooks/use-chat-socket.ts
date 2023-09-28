import { useEffect } from 'react';
import { UseInfiniteQueryResult, useQueryClient } from '@tanstack/react-query';

import { MessageWithAuthor } from '@/types/db';
import { MessagesWithAuthorResponse } from '@/services/message';
import {
  CHAT_ADD_KEY,
  CHAT_DELETE_KEY,
  CHAT_QUERY_KEY,
  CHAT_UPDATE_KEY,
} from '@/config/constants';

import useSocket from './use-socket';
import usePendingMessages from './use-pending-messages';

const useChatSocket = (chatId?: number) => {
  const removePendingMessage = usePendingMessages(
    (state) => state.removeMessage
  );
  const { socket } = useSocket();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!socket) return;
    const addKey = `${CHAT_ADD_KEY}:${chatId}`;
    const updateKey = `${CHAT_UPDATE_KEY}:${chatId}`;
    const deleteKey = `${CHAT_DELETE_KEY}:${chatId}`;
    const queryKey = `${CHAT_QUERY_KEY}:${chatId}`;

    // Add new message to the top of the list
    socket.on(
      addKey,
      (message: MessageWithAuthor, pendingMessageId: string) => {
        queryClient.setQueryData<
          UseInfiniteQueryResult<MessagesWithAuthorResponse['data']>['data']
        >([queryKey], (oldData) => {
          removePendingMessage(pendingMessageId);
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
      }
    );

    // Update message in the list
    socket.on(updateKey, (message: MessageWithAuthor) => {
      queryClient.setQueryData<
        UseInfiniteQueryResult<MessagesWithAuthorResponse['data']>['data']
      >([queryKey], (oldData) => {
        if (!oldData || !oldData.pages || oldData.pages.length == 0) return;
        const newData = oldData.pages.map((page) => ({
          ...page,
          messages: page.messages.map((m) =>
            m.id === message.id ? message : m
          ),
        }));

        return {
          ...oldData,
          pages: newData,
        };
      });
    });

    // Delete message from the list
    socket.on(deleteKey, (messageId: number) => {
      queryClient.setQueryData<
        UseInfiniteQueryResult<MessagesWithAuthorResponse['data']>['data']
      >([queryKey], (oldData) => {
        if (!oldData || !oldData.pages || oldData.pages.length == 0) return;
        const newData = oldData.pages.map((page) => ({
          ...page,
          messages: page.messages.filter((m) => m.id !== messageId),
        }));

        return {
          ...oldData,
          pages: newData,
        };
      });
    });

    return () => {
      socket.off(addKey);
      socket.off(updateKey);
      socket.off(deleteKey);
    };
  }, [socket, queryClient, chatId, removePendingMessage]);
};

export default useChatSocket;
