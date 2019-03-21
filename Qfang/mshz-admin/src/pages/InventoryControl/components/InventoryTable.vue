<template>
  <section class="house-box">
    <!-- 筛选 -->
    <header class="house-header">
      <div class="filter-form-box pdt-20">
        <el-form :inline="true"
          class="filter-form"
          size="mini">
          <!-- 公共条件 1 start -->
          <el-form-item>
            <el-select v-model="cityKey"
              @change="getQueryAreaOptions"
              placeholder="城市"
              size="mini">
              <el-option label="全部城市"
                :value="null">
              </el-option>
              <el-option v-for="(cityItem,index) in cityList"
                :key="index"
                :label="cityItem.key"
                :value="cityItem.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-cascader :options="queryAreaOptions"
              :disabled="!cityKey"
              placeholder="区域/片区"
              v-model="areaOption"
              change-on-select
              :props="orgProps"
              clearable>
            </el-cascader>
          </el-form-item>
          <!-- <el-form-item>
            <el-select v-model="areaKey"
              placeholder="区域"
              size="mini">
              <el-option label="全部区域"
                :value="null">
              </el-option>
              <el-option v-for="(areaItem, index) in queryAreaOptions"
                :key="index"
                :label="areaItem.name"
                :value="areaItem.id">
              </el-option>
            </el-select>
          </el-form-item> -->
          <!-- 公共条件 1 end -->
          <!-- 楼盘 全部库存、已下定 -->
          <!-- <slot v-if="tableType==='allType' || tableType==='bookingType'"> -->
          <!-- <el-form-item>
            <el-select v-model="gardenKey"
              :disabled="!cityKey"
              filterable
              placeholder="选择楼盘"
              clearable
              size="mini">
              <el-option label="全部楼盘"
                :value="null" />
              <el-option v-for="(item, index) in optionsGardenist"
                :key="index"
                :label="item.gardenName"
                :value="item.gardenName">
              </el-option>
            </el-select>
          </el-form-item> -->
          <!-- </slot> -->
          <!-- <slot v-else>
            <el-form-item>
              <el-select v-model="bookingStatus"
                placeholder="全部小区"
                size="mini">
                <el-option label="定金状态"
                  value=""></el-option>
                <el-option label="已支付"
                  value="PAID"></el-option>
                <el-option label="已扣除"
                  value="DEDUCTED"></el-option>
                <el-option label="已抵扣"
                  value="CREDITED"></el-option>
              </el-select>
            </el-form-item>
          </slot> -->
          <el-form-item>
            <el-select v-model="longLeaseKey"
              placeholder="全部产品类型"
              size="mini">
              <el-option label="全部类型"
                :value="null"></el-option>
              <el-option label="合租"
                value="SHARED_RENT"></el-option>
              <el-option label="整租"
                value="ENTIRE_RENT"></el-option>
            </el-select>
          </el-form-item>
          <slot v-if="tableType.indexOf('otRentType') > -1">
            <el-form-item>
              <el-select v-model="roomStatusKey"
                placeholder="上架状态"
                size="mini">
                <el-option label="全部上架状态"
                  :value="null"></el-option>
                <el-option label="已上架"
                  value="ENABLED"></el-option>
                <el-option label="未上架"
                  value="DISABLED"></el-option>
              </el-select>
            </el-form-item>
          </slot>
          <!-- 配置周期 首次配置中 二次配置中-->
          <slot v-if="tableType==='firstDeployType' || tableType==='deployType'">
            <el-form-item>
              <el-select v-model="deployCycleKey"
                placeholder="全部配置周期"
                size="mini">
                <el-option label="全部配置周期"
                  :value="null">
                </el-option>
                <el-option label="一周以内"
                  value="N-7">
                </el-option>
                <el-option label="7~15天"
                  value="7-15">
                </el-option>
                <el-option label="大于15天"
                  value="15-N">
                </el-option>
              </el-select>
            </el-form-item>
          </slot>

          <!-- 销售周期 首次待租 二次待租-->
          <slot v-if="tableType.indexOf('otRentType') > -1">
            <el-form-item>
              <el-select v-model="salesCycleKey"
                placeholder="全部销售周期"
                size="mini">
                <el-option label="全部销售周期"
                  :value="null">
                </el-option>
                <el-option label="一周以内"
                  value="N-7">
                </el-option>
                <el-option label="7~15天"
                  value="7-15">
                </el-option>
                <el-option label="大于15天"
                  value="15-N">
                </el-option>
              </el-select>
            </el-form-item>
          </slot>

          <!-- 账单状态 已租 -->
          <slot v-if="tableType === 'occupancyType'">
            <el-form-item>
              <!-- 1=已收租 2=未收租 3=已逾期 -->
              <el-select v-model="billStateKey"
                placeholder="账单状态"
                size="mini">
                <el-option label="全部账单状态"
                  :value="null">
                </el-option>
                <el-option label="待缴"
                  value="2"></el-option>
                <el-option label="已缴"
                  value="1">
                </el-option>
                <el-option label="逾期"
                  value="3">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-select v-model="contractState"
                @change="requestData"
                placeholder="全部合同状态"
                size="mini">
                <el-option label="全部合同状态"
                  :value="null"></el-option>
                <el-option label="即将到期"
                  value="1"></el-option>
                <el-option label="未生效"
                  value="2"></el-option>
                <el-option label="生效中"
                  value="3"></el-option>
                <el-option label="已到期"
                  value="4"></el-option>
              </el-select>
            </el-form-item>
          </slot>

          <el-form-item>
            <el-input class="search-key"
              @keyup.enter.native="handlePageChange(1)"
              placeholder="服务管家/租客姓名/手机号"
              v-model="searchKey"
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
    </header>
    <!-- 表格 -->
    <section class="house-list"
      v-loading="loading">
      <el-table :data="allInventoryData"
        border
        stripe
        header-align="center"
        ref="multipleTable"
        size="mini"
        height="100%"
        cell-class-name="default-color"
        @row-click="handleRow">

        <!-- 公共 start -->
        <el-table-column label="序号"
          type="index"
          width="50"
          align="center" />
        <el-table-column label="房间编号"
          min-width="150"
          align="center">
          <template slot-scope="scope">
            {{scope.row.roomCode}}
          </template>
        </el-table-column>
        <el-table-column label="城市"
          prop="cityDtoEnumDesc"
          min-width="60"
          align="center" />
        <el-table-column label="区域"
          prop="roomArea"
          min-width="80"
          align="center">
          <template slot-scope="scope">
            {{scope.row.roomArea}}
          </template>
        </el-table-column>
        <el-table-column label="楼盘"
          show-overflow-tooltip
          prop="gardenName"
          min-width="150"
          align="center">
          <template slot-scope="scope">
            {{handelCutGardenName(scope.row.gardenName)}}
          </template>
        </el-table-column>
        <el-table-column label="楼栋"
          show-overflow-tooltip
          prop="buildingName"
          min-width="120"
          align="center">
        </el-table-column>
        <el-table-column label="房号"
          prop="roomNumber"
          min-width="80"
          align="center" />
        <el-table-column label="房间号"
          prop="chamberNumber"
          min-width="60"
          align="center" />
        <el-table-column label="产品类型"
          prop="longLeaseType"
          min-width="80"
          align="center">
          <template slot-scope="scope">
            {{scope.row.longLeaseType === 'SHARED_RENT' ? '合租' : '整租'}}
          </template>
        </el-table-column>
        <!-- 公共 end -->

        <!-- 房源状态 => 全部库存 -->
        <slot v-if="tableType === 'allType'">
          <el-table-column label="房源状态"
            prop="roomStockStateEnumDesc"
            min-width="100"
            align="center" />
        </slot>

        <!-- 公共 2 start -->
        <el-table-column label="户型"
          prop="houseType"
          min-width="120"
          align="center" />
        <el-table-column label="面积"
          prop="area"
          min-width="60"
          align="center" />
        <el-table-column label="朝向"
          prop="directionDesc"
          min-width="80"
          align="center" />
        <el-table-column label="功能区"
          prop="roomFeatureDesc"
          min-width="60"
          align="center" />
        <el-table-column label="出房价格"
          prop="price"
          min-width="120"
          align="center" />
        <!-- 公共 2 end -->

        <!-- 二次待租 start -->
        <slot v-if="tableType === 'notRentType' || tableType === 'deployType'">
          <el-table-column label="上份合同截止日"
            prop="lastContractEndDateDesc"
            min-width="120"
            align="center" />
        </slot>
        <slot v-if="tableType === 'notRentType'">
          <el-table-column label="上次配置完成日"
            prop="lastDeployDateDesc"
            min-width="120"
            align="center" />
        </slot>
        <!-- 二次待租 end -->

        <el-table-column label="销售周期"
          prop="salesCycle"
          min-width="80"
          align="center" />

        <!-- 已出租 start -->
        <slot v-if="tableType === 'occupancyType'">
          <el-table-column label="租约时长"
            prop="leaseSegment"
            min-width="150"
            align="center" />
          <el-table-column label="付款方式"
            prop="payMethodDesc"
            min-width="80"
            align="center" />
          <!-- <el-table-column label="参与活动"
            prop="promotionCode"
            min-width="80"
            align="center" /> -->
        </slot>
        <!-- 已出租 end -->

        <el-table-column label="服务管家"
          prop="serviceManager"
          min-width="100"
          align="center" />
        <slot v-if="tableType !== 'occupancyType'">
          <el-table-column :label="tableType === 'bookingType'?'下定管家':'综合管家'"
            :prop="tableType === 'bookingType'?'bookingManager':'compositeManager'"
            min-width="100"
            align="center" />
        </slot>

        <slot v-if="tableType === 'allType'">
          <el-table-column label="验收日"
            prop="acceptDateDesc"
            min-width="100"
            align="center" />
        </slot>

        <slot v-if="tableType === 'allType' || tableType.indexOf('first') > -1">
          <el-table-column label="收房起租日"
            prop="inRoomRentDateDesc"
            min-width="100"
            align="center" />
        </slot>
        <slot v-if="tableType === 'allType' || tableType === 'deployType' || tableType.indexOf('first') > -1">
          <el-table-column label="配置周期"
            prop="deployCycle"
            min-width="80"
            align="center" />
        </slot>

        <slot v-if="tableType === 'occupancyType' || tableType === 'allType'">
          <el-table-column label="出房合同编号"
            prop="outRoomContractNo"
            min-width="150"
            align="center" />
          <el-table-column label="出房管家"
            prop="outRoomManager"
            min-width="80"
            align="center" />
        </slot>
        <!-- 已出租 start -->
        <slot v-if="tableType === 'occupancyType'">
          <el-table-column label="租客"
            prop="tenantName"
            min-width="80"
            align="center" />
          <el-table-column label="本期账单状态"
            prop="rentBillState"
            min-width="100"
            align="center" />
          <el-table-column label="剩余租期"
            prop="remainderRentDate"
            min-width="80"
            align="center" />
        </slot>
        <!-- 已出租 end -->

        <!-- 已下定 start -->
        <slot v-if="tableType === 'bookingType'">
          <el-table-column label="下定日期"
            prop="bookDateDesc"
            min-width="100"
            align="center" />
          <el-table-column label="下定租客"
            prop="tenantName"
            min-width="100"
            align="center" />
          <!-- <el-table-column label="出房起租日"
            prop="outRoomRentDate"
            min-width="100"
            align="center" />
          <el-table-column label="预定时长"
            prop=""
            min-width="80"
            align="center" /> -->
        </slot>
        <!-- 已下定 end-->

        <slot v-if="tableType === 'firstDeployType' || tableType === 'allType'">
          <el-table-column label="收房合同编号"
            prop="inRoomContractNo"
            min-width="180"
            align="center" />
          <el-table-column label="收房管家"
            prop="inRoomManager"
            min-width="80"
            align="center" />
        </slot>

        <slot v-if="tableType !== 'allType' && tableType !== 'bookingType'">
          <el-table-column label="操作"
            fixed="right"
            :width="150"
            align="center">
            <template slot-scope="scope">
              <slot v-if="tableType.indexOf('otRentType') > -1">
                <el-button type="text"
                  v-if="scope.row.saleState === 'ENABLED' && checkPermission('LONG_SITUATION_DOWN')"
                  size="mini"
                  @click.stop="handleSoldOut(scope.$index, scope.row, 'down')">下架
                </el-button>
                <el-button type="text"
                  v-else-if="(scope.row.saleState === 'DISABLED' || scope.row.saleState === 'EDITING') && checkPermission('LONG_SITUATION_EDIT')"
                  size="mini"
                  @click.stop="handlePutaway(scope.$index, scope.row)">上架
                </el-button>
              </slot>
              <slot v-if="tableType.indexOf('eployType') > -1">
                <el-button type="text"
                  v-if="checkPermission('LONG_SITUATION_VALIDATE')"
                  size="mini"
                  @click.stop="handleReceive(scope.row)">验收
                </el-button>
              </slot>
              <slot v-if="tableType === 'occupancyType'">
                <el-button type="text"
                  v-if="checkPermission('RENT_BILL_MESSAGE') && scope.row.rentBillState !== '已缴'"
                  size="mini"
                  @click.stop="handleRental(scope.row)">催款
                </el-button>
                <el-button type="text"
                  v-if="checkPermission('LONG_REFUND_EDIT')"
                  size="mini"
                  @click.stop="handleCheckout(scope.row)">退租
                </el-button>
              </slot>
            </template>
          </el-table-column>
        </slot>

      </el-table>
      <!-- 分页 -->
      <div class="house-pagination">
        <el-pagination class="page"
          @size-change="handleSizeChange"
          @current-change="handlePageChange"
          :current-page.sync="currentPage"
          :page-sizes="[20, 30, 50]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="recordCount">
        </el-pagination>
      </div>
    </section>

    <el-dialog title="租客退租"
      :visible.sync='ckeckoutDialog'
      :close-on-click-modal="false"
      append-to-body
      width="950px">
      <long-rent-checkout v-on:closeDialog="closeDialogCheckout"
        @refreshData="requestData"
        :orderNo="orderNo"
        :closeBill="closeBill"
        :closeBillData="closeBillData"
        :source="'LRhouseStatus'"
        :propsLeaseType="'ENTIRE_RENT'"
        v-if="ckeckoutDialog">
      </long-rent-checkout>
    </el-dialog>

    <el-dialog title="发送账单"
      top="20vh"
      :visible.sync='rentalDialog'
      :close-on-click-modal="false"
      width="600px">
      <speed-rental v-if="rentalDialog"
        @closeDialog="closeDialog"
        :source="'houseStatus'"
        :messagesInfo="messagesInfo"
        :orderNo="orderNo">
      </speed-rental>
    </el-dialog>
  </section>
</template>

<script>
import { mapState } from 'vuex';
import longRentCheckout from '@/pages/HouseManage/components/LongRentState/LongRentCheckout'; // 退租
import speedRental from '@/pages/HouseManage/components/LongRentState/SpeedRental'; // 催租
import { handlePages, truncateGardenName } from '@/components/common/mixin';
export default {
  name: 'InventoryTable',
  mixins: [handlePages, truncateGardenName],
  components: {
    longRentCheckout,
    speedRental
  },
  computed: {
    ...mapState([
      'userInfo'
    ])
  },
  data() {
    return {
      loading: true,

      allInventoryData: [], // 库存数据
      cityList: [],
      queryAreaOptions: [], // 区域
      optionsGardenist: [], // 楼盘

      cityKey: null,
      areaKey: null,
      longLeaseKey: null,
      gardenKey: null,
      deployCycleKey: null,
      salesCycleKey: null,
      billStateKey: null,
      searchKey: null,
      bookingStatus: null,
      roomStatusKey: null,
      contractState: null,

      rentalDialog: false,
      ckeckoutDialog: false,

      messagesInfo: undefined,
      orderNo: undefined,
      closeBillData: {
        billModels: []
      },
      closeBill: false, // 关闭账单
      areaOption: [],
      orgProps: {
        value: 'name',
        label: 'name',
        children: 'children'
      }
    };
  },
  props: {
    tableType: {
      // 全部-allType ，首次配置-firstDeployType ，首次待租-firstNotRentType ，二次配置-deployType ，二次待租-notRentType ，已租-occupancyType ，已下定-bookingType
      type: String,
      default: 'allType'
    }
  },
  watch: {
    cityKey(val) {
      this.queryAreaOptions = [];
      this.optionsGardenist = [];
      this.areaOption = [];
      this.requestData();
      // this.getGardenList();
    },
    areaOption() {
      this.requestData();
    },
    gardenKey() {
      this.requestData();
    },
    billStateKey() {
      this.requestData();
    },
    roomStatusKey() {
      this.requestData();
    },
    deployCycleKey() {
      this.requestData();
    },
    longLeaseKey() {
      this.requestData();
    },
    salesCycleKey() {
      this.requestData();
    }
  },
  created() {
    switch (this.tableType) {
      case 'allType':
        this.requiredUrl = '/security/roomStatus/queryAllRoomInfoPage';
        break;
      case 'firstDeployType':
        this.requiredUrl = '/security/roomStatus/queryFirstDeployRoomPage';
        break;
      case 'firstNotRentType':
        this.requiredUrl = '/security/roomStatus/queryFirstNotRentPage';
        break;
      case 'deployType':
        this.requiredUrl = '/security/roomStatus/queryDeployRoomPage';
        break;
      case 'notRentType':
        this.requiredUrl = '/security/roomStatus/queryNotRentPage';
        break;
      case 'occupancyType':
        this.requiredUrl = '/security/roomStatus/queryRentRoomPage';
        break;
      case 'bookingType':
        this.requiredUrl = '/security/roomStatus/queryBookingRoomPage';
        break;
      default:
        this.requiredUrl = '/security/roomStatus/queryAllRoomInfoPage';
    }
    this.requestCityData();
    this.requestData();
  },
  methods: {
    requestData() {
      this.loading = true;
      this.$axios.get(this.requiredUrl, {
        params: this.getParams()
      }).then((res) => {
        this.loading = false;
        if (res.data.status === 'C0000') {
          this.pageCount = res.data.result.pageCount;
          this.recordCount = res.data.result.recordCount;
          this.allInventoryData = res.data.result.items;
        } else {
          this.allInventoryData = [];
          this.$message.error(res.data.message);
        }
      }).catch((err) => {
        this.loading = false;
        this.allInventoryData = [];
        this.$message.error(err.message || '服务器异常');
      });
    },
    getParams() {
      return {
        pageSize: this.pageSize,
        currentPage: this.currentPage,
        city: this.cityKey || undefined,
        area: this.areaOption[0] || undefined,
        geographyArea: this.areaOption[1] || undefined,
        longLease: this.longLeaseKey || undefined,
        garden: this.gardenKey || undefined,
        deployCycle: this.deployCycleKey || undefined, // 配置周期
        salesCycle: this.salesCycleKey || undefined, // 销售周期
        billState: this.billStateKey || null,
        roomStatus: this.roomStatusKey || null,
        contractState: this.contractState || null,
        keyword: this.searchKey || undefined
      };
    },

    // 城市
    requestCityData() {
      this.$axios.get('/security/room/longSituation/searchCity?term=2').then((res) => {
        if (res.data.status === 'C0000') {
          this.cityList = res.data.result;
        } else {
          this.cityList = [];
          this.$message.error('获取城市信息：' + res.data.message);
        }
      }).catch((err) => {
        this.cityList = [];
        this.$message.error(err.message || '获取城市信息：服务器异常');
      });
    },

    // 区
    getQueryAreaOptions() {
      if (!this.cityKey) return;
      this.$axios.get('/security/oms/duty/queryArea',
        { params: { city: this.cityKey } }
      ).then((res) => {
        if (res.data.status === 'C0000') {
          res.data.result && this.$set(this, 'queryAreaOptions', res.data.result);
        } else {
          this.queryAreaOptions = [];
          this.$message.error(res.data.message);
        }
      }).catch(err => {
        console.log(err);
      });
    },
    // 楼盘
    getGardenList() {
      if (!this.cityKey) return;
      this.$axios.get('/security/room/longSituation/searchGarden', {
        params: {
          city: this.cityKey
        }
      }).then((res) => {
        if (res.data.status === 'C0000' && res.data.result.length > 0) {
          this.optionsGardenist = res.data.result;
        } else {
          this.optionsGardenist = [];
        }
      }).catch((err) => {
        this.optionsGardenist = [];
        console.log(err);
      });
    },
    // 楼盘
    // remoteGardenList(query) {
    //   if (query) {
    //     return this.$axios.get('/security/room/longSituation/searchGarden', {
    //       params: {
    //         city: this.cityKey,
    //         searchName: query
    //       }
    //     }).then((res) => {
    //       if (res.data.status === 'C0000' && res.data.result.length > 0) {
    //         this.optionsGardenist = res.data.result;
    //       } else {
    //         this.optionsGardenist = [];
    //       }
    //     }).catch((err) => {
    //       this.optionsGardenist = [];
    //       console.log(err);
    //     });
    //   } else {
    //     this.optionsGardenist = [];
    //   }
    // },

    //  验收
    handleReceive(row) {
      let mes = '确定后，该房源将会变为首次待租状态，并且不可修改。';
      if (this.tableType === 'deployType') {
        mes = '确定后，该房源将会变为二次待租状态，并且不可修改。';
      }
      this.$confirm(mes, '确定完成验收？', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$axios.post('/security/room/longSituation/validate', {
          id: row.situationId
        }).then((res) => {
          if (res.data.status === 'C0000' && res.data.result) {
            this.$message.success('验收成功！');
            this.requestData();
          } else {
            this.$message.error(res.data.message);
          }
        }).catch((err) => {
          console.log(err);
          this.$message.error('验收异常！');
        });
      }).catch(() => {
        // this.$message({
        //   type: 'info',
        //   message: '已取消删除'
        // });
      });
    },

    // 催款
    handleRental(data) {
      this.orderNo = data.orderNo;
      this.$axios.get('/security/longOrder/billRentByOrder', {
        params: {
          orderNo: this.orderNo
        }
      }).then((res) => {
        if (res.data.status === 'C0000') {
          this.messagesInfo = res.data.result;
          this.rentalDialog = true;
        } else {
          this.$message.warning(res.data.message);
        }
      }).catch(err => {
        this.message.warning(err.message || '服务异常');
        console.log(err);
      });
    },

    // 退房
    handleCheckout(data) {
      // LONG_REFUND_BILL_CLOSE 关闭账单权限
      // 有未支付的生活账单或租金账单
      if (data.rentBillState !== '已缴') {
        // 是否有权限
        if (this.checkPermission('LONG_REFUND_BILL_CLOSE')) {
          this.handleCheckPurviewBill(data.orderNo, data.outRoomContractNo);
        } else {
          this.$message('该租客有未支付账单待关闭，您没有该操作权限哦~');
        }
      } else {
        this.closeBill = false;
        this.ckeckoutDialog = true;
        this.orderNo = data.orderNo;
      }
    },

    // 待关闭账单信息-通过订单号
    handleCheckPurviewBill(orderNo, contractNo) {
      this.$axios.get('/security/refundlease/queryAndCheckPurviewBill', {
        params: {
          orderNo: orderNo,
          contractNo: contractNo
        }
      }).then((res) => {
        if (res.data.status === 'C0000') {
          this.closeBillData = res.data.result;
          this.closeBill = true;
          this.ckeckoutDialog = true;
          this.orderNo = orderNo;
        } else {
          this.$message.error(`查询未支付账单:${res.data.message}`);
        }
      }).catch(err => {
        console.log(err);
      });
    },

    // 打开详情
    handleRow(row, event, column) {
      // this.currentBookingNo = row.bookingNo;
      // this.BookingDialogVisible = true;
      this.$router.push({ name: `InventoryHouseDetail`, params: { situationId: row.situationId, id: row.roomLong } });
    },

    // 上架
    handlePutaway(index, row) {
      this.$router.push({ name: `InventoryHouseEdit`, params: { situationId: row.situationId, id: row.roomLong } });
    },

    // 下架
    handleSoldOut(index, row, type) {
      this.$confirm('该房源已发布到租房邦客户端，确定后将不会显示到租房邦客户端.', '确定下架？', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$axios.post('/security/room/longSituation/down', {
          id: row.situationId
        }).then((res) => {
          if (res.data.status === 'C0000' && res.data.result) {
            this.$message.success('下架成功！');
            this.requestData();
          } else {
            this.$message.error(res.data.message);
          }
        }).catch((err) => {
          console.log(err);
          this.$message.error('下架异常！');
        });
      }).catch(() => {
        // this.$message({
        //   type: 'info',
        //   message: '已取消删除'
        // });
      });
    },

    closeDialog(data) {
      this.rentalDialog = false;
      // switch (data) {
      //   case 'LongRentBill':
      //     this.rentBillDialog = false;
      //     break;
      //   case 'MeterReading':
      //     this.meterDialog = false;
      //     break;
      //   case 'speedrental':
      //     break;
      //   case 'ReserveHouse':
      //     this.reserveDialog = false;
      //     break;
      //   default:
      //     break;
      // }
    },

    closeDialogCheckout(data) {
      this.ckeckoutDialog = false;
      (data === 'refresh') && this.requestData();
    }

  }
};
</script>


<style scoped>
.search-box-top {
  line-height: 50px;
}
.search-key {
  width: 200px;
}
.el-menu-demo {
  padding: 0 170px 0 20px;
}

.default-color {
  background-color: #333;
}
/* 类型 */
.type-item {
  border-width: 1px;
  border-style: solid;
  border-color: #008842;
  border-radius: 3px;
  color: #008842;
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
</style>
