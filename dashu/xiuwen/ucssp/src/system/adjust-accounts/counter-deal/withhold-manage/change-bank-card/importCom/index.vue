<template>
  <div>
    <!-- 引入客户信息 -->
    <el-dialog class="customer-import" title="引入" :visible="dialogVisible" width="945px" center @close="$emit('closeDialog')">
      <el-form class="search" :inline="true" :model="infoImport" ref="infoImportRef">
        <el-form-item prop="applyNo">
          <el-input class="width200" v-model.trim="infoImport.applyNo" placeholder="申请编号" clearable></el-input>
        </el-form-item>
        <el-form-item prop="loanNo">
          <el-input class="width200" v-model.trim="infoImport.loanNo" placeholder="出账编号" clearable></el-input>
        </el-form-item>
        <el-form-item>
          <el-button class="width100 button__blue" type="primary" @click="getImportList">查询</el-button>
          <el-button class="width100 button-default" plain @click="clearSearch">清空</el-button>
        </el-form-item>
      </el-form>
      <el-table class="table-noallselect" :data="tableDataImport" style="100%" ref="tableDataImport" @select="selectHandle" @row-click="rowClick" height="450">
        <el-table-column type="selection" width="50"></el-table-column>
        <el-table-column prop="applyNo" label="申请编号"></el-table-column>
        <el-table-column prop="customerName" label="姓名"></el-table-column>
        <el-table-column prop="loanNo" label="出账编号"></el-table-column>
      </el-table>
      <div class="btn">
        <el-button class="width200 button__blue" type="primary" @click="submitInfoImport">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { changeBank as api } from './../../../js/server';
export default {
  name: 'importCom',
  props: {
    dialogVisible: {
      type: Boolean,
      default: () => false
    }
  },
  data() {
    return {
      msg: '引入',
      infoImport: {},
      tableDataImport: [],
      tableSelected: [],
      currentApplyNo: ''
    };
  },
  methods: {
    getImportList() {
      let url = api.import;
      if (this.infoImport.applyNo || this.infoImport.loanNo) {
        this.$MyFetch.post(url, this.infoImport)
          .then(_data => {
            _data = _data || {};
            this.tableDataImport = _data;
          }).catch(_error => {
            this.$error(_error.message);
          });
      } else {
        this.$message({ message: '请填写查询条件', type: 'error' });
      }
    },
    clearSearch() {
      this.$refs.infoImportRef.resetFields();
    },
    submitInfoImport() {
      if (!this.currentApplyNo) {
        this.$message({ message: '请选择一条记录', type: 'error' });
        return;
      }
      // this.$emit('closeDialog');
      this.$emit('importConfirm', {
        status: true,
        rowData: this.tableSelected[0],
        disabled: false,
        title: '新增'
      });
    },
    selectHandle(_sel) {
      // 实现单选
      this.$refs.tableDataImport.clearSelection();
      if (_sel instanceof Array && _sel.length > 0) {
        this.$refs.tableDataImport.toggleRowSelection(_sel[_sel.length - 1], true);
        this.tableSelected = [_sel[_sel.length - 1]];
      } else {
        this.$refs.tableDataImport.clearSelection();
        this.tableSelected = [];
      }
      this.currentApplyNo = this.tableSelected[0] ? this.tableSelected[0].applyNo : '';
    },
    rowClick(_row) {
      // 实现单选
      this.$refs.tableDataImport.clearSelection();
      let isSelect = this.tableSelected.some(item => {
        return item.loanNo === _row.loanNo;
      });
      this.$refs.tableDataImport.toggleRowSelection(_row, !isSelect);
      this.tableSelected = isSelect ? [] : [_row];
      this.currentApplyNo = this.tableSelected[0] ? this.tableSelected[0].applyNo : '';
    }
  },
  created() {
    // this.getImportList();
  }
};
</script>

<style lang="less" scoped>
  .customer-import {
    .el-form.search.el-form--inline {
      text-align: left;
    }
    .btn {
      margin-top: 20px;
      text-align: center;
    }
  }
</style>
