<template>
  <PageLayout>
    <div class="admin-page">
      <div class="page-header">
        <h1>管理后台</h1>
        <p class="subtitle">内容审核与数据统计</p>
      </div>

      <!-- 侧边导航 -->
      <div class="admin-container">
        <aside class="sidebar">
          <nav class="nav-menu">
            <button
              v-for="item in menuItems"
              :key="item.id"
              :class="['menu-item', { active: activeMenu === item.id }]"
              @click="activeMenu = item.id"
            >
              <span class="menu-icon">{{ item.icon }}</span>
              <span class="menu-label">{{ item.label }}</span>
              <span v-if="item.badge" class="menu-badge">{{ item.badge }}</span>
            </button>
          </nav>
        </aside>

        <!-- 主内容区 -->
        <main class="main-content">
          <!-- 数据统计 -->
          <section v-if="activeMenu === 'stats'" class="content-section">
            <h2>数据统计概览</h2>
            <div v-if="statsLoading" class="loading-text">加载中...</div>
            <div v-else>
              <div class="stats-grid">
                <div class="stat-card">
                  <div class="stat-icon">👥</div>
                  <div class="stat-info">
                    <div class="stat-value">{{ stats.users || 0 }}</div>
                    <div class="stat-label">注册用户</div>
                  </div>
                </div>
                <div class="stat-card">
                  <div class="stat-icon">📝</div>
                  <div class="stat-info">
                    <div class="stat-value">{{ stats.articles || 0 }}</div>
                    <div class="stat-label">文章数</div>
                  </div>
                </div>
                <div class="stat-card">
                  <div class="stat-icon">💬</div>
                  <div class="stat-info">
                    <div class="stat-value">{{ stats.comments || 0 }}</div>
                    <div class="stat-label">评论数</div>
                  </div>
                </div>
                <div class="stat-card">
                  <div class="stat-icon">🎉</div>
                  <div class="stat-info">
                    <div class="stat-value">{{ stats.blessings || 0 }}</div>
                    <div class="stat-label">祝福数</div>
                  </div>
                </div>
                <div class="stat-card">
                  <div class="stat-icon">📖</div>
                  <div class="stat-info">
                    <div class="stat-value">{{ stats.maxims || 0 }}</div>
                    <div class="stat-label">格言数</div>
                  </div>
                </div>
                <div class="stat-card">
                  <div class="stat-icon">🏃</div>
                  <div class="stat-info">
                    <div class="stat-value">{{ stats.relayParticipations || 0 }}</div>
                    <div class="stat-label">接力参与</div>
                  </div>
                </div>
              </div>

              <!-- 访客统计 -->
              <div class="visitor-stats">
                <h3>访客统计</h3>
                <div v-if="visitorStatsLoading" class="loading-text">加载中...</div>
                <div v-else class="stats-grid">
                  <div class="stat-card">
                    <div class="stat-icon">🌐</div>
                    <div class="stat-info">
                      <div class="stat-value">{{ visitorStats.totalVisitors || 0 }}</div>
                      <div class="stat-label">总访客数</div>
                    </div>
                  </div>
                  <div class="stat-card">
                    <div class="stat-icon">📅</div>
                    <div class="stat-info">
                      <div class="stat-value">{{ visitorStats.todayVisitors || 0 }}</div>
                      <div class="stat-label">今日访客</div>
                    </div>
                  </div>
                  <div class="stat-card">
                    <div class="stat-icon">📊</div>
                    <div class="stat-info">
                      <div class="stat-value">{{ visitorStats.weekVisitors || 0 }}</div>
                      <div class="stat-label">本周访客</div>
                    </div>
                  </div>
                  <div class="stat-card">
                    <div class="stat-icon">📈</div>
                    <div class="stat-info">
                      <div class="stat-value">{{ visitorStats.monthVisitors || 0 }}</div>
                      <div class="stat-label">本月访客</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <!-- 待审核内容 -->
          <section v-if="activeMenu === 'pending'" class="content-section">
            <h2>待审核内容</h2>
            <div v-if="pendingLoading" class="loading-text">加载中...</div>
            <div v-else class="tabs-container">
              <div class="tabs">
                <button
                  :class="{ active: pendingTab === 'comments' }"
                  @click="pendingTab = 'comments'"
                  class="tab-btn"
                >
                  评论 ({{ pendingContent.comments?.length || 0 }})
                </button>
                <button
                  :class="{ active: pendingTab === 'blessings' }"
                  @click="pendingTab = 'blessings'"
                  class="tab-btn"
                >
                  祝福 ({{ pendingContent.blessings?.length || 0 }})
                </button>
              </div>

              <!-- 评论列表 -->
              <div v-if="pendingTab === 'comments'" class="content-list">
                <div v-if="!pendingContent.comments || pendingContent.comments.length === 0" class="empty-state">
                  暂无待审核评论
                </div>
                <div
                  v-for="comment in pendingContent.comments"
                  :key="comment.id"
                  class="content-item"
                >
                  <div class="item-header">
                    <span class="user-name">{{ comment.user?.username }}</span>
                    <span class="item-date">{{ formatDate(comment.createdAt) }}</span>
                  </div>
                  <div class="item-content">{{ comment.content }}</div>
                  <div class="item-meta">
                    <span>关联文章ID: {{ comment.articleId }}</span>
                  </div>
                  <div class="item-actions">
                    <button
                      @click="reviewComment(comment.id, 'approved')"
                      class="approve-btn"
                    >
                      ✓ 通过
                    </button>
                    <button
                      @click="reviewComment(comment.id, 'rejected')"
                      class="reject-btn"
                    >
                      ✗ 拒绝
                    </button>
                  </div>
                </div>
              </div>

              <!-- 祝福列表 -->
              <div v-if="pendingTab === 'blessings'" class="content-list">
                <div v-if="!pendingContent.blessings || pendingContent.blessings.length === 0" class="empty-state">
                  暂无待审核祝福
                </div>
                <div
                  v-for="blessing in pendingContent.blessings"
                  :key="blessing.id"
                  class="content-item"
                >
                  <div class="item-header">
                    <span class="user-name">
                      {{ blessing.isAnonymous ? '匿名校友' : blessing.authorName }}
                    </span>
                    <span class="item-date">{{ formatDate(blessing.createdAt) }}</span>
                  </div>
                  <div class="item-content">{{ blessing.content }}</div>
                  <div class="item-meta">
                    <span v-if="!blessing.isAnonymous && blessing.graduationYear">
                      {{ blessing.graduationYear }}届
                    </span>
                    <span v-if="!blessing.isAnonymous && blessing.department">
                      {{ blessing.department }}
                    </span>
                  </div>
                  <div class="item-actions">
                    <button
                      @click="reviewBlessing(blessing.id, 'approved')"
                      class="approve-btn"
                    >
                      ✓ 通过
                    </button>
                    <button
                      @click="reviewBlessing(blessing.id, 'rejected')"
                      class="reject-btn"
                    >
                      ✗ 拒绝
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <!-- 用户管理 -->
          <section v-if="activeMenu === 'users'" class="content-section">
            <h2>用户管理</h2>
            <div class="search-bar">
              <input
                v-model="userSearch"
                @keyup.enter="loadUsers"
                type="text"
                placeholder="搜索用户名或邮箱..."
                class="search-input"
              />
              <button @click="loadUsers" class="search-btn">搜索</button>
              <button @click="showCreateUserDialog" class="create-btn">添加用户</button>
              <button
                v-if="selectedUsers.length > 0"
                @click="batchDeleteUsers"
                class="delete-btn"
              >
                批量删除 ({{ selectedUsers.length }})
              </button>
            </div>
            <div v-if="usersLoading" class="loading-text">加载中...</div>
            <div v-else class="users-table">
              <table>
                <thead>
                  <tr>
                    <th width="50">
                      <input
                        type="checkbox"
                        @change="toggleAllUsers"
                        :checked="selectedUsers.length === users.length && users.length > 0"
                      />
                    </th>
                    <th>ID</th>
                    <th>用户名</th>
                    <th>邮箱</th>
                    <th>角色</th>
                    <th>毕业年份</th>
                    <th>院系</th>
                    <th>注册时间</th>
                    <th>操作</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="user in users" :key="user.id">
                    <td>
                      <input
                        type="checkbox"
                        :value="user.id"
                        v-model="selectedUsers"
                        :disabled="user.role === 'admin'"
                      />
                    </td>
                    <td>{{ user.id }}</td>
                    <td>{{ user.username }}</td>
                    <td>{{ user.email }}</td>
                    <td>
                      <span :class="['role-badge', user.role]">
                        {{ user.role === 'admin' ? '管理员' : '用户' }}
                      </span>
                    </td>
                    <td>{{ user.graduationYear || '-' }}</td>
                    <td>{{ user.department || '-' }}</td>
                    <td>{{ formatDate(user.createdAt) }}</td>
                    <td>
                      <div class="table-actions">
                        <button
                          @click="editUser(user)"
                          class="edit-btn-sm"
                          title="编辑"
                        >
                          编辑
                        </button>
                        <button
                          v-if="user.role !== 'admin'"
                          @click="changeRole(user)"
                          class="action-btn-sm"
                          title="修改角色"
                        >
                          改为{{ user.role === 'user' ? '管理员' : '用户' }}
                        </button>
                        <button
                          v-if="user.role !== 'admin'"
                          @click="deleteUser(user.id)"
                          class="delete-btn-sm"
                          title="删除"
                        >
                          删除
                        </button>
                        <span v-else class="protected">-</span>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
              <div v-if="userTotalPages > 1" class="pagination">
                <button
                  @click="changeUserPage(userPage - 1)"
                  :disabled="userPage === 1"
                  class="page-btn"
                >
                  上一页
                </button>
                <span class="page-info">{{ userPage }} / {{ userTotalPages }}</span>
                <button
                  @click="changeUserPage(userPage + 1)"
                  :disabled="userPage === userTotalPages"
                  class="page-btn"
                >
                  下一页
                </button>
              </div>
            </div>
          </section>

          <!-- 文章管理 -->
          <section v-if="activeMenu === 'articles'" class="content-section">
            <h2>文章管理</h2>
            <div class="toolbar">
              <input
                v-model="articleSearch"
                @keyup.enter="loadArticles"
                type="text"
                placeholder="搜索文章标题..."
                class="search-input"
              />
              <select v-model="articleCategory" @change="loadArticles" class="filter-select">
                <option value="">全部分类</option>
                <option value="校庆动态">校庆动态</option>
                <option value="校史回顾">校史回顾</option>
                <option value="校友风采">校友风采</option>
              </select>
              <select v-model="articleStatus" @change="loadArticles" class="filter-select">
                <option value="">全部状态</option>
                <option value="published">已发布</option>
                <option value="draft">草稿</option>
                <option value="archived">已归档</option>
              </select>
              <button @click="loadArticles" class="search-btn">搜索</button>
            </div>
            <div v-if="articlesLoading" class="loading-text">加载中...</div>
            <div v-else>
              <div class="content-list">
                <div v-if="articles.length === 0" class="empty-state">暂无文章</div>
                <div
                  v-for="article in articles"
                  :key="article.id"
                  class="content-item"
                >
                  <div class="item-header">
                    <span class="item-title">{{ article.title }}</span>
                    <span :class="['status-badge', article.status]">
                      {{ getStatusText(article.status) }}
                    </span>
                  </div>
                  <div class="item-summary">{{ article.summary }}</div>
                  <div class="item-meta">
                    <span>分类: {{ article.category }}</span>
                    <span>浏览: {{ article.views }}</span>
                    <span>发布时间: {{ formatDate(article.publishedAt || article.createdAt) }}</span>
                  </div>
                  <div class="item-actions">
                    <button @click="viewArticle(article.id)" class="view-btn">查看</button>
                    <button @click="deleteArticle(article.id)" class="delete-btn">删除</button>
                  </div>
                </div>
              </div>
              <div v-if="articleTotalPages > 1" class="pagination">
                <button
                  @click="changeArticlePage(articlePage - 1)"
                  :disabled="articlePage === 1"
                  class="page-btn"
                >
                  上一页
                </button>
                <span class="page-info">{{ articlePage }} / {{ articleTotalPages }}</span>
                <button
                  @click="changeArticlePage(articlePage + 1)"
                  :disabled="articlePage === articleTotalPages"
                  class="page-btn"
                >
                  下一页
                </button>
              </div>
            </div>
          </section>

          <!-- 寄语未来管理 -->
          <section v-if="activeMenu === 'future-messages'" class="content-section">
            <h2>寄语未来管理</h2>
            <div class="toolbar">
              <select v-model="messageStatus" @change="loadFutureMessages" class="filter-select">
                <option value="">全部状态</option>
                <option value="pending">待审核</option>
                <option value="approved">已通过</option>
                <option value="rejected">已拒绝</option>
              </select>
              <button @click="loadFutureMessages" class="search-btn">刷新</button>
            </div>
            <div v-if="messagesLoading" class="loading-text">加载中...</div>
            <div v-else>
              <div class="content-list">
                <div v-if="futureMessages.length === 0" class="empty-state">暂无寄语</div>
                <div
                  v-for="message in futureMessages"
                  :key="message.id"
                  class="content-item"
                >
                  <div class="item-header">
                    <span class="user-name">{{ message.name }}</span>
                    <span :class="['status-badge', message.status]">
                      {{ getStatusText(message.status) }}
                    </span>
                  </div>
                  <div class="item-meta">
                    <span>届别: {{ message.grade }}</span>
                    <span>时间: {{ formatDate(message.createdAt) }}</span>
                    <span v-if="message.user">用户: {{ message.user.username }}</span>
                  </div>
                  <div class="item-content">{{ message.message }}</div>
                  <div class="item-actions">
                    <button
                      v-if="message.status !== 'approved'"
                      @click="reviewFutureMessage(message.id, 'approved')"
                      class="approve-btn"
                    >
                      ✓ 通过
                    </button>
                    <button
                      v-if="message.status !== 'rejected'"
                      @click="reviewFutureMessage(message.id, 'rejected')"
                      class="reject-btn"
                    >
                      ✗ 拒绝
                    </button>
                    <button
                      @click="deleteFutureMessage(message.id)"
                      class="delete-btn"
                    >
                      删除
                    </button>
                  </div>
                </div>
              </div>
              <div v-if="messageTotalPages > 1" class="pagination">
                <button
                  @click="changeMessagePage(messagePage - 1)"
                  :disabled="messagePage === 1"
                  class="page-btn"
                >
                  上一页
                </button>
                <span class="page-info">{{ messagePage }} / {{ messageTotalPages }}</span>
                <button
                  @click="changeMessagePage(messagePage + 1)"
                  :disabled="messagePage === messageTotalPages"
                  class="page-btn"
                >
                  下一页
                </button>
              </div>
            </div>
          </section>

          <!-- 论坛管理 -->
          <section v-if="activeMenu === 'forum'" class="content-section">
            <h2>论坛管理</h2>
            <div class="tabs-container">
              <div class="tabs">
                <button
                  :class="{ active: forumTab === 'boards' }"
                  @click="forumTab = 'boards'"
                  class="tab-btn"
                >
                  板块管理
                </button>
                <button
                  :class="{ active: forumTab === 'posts' }"
                  @click="forumTab = 'posts'"
                  class="tab-btn"
                >
                  帖子管理
                </button>
                <button
                  :class="{ active: forumTab === 'replies' }"
                  @click="forumTab = 'replies'"
                  class="tab-btn"
                >
                  回复管理
                </button>
              </div>

              <!-- 板块管理 -->
              <div v-if="forumTab === 'boards'">
                <div class="toolbar">
                  <button @click="showCreateForumDialog" class="create-btn">创建板块</button>
                </div>
                <div v-if="forumsLoading" class="loading-text">加载中...</div>
                <div v-else class="content-list">
                  <div v-if="forums.length === 0" class="empty-state">暂无板块</div>
                  <div
                    v-for="forum in forums"
                    :key="forum.id"
                    class="content-item"
                  >
                    <div class="item-header">
                      <span class="item-title">{{ forum.name }}</span>
                      <span :class="['status-badge', forum.status]">
                        {{ forum.status === 'active' ? '活跃' : '归档' }}
                      </span>
                    </div>
                    <div class="item-content">{{ forum.description }}</div>
                    <div class="item-meta">
                      <span>帖子数: {{ forum.postCount }}</span>
                      <span>回复数: {{ forum.replyCount }}</span>
                      <span>排序: {{ forum.order }}</span>
                    </div>
                    <div class="item-actions">
                      <button @click="editForum(forum)" class="edit-btn">编辑</button>
                      <button @click="deleteForum(forum.id)" class="delete-btn">删除</button>
                    </div>
                  </div>
                </div>
              </div>

              <!-- 帖子管理 -->
              <div v-if="forumTab === 'posts'">
                <div class="toolbar">
                  <select v-model="postForumId" @change="loadForumPosts" class="filter-select">
                    <option value="">全部板块</option>
                    <option v-for="forum in forums" :key="forum.id" :value="forum.id">
                      {{ forum.name }}
                    </option>
                  </select>
                  <select v-model="postStatus" @change="loadForumPosts" class="filter-select">
                    <option value="">全部状态</option>
                    <option value="approved">已通过</option>
                    <option value="pending">待审核</option>
                    <option value="rejected">已拒绝</option>
                    <option value="locked">已锁定</option>
                  </select>
                  <button @click="loadForumPosts" class="search-btn">搜索</button>
                </div>
                <div v-if="postsLoading" class="loading-text">加载中...</div>
                <div v-else>
                  <div class="content-list">
                    <div v-if="forumPosts.length === 0" class="empty-state">暂无帖子</div>
                    <div
                      v-for="post in forumPosts"
                      :key="post.id"
                      class="content-item"
                    >
                      <div class="item-header">
                        <span class="item-title">{{ post.title }}</span>
                        <div class="badges">
                          <span v-if="post.isSticky" class="badge sticky">置顶</span>
                          <span v-if="post.isHighlighted" class="badge highlight">精华</span>
                          <span :class="['status-badge', post.status]">
                            {{ getStatusText(post.status) }}
                          </span>
                        </div>
                      </div>
                      <div class="item-content">{{ post.content.substring(0, 100) }}...</div>
                      <div class="item-meta">
                        <span>作者: {{ post.user?.username }}</span>
                        <span>浏览: {{ post.views }}</span>
                        <span>点赞: {{ post.likes }}</span>
                        <span>回复: {{ post.replyCount }}</span>
                      </div>
                      <div class="item-actions">
                        <button @click="togglePostSticky(post)" class="action-btn">
                          {{ post.isSticky ? '取消置顶' : '置顶' }}
                        </button>
                        <button @click="togglePostHighlight(post)" class="action-btn">
                          {{ post.isHighlighted ? '取消精华' : '加精' }}
                        </button>
                        <button @click="togglePostLock(post)" class="action-btn">
                          {{ post.status === 'locked' ? '解锁' : '锁定' }}
                        </button>
                        <button
                          v-if="post.status !== 'approved'"
                          @click="reviewPost(post.id, 'approved')"
                          class="approve-btn"
                        >
                          通过
                        </button>
                        <button @click="deleteForumPost(post.id)" class="delete-btn">删除</button>
                      </div>
                    </div>
                  </div>
                  <div v-if="postTotalPages > 1" class="pagination">
                    <button
                      @click="changePostPage(postPage - 1)"
                      :disabled="postPage === 1"
                      class="page-btn"
                    >
                      上一页
                    </button>
                    <span class="page-info">{{ postPage }} / {{ postTotalPages }}</span>
                    <button
                      @click="changePostPage(postPage + 1)"
                      :disabled="postPage === postTotalPages"
                      class="page-btn"
                    >
                      下一页
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <!-- 系统设置 -->
          <section v-if="activeMenu === 'settings'" class="content-section">
            <h2>系统设置</h2>
            <div class="tabs-container">
              <div class="tabs">
                <button
                  :class="{ active: settingsTab === 'registration' }"
                  @click="settingsTab = 'registration'"
                  class="tab-btn"
                >
                  注册设置
                </button>
                <button
                  :class="{ active: settingsTab === 'smtp' }"
                  @click="settingsTab = 'smtp'"
                  class="tab-btn"
                >
                  SMTP配置
                </button>
              </div>

              <!-- 注册设置 -->
              <div v-if="settingsTab === 'registration'" class="settings-panel">
                <div class="form-group">
                  <label class="switch-label">
                    <span>允许用户注册</span>
                    <div class="switch-wrapper">
                      <input
                        type="checkbox"
                        v-model="registrationEnabled"
                        @change="updateRegistrationStatus"
                        class="switch-input"
                      />
                      <span class="switch-slider"></span>
                    </div>
                  </label>
                  <p class="form-hint">
                    关闭后,新用户将无法注册账号。现有用户不受影响。
                  </p>
                </div>
              </div>

              <!-- SMTP配置 -->
              <div v-if="settingsTab === 'smtp'" class="settings-panel">
                <div class="form-group">
                  <label>SMTP服务器地址</label>
                  <input
                    v-model="smtpConfig.host"
                    type="text"
                    class="form-input"
                    placeholder="smtp.example.com"
                  />
                </div>
                <div class="form-group">
                  <label>端口</label>
                  <input
                    v-model.number="smtpConfig.port"
                    type="number"
                    class="form-input"
                    placeholder="587"
                  />
                </div>
                <div class="form-group">
                  <label class="checkbox-label">
                    <input
                      type="checkbox"
                      v-model="smtpConfig.secure"
                    />
                    <span>使用SSL/TLS</span>
                  </label>
                </div>
                <div class="form-group">
                  <label>发件邮箱</label>
                  <input
                    v-model="smtpConfig.user"
                    type="email"
                    class="form-input"
                    placeholder="your-email@example.com"
                  />
                </div>
                <div class="form-group">
                  <label>邮箱密码/授权码</label>
                  <input
                    v-model="smtpConfig.password"
                    type="password"
                    class="form-input"
                    placeholder="请输入密码或授权码"
                  />
                </div>
                <div class="form-group">
                  <label>发件人名称</label>
                  <input
                    v-model="smtpConfig.fromName"
                    type="text"
                    class="form-input"
                    placeholder="河海大学110周年校庆"
                  />
                </div>
                <div class="form-actions">
                  <button @click="testSMTP" class="action-btn" :disabled="smtpTesting">
                    {{ smtpTesting ? '测试中...' : '测试连接' }}
                  </button>
                  <button @click="saveSMTPConfig" class="confirm-btn" :disabled="smtpSaving">
                    {{ smtpSaving ? '保存中...' : '保存配置' }}
                  </button>
                </div>
                <div v-if="smtpTestResult" class="test-result" :class="smtpTestResult.success ? 'success' : 'error'">
                  {{ smtpTestResult.message }}
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>

      <!-- 创建/编辑用户对话框 -->
      <div v-if="userDialog.show" class="dialog-overlay" @click.self="closeUserDialog">
        <div class="dialog">
          <div class="dialog-header">
            <h3>{{ userDialog.isEdit ? '编辑用户' : '添加用户' }}</h3>
            <button @click="closeUserDialog" class="close-btn">×</button>
          </div>
          <div class="dialog-body">
            <div class="form-group">
              <label>用户名 *</label>
              <input v-model="userDialog.data.username" type="text" class="form-input" />
            </div>
            <div class="form-group">
              <label>邮箱 *</label>
              <input v-model="userDialog.data.email" type="email" class="form-input" />
            </div>
            <div class="form-group" v-if="!userDialog.isEdit">
              <label>密码 *</label>
              <input v-model="userDialog.data.password" type="password" class="form-input" />
            </div>
            <div class="form-group" v-if="userDialog.isEdit">
              <label>新密码 (留空则不修改)</label>
              <input v-model="userDialog.data.password" type="password" class="form-input" />
            </div>
            <div class="form-group">
              <label>角色</label>
              <select v-model="userDialog.data.role" class="form-select">
                <option value="user">用户</option>
                <option value="admin">管理员</option>
              </select>
            </div>
            <div class="form-group">
              <label>毕业年份</label>
              <input v-model.number="userDialog.data.graduationYear" type="number" class="form-input" />
            </div>
            <div class="form-group">
              <label>院系</label>
              <input v-model="userDialog.data.department" type="text" class="form-input" />
            </div>
            <div class="form-group">
              <label>头像URL</label>
              <input v-model="userDialog.data.avatar" type="text" class="form-input" />
            </div>
            <div class="form-group">
              <label>个人简介</label>
              <textarea v-model="userDialog.data.bio" class="form-textarea"></textarea>
            </div>
          </div>
          <div class="dialog-footer">
            <button @click="closeUserDialog" class="cancel-btn">取消</button>
            <button @click="saveUserDialog" class="confirm-btn">保存</button>
          </div>
        </div>
      </div>

      <!-- 创建/编辑板块对话框 -->
      <div v-if="forumDialog.show" class="dialog-overlay" @click.self="closeForumDialog">
        <div class="dialog">
          <div class="dialog-header">
            <h3>{{ forumDialog.isEdit ? '编辑板块' : '创建板块' }}</h3>
            <button @click="closeForumDialog" class="close-btn">×</button>
          </div>
          <div class="dialog-body">
            <div class="form-group">
              <label>板块名称</label>
              <input v-model="forumDialog.data.name" type="text" class="form-input" />
            </div>
            <div class="form-group">
              <label>板块描述</label>
              <textarea v-model="forumDialog.data.description" class="form-textarea"></textarea>
            </div>
            <div class="form-group">
              <label>图标URL</label>
              <input v-model="forumDialog.data.icon" type="text" class="form-input" />
            </div>
            <div class="form-group">
              <label>排序顺序</label>
              <input v-model.number="forumDialog.data.order" type="number" class="form-input" />
            </div>
            <div class="form-group">
              <label>状态</label>
              <select v-model="forumDialog.data.status" class="form-select">
                <option value="active">活跃</option>
                <option value="archived">归档</option>
              </select>
            </div>
          </div>
          <div class="dialog-footer">
            <button @click="closeForumDialog" class="cancel-btn">取消</button>
            <button @click="saveForumDialog" class="confirm-btn">保存</button>
          </div>
        </div>
      </div>
    </div>
  </PageLayout>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { adminAPI, articleAPI, futureMessageAPI, forumAPI, visitorAPI } from '@/api'
import { $message } from '@/utils/message.js'
import PageLayout from '@/components/PageLayout.vue'

const router = useRouter()

// 菜单状态
const activeMenu = ref('stats')
const pendingTab = ref('comments')
const forumTab = ref('boards')
const settingsTab = ref('registration')

// 数据
const stats = reactive({
  users: 0,
  articles: 0,
  comments: 0,
  blessings: 0,
  maxims: 0,
  relayParticipations: 0
})

const visitorStats = reactive({
  totalVisitors: 0,
  todayVisitors: 0,
  weekVisitors: 0,
  monthVisitors: 0
})

const pendingContent = reactive({
  comments: [],
  blessings: []
})

const users = ref([])
const selectedUsers = ref([])
const articles = ref([])
const futureMessages = ref([])
const forums = ref([])
const forumPosts = ref([])

// 系统设置
const registrationEnabled = ref(true)
const smtpConfig = reactive({
  host: '',
  port: 587,
  secure: false,
  user: '',
  password: '',
  fromName: '河海大学110周年校庆'
})
const smtpTesting = ref(false)
const smtpSaving = ref(false)
const smtpTestResult = ref(null)

// 加载状态
const statsLoading = ref(true)
const visitorStatsLoading = ref(true)
const pendingLoading = ref(true)
const usersLoading = ref(false)
const articlesLoading = ref(false)
const messagesLoading = ref(false)
const forumsLoading = ref(false)
const postsLoading = ref(false)

// 搜索和过滤
const userSearch = ref('')
const articleSearch = ref('')
const articleCategory = ref('')
const articleStatus = ref('')
const messageStatus = ref('')
const postForumId = ref('')
const postStatus = ref('')

// 分页
const userPage = ref(1)
const userTotalPages = ref(1)
const articlePage = ref(1)
const articleTotalPages = ref(1)
const messagePage = ref(1)
const messageTotalPages = ref(1)
const postPage = ref(1)
const postTotalPages = ref(1)

// 论坛对话框
const forumDialog = reactive({
  show: false,
  isEdit: false,
  data: {
    id: null,
    name: '',
    description: '',
    icon: '',
    order: 0,
    status: 'active'
  }
})

// 用户对话框
const userDialog = reactive({
  show: false,
  isEdit: false,
  data: {
    id: null,
    username: '',
    email: '',
    password: '',
    role: 'user',
    avatar: '',
    bio: '',
    graduationYear: null,
    department: ''
  }
})

// 菜单项
const menuItems = computed(() => [
  { id: 'stats', icon: '📊', label: '数据统计', badge: null },
  {
    id: 'pending',
    icon: '⏳',
    label: '待审核',
    badge: (pendingContent.comments?.length || 0) + (pendingContent.blessings?.length || 0) || null
  },
  { id: 'users', icon: '👥', label: '用户管理', badge: null },
  { id: 'articles', icon: '📝', label: '文章管理', badge: null },
  { id: 'future-messages', icon: '💌', label: '寄语管理', badge: null },
  { id: 'forum', icon: '💬', label: '论坛管理', badge: null },
  { id: 'settings', icon: '⚙️', label: '系统设置', badge: null }
])

// 加载统计数据
const loadStats = async () => {
  statsLoading.value = true
  try {
    const response = await adminAPI.getStats()
    Object.assign(stats, response.data)
  } catch (error) {
    console.error('加载统计数据失败:', error)
    $message.error('加载统计数据失败')
  } finally {
    statsLoading.value = false
  }
}

// 加载访客统计
const loadVisitorStats = async () => {
  visitorStatsLoading.value = true
  try {
    const response = await visitorAPI.getStats()
    Object.assign(visitorStats, response.data)
  } catch (error) {
    console.error('加载访客统计失败:', error)
    $message.error('加载访客统计失败')
  } finally {
    visitorStatsLoading.value = false
  }
}

// 加载待审核内容
const loadPendingContent = async () => {
  pendingLoading.value = true
  try {
    const response = await adminAPI.getPendingContent()
    Object.assign(pendingContent, response.data)
  } catch (error) {
    console.error('加载待审核内容失败:', error)
    $message.error('加载待审核内容失败')
  } finally {
    pendingLoading.value = false
  }
}

// 审核评论
const reviewComment = async (commentId, status) => {
  try {
    await adminAPI.reviewComment(commentId, status)
    $message.success(status === 'approved' ? '评论已通过' : '评论已拒绝')
    await loadPendingContent()
  } catch (error) {
    console.error('审核评论失败:', error)
    $message.error('审核失败')
  }
}

// 审核祝福
const reviewBlessing = async (blessingId, status) => {
  try {
    await adminAPI.reviewBlessing(blessingId, status)
    $message.success(status === 'approved' ? '祝福已通过' : '祝福已拒绝')
    await loadPendingContent()
  } catch (error) {
    console.error('审核祝福失败:', error)
    $message.error('审核失败')
  }
}

// 加载用户列表
const loadUsers = async () => {
  usersLoading.value = true
  try {
    const params = {
      page: userPage.value,
      limit: 20
    }
    if (userSearch.value) {
      params.search = userSearch.value
    }
    const response = await adminAPI.getUsers(params)
    users.value = response.data.users
    userTotalPages.value = response.data.totalPages
  } catch (error) {
    console.error('加载用户列表失败:', error)
    $message.error('加载用户列表失败')
  } finally {
    usersLoading.value = false
  }
}

// 删除用户
const deleteUser = async (userId) => {
  const confirmed = await $message.confirm(
    '此操作将永久删除该用户及其所有相关数据，且无法恢复。',
    '确认删除用户',
    { type: 'danger', confirmText: '删除', cancelText: '取消' }
  )
  if (!confirmed) return

  try {
    await adminAPI.deleteUser(userId)
    $message.success('用户已删除')
    await loadUsers()
  } catch (error) {
    console.error('删除用户失败:', error)
    $message.error('删除失败')
  }
}

// 显示创建用户对话框
const showCreateUserDialog = () => {
  userDialog.show = true
  userDialog.isEdit = false
  userDialog.data = {
    id: null,
    username: '',
    email: '',
    password: '',
    role: 'user',
    avatar: '',
    bio: '',
    graduationYear: null,
    department: ''
  }
}

// 编辑用户
const editUser = (user) => {
  userDialog.show = true
  userDialog.isEdit = true
  userDialog.data = {
    ...user,
    password: '' // 密码留空
  }
}

// 关闭用户对话框
const closeUserDialog = () => {
  userDialog.show = false
}

// 保存用户对话框
const saveUserDialog = async () => {
  // 验证必填字段
  if (!userDialog.data.username || !userDialog.data.email) {
    $message.error('请填写用户名和邮箱')
    return
  }

  if (!userDialog.isEdit && !userDialog.data.password) {
    $message.error('请填写密码')
    return
  }

  try {
    const data = { ...userDialog.data }
    // 如果是编辑且密码为空,删除密码字段
    if (userDialog.isEdit && !data.password) {
      delete data.password
    }

    if (userDialog.isEdit) {
      await adminAPI.updateUser(data.id, data)
      $message.success('用户信息已更新')
    } else {
      await adminAPI.createUser(data)
      $message.success('用户已创建')
    }
    closeUserDialog()
    await loadUsers()
  } catch (error) {
    console.error('保存用户失败:', error)
    $message.error(error.response?.data?.message || '保存失败')
  }
}

// 修改用户角色
const changeRole = async (user) => {
  const newRole = user.role === 'user' ? 'admin' : 'user'
  const confirmed = await $message.confirm(
    `确定要将 ${user.username} 的角色改为${newRole === 'admin' ? '管理员' : '普通用户'}吗？`,
    '修改用户角色',
    { type: 'warning', confirmText: '确定', cancelText: '取消' }
  )
  if (!confirmed) return

  try {
    await adminAPI.changeUserRole(user.id, newRole)
    $message.success('角色已修改')
    await loadUsers()
  } catch (error) {
    console.error('修改角色失败:', error)
    $message.error('修改失败')
  }
}

// 切换全选用户
const toggleAllUsers = (event) => {
  if (event.target.checked) {
    selectedUsers.value = users.value
      .filter(user => user.role !== 'admin')
      .map(user => user.id)
  } else {
    selectedUsers.value = []
  }
}

// 批量删除用户
const batchDeleteUsers = async () => {
  if (selectedUsers.value.length === 0) {
    $message.warning('请先选择要删除的用户')
    return
  }

  const confirmed = await $message.confirm(
    `此操作将永久删除选中的 ${selectedUsers.value.length} 个用户及其所有相关数据，且无法恢复。`,
    '确认批量删除',
    { type: 'danger', confirmText: '删除', cancelText: '取消' }
  )
  if (!confirmed) return

  try {
    await adminAPI.batchDeleteUsers(selectedUsers.value)
    $message.success(`成功删除 ${selectedUsers.value.length} 个用户`)
    selectedUsers.value = []
    await loadUsers()
  } catch (error) {
    console.error('批量删除失败:', error)
    $message.error('批量删除失败')
  }
}

// 切换用户页码
const changeUserPage = (newPage) => {
  if (newPage < 1 || newPage > userTotalPages.value) return
  userPage.value = newPage
  loadUsers()
}

// 加载文章列表
const loadArticles = async () => {
  articlesLoading.value = true
  try {
    const params = {
      page: articlePage.value,
      limit: 20
    }
    if (articleCategory.value) params.category = articleCategory.value
    if (articleStatus.value) params.status = articleStatus.value
    if (articleSearch.value) params.search = articleSearch.value

    const response = await articleAPI.getArticles(params)
    articles.value = response.data.articles
    articleTotalPages.value = response.data.totalPages
  } catch (error) {
    console.error('加载文章列表失败:', error)
    $message.error('加载文章列表失败')
  } finally {
    articlesLoading.value = false
  }
}

// 查看文章
const viewArticle = (articleId) => {
  router.push(`/articles/${articleId}`)
}

// 删除文章
const deleteArticle = async (articleId) => {
  const confirmed = await $message.confirm(
    '此操作将永久删除该文章及其所有评论，且无法恢复。',
    '确认删除文章',
    { type: 'danger', confirmText: '删除', cancelText: '取消' }
  )
  if (!confirmed) return

  try {
    await articleAPI.deleteArticle(articleId)
    $message.success('文章已删除')
    await loadArticles()
  } catch (error) {
    console.error('删除文章失败:', error)
    $message.error('删除失败')
  }
}

// 切换文章页码
const changeArticlePage = (newPage) => {
  if (newPage < 1 || newPage > articleTotalPages.value) return
  articlePage.value = newPage
  loadArticles()
}

// 加载寄语列表
const loadFutureMessages = async () => {
  messagesLoading.value = true
  try {
    const params = {
      page: messagePage.value,
      limit: 20
    }
    if (messageStatus.value) params.status = messageStatus.value

    const response = await futureMessageAPI.getAllMessages(params)
    futureMessages.value = response.data.messages
    messageTotalPages.value = response.data.pagination.totalPages
  } catch (error) {
    console.error('加载寄语列表失败:', error)
    $message.error('加载寄语列表失败')
  } finally {
    messagesLoading.value = false
  }
}

// 审核寄语
const reviewFutureMessage = async (messageId, status) => {
  try {
    await futureMessageAPI.reviewMessage(messageId, status)
    $message.success(status === 'approved' ? '寄语已通过' : '寄语已拒绝')
    await loadFutureMessages()
  } catch (error) {
    console.error('审核寄语失败:', error)
    $message.error('审核失败')
  }
}

// 删除寄语
const deleteFutureMessage = async (messageId) => {
  const confirmed = await $message.confirm(
    '此操作将永久删除该寄语，且无法恢复。',
    '确认删除寄语',
    { type: 'danger', confirmText: '删除', cancelText: '取消' }
  )
  if (!confirmed) return

  try {
    await futureMessageAPI.deleteMessage(messageId)
    $message.success('寄语已删除')
    await loadFutureMessages()
  } catch (error) {
    console.error('删除寄语失败:', error)
    $message.error('删除失败')
  }
}

// 切换寄语页码
const changeMessagePage = (newPage) => {
  if (newPage < 1 || newPage > messageTotalPages.value) return
  messagePage.value = newPage
  loadFutureMessages()
}

// 加载论坛板块
const loadForums = async () => {
  forumsLoading.value = true
  try {
    const response = await forumAPI.getForums()
    forums.value = response.data.forums
  } catch (error) {
    console.error('加载论坛板块失败:', error)
    $message.error('加载论坛板块失败')
  } finally {
    forumsLoading.value = false
  }
}

// 显示创建板块对话框
const showCreateForumDialog = () => {
  forumDialog.show = true
  forumDialog.isEdit = false
  forumDialog.data = {
    id: null,
    name: '',
    description: '',
    icon: '',
    order: 0,
    status: 'active'
  }
}

// 编辑板块
const editForum = (forum) => {
  forumDialog.show = true
  forumDialog.isEdit = true
  forumDialog.data = { ...forum }
}

// 关闭对话框
const closeForumDialog = () => {
  forumDialog.show = false
}

// 保存板块
const saveForumDialog = async () => {
  try {
    if (forumDialog.isEdit) {
      await forumAPI.updateForum(forumDialog.data.id, forumDialog.data)
      $message.success('板块已更新')
    } else {
      await forumAPI.createForum(forumDialog.data)
      $message.success('板块已创建')
    }
    closeForumDialog()
    await loadForums()
  } catch (error) {
    console.error('保存板块失败:', error)
    $message.error('保存失败')
  }
}

// 删除板块
const deleteForum = async (forumId) => {
  const confirmed = await $message.confirm(
    '此操作将永久删除该板块及其所有帖子和回复，且无法恢复。',
    '确认删除板块',
    { type: 'danger', confirmText: '删除', cancelText: '取消' }
  )
  if (!confirmed) return

  try {
    await forumAPI.deleteForum(forumId)
    $message.success('板块已删除')
    await loadForums()
  } catch (error) {
    console.error('删除板块失败:', error)
    $message.error('删除失败')
  }
}

// 加载论坛帖子
const loadForumPosts = async () => {
  postsLoading.value = true
  try {
    const params = {
      page: postPage.value,
      limit: 20
    }
    if (postForumId.value) params.forumId = postForumId.value
    if (postStatus.value) params.status = postStatus.value

    const response = await forumAPI.getPosts(params)
    forumPosts.value = response.data.posts
    postTotalPages.value = response.data.pagination.totalPages
  } catch (error) {
    console.error('加载帖子列表失败:', error)
    $message.error('加载帖子列表失败')
  } finally {
    postsLoading.value = false
  }
}

// 切换置顶
const togglePostSticky = async (post) => {
  try {
    await forumAPI.toggleSticky(post.id, !post.isSticky)
    $message.success(post.isSticky ? '已取消置顶' : '已置顶')
    await loadForumPosts()
  } catch (error) {
    console.error('操作失败:', error)
    $message.error('操作失败')
  }
}

// 切换精华
const togglePostHighlight = async (post) => {
  try {
    await forumAPI.toggleHighlight(post.id, !post.isHighlighted)
    $message.success(post.isHighlighted ? '已取消精华' : '已加精')
    await loadForumPosts()
  } catch (error) {
    console.error('操作失败:', error)
    $message.error('操作失败')
  }
}

// 切换锁定
const togglePostLock = async (post) => {
  try {
    const isLocked = post.status === 'locked'
    await forumAPI.toggleLock(post.id, !isLocked)
    $message.success(isLocked ? '已解锁' : '已锁定')
    await loadForumPosts()
  } catch (error) {
    console.error('操作失败:', error)
    $message.error('操作失败')
  }
}

// 审核帖子
const reviewPost = async (postId, status) => {
  try {
    await forumAPI.reviewPost(postId, status)
    $message.success('帖子已通过')
    await loadForumPosts()
  } catch (error) {
    console.error('审核失败:', error)
    $message.error('审核失败')
  }
}

// 删除帖子
const deleteForumPost = async (postId) => {
  const confirmed = await $message.confirm(
    '此操作将永久删除该帖子及其所有回复，且无法恢复。',
    '确认删除帖子',
    { type: 'danger', confirmText: '删除', cancelText: '取消' }
  )
  if (!confirmed) return

  try {
    await forumAPI.deletePost(postId)
    $message.success('帖子已删除')
    await loadForumPosts()
  } catch (error) {
    console.error('删除失败:', error)
    $message.error('删除失败')
  }
}

// 切换帖子页码
const changePostPage = (newPage) => {
  if (newPage < 1 || newPage > postTotalPages.value) return
  postPage.value = newPage
  loadForumPosts()
}

// 格式化日期
const formatDate = (dateString) => {
  if (!dateString) return '-'
  const date = new Date(dateString)
  return date.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  })
}

// 获取状态文本
const getStatusText = (status) => {
  const statusMap = {
    pending: '待审核',
    approved: '已通过',
    rejected: '已拒绝',
    published: '已发布',
    draft: '草稿',
    archived: '已归档',
    locked: '已锁定',
    active: '活跃'
  }
  return statusMap[status] || status
}

// 系统设置相关函数
// 加载系统配置
const loadSystemConfig = async () => {
  try {
    // 加载注册状态
    const regStatusResponse = await adminAPI.getConfig('registration_enabled')
    registrationEnabled.value = regStatusResponse.data.value

    // 加载SMTP配置
    const smtpResponse = await adminAPI.getConfig('smtp_config')
    if (smtpResponse.data.value) {
      Object.assign(smtpConfig, smtpResponse.data.value)
    }
  } catch (error) {
    console.error('加载系统配置失败:', error)
  }
}

// 更新注册状态
const updateRegistrationStatus = async () => {
  try {
    await adminAPI.setRegistrationStatus(registrationEnabled.value)
    $message.success(registrationEnabled.value ? '已开启用户注册' : '已关闭用户注册')
  } catch (error) {
    console.error('更新注册状态失败:', error)
    $message.error('更新失败')
    // 恢复原值
    registrationEnabled.value = !registrationEnabled.value
  }
}

// 测试SMTP连接
const testSMTP = async () => {
  smtpTesting.value = true
  smtpTestResult.value = null

  try {
    const response = await adminAPI.testSMTP()
    smtpTestResult.value = {
      success: true,
      message: response.data.message || 'SMTP连接测试成功'
    }
    $message.success('SMTP连接测试成功')
  } catch (error) {
    console.error('SMTP测试失败:', error)
    smtpTestResult.value = {
      success: false,
      message: error.response?.data?.message || 'SMTP连接测试失败'
    }
    $message.error('SMTP连接测试失败')
  } finally {
    smtpTesting.value = false
  }
}

// 保存SMTP配置
const saveSMTPConfig = async () => {
  // 验证必填字段
  if (!smtpConfig.host || !smtpConfig.user || !smtpConfig.password) {
    $message.error('请填写SMTP服务器地址、发件邮箱和密码')
    return
  }

  smtpSaving.value = true
  smtpTestResult.value = null

  try {
    const response = await adminAPI.setSMTPConfig(smtpConfig)
    $message.success('SMTP配置已保存')

    // 如果返回了测试结果,显示测试结果
    if (response.data.testResult) {
      smtpTestResult.value = response.data.testResult
    }
  } catch (error) {
    console.error('保存SMTP配置失败:', error)
    $message.error(error.response?.data?.message || '保存失败')
  } finally {
    smtpSaving.value = false
  }
}

onMounted(() => {
  loadStats()
  loadVisitorStats()
  loadPendingContent()
  loadUsers()
  loadArticles()
  loadFutureMessages()
  loadForums()
  loadForumPosts()
  loadSystemConfig()
})
</script>

<style scoped>
.admin-page {
  max-width: 1600px;
  margin: 0 auto;
  padding: 2rem;
  min-height: 100vh;
}

.page-header {
  text-align: center;
  margin-bottom: 2rem;
  margin-top: 60px;
}

.page-header h1 {
  font-size: 2.5rem;
  font-weight: 700;
  background: linear-gradient(135deg, #4A90E2 0%, #357ABD 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 0.5rem;
}

.subtitle {
  font-size: 1.1rem;
  color: #666;
}

.admin-container {
  display: grid;
  grid-template-columns: 250px 1fr;
  gap: 2rem;
}

/* 侧边栏 */
.sidebar {
  background: #ffffff;
  border-radius: 12px;
  border: 1px solid #e0e0e0;
  padding: 1rem;
  height: fit-content;
  position: sticky;
  top: 100px;
}

.nav-menu {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.menu-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.875rem 1rem;
  background: transparent;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  text-align: left;
  color: #666;
  font-size: 0.95rem;
  position: relative;
}

.menu-item:hover {
  background: #f5f5f5;
  color: #333;
}

.menu-item.active {
  background: linear-gradient(135deg, rgba(74, 144, 226, 0.1) 0%, rgba(53, 122, 189, 0.1) 100%);
  color: #4A90E2;
  font-weight: 600;
}

.menu-icon {
  font-size: 1.3rem;
}

.menu-label {
  flex: 1;
}

.menu-badge {
  background: #ff4444;
  color: white;
  font-size: 0.75rem;
  padding: 0.2rem 0.5rem;
  border-radius: 10px;
  min-width: 20px;
  text-align: center;
}

/* 主内容区 */
.main-content {
  min-height: 500px;
}

.content-section {
  background: #ffffff;
  border-radius: 12px;
  border: 1px solid #e0e0e0;
  padding: 2rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.content-section h2 {
  font-size: 1.8rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 1.5rem;
}

.content-section h3 {
  font-size: 1.4rem;
  font-weight: 600;
  color: #333;
  margin: 2rem 0 1rem 0;
}

.loading-text {
  text-align: center;
  padding: 2rem;
  color: #999;
}

/* 统计卡片 */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.stat-card {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.5rem;
  background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%);
  border: 1px solid #e0e0e0;
  border-radius: 12px;
  transition: all 0.3s ease;
}

.stat-card:hover {
  transform: translateY(-2px);
  border-color: #4A90E2;
  box-shadow: 0 4px 12px rgba(74, 144, 226, 0.15);
}

.stat-icon {
  font-size: 2.5rem;
}

.stat-value {
  font-size: 2rem;
  font-weight: 700;
  color: #4A90E2;
}

.stat-label {
  font-size: 0.9rem;
  color: #666;
}

/* 标签页 */
.tabs-container {
  margin-top: 1.5rem;
}

.tabs {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
  border-bottom: 2px solid #e0e0e0;
}

.tab-btn {
  padding: 0.8rem 1.5rem;
  background: transparent;
  color: #666;
  border: none;
  border-bottom: 2px solid transparent;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 1rem;
  font-weight: 500;
  margin-bottom: -2px;
}

.tab-btn:hover {
  color: #333;
}

.tab-btn.active {
  color: #4A90E2;
  border-bottom-color: #4A90E2;
}

/* 内容列表 */
.content-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.empty-state {
  text-align: center;
  padding: 3rem;
  color: #999;
}

.content-item {
  padding: 1.5rem;
  background: #f8f9fa;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  transition: all 0.3s ease;
}

.content-item:hover {
  border-color: #4A90E2;
  box-shadow: 0 2px 8px rgba(74, 144, 226, 0.1);
}

.item-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.75rem;
}

.user-name,
.item-title {
  font-weight: 600;
  color: #333;
  font-size: 1.05rem;
}

.item-date {
  font-size: 0.85rem;
  color: #999;
}

.item-content {
  color: #333;
  line-height: 1.6;
  margin-bottom: 0.75rem;
  white-space: pre-wrap;
}

.item-summary {
  color: #666;
  line-height: 1.6;
  margin-bottom: 0.75rem;
}

.item-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  font-size: 0.85rem;
  color: #666;
  margin-bottom: 1rem;
}

.item-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

/* 徽章 */
.badges {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}

.badge {
  display: inline-block;
  padding: 0.25rem 0.6rem;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 500;
}

.badge.sticky {
  background: rgba(255, 152, 0, 0.2);
  color: #ff9800;
  border: 1px solid rgba(255, 152, 0, 0.3);
}

.badge.highlight {
  background: rgba(255, 215, 0, 0.3);
  color: #ff8c00;
  border: 1px solid rgba(255, 215, 0, 0.5);
}

.status-badge {
  display: inline-block;
  padding: 0.3rem 0.7rem;
  border-radius: 12px;
  font-size: 0.85rem;
  font-weight: 500;
}

.status-badge.pending {
  background: rgba(255, 193, 7, 0.2);
  color: #ffa000;
  border: 1px solid rgba(255, 193, 7, 0.3);
}

.status-badge.approved,
.status-badge.published,
.status-badge.active {
  background: rgba(76, 175, 80, 0.2);
  color: #4caf50;
  border: 1px solid rgba(76, 175, 80, 0.3);
}

.status-badge.rejected {
  background: rgba(244, 67, 54, 0.2);
  color: #f44336;
  border: 1px solid rgba(244, 67, 54, 0.3);
}

.status-badge.draft {
  background: rgba(158, 158, 158, 0.2);
  color: #757575;
  border: 1px solid rgba(158, 158, 158, 0.3);
}

.status-badge.locked,
.status-badge.archived {
  background: rgba(96, 125, 139, 0.2);
  color: #607d8b;
  border: 1px solid rgba(96, 125, 139, 0.3);
}

.role-badge {
  display: inline-block;
  padding: 0.3rem 0.7rem;
  border-radius: 12px;
  font-size: 0.85rem;
  font-weight: 500;
}

.role-badge.admin {
  background: rgba(255, 152, 0, 0.2);
  color: #ff9800;
  border: 1px solid rgba(255, 152, 0, 0.3);
}

.role-badge.user {
  background: rgba(74, 144, 226, 0.2);
  color: #4A90E2;
  border: 1px solid rgba(74, 144, 226, 0.3);
}

/* 按钮 */
.approve-btn,
.reject-btn,
.delete-btn,
.view-btn,
.edit-btn,
.action-btn,
.create-btn,
.search-btn {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  font-size: 0.9rem;
  transition: all 0.3s ease;
}

.approve-btn {
  background: rgba(76, 175, 80, 0.2);
  color: #4caf50;
  border: 1px solid rgba(76, 175, 80, 0.3);
}

.approve-btn:hover {
  background: rgba(76, 175, 80, 0.3);
}

.reject-btn {
  background: rgba(244, 67, 54, 0.2);
  color: #f44336;
  border: 1px solid rgba(244, 67, 54, 0.3);
}

.reject-btn:hover {
  background: rgba(244, 67, 54, 0.3);
}

.delete-btn {
  background: rgba(244, 67, 54, 0.2);
  color: #f44336;
  border: 1px solid rgba(244, 67, 54, 0.3);
}

.delete-btn:hover {
  background: rgba(244, 67, 54, 0.3);
}

.view-btn {
  background: rgba(33, 150, 243, 0.2);
  color: #2196f3;
  border: 1px solid rgba(33, 150, 243, 0.3);
}

.view-btn:hover {
  background: rgba(33, 150, 243, 0.3);
}

.edit-btn {
  background: rgba(255, 152, 0, 0.2);
  color: #ff9800;
  border: 1px solid rgba(255, 152, 0, 0.3);
}

.edit-btn:hover {
  background: rgba(255, 152, 0, 0.3);
}

.action-btn {
  background: rgba(158, 158, 158, 0.2);
  color: #757575;
  border: 1px solid rgba(158, 158, 158, 0.3);
}

.action-btn:hover {
  background: rgba(158, 158, 158, 0.3);
}

.create-btn {
  background: linear-gradient(135deg, #4A90E2 0%, #357ABD 100%);
  color: white;
  padding: 0.7rem 1.5rem;
}

.create-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(74, 144, 226, 0.4);
}

.search-btn {
  background: linear-gradient(135deg, #4A90E2 0%, #357ABD 100%);
  color: white;
  padding: 0.7rem 1.5rem;
}

.search-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(74, 144, 226, 0.4);
}

.protected {
  color: #ccc;
}

/* 搜索栏和工具栏 */
.search-bar,
.toolbar {
  display: flex;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
}

.search-input {
  flex: 1;
  min-width: 200px;
  padding: 0.7rem 1rem;
  background: #ffffff;
  color: #333;
  border: 1px solid #d0d0d0;
  border-radius: 8px;
  transition: all 0.3s ease;
}

.search-input:focus {
  outline: none;
  border-color: #4A90E2;
  box-shadow: 0 0 0 3px rgba(74, 144, 226, 0.1);
}

.filter-select {
  padding: 0.7rem 1rem;
  background: #ffffff;
  color: #333;
  border: 1px solid #d0d0d0;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.filter-select:focus {
  outline: none;
  border-color: #4A90E2;
}

/* 表格 */
.users-table {
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
}

thead {
  background: #f5f5f5;
}

th {
  padding: 1rem;
  text-align: left;
  color: #555;
  font-weight: 600;
  border-bottom: 2px solid #e0e0e0;
}

td {
  padding: 1rem;
  color: #333;
  border-bottom: 1px solid #f0f0f0;
}

tbody tr:hover {
  background: #f8f9fa;
}

/* 分页 */
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin-top: 1.5rem;
}

.page-btn {
  padding: 0.6rem 1.2rem;
  background: #ffffff;
  color: #333;
  border: 1px solid #d0d0d0;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.page-btn:hover:not(:disabled) {
  background: #f0f0f0;
  border-color: #4A90E2;
}

.page-btn:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

.page-info {
  color: #555;
  font-size: 0.9rem;
  font-weight: 500;
}

/* 对话框 */
.dialog-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.dialog {
  background: #ffffff;
  border-radius: 12px;
  max-width: 500px;
  width: 90%;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
}

.dialog-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  border-bottom: 1px solid #e0e0e0;
}

.dialog-header h3 {
  font-size: 1.3rem;
  font-weight: 600;
  color: #333;
  margin: 0;
}

.close-btn {
  background: none;
  border: none;
  font-size: 2rem;
  color: #999;
  cursor: pointer;
  line-height: 1;
  padding: 0;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: all 0.3s ease;
}

.close-btn:hover {
  background: #f0f0f0;
  color: #333;
}

.dialog-body {
  padding: 1.5rem;
}

.form-group {
  margin-bottom: 1.25rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  color: #333;
  font-weight: 500;
}

.form-input,
.form-textarea,
.form-select {
  width: 100%;
  padding: 0.7rem 1rem;
  background: #ffffff;
  color: #333;
  border: 1px solid #d0d0d0;
  border-radius: 8px;
  transition: all 0.3s ease;
}

.form-input:focus,
.form-textarea:focus,
.form-select:focus {
  outline: none;
  border-color: #4A90E2;
  box-shadow: 0 0 0 3px rgba(74, 144, 226, 0.1);
}

.form-textarea {
  min-height: 100px;
  resize: vertical;
}

.dialog-footer {
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
  padding: 1.5rem;
  border-top: 1px solid #e0e0e0;
}

.cancel-btn,
.confirm-btn {
  padding: 0.7rem 1.5rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.3s ease;
}

.cancel-btn {
  background: #f0f0f0;
  color: #666;
}

.cancel-btn:hover {
  background: #e0e0e0;
}

.confirm-btn {
  background: linear-gradient(135deg, #4A90E2 0%, #357ABD 100%);
  color: white;
}

.confirm-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(74, 144, 226, 0.4);
}

/* 响应式 */
@media (max-width: 1024px) {
  .admin-container {
    grid-template-columns: 1fr;
  }

  .sidebar {
    position: static;
  }

  .nav-menu {
    flex-direction: row;
    overflow-x: auto;
  }

  .menu-item {
    flex-shrink: 0;
  }
}

@media (max-width: 768px) {
  .admin-page {
    padding: 1rem;
  }

  .content-section {
    padding: 1.5rem;
  }

  .stats-grid {
    grid-template-columns: 1fr;
  }

  .toolbar {
    flex-direction: column;
  }

  .filter-select {
    width: 100%;
  }

  table {
    font-size: 0.85rem;
  }

  th,
  td {
    padding: 0.75rem 0.5rem;
  }
}

/* 新增样式 */
/* 表格操作按钮 */
.table-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.edit-btn-sm,
.delete-btn-sm,
.action-btn-sm {
  padding: 0.3rem 0.6rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.8rem;
  transition: all 0.2s ease;
}

.edit-btn-sm {
  background: rgba(255, 152, 0, 0.2);
  color: #ff9800;
  border: 1px solid rgba(255, 152, 0, 0.3);
}

.edit-btn-sm:hover {
  background: rgba(255, 152, 0, 0.3);
}

.delete-btn-sm {
  background: rgba(244, 67, 54, 0.2);
  color: #f44336;
  border: 1px solid rgba(244, 67, 54, 0.3);
}

.delete-btn-sm:hover {
  background: rgba(244, 67, 54, 0.3);
}

.action-btn-sm {
  background: rgba(33, 150, 243, 0.2);
  color: #2196f3;
  border: 1px solid rgba(33, 150, 243, 0.3);
}

.action-btn-sm:hover {
  background: rgba(33, 150, 243, 0.3);
}

/* 系统设置面板 */
.settings-panel {
  padding: 2rem;
  background: #f8f9fa;
  border-radius: 8px;
}

.switch-label {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1rem;
  font-weight: 500;
  color: #333;
}

.switch-wrapper {
  position: relative;
  width: 50px;
  height: 26px;
}

.switch-input {
  opacity: 0;
  width: 0;
  height: 0;
}

.switch-slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  transition: .4s;
  border-radius: 26px;
}

.switch-slider:before {
  position: absolute;
  content: "";
  height: 20px;
  width: 20px;
  left: 3px;
  bottom: 3px;
  background-color: white;
  transition: .4s;
  border-radius: 50%;
}

.switch-input:checked + .switch-slider {
  background-color: #4A90E2;
}

.switch-input:checked + .switch-slider:before {
  transform: translateX(24px);
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
}

.checkbox-label input[type="checkbox"] {
  width: 18px;
  height: 18px;
  cursor: pointer;
}

.form-hint {
  margin-top: 0.5rem;
  font-size: 0.85rem;
  color: #666;
}

.form-actions {
  display: flex;
  gap: 1rem;
  margin-top: 1.5rem;
}

.test-result {
  margin-top: 1rem;
  padding: 1rem;
  border-radius: 8px;
  font-size: 0.9rem;
}

.test-result.success {
  background: rgba(76, 175, 80, 0.1);
  color: #4caf50;
  border: 1px solid rgba(76, 175, 80, 0.3);
}

.test-result.error {
  background: rgba(244, 67, 54, 0.1);
  color: #f44336;
  border: 1px solid rgba(244, 67, 54, 0.3);
}
</style>
