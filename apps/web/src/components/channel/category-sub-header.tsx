import SidebarSubHeader from '@/components/sidebar/sidebar-sub-header';

interface CategorySubHeaderProps {
  name: string;
}

const CategorySubHeader: React.FC<CategorySubHeaderProps> = ({ name }) => {
  return (
    <SidebarSubHeader label={name} tooltip="Create Channel" showAddButton />
  );
};

export default CategorySubHeader;
