'use client';

import { cn } from '@/lib/utils';
import Avatar from '@/components/ui/avatar';

interface DMCardProps {
  username: string;
  imageUrl?: string;
  active?: boolean;
}

const DMCard: React.FC<DMCardProps> = ({ username, imageUrl, active }) => {
  return (
    <div
      className={cn(
        'flex items-center gap-3 relative w-full hover:bg-active-channel/50 p-2 transition-colors rounded-md cursor-pointer group',
        active && 'bg-active-channel'
      )}
    >
      <Avatar src={imageUrl} name={username} alt={username} isChannel />
      <p
        className={cn(
          'opacity-60 font-semibold group-hover:opacity-80 transition-opacity',
          active && 'opacity-100'
        )}
      >
        {username}
      </p>
    </div>
  );
};

export default DMCard;
