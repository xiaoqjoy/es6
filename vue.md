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