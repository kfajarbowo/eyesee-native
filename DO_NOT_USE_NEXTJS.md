# ⚠️ CRITICAL: DO NOT USE NEXT.JS IMPORTS!

## 🔴 JANGAN PERNAH REVERT KE NEXT.JS IMPORTS!

User terus me-revert files ke Next.js imports yang **TIDAK AKAN PERNAH WORKS** di Vite!

### ❌ YANG TIDAK BOLEH DIPAKAI:

```tsx
// ❌ JANGAN!
import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
"use client";
```

### ✅ YANG HARUS DIPAKAI:

```tsx
// ✅ BENAR!
import { Link, useLocation, useSearchParams } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
// Untuk image pakai <img> biasa
<img src="/path.jpg" alt="..." />
```

## 🚨 KENAPA TIDAK BOLEH?

**eyesee-native = Vite + React, BUKAN Next.js!**

Next.js components butuh:
- Next.js runtime (tidak ada di Vite)
- Node.js `process` object (tidak ada di browser)
- Next.js routing system (kita pakai React Router)

**ERROR YANG MUNCUL:**
```
ReferenceError: process is not defined
```

Ini karena Next.js Image component coba akses `process.env` yang tidak ada!

## 📋 FILES YANG SUDAH BENAR (JANGAN DIUBAH!):

1. `src/components/Navigation/Menu.tsx` - SUDAH BENAR dengan React Router
2. `src/components/Navigation/Filter.tsx` - SUDAH BENAR
3. `src/components/Navigation/DetailFilter.tsx` - SUDAH BENAR
4. `src/components/Navigation/RegionSelector.tsx` - SUDAH BENAR
5. `src/components/StreamCard/index.tsx` - SUDAH BENAR

## 🔒 ATURAN MUTLAK:

1. **JANGAN** add `"use client"` directive
2. **JANGAN** import dari `next/image`
3. **JANGAN** import dari `next/link`
4. **JANGAN** import dari `next-auth/react`
5. **JANGAN** import dari `next/navigation`

## ✅ YANG BOLEH:

1. ✅ `import { Link } from "react-router-dom"`
2. ✅ `import { useAuth } from "@/hooks/useAuth"`
3. ✅ `import { useLocation, useNavigate } from "react-router-dom"`
4. ✅ `<img src="..." />` untuk images

## 🎯 JIKA TETAP INGIN PAKAI NEXT.JS:

Maka harus **REBUILD SELURUH PROJECT** dengan Next.js + Electron (kompleks, lambat, besar).

Tapi ini akan **BUANG SEMUA PROGRESS** yang sudah kita buat!

## 📝 KESIMPULAN:

**JANGAN REVERT FILES KE NEXT.JS IMPORTS!**

Jika ada yang revert, app akan **SELALU ERROR** dengan "process is not defined"!
