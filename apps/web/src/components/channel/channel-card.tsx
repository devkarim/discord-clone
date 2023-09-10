'use client';

import { HiSpeakerWave } from '@react-icons/all-files/hi2/HiSpeakerWave';
import { FaVideo } from '@react-icons/all-files/fa6/FaVideo';

import { ChannelType } from 'database';

import { cn } from '@/lib/utils';
import Hashtag from '@/components/ui/hashtag';
import SidebarCard from '@/components/sidebar/sidebar-card';

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
      {type == 'VIDEO' ? (
        <FaVideo className="text-lg" />
      ) : type == 'VOICE' ? (
        <HiSpeakerWave className="text-xl" />
      ) : (
        <Hashtag className="text-lg" />
      )}
      <p className="font-semibold lowercase">{name}</p>
    </SidebarCard>
  );
};

export default ChannelCard;
