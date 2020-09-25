<template>
  <div class="loan-derating">
    <div class="tab-home">
      <el-tabs v-model="activeName" @tab-click="handleClick" class="ata">
        <el-tab-pane label="待处理业务" name="derating-approving"></el-tab-pane>
        <el-tab-pane label="已处理业务" name="derating-disposed"></el-tab-pane>
      </el-tabs>
    </div>
    <router-view/>
  </div>
</template>
<script>
export default {
  name: "loan-derating",
  data() {
    return {
      activeName: "insurance-approving"
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
/* 表头部分样式 */
/deep/ .el-tabs__nav-wrap {
  -webkit-box-shadow: 1px 2px 20px #ccc;
  padding-left: 30px;
  padding-top: 10px;
  border-radius: 4px;
  background: #ffffff;
  box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.08);
}
/deep/ .el-tabs__nav-wrap .el-tabs__item {
  height: 50px;
}
/deep/ .el-tabs__nav-wrap .el-tabs__item.is-active {
  font-size: 18px;
  color: #538bf1;
  letter-spacing: 1.38px;
}
/deep/ .el-tabs__nav-wrap .el-tabs__item.is-active .el-tabs__item {
  font-size: 16px;
  color: #333333;
  letter-spacing: 1.22px;
  text-align: center;
}
/deep/ .el-tabs__nav-wrap .el-tabs__active-bar {
  bottom: 2px;
}
.loan-derating {
  min-height: 100%;
  height: 100%;
}
</style>
