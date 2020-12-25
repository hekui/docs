# 基础类型

布尔值、数字、字符串、数组、元组Tuple、枚举、Any、Void、Null/Undefined、Never、Object、类型断言  

布尔值  
最基本的数据类型就是简单的 `true/false` 值  

数字  
和 `JavaScript` 一样，`TypeScript` 里的所有数字都是浮点数。 除了支持十进制和十六进制字面量，`TypeScript` 还支持 `ECMAScript 2015` 中引入的二进制和八进制字面量。
```javascript
let decimalLiteral: number = 6;
let hexLiteral: number = 0xf00d;
let binaryLiteral: number = 0b1010;
let octalLiteral: number = 0o744;
// decimal 十进制；hex 十六进制；binary 二进制；octal 八进制；
```
字符串  
和 `JavaScript` 一样，可以使用双引号（"）或单引号（'）表示字符串。也支持模板字符串。

数组  
两种方式定义数组：
```javascript
//  第一种，可以在元素类型后面接上 []，表示由此类型元素组成的一个数组：
let list: number[] = [1, 2, 3];
// 第二种方式是使用数组泛型，Array<元素类型>：
let list: Array<number> = [1, 2, 3];

```

元组 Tuple
是一个已知元素数量和类型的数组，各元素的类型可以不相同。

枚举  
enum 类型是对 JavaScript 标准数据类型的一个补充。
```javascript
enum Color {Red, Green, Blue}
let c: Color = Color.Green // 1

enum Color {Red = 1, Green, Blue}
let c: Color = Color.Green // 2

enum Color {Red = 1, Green = 2, Blue = 4}
let colorName: string = Color[2] // Green
```

Any  
任意类型

Void  
表示没有任何类型。当一个函数没有返回值时，你通常会见到其返回值类型是 `void`:
```javascript
function warnUser(): void {
  console.log("This is my warning message");
}

// 声明一个void类型的变量没有什么大用，因为你只能为它赋予undefined和null：
let unusable: void = undefined;
```

Null 和 Undefined  
默认情况下 `null` 和 `undefined` 是所有类型的子类型。 就是说你可以把 `null` 和 `undefined` 赋值给 `number` 类型的变量。

Never
never类型表示的是那些永不存在的值的类型。

类型断言
两种语法：一种是“尖括号”语法；一种是 `as` 语法。
```javascript
let someValue: any = 'this is a string'
let strLength: number = (<string>someValue).length

let strLength: number = (someValue as string).length
// 上面两种形式是等价的。然而，使用 JSX 时，只有 as 语法是被允许的。
```