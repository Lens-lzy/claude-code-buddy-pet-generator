@echo off
REM Buddy Pet Generator 启动脚本 (Windows)

REM 获取脚本所在目录
set DIR=%~dp0

REM 在默认浏览器中打开 HTML 文件
start "" "%DIR%buddy-generator.html"
