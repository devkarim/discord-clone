import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';

import { getPairConversation } from '@/services/conversation';

const useCurrentConversation = () => {
  const { userId } = useParams();

  const query = useQuery({
    queryKey: ['conversation', userId],
    queryFn: () => {
      if (userId && typeof userId == 'string' && !isNaN(+userId)) {
        return getPairConversation(+userId);
      }
      return null;
    },
    retry: false,
  });

  return query;
};

export default useCurrentConversation;
