<template>
  <div class="single-advance-money">
    <div class="tab-home">
      <el-tabs v-model="activeName" @tab-click="handleClick" class="tab">
        <el-tab-pane label="发起" name="single-advance-money-sponsor"></el-tab-pane>
        <el-tab-pane label="复核" name="single-advance-money-re-check"></el-tab-pane>
        <el-tab-pane label="完成" name="single-advance-money-accomplish"></el-tab-pane>
      </el-tabs>
    </div>
    <router-view/>
  </div>
</template>
<script>
export default {
  name: "single-advance-money",
  data() {
    return {
      activeName: "single-advance-money-sponsor"
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
.tab {
  display: none
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
