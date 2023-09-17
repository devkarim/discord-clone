import { z } from 'zod';

import { PermissionType } from 'database';

import { Limits, Messages } from '../config';

export const createRoleSchema = z.object({
  name: z
    .string()
    .min(Limits.role.name.min, Messages.limits.role.name.min)
    .max(Limits.role.name.max, Messages.limits.role.name.max),
  color: z
    .string()
    .regex(/^#(?:[0-9a-fA-F]{3}){1,2}$/, 'Color must be a valid hex color code')
    .optional(),
  permissions: z.nativeEnum(PermissionType).array().optional(),
});

export type CreateRoleSchema = z.infer<typeof createRoleSchema>;

export const deleteRoleSchema = z.object({
  roleId: z.number(),
});

export type DeleteRoleSchema = z.infer<typeof deleteRoleSchema>;
