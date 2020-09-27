<template>
  <div class="account">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: "account",
  data() {
    return {};
  }
};
</script>
<style lang="less" rel="stylesheet/less">
.account {
  .el-table__empty-text {
    width: auto;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
  }
  .search {
    .el-form-item {
      &.dateRange {
        .el-range-separator {
          width: 8%;
        }
      }
    }
  }
}
</style>
<style lang="less" rel="stylesheet/less" scoped>
.account {
  //二级路由的导航样式
  .tab-home {
    box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.08);
    border-radius: 4px;
    background: #fff;
    padding: 18px 30px 0 30px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .el-tabs__header {
      margin-bottom: 0;
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
  }
  //二级路由的内容样式
  .table-area {
    box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.08);
    border-radius: 4px;
    background: #fff;
    padding: 20px 31px;
    margin-top: 20px;
    position: relative;
    min-height: 728px;
    .search {
      margin-top: 15px;
      .el-input {
      }
      .el-button {
        &:nth-child(2) {
        }
      }
    }
  }
  .tables {
    min-height: 400px;
  }
  //分页样式
  .pagination {
    margin-right: 30px;
    margin-top: 40px;
  }

  //表格底部笔数金额样式
  .moneyInfo {
    margin-top: 20px;
    span {
      &:nth-child(1),
      &:nth-child(4) {
        color: #666;
      }
      &:nth-child(3),
      &:nth-child(6) {
        color: #333;
      }
      &:nth-child(4) {
        margin-left: 20px;
      }
    }
  }

  //遮罩层的公共样式
  .el-dialog {
    height: 688px;
    .el-dialog__header {
      background: #ffffff;
      box-shadow: 0 1px 10px 0 rgba(0, 0, 0, 0.05);
    }
    .el-dialog__body {
      //遮罩层的背景颜色
      // background-color: @bg-light;
      // background-color: #FFFFFF;
      //dialog左上角的字体图标样式
      .dialog-top-right {
        cursor: pointer;
        position: absolute;
        top: 20px;
        right: 50px;
      }
    }
  }
  //底部按钮
  .el-footer {
    position: absolute;
    width: calc(100% - 40px);
    bottom: 60px;
    text-align: center;
    .el-button {
      width: 200px;
      height: 40px;
    }
    .el-button.el-button--default {
      border: 1px solid #538bf1;
      color: #538bf1;
    }
  }

  // 提示框样式
  .el-message-box {
    width: 340px;
    height: 170px;
    .el-message-box__message {
      p {
        width: 236px;
        height: 20px;
        margin-top: 20px;
        margin-bottom: 20px;
      }
    }
    .el-message-box__status {
      display: none;
    }
  }
  // 新增邮箱下拉框
  .el-select-dropdown {
    .el-input {
      margin: 12px 20px;
    }
    .add-select-title {
      width: 260px;
      padding: 0 20px;
      span {
        font-family: PingFangSC-Regular;
        font-size: 12px;
        color: #666;
        letter-spacing: 0;
        text-align: center;
        height: 40px;
        line-height: 40px;
      }
    }
  }
  .el-table th {
    padding: 8px 0;
  }
  .file {
    opacity: 0.01;
    position: absolute;
    cursor: pointer;
    height: 100%;
    width: 42px;
    right: 0;
    z-index: 1;
  }
  .el-textarea__inner {
    width: 217px;
  }
  // select多选样式
  .bankCard {
    .el-tag {
      display: none;
      &:first-child {
        display: block;
      }
    }
    .el-tag__close {
      display: none;
    }
  }
}
</style>
