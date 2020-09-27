<style lang="less" rel="stylesheet/less" scoped>
// 公共样式
.margin_r_30 {
  margin-right: 30px;
}
.drop_loan {
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
        // padding-bottom: 30px;
        background-color: rgba(255, 255, 255);
        .add {
          width: 200px;
        }
      }
    }
  }
  // 弹窗下部分
  .complete-product {
    width: 100%;
    // 信息展示
    .info_show {
      // line-height: 40px;
      .info_item {
        display: inline-block;
        white-space: nowrap;
        margin-right: 20px;
        margin-bottom: 20px;
        .info_left {
          font-style: normal;
          font-family: PingFangSC-Regular;
          font-size: 14px;
          color: #666;
        }
        .info_right {
          font-family: PingFangSC-Regular;
          font-size: 14px;
          color: #151515;
          line-height: 20px;
        }
      }
    }
    // 选择填写框
    .select_box {
      .select_item {
        display: inline-block;
        width: 245px;
        height: 70px;
        white-space: nowrap;
        // margin-right: 60px;
        margin-bottom: 10px;
        .select_title {
          span {
            font-family: PingFangSC-Regular;
            font-size: 12px;
            color: #BBBBBB;
            letter-spacing: 1.09px;
          }
        }
        .select_input {
          margin-top: 8px;
          .select_245 {
            width: 245px;
          }
        }
        // 日期控件padding
        /deep/.el-input--prefix .el-input__inner {
          padding-left: 15px;
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
      <!-- 弹窗下部分 -->
      <div class="complete-product">
        <div class="dialog-box__middle-form">
            <div class="form__block bg__white border__radius-5" >
              <!-- 信息展示 -->
              <div class="info_show">
                <span class="info_item">
                  <i class="info_left">用户姓名:&nbsp;</i>
                  <b class="info_right">{{ customerName }}</b>
                </span>
                <span class="info_item">
                  <i class="info_left">合作机构:&nbsp;</i>
                  <b class="info_right">{{ lineidName }}</b>
                </span>
                <span class="info_item">
                  <i class="info_left">身份证号:&nbsp;</i>
                  <b class="info_right">{{ certNo }}</b>
                </span>
                <span class="info_item" style="margin-right: 0px;">
                  <i class="info_left">所属公司:&nbsp;</i>
                  <b class="info_right">{{ orgName }}</b>
                </span>
              </div>
              <!-- 选择填写框 -->
              <div class="select_box">
                <el-form :model="writeInfo" :rules="rules" ref="writeInfo" style="overflow: hidden;">
                  <!-- 出账编号 -->
                  <div class="select_item margin_r_30">
                    <div class="select_title">
                      <span>出账编号</span>
                    </div>
                    <div class="select_input">
                      <el-input class="select_245" placeholder="请填写" v-model="loanNo" @change="loanNoChange"></el-input>
                    </div>
                  </div>
                  <!-- 代偿日期 -->
                  <div class="select_item">
                    <div class="select_title">
                      <span>代偿日期</span>
                    </div>
                    <div class="select_input">
                      <el-form-item prop="tally_date">
                        <el-date-picker
                        v-model="writeInfo.tally_date"
                        class="select_245"
                        type="date"
                        value-format="yyyy-MM-dd"
                        placeholder="请选择">
                        </el-date-picker>
                      </el-form-item>
                    </div>
                  </div>
                </el-form>
              </div>
            </div>
            <div class="form__bottom">
              <el-button class="add button " type="primary" :disabled="loanNoIs" @click="finish">确认</el-button>
            </div>
        </div>
      </div>
    </div>
    <!-- 文字提示组件 -->
    <fontHint v-if="fontHintFlag" :massage="massage" @close="fontHintClose"></fontHint>
  </div>
</template>
<script type="text/ecmascript-6">
import "@common/css/dialog";
import fontHint from "@/system/adjust-accounts/counter-deal/components/font-hint"; // 文字提示组件
import { counterDealApi } from "@/system/adjust-accounts/counter-deal/js/server"; // 接口
export default {
  props: ["refer"],
  data() {
    return {
      writeInfo: {
        tally_date: ''
      },
      rules: {
        tally_date: [ // 代偿日期
          { required: true, message: '请选择代偿日期', trigger: 'change' }
        ]
      },
      fontHintFlag: false, // 文字提示开关
      massage: '请检查出账编号',
      tally_date: '', // 代偿日期
      loanNo: '', // 出账编号
      certNo: '', // 身份号码
      customerName: '', // 用户名
      lineidName: '', // 合作机构
      orgName: '', // 分公司
      loanNoIs: true // 出战编号是否有效

    };
  },
  filters: {
    // 加密 -- 用 * 代替
    encrypt: function(data) {
      let str = '';
      for (let i = 0; i < data.length; i++) {
        str += '*';
      }
      return str;
    }
  },
  methods: {
    // 代偿(发起，减免，转让)-校验是否存在交易
     buyBackIsExist(res) {
       return new Promise((resolve, reject) => {
         let queryData = {
           loanNo: res,
           transType: "108"
         };
          let url = counterDealApi.buyBackIsExist;
          this.$MyFetch.post(url, queryData)
          .then((data = {}) => {
            //  return data.result;
            console.log(data.success, '是否存在交易');
            if (data.success) {
              resolve(data);
            } else {
              reject(data);
            }
          })
          .catch((err) => {
              this.$error(err);
          });
       });
    },
    // 代偿申请新增
    buyBackQueryCustomerInfo(res) {
        res = res || {
          loanNo: 'RL00101812271011'
        };
        let url = counterDealApi.buyBackQueryCustomerInfo;
        this.$MyFetch.get(url, res)
        .then((data = {}) => {
            if (!data) {
              this.massage = '请检查出账编号';
              this.fontHintFlag = true;
              this.loanNoIs = true;
            } else {
              this.certNo = data.certNo; // 身份号码
              this.customerName = data.customerName; // 用户名
              this.lineidName = data.lineidName; // 合作机构
              this.orgName = data.orgName; // 分公司
              this.loanNoIs = false;
            }
        })
        .catch((err) => {
            this.$error(err);
        });
    },
    // 代偿发起-新增-保存
    buyBackSave(res) {
      return new Promise((resolve, reject) => {
        res = res || {};
        let url = counterDealApi.buyBackSave;
        this.$MyFetch.post(url, res)
        .then((data = {}) => {
            resolve(data);
        })
        .catch((err) => {
            reject(err);
        });
      });
    },
    close() {
      this.$emit("clsoe_windowAlert");
    },
    // 出战编号失焦事件
    loanNoChange() {
      console.log("shijiao");
      this.certNo = ''; // 身份号码
      this.customerName = ''; // 用户名
      this.lineidName = ''; // 合作机构
      this.orgName = ''; // 分公司
      let res = {
          loanNo: this.loanNo
        };
      this.buyBackQueryCustomerInfo(res);
    },
    // 关闭文字提示组件
    fontHintClose() {
      this.fontHintFlag = false;
    },
    // 保存
    finish() {
      let _that = this;
      this.$refs.writeInfo.validate((valid) => {
        if (valid) {
          // 校验数据是否又重复
          _that.buyBackIsExist(_that.loanNo)
          .then((data) => {
              let submitData = {
                loanNo: _that.loanNo,
                certNo: _that.certNo,
                customerName: _that.customerName,
                lineidName: _that.lineidName,
                orgName: _that.orgName,
                buyDate: _that.writeInfo.tally_date,
                flowNo: 'buyBackFlow'
              };
              _that.buyBackSave(submitData)
              .then((data) => {
                _that.$emit("reload");
                _that.$emit("clsoe_windowAlert");
              })
              .catch((err) => {
                this.$error(err);
              });
          })
          .catch((data) => {
            _that.massage = data.msg;
            _that.fontHintFlag = true;
            // _that.$message("此条交易已存在！");
          });
        }
      });
    },
    // 关闭引入单笔还款
    close_2() {
      this.alert_2 = false;
    },
     // 引入传来得数据
    importSendData(data) {
      console.log(data, "importdata");
      this.importData = data || {};
    }
  },
  components: {
    fontHint // 文字提示组件
  }
};
</script>
