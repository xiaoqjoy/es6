<template>
  <div class="fees-charged">
    <div class="tab-home" v-if="false">
      <el-tabs v-model="activeName" @tab-click="handleClick" class="tab">
        <el-tab-pane label="发起" name="fees-charged-sponsor"></el-tab-pane>
        <el-tab-pane label="复核" name="fees-charged-re-check"></el-tab-pane>
        <el-tab-pane label="完成" name="fees-charged-accomplish"></el-tab-pane>
        <!-- <el-tab-pane label="配置分组" name="config-group"></el-tab-pane> -->
      </el-tabs>
    </div>
    <div class="tab_view">
      <router-view/>
    </div>
  </div>
</template>
<script>
import "@system/adjust-accounts/counter-deal/css/myQuerySelect.less"; // 查询框样式
export default {
  name: "batch-fees-charged",
  data() {
    return {
      activeName: "batch-fees-charged"
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
// 公共样式
/deep/ .height_60 {
  height: 60px;
}
// 弹窗总box
/deep/ .drop_loan {
  .dialog-mask {
    z-index: 1000;
  }
  .dialog-box {
    // height: 780px;
    width: 1200px;
    padding: 0px;
    .dialog-box__top {
      margin: 0px;
    }
    .title_type {
      text-align: center;
      background: #fff;
      font-size: 18px;
      color: #000;
      letter-spacing: 1.3px;
      padding-left: 20px;
      font-weight: normal;
      font-family: PingFangSC-Regular;
    }
    .dialog-box__middle-form {
      // height: 720px;
      overflow-y: auto;
      // 中间内容区域
      .form__block {
        // height: 720px;
        padding: 20px 30px;
        box-shadow: 0 2px 6px 0 #d0d0d0;
      }
      // 按钮部分
      .form__bottom {
        left: 50%;
        padding-bottom: 30px;
        background-color: rgba(255, 255, 255);
        .add {
          width: 200px;
        }
      }
    }
  }
  /*表单区块*/
  .dialog-box__middle-form {
    .form__bottom {
      text-align: center;
      padding-bottom: 20px;
    }
  }
  // 弹窗下部分
  .complete-product {
    width: 100%;
    // height: 720px;
    // 表格
    .table_box {
        width: 100%;
        height: 630px;
        overflow: auto;
        .el-table__row {
          height: 60px;
        }
    }
    // 分页条
    .pagination {
      margin-top: 20px;
    }
  }
}
.fees-charged {
  width: 100%;
  height: 100%;
}
.tab_view {
  height: 100%;
  border-radius: 4px;
  background: #fff;
  box-shadow: 1px 2px 20px #ccc;
  overflow: auto;
  padding: 20px 30px;
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
// 发起
// 提示窗
/deep/ .hint {
      .import-message {
          .dialog-box {
              width: 340px;
              height: 170px;
              .dialog-msgbox__top {
              height:40px;
              .button__close {
              position: absolute;
              top: -5px;
              right: -5px;
              width: 42px;
              height: 42px;
              line-height: 42px;
              border-radius: 50%;
              font-size: 16px;
              text-align: center;
              color: #666;
              font-weight: 600;
              }
              }
              .text-center{
              font-family: PingFangSC-Regular;
              font-size: 14px;
              color: #333333;
              letter-spacing: 1.07px;
              text-align: center;
              }
              // 确认选择
              .affirm_select {
                  width: 100%;
                  display: flex;
                  justify-content: center;
                  margin-top: 40px;
                  .t_button {
                      width: 100px;
                      height: 40px;
                  }
                  .cancel_t { // 取消
                      background: #F8F8F8;
                      border: 1px solid #DDDDDD;
                      font-size: 14px;
                      color: #666;
                      letter-spacing: 1.07px;
                      text-align: center;
                  }
                  .affirm_t { // 确认
                      background: #538BF1;
                      font-size: 14px;
                      color: #ffffff;
                      letter-spacing: 1.07px;
                      text-align: center;
                  }
              }
          }
      }
  }
/deep/ .sponsor {
      width: 100%;
      height: 100%;
}
  // 新增按钮
  /deep/ .add {
      width: 100px;
      height: 40px;
      border: none;
      background: #538bf1;
      border-radius: 4px;
      color: #fff;
      display: block;
      cursor: pointer;
      // margin: 20px 30px;
  }
  // 查询这行的box
  /deep/ .serach_row {
      margin-top: 20px;
      // 输入框和下拉框172*40
      .select_72 {
          width: 160px;
          height: 40px;
          margin-right: 15px;
      }
      // 输入框和下拉框170*40
      .select_7 {
      width: 170px;
      height: 40px;
      margin-right: 15px;
      // padding-left: 15px;
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
      margin-left: 18px;
      }
      // 清空单独样式
      .empty {
      background: #ffffff;
      color: #538bf1;
      border: 1px solid #538bf1;
      }
  }
  // 表格
  /deep/ .table_box {
      width: 100%;
      height: 550px;
      margin-top: 21px;
      overflow: auto;
  }
  // page_box 分页
  /deep/ .page_box {
      width: 100%;
      margin-top: 40px;
  }
  // 删除和提交按钮
  /deep/ .delete_submit {
      width: 100%;
      display: flex;
      justify-content: center;
      margin-top: 30px;
      // 删除提交公共样式
      .t_button {
          width: 200px;
          height: 40px;
      }
      // 导入还款文件按钮样式
      .import_file {
          background: #EEB352;
          border-radius: 4px;
          font-family: PingFangSC-Regular;
          font-size: 14px;
          color: #FFFFFF;
          letter-spacing: 1.07px;
          text-align: center;
      }
      .dead_t {
          border: 1px solid #538bf1;
          font-size: 14px;
          color: #538bf1;
          letter-spacing: 1.07px;
          text-align: center;
      }
      .initiate_t {
          background: #538bf1;
          font-size: 14px;
          color: #ffffff;
          letter-spacing: 1.07px;
          text-align: center;
      }
  }
</style>
