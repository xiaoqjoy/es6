<template>
  <div class="business-query-index">
    <el-tabs v-model="activeName" class="ata" @tab-click="handleClick" >
      <el-tab-pane label="已完成业务查询" name="completed-query"></el-tab-pane>
      <el-tab-pane label="在途业务查询" name="business-inquiry"></el-tab-pane>
    </el-tabs>
    <router-view/>
  </div>
</template>
<script type="text/ecmascript-6">
export default {
  data() {
    return {
      activeName: "completed-query"
    };
  },
  beforeRouteUpdate(to, from, next) {
    this.activeName = to.name;
    next();
  },
  methods: {
    handleClick(tab, event) {
      this.$router.push({ name: tab.name });
    }
  },
  created() {
    this.activeName = this.$route.name;
  }
};
</script>
<style lang="less" rel="stylesheet/less" scoped>
.ata {
  display: none;
}
/* 反欺诈系统表头部分样式 */
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
/deep/ .threedataNowday {
  .dialog-box {
    .new_box {
      text-align: center;
    }
  }
}
</style>
