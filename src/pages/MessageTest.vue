<template>
  <PageLayout>
    <div class="test-page">
      <div class="page-header">
        <h1>消息提示测试页面</h1>
        <p class="subtitle">测试所有类型的消息提示功能</p>
      </div>

      <div class="test-section">
        <h2>基础消息类型测试</h2>
        <div class="test-buttons">
          <button @click="testSuccess" class="test-btn success">
            <span class="btn-icon">✅</span>
            测试成功消息
          </button>
          <button @click="testError" class="test-btn error">
            <span class="btn-icon">❌</span>
            测试错误消息
          </button>
          <button @click="testWarning" class="test-btn warning">
            <span class="btn-icon">⚠️</span>
            测试警告消息
          </button>
          <button @click="testInfo" class="test-btn info">
            <span class="btn-icon">ℹ️</span>
            测试信息消息
          </button>
        </div>
      </div>

      <div class="test-section">
        <h2>自定义消息测试</h2>
        <div class="custom-test">
          <div class="input-group">
            <label for="customMessage">消息内容：</label>
            <input
              id="customMessage"
              v-model="customMessage"
              type="text"
              placeholder="输入自定义消息内容"
              class="custom-input"
            />
          </div>
          <div class="input-group">
            <label for="customTitle">消息标题：</label>
            <input
              id="customTitle"
              v-model="customTitle"
              type="text"
              placeholder="输入自定义标题"
              class="custom-input"
            />
          </div>
          <div class="input-group">
            <label for="messageType">消息类型：</label>
            <select id="messageType" v-model="messageType" class="custom-select">
              <option value="success">成功</option>
              <option value="error">错误</option>
              <option value="warning">警告</option>
              <option value="info">信息</option>
            </select>
          </div>
          <button @click="testCustomMessage" class="test-btn custom">
            <span class="btn-icon">🎯</span>
            发送自定义消息
          </button>
        </div>
      </div>

      <div class="test-section">
        <h2>批量消息测试</h2>
        <div class="test-buttons">
          <button @click="testMultipleMessages" class="test-btn multiple">
            <span class="btn-icon">📢</span>
            发送多条消息
          </button>
          <button @click="testLongMessage" class="test-btn long">
            <span class="btn-icon">📝</span>
            测试长消息
          </button>
          <button @click="clearAllMessages" class="test-btn clear">
            <span class="btn-icon">🗑️</span>
            清空所有消息
          </button>
        </div>
      </div>

      <div class="test-section">
        <h2>模拟真实场景测试</h2>
        <div class="scenario-tests">
          <button @click="simulateLogin" class="test-btn scenario">
            <span class="btn-icon">🔐</span>
            模拟登录成功
          </button>
          <button @click="simulateError" class="test-btn scenario">
            <span class="btn-icon">💔</span>
            模拟网络错误
          </button>
          <button @click="simulateValidation" class="test-btn scenario">
            <span class="btn-icon">📋</span>
            模拟表单验证
          </button>
          <button @click="simulateUpload" class="test-btn scenario">
            <span class="btn-icon">📤</span>
            模拟文件上传
          </button>
        </div>
      </div>

      <div class="test-section">
        <h2>确认对话框测试</h2>
        <div class="test-buttons">
          <button @click="testConfirm" class="test-btn confirm">
            <span class="btn-icon">❓</span>
            测试确认对话框
          </button>
          <button @click="testPrompt" class="test-btn prompt">
            <span class="btn-icon">✏️</span>
            测试输入对话框
          </button>
        </div>
      </div>

      <div class="test-results" v-if="testResults.length > 0">
        <h2>测试结果</h2>
        <div class="results-list">
          <div
            v-for="(result, index) in testResults"
            :key="index"
            :class="['result-item', result.type]"
          >
            <span class="result-time">{{ result.time }}</span>
            <span class="result-message">{{ result.message }}</span>
          </div>
        </div>
        <button @click="clearResults" class="clear-results-btn">
          清空测试结果
        </button>
      </div>
    </div>
  </PageLayout>
</template>

<script setup>
import { ref } from 'vue'
import { $message } from '@/utils/message.js'
import PageLayout from '@/components/PageLayout.vue'

// 自定义消息测试数据
const customMessage = ref('这是一条自定义消息')
const customTitle = ref('自定义标题')
const messageType = ref('info')

// 测试结果记录
const testResults = ref([])

// 记录测试结果
const recordResult = (message, type = 'info') => {
  testResults.value.unshift({
    time: new Date().toLocaleTimeString(),
    message,
    type
  })
}

// 基础消息类型测试
const testSuccess = () => {
  $message.success('这是一条成功消息！操作已完成。')
  recordResult('发送成功消息', 'success')
}

const testError = () => {
  $message.error('这是一条错误消息！请检查您的输入。', '操作失败')
  recordResult('发送错误消息', 'error')
}

const testWarning = () => {
  $message.warning('这是一条警告消息！请注意相关风险。', '注意')
  recordResult('发送警告消息', 'warning')
}

const testInfo = () => {
  $message.info('这是一条信息消息！为您提供相关提示。')
  recordResult('发送信息消息', 'info')
}

// 自定义消息测试
const testCustomMessage = () => {
  if (!customMessage.value.trim()) {
    $message.warning('请输入消息内容')
    return
  }

  const methods = {
    success: $message.success,
    error: $message.error,
    warning: $message.warning,
    info: $message.info
  }

  methods[messageType.value](customMessage.value, customTitle.value || undefined)
  recordResult(`发送自定义${messageType.value}消息: ${customMessage.value}`, messageType.value)
}

// 批量消息测试
const testMultipleMessages = () => {
  $message.info('第一条消息：开始批量测试')
  setTimeout(() => $message.success('第二条消息：批量测试进行中'), 500)
  setTimeout(() => $message.warning('第三条消息：注意消息叠加效果'), 1000)
  setTimeout(() => $message.error('第四条消息：批量测试完成'), 1500)
  recordResult('发送4条连续消息', 'info')
}

const testLongMessage = () => {
  const longMessage = '这是一条很长很长的消息，用于测试消息提示组件对于长文本的处理能力。它应该能够正确地换行显示，保持良好的可读性，同时不会影响页面布局。这条消息包含了足够多的文字来验证组件的文本处理功能是否正常工作。'
  $message.info(longMessage, '长消息测试')
  recordResult('发送长消息', 'info')
}

const clearAllMessages = () => {
  $message.clear()
  recordResult('清空所有消息', 'info')
}

// 模拟真实场景测试
const simulateLogin = () => {
  $message.info('正在登录...')
  setTimeout(() => {
    $message.success('登录成功！欢迎回来。', '登录成功')
  }, 1000)
  recordResult('模拟登录场景', 'success')
}

const simulateError = () => {
  $message.info('正在加载数据...')
  setTimeout(() => {
    $message.error('网络连接失败，请检查您的网络设置后重试。', '网络错误')
  }, 1500)
  recordResult('模拟网络错误场景', 'error')
}

const simulateValidation = () => {
  $message.warning('邮箱格式不正确，请输入有效的邮箱地址。', '表单验证')
  setTimeout(() => {
    $message.warning('密码长度至少需要8位字符。', '表单验证')
  }, 800)
  recordResult('模拟表单验证场景', 'warning')
}

const simulateUpload = () => {
  $message.info('开始上传文件...')
  setTimeout(() => $message.info('文件上传中... 30%'), 1000)
  setTimeout(() => $message.info('文件上传中... 60%'), 2000)
  setTimeout(() => $message.info('文件上传中... 90%'), 3000)
  setTimeout(() => $message.success('文件上传完成！', '上传成功'), 4000)
  recordResult('模拟文件上传场景', 'success')
}

// 确认对话框测试
const testConfirm = () => {
  const result = $message.confirm('您确定要删除这个项目吗？此操作不可撤销。', '确认删除')
  recordResult(`确认对话框结果: ${result ? '确认' : '取消'}`, result ? 'success' : 'info')

  if (result) {
    $message.success('项目已删除')
  } else {
    $message.info('操作已取消')
  }
}

const testPrompt = () => {
  const result = $message.prompt('请输入您的姓名:', '', '输入信息')
  recordResult(`输入对话框结果: ${result || '取消'}`, result ? 'success' : 'info')

  if (result) {
    $message.success(`您好，${result}！`, '欢迎')
  } else {
    $message.info('输入已取消')
  }
}

// 清空测试结果
const clearResults = () => {
  testResults.value = []
}
</script>

<style scoped>
.test-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.page-header {
  text-align: center;
  margin-bottom: 3rem;
}

.page-header h1 {
  font-size: 2.5rem;
  font-weight: 700;
  background: linear-gradient(135deg, #4A90E2 0%, #357ABD 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 0.5rem;
}

.subtitle {
  font-size: 1.1rem;
  color: rgba(255, 255, 255, 0.7);
}

.test-section {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  padding: 2rem;
  margin-bottom: 2rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.test-section h2 {
  font-size: 1.5rem;
  color: #ffffff;
  margin-bottom: 1.5rem;
  font-weight: 600;
}

.test-buttons {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.scenario-tests {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}

.test-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.3s ease;
  color: white;
}

.test-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.test-btn.success {
  background: linear-gradient(135deg, #10b981, #059669);
}

.test-btn.error {
  background: linear-gradient(135deg, #ef4444, #dc2626);
}

.test-btn.warning {
  background: linear-gradient(135deg, #f59e0b, #d97706);
}

.test-btn.info {
  background: linear-gradient(135deg, #3b82f6, #2563eb);
}

.test-btn.multiple {
  background: linear-gradient(135deg, #8b5cf6, #7c3aed);
}

.test-btn.long {
  background: linear-gradient(135deg, #06b6d4, #0891b2);
}

.test-btn.clear {
  background: linear-gradient(135deg, #6b7280, #4b5563);
}

.test-btn.scenario {
  background: linear-gradient(135deg, #ec4899, #db2777);
}

.test-btn.confirm {
  background: linear-gradient(135deg, #f97316, #ea580c);
}

.test-btn.prompt {
  background: linear-gradient(135deg, #84cc16, #65a30d);
}

.test-btn.custom {
  background: linear-gradient(135deg, #a855f7, #9333ea);
}

.btn-icon {
  font-size: 1.2rem;
}

.custom-test {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 600px;
}

.input-group {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.input-group label {
  min-width: 100px;
  color: rgba(255, 255, 255, 0.8);
  font-weight: 500;
}

.custom-input,
.custom-select {
  flex: 1;
  padding: 0.5rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 6px;
  background: rgba(0, 0, 0, 0.3);
  color: white;
  font-size: 0.9rem;
}

.custom-input:focus,
.custom-select:focus {
  outline: none;
  border-color: #4A90E2;
}

.test-results {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  padding: 2rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.test-results h2 {
  font-size: 1.5rem;
  color: #ffffff;
  margin-bottom: 1.5rem;
  font-weight: 600;
}

.results-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1rem;
  max-height: 300px;
  overflow-y: auto;
}

.result-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.5rem;
  border-radius: 6px;
  font-size: 0.9rem;
}

.result-item.success {
  background: rgba(16, 185, 129, 0.1);
  border-left: 3px solid #10b981;
}

.result-item.error {
  background: rgba(239, 68, 68, 0.1);
  border-left: 3px solid #ef4444;
}

.result-item.warning {
  background: rgba(245, 158, 11, 0.1);
  border-left: 3px solid #f59e0b;
}

.result-item.info {
  background: rgba(59, 130, 246, 0.1);
  border-left: 3px solid #3b82f6;
}

.result-time {
  color: rgba(255, 255, 255, 0.6);
  font-family: monospace;
  min-width: 80px;
}

.result-message {
  color: rgba(255, 255, 255, 0.9);
}

.clear-results-btn {
  padding: 0.5rem 1rem;
  background: rgba(107, 114, 128, 0.5);
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.3s ease;
}

.clear-results-btn:hover {
  background: rgba(107, 114, 128, 0.7);
}

@media (max-width: 768px) {
  .test-page {
    padding: 1rem;
  }

  .test-buttons {
    flex-direction: column;
  }

  .scenario-tests {
    grid-template-columns: 1fr;
  }

  .input-group {
    flex-direction: column;
    align-items: stretch;
  }

  .input-group label {
    min-width: auto;
  }
}
</style>