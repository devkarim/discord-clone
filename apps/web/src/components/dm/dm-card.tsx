'use client';

import { cn } from '@/lib/utils';
import Avatar from '@/components/ui/avatar';
import SidebarCard from '@/components/sidebar/sidebar-card';

interface DMCardProps {
  username: string;
  imageUrl?: string;
  active?: boolean;
}

const DMCard: React.FC<DMCardProps> = ({ username, imageUrl, active }) => {
  return (
    <SidebarCard active={active}>
      <Avatar src={imageUrl} name={username} alt={username} isChannel />
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
