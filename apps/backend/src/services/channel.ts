import { CreateChannelSchema } from 'models';

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

export const getChannelById = (userId: number, channelId: number) =>
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
