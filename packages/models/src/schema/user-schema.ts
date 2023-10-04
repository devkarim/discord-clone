import { z } from 'zod';

import { Limits, Messages } from '../config';

import { registerSchema } from './auth-schema';

export const updateUserSchema = z.object({
  username: registerSchema.shape.username,
  imageUrl: z.string().url().optional(),
  name: z
    .string()
    .min(Limits.name.min, Messages.limits.name.min)
    .max(Limits.name.max, Messages.limits.name.max)
    .optional()
    .or(z.literal('')),
});

export type UpdateUserSchema = z.infer<typeof updateUserSchema>;
