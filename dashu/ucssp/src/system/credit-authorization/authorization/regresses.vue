<template>
	<div class="regresses">
		<div class="search clearfix">
			<el-input maxlength="18" v-model="certificateNum" style="width: 200px;height: 40px;float: left;margin-right: 10px;" placeholder="证件号码"></el-input>
			<el-input maxlength="15" v-model="custName" style="width: 200px;height: 40px;float: left;margin-right: 10px;" placeholder="客户姓名"></el-input>
			<button @click="cardReading()" class="authorization_button yellow_button float_left">读卡录入</button>
			<button @click="getRollbackList('search')" class="authorization_button blue_button float_left">查询</button>
			<button @click="custName='';certificateNum='';rollbackList=[];" class="authorization_button white_button float_left">清空</button>
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
						<th>是否电子授权</th>
						<th>提交人</th>
						<th>提交时间</th>
						<th>操作</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for='(item,key) in rollbackList' :key="key">
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
						<td><b v-for="(i,ikey) in item.creditProductDtos" :key="ikey" v-if="i.handlerId">{{i.handlerId}}</b><b v-else>&nbsp;</b></td>
						<td><b v-for="(i,ikey) in item.creditProductDtos" :key="ikey" v-if="i.handleTime">{{i.handleTime}}</b><b v-else>&nbsp;</b></td>
						<td><b v-for="(i,ikey) in item.creditProductDtos" @click="rollback(item, ikey)" :key="ikey" class="color538BF1">征信授权回退</b></td>
					</tr>
				</tbody>
			</table>
		</div>
		<pagination style="float: right;margin: 20px 0;" :page="pageConfig" class="pagination" @jump-page="handleCurrentChange"></pagination>
		<!--<el-pagination style="margin: 20px 0;float: right;" @current-change="handleCurrentChange" :current-page="page" :page-size="pagesize" layout="total, prev, pager, next, jumper" :total="total">
		</el-pagination>-->
	</div>
</template>

<script>
	import { authorizationApi } from '../js/server.js';
	import rule from '@/common/js/rules.js';
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
				certificateNum: "",
				custName: "",
				rollbackList: [],
				idCardFalg1: true
			};
		},
		methods: {
			handleCurrentChange(val) {
				this.getRollbackList();
			},
			// 获取已处理列表
			getRollbackList(value) {
				if (value === 'search') {
					this.pageConfig.currentPage = 1;
					if (!this.certificateNum && !this.custName) {
						this.$error("请先输入证件号码和客户姓名");
					} else if (!this.certificateNum && this.custName) {
						this.$error("请先输入证件号码");
					} else if (this.certificateNum && !this.custName) {
						this.$error("请先输入客户姓名");
					} else {
						this.getList();
					}
				} else {
					console.log(1);
					this.getList();
				}
			},
			// 获取数据
			getList() {
				let json = {
					certificateNum: this.certificateNum,
					custName: this.custName
				};
				rule.identityCardRule("身份验证", this.certificateNum, (rules) => {
					if (!rules) {
						this.$MyFetch.post(`${authorizationApi.rollbackList}?pageNum=${this.pageConfig.currentPage}&pageSize=${this.pageConfig.pageSize}`, json)
							.then((data = {}) => {
								console.log(data.list);
								this.pageConfig.account = data.total;
								this.rollbackList = data.list;
							})
							.catch((err) => {
								this.$error(err.message);
								this.pageConfig.account = 0;
								this.rollbackList = [];
							});
					} else {
						this.$error("请输入正确的身份证");
					};
				});
			},
			// 回退操作
			rollback(data, key) {
				// console.log(data, key,data.creditProductDtos[key].id);
				let json = {
					"id": data.creditProductDtos[key].id,
					"applicationId": data.applicationId,
					"createDate": this.$Moment(new Date()).format('YYYY-MM-DD hh:mm:ss'),
					"custManagerName": data.custManagerName,
					"grantNum": data.grantNum,
					"grantorId": data.certificateNum,
					"grantorName": data.custName,
					"orgId": data.creditProductDtos[key].orgId,
					"orgName": data.creditProductDtos[key].orgName,
					"productId": data.creditProductDtos[key].productId,
					"productName": data.creditProductDtos[key].productName,
					"reportSourceCode": data.reportSourceCode,
					"reportSourceOrg": data.reportSourceOrg,
					"grantInd": data.grantInd,
					"serviceId": data.creditProductDtos[key].serviceId,
					"subcompanyId": data.creditProductDtos[key].subcompanyId
				};
				// console.log(json);
				this.$confirm('是否确认回退该笔业务?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.$MyFetch.post(authorizationApi.rollbackProcessed, json)
					.then((data = {}) => {
						console.log(data);
						this.getList();
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
			}
		},
		mounted() {
//			this.getRollbackList();
		},
		components: {
			pagination
		}
	};
</script>

<style scoped lang="less">
	.regresses{
		padding: 20px 30px;
		.search {
			padding: 0 0 20px;
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
					tr {
						border-bottom: 1px solid #E9E9E9;
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
					background: #ececec;
					box-shadow: 0 1px 0 0 #d0d0d0;
					th {
						font-size: 12px;
						color: #666;
						letter-spacing: 0;
						line-height: 40px;
					}
				}
			}
		}
	}
</style>
