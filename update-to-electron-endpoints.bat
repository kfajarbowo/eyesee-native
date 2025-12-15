@echo off
echo ========================================
echo Updating Frontend to Use Electron Endpoints
echo ========================================
echo.

echo Updating CCTV services...
powershell -Command "(Get-Content 'src/services/api/cctv/get/get.service.ts') -replace '/secure/cctv', '/electron/cctv' | Set-Content 'src/services/api/cctv/get/get.service.ts'"

echo Updating Layout services...
powershell -Command "(Get-Content 'src/services/api/layout/get/get.service.ts') -replace '/secure/layout', '/electron/layout' | Set-Content 'src/services/api/layout/get/get.service.ts'"

echo Updating Region services...
powershell -Command "if (Test-Path 'src/services/api/region/get/get.service.ts') { (Get-Content 'src/services/api/region/get/get.service.ts') -replace '/secure/region', '/electron/region' | Set-Content 'src/services/api/region/get/get.service.ts' }"

echo.
echo ========================================
echo Update Complete!
echo ========================================
echo.
echo All service files now use /electron/ endpoints
echo.
echo Next steps:
echo 1. Restart backend (if not already running)
echo 2. Restart Vite dev server
echo 3. Restart Electron app
echo 4. Try login again
echo.
pause
