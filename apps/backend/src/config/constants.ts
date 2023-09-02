import { env } from './env';

export const isDevelopment = env.NODE_ENV === 'development';
export const isProduction = env.NODE_ENV === 'production';

export const API_DOMAIN = isDevelopment
  ? 'localhost'
  : 'api.discord-clone.karimwael.com';
export const API_URL = isDevelopment
  ? `http://${API_DOMAIN}:8000`
  : `https://${API_DOMAIN}`;
export const APP_URL = isDevelopment
  ? 'http://localhost:3000'
  : 'https://discord-clone.karimwael.com';
