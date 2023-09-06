import { env } from '../config/env.js';

import { PrismaClient } from 'database';

declare global {
  var prismadb: PrismaClient | undefined;
}

const prisma = globalThis.prismadb || new PrismaClient();
if (env.NODE_ENV !== 'production') globalThis.prismadb = prisma;

export default prisma;
