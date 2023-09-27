'use client';

import { useParams } from 'next/navigation';
import { useInfiniteQuery } from '@tanstack/react-query';

import { CHAT_QUERY_KEY } from '@/config/constants';
import { getChannelMessages } from '@/services/message';

const useCurrentMessages = () => {
  const { channelId } = useParams();

  const query = useInfiniteQuery({
    queryKey: [`${CHAT_QUERY_KEY}:${channelId}`],
    queryFn: ({ pageParam }) => {
      return getChannelMessages(+channelId, pageParam);
    },
    getNextPageParam: (lastPage) => lastPage.cursor,
    refetchIntervalInBackground: false,
    refetchInterval: 0,
    refetchOnReconnect: false,
  });

  return query;
};

export default useCurrentMessages;
