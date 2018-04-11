# Mock.js
Mock.js 生成随机数据，拦截 Ajax 请求。让前端能独立于后端运行。更多介绍见：
- [官网](http://mockjs.com/)
- [开始(github wiki)](https://github.com/nuysoft/Mock/wiki/Getting-Started)
- [实战示例](#)

## 实战示例

假如我们项目中有ajax请求，此时后端还在开发，但是给出了数据接口文档：
```javascript
import axios from 'axios';
function getCategorys(){
    return axios.get('/product/categorys/');
}
```
假定接口文档格式如下：
```javascript
//我们将数据保存在：mock/category.json
{
    "message": "S",
    "status": "S",
    "list": [{
        "id": 15,
        "name": "基金"
    }]
}
//如果我们不修改该模板文件，也是可以直接使用的，只是数据是固定的。
//但也可以按照数据模板规范来写一些规则，返回随即数据，详见：https://github.com/nuysoft/Mock/wiki/Syntax-Specification
```
入口文件中引入我们自己写的规则文件：`mock/index.js`
```javascript
import Vue from 'vue';
....
import '../mock/';
```
`mock/index.js`文件内容：
```javascript
import Mock from 'mockjs';
//数据
import category from './category.json';//当前目录的test.json

//可选的
Mock.setup({
    timeout: '200-500' //设置响应的时间，200-500毫秒中随机（默认是10-100），若是单个数值，则表示固定时间。
})

//拦截列表，配置了该行，就能拦截所有的ajax请求了。
Mock.mock(/\product\/category/, category);
//参数1，正则可以匹配ajax请求中包含有以上请求路径的都拦截；如果使用字符串，则需要完整匹配
//参数2，响应的数据模板，可以是静态的json数据

```
