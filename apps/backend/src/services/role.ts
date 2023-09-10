import prisma from '../lib/prisma.js';

export const getServerRoles = (userId: number, serverId: number) =>
  prisma.role.findMany({
    where: {
      serverId,
      server: {
        members: {
          some: {
            userId,
          },
        },
      },
    },
    include: {
      members: {
        include: {
          user: true,
        },
      },
    },
  });
