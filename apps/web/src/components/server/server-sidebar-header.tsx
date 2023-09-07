interface ServerSidebarHeaderProps {
  name: string;
}

const ServerSidebarHeader: React.FC<ServerSidebarHeaderProps> = ({ name }) => {
  return (
    <p className="h-16 py-6 px-4 shadow-md font-bold text-ellipsis overflow-hidden block whitespace-nowrap">
      {name}
    </p>
  );
};

export default ServerSidebarHeader;
