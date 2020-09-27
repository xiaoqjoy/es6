<template>
	<div class="textarea">
		<div><span v-if="data.inputIsRequired=='1'">*</span>{{data.displayName}}</div>
		<el-input style="width: 220px;" @change="changeData()" type="textarea" :minlength='data.inputMinlength' :maxlength='data.inputMaxlength' @blur='data.inputIsRequired==="1"?inputblur():noblur()' :disabled='data.inputIsReadonly==="1"||disabledflag||changeFlag' v-model="parameterValue" :placeholder="data.placeholder" :rows="2">
		</el-input>
		<span style="font-size: 12px;" v-if='data.inputUnitDesc'>({{data.inputUnitDesc}})</span>
		<el-button :disabled="disabledflag" type="primary" @click='buttonF()' v-if='buttonFalg'>{{data.addButton}}</el-button>
	</div>
</template>

<script>
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
			if (this.data.addButton) {
				this.buttonFalg = true;
			}
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
			}
//			this.changeData();
		},
		props: ['data', 'itemkey', 'fn', 'jkey', "ikey", 'childkey', 'disabledflag', 'partsKey'],
		watch: {
			data: {
			handler(newValue, oldValue) {
				console.log(newValue);
				this.changeFlag = newValue.flag;
				this.parameterValue = newValue.parameterValue;
			},
			deep: true}
		}
	};
</script>

<style scoped lang="less">
	.textarea {
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
