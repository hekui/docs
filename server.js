const Koa = require('koa')
const path = require('path')
const serve = require('koa-static')
const Router = require('koa-router')

const app = new Koa()

app.use(serve(path.join(__dirname)))

app.listen(3000, req => {
  console.log('server listening at http://localhost:3000')
})