<template>
  <section class="house-box">
    <header class="house-header">
      <div class="tab-pane">
        <el-menu :default-active="assignStatus"
          class="el-menu-demo"
          mode="horizontal"
          active-text-color="#008842"
          @select="handleToggleAssignStatus">
          <el-menu-item index="NONE">待指派</el-menu-item>
          <el-menu-item index="ASSIGNED">已指派</el-menu-item>
        </el-menu>
        <div class="house-add">
          <el-button v-if="checkPermission('OMS_SERVER_ROOMSERVER_EDIT')"
            type="success"
            size="mini"
            @click="handleAddWorkOrder">新增工单</el-button>
        </div>
      </div>
    </header>
    <keep-alive>
      <rent-service-list ref="NONE"
        v-if="assignStatus==='NONE'"
        :noneReload.sync="noneReload"
        :assignStatus="assignStatus"></rent-service-list>
    </keep-alive>
    <keep-alive>
      <rent-service-list ref="ASSIGNED"
        :assignStatus="assignStatus"
        :assignedReload.sync="assignedReload"
        v-if="assignStatus==='ASSIGNED'">
      </rent-service-list>
    </keep-alive>

    <el-dialog :title="title"
      width="950px"
      :visible.sync="addDialog"
      :close-on-click-modal="false">
      <add-work-order :addDialogType="addDialogType"
        v-if="addDialog"
        :itemprop="itemprop"
        @toggleRefundDialog="toggleRefundDialog">
      </add-work-order>
    </el-dialog>

    <!-- <el-dialog title="工单详情"
      width="950px"
      :visible.sync="DetailDialog"
      :close-on-click-modal="false">
      <work-order-detail :itemprop="itemprop"
        @closeDetail="closeDetail">
      </work-order-detail>
    </el-dialog> -->

    <!-- <el-dialog top="25vh"
      :close-on-click-modal="false"
      width="50%"
      title="工单取消提示"
      :visible.sync="cancelDialog"
      append-to-body>
      <div>
        <h3 class="pd-20">取消原因：</h3>
        <el-input type="textarea"
          :rows="7"
          :maxlength="100"
          :max="100"
          :min="6"
          v-model="cancelRemark"></el-input>
      </div>
      <div class="dialog-footer">
        <el-button size="mini"
          @click="cancelDialog = false,cancelRemark='' ">取消</el-button>
        <el-button type="primary"
          size="mini"
          @click="requestCancel">确定</el-button>
      </div>
    </el-dialog> -->

    <!-- <el-dialog top="25vh"
      :close-on-click-modal="false"
      width="50%"
      title="服务评价"
      :visible.sync="frinshDialog"
      append-to-body>
      <div class="pd-20"
        v-if="frinshDialog">
        <el-form ref="frinishForm"
          :model="FRinishData"
          :rules="rules"
          size="mini"
          label-position="right"
          label-width="100px">
          <el-form-item label="服务质量："
            prop="serviceRate">
            <el-rate v-model="FRinishData.serviceRate"
              :max="5"
              :colors="['#008842', '#008842', '#008842']"></el-rate>
          </el-form-item>
          <el-form-item label="服务态度："
            prop="attributeRate">
            <el-rate v-model="FRinishData.attributeRate"
              :max="5"
              :colors="['#008842', '#008842', '#008842']"></el-rate>
          </el-form-item>
          <el-form-item label="相应速度："
            prop="speedRate">
            <el-rate v-model="FRinishData.speedRate"
              :max="5"
              :colors="['#008842', '#008842', '#008842']"></el-rate>
          </el-form-item>
          <el-form-item label="评价内容："
            prop="remark">
            <el-input type="textarea"
              :rows="7"
              :maxlength="100"
              :max="100"
              :min="6"
              v-model="FRinishData.remark"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div class="dialog-footer">
        <el-button size="mini"
          @click="frinshDialog = false">取消</el-button>
        <el-button type="primary"
          size="mini"
          @click="requestFrinish">提交</el-button>
      </div>
    </el-dialog> -->

  </section>
</template>

<script>
import { mapState } from 'vuex';
import AddWorkOrder from './components/RentService/AddWorkOrder';
import WorkOrderDetail from './components/RentService/WorkOrderDetail';
import RentServiceList from './components/RentService/RentServiceList';
export default {
  name: 'RentService',
  components: {
    AddWorkOrder,
    WorkOrderDetail,
    RentServiceList
  },
  computed: {
    ...mapState([
      'toggleRentService'
    ])
  },
  data() {
    return {
      isRenload: false,
      noneReload: false,
      assignedReload: false,
      title: '新增工单',
      addDialog: false,
      loading: true,
      pageSize: 20,
      pageCount: 1,
      recordCount: 0,
      currentPage: 1,
      serviceStatus: '',
      serverList: [],
      assignStatus: 'NONE',
      serverType: '',
      queryKey: '',
      TimeSlot: '',
      refundTime: '',
      addDialogType: 'add',
      cancelDialog: false,
      cancelRemark: '',
      itemId: '',
      frinshDialog: false,
      DetailDialog: false,
      FRinishData: { // 完成订单所需
        attributeRate: 0,
        id: '',
        remark: '',
        serviceRate: 0,
        speedRate: 0
      },
      itemprop: {},
      rules: {
        attributeRate: [
          { required: true, message: '服务质量评分不能为空', trigger: 'change' },
          { pattern: /^[1-5]{0,1}$/, message: '服务质量评分不能为空' }
        ],
        remark: [
          { required: true, message: '评价不能为空', trigger: 'change' }
        ],
        serviceRate: [
          { required: true, message: '服务态度评分不能为空', trigger: 'change' },
          { pattern: /^[1-5]{0,1}$/, message: '服务质量评分不能为空' }
        ],
        speedRate: [
          { required: true, message: '服务速度评分不能为空', trigger: 'change' },
          { pattern: /^[1-5]{0,1}$/, message: '服务质量评分不能为空' }
        ]
      }
    };
  },
  // mounted() {
  //   // 获取 所有的枚举状态 暂时写死处理
  //   this.$axios.get('/security/server/roomServer/enumInfo')
  //     .then((res) => {
  //       // const { result } = res.data;
  //     })
  //     .catch((err) => {
  //       this.$message.error(err.message || '服务器异常');
  //     });

  //   this.requestData();
  // },
  methods: {
    // toggleReload(data) {
    //   this.isRenload = data;
    // },
    handleAddWorkOrder() {
      this.title = '新增工单';
      this.addDialog = true;
      this.addDialogType = 'add';
    },
    handleToggleAssignStatus(key, keyPath) {
      this.assignStatus = key;
    },

    toggleRefundDialog(reload) {
      this.addDialog = false;
      // 是否需要重载列表
      if (this.assignStatus === 'NONE') {
        reload && this.$refs.NONE.requestData();
      } else if (this.assignStatus === 'ASSIGNED') {
        reload && this.$refs.ASSIGNED.requestData();
      };
      // }
    },
    closeDetail() {
      this.DetailDialog = false;
    }
    // resetForm(formName) {
    //   this.$refs[formName].resetFields();
    // }
  },
  watch: {
    toggleRentService(val) {
      console.log(val);
      this.assignStatus = val;
      this.noneReload = true;
      this.assignedReload = true;
    }
  }
};
</script>
<style scoped>
.el-menu--horizontal {
  border-width: 0;
}
.search-key {
  width: 177px;
}

.date-range {
  width: 250px !important;
}

</style>
