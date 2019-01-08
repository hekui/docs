# 接口
TypeScript的核心原则之一是对值所具有的结构进行类型检查。  
在TypeScript里，接口的作用就是为这些类型命名和为你的代码或第三方代码定义契约。  
```javascript
interface LabelledValue {
  label: string;
}

function printLabel(labelledObj: LabelledValue) {
  console.log(labelledObj.label);
}

let myObj = {size: 10, label: "Size 10 Object"};
printLabel(myObj);
```

## 可选属性
接口里的属性不全都是必需的。可选属性在属性名字定义的后面加一个 `?` 问号。
```javascript
interface SquareConfig {
  color?: string;
  width?: number;
}

function createSquare(config: SquareConfig): {color: string; area: number} {
  let newSquare = {color: "white", area: 100};
  if (config.color) {
    newSquare.color = config.color;
  }
  if (config.width) {
    newSquare.area = config.width * config.width;
  }
  return newSquare;
}

let mySquare = createSquare({color: "black"});
```
可选属性的好处之一是可以对可能存在的属性进行预定义，好处之二是可以捕获引用了不存在的属性时的错误。
```javascript
interface SquareConfig {
  color?: string;
  width?: number;
}

function createSquare(config: SquareConfig): { color: string; area: number } {
  let newSquare = {color: "white", area: 100};
  if (config.clor) {
    // Error: Property 'clor' does not exist on type 'SquareConfig'
    newSquare.color = config.clor;
  }
  if (config.width) {
    newSquare.area = config.width * config.width;
  }
  return newSquare;
}

let mySquare = createSquare({color: "black"});
```

## 只读属性 readonly

`readonly` vs `const`
最简单判断该用 `readonly` 还是 `const` 的方法是，看要把它做为变量使用还是做为一个属性。 做为变量使用的话用 `const` ，若做为属性则使用 `readonly` 。


## 额外的属性检查
```javascript
interface SquareConfig {
    color?: string;
    width?: number;
}

function createSquare(config: SquareConfig): { color: string; area: number } {
    // ...
}

let mySquare = createSquare({ colour: "red", width: 100 });
```
TypeScript会认为这段代码可能存在bug。 对象字面量会被特殊对待而且会经过 额外属性检查，当将它们赋值给变量或作为参数传递的时候。 如果一个对象字面量存在任何“目标类型”不包含的属性时，你会得到一个错误。
```javascript
// error: 'colour' not expected in type 'SquareConfig'
let mySquare = createSquare({ colour: "red", width: 100 });
```
**绕开这些检查：**  
1、使用类型断言  
```javascript
let mySquare = createSquare({ width: 100, opacity: 0.5 } as SquareConfig);
```
2、【最佳方式】添加一个字符串索引签名
```javascript
interface SquareConfig {
    color?: string;
    width?: number;
    [propName: string]: any;
}
```
3、将这个对象赋值给另一个变量
```javascript
let squareOptions = { colour: "red", width: 100 };
let mySquare = createSquare(squareOptions);
```
但是我们不建议你绕开检查。

## 函数类型
不需要函数的参数名与接口里定义的名字相匹配，但要求对应位置上的参数类型是兼容的。
```javascript
interface SearchFunc {
  (source: string, subString: string): boolean;
}

let mySearch: SearchFunc;
mySearch = function(src: string, sub: string): boolean {
  let result = src.search(sub);
  return result > -1;
}
```

## 可索引的类型
那些能够“通过索引得到”的类型，比如a[10]或ageMap["daniel"]