<template>
  <div class="anti-fraud-index">
    <el-tabs v-model="activeName" class="ata" @tab-click="handleClick">
      <el-tab-pane label="关注名单管理" name="watch-list-management"></el-tab-pane>
      <el-tab-pane label="公司黑名单管理" name="blacklist-management"></el-tab-pane>
      <el-tab-pane label="客户经理黑名单管理" name="customer-manager-blacklist-management"></el-tab-pane>
      <el-tab-pane label="渠道黑名单管理" name="channel-blacklist-management"></el-tab-pane>
    </el-tabs>
    <router-view/>
  </div>
</template>
<script type="text/ecmascript-6">
export default {
  name: "anti-fraud",
  data() {
    return {
      activeName: "watch-list-management"
    };
  },
  beforeRouteUpdate(to, from, next) {
    this.activeName = to.name;
    next();
  },
  methods: {
    handleClick(tab, event) {
      let type = tab.index;
      // console.log(type);
      switch (type) {
        case "0":
          this.$router.push({ name: "watch-list-management" });
          break;
        case "1":
          this.$router.push({ name: "blacklist-management" });
          break;
        case "2":
          this.$router.push({ name: "customer-manager-blacklist-management" });
          break;
        case "3":
          this.$router.push({ name: "channel-blacklist-management" });
      }
      if (type === "0") {
        this.$store.dispatch("set_customertype", String(Number(type) + 2));
      } else {
        this.$store.dispatch("set_customertype", String(Number(type) + 3));
      }
    }
  },
  created() {
    this.activeName = this.$route.name;
  }
};
</script>
<style lang="less" rel="stylesheet/less" scoped>
// 反欺诈系统黑名单主页面的公共样式
.anti-fraud-index {
  text-align: center;
  padding-top: 200px;
  // 中间部分
  .content {
    min-height: 620px;
    border-radius: 4px;
    background: #fff;
    box-shadow: 1px 2px 20px #ccc;
    overflow: hidden;
    // 新增按钮
    .add {
      width: 100px;
      height: 40px;
      border: none;
      background: #538bf1;
      border-radius: 4px;
      color: #fff;
      display: block;
      cursor: pointer;
      margin: 20px 30px;
    }
    // 输入框和下拉框部分样式
    .b_content {
      text-align: left;
      height: 40px;
      margin-left: 28px;
      // 输入框和下拉框120*40
      .select_2 {
        width: 120px;
        height: 40px;
        margin-right: 15px;
      }
      // 输入框和下拉框140*40
      .select_4 {
        width: 140px;
        height: 40px;
        margin-right: 15px;
      }
      // 查询页面上关注名单时间特殊样式
      .select_s {
        width: 160px;
      }
      // 输入框和下拉框
      .select_8 {
        width: 80px;
        height: 40px;
        margin-right: 15px;
      }
      // 查询和清空的公有样式
      .b_button {
        width: 100px;
        height: 40px;
        border-radius: 4px;
        font-size: 14px;
      }
      // 查询单独样式
      .query {
        background: #538bf1;
        color: #ffffff;
      }
      // 清空单独样式
      .empty {
        background: #ffffff;
        color: #538bf1;
        border: 1px solid #538bf1;
      }
    }
    // 表格总体样式
    .tables {
      overflow-y: auto;
      overflow-x: hidden;
      height: 400px;
      width: 1622px;
      margin: 0px auto;
      border: 1px solid #e5e5e5;
      margin-top: 21px;
      border-radius: 4px;
    }
    // 全选按钮样式
    .b_check {
      margin-left: -1571px;
      margin-top: 25px;
    }
    // 去掉element表格的默认全选按钮
    .tables /deep/ th .el-checkbox {
      display: none;
    }
  }
  // 底部的样式
  .bottom {
    // 批量导入/批量失效/导出excel单独样式
    .b_bottom {
      width: 200px;
      margin-top: 40px;
      font-family: PingFangSC-Regular;
      color: #ffffff;
      font-size: 14px;
    }
    // 批量导入单独样式
    .color {
      background: #05838e;
    }
    // 批量失效单独样式
    .color_1 {
      background: #eeb352;
    }
  }
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
</style>

<style>
/* 文本居中 */
.text-center {
  text-align: center;
}
/* 文本靠左 */
.text-left {
  text-align: left;
}
/* 文本靠右 */
.text-right {
  text-align: right;
}
</style>
