<template>
  <section class="cust-detail">
    <div v-if="!userInfo.manager"
      class="cust-detail-but">
      <el-button v-if="checkPermission('CUSTOMER_EDIT')"
        size="mini"
        @click="addCutDialogVisible=true">编辑
      </el-button>
      <slot v-if="checkPermission('CUSTOMER_LOOK_EDIT')">
        <el-button size="mini"
          @click="handleAddTaking">预约带看
        </el-button>
        <el-button size="mini"
          @click="handleTrckingTaking">录带看
        </el-button>
      </slot>

    </div>
    <el-tabs v-model="activeName">
      <el-tab-pane label="基本信息"
        name="first">
        <customer-info ref="customerInfo"
          :custId="custId"
          @setCustName="getCustName">
        </customer-info>
      </el-tab-pane>
      <el-tab-pane label="租住记录"
        name="second">
        <cust-rent-log :custId="custId"></cust-rent-log>
      </el-tab-pane>
      <el-tab-pane label="带看记录"
        name="third">
        <taking-log ref="takingLog"
          :custId="custId">
        </taking-log>
      </el-tab-pane>
    </el-tabs>

    <el-dialog v-if="addCutDialogVisible"
      title="编辑客户"
      :visible.sync="addCutDialogVisible"
      append-to-body
      :close-on-click-modal="false"
      width="950px">
      <add-customer @refreshData="refreshData"
        :addCutDialogVisible.sync="addCutDialogVisible"
        :cutDialogType="'edit'"
        :custId="custId" />
    </el-dialog>

    <el-dialog v-if="addTakingDialogVisible"
      :title="takingTitle"
      append-to-body
      :visible.sync="addTakingDialogVisible"
      :close-on-click-modal="false"
      width="950px">
      <add-taking :addType="addType"
        :source="'custDetail'"
        :custId="custId"
        :custName="custName"
        :addTakingDialogVisible.sync="addTakingDialogVisible"
        @refreshData="refreshTakeLogData">
      </add-taking>
    </el-dialog>
  </section>
</template>
<script>
import { mapState } from 'vuex';
import AddCustomer from './AddCustomer';
import CustomerInfo from './CustomerInfo';
import CustRentLog from './CustRentLog';
import TakingLog from './TakingLog';
import AddTaking from '../Taking/AddTaking';
export default {
  data() {
    return {
      addCutDialogVisible: false,
      activeName: 'first',
      addType: 'add',
      addTakingDialogVisible: false,
      takingTitle: '',
      custName: ''
    };
  },
  props: ['custId'],
  provide: {
    custId: this.custId
  },
  computed: {
    ...mapState([
      'userInfo'
    ])
  },
  // inject: ['for'],
  methods: {
    handleAddTaking() {
      this.addType = 'add';
      this.addTakingDialogVisible = true;
      this.takingTitle = '预约带看';
    },
    handleTrckingTaking() {
      this.addType = 'trcking';
      this.addTakingDialogVisible = true;
      this.takingTitle = '录带看';
    },
    getCustName(data) {
      this.custName = data;
    },
    refreshData() {
      this.$refs.customerInfo.requestData();
    },
    refreshTakeLogData() {
      this.$refs.takingLog.requestData();
    },

    handleCloseAllDialog() {
      // return new Promise((resolve, reject) => {
      this.addCutDialogVisible = false;
      this.addTakingDialogVisible = false;
      return true;
      //   resolve(true);
      // });
    }
  },
  components: {
    AddCustomer,
    CustomerInfo,
    CustRentLog,
    TakingLog,
    AddTaking
  }
};
</script>
<style scoped>
.cust-detail {
  position: relative;
}
.cust-detail >>> .el-tabs__nav-scroll {
  height: 50px;
  line-height: 50px;
}
.cust-detail-but {
  height: 50px;
  line-height: 50px;
  padding-right: 20px;
  position: absolute;
  right: 0;
  z-index: 5000;
}
</style>

