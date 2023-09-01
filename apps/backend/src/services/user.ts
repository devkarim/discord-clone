import prisma from '@/lib/prisma';
import { hash } from '@/lib/hash';
import { exclude } from '@/lib/exclude-prisma';
import { CreateUser } from '@/schema/user.schema';

import { User } from 'database';

export const createUser = async (data: CreateUser) => {
  const hashedPassword = await hash(data.password);
  return prisma.user.create({
    data: { ...data, password: hashedPassword },
    select: exclude('User', ['password']),
  });
};

export const getFullUserByEmail = async (email: string) =>
  prisma.user.findUnique({ where: { email } });

export const getFullUserById = async (id: number) =>
  prisma.user.findUnique({ where: { id } });

export const isEmailTaken = async (email: string) =>
  !!(await getFullUserByEmail(email));

export const parseSession = (user: User): Express.User => {
  return {
    id: user.id,
    email: user.email,
    name: user.name,
  };
};
