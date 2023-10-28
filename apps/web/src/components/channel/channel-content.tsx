'use client';

import useControl from '@/hooks/use-control';
import useCurrentChannel from '@/hooks/use-current-channel';
import ChannelChatBox from '@/components/chat/channel-chat-box';
import ChannelChatMessages from '@/components/chat/channel-chat-messages';

import MediaRoom from './media-room';

interface ChannelContentProps {}

const ChannelContent: React.FC<ChannelContentProps> = ({}) => {
  const isMuted = useControl((state) => state.isMuted);
  const { data: currentChannel } = useCurrentChannel();

  if (!currentChannel) return null;

  if (currentChannel.type === 'TEXT') {
    return (
      <>
        <ChannelChatMessages />
        <ChannelChatBox />
      </>
    );
  }

  return (
    <MediaRoom
      chatId={currentChannel.id}
      video={currentChannel.type === 'VIDEO'}
      voice={!isMuted}
    />
  );
};

export default ChannelContent;
