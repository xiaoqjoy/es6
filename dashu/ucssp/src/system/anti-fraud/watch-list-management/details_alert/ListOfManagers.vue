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
          <!-- 个人信息 -->
          <div class="anti-fraud_dialog-box__middle">
            <p class="anti-fraud_dialog-box__middle_one">
              <span></span>个人信息
            </p>
            <ul class="anti-fraud_dialog-box__middle_two">
              <li>
                <p>
                  <span>客户姓名:</span>
                  <span v-html="list_s.customername"></span>
                </p>
              </li>
              <li>
                <p>
                  <span>证件类型:</span>
                  <span v-html="list_s.certtype"></span>
                </p>
              </li>
              <li>
                <p>
                  <span>证件号码:</span>
                  <span v-html="list_s.certid"></span>
                </p>
              </li>
              <li>
                <p>
                  <span>手机号码:</span>
                  <span v-html="list_s.mobilephone"></span>
                </p>
              </li>
            </ul>
          </div>
          <!--营销人员信息  -->
          <div class="anti-fraud_dialog-box__middle">
            <p class="anti-fraud_dialog-box__middle_one">
              <span></span>营销人员信息
            </p>
            <ul class="anti-fraud_dialog-box__middle_two">
              <li>
                <p>
                  <span>营销人员编码:</span>
                  <span v-html="list_s.saleserialno"></span>
                </p>
              </li>
              <li>
                <p>
                  <span>所属营销单位:</span>
                  <span v-html="list_s.salebelongorg"></span>
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
                  <span v-html="list_s.begindate"></span>
                </p>
              </li>
              <li>
                <p>
                  <span>登记人:</span>
                  <span v-html="list_s.inputuserid"></span>
                </p>
              </li>
              <li>
                <p>
                  <span>欺诈性质:</span>
                  <span v-html="list_s.fraudtype"></span>
                </p>
              </li>
              <li>
                <p>
                  <span>黑名单来源:</span>
                  <span v-html="list_s.blacklistsource"></span>
                </p>
              </li>
              <li>
                <p>
                  <span>黑名单类型:</span>
                  <span v-html="list_s.blacklisttype"></span>
                </p>
              </li>
              <li>
                <p>
                  <span>黑名单等级:</span>
                  <span v-html="list_s.blacklistgrade"></span>
                </p>
              </li>
              <li>
                <p>
                  <span>否决原因:</span>
                  <span v-html="list_s.denyreason"></span>
                </p>
              </li>
            </ul>
            <div class="center">
              <!-- <div>
                <ul class="anti-fraud_dialog-box__middle_two">
                </ul>
              </div> -->
              <div class="moude">
                <ul>
                  <li>
                    <p><span>*</span>停止进件起始时间</p>
                    <el-form-item label prop="stopbegindate">
                      <el-date-picker
                        class="select_245"
                        v-model="list_s.stopbegindate"
                        type="date"
                        format="yyyy/MM/dd"
                        value-format="yyyy/MM/dd"
                      ></el-date-picker>
                    </el-form-item>
                  </li>
                  <li>
                    <p><span>*</span>停止进件结束时间</p>
                    <el-form-item label prop="stopenddate">
                      <el-date-picker
                        class="select_245"
                        v-model="list_s.stopenddate"
                        type="date"
                        format="yyyy/MM/dd"
                        value-format="yyyy/MM/dd"
                      ></el-date-picker>
                    </el-form-item>
                  </li>
                  <li>
                    <p><span>*</span>状态</p>
                    <el-form-item label prop="status1">
                      <el-select v-model="list_s.status1" class="select_245">
                        <el-option
                          v-for="item in state_"
                          :key="item.name"
                          :label="item.name"
                          :value="item.id"
                        ></el-option>
                      </el-select>
                    </el-form-item>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <!--备注-->
          <div class="anti-fraud_dialog-box__middle">
            <p class="anti-fraud_dialog-box__middle_one">
              <span></span>备注
            </p>
            <div class="input Remarks">
              <input type="text" v-model="list_s.remark" disabled />
            </div>
          </div>
        </el-form>
      </div>
      <!-- 底部 -->
      <div class="text-center">
        <el-button type="primary" @click="save(compareData)" :disabled="!compareData">保存</el-button>
      </div>
    </div>
    <change
      :fn="saveText"
      v-if="isChange"
      @isChange_s="close_isChange"
      @clsoe_windowIsChange="console_isChange"
    />
  </div>
</template>
<script type="text/ecmascript-6">
import change from "../addWatchLists/change"; // 变更弹窗
import { fqzApi } from "../../../anti-fraud/js/server.js"; // 接口
export default {
  data() {
    return {
      rules: {
        status1: [{ required: true, message: "请输入状态", trigger: "change" }],
        stopbegindate: [
          { required: true, message: "请输入停止进件起始时间", trigger: "blur" }
        ],
        stopenddate: [
          { required: true, message: "请输入停止进件结束时间", trigger: "blur" }
        ]
      },
      tzjjqssj: "",
      tzjjsssj: "",
      states: "", // 状态
      isChange: false, // 变更
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
        customertype: "5", // 客户类型
        changereason: text, // 变更原因
        updateuserid: "chenjinlong", // 变更人
        serialno: this.current_data, // 数据ID
        stopbegindate: this.list_s.stopbegindate, // 停止进件起始时间
        stopenddate: this.list_s.stopenddate, // 停止进件结束时间
        status1: this.list_s.status1, // 状态
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
    // 关闭变更窗口
    console_isChange() {
      this.isChange = false;
    },
    // 下拉选项接口
    get_data() {
      let data = {
        codenoList: ["InvalidOReffective"]
      };
      let url = fqzApi.getCodeLibrary;
      this.$MyFetch
        .post(url, data)
        .then((data = {}) => {
          this.state_ = data.InvalidOReffective;
        })
        .catch(err => {
          this.$error(err.message);
        });
    }
  },
  created() {
    this.get_data();
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
        padding: 0 20px;
      }
      .anti-fraud_dialog-box__middle_two > li {
        float: left;
        // width: 265px;
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
  margin: 0 5px;
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
        padding: 20px 0;
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
