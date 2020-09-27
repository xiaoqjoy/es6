<template>
  <div>
    <div class="import-message3">
      <div class="dialog-mask"></div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
    };
  },
  methods: {
  },
  mounted() {
    history.pushState(null, null, document.URL);
    window.addEventListener('popstate', function () {
      history.pushState(null, null, document.URL);
    });
  },
  created() {
    this.$confirm('提交成功, 请关闭页面', {
        showClose: false,
        showCancelButton: false,
        showConfirmButton: false,
        closeOnClickModal: false,
        closeOnPressEscape: false,
        type: "success"
      });
  }
};
</script>

<style lang="less" scoped>
.import-message3 {
  .dialog-mask {
    z-index: 1004;
    background: #999;
  }
  .dialog-box {
    z-index: 1005;
    width: 340px;
    height: 210px;
    .prompt{
      display:block;
      position: relative;
      top:50%;
      transform:translateY(-50%);
    }
  }
}
</style>
