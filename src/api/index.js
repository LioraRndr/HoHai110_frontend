import apiClient from './config'

// 用户认证API
export const authAPI = {
  // 查询注册状态
  getRegistrationStatus: async () => {
    return await apiClient.get('/auth/registration-status')
  },

  // 用户注册
  register: async (userData) => {
    return await apiClient.post('/auth/register', userData)
  },

  // 用户登录
  login: async (credentials) => {
    return await apiClient.post('/auth/login', credentials)
  },

  // 刷新Token
  refreshToken: async () => {
    return await apiClient.post('/auth/refresh')
  },

  // 登出
  logout: async () => {
    return await apiClient.post('/auth/logout')
  },

  // 获取当前用户信息
  getCurrentUser: async () => {
    return await apiClient.get('/auth/me')
  }
}

// 用户API
export const userAPI = {
  // 获取个人信息
  getProfile: async () => {
    return await apiClient.get('/users/profile')
  },

  // 更新个人信息
  updateProfile: async (data) => {
    return await apiClient.put('/users/profile', data)
  },

  // 修改密码
  changePassword: async (data) => {
    return await apiClient.put('/users/password', data)
  },

  // 发送邮箱验证码
  sendEmailCode: async (data) => {
    return await apiClient.post('/users/email/send-code', data)
  },

  // 更换邮箱
  changeEmail: async (data) => {
    return await apiClient.put('/users/email', data)
  },

  // 忘记密码 - 发送验证码
  forgotPassword: async (data) => {
    return await apiClient.post('/users/forgot-password', data)
  },

  // 重置密码
  resetPassword: async (data) => {
    return await apiClient.post('/users/reset-password', data)
  }
}

// 时间线API
export const timelineAPI = {
  // 获取时间线事件列表
  getEvents: async (params = {}) => {
    return await apiClient.get('/timeline/events', { params })
  },

  // 获取单个事件详情
  getEvent: async (eventId) => {
    return await apiClient.get(`/timeline/events/${eventId}`)
  }
}

// 接力活动API
export const relayAPI = {
  // 获取接力活动列表
  getActivities: async (params = {}) => {
    return await apiClient.get('/relay/activities', { params })
  },

  // 获取单个活动详情
  getActivity: async (activityId) => {
    return await apiClient.get(`/relay/activities/${activityId}`)
  },

  // 参与接力活动
  participate: async (data) => {
    return await apiClient.post('/relay/participate', data)
  },

  // 获取活动参与者
  getParticipants: async (activityId, params = {}) => {
    return await apiClient.get(`/relay/activities/${activityId}/participants`, { params })
  }
}

// 格言API
export const maximAPI = {
  // 获取格言列表
  getMaxims: async (params = {}) => {
    return await apiClient.get('/maxims', { params })
  },

  // 获取单个格言
  getMaxim: async (maximId) => {
    return await apiClient.get(`/maxims/${maximId}`)
  },

  // 提交格言
  createMaxim: async (data) => {
    return await apiClient.post('/maxims', data)
  },

  // 点赞格言
  likeMaxim: async (maximId) => {
    return await apiClient.post(`/maxims/${maximId}/like`)
  },

  // 取消点赞
  unlikeMaxim: async (maximId) => {
    return await apiClient.delete(`/maxims/${maximId}/like`)
  }
}

// 文件上传API
export const uploadAPI = {
  // 上传媒体文件
  uploadMedia: async (file, onProgress) => {
    const formData = new FormData()
    formData.append('file', file)

    return await apiClient.post('/upload/media', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      onUploadProgress: (progressEvent) => {
        if (onProgress) {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
          onProgress(percentCompleted)
        }
      }
    })
  },

  // 兼容旧的 uploadFile 方法
  uploadFile: async (file, onProgress) => {
    return await uploadAPI.uploadMedia(file, onProgress)
  }
}

// 文章API
export const articleAPI = {
  // 获取文章列表
  getArticles: async (params = {}) => {
    return await apiClient.get('/articles', { params })
  },

  // 获取文章详情
  getArticle: async (articleId) => {
    return await apiClient.get(`/articles/${articleId}`)
  },

  // 创建文章 (需要登录)
  createArticle: async (data) => {
    return await apiClient.post('/articles', data)
  },

  // 更新文章 (需要登录)
  updateArticle: async (articleId, data) => {
    return await apiClient.put(`/articles/${articleId}`, data)
  },

  // 删除文章 (需要登录)
  deleteArticle: async (articleId) => {
    return await apiClient.delete(`/articles/${articleId}`)
  }
}

// 评论API
export const commentAPI = {
  // 获取文章评论列表
  getComments: async (articleId, params = {}) => {
    return await apiClient.get(`/comments/article/${articleId}`, { params })
  },

  // 发表评论 (需要登录)
  createComment: async (articleId, data) => {
    return await apiClient.post(`/comments/article/${articleId}`, data)
  },

  // 删除评论 (需要登录)
  deleteComment: async (commentId) => {
    return await apiClient.delete(`/comments/${commentId}`)
  },

  // 点赞评论 (需要登录)
  likeComment: async (commentId) => {
    return await apiClient.post(`/comments/${commentId}/like`)
  },

  // 取消点赞评论 (需要登录)
  unlikeComment: async (commentId) => {
    return await apiClient.delete(`/comments/${commentId}/like`)
  }
}

// 祝福API
export const blessingAPI = {
  // 获取祝福列表
  getBlessings: async (params = {}) => {
    return await apiClient.get('/blessings', { params })
  },

  // 获取随机祝福
  getRandomBlessings: async (limit = 5) => {
    return await apiClient.get('/blessings/random', { params: { limit } })
  },

  // 获取单条祝福
  getBlessing: async (blessingId) => {
    return await apiClient.get(`/blessings/${blessingId}`)
  },

  // 发表祝福 (需要登录)
  createBlessing: async (data) => {
    return await apiClient.post('/blessings', data)
  },

  // 更新祝福 (需要登录)
  updateBlessing: async (blessingId, data) => {
    return await apiClient.put(`/blessings/${blessingId}`, data)
  },

  // 删除祝福 (需要登录)
  deleteBlessing: async (blessingId) => {
    return await apiClient.delete(`/blessings/${blessingId}`)
  },

  // 点赞祝福 (需要登录)
  likeBlessing: async (blessingId) => {
    return await apiClient.post(`/blessings/${blessingId}/like`)
  },

  // 取消点赞祝福 (需要登录)
  unlikeBlessing: async (blessingId) => {
    return await apiClient.delete(`/blessings/${blessingId}/like`)
  }
}

// 访客统计API
export const visitorAPI = {
  // 增加访客量
  addVisitor: async (sessionId = null) => {
    return await apiClient.post('/visitors/add', { sessionId })
  },

  // 获取访客总数
  getCount: async () => {
    return await apiClient.get('/visitors/count')
  },

  // 获取访客统计（管理员）
  getStats: async () => {
    return await apiClient.get('/visitors/stats')
  }
}

// 寄语未来API
export const futureMessageAPI = {
  // 创建寄语
  createMessage: async (data) => {
    return await apiClient.post('/future-messages', data)
  },

  // 获取寄语列表
  getMessages: async (params = {}) => {
    return await apiClient.get('/future-messages', { params })
  },

  // 获取随机寄语
  getRandomMessages: async (limit = 5) => {
    return await apiClient.get('/future-messages/random', { params: { limit } })
  },

  // 获取单条寄语详情
  getMessage: async (messageId) => {
    return await apiClient.get(`/future-messages/${messageId}`)
  },

  // 获取所有寄语（管理员）
  getAllMessages: async (params = {}) => {
    return await apiClient.get('/future-messages/admin/all', { params })
  },

  // 审核寄语（管理员）
  reviewMessage: async (messageId, status) => {
    return await apiClient.put(`/future-messages/admin/${messageId}/review`, { status })
  },

  // 删除寄语（管理员）
  deleteMessage: async (messageId) => {
    return await apiClient.delete(`/future-messages/admin/${messageId}`)
  }
}

// 管理员API
export const adminAPI = {
  // 获取统计数据
  getStats: async () => {
    return await apiClient.get('/admin/stats')
  },

  // 获取待审核内容
  getPendingContent: async () => {
    return await apiClient.get('/admin/pending')
  },

  // 审核评论
  reviewComment: async (commentId, status) => {
    return await apiClient.put(`/admin/comments/${commentId}/review`, { status })
  },

  // 审核祝福
  reviewBlessing: async (blessingId, status) => {
    return await apiClient.put(`/admin/blessings/${blessingId}/review`, { status })
  },

  // 用户管理
  // 获取用户列表
  getUsers: async (params = {}) => {
    return await apiClient.get('/admin/users', { params })
  },

  // 添加用户
  createUser: async (data) => {
    return await apiClient.post('/admin/users', data)
  },

  // 修改用户角色
  changeUserRole: async (userId, role) => {
    return await apiClient.put(`/admin/users/${userId}/role`, { role })
  },

  // 编辑用户信息
  updateUser: async (userId, data) => {
    return await apiClient.put(`/admin/users/${userId}`, data)
  },

  // 删除用户
  deleteUser: async (userId) => {
    return await apiClient.delete(`/admin/users/${userId}`)
  },

  // 批量删除用户
  batchDeleteUsers: async (ids) => {
    return await apiClient.post('/admin/users/batch-delete', { ids })
  },

  // 批量删除内容
  batchDelete: async (type, ids) => {
    return await apiClient.post('/admin/batch-delete', { type, ids })
  },

  // 系统配置管理
  // 获取所有系统配置
  getConfigs: async () => {
    return await apiClient.get('/admin/configs')
  },

  // 获取单个系统配置
  getConfig: async (key) => {
    return await apiClient.get(`/admin/configs/${key}`)
  },

  // 设置注册开关
  setRegistrationStatus: async (enabled) => {
    return await apiClient.put('/admin/configs/registration', { enabled })
  },

  // 设置SMTP配置
  setSMTPConfig: async (config) => {
    return await apiClient.put('/admin/configs/smtp', config)
  },

  // 测试SMTP连接
  testSMTP: async () => {
    return await apiClient.post('/admin/configs/smtp/test')
  }
}

// 火炬传递API
export const torchAPI = {
  // 获取火炬数量
  getTorchCount: async () => {
    return await apiClient.get('/torch/get')
  },

  // 传递火炬（增加火炬数量）
  passTorch: async (count = 1) => {
    return await apiClient.post('/torch/add', { count })
  }
}

// 论坛API
export const forumAPI = {
  // 板块相关
  // 获取所有板块
  getForums: async (params = {}) => {
    return await apiClient.get('/forum/forums', { params })
  },

  // 获取单个板块详情
  getForum: async (forumId) => {
    return await apiClient.get(`/forum/forums/${forumId}`)
  },

  // 创建板块 (管理员)
  createForum: async (data) => {
    return await apiClient.post('/forum/forums', data)
  },

  // 更新板块 (管理员)
  updateForum: async (forumId, data) => {
    return await apiClient.put(`/forum/forums/${forumId}`, data)
  },

  // 删除板块 (管理员)
  deleteForum: async (forumId) => {
    return await apiClient.delete(`/forum/forums/${forumId}`)
  },

  // 帖子相关
  // 获取帖子列表
  getPosts: async (params = {}) => {
    return await apiClient.get('/forum/posts', { params })
  },

  // 获取单个帖子详情
  getPost: async (postId) => {
    return await apiClient.get(`/forum/posts/${postId}`)
  },

  // 创建帖子 (需登录)
  createPost: async (data) => {
    return await apiClient.post('/forum/posts', data)
  },

  // 更新帖子 (作者或管理员)
  updatePost: async (postId, data) => {
    return await apiClient.put(`/forum/posts/${postId}`, data)
  },

  // 删除帖子 (作者或管理员)
  deletePost: async (postId) => {
    return await apiClient.delete(`/forum/posts/${postId}`)
  },

  // 回复相关
  // 获取回复列表
  getReplies: async (postId, params = {}) => {
    return await apiClient.get(`/forum/posts/${postId}/replies`, { params })
  },

  // 创建回复 (需登录)
  createReply: async (postId, data) => {
    return await apiClient.post(`/forum/posts/${postId}/replies`, data)
  },

  // 删除回复 (作者或管理员)
  deleteReply: async (replyId) => {
    return await apiClient.delete(`/forum/replies/${replyId}`)
  },

  // 点赞相关
  // 点赞帖子或回复
  like: async (targetType, targetId) => {
    return await apiClient.post(`/forum/${targetType}/${targetId}/like`)
  },

  // 取消点赞
  unlike: async (targetType, targetId) => {
    return await apiClient.delete(`/forum/${targetType}/${targetId}/like`)
  },

  // 管理员功能
  // 置顶/取消置顶
  toggleSticky: async (postId, isSticky) => {
    return await apiClient.put(`/forum/posts/${postId}/sticky`, { isSticky })
  },

  // 加精/取消加精
  toggleHighlight: async (postId, isHighlighted) => {
    return await apiClient.put(`/forum/posts/${postId}/highlight`, { isHighlighted })
  },

  // 锁定/解锁
  toggleLock: async (postId, isLocked) => {
    return await apiClient.put(`/forum/posts/${postId}/lock`, { isLocked })
  },

  // 审核帖子
  reviewPost: async (postId, status) => {
    return await apiClient.put(`/forum/posts/${postId}/review`, { status })
  },

  // 审核回复
  reviewReply: async (replyId, status) => {
    return await apiClient.put(`/forum/replies/${replyId}/review`, { status })
  }
}

export default {
  auth: authAPI,
  user: userAPI,
  timeline: timelineAPI,
  relay: relayAPI,
  maxim: maximAPI,
  upload: uploadAPI,
  article: articleAPI,
  comment: commentAPI,
  blessing: blessingAPI,
  visitor: visitorAPI,
  futureMessage: futureMessageAPI,
  admin: adminAPI,
  forum: forumAPI,
  torch: torchAPI
}
