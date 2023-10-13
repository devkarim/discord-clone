import prisma from '../lib/prisma.js';

import { MESSAGES_BATCH } from './message.js';

export const getConversationById = (id: number) =>
  prisma.conversation.findUnique({
    where: {
      id,
    },
    include: {
      users: {
        select: {
          id: true,
          username: true,
          imageUrl: true,
          name: true,
          status: true,
        },
      },
    },
  });

export const getConversationByPairOfUsers = (
  firstUserId: number,
  secondUserId: number
) =>
  prisma.conversation.findFirst({
    where: {
      AND: [
        {
          users: {
            some: {
              id: firstUserId,
            },
          },
        },
        {
          users: {
            some: {
              id: secondUserId,
            },
          },
        },
      ],
      isGroup: false,
    },
    include: {
      users: {
        select: {
          id: true,
          username: true,
          imageUrl: true,
          name: true,
          status: true,
        },
      },
    },
  });

export const getMessagesByConversationId = (id: number, cursorTo?: number) =>
  prisma.directMessage.findMany({
    where: {
      conversationId: id,
    },
    take: MESSAGES_BATCH,
    skip: cursorTo != undefined ? 1 : 0,
    cursor:
      cursorTo != undefined
        ? {
            id: cursorTo,
          }
        : undefined,
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      author: {
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
