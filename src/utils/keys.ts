import {
  TOKEN_KEY_LOCAL,
  API_KEY_LOCAL,
  AUTH_DOMAIN_LOCAL,
  DATABASE_URL_LOCAL,
  PROJECT_ID_LOCAL,
  STORAGE_BUCKET_LOCAL,
  MESSAGING_SENDER_ID_LOCAL,
  APP_ID_LOCAL,
  MEASUREMENT_ID_LOCAL,
  BANNER_ID_ANDROID_LOCAL,
  ADMOB_ANDROID_APP_ID_LOCAL,
} from '@env';

export const TOKEN_KEY = process.env.TOKEN_KEY || TOKEN_KEY_LOCAL;

export const API_KEY = process.env.API_KEY || API_KEY_LOCAL;
export const AUTH_DOMAIN = process.env.AUTH_DOMAIN || AUTH_DOMAIN_LOCAL;
export const DATABASE_URL = process.env.DATABASE_URL || DATABASE_URL_LOCAL;
export const PROJECT_ID = process.env.PROJECT_ID || PROJECT_ID_LOCAL;
export const STORAGE_BUCKET =
  process.env.STORAGE_BUCKET || STORAGE_BUCKET_LOCAL;
export const MESSAGING_SENDER_ID =
  process.env.MESSAGING_SENDER_ID || MESSAGING_SENDER_ID_LOCAL;
export const APP_ID = process.env.APP_ID || APP_ID_LOCAL;
export const MEASUREMENT_ID =
  process.env.MEASUREMENT_ID || MEASUREMENT_ID_LOCAL;
export const BANNER_ID_ANDROID =
  process.env.BANNER_ID_ANDROID || BANNER_ID_ANDROID_LOCAL;
export const ADMOB_ANDROID_APP_ID =
  process.env.ADMOB_ANDROID_APP_ID || ADMOB_ANDROID_APP_ID_LOCAL;
