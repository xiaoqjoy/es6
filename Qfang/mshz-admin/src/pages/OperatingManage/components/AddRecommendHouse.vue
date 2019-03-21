<template>
  <section class="list-wrapper dialog-box">
    <header class="list-header">
      <el-row :gutter="10">
        <el-col :span="10">
          <el-input class="search-key" placeholder="输入标题/楼盘/楼栋/房号" v-model="keyword" clearable size="mini" />
        </el-col>
        <el-col :span="1">
          <el-button type="success" size="mini" @click="handlePageChange(1)">搜索</el-button>
        </el-col>
      </el-row>
    </header>
    <section class="list-table">
      <el-table :data="houseList" header-align="center" ref="multipleTable" size="small" height="100%" cell-class-name="default-color" class="table-body" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="60" />
        <el-table-column prop="title" label="房源标题" min-width="100px" align="center" />
        <el-table-column label="房源" min-width="120px" align="center">
          <template slot-scope="scope">
            {{scope.row.gardenName}} {{scope.row.buildingName}}
          </template>
        </el-table-column>
        <el-table-column prop="rentUseTypeDesc" label="类型" min-width="80px" align="center" />
        <el-table-column prop="houseType" label="户型" min-width="80px" align="center" />
        <el-table-column prop="price" label="价格" min-width="80px" align="center" />
        <el-table-column prop="bdName" label="管家" min-width="80px" align="center" />
      </el-table>
      <div class="pagination">
        <el-pagination class="page" @size-change="handleSizeChange" @current-change="handlePageChange" :current-page="currentPage" :page-sizes="[20, 30, 50]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="recordCount">
        </el-pagination>
      </div>

    </section>
    <section class="dialog-footer">
      <el-button type="primary" size="mini" @click="handleSubmit">保 存</el-button>
      <el-button size="mini" @click="closeDialog">取 消</el-button>
    </section>
  </section>
</template>

<script>
import { handlePages } from '@/components/common/mixin';
export default {
  mixins: [handlePages],
  data() {
    return {

      multipleSelection: [],
      houseList: [], // 楼盘列表
      keyword: ''
    };
  },
  props: ['remainingCount'],
  mounted() {
    this.requestData();
  },
  methods: {
    requestData() {
      this.$axios
        .get('security/room/recommend/querySituationKey', {
          params: {
            pageSize: this.pageSize,
            currentPage: this.currentPage,
            keyword: this.keyword
          }
        })
        .then(res => {
          if (res.data.status === 'C0000') {
            let { result } = res.data;
            this.currentPage = result.currentPage;
            this.pageCount = result.pageCount;
            this.recordCount = result.recordCount;
            this.houseList = result.items;
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
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },

    closeDialog() {
      this.$emit('toggleHouseDialog', false);
    },
    handleSubmit() {
      if (this.multipleSelection.length > this.remainingCount) {
        this.$message({
          type: 'warning',
          message: '最多还可添加 ' + this.remainingCount + ' 个推荐房源！'
        });
      } else if (this.multipleSelection.length === 0) {
        this.$message({
          type: 'warning',
          message: '请选择要添加的房源！'
        });
      } else {
        this.saveHouse();
      }
    },
    saveHouse(sIds) {
      this.$axios
        .post('security/room/recommend/saveRoom', { situationIds: this.multipleSelection })
        .then(res => {
          if (res.data.status === 'C0000') {
            this.$emit('toggleHouseDialog', true);
            this.$message({
              type: 'success',
              message: '处理成功'
            });
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
    }
  }
};
</script>
<style scoped>
.dialog-box {
  height: 500px !important;
  position: relative;
}
.dialog-footer {
  margin-bottom: -60px;
}
.list-wrapper {
  position: relative;
  box-sizing: border-box;
  height: 100%;
  padding: 60px 0;
}
.list-header {
  position: relative;
  display: block;
  height: 60px;
  line-height: 60px;
  padding: 0 20px;
  margin-top: -60px;
  text-align: left;
  background-color: #fff;
}

.table-body {
  width: 100%;
  height: 100%;
}
.search-key {
  width: 100%;
}
</style>
