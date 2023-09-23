import { MessageWithAuthor } from '@/types/db';

import Message from './message';

interface MessagesListProps {
  messages: MessageWithAuthor[];
}

const MessagesList: React.FC<MessagesListProps> = ({ messages }) => {
  return (
    <div className="flex flex-col-reverse gap-3">
      {messages.map((message) => (
        <Message key={message.id} message={message} />
      ))}
    </div>
  );
};

export default MessagesList;
