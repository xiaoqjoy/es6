<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-07-03 16:20:54
 * @LastEditTime: 2019-08-09 14:36:39
 * @LastEditors: Please set LastEditors
 -->
<style lang="less" rel="stylesheet/less" scoped>
  .spare-index {
    padding-top: 200px;
    .tab {
      box-shadow: 0 2px 6px 0 rgba(0,0,0,0.08);
      border-radius: 4px;
      background: #fff;
      padding: 18px 30px 0 30px;
      margin-bottom: 20px;
    }
    /deep/ .contain {
      background: #fff;
      padding: 20px 31px;
      // margin-top: 20px;
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
        margin-bottom: 21px;
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
      }
      .finish {
        width: 200px;
      }
      .el-tabs__item.is-active {
        font-size: 18px;
        color: #538bf1;
        letter-spacing: 1.38px;
        text-align: center;
      }
      .el-tabs__item {
        font-size: 16px;
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
      button:hover {
        cursor: pointer;
      }
      .el-input__inner {
        // background: #ececec;
      }
    }
  }
</style>
<template>
  <div class="spare-index">
    <el-tabs v-model="activeName" @tab-click="handleClick" class="tab" v-if="isMarketing">
      <el-tab-pane label="团队" name="marketing-group"></el-tab-pane>
      <el-tab-pane label="个人" name="marketing-person"></el-tab-pane>
    </el-tabs>
    <el-tabs v-model="activeName" @tab-click="handleClickChannel" class="tab" v-if="isChannel">
      <el-tab-pane label="公司" name="organization-channel"></el-tab-pane>
      <el-tab-pane label="个人" name="personal-channel"></el-tab-pane>
    </el-tabs>
    <router-view/>

  </div>
</template>

<script type="text/ecmascript-6">
import { userInfo } from '@common/js/localStorage';
export default {
  data() {
    return {
      userInfo: JSON.parse(userInfo.getUserInfo()),
      activeName: "marketingGroup",
      isMarketing: false,
      isChannel: false
    };
  },
  methods: {
    handleClick(tab, event) {
      let type = tab.index;
      switch (type) {
      case "0":
        this.$router.push({ name: "marketing-group" });
        break;
      default:
        this.$router.push({ name: "marketing-person" });
      }
    },
    handleClickChannel(tab, event) {
      let type = tab.index;
      switch (type) {
      case "0":
        this.$router.push({ name: "organization-channel" });
        break;
      default:
        this.$router.push({ name: "personal-channel" });
      }
    },
    switchTab() {
      let type = this.$route.name;
      switch (type) {
      case "exclusive-channel":
        this.isChannel = false;
        this.isMarketing = false;
        break;
      case "marketing-group":
        this.isChannel = false;
        this.isMarketing = true;
        this.activeName = "marketing-group";
        break;
      case "marketing-person":
        this.isChannel = false;
        this.isMarketing = true;
        this.activeName = "marketing-person";
        break;
      case "personal-channel":
        this.isChannel = true;
        this.isMarketing = false;
        this.activeName = "personal-channel";
        break;
      case "organization-channel":
        this.isChannel = true;
        this.isMarketing = false;
        this.activeName = "organization-channel";
        break;
      case "marketers":
        this.isChannel = false;
        this.isMarketing = false;
        break;
      }
    }
  },
  mounted() {
    this.switchTab();
  },
  beforeUpdate() {
    this.switchTab();
  }
};
</script>
