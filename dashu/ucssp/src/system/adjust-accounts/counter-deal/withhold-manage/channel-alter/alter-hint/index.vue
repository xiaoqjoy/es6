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
    width: 305px;
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
    .dialog-box__middle-form {
      overflow-y: auto;
      .form__block {
        box-shadow: 0 2px 6px 0 #d0d0d0;
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
      padding: 20px 30px;
      .info_item {
        display: inline-block;
        white-space: nowrap;
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
        width: 245px;
        height: 66px;
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
        <h5 class="title_type">修改</h5>
        <span class="el-icon-close button button__close" @click="close"></span>
      </div>
      <!-- 弹窗下部分 -->
      <div class="complete-product">
        <div class="dialog-box__middle-form">
            <div class="form__block bg__white border__radius-5" >
              <!-- 信息展示 -->
              <div class="info_show">
                <span class="info_item">
                  <i class="info_left">已选业务笔数:&nbsp;</i>
                  <b class="info_right black_color">{{ deductChannelList.length }}</b>
                </span>
              </div>
              <el-form :model="writeInfo" :rules="rules" ref="writeInfo">
                <!-- 选择填写框 -->
                <div class="select_box">
                  <!-- 记账渠道 -->
                  <div class="select_item">
                    <div class="select_title">
                      <span>新扣款渠道</span>
                    </div>
                    <div class="select_input">
                      <el-form-item prop="ChanneCodeNo">
                        <el-select v-model="writeInfo.ChanneCodeNo" class="select_245" placeholder="请选择">
                          <el-option v-for="item in ChannelList"
                            :key="item.itemNo"
                            :label="item.itemName"
                            :value="item.itemNo">
                          </el-option>
                        </el-select>
                      </el-form-item>
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
    <reconfirmHint v-if="reconfirmFlag" massage="是否确认更改当前扣款渠道？" @close="reconfirmClose" @backFun="reconfirmBackFun"></reconfirmHint>
  </div>
</template>
<script type="text/ecmascript-6">
import "@common/css/dialog";
import reconfirmHint from "@/system/adjust-accounts/counter-deal/components/reconfirm-hint"; // 再次确认组件
import { counterDealApi } from "@/system/adjust-accounts/counter-deal/js/server"; // 接口
export default {
  props: ["deductChannelList"],
  data() {
    return {
      reconfirmFlag: false, // 再次确认组件开关
      ChannelList: [],
      writeInfo: {
        ChanneCodeNo: ''
      },
      rules: {
        ChanneCodeNo: [
          { required: true, trigger: 'change', message: '请选择' }
        ]
      }
    };
  },
  mounted() {
    console.log(this.deductChannelList, 'deductChannelList');
    this.ChannelListApi({codeNo: 'ThirdDeductChannel'}); // 渠道列表接口
  },
  methods: {
    // 关闭再次确认组件
    reconfirmClose() {
      this.reconfirmFlag = false;
    },
    // 再次确认组件点击确定执行函数
    reconfirmBackFun() {
      let _this = this;
      let queryData = {
        'deductChannelList': _this.deductChannelList,
        "newDeductChannel": _this.writeInfo.ChanneCodeNo
      };
      _this.BatchCheckDeductChannel(queryData)
        .then((res) => {
          _this.BatchUpdateDeductChannel(queryData)
          .then((res) => {
            _this.reconfirmFlag = false;
            _this.close();
            _this.$emit("reload");
          })
          .catch((err) => {
              _this.reconfirmFlag = false;
              _this.$error(err);
          });
        })
        .catch((err) => {
            _this.reconfirmFlag = false;
            _this.$error(err);
        });
      console.log('点击确定了');
    },
    // 扣款渠道手动变更校验
     BatchCheckDeductChannel(res) {
       return new Promise((resolve, reject) => {
            res = res || {};
            let url = counterDealApi.BatchCheckDeductChannel;
            this.$MyFetch.post(url, res, {timeout: 120000})
            .then((data = {}) => {
                if (data.success) {
                    resolve(data);
                } else {
                    reject(data.msg);
                }
            })
            .catch((err) => {
                this.$error(err);
            });
       });
    },
    // 扣款渠道批量勾选变更
     BatchUpdateDeductChannel(res) {
       return new Promise((resolve, reject) => {
            res = res || {};
            let url = counterDealApi.BatchUpdateDeductChannel;
            this.$MyFetch.post(url, res, {timeout: 120000})
            .then((data = {}) => {
              resolve(data);
            })
            .catch((err) => {
                reject(err);
            });
       });
    },
    // 渠道列表
    ChannelListApi(res) {
      this.$MyFetch.get(counterDealApi.deductChannelLists, res)
      .then((data = {}) => {
          this.ChannelList = data;
          })
      .catch((err) => {
          this.$error(err.message);
      });
    },
    close() {
      this.$emit("clsoe_windowAlert");
    },
    // 确认按钮
    finish() {
      // input验证方法
          this.$refs.writeInfo.validate((valid) => {
            if (valid) {
              this.reconfirmFlag = true;
            }
          });
    }
  },
  components: {
    reconfirmHint // 再次确认组件
  }
};
</script>
