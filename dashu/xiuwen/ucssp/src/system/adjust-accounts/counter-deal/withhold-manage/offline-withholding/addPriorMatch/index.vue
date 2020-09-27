<style lang="less" rel="stylesheet/less" scoped>

.drop_loan {
  // 公共样式
  /deep/ .el-form-item__label{
    float: none;
    color: #BBBBBB;
  }
  /deep/ .el-input__inner {
      width: 245px;
  }
  /deep/ .el-form-item__error {
    margin-top: 10px;
  }
  /deep/ .el-form-item__content{
    margin-top: 6px;
  }
  .dialog-mask {
    z-index: 1000;
  }
  .dialog-box {
    // height: 555px;
    .dialog-box__top {
      margin: 0px;
    }
    width: 590px;
    // height: 765px;
    padding: 0px;
    .title_type {
      text-align: center;
      background: #fff;
      font-size: 18px;
      color: #000;
      letter-spacing: 1.3px;
      padding-left: 20px;
      font-weight: normal;
      font-family: PingFangSC-Regular;
    }
    .el-form-item {
      width: 28%;
      margin-right: 40px;
    }
    .el-form-item .el-select {
      width: 245px;
    }
    .dialog-box__middle {
      // height: 495px;
      .middle {
        .el-select {
          display: block;
        }
        .el-textarea__inner {
          background: #d0d0d0;
        }
      }
    }
    .dialog-box__middle-form {
      // height: 495px;
      overflow-y: auto;
      .form__block {
        // height: 425px;
        padding: 20px 30px;
        box-shadow: 0 2px 6px 0 #d0d0d0;
      }
      .form__bottom {
        left: 50%;
        padding-bottom: 30px;
        background-color: rgba(255, 255, 255);
        .add {
          width: 200px;
          height: 40px;
        }
      }
    }
    // .el-form-item {
    //   width: 118px;
    //   height: 30px;
    //   margin-left: 20px;
    //   .el-form-item__content {
    //     width: 118px;
    //     height: 30px;
    //     // 不进审计详情分类 文字溢出隐藏
    //     .classification {
    //       width: 118px;
    //       height: 30px;
    //       overflow: hidden;
    //       text-overflow: ellipsis;
    //       white-space: nowrap;
    //     }
    //   }
    //   .el-form-item__content {
    //     width: 118px;
    //     height: 30px;
    //     .el-input-number {
    //       width: 118px;
    //       height: 30px;
    //     }
    //     .el-input {
    //       width: 118px;
    //       height: 30px;
    //     }
    //     .el-select {
    //       width: 118px;
    //       height: 30px;
    //       .el-input {
    //         width: 118px;
    //         height: 30px;
    //       }
    //     }
    //   }
    // }
  }
  /*表单区块*/
  .dialog-box__middle-form {
    .form__bottom {
      text-align: center;
      padding-bottom: 20px;
    }
  }
  // 弹窗下部分
  .complete-product {
    width: 100%;
    // height: 495px;
    // 编辑头部
    .editContent{
      display: flex;
      margin-bottom: 20px;
      div{
        flex: 1;
        font-size: 14px;
        color: #999999;
        line-height: 20px;
        span{
          font-size: 14px;
          color: #333333;
          line-height: 20px;
        }
      }
    }
    // 选择填写框
    .select_box {
      .select_item:nth-of-type(2n){
        margin-right: 0;
      }
      // .el-form-item:nth-of-type(2n){
      //   margin-right: 0;
      // }
      // .el-form-item {
      //   margin: 0;
      //   margin-right: 20px;
      //   .el-input__inner {
      //     width: 245px;
      //   }
      // }
      .select_item {
        display: inline-block;
        width: 245px;
        height: 66px;
        white-space: nowrap;
        margin-right: 20px;
        margin-bottom: 20px;
        .select_title {
          span {
            font-family: PingFangSC-Regular;
            font-size: 12px;
            color: #BBBBBB;
            letter-spacing: 1.09px;
          }
        }
        .select_input {
          position: relative;
          .select_input_shade {
            position: absolute;
            top: 0;
            left: 0;
            z-index: 99;
            top: 13px;
            left: 16px;
            width: 199px;
            height: 16px;
            background: #fff;
          }
          .select_245 {
            width: 245px;
          }
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
        <h5 class="title_type">{{alert_Msg === 'add'?'新增':'编辑'}}</h5>
        <span class="el-icon-close button button__close" @click="close"></span>
      </div>
      <!-- 弹窗下部分 -->
      <div class="complete-product">
        <div class="dialog-box__middle-form">
            <div class="form__block" >
              <el-form :model="writeInfo" :rules="rules" ref="writeInfo" >
                <!-- 选择填写框 -->
                  <!-- 编辑 -->
                  <div v-if="alert_Msg === 'edit'" class="editContent">
                    <div>合作方：<span>稠州银行</span> </div>
                    <div>资金方：<span>昆山银行</span> </div>
                    <div>分公司名称：<span>重庆分公司</span> </div>
                  </div>
                <div class="select_box">
                    <el-form-item  v-if="alert_Msg === 'add'" prop="actualFine" label="合作方" class="select_item">
                      <el-input v-model="writeInfo.actualFine" placeholder="请输入"></el-input>
                    </el-form-item>
                  <!-- 资金方 -->
                    <el-form-item  v-if="alert_Msg === 'add'" prop="actualCompound" label="资金方" class="select_item">
                      <el-input v-model="writeInfo.actualCompound" placeholder="请输入"></el-input>
                    </el-form-item>
                  <!-- 分公司名称 -->
                      <el-form-item  v-if="alert_Msg === 'add'" prop="ChanneCodeNo" label="分公司名称" class="select_item select_input">
                        <el-select v-model="writeInfo.ChanneCodeNo" class="select_245" placeholder="请选择">
                          <el-option v-for="item in ChannelList"
                            :key="item.itemNo"
                            :label="item.itemName"
                            :value="item.itemNo">
                          </el-option>
                        </el-select>
                      </el-form-item>
                  <!-- 合作模式 -->
                      <el-form-item prop="ChanneCodeNo" label="合作模式" class="select_item select_input">
                        <el-select v-model="writeInfo.ChanneCodeNo" class="select_245" placeholder="请选择">
                          <el-option v-for="item in ChannelList"
                            :key="item.itemNo"
                            :label="item.itemName"
                            :value="item.itemNo">
                          </el-option>
                        </el-select>
                      </el-form-item>
                  <!-- 扣款提醒 -->
                      <el-form-item prop="ChanneCodeNo" label="扣款提醒" class="select_item select_input">
                        <el-select v-model="writeInfo.ChanneCodeNo" class="select_245" placeholder="请选择">
                          <el-option v-for="item in ChannelList"
                            :key="item.itemNo"
                            :label="item.itemName"
                            :value="item.itemNo">
                          </el-option>
                        </el-select>
                      </el-form-item>
                  <!-- 机构对接人 -->
                    <el-form-item prop="actualInte" label="机构对接人" class="select_item">
                      <el-input v-model="writeInfo.actualInte" placeholder="请输入"></el-input>
                    </el-form-item>
                  <!-- 扣款发送邮箱 -->
                    <el-form-item prop="actualFine" class="select_item " label="扣款发送邮箱">
                      <el-input v-model="writeInfo.actualFine" placeholder="请输入"></el-input>
                    </el-form-item>
                  <!-- 扣款回盘邮箱 -->
                    <el-form-item prop="actualCompound" label="扣款回盘邮箱" class="select_item">
                      <el-input v-model="writeInfo.actualCompound" placeholder="请输入"></el-input>
                    </el-form-item>
                  <!-- 我司扣款发送邮箱 -->
                    <el-form-item prop="ddActualFine" label="我司扣款发送邮箱" class="select_item ">
                      <el-input v-model="writeInfo.ddActualFine" placeholder="请输入"></el-input>
                    </el-form-item>
                  <!-- 我司扣款回盘邮箱 -->
                    <el-form-item prop="ddActualCompound" label="我司扣款回盘邮箱" class="select_item">
                      <el-input v-model="writeInfo.ddActualCompound" placeholder="请输入"></el-input>
                    </el-form-item>
                   <!-- 合作方联系人 -->
                    <el-form-item prop="ddActualCompound" label="合作方联系人" class="select_item ">
                      <el-input v-model="writeInfo.ddActualCompound" placeholder="请输入"></el-input>
                    </el-form-item>
                   <!-- 扣款金额拆分 -->
                    <el-form-item prop="ddActualCompound" label="扣款金额拆分" class="select_item">
                      <el-input v-model="writeInfo.ddActualCompound" placeholder="请输入"></el-input>
                    </el-form-item>
                   <!-- 对接模式 -->
                      <el-form-item prop="ChanneCodeNo" label="对接模式" class="select_input select_item">
                        <el-select v-model="writeInfo.ChanneCodeNo" class="select_245" placeholder="请选择">
                          <el-option v-for="item in ChannelList"
                            :key="item.itemNo"
                            :label="item.itemName"
                            :value="item.itemNo">
                          </el-option>
                        </el-select>
                      </el-form-item>
                    </div>
              </el-form>
            </div>
            <div class="form__bottom">
              <el-button class="add finish button" type="primary" @click="finish">确认</el-button>
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
  props: ["refer", 'alert_Msg'],
  data() {
    return {
      finishFlag: true,
      alert_2: false, // 引入单笔还款 组件开关
      // 信息展示
      // 交易号
      businessCode: "",
      // 引入带入的信息， 交易号后面的选项
      importData: {},
      listMaps: [],
      // 填写信息
      writeInfo: {
        payDate: '', // 记账日期
        actualCorp: '0', // 实还本金
        actualInte: '0', // 实还利息
        actualFine: '0', // 实还罚息
        actualCompound: '0', // 实还复利息
        ddActualFine: '0', // 实还银行罚息
        ddActualCompound: '0', // 实还银行复利息
        ChanneCodeNo: '', // 渠道标识
        listMaps: []
      },
      form: {
        codeNo: "", // 渠道标识
        itemName: "", // 渠道名称
        itemNo: "" // 渠道编码
      },
      // 渠道列表
      ChannelList: [],
      listFee: [] // 费用列表
    };
  },
  computed: {
    rules() {
      return {actualCorp: [ // 实还本金
          { required: true, trigger: 'blur', message: '请输入' },
          { trigger: 'blur', validator: this.nonNegative3(this.importData.pay_corp) },
          { trigger: 'blur', validator: reportRules.surpassNumTwoBitAndNegative }
        ],
        actualInte: [ // 实还利息
          { required: true, trigger: 'blur', message: '请输入' },
          { trigger: 'blur', validator: this.nonNegative3(this.importData.pay_inte) },
          { trigger: 'blur', validator: reportRules.surpassNumTwoBitAndNegative }
        ],
        actualFine: [ // 实还罚息
          { required: true, trigger: 'blur', message: '请输入' },
          { trigger: 'blur', validator: this.nonNegative3(this.importData.pay_fine) },
          { trigger: 'blur', validator: reportRules.surpassNumTwoBitAndNegative }
        ],
        actualCompound: [ // 实还复利
          { required: true, trigger: 'blur', message: '请输入' },
          { trigger: 'blur', validator: this.nonNegative3(this.importData.pay_compound) },
          { trigger: 'blur', validator: reportRules.surpassNumTwoBitAndNegative }
        ],
         ddActualFine: [ // 实还银行罚息
          { required: true, trigger: 'blur', message: '请输入' },
          { trigger: 'blur', validator: this.nonNegative3(this.importData.dd_pay_fine) },
          { trigger: 'blur', validator: reportRules.surpassNumTwoBitAndNegative }
        ],
        ddActualCompound: [ // 实还银行复利
          { required: true, trigger: 'blur', message: '请输入' },
          { trigger: 'blur', validator: this.nonNegative3(this.importData.dd_pay_compound) },
          { trigger: 'blur', validator: reportRules.surpassNumTwoBitAndNegative }
        ],
        ChanneCodeNo: [
          { required: true, trigger: 'change', message: '请选择' }
        ],
        payDate: [
          { required: true, trigger: 'blur', message: '请选择' }
        ],
        actualAmount: [ // 实还本金
          { required: true, trigger: 'change', message: '请输入' }
          // { max: 10, trigger: 'blur', message: '请输入10字符以内' },
          // { trigger: 'blur', validator: reportValidator.noLengthSpecial }
        ]};
    }
  },
  mounted() {
    // this.ChannelListApi({}); // 渠道列表接口
    // this.CreateBusinessNumbers({
    //   "prefix": "LT"
    // }); // 生成业务编码
  },
  methods: {
    feeChange(value, ref, actualAmount) {
      // 提交开关
      this.finishFlag = this.submitFlag();
      console.log(this.finishFlag);
       this.$refs[ref][0].innerHTML = '';
       if (!value) {
          this.$refs[ref][0].innerHTML = '请输入';
       } else {
         const valReg = /^[+]{0,1}(\d+)$|^[+]{0,1}(\d+\.\d+)$/;
         const valReg2 = /^\d+(\.\d{1,2})?$/;
          if (!valReg.test(value) && !!value) {
            this.$refs[ref][0].innerHTML = '请输入正确的金额！';
          } else if (!valReg2.test(value) && !!value) {
            this.$refs[ref][0].innerHTML = '不能超过两位小数！';
          } else {
            value = Number(value);
            actualAmount = Number(actualAmount);
            if (value > actualAmount) {
              this.$refs[ref][0].innerHTML = '实还金额不能大于应还金额!';
            }
          }
       }
    },
    // 判断费用列表的验证，得出true false
  submitFlag() {
    let submitFlag = true;
    this.writeInfo.listMaps.forEach((item, index) => {
      let value = item.actualAmount;
      let actualAmount = item.pay_amount;
        if (!value) {
         submitFlag = false;
       } else {
         const valReg = /^[+]{0,1}(\d+)$|^[+]{0,1}(\d+\.\d+)$/;
          const valReg2 = /^\d+(\.\d{1,2})?$/;
          if (!valReg.test(value) && !!value) {
            submitFlag = false;
          } else if (!valReg2.test(value) && !!value) {
            submitFlag = false;
          } else {
            value = Number(value);
            actualAmount = Number(actualAmount);
            if (value > actualAmount) {
              submitFlag = false;
            }
          }
       }
    });
    return submitFlag;
  },
  // 数字验证
  nonNegative3: (actualAmount) => {
    return (rule, value, callback) => {
        const valReg = /^[+]{0,1}(\d+)$|^[+]{0,1}(\d+\.\d+)$/;
        if (!valReg.test(value) && !!value) {
          return callback(new Error('请输入正确的金额！'));
        } else {
          value = Number(value);
          actualAmount = Number(actualAmount);
          if (value > actualAmount) {
            callback(new Error('实还金额不能大于应还金额!'));
          } else {
            callback();
          }
        }
    };
  },
    // 保存字段
    saveField() {
      let saveFieldObj = {};
      // 流程名称
      saveFieldObj.processName = "normalPayFlow";
      saveFieldObj.billType = "20";
      // 交易号
      saveFieldObj.transSerialNo = this.businessCode;
      // 出账编号
      saveFieldObj.loanNo = this.importData.loan_no;
      // 期次
      saveFieldObj.sterm = this.importData.sterm;
      // 应还日期
      saveFieldObj.payDate = this.importData.pay_date;
      // 应还本金
      saveFieldObj.payCorp = this.importData.pay_corp;
      // 应还利息
      saveFieldObj.payInte = this.importData.pay_inte;
      // 应还罚息
      saveFieldObj.payFine = this.importData.pay_fine;
      // 应还罚息
      saveFieldObj.ddPayFine = this.importData.dd_pay_fine;
      // 应还复利
      saveFieldObj.payCompound = this.importData.pay_compound;
      // 应还复利
      saveFieldObj.ddPayCompound = this.importData.dd_pay_compound;
      // 记账渠道
      saveFieldObj.transChannel = this.writeInfo.ChanneCodeNo;
      // 记账日期
      saveFieldObj.accDate = this.writeInfo.payDate;
      // 实还本金
      saveFieldObj.actualCorp = this.writeInfo.actualCorp;
      // 实还利息
      saveFieldObj.actualInte = this.writeInfo.actualInte;
      // 实还罚息
      saveFieldObj.actualFine = this.writeInfo.actualFine;
      // 实还复利
      saveFieldObj.actualCompound = this.writeInfo.actualCompound;
      // 实还代垫罚息
      saveFieldObj.ddActualFine = this.writeInfo.ddActualFine;
      // 实还代垫复利
      saveFieldObj.ddActualCompound = this.writeInfo.ddActualCompound;
      // 费用
      // 如果费用列表不为空
      let cloneListMaps = JSON.parse(JSON.stringify(this.writeInfo.listMaps));
      if (cloneListMaps) {
        cloneListMaps.forEach((element, index) => {
          element.feeType = element.fee_type;
          element.payAmount = element.pay_amount;
          delete element.fee_type_name;
          delete element.fee_type;
          delete element.pay_amount;
        });
      }
      saveFieldObj.listFee = cloneListMaps;
       return new Promise((resolve, reject) => {
        // 调用保存接口
        this.SaveRepayment(saveFieldObj)
        .then((data) => {
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
    // 渠道列表
      ChannelListApi(res) {
        // this.$MyFetch.get(counterDealApi.ChannelList, res)
        // .then((data = {}) => {
        //     this.ChannelList = data;
        //     })
        // .catch((err) => {
        //     console.log(err);
        //     this.$error(err.message);
        // });
      },
      // 一般还款保存按钮接口
      SaveRepayment(res) {
        return new Promise((resolve, reject) => {
          this.$MyFetch.post(counterDealApi.SaveRepayment, res)
            .then((data = {}) => {
                console.log(data, '一般还款保存按钮接口成功返回数据');
                resolve(data);
            })
            .catch((err) => {
                reject(err);
            });
        });
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
    // 生成业务编码
      CreateBusinessNumbers(res) {
        this.$MyFetch.post(counterDealApi.CreateBusinessNumbers, res)
        .then((data = {}) => {
            this.businessCode = data.businessCode;
            })
        .catch((err) => {
            this.$error(err.message);
        });
      },
    close() {
      this.$emit("clsoe_windowAlert");
    },
    // 确认按钮
    finish(formName) {
      // input验证方法
      let _this = this;
      console.log(this.finishFlag);
        if (this.importData.loan_no) {
          this.$refs.writeInfo.validate((valid) => {
            if (valid) {
              if (_this.finishFlag) {
                let checkQueryData = {
                  loanNo: _this.importData.loan_no,
                  accDate: _this.writeInfo.payDate,
                  payDate: _this.importData.pay_date,
                  transChannel: _this.writeInfo.ChanneCodeNo
                };
                // 校验接口
                _this.checkData(checkQueryData)
                .then((data = {}) => {
                  _this.saveField()
                  .then(data => {
                    // 父页面重新请求总单查询
                    _this.$emit("querySearch");
                    // 关闭窗口
                    _this.$emit("clsoe_windowAlert");
                  })
                  .catch((err) => {
                    this.$error(err);
                  });
                })
                .catch((err) => {
                    this.$error(err);
                });
              }
            }
          });
        } else {
          this.$message("请引入出账编号");
        }
    },
    // 关闭引入单笔还款
    close_2() {
      this.alert_2 = false;
    },
    // 引入传来得数据
    importSendData(data) {
      this.importData = data || {};
      this.listMaps = data.listMaps || [];
      if (this.listMaps) {
        this.listMaps.forEach((item, index) => {
          item.actualAmount = "0";
        });
      }
      this.writeInfo.listMaps = this.listMaps;
    },
    // 点击引入按钮
    import_alert() {
      this.alert_2 = true;
    }
  },
  components: {
    // composite,
    // stateOfPreservation
  }
};
</script>
