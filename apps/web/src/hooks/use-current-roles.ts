import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';

import { getServerRoles } from '@/services/server';

const useCurrentRoles = () => {
  const { serverId } = useParams();

  const query = useQuery({
    queryKey: ['roles', serverId],
    queryFn: () => {
      if (serverId && typeof serverId == 'string' && !isNaN(+serverId)) {
        return getServerRoles(+serverId);
      }
      return null;
    },
  });

  return query;
};

export default useCurrentRoles;
