# 认证失败自动登出测试文档

## 优化内容概述

优化了认证失败的处理逻辑，当后端返回认证失败时：
1. ✅ 自动清除所有认证信息（localStorage 和 Pinia store）
2. ✅ 显示全局提示："登录信息已过期，请重新登录"
3. ✅ 自动跳转到登录页面
4. ✅ 保存当前页面路径，登录后可跳转回原页面
5. ✅ 防止重复弹出提示

## 修改的文件

### 1. `src/api/config.js`

主要改动：
- 新增 `isAuthenticationError()` 函数：智能识别认证失败
- 新增 `handleAuthenticationFailure()` 函数：统一处理认证失败
- 新增 `clearAuthData()` 函数：清除所有认证数据
- 优化响应拦截器：支持多种认证失败场景

### 2. 认证失败检测规则

系统会检测以下情况作为认证失败：

#### HTTP 状态码
- 401 Unauthorized
- 403 Forbidden (业务层)

#### 业务状态码（response.data.code）
- 401
- 403

#### 错误消息关键词（不区分大小写）
- "认证失败"
- "身份验证失败"
- "登录已过期"
- "登录失效"
- "未授权"
- "无效的令牌"
- "无效的token"
- "token已过期"
- "token失效"
- "unauthorized"
- "authentication failed"
- "token expired"
- "invalid token"

## 测试场景

### 场景 1：后端返回 HTTP 401

```javascript
// 后端返回
HTTP Status: 401
{
  code: 401,
  message: "Token expired",
  data: null
}

// 预期行为
1. 拦截器捕获 401 状态码
2. 尝试使用 refreshToken 刷新
3. 如果刷新失败，触发认证失败处理
4. 显示提示："登录信息已过期，请重新登录"
5. 跳转到登录页面
```

### 场景 2：后端返回业务错误（你的情况）

```javascript
// 后端返回
HTTP Status: 200
{
  code: 500,
  message: "Invalid status code: \"认证失败\". Status code must be an integer.",
  data: null
}

// 预期行为
1. 拦截器检测到 message 包含 "认证失败"
2. 调用 isAuthenticationError() 返回 true
3. 触发 handleAuthenticationFailure()
4. 显示提示："登录信息已过期，请重新登录"
5. 清除所有认证数据
6. 跳转到登录页面
```

### 场景 3：正常的业务错误

```javascript
// 后端返回
HTTP Status: 200
{
  code: 500,
  message: "数据库连接失败",
  data: null
}

// 预期行为
1. 拦截器检测到 message 不包含认证相关关键词
2. isAuthenticationError() 返回 false
3. 正常返回错误，不触发登出
4. 组件层处理错误提示
```

## 如何测试

### 方法 1：使用浏览器开发者工具

1. 打开浏览器开发者工具（F12）
2. 切换到 Application/应用程序 标签
3. 找到 Local Storage
4. 删除或修改 `token` 的值，使其失效
5. 访问需要认证的页面（如 `/profile`）
6. 观察是否正确跳转到登录页面并显示提示

### 方法 2：模拟后端返回

在浏览器控制台执行以下代码：

```javascript
// 导入 API 客户端
import('@/api/config').then(module => {
  const apiClient = module.default

  // 发起一个会触发认证失败的请求
  apiClient.get('/auth/me').catch(error => {
    console.log('认证失败测试成功:', error.message)
  })
})
```

### 方法 3：修改拦截器测试

临时修改 `src/api/config.js` 的响应拦截器：

```javascript
// 在响应拦截器的 response 处理中添加
apiClient.interceptors.response.use(
  (response) => {
    // 临时测试代码：强制触发认证失败
    if (response.config.url.includes('/test-auth')) {
      const testData = {
        code: 500,
        message: "认证失败",
        data: null
      }
      handleAuthenticationFailure()
      return Promise.reject(new Error('登录信息已过期，请重新登录'))
    }

    // ... 原有代码
  },
  // ...
)
```

然后在任意组件中调用：

```javascript
import apiClient from '@/api/config'

// 触发测试
apiClient.get('/test-auth')
```

### 方法 4：使用 API 拦截工具

使用 Chrome 扩展如 "ModHeader" 或 "Requestly"：

1. 拦截 API 响应
2. 修改响应数据为认证失败格式
3. 观察前端行为

## 预期结果

✅ **正确的行为**
1. 看到橙色/黄色的警告提示："登录信息已过期，请重新登录"
2. 提示显示 0.5 秒后，自动跳转到登录页面
3. localStorage 中的 `token`、`refreshToken`、`user` 被清除
4. 当前页面路径被保存到 `redirectAfterLogin`
5. 重新登录后，跳转回原页面

❌ **错误的行为**
1. 看到红色错误提示或页面崩溃
2. 停留在原页面不跳转
3. 认证信息未被清除
4. 重复弹出多个提示框

## 防重复提示机制

系统使用 `isAuthErrorShown` 标志防止重复提示：

```javascript
let isAuthErrorShown = false

function handleAuthenticationFailure() {
  if (isAuthErrorShown) {
    return  // 已经显示过，直接返回
  }
  isAuthErrorShown = true

  // ... 处理逻辑

  // 跳转完成后重置标志
  router.push({ name: 'Login' }).then(() => {
    isAuthErrorShown = false
  })
}
```

这样即使短时间内多个 API 请求都失败，也只会显示一次提示。

## 登录后自动跳转

登录页面 `src/pages/Login.vue` 已支持自动跳转：

```javascript
// 登录成功后
const redirectPath = route.query.redirect || localStorage.getItem('redirectAfterLogin')

if (redirectPath) {
  localStorage.removeItem('redirectAfterLogin')
  await router.replace(redirectPath)
} else {
  await router.replace('/')
}
```

## 兼容性说明

- ✅ 支持 HTTP 401/403 状态码
- ✅ 支持业务状态码（response.data.code）
- ✅ 支持中英文错误消息
- ✅ 兼容现有的 refreshToken 刷新机制
- ✅ 避免循环依赖（使用动态导入）

## 常见问题

### Q1: 为什么使用动态导入 router？
A: 避免循环依赖。`config.js` 被很多模块导入，如果直接导入 router，可能造成模块循环引用。

### Q2: 提示显示时间可以调整吗？
A: 可以，修改 `handleAuthenticationFailure()` 中的延迟时间：
```javascript
setTimeout(() => {
  // ...
}, 500)  // 修改这个值（毫秒）
```

### Q3: 可以修改提示文字吗？
A: 可以，修改这一行：
```javascript
$message.warning('登录信息已过期，请重新登录', '提示')
```

### Q4: 后端消息格式不匹配怎么办？
A: 在 `isAuthenticationError()` 函数的 `authErrorPatterns` 数组中添加你的关键词。

## 后续优化建议

1. **添加国际化支持**：提示消息使用 i18n
2. **日志记录**：记录认证失败事件，便于调试
3. **用户体验优化**：添加倒计时或进度条
4. **错误上报**：将认证失败事件上报到监控系统

## 总结

本次优化完善了认证失败的处理流程，提供了：
- 🔒 更安全的认证管理
- 💬 更友好的用户提示
- 🔄 自动重定向功能
- 🛡️ 防重复提示机制

现在你的应用可以优雅地处理各种认证失败场景了！
