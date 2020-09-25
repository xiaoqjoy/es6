<template>
	<div class="pending">
		<button @click="control()" class="authorization_button blue_button display_block">+ 新增</button>
		<div class="search clearfix">
			<el-input maxlength="18" v-model="certificateNum" style="width: 200px;height: 40px;float: left;margin-right: 10px;" placeholder="证件号码"></el-input>
			<el-input maxlength="15" v-model="custName" style="width: 200px;height: 40px;float: left;margin-right: 10px;" placeholder="客户姓名"></el-input>
			<button @click="cardReading()" class="authorization_button yellow_button float_left">读卡录入</button>
			<button @click="getPendingList('search')" class="authorization_button blue_button float_left">查询</button>
			<button @click="custName='';certificateNum='';pendingList=[];getRelatedList();" class="authorization_button white_button float_left">清空</button>
		</div>
		<div class="table clearfix">
			<table>
				<thead>
					<tr>
						<th>申请编号</th>
						<th>客户名称</th>
						<th>证件号码</th>
						<th>产品名称</th>
						<th>合作机构</th>
						<th>信用报告来源</th>
						<th>信用报告提供机构</th>
						<th>客户经理</th>
						<!--<th>是否有效</th>-->
						<th>是否电子征信</th>
						<th>是否回退</th>
						<th>操作</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for='(item,key) in pendingList' :key="key">
						<td><span :title="item.applicationId" v-if="!item.grantInd">{{item.applicationId}}</span></td>
						<td><span :title="item.custName">{{item.custName}}</span></td>
						<td><span>{{item.certificateNum.slice(0,6)}}******{{item.certificateNum.slice(14)}}</span></td>
						<td><b :title="i.productName" v-for="(i,ikey) in item.creditProductDtos" :key="ikey" v-if="i.productName">{{i.productName}}</b><b v-else>&nbsp;</b></td>
						<td><b :title="i.orgName" v-for="(i,ikey) in item.creditProductDtos" :key="ikey" v-if="i.orgName">{{i.orgName}}</b><b v-else>&nbsp;</b></td>
						<td><span>{{item.reportSourceCode}}</span></td>
						<td><span>{{item.reportSourceOrg}}</span></td>
						<td><span>{{item.custManagerName}}</span></td>
						<!--<td><span v-for="(i,ikey) in item.creditProductDtos" :key="ikey" v-if="i.availableInd">是</span><span v-else>否</span></td>-->
						<td><span v-if="item.electronicAuthInd">是</span><span v-else>否</span></td>
						<td><b v-for="(i,ikey) in item.creditProductDtos" :key="ikey" v-if="i.rollbackInd">是</b><b v-else>否</b></td>
						<td>
							<strong v-if="item.grantInd" @click="delControl(item.applicationId)" class="color538BF1">删除</strong>
							<strong @click="toImage(item.applicationId?item.applicationId:item.grantNum,item.creditProductDtos)" class="color538BF1">征信授权</strong>
							<strong @click="creditAuthInfo(item.applicationId?item.applicationId:item.grantNum,item.creditProductDtos,item)" class="color538BF1">提交</strong>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
		<pagination style="float: right;margin: 20px 0;" :page="pageConfig" class="pagination" @jump-page="handleCurrentChange"></pagination>
		<!--<el-pagination style="margin: 20px 0;float: right;" @current-change="handleCurrentChange" :current-page="page" :page-size="pagesize" layout="total, prev, pager, next, jumper" :total="total">
		</el-pagination>-->
		<div v-if="popup" class="pending_popup">
			<div class="popup_content">
				<h3>新增授权人<span @click="control()" class="el-icon-close"></span></h3>
				<div class="popup_main">
					<div class="popup_float">
						<div><span>*</span>客户姓名</div>
						<el-input maxlength="15" style="width: 225px;margin: 5px 0 0 -11px;float: left;" v-model='addJson.custName' placeholder="请填写客户姓名"></el-input>
						<button @click="popup_reading()" style="margin: 5px 0 0 23px;" class="authorization_button yellow_button float_left">读卡录入</button>
					</div>
					<div class="popup_float">
						<div><span>*</span>证件号码</div>
						<el-input maxlength="18" v-model='addJson.certificateNum' placeholder="证件号码"></el-input>
					</div>
					<div class="popup_float">
						<div><span>*</span>信用报告来源</div>
						<el-select @change="sourceCodeChange()" clearable v-model="addJson.reportSourceCode" filterable placeholder="信用报告来源">
							<el-option v-for="item in sourceList" :key="item.itemCode" :label="item.itemDesc" :value="item.itemCode">
							</el-option>
						</el-select>
					</div>
					<div class="popup_float">
						<div><span>*</span>信用报告提供机构</div>
						<el-select :disabled="changeFlag" v-model="addJson.reportSourceOrg" filterable placeholder="信用报告提供机构">
							<el-option v-for="item in mechanismList" :key="item.itemCode" :label="item.itemDesc" :value="item.itemCode">
							</el-option>
						</el-select>
					</div>
					<div class="popup_button">
						<button @click="sumbit()">提交</button>
					</div>
				</div>
			</div>
		</div>
		<div v-if="delPopup" class="pending_popup">
			<div class="popup_delete">
				<h3>删除<span @click="delControl()" class="el-icon-close"></span></h3>
				<div class="popup_button">
					<button @click="delInfo()">确定</button>
					<button @click="delControl()">取消</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import { authorizationApi } from '../js/server.js';
	import rule from '@/common/js/rules.js';
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
				popup: false,
				certificateNum: "",
				custName: "",
				pendingList: [],
				sourceList: [],
				mechanismList: [],
				addJson: {
					certificateNum: "",
					custName: "",
					reportSourceCode: "",
					reportSourceOrg: ""
				},
				changeFlag: false,
				deleteCertificateNum: "",
				delPopup: false,
				idCardFalg1: true,
				idCardFalg2: true
			};
		},
		methods: {
			handleCurrentChange(val) {
				this.getRelatedList();
			},
			getPendingList(value) {
				if (value === 'search') {
					this.pageConfig.currentPage = 1;
				};
				let json = {
					certificateNum: this.certificateNum,
					custName: this.custName
				};
				if (!this.certificateNum && !this.custName) {
					this.$error("请先输入证件号码和客户姓名");
				} else if (!this.certificateNum && this.custName) {
					this.$error("请先输入证件号码");
				} else if (this.certificateNum && !this.custName) {
					this.$error("请先输入客户姓名");
				} else {
					rule.identityCardRule("身份验证", this.certificateNum, (rules) => {
						if (!rules) {
							this.$MyFetch.post(`${authorizationApi.pendingList}?pageNum=${this.pageConfig.currentPage}&pageSize=${this.pageConfig.pageSize}`, json)
								.then((data = {}) => {
									console.log(data.list[0]);
									this.pageConfig.account = data.total;
									this.pendingList = data.list;
								})
								.catch((err) => {
									console.log(err);
									this.pageConfig.account = 0;
									this.pendingList = [];
									this.$error(err.message);
								});
						} else {
							this.$error("请输入正确身份证");
						};
					});
				};
			},
			// 控制弹窗
			control() {
				this.popup = !this.popup;
				this.addJson = {
					certificateNum: "",
					custName: "",
					reportSourceCode: "",
					reportSourceOrg: ""
				};
				this.changeFlag = false;
			},
			// 信用报告来源改变
			sourceCodeChange() {
				if (this.addJson.reportSourceCode === "003") {
					this.addJson.reportSourceOrg = "";
					this.changeFlag = true;
				} else if (this.addJson.reportSourceCode === "002") {
					this.addJson.reportSourceOrg = "ZLD00001";
					this.changeFlag = false;
				}
			},
			// 获取下拉数据
			getCommonSelection() {
				console.log(authorizationApi.commonSelection);
				this.$MyFetch.get(authorizationApi.commonSelection, {categoryCode: 'report_source_code'})
					.then((data = {}) => {
						console.log(data);
						this.sourceList = data;
						for (let i = 0; i < this.sourceList.length; i++) {
							if (this.sourceList[i].itemCode === "001") {
								this.sourceList.splice(i, 1);
							}
						}
					})
					.catch((err) => {
						console.log(err);
						this.$error("服务异常");
					});
				this.$MyFetch.get(authorizationApi.commonSelection, {categoryCode: 'report_source_org'})
					.then((data = {}) => {
						console.log(data);
						this.mechanismList = data;
					})
					.catch((err) => {
						console.log(err);
						this.$error("服务异常");
					});
			},
			// 提交
			sumbit() {
				if (!this.addJson.certificateNum || !this.addJson.custName || !this.addJson.reportSourceCode) {
					this.$error("下列信息必填");
				} else {
					rule.identityCardRule("身份验证", this.addJson.certificateNum, (rules) => {
						if (!rules) {
							this.$MyFetch.post(authorizationApi.relatedInfo, this.addJson)
								.then((data = {}) => {
									this.popup = !this.popup;
									this.certificateNum = "";
									this.custName = "";
									this.getRelatedList();
									this.page = 1;
								})
								.catch((err) => {
									console.log(err);
									this.$error(err.message);
								});
						} else {
							this.$error("请输入正确的身份证");
						};
					});
				}
			},
			// 新增列表展示
			getRelatedList() {
				let json = {
					certificateNum: this.certificateNum,
					custName: this.custName
				};
				this.$MyFetch.post(`${authorizationApi.relatedList}?pageNum=${this.pageConfig.currentPage}&pageSize=${this.pageConfig.pageSize}`, json)
					.then((data = {}) => {
						console.log(data.list);
						this.pageConfig.account = data.total;
						this.pendingList = data.list;
					})
					.catch((err) => {
						this.pageConfig.account = 0;
						this.pendingList = [];
						this.$error(err.message);
					});
			},
			delControl(number) {
				if (number) {
					this.deleteCertificateNum = number;
				}
				this.delPopup = !this.delPopup;
			},
			// 删除新增得
			delInfo() {
				let number = this.deleteCertificateNum.toString();
				this.$MyFetch.get(`${authorizationApi.delInfo}/${number}`, {})
					.then((data = {}) => {
						console.log(data);
						this.delPopup = false;
						this.getRelatedList();
					})
					.catch((err) => {
						console.log(err);
						this.$error("服务异常");
					});
			},
			// 查询读卡读卡
			cardReading() {
				window.idcardInfo = {};
				if (this.idCardFalg1) {
					window.myopen_onclick(1);
					this.idCardFalg1 = false;
					var x = setInterval(() => {
						this.certificateNum = window.idcardInfo.CardNo;
						this.custName = window.idcardInfo.NameS;
						this.idCardFalg1 = true;
						clearInterval(x);
						if (!window.idcardInfo.CardNo) {
							this.cardReading();
						}
					}, 1000);
				}
			},
			// 弹窗读卡
			popup_reading() {
				window.idcardInfo = {};
				if (this.idCardFalg2) {
					window.myopen_onclick(1);
					this.idCardFalg2 = false;
					var x = setInterval(() => {
						this.$set(this.addJson, "certificateNum", window.idcardInfo.CardNo);
						this.$set(this.addJson, "custName", window.idcardInfo.NameS);
						this.idCardFalg2 = true;
						clearInterval(x);
						if (!window.idcardInfo.CardNo) {
							this.popup_reading();
						}
					}, 1000);
				}
			},
			toImage(applicationId, creditProductDtos) {
				console.log(applicationId, creditProductDtos);
				this.$showImage(applicationId, "征信授权", {imageUrl: authorizationApi.creditAuthInfo, parameterData: creditProductDtos});
			},
			// 查询征信授权处理项
			creditAuthInfo(applicationId, creditProductDtos, itemData) {
				console.log(itemData);
				let ids = [];
				for (var i = 0; i < itemData.creditProductDtos.length; i++) {
					ids.push(itemData.creditProductDtos[i].id);
				}
				this.$confirm('提交数据, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.$MyFetch.post(authorizationApi.creditAuthInfo, {
							applicationId: applicationId,
							grantInd: itemData.grantInd,
							productAuthReqs: creditProductDtos,
							ids
						})
						.then((data = {}) => {
							console.log(data);
							this.getRelatedList();
						})
						.catch((err) => {
							console.log(err);
							this.$error(err.message);
						});
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '提交取消'
					});
				});
			}
		},
		mounted() {
			console.log(authorizationApi);
			this.getRelatedList();
			this.getCommonSelection();
		},
		components: {
			pagination
		}
	};
</script>

<style scoped lang="less">
	.pending {
		padding: 20px 30px;
		.authorization_button {
			display: block;
		}
		.search {
			padding: 20px 0;
			.authorization_button {
				margin: 0 10px;
			}
		}
		.table {
			width: 100%;
			height: 520px;
			background: #FFFFFF;
			border: 1px solid #E9E9E9;
			border-radius: 4px;
			table {
				width: 100%;
				tbody {
					display: block;
					height: 460px;
					overflow-y: scroll;
					text-align: center;
					tr {
						border-bottom: 1px solid #E9E9E9;
						text-align: center;
						b,span {
							line-height: 30px;
							font-size: 14px;
							color: #333333;
							letter-spacing: 0;
							text-align: center;
							display: block;
							overflow: hidden;
							text-overflow:ellipsis;
							white-space:nowrap;
							-o-text-overflow:ellipsis;
							-webkit-text-overflow:ellipsis;
							-moz-text-overflow:ellipsis;
						}
						b.color538BF1,span.color538BF1{
							color: #538BF1;
							cursor: pointer;
						}
						b{
							border-bottom: 1px solid #E9E9E9;
						}
						b:last-child{
							border: 0;
						}
						strong.color538BF1{
							font-size: 14px;
							color: #538BF1;
							cursor: pointer;
							letter-spacing: 0;
						}
					}
				}
				thead,
				tr {
					display: table;
					width: 100%;
					min-height: 60px;
					table-layout: fixed;
				}
				thead tr {
					height: 40px;
					background: #F9FAFB;
					box-shadow: 0 1px 0 0 #E5E5E5;
					text-align: center;
					th {
						font-size: 12px;
						color: #666;
						letter-spacing: 0;
						line-height: 40px;
					}
				}
			}
		}
		.pending_popup {
			width: 100%;
			height: 100%;
			position: fixed;
			background-color: rgba(0, 0, 0, 0.5);
			top: 0;
			left: 0;
			z-index: 100;
			.popup_delete {
				width: 280px;
				height: 160px;
				position: absolute;
				top: 50%;
				left: 50%;
				margin-top: -80px;
				margin-left: -140px;
				background: #FFFFFF;
				border-radius: 4px;
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
				.popup_button {
					width: 100%;
					float: left;
					button:first-child {
						display: block;
						width: 100px;
						height: 40px;
						background: #538BF1;
						font-size: 14px;
						color: #FFFFFF;
						letter-spacing: 1.07px;
						margin: 40px auto;
						cursor: pointer;
						outline: none;
						float: left;
						margin-left: 20px;
					}
					button:last-child {
						display: block;
						width: 100px;
						height: 40px;
						background: #538BF1;
						font-size: 14px;
						color: #FFFFFF;
						letter-spacing: 1.07px;
						margin: 40px auto;
						cursor: pointer;
						outline: none;
						float: right;
						margin-right: 20px;
					}
				}
			}
			.popup_content {
				width: 400px;
				height: 500px;
				position: absolute;
				top: 50%;
				left: 50%;
				margin-top: -250px;
				margin-left: -200px;
				background: #FFFFFF;
				border-radius: 4px;
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
				.popup_main {
					width: 100%;
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
						/deep/ .el-select{
							width: 100%;
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
			}
		}
	}
</style>
