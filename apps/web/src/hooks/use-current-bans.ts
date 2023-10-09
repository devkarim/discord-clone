import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';

import { getServerBans } from '@/services/server';
import { BAN_QUERY_KEY } from '@/config/constants';

const useCurrentBans = () => {
  const { serverId } = useParams();

  const query = useQuery({
    queryKey: [BAN_QUERY_KEY, serverId],
    queryFn: () => {
      if (serverId && typeof serverId == 'string' && !isNaN(+serverId)) {
        return getServerBans(+serverId);
      }
      return null;
    },
  });

  return query;
};

export default useCurrentBans;
