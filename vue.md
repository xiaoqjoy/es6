#### Vue 的一些重要概念

mvvm模式  Model(json数据)-View(HTML模板)-ViewModel(Vue实例)

双向绑定的原理：  Data Bindings监听Model层的数据，当数据发生变化，View层的DOM元素随之变化。


Vue 最好去掉ESLint 不然代码里老是有红线报错


父组件可以使用 props 把数据传给子组件。

子组件可以使用 $emit 触发父组件的自定义事件。       emit  映射父组件的事件/ this.$parent      



props 是单向绑定的：当父组件的属性变化时，将传导给子组件，但是不会反过来。这是为了防止子组件修改父组件的状态。所以不应该在子组件中修改 props 中的值，Vue 警告。


watch 可以随时监听路由变化   

```javascript
watch: {
	'$route'(to,from){
		var path = to.path;
		console.log(path);
		if(path == '/homePage'){
		  this.reloadTop();
		}
	}
}

this.$router.push({      //控制路由路径变化
  path: '/',
})

this.$router.push({path:'/sugerHighLow',query:{countType:countType}})

//http://localhost:8030/sugerHighLow?countType=1     注意里面的 ？ 


data(){
  return {
    example0: "",
    example1: "",
    example2: {
      inner0: 1,
      innner1: 2
    }
  }
}

watch:{
  example0(curVal,oldVal){
    console.log(curVal,oldVal);
  },
  example1:'a'，//值可以为methods的方法名
  'example2.inner0': 'a',  //值可以为methods的方法名
  'example2.innner1': 'a'  //值可以为methods的方法名
  example2:{
    //注意：当观察的数据为对象或数组时，curVal和oldVal是相等的，因为这两个形参指向的是同一个数据对象
    handler(curVal,oldVal){
      conosle.log(curVal,oldVal)
    },
    deep:true
  }
},
methods:{
  a(curVal,oldVal){
    conosle.log(curVal,oldVal)
  }
}

```

#### 关于axios发送两次请求

因为vue-resource不在更新，vue推荐使用axios，所以使用axios。 		
在页面交互过程中，发现axios一定几率会发送两次请求，一次是自己设置的请求方式，还有一次是options。 		
关于这个问题，在各个网站寻求原因，得出以下结论： 		
跨域资源共享标准新增了一组 HTTP 首部字段，允许服务器声明哪些源站有权限访问哪些资源。另外，规范要求，		
对那些可能对服务器数据产生副作用的 HTTP 请求方法（特别是 GET 以外的 HTTP 请求，或者搭配某些 MIME 类型的 POST 请求），		
浏览器必须首先使用 OPTIONS 方法发起一个预检请求（preflight request），从而获知服务端是否允许该跨域请求。服务器确认允许之后，		
才发起实际的 HTTP 请求。在预检请求的返回中，服务器端也可以通知客户端，是否需要携带身份凭证（包括 Cookies 和 HTTP 认证相关数据）。	 
也就是说，它会先使用options去测试，你这个接口是否能够正常通讯，如果不能就不会发送真正的请求过来，如果测试通讯正常，		
则开始正常请求。 		
关于这个问题，需要在后台进行设置，允许options请求，不然你的请求就会受到影响，后台并作出判断，如果请求方式为options，		
告诉它可以通讯，其他直接什么都不做。 		
以下是PHP做设置内容 		
header("Access-Control-Allow-Origin:*"); 	
header("Access-Control-Allow-Headers:content-type"); 
header("Access-Control-Request-Method:GET,POST"); 
if(strtoupper($_SERVER['REQUEST_METHOD'])== 'OPTIONS'){ 
exit; 
} 
关于如何避免额外发送options请求的问题，尚在解决中。


### Vue实现组件信息的缓存

当我们在开发vue的项目过程中，避免不了在路由切换到其他component再返回后该组件数据会重新加载， 
处理这种情况我们就需要用到keep-alive来缓存vue的组件信息，使其不再重新加载。

在app.vue里

```javascript
<keep-alive>
    <router-view></router-view>
</keep-alive>
```
但是这种情况会对所有的组件进行缓存，不能达到单个组件缓存的效果。

那么我们给部分组件加上，实现方法如下：

在app.vue里
```javascript
<!-- 这里是需要keepalive的 -->
<keep-alive>
    <router-view v-if="$route.meta.keepAlive"></router-view>
</keep-alive>

<!-- 这里不会被keepalive -->
<router-view v-if="!$route.meta.keepAlive"></router-view>
```

然后在设置路由信息的时候这样
```javascript
{
  path: '',
  name: '',
  component: ,
  meta: {keepAlive: true} // 这个是需要keepalive的
},
{
  path: '',
  name: '',
  component: ,
  meta: {keepAlive: false} // 这是不会被keepalive的
}
```
这就实现部分组件缓存的功能 
如果缓存的组件想要清空数据或者执行初始化方法，在加载组件的时候调用activated钩子函数，如下：
```javascript
activated: function () {
    this.data = '';
}
```


####  slot 插槽内容分发

理解： 一般用在组件里面，组件里面的组件

```javascript
<sugarWarningTips ref="sugarWarningTips">
	<p slot="tipContent">您的患者<span>{{patientName}}</span>测量血糖异常, <a @click="toSugarWarning">点击查看</a></p>
</sugarWarningTips>


sugarWarningTips.vue
<template>
	<div class="warningTips" v-show="tipsShow">
		<div class="closeIcon tac" @click="closeTip">X</div>
		<div class="tipContent">
			<slot name="tipContent"></slot>
		</div>
	</div>
</template>


Vue自定义指令 directives

<p v-clickTest:foo.a.b="message">222222222222222222222222222</p>

directives: {
  clickTest: {
	bind(el,binding,vnode,oldvnode){
	  el.addEventListener('click',() => {    //注意这里可以自定义事件
		console.log(binding)
		console.log(vnode)
		console.log(oldvnode)
	  })
	  var s = JSON.stringify
	  el.innerHTML =
		'name: '       + s(binding.name) + '<br>' +
		'value: '      + s(binding.value) + '<br>' +
		'expression: ' + s(binding.expression) + '<br>' +
		'argument: '   + s(binding.arg) + '<br>' +
		'modifiers: '  + s(binding.modifiers) + '<br>' +
		'vnode keys: ' + Object.keys(vnode).join(', ')
	}
  }
},

.then 的用法

最主要的,是解决了异步方法立刻返回的问题? 这个特性带来的后遗症? ,? ?假设? 我要等异步处理完了,再去执行一段代码(后续代码)? ?,怎么做？定义一个全局flag,? 异步处理完成更新flag,

然后把? 后续代码放到setInterval里面,? 执行完 后续代码还得关闭interval? ,多麻烦.? ? 使用then()就简单明了了

举个栗子:ajax调用后,不论成功还是失败,? ?都有一段代码必须执行? , 并且? 这段代码和返回结果处理之后的数据有关? ,? 最简单的是把 代码放到success和fail里面,? 代码重复?



// 作为一个 Promise 使用 (2.1.0 起新增，详见接下来的提示)
Vue.nextTick().then(function () {
  // DOM 更新了
})
//在下次 DOM 更新循环结束之后执行延迟回调。在修改数据之后立即使用这个方法，获取更新后的 DOM。  



provider/inject

//在父组件中通过provider来提供变量，然后在子组件中通过inject来注入变量

//只要在父组件中调用了，那么在这个父组件生效的生命周期内，所有的子组件都可以调用inject来注入父组件中的值。


mixins的使用

//mixins就是定义一部分公共的方法或者计算属性,然后混入到各个组件中使用,方便管理与统一修改


websocket

readyState属性返回实例对象的当前状态，共有四种

CONNECTING：值为0，表示正在连接
OPEN：值为1，表示连接成功，可以通信了
CLOSING：值为2，表示连接正在关闭
CLOSED：值为3，表示连接已经关闭，或者打开连接失败

webSocket.bufferedAmount

//实例对象的bufferedAmount属性，表示还有多少字节的二进制数据没有发送出去。它可以用来判断发送是否结束。

http://www.ruanyifeng.com/blog/2017/05/websocket.html


.sync 修饰符所提供的功能。当一个子组件改变了一个 prop 的值时，这个变化也会同步到父组件中所绑定，就是说我们可以直接在我们需要传的prop后面加上 .sync


把控件的visible属性设置为false代表次控件不可见







Vue构建项目命令

$ npm install -g vue-cli
$ vue init webpack my-project
$ cd my-project
$ npm install
$ npm run dev


npm卸载包
npm uninstall xxx


```


{
  path: '/test',
  redirect: '/'
}

//路由重定向  可用于URL地址输入错误


-------------------------------------------------

vue.js双向绑定的实现原理

Vue内部通过Object.defineProperty方法属性拦截的方式，把data对象里每个数据的读写转化成getter/setter，当数据变化时通知视图更新


---------------------------------------------------


vue 中使用防抖和节流


防抖和节流是我们在开发过程中常用优化性能的方式


在公共方法中（如 public.js 中），加入函数防抖和节流方法


// 防抖
export function _debounce(fn, delay) {

    var delay = delay || 200;
    var timer;
    return function () {
        var th = this;
        var args = arguments;
        if (timer) {
            clearTimeout(timer);
        }
        timer = setTimeout(function () {
            timer = null;
            fn.apply(th, args);
        }, delay);
    };
}


// 节流
export function _throttle(fn, interval) {
    var last;
    var timer;
    var interval = interval || 200;
    return function () {
        var th = this;
        var args = arguments;
        var now = +new Date();
        if (last && now - last < interval) {
            clearTimeout(timer);
            timer = setTimeout(function () {
                last = now;
                fn.apply(th, args);
            }, interval);
        } else {
            last = now;
            fn.apply(th, args);
        }
    }
}

----------------------------------------------------------------



ts  (TypeScript) 是一种给 JavaScript 添加特性的语言扩展, 需要编译安装(npm install -g typescript)，新增的功能:


类型批注和编译时类型检查
类型推断
类型擦除
接口
枚举
Mixin
泛型编程
名字空间
元组
Await


TypeScript 教程

https://www.runoob.com/typescript/ts-tutorial.html


-----------------------------------------------------------------


























