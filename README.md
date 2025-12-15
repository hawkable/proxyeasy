# ProxyEasy

[English](#english) | [中文](#chinese)

<a name="english"></a>
## 🇬🇧 English

**ProxyEasy** is a minimalist, enterprise-grade proxy service management platform designed to simplify the deployment and management of V2Ray, Trojan, and Shadowsocks services. It provides a clean UI for managing users, monitoring server health, and handling client subscriptions.

### ✨ Key Features

- **Visual Dashboard**: Real-time monitoring of network traffic, CPU/Memory usage, and active connections.
- **User Management**: Create and manage users with specific traffic limits, expiry dates, and remarks.
- **Node Monitoring**: Track server status, load percentage, and latency across different regions.
- **Subscription Center**: Generate universal subscription links and QR codes for clients like v2rayN, Clash, Shadowrocket, and Surge.
- **Easy Deployment**: Supports both one-click Shell script installation and Docker Compose deployment.

### 🚀 Quick Start (Development)

This project is built with React 19 and Vite/Webpack.

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start the development server**:
   ```bash
   npm start
   # or
   npm run dev
   ```

3. Open your browser and navigate to the local URL (usually `http://localhost:5173` or `http://localhost:3000`).

### 🔐 Default Login

- **Username**: `admin`
- **Password**: `admin123`

### 📦 Production Deployment

**Option 1: One-Click Script**
Run this on your VPS (CentOS 7+, Debian 10+, Ubuntu 18.04+):
```bash
bash <(curl -Ls https://raw.githubusercontent.com/proxyeasy/install/master/install.sh)
```

**Option 2: Docker Compose**
```bash
git clone https://github.com/proxyeasy/proxyeasy.git
cd ProxyEasy
docker-compose up -d
```

---

<a name="chinese"></a>
## 🇨🇳 中文 (Chinese)

**ProxyEasy (极简代理管家)** 是一款极简的企业级代理服务管理平台，专为轻松部署和管理 V2Ray、Trojan 和 Shadowsocks 服务而设计。它提供了一个直观的用户界面，用于管理用户、监控服务器健康状况以及处理客户端订阅。

### ✨ 主要功能

- **可视化仪表盘**：实时监控网络流量、CPU/内存使用率以及活跃连接数。
- **用户管理**：创建和管理用户，支持设置流量限制、过期时间和备注信息。
- **节点监控**：实时追踪全球节点的在线状态、负载百分比和网络延迟。
- **订阅中心**：自动生成适配 v2rayN、Clash、Shadowrocket、Surge 等主流客户端的通用订阅链接和二维码。
- **极速部署**：支持 Shell 脚本一键安装或 Docker Compose 容器化部署。

### 🚀 快速开始 (本地开发)

本项目基于 React 19 构建。

1. **安装依赖**：
   ```bash
   npm install
   ```

2. **启动开发服务器**：
   ```bash
   npm start
   # 或
   npm run dev
   ```

3. 打开浏览器并访问本地地址（通常是 `http://localhost:5173` 或 `http://localhost:3000`）。

### 🔐 默认账号

- **用户名**: `admin`
- **密码**: `admin123`

### 📦 生产环境部署

**方式一：一键脚本安装**
在您的 VPS 上运行以下命令（支持 CentOS 7+, Debian 10+, Ubuntu 18.04+）：
```bash
bash <(curl -Ls https://raw.githubusercontent.com/proxyeasy/install/master/install.sh)
```

**方式二：Docker Compose 部署**
```bash
git clone https://github.com/proxyeasy/proxyeasy.git
cd ProxyEasy
docker-compose up -d
```