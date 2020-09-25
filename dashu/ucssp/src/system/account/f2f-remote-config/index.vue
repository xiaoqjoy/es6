<template>
  <div class="page-company">
    <el-button
      type="primary"
      class="button button__blue btn__add width100"
      icon="el-icon-plus"
      @click="add"
    >新增</el-button>
    <div class="b_content">
      <el-select
        class="interval width162"
        v-model="serviceId"
        filterable
        placeholder="个贷服务中心">
        <el-option
          v-for="item in serviceIdList"
          :key="item.itemCode"
          :label="item.itemDesc"
          :value="item.itemCode">
        </el-option>
      </el-select>
      <el-button
        class="b_button query"
        @click="getTabData(1)"
      >查询</el-button>
      <el-button
        class="b_button empty"
        @click="empty()"
      >清空</el-button>
    </div>
    <div>
      <el-table
        :data="tableData"
        class="common__table"
        header-cell-class-name="table-head"
        row-class-name="table-tr"
        style="width: 100%"
        height="500">
        <el-table-column
          v-for="(item, key) in columnList" :key='key'
          :prop="item.prop"
          :label="item.label"
          :width="item.width"
          :formatter="item.formatter">
        </el-table-column>
        <el-table-column
          prop="option"
          label="操作">
          <template slot-scope="scope">
            <el-button @click="edit(scope.row)" type="text" size="small">编辑</el-button>
            <el-button class="del" @click="del(scope.row)" type="text" size="small">删除</el-button>
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
    <v-add v-if="openAdd"
      :dialogVisible="openAdd"
      @close-dialog="closeDialog"
      :title="title"
      :rowData='rowData'
      :serviceIdList="serviceIdList">
    </v-add>
  </div>
</template>

<script>
import pagination from "@components/pagination";
import vAdd from "./newly-increased";
import { accountApi } from "../js/server.js";
import { baseApi } from '@common/js/server.js';
export default {
  data() {
    return {
      serviceId: '',
      serviceIdList: [],
      rowData: {},
      columnList: [
        { label: '个贷服务中心', prop: 'serviceId', formatter: this.serviceIdFormatter },
        { label: '调整日期', prop: 'adjustDate', formatter: this.adjustDateFormatter },
        { label: '调整时间段', prop: 'adjustTime', formatter: this.adjustTimeFormatter },
        { label: '是否有效', prop: 'status', formatter: this.statusFormatter },
        { label: '更新人', prop: 'updatedBy' },
        { label: '更新时间', prop: 'updatedDate' }
      ],
      tableData: [],
      openAdd: false,
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
    vAdd
  },
  methods: {
    serviceIdFormatter(_row, _col) {
      let matter = '';
      for (let i = 0; i < this.serviceIdList.length; i++) {
        if (this.serviceIdList[i].itemCode === _row.serviceId) {
          matter = this.serviceIdList[i].itemDesc;
          break;
        } else {
          matter = _row.serviceId;
        }
      }
      return matter;
    },
    adjustDateFormatter(_row, _col) {
      return _row.adjustDate.join(' - ');
    },
    adjustTimeFormatter(_row, _col) {
      return _row.adjustTime.join(' - ');
    },
    statusFormatter(_row, _col) {
      return _row.status ? '是' : '否';
    },
    getTabData(_pageNum) {
      let data = {
        pageNum: _pageNum,
        pageSize: this.pageConfig.pageSize,
        serviceId: this.serviceId
      };
      this.$MyFetch.get(accountApi.f2fRemoteCfg.cutoverTime, data)
        .then(_data => {
          _data = _data || {};
          // 后端接口给的开始时间和结束时间是分开的字段，前端需要做下处理;
          let tableData = _data.list;
          this.$lodash.each(tableData, (_e, _i) => {
            _e.adjustTime = [];
            _e.adjustDate = [];
            _e.adjustTime.push(_e.cutoverStartTime, _e.cutoverEndTime);
            _e.adjustDate.push(_e.cutoverStartDate, _e.cutoverEndDate);
          });
          this.tableData = tableData;
          this.pageConfig.account = _data.total;
          this.pageConfig.currentPage = _data.pageNum;
        }).catch(_err => {
          this.$error(_err.message);
        });
    },
    empty() {
      if (this.serviceId) {
        this.serviceId = '';
        this.getTabData(1);
      }
    },
    add() {
      this.openAdd = true;
      this.title = '新增';
      this.rowData = {};
    },
    edit(_data) {
      this.rowData = _data;
      this.title = '编辑';
      this.openAdd = true;
    },
    del(_row) {
      this.$confirm('确认删除该规则？')
        .then(_data => {
          if (this.tableData.length === 1 && this.pageConfig.currentPage > 1) {
            // 当前页表格数据只有一条并且当前页数大于1的时候，当前页数－1
            this.pageConfig.currentPage--;
          }
          let url = accountApi.f2fRemoteCfg.cutoverTime;
          this.$MyFetch.delete(`${url}?id=${_row.id}`).then(_res => {
            // this.confirmFn('成功删除', 'success');
            this.getTabData(this.pageConfig.currentPage);
          }).catch(_err => {
            this.$error(_err.message);
          });
        });
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
    // 获取信贷中心的方法
    getserviceIdList() {
      let url = baseApi.getServicerList;
      this.$MyFetch.get(url).then(_data => {
        this.serviceIdList = _data;
      }).catch(_err => {
        this.$error(_err.message);
      });
    }
  },
  created() {
    this.getserviceIdList();
    this.getTabData(1);
  }
};

</script>

<style lang="less" rel="stylesheet/less" scoped>
  .page-company {
    position: relative;
    min-height: 820px;
    .boxShadow(0, 0);
    padding: 20px 31px;
    .business-btn {
      text-align: center;
    }
    // 查询单独样式
    .query {
      background: #538bf1;
      color: #ffffff;
      border: 1px solid #538bf1;
    }
    // 清空单独样式
    .empty {
      background: #ffffff;
      color: #538bf1;
      border: 1px solid #538bf1;
    }
    .btn__add {
      /deep/ .el-icon-plus {
        line-height: 1.2;
        font-weight: 600;
      }
      margin-bottom: 20px;
    }
    .pagination {
      position: absolute;
      bottom: 20px;
      right: 31px;
    }
    .common__table {
      /deep/.el-table__body-wrapper {
        max-height: 550px;
        overflow-y: auto;
      }
    }
    .data-box {
      height: 60px;
      border-bottom: 1px solid #d0d0d0;
      margin-bottom: 20px;
      .maintenance {
        border-left: 2px solid #538bf1;
        padding-left: 5px;
        font-family: 'PingFangSC-Medium';
        font-size: 16px;
        color: #333333;
        line-height: 60px;
      }
    }
    .b_content {
      text-align: left;
      .interval {
        margin-bottom: 10px;
      }
      .width162 {
        width: 162px;
        margin-right: 14px;
      }
      .datepickercss {
        margin-right: 14px;
      }
      /deep/ .el-input__inner {
        border-radius: 0%;
      }
      // 查询和清空的公有样式
      .b_button {
        width: 100px;
        height: 40px;
        border-radius: 4px;
        font-size: 14px;
        vertical-align: top;
        margin-bottom: 10px;
      }
    }
    .del {
      color: #f55f5f;
    }
  }
</style>
