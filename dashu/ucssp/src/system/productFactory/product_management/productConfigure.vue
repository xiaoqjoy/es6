<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-13 14:59:20
 * @LastEditTime: 2019-08-26 11:05:04
 * @LastEditors: Please set LastEditors
 -->
<template>
	<div class="productConfigure clearfix">
		<router-link v-if="toPath==='productList'" to="productList">产品列表</router-link>
		<router-link v-else to="productRelease">产品发布</router-link>
		<i class="el-icon-arrow-left"></i>
		<span>配置产品</span>
		<div class="ec_content clearfix">
			<h3>产品：{{productId}}
				<div class="effect-time">
					<label>允许产品发布日期：</label>
					<el-date-picker v-model="product.releaseDate" type="date" value-format="yyyy-MM-dd" placeholder="选择允许发布时间">
    </el-date-picker>
				</div>
			</h3>
			<div class="min_demos" v-for='(parts,partsKey) in partsList' :key='partsKey'>
				<h2>
					{{parts.partsName}}
					<el-button type="primary" icon="el-icon-edit" class="edit-part" @click="editPart(partsKey)" v-if="!disabledflag">修改</el-button>
				</h2>
				<div class="template_elements clearfix" v-for='(i,ikey) in parts.elements' :key='"elements"+ikey'>
					<h3><b>{{i.elementName}}</b><span v-if='i.numberType=="multiple"||i.numberType=="parent"' @click="addE(partsKey, ikey, i.numberType)">+</span><span v-if='i.numberType=="multiple"&&i.parameters.length>1' @click="deleteE(partsKey, ikey)">-</span><span v-if='i.numberType=="parent"' @click="deleteParent(partsKey, ikey)">-</span></h3>
					<div class="elements" v-for='(j,jkey) in i.parameters' :key='"parameters"+jkey'>
						<el-row :gutter="10">
							<div v-for='(item,itemkey) in j' :key='itemkey'>
								<el-col v-if='item.status=="valid"' :span="item.locationColspan*2">
									<vtext :disabledflag="disabledflag || disabledflags[partsKey]" @popu="relationChange" :partsKey="partsKey" :ikey="ikey" :jkey='jkey' :fn='changeElements' :itemkey='itemkey' :data='item' v-if='item.inputType=="text"'></vtext>
									<vmultipleSelect :disabledflag="disabledflag || disabledflags[partsKey]" @popu="relationChange" :partsKey="partsKey" :ikey="ikey" :jkey='jkey' :fn='changeElements' :itemkey='itemkey' :data='item' v-if='item.inputType=="multipleSelect"'></vmultipleSelect>
									<vcascaderSelect :disabledflag="disabledflag || disabledflags[partsKey]" @popu="relationChange" :partsKey="partsKey" :ikey="ikey" :jkey='jkey' :fn='changeElements' :itemkey='itemkey' :data='item' v-if='item.inputType=="cascaderSelect"'></vcascaderSelect>
									<vselect :disabledflag="disabledflag || disabledflags[partsKey]" @popu="relationChange" :partsKey="partsKey" :ikey="ikey" :jkey='jkey' :fn='changeElements' :itemkey='itemkey' :data='item' @setSelect="setSelect" v-if='item.inputType=="select"'></vselect>
									<vtextarea :disabledflag="disabledflag || disabledflags[partsKey]" @popu="relationChange" :partsKey="partsKey" :ikey="ikey" :jkey='jkey' :fn='changeElements' :itemkey='itemkey' :data='item' v-if='item.inputType=="textarea"'></vtextarea>
									<vdate :disabledflag="disabledflag || disabledflags[partsKey]" @popu="relationChange" :partsKey="partsKey" :ikey="ikey" :jkey='jkey' :fn='changeElements' :itemkey='itemkey' :data='item' v-if='item.inputType=="date"'></vdate>
									<vcheckbox :disabledflag="disabledflag || disabledflags[partsKey]" @popu="relationChange" :partsKey="partsKey" :ikey="ikey" :jkey='jkey' :fn='changeElements' :itemkey='itemkey' :data='item' v-if='item.inputType=="checkbox"'></vcheckbox>
									<vradio :disabledflag="disabledflag || disabledflags[partsKey]" @popu="relationChange" :partsKey="partsKey" :ikey="ikey" :jkey='jkey' :fn='changeElements' :itemkey='itemkey' :data='item' v-if='item.inputType=="radio"'></vradio>
									<VfileUpload @getName="getName" :disabledflag="disabledflag || disabledflags[partsKey]" @popu="relationChange" :partsKey="partsKey" :ikey="ikey" :jkey='jkey' :fn='changeElements' :itemkey='itemkey' :data='item' v-if='item.inputType=="fileUpload"'></VfileUpload>
                  <div class="btn-group" v-if="item.columnName==='receiveIdentifyType'">
                    <div class="upload-btn">
                      <el-button type="primary" style="width:140px" @click="pricingImport(partsKey)" :disabled="disabledflags[partsKey]">定价导入</el-button>
                      <input class="upload-file point" type="file" accept="undefined" name="file" ref="importExcel" @change="selectedFile">
                    </div>
                    <el-button type="primary" style="width:140px" @click="pricingexport" :disabled="disabledflags[partsKey]">定价导出</el-button>
                  </div>
                </el-col>
							</div>
						</el-row>
					</div>
					<div class="child" v-for='(k,childkey) in i.childElements' :key='ikey + childkey'>
						<h3><b>{{k.elementName}}</b><span v-if='k.numberType=="multiple"' @click="addE(partsKey, ikey,childkey, k.numberType)">+</span><span v-if='k.numberType=="multiple"&&k.parameters.length>1' @click="deleteE(partsKey, ikey,childkey)">-</span></h3>
						<div v-for='(itemI,jkey) in k.parameters' :key='jkey'>
							<el-row :gutter="10">
								<div v-for='(item,itemkey) in itemI' :key="itemkey">
									<el-col v-if='item.status=="valid"' :span="item.locationColspan*2">
										<vtext :disabledflag="disabledflag || disabledflags[partsKey]" @popu="relationChange" :partsKey="partsKey" :childkey="childkey" :ikey="ikey" :jkey='jkey' :itemkey='itemkey' :fn='changeElements' :data='item' v-if='item.inputType=="text"'></vtext>
										<vmultipleSelect :disabledflag="disabledflag || disabledflags[partsKey]" @popu="relationChange" :partsKey="partsKey" :childkey="childkey" :ikey="ikey" :jkey='jkey' :itemkey='itemkey' :fn='changeElements' :data='item' v-if='item.inputType=="multipleSelect"'></vmultipleSelect>
										<vcascaderSelect :disabledflag="disabledflag || disabledflags[partsKey]" @popu="relationChange" :partsKey="partsKey" :ikey="ikey" :jkey='jkey' :fn='changeElements' :itemkey='itemkey' :data='item' v-if='item.inputType=="cascaderSelect"'></vcascaderSelect>
										<vselect :disabledflag="disabledflag || disabledflags[partsKey]" @popu="relationChange" :partsKey="partsKey" :childkey="childkey" :ikey="ikey" :jkey='jkey' :itemkey='itemkey' :fn='changeElements' :data='item'  @setSelect="setSelect" v-if='item.inputType=="select"'></vselect>
										<vtextarea :disabledflag="disabledflag || disabledflags[partsKey]" @popu="relationChange" :partsKey="partsKey" :childkey="childkey" :ikey="ikey" :jkey='jkey' :itemkey='itemkey' :fn='changeElements' :data='item' v-if='item.inputType=="textarea"'></vtextarea>
										<vdate :disabledflag="disabledflag || disabledflags[partsKey]" @popu="relationChange" :partsKey="partsKey" :childkey="childkey" :ikey="ikey" :jkey='jkey' :itemkey='itemkey' :fn='changeElements' :data='item' v-if='item.inputType=="date"'></vdate>
										<vcheckbox :disabledflag="disabledflag || disabledflags[partsKey]" @popu="relationChange" :partsKey="partsKey" :childkey="childkey" :ikey="ikey" :jkey='jkey' :itemkey='itemkey' :fn='changeElements' :data='item' v-if='item.inputType=="checkbox"'></vcheckbox>
										<vradio :disabledflag="disabledflag || disabledflags[partsKey]" @popu="relationChange" :partsKey="partsKey" :childkey="childkey" :ikey="ikey" :jkey='jkey' :itemkey='itemkey' :fn='changeElements' :data='item' v-if='item.inputType=="radio"'></vradio>
										<VfileUpload @getName="getName" :disabledflag="disabledflag || disabledflags[partsKey]" @popu="relationChange" :partsKey="partsKey" :childkey="childkey" :ikey="ikey" :jkey='jkey' :itemkey='itemkey' :fn='changeElements' :data='item' v-if='item.inputType=="fileUpload"'></VfileUpload>
									</el-col>
								</div>
							</el-row>
						</div>
					</div>
				</div>
			</div>
			<div class="botton">
			<button :style="disabledflag?style:''" class="saveProduct" @click="saveProduct()" :disabled="canSave">保存</button>
			</div>
			<message v-if='alertMessage' @clsoe_windowAlert="closeMessage" :msgData="msgData"/>
		</div>
	</div>
</template>

<script>
	import vtext from '../inputType/text.vue';
	import vselect from '../inputType/select.vue';
	import vmultipleSelect from '../inputType/multipleSelect.vue';
	import vcascaderSelect from '../inputType/cascaderSelect.vue';
	import vtextarea from '../inputType/textarea.vue';
	import vdate from '../inputType/date.vue';
	import vcheckbox from '../inputType/checkbox.vue';
	import vradio from '../inputType/radio.vue';
	import VfileUpload from '../inputType/fileUpload.vue';
	import { poductApi } from '../js/server.js';
	import message from '../product_management/message';
	export default{
		data() {
			return {
				msgData: '', // 保存出错提示内容
				disabledflags: [], // 编辑开关数组
				alertMessage: false, // 提示开关
				productId: "",
				version: "",
				product: {},
				originList: [],
				partsList: [],
				toPath: "",
				disabledflag: false,
				partIndex: 0,
				style: {
					display: "none"
				},
				submitFalg: true,
				isCopy: false,
        accept: ['xlsx', 'xls'], // 定价导入格式
        file: {}, // input输入文件中转
				uploadList: [], // 上传列表
				releaseDate: ''
			};
		},
		computed: {
			canSave() {
				return this.partsList.length === this.disabledflags.filter(flag => flag).length;
			}
		},
		methods: {
			setSelect(obj) {
				if (obj.data.columnName === "feesMode") { // 收费方式处理
					let param = this.partsList[obj.partsKey].elements[obj.ikey].childElements[obj.childkey].parameters[obj.jkey];
					let val = param[obj.itemkey].parameterValue;
					if (val === "01") {
						param[obj.itemkey + 1].parameterValue = "03";
						param[obj.itemkey + 2].parameterValue = "0";
						param[obj.itemkey + 3].parameterValue = "0";
						param[obj.itemkey + 2].inputIsReadonly = '0';
						param[obj.itemkey + 3].inputIsReadonly = '0';
					}
					if (val === "04") {
						param[obj.itemkey + 1].parameterValue = "03";
						param[obj.itemkey + 2].parameterValue = "1";
						param[obj.itemkey + 3].parameterValue = "1";
						param[obj.itemkey + 2].inputIsReadonly = '0';
						param[obj.itemkey + 3].inputIsReadonly = '0';
					}
				}
				if (obj.data.columnName === "feesTermType") { // 收费期限类型处理
					let param = this.partsList[obj.partsKey].elements[obj.ikey].childElements[obj.childkey].parameters[obj.jkey];
					let val = param[obj.itemkey].parameterValue;
					if (val === "01" || val === "02") {
						param[obj.itemkey + 1].parameterValue = "";
						param[obj.itemkey + 1].inputIsReadonly = '1';
						param[obj.itemkey + 2].parameterValue = "";
						param[obj.itemkey + 2].inputIsReadonly = '1';
					} else {
						param[obj.itemkey + 1].inputIsReadonly = '0';
						param[obj.itemkey + 2].inputIsReadonly = '0';
					}
				}
				if (obj.data.columnName === 'onlineFaceSign') {
					let param = this.partsList[obj.partsKey].elements;
					let index = this.$lodash.findIndex(param, {"elementType": "print"});
					param[index].parameters[obj.jkey][obj.jkey].inputIsReadonly = obj.parameterValue === '1' ? '0' : '1';
				}
				if (obj.data.columnName === "feeCalcMethod") { // 提前还款违约金计算方式处理
					let param = this.partsList[obj.partsKey].elements[obj.ikey].parameters[0];
					let val = param[obj.itemkey].parameterValue;
					let elements = this.partsList[obj.partsKey].elements;
					if (val === "03") {
						elements.forEach((element, i) => {
							if (element.elementType === "prepayFee") {
								let param = element.parameters[0];
								param.forEach((ele) => {
									if (ele.columnName === "prepayFeeRate") {
										ele.parameterValue = "";
										ele.inputIsReadonly = "1";
									}
								});
							}
							if (element.elementType === "prepayFeeSeg") {
								let param = element.parameters;
								param.forEach((ele) => {
									ele.forEach((e) => {
										e.inputIsReadonly = "0";
									});
								});
							}
						});
					}
					if (val === "01") {
						elements.forEach((element, i) => {
							if (element.elementType === "prepayFee") {
								let param = element.parameters[0];
								param.forEach((ele) => {
									if (ele.columnName === "prepayFeeRate") {
										ele.inputIsReadonly = "0";
									}
								});
							}
							if (element.elementType === "prepayFeeSeg") {
								let param = element.parameters;
								param.splice(1, param.length - 1);
								param.forEach((ele) => {
									ele.forEach((e) => {
										e.parameterValue = "";
										e.inputIsReadonly = "1";
									});
								});
							}
						});
					}
				}
			},
			editPart(index) {
				this.$set(this.disabledflags, index, false);
			},
			openMessage(msg) {
				this.msgData = msg;
				this.alertMessage = true;
			},
			closeMessage() {
				this.alertMessage = false;
			},
			getProductDetail() {
				this.$MyFetch.post(`${poductApi.getProductDetail}?productId=${this.productId}&version=${this.version}`, {})
					.then((data = {}) => {
						// console.log(data);
						let parts = [];
						let parameters = [];
						if (data.parts) {
							for (let i = 0; i < data.parts.length; i++) {
								parts = data.parts[i];
								parameters = parts.elements[0].parameters[0];
								if (parameters) {
									for (let i = 0; i < parameters.length; i++) {
										// console.log(parameters[i]);
										if (parameters[i].columnName === "partnerId" || parameters[i].columnName === "partnerName" || parameters[i].columnName === "fundId" || parameters[i].columnName === "fundName" || parameters[i].columnName === "firstProduct" || parameters[i].columnName === "productType" || parameters[i].columnName === "businessModel") {
											parameters[i].inputIsReadonly = '1';
										}
									}
								};
							}
						}
						let today = new Date();
						let year = today.getFullYear();
						let month = today.getMonth() + 1;
						month = month > 9 ? month : "0" + month;
						let day = today.getDate();
						day = day > 9 ? day : "0" + day;
						data.releaseDate = data.releaseDate || `${year}-${month}-${day}`;
						this.product = data;
						this.partsList = data.parts;
						this.originList = JSON.parse(JSON.stringify(this.partsList));
						this.partsList.forEach((part) => {
							this.disabledflags.push(true);
						});
						// console.log(this.partsList);
            // 字段值控制
            if (this.isCopy) {
							this.partsList[4].elements[0].parameters[0][0].inputIsReadonly = '0';
						}
					})
					.catch((err) => {
						console.log(err);
						this.$error("服务异常");
					});
				this.getNumebr();
			},
			// 复制的时候获取产品id
			getNumebr() {
				if (this.$route.query.copy) {
					// getProductId            --  产品ID
					this.$MyFetch.post(poductApi.getNumber, {method: "getProductId"})
						.then((data = {}) => {
							// console.log(data);
							this.productId = data;
						})
						.catch((err) => {
							console.log(err);
							this.$error("服务异常");
						});
					// console.log(this.$route.query.copy);
				}
			},
			// 改变值
			changeElements(ikey, jkey, itemkey, data, childkey, partsKey) {
				// console.log(ikey, jkey, itemkey, data, childkey, partsKey);
				let list = this.partsList;
				if (arguments.length === 5) {
					list[childkey].elements[ikey].parameters[jkey][itemkey].parameterValue = data;
				} else if (arguments.length === 6) {
					list[partsKey].elements[ikey].childElements[childkey].parameters[jkey][itemkey].parameterValue = data;
				};
				// console.log(this.partsList);
				// console.log(this.product);
			},
			// 获取文件名
			getName(ikey, jkey, itemkey, data, childkey, partsKey) {
				// console.log(ikey, jkey, itemkey, data, childkey, partsKey);
				let list = this.partsList;
				if (arguments.length === 5) {
					let json = Object.assign({}, list[childkey].elements[ikey].parameters[jkey][itemkey + 1]);
					json.parameterValue = data;
					list[childkey].elements[ikey].parameters[jkey].splice(itemkey + 1, 1, json);
				} else if (arguments.length === 6) {
					let json = Object.assign({}, list[partsKey].elements[ikey].childElements[childkey].parameters[jkey][itemkey + 1]);
					json.parameterValue = data;
					list[partsKey].elements[ikey].childElements[childkey].parameters[jkey].splice(itemkey + 1, 1, json);
				};
			},
			// 关联改变
			relationChange(ikey, jkey, itemkey, parameterValue, partsKey, methods) {
				this.$MyFetch.post(poductApi.interactiveParser, {method: methods, value: {index: itemkey.toString(), value: parameterValue}})
					.then((data = {}) => {
							// console.log(data);
							let list = data.result;
							let parametersJson = {};
							for (let i = 0; i < list.length; i++) {
								console.log(list[i]);
								parametersJson = JSON.parse(JSON.stringify(this.partsList[partsKey].elements[ikey].parameters[jkey][list[i].index]));
								parametersJson.parameterValue = list[i].value;
								parametersJson.flag = !list[i].flag;
								this.partsList[partsKey].elements[ikey].parameters[jkey].splice(list[i].index, 1, parametersJson);
							}
						})
						.catch((err) => {
							console.log(err);
							this.$error("服务异常");
						});
			},
			saveProduct() {
				if (!this.product.releaseDate) {
					this.$message("请先选择允许发布时间");
					return;
				}
				let prices = [];
				let charges = [];
				let flag = true;
				this.product.parts.forEach(item => {
					if (item.partsType === "first_product") {
						prices = item.elements.filter(ele => ele.elementType === "price");
						charges = prices.map(ele => ele.childElements);
						let feeCalcMethod;
						item.elements.forEach((ele) => {
							if (ele.elementType === "prepayFee") {
								let arr = ele.parameters[0];
								arr.forEach((e) => {
									if (e.columnName === "feeCalcMethod") {
										if (!e.parameterValue) {
											this.$error(e.displayName + "不能为空");
											flag = false;
										} else {
											feeCalcMethod = e.parameterValue;
										}
									}
									if (e.columnName === "prepayFeeBase") {
										if (!e.parameterValue && flag) {
											this.$error(e.displayName + "不能为空");
											flag = false;
										}
									}
								});
							}
							if (ele.elementType === "prepayFee" && feeCalcMethod === "01") {
								let arr = ele.parameters[0];
								arr.forEach((e) => {
									if (e.columnName === "prepayFeeRate") {
										if (!e.parameterValue && flag) {
											this.$error(e.displayName + "不能为空");
											flag = false;
										}
									}
								});
							}
							if (ele.elementType === "prepayFeeSeg" && feeCalcMethod === "03") {
								let arr = ele.parameters;
								arr.forEach((item) => {
									item.forEach((e) => {
										if (!e.parameterValue && flag) {
											this.$error("请完善提前还款违约金分段计算");
											flag = false;
										}
									});
								});
							}
						});
					}
				});
				if (!flag) {
					return false;
				}
				let priceArr = [];
				let priceTypeArr = ["priceType", "loanTerm", "customerAPR", "riskType", "pricingPlan"];
				let isPrice = false;
				prices.forEach((item) => {
					let parameters = item.parameters[0];
					let obj = {};
					parameters.forEach((parameter) => {
						if (priceTypeArr.includes(parameter.columnName)) {
							if (parameter.columnName === "loanTerm" || parameter.columnName === "riskType" || parameter.columnName === "pricingPlan") {
								obj[parameter.columnName] = parameter.parameterValue ? parameter.parameterValue.split(";").sort().join(";") : parameter.parameterValue;
							} else {
								obj[parameter.columnName] = parameter.parameterValue;
							}
						}
					});
					priceArr.forEach((item) => {
						console.log("test", item, obj);
						if (JSON.stringify(item) === JSON.stringify(obj)) {
							isPrice = true;
						}
					});
					priceArr.push(obj);
				});
				let chargeTypeArr = ["chargeParty", "feesType"];
				let isCharge = false;
				charges.forEach((item) => {
					if (item && item.length > 0) {
						let parameters = item[0].parameters;
						let chargeArr = [];
						parameters.forEach((parameter) => {
							let obj = {};
							parameter.forEach((param) => {
								if (chargeTypeArr.includes(param.columnName)) {
									obj[param.columnName] = param.parameterValue;
								}
							});
							chargeArr.forEach((item) => {
								if (JSON.stringify(item) === JSON.stringify(obj)) {
									isCharge = true;
								}
							});
							chargeArr.push(obj);
						});
					}
				});
				if (isPrice) {
					this.commonPriceWarn()
						.then(() => {
							if (isCharge) {
								this.commonChargeWarn()
									.then(() => {
										this.saveProductApi();
									})
									.catch((e) => {
										console.log(e);
									});
							} else {
								this.saveProductApi();
							}
						})
						.catch((e) => {
							console.log(e);
						});
				} else {
					if (isCharge) {
						this.commonChargeWarn()
							.then(() => {
								this.saveProductApi();
							})
							.catch((e) => {
								console.log(e);
							});
					} else {
						this.saveProductApi();
					}
				}
			},
			commonPriceWarn() {
				return this.confirmFn("有超过2条定价中“定价类型”、“贷款期限”“客户总APR”、“风险定价档次”、“定价方案”完全一致，请确认是否继续？", "warning");
			},
			commonChargeWarn() {
				return this.confirmFn("同一“一级产品收费类型”中有超过2条“收费方”、“费用类型”完全一致，请确认是否继续？", "warning");
			},
			saveProductApi() {
				let partsArr = [];
				this.disabledflags.forEach((flag, index) => {
					if (!flag) {
						partsArr.push(this.partsList[index].partsName + "模块");
					}
				});
				/* let updateFlag = false;
				this.partsList.forEach((parts, i) => {
					if (JSON.stringify(parts) !== JSON.stringify(this.originList[i])) {
						partsArr.push(parts.partsName);
						updateFlag = true;
					}
				});
				if (!updateFlag) {
					this.confirmFn("本次没内容调整，不需要保存");
					return;
				} */
				let message = '本次调整内容为' + partsArr.join("、");
				this.confirmFn(message, "warning", true)
				.then(() => {
					this.product.productId = this.productId;
					if (this.submitFalg) {
						this.submitFalg = false;
						this.$MyFetch.post(poductApi.saveProduct, this.product)
							.then((data = {}) => {
								this.$router.push({path: this.toPath});
								this.$message.success("保存成功");
							})
							.catch((err) => {
								this.openMessage(err.message);
								this.submitFalg = true;
							});
					};
				})
				.catch((action) => {
					console.log(action);
				});
			},
			// 多件增加
			addE(partsKey, ikey, childkey, numberType) {
				if (arguments.length === 3) {
					if (childkey !== "parent") {
						let list = this.partsList[partsKey].elements[ikey].parameters;
						let data = [];
						if (list) {
							data = JSON.parse(JSON.stringify(list[list.length - 1]));
							/* for (let i = 0; i < list[0].length; i++) {
								data[i].parameterValue = "";
							} */
							list.splice(list.length, 1, data);
						}
					} else {
						let list = JSON.parse(JSON.stringify(this.partsList[partsKey].elements[ikey]));
						// console.log(this.partsList[partsKey].elements[ikey]);
						/* if (list.childElements) {
							let length = list.childElements[0].parameters.length;
							if (length > 1) {
								list.childElements[0].parameters.splice(1, length - 1);
							}
							for (let i = 0; i < list.childElements[0].parameters[0].length; i++) {
								console.log(list.childElements[0].parameters[0][i].parameterValue = "");
							}
						} */
						/* if (list.parameters) {
							for (let i = 0; i < list.parameters[0].length; i++) {
								list.parameters[0][i].parameterValue = "";
							}
						} */
						this.partsList[partsKey].elements.splice(ikey + 1, 0, list);
						// this.$MyFetch.get(poductApi.getelement, {elementType: this.partsList[partsKey].elements[ikey].elementType, templateType: this.partsList[partsKey].partsType})
						// 	.then((data = {}) => {
						// 		this.partsList[partsKey].elements.splice(ikey + 1, 0, data[0]);
						// 	})
						// 	.catch((err) => {
						// 		console.log(err);
						// 		this.$error("服务异常");
						// 	});
					}
				} else {
					// console.log(partsKey, ikey, childkey);
					let list = this.partsList[partsKey].elements[ikey].childElements[childkey].parameters;
					let data = [];
					if (list) {
						data = JSON.parse(JSON.stringify(list[list.length - 1]));
						/* for (let i = 0; i < list[0].length; i++) {
							data[i].parameterValue = "";
						} */
						list.splice(list.length, 1, data);
					}
				}
			},
			// 多件删除
			deleteE(partsKey, ikey, childkey) {
				if (arguments.length === 2) {
					let list = this.partsList[partsKey].elements[ikey].parameters;
					if (list) {
						list.splice(list.length - 1, 1);
					}
				} else {
					let list = this.partsList[partsKey].elements[ikey].childElements[childkey].parameters;
					if (list) {
						list.splice(list.length - 1, 1);
					}
				}
			},
			// 父级多件删除
			deleteParent(partsKey, key) {
				let length = 0;
				for (let i = 0; i < this.partsList[partsKey].elements.length; i++) {
					if (this.partsList[partsKey].elements[i].elementId === this.partsList[partsKey].elements[key].elementId) {
						length++;
					}
				};
				if (length < 2) {
					this.$error("已经是最后一个了，无法删除");
				} else {
					this.partsList[partsKey].elements.splice(key, 1);
				};
			},
      // 定价导入
      pricingImport(partsKey) {
				this.partIndex = partsKey;
        // console.log(this.$refs.importExcel);
        this.$refs.importExcel[0].click();
      },
      selectedFile() {
        this.file = this.$refs.importExcel[0].files[0];
        let uploadModel = {
          name: this.file.name,
          size: parseFloat(this.file.size / (1024 * 1024)).toFixed(2),
          type: this.file.name.substring(this.file.name.lastIndexOf(".") + 1)
        };
        if (this.accept.indexOf(uploadModel.type.toLocaleLowerCase()) < 0) {
          this.$message({
            showClose: true,
            message: '请选择正确的文件格式上传',
            type: 'warning'
          });
          return;
				}
				this.$upload(this.file).then((model) => {
					this.uploadPrice(model);
				});
      },
			uploadPrice(model) {
				let i = this.partsList[this.partIndex].elements.findIndex(_v => {
					return _v.elementType === 'price';
				});
				let elementId = this.partsList[this.partIndex].elements[i].elementId;
				this.$MyFetch.post(poductApi.uploadPrice, {
					fileId: model.fileId,
					type: 'product',
					elementId
				}).then((data) => {
					if (data.length > 0) {
						let basic = [
							this.partsList[this.partIndex].elements[0],
							this.partsList[this.partIndex].elements[1],
							this.partsList[this.partIndex].elements[2]
						];
						this.partsList[this.partIndex].elements = [basic];
						this.$nextTick(() => {
							this.partsList[this.partIndex].elements = [...basic, ...data];
						});
					}
				}).catch((err) => {
					this.$error(err.message);
				});
			},
      // 定价导出
      pricingexport() {
var arry = {};
			this.product.parts.forEach(item => {
				if (item.partsType === "first_product") {
					arry = item;
				}
			});
			this.$MyFetch.post(poductApi.exportPrice, arry)
			.then((data = {}) => {
				console.log(data);
				this.$download(data);
			})
			.catch((err) => {
				console.log(err);
				this.$error(err.message);
			});
      }
		},
		mounted() {
			if (this.$route.query.productId && this.$route.query.version) {
				this.productId = this.$route.query.productId;
				this.version = this.$route.query.version;
				this.toPath = this.$route.query.toPath;
				this.isCopy = this.$route.query.copy === 'copy';
				if (this.$route.query.disabledflag) {
					this.disabledflag = true;
				} else {
					this.disabledflag = false;
				}
				this.getProductDetail();
			};
		},
		components: {
			vtext,
			vselect,
			vtextarea,
			vdate,
			vcheckbox,
			vradio,
			vmultipleSelect,
			vcascaderSelect,
			VfileUpload,
			message
		}
	};
</script>

<style scoped lang="less">
	.productConfigure {
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
			height: 100%;
			overflow-y: auto;
			width: 100%;
			min-height: 820px;
			background: #fff;
			padding: 0 30px;
			margin-top: 10px;
			padding-bottom: 60px;
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
				font-size: 14px;
				color: #333333;
				line-height: 60px;
				font-weight: 900;
				span{
					margin: 0 5px;
				}
			}
			.effect-time {
				display: inline-block;
				margin-left: 40px;
			}
			.min_demos{
				width: 100%;
				border: 1px solid #E9E9E9;
				-webkit-box-shadow: 1px 2px 20px #ccc;
        box-shadow: 1px 2px 20px #ccc;
				float: left;
				margin-bottom: 30px;
				padding-top: 0 20px;
				h2{
					position: relative;
					height: 40px;
					line-height: 40px;
					text-align: center;
					font-weight: 900;
					background: #ececec;
					border-bottom: 1px solid #E9E9E9;
					box-shadow: 0 1px 10px 0 rgba(0,0,0,0.05);
					.el-switch {
						position: absolute;
						right: 50px;
						top: 50%;
						margin-top: -10px;
					}
				}
				.edit-part {
					position: absolute;
					top: 50%;
					margin-top: -15px;
					right: 5px;
					padding: 6px 20px;
				}
				.template_elements{
					width: 99%;
					margin: 10px auto;
					background: #FFFFFF;
					border: 1px solid #E9E9E9;
					border-radius: 4px;
					padding: 0 5px;
					>h3{
						border-bottom: 1px solid #d0d0d0;
						height: 60px;
						b{
							display: block;
							float: left;
							margin-top: 20px;
							border-left: 2px solid #538BF1;
							padding-left: 8px;
							line-height: 20px;
							color: #333333;
							margin-left: 3px;
							font-weight: 900;
						}
						span{
							line-height: 60px;
							font-size: 20px;
							font-weight: 900;
							display: block;
							color: #666;
							float: right;
							cursor: pointer;
						}
					}
					.child{
						padding: 0 25px;
						h3{
							border-bottom: 1px solid #d0d0d0;
							height: 60px;
							span{
								line-height: 60px;
								font-size: 20px;
								font-weight: 900;
								display: block;
								color: #666;
								float: right;
								cursor: pointer;
							}
						}
						div{
							padding: 0 3px;
						}
						b{
							display: block;
							float: left;
							margin-top: 20px;
							line-height: 20px;
							color: #333333;
							border: 0;
							font-weight: 900;
						}
					}
				}
			}
			.saveProduct{
				display: block;
				width: 200px;
				height: 40px;
				background: #538BF1;
				font-size: 14px;
				color: #FFFFFF;
				letter-spacing: 1.07px;
				cursor: pointer;
				margin: 10px auto;
			}
			.saveProduct[disabled] {
				color: #FFF;
				background-color: #a0cfff;
				border-color: #a0cfff;
				cursor: not-allowed;
			}
			.botton {
				width: 1601px;
				height: 60px;
				background: #fff;
				position: fixed;
				bottom: 0px;
				.saveProduct {
					position: absolute;
					left: 50%;
					margin-left: -100px;
				}
			}
		}
	}
	.content {
		padding-bottom: 0px;
	}
  .btn-group{
    float: right;
    margin-top: -45px;
		margin-right: 10%;
    .upload-btn{
      position: relative;
      display: inline-block;
      .upload-file{
        position:absolute;
        left:0;
        right:0;
        top: 0;
        width: 140px;
        height:42px;
        opacity: 0;
        z-index: -1;
      }
    }
  }
</style>
