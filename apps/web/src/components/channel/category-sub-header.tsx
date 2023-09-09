import { ChevronDown, ChevronRight } from 'lucide-react';

import useModal from '@/hooks/use-modal';
import SidebarSubHeader from '@/components/sidebar/sidebar-sub-header';

interface CategorySubHeaderProps {
  name: string;
  onCollapse?: () => void;
  isCollapsed?: boolean;
}

const CategorySubHeader: React.FC<CategorySubHeaderProps> = ({
  name,
  onCollapse,
  isCollapsed,
}) => {
  const show = useModal((state) => state.show);

  return (
    <SidebarSubHeader
      tooltip="Create Channel"
      onClick={() => show('create-channel', { category: name })}
      showAddButton
      className="px-1 pt-4"
    >
      <p className="space-x-1 cursor-pointer py-2" onClick={onCollapse}>
        <span>
          {isCollapsed ? (
            <ChevronRight className="h-4 w-4 inline-block" />
          ) : (
            <ChevronDown className="h-4 w-4 inline-block" />
          )}
        </span>
        <span>{name}</span>
      </p>
    </SidebarSubHeader>
  );
};

export default CategorySubHeader;
