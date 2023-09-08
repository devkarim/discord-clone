'use client';

import { useParams } from 'next/navigation';

import MobileSidebar from '@/components/sidebar/mobile-sidebar';

import UserHeader from './user-header';
import ChannelHeader from './channel-header';

interface ChatHeaderProps {}

const ChatHeader: React.FC<ChatHeaderProps> = ({}) => {
  const { channelId, conversationId } = useParams();

  return (
    <div className="w-full flex items-center px-3 py-3 h-16 shadow-md select-none">
      <MobileSidebar />
      {conversationId && typeof conversationId == 'string' ? (
        <UserHeader conversationId={conversationId} />
      ) : channelId && typeof channelId == 'string' ? (
        <ChannelHeader channelId={channelId} />
      ) : (
        <h1 className="font-semibold text-xl px-2">Welcome back</h1>
      )}
    </div>
  );
};

export default ChatHeader;
