# Decorator 装饰器
[tslang.cn 装饰器](https://www.tslang.cn/docs/handbook/decorators.html)
### 什么是装饰器模式？
装饰器模式能够在不改变对象自身的基础上，在程序运行期间给对像动态的添加职责；  
装饰器仅仅包装现有的模块，使之 “更加华丽” ，并不会影响原有的功能；并且装饰器模式与继承相比，是一种更轻便灵活的做法。

装饰器模式的主要作用就是面向切面编程，增加一种解耦的角度，解决只用继承增加额外职责导致子类膨胀的问题。它的常用场景有且不局限于：

- 注入参数（提供默认参数，生成参数）
- 预处理／后处理（配置上下文什么的）
- 记录函数行为（日志、缓存、计时、性能测试、事务处理什么的）

启用装饰器  
装饰器目前还是实验性的特性，需要手动启用：
```javascript
// tsconfig.json
{
  "compilerOptions": {
    "target": "ES5",
    "experimentalDecorators": true
  }
}
```
装饰器使用 `@expression` 这种形式，`expression` 求值后必须为一个函数，它会在运行时被调用，被装饰的声明信息做为参数传入。
```javascript
function autoLog(params:any) {
  console.log(params) // class HttpClient
}
@autoLog
class HttpClient {
  constructor() {

  }
}
```
装饰器工厂
```javascript
function autoLog(params:any) {
  console.log(params) // https://github.com/
  return function(target:any) {
    console.log(target) // class HttpClient
    target.prototype.url = params // 扩展一个 url 属性
  }
}
@autoLog('https://github.com/')
class HttpClient {
  constructor() { }
}
let http:any = new HttpClient()
console.log(http.url) // https://github.com/
```