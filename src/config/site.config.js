export const siteConfig = {
  site: {
    name: 'QEStudio',
    slogan: '专注为简幻云简幻欢等系列产品提供第三方技术支持',
    description: 'QEStudio - 专注为简幻云简幻欢等系列产品提供第三方技术支持',
    keywords: 'QEStudio, 简幻云, 简幻欢, 技术支持, SimpCloud, SimpFun',
    url: 'https://qestudio.sgrkvp.top',
    logo: '/logo.svg',
  },
  seo: {
    title: 'QEStudio - 第三方技术支持',
    description: 'QEStudio专注为简幻云、简幻欢等系列产品提供第三方技术支持服务。',
    keywords: 'QEStudio, 简幻云, 简幻欢, 技术支持, SimpCloud, SimpFun',
    ogImage: '/og-image.png',
    twitterCard: 'summary_large_image',
    author: 'QEStudio',
  },
  contact: {
    email: 'support@qestudio.sgrkvp.top',
    qqGroup: 'QEStudio摸鱼总部',
    qqGroupNumber: '949671297',
    qqGroupLink: 'https://qm.qq.com/cgi-bin/qm/qr?k=c0nV23IWUaO6FepuIcKy3LZJvOYqog0Z&jump_from=webapi&authKey=i9aVVsbAEm88n4eQtXLAAxY2Ghp676AQ9sOOaJYq3MVLDpr7HyjJkf8clBHBRR1a',
  },
  social: {
    github: 'https://github.com/qestudio',
  },
  friends: [
    { name: '简幻云', url: 'https://simpcloud.cn', description: 'SimpCloud' },
    { name: '简幻欢', url: 'https://simpfun.cn', description: 'SimpFun' },
    { name: '简幻欢社区文档', url: 'https://www.yuque.com/simpfox/simpdoc/main', description: '语雀文档' },
  ],
  navigation: [
    { name: '首页', path: '/', icon: 'home' },
    { name: '关于我们', path: '/about', icon: 'info' },
    { name: '产品服务', path: '/services', icon: 'cube' },
    { name: '案例展示', path: '/portfolio', icon: 'briefcase' },
    { name: '新闻动态', path: '/blog', icon: 'newspaper' },
    { name: '常见问题', path: '/faq', icon: 'question' },
    { name: '联系我们', path: '/contact', icon: 'mail' },
  ],
  hero: {
    title: '专业技术支持服务',
    subtitle: 'QEStudio 专注为简幻云、简幻欢等系列产品提供第三方技术支持',
    cta: {
      primary: { text: '了解更多', link: '/about' },
      secondary: { text: '联系我们', link: '/contact' },
    },
  },
  features: [
    {
      title: '技术支持',
      description: '为系列产品提供专业的技术支持服务',
      icon: 'support',
    },
    {
      title: '问题解决',
      description: '快速响应并解决各类技术问题',
      icon: 'fix',
    },
    {
      title: '持续优化',
      description: '不断优化产品性能与用户体验',
      icon: 'optimize',
    },
    {
      title: '社区服务',
      description: '活跃的技术社区与交流平台',
      icon: 'community',
    },
  ],
  stats: [
    { value: '100+', label: '技术支持' },
    { value: '500+', label: '问题解决' },
    { value: '1+', label: '活跃成员' },
    { value: '不定时', label: '在线服务' },
  ],
  footer: {
    copyright: '© 2026 QEStudio. All rights reserved.',
  },
}

export default siteConfig
