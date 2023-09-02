import { createClient } from 'redis';
import RedisStore from 'connect-redis';

import { env } from '@/config/env';

const redisClient = createClient({ url: env.REDIS_DATABASE_URL });

redisClient.connect().catch((err) => {
  console.error(err);
  process.exit();
});

const redisStore = new RedisStore({
  client: redisClient,
  prefix: 'discordclone:',
});

export default redisStore;
