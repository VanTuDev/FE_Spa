@echo off
echo ========================================
echo    YUMI SPA - DOCKER ACCESS INFO
echo ========================================
echo.

echo [1] Checking Docker container status...
docker ps | findstr "yumi-spa-frontend"
if %errorlevel% neq 0 (
    echo ❌ Container is not running!
    echo Starting container...
    docker-compose up -d
    timeout /t 3 /nobreak >nul
)

echo.
echo [2] Getting your IP address...
for /f "tokens=2 delims=:" %%a in ('ipconfig ^| findstr /i "IPv4"') do (
    set "ip=%%a"
    set "ip=!ip: =!"
    if not "!ip!"=="" (
        echo ✅ Your IP: !ip!
        echo.
        echo 🌐 Access URLs:
        echo    Local:  http://localhost:3000
        echo    Network: http://!ip!:3000
        echo.
        echo 📱 Other devices on the same network can access:
        echo    http://!ip!:3000
        echo.
        echo ========================================
        goto :end
    )
)

:end
echo.
echo Press any key to exit...
pause >nul 