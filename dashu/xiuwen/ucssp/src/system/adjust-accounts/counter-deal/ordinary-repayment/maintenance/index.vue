<template>
  <div class="maintenance">
    <div>
      <router-view/>
    </div>
  </div>
</template>
<script>
export default {
  name: "single-adjust"
};
</script>
<style lang="less" scoped>
.height100 {
    height: 100%;
  }
  .all_top{
    margin-top: -9px;
    margin-bottom: 14px;
    font-size: 14px!important;
  }
  .maintenance {
    width: 100%;
    height: 100%;
  }
  /deep/ .referEmptyDiv {
      display: inline-block;
      margin-left: 20px;
  }
  /deep/ .repayDateCss {
    width: 250px;
    margin-right: 15px;
    margin-bottom: 20px;
    /deep/ .el-range-input::-ms-clear{
          display: none;
      }
  }
  /* 日期选择 -- padding-left */
    /deep/ .el-input--prefix .el-input__inner {
        padding-left: 15px;
    }
    /* 表格的行高 */
    /deep/ .el-table--enable-row-transition .el-table__body td {
      height: 60px;
    }
    /deep/.upload-demo {
        .el-upload {
            .el-button {
                span {
                  margin-left: -5px;
                    background: none;
                    width: 50px;
                    height: 38px;
                    text-align: center;
                    font-family: PingFangSC-Regular;
                    font-size: 14px;
                    color: #538BF1;
                }
            }
        }
    }
  // 中间部分
  /deep/.content {
    height: 860px;
    border-radius: 4px;
    background: #fff;
    box-shadow: 1px 2px 20px #ccc;
    padding: 20px 30px;
    overflow: auto;
  }
  // 新增按钮
  /deep/.add {
    width: 100px;
    height: 40px;
    border: none;
    background: #538bf1;
    border-radius: 4px;
    color: #fff;
    display: block;
    cursor: pointer;
  }
  // 输入框和下拉框部分样式
  /deep/.b_content {
    text-align: left;
    // 输入框和下拉框162*40
    .select_72 {
      display: inline-block;
      width: 162px;
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
  /deep/.pagination {
    margin-top: 30px;
  }
  /deep/.enable {
    text-align: center;
    margin-top: 30px;
    // 停用启用公共样式
    .t_button {
      width: 200px;
      height: 40px;
    }
    // 查看扣款状态按钮样式
    .state_t {
        background: #05838E;
        font-size: 14px;
        color: #ffffff;
        letter-spacing: 1.07px;
        text-align: center;
    }
    // 删除按钮样式
    .dead_t {
        background: #EEB352;
        border-radius: 4px;
        font-size: 14px;
        color: #FFFFFF;
        letter-spacing: 1.07px;
        text-align: center;
    }
    // 文件导入按钮样式
    .upload_t {
        border: 1px solid #538bf1;
        font-size: 14px;
        color: #538bf1;
        letter-spacing: 1.07px;
        text-align: center;
    }
    // 提交按钮样式
    .initiate_t {
      background: #538bf1;
      font-size: 14px;
      color: #ffffff;
      letter-spacing: 1.07px;
      text-align: center;
    }
  }
  // 表格的box
  /deep/.table_box {
    width: 100%;
    height: 620px;
  }
</style>
