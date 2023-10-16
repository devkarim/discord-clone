import ChatContainer from '@/components/chat/chat-container';
import ConversationChatBox from '@/components/chat/conversation-chat-box';
import ConversationChatMessages from '@/components/chat/conversation-chat-messages';

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
      <div className="flex flex-col w-full h-full justify-between">
        <ConversationChatMessages />
        <ConversationChatBox />
      </div>
    </ChatContainer>
  );
};

export default UserConversationPage;
