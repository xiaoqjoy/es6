<template>
<div>
    <div class="dialog-mask"></div>
    <div class="dialog-box">
      <div class="dialog-box__top">
        <h5 class="title bg__white">隐藏负债</h5>
        <span class="el-icon-close button button__close" @click="close"></span>
      </div>
      <div class="dialog-box__middle">
          <el-form-item label="营业额验证" prop="" class="width245">
            <el-select placeholder="请选择">
            </el-select>
          </el-form-item>
         <el-form-item label="计算过程" prop="purposeDesc" class="width530">
            <el-input v-model="svyBossReport.purposeDesc" placeholder="请填写" maxlength="200"></el-input>
         </el-form-item>
         <el-form-item label="营业额结果" prop="purposeDesc">
            <el-input v-model="svyBossReport.purposeDesc" placeholder="请填写"></el-input>
         </el-form-item>
         <el-form-item label="财务数据异常描述" prop="purposeDesc" class="width815">
            <el-input v-model="svyBossReport.purposeDesc" placeholder="请填写"></el-input>
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
    props: ['svyBossReport'],
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
