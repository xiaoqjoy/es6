<style lang="less" rel="stylesheet/less" scoped>
/deep/.el-form-item {
  margin: 0px;
  width: 180px;
  .el-input__inner {
    box-sizing: border-box;
    width: 180px;
    line-height: 38px;
    background: #FFFFFF;
    border: 1px solid #d0d0d0;
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
    // margin-bottom: 80px;
    .dialog-box__top {
      margin: 0px;
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
    // 弹窗内容区域
    .dialog-box__content {
      .importBtn {
        margin-top: 20px;
        width: 100px;
        height: 40px;
        border: none;
        background: #538bf1;
        border-radius: 4px;
        color: #fff;
        display: block;
        cursor: pointer;
      }
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
            border: 1px solid #d0d0d0;
            box-sizing: border-box;
            color: #000;
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
            background: #ececec;
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
              .tableBodyTd1, .tableBodyTd2, .tableBodyTd3, .tableBodyTd4 {
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
                width: 180px;
                line-height: 38px;
                background: #ececec;
                border: 1px solid #d0d0d0;
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
  <div class="drop_loan">
    <div class="dialog-mask"></div>
    <div class="dialog-box">
      <!-- 弹窗上部分 -->
      <div class="dialog-box__top">
        <h5 class="title_type">新增</h5>
        <span class="el-icon-close button button__close" @click="close"></span>
      </div>
      <!-- 弹窗内容区 -->
      <div class="dialog-box__content">
        <div>
          <button class="importBtn button" @click="import_alert">+ 引入</button>
        </div>
        <!-- 标题 -->
        <div class="content_top">
          <span>基本信息</span>
        </div>
        <!-- 信息 -->
        <div class="dialog-box_info">
          <div class="info_item">
            <span class="item_title">出账编号:&nbsp;&nbsp;</span>
            <i class="item_data">{{ trialData.loanNo }}</i>
          </div>
          <div class="info_item">
            <span class="item_title">制单人:&nbsp;&nbsp;</span>
            <i class="item_data">{{ userName }}</i>
          </div>
          <div class="info_item">
            <!-- <span class="item_title">制单日期:&nbsp;&nbsp;</span>
            <i class="item_data">2018/5/1</i> -->
          </div>
        </div>
        <!-- 调整日期 -->
        <el-form :model="ChannelObj" :rules="rules3" ref="ChannelObj">
          <div class="select_item">
            <div class="select_title">
              <span><b style="color: red;">*</b>调整日期</span>
            </div>
            <div class="select_input" style="margin-top: 8px;">
              <el-form-item>
                <el-date-picker
                type="date"
                v-model="adjustDate"
                value-format="yyyy-MM-dd"
                placeholder="请选择">
              </el-date-picker>
              </el-form-item>
            </div>
          </div>
          <div class="select_item">
              <el-button class="print_t button" :disabled="!(trialData.loanNo && adjustDate)" @click="countFun">计算</el-button>
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
                  <div class="tableBodyTd2"><span class="spanStyle1">{{ trialData.payFine }}</span></div>
                  <div class="tableBodyTd3"><span class="spanStyle1">{{ trialData.actualFine }}</span></div>
                  <div class="tableBodyTd4">
                    <el-form-item prop="adjustPayFine">
                      <el-input v-model="writeInfo.adjustPayFine"></el-input>
                    </el-form-item>
                  </div>
                </div>
                <div class="tableBodyTr">
                  <div class="tableBodyTd1"><span class="spanStyle1">复利</span></div>
                  <div class="tableBodyTd2"><span class="spanStyle1">{{ trialData.payCompound }}</span></div>
                  <div class="tableBodyTd3"><span class="spanStyle1">{{ trialData.actualCompound }}</span></div>
                  <div class="tableBodyTd4">
                    <el-form-item prop="adjustPayCompound">
                      <el-input v-model="writeInfo.adjustPayCompound"></el-input>
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
          <el-button class="t_button affirm_t button" @click="finish" :disabled="!(trialData.loanNo && adjustDate)">确认</el-button>
        </div>
      </div>
      </div>
    </div>
    <importPriorMatch v-if="importFlag" @clsoe_import="clsoe_import" @getImportData="getImportData"></importPriorMatch>
  </div>
</template>
<script type="text/ecmascript-6">
import "@common/css/dialog";
import { counterDealApi } from "@/system/adjust-accounts/counter-deal/js/server"; // 接口
import reportRules from "@/system/adjust-accounts/counter-deal/js/reportRules"; // 正则
import importPriorMatch from "../../sponsor/importPriorMatch/"; // 引入
export default {
  data() {
    return {
      submitFlag: false,
      userName: "张三",
      adjustDate: '', // 调整日期
      trialData: {},
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
       adjustPayFine: 0,
       adjustPayCompound: 0
      },
      rules: {
        adjustPayFine: [
          { required: true, trigger: 'blur', message: '请输入调整金额!' },
          { trigger: 'blur', validator: reportRules.NotTowDecimals },
          { trigger: 'blur', validator: this.adjustFineRules('payFine') }
        ],
        adjustPayCompound: [
          { required: true, trigger: 'blur', message: '请输入调整金额!' },
          { trigger: 'blur', validator: reportRules.NotTowDecimals },
          { trigger: 'blur', validator: this.adjustFineRules('payCompound') }
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
    // this.ChannelListApi({}); // 渠道列表接口
    this.callUserID();
  },
  methods: {
    // 调整金额不得大于欠还金额！
    adjustFineRules(ref1) {
      return (rule, value, callback) => {
        let trialData = this.trialData;
        let fine1 = trialData[ref1] || 0;
        // let fine2 = trialData[ref2] || 0;
        if (Math.abs(Number(value)) > Number(fine1)) {
          return callback(new Error('调整金额不得大于欠还金额！'));
        } else {
          callback();
        }
      };
    },
    // 单笔公共校验数据在途
    checkData(res) {
      return new Promise((resolve, reject) => {
        this.$MyFetch.post(counterDealApi.checkData, res)
        .then((data = {}) => {
          if (data.success) {
            resolve(data);
          } else {
            reject(data.msg);
          }
        })
        .catch((err) => {
            this.$error(err.message);
        });
      });
    },
    // 用户名和时间
    callUserID() {
      this.$MyFetch.get(counterDealApi.callUserID)
      .then((data = {}) => {
          this.userName = data.userId;
          })
      .catch((err) => {
          this.$error(err.message);
      });
    },
    // 计算
    calPayInteFine(res = {}) {
      this.$MyFetch.post(counterDealApi.calPayInteFine, res)
      .then((data = {}) => {
        if (!data.success) {
          this.$error(data.msg);
          return;
        }
        this.submitFlag = true;
        this.writeInfo.adjustPayFine = data.adjustPayFine;
        this.writeInfo.adjustPayCompound = data.adjustPayCompound;
      })
      .catch((err) => {
          this.$error(err.message);
      });
    },
    // 制单
    createBackBill(res = {}) {
      this.$MyFetch.post(counterDealApi.createBackBill, res)
      .then((data = {}) => {
          if (!data.success) {
            this.$error(data.msg);
            return;
          }
          this.$emit('clsoe_windowAlert');
          this.$emit('reload');
      })
      .catch((err) => {
          this.$error(err.message);
      });
    },
    getImportData(trialData) {
      this.trialData = trialData;
    },
    clsoe_import() {
      this.importFlag = false;
    },
    import_alert() {
      this.importFlag = true;
    },
    countFun() {
      this.submitFlag = false;
      let queryData = {
        loanNo: this.trialData.loanNo,
        sterm: this.trialData.sterm,
        adjustDate: this.adjustDate,
        transType: this.trialData.transType
      };
      this.calPayInteFine(queryData);
    },
    finish() {
      let _this = this;
       this.$refs.writeInfo.validate((valid) => {
         if (valid) {
           if (!this.submitFlag) {
             this.$error("请先计算调整金额！");
             return;
           }
           // 校验在途
           let checkQueryData = {
             loanNo: this.trialData.loanNo
           };
           this.checkData(checkQueryData)
           .then((data) => {
             let queryData = {
               loanNo: _this.trialData.loanNo,
               sterm: _this.trialData.sterm,
               payDate: _this.trialData.payDate,
               adjustDate: _this.adjustDate,
               payFine: _this.trialData.payFine,
               actualFine: _this.trialData.actualFine, // 减免罚息
               actualCompound: _this.trialData.actualCompound, // 减免复利
               adjustFine: _this.writeInfo.adjustPayFine,
               payCompound: _this.trialData.payCompound,
               adjustCompound: _this.writeInfo.adjustPayCompound,
               flowNo: "intFineFlow",
               transType: _this.trialData.transType
             };
             _this.createBackBill(queryData);
           })
           .catch((err) => {
             this.$error(err);
           });
         }
       });
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
      this.$emit("clsoe_windowAlert");
    }
  },
  components: {
    importPriorMatch
  }
};
</script>
