# 河海大学110周年纪念网站 - 前端项目

## 项目简介

这是河海大学110周年校庆纪念网站的前端项目，采用 Vue 3 + Vite 构建，提供丰富的交互体验和视觉效果。

## 技术栈

- **框架**: Vue 3
- **构建工具**: Vite
- **路由**: Vue Router
- **状态管理**: Pinia
- **动画库**: GSAP
- **HTTP客户端**: Axios
- **实时通信**: Socket.io

## 环境要求

- Node.js >= 16.0.0
- npm >= 8.0.0

## 快速开始

### 安装依赖
```bash
npm install
```

### 开发模式
```bash
npm run dev
```
访问: `http://localhost:5173`

### 生产构建
```bash
npm run build
```

### 预览生产版本
```bash
npm run preview
```

## 项目结构

```
HoHai110_frontend/
├── src/
│   ├── components/        # 公共组件
│   ├── pages/            # 页面组件
│   ├── router/           # 路由配置
│   ├── store/            # 状态管理
│   ├── api/              # API接口
│   ├── assets/           # 静态资源
│   ├── utils/            # 工具函数
│   ├── composables/      # 组合式函数
│   └── data/             # 数据文件
├── public/               # 公共静态资源
└── dist/                 # 构建输出目录
```

## 主要功能

- 🏠 **首页**: 展示校庆主题内容
- 📅 **时间线**: 河海大学历史发展轨迹
- 🔥 **火炬接力**: 薪火传递互动
- 📖 **校训精神**: 艰苦朴素、实事求是、严格要求、勇于探索
- 🎨 **文化展示**: 河海文化与精神传承
- 🖼️ **海报生成**: 个性化纪念海报
- 📷 **照片墙**: 校友照片展示
- 💬 **祝福墙**: 师生校友留言祝福
- 📰 **文章专栏**: 校庆相关文章
- 👤 **用户系统**: 登录注册功能
- 🔧 **管理后台**: 内容管理

## 页面路由

| 页面 | 路径 | 说明 |
|------|------|------|
| 首页 | `/` | 主页展示 |
| 时间线 | `/timeline` | 历史时间轮盘 |
| 火炬接力 | `/relay` | 薪火传递互动 |
| 校训精神 | `/maxims` | 四维展示 |
| 文化 | `/culture` | 文化内涵展示 |
| 海报生成 | `/poster` | 个性化海报 |
| 照片墙 | `/mosaic` | 校友照片 |
| 祝福墙 | `/blessings` | 留言祝福 |
| 文章列表 | `/articles` | 文章专栏 |
| 文章详情 | `/articles/:id` | 文章内容 |
| 关于我们 | `/about` | 项目介绍 |
| 登录 | `/login` | 用户登录 |
| 注册 | `/register` | 用户注册 |
| 管理后台 | `/admin` | 内容管理 |

## 特性

### 动画效果
- GSAP 滚动触发动画
- CSS 平滑过渡效果
- 高性能滚动动画

### 响应式设计
- 移动端适配
- 灵活的栅格布局
- 响应式字体和间距

### 性能优化
- 路由懒加载
- 代码分割
- GPU 加速动画

## 浏览器支持

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 开发规范

### 代码风格
- 使用 ES6+ 语法
- 组件使用 Composition API
- 遵循 Vue 3 最佳实践

### 命名规范
- 组件名使用 PascalCase
- 文件名使用 PascalCase
- 变量和函数使用 camelCase

## 环境变量

项目使用 `.env` 文件管理环境变量：

- `.env.development` - 开发环境配置
- `.env.production` - 生产环境配置

## 贡献指南

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

## 许可证

本项目仅供河海大学110周年校庆使用。

## 联系方式

如有问题或建议，请联系项目维护团队。
