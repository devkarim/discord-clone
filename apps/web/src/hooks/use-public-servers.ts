import { useQuery } from '@tanstack/react-query';

import { getPublicServers } from '@/services/server';

const usePublicServers = () => {
  const query = useQuery({
    queryKey: ['public-servers'],
    queryFn: getPublicServers,
    retry: false,
  });
  return query;
};

export default usePublicServers;
