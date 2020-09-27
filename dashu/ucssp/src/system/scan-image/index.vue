<template>
  <div class="scan-image common-style">

    <div class="tab-home">
      <el-tabs v-model="activeName" @tab-click="handleClick" class="tab">
        <el-tab-pane label="待处理" name="scan-image-undisposed"></el-tab-pane>
        <el-tab-pane label="已处理" name="scan-image-disposed"></el-tab-pane>
      </el-tabs>
    </div>
    <router-view/>
  </div>
</template>

<script>
// import { baseApi } from "./js/server.js";
export default {
  name: "scan-image",
  data() {
    return {
      activeName: "scan-image-undisposed",
      isRefresh: false, // 是否需要刷新
      total: 0 // 剩余面签数量
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
      this.$router.push({ name: tab.name });

      if (tab.name === 'face2face-undisposed') {
        // 获取剩余面签数量
        this.getTotal();
      }
    }
  }
};
</script>

<style lang="less">
.scan-image {
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
  .el-form-item{
    display: inline-block;
    // margin-right: 40px;
    font-size: 0;
    .el-radio-button__inner{
      padding: 12px;
    }
    .el-select, .el-cascader, .el-autocomplete, .el-date-editor{
      width: 100%;
    }
  }
  .el-form-item_width(@width){
    display: inline-block;
    margin-right: 0;
    padding-right: 40px;
    width: @width + '%';
    .el-select{
      width: 100%;
    }
    .el-date-editor.el-input, .el-date-editor.el-input__inner{
      width: 100%;
    }
  }
  .el-form-item__50{
    display: inline-block;
    margin-right: 0;
    padding-right: 40px;
    width: 50%;
    .el-select{
      width: 100%;
    }
    .el-date-editor.el-input, .el-date-editor.el-input__inner{
      width: 100%;
    }
  }
  .el-form-item__33{
    display: inline-block;
    margin-right: 0;
    padding-right: 40px;
    width: 33.3%;
    .el-select{
      width: 100%;
    }
    .el-date-editor.el-input, .el-date-editor.el-input__inner{
      width: 100%;
    }
  }
  .el-form-item__25{
    display: inline-block;
    margin-right: 0;
    padding-right: 40px;
    width: 25%;
    .el-select{
      width: 100%;
    }
    .el-date-editor.el-input, .el-date-editor.el-input__inner{
      width: 100%;
    }
  }

}
</style>

<style lang="less" scoped>
.scan-image {
  .tab-home {

  }
}
</style>
