'use client';

import { FaGear } from '@react-icons/all-files/fa6/FaGear';
import { BiSolidMicrophone } from '@react-icons/all-files/bi/BiSolidMicrophone';
import { BiSolidMicrophoneOff } from '@react-icons/all-files/bi/BiSolidMicrophoneOff';

import useUser from '@/hooks/use-user';
import useModal from '@/hooks/use-modal';
import useControl from '@/hooks/use-control';

import Avatar from './avatar';
import IconButton from './icon-button';

interface ClientControlProps {}

const ClientControl: React.FC<ClientControlProps> = ({}) => {
  const { data: user } = useUser();
  const showModal = useModal((state) => state.show);
  const control = useControl();

  const isMuted = control.isMuted;

  if (!user) return null;

  const onMute = () => {
    control.toggleMute();
  };

  return (
    <div className="basis-0 w-full p-2 bg-sidebar/80">
      <div className="flex justify-between items-center">
        <div className="flex gap-3">
          <Avatar
            alt={user.username}
            name={user.username}
            src={user.imageUrl}
            status={user.status}
            parentClassName="bg-background"
          />
          <div>
            <p className="text-sm font-semibold opacity-90">
              {user.name || user.username}
            </p>
            <p className="text-xs opacity-60">
              {user.status == 'ONLINE' ? 'Online' : 'Offline'}
            </p>
          </div>
        </div>
        <div className="flex items-center text-[1.4rem]">
          <IconButton
            className="opacity-60"
            onClick={onMute}
            tooltip={isMuted ? 'Unmute' : 'Mute'}
            side="top"
            bg
          >
            {isMuted ? (
              <BiSolidMicrophoneOff className="text-destructive" />
            ) : (
              <BiSolidMicrophone />
            )}
          </IconButton>
          {/* <IconButton
            className="opacity-60"
            onClick={onDeafen}
            tooltip={isDeafen ? 'Undefean' : 'Defean'}
            side="top"
            bg
          >
            {isDeafen ? (
              <MdHeadsetOff className="text-destructive" />
            ) : (
              <MdHeadset />
            )}
          </IconButton> */}
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
