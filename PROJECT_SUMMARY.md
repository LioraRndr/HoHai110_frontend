# 河海大学110周年校庆网站 - 前端项目

## 项目概述

这是河海大学110周年校庆纪念网站的前端项目,使用 Vue 3 + Vite 构建,提供了丰富的交互功能和视觉体验。

## 技术栈

- **框架**: Vue 3 (Composition API)
- **构建工具**: Vite
- **路由**: Vue Router 4
- **状态管理**: Pinia
- **HTTP客户端**: Axios
- **动画库**: GSAP
- **3D渲染**: Three.js
- **实时通信**: Socket.IO Client

## 项目结构

```
HoHai110_frontend/
├── src/
│   ├── api/              # API接口配置
│   │   ├── config.js     # Axios配置
│   │   └── index.js      # API接口定义
│   ├── assets/           # 静态资源
│   │   ├── styles/       # 全局样式
│   │   └── video/        # 视频资源
│   ├── components/       # 公共组件
│   │   ├── Navbar.vue    # 导航栏
│   │   ├── HeroSection.vue
│   │   ├── RiverTimeline.vue  # 3D转盘时间线
│   │   └── ...
│   ├── pages/            # 页面组件
│   │   ├── Home.vue      # 首页
│   │   ├── Login.vue     # 登录页
│   │   ├── Register.vue  # 注册页
│   │   └── ...
│   ├── router/           # 路由配置
│   │   └── index.js
│   ├── store/            # Pinia状态管理
│   │   └── user.js       # 用户状态
│   ├── utils/            # 工具函数
│   ├── App.vue           # 根组件
│   └── main.js           # 入口文件
├── .env.development      # 开发环境变量
├── .env.production       # 生产环境变量
├── index.html
├── package.json
└── vite.config.js
```

## 功能特性

### 1. 用户认证系统
- ✅ 用户注册 (带密码强度验证)
- ✅ 用户登录
- ✅ 自动Token刷新
- ✅ 路由守卫保护
- ✅ 用户状态持久化

### 2. 3D转盘时间线
- ✅ 圆形3D布局,展示110年历史
- ✅ 平滑旋转动画
- ✅ 卡片翻转查看详情
- ✅ 随机抽卡功能
- ✅ 键盘导航支持
- ✅ 响应式设计

### 3. 其他功能模块
- 薪传接力活动
- 校训四维展示
- 校友地图分布
- 海报生成
- 照片拼图

## 安装和运行

### 1. 安装依赖

```bash
npm install
```

### 2. 配置环境变量

编辑 `.env.development` 文件,配置后端API地址:

```env
VITE_API_BASE_URL=http://localhost:3000/api/v1
```

### 3. 启动开发服务器

```bash
npm run dev
```

访问 http://localhost:5173

### 4. 构建生产版本

```bash
npm run build
```

构建输出在 `dist/` 目录。

## API集成

### API配置

API客户端配置在 `src/api/config.js`:

- 自动添加JWT Token到请求头
- Token过期自动刷新
- 统一错误处理
- 请求/响应拦截器

### 可用的API接口

```javascript
import api from '@/api'

// 认证
await api.auth.login({ username, password })
await api.auth.register({ username, email, password })
await api.auth.logout()

// 时间线
await api.timeline.getEvents({ year: 1915 })
await api.timeline.getEvent(eventId)

// 接力活动
await api.relay.getActivities()
await api.relay.participate({ activityId, content })

// 格言
await api.maxim.getMaxims({ page: 1 })
await api.maxim.likeMaxim(maximId)

// 文件上传
await api.upload.uploadFile(file, onProgress)
```

## 状态管理

使用Pinia进行状态管理:

```javascript
import { useUserStore } from '@/store/user'

const userStore = useUserStore()

// 状态
userStore.isLoggedIn
userStore.userName
userStore.user

// 方法
await userStore.login(credentials)
await userStore.register(userData)
await userStore.logout()
```

## 路由守卫

路由配置支持元数据标记:

```javascript
{
  path: '/relay',
  component: Relay,
  meta: { requiresAuth: true }  // 需要登录
}

{
  path: '/login',
  component: Login,
  meta: { requiresGuest: true }  // 仅未登录用户访问
}
```

## 主要页面

### 首页 (/)
- 视频背景
- 翻页动画效果
- 各功能模块入口

### 时间线 (/timeline)
- 3D转盘展示110年历史
- 11个重要历史节点
- 点击卡片查看详情
- 支持随机抽卡

### 登录 (/login)
- 用户名/邮箱登录
- 记住我功能
- 跳转到原页面

### 注册 (/register)
- 表单验证
- 密码强度检测
- 用户协议确认

### 接力活动 (/relay)
- 需要登录访问
- 参与接力活动
- 实时火炬传递

## 开发建议

### 1. 环境变量

开发环境使用 `.env.development`:
```env
VITE_API_BASE_URL=http://localhost:3000/api/v1
```

生产环境使用 `.env.production`:
```env
VITE_API_BASE_URL=https://api.hohai110.com/api/v1
```

### 2. 代码规范

- 使用 Composition API
- 组件使用 `<script setup>` 语法
- CSS使用scoped作用域
- 使用CSS变量统一样式

### 3. API调用示例

```javascript
<script setup>
import { ref } from 'vue'
import { useUserStore } from '@/store/user'

const userStore = useUserStore()
const isLoading = ref(false)
const error = ref('')

const handleLogin = async () => {
  isLoading.value = true
  try {
    const result = await userStore.login({ username, password })
    if (result.success) {
      // 登录成功
    }
  } catch (err) {
    error.value = err.message
  } finally {
    isLoading.value = false
  }
}
</script>
```

## 部署

### Vercel部署

```bash
npm install -g vercel
vercel
```

### Nginx部署

构建后将 `dist/` 目录部署到服务器:

```nginx
server {
    listen 80;
    server_name hohai110.com;

    root /var/www/hohai110/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

## 常见问题

### 1. API请求失败

检查 `.env` 文件中的API地址是否正确。

### 2. Token过期

Token会自动刷新,如果刷新失败会自动跳转到登录页。

### 3. 页面404

确保使用history模式的路由配置了正确的服务器重写规则。

## License

ISC

## 联系方式

- 前端开源地址：[https://github.com/five-plus-one/HoHai110_frontend](https://github.com/five-plus-one/HoHai110_frontend)
- 后端开源地址：[https://github.com/five-plus-one/HoHai110_backend](https://github.com/five-plus-one/HoHai110_backend)
- 联系作者：[https://r-l.ink/about](https://r-l.ink/about)
- 支持我一杯咖啡：[https://r-l.ink/support](https://r-l.ink/support)

项目维护：河海大学110周年校庆筹备组
