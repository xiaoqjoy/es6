<template>
  <section class="house-box pdt-10">
    <!-- <header class="house-header">
      <div class="line-h-50"></div>
      <div class="search-box pdl-20">
1
      </div>
    </header> -->
    <div class="house-list">
      <el-table :data="CityData"
        border
        stripe
        header-align="center"
        ref="UserTable"
        size="small"
        height="100%"
        cell-class-name="default-color"
        class="talbe-box"
        v-loading="loading">
        <el-table-column prop="orgName"
          label="城市分公司"
          :min-width="200"
          align="center">
        </el-table-column>
        <el-table-column label="城市"
          :min-width="100"
          align="center">
          <template slot-scope="scope">
            <span v-for="(item,index) in scope.row.cityList"
              :key="index">
              {{item.cityName}}
            </span>
          </template>
        </el-table-column>
        <el-table-column label="操作"
          :min-width="150"
          align="center">
          <template slot-scope="scope">
            <el-button size="mini"
              v-if="checkPermission('OMS_CITYCOMPANY_EDIT')"
              type="text"
              @click.stop="handleSetCity(scope.$index, scope.row)">
              编辑
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
      <set-city-dialog :id="id"
        v-if="cityDialog"
        :cityDialog.sync="cityDialog"
        :orgId="orgId"
        @refresh="requestData">
      </set-city-dialog>
    </el-dialog>
  </section>
</template>

<script>
import { handlePages } from '@/components/common/mixin';
import setCityDialog from './components/SetCityDialog';
export default {
  name: 'SetCityCompany',
  mixins: [handlePages],
  data() {
    return {
      // Contract
      // 后台返回的数据结构
      loading: true,
      setCity: '',
      cityDialog: false,
      message: '',
      term: '0',
      currentPage4: 1,
      id: '',
      orgId: '',
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
        '/security/oms/cityCompany/queryCityCompany',
        {
          params: {
            currentPage: this.currentPage,
            pageSize: this.pageSize
            // term: this.term
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

    handleSetCity(index, row) {
      this.cityDialog = true;
      this.id = row.id;
      this.orgId = row.orgId;
    }

    // handleCity(index, row) {
    //   if (+row.cityStatus === 0) {
    //     this.cityStatus = 1;
    //     this.message = '禁用';
    //   } else {
    //     this.cityStatus = 0;
    //     this.message = '启用';
    //   }
    //   this.$confirm('此操作将' + this.message + row.cityName + ', 是否继续?', '提示', {
    //     confirmButtonText: '确定',
    //     cancelButtonText: '取消',
    //     type: 'warning'
    //   }).then(() => {
    //     this.$axios.post(
    //       '/security/oms/cityManager/stopOrStartCity',
    //       {
    //         id: row.cityId,
    //         status: this.cityStatus
    //       }
    //     ).then((res) => {
    //       if (res.data.status === 'C0000') {
    //         if (res.data.result) {
    //           this.requestData();
    //           this.$message({
    //             type: 'success',
    //             message: '处理成功'
    //           });
    //         } else {
    //           this.$message({
    //             type: 'error',
    //             message: '处理失败'
    //           });
    //         }
    //       } else {
    //         this.$message({
    //           type: 'error',
    //           message: res.data.message
    //         });
    //       }
    //     }).catch((e) => {
    //       console.log(e);
    //       this.$message({
    //         type: 'error',
    //         message: '服务异常'
    //       });
    //     });
    //   }).catch(() => {

    //   });
    // },

  },
  components: {
    setCityDialog
  }
};
</script>


<style scoped>
.houseing {
  padding-top: 80px;
  padding-bottom: 20px;
  box-sizing: border-box;
  height: 100%;
  position: relative;
}
.header {
  display: block;
  margin-top: -80px;
  height: 60px;
  width: 100%;
  position: relative;
  top: 0;
  left: 0;
  background-color: #fff;
}
.search-box {
  padding-top: 14px;
}

.talbe-box {
  width: 100%;
  height: 100%;
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
