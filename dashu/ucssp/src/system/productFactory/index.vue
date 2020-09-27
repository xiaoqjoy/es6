<template>
	<div class="product_index">
		<router-view/>
	</div>
</template>

<script>
	export default {
		data() {
			return {};
		}
	};
</script>

<style lang="less">
	.product_keyword{
		width: 200px;
		height: 40px;
		border: 1px solid #d0d0d0;
		border-radius: 4px;
		font-size: 12px;
		font-family: "微软雅黑";
		padding-left: 5px;
		box-sizing: border-box;
	}
	.product_button{
		border-radius: 4px;
		font-size: 14px;
		width: 100px;
		height: 40px;
		cursor: pointer;
		outline: none;
	}
	.product_popup{
		width: 100%;
		height: 100%;
		position: fixed;
		background-color: rgba(0,0,0,0.5);
		top: 0;
		left: 0;
		z-index: 100;

    .popup_main {
			width: 600px;
			height: 618px;
			background: #ececec;
			border-radius: 4px;
			position: absolute;
			top: 50%;
			left: 50%;
			margin-top: -309px;
			margin-left: -300px;
			overflow-y: scroll;
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
			.popup_content{
				width: 560px;
				margin: 20px auto;
				height: 517px;
				background: #fff;
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
						margin: 40px auto;
						cursor: pointer;
						outline: none;
					}
				}
			}
		}
	}
	.product-cascader {
		:last-child.el-cascader-menu {
			min-width: 280px;
		}
		.el-cascader-node__label {
			overflow: visible;
		}
	}
</style>
