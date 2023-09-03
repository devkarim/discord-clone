import { FaPlus } from '@react-icons/all-files/fa6/FaPlus';
import { FaDiscord } from '@react-icons/all-files/fa/FaDiscord';
import { MdExplore } from '@react-icons/all-files/md/MdExplore';

import { Separator } from '@/components/ui/separator';
import HoverCircle from '@/components/ui/hover-circle';

interface ServerSidebarProps {}

const ServerSidebar: React.FC<ServerSidebarProps> = ({}) => {
  return (
    <div className="relative h-full w-24 bg-sidebar-light dark:bg-sidebar-dark flex flex-col items-center">
      {/* Direct Messages */}
      <HoverCircle tooltip="Direct Messages">
        <FaDiscord className="text-3xl" />
      </HoverCircle>
      <Separator className="my-2 w-10 h-[2px]" />
      {/* TODO: User servers here */}
      {/* Add a new server */}
      <HoverCircle
        className="hover:bg-green-500 text-green-500"
        showIndiaction={false}
        tooltip="Add a Server"
      >
        <FaPlus className="text-2xl" />
      </HoverCircle>
      {/* Explore Servers */}
      <HoverCircle
        className="hover:bg-green-500 text-green-500"
        tooltip="Explore Servers"
      >
        <MdExplore className="text-3xl" />
      </HoverCircle>
    </div>
  );
};

export default ServerSidebar;
