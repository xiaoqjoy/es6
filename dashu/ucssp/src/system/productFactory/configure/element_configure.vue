<template>
	<div class="element_configure clearfix">
		<router-link to="element">元件管理</router-link>
		<i class="el-icon-arrow-left"></i>
		<span>配置元件</span>
		<div class="ec_content">
			<h3>元件：{{elementName}}</h3>
			<button class="product_button" @click="control_popuptwo()">+ 增加</button>
			<div class="table">
				<table>
					<tr class="tr_top">
						<th>序号</th>
						<th>参数编号</th>
						<th>参数名称</th>
						<th>显示名称</th>
						<th>横跨列数</th>
						<th>排序号</th>
						<th>排序</th>
						<th>操作</th>
					</tr>
					<tr v-for="(i,key) in elementParamterList" :key='key'>
						<td>
							{{key+1}}
						</td>
						<td>
							{{i.templateParameterId}}
						</td>
						<td>
							{{i.columnName}}
						</td>
						<td>
							{{i.displayName}}
						</td>
						<td>
							{{i.locationColspan}}
						</td>
						<td>
							{{i.sortIndex}}
						</td>
						<td>
							<i class="down" @click="sort(i.relationId,'down')" v-if='key!=elementParamterList.length-1'></i>
							<i class="up" @click="sort(i.relationId,'up')" v-if='key!=0'></i>
						</td>
						<td>
							<span @click="control_popupone(key)">设置</span>
							<span @click="deleteE(i.relationId)">删除</span>
						</td>
					</tr>
				</table>
			</div>
			<pagination style="float: right;margin: 20px 0;" :page="pageConfig" class="pagination" @jump-page="handleCurrentChange"></pagination>
			<!--<el-pagination style="float: right;margin: 20px 0;" @current-change="handleCurrentChange" :current-page="page" :page-size="pagesize" layout="total, prev, pager, next, jumper" :total="total">
			</el-pagination>-->
		</div>
		<div v-if='popup_one' class="product_popup">
			<div class="popup_edit_main">
				<h3>编辑<span @click="control_popupone()" class="el-icon-close"></span></h3>
				<div class="popup_content">
					<div class="popup_float_one">
						<div><span>参数编号：</span>{{elementParamter.templateParameterId}}</div>
					</div>
					<div class="popup_float_one">
						<div><span>参数名称：</span>{{elementParamter.columnName}}</div>
					</div>
					<div class="popup_float_one">
						<div><span>显示名称：</span>{{elementParamter.displayName}}</div>
					</div>
					<div class="popup_float">
						<div><span>*</span>横跨列数</div>
						<el-select clearable v-model="elementParamter.locationColspan" filterable placeholder="模板类型">
							<el-option :label="3" :value="3"></el-option>
							<el-option :label="6" :value="6"></el-option>
							<el-option :label="9" :value="9"></el-option>
							<el-option :label="12" :value="12"></el-option>
						</el-select>
					</div>
					<div class="popup_float">
						<div><span>*</span>排序号	</div>
						<el-input v-model="elementParamter.sortIndex" placeholder="请填写"></el-input>
					</div>
					<div class="popup_button">
						<button @click="saveElementParamter()">提交</button>
					</div>
				</div>
			</div>
		</div>
		<div  v-if='popup_two' class="product_popup">
			<div class="popup_configure_main">
				<h3>配置元件<span @click="control_popuptwo()" class="el-icon-close"></span></h3>
				<div class="popup_paddindiv">
					<div class="search">
						<input type="text" v-model="keyword" class="product_keyword" placeholder="显示名称" />
						<button @click="getParameterList('search')" class="product_button">查询</button>
						<button @click="keyword=''" class="product_button button_empty">清空</button>
					</div>
					<div class="table">
						<table>
							<tr class="tr_top">
								<th style="width: 100px;"></th>
								<th>参数编号</th>
								<th>参数名称</th>
								<th>参数类型</th>
								<th>显示名称</th>
							</tr>
							<tr v-for="(item,key) in paramterList" :key="key">
								<td>
									<el-checkbox v-model="item.checked"></el-checkbox>
								</td>
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
							</tr>
						</table>
					</div>
					<pagination style="float: right;margin: 20px 0;" :page="popup_pageConfig" class="pagination" @jump-page="popup_handleCurrentChange"></pagination>
					<!--<el-pagination style="float: right;margin: 20px 0;" @current-change="popup_handleCurrentChange" :current-page="popup_page" :page-size="popup_pagesize" layout="total, prev, pager, next, jumper" :total="popup_total">
					</el-pagination>-->
					<div class="popup_button">
						<button @click="configure()">提交</button>
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
				popup_pageConfig: {
					account: 0,
					currentPage: 1,
					pageSize: 6,
					showJumpButton: true
				},
				elementParamterList: [],
				elementParamter: {},
				paramterList: [],
				templateElementId: "",
				elementName: "",
				popup_one: false,
				popup_two: false,
				keyword: ""
			};
		},
		methods: {
			handleCurrentChange(val) {
				this.getElementParamterList();
			},
			popup_handleCurrentChange(val) {
				this.getParameterList();
			},
			// 获取元件下的参数列表
			getElementParamterList() {
				let json = {};
				json.page = this.pageConfig.currentPage;
				json.size = this.pageConfig.pageSize;
				json.templateElementId = this.templateElementId;
				this.elementParamterList = [];
				this.$MyFetch.post(poductApi.getElementParamterList, json)
					.then((data = {}) => {
						console.log(data);
						this.elementParamterList = data.list;
						this.pageConfig.account = data.total;
					})
					.catch((err) => {
						console.log(err);
						this.$error("服务异常");
					});
			},
			// 排序
			sort(relationId, sortFlag) {
				var json = {};
				json.relationId = relationId;
				json.sortFlag = sortFlag;
				this.$MyFetch.post(poductApi.sortElementParamter, json)
					.then((data = {}) => {
						console.log(data);
						this.getElementParamterList();
					})
					.catch((err) => {
						console.log(err);
						this.$error("服务异常");
					});
			},
			// 控制编辑弹窗
			control_popupone(key) {
				this.popup_one = !this.popup_one;
				if (key === 0 || key) {
					this.elementParamter = JSON.parse(JSON.stringify(this.elementParamterList[key]));
				}
			},
			// 控制配置元件弹窗
			control_popuptwo() {
				this.popup_two = !this.popup_two;
				this.getParameterList();
			},
			// 提交编辑
			saveElementParamter() {
				this.$MyFetch.post(poductApi.saveElementParamter, this.elementParamter)
					.then((data = {}) => {
						this.popup_one = !this.popup_one;
						this.getElementParamterList();
						this.$message.success("保存成功");
					})
					.catch((err) => {
						console.log(err);
						this.$error("服务异常");
					});
			},
			// 获取参数列表
			getParameterList(value) {
				if (value === "search") {
					this.popup_pageConfig.currentPage = 1;
				};
				this.paramterList = [];
				let json = {};
				json.page = this.popup_pageConfig.currentPage;
				json.size = this.popup_pageConfig.pageSize;
				json.keywords = this.keyword;
				this.$MyFetch.post(poductApi.getParameterList, json)
					.then((data = {}) => {
						console.log(data);
						this.paramterList = data.list;
						this.popup_pageConfig.account = data.total;
					})
					.catch((err) => {
						console.log(err);
						this.$error("服务异常");
					});
			},
			// 配置的提交
			configure() {
				let list = [];
				for (var i = 0; i < this.paramterList.length; i++) {
					if (this.paramterList[i].checked) {
						list[list.length] = this.paramterList[i].templateParameterId;
					};
				}
				var str = list.join(";");
				console.log(str);
				this.$MyFetch.post(poductApi.addElementParamter, {templateElementId: this.templateElementId, templateParameterId: str})
					.then((data = {}) => {
						console.log(data);
						this.popup_two = !this.popup_two;
						this.getElementParamterList();
						this.$message.success("新增参数成功");
					})
					.catch((err) => {
						console.log(err);
						this.$error("服务异常");
					});
			},
			// 删除
			deleteE(relationId) {
				this.$MyFetch.post(poductApi.deleteElementParamter, {relationId: relationId})
					.then((data = {}) => {
						this.getElementParamterList();
						this.$message.success("删除成功");
					})
					.catch((err) => {
						console.log(err);
						this.$error("服务异常");
					});
			}
		},
		mounted() {
			if (this.$route.query.templateElementId && this.$route.query.elementName) {
				this.templateElementId = this.$route.query.templateElementId;
				this.elementName = this.$route.query.elementName;
				this.getElementParamterList();
			};
		},
		components: {
			pagination
		}
	};
</script>

<style scoped lang="less">
	.element_configure {
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
		.ec_content{
			width: 100%;
			height: 840px;
			background: #fff;
			padding: 0 30px;
			margin-top: 10px;
			h3{
				font-size: 16px;
				color: #333333;
				letter-spacing: 1.22px;
				font-weight: 900;
				line-height: 60px;
			}
			.product_button {
				display: block;
				margin-top: -10px;
				float: left;
				background: #538BF1;
				border: 1px solid #538BF1;
				color: #FFFFFF;
				margin-bottom: 20px;
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
						span{
							font-size: 14px;
							color: #4A90E2;
							padding: 0 10px;
							cursor: pointer;
						}
						span:last-child{
							color: #F55F5F;
						}
						.up{
							display: inline-block;
							width: 20px;
							height: 20px;
							background: url(../static/image/up.png);
							background-size: 20px;
							cursor: pointer;
						}
						.down{
							display: inline-block;
							width: 20px;
							height: 20px;
							background: url(../static/image/down.png);
							background-size: 20px;
							cursor: pointer;
						}
					}
				}
			}
		}
		.popup_edit_main {
			width: 380px;
			height: 440px;
			background: #FFFFFF;
			border-radius: 4px;
			position: absolute;
			top: 50%;
			left: 50%;
			margin-top: -220px;
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
		.popup_configure_main{
			width: 1200px;
			height: 710px;
			background: #ececec;
			border-radius: 4px;
			position: absolute;
			top: 50%;
			left: 50%;
			margin-top: -355px;
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
			.popup_paddindiv{
				width: 1160px;
				height: 610px;
				background: #fff;
				margin: 0 auto;
				margin-top: 20px;
				padding: 0 20px;
			}
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
				height: 400px;
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
					margin: 0px auto;
					cursor: pointer;
					outline: none;
				}
			}
		}
	}
</style>
