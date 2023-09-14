import prisma from '../lib/prisma.js';
import { CreateRoleSchema } from 'models';

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

export const addRoleToServer = (serverId: number, data: CreateRoleSchema) =>
  prisma.role.create({
    data: {
      name: data.name,
      color: data.color,
      serverId,
      permissions: {
        createMany: { data: data.permissions.map((type) => ({ type })) },
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
