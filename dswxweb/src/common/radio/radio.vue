<template>
	<div class="radio">
		<input @change="change()" type="radio" :id="name" value="1" :name="name" v-model="radioFlag"/>
		<label :for="name"><span>是</span></label>
		<input @change="change()" type="radio" :id="id" value="" :name="name" v-model="radioFlag"/>
		<label :for="id"><span class="false_right">否</span></label>
	</div>
</template>

<script>
	export default{
		data() {
			return {
				radioFlag: ""
			};
		},
		methods:{
			change() {
				this.$emit("changeValue", { radioFlag: this.radioFlag, name: this.name });
			},
			clearFalg() {
				this.radioFlag = "";
				this.change();
			}
		},
		props:["name","id"]
	};
</script>

<style scoped lang="scss">
	.radio{
		input[type="radio"]{
			display: block;
			position: relative;
		}
		input[type="radio"] + label::before {
		    content: "\a0"; /*不换行空格*/
		    display: inline-block;
		    vertical-align: middle;
		    font-size: 0.15rem;
		    width: 0.14rem;
		    height: 0.14rem;
		    border-radius: 0.02rem;
		    border: 1px solid #A8AAA8;
		    text-indent: .15em;
		    line-height: 1; 
		}
		input[type="radio"]:checked + label::before {
		    background: url(../../assets/img/radio.png);
		    background-size: 100%;
		    border: 1px solid #4FBFBD;
		    background-clip: content-box;
		}
		input[type="radio"] {
		    position: absolute;
		    clip: rect(0, 0, 0, 0);
		}
		label{
			font-size: 0.15rem;
			color: #032238;
			// margin-right: 0.1rem;
			span{
				line-height: 0.49rem;
				padding: 0 0.1rem;
			}
		}
	}
</style>
