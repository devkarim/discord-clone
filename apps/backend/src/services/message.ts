import { DirectMessage, Message } from 'database';
import { SendMessageSchema, UpdateMessageSchema } from 'models';

import prisma from '../lib/prisma.js';

export const MESSAGES_BATCH = 15;

export const createCustomMessage = (message: Message) =>
  prisma.message.create({
    data: { ...message, status: 'DELIVERED' },
    include: {
      author: {
        include: {
          role: {
            include: {
              permissions: true,
            },
          },
          user: {
            select: {
              id: true,
              username: true,
              imageUrl: true,
              name: true,
              status: true,
            },
          },
        },
      },
    },
  });

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
              status: true,
            },
          },
        },
      },
    },
  });

export const getMessageById = (id: string) =>
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
              status: true,
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

export const getChannelMessages = (channelId: number, cursorTo?: string) =>
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
          role: {
            select: {
              color: true,
              name: true,
            },
          },
          user: {
            select: {
              id: true,
              username: true,
              imageUrl: true,
              name: true,
              status: true,
            },
          },
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

export const editMessage = (id: string, data: Partial<UpdateMessageSchema>) =>
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
              status: true,
            },
          },
        },
      },
    },
  });

export const deleteMessageById = (id: string) =>
  prisma.message.update({
    where: { id },
    data: { status: 'DELETED', content: '', fileUrl: undefined },
    include: {
      author: {
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
        },
      },
    },
  });

export const getMessagesByConversationId = (id: number, cursorTo?: string) =>
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

export const createCustomDirectMessage = (message: DirectMessage) =>
  prisma.directMessage.create({
    data: { ...message, status: 'DELIVERED' },
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

export const createDirectMessage = (
  conversationId: number,
  authorId: number,
  data: SendMessageSchema
) =>
  prisma.directMessage.create({
    data: {
      ...data,
      conversationId,
      authorId,
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
