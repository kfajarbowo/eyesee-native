# Dashboard Debugging Guide

## Current Issue
Dashboard renders with navigation menu but content area is empty (no CCTV cameras showing).

## Debug Steps

### 1. Check Backend Status
Ensure backend is running:
```bash
cd e:\development\learning\sas-kemhan
npm run dev
```

Backend should be accessible at `http://localhost:3000`

### 2. Check Browser Console
After reloading Electron app, open DevTools (F12) and check console for:

**Expected Debug Output:**
```
=== Dashboard Debug ===
isLoading: false
isLoadingLayout: false
data: { status: true, data: [...] }
dataLayout: { ... }
layout: [...]
error: undefined
```

**Common Issues:**

#### Issue A: API Error
```
error: { message: "Network Error" }
```
**Solution:** Backend not running or wrong URL in `.env`

#### Issue B: No Data
```
data: { status: true, data: [] }
```
**Solution:** No CCTV data in database

#### Issue C: Layout Empty
```
layout: []
```
**Solution:** Layout configuration missing or mismatch

### 3. Check Environment Variables
File: `eyesee-native/.env`
```env
VITE_API_BASE_URL=http://localhost:3000
```

### 4. Check Network Tab
In DevTools Network tab, look for:
- `/api/secure/cctv` - Should return CCTV list
- `/api/secure/layout/user/*` - Should return user layout
- `/api/secure/layout/*` - Should return layout details

### 5. Test API Directly
Open browser to:
```
http://localhost:3000/api/secure/cctv
```

Should return JSON with CCTV data (if logged in via web).

## Next Steps Based on Results

**If API calls fail:**
1. Check backend is running
2. Check CORS settings
3. Check authentication token

**If data is empty:**
1. Add test CCTV data to database
2. Check database connection

**If layout is empty:**
1. Check layout configuration in database
2. May need to create default layout

## Quick Fix: Simplified Dashboard

If issues persist, we can create a simplified version that:
- Shows all CCTVs without layout
- Uses simple grid instead of react-grid-layout
- Easier to debug
