<template>
  <section class="rent-list">
    <div class="filter-form-box">
      <el-form :inline="true"
        class="filter-form-search"
        size="mini">
        <el-form-item>
          <!-- <el-select class="order-status"
            v-model="serverType"
            placeholder="服务类型"
            size="mini"
            @change="handleOrderStatusChange">
            <el-option label="服务类型"
              value="CLEAN_ALL"></el-option>
            <el-option label="维修"
              value="FIX"></el-option>
            <el-option label="个人保洁"
              value="CLEAN"></el-option>
            <el-option label="双周保洁"
              value="CLEAN_PERIOD"></el-option>
            <el-option label="退租保洁"
              value="CLEAN_REFUND"></el-option>
          </el-select> -->
          <el-cascader :options="serverStatusOptions"
            :show-all-levels="false"
            expand-trigger="hover"
            @change="handleOrderStatusChange">
          </el-cascader>
        </el-form-item>
        <el-form-item>
          <el-select class="order-status"
            v-model="serviceStatus"
            placeholder="服务进度"
            size="mini"
            @change="handleServiceStatusChange">
            <el-option label="服务进度"
              value=""></el-option>
            <el-option v-if="assignStatus === 'NONE'"
              label="待指派"
              value="WAITING"></el-option>
            <el-option v-if="assignStatus !== 'NONE'"
              label="待完成"
              value="DOING"></el-option>
            <el-option v-if="assignStatus !== 'NONE'"
              label="已完成"
              value="DONE"></el-option>
            <el-option label="已取消"
              value="CANCEL"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-date-picker class="date-range"
            v-model="TimeSlot"
            type="daterange"
            size="mini"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd">
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-input class="search-key"
            placeholder="租客姓名/手机号/房间/房源编码搜索"
            v-model="queryKey"
            clearable
            size="mini" />
        </el-form-item>
        <el-form-item>
          <el-button type="success"
            size="mini"
            @click="handlePageChange(1)">搜索</el-button>
        </el-form-item>
      </el-form>
    </div>
    <section class="house-list"
      v-loading="loading">
      <el-table :data="serverList"
        border
        stripe
        header-align="center"
        ref="multipleTable"
        size="small"
        height="100%"
        cell-class-name="default-color"
        @row-click="handleRow"
        >
        <el-table-column label="房间"
          :min-width="140"
          align="center">
          <template slot-scope="scope">
            {{scope.row.roomInfo}} {{scope.row.chamberInfo}}
          </template>
        </el-table-column>
        <el-table-column prop="customerName"
          label="租客姓名"
          :min-width="80"
          align="center" />
        <el-table-column prop="customerPhone"
          label="手机号"
          :min-width="100"
          align="center" />
        <el-table-column prop="serviceTypeDesc"
          label="服务类型"
          :min-width="80"
          align="center">
          <template slot-scope="scope">
            {{scope.row.serviceTypeDesc}}
          </template>
        </el-table-column>
        <el-table-column label="服务评分"
          v-if="assignStatus === 'ASSIGNED'"
          :min-width="80"
          align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.attributeRate + scope.row.serviceRate + scope.row.speedRate"> {{((scope.row.attributeRate + scope.row.serviceRate + scope.row.speedRate) / 3).toFixed()}}</span>
            <span v-else>暂无</span>
          </template>
        </el-table-column>
        <el-table-column prop="serviceTime"
          label="服务日期"
          :min-width="80"
          align="center">
          <template slot-scope="scope">
            <span :class="{'c-red':scope.row.serviceTime <= (+ new Date()) && assignStatus === 'NONE'}">
              {{(new Date(scope.row.serviceTime)).toLocaleDateString().replace(/\//g, '-')}}
            </span>
          </template>
        </el-table-column>
        <slot v-if="assignStatus === 'ASSIGNED'">
          <el-table-column prop="workerName"
            label="接单工人"
            :min-width="80"
            align="center" />
        </slot>
        <el-table-column prop="serviceStatusDesc"
          label="服务进度"
          :min-width="80"
          align="center" />
        <el-table-column label="操作"
          :min-width="130"
          align="center">
          <template slot-scope="scope">
            <slot v-if="scope.row.serviceStatus !== 'CANCEL' && scope.row.serviceStatus !== 'DONE'">
              <slot v-if="assignStatus === 'NONE'">
                <el-button type="text"
                  size="small"
                  v-if="checkPermission('OMS_SERVER_ROOMSERVER_ASSIGN')"
                  @click.stop="handleAssign(scope.$index, scope.row)">指派
                </el-button>
              </slot>
              <slot v-else>
                <el-button type="text"
                  size="small"
                  v-if="checkPermission('OMS_SERVER_ROOMSERVER_EDIT')"
                  @click.stop="handleEdit(scope.$index, scope.row)">编辑
                </el-button>
                <el-button type="text"
                  size="small"
                  v-if="checkPermission('OMS_SERVER_ROOMSERVER_DONE')"
                  @click.stop="handleFRinish(scope.$index, scope.row)">完成
                </el-button>
              </slot>
              <el-button type="text"
                size="small"
                v-if="checkPermission('OMS_SERVER_ROOMSERVER_CANCEL')"
                @click.stop="handleCancel(scope.$index, scope.row)">取消
              </el-button>
            </slot>
          </template>
        </el-table-column>
      </el-table>
      <div class="house-pagination">
        <el-pagination class="page" @size-change="handleSizeChange" @current-change="handlePageChange" :current-page="currentPage" :page-sizes="[20, 30, 50]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="recordCount">
        </el-pagination>
      </div>
    </section>
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

    <el-dialog title="工单详情"
      width="950px"
      :visible.sync="DetailDialog"
      :close-on-click-modal="false">
      <work-order-detail :itemprop="itemprop"
        @closeDetail="closeDetail">
      </work-order-detail>
    </el-dialog>

    <!-- 取消弹框 -->
    <el-dialog top="25vh"
      :close-on-click-modal="false"
      width="50%"
      title="工单取消提示"
      :visible.sync="cancelDialog"
      append-to-body>
      <div class="pd-20">
        <h3>取消原因：</h3>
        <my-textarea :maxlength="100"
          placeholder="请输入取消原因"
          :rows="3"
          :model.sync="cancelRemark">
        </my-textarea>
      </div>
      <div class="dialog-footer">
        <el-button size="mini"
          @click="cancelDialog = false,cancelRemark='' ">取消</el-button>
        <el-button type="primary"
          size="mini"
          @click="requestCancel">确定</el-button>
      </div>
    </el-dialog>

    <!-- 完成弹框 -->
    <el-dialog top="25vh"
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
            <my-textarea :maxlength="100"
              placeholder="请输入评价内容"
              :rows="3"
              :model.sync="FRinishData.remark">
            </my-textarea>
            <!-- <el-input type="textarea"
              :rows="7"
              :maxlength="100"
              :max="100"
              :min="6"
              v-model="FRinishData.remark"></el-input> -->
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
    </el-dialog>

  </section>
</template>

<script>
import AddWorkOrder from './AddWorkOrder';
import WorkOrderDetail from './WorkOrderDetail';
import myTextarea from '@/components/MyTextarea';
import { handlePages } from '@/components/common/mixin';
export default {
  name: 'RentServiceList',
  mixins: [handlePages],
  components: {
    AddWorkOrder,
    WorkOrderDetail,
    myTextarea
  },
  data() {
    return {
      title: '新增工单',
      addDialog: false,
      loading: true,

      serviceStatus: '',
      serverList: [],
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
          { pattern: /^\S+$/, message: '请规范输入' }
          // { required: true, message: '评价不能为空', trigger: 'change' }
        ],
        serviceRate: [
          { required: true, message: '服务态度评分不能为空', trigger: 'change' },
          { pattern: /^[1-5]{0,1}$/, message: '服务质量评分不能为空' }
        ],
        speedRate: [
          { required: true, message: '服务速度评分不能为空', trigger: 'change' },
          { pattern: /^[1-5]{0,1}$/, message: '服务质量评分不能为空' }
        ]
      },
      serverStatusOptions: [
        {
          value: '',
          label: '服务类型'
        }, {
          value: 'FIX',
          label: '维修'
        }, {
          value: 0,
          label: '保洁',
          children: [{
            value: 'CLEAN_ALL',
            label: '全部保洁'
          }, {
            value: 'CLEAN_PERIOD',
            label: '双周保洁'
          }, {
            value: 'CLEAN_REFUND',
            label: '退租保洁'
          }, {
            value: 'CLEAN',
            label: '个人保洁'
          }]
        }
      ]
    };
  },
  props: ['assignStatus', 'noneReload', 'assignedReload'],
  mounted() {
    // 获取 所有的枚举状态 暂时写死处理
    // this.$axios.get('/security/server/roomServer/enumInfo')
    //   .then((res) => {
    //     // const { result } = res.data;
    //   })
    //   .catch((err) => {
    //     this.$message.error(err.message || '服务器异常');
    //   });
    // this.requestData();
    // this.serviceStatus = this.assignStatus === 'NONE' ? 'WAITING' : 'DOING';
    // 不是指派后跳转进来的
    if (!this.noneReload && !this.assignedReload) {
      this.requestData();
    }
  },
  activated() {
    if (this.noneReload) {
      this.$emit('update:noneReload', false);
      this.requestData();
    }
    if (this.assignedReload) {
      this.$emit('update:assignedReload', false);
      this.requestData();
    }
  },
  methods: {
    requestData() {
      this.loading = true;
      this.$axios
        .get('/security/server/roomServer/queryRoomServer', {
          params: this.getParams()
        })
        .then(res => {
          this.loading = false;
          if (res.data.status === 'C0000') {
            let { result } = res.data;
            // this.currentPage = result.currentPage;
            this.pageCount = result.pageCount;
            this.recordCount = result.recordCount;
            this.serverList = result.items;
          } else {
            this.$message({
              type: 'warning',
              message: res.data.message
            });
          }
        })
        .catch(err => {
          this.loading = false;
          console.log(err);
          this.$message.error(err.message || '服务器异常');
        });
    },
    getParams() {
      let TimeSlot = this.TimeSlot || [];
      return {
        pageSize: this.pageSize,
        currentPage: this.currentPage,
        serviceStatus: this.serviceStatus,
        assignStatus: this.assignStatus,
        serverType: this.serverType ? this.serverType : '',
        queryKey: this.queryKey,
        serviceTimeStart: TimeSlot[0] || '',
        serviceTimeEnd: TimeSlot[1] || ''
      };
    },
    handleAddWorkOrder() {
      this.title = '新增工单';
      this.addDialog = true;
      this.addDialogType = 'add';
    },
    handleToggleAssignStatus(key, keyPath) {
      this.assignStatus = key;
      this.handlePageChange(1);
    },
    handleOrderStatusChange(key) {
      // console.log(key);
      this.serverType = key[0] ? key[0] : key[1];
      // console.log(this.serverType);
      this.handlePageChange(1);
    },

    handleServiceStatusChange(key, keyPath) {
      this.serviceStatus = key;
      this.handlePageChange(1);
    },

    // 点击当前行
    handleRow(row, event, column) {
      this.itemprop = row;
      this.DetailDialog = true;
    },

    // 打开指派
    handleAssign(index, row) {
      this.title = '指派工单';
      this.itemprop = row;
      this.addDialog = true;
      this.addDialogType = 'asssign';
    },

    // 打开编辑
    handleEdit(index, row) {
      this.title = '编辑工单';
      this.itemprop = row;
      this.addDialog = true;
      this.addDialogType = 'edit';
    },

    // 完成
    handleFRinish(index, row) {
      this.$confirm('确定该工单已完成？', '工单完成提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.frinshDialog = true;
        this.itemId = row.id;
        this.FRinishData = { // 完成订单所需
          attributeRate: 0,
          id: '',
          remark: '',
          serviceRate: 0,
          speedRate: 0
        };
      }).catch(() => {
        this.frinshDialog = false;
      });
    },

    // 完成工单请求
    requestFrinish() {
      this.$refs.frinishForm.validate((valid) => {
        if (valid) {
          this.FRinishData.id = this.itemId;
          this.$axios
            .post('/security/server/roomServer/doneServer',
              this.FRinishData)
            .then(res => {
              if (res.data.status === 'C0000') {
                this.$message({
                  type: 'success',
                  message: '处理成功'
                });
                this.requestData();
                this.frinshDialog = false;
                this.FRinishData = { // 完成订单所需
                  attributeRate: 0,
                  id: '',
                  remark: '',
                  serviceRate: 0,
                  speedRate: 0
                };
              } else {
                this.$message({
                  type: 'warning',
                  message: res.data.message
                });
              }
            })
            .catch(err => {
              console.log(err);
            });
        } else {
          this.$message.warning('请对该服务进行评价');
          // console.log('error submit!!');
          return false;
        }
      });
    },

    // 取消工单请求
    requestCancel() {
      if (!(this.cancelRemark.trim().length > 0)) {
        this.$message.warning('不能输入全部输入空格');
        return;
      }
      this.$axios
        .post('/security/server/roomServer/cancelServer', {
          id: this.itemId,
          cancelRemark: this.cancelRemark
        })
        .then(res => {
          if (res.data.status === 'C0000') {
            this.$message({
              type: 'success',
              message: '处理成功'
            });
            this.requestData();
            this.cancelDialog = false;
            this.cancelRemark = '';
          } else {
            this.$message({
              type: 'warning',
              message: res.data.message
            });
          }
        })
        .catch(err => {
          console.log(err);
        });
    },

    // 取消
    handleCancel(index, row) {
      this.itemId = row.id;
      this.cancelDialog = true;
      this.cancelRemark = '';
      // if (this.assignStatus === 'NONE') {
      //   this.$confirm('确定要取消该工单？', '工单取消提示', {
      //     confirmButtonText: '确定',
      //     cancelButtonText: '取消',
      //     type: 'warning'
      //   }).then(() => {
      //     this.requestCancel();
      //   }).catch(() => {
      //   });
      // }
    },

    toggleRefundDialog(reload) {
      this.addDialog = false;
      // 是否需要重载列表
      if (reload) {
        this.requestData();
      }
    },
    closeDetail() {
      this.DetailDialog = false;
    },

    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>
<style scoped>
.rent-list {
  display: flex;
  flex-direction: column;
  height: 100%;
}
.el-menu--horizontal {
  border-width: 0;
}

.filter-form-search {
  margin-top: 10px;
}

.filter-form-box .el-form-item--mini.el-form-item {
  margin-bottom: 10px !important;
}

.search-key {
  width: 250px;
}

.date-range {
  width: 250px !important;
}


.filter-form-box >>> .el-range-editor.el-input__inner {
  padding: 3px;
}
.filter-form-box >>> .el-input__icon.el-range__icon.el-icon-date {
  display: none;
}
.filter-form-box >>> .el-input__icon.el-range__close-icon {
  width: 18px;
}
.filter-form-box >>> .el-date-editor .el-range__close-icon {
  width: 16px;
}
.text-ellips {
  width: 100px;
}
</style>


