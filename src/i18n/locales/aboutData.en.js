/**
 * About Page Data Translations - English
 */
export default {
  hero: {
    title: 'Hohai University 110th Anniversary',
    subtitle: 'Commemorative Website'
  },
  aboutSchool: {
    title: 'About Hohai University',
    paragraph1: 'Hohai University is a national key university directly under the Ministry of Education with a 110-year history, featuring water conservancy, focusing on engineering, and developing multiple disciplines in a coordinated manner. It is a university implementing the national "Project 211" key construction, national advantageous discipline innovation platform construction, "Double First-Class" construction, and approved by the Ministry of Education to establish a graduate school.',
    paragraph2: 'Over the past century, the university has created countless "firsts" in the journey of water management for national prosperity: China\'s first higher education institution for water conservancy, the first undergraduate program in water conservancy, the first Chinese Academy of Engineering academician in water conservancy disciplines, and the first doctoral program in hydraulic engineering.'
  },
  milestones: {
    title: 'Development History',
    events: [
      {
        year: '1915',
        title: 'Founding',
        description: 'Hohai Engineering College was established, marking the beginning of Chinese water conservancy higher education'
      },
      {
        year: '1952',
        title: 'Restructuring',
        description: 'East China College of Hydraulic Engineering was established, becoming a water conservancy talent training base in New China'
      },
      {
        year: '1985',
        title: 'Name Restoration',
        description: 'Restored the name "Hohai University", personally inscribed by Comrade Deng Xiaoping'
      },
      {
        year: '2017',
        title: 'Double First-Class',
        description: 'Water Conservancy Engineering discipline selected for "Double First-Class" construction'
      }
    ]
  },
  achievements: {
    title: 'Academic Achievements',
    stats: [
      {
        icon: '🎓',
        number: '200,000+',
        label: 'Graduates Cultivated'
      },
      {
        icon: '🏆',
        number: 'National No. 1',
        label: 'Water Conservancy Discipline'
      },
      {
        icon: '🔬',
        number: '20+',
        label: 'National Research Platforms'
      },
      {
        icon: '🌏',
        number: '50,000+',
        label: 'Current Students'
      }
    ]
  },
  project: {
    title: 'About This Project',
    introduction: {
      title: 'Project Overview',
      content: 'The Hohai University 110th Anniversary Commemorative Website is an interactive and creative full-stack application designed to showcase Hohai University\'s glorious 110-year history through modern web technologies. The project adopts a front-end and back-end separation architecture, with the front-end built using Vue 3 + Vite and the back-end based on Node.js + Express + MySQL, providing a smooth user experience and beautiful visual effects.'
    },
    highlights: {
      title: 'Key Highlights',
      items: [
        '🎨 Beautiful animation effects and interactive experience',
        '📱 Comprehensive responsive design, supporting multi-platform access',
        '⚡ High-performance loading and rendering optimization',
        '🔐 Complete user authentication and permission management system',
        '💬 Rich community interaction features'
      ]
    },
    frontend: {
      title: 'Frontend Tech Stack',
      core: {
        title: 'Core Framework',
        items: [
          { name: 'Vue 3.5.22', type: 'frontend' },
          { name: 'Vite 7.1.10', type: 'frontend' },
          { name: 'Vue Router 4.6.3', type: 'frontend' },
          { name: 'Pinia 3.0.3', type: 'frontend' }
        ]
      },
      libraries: {
        title: 'Core Libraries',
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
      title: 'Backend Tech Stack',
      core: {
        title: 'Core Framework',
        items: [
          { name: 'Node.js 14+', type: 'backend' },
          { name: 'Express 5.x', type: 'backend' },
          { name: 'Sequelize 6.x', type: 'backend' },
          { name: 'MySQL 8.0+', type: 'backend' }
        ]
      },
      features: {
        title: 'Core Features',
        items: [
          { name: 'JWT Authentication', type: 'backend' },
          { name: 'Socket.IO Real-time Communication', type: 'backend' },
          { name: 'Nodemailer Email Service', type: 'backend' },
          { name: 'Multer File Upload', type: 'backend' },
          { name: 'bcrypt Password Encryption', type: 'backend' }
        ]
      }
    },
    features: {
      title: 'Core Feature Modules',
      categories: [
        {
          icon: '📖',
          title: 'Content Display',
          items: [
            'Homepage - Anniversary theme content display and navigation',
            'Historical Timeline - 110-year development history of Hohai University',
            'Cultural Display - Hohai spirit and cultural heritage',
            'Hohai People - Introduction to distinguished alumni and important figures'
          ]
        },
        {
          icon: '🎨',
          title: 'Interactive Experience',
          items: [
            'Blessing Wall - Interactive messages and blessings from faculty, students, and alumni',
            'Messages to the Future - Collection and display of alumni messages',
            'Torch Relay - Global torch relay counter'
          ]
        },
        {
          icon: '💬',
          title: 'Community Features',
          items: [
            'Forum System - Multi-board discussion area supporting posts, replies, and likes',
            'Article Column - Publishing and reading anniversary-related articles',
            'Comment Interaction - Comment functionality for articles and posts'
          ]
        },
        {
          icon: '👤',
          title: 'User System',
          items: [
            'User Authentication - Login, registration, password reset',
            'Personal Center - User information management and personalized settings',
            'Permission Management - Role-based access control',
            'Admin Panel - Administrator content management interface'
          ]
        }
      ]
    },
    techFeatures: {
      title: 'Technical Features',
      items: [
        {
          icon: '🎬',
          title: 'Animation Effects',
          description: 'GSAP-driven high-performance scroll-triggered animations, Three.js-based 3D visual effects, GPU-accelerated animation rendering'
        },
        {
          icon: '📱',
          title: 'Responsive Design',
          description: 'Mobile-first design philosophy, flexible grid layout system, adaptive fonts and spacing, touch-friendly interaction design'
        },
        {
          icon: '⚡',
          title: 'Performance Optimization',
          description: 'Route-level code splitting and lazy loading, component async loading, resource preloading and caching strategies, optimized bundle size and loading speed'
        },
        {
          icon: '🔒',
          title: 'Security Features',
          description: 'JWT token authentication, route guards and permission verification, XSS and CSRF protection, secure data transmission, rate limiting protection'
        }
      ]
    },
    stats: {
      title: 'Project Scale',
      items: [
        { number: '80+', label: 'API Endpoints' },
        { number: '21', label: 'Database Tables' },
        { number: '20+', label: 'Page Routes' },
        { number: '15+', label: 'Backend Controllers' }
      ]
    },
    architecture: {
      title: 'System Architecture',
      description: 'This project adopts a modern front-end and back-end separation architecture:',
      layers: [
        { name: 'Frontend Layer', description: 'Vue 3 + Composition API, component-based development, reactive state management' },
        { name: 'API Layer', description: 'RESTful API design, unified request/response format, comprehensive error handling' },
        { name: 'Business Layer', description: 'Express routing and controllers, business logic layering, middleware mechanism' },
        { name: 'Data Layer', description: 'Sequelize ORM, MySQL relational database, data model associations' },
        { name: 'Real-time Communication', description: 'Socket.IO implements WebSocket bidirectional communication, supporting online status and real-time messaging' }
      ]
    }
  },
  team: {
    title: 'Development Team',
    description: 'This work is an entry for the 11th Web Design Competition of Hohai University\nJointly designed and developed by Wang Yuran & Li Zirui from Computer Science and Technology Class 2, College of Computer and Software',
    members: [
      {
        name: 'Wang Yuran',
        role: 'Frontend & Backend Development',
        links: [
          { icon: '🏠', text: 'Personal Homepage', url: 'http://r-l.ink/home' },
          { icon: '📧', text: 'Contact', url: 'https://r-l.ink/about' },
          { icon: '☕', text: 'Support Me', url: 'https://r-l.ink/support' }
        ]
      },
      {
        name: 'Li Zirui',
        role: 'Design & Testing',
        links: []
      }
    ],
    contact: {
      version: {
        label: 'Version',
        value: 'v1.0.0'
      },
      github: {
        label: 'Open Source',
        frontendLabel: 'Frontend Repo',
        backendLabel: 'Backend Repo',
        frontend: 'https://github.com/five-plus-one/HoHai110_frontend',
        backend: 'https://github.com/five-plus-one/HoHai110_backend'
      }
    }
  }
}
