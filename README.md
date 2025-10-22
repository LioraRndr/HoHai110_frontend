<div align="center">

# 河海大学110周年纪念网站

### 前端应用项目

一个为河海大学110周年校庆打造的交互式纪念网站，采用现代化技术栈构建。

[![Vue](https://img.shields.io/badge/Vue-3.5.22-4FC08D?logo=vue.js&logoColor=white)](https://vuejs.org/)
[![Vite](https://img.shields.io/badge/Vite-7.1.10-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Node](https://img.shields.io/badge/Node-%3E%3D16.0.0-339933?logo=node.js&logoColor=white)](https://nodejs.org/)

</div>

---

## 📋 目录

- [项目简介](#-项目简介)
- [核心技术](#-核心技术)
- [功能特性](#-功能特性)
- [快速开始](#-快速开始)
- [项目结构](#-项目结构)
- [路由说明](#-路由说明)
- [开发规范](#-开发规范)
- [性能优化](#-性能优化)
- [浏览器兼容](#-浏览器兼容)
- [贡献指南](#-贡献指南)

---

## 🎓 项目简介

河海大学110周年纪念网站是一个富有交互性和创意的前端应用，旨在通过现代化的Web技术展现河海大学110年的辉煌历程。该项目采用Vue 3 + Vite构建，提供流畅的用户体验和精美的视觉效果。

**主要亮点：**
- 🎨 精美的动画效果和交互体验
- 📱 完善的响应式设计，支持多端访问
- ⚡ 高性能加载和渲染优化
- 🔐 完整的用户认证和权限管理系统
- 💬 丰富的社区互动功能

---

## 🛠 核心技术

### 框架与工具

| 技术 | 版本 | 用途 |
|------|------|------|
| [Vue 3](https://vuejs.org/) | 3.5.22 | 渐进式JavaScript框架 |
| [Vite](https://vitejs.dev/) | 7.1.10 | 下一代前端构建工具 |
| [Vue Router](https://router.vuejs.org/) | 4.6.3 | 官方路由管理器 |
| [Pinia](https://pinia.vuejs.org/) | 3.0.3 | 新一代状态管理库 |

### 核心库

| 库名 | 版本 | 说明 |
|------|------|------|
| [GSAP](https://greensock.com/gsap/) | 3.13.0 | 专业级动画库 |
| [Three.js](https://threejs.org/) | 0.180.0 | 3D图形渲染引擎 |
| [Axios](https://axios-http.com/) | 1.12.2 | HTTP客户端 |
| [Socket.io Client](https://socket.io/) | 4.8.1 | 实时双向通信 |
| [@vueuse/core](https://vueuse.org/) | 13.9.0 | Vue组合式工具集 |

---

## ✨ 功能特性

### 核心功能模块

#### 📖 内容展示
- **首页** - 校庆主题内容展示与导航
- **历史时间线** - 河海大学110年发展历程的时间轴展示
- **文化展示** - 河海精神与文化内涵的多维度呈现
- **河海人物** - 杰出校友和重要人物介绍

#### 🎨 互动体验
- **海报生成** - 个性化校庆纪念海报在线制作
- **照片墙** - 校友照片马赛克拼图展示
- **祝福墙** - 师生校友留言祝福互动平台

#### 💬 社区功能
- **论坛系统** - 多板块讨论区，支持发帖、回复、点赞
- **文章专栏** - 校庆相关文章发布与阅读
- **评论互动** - 文章和帖子的评论功能

#### 👤 用户系统
- **用户认证** - 登录、注册、密码重置
- **个人中心** - 用户信息管理和个性化设置
- **权限管理** - 基于角色的访问控制
- **管理后台** - 管理员内容管理界面

#### 📄 法律与信息
- **服务条款** - 用户服务协议
- **隐私政策** - 数据隐私保护说明
- **关于我们** - 项目介绍与团队信息

### 技术特性

#### 🎬 动画效果
- GSAP驱动的高性能滚动触发动画
- 基于Three.js的3D视觉效果
- CSS3平滑过渡和变换效果
- GPU加速的动画渲染

#### 📱 响应式设计
- 移动优先的设计理念
- 灵活的栅格布局系统
- 自适应字体和间距
- 触摸友好的交互设计

#### ⚡ 性能优化
- 路由级别的代码分割和懒加载
- 组件异步加载
- 资源预加载和缓存策略
- 优化的包体积和加载速度

#### 🔒 安全特性
- JWT令牌认证
- 路由守卫和权限验证
- XSS和CSRF防护
- 安全的数据传输

---

## 🚀 快速开始

### 环境要求

在开始之前，请确保你的开发环境满足以下要求：

- **Node.js** >= 16.0.0
- **npm** >= 8.0.0

### 安装步骤

1. **克隆项目**
```bash
git clone <repository-url>
cd HoHai110_frontend
```

2. **安装依赖**
```bash
npm install
```

3. **启动开发服务器**
```bash
npm run dev
```

访问 `http://localhost:5173` 查看应用。

### 可用命令

| 命令 | 说明 |
|------|------|
| `npm run dev` | 启动开发服务器（支持热重载） |
| `npm run build` | 构建生产版本 |
| `npm run preview` | 预览生产构建版本 |

### 环境配置

项目使用环境变量文件进行配置：

- `.env.development` - 开发环境配置
- `.env.production` - 生产环境配置

配置示例：
```env
VITE_API_BASE_URL=http://localhost:3000/api
VITE_SOCKET_URL=http://localhost:3000
```

---

## 📂 项目结构

```
HoHai110_frontend/
├── public/                 # 静态资源目录
│   └── ...
├── src/
│   ├── api/               # API接口定义
│   ├── assets/            # 资源文件（图片、样式等）
│   ├── components/        # 可复用组件
│   │   ├── culture/      # 文化相关组件
│   │   ├── people/       # 人物相关组件
│   │   └── ...
│   ├── composables/       # 组合式函数（Vue Composition API）
│   ├── data/              # 静态数据文件
│   ├── pages/             # 页面组件
│   │   ├── Home.vue
│   │   ├── Timeline.vue
│   │   ├── Forum.vue
│   │   └── ...
│   ├── router/            # 路由配置
│   │   └── index.js
│   ├── store/             # Pinia状态管理
│   ├── utils/             # 工具函数
│   ├── App.vue            # 根组件
│   └── main.js            # 应用入口
├── .env.development       # 开发环境变量
├── .env.production        # 生产环境变量
├── index.html             # HTML入口
├── package.json           # 项目配置和依赖
├── vite.config.js         # Vite配置文件
└── README.md
```

### 关键目录说明

- **`/components`** - 包含所有可复用的Vue组件，按功能模块分类
- **`/pages`** - 存放路由对应的页面级组件
- **`/composables`** - 封装可复用的组合式函数逻辑
- **`/api`** - API接口封装，统一管理后端接口调用
- **`/store`** - Pinia store模块，管理应用状态
- **`/utils`** - 工具函数和辅助方法

---

## 🗺 路由说明

### 路由概览

| 路由路径 | 页面名称 | 组件 | 权限要求 | 说明 |
|---------|---------|------|---------|------|
| `/` | 首页 | Home.vue | 公开 | 网站首页 |
| `/timeline` | 历史时间线 | Timeline.vue | 公开 | 河海大学发展历程 |
| `/culture` | 文化展示 | Culture.vue | 公开 | 河海文化与精神 |
| `/people` | 河海人物 | People.vue | 公开 | 杰出人物介绍 |
| `/poster` | 海报生成 | Poster.vue | 公开 | 个性化海报制作 |
| `/mosaic` | 照片墙 | Mosaic.vue | 公开 | 校友照片展示 |
| `/blessings` | 祝福墙 | Blessings.vue | 公开 | 留言祝福 |
| `/articles` | 文章列表 | Articles.vue | 公开 | 文章专栏 |
| `/articles/:id` | 文章详情 | ArticleDetail.vue | 公开 | 文章内容页 |
| `/forum` | 论坛首页 | Forum.vue | 公开 | 讨论论坛 |
| `/forum/board/:id` | 论坛板块 | ForumBoard.vue | 公开 | 板块帖子列表 |
| `/forum/post/:id` | 帖子详情 | ForumPost.vue | 公开 | 帖子内容与评论 |
| `/about` | 关于我们 | About.vue | 公开 | 项目介绍 |
| `/login` | 登录 | Login.vue | 游客 | 用户登录 |
| `/register` | 注册 | Register.vue | 游客 | 用户注册 |
| `/forgot-password` | 忘记密码 | ForgotPassword.vue | 游客 | 密码重置申请 |
| `/reset-password` | 重置密码 | ResetPassword.vue | 游客 | 密码重置 |
| `/profile` | 个人中心 | Profile.vue | 需登录 | 用户信息管理 |
| `/terms` | 服务条款 | TermsOfService.vue | 公开 | 用户服务协议 |
| `/privacy` | 隐私政策 | PrivacyPolicy.vue | 公开 | 隐私保护说明 |
| `/admin` | 管理后台 | Admin.vue | 管理员 | 内容管理 |

### 路由守卫

项目实现了完善的路由守卫机制：

- **认证守卫** - 保护需要登录的页面（`requiresAuth`）
- **游客守卫** - 已登录用户不能访问登录/注册页（`requiresGuest`）
- **管理员守卫** - 仅管理员可访问的页面（`requiresAdmin`）
- **重定向** - 未授权访问会重定向到登录页或首页

---

## 📐 开发规范

### 代码风格

#### JavaScript/Vue
- 使用 **ES6+** 语法特性
- 优先使用 **Composition API** 编写组件
- 遵循 **Vue 3 最佳实践** 和官方风格指南
- 保持代码简洁，单一职责原则

#### 命名规范
- **组件名称**: PascalCase（例如：`UserProfile.vue`）
- **文件名**: PascalCase（例如：`ArticleDetail.vue`）
- **变量/函数**: camelCase（例如：`getUserInfo`）
- **常量**: UPPER_SNAKE_CASE（例如：`API_BASE_URL`）
- **CSS类名**: kebab-case（例如：`nav-item`）

#### 组件组织
- **单文件组件** - 使用`.vue`文件格式
- **组件拆分** - 保持组件小而专注
- **组合式函数** - 提取可复用逻辑到`/composables`
- **Props验证** - 为所有props定义类型和默认值

### 项目最佳实践

#### 1. 组件开发
```vue
<script setup>
// 推荐：使用 Composition API 和 script setup
import { ref, computed } from 'vue'

const count = ref(0)
const doubleCount = computed(() => count.value * 2)
</script>
```

#### 2. API调用
```javascript
// 在 /api 目录统一管理
import axios from '@/utils/axios'

export const getUserInfo = (id) => {
  return axios.get(`/users/${id}`)
}
```

#### 3. 状态管理
```javascript
// 使用 Pinia store
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null
  }),
  actions: {
    setUser(user) {
      this.user = user
    }
  }
})
```

### Git提交规范

使用语义化的提交信息：

- `feat:` 新功能
- `fix:` 修复bug
- `docs:` 文档更新
- `style:` 代码格式调整
- `refactor:` 代码重构
- `perf:` 性能优化
- `test:` 测试相关
- `chore:` 构建/工具变动

示例：
```bash
git commit -m "feat: 添加用户个人中心页面"
git commit -m "fix: 修复论坛评论显示问题"
```

---

## ⚡ 性能优化

### 已实现的优化策略

1. **代码分割**
   - 路由级别懒加载
   - 组件按需导入
   - 第三方库异步加载

2. **资源优化**
   - 图片懒加载
   - 资源压缩和缓存
   - CDN加速（生产环境）

3. **渲染优化**
   - 虚拟滚动（长列表）
   - 防抖和节流
   - GPU加速动画

4. **打包优化**
   - Tree shaking
   - 代码压缩
   - Gzip压缩

### 性能监控

建议使用以下工具监控性能：
- Chrome DevTools Performance
- Lighthouse
- Vue DevTools

---

## 🌐 浏览器兼容

### 支持的浏览器版本

| 浏览器 | 最低版本 |
|--------|---------|
| Chrome | 90+ |
| Firefox | 88+ |
| Safari | 14+ |
| Edge | 90+ |

### 注意事项
- 不支持IE浏览器
- 建议使用最新版本的现代浏览器以获得最佳体验
- 移动端浏览器需支持ES6+语法

---

## 🤝 贡献指南

我们欢迎所有形式的贡献！

### 贡献流程

1. **Fork** 本仓库
2. 创建你的特性分支
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. 提交你的更改
   ```bash
   git commit -m 'feat: 添加某个很棒的功能'
   ```
4. 推送到分支
   ```bash
   git push origin feature/amazing-feature
   ```
5. 开启一个 **Pull Request**

### 提交前检查清单

- [ ] 代码符合项目规范
- [ ] 已测试新功能或修复
- [ ] 更新了相关文档
- [ ] 提交信息清晰明确
- [ ] 没有引入新的警告或错误

---

## 📄 许可证

本项目仅供 **河海大学110周年校庆** 使用。


---

## 📞 联系方式

如有问题、建议或需要技术支持，请通过以下方式联系项目维护团队：

- 提交 [Issue](../../issues)
- 邮件联系项目负责人

---

<div align="center">

**🎉 祝河海大学110周年校庆圆满成功！**

Built with ❤️ by HoHai Development Team

</div>
