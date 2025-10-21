<template>
  <div id="app">
    <router-view v-slot="{ Component }">
      <transition name="page" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>

    <!-- 全局消息提示组件 -->
    <MessageToast ref="messageToast" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import MessageToast from './components/MessageToast.vue'
import { $message } from './utils/message.js'

// 消息提示组件引用
const messageToast = ref(null)

// 初始化消息服务
onMounted(() => {
  if (messageToast.value) {
    $message.setToastComponent(messageToast.value)
  }
})
</script>

<style>
.page-enter-active,
.page-leave-active {
  transition: opacity 0.3s ease;
}

.page-enter-from,
.page-leave-to {
  opacity: 0;
}
</style>
