'use client';

import Image from 'next/image';

import useClientServers from '@/hooks/use-servers';
import HoverCircle from '@/components/ui/hover-circle';
import FirstLetter from '@/components/ui/first-letter';

interface ServersListProps {}

const ServersList: React.FC<ServersListProps> = ({}) => {
  const { isLoading, data: servers } = useClientServers();

  if (isLoading || !servers) return null;

  return (
    <>
      {servers.map((server) => (
        <HoverCircle
          className="group"
          key={server.id}
          tooltip={server.name}
          activeRoute={`/server/${server.id}`}
          startsWithRoute={`/server/${server.id}`}
        >
          {server.imageUrl ? (
            <Image
              src={server.imageUrl}
              alt={server.name}
              fill
              className="object-cover"
            />
          ) : (
            <FirstLetter
              text={server.name}
              className="group-[active]:opacity-100"
            />
          )}
        </HoverCircle>
      ))}
    </>
  );
};

export default ServersList;
