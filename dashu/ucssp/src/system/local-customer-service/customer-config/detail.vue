<template>
  <div class="customer_service_detail">
    <el-dialog  title="详情"
      :visible="detailVisable"
      width="800px" :close-on-click-modal="false"
      center @close="$emit('closeDetail')">
      <div>
        <el-form ref="detailForm" :rules="detailFormRules"
          label-position="top" class="detail_form"
          :model="detailForm" label-width="80px">
          <el-form-item label="申请编号" prop="applicationId">
            <el-input v-model="detailForm.applicationId" disabled></el-input>
          </el-form-item>
          <el-form-item label="借款人姓名" prop="customerName">
            <el-input v-model="detailForm.customerName" disabled></el-input>
          </el-form-item>
          <el-form-item label="借款人身份证号" prop="certificateNum">
            <el-input v-model="detailForm.certificateNum" disabled></el-input>
          </el-form-item>
          <el-form-item label="产品一名称" prop="orgName1">
            <el-input v-model="detailForm.orgName1" disabled></el-input>
          </el-form-item>
          <el-form-item label="产品二名称" prop="orgName2">
            <el-input v-model="detailForm.orgName2" disabled></el-input>
          </el-form-item>
          <el-form-item class="full_select" label="初始属地客服" prop="oldCustServiceId">
            <el-select filterable v-model="detailForm.oldCustServiceId" placeholder="请选择属地客服" disabled>
              <el-option filterable v-for="item in localCustemService" :key="item.itemCode" :label="item.itemDesc" :value="item.itemCode"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item class="full_select" label="当前属地客服" prop="newCustServiceId">
            <el-select filterable v-model="detailForm.newCustServiceId" placeholder="请选择属地客服">
              <el-option filterable v-for="item in localCustemService" :key="item.itemCode" :label="item.itemDesc" :value="item.itemCode"></el-option>
            </el-select>
            <!-- <el-input v-model="detailForm.custServiceName"></el-input>
            <img class="img-icon" src="../../../assets/img/more.png" alt=""> -->
          </el-form-item>
          <el-form-item label="变更人员" prop="updateBy">
            <el-input v-model="detailForm.updateBy" disabled></el-input>
          </el-form-item>
          <el-form-item label="变更时间" prop="updateDate">
            <el-input v-model="detailForm.updateDate" disabled></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer">
        <el-button class="btn b_button query" @click="confirm">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {customerConfigApi} from './../js/server';
export default {
  props: {
    detailVisable: {
      type: Boolean,
      default: false
    },
    detaiInfo: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      detailFormRules: {
        newCustServiceId: [{required: true, message: '请选择当前属地客服', trigger: 'change'}]
      },
      detailForm: {},
      localCustemService: [],
      oldCustServiceId: this.detaiInfo.custServiceName,
      applicationId: this.detaiInfo.applicationId
    };
  },
  methods: {
    confirm() {
      this.$refs.detailForm.validate(_v => {
        if (_v) {
          let data = {
            applicationId: this.applicationId,
            oldCustServiceId: this.detailForm.oldCustServiceId,
            newCustServiceId: this.detailForm.newCustServiceId
          };
          this.$MyFetch.post(customerConfigApi.save, data).then(_data => {
            this.confirmFn('更新成功');
            this.$emit('closeDetail', {reflash: true});
          }).catch(_err => {
            this.confirmFn(_err.message, 'error');
          });
        }
      });
    },
    // 获取属地客服
    getUserList(roles = [], subCompanyId) {
      subCompanyId = subCompanyId === 'undefined' ? undefined : subCompanyId;
      this.$MyFetch.post(customerConfigApi.userInfoList, {roles, subCompanyId}).then(_data => {
        this.localCustemService = _data;
      }).catch(_err => {
        this.$error(_err.message);
      });
    },
    init() {
      for (let i in this.detaiInfo) {
        this.$set(this.detailForm, i, this.detaiInfo[i]);
      }
    }
  },
  mounted() {
    this.getUserList(['cpms_r_cc_0001'], this.detaiInfo.subCompanyId);
    // this.detailForm = this.detaiInfo;
    this.init();
  }
};
</script>

<style lang="less">
  .customer_service_detail {
    .detail_form {
      display: flex;
      justify-content: space-around;
      align-items: center;
      flex-wrap: wrap;
      > .el-form-item {
        flex-basis: 31%;
      }
      .full_select {
        > div.el-form-item__content {
          > div.el-select {
            width: 100%;
          }
        }
      }
    }
  }
</style>
