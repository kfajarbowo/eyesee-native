# ⚠️ PENTING: Kenapa Tidak Bisa Pakai Next.js Components

## Masalah

User mencoba pakai:
- `import Image from "next/image"` ❌
- `import Link from "next/link"` ❌
- `import { useSession } from "next-auth/react"` ❌
- `import { usePathname } from "next/navigation"` ❌

**Error yang muncul:**
```
process is not defined
'Link' cannot be used as a JSX component
'Image' cannot be used as a JSX component
```

## Penjelasan

**eyesee-native** adalah **Vite + React app**, BUKAN Next.js app!

Next.js components butuh:
- Next.js runtime environment
- Node.js `process` object
- Next.js routing system
- Next.js image optimization

Semua ini **TIDAK ADA** di Vite/React app!

## Solusi

### ❌ JANGAN Pakai (Next.js):
```tsx
import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
```

### ✅ HARUS Pakai (React Router):
```tsx
import { Link, useLocation, useSearchParams } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

// Untuk image, pakai <img> biasa
<img src="/path.jpg" alt="..." className="..." />
```

## Kenapa Harus Begini?

1. **eyesee-native** = Electron + Vite + React
2. **sas-kemhan** (parent) = Next.js

Kita **TIDAK BISA** pakai Next.js components di non-Next.js app!

## Files Yang Harus Direfactor

Semua files yang di-copy dari parent project HARUS direfactor:
- Remove `"use client"`
- Replace Next.js imports dengan React Router
- Replace `useSession` dengan `useAuth`
- Replace `Image` dengan `<img>`
- Replace `Link href` dengan `Link to`

## Jika Tetap Ingin Pakai Next.js

Kalau ingin pakai Next.js components, maka:
1. Jangan pakai Vite
2. Jangan pakai React Router
3. Pakai Next.js + Electron (lebih kompleks)

Tapi ini akan mengubah seluruh arsitektur yang sudah kita build!
