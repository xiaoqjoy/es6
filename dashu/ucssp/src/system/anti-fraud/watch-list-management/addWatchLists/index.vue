<template>
  <div class="import-message">
    <div class="dialog-mask"></div>
    <div class="dialog-box">
      <!-- 新增关注名单头部 -->
      <div class="dialog-box__top">
        <h5 class="title bg__white">新增关注名单</h5>
        <span class="el-icon-close button button__close" @click="close_()"></span>
      </div>
      <!-- 新增关注名单主体部分 -->
      <div class="dialog-box__body">
        <el-form
          :inline="true"
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <div class="text-left">
            <button class="add" type="button" @click="add_new_gz">+ 引入</button>
          </div>
          <!-- 模块1 -->
          <div class="anti-fraud_dialog-box__middle">
            <p class="anti-fraud_dialog-box__middle_one">
              <span></span>个人信息
            </p>
            <div class="center">
              <ul>
                <li>
                  <p>
                    <span>*</span>客户姓名
                  </p>
                  <el-form-item label prop="khxm">
                    <el-input
                      :disabled="nameS"
                      maxlength="80"
                      v-model="ruleForm.khxm"
                      class="select_245"
                    ></el-input>
                  </el-form-item>
                </li>
                <li>
                  <p>
                    <span>*</span>证件类型
                  </p>
                  <el-form-item label prop="certificateTypeCode">
                    <el-select
                      @change="whetherNew"
                      :disabled="nameS"
                      class="select_245"
                      v-model="ruleForm.certificateTypeCode"
                      placeholder="证件类型"
                    >
                      <el-option
                        v-for="item in list_input"
                        :key="item.name"
                        :label="item.name"
                        :value="item.id"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </li>
                <li>
                  <p>
                    <span>*</span>证件号码
                  </p>
                  <el-form-item :prop="'certificateNum' + carType">
                    <el-input
                      :disabled="nameS"
                      maxlength="32"
                      class="select_245"
                      placeholder="证件号码"
                      v-model="ruleForm['certificateNum' + carType]"
                    ></el-input>
                  </el-form-item>
                </li>
                <li>
                  <p>申请编号</p>
                  <el-form-item>
                    <el-input disabled v-model="ruleForm.sqbh" class="select_245"></el-input>
                  </el-form-item>
                </li>
                <li>
                  <p>移动电话</p>
                  <el-form-item label prop="yddh">
                    <el-input
                      :disabled="nameS"
                      maxlength="32"
                      v-model="ruleForm.yddh"
                      class="select_245"
                    ></el-input>
                  </el-form-item>
                </li>
              </ul>
            </div>
          </div>
          <!-- 模块2 -->
          <div class="anti-fraud_dialog-box__middle">
            <p class="anti-fraud_dialog-box__middle_one">
              <span></span>单位信息
            </p>
            <div class="center">
              <ul>
                <li>
                  <p>单位名称</p>
                  <el-form-item>
                    <el-input
                      :disabled="nameS"
                      maxlength="200"
                      v-model="ruleForm.dwmc"
                      class="select_245"
                    ></el-input>
                  </el-form-item>
                </li>
                <li>
                  <p>单位电话区号</p>
                  <el-form-item>
                    <el-input
                      :disabled="nameS"
                      maxlength="20"
                      v-model="ruleForm.dwdhqh"
                      class="select_245"
                    ></el-input>
                  </el-form-item>
                </li>
                <li>
                  <p>单位电话号码</p>
                  <el-form-item>
                    <el-input
                      :disabled="nameS"
                      maxlength="32"
                      v-model="ruleForm.dwdhhm"
                      class="select_245"
                    ></el-input>
                  </el-form-item>
                </li>
                <li>
                  <p>单位地址</p>
                  <el-form-item>
                    <el-input
                      :disabled="nameS"
                      maxlength="200"
                      v-model="ruleForm.dwdz"
                      class="select_245"
                    ></el-input>
                  </el-form-item>
                </li>
              </ul>
            </div>
          </div>
          <!-- 模块3 -->
          <div class="anti-fraud_dialog-box__middle">
            <p class="anti-fraud_dialog-box__middle_one">
              <span></span>家庭信息
            </p>
            <div class="center">
              <ul>
                <li>
                  <p>家庭电话区号</p>
                  <el-form-item>
                    <el-input
                      :disabled="nameS"
                      maxlength="20"
                      v-model="ruleForm.jtdhqh"
                      class="select_245"
                    ></el-input>
                  </el-form-item>
                </li>
                <li>
                  <p>家庭电话号码</p>
                  <el-form-item>
                    <el-input :disabled="nameS" maxlength="32" v-model="jtdhhm" class="select_245"></el-input>
                  </el-form-item>
                </li>
                <li>
                  <p>家庭地址</p>
                  <el-form-item>
                    <el-input
                      :disabled="nameS"
                      maxlength="200"
                      v-model="ruleForm.jtdz"
                      class="select_245"
                    ></el-input>
                  </el-form-item>
                </li>
              </ul>
            </div>
          </div>
          <!-- 模块4 -->
          <div class="anti-fraud_dialog-box__middle">
            <p class="anti-fraud_dialog-box__middle_one">
              <span></span>其他信息
            </p>
            <ul class="anti-fraud_dialog-box__middle_two">
              <li>
                <p>
                  <span>登记人:</span>
                </p>
              </li>
              <li>
                <p>
                  <span>登记机构:</span>
                </p>
              </li>
            </ul>
            <div class="center">
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
                  <p>否决原因</p>
                  <el-select
                    multiple
                    v-model="rejectReason"
                    class="select_245"
                  >
                    <el-option
                      v-for="item in hmd"
                      :key="item.id"
                      :label="item.id+item.name"
                      :value="item.id"
                    ></el-option>
                  </el-select>
                </li>
                <li>
                  <p>
                    <span>*</span>状态
                  </p>
                  <el-form-item label prop="zt">
                    <el-select class="select_245" v-model="ruleForm.zt" placeholder="状态">
                      <el-option
                        v-for="item in state_"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </li>
                <li>
                  <p>黑名单来源</p>
                  <el-form-item>
                    <el-input v-model="source" maxlength="100" class="select_245"></el-input>
                  </el-form-item>
                </li>
                <li>
                  <p>黑名单类型</p>
                  <el-form-item>
                    <el-input v-model="mold" maxlength="100" class="select_245"></el-input>
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
                    <span>*</span>上关注名单时间
                  </p>
                  <el-form-item label prop="sgzmdsj">
                    <el-date-picker
                      class="select_245"
                      v-model="ruleForm.sgzmdsj"
                      type="date"
                      format="yyyy/MM/dd"
                      value-format="yyyy/MM/dd"
                    ></el-date-picker>
                  </el-form-item>
                </li>
                <li>
                  <p>
                    <span>*</span>黑名单生效时间
                  </p>
                  <el-form-item label prop="hmdsxsj">
                    <el-date-picker
                      class="select_245"
                      v-model="ruleForm.hmdsxsj"
                      type="date"
                      format="yyyy/MM/dd"
                      value-format="yyyy/MM/dd"
                    ></el-date-picker>
                  </el-form-item>
                </li>
                <li>
                  <p>
                    <span>*</span>黑名单失效时间
                  </p>
                  <el-form-item label prop="hmdxxsj">
                    <el-date-picker
                      class="select_245"
                      v-model="ruleForm.hmdxxsj"
                      type="date"
                      format="yyyy/MM/dd"
                      value-format="yyyy/MM/dd"
                    ></el-date-picker>
                  </el-form-item>
                </li>
              </ul>
            </div>
          </div>
          <!--模块5-->
          <div class="anti-fraud_dialog-box__middle">
            <p class="anti-fraud_dialog-box__middle_one">
              <span></span>备注
            </p>
            <div class="input">
              <input type="text" v-model="comment" maxlength="200" placeholder="请填写备注">
            </div>
          </div>
        </el-form>
      </div>
      <!-- 新增关注页面底部 -->
      <div class="text-center">
        <el-button type="primary" @click="save">保存</el-button>
      </div>
    </div>
    <!-- 组件 -->
    <khyr :names="names" :ruleForm_="ruleForm" v-if="impont_" @clsoe_windowImpont="console_impont"/>
  </div>
</template>
<script type="text/ecmascript-6">
import khyr from "../addWatchLists/IntroductionCustomer/index"; // 引入弹窗
import { fqzApi } from "../../../anti-fraud/js/server.js"; // 接口
import rules from "@system/anti-fraud/js/rules"; // 引入校验规则
export default {
  data() {
    return {
      nameS: false,
      ruleForm: {
        // name_s: false,
        dwdhqh: "", // 单位电话区号
        jtdhqh: "", // 家庭电话区号
        sqbh: "", // 申请编号
        dwmc: "", // 单位名称
        dwdhhm: "", // 单位电话号码
        dwdz: "", // 单位地址
        jtdz: "", // 家庭地址
        yddh: "",
        khxm: "",
        certificateTypeCode: "Ind01",
        certificateNum: "",
        certificateNum01: "",
        qzxz: "",
        zt: "1",
        sgzmdsj: new Date(),
        hmdsxsj: new Date(),
        hmdxxsj: "2100/01/01"
      }, // 正则验证
      rules: {
        khxm: [{ required: true, message: "请输入客户姓名", trigger: "blur" }],
        yddh: [{ validator: rules.phoneRule, trigger: "blur" }],
        certificateTypeCode: [
          { required: true, message: "请选择证件类型", trigger: "blur" }
        ],
        certificateNum: [
          { required: true, message: "请填写证件号码", trigger: "blur" }
        ],
        certificateNum01: [
          { required: true, message: "请填写证件号码", trigger: "blur" },
          { validator: rules.identityCardRule, trigger: "blur" }
        ],
        sgzmdsj: [
          { required: true, message: "请输入上关注名单", trigger: "blur" }
        ],
        hmdsxsj: [
          { required: true, message: "请输入黑名单生效时间", trigger: "blur" }
        ],
        hmdxxsj: [
          { required: true, message: "请输入黑名单失效时间", trigger: "blur" }
        ],
        qzxz: [
          { required: true, message: "请输入欺诈性质", trigger: "change" }
        ],
        zt: [{ required: true, message: "请输入状态", trigger: "change" }]
      },
      jtdhhm: "", // 家庭电话号码
      rejectReason: "", // 否决原因
      source: "", // 黑名单来源
      mold: "", // 黑名单类型
      grade: "", // 黑名单等级
      impont_: false, // 引入弹窗
      list_qz: [], // 欺诈性质数组
      hmd: [], // 否决原因数组
      state_: [], // 状态数组
      list_input: [], // 证件类型下拉框
      comment: "" // 备注
    };
  },
  // 组件
  components: {
    khyr
  },
  computed: {
    carType() {
      if (this.ruleForm.certificateTypeCode === "Ind01") {
        return "01";
      }
      return "";
    }
    // nameS() {
    //   return this.$store.getters.nameS;
    // }
  },
  methods: {
    whetherNew() {
      this.$refs["ruleForm"].clearValidate();
    },
    names() {
      this.nameS = true;
    },
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
        this.ruleForm.sgzmdsj = [year, month, day].join("/");
        this.ruleForm.hmdsxsj = [year, month, day].join("/");
        console.log(this.hmdsxsj);
      } else {
        this.ruleForm.sgzmdsj =
          [year, month, day].join("/") + " " + [hour, minute, second].join(":");
        this.ruleForm.hmdsxsj =
          [year, month, day].join("/") + " " + [hour, minute, second].join(":");
      }
    },
    // 关闭弹窗
    close_() {
      this.$emit("clsoe_windowAlert");
      // location.reload();
    },
    // 新增接口
    save() {
      // 正则验证
      this.$refs["ruleForm"].validate(valid => {
        if (valid) {
          console.log("验证通过了");
          // 新增->保存按钮
          let data = {
            insertsystem: "afs", // 新增操作系统
            // updatesystem: "afs", // 更新操作系统
            customertype: "2", // 客户类型
            inputuserid: "chenjinlong", // 录入人
            inputorgid: "大数金融", // 录入机构
            customername: this.ruleForm.khxm, // 客户姓名
            certtype: this.ruleForm.certificateTypeCode, // 证件类型
            certid: this.ruleForm["certificateNum" + this.carType], // 证件号码
            relativeserialno: this.ruleForm.sqbh, // 申请编号
            mobilephone: this.ruleForm.yddh, // 移动电话
            workcorpname: this.ruleForm.dwmc, // 单位名称
            worktelareacode: this.ruleForm.dwdhqh, // 单位电话区号
            worktelno: this.ruleForm.dwdhhm, // 单位电话号码
            workcorpadd: this.ruleForm.dwdz, // 单位地址
            homeareacode: this.ruleForm.jtdhqh, // 家庭电话区号
            hometelno: this.jtdhhm, // 家庭电话号码
            homeadd: this.ruleForm.jtdz, // 家庭地址
            fraudtype: this.ruleForm.qzxz, // 欺诈性质
            denyreason: this.rejectReason.join("|"), // 否决原因
            status1: this.ruleForm.zt, // 状态
            blacklistsource: this.source, // 黑名单来源
            blacklisttype: this.mold, // 黑名单类型
            blacklistgrade: this.grade, // 黑名单等级
            begindate: this.ruleForm.sgzmdsj, // 上关注名单时间
            effectivedate: this.ruleForm.hmdsxsj, // 黑名单生效时间
            invaliddate: this.ruleForm.hmdxxsj, // 黑名单失效时间
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
              console.log(this.ruleForm.zt);
              this.confirmFn("新增成功", "success");
              this.$emit("clsoe_windowAlert");
              this.refreshList(1);
              // location.reload();
            })
            .catch(err => {
              this.$error(err.message);
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 关闭引入弹窗
    console_impont() {
      this.impont_ = false;
    },
    // 引入弹窗
    add_new_gz() {
      this.impont_ = true;
    },
    // 下拉选项接口
    get_data() {
      let data = {
        codenoList: ["CertType", "CheatOrNot", "NewVeto", "InvalidOReffective"]
      };
      let url = fqzApi.getCodeLibrary;
      this.$MyFetch
        .post(url, data)
        .then((data = {}) => {
          this.list_input = data.CertType;
          this.list_qz = data.CheatOrNot;
          this.hmd = data.NewVeto;
          this.state_ = data.InvalidOReffective;
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
  },
  props: ["refreshList"]
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
      margin-left: 30px;
      margin-top: 15px;
      margin-bottom: 25px;
    }
    .anti-fraud_dialog-box__middle {
      width: 875px;
      overflow: hidden;
      padding: 10px 14px;
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
      }
      .anti-fraud_dialog-box__middle_one > span {
        border-left: solid 2px #538bf1;
        width: 2px;
        margin-right: 6px;
      }
      .anti-fraud_dialog-box__middle_two {
        overflow: hidden;
        padding: 0 22px;
      }
      .anti-fraud_dialog-box__middle_two > li {
        float: left;
        width: 240px;
        height: 50px;
        margin-right: 25px;
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
      // 其他信息模块
      .center {
        text-align: left;
        overflow: hidden;
        margin: 20px -8px;
        // /deep/.el-select-dropdown {
        //   position: absolute !important;
        //   left: 0px !important;
        //   top: 120px !important;
        // }
        // /deep/.el-select-dropdown .el-select-dropdown__item {
        //   padding-right: 950px;
        // }
        /deep/ .el-select .el-select__tags {
          height: 30px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .select_245 {
          width: 245px;
        }
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
  }
}
.center > ul > li:nth-child(4) {
  clear: both;
}
.center > ul > li:nth-child(7) {
  clear: both;
}
// 关闭按钮
.el-icon-close {
  position: absolute;
  font-size: 32px;
  top: 12px;
  right: 10px;
  width: 16px;
  height: 16.8px;
  cursor: pointer;
}
// 模块5
.input > input {
  width: 815px;
  height: 40px;
  border: solid 1px #ccc;
  border-radius: 5px;
  padding-left: 15px;
  margin-left: 4px;
  margin-top: 15px;
  box-sizing: border-box;
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
