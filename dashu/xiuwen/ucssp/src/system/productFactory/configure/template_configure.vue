<template>
	<div class="template_configure">
		<router-link to="template">模板管理</router-link>
		<i class="el-icon-arrow-left"></i>
		<span>配置模板</span>
		<div class="ec_content clearfix">
			<h3>模板：{{templateType}}</h3>
			<button class="product_button" @click="control_popup()">+ 增加</button>
			<div class="template_main clearfix">
				<h2>{{codeText}}</h2>
				<div v-for='(i,key) in elements' :key='key'>
					<h3><b>{{i.elementName}}</b><span class="el-icon-close" @click="deleteE(key)"></span></h3>
					<div class="elements" v-for='(j,jkey) in i.parameters' :key='jkey'>
						<el-row :gutter="10">
							<div v-for='(item,itemkey) in j' :key='itemkey'>
								<el-col v-if='item.status=="valid"' :span="item.locationColspan*2">
									<vtext :data='item' v-if='item.inputType=="text"'></vtext>
									<vmultipleSelect :data='item' v-if='item.inputType=="multipleSelect"'></vmultipleSelect>
									<vselect :data='item' v-if='item.inputType=="select"'></vselect>
									<vtextarea :data='item' v-if='item.inputType=="textarea"'></vtextarea>
									<vdate :data='item' v-if='item.inputType=="date"'></vdate>
									<vcheckbox :data='item' v-if='item.inputType=="checkbox"'></vcheckbox>
									<vradio :data='item' v-if='item.inputType=="radio"'></vradio>
									<VfileUpload :data='item' v-if='item.inputType=="fileUpload"'></VfileUpload>
								</el-col>
							</div>
						</el-row>
					</div>
					<div class="child" v-for='(k,kkey) in i.childElements' :key='kkey+1'>
						<h3>{{k.elementName}}</h3>
						<div v-for='(itemI,itemIkey) in k.parameters' :key='itemIkey'>
							<el-row :gutter="10">
								<div v-for='(item,itemkey) in itemI'  :key='itemkey'>
									<el-col v-if='item.status=="valid"' :span="item.locationColspan*2">
										<vtext :data='item' v-if='item.inputType=="text"'></vtext>
										<vmultipleSelect :data='item' v-if='item.inputType=="multipleSelect"'></vmultipleSelect>
										<vselect :data='item' v-if='item.inputType=="select"'></vselect>
										<vtextarea :data='item' v-if='item.inputType=="textarea"'></vtextarea>
										<vdate :data='item' v-if='item.inputType=="date"'></vdate>
										<vcheckbox :data='item' v-if='item.inputType=="checkbox"'></vcheckbox>
										<vradio :data='item' v-if='item.inputType=="radio"'></vradio>
										<VfileUpload :data='item' v-if='item.inputType=="fileUpload"'></VfileUpload>
									</el-col>
								</div>
							</el-row>
						</div>
					</div>
				</div>
				<div class="submit">
					<button @click="preservation()">保存</button>
				</div>
			</div>
		</div>
		<div  v-if='popup' class="product_popup">
			<div class="popup_configure_main">
				<h3>配置元件<span @click="control_popup()" class="el-icon-close"></span></h3>
				<div class="popup_paddindiv">
					<div class="search">
						<input type="text" v-model="keyword" class="product_keyword" placeholder="元件名称" />
						<button @click="getElementList('search')" class="product_button">查询</button>
						<button @click="keyword=''" class="product_button button_empty">清空</button>
					</div>
					<div class="table">
						<table>
							<tr class="tr_top">
								<th style="width: 100px;"></th>
								<th>元件编号</th>
								<th>元件名称</th>
								<th>元件类型</th>
							</tr>
							<tr v-for="(item,key) in elementList" :key="key">
								<td>
									<el-checkbox v-model="item.checked"></el-checkbox>
								</td>
								<td>
									{{item.templateElementId}}
								</td>
								<td>
									{{item.elementName}}
								</td>
								<td>
									{{item.elementText}}
								</td>
							</tr>
						</table>
					</div>
					<el-pagination style="float: right;margin: 20px 0;" @current-change="popup_handleCurrentChange" :current-page="popup_page" :page-size="popup_pagesize" layout="total, prev, pager, next, jumper" :total="popup_total">
					</el-pagination>
					<div class="popup_button">
						<button @click="configure()">提交</button>
					</div>
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
	export default {
		data() {
			return {
				elements: {},
				templateType: "",
				codeText: "",
				elementList: [],
				popup: false,
				popup_total: 400,
				popup_pagesize: 6,
				popup_page: 1,
				keyword: ""
			};
		},
		methods: {
			popup_handleCurrentChange(val) {
				console.log(`当前页: ${val}`);
				this.popup_page = val;
				this.getElementList();
			},
			// 获取模板
			getTemplateList() {
				this.$MyFetch.post(poductApi.getTemplateDetail, {templateType: this.templateType})
					.then((data = {}) => {
						console.log(data);
						this.elements = data.elements;
					})
					.catch((err) => {
						console.log(err);
						this.$error("服务异常");
					});
			},
			// 删除
			deleteE(key) {
				this.elements.splice(key, 1);
			},
			// 获取元件列表
			getElementList(value) {
				if (value === 'search') {
					this.popup_page = 1;
				}
				let json = {};
				json.elementName = this.keyword;
				json.page = this.popup_page;
				json.size = this.popup_pagesize;
				json.templateType = this.templateType;
				this.ElementList = [];
				this.$MyFetch.post(poductApi.getElementList, json)
					.then((data = {}) => {
						console.log(data);
						this.elementList = data.list;
						this.popup_total = data.total;
					})
					.catch((err) => {
						console.log(err);
						this.$error("服务异常");
					});
			},
			// 控制弹窗
			control_popup() {
				this.popup = !this.popup;
				this.getElementList();
			},
			// 提交
			configure() {
				let list = [];
				for (var i = 0; i < this.elementList.length; i++) {
					if (this.elementList[i].checked) {
						list[list.length] = this.elementList[i].templateElementId;
					}
				}
				var str = list.join(";");
				this.$MyFetch.post(poductApi.getElementParamterDetail, {templateElementId: str})
					.then((data = {}) => {
						console.log(data);
						let list = data;
						for (let i = 0; i < list.length; i++) {
							let number = 0;
							if (!this.elements) {
								this.elements = [];
							};
							for (var j = 0; j < this.elements.length; j++) {
								if (list[i].templateElementId === this.elements[j].templateElementId) {
									number++;
								}
							};
							if (number === 0) {
								this.elements.splice(this.elements.length, 1, list[i]);
							};
						}
						this.popup = !this.popup;
						this.$message.success("提交元件成功");
					})
					.catch((err) => {
						console.log(err);
						this.$error("服务异常");
					});
			},
			// 保存
			preservation() {
				let json = {};
				json.templateType = this.templateType;
				json.elements = this.elements;
				this.$MyFetch.post(poductApi.saveTemplate, json)
					.then((data = {}) => {
						this.$router.push({path: "template"});
						this.$message.success("保存成功");
					})
					.catch((err) => {
						console.log(err);
						this.$error("服务异常");
					});
			}
		},
		mounted() {
			if (this.$route.query.templateType && this.$route.query.codeText) {
				this.templateType = this.$route.query.templateType;
				this.codeText = this.$route.query.codeText;
			}
			this.getTemplateList();
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
	.template_configure {
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
			.search {
				width: 100%;
				height: 80px;
				float: left;
				.product_keyword {
					display: block;
					margin: 0px 20px 0 0;
					float: left;
				}
				.product_button {
					margin-left: 30px;
					margin-top: 0px;
				}
				.button_empty {
					background: #fff;
					color: #538BF1;
				}
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
			h3 {
				font-size: 16px;
				color: #333333;
				line-height: 60px;
				font-weight: 900;
			}
			.template_main {
				margin-top: 20px;
				float: left;
				width: 100%;
				border: 1px solid #E9E9E9;
				h2 {
					width: 100%;
					height: 40px;
					line-height: 40px;
					font-size: 14px;
					color: #333333;
					letter-spacing: 1.07px;
					text-align: center;
					font-weight: 900;
					background: #F9FAFB;
					border-bottom: 1px solid #E9E9E9;
					box-shadow: 0 1px 10px 0 rgba(0, 0, 0, 0.05);
				}
				h3{
					border-bottom: 1px solid #E5E5E5;
					height: 60px;
					margin: 0 20px;
					b{
						border-left: 2px solid #538BF1;
						line-height: 20px;
						color: #333333;
						padding-left: 3px;
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
					padding: 0 30px;
				}
				.child{
					padding: 0 50px;
					div{
						padding: 0 5px;
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
		.popup_configure_main{
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
