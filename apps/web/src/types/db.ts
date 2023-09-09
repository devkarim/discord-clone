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
