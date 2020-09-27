<template>
	<div class="template clearfix">
		<!--<div class="search">
			<input type="text" class="product_keyword" placeholder="关键字" />
			<button class="product_button">查询</button>
			<button class="product_button button_empty">清空</button>
		</div>-->
		<div style="margin-top: 20px;margin-bottom: 20px;" class="table">
			<table>
				<tr class="tr_top">
					<th>模版名称</th>
					<th>模版类型</th>
					<th>更新时间</th>
					<th>操作</th>
				</tr>
				<tr v-for='(i, key) in templateTypeList' :key="key">
					<td>{{i.codeText}}</td>
					<td>{{i.codeValue}}</td>
					<td>{{i.updatedDate}}</td>
					<td>
						<span @click="toTemplateConfigure(i.codeValue, i.codeText)">配置模板</span>
					</td>
				</tr>
			</table>
		</div>
	</div>
</template>

<script>
	import { poductApi } from '../js/server.js';
	export default {
		data() {
			return {
				templateTypeList: []
			};
		},
		methods: {
			handleCurrentChange(val) {
				console.log(`当前页: ${val}`);
			},
			// 获取模板
			getDictionaryList() {
				this.$MyFetch.post(poductApi.getDictionaryList, {catalogNo: "TemplateType"})
					.then((data = {}) => {
						console.log(data);
						this.templateTypeList = data.list;
					})
					.catch((err) => {
						console.log(err);
						this.$error("服务异常");
					});
			},
			// 配置
			toTemplateConfigure(templateType, codeText) {
				this.$router.push({path: 'template_configure', query: {templateType: templateType, codeText: codeText}});
			}
		},
		mounted() {
			this.getDictionaryList();
		}
	};
</script>

<style scoped lang="less">
	.template {
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
					line-height: 60px;
					span {
						font-size: 14px;
						color: #4A90E2;
						padding: 0 10px;
						cursor: pointer;
					}
				}
			}
		}
		.popup_main {
			width: 380px;
			height: 500px;
			background: #FFFFFF;
			border-radius: 4px;
			position: absolute;
			top: 50%;
			left: 50%;
			margin-top: -250px;
			margin-left: -190px;
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
			.popup_content {
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
			/deep/ .el-input .el-input__inner {
				background: #F9FAFB;
			}
			/deep/ .el-select {
				margin-left: -12px;
				.el-input__inner {
					background: #fff;
				}
			}
		}
	}
</style>
