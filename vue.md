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

```