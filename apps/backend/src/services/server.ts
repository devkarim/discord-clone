import { CreateServerSchema, Exception, UpdateServerSchema } from 'models';

import prisma from '../lib/prisma.js';
import { generateCode } from '../lib/utils.js';

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
      categories: true,
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
