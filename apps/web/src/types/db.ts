import { Prisma } from 'database';

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
