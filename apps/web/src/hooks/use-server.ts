import { useQuery } from '@tanstack/react-query';

import { getServer } from '@/services/server';

const useServer = (id: number) => {
  const query = useQuery({ queryKey: ['server', id], queryFn: () => getServer(id) });

  return query;
};

export default useServer;
