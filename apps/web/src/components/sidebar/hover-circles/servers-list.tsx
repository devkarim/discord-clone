'use client';

import Image from 'next/image';

import HoverCircle from '@/components/ui/hover-circle';
import useClientServers from '@/hooks/use-servers';

interface ServersListProps {}

const ServersList: React.FC<ServersListProps> = ({}) => {
  const { isLoading, data: servers } = useClientServers();

  if (isLoading || !servers) return null;

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
