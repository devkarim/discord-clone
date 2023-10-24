'use client';

import { ChannelType } from 'database';

import { cn } from '@/lib/utils';
import SidebarCard from '@/components/sidebar/sidebar-card';

import ChannelTypeIcon from './channel-type-icon';

interface ChannelCardProps {
  name: string;
  type: ChannelType;
  active?: boolean;
  onClick?: () => void;
}

const ChannelCard: React.FC<ChannelCardProps> = ({
  name,
  type,
  active,
  onClick,
}) => {
  return (
    <SidebarCard
      className={cn(
        'text-foreground/60 hover:text-foreground/90 transition-colors gap-2',
        active && 'text-foreground/90'
      )}
      active={active}
      onClick={onClick}
    >
      <ChannelTypeIcon type={type} className="w-6 text-xl" />
      <p className={cn('font-semibold', type == 'TEXT' && 'lowercase')}>
        {name}
      </p>
    </SidebarCard>
  );
};

export default ChannelCard;
