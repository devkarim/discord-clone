import { env } from './env.js';

export const isDevelopment = env.NODE_ENV === 'development';
export const isProduction = env.NODE_ENV === 'production';

export const API_DOMAIN = isDevelopment
  ? 'localhost'
  : 'api.discord.karimwael.com';
export const APP_DOMAIN = isDevelopment
  ? 'localhost'
  : 'discord-clone.karimwael.com';
export const API_URL = isDevelopment
  ? `http://${API_DOMAIN}:8000`
  : `https://${API_DOMAIN}`;
export const APP_URL = isDevelopment
  ? `http://${APP_DOMAIN}:3000`
  : `https://${APP_DOMAIN}`;

export const CHAT_ADD_KEY = 'chat:messages:new';
