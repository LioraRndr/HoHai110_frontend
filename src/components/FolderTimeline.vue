<template>
  <div class="folder-timeline-wrapper">
    <div class="timeline-scene" ref="sceneRef" @wheel.prevent="handleWheel">
      <!-- 时间轴容器 -->
      <div class="timeline-track" :style="trackStyle">
        <!-- 文件夹列表 -->
        <div
          v-for="(folder, index) in allFolders"
          :key="index"
          class="folder-item"
          :class="{
            'important': folder.isImportant,
            'active': folder.groupIndex === activeGroupIndex && folder.isImportant,
            'has-icon': folder.hasIcon
          }"
          :style="getFolderStyle(index)"
        >
          <!-- 文件夹主体 -->
          <div class="folder-body">
            <div class="folder-front"></div>
            <div class="folder-side"></div>
          </div>

          <!-- 文件夹图标 -->
          <div v-if="folder.hasIcon" class="folder-icon" :class="{ 'open': folder.groupIndex === activeGroupIndex }">
            <div class="icon-tab"></div>
            <div class="icon-body"></div>
          </div>
        </div>
      </div>

      <!-- 指针 -->
      <div class="pointer" :style="pointerStyle">
        <div class="pointer-line"></div>
        <div class="pointer-triangle top"></div>
        <div class="pointer-triangle bottom"></div>
      </div>
    </div>

    <!-- 标签层 -->
    <div class="labels-container">
      <div
        v-for="(group, index) in importantGroups"
        :key="index"
        class="timeline-label"
        :class="{ 'active': index === activeGroupIndex }"
        :style="getLabelStyle(index)"
      >
        {{ group.label }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

const sceneRef = ref(null)
const activeGroupIndex = ref(0)
const scrollOffset = ref(0)
const isAnimating = ref(false)

// 重要节点数据
const importantGroups = [
  { label: '河海工程专门学校成立', year: 1915 },
  { label: '华东水利学院成立', year: 1952 },
  { label: '恢复"河海大学"校名', year: 1985 },
  { label: '百年校庆', year: 2015 },
]

// 生成所有文件夹数据
const allFolders = computed(() => {
  const folders = []

  for (let groupIndex = 0; groupIndex < importantGroups.length; groupIndex++) {
    // 普通文件夹（第一组前3个，其他组前6个）
    const normalCount = groupIndex === 0 ? 3 : 6
    for (let i = 0; i < normalCount; i++) {
      folders.push({
        isImportant: false,
        hasIcon: false,
        groupIndex: -1,
        indexInGroup: -1
      })
    }

    // 重要节点组（4个文件夹）
    for (let i = 0; i < 4; i++) {
      folders.push({
        isImportant: true,
        hasIcon: i === 1 || i === 2, // 第2和第3个有图标
        groupIndex: groupIndex,
        indexInGroup: i
      })
    }
  }

  return folders
})

// 时间轴轨道样式
const trackStyle = computed(() => ({
  transform: `translateX(${scrollOffset.value}px)`,
  transition: isAnimating.value ? 'transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)' : 'none'
}))

// 指针样式（固定在屏幕右20%）
const pointerStyle = computed(() => ({
  right: '20%'
}))

// 获取文件夹样式
const getFolderStyle = (index) => {
  const baseLeft = index * 70 // 70px间距（0.7cm）

  // 计算距离右侧指针的距离（用于透视）
  const pointerPos = sceneRef.value ? sceneRef.value.clientWidth * 0.8 : 0
  const folderScreenX = baseLeft + scrollOffset.value
  const distanceFromPointer = pointerPos - folderScreenX

  // 透视系数：距离越远，透视变形越大
  // 最右边：垂直（无变形）
  // 向左：逐渐变成梯形
  const perspectiveFactor = Math.max(0, Math.min(1, distanceFromPointer / 500))

  // 梯形变形：左边收窄的百分比（0-40%）
  const skewAmount = perspectiveFactor * 40

  // 使用clip-path创建梯形
  // 梯形：左上、右上、右下、左下
  const clipPath = `polygon(
    ${skewAmount}% 0%,
    100% 0%,
    100% 100%,
    ${skewAmount}% 100%
  )`

  // 3D旋转角度
  const rotationY = perspectiveFactor * 35

  return {
    left: `${baseLeft}px`,
    transform: `rotateY(${rotationY}deg) translateZ(${perspectiveFactor * 20}px)`,
    clipPath: clipPath,
    WebkitClipPath: clipPath,
  }
}

// 获取标签样式
const getLabelStyle = (index) => {
  const isActive = index === activeGroupIndex.value
  return {
    right: '20%',
    top: isActive ? '60px' : '100px',
    opacity: isActive ? 1 : 0.6,
    fontSize: isActive ? '18px' : '14px',
    fontWeight: isActive ? '700' : '400',
    transform: 'translateX(50%)'
  }
}

// 查找组的关键文件夹索引（第3个文件夹）
const getGroupKeyFolderIndex = (groupIndex) => {
  let count = 0
  for (let i = 0; i < allFolders.value.length; i++) {
    const folder = allFolders.value[i]
    if (folder.groupIndex === groupIndex && folder.indexInGroup === 2) {
      return i
    }
  }
  return -1
}

// 滚动到指定组
const scrollToGroup = (targetGroupIndex) => {
  if (targetGroupIndex < 0 || targetGroupIndex >= importantGroups.length) return
  if (isAnimating.value) return

  isAnimating.value = true

  const folderIndex = getGroupKeyFolderIndex(targetGroupIndex)
  if (folderIndex === -1) return

  // 计算目标位置
  const pointerPos = sceneRef.value.clientWidth * 0.8
  const targetFolderPos = folderIndex * 70
  const newOffset = pointerPos - targetFolderPos

  scrollOffset.value = newOffset
  activeGroupIndex.value = targetGroupIndex

  setTimeout(() => {
    isAnimating.value = false
  }, 800)
}

// 处理滚轮事件
const handleWheel = (event) => {
  if (isAnimating.value) return

  const delta = event.deltaY
  const direction = delta > 0 ? 1 : -1

  let targetGroup = activeGroupIndex.value + direction

  // 限制范围
  if (targetGroup < 0) targetGroup = 0
  if (targetGroup >= importantGroups.length) targetGroup = importantGroups.length - 1

  if (targetGroup !== activeGroupIndex.value) {
    scrollToGroup(targetGroup)
  }
}

// 组件挂载时滚动到第一组
onMounted(() => {
  setTimeout(() => {
    scrollToGroup(0)
  }, 300)
})
</script>

<style scoped>
.folder-timeline-wrapper {
  position: relative;
  width: 100%;
  height: 600px;
  background: linear-gradient(135deg, #1a1a2e 0%, #0f0f1e 100%);
  border-radius: 12px;
  overflow: hidden;
}

.timeline-scene {
  position: relative;
  width: 100%;
  height: 100%;
  perspective: 800px;  /* 更强的透视 */
  perspective-origin: 85% 50%;  /* 透视点更靠右 */
  overflow: hidden;
}

.timeline-track {
  position: absolute;
  top: 50%;
  left: 0;
  height: 200px;
  margin-top: -100px;
  white-space: nowrap;
  transform-style: preserve-3d;
}

/* 文件夹样式 */
.folder-item {
  position: absolute;
  top: 50%;
  width: 50px; /* 加宽文件夹，让透视效果更明显 */
  height: 200px;
  margin-top: -100px;
  transform-style: preserve-3d;
  transition: all 0.3s ease;
}

.folder-body {
  position: relative;
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
}

.folder-front {
  position: absolute;
  width: 100%;
  height: 100%;
  background: linear-gradient(to bottom right, rgba(255, 255, 255, 0.15), rgba(0, 0, 0, 0.3));
  border: 2px solid rgba(255, 255, 255, 0.4);
  border-radius: 4px;
  backdrop-filter: blur(10px);
  box-shadow:
    0 8px 32px rgba(0, 0, 0, 0.3),
    inset 0 0 20px rgba(255, 255, 255, 0.1);
}

.folder-side {
  position: absolute;
  width: 30px;  /* 加宽侧面 */
  height: 100%;
  background: linear-gradient(to right, rgba(255, 255, 255, 0.1), rgba(0, 0, 0, 0.5));
  border: 1px solid rgba(255, 255, 255, 0.2);
  transform-origin: left center;
  transform: rotateY(90deg) translateX(-2px);
  box-shadow: -5px 0 20px rgba(0, 0, 0, 0.4);
}

/* 重要文件夹 */
.folder-item.important .folder-front {
  background: linear-gradient(to bottom right, rgba(102, 153, 255, 0.3), rgba(51, 102, 255, 0.2));
  border-color: rgba(102, 153, 255, 0.6);
  box-shadow: 0 0 20px rgba(102, 153, 255, 0.4), 0 8px 32px rgba(0, 0, 0, 0.3);
}

/* 激活状态的文件夹组 */
.folder-item.active {
  animation: popOut 0.5s ease forwards;
}

@keyframes popOut {
  0% {
    transform: rotateY(0deg) translateY(0) translateZ(0) scale(1);
  }
  100% {
    transform: rotateY(0deg) translateY(-30px) translateZ(30px) scale(1.1);
  }
}

/* 文件夹图标 */
.folder-icon {
  position: absolute;
  top: -25px;
  right: 5px;
  width: 20px;
  height: 16px;
  transform-style: preserve-3d;
  transition: all 0.3s ease;
}

.icon-tab {
  position: absolute;
  top: 0;
  left: 0;
  width: 10px;
  height: 4px;
  background: #ffcc66;
  border-radius: 2px 2px 0 0;
}

.icon-body {
  position: absolute;
  top: 4px;
  left: 0;
  width: 100%;
  height: 12px;
  background: linear-gradient(135deg, #ffcc66, #ff9933);
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  transition: all 0.2s ease;
}

.folder-icon.open .icon-body {
  transform: rotateX(-30deg);
  transform-origin: bottom center;
}

/* 指针 */
.pointer {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 2px;
  z-index: 100;
  pointer-events: none;
}

.pointer-line {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  width: 2px;
  background: rgba(255, 255, 255, 0.8);
  box-shadow: 0 0 10px rgba(255, 255, 255, 0.6), 0 0 20px rgba(255, 255, 255, 0.4);
  animation: glow 2s ease-in-out infinite;
}

@keyframes glow {
  0%, 100% {
    box-shadow: 0 0 10px rgba(255, 255, 255, 0.6), 0 0 20px rgba(255, 255, 255, 0.4);
  }
  50% {
    box-shadow: 0 0 15px rgba(255, 255, 255, 0.8), 0 0 30px rgba(255, 255, 255, 0.6);
  }
}

.pointer-triangle {
  position: absolute;
  left: 50%;
  width: 0;
  height: 0;
  border-style: solid;
  transform: translateX(-50%);
}

.pointer-triangle.top {
  top: 35%;
  border-width: 0 10px 20px 10px;
  border-color: transparent transparent rgba(255, 255, 255, 0.9) transparent;
}

.pointer-triangle.bottom {
  bottom: 35%;
  border-width: 20px 10px 0 10px;
  border-color: rgba(255, 255, 255, 0.9) transparent transparent transparent;
}

/* 标签容器 */
.labels-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 50;
}

.timeline-label {
  position: absolute;
  color: white;
  font-family: var(--font-title), serif;
  white-space: nowrap;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.8), 0 0 20px rgba(255, 255, 255, 0.3);
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  pointer-events: none;
}

.timeline-label.active {
  text-shadow: 0 0 20px rgba(255, 255, 255, 0.9), 0 2px 8px rgba(0, 0, 0, 0.8);
}

/* 响应式 */
@media (max-width: 768px) {
  .folder-timeline-wrapper {
    height: 400px;
  }

  .timeline-label {
    font-size: 12px !important;
  }

  .pointer {
    right: 30% !important;
  }
}
</style>
