<template>
  <div class="bottom">我是底部</div>
</template>
<script type="text/ecmascript-6">
  export default{
    data() {
      return {};
    }
  };
</script>
<style>
  .bottom{
    position: fixed;
    bottom: 0;
    left: 200px;
    right: 0;
    height: 50px;
    line-height: 50px;
    font-size: 18px;
    color: #000;
    border: 1px solid #666;
    text-align: center;
  }
</style>
