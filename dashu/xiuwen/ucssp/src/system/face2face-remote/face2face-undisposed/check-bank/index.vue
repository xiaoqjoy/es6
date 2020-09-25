<template>
  <div class="check-bank face2face-detail-style">
    <!-- {{isCustomerUpdate}} -->

    <div class="noInfo" v-if="cardInfoList.length === 0">无收款账户信息！</div>

    <div v-else>
      <div v-for="(item,index) in cardInfoList" :key="index">
        <div class="info-title-selectorBefore">
          <span>ID{{index+1}}收款账户信息</span>
        </div>
        <el-form
          :ref="'bankInfoForm'+index"
          :model="item"
          :rules="bankInfoRule"
          label-width="100px"
          class="demo-form-inline"
          label-position="top"
          :disabled="isDetail"
          >
          <div class="dialog-box__form__group">
            <el-form-item label="支付方式" prop="paymentModeCode" class="el-form-item__33" >
              <el-select
                v-model="item.paymentModeCode"
                placeholder="请选择支付方式"
                >
                <el-option
                  v-for="(item, index) in paymentModeCodeLibrary"
                  :key="index"
                  :label="item.itemDesc"
                  :value="item.itemCode"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="收款账户名称" prop="accountName" class="el-form-item__33" >
              <el-input
                maxlength="20"
                v-model="item.accountName"
                placeholder="请填写收款账户户名"
                :disabled="item.paymentModeCode === item.paymentModeCodeOrigin"
                ></el-input>
            </el-form-item>
            <el-form-item label="收款卡号/账户" prop="accountNum" class="el-form-item__33" >
              <el-input
                maxlength="20"
                @change="changeAccountNum(index)"
                v-model="item.accountNum"
                placeholder="请填写收款卡号/账户"
                :disabled="item.paymentModeCode === item.paymentModeCodeOrigin"
                ></el-input>
            </el-form-item>
            <div class="drop__select-box el-form-item__33">
              <p class="lab"><span class="icon icon__star">*</span>开户行</p>
              <button class="button__wrap"
                      type="button"
                      @click="item.dropSelectShow = !item.dropSelectShow"
                      :class="{isactive: item.dropSelectShow}"> {{item.subbankName? item.subbankName: '请选择开户行'}} <i class="icon el-select__caret el-input__icon el-icon-arrow-up"></i> </button>
              <transition name="el-zoom-in-top">
                <div class="wrap table__wrap-max" v-show="item.dropSelectShow" @click="currentIndex = index">
                  <el-form :model="item.bankInfo"
                            :ref="'bankForm'+index"
                            :rules="bankRule"
                            label-width="100px"
                            class="demo-form-inline" label-position="top" >
                    <el-form-item
                      prop="bankName"
                      style="margin-right:10px">
                      <el-input placeholder="输入银行名称" v-model.trim="item.bankInfo.bankName"></el-input>
                    </el-form-item>
                    <el-form-item
                      prop="cityName"
                      style="margin-right:10px">
                      <el-input placeholder="输入城市" v-model.trim="item.bankInfo.cityName"></el-input>
                    </el-form-item>
                    <el-button type="primary" class="button button__blue width100" @click="queryBank(index)">查询</el-button>
                  </el-form>
                  <el-table
                    :data="item.bankInfo.bankList"
                    height="200"
                    border
                    highlight-current-row
                    style="width: 100%"
                    cell-class-name="dialog__table__td"
                    header-cell-class-name="dialog__table__th"
                    @row-click="selectedBank"
                    class="dialog__table">
                    <el-table-column
                      prop="bankName"
                      label="银行名称"
                    >
                    </el-table-column>
                    <el-table-column
                      prop="bankCode"
                      label="银行编号"
                    >
                    </el-table-column>
                    <el-table-column
                      prop="parentBankName"
                      label="总行名称">
                    </el-table-column>
                    <el-table-column
                      prop="parentBankCode"
                      label="总行编号">
                    </el-table-column>
                  </el-table>
                  <pagination :page="{currentPage: item.bankInfo.pageNum,account:  item.bankInfo.total,pageSize: item.bankInfo.pageSize,showJumpButton: false}" style="margin-top: 10px" @jump-page="jump"></pagination>
                </div>
              </transition>
            </div>
            <el-form-item label="收款行名称" prop="bankName" class="el-form-item__33" >
              <el-input
                readonly
                v-model="item.bankName"
                placeholder="请填写收款行名称"></el-input>
            </el-form-item>
            <el-form-item label="开户行行号" prop="subbankCode" class="el-form-item__33">
              <el-input
                readonly
                v-model="item.subbankCode"
                placeholder="请填写开户行行号"></el-input>
            </el-form-item>
            <el-form-item label="预留手机号" prop="mobileNum" class="el-form-item__33">
              <el-input
                v-model="item.mobileNum"
                placeholder="请填写预留手机号"
                :disabled="item.paymentModeCode === item.paymentModeCodeOrigin"
                ></el-input>
            </el-form-item>
            <el-form-item  class="el-form-item__33" style="margin-top: 25px;" v-if="item.paymentModeCode !== item.paymentModeCodeOrigin && !isDetail">
              <el-button class="width100 button-default" :loading="checkLoading" @click="checkBank(index)">验证</el-button>
            </el-form-item>
          </div>
        </el-form>
      </div>

      <div class="bottom-btn" v-if="!isDetail">
        <el-button class="width100 button-default" @click="submit">保存</el-button>
      </div>
    </div>

  </div>
</template>

<script>
// import "@common/css/dialog";
import { baseApi } from "../../js/server";
import myRules from "@common/js/rules.js";
import pagination from "@components/pagination";
export default {
  props: {
    // 详情传过来的申请编号
    applicationIdDetail: {
      type: String,
      default: ""
    },
    // applicationId: {
    //   type: String,
    //   default: ""
    // },
    // // 是否是详情，是的话则所有表单不可编辑
    isDetail: {
      type: Boolean,
      default: false
    }
    // // 记录客户信息和产品信息的修改数据
    // checkTabsInfo: {
    //   type: Object,
    //   default: function() {
    //     return {};
    //   }
    // }
  },
  components: { pagination },
  data() {
    return {
      // isDetail: false, // 是否编辑

      // 收款卡信息列表
      cardInfoList: [
        {
          accountName: null, // 收款账户户名
          accountNum: null, // 收款卡号
          bankCode: null, // 收款行行号（没有返回）
          mobileNum: null, // 预留手机号码
          paymentModeCode: null, // 支付方式
          productId: null, // 产品ID
          subbankCode: null, // 开户行行号
          subbankName: null, // 开户行
          bankName: null, // 收款行名称
          paymentModeCodeOrigin: null, // 初始化支付方式，用于判断支付方式是否修改
          dropSelectShow: false, // 开户行弹框的显示与隐藏
          // 银行查询信息
          bankInfo: {
            bankName: "", // 银行名称
            cityName: "", // 城市名称
            pageNum: 1, // 当前页
            pageSize: 10, // 每页个数
            total: 0, // 总数
            bankList: [] // 银行列表
          }
        }
      ],
      cardInfoListOrigin: "", // 收款卡信息列表，用于记录用户是否修改，切换到别的地方判断是否修改，修改则提示先保存，否则则继续
      applicationMobileNum: "", // 贷款申请人手机号码
      isSubmit: false, // 是否是点击提交面核
      currentIndex: "", // 记录当前索引

      // 支付方式字典
      paymentModeCodeLibrary: [],
      // dropSelectShow: false,
      reasonList: [],
      result: [],

      bankInfoRule: {
        paymentModeCode: [
          { required: true, message: "请选择支付方式", trigger: "change" }
        ],
        accountName: [
          { required: true, message: "请填写账户名", trigger: "blur" }
        ],
        accountNum: [
          { required: true, message: "请填写收款卡号/账户", trigger: "blur" }
        ],
        bankName: [
          { required: true, message: "选择开户行后自动带出", trigger: "blur" }
        ],
        subbankCode: [
          { required: true, message: "选择开户行后自动带出", trigger: "blur" }
        ],
        mobileNum: [
          { required: true, message: "请填写预留手机号", trigger: "blur" },
          { validator: myRules.phoneRule, trigger: "blur" }
        ]
      },
      bankRule: {
        bankName: [
          { required: true, message: "请输入银行名称", trigger: "blur" }
        ],
        cityName: [{ required: true, message: "请输入城市", trigger: "blur" }]
      },
      checkLoading: false // 验证加载
    };
  },
  computed: {
    // 是否有修改过
    isCustomerUpdate() {
      return JSON.stringify(this.cardInfoList) === this.cardInfoListOrigin;
    }
  },
  created() {
    // 获取申请编号。this.applicationIdDetail存在，则说明是从组件过来的，否则是从路由过来的
    if (this.applicationIdDetail) {
      this.applicationId = this.applicationIdDetail;
    } else {
      this.applicationId = this.$route.query.applicationId;
    }

    // 获取全部数据
    this.getAllInfo();
    // this.$on("getAllInfo", () => {
    //   this.getAllInfo();
    // });

    // 点击提交面核触发
    // this.$on("save", () => {
    //   this.save();
    //   this.isSubmit = true;
    // });
    // 监听保存事件，由父路由触发
    // console.log(window.eventBus);
    window.eventBus.$on("checkbank", () => {
      // console.log("收款账户信息管理");
      this.submit();
      this.isSubmit = true;
    });
  },
  methods: {
    // 获取全部数据
    getAllInfo() {
      // 查询收款卡信息
      this.getInfo();

      // 获取支付方式字典
      this.$getDictCode("payment_mode_code", {getAll: this.isDetail}).then(data => {
        this.paymentModeCodeLibrary = data;
      });
    },
    // 查询收款卡信息
    getInfo() {
      // 记录数据是否修改的初始化
      this.cardInfoListOrigin = JSON.stringify(this.cardInfoList);
       // 切换tab时，记录收款信息管理的修改数据，不为空则初始化
      // if (this.checkTabsInfo.cardInfoList) {
      //   // console.log('切换tab时数据初始化');
      //   this.cardInfoList = this.checkTabsInfo.cardInfoList;
      // }

      let loading = this.$loading({
        text: "",
        spinner: "",
        background: "transparent"
      });

      this.$MyFetch
        .post(baseApi.bankInfo.query + this.applicationId)
        .then(data => {
          data.bankCardInfoList.forEach(item => {
            item.paymentModeCodeOrigin = item.paymentModeCode;
            item.mobileNum = item.mobileNum || data.applicationMobileNum;
            item.dropSelectShow = false;
            // 银行信息
            item.bankInfo = {
              bankName: "",
              cityName: "",
              pageNum: 1,
              pageSize: 10,
              total: 0,
              bankList: []
            };
          });

          this.cardInfoList = data.bankCardInfoList;
          this.applicationMobileNum = data.applicationMobileNum;
          // console.log(this.cardInfoList);

          // ========================= 记录是否修改数据 =====================
          this.cardInfoListOrigin = JSON.stringify(this.cardInfoList);

          // 记录收款账户信息管理的修改数据，不为空则初始化
          // if (this.checkTabsInfo.cardInfoList) {
          //   this.cardInfoList = this.checkTabsInfo.cardInfoList;
          // }

          loading.close();
        })
        .catch(err => {
          console.log(err);
          this.confirmFn(err.message, "error");
        });
    },

    // 保存
    submit() {
      // console.log("保存");
      // console.log(this.$refs);
      this.cardInfoList.forEach((item, index) => {
        // 验证字段
        this.$refs['bankInfoForm' + index][0].validateField('accountName', valid => {
          if (valid) this.confirmFn(`产品${index}“收款账户名称”不能为空`, 'error');
        });
        this.$refs['bankInfoForm' + index][0].validateField('accountNum', valid => {
          if (valid) this.confirmFn(`产品${index}“收款卡号/账户”不能为空`, 'error');
        });
        this.$refs['bankInfoForm' + index][0].validateField('mobileNum', valid => {
          // console.log(valid);
          if (valid === '请填写预留手机号') {
            this.confirmFn(`产品${index}“预留手机号”不能为空`, 'error');
          } else if (valid === '请输入正确的手机号码') {
            this.confirmFn(`产品${index}“预留手机号”格式不正确`, 'error');
          }
        });
      });
      // console.log('保存');

      let cardInfoListArr = JSON.parse(JSON.stringify(this.cardInfoList));
      cardInfoListArr.forEach((item) => {
        delete item.paymentModeCodeOrigin;
        delete item.dropSelectShow;
        delete item.bankInfo;
      });
      // console.log(cardInfoListArr);

      let data = {
        applicationId: this.applicationId,
        cardInfoList: cardInfoListArr
      };
      this.$MyFetch
        .post(baseApi.bankInfo.save, data)
        .then((res = {}) => {
          // 保存之后还原修改数据
          this.cardInfoListOrigin = JSON.stringify(this.cardInfoList);
          // this.$emit("remote_checkTabsFn", "check-bank", {});

          // 调用父组件的方法，进行提交面核操作
          if (this.isSubmit) {
            // this.$emit("faceCheck_submit");
            window.eventBus.$emit("remote_faceCheck_submitStopVideo");
            this.isSubmit = false;
          } else {
            this.confirmFn("保存成功！", "success");
          }
        })
        .catch(err => {
          console.log(err);
          this.confirmFn(err.message, "error");
        });
    },

    // 收款卡号/账户事件
    changeAccountNum(index) {
      this.cardInfoList[index].accountNum = this.cardInfoList[index].accountNum
        .replace(/\s/g, "")
        .replace(/[^\d]/g, "")
        .replace(/(\d{4})(?=\d)/g, "$1 ");
    },
    // 查询银行信息
    queryBank(index) {
      // console.log(this.$refs[formName]);
      let bankInfo = this.cardInfoList[index].bankInfo;
      // console.lolg(this.$refs['bankForm' + index]);
      this.$refs['bankForm' + index][0].validate(valid => {
        if (valid) {
          let data = {
            bankName: bankInfo.bankName,
            cityName: bankInfo.cityName,
            pageNum: bankInfo.pageNum,
            pageSize: bankInfo.pageSize
          };
          // this[bank.bankFormCurrent] = data;
          this.queryBankApi(data).then(res => {
            bankInfo.bankList = res.list;
            bankInfo.total = res.total;
            bankInfo.pageNum = res.pageNum;
          });
        } else {
          this.confirmFn("请输入银行名称和城市再进行查询", "error");
        }
      });
    },

    // 获取银行信息
    queryBankApi(data) {
      return new Promise(resolve => {
        this.$MyFetch
          .post(baseApi.bankInfo.list, data)
          .then(data => {
            resolve(data);
          })
          .catch(err => {
            console.log(err);
            this.confirmFn(err.message, "error");
          });
      });
    },
    // 分页
    jump(pageNum) {
      // console.log(this.currentIndex, pageNum);
      this.cardInfoList[this.currentIndex].bankInfo.pageNum = pageNum;
      this.queryBank(this.currentIndex);
    },

    // 选择表格中的开户行
    selectedBank(data) {
      console.log(data);
      let reg = /^([\s\S]*银行)/;
      let cardInfoList = this.cardInfoList[this.currentIndex];
      // console.log(cardInfoList);
      cardInfoList.bankName = data.parentBankName.match(reg)[1]; // 收款行名称
      cardInfoList.subbankName = data.bankName; // 开户行
      cardInfoList.subbankCode = data.bankCode; // 开户行行号
      cardInfoList.bankCode = data.parentBankCode; // 收款行行号 页面不展示
    },
    // 验证银行信息
    checkBank(index) {
      let query = {
        accountName: this.cardInfoList[index].accountName,
        accountNum: this.cardInfoList[index].accountNum,
        applicationId: this.applicationId,
        mobileNum: this.cardInfoList[index].mobileNum,
        productId: this.cardInfoList[index].productId
      };

      // console.log(this.$refs['bankInfoForm' + index]);
      this.$refs["bankInfoForm" + index][0].validate(valid => {
        if (valid) {
          this.checkBankApi(query).then(data => {
            this.confirmFn('收款卡账户验证通过', 'success');
          });
        }
      });
    },
    checkBankApi(data) {
      return new Promise((resolve, reject) => {
        this.checkLoading = true;
        this.$MyFetch
          .post(baseApi.bankInfo.check, data)
          .then(data => {
            this.checkLoading = false;
            resolve(data);
          })
          .catch(err => {
            console.log(err);
            this.confirmFn(err.message, "error");
            this.checkLoading = false;
            reject(err);
          });
      });
    }
  },
  // 组件销毁时触发
  // destroyed() {
  //   // 离开组件时判断是否修改过，修改过就提醒需要保存才能离开，true为没有修改过，false为已修改过
  //   let data = {
  //     cardInfoList: this.cardInfoList
  //   };
  //   if (!this.isCustomerUpdate) {
  //     this.$emit("remote_checkTabsFn", "check-bank", data);
  //   }
  // },
  // 导航离开时，判断数据是否更改，isCustomerUpdate为true则没有更改，反之更改了则不能跳转路由
  beforeRouteLeave(to, from, next) {
    console.log(this.isCustomerUpdate);
    if (this.isCustomerUpdate) {
      next();
    } else {
      window.eventBus.$emit("checkTabsFn", "check-bank");
      next(false);
    }
  },
  beforeDestroy() {
    // 销毁checkbank
    window.eventBus.$off("checkbank");
  }
};
</script>

<style lang="less">
.check-bank {
}
</style>

<style lang="less" scoped>
.check-bank {

  .noInfo{
    text-align:center;
    height: 200px;
    line-height: 200px;
    font-size: 16px;
  }

  .el-form {
    margin-top: 20px;
    .dialog-box__form__group{
      margin-right: -40px;
      font-size:0;
    }
  }

  .drop__select-box {
    vertical-align: top;
    .lab {
      padding: 0 0 10px;
      line-height: 17px;
      font-size: 12px;
      color: @font-gray;
      .icon__star {
        color: @red;
        margin-right: 5px;
      }
    }
  }
  .drop__select-box {
    position: relative;
    .button__wrap {
      position: relative;
      min-width: 100%;
      height: 42px;
      overflow-y: auto;
      padding: 0 20px;
      line-height: 40px;
      border: 1px solid @line-color;
      text-align: left;
      background: none;
      color: @font-light;
      transition: all 0.3s;
      .icon {
        position: absolute;
        transform: rotateZ(180deg);
        right: 5px;
      }
    }
    .button {
      vertical-align: top;
    }
    .wrap {
      position: absolute;
      top: 70px;
      min-width: 100%;
      padding: 20px;
      border: 1px solid @line-color;
      border-radius: 4px;
      background: #fff;
      z-index: 10;
      font-size: 12px;
      .list {
        max-height: 220px;
        overflow-y: auto;
        .item {
          position: relative;
          padding-left: 60px;
          line-height: 60px;
          text-align: center;
          cursor: pointer;
          .num {
            position: absolute;
            left: 0;
            width: 60px;
            display: inline-block;
          }
        }
        .item:hover {
          background: @blue-hover;
        }
      }
    }
    .wrap /deep/ .el-input {
      max-width: 242px;
      margin-right: 10px;
    }
    .wrap /deep/ .el-select {
      width: 242px;
    }
    .table__wrap-max {
      width: 710px;
    }
    .table__wrap-min {
      width: 466px;
    }
  }
  .drop__select-box .button__wrap.isactive {
    border-color: @blue-light;
    .icon {
      transform: rotateZ(0);
    }
  }
  .drop__select-box .button__wrap.disabled {
    background: #f5f7fa;
    cursor: not-allowed;
  }
}
</style>
