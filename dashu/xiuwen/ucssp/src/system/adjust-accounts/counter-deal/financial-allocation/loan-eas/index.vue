<style lang="less" rel="stylesheet/less" scoped>
  .pagination {
    margin-top: 20px;
  }
  .contain {
    background: #fff;
    padding: 20px 31px;
    position: relative;
    box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.08);
  }
  .btn {
    width: 100px;
    height: 40px;
    border: none;
    background: #538bf1;
    border-radius: 4px;
    color: #fff;
    margin-bottom: 21px;
    &:active {
      background: #4177d9;
    }
    &.disabled {
      background: #86adf5;
    }
  }
</style>
<template>
  <div class="contain">
    <button class="btn" @click="add">+ 新增</button>
    <button class="btn" @click="download">导出</button>
    <el-form :inline="true" :model="form" :rules="rules" class="demo-form-inline">
      <el-form-item label="">
        <el-input v-model="form.caesSubjectNo" placeholder="信贷金蝶科目编码"></el-input>
      </el-form-item>
      <el-form-item label="">
        <el-input v-model="form.caesName" placeholder="信贷金蝶科目名称"></el-input>
      </el-form-item>
      <el-form-item label="">
        <el-input v-model="form.easSubjectNo" placeholder="EAS科目编码"></el-input>
      </el-form-item>
      <el-form-item label="">
        <el-input v-model="form.easName" placeholder="EAS科目名称"></el-input>
      </el-form-item>
      <el-form-item>
        <button type="button" @click="search" class="btn">查询</button>
        <button type="button" @click="clear" class="btn">清空</button>
      </el-form-item>
    </el-form>
    <el-table
      v-loading="loading"
      :data="tableData"
      class="common__table"
      header-cell-class-name="table-head"
      row-class-name="table-tr">
      <el-table-column
        width="200"
        prop="caesSubjectNo"
        label="信贷金蝶科目编码">
      </el-table-column>
      <el-table-column
        width="200"
        prop="caesName"
        label="信贷金蝶科目名称">
      </el-table-column>
      <el-table-column
        width="200"
        prop="caesTypeOne"
        label="信贷金蝶辅助科目类型1">
      </el-table-column>
      <el-table-column
        width="200"
        prop="caesNoOne"
        label="信贷金蝶辅助科目编码1">
      </el-table-column>
      <el-table-column
        width="200"
        prop="caesNameOne"
        label="信贷金蝶辅助科目名称1">
      </el-table-column>
      <el-table-column
        width="200"
        prop="caesTypeTwo"
        label="信贷金蝶辅助科目类型2">
      </el-table-column>
      <el-table-column
        width="200"
        prop="caesNoTwo"
        label="信贷金蝶辅助科目编码2">
      </el-table-column>
      <el-table-column
        width="200"
        prop="caesNameTwo"
        label="信贷金蝶辅助科目名称2">
      </el-table-column>
      <el-table-column
        width="200"
        prop="easSubjectNo"
        label="EAS科目编码">
      </el-table-column>
      <el-table-column
        width="200"
        prop="easName"
        label="EAS科目名称">
      </el-table-column>
      <el-table-column
        width="200"
        prop="easTypeOne"
        label="EAS辅助科目类型1">
      </el-table-column>
      <el-table-column
        width="200"
        prop="easNoOne"
        label="EAS辅助科目编码1">
      </el-table-column>
      <el-table-column
        width="200"
        prop="easNameOne"
        label="EAS辅助科目名称1">
      </el-table-column>
      <el-table-column
        width="200"
        prop="easTypeTwo"
        label="EAS辅助科目类型2">
      </el-table-column>
      <el-table-column
        width="200"
        prop="easNoTwo"
        label="EAS辅助科目编码2">
      </el-table-column>
      <el-table-column
        width="200"
        prop="easNameTwo"
        label="EAS辅助科目名称2">
      </el-table-column>
      <el-table-column
        prop="marketTeamId"
        :formatter="changeFlag"
        label="状态">
      </el-table-column>
      <el-table-column
        fixed="right"
        width="100"
        label="操作">
        <template slot-scope="scope">
          <el-button @click="open(scope.row)" type="text" size="small">
            {{ scope.row.status === '1' ? '停用' : '启用' }}
          </el-button>
          <el-button @click="edit(scope.row)" type="text" size="small">修改</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination :page="pageConfig" class="pagination" @jump-page="getData"></pagination>
    <detail v-if="isDetail" @close="close" :row="row"></detail>
  </div>
</template>

<script>
import pagination from '@components/pagination';
import detail from './detail';
import { eas } from '../../js/server';

export default {
  data() {
    return {
      tableData: [],
      form: {},
      rules: {},
      loading: false,
      pageConfig: {
        account: 0,
        currentPage: 1,
        pageSize: 10,
        showJumpButton: true
      },
      row: {},
      isDetail: false
    };
  },
  components: {
    pagination,
    detail
  },
  methods: {
    changeFlag(row) {
      let status;
      switch (row.status) {
        case "1":
          status = "启用";
          break;
        case "0":
          status = "停用";
          break;
      }
      return status;
    },
    add() {
      this.isDetail = true;
      this.row = {};
    },
    edit(row) {
      this.isDetail = true;
      this.row = row;
    },
    download() {
      let loading = this.$loading({
        text: "",
        spinner: "",
        background: "transparent"
      });
      this.$MyFetch.post(eas.exportAllCaesEasMap)
        .then((data) => {
          console.log(data.downUrl);
          location.href = data.downUrl;
          // this.$download(data);
          loading.close();
        })
        .catch((e) => {
          this.$message.error(e.message);
          loading.close();
        });
    },
    getData(page) {
      page = page || this.pageConfig.currentPage;
      this.$MyFetch.post(`${eas.query}?current=${page}&size=${this.pageConfig.pageSize}`, this.form)
        .then((data) => {
          this.pageConfig.account = data.total || 0;
          this.pageConfig.currentPage = data.current || 0;
          this.tableData = data.records;
        });
    },
    search() {
      this.getData(1);
    },
    clear() {
      this.form = {};
    },
    close() {
      this.isDetail = false;
      this.getData();
    },
    open(row) {
      let status = row.status === '1' ? '停用' : '启用';
      this.$confirm(`是否${status}当前科目映射？`, '提示', {
      }).then((data) => {
        this.$MyFetch.post(eas.isDisableCaesEasMap, row)
          .then((data) => {
            this.$message.success(status + "成功！");
            this.getData();
          })
          .catch((e) => {
            this.$message.error(e.message);
          });
      }).catch(() => {
      });
    }
  },
  mounted() {
    this.getData();
  }
};
</script>
