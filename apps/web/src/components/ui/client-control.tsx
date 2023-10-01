'use client';

import { FaGear } from '@react-icons/all-files/fa6/FaGear';
import { MdHeadset } from '@react-icons/all-files/md/MdHeadset';
import { MdHeadsetOff } from '@react-icons/all-files/md/MdHeadsetOff';
import { BiSolidMicrophone } from '@react-icons/all-files/bi/BiSolidMicrophone';
import { BiSolidMicrophoneOff } from '@react-icons/all-files/bi/BiSolidMicrophoneOff';

import useUser from '@/hooks/use-user';
import useModal from '@/hooks/use-modal';
import useControl from '@/hooks/use-control';

import Avatar from './avatar';
import IconButton from './icon-button';

interface ClientControlProps {}

const ClientControl: React.FC<ClientControlProps> = ({}) => {
  const { data } = useUser();
  const showModal = useModal((state) => state.show);
  const control = useControl();

  if (!data) return null;

  const onMute = () => {
    control.toggleMute();
  };

  const onDeafen = () => {
    control.toggleDefean();
  };

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
        <div className="flex items-center text-[1.4rem]">
          <IconButton
            className="opacity-60"
            onClick={onMute}
            tooltip={control.isMuted ? 'Unmute' : 'Mute'}
            side="top"
            bg
          >
            {control.isMuted ? (
              <BiSolidMicrophoneOff className="text-destructive" />
            ) : (
              <BiSolidMicrophone />
            )}
          </IconButton>
          <IconButton
            className="opacity-60"
            onClick={onDeafen}
            tooltip={control.isDeafen ? 'Undefean' : 'Defean'}
            side="top"
            bg
          >
            {control.isDeafen ? (
              <MdHeadsetOff className="text-destructive" />
            ) : (
              <MdHeadset />
            )}
          </IconButton>
          <IconButton
            className="opacity-60 text-lg"
            onClick={() => showModal('user-settings')}
            tooltip={'User Settings'}
            side="top"
            bg
          >
            <FaGear />
          </IconButton>
        </div>
      </div>
    </div>
  );
};

export default ClientControl;
