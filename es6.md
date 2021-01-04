从1加到100是多少
```javascript
var a = 0;
for(var i = 0; i < 101; i++){
  a += i;
}
console.log(a)     // 5050

```
***

####温习闭包####
```javascript
function f1(){
    var n = 999;
    function f2(){
        console.log(n)
    }
    return f2;
}
var result = f1();
result();
```

闭包作用：函数f1外部读取函数f1内部变量

```javascript
function f1(){
    var n = 999;
    nAdd = function(){
        n += 1;
    }
    function f2(){
        console.log(n)
    }
    return f2;
}
var result = f1();
result();     //999
nAdd();
result();     //1000
```


函数f1中的局部变量n一直保存在内存中，并没有在f1调用后被自动清除

f1是f2的父函数，而f2被赋给了一个全局变量，这导致f2始终在内存中，
而f2的存在依赖于f1，因此f1也始终在内存中，不会在调用结束后，
被垃圾回收机制（garbage collection）回收

“nAdd=function(){n+=1}”这一行，首先在nAdd前面没有使用var关键字，
因此 nAdd是一个全局变量，而不是局部变量。
其次，nAdd的值是一个匿名函数（anonymous function），
而这个匿名函数本身也是一个闭包，
所以nAdd相当于是一个setter，可以在函数外部对函数内部的局部变量进行操作。

***

#### 订阅模式-实现公共js库
```javascript
var moudle = (function(){
    var str;
    function fn(){};
    return {
        fn: fn,
        str: str
    }
})()
```
## ES6语法

ES6 新增了let命令，用来声明变量。它的用法类似于var，
但是所声明的变量，只在let命令所在的代码块内有效。

```javascript
{
  let a = 10;
  var b = 1;
}
a // ReferenceError: a is not defined.
b // 1
```
let声明的变量只在它所在的代码块有效

#### 不存在变量提升

```javascript
// var 的情况
console.log(foo); // 输出undefined
var foo = 2;

// let 的情况
console.log(bar); // 报错ReferenceError
let bar = 2;
```

ES6 模块之中，顶层的this指向undefined，即不应该在顶层代码使用this

## export命令 ##

export命令用于规定模块的对外接口，import命令用于输入其他模块提供的功能

Module 的加载实现

```javascript
<script src="path/to/myModule.js" defer></script>
<script src="path/to/myModule.js" async></script>
```

script标签打开defer或async属性，脚本就会异步加载。
渲染引擎遇到这一行命令，就会开始下载外部脚本，但不会等它下载和执行，
而是直接执行后面的命令。

defer要等到整个页面在内存中正常渲染结束（DOM 结构完全生成，以及其他脚本执行完成，
才会执行

async一旦下载完，渲染引擎就会中断渲染，执行这个脚本以后，再继续渲染

defer是“渲染完再执行”，async是“下载完就执行”   ES6模块 异步加载

***
1、加载es6模块需要服务器环境<br/>
2、在同级目录路径 import a from './a.js'   前面需要加相对地址
***

因为export default命令的本质是将后面的值，赋给default变量，
所以可以直接将一个值写在export default之后


CommonJS 模块输出的是一个值的拷贝，ES6 模块输出的是值的引用<br/>
CommonJS 模块是运行时加载，ES6 模块是编译时输出接口

CommonJS会缓存原始类型的值，而ES6模块不会缓存

### const命令###

const声明一个只读的常量，一旦声明，常量的值就不能改变。但是let的值可以改变，只是都
不可以重复声明
```javascript
const a = 1;
a   // 1
a = 2;     //Assignment to constant variable
const a = 3;    //Identifier 'a' has already been declared

let b = 1;
b   // 1
b = 2;  //  2
let b = 3;    //Identifier 'a' has already been declared

```
const声明的变量不能改变值，这意味着，const一旦声明变量，就必须立即初始化，
不能留到以后赋值

###### 本质
const实际上保证的，并不是变量的值不得改动，而是变量指向的那个内存地址不得改动。对于
复合类型的数据（主要是对象和数组），变量指向的内存地址，保存的只是一个指针，const只能
保证这个指针是固定的，至于他指向的数据结构是不是可变的，就完全不能控制了。因此将一个对象
声明为常量必须非常小心

```javascript
const foo = {};

foo.prop = 123;
foo.prop   //123

//将 foo 指向另一个对象，就会报错
foo = {}  // "foo" is read-only
```

#### 顶层对象的属性 ####

```javascript
window.a = 1;
a // 1

a = 2;
window.a  // 2

```
顶层对象的赋值与全局变量的赋值，是同一件事，var命令和function命令声明的全局变量，
依旧是顶层对象的属性；let命令、const命令、class命令声明的全局变量，不属于顶层对象的
属性，从es6开始，全局变量将逐步与顶层对象的属性脱钩。

理解： 顶层对象即window对象，使用es6命令相当于在自己的模块里自定义变量值，污染不到
顶层对象的属性值

### 数组的解构赋值 ###

let [a,b,c] = [1,2,3];

理解：相比于以前的var a = 1，b = 2, c = 3; es6的模式更加对应清晰简洁

 Set 结构，也可以使用数组的解构赋值。

```javascript
let [x, y, z] = new Set(['a', 'b', 'c']);
x // "a"
```
事实上，只要某种数据结构具有 Iterator 接口，都可以采用数组形式的解构赋值。

```javascript
function* fibs() {
  let a = 0;
  let b = 1;
  while (true) {
    yield a;
    [a, b] = [b, a + b];
  }
}

let [first, second, third, fourth, fifth, sixth] = fibs();
sixth // 5
```

fibs是一个 Generator 函数（参见《Generator 函数》一章），原生具有 Iterator 接口

```javascript
let [a = 1] = [];
a    //  1

let [b = 1] = [null];
b    // null

```
ES6内部使用严格相等运算符（===），判断一个位置是否有值，只有当一个数组成员严格等于
undefined，默认值才会生效

注意 ：  这里未定义（空‘’）即是undefined，默认值就会生效，所以上面a等于1

```javascript
let [x = 1, y = x] = [];     // x=1; y=1
let [x = 1, y = x] = [2];    // x=2; y=2
let [x = 1, y = x] = [1, 2]; // x=1; y=2
let [x = y, y = 1] = [];     // ReferenceError: y is not defined
```
默认值可以引用解构赋值其他变量，但该变量必须已经声明，所以上面x用到y的默认值，但是y
还没有声明，所以报错

### 对象的解构赋值 ###

```javascript
let { foo: baz } = { foo: "aaa", bar: "bbb" };
baz   //aaa
foo   // error: foo is not defined


let obj = {
  p: [
    'Hello',
    { y: 'World' }
  ]
};

let { p, p: [x, { y }] } = obj;
x // "Hello"
y // "World"
p // ["Hello", {y: "World"}]
```
对象的解构赋值的内部机制，是先找到同名属性，然后再赋给对应的变量。
真正被赋值的是后者，而不是前者
foo是匹配的模式，baz才是变量。真正被赋值的是变量baz，而不是模式foo

p作为变量赋值，可以写成上面这样


```javascript

const node = {
  loc: {
    start: {
      line: 1,
      column: 5
    }
  }
};

let { loc, loc: { start }, loc: { start: { line }} } = node;
//只有line是变量，loc和start都是模式，不是变量


var {x: y = 3} = {x: 5};
y  //5

var {x = 3} = {x: null};
x  //null
//默认值生效的条件是，对象的属性值严格等于undefined
```

### 字符串的扩展 ###

JavaScript 允许采用\uxxxx形式表示一个字符，其中xxxx表示字符的 Unicode 码点
```javascript
"\u0061"
// "a"

"\uD842\uDFB7"
// "𠮷"

"\u20BB7"
// " 7"

"\u{20BB7}"
// "𠮷"
```
理解： 转码就是这么来的


### promise ###
pending（进行中）、fulfilled（已成功）和rejected（已失败）resolved（已定型）



### 箭头函数 ###

```javascript
var f = () => 5;
// 等同于
var f = function () { return 5 };

var sum = (num1, num2) => num1 + num2;
// 等同于
var sum = function(num1, num2) {
  return num1 + num2;
};

var f = v => v + 3;
f(4)    // 7    f(v)
理解： var f = function(v){ return v+3 }

var f = (a,b) => a + b + 3;

f // (a,b) => a + b + 3
f(5,7)    //15

用了箭头函数就不需要去写返回return了，直接就是返回值

//返回对象字面量

这句会报错：

var func = () => { foo: 1 };
func()    //  undefined

//因为花括号（{} ）里面的代码被解析为一系列语句
//（即 foo 被认为是一个标签，而非对象字面量的组成部分）
-----
var func = () => ({foo: 1});

func()    // {foo: 1}
---------------------------------------


说明： 对比下面3个函数的实现

function Person() {
  // Person() 构造函数定义 `this`作为它自己的实例.
  this.age = 0;

  setInterval(function growUp() {
    // 在非严格模式, growUp()函数定义 `this`作为全局对象,
    // 与在 Person()构造函数中定义的 `this`并不相同
    console.log(this)    //window
    this.age++;
  }, 1000);
}

var p = new Person();

----------


function Person() {
  var that = this;
  that.age = 0;

  setInterval(function growUp() {
    //  回调引用的是`that`变量, 其值是预期的对象
    console.log(that)      //person   引入了that才行
    that.age++;
  }, 1000);
}

----------
重点来了 用箭头函数
----------


function Person(){
  this.age = 0;

  setInterval(() => {
    console.log(this)
    this.age++; //Person  |this| 正确地指向person 对象
  }, 1000);
}

var p = new Person();

理解： this,它只会从自己的作用域链的上一层继承this，
传递给setInterval的函数内的this与封闭函数中的this值相同

------------------------------------------

var adder = {
  base : 1,

  add : function(a) {
    var f = v => v + this.base;
    return f(a);
  },

  addThruCall: function(a) {
    var f = v => v + this.base;
    var b = {
      base : 2
    };

    return f.call(b, a);
  }
};

console.log(adder.add(1));         // 输出 2
console.log(adder.addThruCall(1)); // 仍然输出 2（而不是3）


注意点：箭头函数没有自己的this指针，通过 call() 或 apply() 方法调用一个函数时，
只能传递参数（不能绑定this），他们的第一个参数会被忽略。
（这种现象对于bind方法同样成立）


var a = [1, 2, 3];
var arr = () => a[0];

arr(); // 1


var a = b => 4;

a()    //  4

理解： 一定要有一个中间键(形参)，不然会语法报错


function foo(n) {
  var f = () => arguments[0] + n; // 隐式绑定 foo 函数的 arguments 对象
                                  //arguments[0] 是 n
  return f();
}

foo(5); // 10


```

### 函数的扩展  ###

```javascript
//函数参数的默认值
function log(x, y = 'World') {
  console.log(x, y);
}

log('Hello') // Hello World
log('Hello', 'China') // Hello China
log('Hello', '') // Hello


function Point(x = 0, y = 0) {
  this.x = x;
  this.y = y;
}

const p = new Point();
p // { x: 0, y: 0 }


```


### Set 和 Map 数据结构 ###

1、ES6 提供了新的数据结构 Set。它类似于数组，但是成员的值都是唯一的，没有重复的值
#### 注意点： 没有重复值

```javascript
const s = new Set();

[2, 3, 5, 4, 5, 2, 2].forEach(x => s.add(x));

for (let i of s) {
  console.log(i);
}
// 2 3 5 4
s.length   // 4

const set = new Set([1, 2, 3, 4, 4]);
[...set]     //注意这种写法才能返回数组，否则返回的还是Set数据
//[1,2,3,4]


//去除数组重复元素新方法
[...new Set(array)]


function dedupe(array) {
  return Array.from(new Set(array));
}
dedupe([1, 1, 2, 3]) // [1, 2, 3]
```

#### 操作方法（用于操作数据）和遍历方法（用于遍历成员） ####

add(value)：添加某个值，返回 Set 结构本身。
delete(value)：删除某个值，返回一个布尔值，表示删除是否成功。
has(value)：返回一个布尔值，表示该值是否为Set的成员。
clear()：清除所有成员，没有返回值。

### 对象的扩展 ###

```javascript
const foo = 'bar';
const baz = {foo};
baz // {foo: "bar"}

// 等同于
const baz = {foo: foo};


function f(x, y) {
  return {x, y};
}

// 等同于

function f(x, y) {
  return {x: x, y: y};
}

f(1, 2) // Object {x: 1, y: 2}

理解:  在对象括号内变量名只要赋值了，就既是键也是键值


const o = {
  method() {
    return "Hello!";
  }
};

理解：   上面Vue的实例方法就是这样写的

// 等同于

const o = {
  method: function() {
    return "Hello!";
  }
};


let birth = '2000/01/01';

const Person = {

  name: '张三',

  //等同于birth: birth
  birth,

  // 等同于hello: function ()...
  hello() { console.log('我的名字是', this.name); }

};

理解：  融合的，既有es5的写法也有es6的写法

```

### Generator 函数 ###
（英语中，generator 这个词是“生成器”的意思）
特征：
    一是，function关键字与函数名之间有一个星号；
    二是，函数体内部使用yield表达式，定义不同的内部状态（yield在英语里的意思就是“产出”）

```javascript
function* helloWorldGenerator() {
  yield 'hello';
  yield 'world';
  return 'ending';
}

var hw = helloWorldGenerator();

hw.next()
// { value: 'hello', done: false }

hw.next()
// { value: 'world', done: false }

hw.next()
// { value: 'ending', done: true }

hw.next()
// { value: undefined, done: true }

```
理解：   类似于 switch case 语句，直接用一个函数解决了

调用 Generator 函数，返回一个遍历器对象

value属性表示当前的内部状态的值
是yield表达式后面那个表达式的值
done属性是一个布尔值，表示是否遍历结束


Generator 函数可以不用yield表达式，这时就变成了一个单纯的暂缓执行函数

```javascript
function* f() {
  console.log('执行了！')
}

var generator = f();

setTimeout(function () {
  generator.next()
}, 2000);

理解: 函数f如果是普通函数，在为变量generator赋值时就会执行
    但是，函数f是一个 Generator 函数，就变成只有调用next方法时，函数f才会执行
```

---------------------------------------------------------

#### HTTP协议 ####

常见的HTTP状态码：

200 - 请求成功
301 - 资源（网页等）被永久转移到其它URL
404 - 请求的资源（网页等）不存在
500 - 内部服务器错误

HTTP状态码分类：

1**    信息，服务器收到请求，需要请求者继续执行操作
2**	   成功，操作被成功接收并处理
3**	   重定向，需要进一步的操作以完成请求
4**	   客户端错误，请求包含语法错误或无法完成请求
5**	   服务器错误，服务器在处理请求的过程中发生了错误


分析完整的一个请求过程(从浏览器输入域名到页面展示背后的事情)


DNS域名解析
先找本地hosts文件，检查对应域名ip的关系，有则想ip地址发送请求，没有再去找DNS服务器

建立TCP连接
拿到服务器IP后，向服务器发送求求，三次握手，建立TCP连接
简单理解三次握手：
客户端：您好，在家不，有你快递
服务端：在的，送来吧
客户端：好滴，来了


发送HTTP请求
与服务器建立连接后，就可以向服务器发起请求了。具体请求内容可以在浏览器中查看


服务器处理请求
服务器收到请求后由web服务器（Apache，Nginx）处理请求,web服务器解析用户请求，知道了需要调用那些资源文件，
再通过相应的这些资源文件处理用户请求和参数，并调用数据库等，然后将结果通过web服务器返回给浏览器


返回响应结果
在响应结果中都会有一个HTTP状态码，诸如我们熟知的200、404、500等
状态码都是由三位数字和原因短语组成，大致为五类：
1XX 信息性状态码 接收的请求正在处理
2XX 成功状态码 请求正常处理完毕
3XX 重定向状态码 需要附加操作以完成请求
4XX 客户端错误状态码 服务器也无法处理的请求
5XX 服务器错误状态码 服务器请求处理出错


关闭TCP连接
为了避免服务器与客户端双方资源占用和消耗，当双方没有请求或者响应传递时，任意一方都可以发起关闭请求，与创建TCP连接的三次握手类似，关闭TCP连接需要4次挥手
简单比喻为：
客户端：哥们，我这边没有数据要传了，咱们关闭连接吧
服务端：好的，我看看我这边还有数据不
服务端：兄弟，我这边也没数据要传给你了，咱们可以关闭连接了
客户端：好嘞


浏览器解析HTML


浏览器布局渲染


----------------------------------------------------------

Remote Address   远程地址

general   一般的

Referer  来源网址

GET方式需要对传输的数据进行转码（url编码）-encodeURI()

GET把参数包含在URL中，POST通过request body传递参数

get方式会缓存页面，需要通过随机数或时间戳解决缓存问题，而post不会缓存所以没有该问题

安全性

POST的安全性比GET的高
这里的安全是指真正的安全，而不同于上面GET提到的安全方法中的安全，
上面提到的安全仅仅是不修改服务器的数据。比如，在进行登录操作，通过GET请求，
用户名和密码都会暴露再URL上，因为登录页面有可能被浏览器缓存以及其他人查看浏览器
的历史记录的原因，此时的用户名和密码就很容易被他人拿到了。除此之外，
GET请求提交的数据还可能会造成Cross-site request frogery攻击

GET的执行效率要比POST高

get是从服务器上获取数据，post是向服务器传送数据

对于get方式，服务器端用Request.QueryString获取变量的值，

对于post方式，服务器端用Request.Form获取提交的数据

#### vue2.0之axios使用  ####

在浏览器中发送 XMLHttpRequests 请求
在 node.js 中发送 http请求
支持 Promise API
拦截请求和响应
转换请求和响应数据
自动转换 JSON 数据
客户端支持保护安全免受 XSRF 攻击
理解： 就是 ajax 请求

#####  CSRF防御  cross-site request forgery（跨站点请求伪造）

通过 referer、token 或者 验证码 来检测用户提交  （图片验证码）
尽量不要在页面的链接中暴露用户隐私信息
对于用户修改删除等操作最好都使用post 操作
避免全站通用的cookie，严格设置cookie的域

###  Vue 的 ref 用法

ref 被用来给元素或子组件注册引用信息。引用信息将会注册在父组件的 $refs 对象上。

如果在普通的 DOM 元素上使用，引用指向的就是 DOM 元素；如果用在子组件上，引用就指向组件实例：

input的引用信息为input1 ，$refs 是所有注册过的ref的一个集合，

```javascript

console.log(this.$refs.input1)//<input type="text" id="input1">

console.log(document.getElementById('input1'))//<input type="text" id="input1">

```

这两种方法获得的都是Dom节点，而$refs相对document.getElementById的方法，会减少获取dom节点的消耗。


$refs  this.$refs.comp._data.comp(读取子组件数据)  ref

子组件的引用

相对于事件传值来说，又提供了一种子组件向父组件传值的方式

####    JS对象遍历

```javascript
var obj = {
    a: 1,
    b: 2,
    c: 3
}
//for-in遍历对象属性,i指代属性名
for(var i in obj){
    console.log(i+": "+obj[i])
}

对象的另外一种访问方式：
obj['a']
注意： 这里的a属性需要加引号
```
关于各种数据的遍历方法：
https://www.cnblogs.com/yangshifu/p/7377102.html

#####  javascript原生遍历方法的建议用法：

用for循环遍历数组
用for-in遍历对象
用for-of遍历类数组对象（ES6）
用Object.keys()获取对象属性名的集合


#### 	js 数组 map方法

```javascript

var data = [1, 2, 3, 4];

var array = data.map(function(item) {
  return item * item;
});

array    // [1, 4, 9, 16]    返回的是一个数组

array.forEach(function(i){       //遍历数组，forEach方法要传一个回调函数
  console.log(i)
})


setTimeout(() => { alert(1) },2000)

==


setTimeout('alert(11)',2000)


Vue

<slot name="down"></slot>  <!--具名插槽  数据由父组件提供-->

<div slot="down">
	<span>88888888888888888</span>
</div>


<slot :data="data"></slot>  <!--作用域插槽  数据由子组件提供-->

<template slot-scope="user">
	<span v-for="item in user.data" class="user">{{ item }}</span>
</template>


this.$refs.input.value = '2222'    //this.$refs.input  减少获取dom节点的消耗

this.$parent.$refs.father.innerHTML;    //引用父组件 需用 $

this.$children[0].$refs.child.innerHTML;     //引用子组件的写法

//在通信中，无论是子组件向父组件传值还是父组件向子组件传值，他们都有一个共同点就是有中间介质，
//子向父的介质是自定义事件，父向子的介质是props中的属性。抓准这两点对于父子通信就好理解了


console.time(2);     //打桩   计算js的运行时间  比较哪种写法时间少

console.timeEnd(2);


//forEach 用法(一般只用于数组)

var arr = [1,4,5,7,23,45,'sad',234,657]

arr.forEach(function(v) {
	console.log(v);
});

arr.forEach(v=>{
    console.log(v);
});


//map 用法 (映射)   callback需要return值，如果没有，数组所有项都会被映射成 undefined

var newArr = arr.map(function(item){
	return item + item
})

console.log(newArr)  // [2, 8, 10, 14, 46, 90, "sadsad", 468, 1314]


//在实际使用的时候，我们可以利用map方法方便获得对象数组中的特定属性值们

var users = [
  {name: "张含韵", "email": "zhang@email.com"},
  {name: "江一燕",   "email": "jiang@email.com"},
  {name: "李小璐",  "email": "li@email.com"}
];

var emails = users.map(function(user){
	return user.email
})

console.log(emails)   // ["zhang@email.com", "jiang@email.com", "li@email.com"]


```

performance  性能


https://blog.csdn.net/a895865025/article/details/60877425   使用display:flex 弹性布局

布局的传统解决方案，基于盒状模型，依赖 display属性 + position属性 + float属性 + Flex布局

Flex是Flexible Box的缩写，意为”弹性布局”，用来为盒状模型提供最大的灵活性。

  设为Flex布局以后，子元素的float、clear和vertical-align属性将失效。

eg:      //理解：一般用于垂直布局上，会比较好，是设置在盒子上的，作用于子元素上


display: flex;
justify-content: center;
flex-direction: column;
flex: 1;

flex-direction: row | row-reverse | column | column-reverse;

row（默认值）：主轴为水平方向，起点在左端
row-reverse：主轴为水平方向，起点在右端
column：主轴为垂直方向，起点在上沿
column-reverse：主轴为垂直方向，起点在下沿

flex-wrap: nowrap | wrap | wrap-reverse;
nowrap（默认）：不换行
wrap：换行，第一行在上方
wrap-reverse：换行，第一行在下方

justify-content: flex-start | flex-end | center | space-between | space-around;

flex-start（默认值）：左对齐
flex-end：右对齐
center： 居中
space-between：两端对齐，项目之间的间隔都相等
space-around：每个项目两侧的间隔相等。所以，项目之间的间隔比项目与边框的间隔大一倍

flex容器内有两条轴，主轴（main axis 水平【从左到右】）和侧轴（cross asix 垂直【从上到下】），每条轴都有起点和终点。



而需要伸缩布局的父元素叫：伸缩容器

伸缩布局的元素叫：伸缩项



pxcook    前端UI编码神器


数组 map和forEach方法的不同与相同

相同点： 匿名函数传递的参数相同，数组中的当前项item,当前项的索引index,原始数组

不同：map
      根据遍历执行的匿名函数，对于原数组中的每个值产生一个对应的值，并返回一个新的数组，
      存在一个映射关系，并且不会改变原数组，不会对空数组进行检测

	  forEach 理论上这个方法是没有返回值的，仅仅是遍历数组中的每一项，不对原来数组修改；
	  但是可以自己通过数组的索引来修改原来的数组




Flexbox 可以在不同屏幕尺寸上提供一致的布局结构。

一般来说，使用flexDirection、alignItems和 justifyContent三个样式属性就已经能满足大多数布局需求。



function print(ready) {
	return new Promise ((resolve, reject)=>{
		if(ready){
			resolve("Hello World!");
		}else{
			reject("Good bye!");
		}
	})
}

print(true).then(message=>{
	alert(message);
},error=>{
	alert(error);
}
);


箭头函数

var single = a => a
single('hello, world') // 'hello, world'



Vue 扇形图组件
https://github.com/MLuminary/subentry/tree/master/mini-circleProgress



display: flex;   设置在容器上的       //flex  弯曲



主轴：    (横向的)

flex-direction

row（默认值）：主轴为水平方向，起点在左端
row-reverse：主轴为水平方向，起点在右端
column：主轴为垂直方向，起点在上沿
column-reverse：主轴为垂直方向，起点在下沿

flex-wrap     //wrap  缠绕

nowrap（默认）：不换行
wrap：换行，第一行在上方
wrap-reverse：换行，第一行在下方

(flex-flow)

justify-content              //justify  证明

flex-start（默认值）：左对齐   //  if(flex-direction: column){上对齐}
flex-end：右对齐               //  if(flex-direction: column){下对齐}
center： 居中                  //  if(flex-direction: column){居中对齐}
space-between：两端对齐，项目之间的间隔都相等
space-around：每个项目两侧的间隔相等。所以，项目之间的间隔比项目与边框的间隔大一倍


交叉轴：

align-items   //把item项目内元素由块级元素转为行内元素，并且指定浮动方向

flex-start：交叉轴的起点对齐
flex-end：交叉轴的终点对齐
center：交叉轴的中点对齐
baseline: 项目的第一行文字的基线对齐
stretch（默认值）：如果项目未设置高度或设为auto，将占满整个容器的高度


align-content   属性定义了多根轴线的对齐方式。如果项目只有一根轴线，该属性不起作用

flex-start：与交叉轴的起点对齐
flex-end：与交叉轴的终点对齐
center：与交叉轴的中点对齐
space-between：与交叉轴两端对齐，轴线之间的间隔平均分布
space-around：每根轴线两侧的间隔都相等。所以，轴线之间的间隔比轴线与边框的间隔大一倍
stretch（默认值）：轴线占满整个交叉轴



行内元素 span b     块级元素 p div ul li



min-height: 100vh;    可视区域



//无限滚动加载数据

var lazyImg = document.querySelectorAll('img');//获取所有懒加载的img标签
var lazyLen = lazyImg.length;//获取所有懒加载的img的长度
var lazyNum = 0; //存储图片加载到的位置，避免每次都从第一张图片开始遍历
    window.onscroll = function () {
      var scrollT = document.documentElement.scrollTop || document.body.scrollTop; //滚动条的垂直偏移
      var scrollH = document.documentElement.scrollHeight || document.body.scrollHeight; //元素的整体高度
      var clientH = document.documentElement.clientHeight || document.body.clientHeight; //元素的可见高度
      if (scrollT == scrollH - clientH) {
          console.log("到底部了");
      }
    else if (scrollT < scrollH - clientH) {
        console.log("到顶了")
    }
    for (var i = lazyNum; i < lazyLen; i++) {
        if (lazyImg[i].offsetTop < clientH + scrollT) {//触发加载
            if (lazyImg[i].getAttribute('src') == '') {
                lazyImg[i].src = lazyImg[i].getAttribute('lazy_src');
            }
            lazyNum = i + 1;
        }
    }
}




//获取当前时间
function getNowFormatDate(){
  var date = new Date();
  var seperator1 = "-";
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var strDate = date.getDate();
  if (month >= 1 && month <= 9) {
      month = "0" + month;
  }
  if (strDate >= 0 && strDate <= 9) {
      strDate = "0" + strDate;
  }
  var currentdate = year + seperator1 + month + seperator1 + strDate;
  return currentdate;
}



//千分符的使用方法
template.helper('format',function(par){
  return par.toString().replace(/\d+/, function (n) { // 先提取整数部分
    return n.replace(/(\d)(?=(\d{3})+$)/g, function ($1) { // 对整数部分添加分隔符
       return $1 + ","
    })
  })
})


autofocus="autofocus"   input自动锁定光标


//单行文本的溢出显示省略号
overflow: hidden;
text-overflow:ellipsis;
white-space: nowrap;


//多行文本溢出显示省略号
display: -webkit-box;
-webkit-box-orient: vertical;
-webkit-line-clamp: 3;
overflow: hidden;

js只保留整数，向上取整，四舍五入，向下取整等函数

1.丢弃小数部分,保留整数部分
parseInt(5/2)

2.向上取整,有小数就整数部分加1

Math.ceil(5/2)

3,四舍五入

Math.round(5/2)

4,向下取整

Math.floor(5/2)




ipconfig /flushdns

刷新DNS


所以if判断要加上 条件值 的非空

judgeAddr: function(value){
	if(value && value.indexOf("http") == -1){
		return window.img + value 
	}
	return value
}

此处value = null 直接就报错了,因为 null 值 没有indexOf 方法



------------------------------------------------------


改变函数内部的this指向的三种方法(本来是指向window的)


call()方法可以调用函数，还可以改变函数内的this指向，它的主要作用是可以实现继承

var o = {
   name: 'kkkk'
}
function fun(a,b){
   console.log(this);
   console.log(this.name)
   console.log(a+b)
}
fun.call(o,1,3)

-----------

fun.apply(thisArg,[argsArray])（传递的值必须包含在数组里）
apply()方法可以调用函数，还可以改变函数内的this指向，但它的参数必须是数组

var arr = [1, 33, 22, 44, 12];
var max = Math.max.apply(Math, arr);
var min = Math.min.apply(Math, arr);
console.log(max, min);




/*定义一个人类*/
function Person(name,age)
{
	this.name=name;
	this.age=age;
}
/*定义一个学生类*/
function Student(name,age,grade)
{
	Person.apply(this,arguments);
	
	console.log(arguments);    //参数对象
    console.log(this);			//Student这个实例对象
		
	this.grade=grade;
}
//创建一个学生类
var student=new Student("zhangsan",21,"一年级");
//测试
alert("name:"+student.name+"\n"+"age:"+student.age+"\n"+"grade:"+student.grade);

//大家可以看到测试结果name:zhangsan age:21  grade:一年级
//学生类里面我没有给name和age属性赋值啊,为什么又存在这两个属性的值呢,这个就是apply的神奇之处
	

------------


bind()方法不会调用函数，但是可以改变函数内部this指向

var o = {
    name: 'Andy'
}

function fun(a, b) {
    console.log(this);
    console.log(a + b);
}
var f = fun.bind(o, 1, 2);    //这里不能调用函数，所以需要一个变量来实现调用
f();


3、call、apply、bind总结
相同点：都可以改变函数内部的this指向

区别：

1.call和apply会调用函数，并且改变函数内部的this指向

2.call和apply传递的参数不一样，apply必须以数组形式

3.bind不会调用函数，但是会改变函数内部的this指向

主要应用场景：

1.call主要用作继承

2.apply经常跟数组有关，比如借助数学对象实现数组中的最大最小值

3.bind可用于改变定时器内部的this指向

--------------------------------------------------------------


event queue   事件队列          Event Loop  事件循环


宏任务(task)和微任务（Microtasks）都是异步任务

macro-task		micro-task


同步任务按照上下顺序执行，同步任务执行完成后先执行 微任务 ，再执行 宏任务


console.log('代码执行开始');						//同步任务
setTimeout(function(){
	console.log('定时器开始')						//异步任务-宏任务
});

new Promise(function(resolve){
	console.log('马上执行for循环');                	//同步任务
	for(var i = 0; i < 10000; i++){
		i == 99 && resolve();
	}
}).then(function(){
	console.log('执行then函数')						//异步任务-微任务
});

console.log('代码执行结束');						//同步任务
 
 
代码执行开始
马上执行for循环
代码执行结束
执行then函数
定时器开始


------------------------------------------------------------------------


async  异步      await  等待		Generator 	生成		resolved	解决		then	然后

reject	拒绝



async和await的概念

1）async 函数是 Generator 函数的语法糖，使用 关键字 async 来表示，在函数内部使用 await 来表示异步
2）ES7 提出的async 函数，终于让 JavaScript 对于异步操作有了终极解决方案
3）async 作为一个关键字放到函数的前面，用于表示函数是一个异步函数，该函数的执行不会阻塞后面代码的执行
4）await是等待，只能放到async函数里面，在后面放一个返回promise对象的表达式
5）async和await是为了解决大量复杂不易读的Promise异步的问题



async function async1 () {
    console.log('async1 start');
    await async2();
    console.log('async1 end');
}
 
async function async2 () {
    console.log('async2');
}
 
console.log('script start');
 
setTimeout(function () {
    console.log('setTimeout');
}, 0);
 
async1();
 
new Promise(function (resolve) {
    console.log('promise1');
    resolve();
}).then(function () {
    console.log('promise2');
});
 
console.log('script end');



//输出顺序：
// script start 
// async1 start 
// async2 
// promise1 
// script end 
// async1 end
// promise2
// setTimeout


---------------------------------------------------------


keep-alive属性及生命周期

1.activated：页面第一次进入的时候，钩子触发的顺序是created->mounted->activated
2.deactivated ：页面退出的时候会触发deactivated，当再次前进或者后退的时候只触发activated



----------------------------------------------------



箭头函数   arrow function

let fun = () => {
	console.log('lalalala');
	console.log(this)                       //window
}


箭头函数的 this 永远指向其上下文的 this ，任何方法都改变不了其指向，如 call() , bind() , apply()
普通函数的this指向调用它的那个对象



-----------------------------------------------------


vue里ref ($refs)用法


ref 需要在dom渲染完成后才会有，在使用的时候确保dom已经渲染完成。比如在生命周期 mounted(){} 钩子中调用，或者在 this.$nextTick(()=>{}) 中调用



nextTick	下一步


//改变数据
vm.message = 'changed'

//想要立即使用更新后的DOM。这样不行，因为设置message后DOM还没有更新
console.log(vm.$el.textContent) // 并不会得到'changed'

//这样可以，nextTick里面的代码会在DOM更新后执行
Vue.nextTick(function(){
    console.log(vm.$el.textContent) //可以得到'changed'						//通过 Vue.nextTick 获取到改变后的 DOM
})


所有的DOM更新都是异步更新

renderWatcher  	渲染器


------------------------------------------------------


浏览器缓存：强缓存和协商缓存




Expires   到期       


----------------------------------------------------------------------



RESTful架构

GET用来获取资源，POST用来新建资源（也可以用于更新资源），PUT用来更新资源，DELETE用来删除资源

（1）每一个URI代表一种资源；

（2）客户端和服务器之间，传递这种资源的某种表现层；

（3）客户端通过四个HTTP动词，对服务器端资源进行操作，实现"表现层状态转化"。


--------------------------------------------------------------------------



怎么判断一个对象是不是数组类型？


Array.prototype.isPrototypeOf(obj)      //数组的原型方法


constructor   //构造器


-----------------------------------------------------------------------------



重构：浏览器的重构指的是改变每个元素的外观时所触发的浏览器行为，比如颜色、背景等样式发生了改变而进行的重新构造新外观的过程。重构不会引发页面的重新布局，不一定伴随着回流。



回流：指的是浏览器为了重新渲染页面的需要而进行的重新计算元素的几何大小和位置，他的开销是非常大的，回流可以理解为渲染树需要重新进行计算，一般最好触发元素的重构，
避免元素的回流；比如通过添加class来添加css样式，而不是直接在DOM上设置，当需要操作某一块元素的时候，最好使其脱离文档流，这样就不会引起回流了，
比如设置position：absolute或者fixed，或者display：none，等操作结束后在显示。



----------------------------------------------------------------------------------



js继承的6种方式

function Person(name){
    this.name = name;
    this.sum = function(){
        console.log(this.name)
    }
}
Person.prototype.age = 10;





一、原型链继承

二、借用构造函数继承

三、组合继承（组合原型链继承和借用构造函数继承）（常用）

四、原型式继承

五、寄生式继承

六、寄生组合式继承（常用）


-------------------------------------------------------------------------------------



js栈内存和堆内存的区别


首先JavaScript中的变量分为基本类型和引用类型。基本类型就是保存在栈内存中的简单数据段，而引用类型指的是那些保存在堆内存中的对象。

1、基本类型

基本类型有Undefined、Null、Boolean、Number 和String。这些类型在内存中分别占有固定大小的空间，他们的值保存在栈空间，我们通过按值来访问的。   

2、引用类型

引用类型，值大小不固定，栈内存中存放地址指向堆内存中的对象。是按引用访问的。如下图所示：栈内存中存放的只是该对象的访问地址，在堆内存中为这个值分配空间。
由于这种值的大小不固定，因此不能把它们保存到栈内存中。但内存地址大小的固定的，因此可以将内存地址保存在栈内存中。 这样，当查询引用类型的变量时， 
先从栈中读取内存地址， 然后再通过地址找到堆中的值。对于这种，我们把它叫做按引用访问当我们看到一个变量类型是已知的，就分配在栈里面，比如INT,Double等。
其他未知的类型，比如自定义的类型，因为系统不知道需要多大，所以程序自己申请，这样就分配在堆里面。基本类型大小固定，引用类型大小不固定，分开存放使得程序运行占用内存最小。

3、栈内存：存放基本类型。 堆内存：存放引用类型（在栈内存中存一个基本类型值保存对象在堆内存中的地址，用于引用这个对象）

4、基本类型在当前执行环境结束时销毁，而引用类型不会随执行环境结束而销毁，只有当所有引用它的变量不存在时这个对象才被垃圾回收机制回收。



------------------------------------------------


js中import和require的区别


--------------------------------------------------


2年后的一个时间戳

var time = new Date().getTime()+365*2*24*3600*1000;


-----------------------------------------------------

charles抓包工具怎样修改参数


map，这里分map remote和map local。

map remote可以将请求改到任意地址，例如把请求到线上的地址map到测试环境上。

map local则是把返回的地址map到本地文件，直接解析本地的数据。



daobreakpoints 断点，支持request和response。

可以修改bai任意参数du，但坏处是容zhi易导致前端请求超时。你dao的操作得非常快才行


-----------------------------------------------------------

浅拷贝方法

1、Object.assign()

2、拓展运算符


---------------------------------------------------


深拷贝方法

1、JSON.parse(JSON.stringify())


深拷贝和浅拷贝是针对复杂数据类型来说的，浅拷贝只拷贝一层，而深拷贝是层层拷贝。


------------------------------------------------------



















