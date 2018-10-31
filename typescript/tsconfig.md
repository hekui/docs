# tsconfig.json
TypeScript使用`tsconfig.json`文件管理工程配置。
```javascript
{
    "compilerOptions": {
        "target": "es5",
        "outDir": "./built",
        "allowJs": true,
        "noImplicitAny": false,
        "module": "commonjs",
        "removeComments": true,
        "sourceMap": false
    },
    "include": [
        "./src/**/*"
    ]
    // "exclude": [
    //     "js"
    // ],
}
```
选项解释：  
target：编译之后生成的JavaScript文件需要遵循的标准。有三个候选项：es3、es5、es2015。  
outDir：编译输出JavaScript文件存放的文件夹。  
noImplicitAny：为false时，如果编译器无法根据变量的使用来判断类型时，将用any类型代替。为true时，将进行强类型检查，无法推断类型时，提示错误。  
module：遵循的JavaScript模块规范。主要的候选项有：commonjs、AMD和es2015。为了后面与node.js保持一致，我们这里选用commonjs。  
removeComments：编译生成的JavaScript文件是否移除注释。  
sourceMap：编译时是否生成对应的source map文件。这个文件主要用于前端调试。当前端js文件被压缩引用后，出错时可借助同名的source map文件查找源文件中错误位置。    
include、exclude：编译时需要包含/剔除的文件夹。  

[tsconfig.json详细配置](https://www.tslang.cn/docs/handbook/tsconfig-json.html)