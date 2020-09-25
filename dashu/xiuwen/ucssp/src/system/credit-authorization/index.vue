<template>
	<div class="cAuthorization">
		<div class="authorization_tab">
			<el-tabs v-model="activeName" class="ata" @tab-click="handleClick">
				<el-tab-pane label="待处理" name="/system/authorization/pending"></el-tab-pane>
				<el-tab-pane label="已处理" name="/system/authorization/processed"></el-tab-pane>
				<el-tab-pane label="回退" name="/system/authorization/regresses"></el-tab-pane>
			</el-tabs>
		</div>
		<div class="authorization_context clearfix">
			<router-view/>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				activeName: '/system/authorization/pending'
			};
		},
		methods: {
			handleClick() {
				console.log(1);
				this.$router.push({
					path: this.activeName
				});
			}
		},
		mounted() {
			this.handleClick();
		}
	};
</script>

<style lang="less" scoped>
	.cAuthorization {
		.authorization_tab {
			width: 100%;
			height: 60px;
			background: #FFFFFF;
			padding-left: 33px;
			box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.08);
			border-radius: 4px;
		}
		.authorization_context {
			width: 100%;
			min-height: 700px;
			margin-top: 20px;
			.boxShadow(0, 0);
		}
	}
	/deep/.el-tabs__item {
		font-size: 16px;
		color: #333333;
		letter-spacing: 1.22px;
		line-height: 60px;
	}
	/deep/.is-active {
		font-size: 18px;
		color: #538BF1;
		letter-spacing: 1.38px;
	}
	/deep/.el-tabs__nav-wrap::after {
		height: 0;
	}
	/deep/.el-tabs__active-bar {
		height: 3px;
	}
	/deep/ .el-tabs__nav {
		height: 60px;
	}
	/deep/ .authorization_button {
		width: 100px;
		height: 40px;
		font-size: 14px;
		letter-spacing: 1.07px;
		cursor: pointer;
	}
	/deep/ .blue_button {
		color: #fff;
		background: #538BF1;
	}
	/deep/ .yellow_button {
		color: #fff;
		background: #EEB352;
	}
	/deep/ .white_button {
		color: #538BF1;
		background: #fff;
		border: 1px solid #538BF1;
		box-sizing: border-box;
	}
	/deep/ .float_left {
		float: left;
	}
	/deep/ .display_block {
		display: block;
	}
	/deep/ .float_right {
		float: right;
	}
</style>
