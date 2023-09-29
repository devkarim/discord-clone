'use client';

import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';

import { getChannel } from '@/services/channel';

const useCurrentChannel = () => {
  const { channelId } = useParams();

  const query = useQuery({
    queryKey: ['channel', channelId],
    queryFn: () => {
      if (channelId && typeof channelId == 'string' && !isNaN(+channelId)) {
        return getChannel(+channelId);
      }
      return null;
    },
    retry: false,
  });

  return query;
};

export default useCurrentChannel;
