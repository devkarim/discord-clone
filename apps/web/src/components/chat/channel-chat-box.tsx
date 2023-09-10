'use client';

import useCurrentChannel from '@/hooks/use-current-channel';

import ChatBox from './chat-box';

interface ChannelChatBoxProps {}

const ChannelChatBox: React.FC<ChannelChatBoxProps> = ({}) => {
  const { data: channel } = useCurrentChannel();

  return <ChatBox channel={channel} />;
};

export default ChannelChatBox;
