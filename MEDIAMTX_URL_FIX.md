# ✅ MEDIAMTX STREAM URL FIX - CRITICAL!

**Issue:** Streams not loading in Electron (localhost vs actual IP)  
**Root Cause:** Electron uses `localhost` but MediaMTX is on different IP  
**Solution:** Configure MediaMTX URLs in preload script  
**Date:** December 15, 2025

---

## 🔍 Problem Analysis

### **Web Version (Working):**
- Uses `window.location.hostname` = `192.168.204.100`
- Stream URL: `http://192.168.204.100:8889/cctv-cctv2`
- ✅ Works because browser is on same network

### **Electron Version (Not Working):**
- Uses `window.location.hostname` = `localhost`
- Stream URL: `http://localhost:8889/cctv-cctv2`
- ❌ Fails because MediaMTX is NOT on localhost

---

## 🔧 Solution Applied

### **File:** `electron/preload.cjs`

Added MediaMTX configuration:
```javascript
contextBridge.exposeInMainWorld('ELECTRON_CONFIG', {
  MEDIAMTX_URL: 'http://192.168.204.100:8889',  // Stream URL
  MEDIAMTX_API: 'http://192.168.204.100:9997',  // API URL
  MEDIAMTX_RTSP: '192.168.204.100:8554',        // RTSP hostname
});
```

### **How It Works:**

1. `getMediaMTXStreamUrl()` checks for `window.ELECTRON_CONFIG`
2. If found, uses configured IP instead of `localhost`
3. Stream URLs now point to correct MediaMTX server

---

## ⚙️ CONFIGURATION REQUIRED

### **IMPORTANT: Update IP Address!**

**Current IP:** `192.168.204.100` (from web version)

**If MediaMTX is on different IP:**
1. Open `electron/preload.cjs`
2. Change all `192.168.204.100` to your MediaMTX server IP
3. Save and restart Electron

**Example for different IP:**
```javascript
MEDIAMTX_URL: 'http://192.168.1.50:8889',
MEDIAMTX_API: 'http://192.168.1.50:9997',
MEDIAMTX_RTSP: '192.168.1.50:8554',
```

---

## 🧪 Testing Steps

### **1. Restart Electron** (CRITICAL!)
```bash
# Stop Electron (Ctrl+C)
npm run electron:dev
```

### **2. Verify Configuration**
Open DevTools Console and type:
```javascript
console.log(window.ELECTRON_CONFIG);
```

**Expected Output:**
```javascript
{
  MEDIAMTX_URL: "http://192.168.204.100:8889",
  MEDIAMTX_API: "http://192.168.204.100:9997",
  MEDIAMTX_RTSP: "192.168.204.100:8554"
}
```

### **3. Check Stream URL**
In Console, check what URL is being used:
```javascript
// In StreamCard component
console.log(`${MEDIAMTX_URL}/${path_slug}`);
```

**Expected:** `http://192.168.204.100:8889/cctv-cctv2`  
**NOT:** `http://localhost:8889/cctv-cctv2`

### **4. Test Streams**
- [ ] Dashboard streams load
- [ ] Detail page streams load
- [ ] All camera types work

---

## 🔍 Troubleshooting

### **Issue: Still showing localhost**
**Solution:** 
1. Completely close Electron app
2. Restart with `npm run electron:dev`
3. Hard refresh (Ctrl+Shift+R)

### **Issue: Streams still not loading**
**Check:**
1. MediaMTX server is running
2. IP address is correct
3. Port 8889 is accessible
4. Camera is actually online

**Test MediaMTX directly:**
```bash
# Open in browser
http://192.168.204.100:8889/cctv-cctv2
```

If this works in browser but not Electron, check console for errors.

### **Issue: CORS errors**
**Already fixed** in `electron/main.cjs`:
- `webSecurity: false`
- `allowRunningInsecureContent: true`
- CSP headers configured

---

## 📝 For Production Build

### **Before Building:**
1. ✅ Verify MediaMTX IP is correct
2. ✅ Test streams work in dev mode
3. ✅ Update IP if MediaMTX server changes

### **For Distribution:**
Consider making IP configurable:
- Environment variable
- Config file
- Settings page in app

---

## 🎯 Expected vs Actual

### **Before Fix:**
```
Dashboard: http://localhost:8889/cctv-cctv2 ❌
Detail: http://localhost:8889/cctv-cctv2 ❌
```

### **After Fix:**
```
Dashboard: http://192.168.204.100:8889/cctv-cctv2 ✅
Detail: http://192.168.204.100:8889/cctv-cctv2 ✅
```

---

## ⚠️ CRITICAL NOTES

1. **IP Address MUST match** your MediaMTX server
2. **Restart Electron** after changing preload.cjs
3. **Hard refresh** (Ctrl+Shift+R) after restart
4. **Check DevTools Console** for actual URLs being used

---

## 🚀 Next Steps

1. **Restart Electron app**
2. **Verify ELECTRON_CONFIG** in console
3. **Test streams** on all pages
4. **If working** → Proceed to production build
5. **If not working** → Check troubleshooting section

---

**Status:** ✅ Configuration added  
**Action Required:** Restart Electron and verify IP address  
**Critical:** IP must match your MediaMTX server!
