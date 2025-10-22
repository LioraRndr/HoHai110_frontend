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
        <!-- 导航按钮 -->
        <div class="section-navigation">
          <router-link to="/timeline" class="nav-button">
            <span>探索完整时间轴</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M5 12h14M12 5l7 7-7 7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </router-link>
        </div>
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
        <!-- 导航按钮 -->
        <div class="section-navigation">
          <router-link to="/culture" class="nav-button">
            <span>了解更多河海文化</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M5 12h14M12 5l7 7-7 7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </router-link>
        </div>
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
        <!-- 导航按钮 -->
        <div class="section-navigation">
          <router-link to="/people" class="nav-button">
            <span>查看更多杰出校友</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M5 12h14M12 5l7 7-7 7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </router-link>
        </div>
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
        <!-- 两个导航按钮 -->
        <div class="finale-buttons">
          <router-link to="/blessings" class="finale-button">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <div>
              <span class="button-title">薪传接力</span>
              <span class="button-subtitle">传递河海精神</span>
            </div>
          </router-link>
          <router-link to="/articles" class="finale-button">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <div>
              <span class="button-title">共话百十</span>
              <span class="button-subtitle">分享你的格言</span>
            </div>
          </router-link>
        </div>
      </div>
    </section>

    <!-- 页脚 -->
    <Footer />
    <!-- 旧版页脚，已弃用。目前应当使用全局页脚 -->
    <!-- <footer class="footer">
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
    </footer> -->
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
import Footer from '@/components/Footer.vue'

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
  position: relative;
  overflow: hidden;
}

/* 添加背景图片层 */
.finale-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: url('https://s1.img.five-plus-one.com/2025/10/22/68f8b564be482.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  opacity: 0.08;
  z-index: 0;
  filter: grayscale(30%);
}

.finale-content {
  text-align: center;
  max-width: 900px;
  margin: 0 auto;
  padding: 0 var(--spacing-lg);
  position: relative;
  z-index: 1;
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

/* Section导航按钮 */
.section-navigation {
  text-align: center;
  margin-top: var(--spacing-3xl);
  padding-top: var(--spacing-xl);
}

.nav-button {
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-md);
  padding: var(--spacing-md) var(--spacing-2xl);
  background: var(--gradient-river);
  color: white;
  font-size: var(--text-lg);
  font-family: var(--font-title);
  font-weight: 600;
  border-radius: var(--radius-full);
  text-decoration: none;
  box-shadow: 0 4px 12px rgba(10, 106, 184, 0.3);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.nav-button:hover {
  transform: translateY(-2px) scale(1.05);
  box-shadow: 0 8px 20px rgba(10, 106, 184, 0.5);
  color: white;
}

.nav-button svg {
  width: 20px;
  height: 20px;
  transition: transform 0.3s ease;
}

.nav-button:hover svg {
  transform: translateX(4px);
}

/* Finale按钮 */
.finale-buttons {
  display: flex;
  gap: var(--spacing-2xl);
  justify-content: center;
  margin-top: var(--spacing-3xl);
  animation: fadeInUp 1.6s ease-out;
}

.finale-button {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  padding: var(--spacing-lg) var(--spacing-2xl);
  background: linear-gradient(135deg, rgba(10, 106, 184, 0.95) 0%, rgba(255, 122, 26, 0.95) 100%);
  color: white;
  text-decoration: none;
  border-radius: var(--radius-lg);
  box-shadow: 0 8px 24px rgba(10, 106, 184, 0.3);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  min-width: 240px;
}

.finale-button:hover {
  transform: translateY(-4px) scale(1.05);
  box-shadow: 0 12px 32px rgba(10, 106, 184, 0.5);
  color: white;
}

.finale-button svg {
  width: 32px;
  height: 32px;
  flex-shrink: 0;
}

.finale-button > div {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 4px;
}

.button-title {
  font-size: var(--text-xl);
  font-family: var(--font-title);
  font-weight: 700;
  line-height: 1;
}

.button-subtitle {
  font-size: var(--text-sm);
  opacity: 0.9;
  font-weight: 500;
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

  .finale-buttons {
    flex-direction: column;
    gap: var(--spacing-lg);
    padding: 0 var(--spacing-md);
  }

  .finale-button {
    min-width: unset;
    width: 100%;
  }

  .nav-button {
    font-size: var(--text-base);
    padding: var(--spacing-sm) var(--spacing-lg);
  }
}
</style>
