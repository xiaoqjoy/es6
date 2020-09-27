<style lang="less" rel="stylesheet/less" scoped>
// 公共样式
/deep/ .el-input__inner {
      width: 245px;
  }
  /deep/ .el-form-item__error {
    margin-top: 10px;
  }
.drop_loan {
  .dialog-mask {
    z-index: 1000;
  }
  .dialog-box {
    .dialog-box__top {
      margin: 0px;
    }
    width: 520px;
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
    .dialog-box__middle-form {
      // height: 495px;
      overflow-y: auto;
      .form__block {
        box-shadow: 0 2px 6px 0 #d0d0d0;
        padding-top: 20px;
      }
      .form__bottom {
        left: 50%;
        background-color: rgba(255, 255, 255);
        .add {
          width: 200px;
          height: 41px;
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
    }
  }
  // 弹窗下部分
  .complete-product {
    width: 100%;
    // height: 495px;
    // 引入按钮
    .import_btn {
      width: 100px;
      height: 40px;
      border: none;
      background: #538bf1;
      border-radius: 4px;
      color: #fff;
      display: block;
      cursor: pointer;
      margin-left: 30px;
    }
    // 信息展示
    .info_show {
      padding: 20px 30px;
      padding-bottom: 0;
      .info_item {
        display: inline-block;
        // width: 290px;
        margin-bottom: 20px;
        // white-space: nowrap;
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
      .el-form-item {
        margin: 0;
        .el-input__inner {
          width: 245px;
        }
      }
      .select_item {
        display: inline-block;
        width: 460px;
        // height: 66px;
        white-space: nowrap;
        margin-left: 30px;
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
          .select_245 {
            width: 245px;
          }
        }
        .back_cause_con {
            margin-top: 7px;
            textarea {
              display: block;
              width: 100%;
              height: 120px;
              box-sizing: border-box;
              resize: none;
              padding: 10px;
              border: 1px solid #EBEBEB;
              background: #ececec;
              border-radius: 4px;
              font-family: PingFangSC-Regular;
              font-size: 14px;
              color: #151515;
              line-height: 20px;
              &:focus { outline:none; }
              &::-webkit-input-placeholder { /* WebKit browsers */
                  font-family: PingFangSC-Regular;
                  font-size: 14px;
                  color: #BBBBBB;
                  letter-spacing: 0;
              }
              &::-moz-input-placeholder { /* WebKit browsers */
                  font-family: PingFangSC-Regular;
                  font-size: 14px;
                  color: #BBBBBB;
                  letter-spacing: 0;
              }
              &:-moz-input-placeholder { /* WebKit browsers */
                  font-family: PingFangSC-Regular;
                  font-size: 14px;
                  color: #BBBBBB;
                  letter-spacing: 0;
              }
              &::-ms-input-placeholder { /* WebKit browsers */
                  font-family: PingFangSC-Regular;
                  font-size: 14px;
                  color: #BBBBBB;
                  letter-spacing: 0;
              }
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
              <button class="import_btn button" @click="import_fun">+ 引入</button>
              <!-- 信息展示 -->
              <div class="info_show">
                <span class="info_item" style="margin-right: 60px;">
                  <i class="info_left">合作方编号:&nbsp;</i>
                  <b class="info_right black_color">{{ selectedData.itemNo }}</b>
                </span>
                <span class="info_item">
                  <i class="info_left">合作方名称:&nbsp;</i>
                  <b class="info_right black_color">{{ selectedData.itemName }}</b>
                </span>
              </div>
              <el-form :model="writeInfo" :rules="rules" ref="writeInfo">
                <!-- 选择填写框 -->
                <div class="select_box">
                   <!-- 备注 -->
                  <div class="select_item">
                    <div class="select_title">
                      <span>备注</span>
                    </div>
                    <div class="back_cause_con">
                        <textarea v-model="itemDescription" placeholder="请输入"></textarea>
                    </div>
                  </div>
                </div>
              </el-form>
            </div>
            <div class="form__bottom">
              <el-button class="add finish button" type="primary" @click="finish">确认</el-button>
            </div>
        </div>
      </div>
    </div>
    <importPriorMatch v-if="importFlag" @clsoe_windowAlert2='import_close' @importSendData='importSendData'></importPriorMatch>
  </div>
</template>
<script type="text/ecmascript-6">
import "@common/css/dialog";
import importPriorMatch from "../importPriorMatch"; // 引入
import { counterDealApi } from "@/system/adjust-accounts/counter-deal/js/server"; // 接口
export default {
  props: ["refer"],
  data() {
    return {
      itemDescription: '', // 备注
      selectedData: {},
      importFlag: false,
      ChannelList: [],
      writeInfo: {},
      rules: {}
    };
  },
  mounted() {
    this.ChannelListApi({}); // 渠道列表接口
  },
  methods: {
    // 引入组件关闭
    import_close() {
      this.importFlag = false;
    },
    // 引入组件传来的值
    importSendData(data) {
      this.selectedData = data;
    },
    // 引入按钮
    import_fun() {
      this.importFlag = true;
    },
    // 渠道列表
    ChannelListApi(res) {
      this.$MyFetch.get(counterDealApi.ChannelList, res)
      .then((data = {}) => {
          this.ChannelList = data;
          })
      .catch((err) => {
          this.$error(err.message);
      });
    },
    // 还款卡变更--新增保存
    RepayCardChangeSave(res) {
      return new Promise((resolve, reject) => {
            let url = counterDealApi.RepayCardChangeSave;
            this.$MyFetch.post(url, res)
            .then((data = {}) => {
              if (data.success) {
                resolve(data);
              } else {
                reject(data.msg);
              }
            })
            .catch((err) => {
              this.$error(err.message);
            });
      });
    },
    close() {
      this.$emit("clsoe_windowAlert");
    },
    // 确认按钮
    finish() {
      let _this = this;
      if (this.selectedData.itemNo) {
        let saveData = {
          itemNo: _this.selectedData.itemNo,
          itemName: _this.selectedData.itemName,
          itemDescription: _this.itemDescription
        };
        _this.RepayCardChangeSave(saveData)
        .then((res) => {
          _this.$emit("reload");
          _this.close();
        })
        .catch((err) => {
          this.$error(err);
        });
      } else {
        this.$message("请先引入一条数据");
      }
    }
  },
  components: {
    importPriorMatch
  }
};
</script>
