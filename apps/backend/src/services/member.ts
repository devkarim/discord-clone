import { PermissionType } from 'database';

import prisma from '../lib/prisma.js';
import { exclude } from 'src/lib/exclude-prisma.js';

export const getServerMembers = (userId: number, serverId: number) =>
  prisma.member.findMany({
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
      user: {
        select: {
          username: true,
          imageUrl: true,
          name: true,
        },
      },
      role: true,
    },
  });

export const getMemberInServer = (userId: number, serverId: number) =>
  prisma.member.findFirst({
    where: {
      userId,
      serverId,
    },
  });

export const addMemberToServer = async (userId: number, inviteCode: string) =>
  prisma.server.update({
    where: {
      inviteCode,
    },
    data: {
      members: {
        create: {
          userId,
        },
      },
    },
  });

export const removeMemberFromServer = async (userId: number, id: number) =>
  prisma.server.update({
    where: {
      id,
    },
    data: {
      members: {
        deleteMany: {
          userId,
        },
      },
    },
  });

export const getMemberByServerUser = (userId: number, serverId: number) =>
  prisma.member.findFirst({
    where: {
      userId,
      serverId,
    },
    include: {
      role: {
        include: {
          permissions: true,
        },
      },
    },
  });

export const canMemberDoAction = async (
  userId: number,
  serverId: number,
  action: PermissionType
) => {
  const member = await getMemberByServerUser(userId, serverId);
  if (!member || !member.role) return false;
  if (action == 'OWNER')
    return member.role.permissions.some((p) => p.type == 'OWNER');
  return member.role.permissions.some(
    (p) => p.type === action || p.type == 'OWNER' || p.type == 'ADMINISTRATOR'
  );
};
