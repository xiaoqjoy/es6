<template>
  <div class="oper-config">
    <div class="tab-home">
      <el-tabs v-model="activeName" @tab-click="handleClick" class="tab">
        <el-tab-pane label="补件原因配置" name="reason-config"></el-tab-pane>
        <el-tab-pane label="调查原因配置" name="cause-allocation"></el-tab-pane>
        <el-tab-pane label="电核勾选配置" name="check-config"></el-tab-pane>
        <el-tab-pane label="否决原因配置" name="veto-allocation"></el-tab-pane>
        <el-tab-pane label="退回原因配置" name="back-allocation"></el-tab-pane>
      </el-tabs>
    </div>
    <router-view ref='item'/>
  </div>
</template>
<script>
export default {
  name: "oper-config",
  data() {
    return {
      activeName: "reason-config",
      routerName: ""
    };
  },
  beforeRouteUpdate(to, from, next) {
    console.log(to, from);
    this.activeName = to.name;
    next();
  },
  created() {
    this.activeName = this.$route.name;
  },
  methods: {
    // 切换tabs
    handleClick(tab, event) {
      // this.$refs.item.isChange();
      // this.routerName = tab.name;
      this.$router.push({ name: tab.name });
    }
    // jumpRouter() {
    //   this.$router.push({ name: this.routerName });
    // }
  }
};
</script>

<style lang="less" scoped>
.tab {
  display: none;
}
/deep/ .el-tabs__nav-wrap {
  -webkit-box-shadow: 1px 2px 20px #ccc;
  box-shadow: 1px 2px 20px #ccc;
  padding-left: 30px;
  padding-top: 10px;
  border-radius: 4px;
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
