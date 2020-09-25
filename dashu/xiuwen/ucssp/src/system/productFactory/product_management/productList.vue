<template>
	<div class="productList clearfix">
		<button class="product_button" @click="control_popup('add')">+ 增加</button>
		<!--<button style="margin-left: 20px;" class="product_button" @click="control_popup('add')">导出产品列表</button>-->
		<div class="search clearfix">
			<el-input style='width: 220px;float: left;margin: 20px 5px 0 0px;' v-model="searchJson.productId" placeholder="产品编号"></el-input>
			<el-input style='width: 220px;float: left;margin: 20px 5px 0 5px;' v-model="searchJson.partnerName" placeholder="合作方名称"></el-input>
			<el-input style='width: 220px;float: left;margin: 20px 5px 0 5px;' v-model="searchJson.fundNumber" placeholder="资金方名称"></el-input>
			<el-select style='float: left;margin: 20px 5px 0 5px;' clearable v-model="searchJson.businessModel" filterable placeholder="业务模式">
				<el-option v-for="item in businessModelList" :key="item.codeValue" :label="item.codeText" :value="item.codeValue">
				</el-option>
			</el-select>
			<el-select style='float: left;margin: 20px 5px 0 5px;' clearable v-model="searchJson.productType" filterable placeholder="产品类别">
				<el-option v-for="item in productTypeList" :key="item.codeValue" :label="item.codeText" :value="item.codeValue">
				</el-option>
			</el-select>
			<el-select style='float: left;margin: 20px 5px 0 5px;' clearable v-model="searchJson.firstProduct" filterable placeholder="一级产品">
				<el-option v-for="item in firstProductList" :key="item.codeValue" :label="item.codeText" :value="item.codeValue">
				</el-option>
			</el-select>
			<button class="product_button" @click="getProductList('search')">查询</button>
			<button @click="searchJson={}" class="product_button button_empty">清空</button>
		</div>
		<div class="table clearfix">
			<el-table
			class="tables"
			:data="productList"
			:header-cell-style="{'font-size':'12px','text-align':'center','height':'38.9px','background':'#F9FAFB'}">
			<el-table-column
				type="index"
				label="序号">
				</el-table-column>
				<el-table-column
				prop="productId"
				label="产品编号">
				</el-table-column>
				<el-table-column
				prop="partnerName"
				label="合作方名称">
				</el-table-column>
				<el-table-column
				prop="fundName"
				label="资金方名称">
				</el-table-column>
				<el-table-column
				prop="model"
				label="合作模式">
				</el-table-column>
				<el-table-column
				prop="productType"
				label="产品类别">
				</el-table-column>
				<el-table-column
				prop="firstProduct"
				label="一级产品">
				</el-table-column>
				<el-table-column
				prop="statusText"
				label="产品状态">
				</el-table-column>
				<el-table-column
				prop="isInuseText"
				label="有效性">
				</el-table-column>
				<el-table-column
				prop="version"
				label="版本号">
				</el-table-column>
				<el-table-column
				fixed="right"
        label="操作">
				<template slot-scope="scope">
					<el-button class="del" type="text" v-if="scope.row.isInuse==='0'" @click="isinuse(scope.row.productId, scope.row.version, '1')">置为有效</el-button>
					<el-button class="del" type="text" v-else @click="isinuse(scope.row.productId, scope.row.version, '0')">置为无效</el-button>
					<el-button class="del" type="text" @click="toConfigure(scope.row.productId, scope.row.version)">配置产品</el-button>
					<el-button class="del" type="text" @click="control_lookPopup(scope.row.productId)">查看历史版本</el-button>
				</template>
      </el-table-column>
			</el-table>
		</div>
		<pagination style="float: right;margin: 20px 0;" :page="pageConfig" class="pagination" @jump-page="handleCurrentChange"></pagination>
		<!--<el-pagination style="float: right;margin: 20px 0;" @current-change="handleCurrentChange" :current-page="page" :page-size="pagesize" layout="total, prev, pager, next, jumper" :total="total">
		</el-pagination>-->
		<div v-if="popup" class="product_popup">
			<div class="popup_main">
				<h3>新增产品配置<span @click="control_popup()" class="el-icon-close"></span></h3>
				<div class="popup_content">
					<el-tabs v-model="partsType" @tab-click="getTransferData">
						<el-tab-pane v-for="(i,key) in partsTypeList" :key="key" :label="i.codeText" :name="i.codeValue">
							<el-transfer :left-default-checked="transferFalg?[]:[-11111111]" style="margin: 30px 0 0 30px;" filterable filter-placeholder="请输入关键字" @change="transferChange()" :filter-method="filterMethod" v-model="transfer[partsType]" :data="transferData" :titles="[i.codeText, `选中的${i.codeText}`]"></el-transfer>
						</el-tab-pane>
					</el-tabs>
					<div class="popup_button">
						<button @click="addProduct()">提交</button>
					</div>
				</div>
			</div>
		</div>
		<div v-if="lookPopup" class="product_popup">
			<div class="lookPopup_main">
				<h3>查看历史版本<span @click="control_lookPopup()" class="el-icon-close"></span></h3>
				<div class="popup_paddindiv">
					<div class="table">
						<table>
							<tr class="tr_top">
								<th style="width: 50px;"></th>
								<th>序号</th>
								<th>产品编号</th>
								<th>合作方名称</th>
								<th>资金方名称</th>
								<th>一级产品</th>
								<th>合作模式</th>
								<th>产品类别</th>
								<th>产品状态</th>
								<th>有效性</th>
								<th>更新人</th>
								<th>更新时间</th>
								<th>版本号</th>
								<th>操作</th>
							</tr>
							<tr v-for='(item,key) in publishList' :key="key">
								<td>
									<el-checkbox v-model="item.checked"></el-checkbox>
								</td>
								<td>
									{{key+1}}
								</td>
								<td>
									{{item.productId}}
								</td>
								<td>
									{{item.partnerName}}
								</td>
								<td>
									{{item.fundName}}
								</td>
								<td>
									{{item.firstProduct}}
								</td>
								<td>
									{{item.model}}
								</td>
								<td>
									{{item.productType}}
								</td>
								<td>
									{{item.statusText}}
								</td>
								<td>
									{{item.isInuseText}}
								</td>
								<td>
									{{item.updatedBy}}
								</td>
								<td>
									{{item.updatedDate}}
								</td>
								<td>
									{{item.version}}
								</td>
								<td>
									<span @click="toConfigure(item.productId, item.version, true)">详情</span>
								</td>
							</tr>
						</table>
					</div>
					<pagination style="float: right;margin: 20px 0;" :page="popup_pageConfig" class="pagination" @jump-page="popup_handleCurrentChange"></pagination>
					<!--<el-pagination style="float: right;margin: 20px 0;" @current-change="popup_handleCurrentChange" :current-page="popup_page" :page-size="popup_pagesize" layout="total, prev, pager, next, jumper" :total="popup_total">
					</el-pagination>-->
					<div class="popup_button">
						<button @click="exportProduct()">导出产品规格说明书</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import { poductApi } from '../js/server.js';
	import pagination from '@components/pagination';
	export default{
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
					pageSize: 7,
					showJumpButton: true
				},
				productList: [],
				publishList: [],
				productId: "",
				FundNameList: [],
				PartnerNameList: [],
				firstProductList: [],
				searchJson: {},
				productTypeList: [],
				businessModelList: [],
				popup: false,
				lookPopup: false,
				partsTypeList: [],
				partsType: "",
				transfer: {},
				transferData: [],
				transferFalg: false,
				filterMethod(query, item) {
					return item.label.indexOf(query) > -1;
				}
			};
		},
		methods: {
			handleCurrentChange(val) {
				this.getProductList();
			},
			popup_handleCurrentChange(val) {
				this.getPublishList();
			},
			// 获取产品列表
			getProductList(value) {
				if (value === 'search') {
					this.pageConfig.currentPage = 1;
				}
				this.productList = [];
				let json = {};
				json.page = this.pageConfig.currentPage;
				json.size = this.pageConfig.pageSize;
				json.status = "published";
				json.isLastVer = "1";
				json.search = [];
				// 产品编号 合作方名称 资金方名称 业务模式 产品类型 一级产品
				json.search[0] = {
					JSONPath: "productId",
					JSONValue: this.searchJson.productId,
					isLike: "true"
				};
				json.search[1] = {
					JSONPath: "parts[partsType='partner'][0].elements[elementType='base'][0].parameters[0][columnName='partnerName'][0].parameterValue",
					JSONValue: this.searchJson.partnerName,
					isLike: "true"
				};
				json.search[2] = {
					JSONPath: "parts[partsType='fund'][0].elements[elementType='base'][0].parameters[0][columnName='fundName'][0].parameterValue",
					JSONValue: this.searchJson.fundNumber,
					isLike: "true"
				};
				json.search[3] = {
					JSONPath: "parts[partsType='model'][0].elements[elementType='base'][0].parameters[0][columnName='businessModel'][0].parameterValue",
					JSONValue: this.searchJson.businessModel,
					isLike: "false"
				};
				json.search[4] = {
					JSONPath: "parts[partsType='product'][0].elements[elementType='base'][0].parameters[0][columnName='productType'][0].parameterValue",
					JSONValue: this.searchJson.productType,
					isLike: "false"
				};
				json.search[5] = {
					JSONPath: "parts[partsType='first_product'][0].elements[elementType='base'][0].parameters[0][columnName='firstProduct'][0].parameterValue",
					JSONValue: this.searchJson.firstProduct,
					isLike: "false"
				};
				console.log(json);
				this.$MyFetch.post(poductApi.getProductList, json)
					.then((data = {}) => {
						console.log(data.list);
						this.productList = data.list;
						this.pageConfig.account = data.total;
					})
					.catch((err) => {
						console.log(err);
						this.$error("服务异常");
					});
			},
			// 有效无效改变
			isinuse(productId, version, isInuse) {
				console.log(productId, version, isInuse);
				let json = {};
				json.productId = productId;
				json.version = version;
				json.isInuse = isInuse;
				this.$MyFetch.post(`${poductApi.updateIsinuse}?productId=${productId}&version=${version}&isInuse=${isInuse}`, {})
					.then((data = {}) => {
						this.getProductList();
					})
					.catch((err) => {
						console.log(err);
						this.$error("服务异常");
					});
			},
			// 获取业务模式、产品类型等下拉映射关系
			getDictionaryList() {
				this.$MyFetch.post(poductApi.getDictionaryList, {catalogNo: "ProductType"})
					.then((data = {}) => {
						this.productTypeList = data.list;
					})
					.catch((err) => {
						console.log(err);
						this.$error("服务异常");
					});
				this.$MyFetch.post(poductApi.getDictionaryList, {catalogNo: "CollaborateMode"})
					.then((data = {}) => {
						this.businessModelList = data.list;
					})
					.catch((err) => {
						console.log(err);
						this.$error("服务异常");
					});
				this.$MyFetch.post(poductApi.getDictionaryList, {catalogNo: 'TemplateType'})
					.then((data = {}) => {
						this.partsTypeList = data.list;
						if (this.partsTypeList.length > 0) {
							this.partsType = this.partsTypeList[0].codeValue;
						}
					})
					.catch((err) => {
						console.log(err);
						this.$error("服务异常");
					});
				this.$MyFetch.post(poductApi.getDictionaryList, {catalogNo: 'PartnerName'})
					.then((data = {}) => {
						this.PartnerNameList = data.list;
					})
					.catch((err) => {
						console.log(err);
						this.$error("服务异常");
					});
				this.$MyFetch.post(poductApi.getDictionaryList, {catalogNo: 'TopBusinessType'})
					.then((data = {}) => {
						this.firstProductList = data.list;
					})
					.catch((err) => {
						console.log(err);
						this.$error("服务异常");
					});
				this.$MyFetch.post(poductApi.getDictionaryList, {catalogNo: 'FundName'})
					.then((data = {}) => {
						this.FundNameList = data.list;
					})
					.catch((err) => {
						console.log(err);
						this.$error("服务异常");
					});
			},
			// 复制产品
			copyProduct(productId, version) {
				this.$router.push({path: 'productConfigure', query: {productId: productId, version: version, toPath: "productList", copy: "copy"}});
			},
			// 控制新增弹窗
			control_popup() {
				this.popup = !this.popup;
				this.transfer = {};
				if (this.popup) {
					this.getTransferData();
				}
			},
			// 控制查看历史版本弹窗
			control_lookPopup(productId) {
				this.lookPopup = !this.lookPopup;
				this.productId = productId;
				if (this.lookPopup) {
					this.getPublishList(productId);
				}
			},
			// 获取历史版本
			getPublishList(productId) {
				this.publishList = [];
				let json = {};
				json.page = this.popup_pageConfig.currentPage;
				json.size = this.popup_pageConfig.pageSize;
				json.status = "published";
				json.search = [];
				// 产品编号 合作方名称 资金方名称 业务模式 产品类型 一级产品
				json.search[0] = {
					JSONPath: "productId",
					JSONValue: this.productId
				};
				json.search[1] = {
					JSONPath: "parts[partsType='partner'][0].elements[elementType='base'][0].parameters[0][columnName='partnerName'][0].parameterValue",
					JSONValue: ""
				};
				json.search[2] = {
					JSONPath: "parts[partsType='fund'][0].elements[elementType='base'][0].parameters[0][columnName='fundName'][0].parameterValue",
					JSONValue: ""
				};
				json.search[3] = {
					JSONPath: "parts[partsType='model'][0].elements[elementType='base'][0].parameters[0][columnName='businessModel'][0].parameterValue",
					JSONValue: ""
				};
				json.search[4] = {
					JSONPath: "parts[partsType='product'][0].elements[elementType='base'][0].parameters[0][columnName='productType'][0].parameterValue",
					JSONValue: ""
				};
				json.search[5] = {
					JSONPath: "parts[partsType='first_product'][0].elements[elementType='base'][0].parameters[0][columnName='firstProduct'][0].parameterValue",
					JSONValue: ""
				};
				console.log(json);
				this.$MyFetch.post(poductApi.getProductList, json)
					.then((data = {}) => {
						console.log(data.list);
						this.publishList = data.list;
						this.popup_pageConfig.account = data.total;
					})
					.catch((err) => {
						console.log(err);
						this.$error("服务异常");
					});
			},
			// 导出产品说明书
			exportProduct() {
				let list = [];
				for (let i = 0; i < this.publishList.length; i++) {
					if (this.publishList[i].checked) {
						list[list.length] = this.publishList[i];
					}
				}
				if (list.length > 1) {
					this.$error("导出只能选择一个");
					} else {
						if (list[0]) {
							this.$MyFetch.get(poductApi.exportProduct, {productId: list[0].productId, version: list[0].version})
								.then((data = {}) => {
									console.log(data);
									let link = document.createElement('a');
									let url = data.downUrl;
									link.href = url;
									link.target = "_blank";
									document.body.appendChild(link);
									link.click();
								})
								.catch((err) => {
									console.log(err);
									this.$error(err.message);
								});
//							const link = document.createElement('a');
//							let url = `${poductApi.exportProduct}?productId=${list[0].productId}&version=${list[0].version}`;
//							link.href = url;
//							link.target = "_blank";
//							document.body.appendChild(link);
//							link.click();
						} else {
							this.$error("请选择一个");
					}
				}
			},
			// 前往配置
			toConfigure(productId, version, disabledflag) {
				this.$router.push({path: 'productConfigure', query: {productId: productId, version: version, toPath: "productList", disabledflag: disabledflag}});
			},
			// 获取穿梭内容
			getTransferData() {
				this.$MyFetch.post(poductApi.getParts, {
					partsType: this.partsType
				}).then((data = {}) => {
					let dataL = [];
					if (this.transfer[this.partsType] && this.partsType !== "first_product") {
						if (this.transfer[this.partsType].length > 0) {
							data.list.forEach((item, index) => {
								console.log(item);
								if (item.sourcePartsId === this.transfer[this.partsType][0]) {
									dataL.push({
										label: item.partsName ? item.partsName : "",
										key: item.sourcePartsId,
										disabled: false
									});
								} else {
									dataL.push({
										label: item.partsName ? item.partsName : "",
										key: item.sourcePartsId,
										disabled: true
									});
								};
							});
						} else {
							data.list.forEach((item, index) => {
								console.log(item);
								dataL.push({
									label: item.partsName ? item.partsName : "",
									key: item.sourcePartsId,
									disabled: false
								});
							});
						};
					} else {
						console.log('no first');
						data.list.forEach((item, index) => {
							console.log(item);
							dataL.push({
								label: item.partsName ? item.partsName : "",
								key: item.sourcePartsId,
								disabled: false
							});
						});
					};
					this.transferData = dataL;
					console.log(this.transferData, 1);
				})
				.catch((err) => {
					console.log(err);
					this.$error("服务异常");
				});
			},
			// 穿梭框右侧改变
			transferChange() {
				console.log(1);
				let dataList = [];
				if (this.transfer[this.partsType] && this.partsType !== "first_product") {
					if (this.transfer[this.partsType].length > 0) {
						if (this.transfer[this.partsType].length > 1) {
							this.transfer[this.partsType] = new Array(this.transfer[this.partsType][0]);
							this.$error("只能有一个");
							this.transferFalg = !this.transferFalg;
						};
						this.transferData.forEach((item, index) => {
							if (item.key === this.transfer[this.partsType][0]) {
								dataList.push({
									label: item.label,
									key: item.key,
									disabled: false
								});
							} else {
								dataList.push({
									label: item.label,
									key: item.key,
									disabled: true
								});
							};
						});
					} else {
						this.transferData.forEach((item, index) => {
							console.log(item);
							dataList.push({
								label: item.label,
								key: item.key,
								disabled: false
							});
						});
					};
				} else {
					this.transferData.forEach((item, index) => {
						dataList.push({
							label: item.label,
							key: item.key,
							disabled: false
						});
					});
				};
				this.transferData = dataList;
			},
			// 增加提加
			addProduct() {
				let dataList = [];
				for (let key in this.transfer) {
					dataList = dataList.concat(this.transfer[key]);
				};
				this.$MyFetch.post(poductApi.addProduct, dataList)
					.then((data = {}) => {
						this.popup = !this.popup;
						this.getProductList();
						this.$message.success("新增成功，请前往产品发布查看");
					})
					.catch((err) => {
						console.log(err);
						this.$error(err.message);
					});
			}
		},
		mounted() {
			this.getProductList();
			this.getDictionaryList();
		},
		components: {
			pagination
		}
	};
</script>

<style scoped lang="less">
	.productList {
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
			margin-bottom: 17px;
			float: left;
			.product_keyword {
				display: block;
				margin: 20px 0 0 0;
				float: left;
			}
			.product_button {
				margin-right: 5px;
				float: left;
			}
			.button_empty {
				background: #fff;
				color: #538BF1;
			}
		}
		.table {
			float: left;
			width: 100%;
			overflow: scroll;
			border: 1px solid #E9E9E9;
			margin-top: 5px;
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
				}
			}
		}
		.popup_main {
			width: 600px;
			height: 618px;
			background: #F9FAFB;
			border-radius: 4px;
			position: absolute;
			top: 50%;
			left: 50%;
			margin-top: -309px;
			margin-left: -300px;
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
			.popup_content{
				width: 560px;
				margin: 20px auto;
				height: 517px;
				background: #fff;
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
		}
		.lookPopup_main{
			width: 1200px;
			height: 710px;
			background: #F9FAFB;
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
			.popup_paddindiv{
				width: 1160px;
				height: 610px;
				background: #fff;
				margin: 0 auto;
				margin-top: 20px;
				padding: 0 20px;
			}
			.table {
				float: left;
				width: 100%;
				height: 460px;
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
						max-width: 100px;
						overflow: hidden;
						text-overflow:ellipsis;
						white-space:nowrap;
						-o-text-overflow:ellipsis;
						-webkit-text-overflow:ellipsis;
						-moz-text-overflow:ellipsis;
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
