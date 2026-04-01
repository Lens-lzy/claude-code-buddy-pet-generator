#!/bin/bash

# Buddy Pet Generator - 启动服务器 (Mac)

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

echo "🎮 正在启动 Buddy Pet Generator 服务器..."
echo ""

# 检查 Bun 是否安装（尝试多种路径）
BUN_CMD=""
if command -v bun &> /dev/null; then
    BUN_CMD="bun"
elif [ -f "$HOME/.bun/bin/bun" ]; then
    BUN_CMD="$HOME/.bun/bin/bun"
fi

if [ -z "$BUN_CMD" ]; then
    echo "❌ 未检测到 Bun"
    echo ""
    echo "请先安装 Bun:"
    echo "  brew install oven-sh/bun/bun"
    echo "  或: curl -fsSL https://bun.sh/install | bash"
    echo ""
    read -p "按回车键退出..."
    exit 1
fi

echo "✅ Bun 已安装: $($BUN_CMD --version)"
echo ""

# 启动服务器
cd "$DIR"
$BUN_CMD server.js

# 保持窗口打开
read -p "按回车键退出..."
