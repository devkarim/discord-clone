'use client';

import { Loader2 } from 'lucide-react';

import useCurrentChannel from '@/hooks/use-current-channel';
import useCurrentMessages from '@/hooks/use-current-messages';

import ChatMessages from './chat-messages';

interface ChannelChatMessagesProps {}

const ChannelChatMessages: React.FC<ChannelChatMessagesProps> = ({}) => {
  const { data: channel, isLoading: isChannelLoading } = useCurrentChannel();
  const { data, isLoading: isMessagesLoading } = useCurrentMessages();

  if (isChannelLoading || isMessagesLoading)
    return (
      <div className="flex flex-1 flex-col gap-3 items-center justify-center text-foreground/60 select-none">
        <Loader2 className="animate-spin h-8 w-8" />
        <p>Loading messages...</p>
      </div>
    );

  if (!channel || !data)
    return (
      <div className="flex flex-1 flex-col gap-3 items-center justify-center text-foreground/60 select-none">
        Unable to load channel or messages.
      </div>
    );

  return (
    <ChatMessages
      name={'#' + channel.name}
      isChannel
      messages={data.messages}
    />
  );
};

export default ChannelChatMessages;
