# node 实现传入图片URL，进行图片校验
微信小程序的图片校验方法 `security.imgSecCheck` ，原接口需要上传 `FormData` 格式的数据，在使用中有些不方便。  
封装一个 `node` 端方法，实现传入图片网络地址(imgUrl)，进行图片校验。  
微信文档：  
> [security.imgSecCheck 微信官方文档](https://developers.weixin.qq.com/miniprogram/dev/api-backend/open-api/sec-check/security.imgSecCheck.html)    

核心实现：
```javascript
const log = require('./../../log')('secCheck') // log封装自log4js，请自行实现
const request = require('request')

/**
 * 图片检测接口
 * 要检测的图片文件，格式支持PNG、JPEG、JPG、GIF，图片尺寸不超过 750px x 1334px
 * @param {String} access_token
 * @param {String} imgUrl
 * @return Promise
 */
const imgUrlSecCheck = async ({
  accessToken = '',
  imgUrl = '',
}) => {
  return new Promise((resolve, reject) => {
    if (!imgUrl) {
      resolve({
        code: 30,
        msg: 'imgUrl参数不能为空',
      })
    }
    const data = {
      media: request(imgUrl)
    }
    // console.log('data', data)
    const url = `https://api.weixin.qq.com/wxa/img_sec_check?access_token=${accessToken}`
    request.post({
      url,
      formData: data,
    }, (err, httpResponse, body) => {
      const res = JSON.parse(body)
      if (err) {
        log.error(`${url} - request data: ${JSON.stringify(data)} - response data: - ${JSON.stringify(res)}`)
        reject({
          code: 1,
          contentType: 2,
          msg: 'network error',
          data: res
        })
      }
      if (res.errcode === 0) {
        log.trace(`${url} - request data: ${JSON.stringify(data)} - response data: - ${JSON.stringify(res)}`)
        resolve({
          code: 0,
          contentType: 2,
          msg: 'ok',
          data: res
        })
      } else {
        log.error(`${url} - request data: ${JSON.stringify(data)} - response data: - ${JSON.stringify(res)}`)
        reject({
          code: 1,
          contentType: 2,
          msg: 'error',
          data: res
        })
      }
    })
  })
}
```
```javascript
// 调用示例 
const Router = require('koa-router')
const router = new Router()
const secCheck = require('./secCheck')

router.post('/wechat/img_url_sec_check', async (ctx) => {
  const accessToken = await util.getAccessToken().catch(e => e) // 自 AccessToken 中控服务获取，请自行实现
  const params = ctx.request.body
  const result = await secCheck.imgUrlSecCheck({
    accessToken,
    imgUrl: params.imgUrl
  }).catch(e => e)
  console.log('secCheck.imgUrlSecCheck result:', result)
  ctx.body = result
})
```
