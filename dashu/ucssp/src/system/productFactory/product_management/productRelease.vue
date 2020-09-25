<template>
	<div class="productRelease clearfix">
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
			:header-cell-style="{'font-size':'12px','text-align':'center','height':'38.9px','background':'#ececec'}">
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
				width="200"
				prop="releaseDate"
				label="允许产品发布日期">
				</el-table-column>
				<el-table-column
				fixed="right"
				label="操作">
					<template slot-scope="scope">
						<el-button @click="deleteProduct(scope.row.productId, scope.row.version)" type="text" size="small">删除</el-button>
						<el-button class="del" @click="releaseProduct(scope.row.productId, scope.row.version)" type="text" size="small">发布</el-button>
						<!-- <el-button class="del" @click="toConfigure(scope.row.productId, scope.row.version)" type="text" size="small">配置产品</el-button> -->
						<el-button class="del" @click="reJect(scope.row.productId, scope.row.version)" type="text" size="small">驳回</el-button>
						<el-button class="del" @click="exportProduct(scope.row.productId, scope.row.version)" type="text" size="small">导出</el-button>
						<el-button class="del" @click="exportProductData(scope.row.productId, scope.row.version)" type="text" size="small">导出产品配置</el-button>
					</template>
				</el-table-column>
			</el-table>
		</div>
		<pagination style="float: right;margin: 20px 0;" :page="pageConfig" class="pagination" @jump-page="handleCurrentChange"></pagination>
		<!--<el-pagination style="float: right;margin: 20px 0;" @current-change="handleCurrentChange" :current-page="page" :page-size="pagesize" layout="total, prev, pager, next, jumper" :total="total">
		</el-pagination>-->
	</div>
</template>

<script>
	import { poductApi } from '../js/server.js';
	import pagination from '@components/pagination';
	export default{
		data() {
			return {
				keyword: "",
				pageConfig: {
					account: 0,
					currentPage: 1,
					pageSize: 10,
					showJumpButton: true
				},
				productList: [],
				searchJson: {},
				FundNameList: [],
				PartnerNameList: [],
				firstProductList: [],
				productTypeList: [],
				businessModelList: [],
				partsTypeList: []
			};
		},
		methods: {
			handleCurrentChange(val) {
				this.getProductList();
			},
			// 获取未发布列表
			getProductList(value) {
				if (value === 'search') {
					this.pageConfig.currentPage = 1;
				}
				this.productList = [];
				let json = {};
				json.size = this.pageConfig.pageSize;
				json.page = this.pageConfig.currentPage;
				json.status = "check";
				// json.status = "config"
				// json.status = "check" 产品发布
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
						console.log(data);
						if (data.list) {
							this.productList = data.list;
							this.pageConfig.account = data.total;
						}
					})
					.catch((err) => {
						console.log(err);
						this.$error("服务异常");
					});
			},
			// 复制产品
			copyProduct(productId, version) {
				this.$router.push({path: 'productConfigure', query: {productId: productId, version: version, toPath: "productRelease", copy: "copy"}});
			},
			// 产品发布
			releaseProduct(productId, version) {
        this.$confirm('是否确认发布该产品？').then(_ => {
          this.$MyFetch.post(poductApi.releaseProduct, [{productId: productId, version: version}]).then((data = {}) => {
            this.$message.success("发布成功，请前往产品列表查看");
            this.getProductList();
          })
          .catch((err) => {
            console.log(err);
            this.$error(err.message);
          });
        })
        .catch(_ => {});
			},
			// 前往配置
			// toConfigure(productId, version) {
			// 	this.$router.push({path: 'productConfigure', query: {productId: productId, version: version, toPath: "productRelease"}});
			// },
			// 驳回
			reJect(productId, version) {
				let status = 'reject';
				this.$MyFetch.post(`${poductApi.status}?productId=${productId}&version=${version}&status=${status}`)
				.then((data = {}) => {
					console.log(data);
					this.getProductList();
				})
				.catch((err) => {
					this.$error(err.message);
				});
			},
      // 导出产品说明书
      exportProduct(productId, version) {
        this.$MyFetch.get(poductApi.exportProduct, {productId: productId, version: version})
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
			},
			// 导出产品配置
			exportProductData(productId, version) {
				this.$MyFetch.get(poductApi.zipProduct, {productId: productId, version: version})
					.then((data = {}) => {
						this.$download(data);
					})
					.catch((err) => {
						console.log(err);
						this.$error(err.message);
					});
			},
			// 删除
			deleteProduct(productId, version) {
				this.$MyFetch.post(poductApi.deleteProduct, {productId: productId, version: version})
					.then((data = {}) => {
						this.$message.success("删除成功");
						this.getProductList();
					})
					.catch((err) => {
						console.log(err);
						this.$error(err.message);
					});
			},
			// 获取业务模式、产品类型下拉映射关系
			getDictionaryList() {
				this.$MyFetch.post(poductApi.getDictionaryList, {catalogNo: "ProductType"}, {timeout: 300000})
					.then((data = {}) => {
						this.productTypeList = data.list;
					})
					.catch((err) => {
						console.log(err);
						this.$error("服务异常");
					});
				this.$MyFetch.post(poductApi.getDictionaryList, {catalogNo: "CollaborateMode"}, {timeout: 300000})
					.then((data = {}) => {
						this.businessModelList = data.list;
					})
					.catch((err) => {
						console.log(err);
						this.$error("服务异常");
					});
				this.$MyFetch.post(poductApi.getDictionaryList, {catalogNo: 'TemplateType'}, {timeout: 300000})
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
				this.$MyFetch.post(poductApi.getDictionaryList, {catalogNo: 'PartnerName'}, {timeout: 300000})
					.then((data = {}) => {
						this.PartnerNameList = data.list;
					})
					.catch((err) => {
						console.log(err);
						this.$error("服务异常");
					});
				this.$MyFetch.post(poductApi.getDictionaryList, {catalogNo: 'TopBusinessType'}, {timeout: 300000})
					.then((data = {}) => {
						this.firstProductList = data.list;
					})
					.catch((err) => {
						console.log(err);
						this.$error("服务异常");
					});
				this.$MyFetch.post(poductApi.getDictionaryList, {catalogNo: 'FundName'}, {timeout: 300000})
					.then((data = {}) => {
						this.FundNameList = data.list;
					})
					.catch((err) => {
						console.log(err);
						this.$error("服务异常");
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
	.productRelease {
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
			float: left;
			margin-bottom: 17px;
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
			border: 1px solid #E9E9E9;
			margin-top: 5px;
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
				}
			}
		}
	}
</style>
