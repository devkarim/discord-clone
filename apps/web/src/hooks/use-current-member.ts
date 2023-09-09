import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';

import { getCurrentMember } from '@/services/member';

const useCurrentMember = () => {
  const { serverId } = useParams();

  const query = useQuery({
    queryKey: ['me-member', serverId],
    queryFn: () => {
      if (serverId && typeof serverId == 'string' && !isNaN(+serverId)) {
        return getCurrentMember(+serverId);
      }
      return null;
    },
  });

  return query;
};

export default useCurrentMember;
