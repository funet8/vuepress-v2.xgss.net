import { viteBundler } from '@vuepress/bundler-vite'
import { defineUserConfig } from 'vuepress'

//默认主题
//import { defaultTheme } from '@vuepress/theme-default'

//theme-hope主题
import { hopeTheme } from 'vuepress-theme-hope'

//默认主题的搜索插件
//import { searchPlugin } from '@vuepress/plugin-search'


export default defineUserConfig({
  bundler: viteBundler(),
    theme: hopeTheme({
    // 导航栏，注意， NavbarGroup嵌套最多两层
    navbar: [
      { text: '首页', link: '/' },
	  { text: 'Linux基础教程', children: [
            { text: '基础知识', link: '/linux-basis/' },
			{ text: 'DevOps', link: '/devops/' },
			{ text: 'WEB服务', link: '/web/' },
			{ text: '文件系统', link: '/file-system/' },
			{ text: 'Nginx', link: '/nginx/' },
			{ text: 'Docker', link: '/docker/' },
      ]},
	  { text: '开源软件', children: [
            { text: '开源软件', link: '/kaiyuan/Open-Source-Software/' },
			{ text: '数据库', link: '/kaiyuan/Open-databases/' },
			{ text: '安卓相关', link: '/kaiyuan/android/' },
			{ text: 'JumpServer', link: '/kaiyuan/jumpserver/' },
      ]},
	  { text: '云服务', children: [
            { text: '阿里云', link: '/cloud/aliyun/' },
			{ text: '腾讯云', link: '/cloud/tengxunyun/' },
			{ text: '亚马逊云', link: '/cloud/aws/' },
			{ text: '其他', link: '/cloud/other/' },
      ]},
	  { text: '服务器安全', link: '/safe/' },
	  { text: '常用软件', link: '/software/' },
	  { text: '互联网福利', link: '/internet/' },
	  { text: '调试Debug', link: '/debug/' },
	  // 替换为你的 GitHub 仓库地址
	  { text: 'GitHub', link: 'https://github.com/funet8/vuepress-v2.xgss.net.git'},
    ],
	// 侧边栏
	sidebar: [
		{ text: '首页',link: '/README.md', },
		{ text: 'ChatGPT',
			collapsible: true,
				children: [
					{ text: 'ChatGPT', link: '/chatgpt/',},
					{ text: 'ChatGPT2025',link: '/chatgpt2025/',},
				],
		},
		{ text: '开源',
			collapsible: true,
				children: [
					{ text: '开源软件', link: '/kaiyuan/Open-Source-Software/',},
					{ text: '开源2025',link: '/kaiyuan2025/',},
				],
		},
		{ text: '基础知识',link: '/linux-basis/', },
		{ text: '互联网2025', link: '/internet2025/' },
		{ text: 'NAS',link: '/NAS/', },
		{ text: 'Rocky-Linux',link: '/Rocky-Linux/', },
		{ text: '网络安全',link: '/safe/', },
		{ text: 'MySQL',link: '/mysql/', },
		{ text: 'Nginx',link: '/nginx/', },
		{ text: 'Shell',link: '/shell/', },
		{ text: 'Ubuntu',link: '/Ubuntu/', },
		{ text: '硬件',link: '/hardware/', },
		{ text: 'Git',link: '/git/', },
		//隐藏左侧导航
		/**
		{ text: '基础知识',
        collapsible: false,
        link: '/linux-basis/',
        children: [ 
				{ text: '百度', link: 'https://www.baidu.com', }, 'notebook2.md', 'notebook2.md',
			],
		},**/
	
	/**
      {
        text: 'Functions3',
        prefix: '/functions/',
        // link: '/README.md',
        collapsible: true,
        // collapsible: false,
        children: [
          {
            text: 'baidu',
            link: 'https://www.baidu.com',
          },
          {
            text: 'F1',
            link: 'f1.md',
          },
          'f1.md',
          'f2.md',
        ],
      },**/
    ],
  }),
  title: '星哥的私有笔记',
  description: '星哥说事vuepress描述，包含前端、后端、运维、等技术的介绍',
  head: [ // 注入到当前页面的 HTML <head> 中的标签
    ['link', { rel: 'icon', href: '/images/logo.png' }],
    ['link', { rel: 'manifest', href: '/images/logo.png' }],
    ['link', { rel: 'apple-touch-icon', href: '/images/logo.png' }],
    ['meta', { 'http-quiv': 'pragma', cotent: 'no-cache'}],
    ['meta', { 'http-quiv': 'pragma', cotent: 'no-cache,must-revalidate'}],
    ['meta', { 'http-quiv': 'expires', cotent: '0'}]
  ],
	host: 'localhost', // 只能使用 http://localhost:8099 , 可以指定ip
	port: '8099', //端口号
	serviceWorker: true, // 是否开启 PWA
	//base: '/vuepress-v2.xgss.net/', // 部署到github相关的配置
	markdown: {
		lineNumbers: true // 代码块是否显示行号
	},
	
})