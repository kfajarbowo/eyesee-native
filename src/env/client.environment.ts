import { API_CONFIG } from '@/config/api.config';

// Compatibility wrapper for parent project imports
export const clientEnv = {
  API_BASE_URL: API_CONFIG.BASE_URL,
  MEDIAMTX_URL: API_CONFIG.MEDIAMTX_URL,
  MEDIAMTX_API: API_CONFIG.MEDIAMTX_API,
  MEDIAMTX_RTSP: API_CONFIG.MEDIAMTX_RTSP,
  MAPS_URL: API_CONFIG.MAPS_URL,
};
