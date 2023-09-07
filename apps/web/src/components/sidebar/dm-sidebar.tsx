import { FaPlus } from '@react-icons/all-files/fa6/FaPlus';

import DMList from '@/components/dm/dm-list';
import IconButton from '@/components/ui/icon-button';
import ClientControl from '@/components/ui/client-control';

interface DMSidebarProps {}

const DMSidebar: React.FC<DMSidebarProps> = ({}) => {
  return (
    <div className="bg-channels h-full w-[17rem] flex flex-col select-none">
      <div className="h-full flex-grow overflow-auto px-2 pt-4 space-y-3">
        <div className="flex justify-between items-center font-semibold group transition-opacity px-3">
          <span className="text-sm opacity-60 group-hover:opacity-100  uppercase">
            Direct Messages
          </span>
          <IconButton tooltip="Create DM" side="bottom">
            <FaPlus />
          </IconButton>
        </div>
        <DMList />
      </div>
      <ClientControl />
    </div>
  );
};

export default DMSidebar;
