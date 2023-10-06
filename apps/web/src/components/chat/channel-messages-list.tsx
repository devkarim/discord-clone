import { MessageWithAuthor } from '@/types/db';
import { PendingMessage } from '@/hooks/use-pending-messages';

import ChannelMessage from './channel-message';
import MessagesContainer from './messages-container';

interface ChannelMessagesListProps {
  messages: MessageWithAuthor[];
  pendingMessages?: PendingMessage[];
}

const ChannelMessagesList: React.FC<ChannelMessagesListProps> = ({
  messages,
  pendingMessages = [],
}) => {
  return (
    <MessagesContainer>
      {pendingMessages.map((message) => (
        <ChannelMessage key={message.pendingMessageId} message={message} />
      ))}
      {messages.map((message) => (
        <ChannelMessage key={message.id} message={message} />
      ))}
    </MessagesContainer>
  );
};

export default ChannelMessagesList;
