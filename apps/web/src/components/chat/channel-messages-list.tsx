import { MessageWithAuthor } from '@/types/db';

import ChannelMessage from './channel-message';
import MessagesContainer from './messages-container';

interface ChannelMessagesListProps {
  messages: MessageWithAuthor[];
}

const ChannelMessagesList: React.FC<ChannelMessagesListProps> = ({
  messages,
}) => {
  return (
    <MessagesContainer>
      {messages.map((message) => (
        <ChannelMessage key={message.id} message={message} />
      ))}
    </MessagesContainer>
  );
};

export default ChannelMessagesList;
