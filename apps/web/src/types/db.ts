import { Prisma } from 'database';

export type ServerWithChannels = Prisma.ServerGetPayload<{
  include: {
    channels: true;
    categories: true;
  };
}>;
