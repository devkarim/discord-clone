import { FullDirectMessage } from '@/types/db';

import MessagesContainer from './messages-container';
import ConversationMessage from './conversation-message';

interface ConversationMessagesListProps {
  messages: FullDirectMessage[];
}

const ConversationMessagesList: React.FC<ConversationMessagesListProps> = ({
  messages,
}) => {
  return (
    <MessagesContainer>
      {messages.map((message) => (
        <ConversationMessage key={message.id} message={message} />
      ))}
    </MessagesContainer>
  );
};

export default ConversationMessagesList;
