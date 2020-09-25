<template>
	<div class="text">
		<div><span v-if="data.inputIsRequired=='1'">*</span>{{data.displayName}}</div>
		<el-input @change="changeData()" style='width: 220px;' :minlength='data.inputMinlength' :maxlength='data.inputMaxlength' @blur='data.inputIsRequired==="1"?inputblur():noblur()' :disabled='data.inputIsReadonly==="1"||disabledflag||changeFlag' v-model="parameterValue" :placeholder="data.placeholder"></el-input>
		<span style="font-size: 12px;" v-if='data.inputUnitDesc'>({{data.inputUnitDesc}})</span>
		<el-button :disabled='data.inputIsReadonly==="1"||disabledflag||changeFlag' type="primary" @click='buttonF()' v-if='buttonFalg'>{{data.addButton}}</el-button>
	</div>
</template>

<script>
	import { poductApi } from '../js/server.js';
	export default {
		data() {
			return {
				buttonFalg: false,
				changeFlag: false,
				parameterValue: ''
			};
		},
		methods: {
			noblur() {
				// console.log('noblur');
			},
			inputblur() {
				// console.log(1);
				if (!this.parameterValue) {
					this.$message.error("该参数必须得填写");
				};
			},
			buttonF() {
				// console.log(this.data.addButtonFunction);
				if (this.data.addButtonFunction) {
					this.$MyFetch.post(poductApi.interactiveParser, {method: this.data.addButtonFunction})
						.then((data = {}) => {
								this.parameterValue = data.result;
								this.changeData();
							})
							.catch((err) => {
								console.log(err);
								this.$error("服务异常");
							});
				}
			},
			evil(fn) {
				var Fn = Function;
				return new Fn('return ' + fn)();
			},
			changeData() {
				if (!this.data.addButton && this.data.addButtonFunction && this.data.addDesc) {
					let valReg = this.evil(this.data.addDesc);
					if (!valReg.test(this.parameterValue)) {
						this.$error(this.data.addButtonFunction);
						this.parameterValue = "";
					}
				}
				if (this.fn) {
					if (this.childkey + 1) {
						if (this.partsKey + 1) {
							this.fn(this.ikey, this.jkey, this.itemkey, this.parameterValue, this.childkey, this.partsKey);
						} else {
							this.fn(this.ikey, this.jkey, this.itemkey, this.parameterValue, this.childkey);
						}
					} else {
						if (this.partsKey + 1) {
							this.fn(this.ikey, this.jkey, this.itemkey, this.parameterValue, this.partsKey);
							if (this.data.inputAttribute) {
								this.$emit('popu', this.ikey, this.jkey, this.itemkey, this.parameterValue, this.partsKey, this.data.inputAttribute);
							}
						} else {
							if (this.data.inputAttribute) {
								this.$emit('popu', this.ikey, this.jkey, this.itemkey, this.parameterValue, this.data.inputAttribute);
							}
							this.fn(this.ikey, this.jkey, this.itemkey, this.parameterValue);
						}
					};
				};
			}
		},
		mounted() {
			// console.log(this.data.inputIsReadonly);
			if (this.data.addButton) {
				this.buttonFalg = true;
			};
			if (this.data.parameterValue) {
				this.parameterValue = this.data.parameterValue;
			} else {
				this.parameterValue = this.data.defaultValue;
				if (this.fn) {
					if (this.childkey + 1) {
						if (this.partsKey + 1) {
							this.fn(this.ikey, this.jkey, this.itemkey, this.parameterValue, this.childkey, this.partsKey);
						} else {
							this.fn(this.ikey, this.jkey, this.itemkey, this.parameterValue, this.childkey);
						}
					} else {
						if (this.partsKey + 1) {
							this.fn(this.ikey, this.jkey, this.itemkey, this.parameterValue, this.partsKey);
						} else {
							this.fn(this.ikey, this.jkey, this.itemkey, this.parameterValue);
						}
					};
				};
			};
//			this.changeData();
		},
		props: ['data', 'itemkey', 'fn', 'jkey', "ikey", 'childkey', 'disabledflag', 'partsKey'],
		watch: {
			data: {
			handler(newValue, oldValue) {
				// console.log(newValue);
				this.changeFlag = newValue.flag;
				this.parameterValue = newValue.parameterValue;
			},
			deep: true}
		}
	};
</script>

<style scoped lang="less">
	.text {
		margin: 5px 0;
		span {
			font-size: 12px;
		}
		div{
			font-size: 12px;
			color: #BBBBBB;
			line-height: 20px;
			span{
				font-size: 14px;
				color: #FF0000;
				display: block;
				float: left;
			}
		}
	}
</style>
