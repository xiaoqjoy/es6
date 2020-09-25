<template>
  <div>
    <el-dialog class="change-bank-card-detail"
      :title="config.title"
      :visible="showDialogDetail" width="945px"
      center @close="$emit('closeDetail')"
      :close-on-click-modal="false">
      <div class="detail-top">
        <!-- 变更流水号从后台获取 -->
        <div><span class="title">变更流水号： </span><span>{{batchNo}}</span></div>
        <div><span class="title">姓名： </span><span>{{detail.customerName}}</span></div>
        <div><span class="title">申请编号： </span><span>{{detail.applyNo}}</span></div>
        <div><span class="title">出账编号： </span><span>{{detail.loanNo}}</span></div>
        <!-- {{config}} -->
      </div>
      <div>
        <el-form :model="formData" :disabled="config.disabled" label-position="top" class="form-flex">
          <el-form-item v-for="item in formItems"
          :key="item.prop" :prop="item.prop"
          :label="item.label" class="bank-card-form-item">
            <el-input v-model="formData[item.prop]" v-if="item.type === 'input'" :disabled="item.disabled"></el-input>
            <el-select v-if="item.type === 'select'"
              v-model="formData[item.prop]" :filterable="item.filterable"
              placeholder="请选择" :disabled="item.disabled" @change="item.handle">
                <el-option
                  v-for="e in dict[item.options]"
                  :key="e.itemCode"
                  :label="e.itemDesc"
                  :value="e.itemCode">
                </el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <div class="btn" v-if="!config.disabled">
        <el-button class="width200 button__blue" type="primary" @click="saveForm">保存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { changeBank as api } from './../../../js/server';
export default {
  name: 'changeBankCardDetail',
  props: {
    config: {
      type: Object,
      default: () => ({})
    },
    showDialogDetail: {
      type: Boolean,
      default: () => false
    }
  },
  data() {
    return {
      msg: 'changeBankCardDetail',
      formItems: [
        { label: '原还款卡卡号', prop: 'oldDeductCardNo', type: 'input', disabled: true },
        { label: '原总行名称', prop: 'oldDeductBankName', type: 'input', disabled: true },
        { label: '新还款卡卡号', prop: 'recentDeductCardNo', type: 'input', disabled: false },
        { label: '新总行名称',
          prop: 'recentDeductBankNo',
          type: 'select',
          options: 'bankList',
          disabled: false,
          filterable: true,
          handle: (_new, _old) => {
            // debugger;
          }
        },
        { label: '是否同步变更收款卡',
          prop: 'isSync',
          type: 'select',
          options: 'isSyncList',
          disabled: false,
          handle: (_new, _old) => {
            // debugger;
            if (_new !== _old) {
              this.confirmFn('同步规则与机构配置相关，请注意是否强制变更');
            }
          }
        },
        { label: '原收款卡卡号', prop: 'oldCollectCardNo', type: 'input', disabled: true },
        { label: '原总行名称', prop: 'oldCollectBankName', type: 'input', disabled: true }
      ],
      formData: {
        oldDeductBankName: '',
        oldDeductCardNo: '',
        oldDeductBankNo: '',
        recentDeductCardNo: '',
        recentDeductBankNo: '',
        isSync: '',
        oldCollectCardNo: '',
        oldCollectBankNo: ''
      },
      batchNo: '',
      dict: {
        bankList: [],
        isSyncList: [
          { itemDesc: '是', itemCode: '1' },
          { itemDesc: '否', itemCode: '0' }
        ]
      }
    };
  },
  methods: {
    saveForm() {
      // 多大
      let reg = /^[0-9]{16,}$/;
      // if (!this.formData.recentDeductCardNo || this.formData.recentDeductCardNo.length < 16) {
      if (!reg.test(this.formData.recentDeductCardNo)) {
        this.$message({ type: 'error', message: '还款卡号不正确，请检查' });
        return;
      }
      if (this.formData.recentDeductCardNo === this.formData.oldDeductCardNo) {
        this.$message({ type: 'error', message: '新卡号已存在，请检查' });
        return;
      }
      let data = {
        isSync: this.formData.isSync,
        batchNo: this.batchNo,
        loanNo: this.detail.loanNo,
        deductCardNo: {
          old: this.formData.oldDeductCardNo,
          recent: this.formData.recentDeductCardNo
        },
        deductBankNo: {
          old: this.formData.oldDeductBankNo,
          recent: this.formData.recentDeductBankNo
        },
        deductBankName: {
          old: this.formData.oldDeductBankName,
          recent: ''
        },
        collectCardNo: {
          old: this.formData.oldCollectCardNo,
          recent: ''
        },
        collectBankNo: {
          old: this.formData.oldCollectBankNo,
          recent: ''
        },
        collectBankName: {
          old: this.formData.oldCollectBankName,
          recent: ''
        }
      };
      this.$MyFetch.post(api.add, data)
        .then(_data => {
          if (_data.result) {
            this.$message({type: 'success', message: '新增成功'});
            this.$emit('closeDetail', true);
          }
        }).catch(_error => {
          this.$error(_error.message);
        });
      // console.log(this.formData);
    },
    init() {
      let url = api.addQuery;
      let data = {};
      if (this.config.disabled) {
        // 详情
        url = api.detail;
        this.batchNo = this.config.rowData.batchNo;
        data.batchNo = this.batchNo;
      }
      data.loanNo = this.config.rowData.loanNo;
      this.$MyFetch.post(url, data).then(_data => {
          _data = _data || {};
          if (_data.batchNo) {
            this.batchNo = _data.batchNo;
          }
          this.formData.isSync = _data.isSync;
          this.formData.oldDeductCardNo = _data.deductCardNo.old;
          this.formData.recentDeductCardNo = _data.deductCardNo.recent;
          this.formData.oldDeductBankNo = _data.deductBankNo.old;
          this.formData.oldDeductBankName = _data.deductBankName.old;
          this.formData.recentDeductBankNo = _data.deductBankNo.recent;
          this.formData.oldCollectCardNo = _data.collectCardNo.old;
          this.formData.oldCollectBankNo = _data.collectBankNo.old;
          this.formData.oldCollectBankName = _data.collectBankName.old;
        }).catch(_error => {
          this.$error(_error.message);
        });
      this.bankQuery();
    },
    bankQuery() {
      let url = api.bankQuery;
      this.$MyFetch.post(url).then(_data => {
        this.dict.bankList = _data;
      }).catch(_error => {
        this.$error(_error.message);
      });
    }
  },
  computed: {
    detail() {
      // console.log(this.config);
      return this.config.rowData;
    }
  },
  mounted() {
    // console.log(this.detail);
  },
  created() {
    this.init();
  }
};
</script>

<style lang="less" scoped>
  .change-bank-card-detail {
    .btn {
      margin-top: 20px;
      text-align: center;
    }
    .detail-top {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      text-align: left;
      margin-bottom: 10px;
      .title {
        color: #666;
        margin-right: 5px;
      }
      > div {
        flex-basis: 45%;
      }
      > div:nth-child(1),> div:nth-child(2) {
        margin-bottom: 10px;
      }
    }
    .form-flex {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      text-align: left;
      .bank-card-form-item {
        flex-basis: 45%;
        -ms-flex-preferred-size: 45%;
        flex-grow: 0;
        -ms-flex-positive: 0;
      }
      .bank-card-form-item:nth-last-child(3) {
        flex-basis: 100%;
        -ms-flex-preferred-size: 100%;
      }
    }
  }
</style>

<style lang="less">
  .change-bank-card-detail {
    .el-dialog__header {
      box-shadow: 0 1px 10px 0 rgba(0,0,0,.05);
    }
  }
</style>
