import { useQuery } from '@tanstack/react-query';

import { getUserMutuals } from '@/services/user';

const useMutuals = () => {
  const query = useQuery({
    queryKey: ['mutuals'],
    queryFn: () => getUserMutuals(),
  });

  return query;
};

export default useMutuals;
