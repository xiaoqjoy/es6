<style lang="less" rel="stylesheet/less" scoped>
/deep/.el-form-item {
  margin: 0px;
  width: 180px;
  .el-input__inner {
    box-sizing: border-box;
    width: 180px;
    line-height: 38px;
    background: #ffffff;
    border: 1px solid #d0d0d0;
    border-radius: 4px;
    padding-left: 10px;
    font-family: PingFangSC-Regular;
    font-size: 12px;
    color: #333333;
    letter-spacing: 0;
  }
}
// 公共样式
// 只读
.height_60 {
  height: 60px;
}
// 弹窗总box
.drop_loan {
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  .dialog-mask {
    z-index: 1000;
  }
  .dialog-box {
    width: 946px;
    background: #ffffff;
    font-size: 0;
    transform: none;
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    margin: auto;
    margin-bottom: 80px;
    .dialog-box__top {
      margin: 0px;
    }
    // 邮件top
    .dialog-msgbox__top2 {
      height: 60px;
      text-align: center;
      line-height: 60px;
      background: #ffffff;
      box-shadow: 0 1px 10px 0 rgba(0, 0, 0, 0.05);
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
        /deep/ .el-form-item {
          width: 260px;
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
          border: 1px solid #538bf1;
          width: 50px;
          height: 40px;
          display: inline-block;
          text-align: center;
          line-height: 40px;
          font-family: PingFangSC-Regular;
          font-size: 14px;
          color: #538bf1;
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
        background: #538bf1;
        font-family: PingFangSC-Regular;
        font-size: 14px;
        color: #ffffff;
        letter-spacing: 1.07px;
        text-align: center;
      }
    }
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
    /*按钮*/
    .form__bottom {
      text-align: center;
      left: 50%;
      padding-bottom: 30px;
      padding-top: 70px;
      background-color: rgba(255, 255, 255);
      .add {
        width: 200px;
      }
      .look_info {
        background: #eeb352;
      }
    }
    // 弹窗内容区域
    .dialog-box__content {
      padding: 0 30px;
      // 基本信息
      .content_top {
        width: 100%;
        height: 60px;
        border-bottom: 1px solid #d0d0d0;
        display: flex;
        align-items: center;
        position: relative;
        &::before {
          content: "";
          width: 2px;
          height: 16px;
          background: #538bf1;
        }
        span {
          font-family: PingFangSC-Medium;
          font-size: 16px;
          color: #333333;
          font-weight: bold;
          margin-left: 7px;
        }
      }
      // 信息
      .dialog-box_info {
        height: 225px;
        .info_item {
          float: left;
          width: 292px;
          height: 40px;
          line-height: 40px;
          .item_title {
            font-family: PingFangSC-Regular;
            font-size: 14px;
            color: #666;
          }
          .item_data {
            font-family: PingFangSC-Regular;
            font-size: 14px;
            color: #151515;
            line-height: 20px;
            font-style: normal;
          }
        }
        .select_item {
          float: left;
          margin-top: 10px;
          width: 245px;
          height: 65px;
          white-space: nowrap;
          // margin-right: 60px;
          margin-bottom: 20px;
          .select_title {
            b {
              font-family: PingFangSC-Regular;
              font-size: 12px;
              color: #ff0101;
              letter-spacing: 1.09px;
            }
            span {
              font-family: PingFangSC-Regular;
              font-size: 12px;
              color: #333333;
              letter-spacing: 1.09px;
            }
          }
          .select_input {
            margin-top: 8px;
            .select_245 {
              width: 245px;
            }
          }
        }
      }
      // 表格
      .tableBox {
        width: 100%;
        height: auto;
        .tables {
          // padding: 0 30px;
          border: 1px solid #e9e9e9;
          border-radius: 4px;
          // 表头
          .tableHeader {
            display: flex;
            background: #ffffff;
            box-shadow: 0 1px 0 0 #d0d0d0;
            .tableHeaderTd {
              flex: 1;
              display: flex;
              height: 39px;
              align-items: center;
              padding-left: 20px;
              span {
                font-family: PingFangSC-Regular;
                font-size: 12px;
                color: #666;
                letter-spacing: 0;
                text-align: center;
              }
            }
          }
          // 表体
          .tableBody {
            .tableBodyTr {
              display: flex;
              .tableBodyTd1,
              .tableBodyTd2,
              .tableBodyTd3,
              .tableBodyTd4 {
                flex: 1;
                display: flex;
                height: 60px;
                align-items: center;
                padding-left: 20px;
              }
              .tableBodyTd1 {
                border-right: 1px solid #d0d0d0;
              }
              .spanStyle1 {
                display: inline-block;
                font-family: PingFang-SC-Regular;
                font-size: 14px;
                color: #333333;
                letter-spacing: 0;
              }
              .spanStyle2 {
                display: inline-block;
                box-sizing: border-box;
                width: 180px;
                height: 38px;
                line-height: 38px;
                background: #ffffff;
                border: 1px solid #d0d0d0;
                border-radius: 4px;
                padding-left: 10px;
                font-family: PingFangSC-Regular;
                font-size: 12px;
                color: #333333;
                letter-spacing: 0;
              }
              .bgE5 {
                background: #d0d0d0;
              }
            }
          }
          // 表尾
          .tableFooter {
            border-top: 1px solid #d0d0d0;
            width: 100%;
            display: flex;
            .tableFooterTd1 {
              width: 221px;
              height: 59px;
              display: flex;
              align-items: center;
              padding-left: 20px;
              border-right: 1px solid #d0d0d0;
              span {
                font-family: PingFang-SC-Regular;
                font-size: 14px;
                color: #333333;
                letter-spacing: 0;
              }
            }
            .tableFooterTd2 {
              flex: 1;
              height: 60px;
              display: flex;
              align-items: center;
              // padding-left: 20px;
              span {
                display: inline-block;
                width: 220px;
                padding-left: 30px;
                box-sizing: border-box;
                font-family: PingFang-SC-Regular;
                font-size: 14px;
                color: #333333;
                letter-spacing: 0;
              }
            }
          }
        }
      }
    }
    // 底部
    .dialog-box__footer {
      width: 100%;
      display: flex;
      justify-content: center;
      margin-top: 30px;
      // 底部按钮
      .footerBtn {
        .t_button {
          width: 200px;
          height: 40px;
          font-family: PingFangSC-Regular;
          font-size: 14px;
          letter-spacing: 1.07px;
          text-align: center;
        }
        .print_t {
          border: 1px solid #538bf1;
          color: #538bf1;
        }
        .upload_t {
          background: #eeb352;
          color: #ffffff;
        }
        .count_t {
          background: #05838e;
          color: #ffffff;
        }
        .affirm_t {
          background: #538bf1;
          color: #ffffff;
        }
      }
    }
  }
}
// 邮件提示窗
.hint2 {
  .import-message {
    .dialog-box {
      background: #ffffff;
      width: 340px;
      height: 170px;
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      .dialog-msgbox__top {
        height: 40px;
        .button__close {
          position: absolute;
          top: 5px;
          right: 5px;
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
        height: 60px;
        text-align: center;
        line-height: 60px;
        background: #ffffff;
        box-shadow: 0 1px 10px 0 rgba(0, 0, 0, 0.05);
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
            height: 46px;
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
            border: 1px solid #538bf1;
            width: 50px;
            height: 40px;
            display: inline-block;
            text-align: center;
            line-height: 40px;
            font-family: PingFangSC-Regular;
            font-size: 14px;
            color: #538bf1;
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
          background: #538bf1;
          font-family: PingFangSC-Regular;
          font-size: 14px;
          color: #ffffff;
          letter-spacing: 1.07px;
          text-align: center;
        }
      }
      .text-center {
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
        .cancel_t {
          // 取消
          background: #f8f8f8;
          border: 1px solid #dddddd;
          font-size: 14px;
          color: #666;
          letter-spacing: 1.07px;
          text-align: center;
        }
        .affirm_t {
          // 确认
          background: #538bf1;
          font-size: 14px;
          color: #ffffff;
          letter-spacing: 1.07px;
          text-align: center;
        }
      }
    }
  }
}
</style>
<template>
  <div class="drop_loan">
    <div class="dialog-mask"></div>
    <div class="dialog-box" v-loading="boxLoading">
      <!-- 弹窗上部分 -->
      <div class="dialog-box__top">
        <h5 class="title_type">提前还款</h5>
        <span class="el-icon-close button button__close" @click="close"></span>
      </div>
      <!-- 弹窗内容区 -->
      <div class="dialog-box__content">
        <!-- 标题 -->
        <div class="content_top">
          <span>基本信息</span>
        </div>
        <!-- 信息 -->
        <div class="dialog-box_info">
          <div class="info_item">
            <span class="item_title">出账编号:&nbsp;&nbsp;</span>
            <i class="item_data">{{ loan_no }}</i>
          </div>
          <div class="info_item">
            <span class="item_title">客户姓名:&nbsp;&nbsp;</span>
            <i class="item_data">{{ customer_name }}</i>
          </div>
          <div class="info_item">
            <span class="item_title">身份证号:&nbsp;&nbsp;</span>
            <i class="item_data">{{ cert_no | certificateNum }}</i>
          </div>
          <div class="info_item">
            <span class="item_title">放款机构:&nbsp;&nbsp;</span>
            <i class="item_data">{{ line_id }}</i>
          </div>
          <div class="info_item">
            <span class="item_title">合作模式:&nbsp;&nbsp;</span>
            <i class="item_data">{{ collaborate }}</i>
          </div>
          <div class="info_item">
            <span class="item_title">预约上门时间:&nbsp;&nbsp;</span>
            <i class="item_data">{{ estimated_payoff_date | dateFilter }}</i>
          </div>
          <div class="info_item">
            <span class="item_title">单据号:&nbsp;&nbsp;</span>
            <i class="item_data">{{ trans_serial_no }}</i>
          </div>
          <div class="info_item">
            <span class="item_title">是否逾期:&nbsp;&nbsp;</span>
            <i class="item_data">{{ loan_status }}</i>
          </div>
          <div class="info_item">
            <span class="item_title">期次:&nbsp;&nbsp;</span>
            <i class="item_data">{{ sterm }}</i>
          </div>
          <!-- 扣款渠道 -->
          <el-form :model="ChannelObj" :rules="rules3" ref="ChannelObj">
            <div class="select_item margin_r_60">
              <div class="select_title">
                <span>扣款渠道</span>
              </div>
              <div class="select_input" style="margin-top: 8px;">
                <el-form-item prop="ChannelValue">
                  <el-select v-model="ChannelObj.ChannelValue" placeholder="扣款渠道">
                    <el-option
                      v-for="item in ChannelList"
                      :key="item.itemNo"
                      :label="item.itemName"
                      :value="item.itemNo"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </div>
            </div>
          </el-form>
        </div>
        <!-- 表格 -->
        <div class="tableBox">
          <div class="tables">
            <!-- 表头 -->
            <div class="tableHeader">
              <div class="tableHeaderTd"></div>
              <div class="tableHeaderTd">
                <span>应还金额</span>
              </div>
              <div class="tableHeaderTd">
                <span>实还金额</span>
              </div>
              <div class="tableHeaderTd">
                <span>减免金额</span>
              </div>
            </div>
            <!-- 表体 -->
            <div class="tableBody">
              <el-form :model="writeInfo" :rules="rules" ref="writeInfo">
                <div class="tableBodyTr">
                  <div class="tableBodyTd1">
                    <span class="spanStyle1">剩余本金</span>
                  </div>
                  <!-- <div class="tableBodyTd2"><span class="spanStyle1">{{ pay.payCorp }}</span></div> -->
                  <div class="tableBodyTd2">
                    <el-form-item prop="payCorp">
                      <el-input v-model="writeInfo.payCorp" :disabled="true"></el-input>
                    </el-form-item>
                  </div>
                  <div class="tableBodyTd3">
                    <!-- <input style="text" class="spanStyle2" v-model='aa'/> -->
                    <el-form-item prop="actual_payCorp">
                      <el-input v-model="writeInfo.actual_payCorp"></el-input>
                    </el-form-item>
                  </div>
                  <div class="tableBodyTd4">
                    <!-- <input style="text" class="spanStyle2" v-model='aa'/> -->
                    <el-form-item prop="reduce_payCorp">
                      <el-input v-model="writeInfo.reduce_payCorp"></el-input>
                    </el-form-item>
                  </div>
                </div>
                <div class="tableBodyTr">
                  <div class="tableBodyTd1">
                    <span class="spanStyle1">当前利息</span>
                  </div>
                  <!-- <div class="tableBodyTd2"><span class="spanStyle1">{{ pay.payInte }}</span></div> -->
                  <div class="tableBodyTd2">
                    <el-form-item prop="payInte">
                      <el-input v-model="writeInfo.payInte" :disabled="true"></el-input>
                    </el-form-item>
                  </div>
                  <div class="tableBodyTd3">
                    <el-form-item prop="actual_payInte">
                      <el-input v-model="writeInfo.actual_payInte"></el-input>
                    </el-form-item>
                  </div>
                  <div class="tableBodyTd4">
                    <el-form-item prop="reduce_payInte">
                      <el-input v-model="writeInfo.reduce_payInte"></el-input>
                    </el-form-item>
                  </div>
                </div>
                <div class="tableBodyTr">
                  <div class="tableBodyTd1">
                    <span class="spanStyle1">未结清本金</span>
                  </div>
                  <div class="tableBodyTd2">
                    <el-form-item prop="ddPayCorp">
                      <el-input v-model="writeInfo.ddPayCorp" :disabled="true"></el-input>
                    </el-form-item>
                  </div>
                  <div class="tableBodyTd3">
                    <el-form-item prop="actual_ddPayCorp">
                      <el-input v-model="writeInfo.actual_ddPayCorp"></el-input>
                    </el-form-item>
                  </div>
                  <div class="tableBodyTd4">
                    <el-form-item prop="reduce_ddPayCorp">
                      <el-input v-model="writeInfo.reduce_ddPayCorp"></el-input>
                    </el-form-item>
                  </div>
                </div>
                <div class="tableBodyTr">
                  <div class="tableBodyTd1">
                    <span class="spanStyle1">未结清利息</span>
                  </div>
                  <div class="tableBodyTd2">
                    <el-form-item prop="ddPayInte">
                      <el-input v-model="writeInfo.ddPayInte" :disabled="true"></el-input>
                    </el-form-item>
                  </div>
                  <div class="tableBodyTd3">
                    <el-form-item prop="actual_ddPayInte">
                      <el-input v-model="writeInfo.actual_ddPayInte"></el-input>
                    </el-form-item>
                  </div>
                  <div class="tableBodyTd4">
                    <el-form-item prop="reduce_ddPayInte">
                      <el-input v-model="writeInfo.reduce_ddPayInte"></el-input>
                    </el-form-item>
                  </div>
                </div>
                <div class="tableBodyTr">
                  <div class="tableBodyTd1">
                    <span class="spanStyle1">未结清罚息</span>
                  </div>
                  <div class="tableBodyTd2">
                    <el-form-item prop="ddPayFine">
                      <el-input v-model="writeInfo.ddPayFine" :disabled="true"></el-input>
                    </el-form-item>
                  </div>
                  <div class="tableBodyTd3">
                    <el-form-item prop="actual_ddPayFine">
                      <el-input v-model="writeInfo.actual_ddPayFine"></el-input>
                    </el-form-item>
                  </div>
                  <div class="tableBodyTd4">
                    <el-form-item prop="reduce_ddPayFine">
                      <el-input v-model="writeInfo.reduce_ddPayFine"></el-input>
                    </el-form-item>
                  </div>
                </div>
                <div class="tableBodyTr">
                  <div class="tableBodyTd1">
                    <span class="spanStyle1">未结清复利</span>
                  </div>
                  <div class="tableBodyTd2">
                    <el-form-item prop="ddPayCompound">
                      <el-input v-model="writeInfo.ddPayCompound" :disabled="true"></el-input>
                    </el-form-item>
                  </div>
                  <div class="tableBodyTd3">
                    <el-form-item prop="actual_ddPayCompound">
                      <el-input v-model="writeInfo.actual_ddPayCompound"></el-input>
                    </el-form-item>
                  </div>
                  <div class="tableBodyTd4">
                    <el-form-item prop="reduce_ddPayCompound">
                      <el-input v-model="writeInfo.reduce_ddPayCompound"></el-input>
                    </el-form-item>
                  </div>
                </div>
              </el-form>
              <el-form :model="feeMapObj" ref="feeMapObj">
                <div
                  class="tableBodyTr"
                  v-for="(feeItem, feeIndex) of feeMapObj.feeMap"
                  :key="feeIndex"
                >
                  <div class="tableBodyTd1">
                    <span class="spanStyle1">{{ feeItem.feeName }}</span>
                  </div>
                  <!-- <div class="tableBodyTd2"><span class="spanStyle1">{{ feeItem.feeAmount }}</span></div> -->
                  <div class="tableBodyTd2">
                    <el-form-item :prop="'feeMap.'+feeIndex+'.feeAmount'" :rules="ruless.feeAmount">
                      <el-input v-model="feeItem.feeAmount" :disabled="true"></el-input>
                    </el-form-item>
                  </div>
                  <!-- <div class="tableBodyTd3"><input style="text" class="spanStyle2" v-model='feeMapObj.feeMap[feeIndex]["actualFeeAmount"]'/></div> -->
                  <div class="tableBodyTd3">
                    <el-form-item
                      :prop="'feeMap.'+feeIndex+'.actualFeeAmount'"
                      :rules="ruless.actualFeeAmount"
                    >
                      <el-input
                        v-model="feeItem.actualFeeAmount"
                        :disabled="feeItem.feeType === '3010'"
                      ></el-input>
                    </el-form-item>
                  </div>
                  <div class="tableBodyTd4">
                    <el-form-item
                      :prop="'feeMap.'+feeIndex+'.reduceFeeAmount'"
                      :rules="ruless.reduceFeeAmount"
                    >
                      <el-input
                        v-model="feeItem.reduceFeeAmount"
                        :disabled="feeItem.feeType === '3010'"
                      ></el-input>
                    </el-form-item>
                  </div>
                  <!-- <div class="tableBodyTd4"><input style="text" class="spanStyle2" v-model='feeMapObj.feeMap[feeIndex]["reduceFeeAmount"]' :class="{bgE5: feeItem.feeType==='1010'}" :disabled="feeItem.feeType==='1010'" /></div> -->
                </div>
              </el-form>
            </div>
            <!-- 表尾 -->
            <div class="tableFooter">
              <div class="tableFooterTd1">
                <span>总计大数费用</span>
              </div>
              <div class="tableFooterTd2">
                <span>{{ dsAmountSum }}</span>
                <span>{{ dsActualSum }}</span>
                <span>{{ dsReduceSum }}</span>
              </div>
            </div>
            <div class="tableFooter">
              <div class="tableFooterTd1">
                <span>总计合作方费用</span>
              </div>
              <div class="tableFooterTd2">
                <span>{{ coAmSum }}</span>
                <span>{{ coReSum }}</span>
                <span>{{ coAcSum }}</span>
              </div>
            </div>
            <div class="tableFooter">
              <div class="tableFooterTd1">
                <span>总计费用</span>
              </div>
              <div class="tableFooterTd2">
                <span>{{ amSum }}</span>
                <span>{{ acSum }}</span>
                <span>{{ reSum }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 底部 -->
      <div class="dialog-box__footer">
        <div class="footerBtn">
          <el-button v-if="false" class="t_button print_t button" @click="print_fun">打印提前还款申请表</el-button>
          <el-button class="t_button upload_t button" @click="upload_fun">上传影像</el-button>
          <el-button class="t_button affirm_t button" @click="affirm_fun">确认</el-button>
        </div>
      </div>
      <!-- 提示窗 == 发送邮件 -->
      <div class="hint2" v-if="email_flag">
        <div class="import-message">
          <div class="dialog-mask"></div>
          <div
            class="dialog-box"
            v-loading="loading"
            style="width: 456px; height: 336px; margin: 0;"
          >
            <div class="dialog-msgbox__top dialog-msgbox__top2">
              <span class="dialog-font2">发送邮件</span>
              <span class="el-icon-close button button__close" @click="email_close"></span>
            </div>
            <el-form :model="writeInfo2" :rules="rules2" ref="writeInfo2">
              <div class="email_info">
                <div class="email_item">
                  <span class="item_left">收件人</span>
                  <!-- <input type="text" class="text" v-model="writeInfo.toAddress"> -->
                  <el-form-item prop="toAddress">
                    <el-input v-model="writeInfo2.toAddress"></el-input>
                  </el-form-item>
                </div>
                <div class="email_item">
                  <span class="item_left">抄送至</span>
                  <!-- <input type="text" class="text" v-model="toCarBonCopy"> -->
                  <el-form-item prop="toCarBonCopy">
                    <el-input v-model="writeInfo2.toCarBonCopy"></el-input>
                  </el-form-item>
                </div>
                <div class="email_item">
                  <span class="item_left">上传附件</span>
                  <input class="text" type="text" name="file" disabled :value="fileName" />
                  <!-- <input class="file"  type="file" @change="tirggerFile" />
                  <span class="upload_font">浏览</span>-->
                  <!-- elupload -->
                  <el-upload
                    class="upload-demo"
                    ref="upload"
                    :action="uploadUrl"
                    :on-change="elOchange"
                    :data="uploadData"
                    :on-success="onSuccess"
                    :on-error="onError"
                    name="uploadFile"
                    :headers="headers"
                    :multiple="false"
                    :show-file-list="false"
                    :auto-upload="false"
                  >
                    <el-button slot="trigger" size="small" type="primary">浏览</el-button>
                    <!-- <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button> -->
                  </el-upload>
                  <!-- elupload -->
                  <div class="hintDiv">
                    <div class="hint" v-if="hint">{{fileMsg}}</div>
                  </div>
                </div>
              </div>
            </el-form>
            <div class="email_affirm">
              <el-button class="t_button t_email button" @click="finish()">确认</el-button>
            </div>
          </div>
        </div>
      </div>
      <!--试算 再次确认组件 -->
      <reconfirmHint
        v-if="trialFlag"
        :massage="trialMsg"
        @close="trialFlagClose"
        @backFun="affirm_trial_fun"
      ></reconfirmHint>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import "@common/css/dialog";
import { counterDealApi } from "@/system/adjust-accounts/counter-deal/js/server"; // 接口
import reportRules from "@/system/adjust-accounts/counter-deal/js/reportRules"; // 验证
import { token } from "@/common/js/localStorage";
import reconfirmHint from "@/system/adjust-accounts/counter-deal/components/reconfirm-hint"; // 再次确认组件
export default {
  // 负组件传来的值
  props: {
    detailData: {
      type: Object,
      required: {}
    }
  },
  filters: {
    dateFilter(data) {
      if (!data) return "---";
      function change(t) {
        if (t < 10) {
          return "0" + t;
        } else {
          return t;
        }
      }
      var date = new Date(data * 1000); // 时间戳为10位需*1000，时间戳为13位的话不需乘1000;
      let Y = date.getFullYear() + "-";
      let M =
        (date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1) + "-";
      let D = change(date.getDate());
      return Y + M + D;
    }
  },
  data() {
    return {
      trialFlag: false, // 试算后是否弹窗
      trialMsg: "",
      boxLoading: false,
      corpRule: [],
      feeRule: [],
      ruleFlag: "0", // 是否按规则，1按规则
      email_flag: false, // 邮件开关
      accept: ["XLS", "XLSX", "DOC", "DOCX", "PDF", "JPG", "PNG", "RAR", "ZIP"], // 上传文件格式
      loading: false,
      writeInfo2: {
        toCarBonCopy: "", // 发送人
        toAddress: "" // 收件人
      },
      rules2: {
        toCarBonCopy: [{ trigger: "blur", validator: reportRules.emailRuls }],
        toAddress: [
          { required: true, trigger: "blur", message: "请填写" },
          { trigger: "blur", validator: reportRules.emailRuls }
        ]
      },
      hint: false, // 提示信息
      fileName: "", // 绑定文本框的值
      fileId: "", // 文件ID
      file: "", // 上传文件的值
      fileMsg: "", // 提示信息文本的值
      uploadData: {},
      headers: {
        // "Content-Type": false,
        // "Accept": "application/json",
        "DSF-token": token.getToken(),
        "X-REQ-NAME": "ucssp"
      },
      // 上传文件地址
      uploadUrl: counterDealApi.upload,
      // input只读 -- 支持线上为只读
      readOnly: true,
      // 渠道列表
      ChannelList: [],
      trans_serial_no: "", // 交易号
      loan_no: "", // 出账编号
      apply_no: "", // 申请编号
      productId: "", // 产品id
      customer_name: "", // 客户姓名
      cert_no: "", // 身份证号
      line_id: null, // 放款机构
      collaborate: null, // 合作模式
      estimated_payoff_date: "", // 预约上门时间
      loan_status: "", // 逾期标志
      sterm: null, // 期次
      ChannelObj: {
        ChannelValue: "" // 渠道列表
      },
      writeInfo: {
        // 应还
        payCorp: "0", // 剩余本金
        payInte: "0", // 费用数组
        ddPayInte: "0", // 当前利息
        ddPayCorp: "0", // 当前利息
        ddPayFine: "0", // 未结清罚息
        ddPayCompound: "0", // 未结清复利
        // 实还
        actual_payCorp: "0", // 实还剩余本金
        actual_payInte: "0", // 实还应还利息
        actual_ddPayCorp: "0", // 实还未结清本金
        actual_ddPayInte: "0", // 实还当前利息
        actual_ddPayFine: "0", // 实还未结清罚息
        actual_ddPayCompound: "0", // 实还未结清复利
        actual_feeMap: [], // 实还费用数组
        // 减免
        reduce_payCorp: "0", // 减免剩余本金
        reduce_payInte: "0", // 减免应还利息
        reduce_ddPayCorp: "0", // 减免未结清本金
        reduce_ddPayInte: "0", // 减免当前利息
        reduce_ddPayFine: "0", // 减免未结清罚息
        reduce_ddPayCompound: "0", // 减免未结清复利
        reduce_feeMap: [] // 减免费用数组
      },
      feeMapObj: {
        feeMap: []
      },
      // 应还金额
      pay: {
        payCorp: "", // 剩余本金
        payInte: "", // 应还利息
        ddPayCorp: "", // 未结清本金
        ddPayInte: "", // 当前利息
        ddPayFine: "", // 未结清罚息
        ddPayCompound: "", // 未结清复利
        feeMap: [] // 费用数组
      },
      rules3: {
        ChannelValue: [
          // 实还本金
          { required: true, trigger: "change", message: "请填写" }
        ]
      },
      ruless: {
        feeAmount: [
          // 实还本金
          { required: true, trigger: "blur", message: "请填写" },
          { trigger: "blur", validator: reportRules.nonNegative3 },
          {
            trigger: "blur",
            validator: reportRules.surpassNumTwoBitAndNegative
          }
        ],
        reduceFeeAmount: [
          // 实还本金
          { required: true, trigger: "blur", message: "请填写" },
          { trigger: "blur", validator: reportRules.nonNegative3 },
          {
            trigger: "blur",
            validator: reportRules.surpassNumTwoBitAndNegative
          }
        ],
        actualFeeAmount: [
          // 实还本金
          { required: true, trigger: "blur", message: "请填写" },
          { trigger: "blur", validator: reportRules.nonNegative3 },
          {
            trigger: "blur",
            validator: reportRules.surpassNumTwoBitAndNegative
          }
        ]
      },
      rules: {
        // 应还
        payCorp: [
          // 实还本金
          { required: true, trigger: "blur", message: "请填写" },
          { trigger: "blur", validator: reportRules.nonNegative3 },
          {
            trigger: "blur",
            validator: reportRules.surpassNumTwoBitAndNegative
          }
        ],
        payInte: [
          // 实还本金
          { required: true, trigger: "blur", message: "请填写" },
          { trigger: "blur", validator: reportRules.nonNegative3 },
          {
            trigger: "blur",
            validator: reportRules.surpassNumTwoBitAndNegative
          }
        ],
        ddPayInte: [
          // 实还本金
          { required: true, trigger: "blur", message: "请填写" },
          { trigger: "blur", validator: reportRules.nonNegative3 },
          {
            trigger: "blur",
            validator: reportRules.surpassNumTwoBitAndNegative
          }
        ],
        ddPayCorp: [
          // 实还本金
          { required: true, trigger: "blur", message: "请填写" },
          { trigger: "blur", validator: reportRules.nonNegative3 },
          {
            trigger: "blur",
            validator: reportRules.surpassNumTwoBitAndNegative
          }
        ],
        ddPayFine: [
          // 实还本金
          { required: true, trigger: "blur", message: "请填写" },
          { trigger: "blur", validator: reportRules.nonNegative3 },
          {
            trigger: "blur",
            validator: reportRules.surpassNumTwoBitAndNegative
          }
        ],
        ddPayCompound: [
          // 实还本金
          { required: true, trigger: "blur", message: "请填写" },
          { trigger: "blur", validator: reportRules.nonNegative3 },
          {
            trigger: "blur",
            validator: reportRules.surpassNumTwoBitAndNegative
          }
        ],
        // 实还 减免
        actual_payCorp: [
          // 实还本金
          { required: true, trigger: "blur", message: "请填写" },
          { trigger: "blur", validator: reportRules.nonNegative3 },
          {
            trigger: "blur",
            validator: reportRules.surpassNumTwoBitAndNegative
          }
        ],
        reduce_payCorp: [
          // 实还本金
          { required: true, trigger: "blur", message: "请填写" },
          { trigger: "blur", validator: reportRules.nonNegative3 },
          {
            trigger: "blur",
            validator: reportRules.surpassNumTwoBitAndNegative
          }
        ],
        actual_payInte: [
          // 实还本金
          { required: true, trigger: "blur", message: "请填写" },
          { trigger: "blur", validator: reportRules.nonNegative3 },
          {
            trigger: "blur",
            validator: reportRules.surpassNumTwoBitAndNegative
          }
        ],
        reduce_payInte: [
          // 实还本金
          { required: true, trigger: "blur", message: "请填写" },
          { trigger: "blur", validator: reportRules.nonNegative3 },
          {
            trigger: "blur",
            validator: reportRules.surpassNumTwoBitAndNegative
          }
        ],
        actual_ddPayInte: [
          // 实还本金
          { required: true, trigger: "blur", message: "请填写" },
          { trigger: "blur", validator: reportRules.nonNegative3 },
          {
            trigger: "blur",
            validator: reportRules.surpassNumTwoBitAndNegative
          }
        ],
        reduce_ddPayInte: [
          // 实还本金
          { required: true, trigger: "blur", message: "请填写" },
          { trigger: "blur", validator: reportRules.nonNegative3 },
          {
            trigger: "blur",
            validator: reportRules.surpassNumTwoBitAndNegative
          }
        ],
        actual_ddPayFine: [
          // 实还本金
          { required: true, trigger: "blur", message: "请填写" },
          { trigger: "blur", validator: reportRules.nonNegative3 },
          {
            trigger: "blur",
            validator: reportRules.surpassNumTwoBitAndNegative
          }
        ],
        reduce_ddPayFine: [
          // 实还本金
          { required: true, trigger: "blur", message: "请填写" },
          { trigger: "blur", validator: reportRules.nonNegative3 },
          {
            trigger: "blur",
            validator: reportRules.surpassNumTwoBitAndNegative
          }
        ],
        actual_ddPayCompound: [
          // 实还本金
          { required: true, trigger: "blur", message: "请填写" },
          { trigger: "blur", validator: reportRules.nonNegative3 },
          {
            trigger: "blur",
            validator: reportRules.surpassNumTwoBitAndNegative
          }
        ],
        reduce_ddPayCompound: [
          // 实还本金
          { required: true, trigger: "blur", message: "请填写" },
          { trigger: "blur", validator: reportRules.nonNegative3 },
          {
            trigger: "blur",
            validator: reportRules.surpassNumTwoBitAndNegative
          }
        ],
        actual_ddPayCorp: [
          // 实还本金
          { required: true, trigger: "blur", message: "请填写" },
          { trigger: "blur", validator: reportRules.nonNegative3 },
          {
            trigger: "blur",
            validator: reportRules.surpassNumTwoBitAndNegative
          }
        ],
        reduce_ddPayCorp: [
          // 实还本金
          { required: true, trigger: "blur", message: "请填写" },
          { trigger: "blur", validator: reportRules.nonNegative3 },
          {
            trigger: "blur",
            validator: reportRules.surpassNumTwoBitAndNegative
          }
        ]
      }
    };
  },
  computed: {
    // 合作方总计应还
    coAmSum() {
      return (this.amSum - this.dsAmountSum).toFixed(2);
    },
    // 合作方总计实还
    coReSum() {
      return (this.acSum - this.dsActualSum).toFixed(2);
    },
    // 合作方总计减免
    coAcSum() {
      return (this.reSum - this.dsReduceSum).toFixed(2);
    },
    // 总计应还
    amSum() {
      let feeSum = 0;
      this.feeMapObj.feeMap.forEach(element => {
        feeSum += Number(element.feeAmount);
      });
      return (
        feeSum +
        Number(this.writeInfo.payCorp) +
        Number(this.writeInfo.payInte) +
        Number(this.writeInfo.ddPayCorp) +
        Number(this.writeInfo.ddPayInte) +
        Number(this.writeInfo.ddPayFine) +
        Number(this.writeInfo.ddPayCompound)
      ).toFixed(2);
    },
    // 总计减免
    reSum() {
      // 减免和reduceFeeAmount
      let Sum = 0;
      this.feeMapObj.feeMap.forEach(element => {
        Sum += Number(element.reduceFeeAmount);
      });
      return (
        Sum +
        Number(this.writeInfo.reduce_payCorp) +
        Number(this.writeInfo.reduce_payInte) +
        Number(this.writeInfo.reduce_ddPayCorp) +
        Number(this.writeInfo.reduce_ddPayInte) +
        Number(this.writeInfo.reduce_ddPayFine) +
        Number(this.writeInfo.reduce_ddPayCompound)
      ).toFixed(2);
    },
    // 总计实还
    acSum() {
      // return this.amSum - this.reSum;
      let reFeeSum = 0;
      this.feeMapObj.feeMap.forEach(element => {
        reFeeSum += Number(element.actualFeeAmount);
      });
      return (
        reFeeSum +
        Number(this.writeInfo.actual_payCorp) +
        Number(this.writeInfo.actual_payInte) +
        Number(this.writeInfo.actual_ddPayCorp) +
        Number(this.writeInfo.actual_ddPayInte) +
        Number(this.writeInfo.actual_ddPayFine) +
        Number(this.writeInfo.actual_ddPayCompound)
      ).toFixed(2);
    },
    // 总计大数应还
    dsAmountSum() {
      let sum1 = 0; // 应还金额总计
      let sum2 = 0; // 应还费用总计
      let typeSet = new Set([
        "001",
        "002",
        "003",
        "004",
        "005",
        "006",
        "007",
        "1001",
        "1002",
        "1003",
        "1004",
        "1005",
        "1006",
        "1007",
        "1008",
        "1009",
        "1010",
        "1011",
        "1012",
        "1013"
      ]);
      if (this.ruleFlag === "1") {
        this.corpRule.forEach(element => {
          switch (element) {
            case "CORP":
              sum1 += Number(this.writeInfo.payCorp);
              break;
            case "INTE":
              sum1 += Number(this.writeInfo.payInte);
              break;
          }
        });
        this.feeRule.forEach(feeElement => {
          if (typeSet.has(feeElement)) {
            this.feeMapObj.feeMap.forEach(feeMapItem => {
              if (feeMapItem.feeType === feeElement) {
                sum2 += Number(feeMapItem.feeAmount);
              }
            });
          }
        });
      } else {
        let feeSum = 0;
        this.feeMapObj.feeMap.forEach(element => {
          feeSum += Number(element.feeAmount);
        });
        return feeSum.toFixed(2);
      }
      return (sum1 + sum2).toFixed(2);
    },
    // 总计大数实还
    dsActualSum() {
      // return this.dsAmountSum - this.dsReduceSum;
      let sum1 = 0; // 应还金额总计
      let sum2 = 0; // 应还费用总计
      let typeSet = new Set([
        "001",
        "002",
        "003",
        "004",
        "005",
        "006",
        "007",
        "1001",
        "1002",
        "1003",
        "1004",
        "1005",
        "1006",
        "1007",
        "1008",
        "1009",
        "1010",
        "1011",
        "1012",
        "1013"
      ]);
      if (this.ruleFlag === "1") {
        this.corpRule.forEach(element => {
          switch (element) {
            case "CORP":
              sum1 += Number(this.writeInfo.actual_payCorp);
              break;
            case "INTE":
              sum1 += Number(this.writeInfo.actual_payInte);
              break;
          }
        });
        this.feeRule.forEach(feeElement => {
          if (typeSet.has(feeElement)) {
            this.feeMapObj.feeMap.forEach(feeMapItem => {
              if (feeMapItem.feeType === feeElement) {
                sum2 += Number(feeMapItem.actualFeeAmount);
              }
            });
          }
        });
      } else {
        let reFeeSum = 0;
        this.feeMapObj.feeMap.forEach(element => {
          reFeeSum += Number(element.actualFeeAmount);
        });
        return reFeeSum.toFixed(2);
      }
      return (sum1 + sum2).toFixed(2);
    },
    // 总计大数减免
    dsReduceSum() {
      let sum1 = 0; // 应还金额总计
      let sum2 = 0; // 应还费用总计
      let typeSet = new Set([
        "001",
        "002",
        "003",
        "004",
        "005",
        "006",
        "007",
        "1001",
        "1002",
        "1003",
        "1004",
        "1005",
        "1006",
        "1007",
        "1008",
        "1009",
        "1010",
        "1011",
        "1012",
        "1013"
      ]);
      if (this.ruleFlag === "1") {
        this.corpRule.forEach(element => {
          switch (element) {
            case "CORP":
              sum1 += Number(this.writeInfo.reduce_payCorp);
              break;
            case "INTE":
              sum1 += Number(this.writeInfo.reduce_payInte);
              break;
          }
        });
        this.feeRule.forEach(feeElement => {
          if (typeSet.has(feeElement)) {
            this.feeMapObj.feeMap.forEach(feeMapItem => {
              if (feeMapItem.feeType === feeElement) {
                sum2 += Number(feeMapItem.reduceFeeAmount);
              }
            });
          }
        });
      } else {
        let Sum = 0;
        this.feeMapObj.feeMap.forEach(element => {
          Sum += Number(element.reduceFeeAmount);
        });
        return Sum.toFixed(2);
      }
      return (sum1 + sum2).toFixed(2);
    }
  },
  created() {
    // 提前还款-待办查询
    this.trans_serial_no = this.detailData.trans_serial_no;
    let estimatedPayoffDate = this.date_style(
      this.detailData.estimated_payoff_date
    );
    let para = {
      trans_serial_no: this.trans_serial_no,
      estimated_payoff_date: estimatedPayoffDate
    };
    this.pendingPrepay(para)
      .then(data => {
        if (!data.trialFlag) {
          this.trialFlag = true;
          this.trialMsg = `资金方返回信息：${data.trialMsg}。以上次试算结果为准。是否继续该笔业务？`;
        }
        this.getDate(data);
        this.getInfo(data);
      })
      .catch(err => {
        this.$error(err.message);
      });
    // 渠道列表
    this.ChannelListApi({}); // 渠道列表接口
  },
  methods: {
    // 提前还款代办渠道校验
    prepaymentCheckChannel(res) {
      return new Promise((resolve, reject) => {
        this.$MyFetch
          .post(counterDealApi.prepaymentCheckChannel, res)
          .then((data = {}) => {
            if (data.isSuccess) {
              resolve(data);
            } else {
              reject(data.msg);
            }
          })
          .catch(err => {
            this.$error(err.message);
          });
      });
    },
    // 关闭
    trialFlagClose() {
      this.trialFlag = false;
      this.$emit("clsoe_windowDetail");
    },
    // 确认该笔业务
    affirm_trial_fun() {
      this.trialFlag = false;
    },
    // 关闭邮件提示
    email_close() {
      this.email_flag = false;
      this.file = "";
      this.fileName = "";
      this.fileMsg = "";
      this.fileId = "";
    },
    elOchange(file, filelist) {
      if (filelist.length > 1) {
        // 让上传文件只有一个
        this.$refs.upload.uploadFiles.shift();
      }
      this.fileMsg = "";
      this.hint = false;
      let fileSize = file.size / 1024 / 1024;
      if (fileSize > 20) {
        this.fileMsg = "上传文件不能大于20M！";
        this.hint = true;
      }
      this.fileName = file.name;
    },
    onSuccess(data) {
      if (data.code === "200") {
        // 上传成功， 发送邮件
        this.FileSaveFun();
      } else {
        this.loading = false;
        this.$error(`数据提交成功，邮件发送失败：文件上传失败！`);
        this.email_close();
        this.$emit("prepaymentReload");
        this.loading = false;
        this.$emit("clsoe_windowDetail");
      }
    },
    // 上传失败
    onError(data) {
      this.$error(`数据提交成功，邮件发送失败：文件上传失败！`);
      this.email_close();
      this.$emit("prepaymentReload");
      this.loading = false;
      this.$emit("clsoe_windowDetail");
    },
    submitUpload() {
      let _that = this;
      let fileTypeArr = this.fileName.split(".");
      // 判断文件类型
      let fileType = fileTypeArr[fileTypeArr.length - 1];
      let data = {
        storageTime: "90d",
        extensionName: fileType,
        storageType: "NAS"
      };
      new Promise((resolve, reject) => {
        this.$MyFetch
          .post(counterDealApi.newFile, data)
          .then(data => {
            // fileid
            _that.fileId = data.fileInfo.fileId;
            _that.uploadData = {
              fileId: _that.fileId,
              sessionToken: data.credentials.sessionToken,
              tmpSecretId: data.credentials.tmpSecretId,
              tmpSecretKey: data.credentials.tmpSecretKey
            };
            resolve(data);
          })
          .catch(err => {
            reject(err.message);
          });
      })
        .then(data => {
          _that.$refs.upload.submit();
        })
        .catch(err => {
          this.$error(`数据提交成功，邮件发送失败：文件上传失败！${err}`);
          this.email_close();
          this.$emit("prepaymentReload");
          this.loading = false;
          this.$emit("clsoe_windowDetail");
        });
    },
    // 邮件保存按钮
    finish() {
      let _that = this;
      this.$refs.writeInfo2.validate(valid => {
        if (valid) {
          // 文件不能超过20m
          if (this.hint) {
            return;
          }
          // 判断文件格式
          let fileTypeArr = this.fileName.split(".");
          let fileType = fileTypeArr[fileTypeArr.length - 1];
          this.hint = false;
          this.fileMsg = "";
          if (
            this.accept.indexOf(fileType.toLocaleUpperCase()) < 0 &&
            fileType
          ) {
            this.hint = true;
            this.fileMsg = "请选择正确的文件格式上传";
            return;
          }
          // 邮件弹窗loading
          this.loading = true;
          // 保存数据
          let datas = _that.countQueryData();
          // 保存
          _that
            .pendingSave(datas)
            .then(data => {
              // 邮件附件为空也可保存
              if (_that.fileName === null || this.fileName === "") {
                _that.FileSaveFun();
              } else {
                // 否则上传文件并保存
                _that.submitUpload();
              }
            })
            .catch(err => {
              this.$error(err);
              this.loading = false;
              this.email_close();
            });
        }
      });
    },
    // 发送邮件
    prepaymentSendEMail(res) {
      return new Promise((resolve, reject) => {
        this.$MyFetch
          .post(counterDealApi.prepaymentSendEMail, res)
          .then((data = {}) => {
            resolve(data);
          })
          .catch(err => {
            this.$error(err.message);
            reject(err);
          });
      });
    },
    // FileSaveFun
    FileSaveFun() {
      let _that = this;
      // 出账编号
      let loanNo = _that.loan_no;
      let queryData = {
        attachFilesName: _that.fileName,
        attachFiles: _that.fileId,
        loanNo: loanNo,
        emailType: "PENDING", // 邮件流程
        toAddress: _that.writeInfo2.toAddress, // 发件人
        toCarBonCopy: _that.writeInfo2.toCarBonCopy // 收件人
      };
      this.prepaymentSendEMail(queryData)
        .then(data => {
          _that.$message(data.message);
          _that.email_close();
          _that.$emit("prepaymentReload");
          _that.loading = false;
          _that.$emit("clsoe_windowDetail");
        })
        .catch(err => {
          _that.$message.error(err);
          _that.email_close();
          _that.$emit("prepaymentReload");
          _that.loading = false;
          _that.$emit("clsoe_windowDetail");
        });
    },
    // 提前还款-待办保存
    pendingSave(res) {
      return new Promise((resolve, reject) => {
        this.$MyFetch
          .post(counterDealApi.pendingSave, res)
          .then((data = {}) => {
            resolve(data);
          })
          .catch(err => {
            reject(err.message);
          });
      });
    },
    // 提前还款-待办保存金额校验
    prepaymentCheckAmt(res) {
      return new Promise((resolve, reject) => {
        this.$MyFetch
          .post(counterDealApi.prepaymentCheckAmt, res)
          .then((data = {}) => {
            resolve(data);
          })
          .catch(err => {
            reject(err.message);
          });
      });
    },
    // 毫秒转成日期格式
    date_style(data) {
      function change(t) {
        if (t < 10) {
          return "0" + t;
        } else {
          return t;
        }
      }
      var date = new Date(data * 1000); // 时间戳为10位需*1000，时间戳为13位的话不需乘1000;
      let Y = date.getFullYear() + "-";
      let M =
        (date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1) + "-";
      let D = change(date.getDate());
      return Y + M + D;
    },
    // 提前还款-待办查询
    pendingPrepay(para = {}) {
      return new Promise((resolve, reject) => {
        this.$MyFetch
          .post(counterDealApi.pendingPrepay, para)
          .then((data = {}) => {
            resolve(data);
          })
          .catch(err => {
            reject(err);
          });
      });
    },
    // 提前还款-判断是否上传影像
    prepaymentCheckUploan(res) {
      return new Promise((resolve, reject) => {
        this.$MyFetch
          .post(counterDealApi.prepaymentCheckUploan, res)
          .then((data = {}) => {
            if (data.result) {
              // 上传了影像
              resolve(data);
            } else {
              reject(data);
            }
          })
          .catch(err => {
            this.$error(err.message);
          });
      });
    },
    // 渠道列表
    ChannelListApi(res) {
      this.$MyFetch
        .get(counterDealApi.ChannelList, res)
        .then((data = {}) => {
          this.ChannelList = data;
        })
        .catch(err => {
          this.$error(err.message);
        });
    },
    // 赋值
    getDate(data) {
      this.corpRule = data.corpRule || []; // 相加金额
      this.feeRule = data.feeRule || []; // 相加费用
      this.ruleFlag = data.ruleFlag || "0"; // 是否按规则，1按规则
      this.loan_no = data.loan_no; // 出账编号
      this.apply_no = data.apply_no; // 申请编号
      this.productId = data.productId; // 产品id
      this.cert_no = data.cert_no; // 身份证号
      this.collaborate = data.collaborate; // 合作模式
      this.customer_name = data.customer_name; // 客户姓名
      this.line_id = data.line_id; // 放款机构
      this.sterm = data.sterm; // 期次
      this.loan_status = data.loan_status; // 逾期标志
      this.ChannelObj.ChannelValue = data.channelCode;
      this.estimated_payoff_date = data.appointDate; // 预约上门时间
      let onlineFlag = data.onlineFlag;
      if (onlineFlag === "1") {
        // 支持线上 只读
        this.readOnly = true;
      } else if (onlineFlag === "0") {
        // 支持线下 可写
        this.readOnly = false;
      }
    },
    // 点击试算应显示的值
    getInfo(data) {
      // writeInfo
      this.writeInfo.payCorp = data.payCorp; // 剩余本金
      this.writeInfo.payInte = data.payInte; // 费用数组
      this.writeInfo.ddPayInte = data.ddPayInte; // 当前利息
      this.writeInfo.ddPayCorp = data.ddPayCorp; // 当前利息
      this.writeInfo.ddPayFine = data.ddPayFine; // 未结清罚息
      this.writeInfo.ddPayCompound = data.ddPayCompound; // 未结清复利
      this.pay.feeMap = data.feeMap; // 费用数组
      this.writeInfo.feeMap = data.feeMap; // 费用数组
      // 动态费用列表，为了验证
      if (data.feeMap.length > 0) {
        let feeMap = [];
        data.feeMap.forEach(element => {
          let obj = {};

          obj["actualFeeAmount"] =
            element.feeType === "3010" ? element.feeAmount : "0";
          obj["actualFeeName"] = element.feeName;
          obj["actualFeeType"] = element.feeType;
          obj["reduceFeeAmount"] = "0";
          obj["reduceFeeName"] = element.feeName;
          obj["reduceFeeType"] = element.feeType;
          obj["feeAmount"] = element.feeAmount;
          obj["feeName"] = element.feeName;
          obj["feeType"] = element.feeType;
          feeMap.push(obj);
        });
        this.feeMapObj["feeMap"] = feeMap;
      }
    },
    // 关闭弹窗
    close() {
      this.$emit("clsoe_windowDetail");
    },
    // 打印预览
    viewApplication(res) {
      return new Promise((resolve, reject) => {
        this.$MyFetch
          .post(counterDealApi.viewApplication, res)
          .then((data = {}) => {
            resolve(data);
          })
          .catch(err => {
            reject(err);
          });
      });
    },
    // 打印提前还款申请表
    print_fun() {
      // loading
      this.boxLoading = true;
      console.log("打印提前还款申请表");
      this.viewApplication({ loanNo: this.loan_no })
        .then((data = {}) => {
          this.boxLoading = false;
          window.open(data, "_blank");
        })
        .catch(err => {
          this.boxLoading = false;
          this.$error(err.message);
        });
    },
    // 上传影像
    upload_fun() {
      let loanNo = this.apply_no;
      let selectProductId = this.productId;
      this.$showImage(loanNo, "提前还款", { selectProductId: selectProductId });
    },
    // 计算保存的参数，并保存
    countQueryData() {
      // pay
      this.pay.payCorp = this.writeInfo.payCorp; // 剩余本金
      this.pay.payInte = this.writeInfo.payInte; // 费用数组
      this.pay.ddPayInte = this.writeInfo.ddPayInte; // 当前利息
      this.pay.ddPayCorp = this.writeInfo.ddPayCorp; // 当前利息
      this.pay.ddPayFine = this.writeInfo.ddPayFine; // 未结清罚息
      this.pay.ddPayCompound = this.writeInfo.ddPayCompound; // 未结清复利
      let actualFeeMap = [];
      let reduceFeeMap = [];
      // 应还费用数组 feeMap
      let payFeeMap = [];
      // 获取actual和reduce的feemap
      if (this.pay.feeMap.length > 0) {
        this.feeMapObj.feeMap.forEach(element => {
          let actualObj = {};
          let reduceObj = {};
          let payFeeObj = {};
          payFeeObj["feeAmount"] = element.feeAmount;
          payFeeObj["feeName"] = element.feeName;
          payFeeObj["feeType"] = element.feeType;
          actualObj["feeAmount"] = element.actualFeeAmount;
          actualObj["feeName"] = element.actualFeeName;
          actualObj["feeType"] = element.actualFeeType;
          reduceObj["feeAmount"] = element.reduceFeeAmount;
          reduceObj["feeName"] = element.reduceFeeName;
          reduceObj["feeType"] = element.reduceFeeType;
          actualFeeMap.push(actualObj);
          reduceFeeMap.push(reduceObj);
          payFeeMap.push(payFeeObj);
        });
      }
      this.pay.feeMap = payFeeMap;
      // 保存参数
      let datas = {
        phaseNo: "0020",
        trans_serial_no: this.trans_serial_no,
        loan_no: this.loan_no,
        tran_channel: this.ChannelObj.ChannelValue,
        pay: this.pay,
        // 实还金额
        actual: {
          payCorp: this.writeInfo.actual_payCorp, // 剩余本金
          payInte: this.writeInfo.actual_payInte, // 应还利息
          ddPayCorp: this.writeInfo.actual_ddPayCorp, // 未结清本金
          ddPayInte: this.writeInfo.actual_ddPayInte, // 当前利息
          ddPayFine: this.writeInfo.actual_ddPayFine, // 未结清罚息
          ddPayCompound: this.writeInfo.actual_ddPayCompound, // 未结清复利
          feeMap: actualFeeMap // 费用数组
        },
        // 减免金额
        reduce: {
          payCorp: this.writeInfo.reduce_payCorp, // 剩余本金
          payInte: this.writeInfo.reduce_payInte, // 应还利息
          ddPayCorp: this.writeInfo.reduce_ddPayCorp, // 未结清本金
          ddPayInte: this.writeInfo.reduce_ddPayInte, // 当前利息
          ddPayFine: this.writeInfo.reduce_ddPayFine, // 未结清罚息
          ddPayCompound: this.writeInfo.reduce_ddPayCompound, // 未结清复利
          feeMap: reduceFeeMap // 费用数组
        }
      };
      return datas;
    },
    // 确认
    affirm_fun() {
      let _that = this;
      // 渠道列表验证
      this.$refs.ChannelObj.validate(valid => {
        if (valid) {
          // 金额验证
          this.$refs.writeInfo.validate(valid => {
            if (valid) {
              // 费用验证 feeMapObj
              this.$refs.feeMapObj.validate(valid => {
                if (valid) {
                  // 校验
                  let checkQueryData = {
                    loanNo: _that.loan_no,
                    channel: _that.ChannelObj.ChannelValue // 交易渠道
                  };
                  _that
                    .prepaymentCheckChannel(checkQueryData)
                    .then(data => {
                      // loading
                      this.boxLoading = true;
                      let prepaymentCheckAmtData = _that.countQueryData();
                      _that
                        .prepaymentCheckAmt(prepaymentCheckAmtData)
                        .then(data => {
                          let uploanData = {
                            applyId: this.apply_no,
                            productId: this.productId
                          };
                          // 判断影像资料是否上传
                          this.prepaymentCheckUploan(uploanData)
                            .then(data => {
                              // 上传了, 提交
                              if (_that.readOnly) {
                                // true为线上，上传影像，线下则发送邮件
                                let datas = _that.countQueryData();
                                // 保存
                                _that
                                  .pendingSave(datas)
                                  .then(data => {
                                    _that.boxLoading = false;
                                    _that.$emit("prepaymentReload");
                                    // magFlay为true，弹窗提示
                                    if (data.msgFlag) {
                                      _that.confirmFn(data.bankMsg);
                                      return;
                                    }
                                    _that.$emit("clsoe_windowDetail");
                                  })
                                  .catch(err => {
                                    _that.boxLoading = false;
                                    _that.$error(err);
                                  });
                              } else {
                                _that.boxLoading = false;
                                _that.$message(
                                  "该机构为线下机构，请发送邮件！"
                                );
                                _that.email_flag = true;
                              }
                            })
                            .catch(err => {
                              console.log(err);
                              _that.boxLoading = false;
                              _that.$error("影像资料未上传!");
                            });
                        })
                        .catch(err => {
                          this.boxLoading = false;
                          this.$error(err);
                        });
                    })
                    .catch(err => {
                      this.$error(err);
                    });
                }
              });
            }
          });
        }
      });
    }
  },
  components: {
    reconfirmHint // 确认组件
  }
};
</script>
