<template>
	<div class="multipleselect">
		<div><span v-if="data.inputIsRequired=='1'">*</span>{{data.displayName}}</div>
		<strong v-if="parameterValue.length>0">{{spanString.join(',')}}</strong>
		<el-select @input='changeData()' collapse-tags :placeholder="data.placeholder" @change='data.inputIsRequired==="1"?inputblur():noblur()' style='width:220px;' multiple clearable :disabled='data.inputIsReadonly==="1"||disabledflag||changeFlag' v-model="parameterValue">
			<el-option v-for="item in options" :key="item.codeValue" :label="item.codeText" :value="item.codeValue">
			</el-option>
		</el-select>
		<span style="font-size: 12px;" v-if='data.inputUnitDesc'>({{data.inputUnitDesc}})</span>
		<el-button :disabled="disabledflag" type="primary" @click='buttonF()' v-if='buttonFalg'>{{data.addButton}}</el-button>
    <!-- <div class="btn-group" v-if="data.columnName==='receiveIdentifyType'">
      <el-button type="primary" style="width:140px" @click="save">定价导入</el-button>
      <el-button type="primary" style="width:140px" @click="save">定价导出</el-button>
    </div> -->
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
				parameterValue: [],
				spanString: []
			};
		},
		methods: {
			noblur() {
				console.log('noblur');
			},
			inputblur() {
				if (!this.parameterValue) {
					this.$message.error("该参数必须得填写");
				}
			},
			buttonF() {
				// console.log(this.data.addButtonFunction);
				if (this.data.addButtonFunction === "selection") {
					this.buttonFlag = !this.buttonFlag;
					if (this.parameterValue.length !== this.options.length) {
						this.parameterValue = [];
						for (let i = 0; i < this.options.length; i++) {
							this.parameterValue.push(this.options[i].codeValue);
							this.changeData();
						};
					} else {
						this.parameterValue = [];
						this.changeData();
					}
				};
			},
			getDictionaryList() {
				this.$MyFetch.post(poductApi.getDictionaryList, {catalogNo: this.data.inputSource}, {timeout: 300000})
					.then((data = {}) => {
						this.options = data.list;
						this.getString();
					})
					.catch((err) => {
						console.log(err);
						this.$error("服务异常");
					});
			},
			changeData() {
				this.getString();
				// console.log(this.parameterValue);
				if (this.fn) {
					let data = "";
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
			getString() {
				this.spanString = [];
				for (let i = 0; i < this.options.length; i++) {
					for (let j = 0; j < this.parameterValue.length; j++) {
						if (this.parameterValue[j] === this.options[i].codeValue) {
							// console.log(this.spanString, this.options[i].codeText);
							this.spanString.push(this.options[i].codeText);
							// console.log(this.spanString);
						}
					}
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
			if (!this.data.parameterValue) {
				this.parameterValue = [];
			} else {
				this.parameterValue = this.data.parameterValue.split(';');
				this.getString();
				if (this.fn) {
					let data = "";
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
				// console.log(newValue);
				this.changeFlag = newValue.flag;
				if (!newValue.parameterValue) {
					this.parameterValue = [];
				} else {
					this.parameterValue = newValue.parameterValue.split(';');
				};
				this.getString();
			},
			deep: true}
		}
	};
</script>

<style scoped lang="less">
	.multipleselect {
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
		strong{
			position: absolute;
			display: block;
			height: 38px;
			width: 190px;
			padding-left: 10px;
			overflow: hidden;
			white-space: nowrap;
			text-overflow: ellipsis;
			z-index: 1;
			line-height: 38px;
			margin-top: 2px;
			font-size: 13px;
			pointer-events: none;
		}
		/deep/ .el-select .el-input .el-input__inner{
			opacity: 0;
		}
		/deep/ .el-select .el-input.is-disabled .el-input__inner{
			opacity: 1;
		}
		/deep/ .el-select .el-input{
			border: 1px solid #d0d0d0;
			border-radius: 4px;
			z-index: 2;
		}
		/deep/ .el-select .el-input.is-disabled {
			border: none;
			z-index: 0;
		}
		/deep/ .el-select__tags{
			display: none;
		}
	}
</style>
