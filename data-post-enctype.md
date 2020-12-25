# 数据提交的方式（application/x-www-form-urlencoded，multipart/form-data，application/json，text/plain）
form的enctype属性为编码方式，有三种属性：`application/x-www-form-urlencoded`(默认)， `multipart/form-data`，`text/plain`。  
当 `action` 为 `get` 时候，浏览器用 `x-www-form-urlencoded` 的编码方式把 `form` 数据转换成一个字串（name1=value1&name2=value2...），然后把这个字串append到url后面，用?分割，加载这个新的url。  
当 `action` 为 `post` 时候，浏览器把 `form` 数据封装到 `http body` 中，然后发送到服务端。  

## application/json
这是现在提倡前后端分离后最常见的数据交互方式，传递的数据格式为 `json`   
注：此种属性不是 `form` 的 `enctype` 属性  

## application/x-www-form-urlencoded
这是以前比较常见的提交数据的方式，传统的form表单默认就是这种方式提交数据（未对form设置enctype时）。  
`Content-Type` 被指定为 `application/x-www-form-urlencoded`  
提交的数据按照 `key1=val1&key2=val2` 的方式进行编码，`key` 和 `val` 都进行了 `URL` 转码。  

## multipart/form-data
使用表单上传文件（图片、视频、文本文件等）时，必须让 `<form>` 表单的 `enctype` 等于 `multipart/form-data`  
上传文件时，`method` 必须要指定为 `POST`  

Request Headers：
```javascript
Content-Type:multipart/form-data; boundary=----WebKitFormBoundaryaqWXpQYCfMbAHgPh
```

Request Payload：
```javascript
------WebKitFormBoundaryaqWXpQYCfMbAHgPh
Content-Disposition: form-data; name="fileEnterprise"; filename="a.jpg"
Content-Type: image/jpeg


------WebKitFormBoundaryaqWXpQYCfMbAHgPh
Content-Disposition: form-data; name="enterpriseName"

有限责任公司
------WebKitFormBoundaryaqWXpQYCfMbAHgPh
Content-Disposition: form-data; name="unifiedSocialCreditCode"

91530700781667237G
------WebKitFormBoundaryaqWXpQYCfMbAHgPh--
```

## text/plain
窗体数据以纯文本形式进行编码，其中不含任何控件或格式字符。  