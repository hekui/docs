# 数据类型
Redis支持5种数据类型。

## 字符串（Strings）
Redis中的字符串是一个字节序列，是二进制的。  
字符串值的最大长度为 `512MB` 。  
```javascript
127.0.0.1:6379> set name hekui
OK
127.0.0.1:6379> get name
"hekui"
```
`set` 和 `get` 是Redis命令，`name` 是Redis中使用的键，`hekui` 是存储在Redis中的字符串的值。

## 散列/哈希
Redis散列/哈希（Hashes）是键值对的集合，是字符串字段和字符串值之间的映射。用于表示对象。  
每个散列/哈希可以存储多大 `2^32-1` 个键-值对（`4294967295`，超过 `40` 亿个）。  

相关命令（更多命令参见[Redis命令](http://www.redis.cn/commands.html)）：
```javascript
hmset key field value [field value ...] // 设置hash字段值
hset key field value                    // 设置hash里面一个字段的值

hgetall key                             // 从hash中读取全部的字段和值
hmget key field [field ...]             // 获取hash里面指定字段的值
hget key field                          // 获取hash中field的值
```
```javascript
127.0.0.1:6379> hmset userkey name hekui sex male age 30
OK
127.0.0.1:6379> hgetall userkey
1) "name"
2) "hekui"
3) "sex"
4) "male"
5) "age"
6) "30"
127.0.0.1:6379> hmget userkey sex age
1) "male"
2) "30"
127.0.0.1:6379> hget userkey age
"30"
```

## 列表（Lists）
Redis列表只是字符串列表，按插入顺序排序。可以向Redis列表的头部或尾部添加元素。  
列表的最大长度为 `2^32-1` 个元素（`4294967295`，超过 `40` 亿个）。
```javascript
127.0.0.1:6379> lpush frontend html js // 如果值中有空格，使用双引号包裹。
(integer) 2
127.0.0.1:6379> lpush frontend css
(integer) 3
127.0.0.1:6379> lpush frontend vue
(integer) 4
127.0.0.1:6379> lrange frontend 0 10
1) "vue"
2) "css"
3) "js"
4) "html"
127.0.0.1:6379> lpop frontend
"vue"
127.0.0.1:6379> lrange frontend 0 10
1) "css"
2) "js"
3) "html"
```
相关命令：
```javascript
lpush key value [value ...] // 从队列的左边入队一个或多个元素。返回值：integer-reply: push 操作后的 list 长度。
lrange key start stop       // 从列表中获取指定区域的元素
lpop key                    // 从队列的左边出队一个元素
```
## 集合（Sets）
Redis集合是字符串的无序集合。在Redis中，可以添加，删除和测试成员存在的时间0(1)复杂性。  
集合的成员是**唯一**的。  
```javascript
127.0.0.1:6379> sadd jslib vue react
(integer) 2
127.0.0.1:6379> sadd jslib angular
(integer) 1
127.0.0.1:6379> sadd jslib vue
(integer) 0
127.0.0.1:6379> smembers jslib
1) "angular"
2) "vue"
3) "react"
```
相关命令：
```javascript
sadd key member [member ...]  // 添加一个或多个元素到集合(Set)里。返回值：integer-reply: 返回新成功添加到集合里的元素数量。
smembers key                  // 获取集合里面的所有元素
```
## 可排序集合
Redis可排序集合类似于集合，是不重复的字符集合。不同之处在于排序集合的每个成员都与分数相关联，这个分数用于按从小到大来排序。虽然成员是唯一的，但分数值可以重复。
```javascript
127.0.0.1:6379> zadd precss 0 sass
(integer) 1
127.0.0.1:6379> zadd precss 0 less
(integer) 1
127.0.0.1:6379> zadd precss 1 stylus
(integer) 1
127.0.0.1:6379> zrangebyscore precss 0 10
1) "less"
2) "sass"
3) "stylus"
```
相关命令：
```javascript
zadd key [NX|XX] [CH] [INCR] score member [score member ...]  // 添加到有序set的一个或多个成员。返回值：integer-reply: 添加到有序集合的成员数量，不包括已经存在更新分数的成员。
zrangebyscore key min max [WITHSCORES] [LIMIT offset count]   // 返回有序集合中指定分数区间内的成员，分数由低到高排序。
```