<!-- 组件说明： -->
<!-- 根据项目上线后，抽取相关代码封装而成，使用必须在组件添加@click = "index = num" num 为第几个组件，具体使用可以查看face2face/face2face-undisposed/product-info/index.vue -->
<template>
  <div>
    <div class="bank-picker-wrap">
      <button class="el-button button__wrap ellipsis"
        type="button"
        @click="cardInfo.dropSelectShow = !cardInfo.dropSelectShow"
        :disabled="disabled"
        :title="title"
        :class="{isactive: cardInfo.dropSelectShow}">
        {{cardInfo.subbankName? cardInfo.subbankName: '请选择开户行'}}
        <i class="icon el-select__caret el-input__icon el-icon-arrow-up"></i>
      </button>
    </div>
    <div class="banks-list-mon" v-if="cardInfo.dropSelectShow"></div>
    <!-- 用于遮住object元素，object元素，div罩不住。。。 -->
    <iframe src="about:blank" frameborder="0" id="banks-iframe" v-show="cardInfo.dropSelectShow"></iframe>
    <div class="banks-list" v-if="cardInfo.dropSelectShow">
      <h4>
        请选择银行
        <span class="close-coin" @click="closeBanksList"><i class="close-icoin"></i></span>
      </h4>
      <div class="wrap table__wrap-max" v-show="cardInfo.dropSelectShow">
        <el-form :model="cardInfo.bankInfo"
            :ref="refName"
            :rules="bankRule"
            label-width="100px"
            class="demo-form-inline" label-position="top" :disabled="disabled">
          <el-form-item
            prop="bankName"
            style="margin-right:10px">
            <el-input placeholder="输入银行名称" v-model.trim="cardInfo.bankInfo.bankName" @keyup.enter.native="queryBank"></el-input>
          </el-form-item>
          <el-form-item
            prop="cityName"
            style="margin-right:10px">
            <el-input placeholder="输入城市" v-model.trim="cardInfo.bankInfo.cityName" @keyup.enter.native="queryBank"></el-input>
          </el-form-item>
          <el-button type="primary" class="button button__blue width100" @click="queryBank">查询</el-button>
        </el-form>
      </div>
      <div class="tab-wrap">
        <el-table
          :data="cardInfo.bankInfo.bankList"
          border highlight-current-row
          cell-class-name="dialog__table__td"
          header-cell-class-name="dialog__table__th"
          height="530px"
          @row-click="selectedBank" class="dialog__table">
            <el-table-column
              v-for="item in columnList" :key="item.prop"
              :prop="item.prop" :label="item.label" :width="item.width">
            </el-table-column>
        </el-table>
      </div>
      <pagination :page="{currentPage: cardInfo.bankInfo.pageNum,account:  cardInfo.bankInfo.total,pageSize: cardInfo.bankInfo.pageSize,showJumpButton: false}" style="margin-top: 10px" @jump-page="jump"></pagination>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import pagination from "@components/pagination";
export default {
  name: 'bankPicker',
  props: {
    cardInfo: {
      type: Object,
      default() {
        return {};
      }
    },
    disabled: {
      type: Boolean,
      default() {
        return false;
      }
    },
    bankRule: {
      type: Object,
      default() {
        return {};
      }
    },
    refName: {
      type: String,
      default: ''
    },
    api: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    },
    applicationId: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      columnList: [
        { prop: 'bankName', label: '银行名称' },
        { prop: 'bankCode', label: '银行编号' },
        { prop: 'parentBankName', label: '总行名称' },
        { prop: 'parentBankCode', label: '总行编号' }
      ],
      showTab: false
    };
  },
  mounted() {
    // console.log(this.refName);
  },
  methods: {
    selectedBank(_data) {
      this.cardInfo.subbankName = _data.bankName; // 开户行
      this.cardInfo.subbankCode = _data.bankCode; // 开户行行号
      this.cardInfo.bankName = _data.parentBankName; // 收款行名称
      this.cardInfo.bankCode = _data.parentBankCode; // 收款行行号
      this.cardInfo.dropSelectShow = false;
      this.showTab = false;
      this.$emit('change', _data);
    },
    queryBank() {
      // console.log(this.$refs[formName]);
      let bankInfo = this.cardInfo.bankInfo;
      this.$refs[this.refName].validate(valid => {
        if (valid) {
          let data = {
            bankName: bankInfo.bankName,
            cityName: bankInfo.cityName,
            pageNum: bankInfo.pageNum,
            pageSize: bankInfo.pageSize,
            applicationId: this.applicationId,
            productId: this.cardInfo.productId
          };
          // this[bank.bankFormCurrent] = data;
          this.queryBankApi(data).then(res => {
            this.showTab = true;
            bankInfo.bankList = res.list;
            bankInfo.total = res.total;
            bankInfo.pageNum = res.pageNum;
          });
        } else {
          this.confirmFn("请输入银行名称和城市再进行查询", "error");
        }
      });
    },
    closeBanksList() {
      this.cardInfo.dropSelectShow = false;
      this.showTab = false;
    },
    // 获取银行信息
    queryBankApi(data) {
      return new Promise(resolve => {
        this.$MyFetch
          .post(this.api, data)
          .then(data => {
            resolve(data);
          })
          .catch(err => {
            console.log(err);
            this.confirmFn(err.message, "error");
          });
      });
    },
    jump(pageNum) {
      this.cardInfo.bankInfo.pageNum = pageNum;
      this.queryBank();
    }
  },
  components: {
    pagination
  }
};
</script>

<style lang="less" scoped>
  // 用于遮住object元素
  #banks-iframe {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: 100%;
    margin: auto;
    z-index: 1;
  }
  .bank-picker-wrap {
    position: relative;
    .button__wrap {
      position: relative;
      width: 100%;
      height: 42px;
      // overflow-y: auto;
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
    .button__wrap.isactive {
      border-color: @blue-light;
      .icon {
        transform: rotateZ(0);
      }
    }
    .button__wrap.disabled {
      background: #f5f7fa;
      cursor: not-allowed;
    }
  }
  .banks-list-mon {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    background-color: #000;
    opacity: .5;
    z-index: 99;
  }
  .banks-list {
    position: fixed;
    width: 1200px;
    height: 700px;
    z-index: 101;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    padding: 20px;
    h4 {
      font-size: 20px;
      text-align: center;
      font-weight: 600;
      margin-bottom: 5px;
    }
    .close-coin {
      font-size: 16px;
      float: right;
      cursor: pointer;
      i {
        color: #909399;
        font-family: element-icons!important;
        font-style: normal;
        font-weight: 400;
        font-variant: normal;
        text-transform: none;
        line-height: 1;
        vertical-align: baseline;
        display: inline-block;
      }
      .close-icoin::before {
        content: "\E6DB";
      }
    }
    .wrap.table__wrap-max > form > div{
      vertical-align: baseline;
    }
    /deep/ .dialog__table {
      tr.el-table__row {
        td {
          padding: 12px 0;
        }
      }
    }
  }
</style>
