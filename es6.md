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
    // 与在 Person()构造函数中定义的 `this`并不相同.
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
    //  回调引用的是`that`变量, 其值是预期的对象. 
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
console.log(adder.addThruCall(1)); // 仍然输出 2（而不是3 ）


注意点：箭头函数没有自己的this指针，通过 call() 或 apply() 方法调用一个函数时，
只能传递参数（不能绑定this），他们的第一个参数会被忽略。
（这种现象对于bind方法同样成立）


var a = [1, 2, 3];
var arr = () => a[0];

arr(); // 1


function foo(n) {
  var f = () => arguments[0] + n; // 隐式绑定 foo 函数的 arguments 对象. 
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

理解: 函数f如果是普通函数，在为变量generator赋值时就会执行。
    但是，函数f是一个 Generator 函数，就变成只有调用next方法时，函数f才会执行
```

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

Remote Address   远程地址

general   一般的

Referer  来源网址












