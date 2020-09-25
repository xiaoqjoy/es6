<template>
  <div>
    <router-view/>
  </div>
</template>
<script>
export default {
  name: "withdraw"
};
</script>
<style lang="less" scoped>
// 日期控件的padding
/deep/.el-input--prefix .el-input__inner {
      padding-left: 15px;
    }
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
    margin-bottom: 20px;
  }
  // 输入框和下拉框部分样式
  /deep/.b_content {
    text-align: left;
    // 输入框和下拉框162*40
    .select_72 {
      width: 162px;
      height: 40px;
      margin-right: 15px;
    }
    .select_722 {
      width: 240px;
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
  margin-top: 20px;
  width: 100%;
  height: 555px;
  overflow: auto;
}
</style>
