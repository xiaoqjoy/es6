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