#### Vue 的一些重要概念

mvvm模式  Model(json数据)-View(HTML模板)-ViewModel(Vue实例)

双向绑定的原理：  Data Bindings监听Model层的数据，当数据发生变化，View层的DOM元素随之变化。


Vue 最好去掉ESLint 不然代码里老是有红线报错


父组件可以使用 props 把数据传给子组件。

子组件可以使用 $emit 触发父组件的自定义事件。       emit  映射父组件的事件/ this.$parent  




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

```







