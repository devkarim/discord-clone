'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

import { Server } from 'database';

import { getUserServers } from '@/services/server';
import HoverCircle from '@/components/ui/hover-circle';

interface ServersListProps {}

const ServersList: React.FC<ServersListProps> = ({}) => {
  const [servers, setServers] = useState<Server[]>([]);

  useEffect(() => {
    getUserServers().then((servers) => setServers(servers));
  }, []);

  return (
    <>
      {servers.map((server) => (
        <HoverCircle key={server.id} tooltip={server.name}>
          {server.imageUrl ? (
            <Image
              src={server.imageUrl}
              alt={server.name}
              fill
              className="object-cover"
            />
          ) : (
            <p className="opacity-60 text-2xl uppercase">{server.name[0]}</p>
          )}
        </HoverCircle>
      ))}
    </>
  );
};

export default ServersList;
