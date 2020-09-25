<style lang="less" rel="stylesheet/less" scoped>
// 公共样式
.margin_r_60 {
  margin-right: 60px;
}
.drop_loan {
  .dialog-mask {
    z-index: 1000;
  }
  .dialog-box {
    .dialog-box__top {
      margin: 0px;
    }
    width: 945px;
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
      .form__block {
        padding: 20px 30px;
        box-shadow: 0 2px 6px 0 #d0d0d0;
      }
      .form__bottom {
        left: 50%;
        padding-bottom: 30px;
        background-color: rgba(255, 255, 255);
        .add {
          width: 200px;
        }
      }
    }
    .el-form-item {
      width: 118px;
      height: 30px;
      margin-left: 20px;
      .el-form-item__content {
        width: 118px;
        height: 30px;
        // 不进审计详情分类 文字溢出隐藏
        .classification {
          width: 118px;
          height: 30px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
      .el-form-item__content {
        width: 118px;
        height: 30px;
        .el-input-number {
          width: 118px;
          height: 30px;
        }
        .el-input {
          width: 118px;
          height: 30px;
        }
        .el-select {
          width: 118px;
          height: 30px;
          .el-input {
            width: 118px;
            height: 30px;
          }
        }
      }
    }
  }
  /*表单区块*/
  .dialog-box__middle-form {
    .form__bottom {
      text-align: center;
      padding-bottom: 20px;
    }
  }
  // 弹窗下部分
  .complete-product {
    width: 100%;
    // height: 495px;
    // 引入按钮
    .import_btn {
      // 新增按钮
      .add {
        width: 100px;
        height: 40px;
        border: none;
        background: #538bf1;
        border-radius: 4px;
        color: #fff;
        display: block;
        cursor: pointer;
        // margin: 20px 30px;
      }
    }
    // 信息展示
    .info_show {
      // line-height: 40px;
      margin-top: 20px;
      .info_item {
        display: inline-block;
        white-space: nowrap;
        margin-right: 60px;
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
          color: #eeb352;
          line-height: 20px;
        }
        .black_color {
          color: #151515;
        }
      }
    }
    // 选择填写框
    .select_box {
      .select_item {
        display: inline-block;
        width: 245px;
        height: 65px;
        white-space: nowrap;
        // margin-right: 60px;
        margin-bottom: 20px;
        .select_title {
          span {
            font-family: PingFangSC-Regular;
            font-size: 12px;
            color: #bbbbbb;
            letter-spacing: 1.09px;
          }
        }
        .select_input {
          margin-top: 8px;
          .select_245 {
            width: 245px;
          }
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
          <div class="form__block bg__white border__radius-5">
            <!-- 引入按钮 -->
            <div class="import_btn">
              <button class="add button" @click="import_alert">+ 引入</button>
            </div>
            <!-- 信息展示 -->
            <div class="info_show">
              <span class="info_item">
                <i class="info_left">原单号:&nbsp;</i>
                <b class="info_right black_color">{{ruleForm.transSerialNo}}</b>
              </span>
            </div>
            <!-- 选择填写框 -->

            <div class="select_box">
              <!-- 记账日期 -->
              <el-form
                :model="ruleForm"
                :rules="rules"
                ref="ruleForm"
                label-width="100px"
                class="demo-ruleForm"
              >
                <div class="select_item margin_r_60">
                  <div class="select_title">
                    <b style="color:red;">*</b>
                    <span>记账日期</span>
                  </div>
                  <div class="select_input">
                    <el-date-picker
                      v-model="ruleForm.accDate"
                      class="select_245"
                      type="date"
                      value-format="yyyy-MM-dd"
                    ></el-date-picker>
                  </div>
                </div>
                <!-- 扣款渠道 -->
                <div class="select_item margin_r_60">
                  <div class="select_title">
                    <span>扣款渠道</span>
                  </div>
                  <div class="select_input" style="margin-top: 8px;">
                    <el-select v-model="ruleForm.transChannel" class="select_245" placeholder="记账渠道">
                      <el-option
                        v-for="item in ChannelList"
                        :key="item.itemNo"
                        :label="item.itemName"
                        :value="item.itemNo"
                      ></el-option>
                    </el-select>
                  </div>
                </div>
              </el-form>
            </div>
          </div>
          <div class="form__bottom">
            <el-button class="add finish button" type="primary" @click="finish('ruleForm')">确认</el-button>
          </div>
        </div>
      </div>
    </div>
    <!-- 引入单笔还款 组件 -->
    <importPriorMatch v-if="alert_2" @clsoe_windowAlert2="close_2"></importPriorMatch>
  </div>
</template>
<script type="text/ecmascript-6">
import "@common/css/dialog";
import importPriorMatch from "../importPriorMatch/"; // 引入单笔还款
import { counterDealApi } from "@/system/adjust-accounts/counter-deal/js/server"; // 接口
export default {
  props: ["refer"],
  data() {
    return {
      alert_2: false, // 引入单笔还款 组件开关
      ChannelList: [], // 渠道列表
      ruleForm: {
        transSerialNo: '', // 原单号
        accDate: "", // 记账日期
        transChannel: "" // 扣款渠道
      },
      rules: {
        accDate: [
          { required: true, message: "请输入记账日期", trigger: "blur" }
        ],
        transChannel: [
          { required: true, message: "请选择扣款渠道", trigger: "change" }
        ]
      }
    };
  },
  filters: {},
  mounted() {
    this.ChannelListApi({}); // 渠道列表接口
  },
  methods: {
    // 渠道列表
    ChannelListApi(res) {
      this.$MyFetch
        .get(counterDealApi.ChannelList, res)
        .then((data = {}) => {
          this.ChannelList = data;
        })
        .catch(err => {
          console.log(err);
          this.$error(err.message);
        });
    },
    close() {
      this.$emit("clsoe_windowAlert");
    },
    // 打开保存修改配置
    finish(formName) {
      if (this.ruleForm.transSerialNo) {
        if (this.ruleForm.accDate) {
          this.$MyFetch.post(counterDealApi.reversalSave, {processName: 'reversalFlow',
             accDate: this.ruleForm.accDate,
             transChannel: this.ruleForm.transChannel,
             transSerialNo: this.ruleForm.transSerialNo,
             loanNo: this.ruleForm.loanNo})
            .then((data = {}) => {
               this.$emit("clsoe_windowAlert");
                if (data.success) {
                  this.$message({
                    message: "冲销引入成功！",
                    type: 'success'
                  });
                  this.refer(1);
                } else {
                  this.$message.error(data.msg);
                }
            })
            .catch((err) => {
                console.log(err);
                this.$error(err.message);
            });
        } else {
          this.confirmFn("记账日期不能为空");
        }
      } else {
         this.confirmFn("请先引入一条记录");
      }
    },
    // 关闭引入单笔还款
    close_2(val) {
      if (val) {
        // if (val.accDate && typeof val.accDate === "object") {
        //   val.accDate = new Date(val.accDate.join("/"));
        // }
        // if (val.accDate && typeof val.accDate === "string") {
        //   val.accDate = new Date(val.accDate.replace(/-/g, "/"));
        // }
        this.ruleForm = val;
      }
      this.alert_2 = false;
    },
    // 点击引入按钮
    import_alert() {
      this.alert_2 = true;
    }
  },
  components: {
    importPriorMatch
  }
};
</script>
