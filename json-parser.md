# JSON.stringify() 和 JSON.parse()详解

## JSON.stringify()
JSON.stringify() 方法将JavaScript值转换为JSON字符串，如果指定了replacer函数，则可以替换值，或者如果指定了replacer数组，则可选地仅包括指定的属性。  
[查看 JSON.stringify() 标准文档](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify)

### 语法
```JavaScript
JSON.stringify(value[, replacer [, space]])
```
### 参数

**value**  
将要序列化成 JSON 字符串的值。

**replacer** 可选  
    如果该参数是一个函数，则在序列化过程中，被序列化的值的每个属性都会经过该函数的转换和处理；  
    如果该参数是一个数组，则只有包含在这个数组中的属性名才会被序列化到最终的 JSON 字符串中；  
    如果该参数为null或者未提供，则对象所有的属性都会被序列化；  

**space** 可选  
    指定缩进用的空白字符串，用于美化输出（pretty-print）；  
    如果参数是个数字，它代表有多少的空格；上限为10。该值若小于1，则意味着没有空格；  
    如果该参数为字符串(字符串的前十个字母)，该字符串将被作为空格；  
    如果该参数没有提供（或者为null）将没有空格。
### 示例
```JavaScript
JSON.stringify({});                        // '{}'
JSON.stringify(true);                      // 'true'
JSON.stringify("foo");                     // '"foo"'
JSON.stringify([1, "false", false]);       // '[1,"false",false]'
JSON.stringify({ x: 5 });                  // '{"x":5}'

JSON.stringify({x: 5, y: 6});              
// "{"x":5,"y":6}"

JSON.stringify([new Number(1), new String("false"), new Boolean(false)]);
// '[1,"false",false]'

JSON.stringify({x: undefined, y: Object, z: Symbol("")});
// '{}'

JSON.stringify([undefined, Object, Symbol("")]);          
// '[null,null,null]'

JSON.stringify({[Symbol("foo")]: "foo"});                 
// '{}'

JSON.stringify({[Symbol.for("foo")]: "foo"}, [Symbol.for("foo")]);
// '{}'

JSON.stringify(
    {[Symbol.for("foo")]: "foo"},
    function (k, v) {
        if (typeof k === "symbol"){
            return "a symbol";
        }
    }
);


// undefined

// 不可枚举的属性默认会被忽略：
JSON.stringify(
    Object.create(
        null,
        {
            x: { value: 'x', enumerable: false },
            y: { value: 'y', enumerable: true }
        }
    )
);

// "{"y":"y"}"
```
```JavaScript
JSON.stringify({ a: 2 }, null, " ");   // '{\n "a": 2\n}'

JSON.stringify({ uno: 1, dos : 2 }, null, '\t')  //使用数字2也有类似的效果，只是间距大小的区别。
// '{            \
//     "uno": 1, \
//     "dos": 2  \
// }'
```

## JSON.parse()
JSON.parse() 方法解析一个JSON字符串，构造由字符串描述的JavaScript值或对象。可以提供可选的reviver函数以在返回之前对所得到的对象执行变换。  
[查看 JSON.parse() 标准文档](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse)

### 语法:  

```JavaScript
JSON.parse(text[, reviver])
```
### 参数:  

**text**  
    要被解析成JavaSctipt值的字符串。  

**reviver** 可选  
    如果是一个函数，则规定了原始值如何被解析改造，在被返回之前。

### 示例：
```JavaSctipt
JSON.parse('{}');              // {}
JSON.parse('true');            // true
JSON.parse('"foo"');           // "foo"
JSON.parse('[1, 5, "false"]'); // [1, 5, "false"]
JSON.parse('null');            // null

JSON.parse('{"p": 5}', function (k, v) {
    if(k === '') return v;     // 如果到了最顶层，则直接返回属性值，
    return v * 2;              // 否则将属性值变为原来的 2 倍。
});                            // { p: 10 }

JSON.parse('{"1": 1, "2": 2,"3": {"4": 4, "5": {"6": 6}}}', function (k, v) {
    console.log(k); // 输出当前的属性名，从而得知遍历顺序是从内向外的，
                    // 最后一个属性名会是个空字符串。
    return v;       // 返回原始属性值，相当于没有传递 reviver 参数。
});

// 1
// 2
// 4
// 6
// 5
// 3
// ""
```

### JSON.parse() 不允许用逗号作为结尾
以下两个都会报错。
```JavaSctipt
// both will throw a SyntaxError
JSON.parse("[1, 2, 3, 4, ]");
JSON.parse('{"foo" : 1, }');
```
