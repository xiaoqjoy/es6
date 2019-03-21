<template>
    <div class="house-list">
      <el-table :data="data"
        stripe
        border
        ref="multipleTable"
        size="mini"
        height=100%
        style="width:100%;"
        cell-class-name="default-color"
        @row-click="handleRow"
        @sort-change="handleSort"
        v-loading="loading">
        <!-- <el-table-column prop="roomType"
            label="类型"
            :min-width="50"
            align="center">
            <template slot-scope="scope">
              <span v-if="scope.row.roomType === 'CENTRALIZED_MODEL'"
                class="type-item green">集</span>
              <span v-if="scope.row.roomType === 'DISTRIBUTED_MODEL'"
                class="type-item red">分</span>
            </template>
          </el-table-column> -->
        <el-table-column label="房源编码"
          :min-width="130"
          show-overflow-tooltip
          align="center">
          <template slot-scope="scope">
            {{scope.row.roomCode}}
          </template>
        </el-table-column>
        <!-- <slot v-if="activeIndex ==='COMMIT_ROOM'">
          <el-table-column label="收房编码"
            :min-width="130"
            show-overflow-tooltip
            align="center">
            <template slot-scope="scope">
              {{scope.row.commitNumber}}
            </template>
          </el-table-column>
        </slot> -->

        <el-table-column label="楼盘"
          show-overflow-tooltip
          :min-width="100"
          align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.gardenName.indexOf('，') !== -1">{{scope.row.gardenName.split('，')[0]}}</span>
            <span v-else>{{scope.row.gardenName.split(',')[0]}}</span>
          </template>
        </el-table-column>
        <el-table-column label="楼栋"
          show-overflow-tooltip
          :min-width="80"
          align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.buildingName }}</span>
          </template>
        </el-table-column>
        <!-- <el-table-column prop="floor"
            label="楼层"
            :min-width="80"
            align="center"
            class-name="columSimple">
            <template slot-scope="scope">
              <span>{{ scope.row.floor }}层</span>
            </template>
          </el-table-column> -->
        <el-table-column prop="number"
          label="房号"
          :min-width="80"
          align="center">
          <template slot-scope="scope">
            <span class="room-number">{{ scope.row.number }}</span>
            <i v-if="scope.row.pictureID"
              class="el-icon-picture c-green"></i>
          </template>
        </el-table-column>
        <el-table-column label="户型"
          :min-width="100"
          align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.bedRoom }}房</span>
            <span>{{ scope.row.livingRoom }}厅</span>
          </template>
        </el-table-column>
        <el-table-column label="面积"
          :min-width="60"
          align="center"
          class-name="columSimple">
          <template slot-scope="scope">
            {{scope.row.area}}
          </template>
        </el-table-column>
        <el-table-column label="装修"
          :min-width="80"
          align="center"
          class-name="columSimple">
          <template slot-scope="scope">
            {{scope.row.decorationDesc}}
          </template>
        </el-table-column>

        <el-table-column label="租金"
          :min-width="60"
          align="center"
          class-name="columSimple">
          <template slot-scope="scope">
            {{scope.row.rentMoney}}
          </template>
        </el-table-column>

        <slot v-if="activeIndex ==='COMMIT_ROOM'">
          <el-table-column label="提交时间"
            prop="auditTimeDesc"
            sortable="custom"
            :min-width="100"
            align="center"
            class-name="columSimple">
            <template slot-scope="scope">
              <span>{{scope.row.auditTimeDesc}}</span>
            </template>
          </el-table-column>
        </slot>

        <slot v-if="activeIndex ==='COMMIT_ROOM'">
          <el-table-column prop="leaseCreateTimeDesc"
            sortable="custom"
            label="租期"
            :min-width="180"
            align="center"
            class-name="columSimple">
            <template slot-scope="scope">
              <span>{{scope.row.leaseCreateTimeDesc}} 到 {{scope.row.leaseFinalTimeDesc}}</span>
            </template>
          </el-table-column>
        </slot>
        <slot v-if="activeIndex ==='INTENTION_ROOM'">
          <el-table-column prop="createTimeDesc"
            sortable="custom"
            label="录入时间"
            :min-width="100"
            align="center"
            class-name="columSimple">
            <!--
              todo:
              1. 只对当前签约定义 template 情况，前后切换会报错
            -->
            <template slot-scope="scope">
              <span>{{scope.row.createTimeDesc}}</span>
            </template>
          </el-table-column>
        </slot>

        <slot v-if="activeIndex ==='INFORMATION_ROOM'">
          <el-table-column sortable="custom"
            prop="toInformationTimeDesc"
            label="转资料日期"
            :min-width="100"
            align="center"
            class-name="columSimple">
            <template slot-scope="scope">
              <span>{{scope.row.toInformationTimeDesc}}</span>
            </template>
          </el-table-column>
        </slot>

        <el-table-column v-if="activeIndex !=='COMMIT_ROOM'"
          prop="followTimeDesc"
          sortable="custom"
          label="最后跟进"
          :min-width="100"
          align="center"
          class-name="columSimple">
          <template slot-scope="scope">
            <span>{{scope.row.followTimeDesc}}</span>
          </template>
        </el-table-column>
        <slot v-if="activeIndex !=='INFORMATION_ROOM'">
          <el-table-column prop="bdName"
            sortable="custom"
            label="管家"
            :min-width="80"
            align="center"
            class-name="columSimple">
            <template slot-scope="scope">
              {{scope.row.bdName}}
            </template>
          </el-table-column>
        </slot>
        <slot v-if="activeIndex ==='COMMIT_ROOM'">
          <el-table-column prop="stateDesc"
            label="房源状态"
            :min-width="90"
            align="center">
            <template slot-scope="scope">
              <span class="state-green">{{ scope.row.stateDesc }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="stateDesc"
            label="合同状态"
            :min-width="90"
            align="center">
            <template slot-scope="scope">
              <span class="state-green">{{ scope.row.contractStateDesc }}</span>
            </template>
          </el-table-column>
        </slot>

        <el-table-column label="操作"
          fixed="right"
          :min-width="150"
          align="center">
          <template slot-scope="scope">
            <div class="handle-nowrap">
              <!-- 资料盘的操作 -->
              <slot v-if="activeIndex === 'INFORMATION_ROOM'">
                <el-button type="text"
                  v-if="checkPermission('ROOM_TO_INTENTION')"
                  size="small"
                  @click.stop="handleChangState(scope.row, 'intentionRoom')">转意向
                </el-button>
              </slot>
              <!-- 意向盘 -->
              <slot v-else-if="activeIndex === 'INTENTION_ROOM'">
                <el-button type="text"
                  size="small"
                  v-if="checkPermission('ROOM_MANAGE_EDIT')"
                  @click.stop="handleEdit(scope.$index, scope.row)">提交收房
                </el-button>
                <el-button type="text"
                  size="small"
                  v-if="checkPermission('ROOM_MANAGE_EDIT') && (scope.row.state !== 'SIGNED')"
                  @click.stop="handleEdit(scope.$index, scope.row)">编辑
                </el-button>
                <el-button type="text"
                  v-if="checkPermission('ROOM_TO_INFORMATION')"
                  size="small"
                  @click.stop="handleChangState(scope.row, 'informationRoom')">转资料盘
                </el-button>
              </slot>
              <!-- 已收房源 -->
              <slot v-else-if="activeIndex === 'COMMIT_ROOM'">
                <el-button type="text"
                  size="small"
                  v-if="checkPermission('ROOM_MANAGE_EDIT') && (scope.row.state !== 'SIGNED')"
                  @click.stop="handleEdit(scope.$index, scope.row)">编辑
                </el-button>
                <el-button type="text"
                  size="small"
                  v-if="checkPermission('ROOM_MANAGE_T_EDIT') && (scope.row.state === 'SIGNED')"
                  @click.stop="handleTrevise(scope.$index, scope.row)">特改
                </el-button>
                <el-button type="text"
                  size="small"
                  v-if="checkPermission('ROOM_MANAGE_CANCEL') && (scope.row.state !== 'SIGNED')"
                  @click.stop="handleCancelHouse(scope.row)">取消
                </el-button>

                <el-button type="text"
                  size="small"
                  v-if="(checkPermission('ROOM_AUDIT') && scope.row.state === 'WAIT_AUDIT')"
                  @click.stop="handleAudit(scope.row, 'firstReview')">
                  <span>初审</span>
                </el-button>

                <el-button type="text"
                  size="small"
                  v-if="checkPermission('ROOM_REAUDIT') && (scope.row.state === 'WAIT_SECOND_AUDIT')"
                  @click.stop="handleAudit(scope.row, 'review')">
                  <span>复审</span>
                </el-button>

                <el-button type="text"
                  size="small"
                  v-if="checkPermission('CONTRACT_AUDIT') && scope.row.state === 'WAIT_CONTRACT_AUDIT'"
                  @click.stop="handleContractAudit(scope.$index, scope.row)">合同审核
                </el-button>

                <el-button type="text"
                  size="small"
                  v-if="checkPermission('CONTRACT_EDIT') && scope.row.state === 'WAIT_ADD_CONTRACT' "
                  @click.stop="handleAddContract(scope.$index, scope.row)">签约
                </el-button>
              </slot>
            </div>
          </template>
        </el-table-column>
    </el-table>
    <div class="house-pagination">
      <el-pagination class="page"
        @size-change="handleSizeChange"
        @current-change="handlePageChange"
        :current-page.sync="currentPage"
        :page-sizes="[20, 30, 50]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :page-count="pageCount"
        :total="recordCount">
      </el-pagination>
    </div>

    <!-- 弹框 -->
    <el-dialog :title="detailTitle"
      :visible.sync='detailsDialog'
      :close-on-click-modal="false"
      width="950px">
      <house-details :roomId="roomId"
        :city="city"
        :gardenId="gardenId"
        :gardenNameProps="gardenName"
        :auditState="auditState"
        v-if="detailsDialog"
        :readOnly="readOnly"
        :activeIndex="activeIndex"
        v-on:refreshData="requestData"
        v-on:changeDialog='getChange'>
      </house-details>
    </el-dialog>

    <!-- 弹框 -->
    <el-dialog :title="houseTitle"
      :visible.sync="dialogVisible"
      :close-on-click-modal="false"
      width="950px">
      <add-house :DialogType="DialogType"
        :roomId="roomId"
        v-if="dialogVisible && DialogType !== 'Contract'"
        v-on:changeDialog='getChange'
        v-on:refreshData="requestData">
      </add-house>
    </el-dialog>

    <add-contract v-if="contractVisible && DialogType === 'Contract'"
      :dialogVisible="contractVisible"
      :roomId="roomId"
      :DialogType="DialogType"
      v-on:changeDialog="getChange"
      v-on:refreshData="requestData">
    </add-contract>

    <el-dialog title="合同详情"
      :visible.sync='contractDialogVisible'
      :close-on-click-modal="false"
      width="950px">
      <contarct-detail :roomId="roomId"
        :contractId="contractId"
        v-if="contractDialogVisible"
        :readOnly="readOnly"
        v-on:refreshData="requestData">
      </contarct-detail>
    </el-dialog>
  </div>
</template>
<script>
import AddHouse from './Addhouse';
import HouseDetails from './HouseDetails';
import AddContract from '@/pages/OrdersManage/components/OwnerContract/AddContarct';
import ContarctDetail from '@/pages/OrdersManage/components/OwnerContract/ContarctDetail';
import { handlePages } from '@/components/common/mixin';
import { mapState } from 'vuex';

/*
    EDITING("编辑中"),
    WAIT_AUDIT("待初审"),
    FIRST_AUDIT_FAIL("初审未通过"),
    WAIT_SECOND_AUDIT("待复审"),
    SECOND_AUDIT_FAIL("复审未通过"),
    WAIT_ADD_CONTRACT("待添加合同"),
    WAIT_CONTRACT_AUDIT("合同待审核"),
    CONTRACT_AUDIT_FAIL("合同审核不通过"),
    SIGNED("已签约"),
*/

export default {
  name: 'HouseTable',
  mixins: [handlePages],
  data() {
    return {
      houseTitle: '',
      loading: false,
      roomId: '',
      city: '',
      gardenId: '',
      gardenName: '',
      contractId: '',
      auditState: '',
      readOnly: '',
      DialogType: '', // 弹框类型
      detailTitle: '',
      currentPage: 1, // 分页当前第几页
      total: 0, // 数据总数
      pageSize: 20, // 每页的数据量
      pageCount: null, /// 总页数
      dialogVisible: false, // 弹框
      detailsDialog: false, // 房源详情
      contractVisible: false, // 添加合同
      contractDialogVisible: false, // 合同审核
      filtrateVisible: false, // 搜索
      baseData: {},
      data: [],
      // filtrateForm: {
      //   gardenName: null,
      //   buildingName: null,
      //   number: null,
      //   roomType: null,
      //   bedRoom: null,
      //   rentUseType: null,
      //   bdName: null,
      //   decoration: null,
      //   process: 'COMMIT_ROOM'
      // },

      restaurants: [],
      options: [],
      optionsBuild: [],
      optionsRoomNum: []
    };
  },

  props: {
    activeIndex: {
      type: String,
      default: 'COMMIT_ROOM'
    },
    filtrateForm: {
      type: Object,
      default: {
        gardenName: null,
        buildingName: null,
        number: null,
        roomType: null,
        bedRoom: null,
        rentUseType: null,
        bdName: null,
        decoration: null,
        roomState: null,
        keyWord: '',
        process: 'COMMIT_ROOM'
      }
    }
  },

  mounted() {
    this.sortType = 'DESC'; // DESC和ASC
    this.orderByCreateTime = this.activeIndex === 'INTENTION_ROOM' || false; // 录入时间
    this.orderByBdName = false; // bd姓名
    this.orderByFollowTime = false; // 跟进时间
    this.orderByCommitTime = this.activeIndex === 'COMMIT_ROOM' || false; // 提交时间
    this.orderByLeaseCreateTime = false;
    this.orderByToInformationTime = this.activeIndex === 'INFORMATION_ROOM' || false;
    this.firstRequest = true;
    this.requestData();
  },
  activated() {
    if (this.refreshHouseTable.indexOf(this.activeIndex) !== -1) {
      // 如果初次进来，条件满足不需请求
      if (this.firstRequest) {
        return;
      }
      this.requestData(true);
    }
    this.firstRequest = false;
  },
  methods: {
    // 获取列表数据
    requestData(refresh) {
      let requestParams = this.getParams();
      this.loading = true;
      this.$axios.post(
        '/security/room/manage/queryRoomCondition',
        requestParams
      ).then((res) => {
        this.loading = false;
        if (res.data.status === 'C0000') {
          this.pageCount = res.data.result.pageCount;
          this.recordCount = res.data.result.recordCount;
          this.data = res.data.result.items;
          // 已经刷新了，下次 “activeated” 生命周期 调用时不要在次请求
          if (refresh || this.refreshHouseTable.indexOf(this.activeIndex) !== -1) {
            this.$store.commit('handleRefreshHouseTable', this.refreshHouseTable.replace(this.activeIndex, ''));
          }
        } else {
          this.data = [];
          this.$message.error(res.data.message);
        }
      }).catch((err) => {
        this.loading = false;
        this.data = [];
        console.log(err);
        this.$message.error(err.message || '服务器异常');
      });
    },

    getParams() {
      return {
        gardenName: this.filtrateForm.gardenName,
        buildingName: this.filtrateForm.buildingName || null,
        number: this.filtrateForm.number || null,
        roomType: this.filtrateForm.roomType || null,
        bedRoom: this.filtrateForm.bedRoom,
        rentUseType: this.filtrateForm.rentUseType || null,
        bdName: this.filtrateForm.bdName,
        decoration: this.filtrateForm.decoration || null,
        keyWord: this.filtrateForm.keyWord,
        roomState: this.filtrateForm.roomState || null,

        process: this.activeIndex,
        currentPage: this.currentPage,
        pageSize: this.pageSize,
        sortType: this.sortType, // DESC和ASC
        orderByCreateTime: this.orderByCreateTime, // 录入时间
        orderByBdName: this.orderByBdName, // bd姓名
        orderByFollowTime: this.orderByFollowTime, // 跟进时间
        orderByCommitTime: this.orderByCommitTime,
        orderByLeaseCreateTime: this.orderByLeaseCreateTime,
        orderByToInformationTime: this.orderByToInformationTime
      };
    },

    // 子组件传来的
    getChange(data) {
      if (this.DialogType === 'Contract') {
        this.contractVisible = data;
      } else {
        this.dialogVisible = data;
        this.detailsDialog = data;
      }
    },

    // 点击当前行
    handleRow(row, event, column) {
      this.readOnly = true;
      this.roomId = row.id;
      this.city = row.city;
      this.gardenId = row.gardenId;
      this.gardenName = row.gardenName;
      this.detailTitle = row.roomCode;
      this.detailsDialog = true;
    },

    // 编辑
    handleEdit(index, row) {
      this.roomId = row.id;
      this.DialogType = 'Editor';
      this.houseTitle = '编辑房源';
      this.dialogVisible = true;
    },

    // 特改
    handleTrevise(index, row) {
      this.roomId = row.id;
      this.DialogType = 'Revise';
      this.houseTitle = '特改房源';
      this.dialogVisible = true;
    },

    // 审核房源
    handleAudit(row, type) {
      this.roomId = row.id;
      this.readOnly = false;
      this.auditState = type;
      this.detailsDialog = true;
    },

    // 上传合同
    handleAddContract(index, row) {
      this.roomId = row.id;
      this.DialogType = 'Contract';
      this.contractVisible = true;
    },

    // 取消收房
    handleCancelHouse(row) {
      const h = this.$createElement;
      let myGardenName = row.gardenName.indexOf('，') !== -1 ? row.gardenName.split('，')[0] : row.gardenName.split(',')[0];
      this.$msgbox({
        message: h('div', null, [
          h('p', null, '确定要取消该房源：（' + myGardenName + '-' + row.buildingName + '-' + row.number + ') ?')
        ]),
        showCancelButton: true,
        cancelButtonText: '取消',
        confirmButtonText: '确定',
        beforeClose: (action, instance, done) => {
          if (action === 'confirm') {
            instance.confirmButtonLoading = true;
            instance.confirmButtonText = '执行中...';

            this.$axios.get(
              '/security/room/manage/cancelCommitRoom',
              {
                params: {
                  id: row.id
                }
              }
            ).then((res) => {
              instance.confirmButtonLoading = false;
              // instance.confirmButtonText = '确定';
              if (res.data.status === 'C0000') {
                if (res.data.result) {
                  this.$message.success('操作成功');
                  this.requestData();
                  // 刷新“意向房源”
                  this.$store.commit('handleRefreshHouseTable', 'INTENTION_ROOM');
                } else {
                  this.$message.error('操作失败');
                }
              }
              done();
            }).catch((e) => {
              instance.confirmButtonLoading = false;
              this.$message.error('操作失败!!!');
              done();
            });
          } else {
            instance.confirmButtonLoading = false;
            done();
          }
        }
      }).then(action => {
      }).catch((e) => {
        console.log(e);
      });
    },

    // 改变状态
    handleChangState(row, hendle) {
      let myTitle;
      let url;
      if (hendle === 'intentionRoom') {
        // intentionRoom 在资料类别转意向
        myTitle = '意向房源';
        url = '/security/room/manage/updateRoomCommitStateToIntention';
      } else {
        // informationRoom 在意向房源列表转资料
        myTitle = '资料盘';
        url = '/security/room/manage/updateRoomCommitStateToInformation';
      }
      const h = this.$createElement;
      let myGardenName = row.gardenName.indexOf('，') !== -1 ? row.gardenName.split('，')[0] : row.gardenName.split(',')[0];
      this.$msgbox({
        message: h('div', null, [
          h('p', null, '确定要把：“' + myGardenName + '-' + row.buildingName + '-' + row.number + '” 转为' + myTitle + ' ?')
        ]),
        showCancelButton: true,
        cancelButtonText: '取消',
        confirmButtonText: '确定',
        beforeClose: (action, instance, done) => {
          if (action === 'confirm') {
            instance.confirmButtonLoading = true;
            instance.confirmButtonText = '执行中...';

            this.$axios.get(
              url,
              {
                params: {
                  id: row.id
                }
              }
            ).then((res) => {
              instance.confirmButtonLoading = false;
              // instance.confirmButtonText = '确定';
              if (res.data.status === 'C0000') {
                if (res.data.result) {
                  this.$message.success('操作成功');
                  this.requestData();
                  if (hendle === 'intentionRoom') {
                    this.$store.commit('handleRefreshHouseTable', 'INTENTION_ROOM');
                  } else {
                    this.$store.commit('handleRefreshHouseTable', 'INFORMATION_ROOM');
                  }
                }
              } else {
                this.$message.error(res.data.message);
              }
              done();
            }).catch((err) => {
              instance.confirmButtonLoading = false;
              this.$message.error(err.message || '服务异常');
              done();
            });
          } else {
            instance.confirmButtonLoading = false;
            done();
          }
        }
      }).then(action => {
      }).catch((e) => {
        console.log(e);
      });
    },

    // 审核合同
    handleContractAudit(index, row) {
      this.contractId = row.contractId;
      this.roomId = row.id;
      this.readOnly = false;
      this.contractDialogVisible = true;
    },

    // 点击表头筛选
    handleSort(column) {
      if (column.order === 'descending') {
        // 降序
        this.sortType = 'DESC';
      } else {
        // 升序
        this.sortType = 'ASC';
      }

      this.orderByCreateTime = false;
      this.orderByBdName = false;
      this.orderByFollowTime = false;
      this.orderByCommitTime = false;
      this.orderByLeaseCreateTime = false;
      this.orderByToInformationTime = false;

      switch (column.prop) {
        case 'createTimeDesc':
          this.orderByCreateTime = true;
          break;
        case 'followTimeDesc':
          this.orderByFollowTime = true;
          break;
        case 'bdName':
          this.orderByBdName = true;
          break;
        case 'auditTimeDesc':
          this.orderByCommitTime = true;
          break;
        case 'leaseCreateTimeDesc':
          this.orderByLeaseCreateTime = true;
          break;
        case 'toInformationTimeDesc':
          this.orderByToInformationTime = true;
          break;
        default:
          break;
        // this.orderByCreateTime = false;
        // this.orderByBdName = false;
        // this.orderByFollowTime = false;
        // this.orderByCommitTime = false;
        // this.orderByLeaseCreateTime = false;
      }
      this.requestData();
    }
  },

  components: {
    AddHouse,
    HouseDetails,
    AddContract,
    ContarctDetail
  },
  computed: {
    ...mapState(['refreshHouseTable'])
  }

};
</script>

<style scoped>
.el-menu-demo {
  padding: 0 170px 0 20px;
}

.default-color {
  background-color: #333;
}
/* 类型 */
.type-item {
  padding: 0 2px;
  border-width: 1px;
  border-style: solid;
  border-radius: 3px;
}
.green {
  border-color: #008842;
  color: #008842;
}
.red {
  border-color: #c55454;
  color: #c55454;
}
.state-green {
  color: #008842;
}
.state-black {
  color: #000;
}
.room-number {
  font-size: 14px;
  font-weight: 600;
  color: #008842;
}
.handle-nowrap {
  white-space: nowrap;
}
.handle-nowrap >>> .el-button + .el-button {
  margin-left: 3px;
}
</style>
