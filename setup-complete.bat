@echo off
echo ========================================
echo COMPLETE SETUP - Eyesee Native
echo ========================================
echo.
echo This will:
echo 1. Copy all required components
echo 2. Copy public assets  
echo 3. Fix Next.js imports automatically
echo.
pause

echo.
echo ========================================
echo STEP 1: Copying Components
echo ========================================

echo [1/16] Copying services...
xcopy /E /I /Y /Q "..\\src\\services" "src\\services"

echo [2/16] Copying UI components...
xcopy /E /I /Y /Q "..\\src\\components\\ui" "src\\components\\ui"

echo [3/16] Copying FormGroup...
xcopy /E /I /Y /Q "..\\src\\components\\FormGroup" "src\\components\\FormGroup"

echo [4/16] Copying Loading...
xcopy /E /I /Y /Q "..\\src\\components\\Loading" "src\\components\\Loading"

echo [5/16] Copying Navigation...
xcopy /E /I /Y /Q "..\\src\\components\\Navigation" "src\\components\\Navigation"

echo [6/16] Copying StreamCard...
xcopy /E /I /Y /Q "..\\src\\components\\StreamCard" "src\\components\\StreamCard"

echo [7/16] Copying RecordingCamera...
xcopy /E /I /Y /Q "..\\src\\components\\RecordingCamera" "src\\components\\RecordingCamera"

echo [8/16] Copying HeaderDashboard...
xcopy /E /I /Y /Q "..\\src\\components\\HeaderDashboard" "src\\components\\HeaderDashboard"

echo [9/16] Copying Header...
xcopy /E /I /Y /Q "..\\src\\components\\Header" "src\\components\\Header"

echo [10/16] Copying Chat...
xcopy /E /I /Y /Q "..\\src\\components\\Chat" "src\\components\\Chat"

echo [11/16] Copying Modal...
xcopy /E /I /Y /Q "..\\src\\components\\Modal" "src\\components\\Modal"

echo [12/16] Copying common...
xcopy /E /I /Y /Q "..\\src\\components\\common" "src\\components\\common"

echo [13/16] Copying utils...
xcopy /E /I /Y /Q "..\\src\\utils" "src\\utils"

echo [14/16] Copying types...
xcopy /E /I /Y /Q "..\\src\\types" "src\\types"

echo [15/16] Copying common module...
xcopy /E /I /Y /Q "..\\src\\common" "src\\common"

echo [16/16] Copying public assets...
xcopy /E /I /Y /Q "..\\public\\icons" "public\\icons"
xcopy /E /I /Y /Q "..\\public\\images" "public\\images"

echo.
echo ========================================
echo Components copied successfully!
echo ========================================
echo.
echo NOTE: Next.js imports will cause errors.
echo You need to manually refactor components or wait for auto-fix script.
echo.
echo See REFACTORING_GUIDE.md for manual refactoring steps.
echo.
pause
