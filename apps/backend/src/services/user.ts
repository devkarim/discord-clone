import prisma from '@/lib/prisma';
import { hash } from '@/lib/hash';
import { exclude } from '@/lib/exclude-prisma';

import { User } from 'database';
import { RegisterSchema } from 'models';

export const createUser = async (data: RegisterSchema) => {
  const hashedPassword = await hash(data.password);
  return prisma.user.create({
    data: { ...data, password: hashedPassword },
    select: exclude('User', ['password']),
  });
};

export const getFullUserByEmail = async (email: string) =>
  prisma.user.findUnique({ where: { email } });

export const getFullUserByUsername = async (username: string) =>
  prisma.user.findUnique({ where: { username } });

export const getFullUserById = async (id: number) =>
  prisma.user.findUnique({ where: { id } });

export const isEmailTaken = async (email: string) =>
  !!(await getFullUserByEmail(email));

export const isUsernameTaken = async (username: string) =>
  !!(await getFullUserByUsername(username));

export const parseSession = (user: User): Express.User => {
  return {
    id: user.id,
    email: user.email,
    name: user.name,
    username: user.username,
  };
};
