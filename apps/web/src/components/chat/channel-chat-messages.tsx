'use client';

import { Loader2 } from 'lucide-react';

import useChatSocket from '@/hooks/use-chat-socket';
import useCurrentChannel from '@/hooks/use-current-channel';
import useCurrentMessages from '@/hooks/use-current-messages';
import usePendingMessages from '@/hooks/use-pending-messages';

import ChatMessages from './chat-messages';

interface ChannelChatMessagesProps {}

const ChannelChatMessages: React.FC<ChannelChatMessagesProps> = ({}) => {
  const { data: channel, isLoading: isChannelLoading } = useCurrentChannel();
  const {
    data,
    isLoading: isMessagesLoading,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useCurrentMessages();
  const pendingMessages = usePendingMessages((state) =>
    state.getMessagesByChannel(channel?.id)
  );

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
      messages={data.pages.flatMap((page) => page.messages)}
      pendingMessages={pendingMessages}
      hasNextPage={hasNextPage}
      isFetchingNextPage={isFetchingNextPage}
      fetchNextPage={fetchNextPage}
      currentPageCount={data.pages[0].messages.length + pendingMessages.length}
    />
  );
};

export default ChannelChatMessages;
