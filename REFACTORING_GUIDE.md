# Refactoring Guide for Copied Components

Setelah menjalankan `copy-components.bat`, beberapa file mungkin perlu refactoring:

## 1. Remove "use client" Directives
File-file yang mungkin punya `"use client"` di line 1:
- `src/components/Navigation/*.tsx`
- `src/components/StreamCard/*.tsx`

**Action:** Hapus line `"use client"` dari file-file tersebut.

## 2. Replace Next.js Imports

### useRouter → useNavigate
```typescript
// Before (Next.js)
import { useRouter } from "next/navigation";
const router = useRouter();
router.push("/path");

// After (React Router)
import { useNavigate } from "react-router-dom";
const navigate = useNavigate();
navigate("/path");
```

### useSearchParams
```typescript
// Before (Next.js)
import { useSearchParams } from "next/navigation";
const searchParams = useSearchParams();
const value = searchParams?.get("key");

// After (React Router)
import { useSearchParams } from "react-router-dom";
const [searchParams] = useSearchParams();
const value = searchParams.get("key");
```

### Link Component
```typescript
// Before (Next.js)
import Link from "next/link";
<Link href="/path">Text</Link>

// After (React Router)
import { Link } from "react-router-dom";
<Link to="/path">Text</Link>
```

### Image Component
```typescript
// Before (Next.js)
import Image from "next/image";
<Image src="/path.jpg" alt="..." width={100} height={100} />

// After (Standard)
<img src="/path.jpg" alt="..." className="w-[100px] h-[100px]" />
```

## 3. Replace useSession with useAuth

```typescript
// Before (NextAuth)
import { useSession } from "next-auth/react";
const { data: session } = useSession();
const user = session?.user;

// After (Custom Auth)
import { useAuth } from "@/hooks/useAuth";
const { user, isAuthenticated } = useAuth();
```

## 4. Common Files to Check

### Navigation Component
- Remove `"use client"`
- Replace `useRouter` with `useNavigate`
- Replace `useSession` with `useAuth`
- Replace `Link` from next/link with react-router-dom

### StreamCard Component
- Remove `"use client"`
- Replace `useRouter` with `useNavigate`
- Replace `Link` from next/link with react-router-dom
- Replace `Image` from next/image with `<img>`

## 5. Quick Fix Commands

Jika ada error tentang module not found, coba:
```bash
# Restart Vite dev server
# Ctrl+C, lalu:
npm run dev
```

## 6. Testing Checklist

Setelah refactoring:
- [ ] No TypeScript errors
- [ ] No "use client" directives
- [ ] All imports resolved
- [ ] Navigation works
- [ ] Authentication works
- [ ] Components render correctly
