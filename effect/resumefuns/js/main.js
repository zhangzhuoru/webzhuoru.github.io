let result = `/* 
 * 只用文字作做自我介绍太单调了
 * 我就用代码来介绍吧
 * 首先准备一些样式
 */

/* 首先给所有元素加上过渡效果 */
* {
  transition: all .3s;
}

/* 白色背景太单调了，我们来点背景 */
html {
  background: rgb(0, 43, 54);
  color: #fff; 
}

/* 我需要一点代码高亮 */
.token.selector { 
  color: #f35656; 
}
.token.property { 
  color: #f0da5e; 
}
.token.comment {
  color: #cccccc;
}

/* 文字离边框太近了 */
#code {
  padding: 1vw;
  border: 1px solid #aaa;
  margin: 0.5vw;
  overflow: auto;
  width: 99vw; 
  height: 49vh;
  box-sizing: border-box;
}
/*
 *再让代码来换一下位置
 */
#code {
  -webkit-transform: translateY(50vh);
  position: absolute;
}

`
let result2 = `/* 
 * 接下来正式开始 
 * 我给自己准备一个编辑器
 */
#paper {
  position: fixed;
  left: 0;
  top: 0;
  width: 99vw;
  height: 49vh;
  box-sizing: border-box;
  background: white;
  padding: 1vw;
  margin: 0.5vw;
  color: #222;
  overflow: auto;
}
/* 好了，我开始写简历了 */


`
let result3 = `/* 
 * 这个介绍好像差点什么
 * 对了，这是 Markdown 格式的，格式需要变成对 HR 更友好
 * 简单，用开源工具翻译成 HTML 就行了
 */


`
let result4 = `/* 再对 HTML 加点样式 */
#paper {
  padding: 2em;
}
#paper h2 {
  display: inline-block;
  border-bottom: 1px solid;
  margin: 1em 0 .5em;
}
#paper ul,#paper ol {
  list-style: none;
}
#paper ul> li::before {
  content: '•';
  margin-right: .5em;
}
#paper ol {
  counter-reset: section;
}
#paper ol li::before {
  counter-increment: section;
  content: counter(section) ". ";
  margin-right: .5em;
}
/*
 * 这就是我的简历
 * 谢谢观看
 */
`
let md = `
## 自我介绍
我叫 张卓如，是一名1995年的 前端开发工程师


## 技能介绍
- 精通使用H5+CSS3对页面进行布局(成功的页面仔)。
- 熟悉使用原生JavaScript、ES6、TS。
- 熟练使用Vue全家桶进行搭建项目。
- 了解 微信小程序 和React 开发框架，能根据开发文档编写项目。



## 联系方式
- 手机: 17765603009
- 邮箱: 2276839311@qq.com
- 博客: https://webzhuoru.github.io/
- GitHub: https://gitee.com/zhangzhuoru

`

writeCode('', result, () => {
  createPaper(() => {
    writeCode(result, result2, () => {
      writeMarkdown(md, () => {
        writeCode(result + result2, result3, () => {
          convertMarkdownToHtml(() => {
            writeCode(result + result2 + result3, result4)
          })
        })
      })
    })
  })
})

function writeCode(prefix, code, fn) {
  let domCode = document.querySelector('#code')
  let n = 0
  let timer = setInterval(() => {
    n += 1
    domCode.innerHTML = Prism.highlight(prefix + code.substring(0, n), Prism.languages.css, 'css')
    styleTag.innerHTML = prefix + code.substring(0, n)
    domCode.scrollTop = domCode.scrollHeight
    if (n >= code.length) {
      console.log('code',code,code.length)
      window.clearInterval(timer)
      if(code.length==420){
        let domPaper = document.querySelector('#paper')
        domCode.classList.add('goon');
        domPaper.classList.add('showit');
      }else{
        fn.call()
      }
    }
  }, 60)
}

function createPaper(fn) {
  let paper = document.createElement('pre')
  paper.id = 'paper'
  document.body.appendChild(paper)
  fn.call()
}

function writeMarkdown(markdown, fn) {
  let domPaper = document.querySelector('#paper')
  let n = 0
  let timer = setInterval(() => {
    n += 1
    domPaper.innerHTML = markdown.substring(0, n)
    domPaper.scrollTop = domPaper.scrollHeight
    if (n >= markdown.length) {
      window.clearInterval(timer)
      fn.call()
    }
  }, 60)
}

function convertMarkdownToHtml(fn) {
  let div = document.createElement('div')  
  div.className = 'html markdown-body'
  div.innerHTML = marked(md)
  let markdownContainer = document.querySelector('#paper')
  markdownContainer.replaceWith(div)
  div.id = 'paper'
  fn.call()
}