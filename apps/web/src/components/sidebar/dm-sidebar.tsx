import { FaPlus } from '@react-icons/all-files/fa6/FaPlus';

import DMList from '@/components/dm/dm-list';
import ClientControl from '@/components/ui/client-control';

interface DMSidebarProps {}

const DMSidebar: React.FC<DMSidebarProps> = ({}) => {
  return (
    <div className="bg-channels h-full min-w-[16rem] lg:w-fit flex flex-col">
      <div className="h-full flex-grow overflow-auto px-2 pt-4 space-y-3">
        <div className="flex justify-between items-center font-semibold group transition-opacity px-3">
          <span className="text-sm opacity-60 group-hover:opacity-100  uppercase">
            Direct Messages
          </span>
          <span className="align-middle opacity-60 hover:opacity-100 cursor-pointer">
            <FaPlus />
          </span>
        </div>
        <DMList />
      </div>
      <ClientControl />
    </div>
  );
};

export default DMSidebar;
