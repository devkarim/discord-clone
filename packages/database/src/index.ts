import { User } from '@prisma/client';

export * from '@prisma/client';

export type UserSession = Omit<User, 'password' | 'createdAt' | 'updatedAt'>;
