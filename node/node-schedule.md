## schedule

在 `node` 中可使用 `node-schedule` 来完成定时任务。  

[node-schedule](https://github.com/node-schedule/node-schedule)  

```javascript
npm install node-schedule -S
```

## 使用方法
### 1. Cron-style Scheduling
```javascript
const schedule = require('node-schedule')

const job = schedule.scheduleJob('30 * * * * *', () => {
  console.log('每分钟的第30秒执行', new Date().toLocaleString())
})

// 每分钟的第30秒执行 2020-5-14 2:29:30 PM
// 每分钟的第30秒执行 2020-5-14 2:30:30 PM
// 每分钟的第30秒执行 2020-5-14 2:31:30 PM
// ...
```
参数：* 代表通配符
```javascript
// 6个占位符从左到右分别代表：秒、分、时、日、月、周几
// * * * * * *
// ┬ ┬ ┬ ┬ ┬ ┬
// │ │ │ │ │ |
// │ │ │ │ │ └ day of week (0 - 7) (0 or 7 is Sun)
// │ │ │ │ └───── month (1 - 12)
// │ │ │ └────────── day of month (1 - 31)
// │ │ └─────────────── hour (0 - 23)
// │ └──────────────────── minute (0 - 59)
// └───────────────────────── second (0 - 59, OPTIONAL)
```
每个参数还可以传入数值范围:
```javascript
 // 每分钟的第1-10秒都会触发，其它通配符依次类推
 const job = schedule.scheduleJob('1-10 * * * * *', () => {
  console.log('每分钟的第1-10秒执行', new Date().toLocaleString())
})
```
### 2. 对象字面量语法
```javascript
const job = schedule.scheduleJob({hour: 14, minute: 30, dayOfWeek: 0}, () => {
  console.log('每周日的14时30分执行', new Date().toLocaleString())
})
```

### 3. 更多方式

1. 指定日期时间执行
```javascript
	const date = new Date(2012, 11, 21, 5, 30, 0);
	schedule.scheduleJob(date, () => {
	  console.log('世界末日！')
	})
```

2. 重复规则
```javascript
	let rule = new schedule.RecurrenceRule()
	rule.minute = 42

	const job = schedule.scheduleJob(rule, () => {
	console.log('每小时的42分执行', new Date().toLocaleString())
	})
```
还可以使用范围
```javascript
	let rule = new schedule.RecurrenceRule()
	rule.dayOfWeek = [0, new schedule.Range(4, 6)]
	rule.hour = 17
	rule.minute = 0

	// 每周四，五，六，日的17:00触发
	const job = schedule.scheduleJob(rule, () => {
	console.log('执行输出', new Date().toLocaleString())
	})
```

### 4. 取消定时器
```javascript
job.cancel()
```

更多参见：[https://github.com/node-schedule/node-schedule](https://github.com/node-schedule/node-schedule)