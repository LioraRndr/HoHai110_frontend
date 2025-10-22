<template>
  <div class="people-container">
    <Navbar />

    <!-- Hero Section -->
    <PeopleHero :introduction="introduction" />

    <!-- People Grid Section -->
    <PeopleGrid :people="people" @select-person="openPersonModal" />

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
import { ref, onMounted, onUnmounted } from 'vue'
import { usePeopleAnimations } from '@/composables/usePeopleAnimations'
import { usePeopleData } from '@/composables/usePeopleData'
import Navbar from '@/components/Navbar.vue'
import Footer from '@/components/Footer.vue'
import PeopleHero from '@/components/people/PeopleHero.vue'
import PeopleGrid from '@/components/people/PeopleGrid.vue'
import PeopleModal from '@/components/people/PeopleModal.vue'

// 使用 composables
const { introduction, people } = usePeopleData()
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
</style>
