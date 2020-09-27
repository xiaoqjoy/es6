<template>
  <div class="manager common-style">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: "manager",
  data() {
    return {};
  }
};
</script>

<style lang="less">
.manager {
    //二级路由的导航样式
  .tab-home {
    box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.08);
    border-radius: 4px;
    background: #fff;
    padding: 18px 30px 0 30px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .tab {
    }
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

  //二级导航的内容样式
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

  .search {
    margin-top: 15px;
    .el-input {
    }
    .el-button {
    }
  }

  //表格样式
  .el-table {
    th {
      background-color: #ececec;
      color: #666;
    }
  }

  //分页样式
  .pagination-page {
    padding: 20px 0;
  }

  //遮罩层的公共样式
  .el-dialog {
    .el-dialog__body {
      //遮罩层的背景颜色
      background-color: @bg-light;
      text-align: left; //el-dialog的内容在IE11中默认居中，需要设置

      //dialog左上角的字体图标样式
      .dialog-top-right {
        cursor: pointer;
        position: absolute;
        top: 20px;
        right: 50px;
      }
    }
  }

  //遮罩层底部按钮
  .submit-btn {
    display: flex;
    justify-content: center;
    padding-top: 40px;
    .el-button {
    }
  }

  //表单内联样式
  .el-form-item {
    display: inline-block;
    // margin-right: 40px;
    font-size: 0;
    .el-radio-button__inner {
      padding: 12px;
    }
    .el-select,
    .el-cascader,
    .el-autocomplete,
    .el-date-editor {
      width: 100%;
    }
  }
}
</style>

<style lang="less" scoped>
.account {
}
</style>
