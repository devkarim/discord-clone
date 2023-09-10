import { usePathname, useRouter } from 'next/navigation';

import { Channel, ChannelType } from 'database';

import ChannelCard from './channel-card';

interface ChannelsListProps {
  channels: Channel[];
}

const ChannelsList: React.FC<ChannelsListProps> = ({ channels }) => {
  const router = useRouter();
  const pathname = usePathname();

  const onClick = (id: number, serverId: number, type: ChannelType) => {
    if (type == ChannelType.TEXT) {
      router.push(`/server/${serverId}/channel/${id}`);
    } else {
      // TODO: Add voice & video channels support
    }
  };

  return (
    <>
      {channels.map((channel) => (
        <ChannelCard
          key={channel.id}
          name={channel.name}
          type={channel.type}
          active={pathname.includes(`/channel/${channel.id}`)}
          onClick={() => onClick(channel.id, channel.serverId, channel.type)}
        />
      ))}
    </>
  );
};

export default ChannelsList;
