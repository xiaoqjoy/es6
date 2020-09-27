<template>
  <div>
    <div class="dialog-mask"></div>
    <div class="dialog-box">
      <div class="dialog-box__top">
        <h5 class="title">提示</h5>
        <span class="el-icon-close button button__close" @click="$emit('close')"></span>
      </div>
      <div class="content">未有打印记录，是否继续提交？</div>
      <div class="dialog-box-fd">
        <el-button type="primary" size="small" @click="submitFn">继续提交</el-button>
        <el-button size="small" @click="close_">暂不提交</el-button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ['postData', 'postCb', 'refresh'],
  methods: {
    submitFn() {
      this.postCb(this.postData);
      this.close_();
    },
    close_ABC() {
      this.$emit("close_ABC");
    },
    close_() {
      this.$emit("close");
    }
  }
};
</script>
<style lang="less" scoped>
.dialog-box {
  width: 340px;
}
.content {
  margin-top: 20px;
}
.dialog-box-fd {
  margin-top: 20px;
}
</style>
