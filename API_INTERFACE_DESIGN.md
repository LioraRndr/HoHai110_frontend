# 河海大学110周年校庆网站 - 前后端交互接口设计文档

## 1. 基础配置
- **Base URL**: `https://api.hohai110.five-plus-one.com` (或根据实际部署域名调整)
- **API Version**: `v1`
- **通用返回格式**:
```json
{
  "code": 0,        // 0:成功, 其他:失败代码
  "message": "成功", // 说明信息
  "data": {}        // 返回数据
}
```

---

## 2. 用户认证接口

### 2.1 用户登录
- **请求方法**: `POST`
- **路由**: `/api/v1/auth/login`
- **请求体**:
```json
{
  "username": "用户名/邮箱",
  "password": "密码"
}
```
- **响应**:
```json
{
  "code": 0,
  "message": "登录成功",
  "data": {
    "token": "JWT_TOKEN_STRING",
    "user": {
      "id": 1,
      "username": "用户名",
      "email": "邮箱",
      "avatar": "头像URL"
    }
  }
}
```

### 2.2 用户注册
- **请求方法**: `POST`
- **路由**: `/api/v1/auth/register`
- **请求体**:
```json
{
  "username": "用户名",
  "email": "邮箱",
  "password": "密码",
  "confirmPassword": "确认密码"
}
```
- **响应**: 同登录接口

### 2.3 token 刷新
- **请求方法**: `POST`
- **路由**: `/api/v1/auth/refresh`
- **请求头**: `Authorization: Bearer <expired_token>`
- **响应**: 返回新的 token

---

## 3. 时间线数据接口

### 3.1 获取时间线事件列表
- **请求方法**: `GET`
- **路由**: `/api/v1/timeline/events`
- **查询参数**:
  - `year` (可选): 特定年份
  - `category` (可选): 事件分类 (milestone/achievement/etc)
- **响应**:
```json
{
  "code": 0,
  "message": "成功",
  "data": {
    "events": [
      {
        "id": 1,
        "year": 1915,
        "title": "河海工程专门学校成立",
        "description": "张闻天、茅以升等著名学者创办河海工程专门学校，开启中国水利高等教育先河。",
        "category": "milestone",
        "isMajor": true,
        "achievements": [
          "中国第一所水利高等学府",
          "创立水利工程专业教育体系",
          "培养首批水利工程人才"
        ],
        "images": [
          {
            "url": "图片URL",
            "caption": "图片说明"
          }
        ],
        "createdAt": "2025-01-01T00:00:00Z"
      }
    ],
    "total": 11,
    "page": 1,
    "pageSize": 20
  }
}
```

### 3.2 获取单个时间线事件详情
- **请求方法**: `GET`
- **路由**: `/api/v1/timeline/events/{eventId}`
- **响应**: 返回单个事件完整信息 (同上面的 event 对象)

---

## 4. 接力活动接口

### 4.1 获取接力活动列表
- **请求方法**: `GET`
- **路由**: `/api/v1/relay/activities`
- **查询参数**:
  - `page` (可选): 页码，默认 1
  - `pageSize` (可选): 每页数量，默认 10
  - `status` (可选): 活动状态 (ongoing/completed/upcoming)
- **响应**:
```json
{
  "code": 0,
  "message": "成功",
  "data": {
    "activities": [
      {
        "id": 1,
        "title": "接力活动1",
        "description": "活动描述",
        "status": "ongoing",
        "startDate": "2025-01-01T00:00:00Z",
        "endDate": "2025-12-31T23:59:59Z",
        "participants": 150,
        "image": "活动封面URL"
      }
    ],
    "total": 25,
    "page": 1,
    "pageSize": 10
  }
}
```

### 4.2 用户参与接力活动
- **请求方法**: `POST`
- **路由**: `/api/v1/relay/participate`
- **请求头**: `Authorization: Bearer <token>`
- **请求体**:
```json
{
  "activityId": 1,
  "content": "参与者分享的内容",
  "images": ["图片URL1", "图片URL2"],
  "video": "视频URL (可选)"
}
```
- **响应**:
```json
{
  "code": 0,
  "message": "参与成功",
  "data": {
    "id": 123,
    "userId": 1,
    "activityId": 1,
    "content": "参与内容",
    "images": [],
    "participatedAt": "2025-01-15T10:30:00Z"
  }
}
```

### 4.3 获取接力活动参与者列表
- **请求方法**: `GET`
- **路由**: `/api/v1/relay/activities/{activityId}/participants`
- **查询参数**:
  - `page`: 页码
  - `pageSize`: 每页数量
- **响应**:
```json
{
  "code": 0,
  "message": "成功",
  "data": {
    "participants": [
      {
        "id": 1,
        "username": "用户名",
        "avatar": "头像URL",
        "content": "分享内容",
        "images": [],
        "participatedAt": "2025-01-15T10:30:00Z"
      }
    ],
    "total": 150,
    "page": 1,
    "pageSize": 10
  }
}
```

---

## 5. 格言征集接口

### 5.1 获取格言列表
- **请求方法**: `GET`
- **路由**: `/api/v1/maxims`
- **查询参数**:
  - `page`: 页码
  - `pageSize`: 每页数量
  - `sort`: 排序方式 (newest/popular/random)
- **响应**:
```json
{
  "code": 0,
  "message": "成功",
  "data": {
    "maxims": [
      {
        "id": 1,
        "content": "格言内容",
        "author": "作者名称",
        "category": "学习/励志/其他",
        "likes": 256,
        "isLiked": false,
        "createdAt": "2025-01-10T00:00:00Z"
      }
    ],
    "total": 500,
    "page": 1,
    "pageSize": 10
  }
}
```

### 5.2 提交新格言
- **请求方法**: `POST`
- **路由**: `/api/v1/maxims`
- **请求头**: `Authorization: Bearer <token>`
- **请求体**:
```json
{
  "content": "格言内容",
  "author": "作者名称",
  "category": "学习/励志/其他"
}
```
- **响应**:
```json
{
  "code": 0,
  "message": "提交成功",
  "data": {
    "id": 501,
    "content": "格言内容",
    "author": "作者名称",
    "category": "学习",
    "likes": 0,
    "createdAt": "2025-01-15T10:30:00Z"
  }
}
```

### 5.3 点赞格言
- **请求方法**: `POST`
- **路由**: `/api/v1/maxims/{maximId}/like`
- **请求头**: `Authorization: Bearer <token>`
- **响应**:
```json
{
  "code": 0,
  "message": "点赞成功",
  "data": {
    "maximId": 1,
    "likes": 257,
    "isLiked": true
  }
}
```

### 5.4 取消点赞格言
- **请求方法**: `DELETE`
- **路由**: `/api/v1/maxims/{maximId}/like`
- **请求头**: `Authorization: Bearer <token>`

---

## 6. 地图相关接口

### 6.1 获取河海校友分布数据
- **请求方法**: `GET`
- **路由**: `/api/v1/map/alumni-distribution`
- **查询参数**:
  - `province` (可选): 省份筛选
  - `country` (可选): 国家筛选
- **响应**:
```json
{
  "code": 0,
  "message": "成功",
  "data": {
    "locations": [
      {
        "id": 1,
        "name": "地点名称",
        "lat": 31.24,
        "lng": 120.15,
        "alumniCount": 1250,
        "description": "地点描述"
      }
    ],
    "total": 50
  }
}
```

---

## 7. 海报相关接口

### 7.1 获取海报列表
- **请求方法**: `GET`
- **路由**: `/api/v1/posters`
- **查询参数**:
  - `page`: 页码
  - `pageSize`: 每页数量
  - `category` (可选): 海报分类
- **响应**:
```json
{
  "code": 0,
  "message": "成功",
  "data": {
    "posters": [
      {
        "id": 1,
        "title": "海报标题",
        "description": "海报描述",
        "image": "海报图片URL",
        "downloadUrl": "下载链接",
        "downloadCount": 150,
        "createdAt": "2025-01-01T00:00:00Z"
      }
    ],
    "total": 30,
    "page": 1,
    "pageSize": 10
  }
}
```

### 7.2 下载海报
- **请求方法**: `POST`
- **路由**: `/api/v1/posters/{posterId}/download`
- **请求头**: `Authorization: Bearer <token>` (可选)
- **响应**:
```json
{
  "code": 0,
  "message": "下载记录已保存",
  "data": {
    "downloadUrl": "直接下载链接或重定向"
  }
}
```

---

## 8. 拼图相关接口

### 8.1 获取拼图列表
- **请求方法**: `GET`
- **路由**: `/api/v1/mosaics`
- **查询参数**:
  - `page`: 页码
  - `pageSize`: 每页数量
- **响应**:
```json
{
  "code": 0,
  "message": "成功",
  "data": {
    "mosaics": [
      {
        "id": 1,
        "title": "拼图标题",
        "description": "拼图描述",
        "image": "完整图片URL",
        "thumbnailImage": "缩略图URL",
        "pieceCount": 100,
        "difficulty": "medium"
      }
    ],
    "total": 10,
    "page": 1,
    "pageSize": 10
  }
}
```

### 8.2 获取拼图详情与进度
- **请求方法**: `GET`
- **路由**: `/api/v1/mosaics/{mosaicId}`
- **请求头**: `Authorization: Bearer <token>` (可选)
- **响应**:
```json
{
  "code": 0,
  "message": "成功",
  "data": {
    "id": 1,
    "title": "拼图标题",
    "image": "完整图片URL",
    "pieceCount": 100,
    "difficulty": "medium",
    "userProgress": {
      "completedPieces": 45,
      "progressPercentage": 45,
      "startTime": "2025-01-10T10:00:00Z",
      "lastUpdateTime": "2025-01-15T15:30:00Z"
    }
  }
}
```

### 8.3 保存拼图进度
- **请求方法**: `POST`
- **路由**: `/api/v1/mosaics/{mosaicId}/progress`
- **请求头**: `Authorization: Bearer <token>`
- **请求体**:
```json
{
  "completedPieces": 50,
  "progressData": "压缩的进度数据 (可选，用于恢复进度)"
}
```
- **响应**:
```json
{
  "code": 0,
  "message": "进度已保存",
  "data": {
    "mosaicId": 1,
    "completedPieces": 50,
    "progressPercentage": 50,
    "lastUpdateTime": "2025-01-15T15:35:00Z"
  }
}
```

### 8.4 拼图完成
- **请求方法**: `POST`
- **路由**: `/api/v1/mosaics/{mosaicId}/complete`
- **请求头**: `Authorization: Bearer <token>`
- **响应**:
```json
{
  "code": 0,
  "message": "拼图完成！",
  "data": {
    "mosaicId": 1,
    "completedAt": "2025-01-15T16:00:00Z",
    "totalTime": 3600,
    "achievement": "成就奖励信息"
  }
}
```

---

## 9. 用户信息接口

### 9.1 获取个人信息
- **请求方法**: `GET`
- **路由**: `/api/v1/users/profile`
- **请求头**: `Authorization: Bearer <token>`
- **响应**:
```json
{
  "code": 0,
  "message": "成功",
  "data": {
    "id": 1,
    "username": "用户名",
    "email": "邮箱",
    "avatar": "头像URL",
    "bio": "个人简介",
    "graduationYear": 2020,
    "department": "学院名称",
    "joinedActivities": 5,
    "contributions": {
      "maxims": 3,
      "relayParticipations": 2,
      "mosaicCompleted": 1
    }
  }
}
```

### 9.2 更新个人信息
- **请求方法**: `PUT`
- **路由**: `/api/v1/users/profile`
- **请求头**: `Authorization: Bearer <token>`
- **请求体**:
```json
{
  "username": "新用户名",
  "bio": "新简介",
  "avatar": "新头像URL",
  "graduationYear": 2020,
  "department": "学院名称"
}
```

---

## 10. 统计数据接口

### 10.1 获取校庆统计信息
- **请求方法**: `GET`
- **路由**: `/api/v1/statistics/overview`
- **响应**:
```json
{
  "code": 0,
  "message": "成功",
  "data": {
    "totalVisitors": 150000,
    "totalUsers": 5000,
    "totalParticipants": 3500,
    "totalMaxims": 500,
    "totalRelayParticipations": 2000,
    "totalMosaicsCompleted": 800
  }
}
```

---

## 11. 文件上传接口

### 11.1 上传图片/视频
- **请求方法**: `POST`
- **路由**: `/api/v1/upload/media`
- **请求头**:
  - `Authorization: Bearer <token>`
  - `Content-Type: multipart/form-data`
- **请求体**:
  - `file`: 文件对象
  - `type`: 文件类型 (image/video)
- **响应**:
```json
{
  "code": 0,
  "message": "上传成功",
  "data": {
    "url": "文件URL",
    "fileSize": 1024000,
    "uploadedAt": "2025-01-15T10:30:00Z"
  }
}
```

---

## 12. 错误码定义

| 错误码 | 说明 |
|--------|------|
| 0 | 成功 |
| 400 | 请求参数错误 |
| 401 | 未授权/token过期 |
| 403 | 禁止访问 |
| 404 | 资源不存在 |
| 409 | 冲突(如用户名已存在) |
| 500 | 服务器错误 |
| 503 | 服务不可用 |

---

## 13. 鉴权说明

- **鉴权方式**: JWT Token
- **Token 位置**: `Authorization: Bearer <token>` 请求头
- **Token 有效期**: 24小时
- **刷新 Token 有效期**: 7天
- **需要鉴权的接口**: 所有带 `Authorization` 头的接口

---

## 14. 速率限制

- **全局限制**: 100 请求/分钟/IP
- **用户限制**: 1000 请求/小时/用户

---

## 15. 通用请求头

所有请求应包含:
```
Content-Type: application/json
User-Agent: <客户端标识>
```

---

## 16. CORS 配置

允许的来源:
- `https://hohai110.five-plus-one.comcom`
- `http://localhost:5173` (开发环境)

允许的方法: `GET`, `POST`, `PUT`, `DELETE`, `OPTIONS`

允许的请求头: `Content-Type`, `Authorization`
