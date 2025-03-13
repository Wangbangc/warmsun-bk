import { defineConfig } from 'vitepress'

const fileAndStyles: Record<string, string> = {}

// https://vitepress.dev/reference/site-config
export default defineConfig({
    lang: 'zh-CN',
    title: "warmsun的笔记本",
    description: "还没想好做什么",
    head: [
        ['link', { rel: 'icon', href: '/img/favicon.png' }],
        ['script', {},
            `window._hmt = window._hmt || [];
            (function() {
                var hm = document.createElement("script");
                hm.src = "https://hm.baidu.com/hm.js?7926b3f77abd3abf9b3a5c3ff9608acc";
                var s = document.getElementsByTagName("script")[0]; 
                s.parentNode.insertBefore(hm, s);
            })();`
        ],
    ],
    rewrites: {
        'tools/:tool_name/index.md': ':tool_name/index.md',
        'pages/default/:any': 'pages/:any',
        'pages/default/:year/:month/:any': 'pages/:year/:month/:any',
    },
    sitemap: {
        hostname: 'https://feling.net'
    },
    themeConfig: {
        logo: '/img/favicon.png',
        nav: [
            { text: '首页', link: '/' },
            {
                text: '开发小工具',
                items: [
                    { text: 'Json 格式化', link: '/json/' },
                    { text: 'JWT 解码', link: '/jwt/' },
                    { text: 'Base64 编解码', link: '/base64/' },
                    { text: 'WebSocket 联调', link: '/wsp/' },
                    { text: 'unicode 解码 (\\uxxxx 转中文)', link: '/unicode/' },
                    { text: '时间戳 ⇄ 时间', link: '/timestamp/' },
                ]
            },
            { text: '装机必备', link: '/pages/config/', activeMatch: '/pages/config/' },   
        ],
        socialLinks: [
            {
                icon: {
                    svg: '<svg xmlns="http://www.w3.org/2000/svg" xml:space="preserve" viewBox="0 0 640 640" width="32" height="32"><path d="m395.9 484.2-126.9-61c-12.5-6-17.9-21.2-11.8-33.8l61-126.9c6-12.5 21.2-17.9 33.8-11.8 17.2 8.3 27.1 13 27.1 13l-.1-109.2 16.7-.1.1 117.1s57.4 24.2 83.1 40.1c3.7 2.3 10.2 6.8 12.9 14.4 2.1 6.1 2 13.1-1 19.3l-61 126.9c-6.2 12.7-21.4 18.1-33.9 12" style="fill:#fff"/><path d="M622.7 149.8c-4.1-4.1-9.6-4-9.6-4s-117.2 6.6-177.9 8c-13.3.3-26.5.6-39.6.7v117.2c-5.5-2.6-11.1-5.3-16.6-7.9 0-36.4-.1-109.2-.1-109.2-29 .4-89.2-2.2-89.2-2.2s-141.4-7.1-156.8-8.5c-9.8-.6-22.5-2.1-39 1.5-8.7 1.8-33.5 7.4-53.8 26.9C-4.9 212.4 6.6 276.2 8 285.8c1.7 11.7 6.9 44.2 31.7 72.5 45.8 56.1 144.4 54.8 144.4 54.8s12.1 28.9 30.6 55.5c25 33.1 50.7 58.9 75.7 62 63 0 188.9-.1 188.9-.1s12 .1 28.3-10.3c14-8.5 26.5-23.4 26.5-23.4S547 483 565 451.5c5.5-9.7 10.1-19.1 14.1-28 0 0 55.2-117.1 55.2-231.1-1.1-34.5-9.6-40.6-11.6-42.6M125.6 353.9c-25.9-8.5-36.9-18.7-36.9-18.7S69.6 321.8 60 295.4c-16.5-44.2-1.4-71.2-1.4-71.2s8.4-22.5 38.5-30c13.8-3.7 31-3.1 31-3.1s7.1 59.4 15.7 94.2c7.2 29.2 24.8 77.7 24.8 77.7s-26.1-3.1-43-9.1m300.3 107.6s-6.1 14.5-19.6 15.4c-5.8.4-10.3-1.2-10.3-1.2s-.3-.1-5.3-2.1l-112.9-55s-10.9-5.7-12.8-15.6c-2.2-8.1 2.7-18.1 2.7-18.1L322 273s4.8-9.7 12.2-13c.6-.3 2.3-1 4.5-1.5 8.1-2.1 18 2.8 18 2.8L467.4 315s12.6 5.7 15.3 16.2c1.9 7.4-.5 14-1.8 17.2-6.3 15.4-55 113.1-55 113.1" style="fill:#609926"/><path d="M326.8 380.1c-8.2.1-15.4 5.8-17.3 13.8s2 16.3 9.1 20c7.7 4 17.5 1.8 22.7-5.4 5.1-7.1 4.3-16.9-1.8-23.1l24-49.1c1.5.1 3.7.2 6.2-.5 4.1-.9 7.1-3.6 7.1-3.6 4.2 1.8 8.6 3.8 13.2 6.1 4.8 2.4 9.3 4.9 13.4 7.3.9.5 1.8 1.1 2.8 1.9 1.6 1.3 3.4 3.1 4.7 5.5 1.9 5.5-1.9 14.9-1.9 14.9-2.3 7.6-18.4 40.6-18.4 40.6-8.1-.2-15.3 5-17.7 12.5-2.6 8.1 1.1 17.3 8.9 21.3s17.4 1.7 22.5-5.3c5-6.8 4.6-16.3-1.1-22.6 1.9-3.7 3.7-7.4 5.6-11.3 5-10.4 13.5-30.4 13.5-30.4.9-1.7 5.7-10.3 2.7-21.3-2.5-11.4-12.6-16.7-12.6-16.7-12.2-7.9-29.2-15.2-29.2-15.2s0-4.1-1.1-7.1c-1.1-3.1-2.8-5.1-3.9-6.3 4.7-9.7 9.4-19.3 14.1-29-4.1-2-8.1-4-12.2-6.1-4.8 9.8-9.7 19.7-14.5 29.5-6.7-.1-12.9 3.5-16.1 9.4-3.4 6.3-2.7 14.1 1.9 19.8z" style="fill:#609926"/></svg>'
                },
                link: 'https://git.apihub.net/chenyan/feling.net',
                ariaLabel: 'gitea'
            },
        ],
        returnToTopLabel: '返回顶部',
        darkModeSwitchLabel: '深色模式',
        darkModeSwitchTitle: '切换到深色模式',
        lightModeSwitchTitle: '切换到浅色模式',
        sidebarMenuLabel: '菜单',
        sidebar: {
            '/pages/config/': [
                {
                    text: '装机必备',
                    items: [
                        { text: 'vim', link: '/pages/config/vim' },
                        { text: 'ssh', link: '/pages/config/ssh' },
                        { text: 'proxy', link: '/pages/config/proxy' },
                        { text: 'zsh', link: '/pages/config/zsh' },
                        { text: 'too many open files', link: '/pages/config/nlimit' },
                        { text: 'swap', link: '/pages/config/swap' },
                        { text: 'git', link: '/pages/config/git' },
                        { text: 'nginx', link: '/pages/config/nginx' },
                        { text: 'systemd', link: '/pages/config/systemd' },
                        { text: 'test', link: '/pages/config/test'},
                        { text: 'js', link: '/pages/config/js学习1'}
                    ]
                }
            ],
            '/pages/': [
                {
                    text: '',
                    items: [
                        { text: '杂记', link: '/pages/' },
                        { text: '装机必备系列', link: '/pages/config/' },
                    
                    ]
                }
            ],
        },
        outline: {
            level: 'deep',
            label: '页面导航'
        },
        lastUpdated: {
            text: '最后更新于',
            formatOptions: {
                dateStyle: 'medium',
                timeStyle: 'short'
            }
        },
        docFooter: { prev: '上一篇', next: '下一篇' },
        footer: {
            message: '<a href="http://beian.miit.gov.cn" rel="nofollow">闽ICP备17033777号</a>',
            copyright: `Copyright © 2015-${new Date().getFullYear()} <a href="">ApiHub</a>`
        },
        notFound: {
            code: '404',
            title: 'PAGE NOT FOUND',
            quote: 'T.T 未找到对应页面',
            linkText: '回首页',
        }

    },
    markdown: {
        lineNumbers: true,
    },
    vite: {
        ssr: {
            noExternal: ['naive-ui', 'date-fns', 'vueuc']
        }
    },
    postRender(context) {
        const styleRegex = /<css-render-style>((.|\s)+)<\/css-render-style>/
        const vitepressPathRegex = /<vitepress-path>(.+)<\/vitepress-path>/
        const style = styleRegex.exec(context.content)?.[1]
        const vitepressPath = vitepressPathRegex.exec(context.content)?.[1]
        if (vitepressPath && style) {
            fileAndStyles[vitepressPath] = style
        }
        context.content = context.content.replace(styleRegex, '')
        context.content = context.content.replace(vitepressPathRegex, '')
    },
    transformHtml(code, id) {
        const html = id.split('/').pop()
        if (!html)
            return
        const style = fileAndStyles[`/${html}`]
        if (style) {
            return code.replace(/<\/head>/, `${style}</head>`)
        }
    },
})
