#loadtest

```javascript
// -c 并发
// --rps requests per second 每秒发送请求
// -t 持续时间
loadtest -c 10 --rps 50 -t 60 http://mprad.test1.fangguancha.com/api/content/recommendlist?page=true
```