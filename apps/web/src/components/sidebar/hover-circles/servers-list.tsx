'use client';

import Image from 'next/image';
import { usePathname } from 'next/navigation';

import HoverCircle from '@/components/ui/hover-circle';
import useClientServers from '@/hooks/use-servers';

interface ServersListProps {}

const ServersList: React.FC<ServersListProps> = ({}) => {
  const { isLoading, data: servers } = useClientServers();
  const pathname = usePathname();

  if (isLoading || !servers) return null;

  return (
    <>
      {servers.map((server) => (
        <HoverCircle
          className="group"
          key={server.id}
          tooltip={server.name}
          active={pathname == `/server/${server.id}`}
        >
          {server.imageUrl ? (
            <Image
              src={server.imageUrl}
              alt={server.name}
              fill
              className="object-cover"
            />
          ) : (
            <p className="opacity-60 text-2xl uppercase group-hover:opacity-100 transition-opacity">
              {server.name[0]}
            </p>
          )}
        </HoverCircle>
      ))}
    </>
  );
};

export default ServersList;
