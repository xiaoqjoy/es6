<template>
  <div class="system">
    <top></top>
    <div class="middle">
      <side-bar class="side bg__white"></side-bar>
      <router-view class="content" id="system"></router-view>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import top from "@components/top/index";
import sideBar from "@components/sidebar/index";
// import bottom from "@components/bottom/index";
export default {
  data() {
    return {};
  },
  created() {
    // setInterval(() => {
    //   console.log(localStorage.getItem("sMacAddr"), window.sMacAddr);
    // }, 2000);
  },
  components: {
    top,
    sideBar
    // bottom
  }
};
</script>

<style lang="less" rel="stylesheet/less" scoped>
.system {
  height: 100%;
  .middle {
    position: relative;
    padding-left: 200px;
    height: calc(100% - 60px);
    .side {
      position: absolute;
      left: 0;
      top: 0;
      height: 100%;
    }
    .content {
      /*position: relative;*/ /*ie下影响弹出框蒙层*/
      height: 100%;
      width: 100%;
      padding: 20px;
      overflow-y: auto;
    }
  }
}
</style>
