import { useQuery } from '@tanstack/react-query';

import { getUserServers } from '@/services/server';

const useClientServers = () => {
  const query = useQuery({ queryKey: ['servers'], queryFn: getUserServers });
  return query;
};

export default useClientServers;
