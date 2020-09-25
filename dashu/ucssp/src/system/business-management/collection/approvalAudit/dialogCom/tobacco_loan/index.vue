<template>
	<div class="tobacco_loan_popup">
		<div class="content">
			<div class="top">
				<h3>烟草贷详情</h3>
				<i @click="tobaccoPopup()" class="el-icon-close"></i>
			</div>
			<div class="bottom">
				<div class="classification clearfix">
					<h4>基本信息</h4>
					<ul>
						<li>
							<span>客户名称:</span>
							<b :title="tobaccoLoanValue.customerName">{{tobaccoLoanValue.customerName}}</b>
						</li>
						<li>
							<span>客户简称:</span>
							<b :title="tobaccoLoanValue.abbreviationName">{{tobaccoLoanValue.abbreviationName}}</b>
						</li>
						<li>
							<span>客户编码:</span>
							<b :title="tobaccoLoanValue.customerId">{{tobaccoLoanValue.customerId}}</b>
						</li>
						<li>
							<span>客户简码:</span>
							<b :title="tobaccoLoanValue.customerSimpleCode">{{tobaccoLoanValue.customerSimpleCode}}</b>
						</li>
						<li>
							<span>许可证号:</span>
							<b :title="tobaccoLoanValue.licenseKey">{{tobaccoLoanValue.licenseKey}}</b>
						</li>
						<li>
							<span>客户电话:</span>
							<b :title="tobaccoLoanValue.customerPhone">{{tobaccoLoanValue.customerPhone}}</b>
						</li>
						<li>
							<span>负责人:</span>
							<b :title="tobaccoLoanValue.responsiblePerson">{{tobaccoLoanValue.responsiblePerson}}</b>
						</li>
						<li>
							<span>负责人电话:</span>
							<b :title="tobaccoLoanValue.responsiblePersonPhone">{{tobaccoLoanValue.responsiblePersonPhone}}</b>
						</li>
						<li>
							<span>地址:</span>
							<b :title="tobaccoLoanValue.customerAddress">{{tobaccoLoanValue.customerAddress}}</b>
						</li>
					</ul>
				</div>
				<div class="classification clearfix">
					<h4>管理信息</h4>
					<ul>
						<li>
							<span>营销中心:</span>
							<b :title="tobaccoLoanValue.marketingCenters">{{tobaccoLoanValue.marketingCenters}}</b>
						</li>
						<li>
							<span>销售部:</span>
							<b :title="tobaccoLoanValue.marketingDepartment">{{tobaccoLoanValue.marketingDepartment}}</b>
						</li>
						<li>
							<span>客服经理:</span>
							<b :title="tobaccoLoanValue.customerManager">{{tobaccoLoanValue.customerManager}}</b>
						</li>
						<li>
							<span>客服经理联系电话:</span>
							<i :title="tobaccoLoanValue.customerManagerPhone">{{tobaccoLoanValue.customerManagerPhone}}</i>
						</li>
					</ul>
				</div>
				<div class="classification clearfix">
					<h4>经营信息</h4>
					<ul>
						<li>
							<span>零售业态:</span>
							<b :title="tobaccoLoanValue.retailFormat">{{tobaccoLoanValue.retailFormat}}</b>
						</li>
						<li>
							<span>市场类别:</span>
							<b :title="tobaccoLoanValue.marketCategory">{{tobaccoLoanValue.marketCategory}}</b>
						</li>
						<li>
							<span>经营规模:</span>
							<b :title="tobaccoLoanValue.customerScale">{{tobaccoLoanValue.customerScale}}</b>
						</li>
						<li>
							<span>档位:</span>
							<b :title="tobaccoLoanValue.customerScale">{{tobaccoLoanValue.customerScale}}</b>
						</li>
					</ul>
				</div>
				<div class="classification clearfix">
					<h4>开户信息</h4>
					<ul>
						<li>
							<span>开户银行:</span>
							<b :title="tobaccoLoanValue.customerBank">{{tobaccoLoanValue.customerBank}}</b>
						</li>
						<li>
							<span>开户账号:</span>
							<b :title="tobaccoLoanValue.customerBankCard">{{tobaccoLoanValue.customerBankCard}}</b>
						</li>
					</ul>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default{
		data() {
			return {
			};
		},
		methods: {
			tobaccoPopup() {
				this.$emit("popup");
			}
		},
		mounted() {
		},
		props: ["tobaccoLoanValue"]
	};
</script>

<style scoped lang="less">
	.tobacco_loan_popup{
		width: 100%;
		height: 100%;
		position: fixed;
		top: 0;
		left: 0;
		background: rgba(0,0,0,0.50);
		z-index: 10000;
		.content{
			width: 915px;
			height: 855px;
			background: #ececec;
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
				height: 795px;
				padding: 0 20px;
				border-radius: 4px;
				.classification{
					width: 100%;
					box-sizing: border-box;
					background: #fff;
					padding: 0 20px;
					margin-top: 20px;
					h4{
						line-height: 54px;
						font-size: 16px;
						color: #333333;
						text-align: left;
						font-weight: 900;
						border-bottom: 1px solid #d0d0d0;
						text-indent: 10px;
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
							width: 33%;
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
								max-width: 200px;
								overflow: hidden;
								text-overflow:ellipsis;
								white-space:nowrap;
								-o-text-overflow:ellipsis;
								-webkit-text-overflow:ellipsis;
								-moz-text-overflow:ellipsis;
							}
							i{
								line-height: 50px;
								text-align: left;
								font-size: 14px;
								color: #000000;
								display: block;
								float: left;
								margin-left: 10px;
								max-width: 100px;
								font-style: normal;
								overflow: hidden;
								text-overflow:ellipsis;
								white-space:nowrap;
								-o-text-overflow:ellipsis;
								-webkit-text-overflow:ellipsis;
								-moz-text-overflow:ellipsis;
							}
						}
					}
				}
			}
		}
	}
</style>
