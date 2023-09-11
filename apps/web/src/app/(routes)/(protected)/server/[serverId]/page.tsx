'use client';

import { useEffect } from 'react';

import useCurrentServer from '@/hooks/use-current-server';
import { useRouter } from 'next/navigation';

interface ServerPageProps {}

const ServerPage: React.FC<ServerPageProps> = ({}) => {
  const router = useRouter();
  const { data: server } = useCurrentServer();

  useEffect(() => {
    if (!server) return;
    const channel = server.channels[0];
    if (!channel) return;
    router.push(`/server/${server.id}/channel/${channel.id}`);
  }, [server, router]);

  return <div className="p-6">Redirecting you to first channel...</div>;
};

export default ServerPage;
