import { Messages, Limits } from '../config';
import { z } from 'zod';

export const createServerSchema = z.object({
  name: z
    .string({ required_error: Messages.required.server.name })
    .min(Limits.server.name.min, { message: Messages.limits.server.name.min })
    .max(Limits.server.name.max, { message: Messages.limits.server.name.max }),
});

export type CreateServerSchema = z.infer<typeof createServerSchema>;

export const joinServerSchema = z.object({
  inviteCode: z
    .string({ required_error: Messages.required.server.inviteCode })
    .min(Limits.server.inviteCode.min, {
      message: Messages.limits.server.inviteCode,
    })
    .max(Limits.server.inviteCode.max, {
      message: Messages.limits.server.inviteCode,
    }),
});

export type JoinServerSchema = z.infer<typeof joinServerSchema>;
