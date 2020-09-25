<template>
	<div class="checkbox">
		<div><span v-if="data.inputIsRequired=='1'">*</span>{{data.displayName}}</div>
		<el-checkbox-group @change="changeData()" v-model="parameterValue" @blur='data.inputIsRequired==="1"?inputblur():noblur()' :disabled='data.inputIsReadonly==="1"||disabledflag||changeFlag'>
			<el-checkbox style='margin-left: 10px; float: left;' v-for="(city,key) in cities" :label="city.codeValue" :key="key">{{city.codeText}}</el-checkbox>
		</el-checkbox-group>
		<span style="font-size: 12px;" v-if='data.inputUnitDesc'>({{data.inputUnitDesc}})</span>
		<el-button :disabled="disabledflag" type="primary" @click='buttonF()' v-if='buttonFalg'>{{data.addButton}}</el-button>
	</div>
</template>

<script>
	import { poductApi } from '../js/server.js';
	export default {
		data() {
			return {
				buttonFalg: false,
				cities: ['上海', '北京', '广州', '深圳'],
				changeFlag: false,
				parameterValue: []
			};
		},
		methods: {
			noblur() {
				console.log('noblur');
			},
			inputblur() {
				if (!this.parameterValue) {
					this.$message.error("该参数必须得填写");
				};
			},
			buttonF() {
				console.log("按钮点击");
			},
			changeData() {
				if (this.fn) {
					var data = "";
					if (this.parameterValue) {
						data = this.parameterValue.join(';');
					}
					if (this.childkey + 1) {
						if (this.partsKey + 1) {
							this.fn(this.ikey, this.jkey, this.itemkey, data, this.childkey, this.partsKey);
						} else {
							this.fn(this.ikey, this.jkey, this.itemkey, data, this.childkey);
						}
					} else {
						if (this.partsKey + 1) {
							this.fn(this.ikey, this.jkey, this.itemkey, data, this.partsKey);
							if (this.data.inputAttribute) {
								this.$emit('popu', this.ikey, this.jkey, this.itemkey, this.parameterValue, this.partsKey, this.data.inputAttribute);
							}
						} else {
							if (this.data.inputAttribute) {
								this.$emit('popu', this.ikey, this.jkey, this.itemkey, this.parameterValue, this.data.inputAttribute);
							}
							this.fn(this.ikey, this.jkey, this.itemkey, data);
						}
					};
				};
			},
			getDictionaryList() {
				this.$MyFetch.post(poductApi.getDictionaryList, {catalogNo: this.data.inputSource})
					.then((data = {}) => {
						this.cities = data.list;
					})
					.catch((err) => {
						console.log(err);
						this.$error("服务异常");
					});
			}
		},
		mounted() {
			if (this.data.inputSourceType === 'Code') {
				this.getDictionaryList();
			};
			if (this.data.addButton) {
				this.buttonFalg = true;
			};
			if (!this.data.parameterValue) {
				this.parameterValue = [];
			} else {
				this.parameterValue = this.data.parameterValue.split(';');
				if (this.fn) {
					var data = "";
					if (this.parameterValue) {
						data = this.parameterValue.join(';');
					}
					if (this.childkey + 1) {
						if (this.partsKey + 1) {
							this.fn(this.ikey, this.jkey, this.itemkey, data, this.childkey, this.partsKey);
						} else {
							this.fn(this.ikey, this.jkey, this.itemkey, data, this.childkey);
						}
					} else {
						if (this.partsKey + 1) {
							this.fn(this.ikey, this.jkey, this.itemkey, data, this.partsKey);
						} else {
							this.fn(this.ikey, this.jkey, this.itemkey, data);
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
				console.log(newValue);
				this.changeFlag = newValue.flag;
				if (!newValue.parameterValue) {
					this.parameterValue = [];
				} else {
					this.parameterValue = newValue.parameterValue.split(';');
				};
			},
			deep: true}
		}
	};
</script>

<style scoped lang="less">
	.checkbox {
		margin: 5px 0;
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
