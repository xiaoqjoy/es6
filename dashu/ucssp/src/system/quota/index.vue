<template>
  <div class="quota-index contain">
    <el-tabs v-model="activeName" class="tab" @tab-click="handleClick" >
      <el-tab-pane label="机构额度" name="quota-list"></el-tab-pane>
      <el-tab-pane label="分公司额度配置" name="quota-configuration"></el-tab-pane>
      <el-tab-pane label="分公司额度查询" name="quota-inquire"></el-tab-pane>
      <el-tab-pane label="额度预警" name="quota-earlywarning"></el-tab-pane>
      <el-tab-pane label="机构优先级" name="quota-priority"></el-tab-pane>
    </el-tabs>
    <router-view/>
  </div>
</template>

<script type="text/ecmascript-6">
    export default {
    data() {
      return {
        activeName: 'quota-list'
      };
    },
    methods: {
      handleClick(tab, event) {
        let type = tab.index;
        switch (type) {
        case "0":
          this.$router.push({ name: "quota-list" });
          break;
        case "1":
          this.$router.push({ name: "quota-configuration" });
          break;
        case "2":
          this.$router.push({ name: "quota-inquire" });
          break;
        case "3":
          this.$router.push({ name: "quota-earlywarning" });
          break;
        case "4":
          this.$router.push({ name: "quota-priority" });
          break;
        default:
          this.$router.push({ name: "quota-list" });
        }
      }
    },
    created() {
      let type = this.$route.name;
      switch (type) {
      case "quota-list":
        this.activeName = "quota-list";
        break;
      case "quota-configuration":
        this.activeName = "quota-configuration";
        break;
      case "quota-inquire":
        this.activeName = "quota-inquire";
        break;
      case "quota-earlywarning":
        this.activeName = "quota-earlywarning";
        break;
      case "quota-priority":
        this.activeName = "quota-priority";
        break;
      }
    }
  };
</script>

<style lang="less" rel="stylesheet/less" scoped>
  .quota-index {
    padding-top: 200px;
    .tab {
      box-shadow: 0 2px 6px 0 rgba(0,0,0,0.08);
      border-radius: 4px;
      background: #fff;
      padding: 0px 30px 0 30px;
    }
    // tab标题栏
    /deep/ .el-tabs__item.is-active {
        font-size: 18px!important;
        color: #538bf1;
        letter-spacing: 1.38px;
        text-align: center;
      }
    /deep/ .el-tabs__item {
        font-size: 16px!important;
        height: 60px!important;
        line-height: 60px!important;
      }
      // 底部灰线去掉
    /deep/ .el-tabs__nav-wrap::after{
      background-color: transparent;
    }
    /deep/ .el-tabs__header{
      margin: 0 0 0px;
    }
    /deep/ .contain {
      background: #fff;
      padding: 20px 31px;
      margin-top: 20px;
      position: relative;
      box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.08);
      .el-tabs__header {
        margin-bottom: 0;
      }
      .el-message-box--center .el-message-box__message {
        margin-bottom: 20px;
        font-size: 14px;
        color: #333333;
        letter-spacing: 1.07px;
        text-align: center;
      }
      .demo-form-inline  {
        // padding-top: 20px;
        // margin-bottom: 21px;
      }
      .el-message-box__btns button {
        width: 100px;
        height: 40px;
        background: #F8F8F8;
        border: 1px solid #DDDDDD;
      }
      .el-message-box__btns button:nth-child(2) {
        background: #538BF1;
        border: none;
      }
      .el-table {
        border: 1px solid #d0d0d0;
        border-right: 1px solid #d0d0d0;
      }
      .el-table__footer-wrapper, .el-table__header-wrapper {
        border-bottom: 1px solid #d0d0d0;
      }
      .el-table thead tr th {
        background: #ececec !important;
        padding: 8px 0;
      }
      .el-table td, .el-table th.is-leaf {
        border: none;
      }
      .add {
        width: 100px;
        height: 40px;
        border: none;
        background: #538bf1;
        border-radius: 4px;
        color: #fff;
        margin-bottom: 21px;
        margin-right: 15px;
      }
      .finish {
        width: 200px;
      }
      // .el-tabs__item.is-active {
      //   font-size: 18px;
      //   color: #538bf1;
      //   letter-spacing: 1.38px;
      //   text-align: center;
      // }
      // .el-tabs__item {
      //   font-size: 16px;
      // }
      .el-form--inline .el-form-item {
        position: relative;
      }
      .el-form--inline .el-form-item__label {
        position: absolute;
        top: -18px;
        left: 4px;
      }
      .btn-area {
        display: block;
        text-align: center;
        position: absolute;
        bottom: 0;
        left: 50%;
        margin-left: -215px;
      }
      .bottom-btn {
        width: 200px;
        height: 40px;
        background: #EEB352;
        color: #fff;
        margin-bottom: 40px;
      }
      .next {
        background: #538BF1;
        margin-left: 31px;
      }
      .check, .check:hover {
        margin-bottom: 0;
      }
      .clear, .clear:hover {
        border: 1px solid #538BF1;
        background: #fff;
        color: #538BF1;
      }
    }
  }
</style>
