<template>
  <div class="customer_complain_service">
    <el-dialog title="投诉详情" :visible="true"
      width="width" center :close-on-click-modal="false"
      :before-close="dialogBeforeClose">
      <p><span class="title">出账编号: </span><span class="content">{{detailInfo.loanNo}}</span></p>
      <div class="main_wrap">
        <div v-for="item in itemList" :key="item.label" :class="item.className">
          <span class="title">{{item.label}}: </span>
          <span class="content">{{detailInfo[item.itemCode]}}</span>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {loanApi} from './../js/server';
export default {
  props: {
    detailVisible: {
      type: Boolean,
      default: false
    },
    complainInfoId: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      itemList: [
        // {label: '出账编号'},
        {label: '受理日期', itemCode: 'acceptDate'},
        {label: '投诉来源', itemCode: 'source'},
        {label: '投诉业务类型', itemCode: 'type'},
        {label: '是否结案', itemCode: 'finishFlag'},
        {label: '跟进人', itemCode: 'follower'},
        {label: '详情', itemCode: 'detail', className: 'detail_main'},
        {label: '处理方案', itemCode: 'solution', className: 'detail_main'}
      ],
      detailInfo: {}
    };
  },
  methods: {
    dialogBeforeClose() {
      this.$emit('closeDetail');
    },
    getDetail() {
      let complainInfoId = this.complainInfoId;
      this.$MyFetch.post(loanApi.queryDetail, {complainInfoId}).then(_data => {
        this.detailInfo = _data;
      }).catch(_err => {
        this.$error(_err.message);
      });
    }
  },
  mounted() {
    this.getDetail();
  }
};
</script>

<style lang="less">
  .customer_complain_service{
    .el-dialog__header{
      box-shadow: 0 2px 6px 0 #d0d0d0;
    }
    .el-dialog__body {
      text-align: left;
      > p {
        text-align: right;
        font-size: 18px;
      }
    }
    .title {
      color: #666;
    }
    .content {
      color: #000;
      letter-spacing: 0.86px;
      white-space: pre-line;
    }
    .main_wrap {
      height: 500px;
      overflow: auto;
      > div {
        line-height: 25px;
        float: left;
        width: 45%;
        margin-bottom: 5px;
      }
      > div.detail_main {
        width: 100%;
      }
    }
  }
</style>
