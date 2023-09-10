import { Prisma } from 'database';

export type ServerWithChannels = Prisma.ServerGetPayload<{
  include: {
    channels: true;
    categories: true;
  };
}>;

export type MemberWithPermissions = Prisma.MemberGetPayload<{
  include: {
    role: {
      include: {
        permissions: true;
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
    members: {
      include: {
        user: true;
      };
    };
  };
}>;

export type FullMember = Prisma.MemberGetPayload<{
  include: {
    user: {
      select: {
        name: true;
        username: true;
        imageUrl: true;
      };
    };
    role: true;
  };
}>;
