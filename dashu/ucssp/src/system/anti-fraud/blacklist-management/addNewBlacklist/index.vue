<template>
    <div class="import-message" >
      <div class="dialog-mask"></div>
      <div class="dialog-box">
        <!-- 头部 -->
        <div class="dialog-box__top">
          <h5 class="title bg__white">新增公司黑名单</h5>
          <span class="el-icon-close button button__close" @click="close_()"></span>
        </div>
        <!-- 主体部分 -->
        <div class="dialog-box__body">
          <el-form :inline="true" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <!-- 单位信息 -->
            <div class="anti-fraud_dialog-box__middle">
              <p class="anti-fraud_dialog-box__middle_one"><span></span>单位信息</p>
              <div class="center">
                <ul>
                  <li>
                    <p><span>*</span>单位名称</p>
                    <el-form-item label="" prop="dwmc">
                      <el-input  class="select_245" maxlength="200" v-model="ruleForm.dwmc"  placeholder="请输入单位名称"></el-input>
                    </el-form-item>
                  </li>
                  <li>
                    <p>单位电话区号</p>
                    <el-form-item  label="" prop="unitCode">
                      <el-input v-model="ruleForm.unitCode" maxlength="20" class="select_245" placeholder="请填写"></el-input>
                    </el-form-item>
                  </li>
                  <li>
                    <p>单位电话号码</p>
                    <el-input v-model="unitNumber" maxlength="32" class="select_245" placeholder="请填写"></el-input>
                  </li>
                  <li>
                    <p><span>*</span>显示所在的省.市.区</p>
                    <el-form-item label="" prop="xsszs">
                      <el-cascader class="select_245" :options="regionOptions" v-model="ruleForm.xsszs" @change="addressChange"></el-cascader>
                    </el-form-item>
                  </li>
                  <li>
                    <p><span>*</span>单位详细地址</p>
                    <el-form-item  label=""  prop="dwxxdz">
                      <el-input type="text" maxlength="200" class="select_245" placeholder="请填写单位详细地址" v-model="ruleForm.dwxxdz"></el-input>
                    </el-form-item>
                  </li>
                </ul>
              </div>
            </div>
            <!-- 其他信息 -->
            <div class="anti-fraud_dialog-box__middle">
              <p class="anti-fraud_dialog-box__middle_one"><span></span>其他信息</p>
              <ul class="anti-fraud_dialog-box__middle_two">
                <li><p><span>上关注名单时间:</span><span v-html="watchTime"></span></p></li>
                <li><p><span>登记人:</span></p></li>
              </ul>
              <div class="center">
                <ul>
                  <li>
                    <p><span>*</span>欺诈性质</p>
                    <el-form-item  label="" prop="qzxz">
                      <el-select class="select_245" v-model="ruleForm.qzxz" placeholder="欺诈性质">
                        <el-option
                          v-for="item in list_qz"
                          :key="item.name"
                          :label="item.name"
                          :value="item.id">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </li>
                  <li>
                    <p><span>*</span>否决原因</p>
                    <el-form-item  label="" prop="rejectReason">
                      <el-select v-model="ruleForm.rejectReason" class="select_245">
                        <el-option
                          v-for="item in hmd"
                          :key="item.name"
                          :label="item.name"
                          :value="item.id">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </li>
                  <li>
                    <p><span>*</span>状态</p>
                    <el-form-item  label="" prop="zt">
                      <el-select class="select_245" v-model="ruleForm.zt" placeholder="状态">
                        <el-option v-for="item in state_"
                          :key="item.name"
                          :label="item.name"
                          :value="item.id">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </li>
                  <li>
                    <p>黑名单来源</p>
                    <el-form-item>
                      <el-input v-model="SourceBlacklist" maxlength="100" class="select_245" placeholder="请填写"></el-input>
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
                    <p><span>*</span>黑名单生效时间</p>
                    <el-form-item  label="" prop="hmdsxsj">
                      <el-date-picker
                        class="select_245"
                        v-model="ruleForm.hmdsxsj"
                        type="date"
                        format="yyyy/MM/dd"
                        value-format="yyyy/MM/dd">
                      </el-date-picker>
                    </el-form-item>
                  </li>
                  <li>
                    <p><span>*</span>黑名单失效时间</p>
                    <el-form-item  label="" prop="hmdxxsj">
                      <el-date-picker
                        class="select_245"
                        v-model="ruleForm.hmdxxsj"
                        type="date"
                        format="yyyy/MM/dd"
                        value-format="yyyy/MM/dd">
                      </el-date-picker>
                    </el-form-item>
                  </li>
                </ul>
              </div>
            </div>
            <!--备注-->
            <div class="anti-fraud_dialog-box__middle">
              <p class="anti-fraud_dialog-box__middle_one"><span></span>备注</p>
              <div class="input Remarks">
              <input type="text" maxlength="200" v-model="remark" placeholder="请填写备注">
              </div>
            </div>
          </el-form>
        </div>
        <!-- 底部 -->
        <div class="text-center">
          <el-button type="primary" @click="save">保存</el-button>
        </div>
      </div>
    </div>
</template>
<script type="text/ecmascript-6">
import { fqzApi } from "../../../anti-fraud/js/server.js"; // 接口
// import  utils  from "../../../../../build/utils.js";
// import rules from "@common/js/rules"; // 引入校验规则
export default {
  data() {
    return {
      watchTime: new Date(),
      ruleForm: {
        dwmc: "",
        unitCode: "",
        xsszs: [],
        dwxxdz: "",
        rejectReason: "", // 否决原因
        qzxz: "",
        zt: "1",
        hmdsxsj: new Date(),
        hmdxxsj: "2100/01/01"
      }, // 正则验证
      regionOptions: [], // 三级联动
      rules: {
        dwmc: [{ required: true, message: "请输入单位名称", trigger: "blur" }],
        rejectReason: [
          { required: true, message: "请选择否决原因", trigger: "change" }
        ],
        dwxxdz: [
          { required: true, message: "请输入单位详细地址", trigger: "blur" }
        ],
        xsszs: [
          { required: true, message: "请输入所在省,市,区", trigger: "change" }
        ],
        hmdsxsj: [
          { required: true, message: "请输入黑名单生效时间", trigger: "blur" }
        ],
        hmdxxsj: [
          { required: true, message: "请输入黑名单失效时间", trigger: "blur" }
        ],
        qzxz: [{ required: true, message: "请输入欺诈性质", trigger: "change" }],
        zt: [{ required: true, message: "请输入状态", trigger: "change" }]
      },
      unitNumber: "", // 单位电话号码
      SourceBlacklist: "", // 黑名单来源
      typeBlacklist: "", // 黑名单类型
      grade: "", // 黑名单等级
      list_qz: [], // 欺诈性质数组
      hmd: [], // 否决原因数组
      state_: [], // 状态数组
      remark: "" // 备注
    };
  },
  props: ["refreshList"],
  // 组件
  components: {},
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
        this.ruleForm.hmdsxsj = [year, month, day].join("/");
        this.watchTime = [year, month, day].join("/");
        console.log(this.hmdsxsj);
      } else {
        this.ruleForm.hmdsxsj =
          [year, month, day].join("/") + " " + [hour, minute, second].join(":");
      }
    },
    // 省市区三级联动
    addressChange() {
      console.log("你好");
    },
    // 新增接口
    save() {
      console.log(this.hmdsxsj);
      this.$refs["ruleForm"].validate(valid => {
        console.log(valid);
        if (valid) {
          console.log("验证通过了");
          // 新增->保存按钮
          let data = {
            insertsystem: "afs", // 新增操作系统
            // updatesystem: "afs", // 更新操作系统
            customertype: "4", // 客户类型
            // customername: "chenfeishenglonglonglong", // 申请人姓名
            // certid: "45847852144454254755", // 证件号码
            begindate: this.watchTime, // 上关注名单时间
            inputuserid: "chenjinlong", // 录入人
            workcorpname: this.ruleForm.dwmc, // 单位名称
            worktelareacode: this.ruleForm.unitCode, // 单位电话区号
            worktelno: this.unitNumber, // 单位电话号码
            address: this.ruleForm.xsszs, // 省市区三级联动
            workcorpadd: this.ruleForm.dwxxdz, // 单位详细地址
            fraudtype: this.ruleForm.qzxz, // 欺诈性质
            denyreason: this.ruleForm.rejectReason, // 否决原因
            status1: this.ruleForm.zt, // 状态
            blacklistsource: this.SourceBlacklist, // 黑名单来源
            blacklisttype: this.typeBlacklist, // 黑名单类型
            blacklistgrade: this.grade, // 黑名单等级
            effectivedate: this.ruleForm.hmdsxsj, // 黑名单生效时间
            invaliddate: this.ruleForm.hmdxxsj, // 黑名单失效时间
            remark: this.remark, // 备注
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
              console.log(data.address);
              console.log(this.ruleForm.zt);
              this.$emit("clsoe_windowAlert");
              this.confirmFn("新增成功", "success");
              this.refreshList(1);
            })
            .catch(err => {
              this.$error(err.message);
              console.log(this.ruleForm.xsszs);
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 关闭弹窗
    close_() {
      this.$emit("clsoe_windowAlert");
    },
    // 下拉选项接口
    get_data() {
      let data = {
        codenoList: ["CheatOrNot", "RejectBlack", "InvalidOReffective"]
      };
      let url = fqzApi.getCodeLibrary;
      console.log(url);
      this.$MyFetch
        .post(url, data)
        .then((data = {}) => {
          this.list_qz = data.CheatOrNot;
          this.hmd = data.RejectBlack;
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
    this.getArea().then(res => {
      this.regionOptions = res;
    });
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
  }
}
//关闭按钮
.el-icon-close {
  position: absolute;
  font-size: 32px;
  top: 12px;
  right: 10px;
  cursor: pointer;
}
.anti-fraud_dialog-box__middle {
  width: 875px;
  overflow: hidden;
  padding: 10px 0;
  background: #fff;
  border-radius: 4px;
  margin: 0px auto 20px auto;
  box-shadow: 0 2px 6px #ccc;
}
.anti-fraud_dialog-box__middle_one {
  height: 60px;
  line-height: 60px;
  font-weight: 900;
  text-align: left;
  margin: 0 30px;
  border-bottom: solid 1px #d0d0d0;
}
.anti-fraud_dialog-box__middle_one > span {
  border-left: solid 2px #538bf1;
  width: 2px;
  margin-right: 6px;
}
.anti-fraud_dialog-box__middle_two {
  overflow: hidden;
  padding: 0 30px;
}
.anti-fraud_dialog-box__middle_two > li {
  float: left;
  text-align: left;
  margin-right: 25px;
  width: 240px;
  height: 50px;
  line-height: 50px;
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
.center {
  text-align: left;
  overflow: hidden;
  margin: 20px 0px;
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
.center > ul > li:nth-child(4) {
  clear: both;
}
.center > ul > li:nth-child(7) {
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
