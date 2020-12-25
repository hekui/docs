# 微信小程序登录
[小程序登录-官方文档](https://developers.weixin.qq.com/miniprogram/dev/framework/open-ability/login.html)  
![](./img/mp-login.jpg)

小程序端代码
```javascript
// app.js
// ...
login: function(options) {
  // 登录
  wx.login({
    success: res => {
      // 发送 res.code 到后台换取 sessionKey
      console.log('wx.login res:', res);
      api.request({
        app: this,
        url: '/wechat/getSessionKey',
        data: {
          code: res.code
        },
        success: res => {
          // console.log('sessionKey 获取成功！res.data', res.data)
          // getUserInfo
          wx.getUserInfo({
            success: (userSourceData) => {
              console.log('[app - login]res', userSourceData)
              this.fetchUserInfo(userSourceData, options)
            },
            fail: (userSourceData) => {
              console.log('[app - login]fail:', userSourceData)
              options.fail && options.fail(userSourceData)
            }
          })
        }
      })
    }
  })
},
fetchUserInfo: function(userSourceData, options) {
  // getUserInfo
  api.getUserInfo(userSourceData).then(res => {
    console.log('[app - fetchUserInfo]success:', res, options)
    this.globalData.userInfo = res.data
    options.success && options.success(res.data)
  }, res => {
    console.log('[app - fetchUserInfo]fail:', res)
    options.fail && options.fail(userSourceData)
  })
},
// ...

// util.js
// ...
/**
 * 获取用户信息接口
 * @param {Object} data 通过wx.getUserInfo拿到的数据。
 * @return {Promise}
 */
const getUserInfo = (data) => {
  return new Promise((resolve, reject) => {
    wx.request({
      url: '/account/getUserInfo',
      method: 'POST',
      data: data,
      success: res => {
        if (res.code === 0) {
          // 如果是登录返回则有ticketId
          if (res.data.ticketId) {
            wx.setStorageSync('ticketId', res.data.ticketId)
            wx.setStorageSync('uid', res.data.id)
          }
          resolve(res)
        } else {
          reject(res)
        }
      },
      fail: res => {
        reject(res.data)
      }
    })
  })
}
// ...
```

## node服务端代码：
node 使用koa  
```javascript
// router/index.js
const Router = require('koa-router')
const router = new Router()
const wechatRouter = require('./wechat')
const accountRouter = require('./account')

// 微信
router.use('/wechat', wechatRouter)
// account
router.use('/account', accountRouter)

module.exports = router.routes()

// router/wechat.js
// ...
/**
 * getSessionKey接口主要功能：前端wx.login获取code，通过code去微信获取sessionKey
 */
router.all('/getSessionKey', (ctx, next) => {
  const code = ctx.request.body.code
  const url = `https://api.weixin.qq.com/sns/jscode2session?appid=${config.appId}&secret=${config.appSecret}&js_code=${code}&grant_type=authorization_code`
  return axios({
    method: 'get',
    url,
  }).then(result => {
    log.trace(`${url} - response data: - ${JSON.stringify(result.data)}`)
    ctx.session.session_key = result.data.session_key // session_key存储在session中，注意前端需要实现模拟cookie。
    ctx.body = {
      code: 0,
      msg: 'ok',
      data: result.data
    }
    // 返回示例 {"code":0,"msg":"ok","data":{"session_key":"***as8p79KjYsqepCX/NIg==","openid":"***nN4nzeW1N5_feJ0eJBUvHOOqU","unionid":"***Hew0Szhb6XgA3yfWMbRid75gs"}}
  }, result => {
    log.error(`${url} - response data: - ${JSON.stringify(result.data)}`)
    ctx.body = {
      code: 1,
      msg: 'error',
      data: result.data
    }
  })
})
// ...
```
```javascript
// router/account.js
// ...
const accountService = require('./service/account')
/**
 * 用户信息接口
 * @return {Object} 用户信息
 */
router.use('/getUserInfo', (ctx, next) => {
  if(ctx.session.ticketId){
    // 获取用户信息
    ctx.request.url = '/user/userdata'
    return accountService.fetchUserInfo(ctx)
  }else{
    // 调用解密方法，解密数据
    let decryptedUserInfo = accountService.decryptUserInfo(ctx)
    if(decryptedUserInfo.code === 0){ // 解密成功
      // 登录
      return accountService.login(ctx, decryptedUserInfo)
    }else{ // 解密失败，返回解密失败信息
      ctx.body = decryptedUserInfo
    }
  }
})

// router/service/account.js
const WXBizDataCrypt = require('./../../lib/wxaes/WXBizDataCrypt')
const log = require('./../../log')('accountService')
const config = require('./../../config')
const api = require('./../../api')

function fetchUserInfo(ctx){
  return api.fetchJava(ctx, {}).then(res => {
    log.trace('getUserInfo success res', res)
    res.data.ticketId = ctx.session.ticketId
    delete res.data.unionid
    delete res.data.openid

    ctx.body = res
  }, res => {
    log.trace('getUserInfo fail res', res)
    if(res.code === 1014){ // session过期，调登录
      ctx.session.ticketId = ''
      // 调用解密方法，解密数据
      let decryptedUserInfo = decryptUserInfo(ctx)
      if(decryptedUserInfo.code === 0){ // 解密成功
        // 可在此将用户信息写入数据库，或者调用登录微服务
        return login(ctx, decryptedUserInfo)
      }else{ // 解密失败，返回解密失败信息
        ctx.body = decryptedUserInfo
      }
    }else{
      ctx.body = res
    }
  })
}

function decryptUserInfo(ctx){
  log.info('ctx.session', ctx.session)
  let result = {}
  let { encryptedData, iv } = ctx.request.body
  if(ctx.session.session_key){
    let sessionKey = ctx.session.session_key
    let wxbdc = new WXBizDataCrypt(config.appId, sessionKey)
    try {
      let data = wxbdc.decryptData(encryptedData, iv)
      log.info('解密用户数据成功:', JSON.stringify(data))
      ctx.session.unionId = data.unionId
      ctx.session.openId = data.openId
      result = {code: 0, data: data}
    } catch (error) {
      log.info('解密用户数据失败:')
      log.error('Illegal Buffer Error', error)
      result = {
        code: 41,
        msg: '解密用户数据失败',
      }
    }
  } else {
    log.error('err, sessionKey is undefined')
    result = {
      code: 40, msg: '解密用户数据失败(sessionKey is undefined)'
    }
  }
  return result
}
// 我们业务逻辑是：登录放在登录微服务中（JAVA实现）
function login(ctx, decryptedUserInfo){
  ctx.request.url = '/login'
  return api.fetchPassport(ctx, {
    headImg: decryptedUserInfo.data.avatarUrl,
    nickname: decryptedUserInfo.data.nickName,
    openid: decryptedUserInfo.data.openId,
    //unionId在公共参数中传递
    userInfo: decryptedUserInfo.data,
  }).then(res => {
    log.trace('调用JAVA登录成功', res)
    ctx.session.ticketId = res.data.ticketId
    let userInfoSource = JSON.parse(res.data.userInfo)
    log.trace('userInfoSource', userInfoSource)
    let userInfo = {
      ticketId: res.data.ticketId,
      headImg: userInfoSource.avatarUrl,
      nickname: userInfoSource.nickName,
      id: res.data.id
    }
    ctx.session.userInfo = userInfo
    log.trace('userInfo', userInfo)
    // 组装数据
    ctx.body = {
      code: 0,
      data: userInfo
    }
  }, res => {
    log.error('调用JAVA登录失败', res)
    ctx.body = {
      code: 50,
      msg: '登录失败',
    }
  })
}
```