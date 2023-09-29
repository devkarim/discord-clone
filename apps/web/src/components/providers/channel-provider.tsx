'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

import useCurrentChannel from '@/hooks/use-current-channel';

interface ChannelProviderProps {
  children?: React.ReactNode;
}

const ChannelProvider: React.FC<ChannelProviderProps> = ({ children }) => {
  const router = useRouter();
  const { isLoading, data } = useCurrentChannel();

  useEffect(() => {
    if (isLoading) return;
    if (data) return;
    router.replace('/');
  }, [isLoading, data, router]);

  if (isLoading) return null;

  if (!data) return null;

  return <>{children}</>;
};

export default ChannelProvider;
