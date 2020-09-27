<template>
	<div class="cascaderSelect">
		<div><span v-if="data.inputIsRequired=='1'">*</span>{{data.displayName}}</div>
		<strong v-if="parameterValue.length>0">{{spanString.join(',')}}</strong>
		<el-cascader :options="options" :props="props" popper-class="product-cascader" :placeholder="data.placeholder" @input='changeData()' style='width: 220px;' clearable collapse-tags @change='data.inputIsRequired==="1"?inputblur():noblur()' :disabled='data.inputIsReadonly==="1"||disabledflag||changeFlag' v-model="parameterValue"></el-cascader>
		<span style="font-size: 12px;" v-if='data.inputUnitDesc'>({{data.inputUnitDesc}})</span>
		<el-button :disabled="disabledflag" type="primary" @click='buttonF()' v-if='buttonFalg'>{{data.addButton}}</el-button>
	</div>
</template>

<script>
	import { poductApi } from '../js/server.js';
	export default {
		data() {
			return {
				props: {
					multiple: true,
					label: 'codeText',
					value: 'codeValue'
				},
				children: 0,
				options: [],
				buttonFalg: false,
				changeFlag: false,
				parameterValue: [],
				spanString: []
			};
		},
		methods: {
			noblur() {
				// console.log('noblur');
			},
			inputblur() {
				if (!this.parameterValue) {
					this.$message.error("该参数必须得填写");
				}
			},
			getChildrenLen(options) {
				let len = 0;
				let getChildren = (arr) => {
					arr.forEach((item) => {
						if (item.children) {
							getChildren(item.children);
						} else {
							len++;
						}
					});
				};
				getChildren(options);
				return len;
			},
			getString() {
				let options = [];
				this.options.forEach((option) => {
					if (option.children) {
						option.children.forEach((child) => {
							if (child.children) {
								child.children.forEach((son) => {
									this.parameterValue.forEach((param) => {
										if (son.codeValue === param[param.length - 1]) {
											options.push(son.codeText);
										}
									});
								});
							} else {
								this.parameterValue.forEach((param) => {
									if (child.codeValue === param[param.length - 1]) {
										options.push(child.codeText);
									}
								});
							}
						});
					}
				});
				this.spanString = options;
			},
			expandOptions(opts) {
				let options = [];
				this.options.forEach((option) => {
					let arr = [option.codeValue];
					if (option.children) {
						option.children.forEach((child) => {
							arr = [arr[0], child.codeValue];
							if (child.children) {
								child.children.forEach((son) => {
									if (opts) {
										opts.forEach((opt) => {
											if (opt === son.codeValue) {
												options.push([...arr, son.codeValue]);
											}
										});
									} else {
										options.push([...arr, son.codeValue]);
									}
								});
							} else {
								if (opts) {
									opts.forEach((opt) => {
										if (opt === child.codeValue) {
											options.push(arr);
										}
									});
								} else {
									options.push(arr);
								}
							}
						});
					}
				});
				return options;
			},
			buttonF() {
				if (this.data.addButtonFunction === "selection") {
					let len = this.getChildrenLen(this.options);
					let all = this.expandOptions();
					if (this.parameterValue.length !== len) {
						this.parameterValue = all;
						this.changeData();
					} else {
						this.parameterValue = [];
						this.changeData();
					}
				};
			},
			getDictionaryList() {
				return new Promise((resolve, reject) => {
					this.$MyFetch.post(poductApi.getCascaderList, {catalogNo: this.data.inputSource}, {timeout: 300000})
						.then((data) => {
							this.options = data;
							resolve(data);
						})
						.catch((err) => {
							console.log(err);
							this.$error("服务异常");
							reject(err);
						});
				});
			},
			changeData() {
				this.getString();
				if (this.fn) {
					let data = "";
					let arr = [];
					if (this.parameterValue) {
						this.parameterValue.forEach((param) => {
							arr.push(param[param.length - 1]);
						});
						data = arr.join(";");
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
								this.$emit('popu', this.ikey, this.jkey, this.itemkey, data, this.partsKey, this.data.inputAttribute);
							}
						} else {
							if (this.data.inputAttribute) {
								this.$emit('popu', this.ikey, this.jkey, this.itemkey, data, this.data.inputAttribute);
							}
							this.fn(this.ikey, this.jkey, this.itemkey, data);
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
				this.getDictionaryList().then(() => {
					if (this.data.parameterValue) {
						this.parameterValue = this.expandOptions(this.data.parameterValue.split(';'));
						this.getString();
					}
				});
			};
		},
		props: ['data', 'itemkey', 'fn', 'jkey', "ikey", 'childkey', 'disabledflag', 'partsKey'],
		watch: {
			data: {
			handler(newValue, oldValue) {
				// console.log(newValue);
				this.changeFlag = newValue.flag;
				if (this.data.parameterValue) {
					this.parameterValue = this.expandOptions(newValue.parameterValue.split(';'));
					this.getString();
				}
			},
			deep: true}
		}
	};
</script>

<style scoped lang="less">
	.cascaderSelect {
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
		strong {
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
		/deep/ .el-cascader .el-input .el-input__inner{
			opacity: 0;
		}
		/deep/ .el-cascader .el-input.is-disabled .el-input__inner{
			opacity: 1;
		}
		/deep/ .el-cascader .el-input{
			border: 1px solid #d0d0d0;
			border-radius: 4px;
			z-index: 2;
		}
		/deep/ .el-cascader .el-input.is-disabled {
			border: none;
			z-index: 0;
		}
		/deep/ .el-cascader__tags {
			display: none;
		}
	}
</style>
