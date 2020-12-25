# PM2 
进程管理工具，可用来管理 `node` 进程，也支持性能监控、进程守护、负载均衡等功能。

[quick-start](https://pm2.keymetrics.io/docs/usage/quick-start/)

## Install 
```javascript
npm install -g pm2 // 全局安装
```
```shell
pm2 --help # 通过帮助查看命令
```

## Start an app
启动应用
```shell
pm2 start app.js
```

## Managing processes
进程管理
```shell
pm2 restart   [app_name|id]
pm2 reload    [app_name|id]
pm2 stop      [app_name|id]
pm2 delete    [app_name|id] # Delete the app from the PM2 list

pm2 list # List all running processes
pm2 describe  [app_name|id] # Describe all parameters of a process. More alias desc|info|show.
```

## Display logs
显示日志
```shell
pm2 logs # Display all apps logs
pm2 logs [app_name|id] # Display only app_name/id application logs

pm2 flush <api> # Clear the logs for the app with name/id matching <api>
```

## Monit
监控
```shell
pm2 monit
```

## Cluster mode
集群模式
```shell
pm2 start app.js -i max
```

## Ecosystem
您还可以创建一个配置文件，生态系统文件，来管理多个应用程序。
```shell
pm2 ecosystem
```
生成一个生态系统文件 `ecosystem.config.js` 。
```javascript
module.exports = {
  apps : [{
    name: "app",
    script: "./app.js",
    env: {
      NODE_ENV: "development",
    },
    env_production: {
      NODE_ENV: "production",
    }
  }, {
     name: 'worker',
     script: 'worker.js'
  }]
}
```
启动它。
```shell
pm2 start ecosystem.config.js
```

## Setup startup script
开机启动脚本
```shell
pm2 startup
```

## CheatSheet

```shell
# Fork mode，fork模式，单实例多进程
pm2 start app.js --name my-api # Name process

# Cluster mode，cluster模式，多实例多进程
pm2 start app.js -i 0        # Will start maximum processes with LB depending on available CPUs
pm2 start app.js -i max      # Same as above, but deprecated.
pm2 scale app +3             # Scales `app` up by 3 workers
pm2 scale app 2              # Scales `app` up or down to 2 workers total

# Listing

pm2 list               # Display all processes status
pm2 jlist              # Print process list in raw JSON
pm2 prettylist         # Print process list in beautified JSON

pm2 describe 0         # Display all informations about a specific process

pm2 monit              # Monitor all processes

# Logs

pm2 logs [--raw]       # Display all processes logs in streaming
pm2 flush              # Empty all log files
pm2 reloadLogs         # Reload all logs

# Actions

pm2 stop all           # Stop all processes
pm2 restart all        # Restart all processes

pm2 reload all         # Will 0s downtime reload (for NETWORKED apps)

pm2 stop 0             # Stop specific process id
pm2 restart 0          # Restart specific process id

pm2 delete 0           # Will remove process from pm2 list
pm2 delete all         # Will remove all processes from pm2 list

# Misc

pm2 reset <process>    # Reset meta data (restarted time...)
pm2 updatePM2          # Update in memory pm2
pm2 ping               # Ensure pm2 daemon has been launched
pm2 sendSignal SIGUSR2 my-app # Send system signal to script
pm2 start app.js --no-daemon
pm2 start app.js --no-vizion
pm2 start app.js --no-autorestart
```

