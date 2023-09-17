import { useState } from 'react';
import { toast } from 'react-toastify';
import { FaUser } from '@react-icons/all-files/fa6/FaUser';
import { FaTrash } from '@react-icons/all-files/fa/FaTrash';
import { FaEllipsis } from '@react-icons/all-files/fa6/FaEllipsis';
import { FaShieldCat } from '@react-icons/all-files/fa6/FaShieldCat';
import { FaShieldHeart } from '@react-icons/all-files/fa6/FaShieldHeart';

import { Exception } from 'models';

import { FullRole } from '@/types/db';
import { DEFAULT_ROLE_COLOR } from '@/config/data';
import ActionTooltip from '@/components/ui/action-tooltip';
import { TableRow, TableCell } from '@/components/ui/table';
import {
  DropdownMenuContent,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import { deleteServerRole } from '@/services/server';
import useCurrentRoles from '@/hooks/use-current-roles';

interface RoleRowProps {
  role: FullRole;
}

const RoleRow: React.FC<RoleRowProps> = ({ role }) => {
  const [loading, setLoading] = useState(false);
  const { refetch } = useCurrentRoles();

  const deleteRole = async () => {
    if (loading) return;
    try {
      setLoading(true);
      await deleteServerRole(role.serverId, role.id);
      toast.success(`Role ${role.name} deleted successfully!`);
      refetch();
    } catch (err) {
      console.error(err);
      toast.error(Exception.parseError(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <TableRow key={role.id}>
      <TableCell className="text-base">
        <div className="flex items-center gap-2">
          {role.permissions.some((p) => p.type == 'OWNER') ? (
            <FaShieldCat
              className="text-2xl"
              color={role.color || DEFAULT_ROLE_COLOR}
            />
          ) : (
            <FaShieldHeart
              className="text-2xl"
              color={role.color || DEFAULT_ROLE_COLOR}
            />
          )}
          {role.name}
        </div>
      </TableCell>
      <TableCell className="text-foreground/60 text-lg">
        <div className="flex items-center gap-2">
          {role.members.length} <FaUser />
        </div>
      </TableCell>
      <td className="p-0 align-middle text-xl">
        <DropdownMenu>
          <DropdownMenuTrigger>
            <ActionTooltip label="More" className="align-middle" side="top">
              <div className="cursor-pointer mt-1 p-2 rounded-full bg-sidebar/40 w-fit">
                <FaEllipsis />
              </div>
            </ActionTooltip>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="p-2 w-48 text-sm">
            <DropdownMenuItem
              className="justify-between text-red-500 focus:text-foreground focus:bg-red-500"
              onClick={deleteRole}
            >
              <p>Delete</p>
              <FaTrash />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </td>
    </TableRow>
  );
};

export default RoleRow;
