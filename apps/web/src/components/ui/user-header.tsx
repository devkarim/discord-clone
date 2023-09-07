'use client';

import { FaPhoneVolume } from '@react-icons/all-files/fa6/FaPhoneVolume';
import { FaVideo } from '@react-icons/all-files/fa6/FaVideo';

import Avatar from './avatar';
import IconButton from './icon-button';

interface UserHeaderProps {
  username: string;
}

const UserHeader: React.FC<UserHeaderProps> = ({ username }) => {
  return (
    <div className="flex w-full px-3 justify-between">
      <div className="flex gap-4 items-center">
        <Avatar
          name={username}
          alt="user-header"
          parentClassName="h-8 w-8"
          firstLetterClassName="text-base"
          indicatorClassName="ring-2 w-[0.7rem] h-[0.7rem]"
        />
        <p className="font-semibold text-lg">{username}</p>
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
