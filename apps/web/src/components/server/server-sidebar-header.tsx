'use client';

import { FaGear } from '@react-icons/all-files/fa6/FaGear';
import { FaTrash } from '@react-icons/all-files/fa/FaTrash';
import { FaCirclePlus } from '@react-icons/all-files/fa6/FaCirclePlus';
import { FaSignOutAlt } from '@react-icons/all-files/fa/FaSignOutAlt';
import { FaChevronDown } from '@react-icons/all-files/fa/FaChevronDown';
import { MdPersonAddAlt1 } from '@react-icons/all-files/md/MdPersonAddAlt1';
import { BiSolidFolderPlus } from '@react-icons/all-files/bi/BiSolidFolderPlus';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import useModal from '@/hooks/use-modal';

interface ServerSidebarHeaderProps {
  id: number;
  name: string;
}

const ServerSidebarHeader: React.FC<ServerSidebarHeaderProps> = ({
  id,
  name,
}) => {
  const show = useModal((state) => state.show);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="focus:outline-none">
        <div className="h-16 flex items-center justify-between w-full shadow-md py-6 px-4 overflow-hidden">
          <p className="font-bold text-ellipsis block whitespace-nowrap overflow-hidden">
            {name}
          </p>
          <FaChevronDown />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-64 p-3 space-y-2" side="bottom">
        <DropdownMenuItem
          className="text-indigo-600 dark:text-indigo-400 font-semibold"
          onClick={() => show('invite')}
        >
          <p>Invite People</p>
          <MdPersonAddAlt1 className="h-4 w-4 ml-auto" />
        </DropdownMenuItem>
        <DropdownMenuItem className="font-semibold">
          <p>Server Settings</p>
          <FaGear className="h-4 w-4 ml-auto" />
        </DropdownMenuItem>
        <DropdownMenuItem className="font-semibold">
          <p>Create Channel</p>
          <FaCirclePlus className="h-4 w-4 ml-auto" />
        </DropdownMenuItem>
        <DropdownMenuItem className="font-semibold">
          <p>Create Category</p>
          <BiSolidFolderPlus className="h-4 w-4 ml-auto" />
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="font-semibold text-red-500  focus:bg-red-500">
          <p>Leave Server</p>
          <FaSignOutAlt className="h-4 w-4 ml-auto" />
        </DropdownMenuItem>
        <DropdownMenuItem className="font-semibold text-red-500  focus:bg-red-500">
          <p>Delete Server</p>
          <FaTrash className="h-4 w-4 ml-auto" />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ServerSidebarHeader;
