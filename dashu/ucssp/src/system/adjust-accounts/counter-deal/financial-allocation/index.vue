<template>
  <div class="financial-allocation">
    <router-view/>
  </div>
</template>
<script>
import "@system/adjust-accounts/counter-deal/css/myQuerySelect.less";
export default {
  name: "financial-allocation"
};
</script>

<style lang="less" scoped>
// 自适应高
/deep/ .content {
    overflow: auto;
}
  .financial-allocation {
    width: 100%;
    height: 100%;
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
                // 邮件top
                .dialog-msgbox__top2 {
                    height:60px;
                    text-align: center;
                    line-height: 60px;
                    background: #FFFFFF;
                    box-shadow: 0 1px 10px 0 rgba(0,0,0,0.05);
                    .dialog-font2 {
                        font-family: PingFang-SC-Medium;
                        font-size: 18px;
                        color: #333333;
                        letter-spacing: 1.38px;
                        text-align: center;
                    }
                }
                // 邮件info
                .email_info {
                    width: 100%;
                    .email_item {
                        position: relative;
                        margin-top: 20px;
                        height: 40px;
                        .file {
                            position: absolute;
                            cursor: pointer;
                            width: 50px;
                            height: 40px;
                            top: 0px;
                            right: 5px;
                            opacity: 0;
                            z-index: 999;
                        }
                        .hintDiv {
                            position: absolute;
                            top: 40px;
                            left: 112px;
                            height: 30px;
                            padding-top: 5px;
                            box-sizing: border-box;
                            .hint {
                                text-align: left;
                                font-size: 12px;
                                color: #f55f5f;
                            }
                        }
                        .item_left {
                            display: inline-block;
                            width: 96px;
                            padding-left: 30px;
                            line-height: 40px;
                            font-family: PingFangSC-Regular;
                            font-size: 14px;
                            color: #333333;
                        }
                        /deep/.el-input input {
                            box-sizing: border-box;
                            width: 292px;
                            height: 40px;
                            padding-left: 15px;
                            background: #ececec;
                            border: 1px solid #d0d0d0;
                            border-radius: 4px;
                        }
                        .text {
                            box-sizing: border-box;
                            width: 292px;
                            height: 40px;
                            padding-left: 15px;
                            background: #ececec;
                            border: 1px solid #d0d0d0;
                            border-radius: 4px;
                        }
                        .upload-demo {
                            display: inline-block;
                            width: 50px;
                            height: 40px;
                            .el-upload {
                                display: inline-block;
                                width: 50px;
                                height: 40px;
                                .el-button {
                                    display: inline-block;
                                    width: 50px;
                                    height: 40px;
                                    background: none;
                                }
                            }
                        }
                        .upload_font {
                            background: none;
                            border: 1px solid #538BF1;
                            width: 50px;
                            height: 40px;
                            display: inline-block;
                            text-align: center;
                            line-height: 40px;
                            font-family: PingFangSC-Regular;
                            font-size: 14px;
                            color: #538BF1;
                        }
                    }
                }
                // 邮件确定按钮
                .email_affirm {
                    margin-top: 30px;
                    display: flex;
                    justify-content: center;
                    .t_email {
                        width: 200px;
                        height: 40px;
                        background: #538BF1;
                        font-family: PingFangSC-Regular;
                        font-size: 14px;
                        color: #FFFFFF;
                        letter-spacing: 1.07px;
                        text-align: center;
                    }
                }
                .back_info {
                    padding: 20px 30px 0 30px;
                    .backInfo_item {
                        display: inline-block;
                        margin-right: 60px;
                        .backInfo_title {
                            font-family: PingFangSC-Regular;
                            font-size: 14px;
                            color: #666;
                        }
                        .backInfo_data {
                            font-style: normal;
                            font-family: PingFangSC-Regular;
                            font-size: 14px;
                            color: #151515;
                            line-height: 20px;
                        }
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
            // 复核退回
            .dialog-box-back {
              width: 540px;
              height: 398px;
              background: #ffffff;
              .title_type {
                    text-align: center;
                    background: #fff;
                    font-size: 18px;
                    color: #000;
                    padding-left: 20px;
                    font-weight: normal;
                    font-family: PingFangSC-Regular;
                    letter-spacing: 1.38px;
                }
                // 确认选择
                .affirm_select {
                    width: 100%;
                    display: flex;
                    justify-content: center;
                    margin-top: 20px;
                    .t_button {
                        width: 100px;
                        height: 40px;
                        font-size: 14px;
                        letter-spacing: 1.07px;
                        text-align: center;
                    }
                    .cancel_t { // 取消
                        background: #F8F8F8;
                        border: 1px solid #DDDDDD;
                        color: #666;
                    }
                    .affirm_t { // 确认
                        background: #538BF1;
                        color: #ffffff;
                    }
                    .back_t {
                        width: 200px;
                        height: 40px;
                        background: #538BF1;
                        color: #ffffff;
                    }
                }
              .back_hint_con {
                  padding: 0 20px;
                  .charge_hint {
                      width: 100%;
                      line-height: 60px;
                      span {
                        font-family: PingFangSC-Regular;
                        font-size: 14px;
                        color: #666;
                      }
                      i {
                        font-family: PingFangSC-Regular;
                        font-size: 14px;
                        color: #151515;
                        line-height: 20px;
                        font-style: normal;
                      }
                  }
                  .back_cause {
                      .back_cause_top {
                          span {
                            font-family: PingFangSC-Regular;
                            font-size: 14px;
                            color: #666;
                            letter-spacing: 1.27px;
                          }
                      }
                      .back_cause_con {
                          margin-top: 7px;
                          textarea {
                            display: block;
                            width: 100%;
                            height: 120px;
                            box-sizing: border-box;
                            resize: none;
                            padding: 10px;
                            border: 1px solid #EBEBEB;
                            background: #ececec;
                            border-radius: 4px;
                            font-family: PingFangSC-Regular;
                            font-size: 14px;
                            color: #151515;
                            line-height: 20px;
                            &:focus { outline:none; }
                            &::-webkit-input-placeholder { /* WebKit browsers */
                                font-family: PingFangSC-Regular;
                                font-size: 14px;
                                color: #BBBBBB;
                                letter-spacing: 0;
                            }
                            &::-moz-input-placeholder { /* WebKit browsers */
                                font-family: PingFangSC-Regular;
                                font-size: 14px;
                                color: #BBBBBB;
                                letter-spacing: 0;
                            }
                            &:-moz-input-placeholder { /* WebKit browsers */
                                font-family: PingFangSC-Regular;
                                font-size: 14px;
                                color: #BBBBBB;
                                letter-spacing: 0;
                            }
                            &::-ms-input-placeholder { /* WebKit browsers */
                                font-family: PingFangSC-Regular;
                                font-size: 14px;
                                color: #BBBBBB;
                                letter-spacing: 0;
                            }
                          }
                      }
                      .back_cause_bom {
                          width: 100%;
                          height: 40px;
                          line-height: 40px;
                          span {
                            font-family: PingFangSC-Regular;
                            font-size: 14px;
                            color: #F55F5F;
                          }
                      }
                  }
              }
            }
        }
    }
</style>
