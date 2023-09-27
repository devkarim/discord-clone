'use client';

import useCurrentChannel from '@/hooks/use-current-channel';

import ChatBox from './chat-box';

interface ChannelChatBoxProps {}

const ChannelChatBox: React.FC<ChannelChatBoxProps> = ({}) => {
  const { data: channel } = useCurrentChannel();

  if (!channel) return null;

  return <ChatBox chatId={channel.id} name={'#' + channel.name} />;
};

export default ChannelChatBox;
