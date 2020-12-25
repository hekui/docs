# npm-scripts

## 执行顺序
如果脚本里面需要执行多个任务，那么需要明确它们的执行顺序。  
如果是并行执行（即同时的平行执行），可以使用 `&` 符号。
```javascript
npm run script1.js & npm run script2.js
```
如果是继发执行（即只有前一个任务成功，才执行下一个任务），可以使用 `&&` 符号。
```javascript
npm run script1.js && npm run script2.js
```
## commit 前的语法检查
```
"scripts": {
  "lint": "eslint --ext .js,.vue src/ server/",
},
"husky": {
  "hooks": {
    "pre-commit": "echo 'husky' && npm run lint"
  }
},
```

## 自动部署 `xcopy`

现在前后端分离已经成为常态，但是还有部分项目未进行前后端分开部署，比如常见的很多项目最后会将代码 `copy` 到 `JAVA` 项目中部署，这就需要我们在 build 前端项目后，拷贝代码到其他目录。

实现方式很多，比如使用 `webpack` 插件，下面说一个比较简单的。

## Package Scripts 命令

1. 安装
```javascript
npm install rimraf -S
```

2. 在 `package.json`  `scripts` 中添加命令。

	以下代码，先清空 `E:\\test` 目录，然后，拷贝项目中 `dist` 目录至 `E:\\test` 目录。

	```javascript
	"scripts": {
		"build": "... && npm run copy",
		"copy": "rimraf e:\\test/* && xcopy dist e:\\test /e /y /d /I"
	}

	// xcopy 参数：
	// /E 复制目录和子目录，包括空目录
	// /Y 取消提示以确认要覆盖现有目标文件。
	// /D:m-d-y 复制在指定日期或指定日期以后更改的文件。如果没有提供日期，只复制那些源时间比目标时间新的文件。
	// /I 如果目标不存在，且要复制多个文件，则假定目标必须是目录。
	```

	了解更多 [xcopy 命令](https://blog.csdn.net/qq_21808961/article/details/86749733) 。

3. 然后在 `build` 命令最后加上 ` && npm run copy` 可实现自动 `copy` 代码。 也可以在执行 `build` 后，手动执行 `npm run copy`。
