import { UserSession } from 'database';

import ServerSidebar from './servers-sidebar';
import SidebarContent from './sidebar-content';
import MobileSidebar from './mobile-sidebar';
import SecondarySidebar from './secondary-sidebar';

interface MainSidebarProps {
  user: UserSession;
  children?: React.ReactNode;
}

const MainSidebar: React.FC<MainSidebarProps> = ({ user, children }) => {
  return (
    <div className="flex h-screen max-h-screen">
      {/* Servers Sidebar */}
      <MobileSidebar />
      <div className="hidden lg:flex">
        <ServerSidebar />
        <SecondarySidebar />
      </div>
      {/* Content */}
      <SidebarContent>{children}</SidebarContent>
    </div>
  );
};

export default MainSidebar;
