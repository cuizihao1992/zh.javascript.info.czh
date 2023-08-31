

const path = require('path');

//导入生成侧边栏的工具类
const sidebar2 = require(path.join(__dirname, './utils/sidebar.js'))


export default {
    // app level config options
    lang: 'en-US',
    title: 'VitePress',
    description: 'Vite & Vue powered static site generator.',
    themeConfig: {
        sidebar: sidebar2.items
    }
}