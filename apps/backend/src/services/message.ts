import { SendMessageSchema } from 'models';

import prisma from '../lib/prisma.js';

export const MESSAGES_BATCH = 10;

export const createMessage = (
  channelId: number,
  authorId: number,
  data: SendMessageSchema
) =>
  prisma.message.create({
    data: {
      ...data,
      channelId,
      authorId,
    },
    include: {
      author: {
        include: {
          user: true,
        },
      },
    },
  });

export const getChannelMessages = (channelId: number, cursorTo?: number) =>
  prisma.message.findMany({
    take: MESSAGES_BATCH,
    skip: cursorTo != undefined ? 1 : 0,
    cursor:
      cursorTo != undefined
        ? {
            id: cursorTo,
          }
        : undefined,
    where: {
      channelId,
    },
    include: {
      author: {
        include: {
          user: true,
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
