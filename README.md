# Buddy Pet Generator

为 Claude Code 生成你想要的电子宠物，算法 100% 与官方一致。

## ✨ 特性

- 🎯 **算法精确** - 使用 Bun.hash，与 Claude Code 完全一致
- 🎨 **可视化界面** - 选择物种、稀有度、帽子、属性等
- 🚀 **高性能搜索** - 支持多种筛选条件
- 💾 **一键应用** - 自动修改配置文件或手动复制
- 🖥️ **跨平台** - Mac/Windows/Linux 通用

## 📦 文件说明

- `buddy-reroll.js` - 核心生成器（CLI + HTTP 服务器）
- `buddy-generator.html` - 可视化前端界面
- `启动服务器-Mac.command` - Mac 启动脚本
- `启动服务器-Windows.bat` - Windows 启动脚本

## 🚀 快速开始

### 1. 安装 Bun

**Mac/Linux:**
```bash
curl -fsSL https://bun.sh/install | bash
```

**Windows:**
```powershell
powershell -c "irm bun.sh/install.ps1 | iex"
```

或者用 Homebrew (Mac):
```bash
brew install oven-sh/bun/bun
```

### 2. 启动服务器

**Mac:** 双击 `启动服务器-Mac.command`  
**Windows:** 双击 `启动服务器-Windows.bat`

或者命令行：
```bash
bun buddy-reroll.js --serve
```

看到 `🎮 Buddy Pet Generator 后端已启动!` 就成功了，**保持窗口打开**。

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

配置文件位置：
- **Mac/Linux**: `~/.claude.json`
- **Windows**: `%USERPROFILE%\.claude.json`

替换配置文件后，重启 Claude Code 并运行 `/buddy hatch`

## 🎮 CLI 模式

`buddy-reroll.js` 也可以作为命令行工具使用：

```bash
# 搜索传说级鸭子
bun buddy-reroll.js --species duck --rarity legendary

# 搜索闪光龙
bun buddy-reroll.js --species dragon --shiny

# 搜索所有属性 >= 80 的宠物
bun buddy-reroll.js --min-stats 80

# 检查特定 userID 会生成什么宠物
bun buddy-reroll.js --check <your-userid>

# 查看所有选项
bun buddy-reroll.js --help
```

## 📋 可用选项

### 物种 (18 种)
duck, goose, blob, cat, dragon, octopus, owl, penguin, turtle, snail, ghost, axolotl, capybara, cactus, robot, rabbit, mushroom, chonk

### 稀有度 (5 级)
- ★ common (普通) - 60%
- ★★ uncommon (非凡) - 25%
- ★★★ rare (稀有) - 10%
- ★★★★ epic (史诗) - 4%
- ★★★★★ legendary (传说) - 1%

### 帽子 (8 种)
none, crown, tophat, propeller, halo, wizard, beanie, tinyduck

### 眼睛 (6 种)
· ✦ × ◉ @ °

### 属性 (5 项)
DEBUGGING, PATIENCE, CHAOS, WISDOM, SNARK

## ⚠️ 注意事项

- **必须使用 Bun** - Node.js 的哈希算法不同，生成结果不匹配
- 后端服务必须保持运行状态
- 稀有度越高，搜索时间越长（传说级可能需要几十秒）
- 闪光概率 1%，独立于稀有度

## 🔧 技术说明

- **运行时**: Bun (必需，使用 Bun.hash)
- **后端**: HTTP Server (内置于 buddy-reroll.js)
- **前端**: 纯 HTML + JavaScript
- **算法**: 完全基于 Claude Code 源码逆向

## 📝 示例

生成一只传说级闪光鸭子：
```bash
bun buddy-reroll.js --species duck --rarity legendary --shiny --count 1
```

生成调试能力 >= 90 的猫：
```bash
bun buddy-reroll.js --species cat --min-stats 90
```

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📄 许可

MIT License
