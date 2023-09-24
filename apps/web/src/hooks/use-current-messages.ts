'use client';

import { useParams } from 'next/navigation';
import { useInfiniteQuery } from '@tanstack/react-query';

import { getChannelMessages } from '@/services/message';

const useCurrentMessages = () => {
  const { channelId } = useParams();

  const query = useInfiniteQuery({
    queryKey: [`channel:messages:${channelId}`],
    queryFn: ({ pageParam }) => {
      return getChannelMessages(+channelId, pageParam);
    },
    getNextPageParam: (lastPage) => lastPage.cursor,
  });

  return query;
};

export default useCurrentMessages;
