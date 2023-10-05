import { useState } from 'react';
import { toast } from 'react-toastify';
import { FaEllipsis } from '@react-icons/all-files/fa6/FaEllipsis';

import { Logger } from 'utils';
import { Exception } from 'models';

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
import {
  banServerMember,
  changeServerMemberRole,
  kickServerMember,
} from '@/services/member';
import useCurrentMembers from '@/hooks/use-current-members';

interface ServerMemberRowProps {
  member: FullMember;
}

const ServerMemberRow: React.FC<ServerMemberRowProps> = ({ member }) => {
  const [loading, setLoading] = useState(false);
  const [currentRoleId, setCurrentRoleId] = useState<string>();
  const { data: roles, refetch } = useCurrentRoles();
  const { refetch: refetchMembers } = useCurrentMembers();

  const changeMemberRole = async (newRoleId: string) => {
    const roleId = +newRoleId;
    if (!roleId) return toast.error("You didn't select a new role");
    const currentRole = roles?.find((r) =>
      r.members.some((m) => m.id === member.id)
    );
    const role = roles?.find((r) => r.id === roleId);
    if (!role) return;
    try {
      setLoading(true);
      if (newRoleId === currentRole?.id.toString()) {
        await changeServerMemberRole(member.serverId, member.id);
        setCurrentRoleId(undefined);
        toast.success(`Changed role of ${member.user.username} to Guest`);
      } else {
        await changeServerMemberRole(member.serverId, member.id, roleId);
        setCurrentRoleId(newRoleId);
        toast.success(
          `Changed role of ${member.user.username} to ${role.name}`
        );
      }
      refetch();
      refetchMembers();
    } catch (err) {
      Logger.exception(err);
      toast.error(Exception.parseError(err));
    } finally {
      setLoading(false);
    }
  };

  const kickMember = async () => {
    try {
      setLoading(true);
      await kickServerMember(member.serverId, member.id);
      toast.success(`Kicked ${member.user.username}`);
      refetch();
      refetchMembers();
    } catch (err) {
      Logger.exception(err);
      toast.error(Exception.parseError(err));
    } finally {
      setLoading(false);
    }
  };

  const banMember = async () => {
    try {
      setLoading(true);
      await banServerMember(member.serverId, member.id);
      toast.success(`Banned ${member.user.username}`);
      refetch();
      refetchMembers();
    } catch (err) {
      Logger.exception(err);
      toast.error(Exception.parseError(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <TableRow>
      <TableCell className="text-lg font-medium">
        {member.user.username}
      </TableCell>
      <TableCell className="text-base">
        <div
          className="flex items-center gap-2 font-medium"
          style={{ color: member.role?.color }}
        >
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
              <DropdownMenuSubTrigger disabled={loading}>
                <span>Roles</span>
              </DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent
                  className="-translate-y-1"
                  sideOffset={12}
                >
                  <DropdownMenuRadioGroup
                    value={currentRoleId || member.role?.id.toString()}
                    onValueChange={changeMemberRole}
                  >
                    {(roles || []).map((role) => (
                      <DropdownMenuRadioItem
                        key={role.id}
                        value={role.id.toString()}
                      >
                        <p
                          className="font-medium"
                          style={{ color: role.color }}
                        >
                          {role.name}
                        </p>
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
              disabled={loading}
            >
              <p>Kick {member.user.username}</p>
            </DropdownMenuItem>
            <DropdownMenuItem
              className="justify-between text-red-500 focus:text-foreground focus:bg-red-500"
              onClick={banMember}
              disabled={loading}
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
