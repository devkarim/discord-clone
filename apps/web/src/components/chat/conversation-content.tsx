'use client';

import { Loader2 } from 'lucide-react';

import useControl from '@/hooks/use-control';
import MediaRoom from '@/components/channel/media-room';
import useConversationMedia from '@/hooks/use-conversation-media';
import useCurrentConversation from '@/hooks/use-current-conversation';
import ConversationChatMessages from '@/components/chat/conversation-chat-messages';

import ConversationChatBox from './conversation-chat-box';

interface ConversationContentProps {}

const ConversationContent: React.FC<ConversationContentProps> = ({}) => {
  const conversationMedia = useConversationMedia();
  const isMuted = useControl((state) => state.isMuted);
  const { data: chat, isLoading: isConversationLoading } =
    useCurrentConversation();

  const onDisconnected = () => {
    conversationMedia.setVoice(false);
    conversationMedia.setVideo(false);
    conversationMedia.setConversationId(null);
  };

  if (isConversationLoading)
    return (
      <div className="flex flex-1 flex-col gap-3 items-center justify-center text-foreground/60 select-none">
        <Loader2 className="animate-spin h-8 w-8" />
        <p>Loading messages...</p>
      </div>
    );

  if (!chat)
    return (
      <div className="flex flex-1 flex-col gap-3 items-center justify-center text-foreground/60 select-none">
        Unable to load conversation or messages.
      </div>
    );

  if (chat.conversation.id === conversationMedia.conversationId) {
    if (conversationMedia.isVideo)
      return (
        <MediaRoom
          chatId={chat.conversation.id}
          video={true}
          voice={!isMuted}
          onDisconnected={onDisconnected}
        />
      );

    if (conversationMedia.isVoice)
      return (
        <MediaRoom
          chatId={chat.conversation.id}
          voice={!isMuted}
          onDisconnected={onDisconnected}
        />
      );
  }

  return (
    <div className="flex flex-col w-full h-full justify-between">
      <ConversationChatMessages />
      <ConversationChatBox />
    </div>
  );
};

export default ConversationContent;
