<style lang="less" rel="stylesheet/less" scoped>
.drop_loan {
  .dialog-box {
    width: 946px;
    height: 776px;
    border-radius: 4px;
    .title_type {
      text-align: center;
      background: #fff;
      font-size: 18px;
      letter-spacing: 1.3px;
      padding-left: 20px;
      font-weight: bold;
      box-shadow: 0 2px 6px 0 #d0d0d0;
    }
    .mgtop {
      margin-top: 20px;
    }
    .el-form-item {
      width: 28%;
      margin-right: 40px;
      /deep/.el-form-item__content {
        line-height: 30px;
      }
    }
    .el-form-item .el-select {
      width: 245px;
    }
    .dialog-box__middle {
      height: 495px;
      .middle {
        .el-select {
          display: block;
        }
        .el-textarea__inner {
          background: #d0d0d0;
        }
      }
    }
    .dialog-box__middle-1200 {
      height: 442px;
      overflow-y: auto;
      margin: 0 20px;
      padding: 25px 30px;
      box-shadow: 0 2px 6px 0 #d0d0d0;
      .dialog-box__middle-top {
        padding: 20px 0;
        border-bottom: 1px solid #d0d0d0;
        .title {
          font-size: 16px;
          .icon__gan {
            margin-right: 10px;
          }
        }
      }
    }
    .dialog-box__middle-form {
      overflow-y: auto;
      padding: 0 20px;
      .form__block {
        .selectionbar {
          width: 245px;
          height: 40px;
          z-index: 999;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          // margin-left: 40px;
          border-radius: 4px;
          .el-select__tags {
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        }
        padding: 20px 30px;
        margin-bottom: 20px;
        box-shadow: 0 2px 6px 0 #d0d0d0;
        .dialog-box__middle-top {
          padding-bottom: 20px;
          border-bottom: 1px solid #e9e9e9;
          .title {
            font-size: 16px;
            .icon__gan {
              margin-right: 10px;
            }
          }
        }
      }
    }
    .dialog-box__top {
      margin: 0px;
    }
    // 内容输入框整体样式
    .complete-product {
      .dialog-box__middle-form {
        .form__bottom {
          position: absolute;
          left: 50%;
          margin-left: -100px;
          bottom: 30px;
          .add {
            width: 200px;
          }
        }
        width: 946px;
        // height: 200px;
        padding: 0px;
        .form__block {
          width: 946px;
          padding: 0px;
          margin: 0px;
        }
        .dialog-box__form__group {
          padding-left: 30px;
          padding-top: 20px;
          height: 714px;
          .el-form-item {
            .el-form-item__label .el-form-item__label {
              padding-bottom: 8px;
            }
            .el-textarea {
              width: 530px;
              height: 100px;
              /deep/ .el-textarea__inner {
                height: 100px;
                width: 525px;
              }
            }
            width: 245px;
            margin-right: 30px;
            margin-bottom: 20px;
          }
          .time-quantum {
            display: block;
          }
          .end_time {
            margin-top: 27px;
          }
          .uploading {
            display: inline-block;
          }
          .title {
            font-family: PingFangSC-Regular;
            font-size: 14px;
            color: #666;
            margin-bottom: 20px;
            div {
              margin-bottom: 10px;
            }
            .maintain {
              margin-left: 40px;
            }
            .black {
              font-family: PingFangSC-Regular;
              font-size: 14px;
              color: #151515;
              line-height: 20px;
            }
          }
        }
      }
    }
  }
}
</style>
<style lang="less" scoped>
/deep/ .form__block .el-select .el-select__tags {
  height: 30px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
<template>
  <div class="drop_loan">
    <div class="dialog-mask"></div>
    <div class="dialog-box">
      <div class="dialog-box__top">
        <h5 class="title_type">编辑</h5>
        <span
          class="el-icon-close button button__close"
          @click="close"
        ></span>
      </div>
      <!-- 新增用户管理 -->
      <div class="complete-product">
        <div class="dialog-box__middle-form">
          <el-form
            :model="form"
            :rules="rules"
            ref="form"
            label-width="100px"
            class="demo-form-inline"
            label-position="top"
          >
            <div class="form__block bg__white border__radius-5">
              <div class="dialog-box__form__group">
                <div class="title">
                  <div><span>贷款分类级别： <span
                        v-if="userName !== 'null'"
                        class="black"
                      >M3:dpd61-90</span></span>
                    <span class="maintain">维护人：<span class="black">张三</span></span>
                    <span class="maintain">维护日期：<span class="black">2019/01/22</span></span>
                    <span class="maintain">维护日期：<span class="black">2019/01/22</span></span>
                  </div>
                </div>
                <el-form-item label="代偿定义">
                  <el-select
                    class="selectionbar"
                    v-model="form.userType"
                    placeholder="请选择"
                    clearable
                  >
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.show"
                      :value="item.value"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="代偿天数/期数/固定日与天数">
                  <el-input
                    v-model="form.username"
                    :disabled="compareData"
                    placeholder="请输入"
                  ></el-input>
                </el-form-item>
                <el-form-item label="本息费迁徙率（%）">
                  <el-select
                    class="selectionbar"
                    v-model="form.userType"
                    placeholder="请选择"
                    clearable
                  >
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.show"
                      :value="item.value"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="是否代偿拨备">
                  <el-switch
                    v-model="value"
                    active-color="#538BF1"
                    width= "50"
                  >
                  </el-switch>
                </el-form-item>
                <el-form-item label="是否代垫">
                  <el-switch
                    v-model="value1"
                    active-color="#538BF1"
                    width= "50"
                  >
                  </el-switch>
                </el-form-item>
                <el-form-item label="是否计算减值">
                  <el-switch
                    v-model="value2"
                    active-color="#538BF1"
                    width= "50"
                  >
                  </el-switch>
                </el-form-item>
                <el-form-item label="是否维护本息">
                  <el-select
                    class="selectionbar"
                    v-model="form.userType"
                    placeholder="请选择"
                    clearable
                  >
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.show"
                      :value="item.value"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="维护本息例外情况的分公司">
                  <el-select
                    class="selectionbar"
                    v-model="form.userType"
                    placeholder="请选择"
                  >
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.show"
                      :value="item.value"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="银行罚息复利传送模式">
                  <el-select
                    class="selectionbar"
                    v-model="form.userType"
                    placeholder="请选择"
                    clearable
                  >
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.show"
                      :value="item.value"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="扣款顺序定义（模式）">
                  <el-select
                    class="selectionbar"
                    v-model="form.userType"
                    placeholder="请选择"
                    clearable
                  >
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.show"
                      :value="item.value"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="停止计提逾期天数">
                  <el-select
                    class="selectionbar"
                    v-model="form.userType"
                    placeholder="请选择"
                    clearable
                  >
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.show"
                      :value="item.value"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="固定还款日期">
                  <el-input
                    v-model="form.username"
                    :disabled="compareData"
                    placeholder="请输入"
                  ></el-input>
                </el-form-item>
                <el-form-item label="最后一期代垫日与还款日不一致">
                  <el-switch
                    v-model="value2"
                    active-color="#538BF1"
                    width= "50"
                  >
                  </el-switch>
                </el-form-item>
                <el-form-item label="提前还款全系统对接">
                  <el-switch
                    v-model="value2"
                    active-color="#538BF1"
                    width= "50"
                  >
                  </el-switch>
                </el-form-item>
                <el-form-item label="提前还款咨询费标识">
                  <el-switch
                    v-model="value2"
                    active-color="#538BF1"
                    width= "50"
                  >
                  </el-switch>
                </el-form-item>
                <el-form-item label="是否第三方代扣">
                  <el-switch
                    v-model="value2"
                    active-color="#538BF1"
                    width= "50"
                  >
                  </el-switch>
                </el-form-item>
                <el-form-item label="是否开启主动还款">
                  <el-switch
                    v-model="value2"
                    active-color="#538BF1"
                    width= "50"
                  >
                  </el-switch>
                </el-form-item>
                <div>
                <el-form-item label="计提费用种类" prop="userType">
                  <el-select
                    class="selectionbar"
                    v-model="form.userType"
                    placeholder="请选择"
                    clearable
                  >
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.show"
                      :value="item.value"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="更新银行罚息复利合适机构">
                  <el-select
                    class="selectionbar"
                    v-model="form.userType"
                    placeholder="请选择"
                    clearable
                  >
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.show"
                      :value="item.value"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>
                </div>
              </div>
            </div>
          </el-form>
          <div class="form__bottom">
            <el-button
              :disabled="compareData"
              class="add finish"
              type="primary"
              @click="finish('form')"
            >确认</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import "@common/css/dialog";
// import { partnerApi } from "../../../../js/server.js"; // 接口
// import rules from "../../../../../../common/js/rules.js"; // 规则验证
export default {
  // props: ["refer", "compileData", "options", "user_status", "compnayList"],
  data() {
    return {
      id: "10021",
      alert_: false, // 保存修改配置
      alert_1: false, // 是否保存修改配置
      userName: "", // 维护人员
      srcUmName: [],
      compareData: false,
      compnayLists: this.compnayList,
      value: false,
      value1: false,
      value2: false,
      date: "",
      form: [],
      pickerOptions1: {
        disabledDate(time) {
          return time.getTime() > this.date_interval();
        }
      },
      rules: {
        userType: [
          { required: true, message: "请选择用户角色", trigger: "change" }
        ],
        status: [{ required: true, message: "请选择状态", trigger: "change" }],
        srcChannel: [
          // { validator: reportRules.chineseRule_50, trigger: "change" },
          { required: true, message: "请填写所属公司", trigger: "change" }
        ],
        userName: [
          {
            required: true,
            message: "请填写真实姓名",
            trigger: "change"
          }
        ],
        certNo: [
          {
            required: true,
            message: "请填写身份证号",
            trigger: "change"
          }
        ],
        mobileNo: [
          { required: true, message: "请填写手机号码", trigger: "change" }
          // { validator: rules.phoneRule, trigger: "change" }
        ]
        // website: [{ validator: reportRules.website, trigger: "change" }]
      }
    };
  },
  methods: {
    // 关闭新增页面
    close() {
      this.$emit("clsoe_windowAlert_b");
    }
    // getNowFormatDate() {
    //   var date = new Date();
    //   var seperator1 = "-";
    //   var seperator2 = ":";
    //   var year = date.getFullYear();
    //   var month = date.getMonth() + 1;
    //   var strDate = date.getDate();
    //   if (month >= 1 && month <= 9) {
    //     month = "0" + month;
    //   }
    //   if (strDate >= 0 && strDate <= 9) {
    //     strDate = "0" + strDate;
    //   }
    //   var currentdate =
    //     year +
    //     seperator1 +
    //     month +
    //     seperator1 +
    //     strDate +
    //     " " +
    //     date.getHours() +
    //     seperator2 +
    //     date.getMinutes() +
    //     seperator2 +
    //     date.getSeconds();
    //   this.date = currentdate;
    // },
    // getCompany() {
    //   let url = partnerApi.getLoginUserInfo;
    //   this.$MyFetch
    //     .post(url)
    //     .then((data = {}) => {
    //       this.userName = data.user.userName;
    //       console.log(data);
    //     })
    //     .catch(err => {
    //       this.$error(err.message);
    //     });
    // },
    // 验证客户经理
    // manager() {
    //   this.form.srcTeamCode = "";
    //   this.form.srcCompanyCode = "";
    //   if (this.form.srcUmNo !== "") {
    //     let data = {
    //     srcUmNo: this.form.srcUmNo
    //   };
    //   console.log(data);
    //   let url = partnerApi.getCompanyOfUm;
    //   this.$MyFetch
    //     .post(url, data)
    //     .then((data = {}) => {
    //       console.log(data);
    //       this.compnayLists = data.teamOfUmList;
    //       this.compareData = false;
    //     })
    //     .catch(err => {
    //       this.$error(err.message);
    //       this.form.srcUmNo = "";
    //       // this.$error("客户经理UM账号错误请重新输入");
    //     });
    //   }
    // },
    // 获取用户编码
    // remoteMethod(query) {
    //   this.srcUmName = [];
    //   if (query !== "") {
    //     this.loading = true;
    //     setTimeout(() => {
    //       this.loading = false;
    //       let data = {
    //         srcUmNo: query
    //       };
    //       let url = partnerApi.getAvailableUmList;
    //       console.log(data);
    //       this.$MyFetch
    //         .post(url, data)
    //         .then((data = {}) => {
    //           console.log(data);
    //           let n = [];
    //           for (let i = 0; i < data.length; i++) {
    //             if (n.indexOf(data[i]) === -1) n.push(data[i]);
    //           }
    //           for (let i = 0; i < n.length; i++) {
    //             this.srcUmName.push({
    //               value: n[i],
    //               label: n[i]
    //             });
    //           }
    //           console.log(n);
    //         })
    //         .catch(err => {
    //           this.$error(err.message);
    //         });
    //     }, 200);
    //   } else {
    //     this.srcUmName = [];
    //   }
    // },
    // 验证手机号码
    // mobileNo() {
    //   if (this.form.mobileNo !== "") {
    //     let url = `${partnerApi.findByMobileNo}/${this.form.mobileNo}`;
    //   console.log(this.form.mobileNo);
    //   this.$MyFetch
    //     .get(url)
    //     .then((data = {}) => {
    //       console.log(data);
    //     })
    //     .catch(err => {
    //       this.$error(err.message);
    //       this.$error("手机号码已注册请重新输入");
    //     });
    //   }
    // },
    // 新增保存
    // finish(formName) {
    //   console.log(this.form);
    //   console.log(this.compnayList);
    //   this.$refs[formName].validate(valid => {
    //     if (valid) {
    //       let srcCompanyName = "";
    //       let srcTeamName = "";
    //       let srcUmName = "";
    //       let srcUmMobileNo = "";
    //       if (this.compnayList.length > 0) {
    //         srcUmName = this.compnayLists[0].umname;
    //         srcUmMobileNo = this.compnayLists[0].srcUmMobileNo;
    //       }
    //       if (this.form.srcCompanyCode !== "") {
    //         // for (let i = 0; i < this.compnayList.length; i++) {
    //           srcCompanyName = this.compnayLists[this.compnayLists.findIndex(i => i.companyCode === this.form.srcCompanyCode)].companyName;
    //         // }
    //       }
    //       if (this.form.srcTeamCode !== "") {
    //         // for (let i = 0; i < this.compnayList.length; i++) {
    //           srcTeamName = this.compnayLists[this.compnayLists.findIndex(i => i.teamCode === this.form.srcTeamCode)].teamName;
    //         // }
    //       }
    //       let data = {
    //         userType: this.form.userType, // 用户角色
    //         status: this.form.status, // 状态
    //         // certificate_type_code: this.form.certificate_type_code, // 用户角色
    //         srcTeamCode: this.form.srcTeamCode, // 所属团队
    //         srcTeamName: srcTeamName, // 所属团队名称
    //         srcUmNo: this.form.srcUmNo, // 所属客户经理编码
    //         srcUmName: srcUmName, // 所属客户经理姓名
    //         srcUmMobileNo: srcUmMobileNo, // 所属客户经理手机号
    //         srcCompanyCode: this.form.srcCompanyCode, // 所属分公司编码
    //         srcCompany: srcCompanyName, // 所属分公司
    //         mobileNo: this.form.mobileNo, // 手机号码
    //         bankAccountName: this.form.bankAccountName, // 账户姓名
    //         bankOpenName: this.form.bankOpenName, // 开户行
    //         bankAccountNo: this.form.bankAccountNo, // 银行卡号
    //         userNo: this.form.userNo, // 用户编码不能为空
    //         srcChannel: this.form.srcChannel // 所属公司
    //       };
    //       // 调取接口
    //       let url = partnerApi.userManagerRef_modifyUser;
    //       console.log(data);
    //       this.$MyFetch
    //         .post(url, data)
    //         .then((data = {}) => {
    //           this.confirmFn("保存成功", "success");
    //           this.close();
    //           this.refer(1);
    //         })
    //         .catch(err => {
    //           this.$error(err.message);
    //         });
    //     } else {
    //       return false;
    //     }
    //   });
    // }
  },
  mounted() {
    // this.getCompany();
    // this.getNowFormatDate();
    // this.drop_down();
  },
  // watch: {
  //   "form.srcUmNo": {
  //     handler() {
  //       if (this.form.srcUmNo !== "") {
  //         this.compareData = true;
  //       } else {
  //         this.compareData = false;
  //       }
  //     }
  //   }
  // },
  components: {
    // rules
  }
};
</script>
