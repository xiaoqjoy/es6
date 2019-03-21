<template>
  <section class="house-box">
    <header class="house-header">
      <div class="filter-form-box">
        <el-form :inline="true" class="mart-10" size="mini">
          <el-row>
            <el-col :span="2">
              <el-form-item>
                <el-select v-model="filterForm.city" placeholder="城市" size="mini">
                  <el-option :label="v.desc" v-for="(v,k) in cityList" :value="v.value" :key="k" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="2">
              <el-form-item>
                <el-select v-model="filterForm.batch" placeholder="选择批次号" size="mini">
                  <el-option label="批次号" value="" />
                  <el-option :label="v" v-for="(v,k) in batchList" :value="v" :key="k" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="2">
              <el-form-item>
                <el-select v-model="filterForm.queryType" placeholder="展示类型" size="mini">
                  <el-option :label="v.desc" v-for="(v,k) in queryTypeList" :value="v.value" :key="k" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="2">
              <el-form-item>
                <el-select v-model="filterForm.areaId" placeholder="选择区域" size="mini">
                  <el-option label="全部" value="" />
                  <el-option :label="v.name" v-for="(v,k) in areaList" :value="v.name" :key="k" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="2">
              <el-form-item>
                <el-select v-model="filterForm.regionId" placeholder="选择片区" size="mini">
                  <el-option label="全部" value="" />
                  <el-option :label="v.name" v-for="(v,k) in regionList" :value="v.name" :key="k" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="3">
              <el-form-item>
                <el-input placeholder="输入楼盘关键字搜索" v-model="filterForm.keyword" clearable size="mini" />
              </el-form-item>
            </el-col>
            <el-form-item>
              <el-button type="success" size="mini" @click="handlePageChange(1)">搜索</el-button>
              <el-button type="danger" size="mini" @click="clearSearch">清空</el-button>
              <span class="last-refresh" v-if="tableData[0]">最后更新日期：{{tableData[0].lastestUpdateTime}}</span>
            </el-form-item>
          </el-row>
        </el-form>
      </div>
    </header>
    <section class="house-list" v-loading="tableLoading">
      <el-table :data="tableData" border stripe header-align="center" size="mini" height="100%" cell-class-name="default-color"  @row-click="handleRow">
        <el-table-column type="index" label="序号" align="center" key="index" />
        <el-table-column prop="area" label="区域" min-width="120" v-if="filterForm.queryType!=='region'" align="center" key="area" />
        <el-table-column prop="region" label="片区" min-width="120" v-if="filterForm.queryType!=='area'" align="center" key="region" />
        <el-table-column prop="gardenName" label="楼盘名" min-width="120" v-if="filterForm.queryType==='garden'" align="center" key="gardenName" />
        <el-table-column prop="houseStyle" label="户型" min-width="120" v-if="filterForm.queryType==='garden'" align="center" key="houseStyle" />
        <el-table-column prop="gardenCount" label="楼盘数" min-width="80" v-if="filterForm.queryType!=='garden'" align="center" key="gardenCount" />
        <el-table-column prop="roomCount" label="房源数" min-width="150" align="center" key="roomCount" />
        <el-table-column label="租单价" min-width="100" align="center" key="unitRent">
          <template slot-scope="scope">
            <span class="c-blue">{{scope.row.unitRent}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="updateTimeDesc" label="最后更新日期" v-if="filterForm.queryType==='garden'" min-width="120" align="center" key="updateTimes" />
      </el-table>
      <div class="house-pagination">
        <el-pagination class="page" @size-change="handleSizeChange" @current-change="handlePageChange" :current-page="currentPage" :page-sizes="[20, 30, 50]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="recordCount">
        </el-pagination>
      </div>
    </section>
  </section>
</template>

<script>
import { handlePages } from '@/components/common/mixin';
export default {
  name: 'LongSentPrice',
  mixins: [handlePages],
  data() {
    return {
      cityList: [], // 城市
      areaList: [], // 区域
      regionList: [], // 片区
      houseTypeList: [], // 户型
      allAreaList: [],
      batchList: [], // 批次号
      queryTypeList: [{
        value: 'garden',
        desc: '按楼盘'
      }, {
        value: 'area',
        desc: '按区域'
      }, {
        value: 'region',
        desc: '按片区'
      }],
      filterForm: {
        city: '',
        areaId: null,
        regionId: null,
        keyword: '',
        queryType: 'garden',
        batch: null
      },
      tableLoading: true,
      tableData: []
    };
  },
  computed: {

  },
  mounted() {
    this.getBaseData(this.requestData);
  },
  watch: {
    'filterForm.city'(val) {
      if (val) {
        this.getAreaList();
        this.getBatchList();
      } else {
        this.areaList = [];
        this.batchList = [];
        this.filterForm.areaId = null;
        this.filterForm.batch = null;
      }
    },
    'filterForm.areaId'(val) {
      this.filterForm.regionId = null;
      if (val) {
        this.getRegionList();
      } else {
        this.regionList = [];
        this.filterForm.areaId = null;
      }
    },
    'filterForm.queryType'(val) {
      this.handlePageChange(1);
    }
  },
  methods: {
    requestData() {
      if (!this.checkPermission('ROOM_RENT_COMPARE_QUERY')) return;
      this.tableLoading = true;
      this.$axios.get('/security/room/rentCompare/queryLongRentPrice', {
        params: this.getParams()
      }).then(({ data }) => {
        this.tableLoading = false;
        if (data.status === 'C0000') {
          this.pageCount = data.result.pageCount;
          this.recordCount = data.result.recordCount;
          this.tableData = data.result.items;
          this.$forceUpdate();
        } else {
          this.$message.warning(data.message);
        }
      }).catch(err => {
        this.tableLoading = false;
        this.$message.error(err.message || '服务器异常');
      });
    },
    // 获取基础数据
    getBaseData(cb) {
      this.$axios.get('/security/room/rentCompare/queryMeta').then(({ data }) => {
        if (data.status === 'C0000') {
          this.cityList = data.result.city;
          this.houseTypeList = data.result.houseStyle;
          this.filterForm.city = this.cityList[0].value;
        } else {
          this.cityList = [];
        }
        cb && cb();
      });
    },
    // 获取区域
    getAreaList() {
      this.$axios.get('/security/room/rentCompare/queryArea', {
        params: {
          city: this.filterForm.city
        }
      }).then(({ data }) => {
        if (data.status === 'C0000') {
          this.areaList = data.result;
          this.allAreaList = JSON.parse(JSON.stringify(data.result));
        } else {
          this.areaList = [];
          this.allAreaList = [];
        }
      });
    },
    // 获取片区
    getRegionList() {
      let findList = this.allAreaList.find(e => {
        return e.name === this.filterForm.areaId;
      });
      this.regionList = findList ? findList.children || [] : [];
    },
    // 获取批次号
    getBatchList() {
      this.$axios.get('/security/room/rentCompare/queryBatch', {
        params: {
          city: this.filterForm.city
        }
      }).then(({ data }) => {
        if (data.status === 'C0000') {
          this.batchList = data.result;
        } else {
          this.batchList = [];
        }
      });
    },
    getParams() {
      return {
        pageSize: this.pageSize,
        currentPage: this.currentPage,
        keyword: this.filterForm.keyword || undefined,
        city: this.filterForm.city || undefined,
        area: this.filterForm.areaId || undefined,
        region: this.filterForm.regionId || undefined,
        batch: this.filterForm.batch || undefined,
        queryType: this.filterForm.queryType || undefined
      };
    },
    handleRow(row, event, column) {
    },
    // 清空搜索条件
    clearSearch() {
      let filterForm = {
        areaId: null,
        regionId: null,
        queryType: null,
        keyword: '',
        batch: null
      };
      Object.assign(this.filterForm, filterForm);
      this.handlePageChange(1);
    }
  }
};
</script>
<style scoped>
.filter-form-box .el-form-item--mini.el-form-item {
  margin-bottom: 10px !important;
}

.last-refresh {
  display: inline-block;
  margin-left: 20px;
  color: #666;
}

.c-blue {
  color: #4b8daf;
}
.filter-form {
  min-width: 1010px;
  padding-top: 20px;
}
.search-key {
  width: 250px;
}

.date-range {
  width: 240px !important;
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
