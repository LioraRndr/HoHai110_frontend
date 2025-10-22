<template>
  <div id="app">
    <router-view v-slot="{ Component }">
      <transition name="page" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>

    <!-- 全局消息提示组件 -->
    <MessageToast ref="messageToast" />

    <!-- 全局确认框组件 -->
    <ConfirmManager ref="confirmManager" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import MessageToast from './components/MessageToast.vue'
import ConfirmManager from './components/ConfirmManager.vue'
import { $message } from './utils/message.js'

// 消息提示组件引用
const messageToast = ref(null)
const confirmManager = ref(null)

// 初始化消息服务
onMounted(() => {
  if (messageToast.value) {
    $message.setToastComponent(messageToast.value)
  }
  // 确认框组件会在其自己的 onMounted 中注册
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
