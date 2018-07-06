<template>
  <div class="sugarWarningBox">
    <el-dialog
    title="血糖预警"
    :visible.sync="dialogVisible"
    width="30%"
    center
    :close-on-click-modal="false"
    :before-close="handleClose">
        <div class="warningBtnBox"><span class="warningBtn floatRight">血糖预警设置</span></div>
        <div class="warningContent tac">您有<span class="colorRed">1</span>位病人出现血糖异常记录</div>
        <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="dialogVisible = false">查看</el-button>
        </span>
    </el-dialog>
  </div>
</template>
<style scoped lang="less">
    .sugarWarningBox {
        width: 100%;
        height: 100%;
    }
</style>
<style lang="less">
    .sugarWarningBox .el-dialog {
        width:310px !important;
        height: 270px;
        position: absolute;
        border-radius: 10px;
        top:50%;
        left:50%;
        margin:0 !important;
        transform: translate(-50%, -50%);
    }
    .sugarWarningBox .el-dialog__header {
      text-align: left;
      border-bottom: 1px solid #E0E0E0;
    }
    .sugarWarningBox .warningBtnBox{
      width: 100%;
      height: 30px;
      margin-bottom: 30px;
    }
    .sugarWarningBox .warningBtnBox .warningBtn{
      height: 30px;
      line-height: 30px;
      border: 1px solid #e0e0e0;
      padding: 0 10px;
      border-radius: 5px;
    }
    .sugarWarningBox .el-button{
      padding: 12px 40px;
    }
</style>

<script>
  export default {
    name: 'sugarWarning',
    data () {
      return {
          dialogVisible: false
      }
    },
    methods: {
      handleClose() {
        this.dialogVisible = false;
      }
    }
  }
</script>