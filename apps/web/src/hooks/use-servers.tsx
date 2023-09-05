import { getUserServers } from '@/services/server';
import { useQuery } from '@tanstack/react-query';

const useClientServers = () => {
  const query = useQuery({ queryKey: ['servers'], queryFn: getUserServers });

  return query;
};

export default useClientServers;
