'use client';

import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';

import { getChannelMessages } from '@/services/message';

const useCurrentMessages = () => {
  const { channelId } = useParams();

  const query = useQuery({
    queryKey: ['channel-messages', channelId],
    queryFn: () => {
      if (channelId && typeof channelId == 'string' && !isNaN(+channelId)) {
        return getChannelMessages(+channelId);
      }
      return null;
    },
  });

  return query;
};

export default useCurrentMessages;
