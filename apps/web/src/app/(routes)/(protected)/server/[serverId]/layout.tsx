import ServerProvider from '@/components/providers/server-provider';

interface ServerLayoutProps {
  children: React.ReactNode;
}

const ServerLayout: React.FC<ServerLayoutProps> = ({ children }) => {
  return <ServerProvider>{children}</ServerProvider>;
};

export default ServerLayout;
