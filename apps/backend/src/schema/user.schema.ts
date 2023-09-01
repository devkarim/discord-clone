import { z } from "zod";

import Limits from "@/config/limits";
import Messages from "@/config/messages";

export const createUserSchema = z.object({
  email: z.string({ required_error: Messages.required.email }).email(),
  password: z
    .string({ required_error: Messages.required.password })
    .min(Limits.password.min, Messages.limits.password.min),
});

export type CreateUser = z.infer<typeof createUserSchema>;

export const loginUserSchema = z.object({
  email: z.string({ required_error: Messages.required.email }).email(),
  password: z
    .string({ required_error: Messages.required.password })
    .min(Limits.password.min, Messages.limits.password.min),
});

export type LoginUser = z.infer<typeof loginUserSchema>;
