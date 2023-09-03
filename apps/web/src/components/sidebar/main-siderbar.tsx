import { UserSession } from 'database';

import ServerSidebar from './servers-sidebar';
import SidebarContent from './sidebar-content';

interface MainSidebarProps {
  user: UserSession;
  children?: React.ReactNode;
}

const MainSidebar: React.FC<MainSidebarProps> = ({ user, children }) => {
  return (
    <div className="flex h-screen max-h-screen">
      {/* Servers Sidebar */}
      <ServerSidebar />
      {/* Content */}
      <SidebarContent>{children}</SidebarContent>
    </div>
  );
};

export default MainSidebar;
