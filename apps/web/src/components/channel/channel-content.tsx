'use client';

import useCurrentChannel from '@/hooks/use-current-channel';
import ChannelChatBox from '@/components/chat/channel-chat-box';
import ChannelChatMessages from '@/components/chat/channel-chat-messages';

import MediaRoom from './media-room';

interface ChannelContentProps {}

const ChannelContent: React.FC<ChannelContentProps> = ({}) => {
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
      voice={currentChannel.type === 'VOICE'}
    />
  );
};

export default ChannelContent;
