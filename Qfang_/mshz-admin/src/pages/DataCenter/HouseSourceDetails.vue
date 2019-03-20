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
            <el-col :span="2">
              <el-form-item>
                <el-select v-model="filterForm.bedroom" placeholder="选择户型" size="mini">
                  <el-option label="全部" value="" />
                  <el-option :label="v.desc" v-for="(v,k) in houseTypeList" :value="v.value" :key="k" />
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
              <el-button type="info" size="mini" @click="importData">数据导入</el-button>
              <el-button type="warning" size="mini" @click="exportData">数据导出</el-button>
              <el-button type="text" size="mini" @click="downloadTemplate">下载导入模板</el-button>
            </el-form-item>
            <el-form-item class="float-r">
              <el-button type="success" size="mini" @click="countData">开始计算</el-button>
            </el-form-item>
          </el-row>
        </el-form>
      </div>
    </header>
    <section class="house-list" v-loading="tableLoading">
      <el-table :data="tableData" border stripe header-align="center" size="mini" height="100%" cell-class-name="default-color"  @row-click="handleRow">
        <el-table-column prop="batch" label="批次号" align="center" />
        <el-table-column prop="roomArea" label="区域" min-width="120" align="center" />
        <el-table-column prop="roomRegion" label="片区" min-width="120" align="center" />
        <el-table-column prop="gardenName" label="楼盘名" min-width="120" align="center" />
        <el-table-column prop="roomNo" label="房源编码" min-width="150" align="center" />
        <el-table-column prop="roomType" label="出租类型" min-width="120" align="center" />
        <el-table-column prop="houseStyle" label="户型" min-width="80" align="center" />
        <el-table-column prop="direction" label="朝向" min-width="80" align="center" />
        <el-table-column label="面积" min-width="100" align="center">
          <template slot-scope="scope">
            <span>{{scope.row.area}}㎡</span>
          </template>
        </el-table-column>
        <el-table-column prop="rentMonth" label="月租金" min-width="100" align="center" />
        <el-table-column prop="rentSingle" label="租单价" min-width="100" align="center">
          <template slot-scope="scope">
            <span class="c-blue">{{scope.row.rentSingle}}</span>
          </template>
        </el-table-column>
      </el-table>
      <div class="house-pagination">
        <el-pagination class="page" @size-change="handleSizeChange" @current-change="handlePageChange" :current-page="currentPage" :page-sizes="[20, 30, 50]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="recordCount">
        </el-pagination>
      </div>
    </section>
    <el-dialog title="房源明细-导入" :visible.sync="importDialogVisible" :close-on-click-modal="false" width="400px">
      <ImportData v-if="importDialogVisible" ref="importDialog" :city="importCity" @refreshData="refreshData" @changeDialog='exportDialogChange' :uploadUrl="uploadUrl" :downloadTemplateUrl="downloadTemplateUrl" :downErrorUrl="downErrorUrl">
      </ImportData>
    </el-dialog>
  </section>
</template>

<script>
import { handlePages } from '@/components/common/mixin';
import ImportData from './components/RelationDictionary/ImportData';
import { $downloadFile } from '@/assets/js/utils';
export default {
  name: 'HouseSourceDetails',
  mixins: [handlePages],
  data() {
    return {
      cityList: [], // 城市
      areaList: [], // 区域
      regionList: [], // 片区
      houseTypeList: [], // 户型
      allAreaList: [],
      importCity: {},
      importDialogVisible: false,
      filterForm: {
        city: '',
        areaId: null,
        regionId: null,
        keyword: null,
        bedroom: null
      },
      uploadUrl: '/security/room/rentCompare/uploadRoomDetail',
      downloadTemplateUrl: '/security/room/rentCompare/exportHousingDetailModel',
      downErrorUrl: '/security/room/rentCompare/uploadRoomDetailErr',
      tableLoading: true,
      tableData: []
    };
  },
  components: {
    ImportData
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
      } else {
        this.areaList = [];
        this.filterForm.areaId = null;
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
    }
  },
  methods: {
    requestData() {
      if (!this.checkPermission('ROOM_RENT_COMPARE_DETAIL_QUERY')) return;
      this.tableLoading = true;
      this.$axios.get('/security/room/rentCompare/queryHousingDetail', {
        params: this.getParams()
      }).then(({ data }) => {
        this.tableLoading = false;
        if (data.status === 'C0000') {
          this.pageCount = data.result.pageCount;
          this.recordCount = data.result.recordCount;
          this.tableData = data.result.items;
        } else {
          this.$message.warning(data.message);
        }
      }).catch(err => {
        this.tableLoading = false;
        this.$message.error(err.message || '服务器异常');
      });
    },
    refreshData() {
      this.importDialogVisible = false;
      this.handlePageChange(1);
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
    getParams() {
      return {
        pageSize: this.pageSize,
        currentPage: this.currentPage,
        keyword: this.filterForm.keyword || undefined,
        city: this.filterForm.city || undefined,
        area: this.filterForm.areaId || undefined,
        region: this.filterForm.regionId || undefined,
        bedroom: this.filterForm.bedroom || undefined
      };
    },
    handleRow(row, event, column) {
    },
    // 清空搜索条件
    clearSearch() {
      let filterForm = {
        areaId: null,
        regionId: null,
        keyword: '',
        bedroom: null
      };
      Object.assign(this.filterForm, filterForm);
      this.handlePageChange(1);
    },
    // 导出excel
    exportData() {
      // let searchParams = new URLSearchParams();
      // let params = this.getParams();
      // for (let key in params) {
      //   if (params[key] !== undefined) {
      //     searchParams.append(key, params[key]);
      //   }
      // }
      // window.location.href = window.location.origin + this.$axios.defaults.baseURL + 'security/room/rentCompare/exportHousingDetail?' + searchParams.toString();
      this.$axios.get('/security/room/rentCompare/exportHousingDetail', {
        params: this.getParams(),
        responseType: 'blob'
      }).then((res) => {
        if (res.data.size) {
          let fileName = decodeURI(res['headers']['content-disposition'].split('filename = ')[1]);
          let blob = new Blob([res.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8' });
          $downloadFile(window.URL.createObjectURL(blob), fileName);
        } else {
          this.$message.error(res.data.message || '导出excel失败，请稍后再试');
        }
      }).catch(err => {
        this.$message.error(err.message || '导出excel失败，请稍后再试');
      });
    },
    // 导入数据
    importData() {
      this.importCity = this.cityList.find(e => {
        return e.value === this.filterForm.city;
      });
      this.importDialogVisible = true;
    },
    // 计算模版
    countData() {
      this.$axios.get('/security/room/rentCompare/countRoomDetail', {
        params: {
          city: this.filterForm.city
        }
      }).then(res => {
        if (res.data.status === 'C0000') {
          let batch = res.data.result.batch || '';
          let countDate = res.data.result.countDate || 0;
          this.$confirm('用于计算的数据批次号为：' + batch + '，共' + countDate + '条数据，是否确认执行？', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消'
          }).then(() => {
            let loading = this.$loading({
              lock: true,
              text: '计算中...',
              spinner: 'el-icon-loading',
              background: 'rgba(0, 0, 0, 0.7)',
              customClass: 'count-loaing'
            });
            this.$axios.post('/security/room/rentCompare/calRoomDetail', {}, {
              params: {
                city: this.filterForm.city || undefined
              }
            }).then(({ data }) => {
              loading.close();
              if (data.status === 'C0000') {
                this.$message.success('计算模版成功');
                this.handlePageChange(1);
              } else {
                this.$message.error(data.message || '服务器异常');
              }
            }).catch(err => {
              loading.close();
              this.$message.error(err.message || '服务器异常');
            });
          }).catch(() => { });
        } else {
          this.$message.error(res.data.message);
        }
      }).catch(err => {
        this.$message.error(err.message || '服务器异常');
      });
    },
    exportDialogChange(data) {
      this.importDialogVisible = data;
    },
    // 下载导入模版
    downloadTemplate() {
      // window.location.href = window.location.origin + this.$axios.defaults.baseURL + 'security/room/rentCompare/exportHousingDetailModel';
      this.$axios.get('/security/room/rentCompare/exportHousingDetailModel', {
        responseType: 'blob'
      }).then((res) => {
        if (res.data.size) {
          let fileName = decodeURI(res['headers']['content-disposition'].split('filename = ')[1]);
          let blob = new Blob([res.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8' });
          $downloadFile(window.URL.createObjectURL(blob), fileName);
        } else {
          this.$message.error(res.data.message || '下载模版失败，请稍后再试');
        }
      }).catch(err => {
        this.$message.error(err.message || '下载模版失败，请稍后再试');
      });
    }
  }
};
</script>
<style scoped>

.filter-form-box .el-form-item--mini.el-form-item {
  margin-bottom: 10px !important;
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
