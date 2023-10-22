import DMList from '@/components/dm/dm-list';
import ClientControl from '@/components/ui/client-control';

import SidebarContainer from './sidebar-container';
import Content from './content';
import SidebarSubHeader from './sidebar-sub-header';

interface DMSidebarProps {}

const DMSidebar: React.FC<DMSidebarProps> = ({}) => {
  return (
    <SidebarContainer>
      <Content>
        <SidebarSubHeader label="Direct Messages" />
        <DMList />
      </Content>
      <ClientControl />
    </SidebarContainer>
  );
};

export default DMSidebar;
