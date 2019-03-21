<template>
  <section class="house-box">
    <header class="house-header">
      <div class="filter-form-box">
        <el-form :inline="true" class="mart-10"
          size="small">
          <el-form-item>
            <el-popover ref="houseTypePopover"
              @show="myhouseType=houseType"
              placement="bottom-start"
              width="174"
              v-model="houseTypePopoverVisible">
              <div class="pd-ten">
                <el-checkbox-group v-model="myhouseType"
                  @change="changehouseType"
                  size="medium">
                  <p class="font-l pdh-20 font-14 line-h-30">
                    <el-checkbox label="SINGLE">单身公寓</el-checkbox>
                  </p>
                  <p class="font-l pdh-20 font-14 line-h-30">
                    <el-checkbox label="ONE_ROOM">一房</el-checkbox>
                  </p>
                  <p class="font-l pdh-20 font-14 line-h-30">
                    <el-checkbox label="TWO_ROOM">二房</el-checkbox>
                  </p>
                  <p class="font-l pdh-20 font-14 line-h-30">
                    <el-checkbox label="THREE_ROOM">三房</el-checkbox>
                  </p>
                  <p class="font-l pdh-20 font-14 line-h-30">
                    <el-checkbox label="FOUR_ROOM">四房</el-checkbox>
                  </p>
                  <p class="font-l pdh-20 font-14 line-h-30">
                    <el-checkbox label="FIVE_OR_MORE">五室及以上</el-checkbox>
                  </p>
                </el-checkbox-group>
                <div class="pdt-10"
                  style="text-align: center">
                  <el-button type="primary"
                    @click="selectHouseType"
                    size="mini">确定</el-button>
                  <el-button @click="clearHouseType"
                    size="mini">清空</el-button>
                </div>
              </div>
            </el-popover>
            <div class="house-type">
              <span :class="{'house-type-box': true, 'c-9': showHouseType === '户型', 'c-3': showHouseType !== '户型'}"
                v-popover:houseTypePopover
                placeholder="请选择户型"
                v-text="showHouseType"></span>
              <!-- <el-select v-model="houseType"
                multiple
                placeholder="户型"
                @change="handleHouseTypeChange">
                <el-option label="单身公寓"
                  value="SINGLE">
                </el-option>
                <el-option label="一房"
                  value="ONE_ROOM">
                </el-option>
                <el-option label="二房"
                  value="TWO_ROOM">
                </el-option>
                <el-option label="三房"
                  value="THREE_ROOM">
                </el-option>
                <el-option label="四房"
                  value="FOUR_ROOM">
                </el-option>
                <el-option label="五室及以上"
                  value="FIVE_OR_MORE">
                </el-option>
              </el-select> -->
            </div>
          </el-form-item>
          <el-popover @show="showSopced('area')"
            @hide="cancelChangeEare"
            ref="eareaPopover"
            placement="bottom-start"
            width="200"
            v-model="areaPopoverVisible">
            <el-form size="mini"
              ref="areaRef"
              :model="scopeData"
              :rules="scopeDataRules">
              <el-row class="pd-ten l-height-30">
                <el-col :span="10">
                  <el-form-item prop="areaStart">
                    <el-input placeholder="最小"
                      v-model="scopeData.areaStart"
                      :maxlength="5"
                      size="mini" />
                  </el-form-item>
                </el-col>
                <el-col :span="4"
                  class="font-c">
                  至
                </el-col>
                <el-col :span="10">
                  <el-form-item prop="areaEnd">
                    <el-input placeholder="最大"
                      :maxlength="5"
                      v-model="scopeData.areaEnd"
                      size="mini" />
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
            <div class="pd-ten font-r">
              <el-button type="primary"
                size="mini"
                @click="confirmChangeEare">确定</el-button>
              <el-button size="mini"
                @click="cancelChangeEare('clear')">清空</el-button>
            </div>
          </el-popover>
          <el-form-item>
            <el-input class="search-key"
              placeholder="面积"
              readonly
              v-popover:eareaPopover
              v-model="showEarea"
              size="mini" />
          </el-form-item>
          <el-popover @show="showSopced('price')"
            @hide="cancelChangeEare"
            ref="pricePopover"
            placement="bottom-start"
            width="200"
            v-model="pricePopoverVisible">
            <el-form ref="priceRef"
              size="mini"
              :model="scopeData"
              :rules="scopeDataRules">
              <el-row class="pd-ten l-height-30">
                <el-col :span="10">
                  <el-form-item prop="priceStart">
                    <el-input placeholder="最低"
                      v-model="scopeData.priceStart"
                      :maxlength="5"
                      size="mini" />
                  </el-form-item>
                </el-col>
                <el-col :span="4"
                  class="font-c">
                  至
                </el-col>
                <el-col :span="10">
                  <el-form-item prop="priceEnd">
                    <el-input placeholder="最高"
                      :maxlength="5"
                      v-model="scopeData.priceEnd"
                      size="mini" />
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
            <div class="pd-ten font-r">
              <el-button type="primary"
                size="mini"
                @click="confirmChangePrice">确定</el-button>
              <el-button size="mini"
                @click="cancelChangePrice('clear')">清空</el-button>
            </div>
          </el-popover>
          <el-form-item>
            <el-input class="search-key"
              placeholder="价格"
              readonly
              v-model="showPrice"
              v-popover:pricePopover
              size="mini" />
          </el-form-item>
          <el-form-item>
            <el-input class="search-key"
              placeholder="输入客户姓名/手机号搜索"
              v-model="phoneOrName"
              clearable
              size="mini" />
          </el-form-item>
          <el-form-item>
            <el-button type="success"
              size="mini"
              @click="handlePageChange(1)">搜索</el-button>
          </el-form-item>
        </el-form>
        <div class="mgr-20">
          <el-button v-if="checkPermission('CUSTOMER_EDIT') && !userInfo.manager"
            type="success"
            size="mini"
            @click="addCutDialogVisible = true">新增客户
          </el-button>
        </div>
      </div>
    </header>
    <section class="house-list"
      v-loading="loading">
      <el-table :data="refundLeaseList"
        border
        stripe
        tooltip-effect="dark"
        header-align="center"
        ref="multipleTable"
        size="small"
        height="100%"
        cell-class-name="default-color"
        @row-click="handleRow">
        <el-table-column prop="id"
          label="客户编号"
          min-width="110"
          align="center" />
        <el-table-column prop="name"
          label="姓名"
          min-width="100"
          align="center">
        </el-table-column>
        <el-table-column prop="custRequire"
          show-overflow-tooltip
          label="客户要求"
          min-width="140"
          align="center" />
        <el-table-column label="带看情况"
          prop="viewSituation"
          min-width="120"
          align="center">
        </el-table-column>
        <el-table-column label="管家"
          prop="managerName"
          min-width="60"
          align="center">
        </el-table-column>
        <el-table-column prop="recordTime"
          label="录客时间"
          min-width="80"
          align="center">
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
          :total="recordCount">
        </el-pagination>
      </div>
    </section>

    <el-dialog v-if="addCutDialogVisible"
      title="新增客户"
      :visible.sync="addCutDialogVisible"
      :close-on-click-modal="false"
      width="950px">
      <add-customer :addCutDialogVisible.sync="addCutDialogVisible"
        :cutDialogType="'add'"
        @refreshData="requestData" />
    </el-dialog>

    <!-- 详情页弹窗 -->

    <el-dialog v-if="custDetailDialogVisible"
      :title="custId"
      :visible.sync="custDetailDialogVisible"
      :close-on-click-modal="false"
      width="950px">
      <customer-detail ref="custDetail"
        :custId="custId" />
    </el-dialog>

  </section>
</template>

<script>
import { mapState } from 'vuex';
import AddCustomer from './Customer/AddCustomer';
import CustomerDetail from './Customer/CustomerDetail';
import { handlePages } from '@/components/common/mixin';
export default {
  name: 'LongRentCustomerManage',
  mixins: [handlePages],
  components: {
    AddCustomer,
    CustomerDetail
  },
  computed: {
    ...mapState([
      'userInfo'
    ])
  },
  data() {
    let areadEndRules = (rule, value, callback) => {
      if (+value > 0) {
        if (!(/^[0-9]\d*$/).test(value)) {
          callback(new Error('请输入正整数'));
        } else if (!(/^[0-9]{1,5}$/).test(value)) {
          callback(new Error('输入数字长度在 1 到 5 位'));
        } else if (+this.scopeData.areaStart > value) {
          callback(new Error('最大面积必须大于或者等于最小面积'));
        }
      }
      callback();
    };
    let priceEndRules = (rule, value, callback) => {
      if (+value > 0) {
        if (!(/^[0-9]\d*$/).test(value)) {
          callback(new Error('请输入正整数'));
        } else if (!(/^[0-9]{1,5}$/).test(value)) {
          callback(new Error('输入数字长度在 1 到 5 位'));
        } else if (+this.scopeData.priceStart > value) {
          callback(new Error('最高价格必须大于或者等于最低价格'));
        }
      }
      callback();
    };
    return {
      areadEndRules,
      priceEndRules,

      custId: '',
      addCutDialogVisible: false,
      custDetailDialogVisible: false,
      loading: true,

      refundLeaseList: [], // 账单列表
      refundLeaseInfo: {},
      houseType: [], // 数组
      myhouseType: [],
      areaStart: '', // 起始面积区间
      areaEnd: '', // 截止面积区间
      priceStart: '', // 价格
      priceEnd: '', // 价格
      showEarea: '',
      showPrice: '',

      showHouseType: '户型',
      scopeData: {
        areaStart: '', // 起始面积区间
        areaEnd: '', // 截止面积区间
        priceStart: '', // 价格
        priceEnd: '' // 价格
      },
      scopeDataRules: {
        areaStart: [{ pattern: /(^[0-9]{1,5}$)/, message: '请输入数字' }], // 起始面积区间
        areaEnd: [{ validator: areadEndRules, trigger: 'change' }], // 截止面积区间
        priceStart: [{ pattern: /(^[0-9]{1,5}$)/, message: '请输入数字' }], // 价格
        priceEnd: [{ validator: priceEndRules, trigger: 'change' }] // 价格
      },

      phoneOrName: null, // 姓名或手机号
      refundLeaseNo: null,
      refundLeaseDate: [],

      currentRefundLeaseNo: '',
      refundLeaseDialogVisible: false,

      areaPopoverVisible: false, // 区域的popover
      pricePopoverVisible: false, // 价格的popover
      houseTypePopoverVisible: false
    };
  },
  mounted() {
    this.requestData();
  },
  methods: {
    requestData() {
      this.loading = true;
      this.$axios
        .get('/security/customer/queryCustomerPage', {
          params: this.getParams()
        })
        .then(res => {
          this.loading = false;
          if (res.data.status === 'C0000') {
            let { result } = res.data;
            this.currentPage = result.currentPage;
            this.pageCount = result.pageCount;
            this.recordCount = result.recordCount;
            this.refundLeaseList = result.items;
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
      return {
        pageSize: this.pageSize,
        currentPage: this.currentPage,
        houseTypeList: this.houseType.join(',') || undefined,
        phoneOrName: this.phoneOrName || undefined,
        areaStart: this.scopeData.areaStart || undefined, // 起始面积区间
        areaEnd: this.scopeData.areaEnd || undefined, // 截止面积区间
        priceStart: this.scopeData.priceStart || undefined, // 价格
        priceEnd: this.scopeData.priceEnd || undefined // 价格
      };
    },

    handleHouseTypeChange(key, keyPath) {
      this.houseType = key;
      this.handlePageChange(1);
    },

    // 打开账单详情
    handleRow(row, event, column) {
      // this.currentRefundLeaseNo = row.refundLeaseNo;
      this.custId = row.id;
      this.custDetailDialogVisible = true;
    },

    toggleBillingDialog(reload) {
      this.refundLeaseDialogVisible = false;

      // 是否需要重载列表
      reload && this.requestData();
    },
    closeDetail() {
      this.orderDialogVisible = false;
    },
    showSopced(type) {
      if (type === 'area') {
        this.scopeData.areaStart = this.areaStart;
        this.scopeData.areaEnd = this.areaEnd;
      } else {
        this.scopeData.priceStart = this.priceStart;
        this.scopeData.priceEnd = this.priceEnd;
      }
    },

    handleShowInfo(type) {
      let myStart = type === 'area' ? this.areaStart : this.priceStart;
      let myEnd = type === 'area' ? this.areaEnd : this.priceEnd;
      if (myStart > 0 && myEnd > 0 && myStart !== myEnd) {
        if (type === 'area') {
          this.showEarea = myStart + '-' + myEnd + '平方米';
        } else {
          this.showPrice = myStart + '-' + myEnd + '元/月';
        }
      } else if (myStart > 0 && !myEnd > 0) {
        if (type === 'area') {
          this.showEarea = myStart + '平方以上';
        } else {
          this.showPrice = myStart + '元/月以上';
        }
      } else if (!myStart > 0 && myEnd > 0) {
        if (type === 'area') {
          this.showEarea = myEnd + '平方以下';
        } else {
          this.showPrice = myEnd + '元/月以下';
        }
      } else if (myStart > 0 && myStart === myEnd) {
        if (type === 'area') {
          this.showEarea = myStart + '平方米';
        } else {
          this.showPrice = myStart + '元/月';
        }
      } else {
        if (type === 'area') {
          this.showEarea = '';
        } else {
          this.showPrice = '';
        }
      }
    },
    cancelChangeEare(type) {
      if (type === 'clear') {
        this.scopeData.areaStart = '';
        this.scopeData.areaEnd = '';
        this.areaStart = '';
        this.areaEnd = '';
        this.handleShowInfo('area');
      }
      this.areaPopoverVisible = false;
    },

    confirmChangeEare() {
      this.$refs.areaRef.validate((valid) => {
        if (valid) {
          this.areaStart = this.scopeData.areaStart;
          this.areaEnd = this.scopeData.areaEnd;

          this.handleShowInfo('area');
          this.cancelChangeEare();
        } else {
          this.$message.error('请完善表单信息');
        }
      });
    },

    cancelChangePrice(type) {
      if (type === 'clear') {
        this.scopeData.priceStart = '';
        this.priceStart = '';
        this.scopeData.priceEnd = '';
        this.priceEnd = '';
        this.handleShowInfo('price');
      }
      this.pricePopoverVisible = false;
    },

    confirmChangePrice() {
      this.$refs.priceRef.validate((valid) => {
        if (valid) {
          this.priceStart = this.scopeData.priceStart;
          this.priceEnd = this.scopeData.priceEnd;
          this.handleShowInfo('price');
          this.cancelChangePrice();
        } else {
          this.$message.error('请完善表单信息');
        }
      });
    },

    selectHouseType() {
      if (!this.myhouseType.length) {
        this.houseTypePopoverVisible = false;
        return;
      }
      this.houseType = this.myhouseType;
      // this.showHouseType = this.houseType.jion(',');
      let showInfo = '';
      for (let i = 0; i < this.houseType.length; i++) {
        switch (this.houseType[i]) {
          case 'SINGLE':
            showInfo = showInfo + '、单身公寓';
            break;
          case 'ONE_ROOM':
            showInfo = showInfo + '、一房';
            break;
          case 'TWO_ROOM':
            showInfo = showInfo + '、二房';
            break;
          case 'THREE_ROOM':
            showInfo = showInfo + '、三房';
            break;
          case 'FOUR_ROOM':
            showInfo = showInfo + '、四房';
            break;
          case 'FIVE_OR_MORE':
            showInfo = showInfo + '、五室及以上';
            break;
        }
      }
      this.showHouseType = showInfo.slice(1);
      this.houseTypePopoverVisible = false;
    },
    clearHouseType() {
      this.houseType = [];
      this.showHouseType = '户型';
      this.houseTypePopoverVisible = false;
    },
    changehouseType(val) {
      console.log(val);
    }

    // /^[0-9]{2,5}$/
  },
  beforeRouteLeave(to, from, next) {
    // 离开组件的时候触发
    // handleCloseAllDialog()
    // 如果有打开详情
    (async () => {
      try {
        if (this.custDetailDialogVisible) {
          await this.$refs.custDetail.handleCloseAllDialog();
        }
        this.addCutDialogVisible = false;
        this.custDetailDialogVisible = false;
        next();
      } catch (e) {
        console.log(e);
      }
    })();
  }
};
</script>
<style scoped>
.el-menu--horizontal {
  border-width: 0;
}

.filter-form-box {
  display: flex;
  justify-content: space-between;
  height: 50px;
  line-height: 50px;
}

.pdl-t15 {
  margin-top: 15px;
}

.search-key {
  width: 200px;
}

.order-status {
  width: 85px;
}
.date-range {
  width: 210px !important;
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

.filter-form-box .el-form-item--mini.el-form-item {
  margin-bottom: 10px !important;
}
/* .house-type >>> .el-select .el-select__tags {
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
.house-type >>> .el-select .el-select__tags > span {
  display: inline-block;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
.house-type >>> .el-input.el-input--small > input {
  height: 30px !important;
} */
.house-type-box {
  -webkit-appearance: none;
  background-color: #fff;
  background-image: none;
  border-radius: 3px;
  border: 1px solid #a6a6a6;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  /* color: #333; */
  display: inline-block;
  font-size: 12px;
  height: 30px;
  line-height: 30px;
  outline: none;
  padding: 0 15px;
  -webkit-transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
  transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
  width: 174px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
</style>
