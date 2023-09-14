import { z } from 'zod';

import { PermissionType } from 'database';

export const createRoleSchema = z.object({
  name: z.string(),
  color: z
    .string()
    .regex(/^#(?:[0-9a-fA-F]{3}){1,2}$/, 'Color must be a valid hex color code')
    .optional(),
  permissions: z.nativeEnum(PermissionType).array(),
});

export type CreateRoleSchema = z.infer<typeof createRoleSchema>;

export const deleteRoleSchema = z.object({
  roleId: z.number(),
});

export type DeleteRoleSchema = z.infer<typeof deleteRoleSchema>;
