import ChatContainer from '@/components/chat/chat-container';
import MembersSidebar from '@/components/member/members-sidebar';
import ChannelContent from '@/components/channel/channel-content';

interface ChannelPageProps {}

const ChannelPage: React.FC<ChannelPageProps> = ({}) => {
  return (
    <ChatContainer>
      <div className="flex flex-col w-full h-full justify-between">
        <ChannelContent />
      </div>
      <MembersSidebar />
    </ChatContainer>
  );
};

export default ChannelPage;
