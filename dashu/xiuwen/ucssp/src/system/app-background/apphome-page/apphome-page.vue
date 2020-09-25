<template>
  <div class="person-config">
    <div class="tab-home">
      <el-tabs v-model="activeName" @tab-click="handleClick" class="tab">
        <el-tab-pane label="Banner" name="app-banner"></el-tab-pane>
        <el-tab-pane label="公司简介" name="company-profile"></el-tab-pane>
        <el-tab-pane label="信息保密说明" name="information-privacy"></el-tab-pane>
      </el-tabs>
    </div>
    <router-view/>
  </div>
</template>
<script>
export default {
  name: "apphome-page",
  data() {
    return {
      activeName: "app-banner"
    };
  },
  beforeRouteUpdate(to, from, next) {
    this.activeName = to.name;
    next();
  },
  created() {
    this.activeName = this.$route.name;
  },
  methods: {
    // 切换tabs
    handleClick(tab, event) {
      this.$router.push({ name: tab.name });
    }
  }
};
</script>
<style lang="less" scoped>
 /deep/.el-tabs__nav-wrap::after {
    background-color: transparent;
}
/deep/ .el-tabs__header{
      padding: 0;
    position: relative;
    margin: 0 0 15px;
    height: 60px;
    background: #fff;
}
/deep/ .el-tabs__nav-wrap {
  // -webkit-box-shadow: 1px 2px 20px #ccc;
  box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.08);
  padding-left: 30px;
  padding-top: 10px;
  border-radius: 4px;
  height: 60px;
}
/deep/ .el-tabs__nav-wrap .el-tabs__item.is-active {
  font-family: PingFangSC-Semibold;
  font-size: 18px;
  color: #538bf1;
  letter-spacing: 1.38px;
}
/deep/ .el-tabs__nav-wrap .el-tabs__item.is-active .el-tabs__item {
  font-family: PingFangSC-Regular;
  font-size: 16px;
  color: #333333;
  letter-spacing: 1.22px;
  text-align: center;
}
</style>
<style>
</style>
