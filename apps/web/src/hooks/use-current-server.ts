import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';

import { getServer } from '@/services/server';

const useCurrentServer = () => {
  const { serverId } = useParams();

  const query = useQuery({
    queryKey: ['server', serverId],
    queryFn: () => {
      if (serverId && typeof serverId == 'string' && !isNaN(+serverId)) {
        return getServer(+serverId);
      }
      return null;
    },
  });

  return query;
};

export default useCurrentServer;
