'use client';

import useUser from '@/hooks/use-user';
import useControl from '@/hooks/use-control';
import { FaGear } from '@react-icons/all-files/fa6/FaGear';
import { MdHeadset } from '@react-icons/all-files/md/MdHeadset';
import { MdHeadsetOff } from '@react-icons/all-files/md/MdHeadsetOff';
import { BiSolidMicrophone } from '@react-icons/all-files/bi/BiSolidMicrophone';
import { BiSolidMicrophoneOff } from '@react-icons/all-files/bi/BiSolidMicrophoneOff';

import Avatar from './avatar';

interface ClientControlProps {}

const ClientControl: React.FC<ClientControlProps> = ({}) => {
  const { data } = useUser();
  const control = useControl();

  if (!data) return null;

  const onMute = () => {
    control.toggleMute();
  };

  const onDeafen = () => {
    control.toggleDefean();
  };

  const onSettings = () => {};

  return (
    <div className="basis-0 w-full p-2 bg-sidebar/80">
      <div className="flex justify-between items-center">
        <div className="flex gap-3">
          <Avatar
            alt={data.username}
            name={data.username}
            src={data.imageUrl}
            parentClassName="bg-background overflow-visible"
          />
          <div>
            <p className="text-sm font-semibold opacity-90">{data.username}</p>
            <p className="text-xs opacity-60">Online</p>
          </div>
        </div>
        <div className="flex gap-3 items-center opacity-60 text-xl mr-2">
          <span className="inline-block cursor-pointer" onClick={onMute}>
            {control.isMuted ? (
              <BiSolidMicrophoneOff className="text-2xl text-destructive" />
            ) : (
              <BiSolidMicrophone className="text-2xl" />
            )}
          </span>
          <span className="inline-block cursor-pointer" onClick={onDeafen}>
            {control.isDeafen ? (
              <MdHeadsetOff className="text-2xl text-destructive" />
            ) : (
              <MdHeadset className="text-2xl" />
            )}
          </span>
          <span className="inline-block cursor-pointer" onClick={onSettings}>
            <FaGear />
          </span>
        </div>
      </div>
    </div>
  );
};

export default ClientControl;
