## IndexedDB
更多参考：  
阮一峰：[浏览器数据库 IndexedDB 入门教程](http://www.ruanyifeng.com/blog/2018/07/indexeddb.html)  
MDN：[使用 IndexedDB](https://developer.mozilla.org/zh-CN/docs/Web/API/IndexedDB_API/Using_IndexedDB)

## 一、概述

现有浏览器的数据存储方案，都不适合储存大量数据：`Cookie` 的大小不超过4KB，且每次请求都会发送到服务器；`LocalStorage` 在2.5MB 到 10MB之间（各家浏览器不同），而且不提供搜索功能，不能建立自定义的索引。所以，需要一种新的解决方案，这就是 `IndexedDB` 诞生的背景。

`IndexedDB` 就是浏览器提供的本地数据库，它可以被网页脚本创建和操作。`IndexedDB` 允许储存大量数据，提供查找接口，还能建立索引。这些都是 `LocalStorage` 所不具备的。就数据库类型而言，`IndexedDB` 不属于关系型数据库（不支持 `SQL` 查询语句），更接近 `NoSQL` 数据库。

`IndexedDB` 具有以下特点：
1. **键值对存储** IndexedDB 内部采用对象仓库（object store）存放数据。
2. **异步** IndexedDB 操作时不会锁死浏览器，用户依然可以进行其他操作，这与 LocalStorage 形成对比，后者的操作是同步的。异步设计是为了防止大量数据的读写，拖慢网页的表现。
3. **支持事务** IndexedDB 支持事务（transaction），这意味着一系列操作步骤之中，只要有一步失败，整个事务就都取消，数据库回滚到事务发生之前的状态，不存在只改写一部分数据的情况。
4. **同源限制** IndexedDB 受到同源限制，每一个数据库对应创建它的域名。网页只能访问自身域名下的数据库，而不能访问跨域的数据库。
5. **存储空间大** IndexedDB 的储存空间比 LocalStorage 大得多，一般来说不少于 250MB，甚至没有上限。
6. **支持二进制存储** 还可以储存二进制数据（`ArrayBuffer` 对象和 `Blob` 对象）。


## 二、 操作流程
### 2.1 打开数据库

使用 IndexedDB 的第一步是打开数据库，使用indexedDB.open()方法。

```javascript
const request = window.indexedDB.open(databaseName, version)
```
如果指定的数据库不存在，就会新建数据库。第二个参数是整数，表示数据库的版本。如果省略，打开已有数据库时，默认为当前版本；新建数据库时，默认为 `1` 。  
`indexedDB.open()` 方法返回一个 `IDBRequest` 对象。这个对象通过三种事件`error`、`success`、`upgradeneeded`，处理打开数据库的操作结果。

```javascript
request.onerror = event => {
  console.log('数据库打开报错')
}

let db
request.onsuccess = event => {
  db = request.result
  console.log('数据库打开成功')
}

// 如果指定的版本号，大于数据库的实际版本号，就会发生数据库升级事件upgradeneeded。
request.onupgradeneeded = event => {
  db = event.target.result
}
```

### 2.2 新建数据库
新建数据库与打开数据库是同一个操作。如果指定的数据库不存在，就会新建。  

通常，新建数据库以后，第一件事是新建对象仓库（即新建表）。
```javascript
let db
request.onupgradeneeded = event => {
  db = event.target.result
  let objectStore
  if (!db.objectStoreNames.contains('person')) {
    objectStore = db.createObjectStore('person', { keyPath: 'id' })
  }
}
```
上面代码中，新增一张叫做 `person` 的表格，主键是 `id` 。

主键（key）是默认建立索引的属性。也可以让 `IndexedDB` 自动生成主键。
```javascript
var objectStore = db.createObjectStore(
  'person',
  { autoIncrement: true }
);
```
新建对象仓库以后，下一步可以新建索引。
```javascript
request.onupgradeneeded = event => {
  db = event.target.result
  var objectStore = db.createObjectStore('person', { keyPath: 'id' })
  objectStore.createIndex('name', 'name', { unique: false })
  objectStore.createIndex('email', 'email', { unique: true })
}
```
上面代码中，`IDBObject.createIndex()` 的三个参数分别为索引名称、索引所在的属性、配置对象（说明该属性是否包含重复的值）。

### 2.3 新增数据
```javascript
function add() {
  var request = db.transaction(['person'], 'readwrite')
    .objectStore('person')
    .add({ id: 1, name: '张三', age: 24, email: 'zhangsan@example.com' })

  request.onsuccess = event => {
    console.log('数据写入成功')
  };

  request.onerror = event => {
    console.log('数据写入失败')
  }
}

add()
```
上面代码中，写入数据需要新建一个事务。新建时必须指定表格名称和操作模式（"只读"或"读写"）。新建事务以后，通过 `IDBTransaction.objectStore(name)` 方法，拿到 `IDBObjectStore` 对象，再通过表格对象的 `add()` 方法，向表格写入一条记录。

写入操作是一个异步操作，通过监听连接对象的 `success` 事件和 `error` 事件，了解是否写入成功。

### 2.4 读取数据
```javascript
function read() {
  var transaction = db.transaction(['person'])
  var objectStore = transaction.objectStore('person')
  var request = objectStore.get(1)

  request.onerror = event => {
    console.log('事务失败')
  }

  request.onsuccess = event => {
    if (request.result) {
      console.log('Name: ' + request.result.name)
      console.log('Age: ' + request.result.age)
      console.log('Email: ' + request.result.email)
    } else {
      console.log('未获得数据记录')
    }
  }
}
read()
```
上面代码中，`objectStore.get()` 方法用于读取数据，参数是主键的值。


### 2.5 遍历数据
遍历数据表格的所有记录，要使用指针对象 `IDBCursor` 。
```javascript
function readAll() {
  var objectStore = db.transaction('person').objectStore('person')

  objectStore.openCursor().onsuccess = event => {
    var cursor = event.target.result

    if (cursor) {
      console.log('Id: ' + cursor.key)
      console.log('Name: ' + cursor.value.name)
      console.log('Age: ' + cursor.value.age)
      console.log('Email: ' + cursor.value.email)
      cursor.continue()
    } else {
      console.log('没有更多数据了！')
    }
  }
}

readAll()
```

### 2.6 更新数据
更新数据要使用 `IDBObject.put()` 方法。

```javascript
function update() {
  var request = db.transaction(['person'], 'readwrite')
    .objectStore('person')
    .put({ id: 1, name: '李四', age: 35, email: 'lisi@example.com' })

  request.onsuccess = event => {
    console.log('数据更新成功')
  };

  request.onerror = event => {
    console.log('数据更新失败')
  }
}

update()
```
上面代码中，`put()` 方法自动更新了主键为 `1` 的记录。

### 2.7 删除数据
`IDBObjectStore.delete()` 方法用于删除记录。

```javascript
function remove() {
  var request = db.transaction(['person'], 'readwrite')
    .objectStore('person')
    .delete(1)

  request.onsuccess = event => {
    console.log('数据删除成功')
  }
}

remove()
```

### 2.8 使用索引
索引的意义在于，可以让你搜索任意字段，也就是说从任意字段拿到数据记录。如果不建立索引，默认只能搜索主键（即从主键取值）。

假定新建表格的时候，对 `name` 字段建立了索引。

```javascript
objectStore.createIndex('name', 'name', { unique: false });
```
现在，就可以从 `name` 找到对应的数据记录了。
```javascript
var transaction = db.transaction(['person'], 'readonly')
var store = transaction.objectStore('person')
var index = store.index('name')
var request = index.get('李四')

request.onsuccess = event => {
  var result = event.target.result;
  if (result) {
    // ...
  } else {
    // ...
  }
}
```
