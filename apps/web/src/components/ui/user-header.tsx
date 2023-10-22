'use client';

import { FaPhoneVolume } from '@react-icons/all-files/fa6/FaPhoneVolume';
import { FaVideo } from '@react-icons/all-files/fa6/FaVideo';

import Avatar from './avatar';
import IconButton from './icon-button';
import useCurrentConversation from '@/hooks/use-current-conversation';
import { Skeleton } from './skeleton';

interface UserHeaderProps {}

const UserHeader: React.FC<UserHeaderProps> = ({}) => {
  const { data } = useCurrentConversation();

  if (!data) return <Skeleton className="h-full w-full" />;

  return (
    <div className="flex w-full px-2 justify-between">
      <div className="flex gap-3 items-center">
        <Avatar
          name={data.user.name || data.user.username}
          status={data.user.status}
          alt="user-header"
          parentClassName="h-8 w-8"
          firstLetterClassName="text-base"
          indicatorClassName="ring-2 w-[0.7rem] h-[0.7rem]"
        />
        <p className="font-semibold">{data.user.name || data.user.username}</p>
      </div>
      <div className="flex gap-6 text-xl">
        <IconButton tooltip="Start Voice Call" side="bottom">
          <FaPhoneVolume />
        </IconButton>
        <IconButton tooltip="Start Video Call" side="bottom">
          <FaVideo />
        </IconButton>
      </div>
    </div>
  );
};

export default UserHeader;
