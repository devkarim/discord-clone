import { CreateChannelSchema, UpdateChannelSchema } from 'models';

import prisma from '../lib/prisma.js';

export const addChannelToServer = (
  ownerId: number,
  serverId: number,
  { categoryId, categoryName, ...data }: CreateChannelSchema
) =>
  prisma.$transaction(async (tx) => {
    const channel = await tx.channel.create({
      data: {
        ...data,
        ownerId,
        serverId,
      },
    });
    if (!categoryId) return channel;
    const newChannel = await tx.channel.update({
      where: {
        id: channel.id,
      },
      data: {
        category: {
          connect: {
            id: categoryId,
          },
        },
      },
    });
    return newChannel;
  });

export const getChannelById = (channelId: number, userId: number) =>
  prisma.channel.findUnique({
    where: {
      id: channelId,
      server: {
        members: {
          some: {
            userId,
          },
        },
      },
    },
    include: {
      category: true,
      owner: true,
    },
  });

export const updateChannel = (
  id: number,
  { categoryName, ...data }: UpdateChannelSchema
) =>
  prisma.channel.update({
    where: {
      id,
    },
    data,
  });

export const deleteChannel = (id: number) =>
  prisma.channel.delete({ where: { id } });
