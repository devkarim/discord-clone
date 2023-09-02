export const APP_NAME = 'Discord Clone';
export const APP_VERSION = '0.0.1';

export const isDevelopment = process.env.NODE_ENV === 'development';
export const isProduction = process.env.NODE_ENV === 'production';

export const APP_URL = isDevelopment
  ? 'http://localhost:3000'
  : 'https://discord-clone.karimwael.com';
export const API_URL = isDevelopment
  ? 'http://localhost:8000'
  : 'https://api.discord.karimwael.com';
