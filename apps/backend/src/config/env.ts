import { z } from "zod";

const envSchema = z.object({
  PORT: z.coerce.number().default(8000),
  SESSION_SECRET: z.string(),
  NODE_ENV: z.union([z.literal("development"), z.literal("production")]),
});

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
  console.error(parsedEnv.error.issues);
  throw new Error("There is an error with the environment variables");
}

export const env = parsedEnv.data;

type EnvSchemaType = z.infer<typeof envSchema>;

declare global {
  namespace NodeJS {
    interface ProcessEnv extends EnvSchemaType {}
  }
}
