# 文章和评论系统 - 快速使用指南

## 🎉 系统已完成！

您的河海大学110周年校庆网站现在已经包含了完整的文章发布、评论互动、祝福墙和管理员后台功能。

## 📁 新增的文件

### API服务
- ✅ `src/api/index.js` - 扩展了文章、评论、祝福、管理员API

### 组件
- ✅ `src/components/CommentSection.vue` - 评论区组件
- ✅ `src/components/CommentItem.vue` - 单条评论组件
- ✅ `src/components/BlessingWall.vue` - 祝福墙组件
- ✅ `src/components/BlessingCard.vue` - 祝福卡片组件
- ✅ `src/components/ArticleCard.vue` - 文章卡片组件
- ✅ `src/components/Navbar.vue` - 更新了导航栏

### 页面
- ✅ `src/pages/Articles.vue` - 文章列表页
- ✅ `src/pages/ArticleDetail.vue` - 文章详情页
- ✅ `src/pages/Blessings.vue` - 祝福墙页面
- ✅ `src/pages/Admin.vue` - 管理员后台

### 路由
- ✅ `src/router/index.js` - 新增路由和权限控制

### 文档
- ✅ `SYSTEM_DESIGN.md` - 完整的系统设计文档
- ✅ `QUICK_START.md` - 本文件

## 🚀 如何访问新功能

### 1. 文章系统
访问路径：`/articles`

**功能：**
- 浏览所有校庆动态文章
- 分类筛选（校庆动态、通知公告、校友故事等）
- 关键词搜索
- 点击文章卡片查看详情

**文章详情页：**`/articles/:id`
- 查看完整文章内容
- 阅读和发表评论
- 支持二级回复
- 点赞评论

### 2. 祝福墙
访问路径：`/blessings`

**功能：**
- 发表祝福（可选择匿名）
- 浏览所有祝福
- 点赞祝福
- 编辑/删除自己的祝福
- 查看随机祝福

### 3. 评论系统
集成在文章详情页中

**功能：**
- 发表顶级评论
- 回复他人评论（二级评论）
- 点赞/取消点赞
- 删除自己的评论
- 分页浏览评论

### 4. 管理员后台
访问路径：`/admin` （需要管理员权限）

**功能：**
- 查看数据统计（用户数、文章数、评论数等）
- 审核待审核的评论和祝福
- 管理用户（搜索、删除）
- 批量操作

## 🔑 权限说明

### 普通用户
- ✅ 浏览文章和祝福
- ✅ 发表评论和祝福（需登录）
- ✅ 点赞（需登录）
- ✅ 删除自己的内容

### 管理员
- ✅ 所有普通用户权限
- ✅ 删除任何评论和祝福
- ✅ 审核内容
- ✅ 管理用户
- ✅ 查看统计数据

## 🎨 主要特性

### 评论系统
- 📝 支持二级评论结构
- ❤️ 实时点赞/取消点赞
- 🕐 相对时间显示（刚刚、X分钟前、X天前）
- 🔒 权限控制
- 📄 分页加载

### 祝福墙
- 🎭 支持匿名发表
- 📏 字数限制（500字）
- 🎲 随机祝福展示
- ✏️ 编辑功能
- 🔍 状态筛选

### 文章系统
- 🖼️ 封面图支持
- 🏷️ 标签系统
- 🔍 分类和搜索
- 👁️ 浏览量统计
- 🔗 分享功能

### 管理员功能
- 📊 数据统计可视化
- ✅ 内容审核
- 👥 用户管理
- 🗑️ 批量操作

## 🌐 导航栏已更新

顶部导航栏已经添加了新的链接：
- **文章** - 链接到文章列表页
- **祝福墙** - 链接到祝福墙页面

移动端菜单也已同步更新。

## 📋 待办事项

### 后端API开发
需要后端开发以下接口（参考 API_INTERFACE_DESIGN.md）：

1. **文章接口**
   - `GET /api/v1/articles` - 获取文章列表
   - `GET /api/v1/articles/:id` - 获取文章详情
   - `POST /api/v1/articles` - 创建文章
   - `PUT /api/v1/articles/:id` - 更新文章
   - `DELETE /api/v1/articles/:id` - 删除文章

2. **评论接口**
   - `GET /api/v1/comments/article/:articleId` - 获取评论
   - `POST /api/v1/comments/article/:articleId` - 发表评论
   - `DELETE /api/v1/comments/:id` - 删除评论
   - `POST /api/v1/comments/:id/like` - 点赞评论
   - `DELETE /api/v1/comments/:id/like` - 取消点赞

3. **祝福接口**
   - `GET /api/v1/blessings` - 获取祝福列表
   - `GET /api/v1/blessings/random` - 获取随机祝福
   - `POST /api/v1/blessings` - 发表祝福
   - `PUT /api/v1/blessings/:id` - 更新祝福
   - `DELETE /api/v1/blessings/:id` - 删除祝福
   - `POST /api/v1/blessings/:id/like` - 点赞祝福
   - `DELETE /api/v1/blessings/:id/like` - 取消点赞

4. **管理员接口**
   - `GET /api/v1/admin/stats` - 获取统计数据
   - `GET /api/v1/admin/pending` - 获取待审核内容
   - `PUT /api/v1/admin/comments/:id/review` - 审核评论
   - `PUT /api/v1/admin/blessings/:id/review` - 审核祝福
   - `GET /api/v1/admin/users` - 获取用户列表
   - `DELETE /api/v1/admin/users/:id` - 删除用户

### 环境配置
在项目根目录创建 `.env.development` 文件：
```
VITE_API_BASE_URL=http://localhost:3001/api/v1
```

在项目根目录创建 `.env.production` 文件：
```
VITE_API_BASE_URL=https://your-api-domain.com/api/v1
```

## 🧪 测试建议

### 1. 评论功能测试
1. 访问任意文章详情页
2. 尝试发表评论
3. 测试回复功能
4. 测试点赞/取消点赞
5. 测试删除评论（自己的评论）

### 2. 祝福墙测试
1. 访问 `/blessings`
2. 发表普通祝福
3. 发表匿名祝福
4. 测试编辑功能
5. 测试点赞功能
6. 刷新随机祝福

### 3. 管理员功能测试
1. 使用管理员账号登录
2. 访问 `/admin`
3. 查看统计数据
4. 测试审核评论/祝福
5. 测试用户管理

## 💡 开发提示

### 添加新的文章分类
在 `src/pages/Articles.vue` 中修改分类选项：
```vue
<select v-model="filters.category" @change="loadArticles">
  <option value="">全部</option>
  <option value="校庆动态">校庆动态</option>
  <option value="通知公告">通知公告</option>
  <option value="校友故事">校友故事</option>
  <option value="活动回顾">活动回顾</option>
  <!-- 添加新的分类 -->
  <option value="新分类">新分类</option>
</select>
```

### 修改祝福字数限制
在 `src/components/BlessingWall.vue` 中修改：
```vue
<textarea
  v-model="newBlessing"
  maxlength="500"  <!-- 修改这里 -->
>
```

### 自定义评论分页数量
在 `src/components/CommentSection.vue` 中修改：
```javascript
const limit = 20  // 修改这里
```

## 📚 更多文档

详细的系统设计和API文档请查看：
- `SYSTEM_DESIGN.md` - 完整的系统架构文档
- `API_INTERFACE_DESIGN.md` - API接口设计文档

## 🆘 常见问题

### Q: 评论无法发送？
A: 确保已登录，并且后端API已正确实现。

### Q: 管理员页面无法访问？
A: 确保当前登录用户的 `role` 字段为 `admin`。

### Q: 点赞后数字没有更新？
A: 检查后端是否正确返回了更新后的点赞数。

### Q: 祝福墙显示空白？
A: 检查后端 `/api/v1/blessings` 接口是否正常返回数据。

## 🎯 下一步

1. **启动开发服务器**
   ```bash
   npm run dev
   ```

2. **访问新页面**
   - 文章列表：http://localhost:5173/articles
   - 祝福墙：http://localhost:5173/blessings
   - 管理后台：http://localhost:5173/admin

3. **配置后端API**
   - 根据接口文档实现后端API
   - 配置CORS允许前端访问
   - 设置正确的环境变量

4. **测试功能**
   - 逐一测试所有功能
   - 检查移动端兼容性
   - 验证权限控制

## 🌟 完成！

所有文章和评论系统功能已经成功集成到您的河海大学110周年校庆网站中。现在您可以：
- ✅ 发布和管理校庆文章
- ✅ 接收和回复用户评论
- ✅ 展示校友祝福
- ✅ 通过管理后台审核和管理内容

祝您的校庆网站取得圆满成功！🎊
