import { useQuery } from '@tanstack/react-query';

import { getMe } from '@/services/auth';

const useUser = () => {
  const query = useQuery({ queryKey: ['user'], queryFn: getMe });

  return query;
};

export default useUser;
