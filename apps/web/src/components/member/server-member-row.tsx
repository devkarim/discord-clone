import { FaEllipsis } from '@react-icons/all-files/fa6/FaEllipsis';

import { FullMember } from '@/types/db';
import ActionTooltip from '@/components/ui/action-tooltip';
import { TableRow, TableCell } from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuPortal,
  DropdownMenuSubContent,
  DropdownMenuRadioItem,
  DropdownMenuRadioGroup,
} from '@/components/ui/dropdown-menu';
import useCurrentRoles from '@/hooks/use-current-roles';

interface ServerMemberRowProps {
  member: FullMember;
}

const ServerMemberRow: React.FC<ServerMemberRowProps> = ({ member }) => {
  const { data: roles } = useCurrentRoles();

  const kickMember = async () => {};

  const banMember = async () => {};

  return (
    <TableRow>
      <TableCell className="text-lg">{member.user.username}</TableCell>
      <TableCell className="text-base">
        <div className="flex items-center gap-2">
          {member.role?.name || 'Guest'}
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
          <DropdownMenuContent className="p-2 w-48 text-sm space-y-2">
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>
                <span>Roles</span>
              </DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent
                  className="-translate-y-1"
                  sideOffset={12}
                >
                  <DropdownMenuRadioGroup>
                    {(roles || []).map((role) => (
                      <DropdownMenuRadioItem key={role.id} value={role.name}>
                        <span>{role.name}</span>
                      </DropdownMenuRadioItem>
                    ))}
                  </DropdownMenuRadioGroup>
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="justify-between text-red-500 focus:text-foreground focus:bg-red-500"
              onClick={kickMember}
            >
              <p>Kick {member.user.username}</p>
            </DropdownMenuItem>
            <DropdownMenuItem
              className="justify-between text-red-500 focus:text-foreground focus:bg-red-500"
              onClick={banMember}
            >
              <p>Ban {member.user.username}</p>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </td>
    </TableRow>
  );
};

export default ServerMemberRow;
