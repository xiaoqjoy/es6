<template>
  <div class="import-message">
    <div class="dialog-mask"></div>
    <div class="dialog-box">
      <!-- 头部 -->
      <div class="dialog-box__top">
        <h5 class="title bg__white">详情</h5>
        <span class="el-icon-close button button__close" @click="close()"></span>
      </div>
      <!-- 主体 -->
      <div class="dialog-box__body">
        <el-form
          :inline="true"
          :model="list_s"
          :rules="rules"
          ref="list_s"
          label-width="100px"
          class="demo-ruleForm"
        >
          <!-- 单位信息 -->
          <div class="anti-fraud_dialog-box__middle">
            <p class="anti-fraud_dialog-box__middle_one">
              <span></span>单位信息
            </p>
            <div class="center">
              <ul>
                <li>
                  <p>
                    <span>*</span>单位名称
                  </p>
                  <el-form-item label prop="workcorpname">
                    <el-input
                      class="select_245"
                      maxlength="200"
                      v-model="list_s.workcorpname"
                      placeholder="请输入单位名称"
                    ></el-input>
                  </el-form-item>
                </li>
                <li>
                  <p>单位电话区号</p>
                  <el-input v-model="list_s.worktelareacode" maxlength="20" class="select_245" placeholder="请填写"></el-input>
                </li>
                <li>
                  <p>单位电话号码</p>
                  <el-input v-model="list_s.worktelno" maxlength="32" class="select_245" placeholder="请填写"></el-input>
                </li>
                <li>
                  <p>
                    <span>*</span>显示所在的省.市.区
                  </p>
                  <el-form-item label prop="address">
                    <el-cascader
                      class="select_245"
                      placeholder="请填写省市区"
                      :options="regionOptions"
                      v-model="list_s.address"
                      @change="addressChange"
                    ></el-cascader>
                  </el-form-item>
                </li>
                <li>
                  <p>
                    <span>*</span>单位详细地址
                  </p>
                  <el-form-item label prop="workcorpadd">
                    <el-input type="text" maxlength="200" class="select_245" placeholder="请填写单位详细地址" v-model="list_s.workcorpadd"></el-input>
                  </el-form-item>
                </li>
              </ul>
            </div>
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
                  <span v-html="list_s.begindate"></span>
                </p>
              </li>
              <li>
                <p>
                  <span>登记人:</span>
                  <span v-html="list_s.inputuserid"></span>
                </p>
              </li>
            </ul>
            <div class="center">
              <ul>
                <li>
                  <p>
                    <span>*</span>欺诈性质
                  </p>
                  <el-form-item label prop="fraudtype">
                    <el-select class="select_245" v-model="list_s.fraudtype" placeholder="欺诈性质">
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
                    <span>*</span>否决原因
                  </p>
                  <el-form-item label prop="denyreason">
                    <el-select v-model="list_s.denyreason" class="select_245">
                      <el-option
                        v-for="item in hmd"
                        :key="item.name"
                        :label="item.name"
                        :value="item.id"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </li>
                <li>
                  <p>
                    <span>*</span>状态
                  </p>
                  <el-form-item label prop="status1">
                    <el-select class="select_245" v-model="list_s.status1" placeholder="状态">
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
                  <p>黑名单来源</p>
                  <el-form-item>
                    <el-input v-model="list_s.blacklistsource" maxlength="100" class="select_245" placeholder="请填写"></el-input>
                  </el-form-item>
                </li>
                <li>
                  <p>黑名单类型</p>
                  <el-form-item>
                    <el-input v-model="list_s.blacklisttype" maxlength="100" class="select_245" placeholder="请填写"></el-input>
                  </el-form-item>
                </li>
                <li>
                  <p>黑名单等级</p>
                  <el-form-item>
                    <el-select v-model="list_s.blacklistgrade" class="select_245">
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
                    <span>*</span>黑名单生效时间
                  </p>
                  <el-form-item label prop="effectivedate">
                    <el-date-picker
                      class="select_245"
                      v-model="list_s.effectivedate"
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
                  <el-form-item label prop="invaliddate">
                    <el-date-picker
                      class="select_245"
                      v-model="list_s.invaliddate"
                      type="date"
                      format="yyyy/MM/dd"
                      value-format="yyyy/MM/dd"
                    ></el-date-picker>
                  </el-form-item>
                </li>
              </ul>
            </div>
          </div>
          <!--备注-->
          <div class="anti-fraud_dialog-box__middle">
            <p class="anti-fraud_dialog-box__middle_one">
              <span></span>备注
            </p>
            <div class="input Remarks">
              <input type="text" maxlength="200" v-model="list_s.remark" placeholder="请填写备注" />
            </div>
          </div>
        </el-form>
      </div>
      <!-- 底部 -->
      <div class="text-center">
        <el-button type="primary" @click="save(compareData)" :disabled="!compareData">保存</el-button>
      </div>
    </div>
    <!-- 变更组件 -->
    <change
      :fn="saveText"
      v-if="isChange"
      @isChange_s="close_isChange"
      @clsoe_windowIsChange="console_isChange"
    />
  </div>
</template>
<script type="text/ecmascript-6">
import change from "../addWatchLists/change"; // 变更组件
import { fqzApi } from "../../../anti-fraud/js/server.js"; // 接口
export default {
  data() {
    return {
      // 正则验证
      ruleForm: {
        unitCode: "", // 单位电话区号
        unitNumber: "", // 单位电话号码
        rejectReason: "", // 否决原因
        SourceBlacklist: "", // 黑名单来源
        typeBlacklist: "", // 黑名单类型
        grade: "" // 黑名单等级
      },
      rules: {
        workcorpname: [{ required: true, message: "请输入单位名称", trigger: "blur" }],
        denyreason: [
          { required: true, message: "请选择否决原因", trigger: "change" }
        ],
        workcorpadd: [
          { required: true, message: "请输入单位详细地址", trigger: "blur" }
        ],
        address: [
          { required: true, message: "请输入所在省,市,区", trigger: "change" }
        ],
        effectivedate: [
          { required: true, message: "请输入黑名单生效时间", trigger: "blur" }
        ],
        invaliddate: [
          { required: true, message: "请输入黑名单失效时间", trigger: "blur" }
        ],
        fraudtype: [{ required: true, message: "请输入欺诈性质", trigger: "change" }],
        status1: [{ required: true, message: "请输入状态", trigger: "change" }]
      },
      regionOptions: [], // 三级联动
      remark: "", // 备注
      isChange: false, // 变更弹窗
      list_qz: [], // 欺诈性质数组
      hmd: [], // 否决原因数组
      state_: [] // 状态数组
    };
  },
  props: ["list_s", "current_list", "current_data", "refreshList"],
  components: {
    change
  },
  methods: {
    // 关闭窗口
    close_isChange() {
      this.$parent.details = !this.$parent.details;
    },
    // 三级联动
    addressChange() {
      console.log("你好");
    },
    // 关闭窗口
    close() {
      this.$parent.details = !this.$parent.details;
    },
    // 保存
    save(compareData) {
      this.$refs["list_s"].validate(valid => {
        if (valid) {
          if (compareData) {
            this.isChange = true;
          }
        }
      });
    },
    // 更新接口
    saveText(text) {
      let data = {
        // insertsystem: "afs", // 新增操作系统
        updatesystem: "afs", // 更新操作系统
        customertype: "4", // 客户类型
        changereason: text, // 变更原因
        updateuserid: "chenjinlong", // 变更人
        serialno: this.current_data, // 数据ID
        workcorpname: this.list_s.workcorpname, // 单位名称
        worktelareacode: this.list_s.worktelareacode, // 单位电话区号
        worktelno: this.list_s.worktelno, // 单位电话号码
        address: this.list_s.address, // 省市区
        workcorpadd: this.list_s.workcorpadd, // 单位详细地址
        fraudtype: this.list_s.fraudtype, // 欺诈性质
        denyreason: this.list_s.denyreason, // 否决原因
        status1: this.list_s.status1, // 状态
        blacklistsource: this.list_s.blacklistsource, // 黑名单来源
        blacklisttype: this.list_s.blacklisttype, // 黑名单类型
        blacklistgrade: this.list_s.blacklistgrade, // 黑名单等级
        effectivedate: this.list_s.effectivedate, // 黑名单生效时间
        invaliddate: this.list_s.invaliddate, // 黑名单失效时间
        remark: this.list_s.remark, // 备注
        main: {
          sourceID: "string",
          transID: "string",
          transTime: "string",
          transType: "string"
        }
      };
      let url = fqzApi.updateBlacklist;
      this.$MyFetch
        .post(url, data)
        .then((data = {}) => {
          console.log(data);
          this.confirmFn("变更成功", "success");
          this.isChange = false;
          this.$parent.details = !this.$parent.details;
          this.refreshList(1);
        })
        .catch(err => {
          this.$error(err.message);
        });
    },
    // 关闭变更组件
    console_isChange() {
      this.isChange = false;
    },
    // 下拉选项接口
    get_data() {
      let data = {
        codenoList: ["CheatOrNot", "RejectBlack", "InvalidOReffective"]
      };
      let url = fqzApi.getCodeLibrary;
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
  created() {
    this.get_data();
    this.getArea().then(res => {
      this.regionOptions = res;
    });
  },
  mounted() {},
  computed: {
    compareData() {
      var isChange = false;
      if (JSON.stringify(this.list_s) !== JSON.stringify(this.current_list)) {
        isChange = true;
      }
      return isChange;
    }
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
  border-bottom: solid 1px #e5e5e5;
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
  margin-top: 0px;
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
