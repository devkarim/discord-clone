import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';

import { getServerMembers } from '@/services/server';
import { MEMBERS_QUERY_KEY } from '@/config/constants';

const useCurrentMembers = () => {
  const { serverId } = useParams();

  const query = useQuery({
    queryKey: [MEMBERS_QUERY_KEY, serverId],
    queryFn: () => {
      if (serverId && typeof serverId == 'string' && !isNaN(+serverId)) {
        return getServerMembers(+serverId);
      }
      return null;
    },
  });

  return query;
};

export default useCurrentMembers;
