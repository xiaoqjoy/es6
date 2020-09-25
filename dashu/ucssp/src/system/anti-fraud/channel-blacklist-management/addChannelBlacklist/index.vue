<template>
  <div class="import-message">
    <div class="dialog-mask"></div>
    <div class="dialog-box">
      <!-- 头部 -->
      <div class="dialog-box__top">
        <h5 class="title bg__white">新增渠道黑名单</h5>
        <span class="el-icon-close button button__close" @click="close_()"></span>
      </div>
      <!-- 主体 -->
      <div class="dialog-box__body">
        <div class="text-left">
          <button class="add" @click="add_new_gz">+ 引入</button>
        </div>
        <!-- 个人信息 -->
        <div class="anti-fraud_dialog-box__middle">
          <p class="anti-fraud_dialog-box__middle_one">
            <span></span>个人信息
          </p>
          <ul class="anti-fraud_dialog-box__middle_two">
            <li>
              <p>
                <span>法人代表:</span>
                <span v-html="blacklistIntroduces.legalRepresentative"></span>
              </p>
            </li>
            <li>
              <p>
                <span>证件类型:</span>
                <span v-html="blacklistIntroduces.documenTtype"></span>
              </p>
            </li>
            <li>
              <p>
                <span>证件号码:</span>
                <span v-html="blacklistIntroduces.iDNumber"></span>
              </p>
            </li>
          </ul>
        </div>
        <!-- 单位信息 -->
        <div class="anti-fraud_dialog-box__middle">
          <p class="anti-fraud_dialog-box__middle_one">
            <span></span>单位信息
          </p>
          <ul class="anti-fraud_dialog-box__middle_two">
            <li>
              <p>
                <span>所属分公司:</span>
                <span v-html="blacklistIntroduces.branchCompany"></span>
              </p>
            </li>
            <li>
              <p>
                <span>单位地址:</span>
                <span v-html="blacklistIntroduces.unitAddress"></span>
              </p>
            </li>
          </ul>
        </div>
        <!-- 渠道信息 -->
        <div class="anti-fraud_dialog-box__middle">
          <p class="anti-fraud_dialog-box__middle_one">
            <span></span>渠道信息
          </p>
          <ul class="anti-fraud_dialog-box__middle_two">
            <li>
              <p>
                <span>渠道分类:</span>
                <span v-html="blacklistIntroduces.channelClassification"></span>
              </p>
            </li>
            <li>
              <p>
                <span>渠道名称:</span>
                <span v-html="blacklistIntroduces.channelName"></span>
              </p>
            </li>
            <li>
              <p>
                <span>渠道编码:</span>
                <span v-html="blacklistIntroduces.channelNumber"></span>
              </p>
            </li>
          </ul>
        </div>
        <!-- 其他信息 -->
        <div class="anti-fraud_dialog-box__middle">
          <p class="anti-fraud_dialog-box__middle_one">
            <span></span>其他信息
          </p>
          <ul class="anti-fraud_dialog-box__middle_two">
            <li>
              <p>
                <span>上关注名单时间:</span>
                <span v-html="watchTime"></span>
              </p>
            </li>
            <li>
              <p>
                <span>登记人:</span>
              </p>
            </li>
          </ul>
          <div class="center">
            <el-form
              :inline="true"
              :model="ruleForm"
              :rules="rules"
              ref="ruleForm"
              label-width="100px"
              class="demo-ruleForm"
            >
              <div class="moude">
                <ul>
                  <li>
                    <p>
                      <span>*</span>欺诈性质
                    </p>
                    <el-form-item label prop="qzxz">
                      <el-select class="select_245" v-model="ruleForm.qzxz" placeholder="欺诈性质">
                        <el-option
                          v-for="item in list_qz"
                          :key="item.name"
                          :label="item.name"
                          :value="item.id"
                        ></el-option>
                      </el-select>
                    </el-form-item>
                  </li>
                  <li>
                    <p>
                      <span>*</span>停止进件起始时间
                    </p>
                    <el-form-item label prop="tzjjqssj">
                      <el-date-picker
                        class="select_245"
                        v-model="ruleForm.tzjjqssj"
                        type="date"
                        value-format="yyyy/MM/dd"
                        format="yyyy/MM/dd"
                      ></el-date-picker>
                    </el-form-item>
                  </li>
                  <li>
                    <p>
                      <span>*</span>停止进件结束时间
                    </p>
                    <el-form-item label prop="tzjjjssj">
                      <el-date-picker
                        class="select_245"
                        v-model="ruleForm.tzjjjssj"
                        type="date"
                        value-format="yyyy/MM/dd"
                        format="yyyy/MM/dd"
                      ></el-date-picker>
                    </el-form-item>
                  </li>
                </ul>
              </div>
              <div class="moude">
                <ul>
                  <li>
                    <p>黑名单来源</p>
                    <el-form-item>
                      <el-input v-model="sourceBlacklist" maxlength="100" class="select_245" placeholder="请填写"></el-input>
                    </el-form-item>
                  </li>
                  <li>
                    <p>黑名单类型</p>
                    <el-form-item>
                      <el-input v-model="typeBlacklist" maxlength="100" class="select_245" placeholder="请填写"></el-input>
                    </el-form-item>
                  </li>
                  <li>
                    <p>黑名单等级</p>
                    <el-form-item>
                      <el-select v-model="grade" class="select_245">
                        <el-option label="A01" value="A01"></el-option>
                        <el-option label="A02" value="A02"></el-option>
                        <el-option label="A03" value="A03"></el-option>
                        <el-option label="B01" value="B01"></el-option>
                        <el-option label="B02" value="B02"></el-option>
                        <el-option label="B03" value="B03"></el-option>
                        <el-option label="C01" value="C01"></el-option>
                        <el-option label="C02" value="C02"></el-option>
                        <el-option label="C03" value="C03"></el-option>
                        <el-option label="D01" value="D01"></el-option>
                        <el-option label="D02" value="D02"></el-option>
                        <el-option label="D03" value="D03"></el-option>
                        <el-option label="E01" value="E01"></el-option>
                        <el-option label="E02" value="E02"></el-option>
                        <el-option label="E03" value="E03"></el-option>
                      </el-select>
                    </el-form-item>
                  </li>
                  <li>
                    <p>
                      <span>*</span>状态
                    </p>
                    <el-form-item label prop="zt">
                      <el-select class="select_245" v-model="ruleForm.zt" placeholder="状态">
                        <el-option
                          v-for="item in state_"
                          :key="item.name"
                          :label="item.name"
                          :value="item.id"
                        ></el-option>
                      </el-select>
                    </el-form-item>
                  </li>
                  <li>
                    <p>否决原因</p>
                    <el-select v-model="rejectReason" class="select_245">
                      <el-option
                        v-for="item in hmd"
                        :key="item.name"
                        :label="item.name"
                        :value="item.id"
                      ></el-option>
                    </el-select>
                  </li>
                </ul>
              </div>
            </el-form>
          </div>
        </div>
        <!--备注-->
        <div class="anti-fraud_dialog-box__middle">
          <p class="anti-fraud_dialog-box__middle_one">
            <span></span>备注
          </p>
          <div class="input Remarks">
            <input type="text" maxlength="100" v-model="comment" placeholder="请填写备注">
          </div>
        </div>
      </div>
      <!-- 底部 -->
      <div class="text-center">
        <el-button type="primary" @click="save">保存</el-button>
      </div>
    </div>
    <!-- 组件 -->
    <yrqd
      :blacklistIntroduces="blacklistIntroduces"
      v-if="impont_"
      @clsoe_windowIsQd="console_isQd"
    />
  </div>
</template>
<script type="text/ecmascript-6">
import yrqd from "../addChannelBlacklist/importChannel_ company/index"; // 引入渠道
import { fqzApi } from "../../../anti-fraud/js/server.js"; // 接口
export default {
  data() {
    return {
      watchTime: new Date(),
      ruleForm: {
        qzxz: "",
        tzjjqssj: "",
        tzjjjssj: "2100/01/01",
        zt: "1"
      }, // 正则验证
      rules: {
        tzjjqssj: [
          { required: true, message: "请输入停止进件起始时间", trigger: "blur" }
        ],
        tzjjjssj: [
          { required: true, message: "请输入停止进件结束时间", trigger: "blur" }
        ],
        qzxz: [
          { required: true, message: "请输入欺诈性质", trigger: "change" }
        ],
        zt: [{ required: true, message: "请选择状态", trigger: "change" }]
      },
      // 引入界面的字段
      blacklistIntroduces: {
        channelName: "",
        channelNumber: "",
        legalRepresentative: "",
        documenTtype: "",
        iDNumber: "",
        channelClassification: "",
        branchCompany: "",
        unitAddress: ""
      },
      sourceBlacklist: "", // 黑名单来源
      typeBlacklist: "", // 黑名单类型
      grade: "", // 黑名单等级
      rejectReason: "", // 否决原因
      impont_: false, // 引入
      list_qz: [], // 欺诈性质数组
      state_: [], // 状态数组
      hmd: [], // 否决原因
      list_input: [], // 证件类型下拉框数据
      comment: "" // 备注
    };
  },
  props: ["refreshList"],
  // 组件
  components: {
    yrqd
  },
  methods: {
    // 手动改变默认的时间格式
    dateFormatter(str) {
      // 默认返回yyyy-MM-dd HH-mm-ss
      var hasTime = arguments[1] !== false ? "true" : "false"; // 可传第二个参数false，返回yyyy-MM-dd
      var d = new Date(str);
      var year = d.getFullYear();
      var month =
        d.getMonth() + 1 < 10 ? "0" + (d.getMonth() + 1) : d.getMonth() + 1;
      var day = d.getDate() < 10 ? "0" + d.getDate() : d.getDate();
      var hour = d.getHours() < 10 ? "0" + d.getHours() : d.getHours();
      var minute = d.getMinutes() < 10 ? "0" + d.getMinutes() : d.getMinutes();
      var second = d.getSeconds() < 10 ? "0" + d.getSeconds() : d.getSeconds();
      if (hasTime) {
        this.watchTime = [year, month, day].join("/");
        console.log(this.hmdsxsj);
      } else {
        this.watchTime =
          [year, month, day].join("/") + " " + [hour, minute, second].join(":");
      }
    },
    // 引入弹窗
    add_new_gz() {
      this.impont_ = true;
    },
    // 新增接口
    save() {
      this.$refs["ruleForm"].validate(valid => {
        if (valid) {
          if (
            this.blacklistIntroduces.channelName !== "" &&
            this.blacklistIntroduces.channelNumber !== "" &&
            // this.blacklistIntroduces.legalRepresentative !== "" &&
            this.blacklistIntroduces.documenTtype !== "" &&
            this.blacklistIntroduces.iDNumber !== "" &&
            this.blacklistIntroduces.channelClassification !== "" &&
            this.blacklistIntroduces.branchCompany !== ""
          ) {
            console.log("验证通过了");
            for (var i = 0; i < this.list_input.length; i++) {
              if (
                this.blacklistIntroduces.documenTtype === this.list_input[i].name
              ) {
                this.blacklistIntroduces.documenTtype = this.list_input[i].id;
              }
            }
            // 新增->保存按钮
            let data = {
              insertsystem: "afs", // 新增操作系统
              // updatesystem: "afs", // 更新操作系统
              customertype: "6", // 客户类型
              // customername: "jinlonglong", // 申请人姓名
              certtype: this.blacklistIntroduces.documenTtype, // 证件类型
              certid: this.blacklistIntroduces.iDNumber, // 证件号码
              fictitiousperson: this.blacklistIntroduces.legalRepresentative, // 法人代表
              inputorgid: this.blacklistIntroduces.branchCompany, // 所属分公司
              workcorpadd: this.blacklistIntroduces.unitAddress, // 单位地址
              channelclassification: this.blacklistIntroduces
                .channelClassification, // 渠道分类
              corpname: this.blacklistIntroduces.channelName, // 渠道名称
              channelcode: this.blacklistIntroduces.channelNumber, // 渠道编码
              begindate: this.watchTime, // 上关注名单时间
              inputuserid: "chenjinlong", // 录入人
              fraudtype: this.ruleForm.qzxz, // 欺诈性质
              stopbegindate: this.ruleForm.tzjjqssj, // 停止进件起始时间
              stopenddate: this.ruleForm.tzjjjssj, // 停止进件结束时间
              blacklistsource: this.sourceBlacklist, // 黑名单来源
              blacklisttype: this.typeBlacklist, // 黑名单类型
              blacklistgrade: this.grade, // 黑名单等级
              status1: this.ruleForm.zt, // 状态
              denyreason: this.rejectReason, // 否决原因
              remark: this.comment, // 备注
              main: {
                sourceID: "string",
                transID: "string",
                transTime: "string",
                transType: "string"
              }
            };
            let url = fqzApi.addBlacklist;
            this.$MyFetch
              .post(url, data)
              .then((data = {}) => {
                this.list = data;
                this.$emit("clsoe_windowAlert");
                this.confirmFn("新增成功", "success");
                this.refreshList(1);
              })
              .catch(err => {
                this.$error(err.message);
              });
          } else {
            this.confirmFn("请先引入渠道黑名单信息", "err");
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 关闭引入弹窗
    console_isQd() {
      this.impont_ = false;
    },
    // 关闭弹窗
    close_() {
      this.$emit("clsoe_windowAlert");
    },
    // 下拉选项接口
    get_data() {
      let data = {
        codenoList: [
          "RejectBlack",
          "CheatOrNot",
          "InvalidOReffective",
          "CertType"
        ]
      };
      let url = fqzApi.getCodeLibrary;
      this.$MyFetch
        .post(url, data)
        .then((data = {}) => {
          this.list_qz = data.CheatOrNot;
          this.state_ = data.InvalidOReffective;
          this.hmd = data.RejectBlack;
          this.list_input = data.CertType;
        })
        .catch(err => {
          this.$error(err.message);
        });
    }
  },
  mounted() {
    this.dateFormatter(new Date());
  },
  created() {
    this.get_data();
  }
};
</script>
<style lang="less" rel="stylesheet/less" scoped>
.import-message {
  .dialog-box {
    width: 946px;
    .el-form-item {
      margin-right: 0;
    }
    .dialog-box__body {
      overflow-y: auto;
      overflow-x: hidden;
      height: 640px;
    }
    .add {
      width: 100px;
      height: 40px;
      border: none;
      background: #538bf1;
      border-radius: 4px;
      color: #fff;
      margin-left: 32px;
      margin-top: 15px;
      margin-bottom: 25px;
    }
    // 个人信息
    .anti-fraud_dialog-box__middle {
      width: 875px;
      overflow: hidden;
      padding: 10px 0;
      background: #fff;
      border-radius: 4px;
      margin: 0px auto 20px auto;
      box-shadow: 0 2px 6px #ccc;
      .anti-fraud_dialog-box__middle_one {
        height: 60px;
        font-weight: 900;
        line-height: 60px;
        text-align: left;
        margin: 0 30px;
        border-bottom: solid 1px #d0d0d0;
        > span {
          border-left: solid 2px #538bf1;
          width: 2px;
          margin-right: 6px;
        }
      }
      .anti-fraud_dialog-box__middle_two {
        overflow: hidden;
        padding: 10px 20px;
      }
      .anti-fraud_dialog-box__middle_two > li {
        float: left;
        // width: 240px;
        // height: 50px;
        margin-left: 10px;
        line-height: 40px;
        text-align: left;
      }
      .anti-fraud_dialog-box__middle_two > li > p {
        font-size: 14px;
        color: #151515;
        margin-right: 20px;
      }
      .anti-fraud_dialog-box__middle_two > li > p > span {
        color: #666;
        // margin-right: 10px;
      }
      .anti-fraud_dialog-box__middle_two > li > p > span:nth-child(2) {
        color: #000;
        // margin-right: 10px;
      }
    }
  }
}
// 其他信息
.center {
  text-align: left;
  overflow: hidden;
  margin: 0 3px;
  .select_245 {
    width: 245px;
  }
  .moude {
    clear: both;
    ul {
      margin-left: 30px;
      li {
        float: left;
        margin-right: 32px;
        padding: 5px 0;
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
.moude > ul > li:nth-child(4) {
  clear: both;
}
// 备注
.input > input {
  width: 520px;
  height: 40px;
  border: solid 1px #ccc;
  border-radius: 5px;
  box-sizing: border-box;
  padding-left: 15px;
  margin-left: 2px;
}
.Remarks {
  overflow: hidden;
  margin: 20px 0;
}
.Remarks > input {
  width: 820px;
}
// 保存按钮
.el-button--primary {
  width: 200px;
  height: 40px;
  margin: 10px 0px;
  background: #538bf1;
  font-family: PingFangSC-Regular;
  font-size: 14px;
  color: #fff;
}
</style>
