# Array
以下是对方法的简介，参考链接及详细介绍见：  
ES5部分：[Array 对象](http://javascript.ruanyifeng.com/stdlib/array.html)  
ES6部分：[数组的扩展](http://es6.ruanyifeng.com/#docs/array)
## 1.Array构造函数
`Array`构造函数有一个很大的问题，就是不同的参数，会导致它的行为不一致。
```javascript
var arr = new Array(2); //等效:var arr = Array(2);
arr.length // 2
arr // [ undefined x 2 ]

var arr = new Array(2);
// 等同于
var arr = Array(2);

// 无参数时，返回一个空数组
new Array() // []

// 单个正整数参数，表示返回的新数组的长度
new Array(1) // [ undefined ]
new Array(2) // [ undefined x 2 ]

// 非正整数的数值作为参数，会报错
new Array(3.2) // RangeError: Invalid array length
new Array(-3) // RangeError: Invalid array length

// 单个非正整数参数（比如字符串、布尔值、对象等），
// 则该参数是返回的新数组的成员
new Array('abc') // ['abc']
new Array([1]) // [Array[1]]

// 多参数时，所有参数都是返回的新数组的成员
new Array(1, 2) // [1, 2]
new Array('a', 'b', 'c') // ['a', 'b', 'c']
```

## 2.Array.isArray
用来判断值是否是数组。
```javascript
var arr = [1, 2, 3];

typeof arr // "object"
Array.isArray(arr) // true
但是我们更多是使用如下方法来：
Object.prototype.toString.call(arr) === '[object Array]'; //true
```
## 3.Array实例方法
- valueOf()  返回数组本身
- toString()  返回数组的字符串形式，是用逗号`,`分隔的  
- push()  从数组末尾添加一个或多个元素；返回新数组的长度
- pop()  数组末尾取出一个元素；返回该元素（对空数组(`[]`)使用`pop`方法，不会报错，返回`undefined`）
- shift()  数组头部取出一个元素；返回该元素
- unshift()  从数组头部添加一个或多个元素；返回新数组的长度
- sort()  排序数组；默认是从小到大；接受一个函数参数（函数接收2个参数，顺序传入数组元素，如果返回值大于0，则前面元素后移，否则不动）；
- join()  将数组转为字符串(默认以逗号`,`分隔)；可接受一个参数(分隔符)；如果数组成员是`undefined`或`null`或空位，会被转成空字符串；
- concat()  合并多个数组
- reverse()  颠倒数组中元素的顺序
- slice()  提取数组中的一部分(start是开始位置，end是结束位置)；返回一个新数组；可将类似数组转为真正的数组；  
    格式：arr.slice(start, end); 所有参数都不是必须；  
	类似数组有：1.类似数组的对象（{0:'a',1:'b',length:2}）; 2.arguments; 3.NodeList集合(document.querySelectorAll("div"));  
- splice()  删除原数组的一部分元素，并在删除位置加入新元素；返回被删除的元素；  
    格式：arr.splice(index, length, addElement1, addElement2, ...); 所有参数都不是必须；
- map()  映射，遍历数组成员，对每一个成员做相同的变换，并返回一个新数组；可接受第二个参数，表示回掉函数执行时`this`所指向的对象。
- forEach()  遍历数组成员，执行某种操作，无返回值。
- filter()  过滤数组，返回满足条件的成员组成的新数组；可接受第二个参数，同`map`方法，表示函数中`this`指向的对象。
- reduce(),reduceRight()  依次处理数组的每个成员，返回最终一个累计值。差别是reduce是从左到右处理，reduceRight是从右到左处理。  
    格式：arr.reduce(function(累计变量, 当前变量, 当前位置(从0开始), 原数组){  }, 累计变量初始值)
- some(),every()  判断数组中是否有符合某种条件的成员。`some`只要数组中有一个成员的返回值是`true`，则整个`some`返回`true`；`every`是所有数组成员都返回`true`，才返回`true`；两个方法都接受第二个参数，表示函数中`this`指向的对象。
- indexOf(),lastIndexOf()  indexOf返回元素在数组中第一次出现的位置，lastIndexOf返回元素在数组中最后一次出现的位置；返回找到的下标值，如果没有找到返回-1；2个方法都无法确定NaN是否在数组中（[NaN].indexOf(NaN);//-1）；  
    格式：arr.indexOf(element[, start index]);第二个参数是指定搜索开始的位置。


## 4.ES6的一些扩展：

ES6给数组添加了一些新特性，而这些新特性到目前为止完全可以运用到自己的业务层。

ES6提供的两个静态方法：
- Array.from
- Array.of

ES6提供操作、填充和过滤数组的方法：
- Array.prototype.copyWithin
- Array.prototype.find
- Array.prototype.findIndex
- Array.prototype.fill

ES6中有关于数组迭代的方法：
- Array.prototype.keys
- Array.prototype.values
- Array.prototype.entries
- Array.prototype[Symbol.iterator]

接下来主要看看这些方法的使用：

### 4.1 Array.from()

`Array.from()`方法主要用于将两类对象(类似数组的对象[array-like object]和可遍历对象[iterable]（包括ES6新增的两种数组对象Set和Map））转为真正的数组。  
以下都是类似数组的对象：
```javascript
Array.prototype.slice.call({ 0: 'a', 1: 'b', length: 2 }) // ['a', 'b']
//NodeList集合
Array.prototype.slice.call(document.querySelectorAll("div"));
Array.prototype.slice.call(arguments);
```
> 所谓类似数组的对象，本质特征只有一点，即必须有`length`属性。因此，任何有`length`属性的对象都是类似数组对象，都可以通过`Array.from`方法将其转换成一个真正的数组。

```javascript
let arrayLike = {
	'0': 'a',
	'1': 'b',
	'2': 'c',
	length: 3
}
console.log(Array.from(arrayLike)); // ["a","b","c"]
```
如果下标不是从0开始，或者`length`长度和对象个数不一致，也会转换为数组，只是数组元素是`undefined`：
```javascript
let arrayLike = {
	'4': 'a',
	'7': 'b',
	'6': 'c',
	length: 2
}
console.log(Array.from(arrayLike)); // [undefined, undefined]
```
在ES6中，扩展运算符(`...`)也可以将某些数组结构转为数组。只不过它需要背后调用遍历器接口`Symbol.iterator`。
```javascript
function func(){
	console.log([...arguments]);
}
func('a', 'b', 1); //["a", "b", 1]
```

`Array.from`接受三个参数，但只有input是必须的：
- input: 你想要转换的类似数组对象或可遍历对象
- map: 类似于数组的map方法，用来对每个元素进行处理，将处理后的值放入返回的数组
- context: 绑定map中用到的this


对于还没有部署该方法的浏览器，可以用Array.prototype.slice方法替代。
```javascript
const toArray = (() => {
  return Array.from ? Array.from : obj => [].slice.call(obj);
})();
```

实例：将字符串数组化，并小写元素：
```javascript
var str = 'HELLO';
//高大上的写法
var arr = Array.from(str, item => item.toLowerCase());
//一般写法，其他的用for的写法就很不上档次了哈
var arr = str.split('').map(function(item){
	return item.toLowerCase();
})
arr //["h", "e", "l", "l", "o"]
```
`Array.from()`的另一个应用是，将字符串转为数组，然后返回字符串的长度。因为它能正确处理各种Unicode字符，可以避免JavaScript将大于`\uFFFF`的Unicode字符，算作两个字符的bug。
```javascript
function countSymbols(string) {
  return Array.from(string).length;
}
```

### 4.2 Array.of()
`Array.of`方法用于将一组值，转换为数组。这个方法的主要目的，是弥补数组构造函数Array()的不足。因为参数个数的不同，会导致Array()的行为有差异。详见前文[Array构造函数](#Array构造函数)。
```javascript
var arr = Array.of(3); //[3]
var arr = Array.of(3, 5, 8); //[3,5,8]
```
Array.of的ES5实现：
```javascript
function ArrayOf(){
	return [].slice.call(arguments);
}
```
### 4.3  copyWithin()
用来将指定位置的成员复制到其他位置（会覆盖原位置成员），并返回当前数组。
```javascript
Array.prototype.copyWithin(target, start = 0, end = this.length)
```
它接受三个参数。  
- target（必需）：从该位置开始替换数据。
- start（可选）：从该位置开始读取数据，默认为0。如果为负值，表示倒数。
- end（可选）：到该位置前停止读取数据，默认等于数组长度。如果为负值，表示倒数。

```javascript
[1, 2, 3, 4, 5].copyWithin(0, 3); //[4, 5, 3, 4, 5]
[1, 2, 3, 4, 5].copyWithin(0, 3, 4); // [4, 2, 3, 4, 5]

// -2相当于3号位，-1相当于4号位
[1, 2, 3, 4, 5].copyWithin(0, -2, -1) //[4, 2, 3, 4, 5]

// 将3号位复制到0号位
[].copyWithin.call({length: 5, 3: 1}, 0, 3) //{0: 1, 3: 1, length: 5}
```

### 4.4 find()和findIndex()
`find`用来找到第一个符合条件的数组成员，并返回该成员，如果没有符合条件的则返回`undefined`。`findIndex`和`find`类似，区别是返回的值是索引值（即下标位置）。


### 4.5 fill()
fill方法使用给定值，填充一个数组。
```javascript
['a', 'b', 'c'].fill(7); // [7, 7, 7]

new Array(3).fill(7); // [7, 7, 7]
```
它接受三个参数。  
- content（必需）：填充的内容。
- start（可选）：填充的开始位置，默认为0。如果为负值，表示倒数。
- end（可选）：填充的结束位置，默认等于数组长度。如果为负值，表示倒数。


### 4.6 entries()，keys()和values()
ES6提供三个新的方法——entries()，keys()和values()——用于遍历数组。它们都返回一个遍历器对象（详见《Iterator》一章），可以用for...of循环进行遍历，唯一的区别是keys()是对键名的遍历、values()是对键值的遍历，entries()是对键值对的遍历。
```javascript
for (let index of ['a', 'b'].keys()) {
  console.log(index);
}
// 0
// 1

for (let elem of ['a', 'b'].values()) {
  console.log(elem);
}
// 'a'
// 'b'

for (let [index, elem] of ['a', 'b'].entries()) {
  console.log(index, elem);
}
// 0 "a"
// 1 "b"
```
如果不使用for...of循环，可以手动调用遍历器对象的next方法，进行遍历。
```javascript
let letter = ['a', 'b', 'c'];
let entries = letter.entries();
console.log(entries.next().value); // [0, 'a']
console.log(entries.next().value); // [1, 'b']
console.log(entries.next().value); // [2, 'c']
```
### 4.7 includes()
`Array.prototype.includes`方法返回一个布尔值，表示某个数组是否包含给定的值，与字符串的`includes`方法类似。该方法属于ES7，但Babel转码器已经支持。
```javascript
[1, 2, 3].includes(2);     // true
[1, 2, 3].includes(4);     // false
[1, 2, NaN].includes(NaN); // true
```
该方法的第二个参数表示搜索的起始位置，默认为0。如果第二个参数为负数，则表示倒数的位置，如果这时它大于数组长度（比如第二个参数为-4，但数组长度为3），则会重置为从0开始。
```javascript
[1, 2, 3].includes(3, 3);  // false
[1, 2, 3].includes(3, -1); // true
```


关于数组空位的处理详见：[数组的空位](http://es6.ruanyifeng.com/#docs/array#数组的空位)
