# Express 和 Koa 的区别

## 异步流程控制
Express 采用 callback 来处理异步，而Koa v2 采用 async/await (Koa v1 采用 generator)。  
generator 和 async/await 使用同步的写法来处理异步，明显好于 callback 和 promise，async/await 在语义化上又要比 generator 更强。  

## 错误处理
Express 使用 callback 捕获异常，对于深层次的异常捕获不了，
Koa 使用 try catch，能更好地解决异常捕获。

## 优缺点
Express 的优点是线性逻辑：路由和中间件完美融合，通过中间件形式把业务逻辑细分，简化，一个请求进来经过一系列中间件处理后再响应给用户，再复杂的业务也是线性了，清晰明了。