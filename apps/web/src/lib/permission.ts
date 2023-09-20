import { PermissionType } from 'database';

import { MemberWithPermissions } from '@/types/db';

export const canMemberDoAction = (
  member: MemberWithPermissions,
  action: PermissionType | PermissionType[]
) => {
  const actions = Array.isArray(action) ? action : [action];
  if (!member.role) return false;
  if (action == 'OWNER')
    return member.role.permissions.some(
      (permission) => permission.type === 'OWNER'
    );

  return member.role.permissions.some(
    (permission) =>
      actions.includes(permission.type) ||
      permission.type == 'ADMINISTRATOR' ||
      permission.type == 'OWNER'
  );
};
