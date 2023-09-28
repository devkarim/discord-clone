import { MessageWithAuthor } from '@/types/db';
import { PendingMessage } from '@/hooks/use-pending-messages';

import Message from './message';

interface MessagesListProps {
  messages: MessageWithAuthor[];
  pendingMessages?: PendingMessage[];
}

const MessagesList: React.FC<MessagesListProps> = ({
  messages,
  pendingMessages = [],
}) => {
  return (
    <div className="flex flex-col-reverse gap-3">
      {pendingMessages.map((message) => (
        <Message key={message.pendingMessageId} message={message} />
      ))}
      {messages.map((message) => (
        <Message key={message.id} message={message} />
      ))}
    </div>
  );
};

export default MessagesList;
