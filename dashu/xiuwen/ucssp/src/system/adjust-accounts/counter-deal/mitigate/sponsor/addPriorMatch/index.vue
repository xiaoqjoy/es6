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
    // height: 555px;
    .dialog-box__top {
      margin: 0px;
    }
    width: 945px;
    // height: 765px;
    padding: 0px;
    .title_type {
      text-align: center;
      background: #fff;
      font-size: 18px;
      color: #333;
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
      // height: 495px;
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
      // height: 709px;
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
      // height: 495px;
      overflow-y: auto;
      .form__block {
        // height: 425px;
        padding: 20px 30px;
        padding-bottom: 10px;
        box-shadow: 0 1px 10px 0 rgba(0, 0, 0, 0.05);
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
          color: #EEB352;
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
              <!-- 引入按钮 -->
              <div class="import_btn">
                <button class="add button " @click="import_alert">+ 引入</button>
              </div>
              <!-- 信息展示 -->
              <div class="info_show">
                <span class="info_item">
                  <i class="info_left">单据号:&nbsp;</i>
                  <b class="info_right black_color">1997626235</b>
                </span>
                <span class="info_item">
                  <i class="info_left">出账编号:&nbsp;</i>
                  <b class="info_right black_color">19976890235</b>
                </span>
                <span class="info_item">
                  <i class="info_left">应还本金:&nbsp;</i>
                  <b class="info_right">19976262322</b>
                </span>
                <span class="info_item">
                  <i class="info_left">应还利息:&nbsp;</i>
                  <b class="info_right">2018/01/11</b>
                </span>
                <span class="info_item">
                  <i class="info_left">应还代垫罚息:&nbsp;</i>
                  <b class="info_right">190000</b>
                </span>
                <span class="info_item">
                  <i class="info_left">应还代垫复利:&nbsp;</i>
                  <b class="info_right">19000</b>
                </span>
                <span class="info_item">
                  <i class="info_left">应还罚息:&nbsp;</i>
                  <b class="info_right">19000</b>
                </span>
                <span class="info_item">
                  <i class="info_left">应还复利:&nbsp;</i>
                  <b class="info_right">200000</b>
                </span>
                <span class="info_item">
                  <i class="info_left">应还费用:&nbsp;</i>
                  <b class="info_right">20000</b>
                </span>
                <span class="info_item" style="margin-right: 0px;">
                  <i class="info_left">应还咨询费:&nbsp;</i>
                  <b class="info_right">2000</b>
                </span>
              </div>
              <!-- 选择填写框 -->
              <div class="select_box">
                <!-- 记账日期 -->
                <div class="select_item margin_r_60">
                  <div class="select_title">
                    <span>记账日期</span>
                  </div>
                  <div class="select_input">
                    <el-date-picker
                    v-model="tally_date"
                    class="select_245"
                    type="date"
                    value-format="yyyy-MM-dd"
                    placeholder="请选择">
                    </el-date-picker>
                  </div>
                </div>
                <!-- 扣款渠道 -->
                <div class="select_item margin_r_60">
                  <div class="select_title">
                    <span>扣款渠道</span>
                  </div>
                   <div class="select_input" style="margin-top: 8px;">
                        <el-select v-model="form.codeNo" class="select_245" placeholder="记账渠道">
                          <el-option v-for="item in ChannelList"
                            :key="item.itemNo"
                            :label="item.itemName"
                            :value="item.itemNo">
                          </el-option>
                        </el-select>
                    </div>
                </div>
                <!-- 大叔减免罚息 -->
                <div class="select_item">
                  <div class="select_title">
                    <span>大树减免罚息</span>
                  </div>
                  <div class="select_input">
                    <el-input class="select_245" placeholder="请填写"></el-input>
                  </div>
                </div>
                <!-- 大树减免复利 -->
                <div class="select_item margin_r_60">
                  <div class="select_title">
                    <span>大树减免复利</span>
                  </div>
                  <div class="select_input">
                    <el-input class="select_245" placeholder="请填写"></el-input>
                  </div>
                </div>
                <!-- 安信提前还款违约金减免 -->
                <div class="select_item margin_r_60">
                  <div class="select_title">
                    <span>安信提前还款违约金减免</span>
                  </div>
                  <div class="select_input">
                    <el-input class="select_245" placeholder="请填写"></el-input>
                  </div>
                </div>
                <!-- 大树费用减免 -->
                <div class="select_item">
                  <div class="select_title">
                    <span>大树费用减免</span>
                  </div>
                  <div class="select_input">
                    <el-input class="select_245" placeholder="请填写"></el-input>
                  </div>
                </div>
                <!-- 大树咨询费减免 -->
                <div class="select_item margin_r_60">
                  <div class="select_title">
                    <span>大树咨询费减免</span>
                  </div>
                  <div class="select_input">
                    <el-input class="select_245" placeholder="请填写"></el-input>
                  </div>
                </div>
                <!-- 安信提前还款管理费减免 -->
                <div class="select_item margin_r_60">
                  <div class="select_title">
                    <span>安信提前还款管理费减免</span>
                  </div>
                  <div class="select_input">
                    <el-input class="select_245" placeholder="请填写"></el-input>
                  </div>
                </div>
                <!-- 大树本金减免 -->
                <div class="select_item">
                  <div class="select_title">
                    <span>大树本金减免</span>
                  </div>
                  <div class="select_input">
                    <el-input class="select_245" placeholder="请填写"></el-input>
                  </div>
                </div>
              </div>
            </div>
            <div class="form__bottom">
              <el-button class="add finish button " type="primary" @click="finish('ruleForm')">确认</el-button>
            </div>
        </div>
      </div>
    </div>
    <!-- 引入单笔还款 组件 -->
    <importPriorMatch v-if="alert_2" @clsoe_windowAlert2='close_2'></importPriorMatch>
    <!-- <composite v-if="alert_" :save="save" :refer="refer" @clsoe_windowused='close_1' /> -->
    <!-- <stateOfPreservation v-if="alert_1" @clsoe_windowused='close_2' /> -->
  </div>
</template>
<script type="text/ecmascript-6">
import "@common/css/dialog";
import importPriorMatch from "../../sponsor/importPriorMatch/"; // 引入单笔还款
import { counterDealApi } from "@/system/adjust-accounts/counter-deal/js/server"; // 接口
// import { counterDealApi } from "../../../js/server.js"; // 接口
export default {
  props: ["refer"],
  data() {
    return {
      alert_2: false, // 引入单笔还款 组件开关
      tally_date: '', // 记账日期
      // 渠道列表
      ChannelList: [],
      form: {
        codeNo: "", // 渠道标识
        itemName: "", // 渠道名称
        itemNo: "" // 渠道编码
      }
    };
  },
  filters: {
  },
  mounted() {
    this.ChannelListApi({}); // 渠道列表接口
  },
  methods: {
    // 渠道列表
    ChannelListApi(res) {
      this.$MyFetch.get(counterDealApi.ChannelList, res)
      .then((data = {}) => {
          this.ChannelList = data;
          })
      .catch((err) => {
          console.log(err);
          this.$error(err.message);
      });
    },
    close() {
      this.$emit("clsoe_windowAlert");
    },
    // 打开保存修改配置
    finish(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (this.form_a.length !== 0) {
            // this.alert_ = true;
            this.save();
          } else {
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 关闭引入单笔还款
    close_2() {
      this.alert_2 = false;
    },
    // 点击引入按钮
    import_alert() {
      this.alert_2 = true;
    }
  },
  components: {
    importPriorMatch
    // composite,
    // stateOfPreservation
  }
};
</script>
