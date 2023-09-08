'use client';

import { useMemo } from 'react';

import useServer from '@/hooks/use-server';
import { Skeleton } from '@/components/ui/skeleton';
import ClientControl from '@/components/ui/client-control';
import ChannelCard from '@/components/channel/channel-card';
import CategorySubHeader from '@/components/channel/category-sub-header';
import ServerSidebarHeader from '@/components/server/server-sidebar-header';

import Content from './content';
import SidebarContainer from './sidebar-container';

interface ServerSidebarProps {
  serverId: string;
}

const ServerSidebar: React.FC<ServerSidebarProps> = ({ serverId }) => {
  const { data: server } = useServer(+serverId);

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
      <Content>
        {server.channels
          .filter((c) => !c.categoryId)
          .map((channel) => (
            <ChannelCard
              key={channel.id}
              name={channel.name}
              type={channel.type}
            />
          ))}
        {mappedCategories.map((category) => (
          <div key={category.id}>
            <CategorySubHeader name={category.name} />
            {category.channels.map((channel) => (
              <ChannelCard
                key={channel.id}
                name={channel.name}
                type={channel.type}
              />
            ))}
          </div>
        ))}
      </Content>
      <ClientControl />
    </SidebarContainer>
  );
};

export default ServerSidebar;
