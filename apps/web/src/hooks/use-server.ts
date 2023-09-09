import { useQuery } from '@tanstack/react-query';

import { getServer } from '@/services/server';

const useServer = (id: string) => {
  const query = useQuery({
    queryKey: ['server', id],
    queryFn: () => {
      if (id && !isNaN(+id)) {
        return getServer(+id);
      }
      return null;
    },
  });

  return query;
};

export default useServer;
