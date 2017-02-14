
# Vue介绍
Vue学习记录之入门介绍,官方文档:
 - [指南](https://cn.vuejs.org/v2/guide/)
 - [API](https://cn.vuejs.org/v2/api/)
 - [示例](https://cn.vuejs.org/v2/examples/)

在线调试平台：
[jsfiddle](https://jsfiddle.net/chrisvfritz/50wL7mdz/)

## Vue 是什么
Vue.js（读音 /vjuː/, 类似于 **view**） 是一套构建用户界面的 **渐进式框架**。

与其他重量级框架不同的是，Vue 采用自底向上增量开发的设计。Vue 的核心库只关注视图层，并且非常容易学习，非常容易与其它库或已有项目整合。另一方面，Vue 完全有能力驱动采用**单文件组件**和**Vue生态系统支持的库**开发的复杂单页应用。

Vue.js 的目标是通过尽可能简单的 API 实现**响应的数据绑定**和**组合的视图组件**。

## Vue.js 技术栈


Vue.js Vue-cli Vue-router Vuex

es6  babel

webpack fis3

NPM

## 示例：
html:
```html
<div id="app">
  {{ message }}
  <p v-text="meassage"></p>
  <p v-if='show'>I am here!</p>
</div>
<script src="https://unpkg.com/vue/dist/vue.js"></script>
```

js:
```javascript
var vm = new Vue({
  el: '#app',
  data: {
    message: 'Hello Vue!',
	show: true
  }
  ...//选项
})
```
## 选项：

以下摘取的是 **选项** 部分，其他还有 **全局配置** 、 **全局API** 、**Vue实例相关的属性/数据/事件/生命周期** 、**特殊元素** 、**内置组件** 等。[详细参见官方API](https://cn.vuejs.org/v2/api/)

 - 选项 / DOM
  - el
  - template
  - render		
 - 选项 / 数据
  - data
  - props
  - propsData
  - computed
  - methods
  - watch
 - 选项 / 生命周期钩子
  - beforeCreate
  - created
  - beforeMount
  - mounted
  - beforeUpdate
  - updated
  - activated
  - deactivated
  - beforeDestroy
  - destroyed
 - 选项 / 资源
  - directives
  - filters
  - components
 - 选项 / 杂项
  - parent
  - mixins
  - name
  - extends
  - delimiters
  - functional

## 指令
 - v-text
 - v-html
 - v-if
 - v-show
 - v-else
 - v-for
 - v-on 		//可简写，比如 v-on:click='' 	=> 	@click=''
 - v-bind		//可简写，比如 v-bind:title='' 	=> 	:title=''
 - v-model
 - v-pre
 - v-cloak
 - v-once


## 核心原理：
 - object.defineProperty
setter,getter
 - MutationObserver
 ```javascript
var observer = new MutationObserver(callback);
observer.observe(textNode, {
	characterData: true
});
```
 **参数**：
  - childList：子元素的变动
  - attributes：属性的变动
  - characterData：节点内容或节点文本的变动
  - subtree：所有下属节点（包括子节点和子节点的子节点）的变动
