<template>
  <div class="system_non_page">
    <img :src="img" alt="" class="img">
  </div>
</template>
<script type="text/ecmascript-6">
  import { codeDependent } from '@common/js/localStorage';
  export default {
    data() {
      return {
        img: require('./systemImg.png')
      };
    },
    created() {
      this.$getCodeDependentApi()
        .then(data => {
          codeDependent.setCodeDependent(JSON.stringify(data));
        });
    }
  };
</script>
<style lang="less" rel="stylesheet/less" scoped>
  .system_non_page{
    background: #fff;
    background-clip: content-box;
    .img{
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      margin: auto;
      width: 320px
    }
  }
</style>
