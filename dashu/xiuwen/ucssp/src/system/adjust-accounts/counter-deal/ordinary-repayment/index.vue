<template>
  <div class="ordinary-repayment">
    <router-view/>
  </div>
</template>
<script>
import "@system/adjust-accounts/counter-deal/css/myQuerySelect.less"; // 查询框样式
export default {
  name: "ordinary-repayment"
};
</script>

<style lang="less" scoped>
// 滚动条加粗
/deep/ ::-webkit-scrollbar
{
    height: 15px;
}
 /deep/ ::-webkit-scrollbar-thumb {
    border-radius: 10px;
 }
  .ordinary-repayment {
    width: 100%;
    height: 100%;
  }
  /deep/ .content {
      overflow: auto;
  }
  // 查询框的padding-right
/deep/ .el-input .el-input__inner {
    padding-right: 30px;
  }
  /* 日期选择 -- padding-left */
  /deep/ .el-input--prefix .el-input__inner {
      padding-left: 15px;
  }
  /deep/ .el-date-editor .el-range-separator {
    width: 10%;
  }
  /* 表格的行高 */
  /deep/ .el-table--enable-row-transition .el-table__body td {
    height: 60px;
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
        height: 555px;
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
