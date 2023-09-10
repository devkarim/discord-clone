import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';

import { getServerMembers } from '@/services/server';

const useCurrentMembers = () => {
  const { serverId } = useParams();

  const query = useQuery({
    queryKey: ['members-roles', serverId],
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
