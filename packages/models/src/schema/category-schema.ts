import { z } from 'zod';

import { Messages, Limits } from '../config';

export const createCategorySchema = z.object({
  name: z
    .string({ required_error: Messages.required.channel.name })
    .min(Limits.channel.name.min, {
      message: Messages.limits.channel.name.min,
    })
    .max(Limits.channel.name.max, {
      message: Messages.limits.channel.name.max,
    }),
});

export type CreateCategorySchema = z.infer<typeof createCategorySchema>;
