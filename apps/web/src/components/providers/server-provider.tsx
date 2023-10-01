'use client';

import { useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';

import useCurrentServer from '@/hooks/use-current-server';
import useStatus from '@/hooks/use-status';

interface ServerProviderProps {
  children?: React.ReactNode;
}

const ServerProvider: React.FC<ServerProviderProps> = ({ children }) => {
  const router = useRouter();
  const { serverId } = useParams();
  const { isLoading, data } = useCurrentServer();
  useStatus(typeof serverId === 'string' ? serverId : undefined);

  useEffect(() => {
    if (isLoading) return;
    if (data) return;
    router.replace('/');
  }, [isLoading, data, router]);

  if (isLoading) return null;

  if (!data) return null;

  return <>{children}</>;
};

export default ServerProvider;
