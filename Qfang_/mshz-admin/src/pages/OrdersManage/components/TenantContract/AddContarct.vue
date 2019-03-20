<template>
  <el-dialog :title="title" append-to-body :visible.sync='show' :close-on-click-modal="false" width="660px">
    <div class="dialog-box down-app-div">
      <h4>请至租房邦管家APP续签合同</h4>
      <img src="../../../../../static/img/mshzAppQRcode.jpg" alt="">
      <p>手机扫一扫二维码下载APP</p>
    </div>
  </el-dialog>
</template>
<script>
export default {
  data() {
    return {
    };
  },
  props: {
    value: Boolean,
    title: String
  },
  computed: {
    show: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit('input', val);
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.down-app-div {
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  background: #eeeeee;
  h4 {
    font-size: 24px;
  }
  img {
    width: 350px;
    height: 350px;
    margin: 25px 0;
  }
  p {
    font-size: 18px;
  }
}

.dialog-box >>> .el-col .el-form-item--mini .el-form-item__content {
  line-height: 30px !important;
  height: 30px !important;
}
</style>
