# 前端学习资源整理

## 代码在线调试平台：
- [runjs](http://runjs.cn/)（开源中国旗下的，**国内打开速度快**）
- [Codepen](http://codepen.io/) (全世界最受欢迎的代码调试平台，支持sass,less,coffeescript等等)  
- 其他：[jsFiddle](https://jsfiddle.net/)，[jsBin](http://jsbin.com/)。

## CSS
- [CSS3参考手册](http://www.css88.com/book/css/)

CSS预处理器:  
- [stylus](http://www.zhangxinxu.com/jq/stylus)
- [sass](http://www.sass.hk/)
- [less中文网](http://lesscss.cn/)

CSS后处理器：  
- [postcss(英文官网)](http://postcss.org/)  
有一个非常好用的插件：[autoprefixer](https://github.com/postcss/autoprefixer)，用来向css添加浏览器前缀（`-webkit-`,`-moz-`,`-o-`,`-ms-`等），使用的是[Can I Use](http://caniuse.com/)的数据来决定哪些前缀是需要的。

## 字体
网页中图标系统：  

SVG:  
使用svg替代icon font的[理由](http://www.jianshu.com/p/fb3ce4b9c765)。  

- [svg-icon](https://leungwensen.github.io/svg-icon)，将icon转为svg，支持很多流行的iconfont，可以在线选择`SVG sprite`文件下载。

Icon Font:  
自己制作iconfont的方法见：[图标绘制](http://www.iconfont.cn/plus/help/detail?helptype=draw)。  

- [font awesome 官网](http://fontawesome.io/)，完美的图标字体，[中文介绍](http://www.bootcss.com/p/font-awesome/)。
- [Iconfont-阿里巴巴矢量图标库](http://www.iconfont.cn/)，国内功能很强大且图标内容很丰富的矢量图标库。
- [Icon Moon](https://icomoon.io/)，像素级图标完美解决方案。

中文字体处理:  

- [font-spirder 字蛛](http://font-spider.org/)，只引入网页中使用到的文字。(可惜的是目前还没有`webpack`插件)  
- [font min](http://ecomfe.github.io/fontmin/)，第一个纯 JavaScript 字体子集化方案。

## JS教程
- 廖雪峰：[JavaScript教程](http://www.liaoxuefeng.com/wiki/001434446689867b27157e896e74d51a89c25cc8b43bdb3000)（推荐这个，可在线写代码练习及答案验证。）
- 阮一峰：[JavaScript 标准参考教程（alpha）](http://javascript.ruanyifeng.com/)


## ES6教程
- 阮一峰：[ECMAScript 6 入门](http://es6.ruanyifeng.com/)

## 数据交互
 - [axios](https://github.com/mzabriskie/axios)，支持并发请求。
 - [superagent](https://github.com/visionmedia/superagent)，同时支持node平台和浏览器端。
 - [http-proxy-middleware](https://github.com/chimurai/http-proxy-middleware)，node跨域代理插件

## Vue.js 生态
- [vue官网](https://vuejs.org/)
- [vue-router](https://router.vuejs.org/)
- [vuex](https://vuex.vuejs.org/)
- [axios](https://github.com/mzabriskie/axios)
- [vue 模板](https://github.com/vuejs-templates) `vue-cli` 快速开始
  - [webpack](https://github.com/vuejs-templates/webpack)

- element部分：
  - [element-ui 官网](http://element.eleme.io/#/zh-CN)
  - [github 源码](https://github.com/ElemeFE/element)
  - [async-validator](https://github.com/yiminghe/async-validator) `form`表单验证插件

## Git教程
- 廖雪峰：[Git教程](http://www.liaoxuefeng.com/wiki/0013739516305929606dd18361248578c67b8067c8c017b000)

## 前端工程化

#### Webpack
- [官网](https://webpack.js.org/)，[官网-中文文档](https://doc.webpack-china.org)
- [awesome-webpack-cn](https://github.com/webpack-china/awesome-webpack-cn)，webpack优秀中文文章
- [Webpack 2 中文文档](http://www.css88.com/doc/webpack2/)

## 前端数据模拟
Mock.js 生成随机数据，拦截 Ajax 请求。让前端能独立于后端运行。
- [官网](http://mockjs.com/)
- [开始(github wiki)](https://github.com/nuysoft/Mock/wiki/Getting-Started)
- [实战示例](./mock.md)

## 工具类
- [Chrome 开发者工具](http://www.css88.com/doc/chrome-devtools/)
- [Can I Use](http://caniuse.com/)（检测各浏览器对HTML5、CSS3的兼容性支持情况。还可以在cmd中实现，[详见这里](http://div.io/topic/1174)。）


## Node教程
- [Node.js 中文网文档](http://nodejs.cn/api/)(英文不好的同学的福音)
- 阮一峰：[Node.js](http://javascript.ruanyifeng.com/nodejs/basic.html)(这个也是中文的)

## [微信周边](./weixin/index.md)

#### 公众号开发
**公众号开发必知**  
以下引用自：[微信公众平台开发概述](https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1445241432)  
> 为了识别用户，每个用户针对每个公众号会产生一个安全的OpenID，如果需要在多公众号、移动应用之间做用户共通，则需前往微信开放平台，将这些公众号和应用绑定到一个开放平台账号下，绑定后，一个用户虽然对多个公众号和应用有多个不同的OpenID，但他对所有这些同一开放平台账号下的公众号和应用，只有一个UnionID，可以在用户管理-获取用户基本信息（UnionID机制）文档了解详情。


#### 微信小程序
- [官方开发文档](https://developers.weixin.qq.com/miniprogram/dev/)
- [在小程序中使用iconfont](./weixin/mp/iconfont.md)，将iconfont转换为base64，实现可在小程序中使用iconfont。

## Python教程
- 廖雪峰：[Python教程](http://www.liaoxuefeng.com/wiki/0014316089557264a6b348958f449949df42a6d3a2e542c000)
