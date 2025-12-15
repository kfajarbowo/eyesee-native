/**
 * Get MediaMTX API URL based on current domain
 * For server-side usage, pass the request object to extract host info
 * For client-side usage, uses window.location
 */
export const getMediaMTXApiUrl = (request?: Request): string => {
  // Check if running in Electron with config
  if (typeof window !== 'undefined' && (window as any).ELECTRON_CONFIG?.MEDIAMTX_API) {
    return (window as any).ELECTRON_CONFIG.MEDIAMTX_API;
  }

  // Server side - extract from request headers
  if (typeof window === 'undefined' && request) {
    const host = request.headers.get('host');
    const url = new URL(request.url);
    const hostname = host ? host.split(':')[0] : url.hostname;
    const protocol = url.protocol;
    return `${protocol}//${hostname}:9997`;
  }

  // Server side fallback when no request provided
  if (typeof window === 'undefined') {
    return process.env.NEXT_PUBLIC_MEDIAMTX_API || 'http://0.0.0.0:9997';
  }

  // Client side - use current domain
  const { protocol, hostname } = window.location;
  return `${protocol}//${hostname}:9997`;
};



export const getMediaMTXApiHostname = (request?: Request): string => {
  // Check if running in Electron with config
  if (typeof window !== 'undefined' && (window as any).ELECTRON_CONFIG?.MEDIAMTX_RTSP) {
    return (window as any).ELECTRON_CONFIG.MEDIAMTX_RTSP;
  }

  // Server side - extract from request headers
  if (typeof window === 'undefined' && request) {
    const host = request.headers.get('host');
    const hostname = host ? host.split(':')[0] : '0.0.0.0';
    return `${hostname}:8554`;
  }

  // Server side fallback when no request provided
  if (typeof window === 'undefined') {
    return process.env.NEXT_PUBLIC_MEDIAMTX_API || 'http://0.0.0.0:9997';
  }

  // Client side - use current domain
  const { protocol, hostname } = window.location;
  return `${hostname}:8554`;
};




/**
 * Get MediaMTX API URL from request headers (for server-side routes without request param)
 * This function uses the headers from the incoming request
 */
export const getMediaMTXApiUrlFromHeaders = (headers?: Headers): string => {
  // Get base IP from environment variable
  const baseIP = process.env.NEXT_PUBLIC_BASE_IP || '192.168.1.100';

  if (headers) {
    const protocol = headers.get('x-forwarded-proto') || 'http';

    // Use IP address instead of host header
    return `${protocol}://${baseIP}:9997`;
  }

  // Fallback to environment variable with IP
  return process.env.NEXT_PUBLIC_MEDIAMTX_API || `http://${baseIP}:9997`;
};

/**
 * Get MediaMTX streaming URL based on current domain
 * If running on server side, falls back to environment variable
 * If running on client side, uses current domain with port 8889
 */
export const getMediaMTXStreamUrl = (): string => {
  // Check if running in Electron with config
  if (typeof window !== 'undefined' && (window as any).ELECTRON_CONFIG?.MEDIAMTX_URL) {
    return (window as any).ELECTRON_CONFIG.MEDIAMTX_URL;
  }

  // Server side fallback
  if (typeof window === 'undefined') {
    return process.env.NEXT_PUBLIC_MEDIAMTX_URL || 'http://0.0.0.0:8889';
  }

  // Client side - use current domain
  const { protocol, hostname } = window.location;
  return `${protocol}//${hostname}:8889`;
};