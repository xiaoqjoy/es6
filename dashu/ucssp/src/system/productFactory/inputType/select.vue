<template>
	<div class="select">
		<div><span v-if="data.inputIsRequired=='1'">*</span>{{data.displayName}}</div>
		<el-select :placeholder="data.placeholder" @input='changeData()' style='width: 220px;' clearable @change='data.inputIsRequired==="1"?inputblur():noblur()' :disabled='data.inputIsReadonly==="1"||disabledflag||changeFlag' v-model="parameterValue" filterable>
			<el-option v-for="item in options" :key="item.codeValue" :label="item.codeText" :value="item.codeValue">
			</el-option>
		</el-select>
		<span style="font-size: 12px;" v-if='data.inputUnitDesc'>({{data.inputUnitDesc}})</span>
		<el-button :disabled="disabledflag" type="primary" @click='buttonF()' v-if='buttonFalg'>{{data.addButton}}</el-button>
	</div>
</template>

<script>
	import { poductApi } from '../js/server.js';
	export default {
		data() {
			return {
				options: [],
				buttonFalg: false,
				changeFlag: false,
				parameterValue: ''
			};
		},
		methods: {
			noblur() {
				// console.log('noblur');
				this.setSelect();
			},
			inputblur() {
				this.setSelect();
				if (!this.parameterValue) {
					this.$message.error("该参数必须得填写");
				}
			},
			setSelect() {
				this.$emit("setSelect", {
					ikey: this.ikey,
					jkey: this.jkey,
					itemkey: this.itemkey,
					parameterValue: this.parameterValue,
					childkey: this.childkey,
					partsKey: this.partsKey,
					data: this.data
				});
			},
			buttonF() {
				console.log("按钮点击");
			},
			getDictionaryList() {
				this.$MyFetch.post(poductApi.getDictionaryList, {catalogNo: this.data.inputSource}, {timeout: 300000})
					.then((data = {}) => {
						this.options = data.list;
					})
					.catch((err) => {
						console.log(err);
						this.$error("服务异常");
					});
			},
			changeData() {
				if (this.fn) {
					if (this.childkey + 1) {
						if (this.partsKey + 1) {
							this.fn(this.ikey, this.jkey, this.itemkey, this.parameterValue, this.childkey, this.partsKey);
						} else {
							this.fn(this.ikey, this.jkey, this.itemkey, this.parameterValue, this.childkey);
							if (this.data.inputAttribute) {
								this.$emit('relationChange', 123);
							}
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
			if (this.data.addButton) {
				this.buttonFalg = true;
			};
			if (this.data.inputSourceType === 'Code') {
				this.getDictionaryList();
			};
			if (this.data.parameterValue) {
				this.parameterValue = this.data.parameterValue;
				this.setSelect();
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
	.select {
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
