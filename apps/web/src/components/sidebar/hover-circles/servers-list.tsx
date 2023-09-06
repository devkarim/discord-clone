'use client';

import Image from 'next/image';
import { usePathname } from 'next/navigation';

import useClientServers from '@/hooks/use-servers';
import HoverCircle from '@/components/ui/hover-circle';
import FirstLetter from '@/components/ui/first-letter';

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
            <FirstLetter text={server.name} />
          )}
        </HoverCircle>
      ))}
    </>
  );
};

export default ServersList;
