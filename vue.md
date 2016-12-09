
# vue 组件
vue学习记录之组件，包括:

 - [什么是组件](#什么是组件)
 - [使用组件](#使用组件)
 - [组件之间数据传递](#组件之间数据传递)
 - 内容分发
 - 动态组件
 - 杂项

## 什么是组件
组件可以扩展 HTML 元素，封装可重用的代码。在较高层面上，组件是自定义元素， `Vue.js` 的编译器为它添加特殊功能。在有些情况下，组件也可以是原生 HTML 元素的形式，以 `is` 特性扩展。
##使用组件
###注册
注册一个全局组件，你可以使用 `Vue.component(tagName, options)` 。 例如：
```javascript
Vue.component('my-component', {
    // 选项
})
```
组件在注册之后，便可以在父实例的模块中以自定义元素 `<my-component></my-component>` 的形式使用。要确保在初始化根实例 **之前** 注册了组件。html：  
```html
<div id="example">
    <my-component></my-component>
</div>
```
JS:
```javascript
// 注册
Vue.component('my-component', {
  template: '<div>A custom component!</div>'
})

// 创建根实例
new Vue({
  el: '#example'
})
```
渲染为：
```html
<div id="example">
  <div>A custom component!</div>
</div>
```
###局部注册

不必在全局注册每个组件。通过使用组件实例选项注册，可以使组件仅在另一个实例/组件的作用域中可用：
```javascript
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
```
这种封装也适用于其它可注册的 Vue 功能，如指令。
###DOM 模版解析说明

当使用 DOM 作为模版时（例如，将 `el` 选项挂载到一个已存在的元素上）, 你会受到 HTML 的一些限制，因为 `Vue` 只有在浏览器解析和标准化 HTML 后才能获取模版内容。尤其像这些元素 `<ul>` ， `<ol>`， `<table>` ， `<select>` 限制了能被它包裹的元素， `<option>` 只能出现在其它元素内部。

在自定义组件中使用这些受限制的元素时会导致一些问题，例如：
```html
<table>
  <my-row>...</my-row>
</table>
```
自定义组件 `<my-row>` 被认为是无效的内容，因此在渲染的时候会导致错误。变通的方案是使用特殊的 is 属性：
```html
<table>
  <tr is="my-row"></tr>
</table>
```
应当注意，如果您使用来自以下来源之一的字符串模板，这些限制将不适用：

- `<script type="text/x-template">`
- JavaScript内联模版字符串
- `.vue` 组件

因此，有必要的话请使用字符串模版。

###data 必须是函数

使用组件时，大多数选项可以被传入到 `Vue` 构造器中，有一个例外： `data` 必须是函数。 
```javascript
Vue.component('my-component', {
  template: '<span>{{ message }}</span>',
  data: function(){
    return {
        message: 'hello'
      }
  }
})
```
如果这样：
```javascript
Vue.component('my-component', {
  template: '<span>{{ message }}</span>',
  data: {
    message: 'hello'
  }
})
```
`Vue` 会在控制台发出警告，告诉你在组件中 `data` 必须是一个函数。

##组件之间数据传递
因为组件实例的作用域是**孤立的**。这意味着组件之间默认是**不能**互相调用对方的数据的。

组件通信分为：

 - 父组件 -> 子组件  (props)
 - 子组件 -> 父组件($emit)
 - 非父子组件之间的传递数据(bus,vuex)
 
###使用Props传递数据

`prop` 是父组件用来传递数据的一个自定义属性。子组件需要显式地用 `props` 选项 声明 `“prop”`：
```javascript
Vue.component('child', {
  // 声明 props
  props: ['message'],
  // 就像 data 一样，prop 可以用在模板内
  // 同样也可以在 vm 实例中像 “this.message” 这样使用
  template: '<span>{{ message }}</span>'
})
```
然后在调用组件的地方，向它传入一个普通字符串：
```html
<child message="hello!"></child>
```
结果：

    hello!

**动态 Props**

也可以用 `v-bind` 动态绑定 `props` 的值。每当父组件的数据变化时，该变化也会传导给子组件：
```html
<div>
  <input v-model="parentMsg">
  <br>
  <child v-bind:my-message="parentMsg"></child>
</div>
```
使用 `v-bind` 的缩写语法通常更简单：
```html
<child :my-message="parentMsg"></child>
```
> **camelCase vs. kebab-case**
> 
> HTML 特性不区分大小写。当使用非字符串模版时，`prop` 的名字形式会从 `camelCase` 转为
> `kebab-case`（短横线隔开）：
> ```javascript
> Vue.component('child', {
>   // camelCase in JavaScript
>   props: ['myMessage'],
>   template: '<span>{{ myMessage }}</span>'
> }) 
> ```
> html (注意下面是 `my-message` )
> ```html
> <!-- kebab-case in HTML -->
> <child my-message="hello!"></child>
> ```
>再次说明，如果你使用字符串模版，不用在意这些限制。

###字面量语法 vs 动态语法

当使用字面量语法传递数值：
```html
<!-- 传递了一个字符串"1" -->
<child some-prop="1"></child>
```
那么子组件中获取到的值是 `string` 类型。

因为它是一个字面 `prop` ，它的值以字符串 `"1"` 而不是以实际的数字传下去。
如果想传递一个实际的 JavaScript 数字，需要使用 `v-bind` ，从而让它的值被当作 `JavaScript` 表达式计算：
```html
<!-- 传递实际的数字 -->
<child v-bind:some-prop="1"></child>
```
这样在子组件中获取到的值就是 `number` 类型。

###Prop是单向数据流

`prop` 是单向绑定的：当父组件的属性变化时，将传导给子组件，但是不会反过来。这是为了防止子组件无意修改了父组件的状态——这会让应用的数据流难以理解。

另外，每次父组件更新时，子组件的所有 `prop` 都会更新为最新值。这意味着你不应该在子组件内部改变 `prop` 。如果你这么做了，`Vue` 会在控制台给出警告。

通常有两种改变 `prop` 的情况：

 - `prop` 作为初始值传入，子组件之后只是将它的初始值作为本地数据的初始值使用；
 - `prop` 作为需要被转变的原始值传入。

更确切的说这两种情况是：

定义一个局部 data 属性，并将 prop 的初始值作为局部数据的初始值。
```javascript
props: ['initialCounter'],
data: function () {
  return { counter: this.initialCounter }
}
```
定义一个 computed 属性，此属性从 prop 的值计算得出。
```javascript
props: ['size'],
computed: {
  normalizedSize: function () {
    return this.size.trim().toLowerCase()
  }
}
```
###Prop 验证

组件可以为 `props` 指定验证要求。如果未指定验证要求，`Vue` 会发出警告。当组件给其他人使用时这很有用。

`prop` 是一个对象而不是字符串数组时，它包含验证要求：
```javascript
Vue.component('example', {
  props: {
    // 基础类型检测 （`null` 意思是任何类型都可以）
    propA: Number,
    // 多种类型
    propB: [String, Number],
    // 必传且是字符串
    propC: {
      type: String,
      required: true
    },
    // 数字，有默认值
    propD: {
      type: Number,
      default: 100
    },
    // 数组／对象的默认值应当由一个工厂函数返回
    propE: {
      type: Object,
      default: function () {
        return { message: 'hello' }
      }
    },
    // 自定义验证函数
    propF: {
      validator: function (value) {
        return value > 10
      }
    }
  }
})
```
`type` 可以是下面原生构造器：

 - String
 - Number
 - Boolean
 - Function
 - Object
 - Array
 
`type` 也可以是一个自定义构造器，使用 `instanceof` 检测。

当 `prop` 验证失败了， `Vue` 将拒绝在子组件上设置此值，*开发版本会抛出一条警告*。

###子组件向父组件传值（$emit）

> 每个 `Vue` 实例都实现了事件接口(Events interface)，即：
> 
>  - 使用 `$on(eventName)` 监听事件
>  - 使用 `$emit(eventName)` 触发事件

父组件可以在使用子组件的地方直接用 `v-on` 来监听子组件触发的事件。

下面是一个例子：
```html
<div id="counter-event-example">
  <p>{{ total }}</p>
  <button-counter v-on:increment="incrementTotal"></button-counter>
  <button-counter v-on:increment="incrementTotal"></button-counter>
</div>
```
```javascript
Vue.component('button-counter', {
  template: '<button v-on:click="increment">{{ counter }}</button>',
  data: function () {
    return {
      counter: 0
    }
  },
  methods: {
    increment: function () {
      this.counter += 1
      this.$emit('increment')
    }
  },
})
new Vue({
  el: '#counter-event-example',
  data: {
    total: 0
  },
  methods: {
    incrementTotal: function () {
      this.total += 1
    }
  }
})
```
效果参见：[https://cn.vuejs.org/v2/guide/components.html#自定义事件][url-emit]

[url-emit]: https://cn.vuejs.org/v2/guide/components.html#%E8%87%AA%E5%AE%9A%E4%B9%89%E4%BA%8B%E4%BB%B6

> vm.$on( event, callback )

>  - 参数：
>   - {string} event
>   - {Function} callback

> vm.$emit( event, […args] )

>  - 参数：
>   - {string} event
>   - [...args]


###给组件绑定原生事件

有时候，你可能想在某个组件的根元素上监听一个原生事件。可以使用 `.native` 修饰 `v-on` 。例如：
```html
<my-component v-on:click.native="doTheThing"></my-component>
```

###非父子组件通信

有时候非父子关系的组件也需要通信。在简单的场景下，使用一个空的 `Vue` 实例作为中央事件总线：
```javascript
var bus = new Vue();

// 触发组件 A 中的事件
bus.$emit('id-selected', 1)

// 在组件 B 创建的钩子中监听事件
bus.$on('id-selected', function (id) {
  // ...
})
```
在更多复杂的情况下，考虑使用专门的 **状态管理模式**，比如：vuex。

未完待续。。。

[回到顶部](#readme)
