<template>
<div>
    <div class="dialog-mask"></div>

    <!-- <h5 class="title bg__white">新增资产信息</h5>
    <div class="assets"> -->
    <div class="dialog-box">
      <div class="dialog-box__top">
        <h5 class="title bg__white">房产基本信息</h5>
        <span class="el-icon-close button button__close" @click="close"></span>
      </div>
      <div class="dialog-box__middle">
        <el-form-item label="资产类型" prop="assetsType">
            <el-input maxlength="2"></el-input>
        </el-form-item>

        <el-form-item label="购买价值" prop="jobLimit">
            <el-input maxlength="2"></el-input>
        </el-form-item>

        <el-form-item label="资产现值" prop="jobLimit">
            <el-input maxlength="2"></el-input>
        </el-form-item>
        <el-form-item label="资产权属" prop="jobLimit">
            <el-input maxlength="2"></el-input>
        </el-form-item>

        <el-form-item label="房产面积" prop="jobLimit">
            <el-input maxlength="2"></el-input>
        </el-form-item>

        <el-form-item label="本地/外地房产" prop="jobLimit">
            <el-input maxlength="2"></el-input>
        </el-form-item>

        <el-form-item label="房产地址/车辆品牌" prop="jobLimit">
            <el-input maxlength="50"></el-input>
        </el-form-item>

        <div class="btn_group">
			<el-button type="warning" style="width:140px" @click="save">保存</el-button>
			<el-button type="primary" style="width:140px" @click="cancel">取消</el-button>
		</div>

      </div>
    </div>
</div>
</template>
<script>
export default {
    data() {
        return {

        };
    },
    created() {

    },
    methods: {
        close() {
            this.$emit('closeMessageBox');
        },
        cancel() {
            this.$emit('closeMessageBox');
        },
        save() {

        }
    }
};
</script>
<style lang="less" rel="stylesheet/less" scoped>
</style>
