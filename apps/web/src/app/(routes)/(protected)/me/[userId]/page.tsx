import ChatContainer from '@/components/chat/chat-container';
import ConversationContent from '@/components/chat/conversation-content';

interface UserConversationPageProps {
  params: {
    userId: string;
  };
}

const UserConversationPage: React.FC<UserConversationPageProps> = ({
  params: { userId },
}) => {
  return (
    <ChatContainer>
      <ConversationContent />
    </ChatContainer>
  );
};

export default UserConversationPage;
