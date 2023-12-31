import { Prisma } from 'database';

export type FullUser = Prisma.UserGetPayload<{
  select: {
    id: true;
    name: true;
    username: true;
    imageUrl: true;
    status: true;
  };
}>;

export type ServerWithChannels = Prisma.ServerGetPayload<{
  include: {
    channels: true;
    categories: true;
  };
}>;

export type ServerWithMembersCount = Prisma.ServerGetPayload<{
  include: {
    _count: {
      select: {
        members: true;
      };
    };
  };
}>;

export type MemberWithPermissions = Prisma.MemberGetPayload<{
  include: {
    role: {
      include: {
        permissions: true;
      };
    };
    user: {
      select: {
        id: true;
        name: true;
        username: true;
        imageUrl: true;
        status: true;
      };
    };
  };
}>;

export type FullChannel = Prisma.ChannelGetPayload<{
  include: {
    category: true;
    owner: true;
  };
}>;

export type ServerWithRoles = Prisma.ServerGetPayload<{
  include: {
    roles: {
      include: {
        members: true;
      };
    };
  };
}>;

export type FullRole = Prisma.RoleGetPayload<{
  include: {
    permissions: true;
    members: {
      include: {
        user: {
          select: {
            id: true;
            name: true;
            username: true;
            imageUrl: true;
            status: true;
          };
        };
      };
    };
  };
}>;

export type FullMember = Prisma.MemberGetPayload<{
  include: {
    user: {
      select: {
        id: true;
        name: true;
        username: true;
        imageUrl: true;
        status: true;
      };
    };
    role: true;
  };
}>;

export type MessageWithAuthor = Prisma.MessageGetPayload<{
  include: {
    author: {
      include: {
        role: {
          select: {
            color: true;
            name: true;
          };
        };
        user: {
          select: {
            id: true;
            name: true;
            username: true;
            imageUrl: true;
            status: true;
          };
        };
      };
    };
  };
}>;

export type UserWithoutStatus = Prisma.UserGetPayload<{
  select: {
    id: true;
    name: true;
    username: true;
    imageUrl: true;
  };
}>;

export type ConversationWithUsers = Prisma.ConversationGetPayload<{
  include: {
    users: {
      select: {
        id: true;
        username: true;
        imageUrl: true;
        name: true;
        status: true;
      };
    };
  };
}>;

export type FullDirectMessage = Prisma.DirectMessageGetPayload<{
  include: {
    author: {
      select: {
        id: true;
        name: true;
        username: true;
        imageUrl: true;
        status: true;
      };
    };
  };
}>;
