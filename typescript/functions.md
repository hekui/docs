# 函数
TypeScript为JavaScript函数添加了额外的功能，让我们可以更容易地使用。  
和JavaScript一样，TypeScript函数可以创建有名字的函数和匿名函数。 
```javascript
// Named function
function add(x, y) {
    return x + y;
}

// Anonymous function
let myAdd = function(x, y) { return x + y; };
```


## 函数类型
我们可以给每个参数添加类型之后再为函数本身添加**返回值类型**。  
TS可以根据返回语句自动推断出返回值类型，因此通常省略它。  
函数类型包含两部分：参数类型 和 返回值类型。  
```javascript
let myAdd: (baseValue: number, increment: number) => number =
    function(x: number, y: number): number { return x + y; };
```
如果你在赋值语句的一边指定了类型但是另一边没有类型的话，TypeScript编译器会自动识别出类型。
```javascript
// myAdd has the full function type
let myAdd = function(x: number, y: number): number { return x + y; };

// The parameters `x` and `y` have the type number
let myAdd: (baseValue: number, increment: number) => number =
    function(x, y) { return x + y; };
```

## 可选参数和默认参数
使用 `?` 指定可选参数，可选参数必须跟在必须参数后面。
```javascript
function buildName(firstName: string, lastName?: string) {
    if (lastName)
        return firstName + " " + lastName;
    else
        return firstName;
}

function buildName(firstName: string, lastName = "Smith") {
    return firstName + " " + lastName;
}
```

## 剩余参数
```javascript
function buildName(firstName: string, ...restOfName: string[]) {
  return firstName + " " + restOfName.join(" ");
}

let employeeName = buildName("Joseph", "Samuel", "Lucas", "MacKinzie");
```

## 函数重载

```javascript
interface User {
  name: string;
  age: number;
}
declare function test(para: User): number;
declare function test(para: number, flag: boolean): number;

const user = {
  name: 'Jack',
  age: 666
};

// ok
test(user)
test(123, false)

// Error: 参数不匹配
test(user, false);
```