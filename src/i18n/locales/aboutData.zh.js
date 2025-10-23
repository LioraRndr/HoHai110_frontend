/**
 * About页面数据翻译 - 中文
 */
export default {
  hero: {
    title: '河海大学110周年',
    subtitle: '纪念网站'
  },
  aboutSchool: {
    title: '关于河海大学',
    paragraph1: '河海大学是一所有着110年办学历史,以水利为特色,工科为主,多学科协调发展的教育部直属全国重点大学,是实施国家"211工程"重点建设、国家优势学科创新平台建设、"双一流"建设以及教育部批准设立研究生院的高校。',
    paragraph2: '一百多年来,学校在治水兴邦的奋斗历程中创造了无数个"第一":中国第一所水利高等学府、第一个水利本科专业、第一位水利学科的中国工程院院士、第一个水利工程博士点。'
  },
  milestones: {
    title: '发展历程',
    events: [
      {
        year: '1915',
        title: '创立',
        description: '河海工程专门学校成立,中国水利高等教育开启'
      },
      {
        year: '1952',
        title: '重组',
        description: '华东水利学院成立,新中国水利人才培养基地'
      },
      {
        year: '1985',
        title: '复名',
        description: '恢复"河海大学"校名,邓小平同志亲笔题写'
      },
      {
        year: '2017',
        title: '双一流',
        description: '水利工程学科入选"双一流"建设学科'
      }
    ]
  },
  achievements: {
    title: '办学成就',
    stats: [
      {
        icon: '🎓',
        number: '20万+',
        label: '培养毕业生'
      },
      {
        icon: '🏆',
        number: '全国第一',
        label: '水利工程学科'
      },
      {
        icon: '🔬',
        number: '20+',
        label: '国家级科研平台'
      },
      {
        icon: '🌏',
        number: '5万+',
        label: '在读学生'
      }
    ]
  },
  project: {
    title: '关于本项目',
    introduction: {
      title: '项目简介',
      content: '河海大学110周年纪念网站是一个富有交互性和创意的全栈应用，旨在通过现代化的Web技术展现河海大学110年的辉煌历程。项目采用前后端分离架构，前端使用Vue 3 + Vite构建，后端基于Node.js + Express + MySQL，提供流畅的用户体验和精美的视觉效果。'
    },
    highlights: {
      title: '主要亮点',
      items: [
        '🎨 精美的动画效果和交互体验',
        '📱 完善的响应式设计，支持多端访问',
        '⚡ 高性能加载和渲染优化',
        '🔐 完整的用户认证和权限管理系统',
        '💬 丰富的社区互动功能'
      ]
    },
    frontend: {
      title: '前端技术栈',
      core: {
        title: '核心框架',
        items: [
          { name: 'Vue 3.5.22', type: 'frontend' },
          { name: 'Vite 7.1.10', type: 'frontend' },
          { name: 'Vue Router 4.6.3', type: 'frontend' },
          { name: 'Pinia 3.0.3', type: 'frontend' }
        ]
      },
      libraries: {
        title: '核心库',
        items: [
          { name: 'GSAP 3.13.0', type: 'frontend' },
          { name: 'Three.js 0.180.0', type: 'frontend' },
          { name: 'Axios 1.12.2', type: 'frontend' },
          { name: 'Socket.IO 4.8.1', type: 'frontend' },
          { name: '@vueuse/core 13.9.0', type: 'frontend' }
        ]
      }
    },
    backend: {
      title: '后端技术栈',
      core: {
        title: '核心框架',
        items: [
          { name: 'Node.js 14+', type: 'backend' },
          { name: 'Express 5.x', type: 'backend' },
          { name: 'Sequelize 6.x', type: 'backend' },
          { name: 'MySQL 8.0+', type: 'backend' }
        ]
      },
      features: {
        title: '核心功能',
        items: [
          { name: 'JWT 认证', type: 'backend' },
          { name: 'Socket.IO 实时通信', type: 'backend' },
          { name: 'Nodemailer 邮件服务', type: 'backend' },
          { name: 'Multer 文件上传', type: 'backend' },
          { name: 'bcrypt 密码加密', type: 'backend' }
        ]
      }
    },
    features: {
      title: '核心功能模块',
      categories: [
        {
          icon: '📖',
          title: '内容展示',
          items: [
            '首页 - 校庆主题内容展示与导航',
            '历史时间线 - 河海大学110年发展历程',
            '文化展示 - 河海精神与文化内涵',
            '河海人物 - 杰出校友和重要人物介绍'
          ]
        },
        {
          icon: '🎨',
          title: '互动体验',
          items: [
            '祝福墙 - 师生校友留言祝福互动',
            '寄语未来 - 校友寄语征集与展示',
            '火炬传递 - 全局火炬传递计数器'
          ]
        },
        {
          icon: '💬',
          title: '社区功能',
          items: [
            '论坛系统 - 多板块讨论区，支持发帖、回复、点赞',
            '文章专栏 - 校庆相关文章发布与阅读',
            '评论互动 - 文章和帖子的评论功能'
          ]
        },
        {
          icon: '👤',
          title: '用户系统',
          items: [
            '用户认证 - 登录、注册、密码重置',
            '个人中心 - 用户信息管理和个性化设置',
            '权限管理 - 基于角色的访问控制',
            '管理后台 - 管理员内容管理界面'
          ]
        }
      ]
    },
    techFeatures: {
      title: '技术特性',
      items: [
        {
          icon: '🎬',
          title: '动画效果',
          description: 'GSAP驱动的高性能滚动触发动画、基于Three.js的3D视觉效果、GPU加速的动画渲染'
        },
        {
          icon: '📱',
          title: '响应式设计',
          description: '移动优先的设计理念、灵活的栅格布局系统、自适应字体和间距、触摸友好的交互设计'
        },
        {
          icon: '⚡',
          title: '性能优化',
          description: '路由级别的代码分割和懒加载、组件异步加载、资源预加载和缓存策略、优化的包体积和加载速度'
        },
        {
          icon: '🔒',
          title: '安全特性',
          description: 'JWT令牌认证、路由守卫和权限验证、XSS和CSRF防护、安全的数据传输、速率限制保护'
        }
      ]
    },
    stats: {
      title: '项目规模',
      items: [
        { number: '80+', label: 'API接口' },
        { number: '21', label: '数据表' },
        { number: '20+', label: '页面路由' },
        { number: '15+', label: '后端控制器' }
      ]
    },
    architecture: {
      title: '系统架构',
      description: '本项目采用前后端分离的现代化架构设计：',
      layers: [
        { name: '前端层', description: 'Vue 3 + Composition API，组件化开发，响应式状态管理' },
        { name: '接口层', description: 'RESTful API设计，统一的请求/响应格式，完善的错误处理' },
        { name: '业务层', description: 'Express路由和控制器，业务逻辑分层，中间件机制' },
        { name: '数据层', description: 'Sequelize ORM，MySQL关系型数据库，数据模型关联' },
        { name: '实时通信', description: 'Socket.IO实现WebSocket双向通信，支持在线状态和实时消息' }
      ]
    }
  },
  team: {
    title: '开发团队',
    description: '本作品为河海大学第十一届网页设计大赛参赛作品\n由计算机与软件学院计算机科学与技术2班王煜冉 & 李子睿共同设计制作',
    members: [
      {
        name: '王煜冉',
        role: '前端开发 & 后端开发',
        links: [
          { icon: '🏠', text: '个人主页', url: 'http://r-l.ink/home' },
          { icon: '📧', text: '联系方式', url: 'https://r-l.ink/about' },
          { icon: '☕', text: '支持我', url: 'https://r-l.ink/support' }
        ]
      },
      {
        name: '李子睿',
        role: '设计 & 测试',
        links: []
      }
    ],
    contact: {
      version: {
        label: '版本',
        value: 'v1.0.0'
      },
      github: {
        label: '开源地址',
        frontendLabel: '前端仓库',
        backendLabel: '后端仓库',
        frontend: 'https://github.com/five-plus-one/HoHai110_frontend',
        backend: 'https://github.com/five-plus-one/HoHai110_backend'
      }
    }
  }
}
