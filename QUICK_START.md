# 🚀 Eyesee Native - Quick Start Guide

## ⚡ One-Time Setup

Run this **ONCE** to copy all components and fix imports:

```bash
setup-complete.bat
```

This will:
- ✅ Copy all required components from parent project
- ✅ Copy public assets (images, icons)
- ✅ Auto-fix most Next.js imports
- ✅ Remove "use client" directives

## 🏃 Running the App

### 1. Start Backend (Required!)
```bash
cd e:\development\learning\sas-kemhan
npm run dev
```
Backend must be running at `http://localhost:3000`

### 2. Start Electron App
```bash
cd eyesee-native
npm run dev          # Start Vite dev server
npm run electron:dev # Start Electron (in another terminal)
```

Or combined:
```bash
npm run electron:dev
```

## ⚠️ Important Rules

### ❌ NEVER Use These (Next.js):
```tsx
import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";
"use client";
```

### ✅ ALWAYS Use These (React Router):
```tsx
import { Link, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
<img src="/path.jpg" />  // For images
```

## 🔧 If You Get Errors

### Error: "process is not defined"
**Cause:** Next.js imports still exist
**Fix:** Run `setup-complete.bat` again

### Error: "Module not found"
**Cause:** Components not copied
**Fix:** Run `setup-complete.bat`

### Error: Blank white screen
**Cause:** Check browser console (F12)
**Fix:** Look for specific error and fix accordingly

## 📁 Project Structure

```
eyesee-native/
├── src/
│   ├── components/      # React components (copied from parent)
│   ├── pages/           # Route pages
│   ├── hooks/           # Custom hooks (useAuth, etc)
│   ├── services/        # API services
│   ├── types/           # TypeScript types
│   └── utils/           # Utilities
├── public/              # Static assets
├── electron/            # Electron main process
└── setup-complete.bat   # One-time setup script
```

## 🎯 Current Status

✅ **Working:**
- Login & Authentication
- Dashboard with CCTV grid
- Navigation menu
- API connection to backend

⏳ **In Progress:**
- Header/Navbar styling
- Frame images
- Additional routes

## 📚 Documentation

- `DO_NOT_USE_NEXTJS.md` - Why we can't use Next.js components
- `WHY_NO_NEXTJS.md` - Architecture explanation
- `REFACTORING_GUIDE.md` - How to refactor copied components
- `DASHBOARD_DEBUG.md` - Debugging guide

## 🆘 Need Help?

1. Check console errors (F12)
2. Read error message carefully
3. Check if backend is running
4. Verify `.env` file has correct API URL
5. Try restarting Vite dev server

## 🎉 Success Checklist

- [ ] Backend running at `http://localhost:3000`
- [ ] Ran `setup-complete.bat` successfully
- [ ] Vite dev server running
- [ ] Electron app opens
- [ ] Can login successfully
- [ ] Dashboard shows CCTV cards
- [ ] No errors in console

If all checked, you're good to go! 🚀
