@echo off
echo ========================================
echo Copying components from parent project
echo ========================================

echo.
echo [1/8] Copying services...
xcopy /E /I /Y /Q "..\src\services" "src\services"

echo.
echo [2/8] Copying UI components...
xcopy /E /I /Y /Q "..\src\components\ui" "src\components\ui"

echo.
echo [3/8] Copying FormGroup...
xcopy /E /I /Y /Q "..\src\components\FormGroup" "src\components\FormGroup"

echo.
echo [4/8] Copying Loading components...
xcopy /E /I /Y /Q "..\src\components\Loading" "src\components\Loading"

echo.
echo [5/8] Copying Navigation components...
xcopy /E /I /Y /Q "..\src\components\Navigation" "src\components\Navigation"

echo.
echo [6/9] Copying StreamCard components...
xcopy /E /I /Y /Q "..\src\components\StreamCard" "src\components\StreamCard"

echo.
echo [7/9] Copying RecordingCamera component...
xcopy /E /I /Y /Q "..\src\components\RecordingCamera" "src\components\RecordingCamera"

echo.
echo [8/9] Copying utils...
xcopy /E /I /Y /Q "..\src\utils" "src\utils"

echo.
echo [9/10] Copying types...
xcopy /E /I /Y /Q "..\src\types" "src\types"

echo.
echo [10/10] Copying public assets...
xcopy /E /I /Y /Q "..\public\icons" "public\icons"
xcopy /E /I /Y /Q "..\public\images" "public\images"

echo.
echo ========================================
echo Copy completed!
echo ========================================
echo.
echo Components copied:
echo - services (API hooks)
echo - components/ui (Radix UI)
echo - components/FormGroup
echo - components/Loading
echo - components/Navigation
echo - components/StreamCard
echo - components/RecordingCamera
echo - utils
echo - types
echo - public/icons
echo - public/images
echo.
pause
