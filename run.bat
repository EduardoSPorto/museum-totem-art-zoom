@echo off
REM Painting Pigment Explorer - Easy Launcher for Windows
REM This script starts a local web server and opens the launcher interface

setlocal enabledelayedexpansion

REM Get the directory where this script is located
set SCRIPT_DIR=%~dp0

REM Change to script directory
cd /d "%SCRIPT_DIR%"

REM Port configuration
set PORT=8000
set MAX_ATTEMPTS=10
set ATTEMPT=1

:find_port
netstat -ano | findstr /R /C:":%PORT% " >nul 2>&1
if %errorlevel% neq 0 (
    goto port_found
)

set /a PORT+=1
set /a ATTEMPT+=1
if %ATTEMPT% leq %MAX_ATTEMPTS% goto find_port

echo Error: Could not find an available port after %MAX_ATTEMPTS% attempts
exit /b 1

:port_found
echo Starting Painting Pigment Explorer
echo.
echo Launcher URL: http://localhost:%PORT%/launcher.html
echo.
echo Press Ctrl+C to stop the server
echo.

REM Check which HTTP server is available (python3, python, or php)
set SERVER_CMD=
python3 --version >nul 2>&1
if %errorlevel% equ 0 (
    set SERVER_CMD=python3 -m http.server %PORT%
    goto start_server
)

python --version >nul 2>&1
if %errorlevel% equ 0 (
    set SERVER_CMD=python -m http.server %PORT%
    goto start_server
)

php -v >nul 2>&1
if %errorlevel% equ 0 (
    set SERVER_CMD=php -S localhost:%PORT%
    goto start_server
)

echo Error: No suitable HTTP server found (python3, python, or php required)
exit /b 1

:start_server
REM Open browser to the served launcher URL
start http://localhost:%PORT%/launcher.html

REM Start HTTP server
%SERVER_CMD%
