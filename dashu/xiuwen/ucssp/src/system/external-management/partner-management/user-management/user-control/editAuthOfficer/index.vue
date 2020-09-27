<style lang="less" rel="stylesheet/less" scoped>
.drop_loan {
  .dialog-box {
    width: 590px;
    height: 520px;
    border-radius: 4px;
    .title_type {
      text-align: center;
      background: #fff;
      font-size: 18px;
      letter-spacing: 1.3px;
      padding-left: 20px;
      font-weight: bold;
    }
    .mgtop {
      margin-top: 20px;
    }
    .el-form-item {
      width: 28%;
      margin-right: 40px;
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
          background: #e5e5e5;
        }
      }
    }
    .dialog-box__middle-1200 {
      height: 442px;
      overflow-y: auto;
      margin: 0 20px;
      padding: 25px 30px;
      box-shadow: 0 1px 10px 0 rgba(0, 0, 0, 0.05);
      .dialog-box__middle-top {
        padding: 20px 0;
        border-bottom: 1px solid #e5e5e5;
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
        box-shadow: 0 1px 10px 0 rgba(0, 0, 0, 0.05);
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
        width: 590px;
        // height: 200px;
        padding: 0px;
        .form__block {
          width: 590px;
          padding: 0px;
          margin: 0px;
        }
        .dialog-box__form__group {
          padding-left: 30px;
          padding-top: 20px;
          height: 576px;
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
              margin-left: 60px;
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
                  <div><span>维护人员：<span
                        v-if="userName !== 'null'"
                        class="black"
                      >{{userName}}</span></span><span class="maintain">身份证号：<span class="black">{{form.certNo}}</span></span></div>
                  <span class="maintain1">账户姓名：<span class="black">{{form.bankAccountName}}</span></span><span class="maintain">开户行：<span class="black">{{form.bankOpenName}}</span></span><span class="maintain">银行卡号：<span class="black">{{form.bankAccountNo}}</span></span>
                </div>
                <el-form-item
                  label="用户角色"
                  prop="userType"
                >
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
                <el-form-item
                  label="状态"
                  class="uploading"
                >
                  <el-select
                    class="selectionbar"
                    v-model="form.status"
                    placeholder="请选择"
                    clearable
                  >
                    <el-option
                      v-for="item in user_status"
                      :key="item.value"
                      :label="item.show"
                      :value="item.value"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="所属团队">
                  <el-select
                    class="selectionbar"
                    v-model="form.srcTeamCode"
                    placeholder="请选择"
                    clearable
                  >
                    <el-option
                      v-for="item in compnayLists"
                      :key="item.teamCode"
                      :label="item.teamName"
                      :value="item.teamCode"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="所属客户经理">
                  <el-select
                    class="selectionbar"
                    v-model="form.srcUmNo"
                    placeholder="请选择"
                    clearable
                    filterable
                    remote
                    :remote-method="remoteMethod"
                    @change="manager()"
                  >
                    <el-option
                      v-for="item in srcUmName"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="所属分公司">
                  <el-select
                    class="selectionbar"
                    v-model="form.srcCompanyCode"
                    placeholder="请选择"
                    clearable
                  >
                    <el-option
                      v-for="item in compnayLists"
                      :key="item.companyCode"
                      :label="item.companyName"
                      :value="item.companyCode"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item
                  label="手机号码"
                  prop="mobileNo"
                >
                  <el-input
                    v-model="form.mobileNo"
                    placeholder="请输入"
                    @blur="mobileNo()"
                  ></el-input>
                </el-form-item>
              </div>
            </div>
          </el-form>
          <div class="form__bottom">
            <el-button
              :disabled="compareData"
              class="add finish"
              type="primary"
              @click="finish('form')"
            >保存</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import "@common/css/dialog";
import { partnerApi } from "../../../../js/server.js"; // 接口
import rules from "../../../../../../common/js/rules.js"; // 规则验证
export default {
  props: ["refer", "compileData", "options", "user_status", "compnayList"],
  data() {
    return {
      id: "10021",
      alert_: false, // 保存修改配置
      alert_1: false, // 是否保存修改配置
      userName: "", // 维护人员
      srcUmName: [],
      compareData: false,
      compnayLists: this.compnayList,
      date: "",
      form: this.compileData,
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
          },
          { validator: rules.identityCardRule, trigger: "change" }
        ],
        mobileNo: [
          { required: true, message: "请填写手机号码", trigger: "change" }
        ]
      }
    };
  },
  methods: {
    // 关闭新增页面
    close() {
      this.$emit("clsoe_windowAlert_e");
    },
    getNowFormatDate() {
      var date = new Date();
      var seperator1 = "-";
      var seperator2 = ":";
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      var strDate = date.getDate();
      if (month >= 1 && month <= 9) {
        month = "0" + month;
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
      }
      var currentdate =
        year +
        seperator1 +
        month +
        seperator1 +
        strDate +
        " " +
        date.getHours() +
        seperator2 +
        date.getMinutes() +
        seperator2 +
        date.getSeconds();
      this.date = currentdate;
    },
    getCompany() {
      let url = partnerApi.getLoginUserInfo;
      this.$MyFetch
        .post(url)
        .then((data = {}) => {
          this.userName = data.user.userName;
          console.log(data);
        })
        .catch(err => {
          this.$error(err.message);
        });
    },
    // 验证客户经理
    manager() {
      this.form.srcTeamCode = "";
      this.form.srcCompanyCode = "";
      if (this.form.srcUmNo !== "") {
        console.log(this.form.srcUmNo);
        let data = {
        srcUmNo: this.form.srcUmNo
      };
      console.log(data);
      let url = partnerApi.getCompanyOfUm;
      this.$MyFetch
        .post(url, data)
        .then((data = {}) => {
          console.log(data);
          this.compnayLists = data.teamOfUmList;
          this.compareData = false;
        })
        .catch(err => {
          this.$error(err.message);
          this.form.srcUmNo = "";
          // this.$error("客户经理UM账号错误请重新输入");
        });
      } else {
        this.compnayLists[0].umname = "";
        this.compnayLists[0].srcUmMobileNo = "";
      }
    },
    // 获取用户编码
    remoteMethod(query) {
      this.srcUmName = [];
      if (query !== "") {
        this.loading = true;
        setTimeout(() => {
          this.loading = false;
          let data = {
            srcUmNo: query
          };
          let url = partnerApi.getAvailableUmList;
          console.log(data);
          this.$MyFetch
            .post(url, data)
            .then((data = {}) => {
              console.log(data);
              let n = [];
              for (let i = 0; i < data.length; i++) {
                if (n.indexOf(data[i]) === -1) n.push(data[i]);
              }
              for (let i = 0; i < n.length; i++) {
                this.srcUmName.push({
                  value: n[i],
                  label: n[i]
                });
              }
              console.log(n);
            })
            .catch(err => {
              this.$error(err.message);
            });
        }, 200);
      } else {
        this.srcUmName = [];
      }
    },
    // 验证手机号码
    mobileNo() {
      if (this.form.mobileNo !== "") {
        let url = `${partnerApi.findByMobileNo}/${this.form.mobileNo}`;
      console.log(this.form.mobileNo);
      this.$MyFetch
        .get(url)
        .then((data = {}) => {
          console.log(data);
        })
        .catch(err => {
          this.$error(err.message);
          this.$error("手机号码已注册请重新输入");
        });
      }
    },
    // 新增保存
    finish(formName) {
      console.log(this.form);
      console.log(this.compnayList);
      this.$refs[formName].validate(valid => {
        if (valid) {
          let srcCompanyName = "";
          let srcTeamName = "";
          let srcUmName = "";
          let srcUmMobileNo = "";
          let umno = "";
          if (this.compnayLists.length > 0) {
            srcUmName = this.compnayLists[0].umname;
            srcUmMobileNo = this.compnayLists[0].srcUmMobileNo;
            umno = this.compnayLists[0].umno;
          }
          if (this.form.srcCompanyCode !== "") {
              srcCompanyName = this.compnayLists[this.compnayLists.findIndex(i => i.companyCode === this.form.srcCompanyCode)].companyName;
          }
          if (this.form.srcTeamCode !== "") {
              srcTeamName = this.compnayLists[this.compnayLists.findIndex(i => i.teamCode === this.form.srcTeamCode)].teamName;
          }
          let data = {
            userType: this.form.userType, // 用户角色
            status: this.form.status, // 状态
            // certificate_type_code: this.form.certificate_type_code, // 用户角色
            srcTeamCode: this.form.srcTeamCode, // 所属团队
            srcTeamName: srcTeamName, // 所属团队名称
            srcUmNo: this.form.srcUmNo, // 所属客户经理编码
            srcUmName: srcUmName, // 所属客户经理姓名
            srcUmMobileNo: srcUmMobileNo, // 所属客户经理手机号
            srcCompanyCode: this.form.srcCompanyCode, // 所属分公司编码
            srcCompany: srcCompanyName, // 所属分公司
            mobileNo: this.form.mobileNo, // 手机号码
            bankAccountName: this.form.bankAccountName, // 账户姓名
            bankOpenName: this.form.bankOpenName, // 开户行
            bankAccountNo: this.form.bankAccountNo, // 银行卡号
            userNo: this.form.userNo, // 用户编码不能为空
            srcChannel: this.form.srcChannel, // 所属公司
            umno: umno
          };
          // 调取接口
          let url = partnerApi.userManagerRef_modifyUser;
          console.log(data);
          this.$MyFetch
            .post(url, data)
            .then((data = {}) => {
              this.confirmFn("保存成功", "success");
              this.close();
              this.refer(1);
            })
            .catch(err => {
              this.$error(err.message);
            });
        } else {
          return false;
        }
      });
    }
  },
  mounted() {
    this.getCompany();
    this.getNowFormatDate();
    // this.drop_down();
  },
  watch: {
    "form.srcUmNo": {
      handler() {
        if (this.form.srcUmNo !== "") {
          this.compareData = true;
        } else {
          this.compareData = false;
        }
      }
    }
  },
  components: {
    rules
  }
};
</script>
