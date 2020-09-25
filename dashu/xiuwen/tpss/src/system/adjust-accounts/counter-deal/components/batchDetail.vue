<style lang="less" rel="stylesheet/less" scoped>
/deep/.el-form-item {
  margin: 0px;
  width: 180px;
  .el-input__inner {
    box-sizing: border-box;
    width: 180px;
    line-height: 38px;
    background: #FFFFFF;
    border: 1px solid #E5E5E5;
    border-radius: 4px;
    padding-left: 10px;
    font-family: PingFangSC-Regular;
    font-size: 12px;
    color: #333333;
    letter-spacing: 0;
  }
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
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    .dialog-box__top {
      margin: 0px;
    }
    .title_type {
      text-align: center;
      background: #fff;
      font-size: 18px;
      color: #333;
      padding-left: 20px;
      font-weight: normal;
      font-family: PingFangSC-Regular;
      letter-spacing: 1.38px;
    }
    // 弹窗内容区域
    .dialog-box__content {
      padding: 0 30px;
      // 基本信息
      .content_top {
        width: 100%;
        height: 60px;
        border-bottom: 1px solid #E5E5E5;
        display: flex;
        align-items: center;
        position: relative;
        &::before {
          content: "";
          width: 2px;
          height: 16px;
          background: #538BF1;
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
        padding-top: 15px;
        height: 80px;
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
      }
      .select_item {
        display: inline-block;
        width: 245px;
        white-space: nowrap;
        margin-bottom: 20px;
        margin-right: 40px;
        .print_t {
            width: 100px;
            height: 40px;
            border: 1px solid #538bf1;
            color: #538bf1;
            margin-top: 30px;
        }
        .select_title {
          span {
            font-family: PingFangSC-Regular;
            font-size: 12px;
            color: #BBBBBB;
            letter-spacing: 1.09px;
          }
        }
        .select_input {
          .el-form-item {
            width: 245px;
            /deep/ .el-input__inner {
              width: 245px;
            }
          }
          padding-top: 10px;
          .select_245 {
            display: inline-block;
            background-color: #fff;
            border-radius: 4px;
            border: 1px solid #dcdfe6;
            box-sizing: border-box;
            color: #606266;
            font-size: 12px;
            width: 245px;
            height: 40px;
            line-height: 40px;
            padding: 0 15px;
          }
        }
      }
      // 表格
      .tableBox {
        width: 100%;
        height: auto;
        .tables {
          // padding: 0 30px;
          border: 1px solid #E9E9E9;
          border-radius: 4px;
          // 表头
          .tableHeader {
            display: flex;
            background: #F9FAFB;
            box-shadow: 0 1px 0 0 #E5E5E5;
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
              .tableBodyTd1, .tableBodyTd2, .tableBodyTd3, .tableBodyTd4 {
                flex: 1;
                display: flex;
                height: 60px;
                align-items: center;
                padding-left: 20px;
              }
              .tableBodyTd1 {
                border-right: 1px solid #E5E5E5;
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
                width: 180px;
                line-height: 38px;
                background: #F9FAFB;
                border: 1px solid #E5E5E5;
                border-radius: 4px;
                padding-left: 10px;
                font-family: PingFangSC-Regular;
                font-size: 12px;
                color: #BBBBBB;
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
        .upload_t {
            background: #EEB352;
            color: #ffffff;
        }
        .count_t {
            background: #05838E;
            color: #ffffff;
        }
        .affirm_t {
            background: #538BF1;
            color: #ffffff;
        }
      }
    }
  }
}
</style>
<template>
<!-- 批量罚息复利调整-明细-详情 -->
  <div class="drop_loan">
    <div class="dialog-mask"></div>
    <div class="dialog-box">
      <!-- 弹窗上部分 -->
      <div class="dialog-box__top">
        <h5 class="title_type">详情</h5>
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
            <i class="item_data">16656262623</i>
          </div>
          <div class="info_item">
            <span class="item_title">制单人:&nbsp;&nbsp;</span>
            <i class="item_data">张三</i>
          </div>
          <div class="info_item" v-if="name!='sponsorDetail'">
            <span class="item_title">制单日期:&nbsp;&nbsp;</span>
            <i class="item_data">2018/5/1</i>
          </div>
        </div>
        <!-- 调整日期 -->
        <el-form v-if="name=='sponsorDetail'" :model="ChannelObj" :rules="rules3" ref="ChannelObj">
          <div class="select_item">
            <div class="select_title">
              <span><b style="color: red;">*</b>调整日期</span>
            </div>
            <div class="select_input" style="margin-top: 8px;">
              <el-form-item>
                <el-date-picker
                type="date"
                value-format="yyyy-MM-dd"
                placeholder="请选择">
              </el-date-picker>
              </el-form-item>
            </div>
          </div>
          <div class="select_item">
              <el-button class="print_t button">计算</el-button>
          </div>
        </el-form>
        <!-- 表格 -->
        <div class="tableBox">
          <div class="tables">
            <!-- 表头 -->
            <div class="tableHeader">
              <div class="tableHeaderTd"></div>
              <div class="tableHeaderTd"><span>应还金额</span></div>
              <div class="tableHeaderTd"><span>实还金额</span></div>
              <div class="tableHeaderTd"><span>调整金额</span></div>
            </div>
            <!-- 表体 -->
            <div class="tableBody">
              <el-form :model="writeInfo" :rules="rules" ref="writeInfo">
                <div class="tableBodyTr">
                  <div class="tableBodyTd1"><span class="spanStyle1">罚息</span></div>
                  <div class="tableBodyTd2"><span class="spanStyle1">100</span></div>
                  <div class="tableBodyTd3"><span class="spanStyle1">100</span></div>
                  <div class="tableBodyTd4">
                    <el-form-item>
                      <el-input></el-input>
                    </el-form-item>
                  </div>
                </div>
                <div class="tableBodyTr">
                  <div class="tableBodyTd1"><span class="spanStyle1">复利</span></div>
                  <div class="tableBodyTd2"><span class="spanStyle1">100</span></div>
                  <div class="tableBodyTd3"><span class="spanStyle1">100</span></div>
                  <div class="tableBodyTd4">
                    <el-form-item>
                      <el-input></el-input>
                    </el-form-item>
                  </div>
                </div>
                <!-- <div class="tableBodyTr" v-for="(feeItem, feeIndex) of writeInfo.feeList" :key="feeIndex">
                  <div class="tableBodyTd1"><span class="spanStyle1">{{ feeItem.feeName }}</span></div>
                  <div class="tableBodyTd2"><span class="spanStyle1">100</span></div>
                    <div class="tableBodyTd3">
                      <el-form-item :prop="'feeList.'+feeIndex+'.actualAmount'" :rules="feeListRules.actualAmount">
                        <el-input v-model="feeItem.actualAmount"></el-input>
                      </el-form-item>
                    </div>
                    <div class="tableBodyTd4"></div>
                </div> -->
              </el-form>
            </div>
          </div>
        </div>
        <div class="dialog-box__footer">
        <div class="footerBtn">
          <el-button class="t_button affirm_t button" @click="finish">确认</el-button>
        </div>
      </div>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import "@common/css/dialog";
import { counterDealApi } from "@/system/adjust-accounts/counter-deal/js/server"; // 接口
import reportRules from "@/system/adjust-accounts/counter-deal/js/reportRules"; // 正则
export default {
  // 负组件传来的值
  props: {
    name: {
      type: String,
      required: ''
    }
  },
  data() {
    return {
      importFlag: false,
      ChannelList: [],
      ChannelObj: {
        ChannelValue: '' // 渠道列表
      },
      rules3: {
        ChannelValue: [
            { required: true, trigger: 'change', message: '请填写' }
        ]
      },
      writeInfo: {
        corp: {},
        inte: {},
        ddcorp: {},
        ddinte: {},
        ddfind: {},
        ddcompound: {},
        feeList: []
      },
      rules: {
      },
      feeListRules: {
        payAmount: [
            { required: true, trigger: 'blur', message: '请填写' },
            { trigger: 'blur', validator: reportRules.nonNegative3 },
            { trigger: 'blur', validator: reportRules.surpassNumTwoBitAndNegative }
          ],
          actualAmount: [
            { required: true, trigger: 'blur', message: '请填写' },
            { trigger: 'blur', validator: reportRules.nonNegative3 },
            { trigger: 'blur', validator: reportRules.surpassNumTwoBitAndNegative }
          ],
          reductAmount: [
            { required: true, trigger: 'blur', message: '请填写' },
            { trigger: 'blur', validator: reportRules.nonNegative3 }
          ]
      }
    };
  },
  filters: {
    date_filters(data) {
          function change(t) {
              if (t < 10) {
                  return "0" + t;
              } else {
                  return t;
              }
          };
          if (data) {
          var date = new Date(data * 1000); // 时间戳为10位需*1000，时间戳为13位的话不需乘1000;
          let Y = date.getFullYear() + '-';
          let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
          let D = change(date.getDate());
          return Y + M + D;
        } else {
            return "---";
        }
    }
  },
  created() {
    // 渠道列表
    this.ChannelListApi({}); // 渠道列表接口
  },
  methods: {
    clsoe_import() {
      this.importFlag = false;
    },
    import_alert() {
      this.importFlag = true;
    },
    finish() {
    },
    // 渠道列表
    ChannelListApi(res) {
      this.$MyFetch.get(counterDealApi.ChannelList, res)
      .then((data = {}) => {
          this.ChannelList = data;
          })
      .catch((err) => {
          this.$error(err.message);
      });
    },
    // 赋值
    getDate(data) {
    },
    // 提前还款-待复核详情
    reviewDetail(res) {
        this.$MyFetch.post(counterDealApi.reviewDetail, res)
        .then((data = {}) => {
            this.getDate(data);
        })
        .catch((err) => {
            this.$error(err.message);
        });
    },
    // 关闭弹窗
    close() {
      this.$emit("close_batchDetail");
    }
  },
  components: {
  }
};
</script>
