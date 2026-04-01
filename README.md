# Buddy Pet Generator - 最终版

一个使用 **Bun 后端 + HTML 前端** 的 Buddy 宠物生成器，保证算法 100% 与 Claude Code 一致。

## 📦 文件说明

- `server.js` - Bun 后端服务（使用官方 Bun.hash 保证算法一致）
- `buddy-generator.html` - 前端界面
- `启动服务器-Mac.command` - Mac 启动脚本
- `启动服务器-Windows.bat` - Windows 启动脚本

## 🚀 使用步骤

### 1. 安装 Bun（首次使用）

**Mac/Linux:**
```bash
curl -fsSL https://bun.sh/install | bash
```

**Windows:**
```powershell
powershell -c "irm bun.sh/install.ps1 | iex"
```

### 2. 启动服务器

**Mac:** 双击 `启动服务器-Mac.command`  
**Windows:** 双击 `启动服务器-Windows.bat`

看到 `🎮 Buddy Pet Generator 后端已启动!` 就成功了，**保持这个窗口打开**。

### 3. 打开前端界面

双击 `buddy-generator.html` 或用浏览器打开。

### 4. 生成宠物

1. 选择你想要的属性（物种、稀有度、帽子等）
2. 点击"开始生成"
3. 等待搜索完成
4. 选择以下任一方式应用：
   - **方法 1（推荐）**: 上传 `.claude.json`，自动修改并下载
   - **方法 2**: 点击"下载配置文件"，替换原文件
   - **方法 3**: 点击"复制 UserID"，手动编辑配置文件

### 5. 应用配置

- Mac/Linux: 配置文件在 `~/.claude.json`
- Windows: 配置文件在 `%USERPROFILE%\.claude.json`

替换配置文件后，重启 Claude Code 并运行 `/buddy hatch`

## ⚠️ 注意事项

- 后端服务必须保持运行状态
- 如果提示连接失败，检查服务器是否启动
- 算法使用 Bun.hash，与 Claude Code 完全一致
- 稀有度越高，搜索时间越长（传说级可能需要几十秒）

## 🔧 技术说明

- 后端: Bun + HTTP Server
- 前端: 纯 HTML + JavaScript
- 算法: 完全照抄 `refer/INSTRUCTION.md` 中的实现
- 哈希: 使用 Bun.hash (Wyhash) 保证与 Claude Code 一致
