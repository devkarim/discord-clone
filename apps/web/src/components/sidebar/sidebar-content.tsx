interface SidebarContentProps {
  children?: React.ReactNode;
}

const SidebarContent: React.FC<SidebarContentProps> = ({ children }) => {
  return <div className="h-full w-full">{children}</div>;
};

export default SidebarContent;
