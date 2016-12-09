
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

组件在注册之后，便可以在父实例的模块中以自定义元素 `<my-component></my-component>` 的形式使用。要确保在初始化根实例 **之前** 注册了组件。html：  

    <div id="example">
        <my-component></my-component>
    </div>
JS:  

    // 注册
    Vue.component('my-component', {
      template: '<div>A custom component!</div>'
    })
    // 创建根实例
    new Vue({
      el: '#example'
    })
渲染为：

    <div id="example">
      <div>A custom component!</div>
    </div>
    
###局部注册

不必在全局注册每个组件。通过使用组件实例选项注册，可以使组件仅在另一个实例/组件的作用域中可用：

    var Child = {
      template: '<div>A custom component!</div>'
    }

    new Vue({
      // ...
      components: {
        // <my-component> 将只在父模板可用
        'my-component': Child
      }
    })
这种封装也适用于其它可注册的 Vue 功能，如指令。
