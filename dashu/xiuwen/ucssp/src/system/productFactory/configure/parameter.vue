<template>
	<div class="parameter clearfix">
		<button @click="control_popup('add')" class="product_button">+ 增加</button>
		<div class="search">
			<input type="text" v-model="keyword" class="product_keyword" placeholder="显示名称" />
			<button @click="getParameterList('search')" class="product_button">查询</button>
			<button @click="keyword=''" class="product_button button_empty">清空</button>
		</div>
		<div class="table">
			<table>
				<tr class="tr_top">
					<th>参数编号</th>
					<th>参数名称</th>
					<th>参数类型</th>
					<th>显示名称</th>
					<th>操作</th>
				</tr>
				<tr v-for="(item,key) in parameterList" :key="key">
					<td>
						{{item.templateParameterId}}
					</td>
					<td>
						{{item.columnName}}
					</td>
					<td>
						{{item.parameterTypeText}}
					</td>
					<td>
						{{item.displayName}}
					</td>
					<td>
						<span @click="getParameterDetail(item.templateParameterId)">编辑</span>
						<span @click="deleteParameter(item.templateParameterId)">删除</span>
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
						<div><span>*</span>参数编号</div>
						<el-input disabled v-model="details.templateParameterId" placeholder="请填写"></el-input>
					</div>
					<div class="popup_float">
						<div><span>*</span>显示名称</div>
						<el-input v-model="details.displayName" placeholder="请填写"></el-input>
					</div>
					<div class="popup_float">
						<div><span>*</span>参数类型</div>
						<el-select v-model="details.parameterType" placeholder="请选择">
							<el-option v-for="item in parameterTypeList" :key="item.codeValue" :label="item.codeText" :value="item.codeValue">
							</el-option>
						</el-select>
					</div>
					<div class="popup_float">
						<div><span>*</span>数据字段名</div>
						<el-input v-model="details.columnName" placeholder="请填写"></el-input>
					</div>
					<div class="popup_float">
						<div><span>*</span>缺省值</div>
						<el-input v-model="details.defaultValue" placeholder="请填写"></el-input>
					</div>
					<div class="popup_float">
						<div><span>*</span>填写提示信息</div>
						<el-input v-model="details.placeholder" placeholder="请填写"></el-input>
					</div>
					<div class="popup_float">
						<div><span>*</span>有效状态</div>
						<el-radio style="margin-top: 10px;" v-model='details.status' label="valid">有效</el-radio>
						<el-radio v-model='details.status' label="invalid">无效</el-radio>
					</div>
					<div class="popup_float">
						<div><span>*</span>数据类型</div>
						<el-select v-model='details.dataType' placeholder="请选择">
							<el-option label="string" value="string"></el-option>
							<el-option label="number" value="number"></el-option>
						</el-select>
					</div>
					<div class="popup_float">
						<div><span>*</span>框体类型</div>
						<el-select v-model='details.inputType' placeholder="请选择">
							<el-option label="文本框" value="text"></el-option>
							<el-option label="单选下拉列表" value="select"></el-option>
							<el-option label="多选下拉列表" value="multipleSelect"></el-option>
							<el-option label="文本区域" value="textarea"></el-option>
							<el-option label="日期" value="date"></el-option>
							<el-option label="多选按钮" value="checkbox"></el-option>
							<el-option label="单选按钮" value="radio"></el-option>
							<el-option label="导入" value="fileUpload"></el-option>
						</el-select>
					</div>
					<div class="popup_float">
						<div><span>*</span>框体属性</div>
						<el-input v-model="details.inputAttribute" placeholder="请填写"></el-input>
					</div>
					<div class="popup_float">
						<div><span>*</span>来源类型</div>
						<el-select clearable v-model='details.inputSourceType' placeholder="请选择">
							<el-option label="Code" value="Code"></el-option>
							<el-option label="Sql" value="Sql"></el-option>
						</el-select>
					</div>
					<div class="popup_float">
						<div><span>*</span>显示来源</div>
						<el-input v-model="details.inputSource" placeholder="请填写"></el-input>
					</div>
					<div class="popup_float">
						<div><span>*</span>显示只读</div>
						<el-radio style="margin-top: 10px;" @change="Readonly()" v-model='details.inputIsReadonly' label="1">是</el-radio>
						<el-radio @change="Readonly()"  v-model='details.inputIsReadonly' label="0">否</el-radio>
					</div>
					<div class="popup_float">
						<div><span>*</span>是否必输</div>
						<el-radio style="margin-top: 10px;" :disabled="inputIsRequiredFalg" v-model="details.inputIsRequired" label="1">是</el-radio>
						<el-radio :disabled="inputIsRequiredFalg" v-model='details.inputIsRequired' label="0">否</el-radio>
					</div>
					<div class="popup_float">
						<div><span>*</span>大长度限制</div>
						<el-input v-model="details.inputMaxlength" type="number" placeholder="请填写"></el-input>
					</div>
					<div class="popup_float">
						<div><span>*</span>输入值最小长度限制</div>
						<el-input v-model="details.inputMinlength" type="number" placeholder="请填写"></el-input>
					</div>
					<div class="popup_float">
						<div><span>*</span>单位描述</div>
						<el-input v-model="details.inputUnitDesc" placeholder="请填写"></el-input>
					</div>
					<div class="popup_float">
						<div><span>*</span>附加按钮方法</div>
						<el-input v-model="details.addButtonFunction" placeholder="请填写"></el-input>
					</div>
					<div class="popup_float">
						<div><span>*</span>附加按钮文字</div>
						<el-input v-model="details.addButton" placeholder="请填写"></el-input>
					</div>
					<div class="popup_float">
						<div><span>*</span>附加描述</div>
						<el-input v-model="details.addDesc" placeholder="请填写"></el-input>
					</div>
					<div class="popup_float">
						<div><span>*</span>校验方法</div>
						<el-input v-model="details.checkMethod" placeholder="请填写"></el-input>
					</div>
					<div class="popup_button">
						<button @click="saveParameter()">确认</button>
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
				radio: '1',
				options: [],
				value: '选项1',
				keyword: '',
				parameterList: [],
				popup: false,
				details: {},
				popup_title: "",
				inputIsRequiredFalg: false
			};
		},
		methods: {
			Readonly() {
				let json = this.details;
				if (parseInt(this.details.inputIsReadonly) === 1) {
					this.inputIsRequiredFalg = true;
					json.inputIsRequired = '0';
					this.details = JSON.parse(JSON.stringify(json));
				} else {
					this.inputIsRequiredFalg = false;
				}
			},
			handleCurrentChange(val) {
				this.page = val;
				this.getParameterList();
			},
			// 获取参数列表
			getParameterList(value) {
				if (value === "search") {
					this.pageConfig.currentPage = 1;
				};
				let json = {};
				json.page = this.pageConfig.currentPage;
				json.size = this.pageConfig.pageSize;
				this.parameterList = [];
				json.keywords = this.keyword;
				this.$MyFetch.post(poductApi.getParameterList, json)
					.then((data = {}) => {
						console.log(data);
						this.parameterList = data.list;
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
					this.popup_title = "新增参数";
					this.$MyFetch.post(poductApi.getNumber, {method: "getTemplateParameterId"})
						.then((data = {}) => {
							console.log(data);
							let json = {templateParameterId: data};
							this.details = json;
						})
						.catch((err) => {
							console.log(err);
							this.$error("服务异常");
						});
				} else if (value === "edit") {
					this.popup_title = "编辑";
				}
				this.popup = !this.popup;
				this.details = {};
			},
			// 获取参数类型的映射关系
			getParameterTypeList() {
				this.$MyFetch.post(poductApi.getDictionaryList, {catalogNo: "ParameterType"})
					.then((data = {}) => {
						console.log(data);
						this.parameterTypeList = data.list;
					})
					.catch((err) => {
						console.log(err);
						this.$error("服务异常");
					});
			},
			// 提交
			saveParameter() {
				if (!this.details.displayName || !this.details.parameterType || !this.details.columnName) {
					this.$error("显示名称、参数类型、数据字段名必须得填写");
				} else {
					this.$MyFetch.post(poductApi.saveParameter, this.details)
						.then((data = {}) => {
							this.popup = !this.popup;
							this.getParameterList();
							this.$message.success("保存成功");
						})
						.catch((err) => {
							console.log(err);
							this.$error("服务异常");
						});
				};
			},
			// 编辑
			getParameterDetail(templateParameterId) {
				this.control_popup("edit");
				this.$MyFetch.post(poductApi.getParameterDetail, {templateParameterId: templateParameterId})
					.then((data = {}) => {
						console.log(data);
						this.details = data;
						this.Readonly();
					})
					.catch((err) => {
						console.log(err);
						this.$error("服务异常");
					});
			},
			// 删除
			deleteParameter(templateParameterId) {
				this.$MyFetch.post(poductApi.deleteParameter, {templateParameterId: templateParameterId})
					.then((data = {}) => {
						this.getParameterList();
						this.$message.success("删除成功");
					})
					.catch((err) => {
						console.log(err);
						this.$error("服务异常");
					});
			}
		},
		mounted() {
			this.getParameterList();
			this.getParameterTypeList();
		},
		components: {
			pagination
		}
	};
</script>

<style scoped lang="less">
	.parameter {
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
			width: 1200px;
			height: 800px;
			background: #F9FAFB;
			border-radius: 4px;
			position: absolute;
			top: 50%;
			left: 50%;
			margin-top: -400px;
			margin-left: -600px;
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
				width: 1160px;
				height: 700px;
				margin: 20px 0 0 20px;
				background: #fff;
				.popup_float {
					width: 33%;
					padding: 20px;
					float: left;
					height: 85px;
					div {
						height: 14px;
						font-size: 12px;
						line-height: 14px;
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
						margin: 40px auto;
						cursor: pointer;
						outline: none;
					}
				}
			}
			/deep/ .el-input .el-input__inner {
				background: #F9FAFB;
			}
			/deep/ .el-select {
				width: 100%;
				.el-input__inner {
					background: #fff;
				}
			}
		}
	}
</style>
