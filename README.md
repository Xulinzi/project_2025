# Project 2025

基于 Next.js 的项目，包含贪吃蛇游戏实现。

## 前置条件

在开始之前，请确保您的系统上已安装以下内容：
- [Node.js](https://nodejs.org/)（推荐版本 14.x 或更高）
- npm（随 Node.js 一起安装）

## 开始使用

按照以下步骤运行项目：

### 1. 克隆仓库（如果尚未克隆）

```bash
git clone <仓库地址>
cd project_2025
```

### 2. 安装依赖

运行以下命令安装所需依赖：

```bash
npm install
```

### 3. 运行开发服务器

使用以下命令启动开发服务器：

```bash
npm run dev
```

应用将在 [http://localhost:3000](http://localhost:3000) 上可用。

### 4. 生产环境构建

当您准备部署时：

```bash
npm run build
```

### 5. 启动生产服务器

构建后，您可以启动生产服务器：

```bash
npm start
```

## 项目结构

项目包含：
- 根目录中的主要 Next.js 应用程序
- `/snake` 目录中的独立贪吃蛇游戏实现

## 贪吃蛇游戏

snake 目录包含贪吃蛇游戏的 Next.js 实现。要单独运行它：

```bash
cd snake
npm install
npm run dev
```

## 可用脚本

- `npm run dev` - 启动开发服务器
- `npm run build` - 为生产环境构建应用
- `npm start` - 启动生产服务器 
