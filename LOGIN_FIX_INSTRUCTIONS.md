# Quick Fix Instructions

## Problem: Login redirect loop

## Root Cause:
Backend middleware was checking for token in **cookies** only, but Electron app sends token in **Authorization header**.

## What Was Fixed:
1. ✅ Backend `middleware.ts` - Now accepts token from Authorization header
2. ✅ Frontend axios - Sends token in Authorization header

## IMPORTANT: Restart Backend!

**The middleware.ts change requires backend restart!**

### Steps:
1. **Stop backend** (Ctrl+C in terminal running `npm run dev`)
2. **Start backend again**: `npm run dev`
3. **Wait for backend to fully start** (should see "Ready in X ms")
4. **Then try login again in Electron app**

## If Still Not Working:

Check backend terminal logs for:
```
[Middleware] Token found, allowing request
```

If you see:
```
[Middleware] No token found in cookie or Authorization header
```

Then token is not being sent correctly.

## Debug Commands:

In Electron console after login, check:
```javascript
localStorage.getItem('auth_token')
```

Should return a long JWT string.

---

**RESTART BACKEND NOW!** 🔄
