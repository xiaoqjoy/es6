<template>
  <div class="counter-deal">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: "counter-deal",
  data() {
    return {};
  }
};
</script>
<style lang="less" scoped>
.counter-deal {
  width: 100%;
  height: 100%;
}
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
    // .tab {
    // }
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
  // .table-area {
  //   box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.08);
  //   border-radius: 4px;
  //   background: #fff;
  //   padding: 20px 31px;
  //   margin-top: 20px;
  //   position: relative;
  //   min-height: 728px;
  //   .search {
  //     margin-top: 15px;
  //     .el-input {
  //     }
  //     .el-button {
  //       &:nth-child(2) {
  //       }
  //     }
  //   }
  // }
  //表格样式
  .el-table {
    th {
      background-color: #f9fafb;
      color: #666;
    }
  }
  //分页样式
  .pagination {
    display: flex;
    .el-pagination {
      margin: 20px auto;
    }
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
    .el-dialog__body {
      //遮罩层的背景颜色
      background-color: @bg-light;

      //dialog左上角的字体图标样式
      .dialog-top-right {
        cursor: pointer;
        position: absolute;
        top: 20px;
        right: 50px;
      }
    }
  }
}
</style>
