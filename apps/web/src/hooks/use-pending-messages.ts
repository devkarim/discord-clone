import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

import { MessageWithAuthor } from '@/types/db';

export interface PendingMessage extends Omit<MessageWithAuthor, 'id'> {
  pendingMessageId: string;
}

interface PendingMessagesState {
  messages: PendingMessage[];
  addMessage: (message: PendingMessage) => void;
  getMessagesByChannel: (channelId?: number) => PendingMessage[];
  removeMessage: (pendingMessageId: string) => void;
}

const usePendingMessages = create(
  devtools<PendingMessagesState>((set, get) => ({
    messages: [],
    addMessage: (message) =>
      set((state) => ({ messages: [...state.messages, message] })),
    removeMessage: (pendingMessageId) =>
      set((state) => ({
        messages: state.messages.filter(
          (m) => m.pendingMessageId !== pendingMessageId
        ),
      })),
    getMessagesByChannel: (channelId) =>
      get()
        .messages.filter((m) => m.channelId === channelId)
        .sort((a, b) => {
          if (a.createdAt < b.createdAt) return -1;
          if (a.createdAt > b.createdAt) return 1;
          return 0;
        }),
  }))
);

export default usePendingMessages;
