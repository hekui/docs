
# vue 组件
vue学习记录之组件，包括:

 - [什么是组件](#什么是组件)
 - [使用组件](#使用组件)
 - [组件之间数据传递](#组件之间数据传递)
 - [内容分发](#内容分发)
 - [动态组件](#动态组件)
 - [杂项](#杂项)

## 什么是组件
组件可以扩展 HTML 元素，封装可重用的代码。在较高层面上，组件是自定义元素， `Vue.js` 的编译器为它添加特殊功能。在有些情况下，组件也可以是原生 HTML 元素的形式，以 `is` 特性扩展。
## 使用组件
### 注册
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
### 局部注册

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
### DOM 模版解析说明

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

### data 必须是函数

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

## 组件之间数据传递
因为组件实例的作用域是**孤立的**。这意味着组件之间默认是**不能**互相调用对方的数据的。

组件通信分为：

 - 父组件 -> 子组件  (props)
 - 子组件 -> 父组件($emit)
 - 非父子组件之间的传递数据(bus,vuex)

### 使用Props传递数据

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

### 字面量语法 vs 动态语法

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

### Prop是单向数据流

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
### Prop 验证

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

### 子组件向父组件传值（$emit）

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


### 给组件绑定原生事件

有时候，你可能想在某个组件的根元素上监听一个原生事件。可以使用 `.native` 修饰 `v-on` 。例如：
```html
<my-component v-on:click.native="doTheThing"></my-component>
```

### 非父子组件通信

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

## 内容分发

为了让组件可以组合，我们需要一种方式来混合父组件的内容与子组件自己的模板。这个过程被称为 **内容分发**
### 编译作用域
在深入内容分发 API 之前，我们先明确内容的编译作用域。假定模板为：
```html
<child-component>
	{{ message }}
</child-component>
```
message 应该绑定到父组件的数据，还是绑定到子组件的数据？答案是父组件。组件作用域简单地说是：

父组件模板的内容在父组件作用域内编译；子组件模板的内容在子组件作用域内编译。

一个常见错误是试图在父组件模板内将一个指令绑定到子组件的属性/方法：
```html
<!-- 无效 -->
<child-component v-show="someChildProperty"></child-component>
```
假定 someChildProperty 是子组件的属性，上例不会如预期那样工作。父组件模板不应该知道子组件的状态。

如果要绑定子组件内的指令到一个组件的根节点，应当在它的模板内这么做：
```javascript
Vue.component('child-component', {
  // 有效，因为是在正确的作用域内
  template: '<div v-show="someChildProperty">Child</div>',
  data: function () {
    return {
      someChildProperty: true
    }
  }
})
```
类似地，分发内容是在父组件作用域内编译。

### 单个 Slot

除非子组件模板包含至少一个 `<slot>` 插口，否则父组件的内容将会被丢弃。当子组件模板只有一个没有属性的 `slot` 时，父组件整个内容片段将插入到 `slot` 所在的 `DOM` 位置，并替换掉 `slot` 标签本身。

最初在 `<slot>` 标签中的任何内容都被视为备用内容。备用内容在子组件的作用域内编译，并且只有在宿主元素为空，且没有要插入的内容时才显示备用内容。

假定 my-component 组件有下面模板：
```html
<div>
  <h2>I'm the child title</h2>
  <slot>
    如果没有分发内容则显示我。
  </slot>
</div>
```
父组件模版：
```html
<div>
  <h1>I'm the parent title</h1>
  <my-component>
    <p>This is some original content</p>
    <p>This is some more original content</p>
  </my-component>
</div>
```
渲染结果：
```html
<div>
  <h1>I'm the parent title</h1>
  <div>
    <h2>I'm the child title</h2>
    <p>This is some original content</p>
    <p>This is some more original content</p>
  </div>
</div>
```
### 具名Slots

`<slot>` 元素可以用一个特殊的属性 `name` 来配置如何分发内容。多个 `slot` 可以有不同的名字。具名 `slot` 将匹配内容片段中有对应 `slot` 特性的元素。

仍然可以有一个匿名 `slot` ，它是默认 `slot` ，作为找不到匹配的内容片段的备用插槽。如果没有默认的 `slot` ，这些找不到匹配的内容片段将被抛弃。

例如，假定我们有一个 `app-layout` 组件，它的模板为：
```html
<div class="container">
  <header>
    <slot name="header"></slot>
  </header>
  <main>
    <slot></slot>
  </main>
  <footer>
    <slot name="footer"></slot>
  </footer>
</div>
```
父组件模版：
```html
<app-layout>
  <h1 slot="header">Here might be a page title</h1>
  <p>A paragraph for the main content.</p>
  <p>And another one.</p>
  <p slot="footer">Here's some contact info</p>
</app-layout>
```
渲染结果为：
```html
<div class="container">
  <header>
    <h1>Here might be a page title</h1>
  </header>
  <main>
    <p>A paragraph for the main content.</p>
    <p>And another one.</p>
  </main>
  <footer>
    <p>Here's some contact info</p>
  </footer>
</div>
```
在组合组件时，内容分发 `API` 是非常有用的机制。

### 动态组件
多个组件可以使用同一个挂载点，然后动态地在它们之间切换。使用保留的 `<component>` 元素，动态地绑定到它的 `is` 特性：
```javascript
var vm = new Vue({
  el: '#example',
  data: {
    currentView: 'home'
  },
  components: {
    home: { /* ... */ },
    posts: { /* ... */ },
    archive: { /* ... */ }
  }
})
```
```HTML
<component v-bind:is="currentView">
  <!-- 组件在 vm.currentview 变化时改变！ -->
</component>
```
也可以直接绑定到组件对象上：
```javascript
var Home = {
  template: '<p>Welcome home!</p>'
}
var vm = new Vue({
  el: '#example',
  data: {
    currentView: Home
  }
})
```
#### keep-alive

如果把切换出去的组件保留在内存中，可以保留它的状态或避免重新渲染。为此可以添加一个 `keep-alive` 指令参数：
```html
<keep-alive>
  <component :is="currentView">
    <!-- 非活动组件将被缓存！ -->
  </component>
</keep-alive>
```
在[API参考](https://cn.vuejs.org/v2/api/#keep-alive)查看更多 `<keep-alive>` 的细节。

## 杂项
### 编写可复用组件
在编写组件时，记住是否要复用组件有好处。一次性组件跟其它组件紧密耦合没关系，但是可复用组件应当定义一个清晰的公开接口。

Vue 组件的 API 来自三部分 - props, events 和 slots ：

 - Props 允许外部环境传递数据给组件

 - Events 允许组件触发外部环境的副作用

 - Slots 允许外部环境将额外的内容组合在组件中。

使用 `v-bind` 和 `v-on` 的简写语法，模板的缩进清楚且简洁：
```html
<my-component
  :foo="baz"
  :bar="qux"
  @event-a="doThis"
  @event-b="doThat"
>
  <img slot="icon" src="...">
  <p slot="main-text">Hello!</p>
</my-component>
```
### 子组件索引

尽管有 `props` 和 `events` ，但是有时仍然需要在 `JavaScript` 中直接访问子组件。为此可以使用 `ref` 为子组件指定一个索引 `ID` 。例如：
```html
<div id="parent">
  <user-profile ref="profile"></user-profile>
</div>
```
```JavaScript
var parent = new Vue({ el: '#parent' })
// 访问子组件
var child = parent.$refs.profile
```
当 `ref` 和 `v-for` 一起使用时， `ref` 是一个数组或对象，包含相应的子组件。

`$refs` 只在组件渲染完成后才填充，并且它是非响应式的。它仅仅作为一个直接访问子组件的应急方案——应当避免在模版或计算属性中使用 `$refs` 。

### 异步组件

在大型应用中，我们可能需要将应用拆分为多个小模块，按需从服务器下载。为了让事情更简单， Vue.js 允许将组件定义为一个工厂函数，动态地解析组件的定义。Vue.js 只在组件需要渲染时触发工厂函数，并且把结果缓存起来，用于后面的再次渲染。例如：
```JavaScript
Vue.component('async-example', function (resolve, reject) {
  setTimeout(function () {
    resolve({
      template: '<div>I am async!</div>'
    })
  }, 1000)
})
```
工厂函数接收一个 `resolve` 回调，在收到从服务器下载的组件定义时调用。也可以调用 `reject(reason)` 指示加载失败。这里 `setTimeout` 只是为了演示。怎么获取组件完全由你决定。推荐配合使用 ：Webpack 的代码分割功能：
```JavaScript
Vue.component('async-webpack-example', function (resolve) {
  // 这个特殊的 require 语法告诉 webpack
  // 自动将编译后的代码分割成不同的块，
  // 这些块将通过 Ajax 请求自动下载。
  require(['./my-async-component'], resolve)
})
```
你可以使用 Webpack 2 + ES2015 的语法返回一个 `Promise` resolve 函数：
```JavaScript
Vue.component(
  'async-webpack-example',
  () => System.import('./my-async-component')
)
```
如果你是 Browserify 用户,可能就无法使用异步组件了,它的作者已经表明 Browserify 是不支持异步加载的。如果这个功能对你很重要，请使用 Webpack。

### 组件命名约定

当注册组件（或者 `props`）时，可以使用 `kebab-case` ，`camelCase` ，或 `TitleCase` 。Vue 不关心这个。
```JavaScript
// 在组件定义中
components: {
  // 使用 camelCase 形式注册
  'kebab-cased-component': { /* ... */ },
  'camelCasedComponent': { /* ... */ },
  'TitleCasedComponent': { /* ... */ }
}
```
在 HTML 模版中，请使用 `kebab-case` 形式：
```html
<!-- 在HTML模版中始终使用 kebab-case -->
<kebab-cased-component></kebab-cased-component>
<camel-cased-component></camel-cased-component>
<title-cased-component></title-cased-component>
```
当使用字符串模式时，可以不受 HTML 的 case-insensitive 限制。这意味实际上在模版中，你可以使用 `camelCase` 、 `PascalCase` 或者 `kebab-case` 来引用你的组件和 `prop`：
```html
<!-- 在字符串模版中可以用任何你喜欢的方式! -->
<my-component></my-component>
<myComponent></myComponent>
<MyComponent></MyComponent>
```
如果组件未经 `slot` 元素传递内容，你甚至可以在组件名后使用 / 使其自闭合：
```JavaScript
<my-component/>
```
当然，这只在字符串模版中有效。因为自闭的自定义元素是无效的 HTML ，浏览器原生的解析器也无法识别它。

### 递归组件

组件在它的模板内可以递归地调用自己，不过，只有当它有 `name` 选项时才可以：
```JavaScript
name: 'unique-name-of-my-component'
```
当你利用Vue.component全局注册了一个组件, 全局的ID作为组件的 `name` 选项，被自动设置.
```JavaScript
Vue.component('unique-name-of-my-component', {
  // ...
})
```
如果你不谨慎, 递归组件可能导致死循环:
```JavaScript
name: 'stack-overflow',
template: '<div><stack-overflow></stack-overflow></div>'
```
上面组件会导致一个错误 “max stack size exceeded” ，所以要确保递归调用有终止条件 (比如递归调用时使用 `v-if` 并让他最终返回 `false` )。

### 内联模版

如果子组件有 `inline-template` 特性，组件将把它的内容当作它的模板，而不是把它当作分发内容。这让模板更灵活。
```html
<my-component inline-template>
  <div>
    <p>These are compiled as the component's own template.</p>
    <p>Not parent's transclusion content.</p>
  </div>
</my-component>
```
但是 `inline-template` 让模板的作用域难以理解。最佳实践是使用 `template` 选项在组件内定义模板或者在 `.vue` 文件中使用 `template` 元素。

### X-Templates

另一种定义模版的方式是在 `JavaScript` 标签里使用 `text/x-template` 类型，并且指定一个id。例如：
```JavaScript
<script type="text/x-template" id="hello-world-template">
  <p>Hello hello hello</p>
</script>
```
```html
Vue.component('hello-world', {
  template: '#hello-world-template'
})
```
这在有很多模版或者小的应用中有用，否则应该避免使用，因为它将模版和组件的其他定义隔离了。

使用 `v-once` 的低级静态组件(Cheap Static Component)

尽管在 `Vue` 中渲染 HTML 很快，不过当组件中包含大量静态内容时，可以考虑使用 `v-once` 将渲染结果缓存起来，就像这样：
```JavaScript
Vue.component('terms-of-service', {
  template: '\
    <div v-once>\
      <h1>Terms of Service</h1>\
      ... a lot of static content ...\
    </div>\
  '
})
```

[回到顶部](#readme)
