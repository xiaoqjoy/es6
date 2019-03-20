<template>
  <section class="house-box">
    <header class="house-header">
      <div class="search-box line-h-50 pdl-ten">
        <el-row :gutter="10">
          <el-col :span="10"
            class="font-l">
            <div class="min-w12">
              <el-select v-model="term"
                placeholder="城市状态"
                size="mini"
                @change="handlePageChange(1)">
                <el-option label="全部"
                  value="0"></el-option>
                <el-option label="已停用"
                  value="1"></el-option>
                <el-option label="可用"
                  value="2"></el-option>
              </el-select>
            </div>
            <!-- <div class="min-w12 pdl-20">
              <el-button size="small" @click="handlePageChange(1)">搜索</el-button>
            </div> -->
          </el-col>
          <el-col :span="3"
            :offset="11"
            class="font-r">
            <div class="min-w12 font-r pdr-20">
              <el-button size="mini" type="success"
                @click="cityDialog = true">开通城市</el-button>
            </div>
          </el-col>
        </el-row>
      </div>
    </header>
    <div class="house-list">
      <el-table :data="CityData"
        header-align="center"
        stripe
        border
        ref="UserTable"
        size="small"
        height="100%"
        cell-class-name="default-color"
        v-loading="loading">
        <el-table-column prop="cityName"
          label="城市"
          :min-width="200"
          align="center">
        </el-table-column>
        <el-table-column label="状态"
          :min-width="100"
          align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.cityStatus == 0">启用</span>
            <span v-else>禁用</span>
          </template>
        </el-table-column>
        <el-table-column label="操作"
          :min-width="150"
          align="center">
          <template slot-scope="scope">
            <!-- <el-button size="mini" type="text" @click.stop="handleCity(scope.$index, scope.row)">编辑</el-button> -->
            <el-button size="mini"
              v-if="checkPermission('OMS_CITY_EDIT')"
              type="text"
              @click.stop="handleCity(scope.$index, scope.row)">
              <span v-if="scope.row.cityStatus == 0">禁用</span>
              <span v-else>启用</span>
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="house-pagination">
        <el-pagination class="page"
          @size-change="handleSizeChange"
          @current-change="handlePageChange"
          :current-page.sync="currentPage"
          :page-sizes="[1, 20, 30, 40]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :page-count="pageCount"
          :total="recordCount">
        </el-pagination>
      </div>
    </div>
    <!-- 弹框 -->
    <el-dialog title="开通城市"
      :visible.sync='cityDialog'
      :close-on-click-modal="false"
      width="500px">
      <div class="pdt-20 set-city">
        <el-row>
          <el-col :span="8"
            :offset="1">
            <el-select size="mini"
              v-model="setCity"
              filterable
              remote
              placeholder="请输入关键词"
              :remote-method="remoteMethod"
              @change="selectGardenName"
              clearable>
              <el-option v-for="(item, index) in options"
                :key="index"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-col>
        </el-row>
      </div>
      <div class="dialog-footer">
        <el-button type="primary"
          size="mini"
          @click="saveCity">保存</el-button>
        <el-button size="mini"
          @click="cityDialog = false, setCity = ''">取 消</el-button>
      </div>
    </el-dialog>
  </section>
</template>
<script>
import { handlePages } from '@/components/common/mixin';
export default {
  name: 'SetCity',
  mixins: [handlePages],
  data() {
    return {
      // Contract
      // 后台返回的数据结构
      loading: true,
      options: [],
      setCity: '',
      cityDialog: false,
      message: '',
      term: '0',
      currentPage4: 1,
      id: '',
      CityData: []
    };
  },
  created() {
    this.requestData();
  },
  methods: {
    // 获取列表数据
    requestData() {
      this.loading = true;
      this.$axios.get(
        '/security/oms/cityManager/queryCityPage',
        {
          params: {
            currentPage: this.currentPage,
            pageSize: this.pageSize,
            term: this.term
          }
        }
      ).then((res) => {
        this.loading = false;
        if (res.data.status === 'C0000') {
          this.pageCount = res.data.result.pageCount;
          this.CityData = res.data.result.items;
          this.recordCount = res.data.result.recordCount;
        } else {
          this.$message.error('请求数据失败！');
        }
      }).catch((err) => {
        this.loading = false;
        this.$message.error(err.message || '服务器异常');
        console.log(err);
      });
    },
    // handleCity(index, row) {
    //   this.innerVisible = true;
    //   this.userName = row.nickname;
    //   this.id = row.id;
    //   if (row.status === 'FREEZE') {
    //     this.message = '解冻';
    //     this.operation = 'UNFREEZE';
    //   }
    // },
    handleCity(index, row) {
      if (+row.cityStatus === 0) {
        this.cityStatus = 1;
        this.message = '禁用';
      } else {
        this.cityStatus = 0;
        this.message = '启用';
      }
      this.$confirm('此操作将' + this.message + row.cityName + ', 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$axios.post(
          '/security/oms/cityManager/stopOrStartCity',
          {
            id: row.cityId,
            status: this.cityStatus
          }
        ).then((res) => {
          if (res.data.status === 'C0000') {
            if (res.data.result) {
              this.requestData();
              this.$message({
                type: 'success',
                message: '处理成功'
              });
            } else {
              this.$message({
                type: 'error',
                message: '处理失败'
              });
            }
          } else {
            this.$message({
              type: 'error',
              message: res.data.message
            });
          }
        }).catch((e) => {
          console.log(e);
          this.$message({
            type: 'error',
            message: e.message || '服务异常'
          });
        });
      }).catch(() => {
      });
    },
    // 城市联想
    remoteMethod(query) {
      if (query !== '') {
        this.$axios.get(
          '/security/oms/cityManager/darkSelectCityInfo',
          {
            params: {
              city: query
            }
          }
        ).then((res) => {
          if (res.data.status === 'C0000') {
            this.restaurants = res.data.result.map((item) => {
              return {
                value: item.name,
                label: item.alias
              };
            });
            this.options = this.restaurants.filter(item => {
              return item.label.toLowerCase()
                .indexOf(query.toLowerCase()) > -1;
            });
          } else {
            this.options = [];
          }
        }).catch((res) => {
          console.log(res);
        });
      } else {
        this.options = [];
      }
    },
    selectGardenName(val) {
      console.log(this.setCity);
    },
    saveCity() {
      if (!this.setCity.trim().length > 0) {
        this.$message.error('请选择城市');
        return false;
      }
      this.$confirm('此操作将开通该城市, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$axios.post(
          '/security/oms/cityManager/addCity',
          {
            cityItemEnum: this.setCity
          }
        ).then((res) => {
          if (res.data.status === 'C0000') {
            if (res.data.result) {
              this.cityDialog = false;
              this.requestData();
              this.setCity = '';
              this.$message({
                type: 'success',
                message: '处理成功'
              });
            } else {
              this.$message({
                type: 'error',
                message: '处理失败'
              });
            }
          } else {
            this.$message({
              type: 'error',
              message: res.data.message
            });
          }
        }).catch((e) => {
          console.log(e);
          this.$message({
            type: 'error',
            message: e.message || '服务异常'
          });
        });
      }).catch(() => {
      });
    }
  },
  components: {
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

.set-city {
  height: 150px;
}
.min-w12 {
  display: inline-block;
  min-width: 120px;
}
</style>
