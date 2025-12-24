const { contextBridge } = require('electron');

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld('electron', {
  // Add any electron APIs you want to expose here
  platform: process.platform,
  version: process.versions.electron,
});

// Expose MediaMTX configuration for Electron
// Use 127.0.0.1 instead of localhost for Electron compatibility
contextBridge.exposeInMainWorld('ELECTRON_CONFIG', {
  MEDIAMTX_URL: 'http://127.0.0.1:8889',  // Stream URL
  MEDIAMTX_API: 'http://127.0.0.1:9997',  // API URL
  MEDIAMTX_RTSP: 'http://127.0.0.1:8554',        // RTSP hostname
});
