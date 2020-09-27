<style lang="less" rel="stylesheet/less" scoped>
.drop_loan {
  .dialog-box {
    width: 590px;
    height: 550px;
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
          height: 510px;
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
            .maintain {
              margin-left: 60px;
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
        <h5 class="title_type">新增</h5>
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
            :rules="rulesList"
            ref="form"
            label-width="100px"
            class="demo-form-inline"
            label-position="top"
          >
            <div class="form__block bg__white border__radius-5">
              <div class="dialog-box__form__group">
                <div class="title">
                  <span>维护人员：<span v-if="userName !== 'null'">{{userName}}</span></span><span class="maintain">维护日期：<span>{{date}}</span></span>
                </div>
                <el-form-item
                  label="用户角色"
                  prop="userType"
                >
                  <el-select
                    class="selectionbar"
                    v-model="form.userType"
                    placeholder="请选择"
                    @change="choose()"
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
                  prop="status"
                >
                  <el-select
                    class="selectionbar"
                    v-model="form.status"
                    placeholder="请选择"
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
                <el-form-item
                  label="所属公司"
                  v-show="!exclusive"
                >
                  <el-input
                    v-model="form.srcChannel"
                    placeholder="请输入"
                  ></el-input>
                </el-form-item>
                <el-form-item
                  label="所属公司"
                  v-show="exclusive"
                  prop="srcChannel"
                  :hide-required-asterisk='true'
                >
                  <el-select
                    class="selectionbar"
                    v-model="form.srcChannel"
                    placeholder="请选择"
                    clearable
                    filterable
                    remote
                    :remote-method="company"
                  >
                    <el-option
                      v-for="item in srcChannel"
                      :key="item.srcChannelCode"
                      :label="item.srcChannel"
                      :value="item.srcChannelCode"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item
                  label="真实姓名"
                  prop="userName"
                >
                  <el-input
                    v-model="form.userName"
                    placeholder="请输入"
                  ></el-input>
                </el-form-item>
                <el-form-item
                  label="身份证号"
                  prop="certNo"
                >
                  <el-input
                    v-model="form.certNo"
                    placeholder="请输入"
                  ></el-input>
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
                <el-form-item label="所属客户经理">
                  <el-select
                    class="selectionbar"
                    v-model="form.srcUmName"
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
                <el-form-item label="所属团队">
                  <el-select
                    class="selectionbar"
                    v-model="form.companyName"
                    placeholder="请选择"
                    clearable
                  >
                    <el-option
                      v-for="item in compnayList"
                      :key="item.teamCode"
                      :label="item.teamName"
                      :value="item.teamCode"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>
              </div>
            </div>
          </el-form>
          <div class="form__bottom">
            <el-button
              :disabled="compareData"
              class="add finish"
              type="primary"
              @click="finish('form',form)"
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
  props: ["refer", "options", "user_status"],
  data() {
    var srcChannel = (rule, value, callback) => {
      if (this.exclusive) {
        console.log(value, "rule, value, callback");
        if (value) {
          return callback();
        } else {
          return callback(new Error("请填写所属公司!"));
        }
      } else {
        return callback();
      }
    };
    return {
      id: "10021",
      alert_: false, // 保存修改配置
      alert_1: false, // 是否保存修改配置
      role: [], // 用户角色下拉内容
      contact_num: [], // 状态下拉内容
      loading: false,
      compnayList: [],
      exclusive: false,
      srcUmName: [],
      srcChannel: [],
      compareData: false,
      srcChannel1: "",
      userName: "", // 维护人员
      date: "",
      form: {
        status: "", // 状态
        userType: "", // 消息类型
        srcChannel: "", // 所属公司
        srcChannel1: "", // 所属公司
        userName: "", // 用户姓名
        certNo: "", // 用户身份证号码
        mobileNo: "", // 用户手机号
        srcUmName: "", // 所属客户经理
        companyName: []
      },
      pickerOptions1: {
        disabledDate(time) {
          return time.getTime() > this.date_interval();
        }
      },
      rulesList: {
        userType: [
          { required: true, message: "请选择用户角色", trigger: "change" }
        ],
        srcChannel: [
          { required: true, validator: srcChannel, trigger: "blur" }
        ],
        certNo: [
          { validator: rules.identityCardRule, trigger: "change" }
        ],
        mobileNo: [
          { required: true, message: "请填写手机号码", trigger: "change" },
          { validator: rules.phoneRule, trigger: "change" }
        ],
        personale: [
        ],
        company: [
          {
            validator: (rule, value, callback) => {
              if (this.form.userType !== "exclusive" && !value) {
                return callback(new Error("请选择公司!"));
              } else {
                return callback();
              }
            },
            trigger: "change"
          }
        ]
      },
      rules2: {
        userType: [
          { required: true, message: "请选择用户角色", trigger: "change" }
        ],
        certNo: [
          { validator: rules.identityCardRule, trigger: "change" }
        ],
        mobileNo: [
          { required: true, message: "请填写手机号码", trigger: "change" },
          { validator: rules.phoneRule, trigger: "change" }
        ]
      },
      moreNotifyOjbectRules: {
        srcChannel: [
          { required: true, message: "请填写所属公司", trigger: "change" }
        ]
      }
    };
  },
  methods: {
    // 关闭新增页面
    close() {
      this.$emit("clsoe_windowAlert");
    },
    // 获取时间
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
    // 切换专属 个人
    choose() {
      this.form.srcChannel = "";
      if (this.form.userType === "exclusive") {
        this.exclusive = true;
      } else {
        this.exclusive = false;
      }
    },
    // 获取维护人员
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
      this.form.companyName = "";
      this.compnayList = [];
      this.srcUmName = [];
      if (this.form.srcUmName !== "") {
        let data = {
          srcUmNo: this.form.srcUmName
        };
        let url = partnerApi.getCompanyOfUm;
        this.$MyFetch
          .post(url, data)
          .then((data = {}) => {
            console.log(data);
            this.compnayList = data.teamOfUmList;
            this.compareData = false;
          })
          .catch(err => {
            this.$error(err.message);
            this.form.srcUmName = "";
            // this.$error("客户经理UM账号错误请重新输入");
          });
      }
    },
    // 获取用户编码
    remoteMethod(query) {
      this.form.srcUmName = "";
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
              console.log(n);
              for (let i = 0; i < n.length; i++) {
                this.srcUmName.push({
                  value: n[i],
                  label: n[i]
                });
              }
            })
            .catch(err => {
              this.$error(err.message);
            });
        }, 200);
      } else {
        this.srcUmName = [];
      }
    },
    // 验证所属公司
    company(query) {
      if (query.length >= 4) {
        console.log(query.length);
        this.loading = true;
        setTimeout(() => {
          this.loading = false;
          let data = {
            channelName: query
          };
          let url = partnerApi.getExclusiveChannel;
          console.log(data);
          this.$MyFetch
            .post(url, data)
            .then((data = {}) => {
              console.log(data);
              this.srcChannel = data;
            })
            .catch(err => {
              this.$error(err.message);
            });
        }, 200);
      } else {
        this.srcChannel = [];
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
            this.compareData = false;
          })
          .catch(err => {
            this.$error(err.message);
            this.form.mobileNo = "";
            this.$error("手机号码已注册请重新输入");
          });
      }
    },
    // 新增保存
    finish(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          console.log(this.compnayList);
          let srcChannel1 = "";
          let srcTeamName = "";
          let srcUmName = "";
          let companyCode = "";
          let companyName = "";
          let umno = "";
          let srcUmMobileNo = "";
          if (this.compnayList.length > 0) {
            srcUmName = this.compnayList[0].umname;
            umno = this.compnayList[0].umno;
            srcUmMobileNo = this.compnayList[0].srcUmMobileNo;
          }
          if (this.form.companyName !== "") {
              srcTeamName = this.compnayList[this.compnayList.findIndex(i => i.teamCode === this.form.companyName)].teamName;
              companyCode = this.compnayList[this.compnayList.findIndex(i => i.teamCode === this.form.companyName)].companyCode;
              companyName = this.compnayList[this.compnayList.findIndex(i => i.teamCode === this.form.companyName)].companyName;
              // srcUmMobileNo = this.compnayList[this.compnayList.findIndex(i => i.teamCode === this.form.companyName)].srcUmMobileNo;
          }
          console.log(srcTeamName);
          if (this.form.srcChannel !== "") {
            for (let i = 0; i < this.srcChannel.length; i++) {
              srcChannel1 = this.srcChannel[this.srcChannel.findIndex(i => i.srcChannelCode === this.form.srcChannel)].srcChannel;
            }
          }
          let data = {
            createdBy: "",
            status: this.form.status, // 消息类型
            srcChannelCode: this.form.srcChannel, // 消息内容
            userName: this.form.userName, // 消息操作
            certNo: this.form.certNo, // 推送对象
            mobileNo: this.form.mobileNo, // 开始推送时间
            srcUmNo: this.form.srcUmName, // 结束推送时间
            userType: this.form.userType,
            srcTeamCode: this.form.companyName,
            srcChannel: srcChannel1,
            srcUmName: srcUmName,
            srcTeamName: srcTeamName,
            srcCompanyCode: companyCode,
            srcCompany: companyName,
            umno: umno,
            srcUmMobileNo: srcUmMobileNo
          };
          // 调取接口
          let url = partnerApi.userManagerRef_addUser;
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
  },
  watch: {
    "form.srcUmName": {
      handler() {
        if (this.form.srcUmName !== "") {
          this.compareData = true;
        } else {
          this.compareData = false;
        }
      }
    },
    "form.mobileNo": {
      handler() {
        if (this.form.mobileNo !== "") {
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
