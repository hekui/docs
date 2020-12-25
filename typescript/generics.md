# 泛型
```javascript
// 先定义一个泛型函数
function identity<T>(arg: T): T {
  return arg;
}
// 泛型函数的使用
// 一、传入所有的参数，包含类型参数：
let output = identity<string>("myString");  // type of output will be 'string'
// 二、利用了类型推论 -- 即编译器会根据传入的参数自动地帮助我们确定T的类型
let output = identity("myString");  // type of output will be 'string'
```
我们给 `identity` 添加了 **类型变量** `T`。

```javascript
function loggingIdentity<T>(arg: Array<T>): Array<T> {
  console.log(arg.length);  // Array has a .length, so no more error
  return arg;
}
```
也可以使用不同的泛型参数名，只要在数量上和使用方式上能对应上就可以。
```javascript
let myIdentity: <T>(arg: T) => T = identity;
let myIdentity: <U>(arg: U) => U = identity;
```
我们还可以使用带有调用签名的对象字面量来定义泛型函数：
```javascript
let myIdentity: {<T>(arg: T) => T} = identity;
```

## 泛型类型
```javascript
interface GenericIdentityFn {
  <T>(arg: T): T;
}
function identity<T>(arg: T): T {
  return arg;
}
let myIdentity: GenericIdentityFn = identity;

// 将泛型参数当作整个接口的一个参数
interface GenericIdentityFn<T> {
  (arg: T): T;
}
function identity<T>(arg: T): T {
  return arg;
}
let myIdentity: GenericIdentityFn<number> = identity;
```

## 泛型类
```javascript
class GenericNumber<T> {
  zeroValue: T;
  add: (x: T, y: T) => T;
}
let myGenericNumber = new GenericNumber<number>();
myGenericNumber.zeroValue = 0;
myGenericNumber.add = function(x, y) { return x + y; };
```

## 泛型约束
```javascript
interface Lengthwise {
  length: number;
}
function loggingIdentity<T extends Lengthwise>(arg: T): T {
  console.log(arg.length);  // Now we know it has a .length property, so no more error
  return arg;
}

loggingIdentity(3);  // Error, number doesn't have a .length property
loggingIdentity({length: 10, value: 3}); // Ok
```