<template>
  <div class="home-page">
    <!-- 导航栏 -->
    <Navbar />

    <!-- 侧边栏导航 -->
    <SideNav />

    <!-- 1. 开篇·定调 -->
    <HeroSection />

    <!-- 2. 交互·传承 - 校史长河 -->
    <section id="timeline" class="section timeline-section">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">交互·传承</h2>
          <p class="section-subtitle">校史长河时间轴</p>
        </div>
        <HistoryTimeline />
      </div>
    </section>

    <!-- 3. 使命·担当 - 治水报国精神 -->
    <section id="mission" class="section mission-section">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">使命·担当</h2>
          <p class="section-subtitle">治水报国精神阐释</p>
        </div>
        <MissionSpirit />
      </div>
    </section>

    <!-- 4. 人物·故事 - 河海英华 -->
    <section id="alumni" class="section alumni-section">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">人物·故事</h2>
          <p class="section-subtitle">河海英华校友风采</p>
        </div>
        <AlumniStories />
      </div>
    </section>

    <!-- 5. 召唤·行动 - 寄语未来 -->
    <section id="future" class="section future-section">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">召唤·行动</h2>
          <p class="section-subtitle">寄语未来互动板块</p>
        </div>
        <FutureMessage />
      </div>
    </section>

    <!-- 6. 升华·共情 - 结尾 -->
    <section id="finale" class="section finale-section">
      <div class="finale-content">
        <p class="finale-quote">「我们或许从未相见,但我们正在共同完成一场跨越百年的壮举。」</p>
        <div class="finale-text">
          <p>所以，请不必担心前路漫漫。</p>
          <p>因为你就是——</p>
          <p>「因我们而存在的故事」里，最新的篇章；</p>
          <p>「为你而燃的薪火」中，最亮的光焰。</p>
        </div>
        <div class="finale-logo">
          <h2 class="logo-year">2025.10.27</h2>
          <p class="logo-text">共赴百十之约</p>
        </div>
      </div>
    </section>

    <!-- 页脚 -->
    <footer class="footer">
      <div class="container">
        <div class="footer-content">
          <div class="footer-section">
            <h3>河海大学110周年</h3>
            <p>百十薪传，续页青春</p>
          </div>
          <div class="footer-section">
            <h4>快速链接</h4>
            <ul>
              <li><a href="#timeline">校史长河</a></li>
              <li><a href="#mission">治水报国</a></li>
              <li><a href="#alumni">河海英华</a></li>
              <li><a href="#future">寄语未来</a></li>
            </ul>
          </div>
          <div class="footer-section">
            <h4>联系我们</h4>
            <p>南京市江宁区佛城西路8号</p>
            <p>邮编: 211100</p>
            <p>Email: info@hhu.edu.cn</p>
          </div>
        </div>
        <div class="footer-bottom">
          <p>&copy; 2025 河海大学. All rights reserved. | 百十薪传，续页青春</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import Navbar from '@/components/Navbar.vue'
import HeroSection from '@/components/HeroSection.vue'
import HistoryTimeline from '@/components/HistoryTimeline.vue'
import MissionSpirit from '@/components/MissionSpirit.vue'
import AlumniStories from '@/components/AlumniStories.vue'
import FutureMessage from '@/components/FutureMessage.vue'
import SideNav from '@/components/SideNav.vue'
</script>

<style scoped>
.home-page {
  width: 100%;
  min-height: 100vh;
}

.section {
  padding: var(--spacing-3xl) 0;
}

.timeline-section {
  background: var(--color-page-ivory);
}

.mission-section {
  background: linear-gradient(180deg, #F8F5EF 0%, #FFFFFF 100%);
}

.alumni-section {
  background: var(--color-page-ivory);
}

.future-section {
  background: linear-gradient(
    180deg,
    rgba(10, 106, 184, 0.05) 0%,
    rgba(255, 122, 26, 0.05) 100%
  );
}

.section-header {
  text-align: center;
  margin-bottom: var(--spacing-3xl);
}

.section-title {
  font-size: var(--text-4xl);
  font-family: var(--font-title);
  color: var(--color-river-blue);
  margin-bottom: var(--spacing-md);
  position: relative;
  display: inline-block;
}

.section-title::after {
  content: '';
  position: absolute;
  bottom: -10px;
  left: 50%;
  transform: translateX(-50%);
  width: 60px;
  height: 3px;
  background: var(--gradient-torch);
  border-radius: var(--radius-full);
}

.section-subtitle {
  font-size: var(--text-lg);
  color: var(--color-ink-black);
  opacity: 0.7;
}

/* 结尾部分 */
.finale-section {
  background: linear-gradient(
    135deg,
    rgba(10, 106, 184, 0.1) 0%,
    rgba(255, 122, 26, 0.1) 100%
  );
  padding: var(--spacing-3xl) 0;
  min-height: 60vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.finale-content {
  text-align: center;
  max-width: 900px;
  margin: 0 auto;
  padding: 0 var(--spacing-lg);
}

.finale-quote {
  font-size: var(--text-3xl);
  font-family: var(--font-title);
  color: var(--color-river-blue);
  line-height: 1.8;
  margin-bottom: var(--spacing-3xl);
  animation: fadeInUp 1s ease-out;
}

.finale-text {
  font-size: var(--text-xl);
  color: var(--color-ink-black);
  line-height: 2;
  margin-bottom: var(--spacing-3xl);
  animation: fadeInUp 1.2s ease-out;
}

.finale-text p {
  margin-bottom: var(--spacing-md);
}

.finale-logo {
  animation: fadeInUp 1.4s ease-out;
}

.logo-year {
  font-size: var(--text-4xl);
  font-family: var(--font-title);
  font-weight: 700;
  color: var(--color-torch-amber);
  margin-bottom: var(--spacing-sm);
}

.logo-text {
  font-size: var(--text-2xl);
  font-family: var(--font-title);
  color: var(--color-river-blue);
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* 页脚 */
.footer {
  background: var(--color-ink-black);
  color: white;
  padding: var(--spacing-3xl) 0 var(--spacing-xl);
}

.footer-content {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: var(--spacing-2xl);
  margin-bottom: var(--spacing-xl);
}

.footer-section h3,
.footer-section h4 {
  margin-bottom: var(--spacing-md);
  color: var(--color-torch-amber);
}

.footer-section p {
  opacity: 0.8;
  line-height: 1.8;
  margin-bottom: var(--spacing-xs);
}

.footer-section ul {
  list-style: none;
  padding: 0;
}

.footer-section ul li {
  margin-bottom: var(--spacing-sm);
}

.footer-section ul li a {
  color: white;
  opacity: 0.8;
  transition: all var(--transition-fast);
}

.footer-section ul li a:hover {
  opacity: 1;
  color: var(--color-torch-amber);
  padding-left: var(--spacing-xs);
}

.footer-bottom {
  text-align: center;
  padding-top: var(--spacing-xl);
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  opacity: 0.6;
}

/* 响应式 */
@media (max-width: 768px) {
  .section {
    padding: var(--spacing-2xl) 0;
  }

  .section-title {
    font-size: var(--text-2xl);
  }

  .section-subtitle {
    font-size: var(--text-base);
  }

  .finale-quote {
    font-size: var(--text-xl);
  }

  .finale-text {
    font-size: var(--text-base);
  }

  .logo-year {
    font-size: var(--text-2xl);
  }

  .logo-text {
    font-size: var(--text-xl);
  }

  .footer-content {
    grid-template-columns: 1fr;
    gap: var(--spacing-xl);
  }
}
</style>
