# Mock.js

2020.5.20 更新：

由于 [`mockjs`](http://mockjs.com/) 几乎已经停止维护，改用 [`better-mock`](http://lavyun.gitee.io/better-mock/) ，原因如下：
1. 100% 兼容 `Mock.js`。
2. 使用 `typescript` 进行重构，更好的代码提示。
3. 更新维护
4. 支持主流小程序（微信、支付宝、头条、百度）。   

2020.5.20 更新完。

---

`Mock.js` 生成随机数据，拦截 `Ajax` 请求。让前端能独立于后端运行。更多介绍见：
- [官网](http://mockjs.com/)
- [开始(github wiki)](https://github.com/nuysoft/Mock/wiki/Getting-Started)
- [实战示例](#实战示例)
- [小程序 + graphql](#小程序\ +\ graphql)


## 实战示例
请求访问：
```javascript
import axios from 'axios'
function getCategorys(){
    return axios.get('/product/category/')
}
```
假定接口文档格式如下：
```javascript
// 我们将数据保存在：mock/modules/category.json
{
    "message": "S",
    "status": "S",
    "list": [{
        "id": 15,
        "name": "基金"
    }]
}
// 如果我们不修改该模板文件，也是可以直接使用的，只是数据是固定的。
// 但也可以按照数据模板规范来写一些规则，返回随即数据，详见：https://github.com/nuysoft/Mock/wiki/Syntax-Specification
```
入口文件中引入我们自己写的规则文件：`mock/index.js`
```javascript
import Vue from 'vue';
....
import '../mock/';
```
`mock/index.js`文件内容：
```javascript
import Mock from 'mockjs'
// 数据
import category from './modules/category.json'

// 可选的
Mock.setup({
    timeout: '200-500' // 设置响应的时间，200-500毫秒中随机（默认是10-100），若是单个数值，则表示固定时间。
})

// 拦截列表，配置了该行，就能拦截所有的ajax请求了。
Mock.mock(/\/product\/category/, category)
// 参数1，正则可以匹配ajax请求中包含有以上请求路径的都拦截；如果使用字符串，则需要完整匹配
// 参数2，响应的数据模板，可以是静态的json数据

```

## 小程序 + graphql
以下是 `小程序` + `graphql` 示例，  
注：需要在 `graphql` 请求中指明 `operationName`。

```javascript
import Mock from 'better-mock/dist/mock.mp.js'

import orderList from './modules/my-order.json'
import orderDetail from './modules/my-order-detail.json'

const Dict = {
  orderList,
  orderDetail,
}

Mock.setup({
  timeout: '200-500' // 设置响应的时间，200-500毫秒中随机（默认是10-100），若是单个数值，则表示固定时间。
})

// 拦截列表，需要在请求中指明 operationName
Mock.mock(/\/api\/graphql/, (options) => {
  const body = JSON.parse(options.body)
  return Dict[body.operationName]
})

```
