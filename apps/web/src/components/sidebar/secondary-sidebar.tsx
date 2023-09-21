'use client';

import { useParams, usePathname } from 'next/navigation';

import DMSidebar from './dm-sidebar';
import ServerSidebar from './server-sidebar';

interface SecondarySidebarProps {}

const SecondarySidebar: React.FC<SecondarySidebarProps> = ({}) => {
  const { serverId } = useParams();
  const pathname = usePathname();

  if (serverId && typeof serverId !== 'string')
    throw new Error('serverId must be a string');

  return serverId ? (
    <ServerSidebar serverId={serverId} />
  ) : pathname != '/explore' ? (
    <DMSidebar />
  ) : null;
};

export default SecondarySidebar;
