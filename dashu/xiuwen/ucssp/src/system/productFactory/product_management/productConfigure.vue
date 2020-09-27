<template>
	<div class="productConfigure clearfix">
		<router-link v-if="toPath==='productList'" to="productList">产品列表</router-link>
		<router-link v-else to="productRelease">产品发布</router-link>
		<i class="el-icon-arrow-left"></i>
		<span>配置产品</span>
		<div class="ec_content clearfix">
			<h3>产品：{{productId}}</h3>
			<div class="min_demos" v-for='(parts,partsKey) in partsList' :key='partsKey'>
				<h2>{{parts.partsName}}</h2>
				<div class="template_elements clearfix" v-for='(i,ikey) in parts.elements' :key='ikey'>
					<h3><b>{{i.elementName}}</b><span v-if='i.numberType=="multiple"||i.numberType=="parent"' @click="addE(partsKey, ikey, i.numberType)">+</span><span v-if='i.numberType=="multiple"&&i.parameters.length>1' @click="deleteE(partsKey, ikey)">-</span><span v-if='i.numberType=="parent"' @click="deleteParent(partsKey, ikey)">-</span></h3>
					<div class="elements" v-for='(j,jkey) in i.parameters' :key='jkey'>
						<el-row :gutter="10">
							<div v-for='(item,itemkey) in j' :key='itemkey'>
								<el-col v-if='item.status=="valid"' :span="item.locationColspan*2">
									<vtext :disabledflag="disabledflag" @popu="relationChange" :partsKey="partsKey" :ikey="ikey" :jkey='jkey' :fn='changeElements' :itemkey='itemkey' :data='item' v-if='item.inputType=="text"'></vtext>
									<vmultipleSelect :disabledflag="disabledflag" @popu="relationChange" :partsKey="partsKey" :ikey="ikey" :jkey='jkey' :fn='changeElements' :itemkey='itemkey' :data='item' v-if='item.inputType=="multipleSelect"'></vmultipleSelect>
									<vselect :disabledflag="disabledflag" @popu="relationChange" :partsKey="partsKey" :ikey="ikey" :jkey='jkey' :fn='changeElements' :itemkey='itemkey' :data='item' v-if='item.inputType=="select"'></vselect>
									<vtextarea :disabledflag="disabledflag" @popu="relationChange" :partsKey="partsKey" :ikey="ikey" :jkey='jkey' :fn='changeElements' :itemkey='itemkey' :data='item' v-if='item.inputType=="textarea"'></vtextarea>
									<vdate :disabledflag="disabledflag" @popu="relationChange" :partsKey="partsKey" :ikey="ikey" :jkey='jkey' :fn='changeElements' :itemkey='itemkey' :data='item' v-if='item.inputType=="date"'></vdate>
									<vcheckbox :disabledflag="disabledflag" @popu="relationChange" :partsKey="partsKey" :ikey="ikey" :jkey='jkey' :fn='changeElements' :itemkey='itemkey' :data='item' v-if='item.inputType=="checkbox"'></vcheckbox>
									<vradio :disabledflag="disabledflag" @popu="relationChange" :partsKey="partsKey" :ikey="ikey" :jkey='jkey' :fn='changeElements' :itemkey='itemkey' :data='item' v-if='item.inputType=="radio"'></vradio>
									<VfileUpload @getName="getName" :disabledflag="disabledflag" @popu="relationChange" :partsKey="partsKey" :ikey="ikey" :jkey='jkey' :fn='changeElements' :itemkey='itemkey' :data='item' v-if='item.inputType=="fileUpload"'></VfileUpload>
								</el-col>
							</div>
						</el-row>
					</div>
					<div class="child" v-for='(k,childkey) in i.childElements' :key='k.toString()'>
						<h3><b>{{k.elementName}}</b><span v-if='k.numberType=="multiple"' @click="addE(partsKey, ikey,childkey, k.numberType)">+</span><span v-if='k.numberType=="multiple"&&k.parameters.length>1' @click="deleteE(partsKey, ikey,childkey)">-</span></h3>
						<div v-for='(itemI,jkey) in k.parameters' :key='jkey'>
							<el-row :gutter="10">
								<div v-for='(item,itemkey) in itemI' :key="itemkey">
									<el-col v-if='item.status=="valid"' :span="item.locationColspan*2">
										<vtext :disabledflag="disabledflag" @popu="relationChange" :partsKey="partsKey" :childkey="childkey" :ikey="ikey" :jkey='jkey' :itemkey='itemkey' :fn='changeElements' :data='item' v-if='item.inputType=="text"'></vtext>
										<vmultipleSelect :disabledflag="disabledflag" @popu="relationChange" :partsKey="partsKey" :childkey="childkey" :ikey="ikey" :jkey='jkey' :itemkey='itemkey' :fn='changeElements' :data='item' v-if='item.inputType=="multipleSelect"'></vmultipleSelect>
										<vselect :disabledflag="disabledflag" @popu="relationChange" :partsKey="partsKey" :childkey="childkey" :ikey="ikey" :jkey='jkey' :itemkey='itemkey' :fn='changeElements' :data='item' v-if='item.inputType=="select"'></vselect>
										<vtextarea :disabledflag="disabledflag" @popu="relationChange" :partsKey="partsKey" :childkey="childkey" :ikey="ikey" :jkey='jkey' :itemkey='itemkey' :fn='changeElements' :data='item' v-if='item.inputType=="textarea"'></vtextarea>
										<vdate :disabledflag="disabledflag" @popu="relationChange" :partsKey="partsKey" :childkey="childkey" :ikey="ikey" :jkey='jkey' :itemkey='itemkey' :fn='changeElements' :data='item' v-if='item.inputType=="date"'></vdate>
										<vcheckbox :disabledflag="disabledflag" @popu="relationChange" :partsKey="partsKey" :childkey="childkey" :ikey="ikey" :jkey='jkey' :itemkey='itemkey' :fn='changeElements' :data='item' v-if='item.inputType=="checkbox"'></vcheckbox>
										<vradio :disabledflag="disabledflag" @popu="relationChange" :partsKey="partsKey" :childkey="childkey" :ikey="ikey" :jkey='jkey' :itemkey='itemkey' :fn='changeElements' :data='item' v-if='item.inputType=="radio"'></vradio>
										<VfileUpload @getName="getName" :disabledflag="disabledflag" @popu="relationChange" :partsKey="partsKey" :childkey="childkey" :ikey="ikey" :jkey='jkey' :itemkey='itemkey' :fn='changeElements' :data='item' v-if='item.inputType=="fileUpload"'></VfileUpload>
									</el-col>
								</div>
							</el-row>
						</div>
					</div>
				</div>
			</div>
			<div class="botton">
			<button :style="disabledflag?style:''" class="saveProduct" @click="saveProduct()">保存</button>
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
	export default{
		data() {
			return {
				productId: "",
				version: "",
				product: {},
				partsList: [],
				toPath: "",
				disabledflag: false,
				style: {
					display: "none"
				},
				submitFalg: true
			};
		},
		methods: {
			getProductDetail() {
				this.$MyFetch.post(`${poductApi.getProductDetail}?productId=${this.productId}&version=${this.version}`, {})
					.then((data = {}) => {
						console.log(data);
						let parts = [];
						let parameters = [];
						if (data.parts) {
							for (let i = 0; i < data.parts.length; i++) {
								parts = data.parts[i];
								parameters = parts.elements[0].parameters[0];
								if (parameters) {
									for (let i = 0; i < parameters.length; i++) {
										console.log(parameters[i]);
										if (parameters[i].columnName === "partnerId" || parameters[i].columnName === "partnerName" || parameters[i].columnName === "fundId" || parameters[i].columnName === "fundName" || parameters[i].columnName === "firstProduct" || parameters[i].columnName === "productType" || parameters[i].columnName === "businessModel") {
											parameters[i].inputIsReadonly = '1';
										}
									}
								};
							}
						}
						this.product = data;
						this.partsList = data.parts;
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
							console.log(data);
							this.productId = data;
						})
						.catch((err) => {
							console.log(err);
							this.$error("服务异常");
						});
					console.log(this.$route.query.copy);
				}
			},
			// 改变值
			changeElements(ikey, jkey, itemkey, data, childkey, partsKey) {
				console.log(ikey, jkey, itemkey, data, childkey, partsKey);
				let list = this.partsList;
				if (arguments.length === 5) {
					list[childkey].elements[ikey].parameters[jkey][itemkey].parameterValue = data;
				} else if (arguments.length === 6) {
					list[partsKey].elements[ikey].childElements[childkey].parameters[jkey][itemkey].parameterValue = data;
				};
				console.log(this.partsList);
				console.log(this.product);
			},
			// 获取文件名
			getName(ikey, jkey, itemkey, data, childkey, partsKey) {
				console.log(ikey, jkey, itemkey, data, childkey, partsKey);
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
							console.log(data);
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
				console.log(this.product);
				this.product.productId = this.productId;
				if (this.submitFalg) {
					this.submitFalg = false;
					console.log(1);
					this.$MyFetch.post(poductApi.saveProduct, this.product)
						.then((data = {}) => {
							console.log(data);
							this.$router.push({path: this.toPath});
							this.$message.success("保存成功");
						})
						.catch((err) => {
							console.log(err);
							this.$error(err.message);
							this.submitFalg = true;
						});
				};
			},
			// 多件增加
			addE(partsKey, ikey, childkey, numberType) {
				if (arguments.length === 3) {
					if (childkey !== "parent") {
						let list = this.partsList[partsKey].elements[ikey].parameters;
						let data = [];
						if (list) {
							data = JSON.parse(JSON.stringify(list[0]));
							for (let i = 0; i < list[0].length; i++) {
								data[i].parameterValue = "";
							}
							list.splice(list.length, 1, data);
						}
					} else {
						let list = JSON.parse(JSON.stringify(this.partsList[partsKey].elements[ikey]));
						console.log(this.partsList[partsKey].elements[ikey]);
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
						this.partsList[partsKey].elements.splice(ikey + 1, 0, list);
//						this.$MyFetch.get(poductApi.getelement, {elementType: this.partsList[partsKey].elements[ikey].elementType, templateType: this.partsList[partsKey].partsType})
//							.then((data = {}) => {
//								this.partsList[partsKey].elements.splice(ikey + 1, 0, data[0]);
//							})
//							.catch((err) => {
//								console.log(err);
//								this.$error("服务异常");
//							});
					}
				} else {
					console.log(partsKey, ikey, childkey);
					let list = this.partsList[partsKey].elements[ikey].childElements[childkey].parameters;
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
			}
		},
		mounted() {
			if (this.$route.query.productId && this.$route.query.version) {
				this.productId = this.$route.query.productId;
				this.version = this.$route.query.version;
				this.toPath = this.$route.query.toPath;
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
			VfileUpload
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
				font-size: 16px;
				color: #333333;
				line-height: 60px;
				font-weight: 900;
				span{
					margin: 0 5px;
				}
			}
			.min_demos{
				width: 100%;
				border: 1px solid #E9E9E9;
				float: left;
				margin-bottom: 10px;
				padding-top: 0 20px;
				h2{
					height: 40px;
					line-height: 40px;
					text-align: center;
					font-weight: 900;
					background: #F9FAFB;
					border-bottom: 1px solid #E9E9E9;
					box-shadow: 0 1px 10px 0 rgba(0,0,0,0.05);
				}
				.template_elements{
					width: 99%;
					margin: 10px auto;
					background: #FFFFFF;
					border: 1px solid #E9E9E9;
					border-radius: 4px;
					padding: 0 5px;
					>h3{
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
					.child{
						padding: 0 25px;
						h3{
							border-bottom: 1px solid #E5E5E5;
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
</style>
