<template>
	<div class="tax_credit_popup">
		<div class="content">
			<div class="top">
				<h3>烟草贷详情</h3>
				<i @click="getTaxPopup" class="el-icon-close"></i>
			</div>
			<div class="bottom">
				<div class="classification clearfix">
					<h4>基本信息</h4>
					<ul>
						<li>
							<span>纳税人名称:</span>
							<b :title="taxInfoList.basicInfo.taxPayerName">{{taxInfoList.basicInfo.taxPayerName}}</b>
						</li>
						<li>
							<span>纳税人识别号:</span>
							<b :title="taxInfoList.basicInfo.taxPayerId">{{taxInfoList.basicInfo.taxPayerId}}</b>
						</li>
						<li>
							<span>纳税数据接入结果:</span>
							<b></b>
						</li>
						<li>
							<span>组织机构代码:</span>
							<b :title="taxInfoList.basicInfo.organizationCd">{{taxInfoList.basicInfo.organizationCd}}</b>
						</li>
						<li>
							<span>社会信用代码:</span>
							<b :title="taxInfoList.basicInfo.socialcreditCd">{{taxInfoList.basicInfo.socialcreditCd}}</b>
						</li>
						<li>
							<span>经营地址联系电话:</span>
							<b :title="taxInfoList.basicInfo.registerAddressPhone">{{taxInfoList.basicInfo.registerAddressPhone}}</b>
						</li>
						<li>
							<span>所属行业:</span>
							<b :title="taxInfoList.basicInfo.industryCd">{{taxInfoList.basicInfo.industryCd}}</b>
						</li>
						<li>
							<span>企业等级注册类型:</span>
							<b :title="taxInfoList.basicInfo.enterpriseTypeCd">{{taxInfoList.basicInfo.enterpriseTypeCd}}</b>
						</li>
						<li>
							<span>近一年企业缴税额:</span>
							<b></b>
						</li>
						<li>
							<span>纳税人状态:</span>
							<b :title="taxInfoList.basicInfo.taxPayerStatusCd">{{taxInfoList.basicInfo.taxPayerStatusCd}}</b>
						</li>
						<li>
							<span>营改增税人类型:</span>
							<b :title="taxInfoList.basicInfo.taxPayerTypeCd">{{taxInfoList.basicInfo.taxPayerTypeCd}}</b>
						</li>
						<li>
							<span>借款人最早缴税日期:</span>
							<b></b>
						</li>
						<li>
							<span>注册资本及币种:</span>
							<b :title="taxInfoList.basicInfo.registeredCapital">{{taxInfoList.basicInfo.registeredCapital}}</b>
						</li>
						<li>
							<span>行政区别:</span>
							<b :title="taxInfoList.basicInfo.cityCd">{{taxInfoList.basicInfo.cityCd}}</b>
						</li>
						<li>
							<span>登记日期:</span>
							<b :title="taxInfoList.basicInfo.openDt">{{taxInfoList.basicInfo.openDt}}</b>
						</li>
						<li>
							<span>主管税务机关:</span>
							<b :title="taxInfoList.basicInfo.chiefTaxAtion">{{taxInfoList.basicInfo.chiefTaxAtion}}</b>
						</li>
						<li>
							<span>注册地址:</span>
							<b :title="taxInfoList.basicInfo.registerAddress">{{taxInfoList.basicInfo.registerAddress}}</b>
						</li>
					</ul>
					<div class="table">
						<span>联系人信息:</span>
						<table>
							<thead>
								<tr>
									<th>联系人类型</th>
									<th>姓名</th>
									<th>证件类型</th>
									<th>证件号码</th>
									<th>移动电话</th>
									<th>电子邮箱</th>
								</tr>
							</thead>
							<tbody>
								<tr v-for="(i,key) in taxInfoList.shareholderList" :key="key">
									<td></td>
									<td>{{i.stockHolderName}}</td>
									<td></td>
									<td></td>
									<td></td>
									<td></td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
				<div class="classification clearfix">
					<h4>申报信息</h4>
					<div class="table">
						<el-tabs v-model="activeName" @tab-click="handleClick">
							<el-tab-pane label="近2年增值纳税明细" name="first">
								<table>
									<thead>
										<tr>
											<th>所属期</th>
											<th>发生日期</th>
											<th>截止日期</th>
											<th>计税金额（万元）</th>
											<th>应缴纳金额（万元）</th>
											<th>实缴金额（万元）</th>
										</tr>
									</thead>
									<tbody>
										<tr v-for="(i,key) in taxInfoList.vatDetailList" :key="key">
											<td>{{i.dutyPeriod}}</td>
											<td>{{i.dutyBeginDt}}</td>
											<td>{{i.dutyEnddate}}</td>
											<td>{{i.dutyAmount}}</td>
											<td>{{i.payableAmount}}</td>
											<td>{{i.factAmount}}</td>
										</tr>
									</tbody>
								</table>
							</el-tab-pane>
							<el-tab-pane label="近2年所得纳税明细" name="second">
								<table>
									<thead>
										<tr>
											<th>所属期</th>
											<th>发生日期</th>
											<th>截止日期</th>
											<th>计税金额（万元）</th>
											<th>应缴纳金额（万元）</th>
											<th>实缴金额（万元）</th>
										</tr>
									</thead>
									<tbody>
										<tr v-for="(i,key) in taxInfoList.incomeDetailList" :key="key">
											<td>{{i.dutyPeriod}}</td>
											<td>{{i.dutyBeginDt}}</td>
											<td>{{i.dutyEnddate}}</td>
											<td>{{i.dutyAmount}}</td>
											<td>{{i.payableAmount}}</td>
											<td>{{i.factAmount}}</td>
										</tr>
									</tbody>
								</table>
							</el-tab-pane>
						</el-tabs>
					</div>
				</div>
				<div class="classification clearfix">
					<h4>欠税信息</h4>
					<div class="table">
						<table>
							<thead>
								<tr>
									<th>年份</th>
									<th>未按期缴纳税款次数</th>
									<th>违法违规次数</th>
								</tr>
							</thead>
							<tbody>
								<tr v-for="(i,key) in taxInfoList.taxactionList" :key="key">
									<td>{{i.year}}</td>
									<td>{{i.notScheduleCnt}}</td>
									<td>{{i.transgressCnt}}</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
				<div class="classification clearfix">
					<h4>申报信息</h4>
					<div class="table">
						<el-tabs v-model="activeName1" @tab-click="handleClick">
							<el-tab-pane label="历年TOP10上游供应商发票数据" name="first">
								<table>
									<thead>
										<tr>
											<th>年份</th>
											<th>发票明细名称</th>
											<th>交易金额（万元）</th>
											<th>占比（%）</th>
											<th>交易次数</th>
										</tr>
									</thead>
									<tbody>
										<tr v-for="(i,key) in taxInfoList.supplierInvoiceList" :key="key">
											<td>{{i.year}}</td>
											<td>{{i.invoiceName}}</td>
											<td>{{i.tradeAmt}}</td>
											<td>{{i.proportion}}</td>
											<td>{{i.tradeCnt}}</td>
										</tr>
									</tbody>
								</table>
							</el-tab-pane>
							<el-tab-pane label="历年TOP5上游原材料数据" name="second">
								<table>
									<thead>
										<tr>
											<th>年份</th>
											<th>发票明细名称</th>
											<th>交易金额（万元）</th>
											<th>占比（%）</th>
											<th>交易次数</th>
										</tr>
									</thead>
									<tbody>
										<tr v-for="(i,key) in taxInfoList.materialInvoiceList" :key="key">
											<td>{{i.year}}</td>
											<td>{{i.invoiceName}}</td>
											<td>{{i.tradeAmt}}</td>
											<td>{{i.proportion}}</td>
											<td>{{i.tradeCnt}}</td>
										</tr>
									</tbody>
								</table></el-tab-pane>
							<el-tab-pane label="历年TOP10下游经销商发票数据" name="three">
								<table>
									<thead>
										<tr>
											<th>年份</th>
											<th>发票明细名称</th>
											<th>交易金额（万元）</th>
											<th>占比（%）</th>
											<th>交易次数</th>
										</tr>
									</thead>
									<tbody>
										<tr v-for="(i,key) in taxInfoList.dealerInvoiceList" :key="key">
											<td>{{i.year}}</td>
											<td>{{i.invoiceName}}</td>
											<td>{{i.tradeAmt}}</td>
											<td>{{i.proportion}}</td>
											<td>{{i.tradeCnt}}</td>
										</tr>
									</tbody>
								</table></el-tab-pane>
							<el-tab-pane label="历年TOP10下游产品数据" name="four">
								<table>
									<thead>
										<tr>
											<th>年份</th>
											<th>发票明细名称</th>
											<th>交易金额（万元）</th>
											<th>占比（%）</th>
											<th>交易次数</th>
										</tr>
									</thead>
									<tbody>
										<tr v-for="(i,key) in taxInfoList.productInvoiceList" :key="key">
											<td>{{i.year}}</td>
											<td>{{i.invoiceName}}</td>
											<td>{{i.tradeAmt}}</td>
											<td>{{i.proportion}}</td>
											<td>{{i.tradeCnt}}</td>
										</tr>
									</tbody>
								</table></el-tab-pane>
						</el-tabs>
					</div>
				</div>
				<div class="classification clearfix">
					<h4>财务信息</h4>
					<div class="table">
						<table>
							<thead>
								<tr>
									<th>年份</th>
									<th>营业收入（万元）</th>
									<th>毛利润（万元）</th>
									<th>资产总额（万元）</th>
									<th>欠债总额（万元）</th>
									<th>股东权益</th>
									<th>资产负债率（%）</th>
								</tr>
							</thead>
							<tbody>
								<tr v-for="(i,key) in taxInfoList.finaceReportList" :key="key">
									<td>{{i.year}}</td>
									<td>{{i.businessIncome}}</td>
									<td>{{i.grossProfit}}</td>
									<td>{{i.totalAssets}}</td>
									<td>{{i.liabilities}}</td>
									<td>{{i.equityinterests}}</td>
									<td>{{i.assetLiabilityRate}}</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default{
		data() {
			return {
				activeName: "first",
				activeName1: "first"
			};
		},
		methods: {
			handleClick() {
				console.log(123);
			},
			getTaxPopup() {
				this.$emit("popup");
			}
		},
		mounted() {
			console.log(this.taxInfoList);
		},
		props: ["taxInfoList"]
	};
</script>

<style scoped lang="less">
	.tax_credit_popup{
		width: 100%;
		height: 100%;
		position: fixed;
		top: 0;
		left: 0;
		background: rgba(0,0,0,0.50);
		z-index: 10000;
		.content{
			width: 1200px;
			height: 855px;
			background: #F9FAFB;
			position: absolute;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			margin: auto;
			border-radius: 4px;
			.top{
				float: left;
				width: 100%;
				height: 60px;
				position: relative;
				background: #FFFFFF;
				border-radius: 4px;
				box-shadow: 0 1px 10px 0 rgba(0,0,0,0.05);
				h3{
					font-size: 18px;
					color: #333333;
					letter-spacing: 1.38px;
					text-align: center;
					line-height: 60px;
					font-family: 900;
				}
				i{
					position: absolute;
					font-size: 25px;
					font-family: 900;
					line-height: 60px;
					top: 0;
					right: 20px;
					cursor: pointer;
				}
			}
			.bottom{
				float: left;
				width: 100%;
				height: 775px;
				padding: 0 20px 10px;
				border-radius: 4px;
				overflow-x: hidden;
				overflow-y: auto;
				.classification{
					width: 100%;
					box-sizing: border-box;
					background: #fff;
					padding: 0 20px 10px;
					margin-top: 20px;
					h4{
						line-height: 54px;
						font-size: 16px;
						color: #333333;
						text-align: left;
						font-weight: 900;
						border-bottom: 1px solid #E5E5E5;
						text-indent: 10px;
						margin-bottom: 5px;
						position: relative;
					}
					h4:after{
						content: "";
						display: block;
						width: 2px;
						height: 16px;
						background: #538BF1;
						position: absolute;
						margin-top: -35px;
					}
					ul{
						width: 100%;
						li{
							width: 25%;
							height: 50px;
							float: left;
							span{
								line-height: 50px;
								text-align: left;
								font-size: 14px;
								color: #666;
								display: block;
								float: left;
							}
							b{
								line-height: 50px;
								text-align: left;
								font-size: 14px;
								color: #000000;
								display: block;
								float: left;
								margin-left: 10px;
								max-width: 160px;
								overflow: hidden;
								text-overflow:ellipsis;
								white-space:nowrap;
								-o-text-overflow:ellipsis;
								-webkit-text-overflow:ellipsis;
								-moz-text-overflow:ellipsis;
							}
						}
					}
					.table{
						width: 100%;
						float: left;
						text-align: left;
						span{
							display: block;
							font-size: 14px;
							color: #2B2826;
							line-height: 50px;
						}
						table{
							width: 100%;
							background: #FFFFFF;
							border: 1px solid #E5E5E5;
							border-radius: 4px;
							thead tr,tbody tr{
								th{
									text-align: center;
									font-size: 12px;
									color: #666;
									height: 28px;
									letter-spacing: 0;
								}
								td{
									text-align: center;
									font-size: 14px;
									color: #333333;
									letter-spacing: 0;
								}
							}
							thead{
								tr{
									height: 28px;
									background: #F9FAFB;
									border-bottom: 1px solid #E5E5E5;
								}
							}
							tbody{
								tr{
									height: 28px;
									background: #ffffff;
								}
							}
						}
					}
					/deep/ .el-tabs__item{
						font-size: 12px;
						letter-spacing: 0;
					}
					/deep/ .el-tabs__item.is-active{
						font-size: 12px;
						color: #538BF1;
						letter-spacing: 0;
					}
					/deep/ .el-tabs__header{
						margin-bottom: -1px;
					}
					/deep/ .el-tabs__nav-wrap{
						padding-top: 0px;
						border: 1px solid #E9E9E9;
						border-bottom: 0px;
						-webkit-box-shadow: 0 0px 0px 0 rgba(0, 0, 0, 0.08);
						background: #FFFFFF;
						-webkit-box-shadow: 0 0px 0px 0 rgba(0, 0, 0, 0.08);
						box-shadow: 0 0px 0px 0 rgba(0, 0, 0, 0.08);
					}
				}
			}
		}
	}</style>
