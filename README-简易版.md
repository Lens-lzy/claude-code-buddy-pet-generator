# Buddy Pet Generator - 简易版

一个**单文件**的 Buddy 宠物生成器
## 文件说明

- `buddy-generator.html` - 主程序(单个 HTML 文件,包含所有功能)
- `启动生成器-Mac.command` - Mac 启动脚本
- `启动生成器-Windows.bat` - Windows 启动脚本

## 使用方法

### Mac 用户
双击 `启动生成器-Mac.command` 即可在浏览器中打开

### Windows 用户
双击 `启动生成器-Windows.bat` 即可在浏览器中打开

### 或者直接打开
直接用浏览器打开 `buddy-generator.html` 文件

## 功能特性

- ✅ 单文件,无需安装任何依赖
- ✅ 可视化选择物种、稀有度、帽子等
- ✅ 支持属性最小值筛选
- ✅ 实时进度显示
- ✅ 一键复制 UserID
- ✅ 跨平台支持(Mac/Windows/Linux)

## 使用步骤

1. 双击启动脚本或直接打开 HTML 文件
2. 选择你想要的宠物属性
3. 点击"开始生成"
4. 等待搜索完成(几秒到几十秒)
5. 点击"复制 UserID"
6. 编辑 `~/.claude.json`:
   - 删除 `companion` 字段(如果存在)
   - 将 `userID` 替换为复制的值
7. 重启 Claude Code 并运行 `/buddy hatch`

## 技术说明

- 纯前端实现,使用浏览器的 `crypto.getRandomValues()` 生成随机数
- 算法基于 Claude Code 2.1.89 Native 版本
- 搜索默认最多 50 万次迭代
- 每 5000 次迭代更新一次进度

## 注意事项

- 稀有度越高,搜索时间越长
- 传说级通常需要几十秒
- 如果筛选条件太严格可能找不到结果
