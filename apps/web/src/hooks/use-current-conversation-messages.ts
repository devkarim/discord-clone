'use client';

import { useInfiniteQuery } from '@tanstack/react-query';

import { CHAT_QUERY_KEY } from '@/config/constants';
import { getConversationMessages } from '@/services/conversation';

import useCurrentConversation from './use-current-conversation';

const useCurrentConversationMessages = () => {
  const { data } = useCurrentConversation();

  const query = useInfiniteQuery({
    queryKey: [`${CHAT_QUERY_KEY}:${data?.conversation.id}`],
    queryFn: ({ pageParam }) => {
      if (!data?.conversation.id) return { messages: [] };
      return getConversationMessages(+data?.conversation.id, pageParam);
    },
    getNextPageParam: (lastPage) => lastPage.cursor,
    refetchIntervalInBackground: false,
    refetchInterval: 0,
    refetchOnReconnect: false,
  });

  return query;
};

export default useCurrentConversationMessages;
