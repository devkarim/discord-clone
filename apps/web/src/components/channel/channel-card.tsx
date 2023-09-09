'use client';

import { HiSpeakerWave } from '@react-icons/all-files/hi2/HiSpeakerWave';
import { FaVideo } from '@react-icons/all-files/fa6/FaVideo';

import { ChannelType } from 'database';

import Hashtag from '@/components/ui/hashtag';
import SidebarCard from '@/components/sidebar/sidebar-card';

interface ChannelCardProps {
  name: string;
  type: ChannelType;
}

const ChannelCard: React.FC<ChannelCardProps> = ({ name, type }) => {
  return (
    <SidebarCard className="opacity-60 hover:opacity-100 gap-2">
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
