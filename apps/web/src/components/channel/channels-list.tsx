import { Channel } from 'database';
import ChannelCard from './channel-card';

interface ChannelsListProps {
  channels: Channel[];
}

const ChannelsList: React.FC<ChannelsListProps> = ({ channels }) => {
  return (
    <>
      {channels.map((channel) => (
        <ChannelCard key={channel.id} name={channel.name} type={channel.type} />
      ))}
    </>
  );
};

export default ChannelsList;
