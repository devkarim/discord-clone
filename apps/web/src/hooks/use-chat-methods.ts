import { UseInfiniteQueryResult, useQueryClient } from '@tanstack/react-query';

import { BaseResponse } from 'models';

import { CHAT_QUERY_KEY } from '@/config/constants';
import { MessageWithAuthor, FullDirectMessage } from '@/types/db';

const useChatMethods = (chatId?: number) => {
  const queryClient = useQueryClient();
  const queryKey = `${CHAT_QUERY_KEY}:${chatId}`;

  const findMessage = (messageId: string) => {
    const data = queryClient.getQueryData<
      UseInfiniteQueryResult<
        BaseResponse<{
          messages: (MessageWithAuthor | FullDirectMessage)[];
          cursor?: number;
        }>['data']
      >['data']
    >([queryKey]);
    if (!data) return null;
    return data.pages
      .map((p) => p.messages)
      .flat()
      .find((m) => m.id === messageId);
  };

  const addMessage = (message: MessageWithAuthor | FullDirectMessage) =>
    queryClient.setQueryData<
      UseInfiniteQueryResult<
        BaseResponse<{
          messages: (typeof message)[];
          cursor?: number;
        }>['data']
      >['data']
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

  const updateMessage = (message: MessageWithAuthor | FullDirectMessage) =>
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
        messages: page.messages.map((m) => (m.id === message.id ? message : m)),
      }));

      return {
        ...oldData,
        pages: newData,
      };
    });

  const deleteMessage = (messageId: string) => {
    queryClient.setQueryData<
      UseInfiniteQueryResult<
        BaseResponse<{
          messages: (MessageWithAuthor | FullDirectMessage)[];
          cursor?: number;
        }>['data']
      >['data']
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
  };

  return { findMessage, addMessage, updateMessage, deleteMessage };
};

export default useChatMethods;
