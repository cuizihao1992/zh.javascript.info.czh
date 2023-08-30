

const path = require('path');

//导入生成侧边栏的工具类
const { sideBarTool } = require(path.join(__dirname, './utils/index.js'))
const sidebar2 = require(path.join(__dirname, './utils/sidebar.js'))

// 需要排除的一些目录
let unDirIncludes = ['node_modules', 'assets', 'public', '网络工程', '.github', '.vitepress', 'node_modules']
// 只需要处理后缀的文件类型
let SuffixIncludes = ['md', 'html']
//使用方法生生成侧边栏
// 侧边栏

// let sidebar = sideBarTool.genSideBarGroup(path.join(__dirname, '../'), unDirIncludes, SuffixIncludes, {})
// console.log(JSON.stringify(sidebar.slice(1, 2)))
console.log(JSON.stringify(sidebar2))
console.log(JSON.stringify(sidebar2))
export default {
    // app level config options
    lang: 'en-US',
    title: 'VitePress',
    description: 'Vite & Vue powered static site generator.',
    themeConfig: {
        sidebar: { '/': [sidebar2] }
        // sidebar: [
        //     { text: '指引', },
        //     { text: '指引', },
        //     { "text": "C:UsersAdministr", "collapsable": true, "sidebarDepth": 2, "items": [{ 'text': "5-network/12-server-sent-events/" }] }

    }
}