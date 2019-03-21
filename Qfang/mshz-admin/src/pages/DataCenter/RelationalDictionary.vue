<template>
  <section class="house-box">
    <header class="house-header">
      <div class="filter-form-box">
        <el-form :inline="true" size="mini" class="mart-10">
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
                  <el-option :label="v.name" v-for="(v,k) in areaList" :value="v.id" :key="k" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="2">
              <el-form-item>
                <el-select v-model="filterForm.regionId" placeholder="选择片区" size="mini">
                  <el-option label="全部" value="" />
                  <el-option :label="v.name" v-for="(v,k) in regionList" :value="v.id" :key="k" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-form-item class="float-l">
              <el-date-picker class="date-range" v-model="filterForm.refreshDate" type="daterange" size="mini" range-separator="至" start-placeholder="更新日期始" end-placeholder="更新日期终" format="yyyy-MM-dd" value-format="yyyy-MM-dd">
              </el-date-picker>
            </el-form-item>
            <el-col :span="3">
              <el-form-item>
                <el-input placeholder="输入楼盘关键字搜索" v-model="filterForm.keyword" clearable size="mini" />
              </el-form-item>
            </el-col>
            <el-form-item>
              <el-button type="success" size="mini" @click="handlePageChange(1)">搜索</el-button>
              <el-button type="danger" size="mini" @click="clearSearch">清空</el-button>
              <el-button type="info" size="mini" @click="importData">导入</el-button>
              <el-button type="warning" size="mini" @click="exportData">导出</el-button>
            </el-form-item>
          </el-row>
        </el-form>
      </div>
    </header>
    <section class="house-list" v-loading="tableLoading">
      <el-table :data="tableData" border stripe header-align="center" size="mini" height="100%" cell-class-name="default-color" @row-click="handleRow">
        <el-table-column type="index" label="序号" align="center" />
        <el-table-column prop="area" label="区域" min-width="100" align="center" />
        <el-table-column prop="region" label="片区" min-width="100" align="center" />
        <el-table-column prop="gardenName" label="楼盘名" min-width="120" align="center" />
        <slot v-for="v in sourceList">
          <el-table-column :label="v.type+'区域'" min-width="120" align="center">
            <template slot-scope="scope">
              <span v-if="scope.row.destType===v.type">{{scope.row.destArea}}</span>
            </template>
          </el-table-column>
          <el-table-column :label="v.type+'楼盘名'" min-width="120" align="center">
            <template slot-scope="scope">
              <span v-if="scope.row.destType===v.type">{{scope.row.destGardenName}}</span>
            </template>
          </el-table-column>
        </slot>
        <el-table-column prop="updateTimesDesc" label="更新日期" min-width="120" align="center" />
        <el-table-column prop="updateOperatorName" label="操作人" min-width="120" align="center" />
        <el-table-column label="操作" min-width="100" align="center">
          <template slot-scope="scope">
            <el-button type="text" size="small" v-if="checkPermission('ROOM_RENT_COMPARE_GARDEN_EDIT')" @click.stop="handleEdit(scope.row)">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="house-pagination">
        <el-pagination class="page" @size-change="handleSizeChange" @current-change="handlePageChange" :current-page="currentPage" :page-sizes="[20, 30, 50]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="recordCount">
        </el-pagination>
      </div>
    </section>

    <el-dialog title="编辑关系字典" :visible.sync="editDialogVisible" :close-on-click-modal="false" width="500px">
      <EditRelational v-if="editDialogVisible" :data="editData" @refreshData="refreshData" @changeDialog='getChange'>
      </EditRelational>
    </el-dialog>
    <el-dialog title="关系字典-导入" :visible.sync="importDialogVisible" :close-on-click-modal="false" width="400px">
      <ImportData v-if="importDialogVisible" ref="importDialog" :city="importCity" @refreshData="refreshData" @changeDialog='exportDialogChange' :uploadUrl="uploadUrl" :downloadTemplateUrl="downloadTemplateUrl" :downErrorUrl="downErrorUrl">
      </ImportData>
    </el-dialog>
  </section>
</template>

<script>
import { handlePages } from '@/components/common/mixin';
import EditRelational from './components/RelationDictionary/EditRelational';
import ImportData from './components/RelationDictionary/ImportData';
import { $downloadFile } from '@/assets/js/utils';
export default {
  name: 'RelationalDictionary',
  mixins: [handlePages],
  components: {
    EditRelational, ImportData
  },
  computed: {

  },
  data() {
    return {
      cityList: [], // 城市
      areaList: [], // 区域
      regionList: [], // 片区
      allAreaList: [], // 区域和片区
      sourceList: [], // 来源
      uploadUrl: '/security/room/rentCompare/uploadGarden',
      downloadTemplateUrl: '/security/room/rentCompare/exportGardenModel',
      downErrorUrl: '/security/room/rentCompare/uploadGardenErr',
      importCity: {},
      editDialogVisible: false,
      importDialogVisible: false,
      filterForm: {
        city: '',
        areaId: null,
        regionId: null,
        keyword: '',
        refreshDate: null
      },
      tableLoading: true,
      tableData: [],
      editData: {}
    };
  },
  mounted() {
    this.getBaseData(this.requestData);
  },
  watch: {
    'filterForm.city'(val) {
      if (val) {
        this.getAreaList();
      } else {
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
      if (!this.checkPermission('ROOM_RENT_COMPARE_GARDEN_QUERY')) return;
      this.tableLoading = true;
      this.$axios.get('/security/room/rentCompare/queryGarden', {
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
      this.editDialogVisible = false;
      this.importDialogVisible = false;
      this.handlePageChange(1);
    },
    // 获取基础数据
    getBaseData(cb) {
      this.$axios.get('/security/room/rentCompare/queryMeta').then(({ data }) => {
        if (data.status === 'C0000') {
          this.cityList = data.result.city;
          this.sourceList = data.result.source;
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
        return e.id === this.filterForm.areaId;
      });
      this.regionList = findList ? findList.children || [] : [];
    },
    getParams() {
      let refreshDate = this.filterForm.refreshDate || [];
      return {
        pageSize: this.pageSize,
        currentPage: this.currentPage,
        entrustSource: this.entrustSource || undefined,
        keyword: this.filterForm.keyword || undefined,
        city: this.filterForm.city || undefined,
        areaId: this.filterForm.areaId || undefined,
        regionId: this.filterForm.regionId || undefined,
        dateOn: refreshDate[0] || undefined,
        dateOff: refreshDate[1] || undefined
      };
    },
    handleRow(row, event, column) {
    },
    handleEdit(data) {
      this.editDialogVisible = true;
      this.editData = data;
    },
    getChange(data) {
      this.editDialogVisible = data;
    },
    exportDialogChange(data) {
      this.importDialogVisible = data;
    },
    // 清空搜索条件
    clearSearch() {
      let filterForm = {
        areaId: null,
        regionId: null,
        keyword: '',
        refreshDate: null
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
      // window.location.href = window.location.origin + this.$axios.defaults.baseURL + 'security/room/rentCompare/exportGarden?' + searchParams.toString();
      this.$axios.get('/security/room/rentCompare/exportGarden', {
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
    }
  }
};
</script>
<style scoped>
.search-key {
  width: 250px;
}

.date-range {
  width: 240px !important;
}

.filter-form-box .el-form-item--mini.el-form-item {
  margin-bottom: 10px !important;
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
