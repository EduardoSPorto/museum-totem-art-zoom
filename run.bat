@echo off
REM Painting Pigment Explorer - Easy Launcher for Windows
REM This script starts a local web server and opens the launcher interface

setlocal enabledelayedexpansion

echo.
echo 🎨 Starting Painting Pigment Explorer...
echo.

REM Get the directory where this script is located
set SCRIPT_DIR=%~dp0

REM Change to script directory
cd /d "%SCRIPT_DIR%"

REM Port configuration
set PORT=8000

REM Check if Python is available
python --version >nul 2>&1
if %errorlevel% neq 0 (
    python3 --version >nul 2>&1
    if %errorlevel% neq 0 (
        echo ❌ Error: Python is not installed or not in PATH
        echo.
        echo Please install Python from https://www.python.org
        echo Make sure to check "Add Python to PATH" during installation
        pause
        exit /b 1
    )
    set PYTHON=python3
) else (
    set PYTHON=python
)

echo 📍 Local server running at: http://localhost:%PORT%
echo 🌐 Launcher URL:          http://localhost:%PORT%/launcher.html
echo.
echo Opening launcher in your default browser...
echo.
echo Press Ctrl+C to stop the server
echo.

REM Open in default browser
start http://localhost:%PORT%/launcher.html

REM Start HTTP server
%PYTHON% -m http.server %PORT%
