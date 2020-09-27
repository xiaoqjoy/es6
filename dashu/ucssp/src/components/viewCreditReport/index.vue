<template>
  <div class="view_credit_report button-text">
    <span>查看征信报告</span>
    <ul class="hover_down">
      <li v-for="item in dictLib" :key="item.itemCode" class="hover_down_menu" @click="getCreditUrl(item.itemCode)">
        {{item.itemDesc}}
      </li>
    </ul>
  </div>
</template>

<script>
import {baseApi} from '../../common/js/server.js';
export default {
  props: {
    isEdit: {
      type: [Boolean],
      default: false
    },
    moduleCode: {
      type: String,
      default: 'counterF2F' // 柜面面签
    },
    applicationId: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      msg: 'xx',
      dictLib: [
        { itemCode: '01', itemDesc: '一代征信报告' },
        { itemCode: '02', itemDesc: '二代征信报告' }
      ]
    };
  },
  methods: {
    getMultiDict(isReadOnly = false) {
      let data = {
        categoryCodes: ['credit_version'],
        getAll: isReadOnly
      };
      this.$MyFetch.get(baseApi.multipleSelect, data).then(res => {
        this.dictLib = res.credit_version;
      });
    },
    getCreditUrl(creditVersion) {
      this.$getCreditReport(this.moduleCode, this.applicationId, {creditVersion}).then(res => {
        this.$emit('showCredit', {creditReport: res, isShowCredit: true});
      });
    }
  },
  mounted() {
    this.getMultiDict();
  }
};
</script>

<style lang="less">
  .view_credit_report {
    display: inline-block;
    position: relative;
    > span {
      font-size: 12px;
      cursor: pointer;
    }
    > .hover_down {
      display: none;
      width: 120px;
      right: 0;
      position: absolute;
      z-index: 999;
      // margin: 5px 0;
      top: 29px;
      background-color: #fefeff;
      // box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);
      border: 1px solid #e4e7ed;
      // transition: all .3s;
      > .hover_down_menu {
        cursor: pointer;
        height: 34px;
        line-height: 34px;
        padding: 0 20px;
        font-size: 12px;
      }
    }
    > .hover_down:hover {
      border: 1px solid #e4e7ed;
      background-color: #fff;
    }
  }
  .view_credit_report:hover {
    .hover_down {
      display: block;
      width: 120px;
      border: 1px solid #e4e7ed;
      > .hover_down_menu {
        cursor: pointer;
        height: 34px;
        line-height: 34px;
        padding: 0 20px;
        font-size: 12px;
      }
      // background-color: #fff;
      // transition: all 1s;
    }
  }
</style>
