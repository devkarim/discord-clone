import { z } from 'zod';

import { Messages, Limits } from '../config';

export const sendMessageSchema = z.object({
  content: z
    .string({ required_error: Messages.required.message.content })
    .min(Limits.message.min, Messages.limits.message.min),
  fileUrl: z
    .string()
    .url({ message: Messages.required.message.fileUrl })
    .optional(),
});

export type SendMessageSchema = z.infer<typeof sendMessageSchema>;
