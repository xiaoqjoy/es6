<template>
	<div class="dictionaries_configure">
		<router-link to="dictionaries">数据字典</router-link>
		<i class="el-icon-arrow-left"></i>
		<span>配置数据字典</span>
		<div class="ec_content">
			<h3>字典编号：{{catalogNo}}</h3>
			<button class="product_button" @click="control_popup('add')">+ 增加</button>
			<div class="table">
				<table>
					<tr class="tr_top">
						<th>序号</th>
						<th>数据值</th>
						<th>显示值</th>
						<th>子级字典名称</th>
						<th>子级数据值</th>
						<th>操作</th>
					</tr>
					<tr v-for='(item,index) in dictionaryList' :key="index">
						<td>
							{{index+1}}
						</td>
						<td>
							{{item.codeValue}}
						</td>
						<td>
							{{item.codeText}}
						</td>
						<td>
							{{item.parentCodeName}}
						</td>
						<td>
							{{item.parentCodeValue}}
						</td>
						<td>
							<span @click="getEdit(index)">编辑</span>
							<span @click="deleteDictionary(item.codeNo)">删除</span>
						</td>
					</tr>
				</table>
			</div>
			<pagination style="float: right;margin: 20px 0;" :page="pageConfig" class="pagination" @jump-page="handleCurrentChange"></pagination>
			<!--<el-pagination style="float: right;margin: 20px 0;" @current-change="handleCurrentChange" :current-page="page" :page-size="pagesize" layout="total, prev, pager, next, jumper" :total="total">
			</el-pagination>-->
		</div>
		<div v-if="popup" class="product_popup">
			<div class="popup_edit_main">
				<h3>{{popup_title}}<span @click="control_popup()" class="el-icon-close"></span></h3>
				<div class="popup_content">
					<div class="popup_float">
						<div><span>*</span>字典编号</div>
						<el-input v-model="dictionary.codeName" disabled placeholder="请填写"></el-input>
					</div>
					<div class="popup_float">
						<div><span>*</span>数据值	</div>
						<el-input v-model="dictionary.codeValue" :disabled="popup_disabled" placeholder="请填写"></el-input>
					</div>
					<div class="popup_float">
						<div><span>*</span>显示值</div>
						<el-input v-model="dictionary.codeText" placeholder="请填写"></el-input>
					</div>
					<div class="popup_float">
						<div><span>*</span>子级字典名称</div>
						<el-input v-model="dictionary.parentCodeName" placeholder="请填写"></el-input>
					</div>
					<div class="popup_float">
						<div><span>*</span>子级数据值</div>
						<el-input v-model="dictionary.parentCodeValue" placeholder="请填写"></el-input>
					</div>
					<div class="popup_float">
						<div><span>*</span>触发事件</div>
						<el-input v-model="dictionary.triggerEvent" placeholder="请填写"></el-input>
					</div>
					<div class="popup_button">
						<button @click="saveDictionary()">提交</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import { poductApi } from '../js/server.js';
	import pagination from '@components/pagination';
	export default {
		data() {
			return {
				checked: true,
				pageConfig: {
					account: 0,
					currentPage: 1,
					pageSize: 10,
					showJumpButton: true
				},
				catalogNo: "",
				dictionaryList: [],
				dictionary: {},
				popup: false,
				popup_disabled: false,
				popup_title: ""
			};
		},
		methods: {
			handleCurrentChange(val) {
				this.getDictionaryList();
			},
			// 获取字典配置集合
			getDictionaryList() {
				let json = {};
				json.page = this.pageConfig.currentPage;
				json.size = this.pageConfig.pageSize;
				json.catalogNo = this.catalogNo;
				this.dictionaryList = [];
				this.$MyFetch.post(poductApi.getDictionaryList, json, {timeout: 300000})
					.then((data = {}) => {
						console.log(data);
						this.dictionaryList = data.list;
						this.pageConfig.account = data.total;
					})
					.catch((err) => {
						console.log(err);
						this.$error("服务异常");
					});
			},
			// 删除
			deleteDictionary(codeNo) {
				console.log(codeNo);
				this.$MyFetch.post(poductApi.deleteDictionary, {codeNo: codeNo.toString()})
					.then((data = {}) => {
						console.log(data);
						this.getDictionaryList();
						this.$message.success("删除成功");
					})
					.catch((err) => {
						console.log(err);
						this.$error("服务异常");
					});
			},
			// 控制弹窗
			control_popup(value) {
				if (value === "add") {
					this.popup_title = "新增";
					this.popup_disabled = false;
				} else if (value === "edit") {
					this.popup_title = "编辑";
					this.popup_disabled = true;
				}
				this.popup = !this.popup;
				this.dictionary = {};
				this.dictionary.codeName = this.catalogNo;
			},
			// 保存
			saveDictionary() {
				let json = this.dictionary;
				if (!json.codeValue || !json.codeText) {
					this.$error("数据值和显示值是必填的");
				} else {
					this.$MyFetch.post(poductApi.saveDictionary, this.dictionary)
						.then((data = {}) => {
							this.popup = !this.popup;
							this.getDictionaryList();
							this.$message.success("保存成功");
						})
						.catch((err) => {
							console.log(err);
							this.$error(err.message);
						});
				};
			},
			// 编辑
			getEdit(key) {
				console.log(key);
				this.control_popup('edit');
				this.dictionary = JSON.parse(JSON.stringify(this.dictionaryList[key]));
			}
		},
		mounted() {
			if (this.$route.query.catalogNo) {
				this.catalogNo = this.$route.query.catalogNo;
			}
			this.getDictionaryList();
		},
		components: {
			pagination
		}
	};
</script>

<style scoped lang="less">
	.dictionaries_configure {
		padding: 0 20px;
		>a {
			text-decoration: none;
			font-size: 14px;
			color: #538BF1;
			letter-spacing: -0.34px;
		}
		>span {
			font-size: 14px;
			color: #333333;
			letter-spacing: -0.34px;
		}
		.ec_content {
			width: 100%;
			height: 820px;
			background: #fff;
			padding: 0 30px;
			margin-top: 10px;
			.product_button {
				display: block;
				margin-top: -10px;
				float: left;
				background: #538BF1;
				border: 1px solid #538BF1;
				color: #FFFFFF;
				margin-bottom: 20px;
			}
			h3 {
				font-size: 16px;
				color: #333333;
				line-height: 60px;
				font-weight: 900;
			}
			.table {
				float: left;
				width: 100%;
				height: 640px;
				border: 1px solid #E9E9E9;
				table {
					width: 100%;
					.tr_top {
						height: 40px;
						background: #ececec;
						border-bottom: 1px solid #E9E9E9;
					}
					th {
						text-align: center;
						line-height: 40px;
						font-size: 12px;
						color: #666;
					}
					td {
						text-align: center;
						height: 60px;
						line-height: 58px;
						span {
							font-size: 14px;
							color: #4A90E2;
							padding: 0 10px;
							cursor: pointer;
						}
						span:last-child {
							color: #F55F5F;
						}
					}
				}
			}
		}
		.popup_edit_main {
			width: 380px;
			height: 670px;
			background: #FFFFFF;
			border-radius: 4px;
			position: absolute;
			top: 50%;
			left: 50%;
			margin-top: -335px;
			margin-left: -190px;
			h3 {
				width: 100%;
				height: 60px;
				line-height: 60px;
				text-align: center;
				font-size: 16px;
				font-weight: 900;
				color: #333333;
				letter-spacing: 1.22px;
				background: #fff;
				border-radius: 4px 4px 0 0;
				box-shadow: 0 2px 6px 0 #d0d0d0;
				span {
					display: block;
					float: right;
					color: #666;
					width: 40px;
					line-height: 60px;
					font-weight: 900;
					font-size: 20px;
					text-align: center;
					cursor: pointer;
				}
			}
			.popup_content {
				width: 100%;
				.popup_float_one{
					width: 100%;
					padding: 20px;
					height: 40px;
					font-size: 14px;
					line-height: 40px;
					span{
						font-size: 14px;
						color: #666;
						line-height: 40px;
					}
				}
				.popup_float {
					width: 100%;
					padding: 20px;
					float: left;
					height: 85px;
					div {
						height: 20px;
						font-size: 12px;
						line-height: 20px;
						color: #BBBBBB;
						span {
							display: block;
							float: left;
							margin-top: 3px;
							font-size: 14px;
							color: #FF0000;
							padding: 0 3px;
						}
					}
				}
				.popup_button {
					width: 100%;
					float: left;
					button {
						display: block;
						width: 200px;
						height: 40px;
						background: #538BF1;
						font-size: 14px;
						color: #FFFFFF;
						letter-spacing: 1.07px;
						margin: 20px auto;
						cursor: pointer;
						outline: none;
					}
				}
			}
			/deep/ .el-input .el-input__inner {
				background: #ececec;
			}
			/deep/ .el-select {
				margin-left: -12px;
				.el-input__inner {
					background: #fff;
				}
			}
		}
	}
</style>
