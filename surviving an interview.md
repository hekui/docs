# 前端必备知识总结

本系列不包含以下部分知识：  
jquery.js  
require.js/sea.js  
IE6相关兼容问题及hack方法

你应该知道的一些关键词：  
ES6、polyfill、babel、npm、nodejs、  
模块系统、组件化、数据驱动视图  
工程化、express  

### 基础部分
 - DOM结构--两个节点之间有哪些关系，怎么找到他们他们？
 - DOM操作--创建、添加、移除、移动、复制、查找。
 - 事件--怎样使用事件以及IE和DOM事件模型之间存在哪些主要差别。
 - 盒模型--标准盒模型以及与IE8以下版本的盒模型区别。  

 W3C标准盒模型：范围包括 `margin`、`border`、`padding`、`content`，并且 `content` 部分不包含其他部分。即最终元素呈现的宽度为：border+padding+content width(=width)；高度同理。  
 IE8 以下盒模型：范围包括 `margin`、`border`、`padding`、`content`，和标准 W3C 盒子模型不同的是：`content` 部分包含了 `border` 和 `pading`。即最终元素呈现的宽度为 `width`。  
 详见 [盒模型及IE8以下的区别](https://segmentfault.com/q/1010000005057015)
 - XMLHttpRequest--这是什么、怎样完整地执行一次get请求、怎样检测错误。

 - HTML/XHTML/HTML5的区别。  

 在HTML的早期发展中，W3C成立之前，很多标准的制定都是在浏览器的开发者们互相讨论的情况下完成的，比如HTML 2.0, 3.2直到4.0, 4.01，这些标准大部分都是所谓的retro-spec，即先有实现后有标准。在这种情况下，HTML标准不是很规范，浏览器也对HTML页面中的错误相当宽容。这反过来又导致了HTML作者写出了大量的含有错误的HTML页面。  
 W3C随后意识到了这个问题，并认为这是互联网的一个基础性问题，应该加以解决。为了规范HTML，W3C结合XML制定了XHTML 1.0标准，这个标准没有增加任何新的tag，只是按照XML的要求来规范HTML。  
 HTML4是目前互联网上使用最广泛的标准，成于1999年左右。  
 XHTML是**更严谨更纯净的 `HTML` 版本**。于2000年的1月26日成为 W3C 标准。  
 最主要的不同：  
  - XHTML 元素必须被正确地嵌套。
  - XHTML 元素必须被关闭。
  - 标签名必须用小写字母。
  - XHTML 文档必须拥有根元素。  

 HTML5已经远远超越了标记语言的范畴，其背后是一组技术集。
  - 最基本的就是更富语义的标签，以便更好的被机器识别；
  - Canvas+WEBGL等技术，实现无插件的动画以及图像、图形处理能力；
  - 本地存储，可实现offline应用；
  - websocket，一改http的纯pull模型，实现数据推送的梦想；
  - MathML，SVG等，支持更加丰富的render；  

 详见知乎：[HTML4，HTML5，XHTML 之间有什么区别？](https://www.zhihu.com/question/19818208)
 - 线程与进程的区别
 - 语义化--对语义化的理解
 - 页面优化--
 - FOUC--是什么，如何避免？

 FOUC(Flash of Unstyled Content)--无样式内容闪烁，导致原因如下：  
  - 使用 `import` 方法引用CSS  
  IE会先加载整个HTML文档的DOM，然后再去导入外部CSS文件，因此，在页面DOM加载完成到CSS导入完成中间会有一段时间页面上的内容是没有样式的。
  - 将样式表放在DOM结构之后加载（比如底部）  
  其实就是当样式表晚于HTML DOM加载，当加载到此样式表时，页面将停止之前的渲染。此样式表被下载和解析后，将重新渲染页面，也就出现了短暂的花屏现象。

 解决方法：在HEAD中使用LINK标签引入样式。
 - 元素浮动

## CSS
 - 书写CSS样式时需要考虑：
  - 样式是从右向左的解析一个选择器
  - ID最快，Universal最慢，解析速度：ID>class>tag>universal(通配符：\*)  
  - 别在ID和class前加tag；比如不要用div#footer{},ID已经是唯一的，不需要tag来标识，这样做会让选择器更慢。
  - 避免多级后代选择器，比如：html body ul li a{}是非常低效的。

 - display:flex--这是一个很复杂的新属性。
 - web fonts
 - less--是什么，以及预处理器的优缺点。

### JS篇
 - 闭包
 - 作用域链
 - this  
 在ES6之前，this永远指向函数运行时所在的对象，而不是函数被创建时所在的对象。在ES6之后，出现了一个箭头函数(=>)，在箭头函数中的this是词法作用域，由上下文确定。也就是指向外层调用者。  
 因此，用call()或者apply()调用箭头函数时，无法对this进行绑定，即传入的第一个参数被忽略：

 - 模块化开发  
  - [exports与module.exports的区别](./exports module_exports.md)
 - 同源策略
 同源策略是一个很重要的安全理念。同源策略规定跨域之间的脚本是隔离的，一个域的脚本不能访问和操作另外一个域的绝大部分属性和方法。

### 浏览器篇
 - HTTP  
  - URI和URL的区别  
  URI(uniform resource identifier)--统一资源标识符，用于标识某一互联网资源；是一个字符串格式规范，并没有指定它的用途  
  URL(uniform resource locator)--统一资源定位符，表示资源的地点；是资源定位的规范  
  URL是URI的一个子集。URI是个纯粹的句法结构，用于指定标识Web资源的字符串的各个不同部分。URL是URI的一个特例，它包含了定位Web资源的足够信息。其他URI，比如：
  ```javascript
  mailto:name@hostname.com
  ```
  则不属于定位符，因为根据该标识符无法定位任何资源。  
  - 页面加载流程  
  chrome://net-internals/#dns
 - 页面加载及渲染流程详解

 - 浏览器缓存
 - 本地存储
 - History对象  
  详见：[History对象](./history.md)
 - 开发者工具
 - websocket  
 详见知乎：[WebSocket 是什么原理？为什么可以实现持久连接？](https://www.zhihu.com/question/20215561/answer/40316953)

### ES6篇
babel转化、箭头函数、Generator函数

### 前端工程化/工具篇
nodejs、webpack、gulp、less、express

### 前端库/框架
vue.js、react.js、angular.js
