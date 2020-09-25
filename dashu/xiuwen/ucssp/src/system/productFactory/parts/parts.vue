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
											<vselect @popu="relationChange" :ikey="ikey" :jkey='jkey' :fn='changeElements' :itemkey='itemkey' :data='item' v-if='item.inputType=="select"'></vselect>
											<vtextarea @popu="relationChange" :ikey="ikey" :jkey='jkey' :fn='changeElements' :itemkey='itemkey' :data='item' v-if='item.inputType=="textarea"'></vtextarea>
											<vdate @popu="relationChange" :ikey="ikey" :jkey='jkey' :fn='changeElements' :itemkey='itemkey' :data='item' v-if='item.inputType=="date"'></vdate>
											<vcheckbox @popu="relationChange" :ikey="ikey" :jkey='jkey' :fn='changeElements' :itemkey='itemkey' :data='item' v-if='item.inputType=="checkbox"'></vcheckbox>
											<vradio @popu="relationChange" :ikey="ikey" :jkey='jkey' :fn='changeElements' :itemkey='itemkey' :data='item' v-if='item.inputType=="radio"'></vradio>
											<VfileUpload @getName="getName" @popu="relationChange" :ikey="ikey" :jkey='jkey' :fn='changeElements' :itemkey='itemkey' :data='item' v-if='item.inputType=="fileUpload"'></VfileUpload>
										</el-col>
									</div>
								</el-row>
							</div>
							<div class="child" v-for='(k,childkey) in i.childElements' :key='k.toString()'>
								<h3><b>{{k.elementName}}</b><span v-if='k.numberType=="multiple"' @click="addE(ikey, childkey, k.numberType)">+</span><span v-if='k.numberType=="multiple"&&k.parameters.length>1' @click="deleteE(ikey,childkey)">-</span></h3>
								<div v-for='(itemI,jkey) in k.parameters' :key='jkey'>
									<el-row :gutter="10">
										<div v-for='(item,itemkey) in itemI' :key="itemkey">
											<el-col v-if='item.status=="valid"' :span="item.locationColspan*2">
												<vtext @popu="relationChange" :childkey="childkey" :ikey="ikey" :jkey='jkey' :itemkey='itemkey' :fn='changeElements' :data='item' v-if='item.inputType=="text"'></vtext>
												<vmultipleSelect @popu="relationChange" :childkey="childkey" :ikey="ikey" :jkey='jkey' :itemkey='itemkey' :fn='changeElements' :data='item' v-if='item.inputType=="multipleSelect"'></vmultipleSelect>
												<vselect @popu="relationChange" :childkey="childkey" :ikey="ikey" :jkey='jkey' :itemkey='itemkey' :fn='changeElements' :data='item' v-if='item.inputType=="select"'></vselect>
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
	</div>
</template>

<script>
	import vtext from '../inputType/text.vue';
	import vselect from '../inputType/select.vue';
	import vmultipleSelect from '../inputType/multipleSelect.vue';
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
				parts_list: [],
				partsList: {},
				elements: [],
				popup: false,
				codeText: "",
				productList: [],
				triggerEvent: "",
				partsName: ""
			};
		},
		methods: {
			handleCurrentChange(val) {
				this.getPartList();
			},
			getPartsTypeList() {
				this.$MyFetch.post(poductApi.getDictionaryList, {catalogNo: 'TemplateType'})
					.then((data = {}) => {
						console.log(data);
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
				console.log(this.triggerEvent);
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
						console.log(data);
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
				console.log(sourcePartsId);
			},
			// 获取配置
			getPartDetail(partsId) {
				console.log(partsId, 111);
				this.elements = [];
				this.$MyFetch.post(poductApi.getPartDetail, {partsId: partsId})
					.then((data = {}) => {
						console.log(data);
						let dataParameters = data.elements[0].parameters[0];
						if (dataParameters) {
							for (let i = 0; i < dataParameters.length; i++) {
								console.log(dataParameters[i]);
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
				console.log(partsId);
				this.popup = !this.popup;
				for (let i = 0; i < this.partsTypeList.length; i++) {
					if (this.partsType === this.partsTypeList[i].codeValue) {
						this.codeText = this.partsTypeList[i].codeText;
					}
				};
				if (partsId === 'add') {
					this.elements = [];
					this.getSourcePartsId();
					this.getElements();
				} else if (partsId) {
					console.log(partsId);
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
				console.log(ikey, jkey, itemkey, data, childkey);
				let list = this.elements;
				if (arguments.length === 4) {
					list[ikey].parameters[jkey][itemkey].parameterValue = data;
				} else if (arguments.length === 5) {
					list[ikey].childElements[childkey].parameters[jkey][itemkey].parameterValue = data;
				}
				console.log(this.elements);
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
				console.log(this.elements);
			},
			// 关联改变
			relationChange(ikey, jkey, itemkey, parameterValue, methods) {
				this.$MyFetch.post(poductApi.interactiveParser, {method: methods, value: {index: itemkey.toString(), value: parameterValue}})
					.then((data = {}) => {
							console.log(data);
							let list = data.result;
							let parametersJson = {};
							if (list) {
								for (let i = 0; i < list.length; i++) {
									console.log(list[i]);
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
				console.log(ikey, jkey, itemkey, parameterValue, methods);
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
				this.partsList.elements = this.elements;
				this.$MyFetch.post(poductApi.savePart, this.partsList)
					.then((data = {}) => {
						console.log(data);
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
				console.log(ikey, childkey, numberType, arguments.length);
				if (arguments.length === 2) {
					if (childkey !== "parent") {
						let list = this.elements[ikey].parameters;
						let data = [];
						if (list) {
							data = JSON.parse(JSON.stringify(list[0]));
							for (let i = 0; i < list[0].length; i++) {
								data[i].parameterValue = "";
							}
							list.splice(list.length, 1, data);
						}
					} else {
						console.log(this.elements[ikey]);
						let list = JSON.parse(JSON.stringify(this.elements[ikey]));
						console.log(this.elements[ikey]);
						if (list.childElements) {
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
						}
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
						data = JSON.parse(JSON.stringify(list[0]));
						for (let i = 0; i < list[0].length; i++) {
							data[i].parameterValue = "";
						}
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
				console.log(key);
				if (length < 2) {
					this.$error("已经是最后一个了，无法删除");
				} else {
					this.elements.splice(key, 1);
				};
				console.log(this.elements);
			},
			// 一件更新
			releasePart(partsId) {
				console.log(partsId);
				this.$MyFetch.post(poductApi.releasePart, {partsId: partsId})
					.then((data = {}) => {
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
				this.$MyFetch.post(poductApi.getDictionaryList, {catalogNo: this.triggerEvent})
					.then((data = {}) => {
						console.log(data);
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
				}
			}
		}
		.popup_configure_main{
			width: 1200px;
			min-height: 710px;
			background: #F9FAFB;
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
						border-bottom: 1px solid #E5E5E5;
						height: 60px;
						b{
							display: block;
							float: left;
							margin-top: 20px;
							border-left: 2px solid #538BF1;
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
	}
</style>
