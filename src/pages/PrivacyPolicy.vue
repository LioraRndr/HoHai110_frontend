<template>
  <PageLayout>
    <div class="privacy-page">
      <div class="privacy-container">
        <h1>隐私政策</h1>
        <p class="update-date">最后更新日期: 2024年10月22日</p>

        <section>
          <h2>1. 引言</h2>
          <p>河海大学110周年校庆纪念网站(以下简称"我们")重视您的隐私。本隐私政策说明我们如何收集、使用、披露和保护您的个人信息。</p>
        </section>

        <section>
          <h2>2. 信息收集</h2>
          <p>我们可能收集以下类型的信息:</p>
          <h3>2.1 您提供的信息</h3>
          <ul>
            <li>注册信息: 用户名、邮箱地址、密码</li>
            <li>个人资料: 毕业年份、院系、个人简介</li>
            <li>用户内容: 祝福留言、评论、格言等</li>
          </ul>
          <h3>2.2 自动收集的信息</h3>
          <ul>
            <li>设备信息: IP地址、浏览器类型、操作系统</li>
            <li>使用数据: 访问时间、页面浏览、点击行为</li>
            <li>Cookie和类似技术</li>
          </ul>
        </section>

        <section>
          <h2>3. 信息使用</h2>
          <p>我们使用收集的信息用于:</p>
          <ul>
            <li>提供和改进我们的服务</li>
            <li>管理您的账户和个人资料</li>
            <li>发送通知和更新</li>
            <li>分析和优化网站性能</li>
            <li>防止欺诈和滥用</li>
            <li>遵守法律义务</li>
          </ul>
        </section>

        <section>
          <h2>4. 信息共享</h2>
          <p>我们不会向第三方出售您的个人信息。我们可能在以下情况下共享您的信息:</p>
          <ul>
            <li>经您同意</li>
            <li>与服务提供商(如托管服务)</li>
            <li>法律要求或保护权利</li>
            <li>业务转让(如合并或收购)</li>
          </ul>
        </section>

        <section>
          <h2>5. 数据安全</h2>
          <p>我们采取合理的技术和组织措施保护您的个人信息:</p>
          <ul>
            <li>加密传输(HTTPS)</li>
            <li>密码哈希存储</li>
            <li>访问控制和权限管理</li>
            <li>定期安全审计</li>
          </ul>
          <p>但请注意,没有任何方法可以保证100%的安全。</p>
        </section>

        <section>
          <h2>6. 您的权利</h2>
          <p>您对您的个人信息拥有以下权利:</p>
          <ul>
            <li>访问: 查看我们持有的您的个人信息</li>
            <li>更正: 更新不准确或不完整的信息</li>
            <li>删除: 请求删除您的账户和个人信息</li>
            <li>限制: 限制某些信息的使用</li>
            <li>反对: 反对某些信息处理活动</li>
            <li>数据可携性: 获取您的数据副本</li>
          </ul>
          <p>要行使这些权利,请通过下方联系方式与我们联系。</p>
        </section>

        <section>
          <h2>7. Cookie政策</h2>
          <p>我们使用Cookie和类似技术来:</p>
          <ul>
            <li>记住您的登录状态</li>
            <li>个性化您的体验</li>
            <li>分析网站流量</li>
            <li>提供社交媒体功能</li>
          </ul>
          <p>您可以通过浏览器设置管理Cookie偏好。</p>
        </section>

        <section>
          <h2>8. 儿童隐私</h2>
          <p>我们的服务不面向13岁以下的儿童。我们不会故意收集儿童的个人信息。如果您发现儿童向我们提供了个人信息,请与我们联系。</p>
        </section>

        <section>
          <h2>9. 国际数据传输</h2>
          <p>您的信息可能会被传输到并存储在中国境内的服务器上。我们会确保数据传输符合适用的数据保护法律。</p>
        </section>

        <section>
          <h2>10. 数据保留</h2>
          <p>我们会在必要期限内保留您的个人信息,以实现本政策中所述的目的。当您删除账户时,我们会在合理时间内删除您的个人信息,除非法律要求我们保留。</p>
        </section>

        <section>
          <h2>11. 政策更新</h2>
          <p>我们可能会不时更新本隐私政策。重大变更将通过网站公告或电子邮件通知您。继续使用我们的服务即表示您接受更新后的政策。</p>
        </section>

        <section>
          <h2>12. 联系我们</h2>
          <p>如果您对本隐私政策有任何疑问或关注,请通过以下方式联系我们:</p>
          <p>邮箱: privacy@hhu.edu.cn</p>
          <p>地址: 江苏省南京市江宁区佛城西路8号 河海大学</p>
        </section>

        <div class="actions">
          <router-link to="/register" class="btn-primary">同意并注册</router-link>
          <router-link to="/" class="btn-secondary">返回首页</router-link>
        </div>
      </div>
    </div>
  </PageLayout>
</template>

<script setup>
import PageLayout from '@/components/PageLayout.vue'
</script>

<style scoped>
.privacy-page {
  min-height: 100vh;
  padding: 2rem;
  background: #f8f9fa;
}

.privacy-container {
  max-width: 800px;
  margin: 0 auto;
  margin-top: 80px;
  padding: 3rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

h1 {
  font-size: 2.5rem;
  font-weight: 700;
  color: #333;
  margin-bottom: 0.5rem;
  text-align: center;
}

.update-date {
  text-align: center;
  color: #666;
  margin-bottom: 2rem;
  font-size: 0.9rem;
}

section {
  margin-bottom: 2rem;
}

h2 {
  font-size: 1.5rem;
  font-weight: 600;
  color: #4A90E2;
  margin-bottom: 1rem;
}

h3 {
  font-size: 1.2rem;
  font-weight: 600;
  color: #666;
  margin: 1rem 0 0.5rem 0;
}

p {
  line-height: 1.8;
  color: #555;
  margin-bottom: 0.75rem;
}

ul {
  margin-left: 2rem;
  margin-bottom: 1rem;
}

ul li {
  line-height: 1.8;
  color: #555;
  margin-bottom: 0.5rem;
}

.actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-top: 3rem;
  padding-top: 2rem;
  border-top: 1px solid #e0e0e0;
}

.btn-primary,
.btn-secondary {
  padding: 0.75rem 2rem;
  border-radius: 8px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;
}

.btn-primary {
  background: linear-gradient(135deg, #4A90E2 0%, #357ABD 100%);
  color: white;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(74, 144, 226, 0.4);
}

.btn-secondary {
  background: white;
  color: #4A90E2;
  border: 1px solid #4A90E2;
}

.btn-secondary:hover {
  background: #f8f9fa;
}

@media (max-width: 768px) {
  .privacy-page {
    padding: 1rem;
  }

  .privacy-container {
    padding: 2rem 1.5rem;
    margin-top: 60px;
  }

  h1 {
    font-size: 2rem;
  }

  h2 {
    font-size: 1.25rem;
  }

  h3 {
    font-size: 1.1rem;
  }

  .actions {
    flex-direction: column;
  }
}
</style>
