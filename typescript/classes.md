# 类

## 公共、私有与受保护的修饰符
公共的，`public` ，在TS中，成员都默认为 `public`  
私有的，`private` ，不能在声明它的类的外部访问。

```javascript
class Animal {
    private name: string;
    constructor(theName: string) { this.name = theName; }
}

new Animal("Cat").name; // 错误: 'name' 是私有的.
```
只有当两个类型中包含通一个 `private` 成员时，这两个类型才是兼容的。  

受保护的， `protected` ，与 `private` 很相似，唯一区别是: `protected` 成员在派生类中仍然可以访问。  
构造函数也可以标记为 `protected` ，这时，这个类就不能被实例化、只能被继承。  

## readonly修饰符
将属性设置为只读的。只读属性只能在声明时或构造函数里被初始化。  
```javascript
class Octopus {
    readonly name: string;
    readonly numberOfLegs: number = 8;
    constructor (theName: string) {
        this.name = theName;
    }
}
let dad = new Octopus("Man with the 8 strong legs");
dad.name = "Man with the 3-piece suit"; // 错误! name 是只读的.
```

## 存取器
TypeScript支持通过 `getters` / `setters` 来截取对对象成员的访问。  
只带有 `get` 不带有 `set` 的存取器自动被推断为 `readonly` 。  
```javascript
let passcode = "secret passcode";

class Employee {
    private _fullName: string;

    get fullName(): string {
        return this._fullName;
    }

    set fullName(newName: string) {
        if (passcode && passcode == "secret passcode") {
            this._fullName = newName;
        }
        else {
            console.log("Error: Unauthorized update of employee!");
        }
    }
}

let employee = new Employee();
employee.fullName = "Bob Smith";
if (employee.fullName) {
    alert(employee.fullName);
}
```
存取器要求你将编译器设置为输出ECMAScript 5或更高。 不支持降级到ECMAScript 3。 

## 静态属性
到目前为止，我们只讨论了类的实例成员，那些仅当类被实例化的时候才会被初始化的属性。 我们也可以创建类的静态成员，这些属性存在于类本身上面而不是类的实例上。