import { Messages, Limits } from '../config';
import { z } from 'zod';

export const loginSchema = z.object({
  email: z
    .string({ required_error: Messages.required.email })
    .email('Invalid email address'),
  password: z
    .string({ required_error: Messages.required.password })
    .min(Limits.password.min, Messages.limits.password.min),
});

export type LoginSchema = z.infer<typeof loginSchema>;

export const registerSchema = loginSchema.extend({
  username: z
    .string({ required_error: Messages.required.username })
    .min(Limits.username.min, Messages.limits.username.min)
    .max(Limits.username.max, Messages.limits.username.max),
});

export type RegisterSchema = z.infer<typeof registerSchema>;
