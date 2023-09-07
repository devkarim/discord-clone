import { UserSession } from 'database';

import ChatBox from '@/components/chat/chat-box';
import ChatHeader from '@/components/ui/chat-header';

import ServerSidebar from './servers-sidebar';
import SidebarContent from './sidebar-content';
import SecondarySidebar from './secondary-sidebar';

interface MainSidebarProps {
  user: UserSession;
  children?: React.ReactNode;
}

const MainSidebar: React.FC<MainSidebarProps> = ({ user, children }) => {
  return (
    <div className="flex h-screen max-h-screen">
      {/* Servers Sidebar */}
      <div className="hidden md:flex">
        <ServerSidebar />
        <SecondarySidebar />
      </div>
      {/* Content */}
      <SidebarContent>
        <div>
          <ChatHeader />
          {children}
        </div>
        <ChatBox />
      </SidebarContent>
    </div>
  );
};

export default MainSidebar;
