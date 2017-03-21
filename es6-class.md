# Class
`class`是es6引入的最重要特性之一。在没有`class`之前，我们只能通过原型链来模拟类，而且实现继承是非常麻烦的事情。
 - [ES5中的继承](js-inherit.md)
 - [ES6中的继承](js-inherit-es6.md)

## 基本用法
```javascript
class People {
    constructor(name){
        this.name = name;
    }
    sayName(){
        console.log(this.name);
    }
}
```
上面定义了一个People类，他有一个属性 name 和一个方法 sayName()，还有一个构造函数;  
你可以这样使用这个类：  
```javascript
var p = new People('Tom');
p.sayName();
```
就像函数有函数声明和函数表达式两种定义方式，类也可以用类表达式方式来定义：
```javascript
let People = class {
    ...
}
```

## 继承

通过关键字 `extends` 来继承一个类，并且，可以通过 `super` 关键字来引用父类。
```javascript
class People {
    constructor(name){
        this.name = name;
    }
    sayName(){
        console.log(this.name);
    }
}
class Student extends People {
    constructor(name, grade){
    super(name);
        this.grade = grade;
    }
    sayGrade(){
        console.log(this.grade);
    }
}
let tom = new Student('tom', '三年级');
```
