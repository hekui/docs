# 响应原理
## 响应式原理：
 - Object.defineProperty()
 - mutation observer

## 响应特性：
1. Vue不允许在已经创建的实例上动态添加新的根级响应式属性。
```javascript
var vm = new Vue({
	data: {
		a: 1,
		someObject: {
			a: 1
		}
	}
})
// `vm.a` 是响应的
vm.b = 2
// `vm.b` 是非响应的
```
1. 可以向嵌套的 **对象属性** 添加响应属性。
```javascript
Vue.set(vm.someObject, 'b', 2)
```
或者
```javascript
this.$set(this.someObject,'b',2)
```
1. 向已有对象上添加多个属性：

常见的方式是object.assign(),\_.extend(),......
但是在vue中这些方式添加的属性是非响应的。

需要使用：
```javascript
// 代替 `Object.assign(this.someObject, { a: 1, b: 2 })`
this.someObject = Object.assign({}, this.someObject, { a: 1, b: 2 })
```

 1. 根级声明空值

在根级声明空值的响应属性，在后续使用时再设置相应值。
```javascript
var vm = new Vue({
  data: {
    // 声明 message 为一个空值字符串
    message: ''
  },
  template: '<div>{{ message }}</div>'
})
// 之后设置 `message`
vm.message = 'Hello!'
```
如果你在 data 选项中未声明 `message`，Vue 将警告你渲染函数在试图访问的属性不存在。
 > 这样的限制在背后是有其技术原因的，它消除了在依赖项跟踪系统中的一类边界情况，也使 `Vue` 实例在类型检查系统的帮助下运行的更高效。而且在代码可维护性方面也有一点重要的考虑：`data` 对象就像组件状态的概要，提前声明所有的响应式属性，可以让组件代码在以后重新阅读或其他开发人员阅读时更易于被理解。


## 响应更新原理
vue是异步执行DOM更新的，在数据变化时，vue是不会立即将数据更新到DOM的，而是放入一个队列中（相同的watcher被多次触发时，只放一次进入队列）。在下一次执行‘tick’事件时，才会刷新队列并做DOM更新。
 > Vue 在内部尝试对异步队列使用原生的 `Promise.then` 和 `MutationObserver`，如果执行环境不支持，会采用 `setTimeout(fn, 0)` 代替。

但是vue提供了一个方法 `Vue.nextTick(callback)` ，让你可以在DOM更新完成后做点什么。例如：

```javascript
Vue.component('example', {
  template: '<span>{{ message }}</span>',
  data: function () {
    return {
      message: 'not updated'
    }
  },
  methods: {
    updateMessage: function () {
      this.message = 'updated'
      console.log(this.$el.textContent) // => '没有更新'
      this.$nextTick(function () {
        console.log(this.$el.textContent) // => '更新完成'
		//回调函数中的 this 是自动绑定到当前的 Vue 实例上的.
      })
    }
  }
})
```
