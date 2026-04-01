# Buddy Pet Generator

一个用于生成 Claude Code Buddy 电子宠物的可视化工具。

## 功能特性

- 🎮 可视化选择物种、稀有度、帽子等属性
- 📊 自定义属性最小值要求
- ⚡ 高性能暴力搜索算法
- 💾 一键写入配置文件
- 🖥️ 跨平台支持 (Mac/Windows)

## 安装依赖

```bash
npm install
```

## 开发模式

```bash
npm run electron:dev
```

## 打包

### Mac
```bash
npm run electron:build:mac
```

### Windows
```bash
npm run electron:build:win
```

## 使用说明

1. 选择你想要的宠物属性（物种、稀有度、帽子等）
2. 可选：设置属性最小值要求
3. 点击"开始生成"按钮
4. 等待搜索完成（通常几秒到几十秒）
5. 点击"写入配置"将 userID 写入 `~/.claude.json`
6. 删除配置文件中的 `companion` 字段（如果存在）
7. 重启 Claude Code 并运行 `/buddy hatch`

## 技术栈

- Electron - 跨平台桌面应用框架
- React - UI 框架
- Vite - 构建工具

## 注意事项

- 生成算法基于 Claude Code 2.1.89 Native 版本
- 如果 Claude Code 更新了算法或 SALT 值,需要相应调整
- 稀有度越高,搜索时间越长
- 传说级稀有度通常需要 50 万次迭代
