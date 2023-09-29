import { CreateCategorySchema, UpdateCategorySchema } from 'models';

import prisma from '../lib/prisma.js';

export const addCategoryToServer = (
  serverId: number,
  data: CreateCategorySchema
) =>
  prisma.category.create({
    data: {
      ...data,
      serverId,
    },
  });

export const getCategoryById = (id: number, userId?: number) =>
  prisma.category.findUnique({
    where: {
      id,
      server: userId
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
          channels: true,
        },
      },
    },
  });

export const isCategoryInServer = (name: string, serverId: number) =>
  prisma.category.findFirst({
    where: {
      name,
      serverId,
    },
  });

export const updateCategory = (id: number, data: UpdateCategorySchema) =>
  prisma.category.update({
    where: {
      id,
    },
    data,
  });

export const deleteCategory = (id: number) =>
  prisma.category.delete({ where: { id } });
