# vuex
- 介绍
- 核心
 - state
 - getters
 - mutations
 - actions
 - modules


## 核心

### mutations
`vuex`中更改`state`的唯一方法是commit mutation.  
每一个`mutation`都有对应的事件类型(type)和回调函数(handler)，回调函数即是事件的响应函数，它接收state作为第一个参数。  
mutation的handler是不能直接调用的，需要使用`store.commit`方法。
```javascript
const store = new Vuex.Store({
	state: {
		count: 0,
	},
	mutations: {
		increment: state => state.count++,
		incrementByParam: (state, n) => state.count += n,
		incrementByObject: (state, payload) => state.count += payload.newNumber,
	},
})

//调用mutation的方法
store.commit('increment');
//注意：在开发中我们更多的是使用组件式的开发，所以在另外的组件中是找不到store对象的。要使用:this.$store.commit('increment');

//提交载荷(payload)
this.$store.commit('incrementByParam', 10);
this.$store.commit('incrementByObject', {
	newNumber: 10,
})

//对象方式的提交
this.$store.commit({
	type: 'incrementByObject',
	newNumber: 10,
})


```
