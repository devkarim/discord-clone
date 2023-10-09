import { useState } from 'react';
import { toast } from 'react-toastify';
import { FaEllipsis } from '@react-icons/all-files/fa6/FaEllipsis';

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import { handleError } from '@/lib/utils';
import { UserWithoutStatus } from '@/types/db';
import { unbanServerMember } from '@/services/member';
import useCurrentBans from '@/hooks/use-current-bans';
import useCurrentServer from '@/hooks/use-current-server';
import ActionTooltip from '@/components/ui/action-tooltip';
import { TableRow, TableCell } from '@/components/ui/table';

interface BannedUserRowProps {
  user: UserWithoutStatus;
}

const BannedUserRow: React.FC<BannedUserRowProps> = ({ user }) => {
  const [loading, setLoading] = useState(false);
  const { refetch } = useCurrentBans();
  const { data: server } = useCurrentServer();

  const unbanMember = async () => {
    if (!server) return;
    try {
      setLoading(true);
      await unbanServerMember(server.id, user.id);
      toast.success(`Unbanned ${user.username}`);
      refetch();
    } catch (err) {
      handleError(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <TableRow>
      <TableCell className="text-lg font-medium">{user.username}</TableCell>
      <td className="p-0 align-middle text-xl">
        <DropdownMenu>
          <DropdownMenuTrigger>
            <ActionTooltip label="More" className="align-middle" side="top">
              <div className="cursor-pointer mt-1 p-2 rounded-full bg-sidebar/40 w-fit">
                <FaEllipsis />
              </div>
            </ActionTooltip>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="p-2 w-48 text-sm space-y-2">
            <DropdownMenuItem
              className="justify-between text-red-500 focus:text-foreground focus:bg-red-500"
              onClick={unbanMember}
              disabled={loading}
            >
              <p>Unban {user.username}</p>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </td>
    </TableRow>
  );
};

export default BannedUserRow;
