# LDAP node.js实现

建议使用 `activedirectory`，网上的 `ldapjs` 我没有使用成功。  
[activedirectory](https://github.com/gheeres/node-activedirectory)  


## Installation
```javascript
npm install activedirectory
```
## 示例代码
```javascript
const ActiveDirectory = require('activedirectory');

const config = { 
  url: 'ldap://192.168.10.*:389',
  baseDN: 'OU=成都瑞智创家网络科技有限公司,DC=chuangjialive,DC=com'
}

const ad = new ActiveDirectory(config);
let username = 'test', password = '123456'
// 账号 密码
ad.authenticate(username, password, function(err, auth) {
  if (err) {
    console.log('ERROR: '+JSON.stringify(err));
    return;
  }
  
  if (auth) {
    console.log('Authenticated!');
  } else {
    console.log('Authentication failed!');
  }
});
```
