'use client';

import { Status } from 'database';

import { cn } from '@/lib/utils';
import Avatar from '@/components/ui/avatar';
import SidebarCard from '@/components/sidebar/sidebar-card';

interface DMCardProps {
  username: string;
  imageUrl?: string;
  active?: boolean;
  status?: Status;
}

const DMCard: React.FC<DMCardProps> = ({
  username,
  imageUrl,
  active,
  status,
}) => {
  return (
    <SidebarCard active={active}>
      <Avatar
        src={imageUrl}
        name={username}
        alt={username}
        status={status}
        isChannel
      />
      <p
        className={cn(
          'opacity-60 font-semibold group-hover:opacity-80 transition-opacity',
          active && 'opacity-100'
        )}
      >
        {username}
      </p>
    </SidebarCard>
  );
};

export default DMCard;
