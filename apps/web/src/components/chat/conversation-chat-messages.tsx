'use client';

import { Loader2 } from 'lucide-react';

import useChatSocket from '@/hooks/use-chat-socket';
import useCurrentConversation from '@/hooks/use-current-conversation';
import useCurrentConversationMessages from '@/hooks/use-current-conversation-messages';

import ChatMessages from './chat-messages';
import ConversationMessagesList from './conversation-messages-list';

interface ConversationChatMessagesProps {}

const ConversationChatMessages: React.FC<
  ConversationChatMessagesProps
> = ({}) => {
  const { data: chat, isLoading: isConversationLoading } =
    useCurrentConversation();

  const {
    data,
    isLoading: isMessagesLoading,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useCurrentConversationMessages();

  useChatSocket(chat?.conversation.id);

  if (isConversationLoading || isMessagesLoading)
    return (
      <div className="flex flex-1 flex-col gap-3 items-center justify-center text-foreground/60 select-none">
        <Loader2 className="animate-spin h-8 w-8" />
        <p>Loading messages...</p>
      </div>
    );

  if (!chat || !data)
    return (
      <div className="flex flex-1 flex-col gap-3 items-center justify-center text-foreground/60 select-none">
        Unable to load conversation or messages.
      </div>
    );

  return (
    <ChatMessages
      name={chat.user.name || chat.user.username}
      username={chat.user.username}
      imageUrl={chat.user.imageUrl}
      hasNextPage={hasNextPage}
      isFetchingNextPage={isFetchingNextPage}
      fetchNextPage={fetchNextPage}
      currentPageCount={data.pages[0].messages.length}
    >
      <ConversationMessagesList
        messages={data.pages.flatMap((page) => page.messages)}
      />
    </ChatMessages>
  );
};

export default ConversationChatMessages;
