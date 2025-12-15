export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000',
  TIMEOUT: 30000,
  MEDIAMTX_URL: import.meta.env.VITE_MEDIAMTX_URL || 'http://localhost:8889',
  MEDIAMTX_RTSP: import.meta.env.VITE_MEDIAMTX_RTSP || 'localhost:8554',
} as const;

export type ApiConfig = typeof API_CONFIG;
