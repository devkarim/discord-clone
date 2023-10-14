import { useEffect } from 'react';
import { UseInfiniteQueryResult, useQueryClient } from '@tanstack/react-query';

import { BaseResponse } from 'models';

import {
  CHAT_ADD_KEY,
  CHAT_QUERY_KEY,
  CHAT_UPDATE_KEY,
} from '@/config/constants';
import { FullDirectMessage, MessageWithAuthor } from '@/types/db';

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
    const queryKey = `${CHAT_QUERY_KEY}:${chatId}`;

    // Add new message to the top of the list
    socket.on(
      addKey,
      (
        message: MessageWithAuthor | FullDirectMessage,
        pendingMessageId: string
      ) => {
        queryClient.setQueryData<
          UseInfiniteQueryResult<
            BaseResponse<{
              messages: (typeof message)[];
              cursor?: number;
            }>['data']
          >['data']
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
    socket.on(updateKey, (message: MessageWithAuthor | FullDirectMessage) => {
      queryClient.setQueryData<
        UseInfiniteQueryResult<
          BaseResponse<{
            messages: (typeof message)[];
            cursor?: number;
          }>['data']
        >['data']
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

    return () => {
      socket.off(addKey);
      socket.off(updateKey);
    };
  }, [socket, queryClient, chatId, removePendingMessage]);
};

export default useChatSocket;
