# 文章和评论系统设计文档

## 系统概述

本系统为河海大学110周年校庆网站设计并实现了完整的文章发布、评论互动和祝福墙功能，支持用户互动、内容审核和管理员后台管理。

## 技术栈

- **前端框架**: Vue 3 (Composition API)
- **路由管理**: Vue Router 4
- **状态管理**: Pinia
- **HTTP客户端**: Axios
- **构建工具**: Vite

## 系统架构

### 1. API服务层 (`src/api/`)

#### `config.js` - API配置
- 配置API基础URL
- 创建axios实例
- 请求/响应拦截器
- Token自动刷新机制

#### `index.js` - API接口
新增的API模块：

**文章API (`articleAPI`)**
- `getArticles(params)` - 获取文章列表（支持分页、筛选）
- `getArticle(articleId)` - 获取文章详情
- `createArticle(data)` - 创建文章（需登录）
- `updateArticle(articleId, data)` - 更新文章（需登录）
- `deleteArticle(articleId)` - 删除文章（需登录）

**评论API (`commentAPI`)**
- `getComments(articleId, params)` - 获取文章评论列表
- `createComment(articleId, data)` - 发表评论（支持二级回复）
- `deleteComment(commentId)` - 删除评论
- `likeComment(commentId)` - 点赞评论
- `unlikeComment(commentId)` - 取消点赞

**祝福API (`blessingAPI`)**
- `getBlessings(params)` - 获取祝福列表
- `getRandomBlessings(limit)` - 获取随机祝福
- `getBlessing(blessingId)` - 获取单条祝福
- `createBlessing(data)` - 发表祝福（支持匿名）
- `updateBlessing(blessingId, data)` - 更新祝福
- `deleteBlessing(blessingId)` - 删除祝福
- `likeBlessing(blessingId)` - 点赞祝福
- `unlikeBlessing(blessingId)` - 取消点赞

**管理员API (`adminAPI`)**
- `getStats()` - 获取统计数据
- `getPendingContent()` - 获取待审核内容
- `reviewComment(commentId, status)` - 审核评论
- `reviewBlessing(blessingId, status)` - 审核祝福
- `getUsers(params)` - 获取用户列表
- `deleteUser(userId)` - 删除用户
- `batchDelete(type, ids)` - 批量删除内容

### 2. 组件层 (`src/components/`)

#### 评论相关组件

**`CommentSection.vue` - 评论区主组件**
功能：
- 展示评论列表
- 发表新评论
- 分页加载
- 回复评论弹窗
- 点赞/取消点赞
- 删除评论（作者/管理员）

**`CommentItem.vue` - 单条评论组件**
功能：
- 显示评论内容和用户信息
- 支持二级回复展示
- 点赞状态切换
- 相对时间显示
- 操作权限控制

#### 祝福相关组件

**`BlessingWall.vue` - 祝福墙主组件**
功能：
- 发表祝福（支持匿名）
- 字数限制（500字）
- 状态筛选
- 分页展示
- 编辑/删除祝福
- 点赞功能

**`BlessingCard.vue` - 祝福卡片组件**
功能：
- 展示祝福内容
- 显示作者信息（支持匿名）
- 点赞交互
- 状态标签（待审核/已拒绝）
- 编辑/删除操作

#### 文章相关组件

**`ArticleCard.vue` - 文章卡片组件**
功能：
- 封面图展示
- 文章标题和摘要
- 分类标签
- 浏览量统计
- 悬停动画效果

### 3. 页面层 (`src/pages/`)

#### `Articles.vue` - 文章列表页
功能：
- 文章网格展示
- 分类筛选
- 关键词搜索
- 分页导航
- 响应式布局

#### `ArticleDetail.vue` - 文章详情页
功能：
- 文章完整内容展示
- 封面图显示
- 面包屑导航
- 标签展示
- 分享功能
- 编辑/删除（权限控制）
- 集成评论区

#### `Blessings.vue` - 祝福墙页面
功能：
- 祝福墙主体展示
- 随机祝福展示区
- 刷新随机祝福

#### `Admin.vue` - 管理员后台
功能模块：
1. **数据统计面板**
   - 用户数、文章数、评论数
   - 祝福数、格言数、接力参与数

2. **内容审核**
   - 待审核评论列表
   - 待审核祝福列表
   - 通过/拒绝操作

3. **用户管理**
   - 用户列表展示
   - 用户搜索
   - 删除用户（保护管理员）

### 4. 路由配置 (`src/router/index.js`)

新增路由：
```javascript
/articles           // 文章列表
/articles/:id       // 文章详情
/blessings          // 祝福墙
/admin              // 管理员后台（需要管理员权限）
```

路由守卫增强：
- 添加管理员权限检查 (`requiresAdmin`)
- 非管理员访问管理页面会被拦截

## 功能特性

### 1. 评论系统
- ✅ 二级评论结构（顶级评论 + 回复）
- ✅ 实时点赞/取消点赞
- ✅ 相对时间显示
- ✅ 权限控制（删除评论）
- ✅ 分页加载
- ✅ 回复弹窗

### 2. 祝福墙
- ✅ 匿名发表支持
- ✅ 字数限制（500字）
- ✅ 实时点赞
- ✅ 状态筛选（已审核/待审核）
- ✅ 编辑和删除
- ✅ 随机祝福展示

### 3. 文章系统
- ✅ 响应式网格布局
- ✅ 分类筛选
- ✅ 关键词搜索
- ✅ 封面图支持
- ✅ 标签系统
- ✅ 浏览量统计
- ✅ 分享功能

### 4. 管理员功能
- ✅ 数据统计面板
- ✅ 内容审核（评论/祝福）
- ✅ 用户管理
- ✅ 批量操作
- ✅ 权限保护

## 数据流程

### 用户发表评论
1. 用户在文章详情页输入评论
2. 点击发表按钮
3. 调用 `commentAPI.createComment()`
4. 后端验证token并保存评论
5. 前端刷新评论列表

### 管理员审核内容
1. 管理员访问 `/admin`
2. 查看待审核列表
3. 点击通过/拒绝
4. 调用 `adminAPI.reviewComment/reviewBlessing()`
5. 后端更新内容状态
6. 前端刷新待审核列表

### 点赞功能
1. 用户点击点赞按钮
2. 检查当前点赞状态
3. 调用 `likeXXX()` 或 `unlikeXXX()`
4. 后端更新点赞数
5. 前端更新UI状态

## 权限控制

### 用户权限
- 发表评论（需登录）
- 发表祝福（需登录）
- 点赞（需登录）
- 删除自己的评论/祝福

### 管理员权限
- 所有用户权限
- 删除任何评论/祝福
- 审核内容
- 管理用户
- 查看统计数据

## API端点映射

所有API请求前缀：`/api/v1`

| 功能 | 方法 | 端点 | 说明 |
|------|------|------|------|
| 文章列表 | GET | `/articles` | 支持分页、筛选 |
| 文章详情 | GET | `/articles/:id` | - |
| 创建文章 | POST | `/articles` | 需登录 |
| 评论列表 | GET | `/comments/article/:articleId` | - |
| 发表评论 | POST | `/comments/article/:articleId` | 需登录 |
| 点赞评论 | POST | `/comments/:id/like` | 需登录 |
| 取消点赞 | DELETE | `/comments/:id/like` | 需登录 |
| 祝福列表 | GET | `/blessings` | - |
| 随机祝福 | GET | `/blessings/random` | - |
| 发表祝福 | POST | `/blessings` | 需登录 |
| 点赞祝福 | POST | `/blessings/:id/like` | 需登录 |
| 管理统计 | GET | `/admin/stats` | 需管理员 |
| 待审核内容 | GET | `/admin/pending` | 需管理员 |

## 样式设计

### 设计原则
- 深色主题，半透明玻璃态效果
- 蓝色渐变主色调 (#4A90E2 - #357ABD)
- 悬停动画和过渡效果
- 响应式设计，移动端友好

### 关键样式特性
- `backdrop-filter: blur(10px)` - 毛玻璃效果
- `rgba(255, 255, 255, 0.05)` - 半透明背景
- 卡片悬停上浮 `translateY(-4px)`
- 渐变按钮和标签
- 柔和的边框和阴影

## 使用指南

### 开发环境启动
```bash
npm install
npm run dev
```

### 访问页面
- 文章列表：`http://localhost:5173/articles`
- 祝福墙：`http://localhost:5173/blessings`
- 管理后台：`http://localhost:5173/admin`（需管理员权限）

### 环境变量配置
创建 `.env.development` 文件：
```
VITE_API_BASE_URL=http://localhost:3001/api/v1
```

## 待扩展功能

### 短期优化
- [ ] 评论富文本编辑器
- [ ] 图片上传组件
- [ ] 表情包支持
- [ ] @提及用户功能
- [ ] 评论举报功能

### 长期规划
- [ ] 文章编辑器（Markdown支持）
- [ ] 文章草稿保存
- [ ] 评论楼中楼（多层嵌套）
- [ ] 实时通知系统
- [ ] 内容推荐算法

## 注意事项

1. **Token管理**: 所有需要登录的请求会自动携带token，token过期会自动刷新
2. **权限验证**: 前端做基础验证，后端需做完整权限检查
3. **错误处理**: 所有API调用都有try-catch包裹，错误会alert提示
4. **用户体验**: 加载状态、空状态、错误状态都有相应UI反馈
5. **移动端**: 所有页面都经过响应式优化

## 文件清单

### 新增文件
```
src/
├── api/
│   └── index.js (扩展)
├── components/
│   ├── CommentSection.vue (新)
│   ├── CommentItem.vue (新)
│   ├── BlessingWall.vue (新)
│   ├── BlessingCard.vue (新)
│   └── ArticleCard.vue (新)
└── pages/
    ├── Articles.vue (新)
    ├── ArticleDetail.vue (新)
    ├── Blessings.vue (新)
    └── Admin.vue (新)
```

### 修改文件
```
src/router/index.js (新增路由和权限检查)
```

## 总结

本系统完整实现了文章发布、评论互动、祝福墙和管理员后台四大核心功能模块，所有功能都已对接API接口，支持完整的用户交互和权限控制。系统采用组件化设计，代码结构清晰，易于维护和扩展。

所有组件都遵循Vue 3 Composition API最佳实践，使用响应式数据和生命周期钩子。样式设计统一采用深色主题和玻璃态效果，提供良好的视觉体验。

---

## 项目信息

- 前端开源地址：[https://github.com/five-plus-one/HoHai110_frontend](https://github.com/five-plus-one/HoHai110_frontend)
- 后端开源地址：[https://github.com/five-plus-one/HoHai110_backend](https://github.com/five-plus-one/HoHai110_backend)
- 联系作者：[https://r-l.ink/about](https://r-l.ink/about)
- 支持我一杯咖啡：[https://r-l.ink/support](https://r-l.ink/support)
