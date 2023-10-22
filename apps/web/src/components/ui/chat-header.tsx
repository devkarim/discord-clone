'use client';

import { useParams, usePathname } from 'next/navigation';

import MobileSidebar from '@/components/sidebar/mobile-sidebar';

import UserHeader from './user-header';
import ChannelHeader from './channel-header';

interface ChatHeaderProps {}

const ChatHeader: React.FC<ChatHeaderProps> = ({}) => {
  const { channelId, userId, conversationId } = useParams();
  const pathname = usePathname();

  const isExplore = pathname == '/explore';

  return (
    <div className="w-full flex items-center px-3 py-3 h-16 shadow-md select-none">
      <MobileSidebar />
      {conversationId || userId ? (
        <UserHeader />
      ) : channelId && typeof channelId == 'string' ? (
        <ChannelHeader />
      ) : (
        <h1 className="font-semibold text-xl px-2">
          {isExplore ? 'Discover new servers here' : 'Welcome back'}
        </h1>
      )}
    </div>
  );
};

export default ChatHeader;
