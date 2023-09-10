'use client';

import { useMemo } from 'react';

import useServer from '@/hooks/use-server';
import { Skeleton } from '@/components/ui/skeleton';
import ClientControl from '@/components/ui/client-control';
import ChannelCard from '@/components/channel/channel-card';
import ChannelCategory from '@/components/channel/channel-category';
import ServerSidebarHeader from '@/components/server/server-sidebar-header';

import Content from './content';
import SidebarContainer from './sidebar-container';
import ChannelsList from '../channel/channels-list';

interface ServerSidebarProps {
  serverId: string;
}

const ServerSidebar: React.FC<ServerSidebarProps> = ({ serverId }) => {
  const { data: server } = useServer(serverId);

  const mappedCategories = useMemo(() => {
    if (!server) return [];
    return server.categories.map((category) => ({
      ...category,
      channels: server.channels.filter((c) => c.categoryId == category.id),
    }));
  }, [server]);

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
      <ServerSidebarHeader id={server.id} name={server.name} />
      <Content className="space-y-0">
        <div className="space-y-0">
          <ChannelsList
            channels={server.channels.filter((c) => !c.categoryId)}
          />
        </div>
        {mappedCategories.map((category) => (
          <ChannelCategory key={category.id} category={category} />
        ))}
      </Content>
      <ClientControl />
    </SidebarContainer>
  );
};

export default ServerSidebar;
