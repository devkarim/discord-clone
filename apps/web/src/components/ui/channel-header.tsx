'use client';

import { FaUserFriends } from '@react-icons/all-files/fa/FaUserFriends';

import useUI from '@/hooks/use-ui';
import useCurrentChannel from '@/hooks/use-current-channel';
import ChannelTypeIcon from '@/components/channel/channel-type-icon';

import IconButton from './icon-button';

interface ChannelHeaderProps {}

const ChannelHeader: React.FC<ChannelHeaderProps> = ({}) => {
  const { data: channel } = useCurrentChannel();
  const isMembersListOpen = useUI((state) => state.isMemberSidebarOpen);
  const isMemberSidebarMobileOpen = useUI(
    (state) => state.isMemberSidebarMobileOpen
  );
  const setMembersListOpen = useUI((state) => state.setMemberSidebarOpen);
  const setMemberSidebarMobileOpen = useUI(
    (state) => state.setMemberSidebarMobileOpen
  );

  if (!channel) return null;

  return (
    <div className="flex w-full items-center justify-between mx-3">
      <div className="flex gap-3 items-center">
        <ChannelTypeIcon type={channel.type} />
        <p className="text-lg font-medium">{channel.name}</p>
      </div>
      <div className="text-3xl flex">
        {/* Show / Hide Member List */}
        <IconButton
          side="bottom"
          tooltip={`${isMembersListOpen ? 'Hide' : 'Show'} Member List`}
          active={isMembersListOpen}
          className="hidden md:block"
          onClick={() => setMembersListOpen(!isMembersListOpen)}
        >
          <FaUserFriends />
        </IconButton>
        <IconButton
          side="bottom"
          tooltip={`${isMemberSidebarMobileOpen ? 'Hide' : 'Show'} Member List`}
          active={isMemberSidebarMobileOpen}
          className="md:hidden"
          onClick={() => setMemberSidebarMobileOpen(!isMemberSidebarMobileOpen)}
        >
          <FaUserFriends />
        </IconButton>
      </div>
    </div>
  );
};

export default ChannelHeader;
