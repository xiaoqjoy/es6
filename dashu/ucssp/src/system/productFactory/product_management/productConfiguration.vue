<template>
	<div class="productRelease clearfix">
    <button class="product_button" @click="control_popup('add')">+ 增加</button>
    <button class="product_button import" @click="importData">导入</button>
		<input ref="file" type="file" :value="file" class="hidden" @change="upload">
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
				fixed="right"
				label="操作">
					<template slot-scope="scope">
						<el-button @click="deleteProduct(scope.row.productId, scope.row.version)" type="text" size="small">删除</el-button>
						<!-- <el-button class="del" @click="releaseProduct(scope.row.productId, scope.row.version)" type="text" size="small">发布</el-button> -->
            <el-button class="del" @click="releaseRecheck(scope.row.productId, scope.row.version)" type="text" size="small">发起复核</el-button>
            <el-button class="del" @click="exportProduct(scope.row.productId, scope.row.version)" type="text" size="small">导出</el-button>
            <el-button class="del" @click="exportProductData(scope.row.productId, scope.row.version)" type="text" size="small">导出产品配置</el-button>
						<el-button class="del" @click="toConfigure(scope.row.productId, scope.row.version)" type="text" size="small">配置产品</el-button>
            <el-button class="del" @click="copyProduct(scope.row.productId, scope.row.version)" type="text" size="small">复制</el-button>
					</template>
				</el-table-column>
			</el-table>
		</div>
		<pagination style="float: right;margin: 20px 0;" :page="pageConfig" class="pagination" @jump-page="handleCurrentChange"></pagination>
		<!--<el-pagination style="float: right;margin: 20px 0;" @current-change="handleCurrentChange" :current-page="page" :page-size="pagesize" layout="total, prev, pager, next, jumper" :total="total">
		</el-pagination>-->
    <div v-if="popup" class="product_popup">
			<div class="popup_main">
				<h3 class="title">新增产品配置<span @click="control_popup()" class="el-icon-close"></span></h3>
				<div class="popup_content">
          <el-form
            :model="ruleForm"
            ref="ruleForm"
            class="demo-ruleForm text_left"
            label-position="top"
          >
            <el-form-item
              :label="item.label"
              prop="maritalStatusCode"
              v-for="(item, index) in transferData"
              :key = "index"
              v-if="index != 4">
              <el-select
                clearable
                filterable
                style="width: 100%"
                v-model="ruleForm[index]"
                placeholder="请选择"
              >
                <el-option
                  v-for="items in item.list"
                  :key="items.sourcePartsId"
                  :label="items.partsName"
                  :value="items.sourcePartsId"
                ></el-option>
              </el-select>
            </el-form-item>
            <label class="el-form-item__label">一级产品</label>
            <el-transfer
              filterable
              :filter-method="filterMethod"
              filter-placeholder="请选择"
              v-model="ruleForm1"
              :data="productFirstList">
            </el-transfer>
          </el-form>
					<div class="popup_button">
						<button @click="addProduct()">提交</button>
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
        ruleForm: {0: '', 1: '', 2: '', 3: ''},
        ruleForm1: [],
        productFirstList: [],
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
        popup: false,
				lookPopup: false,
				partsTypeList: [],
				partsType: "",
				transfer: {},
				transferData: [{list: []}],
				transferFalg: false,
				filterMethod(query, item) {
					return item.label.indexOf(query) > -1;
				},
				file: ''
			};
		},
		methods: {
			handleCurrentChange(val) {
				this.getProductList();
			},
			// 获取未发布列表
			getProductList(value) {
				this.$store.dispatch("setSearchJson", this.searchJson);
				if (value === 'search') {
					this.pageConfig.currentPage = 1;
				}
				this.productList = [];
				let json = {};
				json.size = this.pageConfig.pageSize;
				json.page = this.pageConfig.currentPage;
				json.status = "config";
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
				// console.log(json);
				this.$MyFetch.post(poductApi.getProductList, json)
					.then((data = {}) => {
						// console.log(data.list);
						this.productList = data.list;
						this.pageConfig.account = data.total || 0;
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
			// // 产品发布
			// releaseProduct(productId, version) {
			// 	this.$MyFetch.post(poductApi.releaseProduct, [{productId: productId, version: version}])
			// 		.then((data = {}) => {
			// 			this.$message.success("发布成功，请前往产品列表查看");
			// 			this.getProductList();
			// 		})
			// 		.catch((err) => {
			// 			console.log(err);
			// 			this.$error(err.message);
			// 		});
			// },
      // 发起复核
      releaseRecheck(productId, version) {
				this.$confirm('确认发起复核吗？').then(_ => {
          let status = 'check';
					this.$MyFetch.post(`${poductApi.status}?productId=${productId}&version=${version}&status=${status}`)
					.then((data = {}) => {
						console.log(data);
						this.getProductList();
					})
					.catch((err) => {
						this.$error(err.message);
					});
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
//			const link = document.createElement('a');
//			let url = `${poductApi.exportProduct}?productId=${list[0].productId}&version=${list[0].version}`;
//			link.href = url;
//			link.target = "_blank";
//			document.body.appendChild(link);
//			link.click();
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
			// 前往配置
			toConfigure(productId, version) {
				this.$router.push({path: 'productConfigure', query: {productId: productId, version: version, toPath: "productConfiguration"}});
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
			},
      // 控制新增弹窗
      control_popup() {
        this.popup = !this.popup;
        this.ruleForm = {0: '', 1: '', 2: '', 3: ''};
        this.ruleForm1 = [];
        this.transfer = {};
        if (this.popup) {
          this.getTransferData();
        }
      },
      // 获取穿梭内容
      getTransferData() {
        console.log(this.partsTypeList);
        let promiseArr = [];
        let productFirstList = [];
        for (let i = 0; i < this.partsTypeList.length; i++) {
          promiseArr[i] = this.$MyFetch.post(poductApi.getParts, {
            partsType: this.partsTypeList[i].codeValue
          });
        }
        Promise.all(promiseArr).then((values) => {
          for (let i = 0; i < values.length; i++) {
            values[i].label = this.partsTypeList[i].codeText;
          }
          for (let i = 0; i < values[4].list.length; i++) {
            let item = {};
            item.label = values[4].list[i].partsName;
            item.key = values[4].list[i].sourcePartsId;
            productFirstList.push(item);
          }
          this.productFirstList = productFirstList;
          this.transferData = values;
          console.log(this.transferData, productFirstList);
        });
      },
      // 增加提交
      addProduct() {
        let data = [];
        console.log(this.ruleForm);
        for (let i in this.ruleForm) {
          if (this.ruleForm[i]) {
            data.push(this.ruleForm[i]);
          } else {
            this.$error(`${this.transferData[i].label}不能为空`);
            return false;
          }
        }
        if (this.ruleForm1.length === 0) {
          this.$error(`一级产品不能为空`);
          return false;
        }
        data = [...data, ...this.ruleForm1];
        this.$MyFetch.post(poductApi.addProduct, data)
          .then((res = {}) => {
            this.popup = !this.popup;
            this.getProductList();
            this.$message.success("新增成功，请前往产品发布查看");
            this.ruleForm = {0: '', 1: '', 2: '', 3: ''};
            this.ruleForm1 = [];
          })
          .catch((err) => {
            console.log(err);
            this.$error(err.message);
          });
			},
			importData() {
				this.$refs.file.click();
			},
			upload($event) {
				let file = event.target.files[0];
				if (file) {
					let name = file.name.split(".");
					name = name[name.length - 1];
					if (name.toLowerCase() !== "zip") {
						this.$error("请上传zip格式！");
						return;
					}
					let data = new FormData();
					data.append("file", file);
					this.$MyFetch.post(poductApi.importProduct, data)
						.then((data) => {
							this.$message.success("导入成功！");
							setTimeout(() => {
								this.getProductList();
							}, 1000);
						})
						.catch((e) => {
							this.$message.error(e.message);
						});
				}
			}
		},
		mounted() {
			this.searchJson = this.$store.getters.searchJson;
			this.getProductList();
			this.getDictionaryList();
		},
		beforeDestroy() {
			if (this.$route.name !== "productConfigure") {
				this.$store.dispatch("setSearchJson", {});
			}
		},
		components: {
			pagination
		}
	};
</script>

<style scoped lang="less">
.product_popup {
  /deep/ .el-tabs__nav-scroll {
    padding: 0 30px;
  }
  /deep/ .el-tabs__item.is-active {
    font-weight: normal;
  }
  /deep/ .el-tabs__active-bar {
    height: 1.5px;
  }
}
  .popup_main {
    width: 700px;
  }
  .title {
    position: absolute;
    top: 0;
    z-index: 2005;
  }
  /deep/ .el-form-item__label {
    font-size: 14px;
    color: #538BF1;
  }
  /deep/ .product_popup .popup_main .popup_content {
    width: 100%;
  }
  /deep/ .product_popup .popup_main .popup_content {
    margin-top: 40px;
    padding: 30px;
    height: 550px;
    overflow-y: scroll;
    margin-bottom: 20px;
  }
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
		.import {
			margin-left: 20px;
		}
		.hidden {
			display: none;
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
