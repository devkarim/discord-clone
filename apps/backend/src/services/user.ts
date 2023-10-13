import { Status, User } from 'database';
import { RegisterSchema, UpdateUserSchema } from 'models';

import prisma from '../lib/prisma.js';
import { hash } from '../lib/hash.js';
import { exclude } from '../lib/exclude-prisma.js';

export const createUser = async (data: RegisterSchema) => {
  const hashedPassword = await hash(data.password);
  return prisma.user.create({
    data: { ...data, password: hashedPassword },
    select: exclude('User', ['password']),
  });
};

export const getUserById = async (id: number) =>
  prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      username: true,
      imageUrl: true,
      name: true,
      status: true,
    },
  });

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

export const setUserStatus = async (id: number, status: Status) =>
  prisma.user.update({ where: { id }, data: { status } });

export const updateUser = async (id: number, data: Partial<UpdateUserSchema>) =>
  prisma.user.update({ where: { id }, data });

export const parseSession = (user: User): Express.User => {
  return {
    id: user.id,
    email: user.email,
    name: user.name,
    username: user.username,
    imageUrl: user.imageUrl,
    status: user.status,
  };
};
