import { env } from "./env";

export const isDevelopment = env.NODE_ENV === "development";
export const isProduction = env.NODE_ENV === "production";

export const API_DOMAIN = isDevelopment ? "localhost" : "api.example.com";
export const API_URL = isDevelopment
  ? `http://${API_DOMAIN}:8000`
  : `https://${API_DOMAIN}`;
