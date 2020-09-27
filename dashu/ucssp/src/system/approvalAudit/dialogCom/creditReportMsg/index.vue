<template>
  <div>
    <div class="box">
      <div class="title">征信报告</div>
      <iframe :src="url" frameborder="0" scrolling="yes" :width="800" :height="800"></iframe>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        url: this.$route.query.url
      };
    }
  };
</script>

<style lang="less" scoped>
.box{
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  background: #fff;
  left: 0;
  z-index: 1002;
  .title{
    font-size: 14px;
    height: 40px;
    line-height: 40px;
    text-align:center;
    background-color: #f5f5f5;
  }
}
</style>
