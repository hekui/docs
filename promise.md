# Promise
Promise最先是由CommonJS提出的一种异步规范，后被ECMAScript6采纳写为语言标准，即现在JavaScript语言原生支持Promise对象。

Promise有3种状态：
- pending(未完成)
- resolved(已完成)
- rejected(失败)

Promise对象使用`then`方法回调函数，`then`方法接受2个回调函数，第一个是操作成功时(`resolved`)的回调函数，第二个是操作失败时(`rejected`)的回调函数。
`then`方法可以链式调用。
```javascript
	p
	.then(step1)
	.then(step2)
	.then(
		console.log,
		console.error
	)
```
`p`的状态一旦变为`resolved`，就一次调用后面每一个`then`指定的回调函数，每一步都必须等到前一步完成，才会执行。  
注意最后一个`then`方法的回到函数`console.log`和`console.error`，用法有一点很重要的区别：  
`console.log`只显示回调函数step2的返回值。而`console.error`可以显示前面任意一个`then`方法的错误。即，如果step1操作失败，抛出一个错误，这时step2就不再执行（因为它是操作成功的回调函数），Promise对象就开始寻找，接下来第一个操作失败时的回调函数，即最后的`console.error`。这就是说，  
**Promise对象的错误有传递性。**

下面看看用Promise写的ajax示例：
```javascript
function ajax(opt){
	let url = opt.url || '';
	if(!url)return;
	let xhr = new XMLHttpRequst();
	let p = new Promise(function(resolved, rejected){
		xhr.open('GET', url, true);
		xhr.onreadystatechange = function(){
			if(xhr.readyStates == 4 && xhr.status == 200){
				resolved(JSON.parse(xhr.responseText));
			}else{
				rejected(e);
			}
		};
		xhr.send(null);
	});
	return p;
}
ajax({
	url: ''
}).then(console.log, console.error);
```

Promise对象的优点是:  
- 让回调函数变成了规范的链式写法
- 程序流程更加清晰

## 关于ajax:  
```javascript
var xhr,url;
if(window.XMLHttpRequst){
	// code for IE7+, Firefox, Chrome, Opera, Safari
	xhr = new XMLHttpRequest();
}else{
	// code for IE6, IE5
	xhr = new ActiveXObject("Microsoft.XMLHTTP");
}
xhr.open("GET", url, true);
xhr.onreadystatechange = function(){
	if(xhr.readyStates == 4 && xhr.status ==200){
		console.log(xhr.responseText);
	}else{
		console.log("error");
	}
}
```
open(method, url, async);  规定请求的类型、URL 以及是否异步处理请求。
 - method：请求的类型；GET 或 POST
 - url：文件在服务器上的位置
 - async：true（异步）或 false（同步）
 > 注释：当您使用 async=false 时，请不要编写 onreadystatechange 函数 - 把代码放到 send() 语句后面即可：  
 > xhr.open("GET", url, false);  
 > xhr.send();  
 > document.getElementById("myDiv").innerHTML = xhr.responseText;

send(string)  将请求发送到服务器。
 - string：仅用于 POST 请求

setRequestHeader(header,value)	向请求添加 HTTP 头。
- header: 规定头的名称
- value: 规定头的值

下面是 `XMLHttpRequest` 对象的三个重要的属性：  
- `onreadystatechange`	存储函数（或函数名），每当 `readyState` 属性改变时，就会调用该函数。  
- `readyState`	存有 `XMLHttpRequest` 的状态。从 `0` 到 `4` 发生变化。  
  - 0: 请求未初始化
  - 1: 服务器连接已建立
  - 2: 请求已接收
  - 3: 请求处理中
  - 4: 请求已完成，且响应已就绪  
- `status`
  - 200: "OK"
  - 404: 未找到页面
