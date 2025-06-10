import { environment } from '@environments/environment';

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: `${environment.apiUrl}/auth/login`,
    REGISTER: `${environment.apiUrl}/auth/register`,
    LOGOUT: `${environment.apiUrl}/auth/logout`
  },
  TEST: {
    PUBLIC: `${environment.apiUrl}/test/public`,
    PROTECTED: `${environment.apiUrl}/test/protected`,
    USER: `${environment.apiUrl}/test/user`,
    ADMIN: `${environment.apiUrl}/test/admin`
  }
};

export const STORAGE_KEYS = {
  ACCESS_TOKEN: 'access_token',
  USER_DATA: 'user_data',
  REMEMBER_ME: 'remember_me'
};

export const APP_CONSTANTS = {
  TOKEN_HEADER_KEY: 'Authorization',
  TOKEN_PREFIX: 'Bearer ',
  DEFAULT_LANGUAGE: 'en',
  SESSION_TIMEOUT: 3600000 // 1 hour in milliseconds
};
