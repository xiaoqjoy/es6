<template>
  <div class="spare-index">
    <el-tabs v-model="activeName" @tab-click="handleClick" class="tab">
      <el-tab-pane label="待处理" name="spareSolving"></el-tab-pane>
      <el-tab-pane label="已处理" name="spareSolved"></el-tab-pane>
    </el-tabs>
    <router-view/>
  </div>
</template>
<script type="text/ecmascript-6">
export default {
  data() {
    return {
      activeName: "spareSolving"
    };
  },
  methods: {
    handleClick(tab, event) {
      let type = tab.index;
      switch (type) {
      case "1":
        this.$router.push({ name: "spareSolved" });
        break;
      case "2":
        this.$router.push({ name: "sparePassed" });
        break;
      default:
        this.$router.push({ name: "spareSolving" });
      }
    }
  },
  beforeRouteUpdate(to, from, next) {
    this.activeName = to.name;
    next();
  },
  created() {
    let type = this.$route.name;
    switch (type) {
    case "spareSolved":
      this.activeName = "spareSolved";
      break;
    case "sparePassed":
      this.activeName = "sparePassed";
      break;
    default:
      this.activeName = "spareSolving";
    }
  }
};
</script>
<style lang="less" rel="stylesheet/less" scoped>
  .spare-index {
    .tab {
      box-shadow: 0 2px 6px 0 rgba(0,0,0,0.08);
      border-radius: 4px;
      background: #fff;
      padding: 18px 30px 0 30px;
      /deep/ .el-tabs__header {
        margin-bottom: 0;
      }
    }
    /deep/ .table-area{
      min-height: 820px;
      overflow-y: auto;
      margin-top: 20px;
      padding: 20px;
      height: calc(100% - 77px);
      background: #fff;
      border-radius: 4px;
      box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.08);
    }
    /deep/.el-message-box--center .el-message-box__message {
      margin-bottom: 20px;
      font-size: 14px;
      color: #333333;
      letter-spacing: 1.07px;
      text-align: center;
    }
    /deep/.el-table {
      border: 0.5px solid #e5e5e5;
      border-right: 1px solid #e5e5e5;
    }
    /deep/.el-table__footer-wrapper, .el-table__header-wrapper {
      border-bottom: 1px solid #e5e5e5;
    }
    /deep/.el-table thead tr th {
      background: #F9FAFB !important;
      padding: 8px 0;
    }
    /deep/.el-table td, .el-table th.is-leaf {
      border: none;
    }
    /deep/.el-tabs__item.is-active {
      font-size: 18px;
      color: #538bf1;
      letter-spacing: 1.38px;
      text-align: center;
    }
    /deep/.el-tabs__item {
      font-size: 16px;
    }
    /deep/.el-tabs__nav-wrap::after{
      border: none;
      background: none;
    }
  }
</style>
