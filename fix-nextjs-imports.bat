@echo off
echo ========================================
echo Fixing Next.js imports to React Router
echo ========================================

echo.
echo [1/3] Fixing Navigation components...

REM Fix Filter.tsx
powershell -Command "(Get-Content 'src\components\Navigation\Filter.tsx') -replace \"'use client';\r?\n\r?\n\", '' -replace 'import Image from \"next/image\";', '' -replace 'import Link from \"next/link\";', 'import { Link } from \"react-router-dom\";' -replace 'import { useSession } from \"next-auth/react\";', 'import { useAuth } from \"@/hooks/useAuth\";' -replace 'const { data, status } = useSession\(\);', 'const { user, isAuthenticated } = useAuth();' -replace 'status === \"authenticated\"', 'isAuthenticated' -replace 'data\?\.user', 'user' -replace 'href=', 'to=' -replace '<Image', '<img' -replace 'fill', 'width=\"25\" height=\"25\"' | Set-Content 'src\components\Navigation\Filter.tsx'"

REM Fix DetailFilter.tsx  
powershell -Command "(Get-Content 'src\components\Navigation\DetailFilter.tsx') -replace \"'use client';\r?\n\r?\n\", '' -replace 'import Image from \"next/image\";', '' -replace 'import Link from \"next/link\";', 'import { Link } from \"react-router-dom\";' -replace 'import { useSession } from \"next-auth/react\";', 'import { useAuth } from \"@/hooks/useAuth\";' -replace 'const { data, status } = useSession\(\);', 'const { user, isAuthenticated } = useAuth();' -replace 'status === \"authenticated\"', 'isAuthenticated' -replace 'data\?\.user', 'user' -replace 'href=', 'to=' -replace '<Image', '<img' -replace 'fill', 'width=\"25\" height=\"25\"' | Set-Content 'src\components\Navigation\DetailFilter.tsx'"

echo.
echo [2/3] Fixing StreamCard...
REM Already fixed manually

echo.
echo [3/3] Removing use client from UI components...
powershell -Command "Get-ChildItem -Path 'src\components\ui' -Filter *.tsx -Recurse | ForEach-Object { (Get-Content $_.FullName) -replace \"'use client';\r?\n\", '' -replace '\"use client\";\r?\n', '' | Set-Content $_.FullName }"

echo.
echo ========================================
echo Fix completed!
echo ========================================
echo.
echo All Next.js imports have been converted to React Router
echo.
pause
