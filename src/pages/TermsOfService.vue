<template>
  <PageLayout>
    <div class="terms-page">
      <div class="terms-container">
        <h1>用户协议</h1>
        <p class="update-date">最后更新日期: 2024年10月22日</p>

        <section>
          <h2>1. 协议接受</h2>
          <p>欢迎使用河海大学110周年校庆纪念网站(以下简称"本网站")。在使用本网站之前,请仔细阅读本用户协议。使用本网站即表示您同意受本协议条款的约束。</p>
        </section>

        <section>
          <h2>2. 服务说明</h2>
          <p>本网站为河海大学110周年校庆提供在线纪念服务,包括但不限于:</p>
          <ul>
            <li>校史回顾与时间线浏览</li>
            <li>校友祝福留言</li>
            <li>格言墙与接力活动</li>
            <li>论坛交流与互动</li>
            <li>拼图与互动游戏</li>
          </ul>
        </section>

        <section>
          <h2>3. 用户注册</h2>
          <p>3.1 您需要注册账户才能使用本网站的部分功能。</p>
          <p>3.2 注册时,您应提供真实、准确的个人信息。</p>
          <p>3.3 您有责任维护账户安全,不得向他人泄露您的登录凭据。</p>
          <p>3.4 您对使用您账户进行的所有活动负责。</p>
        </section>

        <section>
          <h2>4. 用户行为规范</h2>
          <p>在使用本网站时,您同意不会:</p>
          <ul>
            <li>发布违反中国法律法规的内容</li>
            <li>发布虚假、误导性或欺诈性内容</li>
            <li>发布侵犯他人知识产权的内容</li>
            <li>发布骚扰、诽谤、仇恨或暴力性内容</li>
            <li>发布垃圾信息或商业广告</li>
            <li>尝试破坏网站安全或干扰他人使用</li>
          </ul>
        </section>

        <section>
          <h2>5. 内容审核</h2>
          <p>5.1 本网站保留审核所有用户发布内容的权利。</p>
          <p>5.2 我们可能会拒绝、编辑或删除违反本协议的内容。</p>
          <p>5.3 严重违规行为可能导致账户被暂停或终止。</p>
        </section>

        <section>
          <h2>6. 知识产权</h2>
          <p>6.1 本网站的所有内容、设计、标识和功能均归河海大学所有。</p>
          <p>6.2 未经授权,您不得复制、修改、分发或使用网站内容。</p>
          <p>6.3 您发布的内容,授予本网站非独占、永久、免费的使用许可。</p>
        </section>

        <section>
          <h2>7. 免责声明</h2>
          <p>7.1 本网站"按现状"提供,不提供任何明示或暗示的保证。</p>
          <p>7.2 我们不对服务中断、错误、病毒或数据丢失负责。</p>
          <p>7.3 我们不对用户发布的内容负责。</p>
        </section>

        <section>
          <h2>8. 协议修改</h2>
          <p>我们保留随时修改本协议的权利。修改后的协议将在网站上公布,继续使用网站即表示您接受修改后的协议。</p>
        </section>

        <section>
          <h2>9. 联系我们</h2>
          <p>如果您对本协议有任何疑问,请通过以下方式联系我们:</p>
          <p>邮箱: info@hhu.edu.cn</p>
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
.terms-page {
  min-height: 100vh;
  padding: 2rem;
  background: #f8f9fa;
}

.terms-container {
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
  .terms-page {
    padding: 1rem;
  }

  .terms-container {
    padding: 2rem 1.5rem;
    margin-top: 60px;
  }

  h1 {
    font-size: 2rem;
  }

  h2 {
    font-size: 1.25rem;
  }

  .actions {
    flex-direction: column;
  }
}
</style>
