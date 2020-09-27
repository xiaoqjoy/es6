<template>
	<div class="product_parts clearfix">
		<el-tabs v-model="partsType" @tab-click="handleClick"><!--{{item.triggerEvent}}-->
			<el-tab-pane v-for="(item,key) in partsTypeList" :data-type="item.triggerEvent" :key="key" :label="item.codeText" :name="item.codeValue"></el-tab-pane>
		</el-tabs>
		<button class="product_parts_button product_button" @click="control_popup('add')">+ 新增</button>
		<div class="search">
			<el-input style="width: 220px;" v-if="partsType==='partner'||partsType==='fund'" v-model="partsId" :placeholder="`${partsTypeName}编号`"></el-input>
			<el-select v-else clearable v-model="partsId" filterable :placeholder="`${partsTypeName}编号`">
				<el-option v-for="item in productList" :key="item.codeValue" :label="item.codeValue" :value="item.codeValue">
				</el-option>
			</el-select>
			<el-input style="width: 220px;" v-if="partsType==='partner'||partsType==='fund'" v-model="partsName" :placeholder="`${partsTypeName}名称`"></el-input>
			<el-select v-else clearable v-model="partsId" filterable :placeholder="`${partsTypeName}名称`">
				<el-option v-for="item in productList" :key="item.codeValue" :label="item.codeText" :value="item.codeValue">
				</el-option>
			</el-select>
			<button @click="getPartList('search')" class="product_button">查询</button>
			<button @click="partsId='';partsName=''" class="product_button button_empty">清空</button>
		</div>
		<div class="table">
			<table>
				<tr class="tr_top">
					<th>序号</th>
					<th>{{partsTypeName}}编号</th>
					<th>{{partsTypeName}}名称</th>
					<th v-if="partsTypeName==='合作方'||partsTypeName==='资金方'">{{partsTypeName}}类型</th>
					<th>引用模板类型</th>
					<th v-if="partsTypeName==='一级产品'">是否有效</th>
					<th>操作者</th>
					<th>操作时间 </th>
					<th>操作</th>
				</tr>
				<tr v-for="(item,index) in parts_list" :key="index">
					<td>
						{{index+1}}
					</td>
					<td>
						{{item.partsId}}
					</td>
					<td>
						{{item.partsName}}
					</td>
					<td v-if="partsTypeName==='合作方'||partsTypeName==='资金方'">
						{{item.partnerType}}
					</td>
					<td>
						{{item.templateName}}
					</td>
					<td v-if="partsTypeName==='一级产品'">
						{{item.isInuseText}}
					</td>
					<td>
						{{item.updateBy}}
					</td>
					<td>
						{{item.updateDate}}
					</td>
					<td>
						<span @click="updateIsinuse(item.sourcePartsId, 0)" v-if="partsTypeName==='一级产品'&&item.isInuse==='1'">置为无效</span>
						<span @click="updateIsinuse(item.sourcePartsId, 1)" v-if="partsTypeName==='一级产品'&&item.isInuse==='0'">置为有效</span>
						<span @click="control_popup(item.sourcePartsId)">编辑</span>
						<!--<span @click="copy(item.sourcePartsId)">复制</span>-->
						<span  v-if="partsTypeName==='合作方'||partsTypeName==='资金方'" @click="releasePart(item.sourcePartsId)">一键更新</span>
					</td>
				</tr>
			</table>
		</div>
		<pagination style="float: right;margin: 20px 0;" :page="pageConfig" class="pagination" @jump-page="handleCurrentChange"></pagination>
		<!--<el-pagination style="float: right;margin: 20px 0;" @current-change="handleCurrentChange" :current-page="page" :page-size="pagesize" layout="total, prev, pager, next, jumper" :total="total">
		</el-pagination>-->
		<div v-if='popup' class="product_popup">
			<div class="popup_configure_main">
				<h3>{{codeText}}部件<span @click="control_popup()" class="el-icon-close"></span></h3>
				<el-input style="width: 200px;margin: 10px 0 0 20px;display: none;" type="text" disabled v-model="partsList.sourcePartsId" :placeholder="`${partsTypeName}编号`"></el-input>
				<el-input style="width: 200px;margin-top: 10px;display: none;" type="text" v-model="partsList.partsName" :placeholder="`${partsTypeName}名称`"></el-input>
				<div class="popup_paddindiv clearfix">
					<div class="template_main">
						<div class="template_elements clearfix" v-for='(i,ikey) in elements' :key='ikey'>
							<h3><b>{{i.elementName}}</b><span v-if='i.numberType=="multiple"||i.numberType=="parent"' @click="addE(ikey, i.numberType)">+</span><span v-if='i.numberType=="multiple"&&i.parameters.length>1' @click="deleteE(ikey)">-</span><span v-if='i.numberType=="parent"' @click="deleteParent(ikey)">-</span></h3>
							<div class="elements" v-for='(j,jkey) in i.parameters' :key='jkey'>
								<el-row :gutter="10">
									<div v-for='(item,itemkey) in j' :key='itemkey'>
										<el-col v-if='item.status=="valid"' :span="item.locationColspan*2">
											<vtext @popu="relationChange" :ikey="ikey" :jkey='jkey' :fn='changeElements' :itemkey='itemkey' :data='item' v-if='item.inputType=="text"'></vtext>
											<vmultipleSelect @popu="relationChange" :ikey="ikey" :jkey='jkey' :fn='changeElements' :itemkey='itemkey' :data='item' v-if='item.inputType=="multipleSelect"'></vmultipleSelect>
											<vcascaderSelect @popu="relationChange" :ikey="ikey" :jkey='jkey' :fn='changeElements' :itemkey='itemkey' :data='item' v-if='item.inputType=="cascaderSelect"'></vcascaderSelect>
											<vselect @popu="relationChange" :ikey="ikey" :jkey='jkey' :fn='changeElements' :itemkey='itemkey' :data='item' @setSelect="setSelect" v-if='item.inputType=="select"'></vselect>
											<vtextarea @popu="relationChange" :ikey="ikey" :jkey='jkey' :fn='changeElements' :itemkey='itemkey' :data='item' v-if='item.inputType=="textarea"'></vtextarea>
											<vdate @popu="relationChange" :ikey="ikey" :jkey='jkey' :fn='changeElements' :itemkey='itemkey' :data='item' v-if='item.inputType=="date"'></vdate>
											<vcheckbox @popu="relationChange" :ikey="ikey" :jkey='jkey' :fn='changeElements' :itemkey='itemkey' :data='item' v-if='item.inputType=="checkbox"'></vcheckbox>
											<vradio @popu="relationChange" :ikey="ikey" :jkey='jkey' :fn='changeElements' :itemkey='itemkey' :data='item' v-if='item.inputType=="radio"'></vradio>
											<VfileUpload @getName="getName" @popu="relationChange" :ikey="ikey" :jkey='jkey' :fn='changeElements' :itemkey='itemkey' :data='item' v-if='item.inputType=="fileUpload"'></VfileUpload>
											<div class="btn-group" v-if="item.columnName==='receiveIdentifyType'">
												<div class="upload-btn">
													<el-button type="primary" style="width:140px" @click="pricingImport()">定价导入</el-button>
													<input class="upload-file point" type="file" accept="undefined" name="file" ref="importExcel" @change="selectedFile">
												</div>
												<el-button v-if="control_popupAdd!='add'" type="primary" style="width:140px" @click="pricingexport">定价导出</el-button>
											</div>
										</el-col>
									</div>
								</el-row>
							</div>
							<div class="child" v-for='(k,childkey) in i.childElements' :key='ikey + childkey'>
								<h3><b>{{k.elementName}}</b><span v-if='k.numberType=="multiple"' @click="addE(ikey, childkey, k.numberType)">+</span><span v-if='k.numberType=="multiple"&&k.parameters.length>1' @click="deleteE(ikey,childkey)">-</span></h3>
								<div v-for='(itemI,jkey) in k.parameters' :key='jkey'>
									<el-row :gutter="10">
										<div v-for='(item,itemkey) in itemI' :key="itemkey">
											<el-col v-if='item.status=="valid"' :span="item.locationColspan*2">
												<vtext @popu="relationChange" :childkey="childkey" :ikey="ikey" :jkey='jkey' :itemkey='itemkey' :fn='changeElements' :data='item' v-if='item.inputType=="text"'></vtext>
												<vmultipleSelect @popu="relationChange" :childkey="childkey" :ikey="ikey" :jkey='jkey' :itemkey='itemkey' :fn='changeElements' :data='item' v-if='item.inputType=="multipleSelect"'></vmultipleSelect>
												<vcascaderSelect @popu="relationChange" :childkey="childkey" :ikey="ikey" :jkey='jkey' :itemkey='itemkey' :fn='changeElements' :data='item' v-if='item.inputType=="cascaderSelect"'></vcascaderSelect>
												<vselect @popu="relationChange" :childkey="childkey" :ikey="ikey" :jkey='jkey' :itemkey='itemkey' :fn='changeElements' :data='item' @setSelect="setSelect" v-if='item.inputType=="select"'></vselect>
												<vtextarea @popu="relationChange" :childkey="childkey" :ikey="ikey" :jkey='jkey' :itemkey='itemkey' :fn='changeElements' :data='item' v-if='item.inputType=="textarea"'></vtextarea>
												<vdate @popu="relationChange" :childkey="childkey" :ikey="ikey" :jkey='jkey' :itemkey='itemkey' :fn='changeElements' :data='item' v-if='item.inputType=="date"'></vdate>
												<vcheckbox @popu="relationChange" :childkey="childkey" :ikey="ikey" :jkey='jkey' :itemkey='itemkey' :fn='changeElements' :data='item' v-if='item.inputType=="checkbox"'></vcheckbox>
												<vradio @popu="relationChange" :childkey="childkey" :ikey="ikey" :jkey='jkey' :itemkey='itemkey' :fn='changeElements' :data='item' v-if='item.inputType=="radio"'></vradio>
												<VfileUpload @getName="getName" @popu="relationChange" :childkey="childkey" :ikey="ikey" :jkey='jkey' :itemkey='itemkey' :fn='changeElements' :data='item' v-if='item.inputType=="fileUpload"'></VfileUpload>
											</el-col>
										</div>
									</el-row>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="popup_button">
					<button @click="saveParts()">提交</button>
				</div>
			</div>
		</div>

		<div v-if="isUpdate" class="update_popup">
			<div class="popup_configure_update">
				<h3>请选择要更新的字段<span @click="close_update()" class="el-icon-close"></span></h3>
				<el-cascader-panel
					v-model="updateModel"
					:options="updateOptions"
					:props="updateProps"
					clearable></el-cascader-panel>
					<div class="update-button">
						<el-button :disabled="updateModel.length === 0" type="primary" @click="updatePart">确定</el-button>
					</div>
			</div>
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
	import pagination from '@components/pagination';
	export default{
		data() {
			return {
				control_popupAdd: '',
				partsId: "",
				partsTypeList: [],
				partsType: "",
				partsTypeName: "",
				pageConfig: {
					account: 0,
					currentPage: 1,
					pageSize: 10,
					showJumpButton: true
				},
				accept: ['xlsx', 'xls'], // 定价导入格式
				parts_list: [],
				partsList: {},
				elements: [],
				popup: false,
				codeText: "",
				productList: [],
				triggerEvent: "",
				partsName: "",
				partsIdNew: "",
				updateModel: [],
				isUpdate: false,
				updateOptions: [],
				updateProps: {
					multiple: true,
					label: 'codeText',
					value: 'codeValue'
				}
			};
		},
		methods: {
			setSelect(obj) {
				if (obj.data.columnName === "feesMode") { // 收费方式处理
					let param = this.elements[obj.ikey].childElements[obj.childkey].parameters[obj.jkey];
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
					let param = this.elements[obj.ikey].childElements[obj.childkey].parameters[obj.jkey];
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
				if (obj.data.columnName === "feeCalcMethod") { // 提前还款违约金计算方式处理
					let param = this.elements[obj.ikey].parameters[0];
					let val = param[obj.itemkey].parameterValue;
					let elements = this.elements;
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
				this.elements = JSON.parse(JSON.stringify(this.elements));
			},
			handleCurrentChange(val) {
				this.getPartList();
			},
			getPartsTypeList() {
				this.$MyFetch.post(poductApi.getDictionaryList, {catalogNo: 'TemplateType'}, {timeout: 300000})
					.then((data = {}) => {
						// console.log(data);
						this.partsTypeList = data.list;
						if (this.partsTypeList.length > 0) {
							this.partsType = this.partsTypeList[0].codeValue;
							this.partsTypeName = this.partsTypeList[0].codeText;
							this.triggerEvent = this.partsTypeList[0].triggerEvent;
						}
						this.getPartList();
						this.getDictionaryList();
					})
					.catch((err) => {
						console.log(err);
						this.$error("服务异常");
					});
			},
			// tab切换改变
			handleClick(tab, event) {
				this.partsTypeName = tab.label;
				for (let i = 0; i < this.partsTypeList.length; i++) {
					if (this.partsTypeList[i].codeValue === this.partsType) {
						this.triggerEvent = this.partsTypeList[i].triggerEvent;
					};
				};
				// console.log(this.triggerEvent);
				this.partsId = "";
				this.partsName = "";
				this.getPartList('search');
				this.getDictionaryList();
			},
			// 获取部件列表
			getPartList(value) {
				if (value === 'search') {
					this.pageConfig.currentPage = 1;
				}
				let json = {};
				json.page = this.pageConfig.currentPage;
				json.size = this.pageConfig.pageSize;
				json.partsId = this.partsId;
				if (this.partsType === 'partner' || this.partsType === 'fund') {
					json.partsName = this.partsName;
				} else {
					json.partsName = this.partsId;
				}
				json.partsType = this.partsType;
				this.parts_list = [];
				this.$MyFetch.post(poductApi.getParts, json)
					.then((data = {}) => {
						// console.log(data);
						this.parts_list = data.list;
						this.pageConfig.account = data.total;
					})
					.catch((err) => {
						console.log(err);
						this.$error("服务异常");
					});
			},
			// 复制
			copy(sourcePartsId) {
				this.$MyFetch.post(poductApi.copyPart, {partsId: sourcePartsId})
					.then((data = {}) => {
						this.getPartList();
						this.$message.success("复制成功");
					})
					.catch((err) => {
						console.log(err);
						this.$error("服务异常");
					});
				// console.log(sourcePartsId);
			},
			// 获取配置
			getPartDetail(partsId) {
				// console.log(partsId, 111);
				this.elements = [];
				this.$MyFetch.post(poductApi.getPartDetail, {partsId: partsId})
					.then((data = {}) => {
						// console.log(data);
						let dataParameters = data.elements[0].parameters[0];
						if (dataParameters) {
							for (let i = 0; i < dataParameters.length; i++) {
								// console.log(dataParameters[i]);
								if (dataParameters[i].columnName === "partnerId" || dataParameters[i].columnName === "partnerName" || dataParameters[i].columnName === "fundId" || dataParameters[i].columnName === "fundName" || dataParameters[i].columnName === "firstProduct" || dataParameters[i].columnName === "productType" || dataParameters[i].columnName === "businessModel") {
									dataParameters[i].inputIsReadonly = '1';
								}
							}
						};
						this.partsList = data;
						this.elements = data.elements;
					})
					.catch((err) => {
						console.log(err);
						this.$error("服务异常");
					});
			},
			// 控制弹窗
			control_popup(partsId) {
				// console.log(partsId);
				this.popup = !this.popup;
				this.control_popupAdd = '';
				for (let i = 0; i < this.partsTypeList.length; i++) {
					if (this.partsType === this.partsTypeList[i].codeValue) {
						this.codeText = this.partsTypeList[i].codeText;
					}
				};
				if (partsId === 'add') {
					this.control_popupAdd = 'add';
					this.elements = [];
					this.getSourcePartsId();
					this.getElements();
				} else if (partsId) {
					// console.log(partsId);
					this.getPartDetail(partsId);
				};
			},
			// 通过模板增加
			getElements() {
				this.$MyFetch.post(poductApi.getTemplateDetail, {templateType: this.partsType})
					.then((data = {}) => {
						this.elements = data.elements;
					})
					.catch((err) => {
						console.log(err);
						this.$error("服务异常");
					});
			},
			// 改变值
			changeElements(ikey, jkey, itemkey, data, childkey) {
				// console.log(ikey, jkey, itemkey, data, childkey);
				let list = this.elements;
				if (arguments.length === 4) {
					list[ikey].parameters[jkey][itemkey].parameterValue = data;
				} else if (arguments.length === 5) {
					list[ikey].childElements[childkey].parameters[jkey][itemkey].parameterValue = data;
				}
				// console.log(this.elements);
			},
			// 获取文件名
			getName(ikey, jkey, itemkey, data, childkey) {
				let list = this.elements;
				if (arguments.length === 4) {
					let json = Object.assign({}, list[ikey].parameters[jkey][itemkey + 1]);
					json.parameterValue = data;
					list[ikey].parameters[jkey].splice(itemkey + 1, 1, json);
				} else if (arguments.length === 5) {
					let json = Object.assign({}, list[ikey].childElements[childkey].parameters[jkey][itemkey + 1]);
					json.parameterValue = data;
					list[ikey].childElements[childkey].parameters[jkey].splice(itemkey + 1, 1, json);
				}
				// console.log(this.elements);
			},
			// 关联改变
			relationChange(ikey, jkey, itemkey, parameterValue, methods) {
				this.$MyFetch.post(poductApi.interactiveParser, {method: methods, value: {index: itemkey.toString(), value: parameterValue}})
					.then((data = {}) => {
							// console.log(data);
							let list = data.result;
							let parametersJson = {};
							if (list) {
								for (let i = 0; i < list.length; i++) {
									// console.log(list[i]);
									parametersJson = JSON.parse(JSON.stringify(this.elements[ikey].parameters[jkey][list[i].index]));
									parametersJson.parameterValue = list[i].value;
									parametersJson.flag = !list[i].flag;
									this.elements[ikey].parameters[jkey].splice(list[i].index, 1, parametersJson);
								}
							}
						})
						.catch((err) => {
							console.log(err);
							this.$error("服务异常");
						});
				// console.log(ikey, jkey, itemkey, parameterValue, methods);
			},
			// 获取部件id
			getSourcePartsId() {
				this.$MyFetch.post(poductApi.getNumber, {method: "getSourcePartsId"})
					.then((data = {}) => {
							let json = {};
							json.partsType = this.partsType;
							json.sourcePartsId = data;
							json.partsName = `${this.codeText}部件`;
							this.partsList = json;
						})
						.catch((err) => {
							console.log(err);
							this.$error("服务异常");
						});
			},
			// 提交
			saveParts() {
				let flag = true;
				let feeCalcMethod;
				this.elements.forEach((ele) => {
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
							if (e.columnName === "prepayFeeRate" && flag) {
								if (!e.parameterValue) {
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
				if (!flag) {
					return false;
				}
				this.partsList.elements = this.elements;
				this.$MyFetch.post(poductApi.savePart, this.partsList)
					.then((data = {}) => {
						// console.log(data);
						this.popup = !this.popup;
						this.getPartList();
						this.$message.success("保存成功");
					})
					.catch((err) => {
						console.log(err);
						this.$error(err.message);
					});
			},
			// 多件添加
			addE (ikey, childkey, numberType) {
				// console.log(ikey, childkey, numberType, arguments.length);
				if (arguments.length === 2) {
					if (childkey !== "parent") {
						let list = this.elements[ikey].parameters;
						let data = [];
						if (list) {
							data = JSON.parse(JSON.stringify(list[list.length - 1]));
							/* for (let i = 0; i < list[0].length; i++) {
								data[i].parameterValue = "";
							} */
							list.splice(list.length, 1, data);
						}
					} else {
						// console.log(this.elements[ikey]);
						let list = JSON.parse(JSON.stringify(this.elements[ikey]));
						// console.log(this.elements[ikey]);
						/* if (list.childElements) {
							let length = list.childElements[0].parameters.length;
							if (length > 1) {
								list.childElements[0].parameters.splice(1, length - 1);
							}
							for (let i = 0; i < list.childElements[0].parameters[0].length; i++) {
								console.log(list.childElements[0].parameters[0][i].parameterValue = "");
							}
						}
						if (list.parameters) {
							for (let i = 0; i < list.parameters[0].length; i++) {
								list.parameters[0][i].parameterValue = "";
							}
						} */
						this.elements.splice(ikey + 1, 0, list);
//						this.$MyFetch.get(poductApi.getelement, {elementType: this.elements[ikey].elementType, templateType: this.partsType})
//							.then((data = {}) => {
//								console.log(data);
//								this.elements.splice(ikey + 1, 0, data[0]);
//							})
//							.catch((err) => {
//								console.log(err);
//								this.$error("服务异常");
//							});
					}
				} else {
					let list = this.elements[ikey].childElements[childkey].parameters;
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
			deleteE(ikey, childkey) {
				if (arguments.length === 1) {
					let list = this.elements[ikey].parameters;
					if (list) {
						list.splice(list.length - 1, 1);
					}
				} else {
					let list = this.elements[ikey].childElements[childkey].parameters;
					if (list) {
						list.splice(list.length - 1, 1);
					}
				}
			},
			// 删除父级多件
			deleteParent(key) {
				let length = 0;
				for (let i = 0; i < this.elements.length; i++) {
					if (this.elements[i].templateElementId === this.elements[key].templateElementId) {
						length++;
					}
				};
				// console.log(key);
				if (length < 2) {
					this.$error("已经是最后一个了，无法删除");
				} else {
					this.elements.splice(key, 1);
				};
				// console.log(this.elements);
			},
			// 定价导入
      pricingImport() {
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
				// console.log(model);
				let i = this.elements.findIndex(_v => {
					return _v.elementType === 'price';
				});
				let elementId = this.elements[i].sourceElementId;
				this.$MyFetch.post(poductApi.uploadPrice, {
					fileId: model.fileId,
					type: 'source',
					elementId
				}).then((data) => {
					if (data.length > 0) {
						let basic = [
							this.elements[0],
							this.elements[1],
							this.elements[2]
						];
						this.elements = [basic];
						this.$nextTick(() => {
							this.elements = [...basic, ...data];
						});
						// this.elements.push(...data);
					}
				}).catch((err) => {
					this.$error(err.message);
				});
			},
      // 定价导出
      pricingexport() {
			this.$MyFetch.post(poductApi.exportPrice, JSON.stringify(this.partsList))
			.then((data = {}) => {
				console.log(data);
				this.$download(data);
			})
			.catch((err) => {
				console.log(err);
				this.$error(err.message);
			});
      },
			close_update() {
				this.isUpdate = false;
			},
			// 一件更新
			releasePart(partsId) {
				// console.log(partsId);
				this.$MyFetch.post(poductApi.updatecolumn, {partsId: partsId})
					.then((data) => {
						this.updateOptions = data;
						this.partsIdNew = partsId;
						this.isUpdate = true;
					})
					.catch((err) => {
						console.log(err);
						this.$error(err.message);
					});
			},
			updatePart() {
				let data = {
					partsId: this.partsIdNew,
					updateList: []
				};
				this.updateModel.forEach((item) => {
					let flag = false;
					data.updateList.forEach((column, i) => {
						if (column.elementId === item[0]) {
							flag = true;
							data.updateList[i].columns += "," + item[1];
						}
					});
					if (!flag) {
						data.updateList.push({
							elementId: item[0],
							columns: item[1]
						});
					}
				});
				this.$MyFetch.post(poductApi.updateProduct, data)
					.then((data = {}) => {
						this.isUpdate = false;
						this.$message.success("更新成功");
					})
					.catch((err) => {
						console.log(err);
						this.$error(err.message);
					});
			},
			// 获取名称和编号下拉映射关系
			getDictionaryList() {
				this.productList = [];
				this.$MyFetch.post(poductApi.getDictionaryList, {catalogNo: this.triggerEvent}, {timeout: 300000})
					.then((data = {}) => {
						// console.log(data);
						this.productList = data.list;
					})
					.catch((err) => {
						console.log(err);
						this.$error("服务异常");
					});
			},
			// 更改一级产品状态
			updateIsinuse(partsId, isInuse) {
				this.$MyFetch.post(`${poductApi.sourceIsinuse}?partsId=${partsId}&isInuse=${isInuse}`)
					.then((data = {}) => {
						this.getPartList();
					})
					.catch((err) => {
						console.log(err);
						this.$error("服务异常");
					});
			}
		},
		mounted() {
			this.getPartsTypeList();
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
			pagination
		}
	};
</script>

<style scoped lang="less">
	.product_parts {
		width: 100%;
		min-height: 500px;
		background: #FFFFFF;
		box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.08);
		border-radius: 4px;
		padding: 20px 30px;
		/deep/ .el-tabs__item{
			font-size: 16px;
			color: #333333;
			letter-spacing: 1.22px;
		}
		/deep/ .el-tabs__item.is-active{
			font-size: 18px;
			color: #538BF1;
			letter-spacing: 1.38px;
		}
		/deep/ .el-tabs--top {
			margin-bottom: 20px;
		}
		.product_parts_button {
			display: block;
			margin-bottom: 20px;
			float: left;
			background: #538BF1;
			border: 1px solid #538BF1;
			color: #FFFFFF;
			cursor: pointer;
		}
		.search {
			width: 100%;
			height: 60px;
			float: left;
			.product_button {
				margin-left: 30px;
				background: #538BF1;
				font-size: 14px;
				color: #FFFFFF;
				letter-spacing: 1.07px;
			}
			.button_empty {
				background: #fff;
				color: #538BF1;
				border: 1px solid #538BF1;
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
				}
			}
		}
		.popup_configure_main{
			width: 1200px;
			min-height: 710px;
			background: #ececec;
			border-radius: 4px;
			margin: 0 auto;
			margin-top: 100px;
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
				height: 530px;
				margin: 0 auto;
				overflow-x: hidden;
				overflow-y: auto;
				margin-top: 10px;
				margin-bottom: 10px;
				.template_main {
					float: left;
					width: 100%;
					.template_elements{
						padding: 0 10px;
						width: 100%;
						background: #fff;
						margin-bottom: 20px;
					}
					h3{
						border-bottom: 1px solid #d0d0d0;
						height: 60px;
						padding-left: 8px;
						b{
							display: block;
							float: left;
							margin-top: 20px;
							border-left: 2px solid #538BF1;
							line-height: 20px;
							padding-left: 8px;
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
					.elements{
						padding: 0 15px;
					}
					.child{
						padding: 0 25px;
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
					.submit{
						width: 100%;
						button{
							display: block;
							width: 200px;
							height: 40px;
							font-size: 14px;
							color: #FFFFFF;
							letter-spacing: 1.07px;
							margin: 20px auto;
							background: #EEB352;
							cursor: pointer;
						}
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
		.update_popup {
			width: 100%;
			height: 100%;
			position: fixed;
			background-color: rgba(0, 0, 0, 0.5);
			top: 0;
			left: 0;
			z-index: 100;
			display: flex;
			justify-content: center;
			align-items: center;
		}
		.popup_configure_update {
			width: 600px;
			background: #ececec;
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
			.el-cascader-panel {
				width: 90%;
				margin: 0 auto;
				margin-top: 20px;
				background: #fff;
				/deep/ .el-cascader-node__label {
					flex: auto;
				}
				/deep/ .el-cascader-node__postfix {
					top: 50%;
					margin-top: -7px;
				}
			}
			.update-button {
				text-align: center;
				margin: 20px;
			}
		}
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
