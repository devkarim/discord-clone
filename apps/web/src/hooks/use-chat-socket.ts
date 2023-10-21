import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';

import { FullDirectMessage, MessageWithAuthor } from '@/types/db';
import { CHAT_ADD_KEY, CHAT_UPDATE_KEY } from '@/config/constants';

import useSocket from './use-socket';
import useChatMethods from './use-chat-methods';

const useChatSocket = (chatId?: number) => {
  const { socket } = useSocket();
  const queryClient = useQueryClient();
  const { findMessage, addMessage, updateMessage } = useChatMethods(chatId);

  useEffect(() => {
    if (!socket) return;
    const addKey = `${CHAT_ADD_KEY}:${chatId}`;
    const updateKey = `${CHAT_UPDATE_KEY}:${chatId}`;

    // Add new message to the top of the list
    socket.on(addKey, (message: MessageWithAuthor | FullDirectMessage) => {
      const currentMessage = findMessage(message.id);
      if (currentMessage) {
        return updateMessage(message);
      }
      addMessage(message);
    });

    // Update message in the list
    socket.on(updateKey, (message: MessageWithAuthor | FullDirectMessage) => {
      updateMessage(message);
    });

    return () => {
      socket.off(addKey);
      socket.off(updateKey);
    };
  }, [socket, queryClient, chatId, findMessage, addMessage, updateMessage]);
};

export default useChatSocket;
