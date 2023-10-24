import { FaVideo } from '@react-icons/all-files/fa6/FaVideo';
import { HiSpeakerWave } from '@react-icons/all-files/hi2/HiSpeakerWave';

import { ChannelType } from 'database';

import Hashtag from '@/components/ui/hashtag';
import { cn } from '@/lib/utils';

interface ChannelTypeIconProps extends React.HTMLAttributes<HTMLSpanElement> {
  type: ChannelType;
}

const ChannelTypeIcon: React.FC<ChannelTypeIconProps> = ({
  type,
  className,
  ...props
}) => {
  return (
    <span className={cn('text-2xl text-foreground/50', className)} {...props}>
      {type == 'VIDEO' ? (
        <FaVideo />
      ) : type == 'VOICE' ? (
        <HiSpeakerWave />
      ) : (
        <Hashtag />
      )}
    </span>
  );
};

export default ChannelTypeIcon;
