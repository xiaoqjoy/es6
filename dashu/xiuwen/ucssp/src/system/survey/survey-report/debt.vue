<template>
<div>
    <div class="dialog-mask"></div>
    <!-- <h5 class="title bg__white">新增资产信息</h5>
    <div class="assets"> -->
    <div class="dialog-box">
      <div class="dialog-box__top">
        <h5 class="title bg__white">隐藏负债</h5>
        <span class="el-icon-close button button__close" @click="close"></span>
      </div>
      <div class="dialog-box__middle">
          <el-form-item label="债权方性质" prop="creditorNature">
            <el-input maxlength="2"></el-input>
          </el-form-item>

          <el-form-item label="贷款性质" prop="loanNature">
            <el-input maxlength="2"></el-input>
          </el-form-item>

          <el-form-item label="债权方" prop="creditor">
            <el-input maxlength="50" v-model="svyStaffReport.creditor" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="利率%（年化）" prop="rate">
            <el-input @keyup.native="limitMoney(svyStaffReport.rate)" maxlength="7" v-model="svyStaffReport.rate"></el-input>
          </el-form-item>

          <el-form-item label="贷款期数" prop="loanTime">
            <el-input @keyup.native="limitNumber(svyStaffReport.loanTime)" maxlength="2" v-model="svyStaffReport.loanTime"></el-input>
          </el-form-item>
          <el-form-item label="贷款金额" prop="loanMoney">
            <el-input @keyup.native="limitMoney(svyStaffReport.loanMoney)" maxlength="7" v-model="svyStaffReport.loanMoney"></el-input>
          </el-form-item>
          <el-form-item label="余额" prop="balance">
            <el-input @keyup.native="limitMoney(svyStaffReport.balance)" maxlength="7" v-model="svyStaffReport.balance"></el-input>
          </el-form-item>
          <el-form-item label="贷款用途" prop="loanUse">
            <el-input maxlength="200" v-model="svyStaffReport.loanUse" placeholder="请输入"></el-input>
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
    props: ['svyStaffReport'],
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
