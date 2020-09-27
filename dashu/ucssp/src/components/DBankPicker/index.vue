<!-- 组件说明： -->
<!-- 不要在一个组件内和bankPicker一起用不然逻辑会乱的 -->
<template>
  <div>
    <div class="bank-picker-wrap">
      <button
        class="el-button button__wrap ellipsis"
        type="button"
        :disabled="disabled"
        :class="{isactive: dropSelectShow}"
        @click="dropSelectShow = !dropSelectShow"
      >
        {{title || '请选择开户行'}}<i class="icon el-select__caret el-input__icon el-icon-arrow-up"></i>
      </button>
    </div>
    <div class="banks-list-mon" v-if="dropSelectShow"></div>
    <!-- 用于遮住object元素，object元素，div罩不住。。。 -->
    <iframe src="about:blank" frameborder="0" id="banks-iframe" v-show="dropSelectShow"></iframe>
    <div class="banks-list" v-if="dropSelectShow">
      <h4>请选择银行<span class="close-coin" @click="closeBanksList"><i class="close-icoin"></i></span></h4>
      <div class="wrap table__wrap-max" v-show="dropSelectShow">
        <el-form
          label-width="100px"
          class="demo-form-inline"
          label-position="top"
          :model="bankInfo"
          :rules="bankRule"
          :disabled="disabled"
        >
          <el-form-item prop="bankName" style="margin-right:10px">
            <el-input placeholder="输入银行名称" v-model.trim="bankInfo.bankName" @keyup.enter.native="queryBank"></el-input>
          </el-form-item>
          <el-form-item prop="cityName" style="margin-right:10px">
            <el-input placeholder="输入城市" v-model.trim="bankInfo.cityName" @keyup.enter.native="queryBank"></el-input>
          </el-form-item>
          <el-button type="primary" class="button button__blue width100" @click="queryBank">查询</el-button>
        </el-form>
      </div>
      <div class="tab-wrap">
        <el-table
          border
          highlight-current-row
          cell-class-name="dialog__table__td"
          header-cell-class-name="dialog__table__th"
          height="530px"
          :data="bankInfo.bankList"
          @row-click="selectedBank" class="dialog__table"
        >
          <el-table-column v-for="item in columnList" :key="item.prop" :prop="item.prop" :label="item.label"></el-table-column>
        </el-table>
      </div>
      <pagination :page="pageInfo" style="margin-top: 10px" @jump-page="jump"></pagination>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import pagination from "@components/pagination";
export default {
  name: 'DBankPicker',
  components: { pagination },
  props: {
    disabled: {
      type: Boolean,
      default: () => false
    },
    api: {
      type: String,
      required: true
    },
    title: {
      type: String,
      default: ''
    },
    applicationId: {
      type: String,
      default: ''
    },
    productId: {
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
      dropSelectShow: false,
      bankInfo: {
        bankName: "", // 银行名称
        cityName: "", // 城市名称
        pageNum: 1, // 当前页
        pageSize: 10, // 每页个数
        total: 0, // 总数
        bankList: [] // 银行列表
      },
      bankRule: {
        bankName: [{ required: true, message: "请输入银行名称", trigger: "blur" }],
        cityName: [{ required: true, message: "请输入城市", trigger: "blur" }]
      }
    };
  },
  computed: {
    pageInfo() {
      const { pageNum, total, pageSize } = this.bankInfo;
      return { currentPage: pageNum, account: total, pageSize, showJumpButton: false };
    }
  },
  methods: {
    selectedBank(_data) {
      this.$emit('change', _data);
      this.dropSelectShow = false;
      this.clearSearch();
    },
    async queryBank() {
      const { bankName, cityName, pageNum, pageSize } = this.bankInfo;
      if (!bankName || !cityName) {
        this.confirmFn("请输入银行名称和城市再进行查询", "error");
        return;
      }
      let data = { bankName, cityName, pageNum, pageSize, applicationId: this.applicationId, productId: this.productId };
      this.queryBankApi(data).then(res => {
        this.bankInfo.bankList = res.list;
        this.bankInfo.total = res.total;
        this.bankInfo.pageNum = res.pageNum;
      });
    },
    closeBanksList() {
      this.$emit('close');
      this.dropSelectShow = false;
      this.clearSearch();
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
      this.bankInfo.pageNum = pageNum;
      this.queryBank();
    },
    clearSearch() {
      this.bankInfo = { bankName: "", cityName: "", pageNum: 1, pageSize: 10, total: 0, bankList: [] };
    }
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
