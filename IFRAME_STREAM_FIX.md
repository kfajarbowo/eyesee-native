# ✅ IFRAME STREAM FIX - Electron Configuration

**Issue:** Camera streams not loading in Electron app (iframes blocked)  
**Solution:** Updated Electron security settings to allow iframe content  
**Date:** December 15, 2025

---

## 🔧 Changes Made

### **File:** `electron/main.cjs`

#### **1. Added webPreferences:**
```javascript
webPreferences: {
  nodeIntegration: false,
  contextIsolation: true,
  webSecurity: false,
  webviewTag: true,              // ← NEW: Enable webview/iframe
  allowRunningInsecureContent: true, // ← NEW: Allow HTTP in HTTPS
  preload: path.join(__dirname, 'preload.cjs'),
}
```

#### **2. Added CSP Handler:**
```javascript
// Allow all iframe sources and media content
mainWindow.webContents.session.webRequest.onHeadersReceived((details, callback) => {
  callback({
    responseHeaders: {
      ...details.responseHeaders,
      'Content-Security-Policy': ['default-src * \'unsafe-inline\' \'unsafe-eval\'; script-src * \'unsafe-inline\' \'unsafe-eval\'; connect-src * \'unsafe-inline\'; img-src * data: blob: \'unsafe-inline\'; frame-src *; style-src * \'unsafe-inline\';']
    }
  });
});
```

---

## 🎯 What This Fixes

### **Before:**
- ❌ Iframes blocked by Electron security
- ❌ Camera streams don't load
- ❌ MediaMTX URLs blocked
- ❌ CSP restrictions prevent iframe content

### **After:**
- ✅ Iframes allowed
- ✅ Camera streams load
- ✅ MediaMTX URLs accessible
- ✅ CSP allows all iframe sources

---

## 🧪 Testing Required

**After restarting Electron app:**

1. [ ] Dashboard streams load
2. [ ] Detail page streams load
3. [ ] All camera types work
4. [ ] No console errors about CSP
5. [ ] Iframe content displays

---

## ⚠️ Security Note

**These settings are LESS secure** but necessary for:
- Loading external iframe content
- Accessing MediaMTX streams
- HTTP content in local environment

**For Production:**
- ✅ OK for internal/trusted network
- ⚠️ Consider tightening CSP for public deployment
- ✅ MediaMTX should use HTTPS in production

---

## 🚀 Next Steps

1. **Restart Electron app** (Ctrl+C, then `npm run electron:dev`)
2. **Test streams** on dashboard and detail pages
3. **Verify** all camera types load streams
4. **Proceed** to production build if working

---

## 📝 Alternative Solutions (If Still Not Working)

### **Option 1: Use BrowserView instead of iframe**
```javascript
// Replace iframe with BrowserView
const { BrowserView } = require('electron');
const view = new BrowserView();
mainWindow.setBrowserView(view);
view.setBounds({ x: 0, y: 0, width: 800, height: 600 });
view.webContents.loadURL(streamUrl);
```

### **Option 2: Use webview tag**
```html
<!-- In React component -->
<webview src={streamUrl} style={{ width: '100%', height: '100%' }} />
```

### **Option 3: Check MediaMTX CORS**
```yaml
# In mediamtx.yml
webRTCAllowOrigin: "*"
```

---

**Status:** ✅ Configuration updated  
**Next:** Restart Electron and test streams
