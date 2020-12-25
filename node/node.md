# node 的一些点

### 每个`node`文件都有一个自己的`IIFE`
IIFF 将传递给您的代码以下五个参数：`exports` ，`require`，`module`，`__filename` 和 `__dirname`。  (参考：[Node.js 十问](https://zhuanlan.zhihu.com/p/29650110))


1.  每个 `node` 文件都有一个自己的 `IIFE` （立即执行函数表达式），在 `Node` 文件中声明的所有变量都被限定在 `IIFE` 中，所以并非全局变量。  

```javascript
// module1.js
var g = 42;
```
如果在 module2 require module1 并尝试访问变量 g，你会得到 g is not defined 的错误。

```javascript
// script.js
console.log(arguments);
```
以上代码输出如下：  
![](images/node-module-arguments.jpg)
2.  `exports` ， `require` 和 `module` 这些对象都可以在每个文件中全局可用，但在每个文件中都是不同的。  
