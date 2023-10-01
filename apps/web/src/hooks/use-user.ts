import { useQuery } from '@tanstack/react-query';

import { getMe } from '@/services/auth';
import { USER_QUERY_KEY } from '@/config/constants';

const useUser = () => {
  const query = useQuery({ queryKey: [USER_QUERY_KEY], queryFn: getMe });

  return query;
};

export default useUser;
