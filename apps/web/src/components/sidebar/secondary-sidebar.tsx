'use client';

import { useParams } from 'next/navigation';

import DMSidebar from './dm-sidebar';
import ServerSidebar from './server-sidebar';

interface SecondarySidebarProps {}

const SecondarySidebar: React.FC<SecondarySidebarProps> = ({}) => {
  const { serverId } = useParams();

  if (serverId && typeof serverId !== 'string')
    throw new Error('serverId must be a string');

  return serverId ? <ServerSidebar serverId={serverId} /> : <DMSidebar />;
};

export default SecondarySidebar;
