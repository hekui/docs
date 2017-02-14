#exports vs module.exports的区别


学习参考及代码：
 - [Node.js Module – exports vs module.exports](http://www.hacksparrow.com/node-js-exports-vs-module-exports.html)

**要点：**
 - exports指向module.exports，exports是对module.exports的引用。
 - require方法返回的是module.exports。
 - 默认module.exports 是一个空对象 {}。 如果你只是添加方法或属性，只要操作exports就可以了。只有需要覆盖它的时候才需要module.exports。


例子1：
```javascript
//rocker.js
exports.name = function() {
	console.log('My name is Lemmy Kilmister');
};
exports.a = 'a';
exports.b = 'b';
exports.b = 'c';
```
```javascript
//app.js
var rocker = require('./rocker.js');
rocker.name(); // 'My name is Lemmy Kilmister'
console.log(rocker); //{ name: [Function], a: 'a', b: 'c' }
 ```
 每一个`node.js`执行文件，都自动创建一个`module`对象，同时，`module`对象会创建一个叫`exports`的属性。  
默认`module.exports`是一个空对象`{}`。 如果你只是添加方法或属性，只要操作`exports`就可以了。

例子2：
```javascript
//rocker.js
exports.name = function(){
  console.log('default name');
}
module.exports = {name: 'hekui'};
exports.name = 'edited name';
```
```javascript
//app.js
 var rocker = require('./rocker.js');
 console.log(rocker.name); //hekui
 ```
 require方法返回的是module.exports。得到的`rocker`对象是`module.exports`导出来的`{name: 'hekui'}`对象。


例子3：
```javascript
//rocker.js
module.exports = 'ROCK IT!';
exports.name = function() {
    console.log('My name is Lemmy Kilmister');
};
```
```javascript
//app.js
var rocker = require('./rocker.js');
rocker.name(); // TypeError: Object ROCK IT! has no method 'name'
 ```

 例子4：
 ```javascript
 //rocker.js
 module.exports = function(name, age) {
     this.name = name;
     this.age = age;
     this.about = function() {
         console.log(this.name +' is '+ this.age +' years old');
     };
 };
 ```
 ```javascript
 //app.js
 var Rocker = require('./rocker.js');
 var r = new Rocker('Ozzy', 62);
 r.about(); // Ozzy is 62 years old
  ```
