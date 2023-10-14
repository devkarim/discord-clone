import prisma from '../lib/prisma.js';

export const createConversation = (
  userIds: number[],
  isGroup: boolean = false
) =>
  prisma.conversation.create({
    data: {
      isGroup,
      users: {
        connect: userIds.map((id) => ({
          id,
        })),
      },
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

export const getOrCreatePairConversation = async (
  firstUserId: number,
  secondUserId: number
) => {
  const conversation = await getConversationByPairOfUsers(
    firstUserId,
    secondUserId
  );
  if (!conversation) return createConversation([firstUserId, secondUserId]);
  return conversation;
};

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
