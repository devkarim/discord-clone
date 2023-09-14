import { z } from 'zod';

import { ChannelType } from 'database';

import { Messages, Limits } from '../config';

export const createChannelSchema = z.object({
  name: z
    .string({ required_error: Messages.required.channel.name })
    .min(Limits.channel.name.min, {
      message: Messages.limits.channel.name.min,
    })
    .max(Limits.channel.name.max, {
      message: Messages.limits.channel.name.max,
    }),
  type: z.nativeEnum(ChannelType, {
    required_error: Messages.required.channel.type,
    invalid_type_error: Messages.required.channel.type,
  }),
  categoryId: z.number().optional(),
  categoryName: z.string().optional(),
});

export type CreateChannelSchema = z.infer<typeof createChannelSchema>;
