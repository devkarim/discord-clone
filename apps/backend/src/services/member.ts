import { PermissionType } from 'database';

import prisma from '../lib/prisma.js';

export const getMemberById = (id: number, serverId: number) =>
  prisma.member.findUnique({
    where: { id, serverId },
    include: {
      role: {
        include: {
          permissions: true,
        },
      },
    },
  });

export const getMemberByChannelId = (id: number, channelId: number) =>
  prisma.member.findFirst({
    where: {
      userId: id,
      server: {
        channels: {
          some: {
            id: channelId,
          },
        },
      },
    },
    include: {
      user: {
        select: {
          id: true,
          username: true,
          imageUrl: true,
          name: true,
          status: true,
        },
      },
      role: {
        include: {
          permissions: true,
        },
      },
    },
  });

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
          id: true,
          username: true,
          imageUrl: true,
          name: true,
          status: true,
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

export const assignRoleToMember = async (
  id: number,
  serverId: number,
  roleId: number
) =>
  prisma.member.update({
    where: { id, serverId },
    data: {
      role: { connect: { id: roleId } },
    },
  });

export const removeRoleFromMember = async (id: number, serverId: number) =>
  prisma.member.update({
    where: { id, serverId },
    data: {
      role: {
        disconnect: true,
      },
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
      user: {
        select: {
          id: true,
          name: true,
          username: true,
          imageUrl: true,
          status: true,
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
