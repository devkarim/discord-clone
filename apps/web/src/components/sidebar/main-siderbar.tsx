import { UserSession } from 'database';

import Sidebar from './sidebar';
import SidebarContent from './sidebar-content';

interface MainSidebarProps {
  user: UserSession;
  children?: React.ReactNode;
}

const MainSidebar: React.FC<MainSidebarProps> = ({ user, children }) => {
  return (
    <div className="flex h-screen max-h-screen">
      {/* Sidebar */}
      <Sidebar />
      {/* Content */}
      <SidebarContent>{children}</SidebarContent>
    </div>
  );
};

export default MainSidebar;
