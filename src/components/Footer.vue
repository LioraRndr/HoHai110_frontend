<template>
  <footer class="footer">
    <div class="container">
      <div class="footer-content">
        <div class="footer-section">
          <h3>河海大学110周年</h3>
          <p>百十薪传,续页青春</p>
        </div>

        <div class="footer-section">
          <h4>快速导航</h4>
          <ul>
            <li><router-link to="/">首页</router-link></li>
            <li><router-link to="/timeline">校史长河</router-link></li>
            <li><router-link to="/culture">使命担当</router-link></li>
            <li><router-link to="/people">河海英华</router-link></li>
            <li><router-link to="/blessings">薪传接力</router-link></li>
            <li><router-link to="/articles">共话百十</router-link></li>
            <li><router-link to="/about">关于</router-link></li>
          </ul>
        </div>

        <div class="footer-section">
          <h4>联系我们</h4>
          <p>南京市江宁区佛城西路8号</p>
          <p>邮编: 211100</p>
        </div>
      </div>
      <div class="footer-bottom">
        <p>&copy; 2025. All rights reserved.</p>
      </div>
    </div>
  </footer>
</template>

<script setup>
// Footer 组件
</script>

<style scoped>
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
}

.footer-bottom {
  text-align: center;
  padding-top: var(--spacing-xl);
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  opacity: 0.6;
}

@media (max-width: 768px) {
  .footer-content {
    grid-template-columns: 1fr;
    gap: var(--spacing-xl);
  }
}
</style>
