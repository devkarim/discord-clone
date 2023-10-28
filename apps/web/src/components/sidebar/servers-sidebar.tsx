import { FaDiscord } from '@react-icons/all-files/fa/FaDiscord';
import { MdExplore } from '@react-icons/all-files/md/MdExplore';

import { Separator } from '@/components/ui/separator';
import HoverCircle from '@/components/ui/hover-circle';

import AddServerHoverCircle from './hover-circles/add-server';
import ServersList from './hover-circles/servers-list';

interface ServerSidebarProps {}

const ServerSidebar: React.FC<ServerSidebarProps> = ({}) => {
  return (
    <div className="relative h-full w-24 bg-sidebar flex flex-col items-center overflow-auto scrollbar-none">
      {/* Direct Messages */}
      <HoverCircle
        tooltip="Direct Messages"
        activeRoute="/"
        startsWithRoute="/me"
        className="hover:text-white"
        activeClassName="bg-primary !text-white"
      >
        <FaDiscord className="text-3xl" />
      </HoverCircle>
      <Separator className="my-2 w-10 h-[2px]" />
      <ServersList />
      {/* Add a new server */}
      <AddServerHoverCircle />
      {/* Explore Servers */}
      <HoverCircle
        className="hover:bg-green-500 hover:text-white text-green-500"
        tooltip="Explore Servers"
        activeClassName="bg-green-500 !text-white"
        activeRoute="/explore"
      >
        <MdExplore className="text-3xl" />
      </HoverCircle>
    </div>
  );
};

export default ServerSidebar;
