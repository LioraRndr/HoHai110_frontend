// 全局消息服务
class MessageService {
  constructor() {
    this.toastComponent = null
    this.confirmComponent = null
  }

  // 设置 Toast 组件实例
  setToastComponent(component) {
    this.toastComponent = component
  }

  // 设置确认框组件实例
  setConfirmComponent(component) {
    this.confirmComponent = component
  }

  // 显示成功消息
  success(message, title = '成功', duration = 4000) {
    if (this.toastComponent) {
      return this.toastComponent.showSuccess(message, title, duration)
    } else {
      // 降级到控制台输出（避免使用 alert）
      console.error('Toast component not initialized:', `${title}: ${message}`)
      // 可以在这里添加其他用户友好的提示方式
    }
  }

  // 显示错误消息
  error(message, title = '错误', duration = 6000) {
    if (this.toastComponent) {
      return this.toastComponent.showError(message, title, duration)
    } else {
      // 降级到控制台输出（避免使用 alert）
      console.error('Toast component not initialized:', `${title}: ${message}`)
      // 可以在这里添加其他用户友好的提示方式
    }
  }

  // 显示警告消息
  warning(message, title = '警告', duration = 5000) {
    if (this.toastComponent) {
      return this.toastComponent.showWarning(message, title, duration)
    } else {
      // 降级到控制台输出（避免使用 alert）
      console.warn('Toast component not initialized:', `${title}: ${message}`)
      // 可以在这里添加其他用户友好的提示方式
    }
  }

  // 显示信息消息
  info(message, title = '提示', duration = 4000) {
    if (this.toastComponent) {
      return this.toastComponent.showInfo(message, title, duration)
    } else {
      // 降级到控制台输出（避免使用 alert）
      console.info('Toast component not initialized:', `${title}: ${message}`)
      // 可以在这里添加其他用户友好的提示方式
    }
  }

  // 清空所有消息
  clear() {
    if (this.toastComponent) {
      return this.toastComponent.clearAll()
    }
  }

  // 移除指定消息
  remove(id) {
    if (this.toastComponent) {
      return this.toastComponent.removeMessage(id)
    }
  }

  // 通用消息方法（用于替代 alert）
  show(message, type = 'info') {
    const methods = {
      success: this.success.bind(this),
      error: this.error.bind(this),
      warning: this.warning.bind(this),
      info: this.info.bind(this)
    }

    const method = methods[type] || this.info.bind(this)
    return method(message)
  }

  // 确认对话框（需要用户确认的操作）
  confirm(message, title = '确认', options = {}) {
    const {
      type = 'warning',
      confirmText = '确定',
      cancelText = '取消'
    } = options

    // 如果自定义确认框组件已注册，使用自定义确认框
    if (this.confirmComponent) {
      return new Promise((resolve) => {
        this.confirmComponent.showConfirm({
          title,
          message,
          type,
          confirmText,
          cancelText,
          onConfirm: () => resolve(true),
          onCancel: () => resolve(false)
        })
      })
    }

    // 降级到原生 confirm
    return Promise.resolve(window.confirm(`${title}\n\n${message}`))
  }

  // 提示输入框
  prompt(message, defaultValue = '', title = '输入') {
    // 使用原生 prompt，保持功能性
    return window.prompt(`${title}\n\n${message}`, defaultValue)
  }
}

// 创建全局实例
export const $message = new MessageService()

// Vue 插件
export default {
  install(app) {
    // 将消息服务添加到全局属性
    app.config.globalProperties.$message = $message

    // 提供注入
    app.provide('$message', $message)
  }
}

// 辅助函数，用于简化调用
export const showMessage = (message, type = 'info') => {
  return $message.show(message, type)
}

export const showSuccess = (message, title = '成功') => {
  return $message.success(message, title)
}

export const showError = (message, title = '错误') => {
  return $message.error(message, title)
}

export const showWarning = (message, title = '警告') => {
  return $message.warning(message, title)
}

export const showInfo = (message, title = '提示') => {
  return $message.info(message, title)
}