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
		border: 1px solid #E5E5E5;
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
	}
</style>
