
# vue 学习记录
vue学习记录

## vue组件
### 什么是组件
组件可以扩展 HTML 元素，封装可重用的代码。在较高层面上，组件是自定义元素， Vue.js 的编译器为它添加特殊功能。在有些情况下，组件也可以是原生 HTML 元素的形式，以 is 特性扩展。
###使用组件
注册一个全局组件，你可以使用 Vue.component(tagName, options)。 例如：

    Vue.component('my-component', {
    // 选项
    })
