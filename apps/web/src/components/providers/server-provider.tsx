'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

import useCurrentServer from '@/hooks/use-current-server';

interface ServerProviderProps {
  children?: React.ReactNode;
}

const ServerProvider: React.FC<ServerProviderProps> = ({ children }) => {
  const router = useRouter();
  const { isLoading, data } = useCurrentServer();

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
