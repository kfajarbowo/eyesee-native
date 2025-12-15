/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string
  readonly VITE_MEDIAMTX_URL: string
  readonly VITE_MEDIAMTX_API: string
  readonly VITE_MEDIAMTX_RTSP: string
  readonly VITE_MAPS_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
