import MobileSidebar from '@/components/sidebar/mobile-sidebar';

import UserHeader from './user-header';

interface ChatHeaderProps {}

const ChatHeader: React.FC<ChatHeaderProps> = ({}) => {
  return (
    <div className="w-full flex items-center px-3 py-3 shadow-md select-none">
      <MobileSidebar />
      <UserHeader username="Karim" />
    </div>
  );
};

export default ChatHeader;
