import { createClient } from 'redis';
import RedisStore from 'connect-redis';

import { env } from '../config/env.js';

const redisClient = createClient({
  url: env.REDIS_DATABASE_URL,
  pingInterval: 1000 * 60 * 5,
});

redisClient.connect().catch((err) => {
  console.error('Redis Client Error', err);
  process.exit();
});

const redisStore = new RedisStore({
  client: redisClient,
  prefix: 'discordclone:',
});

export default redisStore;
