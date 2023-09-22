import ChannelChatBox from '@/components/chat/channel-chat-box';
import MembersSidebar from '@/components/member/members-sidebar';
import ChannelChatMessages from '@/components/chat/channel-chat-messages';

interface ChannelPageProps {}

const ChannelPage: React.FC<ChannelPageProps> = ({}) => {
  return (
    <div className="flex h-full overflow-auto scrollbar-thin scrollbar-track-channels scrollbar-thumb-black/30 scrollbar-thumb-rounded-full">
      <div className="flex flex-col w-full h-full justify-between">
        <ChannelChatMessages />
        <ChannelChatBox />
      </div>
      <MembersSidebar />
    </div>
  );
};

export default ChannelPage;
