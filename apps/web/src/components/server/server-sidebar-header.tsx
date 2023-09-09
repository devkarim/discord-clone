'use client';

import { useState } from 'react';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { FaGear } from '@react-icons/all-files/fa6/FaGear';
import { FaTrash } from '@react-icons/all-files/fa/FaTrash';
import { FaCirclePlus } from '@react-icons/all-files/fa6/FaCirclePlus';
import { FaSignOutAlt } from '@react-icons/all-files/fa/FaSignOutAlt';
import { FaChevronDown } from '@react-icons/all-files/fa/FaChevronDown';
import { MdPersonAddAlt1 } from '@react-icons/all-files/md/MdPersonAddAlt1';
import { BiSolidFolderPlus } from '@react-icons/all-files/bi/BiSolidFolderPlus';

import { Logger } from 'utils';
import { Exception } from 'models';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuGroup,
} from '@/components/ui/dropdown-menu';
import useModal from '@/hooks/use-modal';
import { leaveServer } from '@/services/member';
import useClientServers from '@/hooks/use-servers';
import { canMemberDoAction } from '@/lib/permission';
import useCurrentMember from '@/hooks/use-current-member';
import ConfirmationModal from '@/components/modals/confirmation-modal';

interface ServerSidebarHeaderProps {
  id: number;
  name: string;
}

const ServerSidebarHeader: React.FC<ServerSidebarHeaderProps> = ({
  id,
  name,
}) => {
  const [isOpen, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { data: currentMember } = useCurrentMember();
  const { refetch } = useClientServers();
  const show = useModal((state) => state.show);

  if (!currentMember) return null;

  const canManageServer = canMemberDoAction(currentMember, 'MANAGE_SERVER');
  const canDeleteServer = canMemberDoAction(currentMember, 'OWNER');

  const leave = async () => {
    try {
      setLoading(true);
      await leaveServer(id);
      setOpen(false);
      router.replace('/');
      refetch();
    } catch (err) {
      Logger.exception(err, 'server-sidebar-header');
      toast.error(Exception.parseError(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ConfirmationModal
        isOpen={isOpen}
        onOpenChange={setOpen}
        title="Are you sure you want to leave the server?"
        subtitle="By leaving this server, you lose access to all of its channels and cannot rejoin unless you are re-invited."
        onConfirm={leave}
        disabled={loading}
      />
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
          {canManageServer && (
            <DropdownMenuGroup className="space-y-2">
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
            </DropdownMenuGroup>
          )}
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="font-semibold text-red-500  focus:bg-red-500"
            onClick={() => setOpen(true)}
            disabled={loading}
          >
            <p>Leave Server</p>
            <FaSignOutAlt className="h-4 w-4 ml-auto" />
          </DropdownMenuItem>
          {canDeleteServer && (
            <DropdownMenuItem className="font-semibold text-red-500  focus:bg-red-500">
              <p>Delete Server</p>
              <FaTrash className="h-4 w-4 ml-auto" />
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default ServerSidebarHeader;
