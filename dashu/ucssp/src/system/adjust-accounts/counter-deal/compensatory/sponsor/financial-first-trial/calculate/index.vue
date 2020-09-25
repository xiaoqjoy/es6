<template>
  <div class="import-message">
    <div class="dialog-mask"></div>
    <div class="dialog-box">
      <!-- 头部 -->
      <div class="dialog-box__top">
        <h5 class="title bg__white">测算</h5>
        <span class="el-icon-close button button__close" @click="close_"></span>
      </div>
      <!-- 主体 -->
      <div class="dialog-box__body">
        <!-- 基本信息 -->
        <div class="anti-fraud_dialog-box__middle">
          <p class="anti-fraud_dialog-box__middle_one">
            <span></span>基本信息
          </p>
          <ul class="anti-fraud_dialog-box__middle_two">
            <li>
              <p>
                <span>客户姓名:</span>
                <span>{{ calculateDatail.customerName }}</span>
              </p>
            </li>
            <li>
              <p>
                <span>合作机构:</span>
                <span>{{ calculateDatail.lineidName }}</span>
              </p>
            </li>
            <li>
              <p>
                <span>身份证号码:</span>
                <span>{{ calculateDatail.certNo }}</span>
              </p>
            </li>
            <li>
              <p>
                <span>出账编号:</span>
                <span>{{ calculateDatail.loanNo }}</span>
              </p>
            </li>
            <li>
              <p>
                <span>代偿日期:</span>
                <!-- <span>{{ calculateDatail.buyDate }}</span> -->
                 <el-date-picker
                    v-model="calculateDatail.buyDate"
                    class="buydataCss"
                    style="width: 150px;"
                    type="date"
                    :clearable="false"
                    value-format="yyyy-MM-dd"
                    @change="bugDateChange"
                    placeholder="请选择">
                 </el-date-picker>
              </p>
            </li>
          </ul>
        </div>
        <!-- 减免金额信息 -->
        <div class="anti-fraud_dialog-box__middle">
          <p class="anti-fraud_dialog-box__middle_one">
            <span></span>代偿金额信息
          </p>
          <ul class="anti-fraud_dialog-box__middle_two">
            <li>
              <p>
                <span>代偿合计:</span>
                <span id="reducedTotal">￥{{ buySum }}</span>
              </p>
            </li>
          </ul>
          <div class="center">
            <div class="moude">
              <el-form :model="writeInfo" :rules="rules" ref="writeInfo">
                <ul>
                  <li>
                    <p>代偿银行本金</p>
                    <el-form-item prop="buyBankCorp">
                      <el-input class="select_245" v-model="writeInfo.buyBankCorp" placeholder="请输入"></el-input>
                    </el-form-item>
                  </li>
                  <li>
                    <p>代偿银行利息</p>
                    <el-form-item prop="buyBankInte">
                      <el-input class="select_245" v-model="writeInfo.buyBankInte" placeholder="请输入"></el-input>
                    </el-form-item>
                  </li>
                  <li>
                    <p>代偿银行罚息</p>
                    <el-form-item prop="buyBankFine">
                      <el-input class="select_245" v-model="writeInfo.buyBankFine" placeholder="请输入"></el-input>
                    </el-form-item>
                  </li>
                  <li>
                    <p>代偿银行复利</p>
                    <el-form-item prop="buyBankCompound">
                      <el-input class="select_245" v-model="writeInfo.buyBankCompound" placeholder="请输入"></el-input>
                    </el-form-item>
                  </li>
                  <li>
                    <p>代偿银行保险费</p>
                    <el-form-item prop="buyBankInsurance">
                      <el-input class="select_245" v-model="writeInfo.buyBankInsurance" placeholder="请输入"></el-input>
                    </el-form-item>
                  </li>
                  <li>
                    <p>代垫银行保险费</p>
                    <el-form-item prop="buyDdInsurance">
                      <el-input class="select_245" v-model="writeInfo.buyDdInsurance" placeholder="请输入"></el-input>
                    </el-form-item>
                  </li>
                  <li>
                    <p>代垫大数本金</p>
                    <el-form-item prop="buyDdCorp">
                      <el-input class="select_245" v-model="writeInfo.buyDdCorp" placeholder="请输入"></el-input>
                    </el-form-item>
                  </li>
                  <li>
                    <p>代垫大数利息</p>
                    <el-form-item prop="buyDdInte">
                      <el-input class="select_245" v-model="writeInfo.buyDdInte" placeholder="请输入"></el-input>
                    </el-form-item>
                  </li>
                  <li>
                    <p>代垫罚息</p>
                    <el-form-item prop="buyDdFine">
                      <el-input class="select_245" v-model="writeInfo.buyDdFine" placeholder="请输入"></el-input>
                    </el-form-item>
                  </li>
                  <li>
                    <p>代垫复利</p>
                    <el-form-item prop="buyDdCompound">
                      <el-input class="select_245" v-model="writeInfo.buyDdCompound" placeholder="请输入"></el-input>
                    </el-form-item>
                  </li>
                  <li>
                    <p>代偿大数复利</p>
                    <el-form-item prop="buyDsfCompound">
                      <el-input class="select_245" v-model="writeInfo.buyDsfCompound" placeholder="请输入"></el-input>
                    </el-form-item>
                  </li>
                  <li>
                    <p>代偿大数罚息</p>
                    <el-form-item prop="buyDsfFine">
                      <el-input class="select_245" v-model="writeInfo.buyDsfFine" placeholder="请输入"></el-input>
                    </el-form-item>
                  </li>
                  <li>
                    <p>代偿大数咨询费（评审费）</p>
                    <el-form-item prop="buyDsfConsult">
                      <el-input class="select_245" v-model="writeInfo.buyDsfConsult" placeholder="请输入"></el-input>
                    </el-form-item>
                  </li>
                  <li>
                    <p>代偿大数管理费（担保费）</p>
                    <el-form-item prop="buyDsfGuarantee">
                      <el-input class="select_245" v-model="writeInfo.buyDsfGuarantee" placeholder="请输入"></el-input>
                    </el-form-item>
                  </li>
                  <li>
                    <p>代偿保费</p>
                    <el-form-item prop="buyPremiumFee">
                      <el-input class="select_245" v-model="writeInfo.buyPremiumFee" placeholder="请输入"></el-input>
                    </el-form-item>
                  </li>
                </ul>
              </el-form>
            </div>
          </div>
        </div>
      </div>
      <!-- 底部 -->
      <div class="text__center">
        <el-button type="primary" @click="submit_confirm">保存</el-button>
      </div>
    </div>
    <reconfirmHint v-if="ReconfirmFlag" :massage="ReconfirmMsg" @close="ReconfirmClose" @backFun="ReconfirmBackFun"></reconfirmHint>
  </div>
</template>
<script type="text/ecmascript-6">
import { counterDealApi } from "@/system/adjust-accounts/counter-deal/js/server"; // 接口
import reportRules from "@/system/adjust-accounts/counter-deal/js/reportRules"; // 正则
import reconfirmHint from "@/system/adjust-accounts/counter-deal/components/reconfirm-hint"; // 再次确认组件
export default {
  props: ['calculateDatail'],
  data() {
    return {
      orginBuyBankCorp: 0,
      ReconfirmFlag: false,
      trialFlag: false, // 测算保存时得开关
      ReconfirmMsg: '代偿利息不应小于总逾期利息，是否仍进行记账操作？',
      // 填写信息
      writeInfo: {
        buySum: '0', // 总计
        buyBankCorp: "0", // 代偿银行本金,
        buyBankInte: "0", // 代偿银行利息,
        buyBankFine: "0", // 代偿银行罚息,
        buyBankCompound: "0", // 代偿银行复利,
        buyBankInsurance: "0", // 代偿银行保险费,
        buyDdInsurance: "0", //	代垫银行保险费
        buyDdCorp: "0", // 代垫大数本金,
        buyDdInte: "0", // 代垫大数利息,
        buyDdFine: "0", // 代垫罚息,
        buyDdCompound: "0", // 代垫复利,
        buyDsfCompound: "0", //	代偿大数复利,
        buyDsfFine: "0", //	代偿大数罚息,
        buyDsfConsult: "0", // 代偿咨询费、评审费,
        buyDsfGuarantee: "0", // 代偿担保费、管理费,
        buyPremiumFee: "0" // 代偿保费
      },
      rules: {
        // actualCorp: [ // 实还本金
        //   { required: true, trigger: 'blur', message: '请填写' },
        //   { trigger: 'blur', validator: reportValidator.nonNegative3 }
        //   // { max: 10, trigger: 'blur', message: '请输入10字符以内' },
        //   // { trigger: 'blur', validator: this.actualAmount(11) }
        // ]
        buyBankCorp: [
          { required: true, trigger: 'blur', message: '请填写' },
          { trigger: 'blur', validator: reportRules.nonNegative3 },
          { trigger: 'blur', validator: reportRules.surpassNumTwoBitAndNegative }
        ], // 代偿银行本金,
        buyBankInte: [
          { required: true, trigger: 'blur', message: '请填写' },
          { trigger: 'blur', validator: reportRules.nonNegative3 },
          { trigger: 'blur', validator: reportRules.surpassNumTwoBitAndNegative }
        ], // 代偿银行利息,
        buyBankFine: [
          { required: true, trigger: 'blur', message: '请填写' },
          { trigger: 'blur', validator: reportRules.nonNegative3 },
          { trigger: 'blur', validator: reportRules.surpassNumTwoBitAndNegative }
        ], // 代偿银行罚息,
        buyBankCompound: [
          { required: true, trigger: 'blur', message: '请填写' },
          { trigger: 'blur', validator: reportRules.nonNegative3 },
          { trigger: 'blur', validator: reportRules.surpassNumTwoBitAndNegative }
        ], // 代偿银行复利,
        buyBankInsurance: [
          { required: true, trigger: 'blur', message: '请填写' },
          { trigger: 'blur', validator: reportRules.nonNegative3 },
          { trigger: 'blur', validator: reportRules.surpassNumTwoBitAndNegative }
        ], // 代偿银行保险费,
        buyDdInsurance: [
          { required: true, trigger: 'blur', message: '请填写' },
          { trigger: 'blur', validator: reportRules.nonNegative3 },
          { trigger: 'blur', validator: reportRules.surpassNumTwoBitAndNegative }
        ], //	代垫银行保险费
        buyDdCorp: [
          { required: true, trigger: 'blur', message: '请填写' },
          { trigger: 'blur', validator: reportRules.nonNegative3 },
          { trigger: 'blur', validator: reportRules.surpassNumTwoBitAndNegative }
        ], // 代垫大数本金,
        buyDdInte: [
          { required: true, trigger: 'blur', message: '请填写' },
          { trigger: 'blur', validator: reportRules.nonNegative3 },
          { trigger: 'blur', validator: reportRules.surpassNumTwoBitAndNegative }
        ], // 代垫大数利息,
        buyDdFine: [
          { required: true, trigger: 'blur', message: '请填写' },
          { trigger: 'blur', validator: reportRules.nonNegative3 },
          { trigger: 'blur', validator: reportRules.surpassNumTwoBitAndNegative }
        ], // 代垫罚息,
        buyDdCompound: [
          { required: true, trigger: 'blur', message: '请填写' },
          { trigger: 'blur', validator: reportRules.nonNegative3 },
          { trigger: 'blur', validator: reportRules.surpassNumTwoBitAndNegative }
        ], // 代垫复利,
        buyDsfCompound: [
          { required: true, trigger: 'blur', message: '请填写' },
          { trigger: 'blur', validator: reportRules.nonNegative3 },
          { trigger: 'blur', validator: reportRules.surpassNumTwoBitAndNegative }
        ], //	代偿大数复利,
        buyDsfFine: [
          { required: true, trigger: 'blur', message: '请填写' },
          { trigger: 'blur', validator: reportRules.nonNegative3 },
          { trigger: 'blur', validator: reportRules.surpassNumTwoBitAndNegative }
        ], //	代偿大数罚息,
        buyDsfConsult: [
          { required: true, trigger: 'blur', message: '请填写' },
          { trigger: 'blur', validator: reportRules.nonNegative3 },
          { trigger: 'blur', validator: reportRules.surpassNumTwoBitAndNegative }
        ], // 代偿咨询费、评审费,
        buyDsfGuarantee: [
          { required: true, trigger: 'blur', message: '请填写' },
          { trigger: 'blur', validator: reportRules.nonNegative3 },
          { trigger: 'blur', validator: reportRules.surpassNumTwoBitAndNegative }
        ], // 代偿担保费、管理费,
        buyPremiumFee: [
          { required: true, trigger: 'blur', message: '请填写' },
          { trigger: 'blur', validator: reportRules.nonNegative3 },
          { trigger: 'blur', validator: reportRules.surpassNumTwoBitAndNegative }
        ] // 代偿担保费、管理费,
      }
    };
  },
  computed: {
    buySum: function () {
      return (Number(this.writeInfo.buyBankCorp) + Number(this.writeInfo.buyBankInte) + Number(this.writeInfo.buyBankFine) + Number(this.writeInfo.buyBankCompound) + Number(this.writeInfo.buyBankInsurance) + Number(this.writeInfo.buyDdInsurance) + Number(this.writeInfo.buyDdCorp) + Number(this.writeInfo.buyDdInte) + Number(this.writeInfo.buyDdFine) + Number(this.writeInfo.buyDdCompound) + Number(this.writeInfo.buyDsfCompound) + Number(this.writeInfo.buyDsfFine) + Number(this.writeInfo.buyDsfConsult) + Number(this.writeInfo.buyDsfGuarantee) + Number(this.writeInfo.buyPremiumFee)).toFixed(2);
    }
  },
  mounted() {
    let _that = this;
    // 测算
    let queryData = {
      loanNo: this.calculateDatail.loanNo,
      buyDate: this.calculateDatail.buyDate,
      transType: '0',
      transSerialNo: this.calculateDatail.relateId
    };
    this.buyBackTrial(queryData)
           .then((data) => {
             if (data.success) {
               _that.trialGetData(data.trialData);
               _that.orginBuyBankCorp = this.$lodash.cloneDeep(data.trialData.buyBankCorp);
               _that.trialFlag = false;
             } else {
               _that.$error(data.msg);
               _that.trialFlag = true;
             }
           })
           .catch((err) => {
              this.$error(err);
           });
  },
  methods: {
    // 确认
    ReconfirmBackFun() {
      this.ReconfirmClose();
      // 保存测算
      let queryData = {
        relateId: this.calculateDatail.relateId, // 交易号
        orgName: this.calculateDatail.orgName, // 所属公司
        customerName: this.calculateDatail.customerName, // 姓名
        lineidName: this.calculateDatail.lineidName, // 机构
        certNo: this.calculateDatail.certNo, // 身份证
        loanNo: this.calculateDatail.loanNo, // 出战编号
        buyDate: this.calculateDatail.buyDate, // 代偿日期
        buySum: this.buySum, // 代偿总计,
        buyBankCorp: this.writeInfo.buyBankCorp, // 代偿银行本金,
        buyBankInte: this.writeInfo.buyBankInte, // 代偿银行利息,
        buyBankFine: this.writeInfo.buyBankFine, // 代偿银行罚息,
        buyBankCompound: this.writeInfo.buyBankCompound, // 代偿银行复利,
        buyBankInsurance: this.writeInfo.buyBankInsurance, // 代偿银行保险费,
        buyDdInsurance: this.writeInfo.buyDdInsurance, //	代垫银行保险费
        buyDdCorp: this.writeInfo.buyDdCorp, // 代垫大数本金,
        buyDdInte: this.writeInfo.buyDdInte, // 代垫大数利息,
        buyDdFine: this.writeInfo.buyDdFine, // 代垫罚息,
        buyDdCompound: this.writeInfo.buyDdCompound, // 代垫复利,
        buyDsfCompound: this.writeInfo.buyDsfCompound, //	代偿大数复利,
        buyDsfFine: this.writeInfo.buyDsfFine, //	代偿大数罚息,
        buyDsfConsult: this.writeInfo.buyDsfConsult, // 代偿咨询费、评审费,
        buyDsfGuarantee: this.writeInfo.buyDsfGuarantee, // 代偿担保费、管理费,
        buyPremiumFee: this.writeInfo.buyPremiumFee
      };
      this.buyBackTrialSave(queryData)
      .then((data) => {
        this.$emit("reload");
        this.close_();
      })
      .catch((err) => {
        this.$error(err);
      });
    },
    // 取消
    ReconfirmClose() {
      this.ReconfirmFlag = false;
    },
    bugDateChange() {
      let _that = this;
      // 测算
      let queryData = {
        loanNo: this.calculateDatail.loanNo,
        buyDate: this.calculateDatail.buyDate,
        transType: '1',
        transSerialNo: this.calculateDatail.relateId
      };
      this.buyBackTrial(queryData)
            .then((data) => {
              if (data.success) {
                _that.trialGetData(data.trialData);
                _that.trialFlag = false;
              } else {
                _that.$error(data.msg);
                _that.trialFlag = true;
              }
            })
            .catch((err) => {
              this.$error(err);
            });
    },
    // 测算赋值
    trialGetData(data) {
      let _that = this;
      _that.writeInfo.buySum = data.buySum;
      _that.writeInfo.buyBankCorp = data.buyBankCorp;
      _that.writeInfo.buyBankInte = data.buyBankInte;
      _that.writeInfo.buyBankFine = data.buyBankFine;
      _that.writeInfo.buyBankCompound = data.buyBankCompound;
      _that.writeInfo.buyBankInsurance = data.buyBankInsurance;
      _that.writeInfo.buyDdInsurance = data.buyDdInsurance;
      _that.writeInfo.buyDdCorp = data.buyDdCorp;
      _that.writeInfo.buyDdInte = data.buyDdInte;
      _that.writeInfo.buyDdFine = data.buyDdFine;
      _that.writeInfo.buyDdCompound = data.buyDdCompound;
      _that.writeInfo.buyDsfCompound = data.buyDsfCompound;
      _that.writeInfo.buyDsfFine = data.buyDsfFine;
      _that.writeInfo.buyDsfConsult = data.buyDsfConsult;
      _that.writeInfo.buyDsfGuarantee = data.buyDsfGuarantee;
      _that.writeInfo.buyPremiumFee = data.buyPremiumFee;
    },
    // 代偿发起-测算
     buyBackTrial(res) {
       return new Promise((resolve, reject) => {
            res = res || {};
            let url = counterDealApi.buyBackTrial;
            this.$MyFetch.post(url, res)
            .then((data = {}) => {
                console.log(data);
                resolve(data);
            })
            .catch((err) => {
                reject(err.message);
            });
       });
    },
    // 代偿发起-测算-保存
    buyBackTrialSave(res) {
      return new Promise((resolve, reject) => {
        res = res || {};
        let url = counterDealApi.buyBackTrialSave;
        this.$MyFetch.post(url, res)
        .then((data = {}) => {
            console.log(data);
            resolve(data);
        })
        .catch((err) => {
            reject(err.message);
        });
      });
    },
    // 计算逾期总额
    checkTrialSave(res) {
      return new Promise((resolve, reject) => {
        res = res || {};
        let url = counterDealApi.checkTrialSave;
        this.$MyFetch.post(url, res)
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
    close_() {
      this.$emit("close_calculate");
    },
    submit_confirm() {
      if (Number(this.writeInfo.buyBankCorp) === Number(this.orginBuyBankCorp)) {
        this.submit_fun();
      } else {
        this.$confirm('剩余本金校验不一致', '', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.submit_fun();
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          });
        });
      }
    },
    // 保存按钮
    submit_fun() {
      let _this = this;
       this.$refs.writeInfo.validate((valid) => {
         if (valid) {
           if (this.trialFlag) {
             this.$error("测算不通过，不能保存！");
           } else {
             // 日期校验
             let trialCheckData = {
               loanNo: this.calculateDatail.loanNo,
               buyDate: this.calculateDatail.buyDate
             };
             this.checkTrialSave(trialCheckData)
             .then((data) => {
               let oweInte = Number(data.oweInte) || 0;
               let buyBankInte = Number(_this.writeInfo.buyBankInte) || 0;
               if (oweInte > buyBankInte) {
                 _this.ReconfirmFlag = true;
               } else {
                 // 保存测算
                 let queryData = {
                    relateId: this.calculateDatail.relateId, // 交易号
                    orgName: this.calculateDatail.orgName, // 所属公司
                    customerName: this.calculateDatail.customerName, // 姓名
                    lineidName: this.calculateDatail.lineidName, // 机构
                    certNo: this.calculateDatail.certNo, // 身份证
                    loanNo: this.calculateDatail.loanNo, // 出战编号
                    buyDate: this.calculateDatail.buyDate, // 代偿日期
                    buySum: this.buySum, // 代偿总计,
                    buyBankCorp: this.writeInfo.buyBankCorp, // 代偿银行本金,
                    buyBankInte: this.writeInfo.buyBankInte, // 代偿银行利息,
                    buyBankFine: this.writeInfo.buyBankFine, // 代偿银行罚息,
                    buyBankCompound: this.writeInfo.buyBankCompound, // 代偿银行复利,
                    buyBankInsurance: this.writeInfo.buyBankInsurance, // 代偿银行保险费,
                    buyDdInsurance: this.writeInfo.buyDdInsurance, //	代垫银行保险费
                    buyDdCorp: this.writeInfo.buyDdCorp, // 代垫大数本金,
                    buyDdInte: this.writeInfo.buyDdInte, // 代垫大数利息,
                    buyDdFine: this.writeInfo.buyDdFine, // 代垫罚息,
                    buyDdCompound: this.writeInfo.buyDdCompound, // 代垫复利,
                    buyDsfCompound: this.writeInfo.buyDsfCompound, //	代偿大数复利,
                    buyDsfFine: this.writeInfo.buyDsfFine, //	代偿大数罚息,
                    buyDsfConsult: this.writeInfo.buyDsfConsult, // 代偿咨询费、评审费,
                    buyDsfGuarantee: this.writeInfo.buyDsfGuarantee, // 代偿担保费、管理费,
                    buyPremiumFee: this.writeInfo.buyPremiumFee // 代偿担保费、管理费,
                 };
                 _this.buyBackTrialSave(queryData)
                 .then((data) => {
                   _this.$emit("reload");
                   _this.close_();
                 })
                 .catch((err) => {
                    _this.$error(err);
                 });
               }
             })
             .catch((err) => {
               _this.$error(err);
              //  _this.ReconfirmFlag = true;
             });
           }
         }
      });
    }
  },
  components: {
    reconfirmHint // 再次确认组件
  }
};
</script>
<style lang="less" rel="stylesheet/less" scoped>
.import-message {
  .dialog-box {
    width: 1200px;
    .dialog-box__top {
      margin-bottom: 20px;
    }
    .el-form-item {
      margin-right: 0;
    }
    .dialog-box__body {
      overflow-y: auto;
      overflow-x: hidden;
      // height: 630px;
    }
    // 个人信息
    .anti-fraud_dialog-box__middle {
      width: 1150px;
      overflow: hidden;
      // padding: 10px 0;
      background: #fff;
      border-radius: 4px;
      margin: 0px auto 20px auto;
      box-shadow: 0 2px 6px #ccc;
      .anti-fraud_dialog-box__middle_one {
        height: 60px;
        font-weight: 900;
        line-height: 60px;
        text-align: left;
        margin: 0 20px;
        border-bottom: solid 1px #d0d0d0;
        > span {
          border-left: solid 2px #538bf1;
          width: 2px;
          margin-right: 6px;
        }
      }
      .anti-fraud_dialog-box__middle_two {
        overflow: hidden;
        padding-bottom: 15px;
        #reducedTotal {
          color: rgb(238, 177, 10);
        }
      }
      /deep/ .buydataCss {
        .el-input__inner {
          padding: 0;
          padding-left: 15px;
        }
      }
      .anti-fraud_dialog-box__middle_two > li {
        float: left;
        width: 248px;
        height: 50px;
        margin-left: 27px;
        line-height: 50px;
        text-align: left;
      }
      .anti-fraud_dialog-box__middle_two > li > p {
        font-size: 14px;
        color: #151515;
      }
      .anti-fraud_dialog-box__middle_two > li > p > span {
        color: #666;
        margin-right: 10px;
      }
      .anti-fraud_dialog-box__middle_two > li > p > span:nth-child(2) {
        color: #000;
        margin-right: 10px;
      }
    }
  }
}
// 其他信息
.center {
  text-align: left;
  overflow: hidden;
  margin: 0 -6px;
  .select_245 {
    width: 245px;
  }
  .moude {
    clear: both;
    ul {
      overflow: hidden;
      margin-left: 30px;
      li {
        float: left;
        margin-right: 32px;
        padding: 20px 0;
        height: 103px;
      }
    }
    p {
      color: #bbbbbb;
      font-size: 12px;
      padding-bottom: 10px;
      span {
        color: #f00;
        display: inline-block;
        margin-right: 15px;
      }
    }
  }
}
// 备注
.input > input {
  width: 520px;
  height: 40px;
  border: solid 1px #ccc;
  border-radius: 5px;
  box-sizing: border-box;
  padding-left: 15px;
  margin-left: 15px;
}
.Remarks {
  overflow: hidden;
  margin: 20px 0;
}
.Remarks > input {
  width: 851px;
}
// 保存按钮
.el-button--primary {
  text-align: center;
  width: 200px;
  height: 40px;
  margin: 10px 0px;
  background: #538bf1;
  font-family: PingFangSC-Regular;
  font-size: 14px;
  color: #fff;
}
</style>
