<template>
  <div class="split-repayment">
    <div class="tab-home" v-if="false">
      <el-tabs v-model="activeName" @tab-click="handleClick" class="tab">
        <el-tab-pane label="发起" name="batch-split-sponsor"></el-tab-pane>
        <el-tab-pane label="复核" name="batch-split-re-check"></el-tab-pane>
        <el-tab-pane label="完成" name="batch-split-accomplish"></el-tab-pane>
        <!-- <el-tab-pane label="配置分组" name="config-group"></el-tab-pane> -->
      </el-tabs>
    </div>
    <div class="tab_view">
      <router-view/>
    </div>
  </div>
</template>
<script>
export default {
  name: "batch-split-repayment",
  data() {
    return {
      activeName: "batch-split-repayment"
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
      // console.log(tab.name, event)
      this.$router.push({ name: tab.name });
    }
  }
};
</script>

<style lang="less" scoped>
.tab_view {
  height: 100%;
  border-radius: 4px;
  background: #fff;
  box-shadow: 1px 2px 20px #ccc;
  padding: 20px 30px;
}
.split-repayment {
  width: 100%;
  height: 100%;
}
.tab-home {
  padding-top: 0;
}
.tab {
  height: 60px;
  line-height: 60px;
}
/* 反欺诈系统表头部分样式 */
/deep/ .el-tabs__nav-wrap {
  -webkit-box-shadow: 1px 2px 20px #ccc;
  box-shadow: 1px 2px 20px #ccc;
  padding-left: 30px;
  // padding-top: 10px;
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
<style>
</style>
