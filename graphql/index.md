#GraphQL 入门

[GraphQL 官网](http://graphql.cn/)
> 以下两句话，有点晦涩难懂，需要在对 GraphQL 有个大体的认知后才好理解，可以在本页后续内容阅读完以后再来回顾。  

GraphQL 是一个用于 API 的查询语言，是一个使用基于类型系统来执行查询的服务端运行时（类型系统由你的数据定义）。  
一个 GraphQL 服务是通过定义类型和类型上的字段来创建的，然后给每个类型上的每个字段提供解析函数。
```javascript
type User {
  id: ID
  name: String
}
```

## 我的理解
GraphQL 包括服务端、客户端。是部署在服务端以及客户端之间的一个中间层，在服务端创建类型（数据模型），客户端根据 GraphQL客户端 发送请求，执行类型查询、修改，服务端根据请求查询数据库，返回所有数据给客户端。  
有聚合的功能，在一个页面中，以前需要多个 api 查询，通过 GraphQL 可以一次查询返回。  
GraphQL 的数据交互，本质还是post、get请求。  
服务端构建  
前端构建  
vue-grphql demo  
vue-ssr-grphql demo  

## 来个VUE实例
本例只演示一次数据的查询操作，完整VUE实例见：[vue 实例](./demo-vue.md)
```javascript
// 注册部分，省略

//定义查询
import gql from 'graphql-tag'

const q_user = gql`query q_user($id: Int){
    User(id: $id){
        id
        address
        name
    }
}`

// 具体调用
this.$apollo.query({
    query: q_user,
    variables: {
        id: 1,
    },
}).then(res => {
    console.log(res)
}).catch(err => {
    console.log(err)
})
```

## 一些思考/遵循的东西
> 使用 GraphQL，你可以将你所有的业务建模为图
> 希望构建一个描述客户端如何使用数据的 GraphQL schema，而不是镜像旧有的数据库 schema。