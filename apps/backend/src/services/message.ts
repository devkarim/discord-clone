import { SendMessageSchema, UpdateMessageSchema } from 'models';

import prisma from '../lib/prisma.js';

export const MESSAGES_BATCH = 15;

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
          user: {
            select: {
              id: true,
              username: true,
              imageUrl: true,
              name: true,
            },
          },
        },
      },
    },
  });

export const getMessageById = (id: number) =>
  prisma.message.findUnique({
    where: { id },
    include: {
      author: {
        include: {
          user: {
            select: {
              id: true,
              username: true,
              imageUrl: true,
              name: true,
            },
          },
        },
      },
      channel: {
        include: {
          server: true,
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
          user: {
            select: {
              id: true,
              username: true,
              imageUrl: true,
              name: true,
            },
          },
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

export const editMessage = (id: number, data: Partial<UpdateMessageSchema>) =>
  prisma.message.update({
    where: { id },
    data,
    include: {
      author: {
        include: {
          user: {
            select: {
              id: true,
              username: true,
              imageUrl: true,
              name: true,
            },
          },
        },
      },
    },
  });

export const deleteMessageById = (id: number) =>
  prisma.message.update({
    where: { id },
    data: { deleted: true, content: '', fileUrl: undefined },
    include: {
      author: {
        include: {
          user: {
            select: {
              id: true,
              username: true,
              imageUrl: true,
              name: true,
            },
          },
        },
      },
    },
  });
