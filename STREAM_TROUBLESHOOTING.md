# 🔍 STREAM TROUBLESHOOTING GUIDE

**Issue:** Streams not loading in Electron (localhost MediaMTX)  
**Status:** Investigating  
**Date:** December 15, 2025

---

## ✅ Changes Applied So Far

### **1. Electron Configuration (`electron/main.cjs`)**
```javascript
webPreferences: {
  nodeIntegration: false,
  contextIsolation: true,
  webSecurity: false,           // ✅ Disable CORS
  webviewTag: true,              // ✅ Enable webview/iframe
  allowRunningInsecureContent: true, // ✅ Allow HTTP
  sandbox: false,                // ✅ NEW: Disable sandbox
  preload: path.join(__dirname, 'preload.cjs'),
}
```

### **2. CSP Headers (`electron/main.cjs`)**
```javascript
mainWindow.webContents.session.webRequest.onHeadersReceived((details, callback) => {
  callback({
    responseHeaders: {
      ...details.responseHeaders,
      'Content-Security-Policy': ['default-src * \'unsafe-inline\' \'unsafe-eval\'; ...']
    }
  });
});
```

### **3. MediaMTX Config (`electron/preload.cjs`)**
```javascript
ELECTRON_CONFIG: {
  MEDIAMTX_URL: 'http://localhost:8889',
  MEDIAMTX_API: 'http://localhost:9997',
  MEDIAMTX_RTSP: 'localhost:8554',
}
```

---

## 🧪 Diagnostic Steps

### **Step 1: Verify MediaMTX is Running**
```bash
# Test in browser
http://localhost:8889/cctv-cctv2
```

**Expected:** Stream loads in browser  
**If not working:** MediaMTX not running or camera offline

---

### **Step 2: Check Electron Console**

**Open DevTools (F12) → Console tab**

**Look for errors like:**
- ❌ `Refused to frame 'http://localhost:8889'`
- ❌ `ERR_BLOCKED_BY_CLIENT`
- ❌ `net::ERR_CONNECTION_REFUSED`
- ❌ `CSP violation`

**Screenshot and report these errors!**

---

### **Step 3: Verify ELECTRON_CONFIG**

**In Console, type:**
```javascript
console.log(window.ELECTRON_CONFIG);
```

**Expected:**
```javascript
{
  MEDIAMTX_URL: "http://localhost:8889",
  MEDIAMTX_API: "http://localhost:9997",
  MEDIAMTX_RTSP: "localhost:8554"
}
```

**If undefined:** Preload script not working

---

### **Step 4: Check Stream URL**

**In Console, check what URL iframe is trying to load:**
```javascript
// Find iframe element
document.querySelector('iframe')?.src
```

**Expected:** `http://localhost:8889/cctv-cctv2`

---

### **Step 5: Test Direct iframe**

**In Console, try creating iframe manually:**
```javascript
const iframe = document.createElement('iframe');
iframe.src = 'http://localhost:8889/cctv-cctv2';
iframe.style.width = '400px';
iframe.style.height = '300px';
document.body.appendChild(iframe);
```

**Does it load?**
- ✅ Yes → Problem is in StreamCard component
- ❌ No → Electron blocking iframes

---

## 🔧 Possible Solutions

### **Solution 1: Use BrowserView (Recommended)**

Instead of iframe, use Electron's BrowserView:

**Update `electron/main.cjs`:**
```javascript
const { app, BrowserWindow, BrowserView } = require('electron');

// In createWindow function, add IPC handler
const { ipcMain } = require('electron');

ipcMain.on('load-stream', (event, streamUrl) => {
  const view = new BrowserView();
  mainWindow.setBrowserView(view);
  view.setBounds({ x: 0, y: 100, width: 800, height: 600 });
  view.webContents.loadURL(streamUrl);
});
```

**Update StreamCard to use IPC:**
```tsx
// In StreamCard component
useEffect(() => {
  if (window.electron) {
    window.electron.ipcRenderer.send('load-stream', streamUrl);
  }
}, [streamUrl]);
```

---

### **Solution 2: Use webview tag**

**Update StreamCard component:**
```tsx
// Replace iframe with webview
<webview
  src={`${MEDIAMTX_URL}/${path_slug}`}
  style={{ width: '100%', height: '100%' }}
  allowpopups="true"
/>
```

**Note:** Requires `webviewTag: true` (already enabled)

---

### **Solution 3: Proxy MediaMTX through Backend**

**Create proxy endpoint in backend:**
```typescript
// src/app/api/stream/[path]/route.ts
export async function GET(
  request: Request,
  { params }: { params: { path: string } }
) {
  const streamUrl = `http://localhost:8889/${params.path}`;
  const response = await fetch(streamUrl);
  return new Response(response.body, {
    headers: {
      'Content-Type': response.headers.get('Content-Type') || 'text/html',
    },
  });
}
```

**Update StreamCard:**
```tsx
// Use backend proxy instead of direct MediaMTX
<iframe src={`http://localhost:3000/api/stream/${path_slug}`} />
```

---

### **Solution 4: Disable Frame Ancestors (MediaMTX Config)**

**Check `mediamtx.yml`:**
```yaml
# Allow embedding in iframes
webRTCAllowOrigin: "*"
```

---

## 📊 Comparison: Web vs Electron

### **Web Version (Working):**
- Browser: Chrome/Edge
- URL: `http://localhost:3000`
- iframe src: `http://localhost:8889/cctv-cctv2`
- ✅ Same-origin or CORS allowed

### **Electron Version (Not Working):**
- Browser: Chromium (Electron)
- URL: `http://localhost:5173` (Vite dev)
- iframe src: `http://localhost:8889/cctv-cctv2`
- ❌ Possibly blocked by Electron security

---

## 🎯 Next Steps

1. **Restart Electron** with latest changes
2. **Check Console** for specific errors
3. **Try manual iframe test** (Step 5 above)
4. **Report errors** to determine best solution

---

## 📝 Questions to Answer

1. **Does MediaMTX work in regular browser?**
   - Test: `http://localhost:8889/cctv-cctv2`

2. **What errors appear in Electron console?**
   - Screenshot console errors

3. **Does manual iframe test work?**
   - Try Step 5 above

4. **Is MediaMTX configured to allow iframes?**
   - Check `mediamtx.yml`

---

**Status:** Awaiting console errors to determine root cause  
**Next:** Screenshot console errors and test manual iframe
