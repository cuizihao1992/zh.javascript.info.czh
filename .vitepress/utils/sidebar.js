const fs = require("fs");
const path = require("path");
// 需要排除的一些目录
let unDirIncludes = ['node_modules', 'script']
// 只需要处理后缀的文件类型
let SuffixIncludes = ['md', 'html']
//使用方法生生成侧边栏
// 侧边栏
let docsPath = path.dirname(path.join(__dirname, '../')); // docs 目录路径

function parseUnit(docsPath, link = '/', index = 0) {
  const basename = path.basename(docsPath);
  const items = []
  const unit = {
    text: basename,
    collapsed: index > 2 ? false : true
  }
  const files = fs.readdirSync(docsPath);
  if (files.includes('index.md')) {
    unit.link = link;
  }
  files.forEach((filename) => {
    if (filename.startsWith(".") || unDirIncludes.includes(filename)) return;

    const filepath = path.join(docsPath, filename);
    const stat = fs.statSync(filepath);

    if (stat.isDirectory()) {
      const item = parseUnit(filepath, `${link}${filename}/`, index + 1)
      if (!unit.items) {
        unit.items = [];
      }
      if (typeof item.link !== 'undefined' || item.items) {
        unit.items.push(item)
      }
    } else {
      const extname = path.extname(filepath);
      const basename = path.basename(filepath, extname);
      if (extname === ".md") {
        const menuPath = path.dirname(filepath);
        const menuName = path.basename(menuPath)
        const item = {};
        if (filename === 'index.md') {
          item.text = menuName;
          item.link = link;
        } else {
          if (filename === 'article.md' || filename === 'task.md') {
            item.text = menuName;
          } else {
            item.text = basename;
          }
          item.link = `${link}${basename}`
          if (!unit.items) {
            unit.items = [];
          }
          unit.items.push(item)
        }

      }
    }
  })
  return unit;
}

module.exports = parseUnit(docsPath)
