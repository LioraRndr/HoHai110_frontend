<template>
  <PageLayout>
    <div class="privacy-page">
      <div class="privacy-container">
        <h1>{{ title }}</h1>
        <p class="update-date">{{ lastUpdated }}: {{ updateDate }}</p>

        <section v-for="(section, index) in sections" :key="index">
          <h2>{{ section.heading }}</h2>

          <p v-for="(paragraph, pIndex) in section.paragraphs" :key="`p-${pIndex}`">
            {{ paragraph }}
          </p>

          <template v-if="section.subsections">
            <div v-for="(subsection, sIndex) in section.subsections" :key="`s-${sIndex}`">
              <h3>{{ subsection.subheading }}</h3>
              <ul v-if="subsection.list">
                <li v-for="(item, lIndex) in subsection.list" :key="`l-${lIndex}`">
                  {{ item }}
                </li>
              </ul>
            </div>
          </template>

          <ul v-if="section.list">
            <li v-for="(item, lIndex) in section.list" :key="`l-${lIndex}`">
              {{ item }}
            </li>
          </ul>

          <p v-if="section.closing" v-for="(closingText, cIndex) in section.closing" :key="`c-${cIndex}`">
            {{ closingText }}
          </p>
        </section>

        <div class="actions">
          <router-link to="/register" class="btn-primary">{{ actions.agreeAndRegister }}</router-link>
          <router-link to="/" class="btn-secondary">{{ actions.backToHome }}</router-link>
        </div>
      </div>
    </div>
  </PageLayout>
</template>

<script setup>
import PageLayout from '@/components/PageLayout.vue'
import { usePrivacyPolicyData } from '@/composables/usePrivacyPolicyData'

const { title, lastUpdated, updateDate, sections, actions } = usePrivacyPolicyData()
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
