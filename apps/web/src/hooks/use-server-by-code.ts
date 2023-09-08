import { useQuery } from '@tanstack/react-query';

import { getServerByCode } from '@/services/server';

const useServerByInviteCode = (code: string) => {
  const query = useQuery({
    queryKey: ['server-invite', code],
    queryFn: () => getServerByCode(code),
    retry: false,
  });
  return query;
};

export default useServerByInviteCode;
