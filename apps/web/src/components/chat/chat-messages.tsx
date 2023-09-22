'use client';

import { MessageWithAuthor } from '@/types/db';
import ChatWelcome from './chat-welcome';

interface ChatMessagesProps {
  name: string;
  isChannel?: boolean;
  messages: MessageWithAuthor[];
}

const ChatMessages: React.FC<ChatMessagesProps> = ({ name, isChannel }) => {
  return (
    <div className="px-6 mt-auto">
      <ChatWelcome name={name} isChannel={isChannel} />
    </div>
  );
};

export default ChatMessages;
