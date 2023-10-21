'use client';

import { Loader2 } from 'lucide-react';

import useChatSocket from '@/hooks/use-chat-socket';
import useCurrentChannel from '@/hooks/use-current-channel';
import useCurrentChannelMessages from '@/hooks/use-current-channel-messages';

import ChatMessages from './chat-messages';
import ChannelMessagesList from './channel-messages-list';

interface ChannelChatMessagesProps {}

const ChannelChatMessages: React.FC<ChannelChatMessagesProps> = ({}) => {
  const { data: channel, isLoading: isChannelLoading } = useCurrentChannel();
  const {
    data,
    isLoading: isMessagesLoading,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useCurrentChannelMessages();

  useChatSocket(channel?.id);

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
      hasNextPage={hasNextPage}
      isFetchingNextPage={isFetchingNextPage}
      fetchNextPage={fetchNextPage}
      currentPageCount={data.pages[0].messages.length}
    >
      <ChannelMessagesList
        messages={data.pages.flatMap((page) => page.messages)}
      />
    </ChatMessages>
  );
};

export default ChannelChatMessages;
