# npm command

```javascript
npm -h  //查看帮助信息
npm -v  //是npm --version的缩写，查看npm的版本号
npm search <keyword>  //搜索与keyword匹配的模块信息
npm info <pkg> version  //查看某个模块最新发布版本信息
npm view <pkg> version  //查看一个包的最新发布版本
npm view <pkg> engines  //查看一个包所依赖的node的版本
npm view <pkg> dependencies  //查看包的依赖关系

npm install <pkg>  //安装指定模块
npm install <pkg>@version  //安装指定版本的模块
//install 指令有--save,--save-dev,--save-optional,--save-exact参数；用来更新package.json文件

npm update <pkg>  //更新指定模块
npm uninstall <pkg>  //卸载指定模块


npm list -g --depth 0  //查看已经安装的模块信息

npm init  //引导用户创建一个package.json文件，包括名称，版本，作者等信息。
npm root //查看当前包的安装路径
npm root -g  //查看全局包的安装路径
```
