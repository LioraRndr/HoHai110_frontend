<template>
  <footer class="footer">
    <div class="container">
      <div class="footer-content">
        <div class="footer-section">
          <h3>{{ $t('footer.title') }}</h3>
          <p>{{ $t('footer.slogan') }}</p>
        </div>

        <div class="footer-section">
          <h4>{{ $t('footer.quickLinks') }}</h4>
          <ul>
            <li><router-link to="/">{{ $t('nav.home') }}</router-link></li>
            <li><router-link to="/timeline">{{ $t('nav.timeline') }}</router-link></li>
            <li><router-link to="/culture">{{ $t('nav.culture') }}</router-link></li>
            <li><router-link to="/people">{{ $t('nav.people') }}</router-link></li>
            <li><router-link to="/blessings">{{ $t('nav.blessings') }}</router-link></li>
            <li><router-link to="/articles">{{ $t('nav.articles') }}</router-link></li>
            <li><router-link to="/about">{{ $t('nav.about') }}</router-link></li>
          </ul>
        </div>

        <div class="footer-section">
          <h4>{{ $t('footer.contact') }}</h4>
          <p>{{ $t('footer.address') }}</p>
          <p>{{ $t('footer.postcode') }}</p>
        </div>
      </div>
      <div class="footer-bottom">
        <p>&copy; 2025. {{ $t('footer.allRightsReserved') }}</p>
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
