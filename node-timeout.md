# nodejs 请求自动超时

> 开发nodejs应用时，不知道会有多少次忘记调用回调函数，导致请求一直卡在哪里转圈，于是便开始思考是否有一种自动超时机制，例如 5S 如果仍没有响应，返回客户端503  

github [connect-timeout](https://github.com/expressjs/timeout)

1. 安装 `connect-timeout` 
```javascript
npm install connect-timeout --save
```

2. 使用
```javascript
var bodyParser = require('body-parser')
var cookieParser = require('cookie-parser')
var express = require('express')
var timeout = require('connect-timeout')

var app = express()

app.use(timeout('3s')) // 设置超时时间，如果3s还没有响应，req.timedout将返回true
app.use(bodyParser())
app.use(haltOnTimedout)
app.use(cookieParser())
app.use(haltOnTimedout)


function haltOnTimedout(req, res, next){
  if (!req.timedout) next()
}
```
