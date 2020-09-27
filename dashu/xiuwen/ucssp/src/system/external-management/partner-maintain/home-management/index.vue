<template>
  <div class="home-management">
    <div class="tab-home">
      <el-tabs v-model="activeName" @tab-click="handleClick" class="tab">
        <el-tab-pane label="海报" name="poster"></el-tab-pane>
        <el-tab-pane label="公告" name="notice"></el-tab-pane>
        <!-- <el-tab-pane label="配置分组" name="config-group"></el-tab-pane> -->
      </el-tabs>
    </div>
    <router-view/>
  </div>
</template>
<script>
export default {
  name: "home-management",
  data() {
    return {
      activeName: "poster"
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

<style lang="less">
// .person-config {
// }
</style>

<style lang="less" scoped>
/deep/.el-tabs__nav-wrap::after {
      background-color: transparent;
  }
/deep/ .el-tabs__nav-wrap {
  -webkit-box-shadow: 1px 2px 20px #fff;
  box-shadow: 0 2px 6px 0  #ccc;
  padding-left: 30px;
  padding-top: 10px;
  border-radius: 4px;
  background: #FFFFFF;
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
