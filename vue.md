#### Vue ��һЩ��Ҫ����

mvvmģʽ  Model(json����)-View(HTMLģ��)-ViewModel(Vueʵ��)

˫��󶨵�ԭ��  Data Bindings����Model������ݣ������ݷ����仯��View���DOMԪ����֮�仯��


Vue ���ȥ��ESLint ��Ȼ�����������к��߱���


���������ʹ�� props �����ݴ����������

���������ʹ�� $emit ������������Զ����¼���       emit  ӳ�丸������¼�/ this.$parent  




watch ������ʱ����·�ɱ仯   

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

this.$router.push({      //����·��·���仯
  path: '/',
})

this.$router.push({path:'/sugerHighLow',query:{countType:countType}})

//http://localhost:8030/sugerHighLow?countType=1     ע������� �� 


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
  example1:'a'��//ֵ����Ϊmethods�ķ�����
  'example2.inner0': 'a',  //ֵ����Ϊmethods�ķ�����
  'example2.innner1': 'a'  //ֵ����Ϊmethods�ķ�����
  example2:{
    //ע�⣺���۲������Ϊ���������ʱ��curVal��oldVal����ȵģ���Ϊ�������β�ָ�����ͬһ�����ݶ���
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

#### ����axios������������

��Ϊvue-resource���ڸ��£�vue�Ƽ�ʹ��axios������ʹ��axios�� 		
��ҳ�潻�������У�����axiosһ�����ʻᷢ����������һ�����Լ����õ�����ʽ������һ����options�� 		
����������⣬�ڸ�����վѰ��ԭ�򣬵ó����½��ۣ� 		
������Դ�����׼������һ�� HTTP �ײ��ֶΣ����������������ЩԴվ��Ȩ�޷�����Щ��Դ�����⣬�淶Ҫ��		
����Щ���ܶԷ��������ݲ��������õ� HTTP ���󷽷����ر��� GET ����� HTTP ���󣬻��ߴ���ĳЩ MIME ���͵� POST ���󣩣�		
�������������ʹ�� OPTIONS ��������һ��Ԥ������preflight request�����Ӷ���֪������Ƿ�����ÿ������󡣷�����ȷ������֮��		
�ŷ���ʵ�ʵ� HTTP ������Ԥ������ķ����У���������Ҳ����֪ͨ�ͻ��ˣ��Ƿ���ҪЯ�����ƾ֤������ Cookies �� HTTP ��֤������ݣ���	 
Ҳ����˵��������ʹ��optionsȥ���ԣ�������ӿ��Ƿ��ܹ�����ͨѶ��������ܾͲ��ᷢ������������������������ͨѶ������		
��ʼ�������� 		
����������⣬��Ҫ�ں�̨�������ã�����options���󣬲�Ȼ�������ͻ��ܵ�Ӱ�죬��̨�������жϣ��������ʽΪoptions��		
����������ͨѶ������ֱ��ʲô�������� 		
������PHP���������� 		
header("Access-Control-Allow-Origin:*"); 	
header("Access-Control-Allow-Headers:content-type"); 
header("Access-Control-Request-Method:GET,POST"); 
if(strtoupper($_SERVER['REQUEST_METHOD'])== 'OPTIONS'){ 
exit; 
} 
������α�����ⷢ��options��������⣬���ڽ���С�


### Vueʵ�������Ϣ�Ļ���

�������ڿ���vue����Ŀ�����У����ⲻ����·���л�������component�ٷ��غ��������ݻ����¼��أ� 
��������������Ǿ���Ҫ�õ�keep-alive������vue�������Ϣ��ʹ�䲻�����¼��ء�

��app.vue��

```javascript
<keep-alive>
    <router-view></router-view>
</keep-alive>
```
�����������������е�������л��棬���ܴﵽ������������Ч����

��ô���Ǹ�����������ϣ�ʵ�ַ������£�

��app.vue��
```javascript
<!-- ��������Ҫkeepalive�� -->
<keep-alive>
    <router-view v-if="$route.meta.keepAlive"></router-view>
</keep-alive>

<!-- ���ﲻ�ᱻkeepalive -->
<router-view v-if="!$route.meta.keepAlive"></router-view>
```

Ȼ��������·����Ϣ��ʱ������
```javascript
{
  path: '',
  name: '',
  component: ,
  meta: {keepAlive: true} // �������Ҫkeepalive��
},
{
  path: '',
  name: '',
  component: ,
  meta: {keepAlive: false} // ���ǲ��ᱻkeepalive��
}
```
���ʵ�ֲ����������Ĺ��� 
�������������Ҫ������ݻ���ִ�г�ʼ���������ڼ��������ʱ�����activated���Ӻ��������£�
```javascript
activated: function () {
    this.data = '';
}
```

####  slot ������ݷַ�

��⣺ һ������������棬�����������

```javascript
<sugarWarningTips ref="sugarWarningTips">
	<p slot="tipContent">���Ļ���<span>{{patientName}}</span>����Ѫ���쳣, <a @click="toSugarWarning">����鿴</a></p>
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







