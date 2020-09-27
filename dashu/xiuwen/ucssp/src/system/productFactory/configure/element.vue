<template>
	<div class="element clearfix">
		<button class="product_button" @click="control_popup('add')">+ 增加</button>
		<div class="search">
			<input type="text" v-model="keyword" class="product_keyword" placeholder="元件名称" />
			<el-select style='float: left;margin: 20px 0 0 20px;' clearable v-model="templateType" filterable placeholder="模板类型">
				<el-option v-for="item in templateTypeList" :key="item.codeValue" :label="item.codeText" :value="item.codeValue">
				</el-option>
			</el-select>
			<button class="product_button" @click="getElementList('search')">查询</button>
			<button @click="keyword='';templateType=''" class="product_button button_empty">清空</button>
		</div>
		<div class="table">
			<table>
				<tr class="tr_top">
					<th>元件编号</th>
					<th>元件名称</th>
					<th>元件类型</th>
					<th>模板类型</th>
					<th>创建时间</th>
					<th>操作</th>
				</tr>
				<tr v-for='(item,key) in elementList' :key="key">
					<td>
						{{item.templateElementId}}
					</td>
					<td>
						{{item.elementName}}
					</td>
					<td>
						{{item.elementText}}
					</td>
					<td>
						{{item.templateText}}
					</td>
					<td>
						{{item.createdDate}}
					</td>
					<td>
						<span @click="toConfigure(item.templateElementId,item.elementName)">配置元件</span>
						<span @click="getElementDetail(item.templateElementId)">编辑</span>
						<span @click="deleteElement(item.templateElementId)">删除</span>
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
						<div><span>*</span>元件编号</div>
						<el-input v-model='elementDetail.templateElementId' disabled placeholder="请填写"></el-input>
					</div>
					<div class="popup_float">
						<div><span>*</span>元件名称</div>
						<el-input v-model='elementDetail.elementName' placeholder="请填写"></el-input>
					</div>
					<div class="popup_float">
						<div><span>*</span>元件类型</div>
						<el-select clearable v-model="elementDetail.elementType" placeholder="请选择">
							<el-option v-for="item in ElementTypeList" :key="item.codeValue" :label="item.codeText" :value="item.codeValue">
							</el-option>
						</el-select>
					</div>
					<div class="popup_float">
						<div><span>*</span>模板类型</div>
						<el-select clearable v-model="elementDetail.templateType" filterable placeholder="模板类型">
							<el-option v-for="item in templateTypeList" :key="item.codeValue" :label="item.codeText" :value="item.codeValue">
							</el-option>
						</el-select>
					</div>
					<div class="popup_float">
						<div><span>*</span>元件件数</div>
						<el-select clearable v-model="elementDetail.numberType" placeholder="请选择">
							<el-option label="单个" value="single"></el-option>
							<el-option label="多个" value="multiple"></el-option>
							<el-option label="父级元件" value="parent"></el-option>
						</el-select>
					</div>
					<div class="popup_float">
						<div><span>*</span>子元件编号</div>
						<el-input v-model="elementDetail.childElementId" placeholder="请填写"></el-input>
					</div>
					<div class="popup_button">
						<button @click="saveElement()">保存</button>
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
				options: [],
				value: '选项1',
				elementList: [],
				elementDetail: {},
				templateType: '',
				templateTypeList: [],
				ElementTypeList: [],
				keyword: "",
				popup_title: "",
				popup: false
			};
		},
		methods: {
			handleCurrentChange(val) {
				this.page = val;
				this.getElementList();
			},
			// 获取元件列表
			getElementList(value) {
				if (value === "search") {
					this.pageConfig.currentPage = 1;
				};
				let json = {};
				json.page = this.pageConfig.currentPage;
				json.size = this.pageConfig.pageSize;
				this.ElementList = [];
				json.elementName = this.keyword;
				json.templateType = this.templateType;
				this.$MyFetch.post(poductApi.getElementList, json)
					.then((data = {}) => {
						console.log(data);
						this.elementList = data.list;
						this.pageConfig.account = data.total;
					})
					.catch((err) => {
						console.log(err);
						this.$error("服务异常");
					});
			},
			// 获取下拉映射关系
			getTemplateTypeList() {
				// 获取模板类型下拉
				this.$MyFetch.post(poductApi.getDictionaryList, {catalogNo: 'TemplateType'})
					.then((data = {}) => {
						console.log(data);
						this.templateTypeList = data.list;
					})
					.catch((err) => {
						console.log(err);
						this.$error("服务异常");
					});
				// 获取元件类型下拉
				this.$MyFetch.post(poductApi.getDictionaryList, {catalogNo: 'ElementType'})
					.then((data = {}) => {
						console.log(data);
						this.ElementTypeList = data.list;
					})
					.catch((err) => {
						console.log(err);
						this.$error("服务异常");
					});
			},
			// 控制弹窗
			control_popup(value) {
				if (value === "add") {
					this.popup_title = "新增元件";
					this.$MyFetch.post(poductApi.getNumber, {method: "getTemplateElementId"})
						.then((data = {}) => {
							console.log(data);
							let json = {templateElementId: data};
							this.elementDetail = json;
						})
						.catch((err) => {
							console.log(err);
							this.$error("服务异常");
						});
				} else if (value === "edit") {
					this.popup_title = "编辑";
				}
				this.popup = !this.popup;
				this.elementDetail = {};
			},
			// 保存
			saveElement() {
				if (!this.elementDetail.elementName || !this.elementDetail.elementType || !this.elementDetail.templateType) {
					this.$error("元件名称、类型,模板类型必填");
				} else {
					this.$MyFetch.post(poductApi.saveElement, this.elementDetail)
						.then((data = {}) => {
							this.popup = !this.popup;
							this.getElementList();
							this.$message.success("保存成功");
						})
						.catch((err) => {
							console.log(err);
							this.$error("服务异常");
						});
				}
			},
			// 获取详情
			getElementDetail(templateElementId) {
				console.log(templateElementId);
				this.control_popup('edit');
				this.$MyFetch.post(poductApi.getElementDetail, {templateElementId: templateElementId})
					.then((data = {}) => {
						console.log(data);
						this.elementDetail = data;
					})
					.catch((err) => {
						console.log(err);
						this.$error("服务异常");
					});
			},
			// 删除
			deleteElement(templateElementId) {
				console.log(templateElementId);
				this.$MyFetch.post(poductApi.deleteElement, {templateElementId: templateElementId})
					.then((data = {}) => {
						this.getElementList();
						this.$message.success("删除成功");
					})
					.catch((err) => {
						console.log(err);
						this.$error("服务异常");
					});
			},
			// 前往配置
			toConfigure(templateElementId, elementName) {
				this.$router.push({path: 'element_configure', query: {templateElementId: templateElementId, elementName: elementName}});
			}
		},
		mounted() {
			this.getTemplateTypeList();
			this.getElementList();
		},
		components: {
			pagination
		}
	};
</script>

<style scoped lang="less">
	.element {
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
					span{
						font-size: 14px;
						color: #4A90E2;
						padding: 0 10px;
						cursor: pointer;
					}
					span:last-child{
						color: #F55F5F;
					}
				}
			}
		}
		.popup_main {
			width: 380px;
			height: 650px;
			background: #FFFFFF;
			border-radius: 4px;
			position: absolute;
			top: 50%;
			left: 50%;
			margin-top: -325px;
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
