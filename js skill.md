#js技巧库

## JS的数据类型：
number,string,boolean,undefined,null,object,symbol；  
- number 数值，整数和小数；包括`NaN`；
- string 字符串，字符组成的文本；
- boolean 布尔值，只有`true`和`false`两个值；
- undefined 表示“未定义”或不存在，即此处目前没有任何值;
- null 表示“空”值，表示本该有但没有;
- object 对象，是一个很复杂的东西。
- symbol 是ES6新增加的一种数据类型。[详见](http://es6.ruanyifeng.com/#docs/symbol)。

`NaN`是`Not a Number`的缩写，数据类型是`number`；并且`NaN`与其它值都不相等，包括它自己(即**`NaN`是JS中唯一一个不等于自身的值**)；`NaN`只能通过`isNaN`来判断。  
```javascript
typeof NaN; //number
NaN === NaN //false
isNaN(NaN) //true

//more
2 + null //2
2 + undefind //NaN
```

`object`类型中包括Object、Function、String、Number、Boolean、Array、Regexp、Date、Math、Error，以及宿主环境提供的其他object类型。
## 区分对象的具体类型：
js提供了typeof,constructor,instanceof来判断数据类型。  
typeof只能返回如下结果：
1. **原始类型**：数值、字符串、布尔值分别返回`number`、`string`、`boolean`。
2. **函数**：函数返回`function`。
3. **undefined**：`undefined`返回`undefined`。
4. **其他**：除此以外，其他情况都返回object。

```javascript
//尝试判断如下数据的typeof返回值:
//[1,2],{'a':'b'},null,new Date()
//如何正确来区分这几种数据的具体类型？
var arr = [1, 2];
var obj = {
	'a': 'b'
}
typeof arr; //object
typeof obj; //object
typeof null; //object
typeof new Date(); //object
//再看看下面的结果
var n = new Number();
typeof n; //object
var s = new String();
typeof s; //object
var b = new Boolean();
typeof b; //object
var f = new Function();
typeof f; //function
//除了new Function外，其他new出来的都是Object类型。
```

我们一般都是使用`Object.prototype.toString`方法来区分：
```javascript
Object.prototype.toString.call(arr); //"[object Array]"
Object.prototype.toString.call(obj); //"[object Object]"
Object.prototype.toString.call(null); //"[object Null]"
Object.prototype.toString.call(new Date()); //"[object Date]"
Object.prototype.toString.call(n); //"[object Number]"
Object.prototype.toString.call(s); //"[object String]"
Object.prototype.toString.call(b); //"[object Boolean]"
Object.prototype.toString.call(f); //"[object Function]"
Object.prototype.toString.call(/a/); //"[object RegExp]"

//更多...
Object.prototype.toString.call(new Error); //"[object Error]"
Object.prototype.toString.call(Math); //"[object Math]"
Object.prototype.toString.call(window); //"[object Window]"
Object.prototype.toString.call(history); //"[object History]"
Object.prototype.toString.call(location); //"[object Location]"
Object.prototype.toString.call(document); //"[object HTMLDocument]"
```


## 数组拷贝：
```javascript
var arr =[1, 2, 3];
var newArr = arr.slice();
```
`slice([index][, length])`方法，提取原数组的一部分，原数组不变，返回一个新数组。
更多：[Array对象详解](js array.md)

## 对DOM列表排序:

```html
<!-- HTML结构 -->
<ol id="test-list">
    <li class="lang">Scheme</li>
    <li class="lang">JavaScript</li>
    <li class="lang">Python</li>
    <li class="lang">Ruby</li>
    <li class="lang">Haskell</li>
</ol>
```
参考代码：
```javascript
var el = document.getElmentById('test-list');
Array.from(el.children).sort(function(p, n){
	return p.innerText - n.innerText;
}).forEach(function(item){
	el.appendChild(item);
})
```
技术点：
1. Array.from(); 将类似数组的对象转换为数组。
2. sort排序；当添加排序函数时，如果返回值大于0，则前一个元素往后排。
3. forEach；遍历数组，并对元素做操作，无返回值，与map的区别是，map对元素做了操作后，会返回一个新的数组。
4. appendChild方法；向父元素中插入节点，如果要插入的节点已经存在于文档中，则相当于是移动该节点（即会先删除原节点，然后在新位置插入节点）。

## 闭包的问题：  

```javascript
const Greeters = []
for (var i = 0 ; i < 10 ; i++) {
	Greeters.push(function () {
		return console.log(i)
	})
}
Greeters[0]() // 10
Greeters[1]() // 10
Greeters[2]() // 10
```
期望它输出0，1，2 ...？  
修改方法：  
1. 修改`var`为`let`。
2. 如下：
```javascript
Greeters.push(function (i) {
	return console.log(i)
}.bind(null, i))
```
3. 实际是2的一种进化，修改为:
```javascript
Greeters.push(console.log.bind(null, i));
```

## `this`问题  
猜猜下面输出什么？  
```javascript
class Foo {
	constructor (name) {
		this.name = name
	}
	greet () {
		console.log('hello, this is ', this.name)
	}
	someThingAsync () {
		return Promise.resolve()
	}
	asyncGreet () {
		this.someThingAsync()
		.then(this.greet)
	}
}
new Foo('dog').asyncGreet();

//TypeError: Cannot read property 'name' of undefined
//at greet (<anonymous>:1:99)
```
`greet`没有在正确的上下文运行。  

修改方法：
1. 修改`asyncGreet`方法为：
```javascript
asyncGreet () {
	this.someThingAsync()
	.then(this.greet.bind(this))
}
```
2. 在构造函数中添加：
```javascript
constructor (name) {
	this.name = name;
	this.greet = this.greet.bind(this);
}
```
3. 我们还应该知道箭头函数（=>）有保留当前上下文的功能。
```javascript
asyncGreet () {
	this.someThingAsync()
	.then(()=>{
		this.greet();
	})
}
```

## 链式调用的实现

在每一个调用的函数中返回当前对象，就可以实现链式调用了。

```javascript
var utils = {
  chain(a){
    this._num = a;
    return this;
  },
  add(b){
   this._num += b;
   return this;
  },
  sub(b){
   this._num -= b;
   return this;
  },
  value(){
    const num = this._num;
    this._num = undefined;//这里清除掉数据
    return num;
  }
}
utils.chain(1).add(5).sub(3).value(); //3
```
