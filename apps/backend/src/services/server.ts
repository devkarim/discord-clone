import { CreateServerSchema, Exception, UpdateServerSchema } from 'models';

import prisma from '../lib/prisma.js';
import { generateCode } from '../lib/utils.js';
import { isProduction } from '../config/constants.js';

export const createServer = (
  userId: number,
  code: string,
  data: CreateServerSchema
) =>
  prisma.$transaction(async (tx) => {
    const server = await tx.server.create({
      data: {
        ...data,
        inviteCode: code,
        ownerId: userId,
        channels: {
          create: {
            name: 'general',
            type: 'TEXT',
            ownerId: userId,
          },
        },
        roles: {
          create: {
            name: 'Owner',
            permissions: {
              create: {
                type: 'OWNER',
              },
            },
          },
        },
      },
      include: { roles: true },
    });

    if (!server.roles[0].id)
      throw Exception.manual('[ROLE_NOT_CREATED] Internal server error', 500);

    await tx.server.update({
      where: {
        id: server.id,
      },
      data: {
        members: {
          create: {
            userId,
            roleId: server.roles[0].id,
          },
        },
      },
    });

    return server;
  });

export const fetchPublicServers = (userId?: number) =>
  prisma.server.findMany({
    where: {
      isPublic: true,
      NOT:
        userId && isProduction
          ? {
              members: {
                some: {
                  userId,
                },
              },
            }
          : undefined,
    },
    include: {
      _count: {
        select: {
          members: true,
        },
      },
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
      members: {
        some: {
          userId,
        },
      },
    },
  });

export const getServerById = (userId: number, id: number) =>
  prisma.server.findUnique({
    where: {
      id,
      members: {
        some: {
          userId,
        },
      },
    },
    include: {
      categories: {
        orderBy: {
          createdAt: 'asc',
        },
      },
      channels: true,
    },
  });

export const getServerByCode = (inviteCode: string) =>
  prisma.server.findUnique({
    where: {
      inviteCode,
    },
  });

export const isUserInServer = async (userId: number, id: number) =>
  !!(await prisma.server.findUnique({
    where: {
      id,
      members: {
        some: {
          userId,
        },
      },
    },
  }));

export const isUserInServerCode = async (userId: number, inviteCode: string) =>
  !!(await prisma.server.findUnique({
    where: {
      inviteCode,
      members: {
        some: {
          userId,
        },
      },
    },
  }));

export const isUserOwner = async (userId: number, id: number) =>
  !!(await prisma.server.findFirst({
    where: {
      id,
      ownerId: userId,
    },
  }));

export const getServerByCodeAndNotUser = (userId: number, inviteCode: string) =>
  prisma.server.findUnique({
    where: {
      inviteCode,
      NOT: {
        members: {
          some: {
            userId,
          },
        },
      },
    },
  });

export const updateServer = async (
  ownerId: number,
  id: number,
  data: Partial<UpdateServerSchema>
) =>
  prisma.server.update({
    where: {
      id,
      ownerId,
    },
    data,
  });

export const isUserBanned = async (userId: number, id: number) =>
  prisma.server.findFirst({
    where: {
      id,
      banned: {
        some: {
          id: userId,
        },
      },
    },
  });

export const getBannedUsers = async (id: number) =>
  prisma.user.findMany({
    where: {
      banned: {
        some: {
          id,
        },
      },
    },
    select: {
      id: true,
      name: true,
      username: true,
      imageUrl: true,
    },
  });

export const banUser = async (userId: number, id: number) =>
  prisma.server.update({
    where: { id },
    data: {
      banned: { connect: { id: userId } },
      members: { deleteMany: { userId } },
    },
  });

export const unbanUser = async (userId: number, id: number) =>
  prisma.server.update({
    where: { id },
    data: { banned: { disconnect: { id: userId } } },
  });

export const getFreeCode = async () => {
  let code = '';
  while (!code) {
    const generatedCode = await generateCode();
    const isCodeTaken = await getServerByInviteCode(generatedCode);
    if (!isCodeTaken) {
      code = generatedCode;
    }
  }
  return code;
};

export const deleteOwnerServer = async (ownerId: number, id: number) =>
  prisma.server.delete({
    where: {
      id,
      ownerId,
    },
  });
