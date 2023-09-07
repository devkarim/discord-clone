import { CreateServerSchema } from 'models';

import prisma from '../lib/prisma.js';

export const createServer = (
  userId: number,
  code: string,
  data: CreateServerSchema
) =>
  prisma.server.create({
    data: {
      ...data,
      inviteCode: code,
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

export const getServerById = (id: number) =>
  prisma.server.findUnique({ where: { id } });
