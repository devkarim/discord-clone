interface SidebarProps {}

const Sidebar: React.FC<SidebarProps> = ({}) => {
  return (
    <div className="h-full w-32 bg-sidebar-light dark:bg-sidebar-dark"></div>
  );
};

export default Sidebar;
