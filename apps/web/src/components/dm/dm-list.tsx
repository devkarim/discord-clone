'use client';

import { useParams, useRouter } from 'next/navigation';

import useMutuals from '@/hooks/use-mutuals';

import DMCard from './dm-card';

interface DMListProps {}

const DMList: React.FC<DMListProps> = ({}) => {
  const { data: mutuals } = useMutuals();
  const { userId } = useParams();
  const router = useRouter();

  return (
    <div className="space-y-1">
      {mutuals?.map((mutual) => (
        <DMCard
          key={mutual.id}
          username={mutual.username}
          imageUrl={mutual.imageUrl}
          status={mutual.status}
          active={mutual.id === +userId}
          onClick={() => router.push(`/me/${mutual.id}`)}
        />
      ))}
    </div>
  );
};

export default DMList;
