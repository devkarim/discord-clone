import { PermissionType } from 'database';

import prisma from '../lib/prisma.js';

export const getRoleById = (serverId: number, roleId: number) =>
  prisma.role.findUnique({
    where: {
      id: roleId,
      serverId,
    },
    include: {
      permissions: true,
    },
  });

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
      permissions: true,
      members: {
        include: {
          user: true,
        },
      },
    },
  });

export const addRoleToServer = (
  serverId: number,
  name: string,
  permissionTypes: PermissionType[]
) =>
  prisma.role.create({
    data: {
      name,
      serverId,
      permissions: {
        createMany: { data: permissionTypes.map((type) => ({ type })) },
      },
    },
  });

export const deleteRoleFromServer = (serverId: number, roleId: number) =>
  prisma.role.delete({
    where: {
      id: roleId,
      serverId,
      permissions: {
        none: {
          type: 'OWNER',
        },
      },
    },
  });
