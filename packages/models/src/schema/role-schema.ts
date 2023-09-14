import { z } from 'zod';

import { PermissionType } from 'database';

export const createRoleSchema = z.object({
  name: z.string(),
  permissions: z.nativeEnum(PermissionType).array(),
});

export type CreateRoleSchema = z.infer<typeof createRoleSchema>;

export const deleteRoleSchema = z.object({
  roleId: z.number(),
});

export type DeleteRoleSchema = z.infer<typeof deleteRoleSchema>;
