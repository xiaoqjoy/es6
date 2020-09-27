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
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    margin: auto;
    margin-bottom: 80px;
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
        margin-right: 60px;
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
        .print_t {
            border: 1px solid #538bf1;
            color: #538bf1;
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
            <span class="item_title">制单日期:&nbsp;&nbsp;</span>
            <i class="item_data">{{ bussinessDate }}</i>
          </div>
        </div>
        <!-- 扣款渠道 -->
        <el-form :model="ChannelObj" :rules="rules3" ref="ChannelObj">
          <div class="select_item">
            <div class="select_title">
              <span><b style="color: red;">*</b>记账日期</span>
            </div>
            <div class="select_input" style="margin-top: 8px;">
              <el-form-item prop="tallyDate">
                <el-date-picker
                type="date"
                v-model="ChannelObj.tallyDate"
                value-format="yyyy-MM-dd"
                placeholder="请选择">
              </el-date-picker>
              </el-form-item>
            </div>
          </div>
          <div class="select_item">
            <div class="select_title">
              <span><b style="color: red;">*</b>扣款渠道</span>
            </div>
            <div class="select_input" style="margin-top: 8px;">
              <el-form-item prop="ChannelValue">
                <el-select v-model="ChannelObj.ChannelValue" placeholder="请选择">
                  <el-option v-for="item in ChannelList"
                    :key="item.itemNo"
                    :label="item.itemName"
                    :value="item.itemNo">
                  </el-option>
                </el-select>
              </el-form-item>
            </div>
          </div>
        </el-form>
        <!-- 表格 -->
        <div class="tableBox">
          <div class="tables">
            <!-- 表头 -->
            <div class="tableHeader">
              <div class="tableHeaderTd"></div>
              <div class="tableHeaderTd"><span>应还金额</span></div>
              <div class="tableHeaderTd"><span>减免金额</span></div>
              <div class="tableHeaderTd"><span></span></div>
            </div>
            <!-- 表体 -->
            <div class="tableBody">
              <el-form :model="writeInfo" :rules="rules" ref="writeInfo">
                <div class="tableBodyTr">
                  <div class="tableBodyTd1"><span class="spanStyle1">本金</span></div>
                  <div class="tableBodyTd2"><span class="spanStyle1">{{ trialData.payCorp }}</span></div>
                  <div class="tableBodyTd3">
                    <el-form-item prop="mitigateCorp">
                      <el-input v-model="writeInfo.mitigateCorp"></el-input>
                    </el-form-item>
                  </div>
                  <div class="tableBodyTd4"></div>
                </div>
                <div class="tableBodyTr">
                  <div class="tableBodyTd1"><span class="spanStyle1">利息</span></div>
                  <div class="tableBodyTd2"><span class="spanStyle1">{{ trialData.payInte }}</span></div>
                  <div class="tableBodyTd3">
                    <el-form-item prop="mitigateInte">
                      <el-input v-model="writeInfo.mitigateInte"></el-input>
                    </el-form-item>
                  </div>
                  <div class="tableBodyTd4"></div>
                </div>
                <div class="tableBodyTr">
                  <div class="tableBodyTd1"><span class="spanStyle1">罚息</span></div>
                  <div class="tableBodyTd2"><span class="spanStyle1">{{ trialData.payFine }}</span></div>
                  <div class="tableBodyTd3">
                    <el-form-item prop="mitigateFine">
                      <el-input v-model="writeInfo.mitigateFine"></el-input>
                    </el-form-item>
                  </div>
                  <div class="tableBodyTd4"></div>
                </div>
                <div class="tableBodyTr">
                  <div class="tableBodyTd1"><span class="spanStyle1">复利</span></div>
                  <div class="tableBodyTd2"><span class="spanStyle1">{{ trialData.payCompound }}</span></div>
                  <div class="tableBodyTd3">
                    <el-form-item prop="mitigateCompound">
                      <el-input v-model="writeInfo.mitigateCompound"></el-input>
                    </el-form-item>
                  </div>
                  <div class="tableBodyTd4"></div>
                </div>
                 <div class="tableBodyTr">
                  <div class="tableBodyTd1"><span class="spanStyle1">代垫罚息</span></div>
                  <div class="tableBodyTd2"><span class="spanStyle1">{{ trialData.ddPayFine }}</span></div>
                    <div class="tableBodyTd3">
                    <el-form-item prop="ddMitigateFine">
                      <el-input v-model="writeInfo.ddMitigateFine"></el-input>
                    </el-form-item>
                    </div>
                    <div class="tableBodyTd4"></div>
                </div>
                <div class="tableBodyTr">
                  <div class="tableBodyTd1"><span class="spanStyle1">代垫复利</span></div>
                  <div class="tableBodyTd2"><span class="spanStyle1">{{ trialData.ddPayCompound }}</span></div>
                    <div class="tableBodyTd3">
                      <el-form-item prop="ddMitigateCompound">
                        <el-input v-model="writeInfo.ddMitigateCompound"></el-input>
                      </el-form-item>
                    </div>
                    <div class="tableBodyTd4"></div>
                </div>
                <div v-for="(feeItem, feeIndex) of writeInfo.amounts" :key="feeIndex">
                  <div class="tableBodyTr">
                    <div class="tableBodyTd1"><span class="spanStyle1">{{ feeItem.feeName }}</span></div>
                    <div class="tableBodyTd2"><span class="spanStyle1">{{ feeItem.payAmount }}</span></div>
                      <div class="tableBodyTd3">
                        <el-form-item :prop="'amounts.'+feeIndex+'.actualAmount'" :rules="[{ required: true, trigger: 'blur', message: '请输入减免金额' },{ trigger: 'blur', validator: reportRules.NotTowDecimals },{ trigger: 'blur', validator: adjustFineRuless(feeIndex) }]">
                          <el-input v-model="feeItem.actualAmount"></el-input>
                        </el-form-item>
                      </div>
                      <div class="tableBodyTd4"></div>
                  </div>
                  <div class="tableBodyTr" v-show="feeItem.feeType === '006'">
                    <div class="tableBodyTd1"><span class="spanStyle1">费用罚息</span></div>
                    <div class="tableBodyTd2"><span class="spanStyle1">{{ feeItem.payFine }}</span></div>
                      <div class="tableBodyTd3">
                        <el-form-item :prop="'amounts.'+feeIndex+'.actualFine'" :rules="[{ required: true, trigger: 'blur', message: '请输入减免金额' },{ trigger: 'blur', validator: reportRules.NotTowDecimals },{ trigger: 'blur', validator: adjustFineRuless(feeIndex, 'payFine') }]">
                          <el-input v-model="feeItem.actualFine"></el-input>
                        </el-form-item>
                      </div>
                      <div class="tableBodyTd4"></div>
                  </div>
                </div>
              </el-form>
            </div>
          </div>
        </div>
        <div class="dialog-box__footer">
        <div class="footerBtn">
          <el-button class="t_button affirm_t button" @click="finish" :disabled="!trialData.loanNo">确认</el-button>
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
      reportRules: reportRules,
      userName: '张三',
      bussinessDate: '0000-00-00',
      trialData: {},
      importFlag: false,
      ChannelList: [],
      ChannelObj: {
        ChannelValue: '', // 渠道列表
        tallyDate: '' // 记账日期
      },
      rules3: {
        ChannelValue: [
            { required: true, trigger: 'change', message: '请选择' }
        ],
        tallyDate: [
            { required: true, trigger: 'change', message: '请选择' },
            { trigger: 'change', validator: this.tallyRules('businessDate', 'payDate') }
        ]
      },
      writeInfo: {
        mitigateCorp: "0",
        mitigateInte: "0",
        mitigateFine: "0",
        mitigateCompound: "0",
        ddMitigateFine: "0",
        ddMitigateCompound: "0",
        amounts: []
      },
      rules: {
        mitigateCorp: [
          { required: true, trigger: 'blur', message: '请输入减免金额' },
          { trigger: 'blur', validator: reportRules.NotTowDecimals },
          { trigger: 'blur', validator: this.adjustFineRules('payCorp') }
        ],
        mitigateInte: [
          { required: true, trigger: 'blur', message: '请输入减免金额' },
          { trigger: 'blur', validator: reportRules.NotTowDecimals },
          { trigger: 'blur', validator: this.adjustFineRules('payInte') }
        ],
        mitigateFine: [
          { required: true, trigger: 'blur', message: '请输入减免金额' },
          { trigger: 'blur', validator: reportRules.NotTowDecimals },
          { trigger: 'blur', validator: this.adjustFineRules('payFine') }
        ],
        mitigateCompound: [
          { required: true, trigger: 'blur', message: '请输入减免金额' },
          { trigger: 'blur', validator: reportRules.NotTowDecimals },
          { trigger: 'blur', validator: this.adjustFineRules('payCompound') }
        ],
        ddMitigateFine: [
          { required: true, trigger: 'blur', message: '请输入减免金额' },
          { trigger: 'blur', validator: reportRules.NotTowDecimals },
          { trigger: 'blur', validator: this.adjustFineRules('ddPayFine') }
        ],
        ddMitigateCompound: [
          { required: true, trigger: 'blur', message: '请输入减免金额' },
          { trigger: 'blur', validator: reportRules.NotTowDecimals },
          { trigger: 'blur', validator: this.adjustFineRules('ddPayCompound') }
        ]
      },
      feeListRules: {
        actualAmount: [
            { required: true, trigger: 'blur', message: '请输入减免金额' },
            { trigger: 'blur', validator: reportRules.NotTowDecimals }
          ]
      }
    };
  },
  created() {
    // 渠道列表
    this.ChannelListApi({}); // 渠道列表接口
    this.callUserID();
  },
  methods: {
    // 调整金额不得大于欠还金额！费用
    adjustFineRuless(index, type) {
      return (rule, value, callback) => {
        let amounts = this.writeInfo.amounts;
        let fee = amounts[index][type || 'payAmount'];
        if (Math.abs(Number(value)) > Number(fee)) {
          return callback(new Error('调整金额不得大于欠还金额！'));
        } else {
          callback();
        }
      };
    },
    // 调整金额不得大于欠还金额！
    adjustFineRules(ref1) {
      return (rule, value, callback) => {
        let trialData = this.trialData;
        let fine1 = trialData[ref1] || 0;
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
    // 制单
    reductionSave(res) {
      return new Promise((resolve, reject) => {
        this.$MyFetch.post(counterDealApi.reductionSave, res)
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
    // 记账日期不能小于营业日期
    tallyRules(ref1, ref2) {
      return (rule, value, callback) => {
        value = new Date(value).getTime();
        // 营业日期
        let date1 = this.trialData[ref1] || '1000-1-1';
        let value1 = new Date(date1).getTime();
        // 应还日期
        let date2 = this.trialData[ref2] || '1000-1-1';
        let value2 = new Date(date2).getTime();
        if (value > value1) {
          callback(new Error('记账日期不能大于营业日期' + date1));
        } else if (value < value2) {
          callback(new Error('记账日期不能小于应还日期' + date2));
        } else {
          callback();
        }
      };
    },
    // 用户名和时间
    callUserID() {
      this.$MyFetch.get(counterDealApi.callUserID)
      .then((data = {}) => {
          this.userName = data.userId;
          this.bussinessDate = data.bussinessDate;
          })
      .catch((err) => {
          this.$error(err.message);
      });
    },
    getImportData(trialData) {
      this.trialData = trialData;
      let amounts = trialData.amounts || [];
      this.$set(this.writeInfo, 'amounts', amounts);
      console.log(this.trialData, "this.trialdddd");
    },
    clsoe_import() {
      this.importFlag = false;
    },
    import_alert() {
      this.importFlag = true;
    },
    finish() {
      console.log(this.writeInfo, "writeInfo");
      let _this = this;
      this.$refs.ChannelObj.validate((valid) => {
        if (valid) {
          this.$refs.writeInfo.validate((valid) => {
            if (valid) {
              // 校验
              let checkQueryData = {
                loanNo: this.trialData.loanNo,
                transChannel: _this.ChannelObj.ChannelValue // 交易渠道
              };
              _this.checkData(checkQueryData)
              .then((data) => {
                // 保存
                let reductionSaveData = {
                  loanNo: _this.trialData.loanNo, // 出账编号
                  customerName: _this.trialData.loanNo, // 客户姓名
                  actualCorp: _this.writeInfo.mitigateCorp, // 减免本金
                  actualinte: _this.writeInfo.mitigateInte, // 减免利息
                  actualFine: _this.writeInfo.mitigateFine, // 减免罚息
                  actualCompound: _this.writeInfo.mitigateCompound, // 减免复利
                  actualDdFine: _this.writeInfo.ddMitigateFine, // 减免代垫罚息
                  actualDdCompound: _this.writeInfo.ddMitigateCompound, // 减免代垫复利
                  amounts: _this.writeInfo.amounts, 	// 非必须动态费用集合
                  transChannel: _this.ChannelObj.ChannelValue, // 交易渠道
                  flowNo: 'reductionFlow', // 流程reductionFlow
                  accDate: _this.ChannelObj.tallyDate // 记账日期
                };
                _this.reductionSave(reductionSaveData)
                .then((data) => {
                  _this.$message.success("保存成功！");
                  this.$emit("reload");
                  _this.close();
                })
                .catch((err) => {
                  _this.$error(err);
                });
              })
              .catch((err) => {
                _this.$error(err);
              });
            }
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
