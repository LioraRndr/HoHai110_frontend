<template>
  <div class="people-container">
    <Navbar />

    <!-- 页面导航 - 使用深色主题 -->
    <PageNav :navItems="navItems" theme="dark" />

    <!-- Hero Section -->
    <PeopleHero :introduction="introduction" />

    <!-- People Grid Section -->
    <PeopleGrid :people="people" @select-person="openPersonModal" />

    <!-- Group Photo Section -->
    <section class="group-photo-section">
      <div class="group-photo-container">
        <h2 class="group-photo-title">{{ ui.groupPhotoTitle }}</h2>
        <div class="group-photo-wrapper">
          <img :src="groupPhoto.url" :alt="groupPhoto.caption" class="group-photo-image" />
          <div class="group-photo-caption">
            <p>{{ groupPhoto.caption }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Person Modal -->
    <PeopleModal
      :show="showModal"
      :person="selectedPerson"
      @close="closeModal"
    />

    <Footer />
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, h, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { usePeopleAnimations } from '@/composables/usePeopleAnimations'
import { usePeopleData } from '@/composables/usePeopleData'
import Navbar from '@/components/Navbar.vue'
import Footer from '@/components/Footer.vue'
import PeopleHero from '@/components/people/PeopleHero.vue'
import PeopleGrid from '@/components/people/PeopleGrid.vue'
import PeopleModal from '@/components/people/PeopleModal.vue'
import PageNav from '@/components/PageNav.vue'

const { t } = useI18n()

// 导航项配置
const navItems = computed(() => [
  {
    id: 'hero',
    label: t('peoplePage.pageNav.hero'),
    icon: () => h('svg', { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor' }, [
      h('path', { d: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6', 'stroke-width': '2', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' })
    ])
  },
  {
    id: 'people-grid',
    label: t('peoplePage.pageNav.peopleGrid'),
    icon: () => h('svg', { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor' }, [
      h('path', { d: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z', 'stroke-width': '2', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' })
    ])
  }
])

// 使用 composables
const { introduction, people, groupPhoto, ui } = usePeopleData()
const { initAnimations, cleanupAnimations } = usePeopleAnimations()

// 状态管理
const showModal = ref(false)
const selectedPerson = ref(null)

// 方法
const openPersonModal = (person) => {
  selectedPerson.value = person
  showModal.value = true
  document.body.style.overflow = 'hidden'
}

const closeModal = () => {
  showModal.value = false
  selectedPerson.value = null
  document.body.style.overflow = 'auto'
}

// 生命周期
onMounted(() => {
  initAnimations()
})

onUnmounted(() => {
  document.body.style.overflow = 'auto'
  cleanupAnimations()
})
</script>

<style scoped>
.people-container {
  width: 100%;
  min-height: 100vh;
  background: linear-gradient(180deg, #0a0e1a 0%, #1a1f35 50%, #0a0e1a 100%);
  color: #ffffff;
  overflow-x: hidden;
}

/* Group Photo Section */
.group-photo-section {
  padding: 6rem 2rem;
  background: linear-gradient(180deg, rgba(26, 31, 53, 0.5) 0%, rgba(10, 14, 26, 0.8) 100%);
}

.group-photo-container {
  max-width: 800px;
  margin: 0 auto;
}

.group-photo-title {
  font-size: 3rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 3rem;
  background: linear-gradient(135deg, #FF7A1A 0%, #FFA500 50%, #FF7A1A 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.group-photo-wrapper {
  position: relative;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.group-photo-wrapper:hover {
  transform: translateY(-10px);
  box-shadow: 0 30px 80px rgba(255, 122, 26, 0.3);
}

.group-photo-image {
  width: 100%;
  height: auto;
  display: block;
  transition: transform 0.5s ease;
}

.group-photo-wrapper:hover .group-photo-image {
  transform: scale(1.02);
}

.group-photo-caption {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.95) 0%, rgba(0, 0, 0, 0.8) 70%, transparent 100%);
  padding: 3rem 2rem 2rem;
  color: #ffffff;
}

.group-photo-caption p {
  font-size: 1.2rem;
  line-height: 1.8;
  margin: 0;
  text-align: center;
  color: rgba(255, 255, 255, 0.95);
}

@media (max-width: 768px) {
  .group-photo-section {
    padding: 4rem 1rem;
  }

  .group-photo-title {
    font-size: 2rem;
    margin-bottom: 2rem;
  }

  .group-photo-caption {
    padding: 2rem 1.5rem 1.5rem;
  }

  .group-photo-caption p {
    font-size: 1rem;
  }
}

</style>
