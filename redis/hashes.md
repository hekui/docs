# Redis哈希
是字符串字段和字符串值之间的映射，类似于对象类型。
```javascript
127.0.0.1:6379> hset member name hekui
(integer) 1
127.0.0.1:6379> hget member name
"hekui"
127.0.0.1:6379> hgetall member
1) "name"
2) "hekui"

127.0.0.1:6379> hmset person name hekui age 30 sex male
OK
127.0.0.1:6379> hget person age
"30"
127.0.0.1:6379> hgetall person
1) "name"
2) "hekui"
3) "age"
4) "30"
5) "sex"
6) "male"

127.0.0.1:6379> hlen member
(integer) 1
127.0.0.1:6379> hlen person
(integer) 3

127.0.0.1:6379> hexists person name
(integer) 1
127.0.0.1:6379> hexists member age
(integer) 0

127.0.0.1:6379> hkeys member
1) "name"
127.0.0.1:6379> hkeys person
1) "name"
2) "age"
3) "sex"

127.0.0.1:6379> hvals member
1) "hekui"
127.0.0.1:6379> hvals person
1) "hekui"
2) "30"
3) "male"
```
## Redis哈希命令

|序号|命令|说明|
|-|-|-|
|1|HDEL key field2 [field2]|删除一个或多个哈希字段。|
|2|HEXISTS key field	|判断是否存在散列字段。|
|3|HGET key field	|获取存储在指定键的哈希字段的值。|
|4|HGETALL key	|获取存储在指定键的哈希中的所有字段和值|
|5|HINCRBY key field increment	|将哈希字段的整数值按给定数字增加|
|6|HINCRBYFLOAT key field increment	|将哈希字段的浮点值按给定数值增加|
|7|HKEYS key	|获取哈希中的所有字段|
|8|HLEN key	|获取散列中的字段数量|
|9|HMGET key field1 [field2]	|获取所有给定哈希字段的值|
|10|HMSET key field1 value1 [field2 value2 ]	|为多个哈希字段分别设置它们的值|
|11|HSET key field value	|设置散列字段的字符串值|
|12|HSETNX key field value	|仅当字段不存在时，才设置散列字段的值|
|13|HVALS key	|获取哈希中的所有值|