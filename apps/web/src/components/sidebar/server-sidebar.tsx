'use client';

import useServer from '@/hooks/use-server';
import Hashtag from '@/components/ui/hashtag';
import ServerSidebarHeader from '@/components/server/server-sidebar-header';

import SidebarContainer from './sidebar-container';
import ClientControl from '../ui/client-control';
import Content from './content';
import { Skeleton } from '../ui/skeleton';
import SidebarSubHeader from './sidebar-sub-header';
import SidebarCard from './sidebar-card';

interface ServerSidebarProps {
  serverId: string;
}

const ServerSidebar: React.FC<ServerSidebarProps> = ({ serverId }) => {
  const { data: server } = useServer(+serverId);

  if (!server)
    return (
      <SidebarContainer className="px-4 py-2 space-y-2">
        <Skeleton className="w-full h-16 bg-background" />
        <Skeleton className="w-full h-full bg-background" />
        <Skeleton className="w-full h-16 bg-background" />
      </SidebarContainer>
    );

  return (
    <SidebarContainer>
      <ServerSidebarHeader name={server.name} />
      <Content>
        <SidebarSubHeader
          label="information"
          tooltip="Create Channel"
          showAddButton
        />
        <div className="space-y-1">
          <SidebarCard className="opacity-60 hover:opacity-100">
            <Hashtag />
            <p className="font-semibold">welcome</p>
          </SidebarCard>
        </div>
      </Content>
      <ClientControl />
    </SidebarContainer>
  );
};

export default ServerSidebar;
