# TypeScript
参考：[TypeScript中文网](https://www.tslang.cn/)  
TypeScript是JavaScript类型的超集，它可以编译成纯JavaScript。  
TypeScript的文件扩展名：`ts`，`tsx`  

## 目录
- 工具
  - [VS Code 中自动编译配置](./by-vscode.md)
  - [与Webpack集成](./webpack.md)
  - [tsconfig.json](./tsconfig.md)
- 学习笔记
  - [基础类型](./basic-types.md)
  - [类](./classes.md)
  - [装饰器](./decorator.md)
  - [函数](./functions.md)
  - [接口](./interfaces.md)


## 概览
1. `: string` 类型注解，是TS为 **变量** 或 **函数** 添加约束的方式。  
2. 在类的构造函数的参数上使用 `public` 等同于创建了同名的成员变量。
3. 对象展开仅包含对象 **自身的可枚举属性**。
```javascript
class C {
  p = 12;
  m() {
    console.log(this.p)
  }
}
let c = new C();
let clone = { ...c };
clone.p; // ok
clone.m(); // error!
```
4. TS的类型检查是在编译期进行的。
5. TS是JS的超集，本质上向JS添加了可选的静态类型和基于类的面向对象编程。
6. TS中的类型分为：基础类型、接口、类、函数、泛型、枚举等。

## 安装
```javascript
npm install -g typescript
```

## 编译
TypeScript 可以编译成纯 JavaScript  
在命令行上，运行TypeScript编译器：
```javascript
tsc greeter.ts
```
输出结果为一个greeter.js文件。  
[VS Code 中自动编译配置](./by-vscode.md)

## 语法
[官方手册](https://www.tslang.cn/docs/handbook/basic-types.html)  
[学习提炼](./basic-types.md)

## 工程化

TypeScript 使用 `tsconfig.json` 文件管理工程配置。  
[tsconfig.json](./tsconfig.md)

与构建工具集成：  
1. [webpack](./webpack.md)  
2. [gulp](https://www.tslang.cn/docs/handbook/gulp.html)   

## 其他
在 vscode 中  
编写.ts文件，在执行 `tsc **.ts` 后，生成同名的 `**.js` 后，原始`.ts`文件在 vscode 中会出现错误提示（红色波浪线），如下图：  
![](./images/vserror.png)

解决办法：  
可以将 `.ts` 文件修改为一个模块，即在文件末尾加上导出模块功能。
```javascript
export = mySquare
```