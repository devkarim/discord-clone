import ChannelProvider from '@/components/providers/channel-provider';

interface ServerLayoutProps {
  children: React.ReactNode;
}

const ServerLayout: React.FC<ServerLayoutProps> = ({ children }) => {
  return <ChannelProvider>{children}</ChannelProvider>;
};

export default ServerLayout;
