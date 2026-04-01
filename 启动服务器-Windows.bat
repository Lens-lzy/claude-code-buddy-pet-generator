@echo off
REM Buddy Pet Generator - 启动服务器 (Windows)

echo 🎮 正在启动 Buddy Pet Generator 服务器...
echo.

REM 检查 Bun 是否安装
where bun >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ❌ 未检测到 Bun
    echo.
    echo 请先安装 Bun:
    echo powershell -c "irm bun.sh/install.ps1 | iex"
    echo.
    pause
    exit /b 1
)

echo ✅ Bun 已安装
echo.

REM 启动服务器
cd /d "%~dp0"
bun server.js

pause
