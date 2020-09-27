<template>
  <div class="change-bank-card-wrap">
    <el-button
      type="primary"
      class="button button__blue btn__add width100"
      icon="el-icon-plus"
      @click="dialogVisible = true"
    >引入</el-button>
    <div>
      <el-table
        :data="tableData"
        class="common__table"
        header-cell-class-name="table-head"
        row-class-name="table-tr"
        style="width: 100%">
        <el-table-column
          v-for="item in columnList" :key='item.prop'
          :prop="item.prop"
          :label="item.label"
          :width="item.width"
          :formatter="item.formatter">
        </el-table-column>
        <el-table-column
          prop="option"
          label="操作">
          <template slot-scope="scope">
            <el-button @click="edit(scope.row)" type="text" size="small">详情</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div>
        <pagination
          :page="pageConfig"
          class="pagination"
          @jump-page="jump"
        ></pagination>
      </div>
    </div>
    <import-com :dialogVisible="dialogVisible"
      @closeDialog="dialogVisible = false"
      v-if="dialogVisible" @importConfirm="openDetail">
    </import-com>
    <detail-com v-if="showDetail"
    :showDialogDetail="showDetail"
    :config="detailConfig" @closeDetail="closeDetailFn"></detail-com>
  </div>
</template>

<script>
import pagination from "@components/pagination";
import importCom from './importCom';
import detailCom from './detailCom';
import { changeBank as api } from './../../js/server';
export default {
  name: 'change-bank-cark',
  data() {
    return {
      columnList: [
        { label: '变更流水号', prop: 'batchNo' },
        { label: '申请编号', prop: 'applyNo' },
        { label: '出账编号', prop: 'loanNo' },
        { label: '姓名', prop: 'customerName' },
        { label: '状态', prop: 'changeStatus' },
        { label: '变更时间', prop: 'changeTime' }
      ],
      dialogVisible: false,
      showDetail: false,
      detailConfig: {},
      tableData: [],
      title: '新增',
      pageConfig: {
        account: 0, // 总条数
        pageSize: 10, // 当前多少条数据
        currentPage: 1, // 当前页
        showJumpButton: true // 显示跳转按钮
      } // 分页
    };
  },
  components: {
    pagination,
    importCom,
    detailCom
  },
  methods: {
    importFn() {
      this.dialogVisible = true;
    },
    // fakeGet(_url, _parmas) {
    //   let url = _url + '?';
    //   for (let p in _parmas) {
    //     url += `${p}=${_parmas[p]}`;
    //   }
    // },
    getTabData(_pageNum) {
      let data = {
        current: _pageNum,
        size: this.pageConfig.pageSize
      };
      this.$MyFetch.post(api.query, data).then(_data => {
          _data = _data || {};
          let tableData = _data.records;
          this.tableData = tableData;
          this.pageConfig.account = _data.total;
          this.pageConfig.current = _data.pages;
        }).catch(_err => {
          this.$error(_err.message);
        });
    },
    edit(_data) {
      let res = {
        status: false,
        rowData: _data,
        disabled: true,
        title: '详情'
      };
      this.showDetail = true;
      this.detailConfig = res;
    },
    openDetail(_res) {
      this.detailConfig = _res;
      this.showDetail = true;
    },
    jump(_num) {
      this.getTabData(_num);
    },
    closeDialog(_bloon, _reflesh) {
      this.openAdd = _bloon;
      if (_reflesh) {
        this.getTabData(1);
      }
    },
    closeDetailFn(_reflesh) {
      this.showDetail = false;
      if (_reflesh) {
        this.getTabData(1);
      }
    }
  },
  created() {
    this.getTabData(1);
  }
};

</script>

<style lang="less" rel="stylesheet/less" scoped>
  .change-bank-card-wrap{
    background-color: #fff;
    min-height: 820px;
    box-shadow: 0 2px 6px rgba(0, 0, 0, .08);
    padding: 20px 31px;
    position: relative;
    .pagination {
      position: absolute;
      bottom: 20px;
      right: 31px;
    }
    .btn__add {
      margin-bottom: 20px;
    }
  }
</style>
