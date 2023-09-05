import { CreateServerSchema } from 'models';

import prisma from '@/lib/prisma';

export const createServer = (userId: number, data: CreateServerSchema) =>
  prisma.server.create({
    data: {
      ...data,
      ownerId: userId,
    },
  });

export const getServerByInviteCode = (inviteCode: string) =>
  prisma.server.findUnique({
    where: {
      inviteCode,
    },
  });

export const getUserServers = (userId: number) =>
  prisma.server.findMany({
    where: {
      ownerId: userId,
    },
  });
