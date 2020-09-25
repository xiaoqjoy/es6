<template>
	<div class="dictionaries clearfix">
		<button class="product_button" @click="control_popup('add')">+ 增加</button>
		<div class="search">
			<input type="text" v-model="keyword" class="product_keyword" placeholder="关键字" />
			<button class="product_button" @click="getDictionaryCatalogList('search')">查询</button>
			<button class="product_button button_empty" @click="keyword=''">清空</button>
		</div>
		<div class="table">
			<table>
				<tr class="tr_top">
					<th>序号</th>
					<th>字典编号</th>
					<th>字典名称</th>
					<th>字典描述</th>
					<th>操作</th>
				</tr>

				<tr v-for="(item,index) in DictionaryCatalogList" :key="index">
					<td>
						{{index+1}}
					</td>
					<td>
						{{item.catalogNo}}
					</td>
					<td>
						{{item.catalogName}}
					</td>
					<td>
						{{item.description}}
					</td>
					<td>
						<span @click="toDictionary(item.catalogNo)">配置字典</span>
						<span @click="getDictionaryCatalog(item.catalogNo)">编辑</span>
						<span @click="deleteDictionary(item.catalogNo)">删除</span>
					</td>
				</tr>
			</table>
		</div>
		<pagination style="float: right;margin: 20px 0;" :page="pageConfig" class="pagination" @jump-page="handleCurrentChange"></pagination>
		<!--<el-pagination style="float: right;margin: 20px 0;" @current-change="handleCurrentChange" :current-page="page" :page-size="pagesize" layout="total, prev, pager, next, jumper" :total="total">
		</el-pagination>-->
		<div v-if="popup" class="product_popup">
			<div class="popup_main">
				<h3>{{popup_title}}<span @click="control_popup()" class="el-icon-close"></span></h3>
				<div class="popup_content">
					<div class="popup_float">
						<div><span>*</span>字典编号</div>
						<el-input :disabled="popup_disable" v-model="dictionaryCatalog.catalogNo" placeholder="请填写"></el-input>
					</div>
					<div class="popup_float">
						<div><span>*</span>字典名称</div>
						<el-input v-model="dictionaryCatalog.catalogName" placeholder="请填写"></el-input>
					</div>
					<div class="popup_float">
						<div><span>*</span>字典描述</div>
						<el-input v-model="dictionaryCatalog.description" placeholder="请填写"></el-input>
					</div>
					<div class="popup_button">
						<button @click="submit()">保存</button>
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
				pageConfig: {
					account: 0,
					currentPage: 1,
					pageSize: 10,
					showJumpButton: true
				},
				keyword: "",
				DictionaryCatalogList: [],
				popup: false,
				dictionaryCatalog: {},
				popup_title: "新增数据字典",
				popup_disable: true
			};
		},
		methods: {
			handleCurrentChange(val) {
				this.getDictionaryCatalogList();
			},
			// 获取字典集合
			getDictionaryCatalogList(value) {
				if (value === "search") {
					this.pageConfig.currentPage = 1;
				};
				let json = {};
				json.page = this.pageConfig.currentPage;
				json.size = this.pageConfig.pageSize;
				json.keywords = this.keyword;
				this.DictionaryCatalogList = [];
				this.$MyFetch.post(poductApi.getDictionaryCatalogList, json)
					.then((data = {}) => {
						console.log(data);
						this.DictionaryCatalogList = data.list;
						this.pageConfig.account = data.total;
					})
					.catch((err) => {
						console.log(err);
						this.$error("服务异常");
					});
			},
			// 控制弹窗
			control_popup(value) {
				if (value === "add") {
					this.popup_title = "新增数据字典";
					this.popup_disable = false;
				} else if (value === "edit") {
					this.popup_title = "详情";
					this.popup_disable = true;
				}
				this.popup = !this.popup;
				this.dictionaryCatalog = {};
			},
			// 提交
			submit() {
				let json = this.dictionaryCatalog;
				if (!json.catalogNo || !json.catalogName) {
					this.$error('编号、名称是必填的');
				} else {
					this.$MyFetch.post(poductApi.saveDictionaryCatalog, this.dictionaryCatalog)
						.then((data = {}) => {
							console.log(data);
							this.popup = !this.popup;
							this.getDictionaryCatalogList();
							this.$message.success("提交成功");
						})
						.catch((err) => {
							console.log(err);
							this.$error("服务异常");
						});
				};
			},
			// 删除
			deleteDictionary(catalogNo) {
				this.$MyFetch.post(poductApi.deleteDictionaryCatalog, {catalogNo: catalogNo})
					.then((data = {}) => {
						this.getDictionaryCatalogList();
						this.$message.success("删除成功");
					})
					.catch((err) => {
						console.log(err);
						this.$error("服务异常");
					});
			},
			// 获取详情
			getDictionaryCatalog(catalogNo) {
				this.$MyFetch.post(poductApi.getDictionaryCatalog, {catalogNo: catalogNo})
					.then((data = {}) => {
						console.log(data);
						this.control_popup("edit");
						this.dictionaryCatalog = data;
					})
					.catch((err) => {
						console.log(err);
						this.$error("服务异常");
					});
			},
			// 配置
			toDictionary(catalogNo) {
				this.$router.push({path: 'dictionaries_configure', query: {catalogNo: catalogNo}});
			}
		},
		mounted() {
			this.getDictionaryCatalogList();
		},
		components: {
			pagination
		}
	};
</script>

<style scoped lang="less">
	.dictionaries {
		width: 100%;
		min-height: 500px;
		background: #FFFFFF;
		box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.08);
		border-radius: 4px;
		padding: 0 30px;
		.product_button {
			display: block;
			margin-top: 20px;
			float: left;
			background: #538BF1;
			border: 1px solid #538BF1;
			color: #FFFFFF;
		}
		.search {
			width: 100%;
			height: 80px;
			float: left;
			.product_keyword {
				display: block;
				margin: 20px 0 0 0;
				float: left;
			}
			.product_button {
				margin-left: 30px;
			}
			.button_empty {
				background: #fff;
				color: #538BF1;
			}
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
					background: #F9FAFB;
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
		.popup_main {
			width: 380px;
			height: 410px;
			background: #FFFFFF;
			border-radius: 4px;
			position: absolute;
			top: 50%;
			left: 50%;
			margin-top: -205px;
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
				box-shadow: 0 1px 10px 0 rgba(0, 0, 0, 0.05);
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
				background: #F9FAFB;
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
