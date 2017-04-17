# table-cell

`display:table-cell` 属性指让标签元素以表格单元格的形式呈现，类似于 `td` 标签。
与其他一些`display`属性类似，`table-cell`同样会被其他一些CSS属性破坏，例如`float`, `position:absolute`，所以，在使用`display:table-cell`与`float:left`或是`position:absolute`属性尽量不用同用。设置了`display:table-cell`的元素对宽度高度敏感，对`margin`值无反应，响应`padding`属性，基本上就是一个`td`标签元素了。

`display:table-cell`的应用：  
1. 垂直居中  
2. 两栏自适应布局  
3. 等高布局  
4. 列表布局  
5. 等分列

## 1. 垂直居中
详见：[垂直居中:table-cell](vertical-middle.md#1-display-table-cell)

## 2. 两栏自适应布局
比如，我们需要实现如下效果：

![](images/table-cell-responsive.png )

左侧为头像，右侧内容自适应。这个效果很常见。可以用以下方法实现：
1. 父容器padding-left + 左侧内容position:absolute，适用于html中先渲染右侧主要内容，后渲染左侧头像。
2. 左侧内容左浮动 + 右侧内容margin-left。

还可以用`table-cell`实现。


html:
```html
<div class="container">
	<a href="###">
		<img src="http://upload.chinaz.com/2015/0413/1428888916587.png" />
	</a>
	<div class="content">
		<a href="###">Hekui</a> <span>2017.2.24</span>
		<p>
			与其他一些display属性类似，table-cell同样会被其他一些CSS属性破坏，例如float, position:absolute，所以，在使用display:table-cell与float:left或是position:absolute属性尽量不用同用。设置了display:table-cell的元素对宽度高度敏感，对margin值无反应，响应padding属性，基本上就是活脱脱的一个td标签元素了。
		</p>
	</div>
</div>
```
```css
.container{
	background-color:#f3f3f3; border:1px #ccc dashed;
	padding:10px;
}
.container a{
	float:left; margin-right: 10px;
}
.container img{ width:100px; height:100px;}
.container span{ color:#999; }
.content{
	display:table-cell; line-height:1.6; width:5000px;
}
```
如果不设置宽度，那么右侧内容太少时，宽度就等于实际宽度。设置宽度为 `5000px`，实际宽度只会撑满右侧宽度。

demo见：[http://runjs.cn/detail/wh6smlmu](http://runjs.cn/detail/wh6smlmu)

## 3. 等高布局
可以实现以下等高布局。
![](images/table-cell-column.png )

html:
```html
<div class="row">
	<div class="cell bg1">
		<p>
			仓央嘉措
		</p>
	</div>
	<div class="cell bg2">
		<p>
			我是佛前一朵莲花，我到人世来，被世人所悟，我不是普度众生的佛，我来寻我今生的情。
		</p>
	</div>
	<div class="cell">
		<p>
			那一天，我闭目在经殿香雾中，蓦然听见你颂经中的真言。
		</p>
		<p>
			那一月，我摇动所有的转经筒，不为超度，只为触摸你的指尖。
		</p>
		<p>
			那一年，我磕长头匍匐在山路，不为觐见，只为贴着你的温暖。
		</p>
		<p>
			那一世，我转山转水转佛塔啊，不为修来生，只为途中与你相见。
		</p>
	</div>
</div>
```
```css
.row{
	background-color:#f3f3f3; border:1px #ccc dashed;
	line-height: 1.5;
	/*请注意这里没有设置display: table，原因见后*/
}
.cell{
	display: table-cell;
	width: 33.3%;
	padding: 10px;
}
.bg1{
	background-color:pink;
}
.bg2{
	background-color:#e6e6e6;
}
```
demo见：[http://runjs.cn/detail/pc0dt5d1](http://runjs.cn/detail/pc0dt5d1)

 > CSS2.1表格模型中的元素，可能不会全部包含在除HTML之外的文档语言中。这时，那些“丢失”的元素会被模拟出来，从而使得表格模型能够正常工作。所有的表格元素将会自动在自身周围生成所需的匿名table对象，使其符合table/inline-table、table-row、table- cell的三层嵌套关系。

比如：如果我们为元素使用 `display:table-cell;` 属性，而不将其父容器设置为 `display:table-row;` 属性，浏览器会默认创建出一个表格行，就好像文档中真的存在一个被声明的表格行一样。

## 4. 列表布局
一般列表布局都是采用浮动的方法实现，多个元素左浮动，自动平铺及换行。  
但是浮动布局的不足在于：一是需要清除浮动造成的影响；二是不支持不定高列表的浮动。  

用`table-cell`也可以实现列表布局，但也有些复杂和局限的地方：一是需要确定每行多少列（局限之处，无法自动换行平铺）。二是每行需要用一个容器包裹（复杂之处，多加容器）。  
代码结构大致如下：
```html
<div class="container">
	<div class="row">
		<div class="cell">
			...
		</div>
		<div class="cell">
			...
		</div>
		<div class="cell">
			...
		</div>
	</div>
	<div class="row">
		<div class="cell">
			...
		</div>
		<div class="cell">
			...
		</div>
		<div class="cell">
			...
		</div>
	</div>
</div>
```
```css
.row {
    display: table-row;
}
.cell {
    display: table-cell;
    width: 33.3%;
    padding-bottom: 30px;
    vertical-align: top;
}
```

demo见：[display:table-cell实现的列表布局](http://www.zhangxinxu.com/study/201010/table-cell-list-flow-layout.html)


## 5. 等分列

display:table-cell下的列表布局最适用的场景是：列表个数不固定，但是，无论列表几个，都平分容器空间。什么意思呢？就是如果4个列表，希望每个宽度25%，3个就33.3333%，2个列表希望每个宽度50%。此时，没有比display:table-cell更合适的技术了。  
html:
```html
<h2>
	table-cell等分列
</h2>
<div class="row">
	<div class="cell bg2">
		<p>
			我是佛前一朵莲花，我到人世来，被世人所悟，我不是普度众生的佛，我来寻我今生的情。
		</p>
	</div>
	<div class="cell bg2">
		<p>
			我是佛前一朵莲花，我到人世来，被世人所悟，我不是普度众生的佛，我来寻我今生的情。
		</p>
	</div>
	<!--可尝试多复制几个.cell代码段查看效果-->
</div>
```
```css
.row{
	background-color:#f3f3f3; border:1px #ccc dashed;
	line-height: 1.5;
	display: table;
}
.cell{
	display: table-cell;
	padding: 10px;
}
```
demo见：[http://runjs.cn/detail/llgzl3tl](http://runjs.cn/detail/llgzl3tl)
