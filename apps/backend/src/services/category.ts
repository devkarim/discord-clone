import { CreateCategorySchema } from 'models';

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

export const getCategoryById = (id: number) =>
  prisma.category.findUnique({ where: { id } });

export const isCategoryInServer = (name: string, serverId: number) =>
  prisma.category.findFirst({
    where: {
      name,
      serverId,
    },
  });
