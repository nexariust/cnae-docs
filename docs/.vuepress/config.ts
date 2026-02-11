import { defineUserConfig } from 'vuepress'
import { plumeTheme } from 'vuepress-theme-plume'
import { viteBundler } from '@vuepress/bundler-vite'

export default defineUserConfig({
  bundler: viteBundler(),
  lang: 'zh-CN',
  title: 'CNAE Docs',
  description: 'CNAE 文档中心 - 提供 API 文档、Vercel/Netlify/Edgeone/Cloudflare/云驰互联 优选配置指南和详细使用说明',
  base: '/',
  // 设置输出目录为相对路径的dist
  dest: 'dist',
  // SEO优化和统计代码配置
  head: [
    // SEO相关元标签
    ['meta', { name: 'keywords', content: 'CNAE, API文档, Vercel, Netlify, Edgeone, Cloudflare, 云驰互联, 优选配置, 技术文档' }],
    ['meta', { name: 'robots', content: 'index, follow' }],
    ['link', { rel: 'canonical', href: 'https://docs.cnae.top/' }],
    ['meta', { name: 'author', content: 'nexariust' }],
    // umami统计代码
    ['script', {
      defer: true,
      src: 'https://um.cnae.top/script.js',
      'data-website-id': '0fed0870-7949-479a-95f4-56f1be5ffc54'
    }]
  ],
  theme: plumeTheme({
    // 主题配置
    themeColor: '#46bd87',
    author: {
      name: '文档作者',
      link: '',
    },
    logo: '',
    repo: '',
    // 设置全局版权协议为CC-BY-NC-SA-4.0（署名—非商业性使用—相同方式共享 4.0）
    copyright: 'CC-BY-NC-SA-4.0',
    // 启用文章贡献者功能，设置为block模式显示完整信息
    contributors: {
      mode: 'block',
      avatar: true
    },
    // 启用文章变更历史功能
    changelog: {
      maxCount: 10, // 最大显示10条变更记录
      repoUrl: 'https://github.com/nexariust/cnae-docs' // 仓库URL
    },
    footer: {
      copyright: '© 2025 nexariust All rights reserved',
    },
    navbar: [
      { text: '首页', link: '/' },
      { text: 'API 文档', link: '/api/' },
      { text: '使用指南', link: '/guide/' },
      { text: '关于', link: '/about/' }
    ],
    // 侧边栏配置
    sidebar: {
      // API文档侧边栏配置
      '/api/': [
        { text: 'API 总览', link: '/api/' },
        { text: '1k4(亚太)API', link: '/api/1k4/overseas/' },
        { text: 'zyidc(亚太)API', link: '/api/zyidc/overseas/' }
      ],
      // 其他目录的侧边栏可以在这里添加
      '/config/': [],
      '/guide/': [
        { text: '优选配置指南', link: '/guide/' },
        { text: 'Vercel 优选指南', link: '/guide/vercel/' },
        { text: 'Netlify 优选指南', link: '/guide/netlify/' },
        { text: 'Edgeone 优选指南', link: '/guide/edgeone/' },
        { text: 'Cloudflare 优选指南', link: '/guide/cloudflare/' },
        { text: '1k4亚太CDN', link: '/guide/1k4/overseas/' },
        { text: '云驰互联 优选指南', link: '/guide/zyidc/overseas/' }
      ]
    },
    plugins: {
      // 启用git插件并配置显示提交记录
      git: true
    }
  }),
})