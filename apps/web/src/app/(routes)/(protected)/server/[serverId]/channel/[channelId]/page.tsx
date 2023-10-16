import ChatContainer from '@/components/chat/chat-container';
import ChannelChatBox from '@/components/chat/channel-chat-box';
import MembersSidebar from '@/components/member/members-sidebar';
import ChannelChatMessages from '@/components/chat/channel-chat-messages';

interface ChannelPageProps {}

const ChannelPage: React.FC<ChannelPageProps> = ({}) => {
  return (
    <ChatContainer>
      <div className="flex flex-col w-full h-full justify-between">
        <ChannelChatMessages />
        <ChannelChatBox />
      </div>
      <MembersSidebar />
    </ChatContainer>
  );
};

export default ChannelPage;
