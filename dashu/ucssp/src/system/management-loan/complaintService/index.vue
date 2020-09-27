<template>
  <div class="customer_complain">
    <div class="data-box"><span class="maintenance">客户投诉信息{{titleMap[status] || '查询'}}</span></div>
    <div class="b_content">
      <el-form :inline="true" ref="searchForm" :model="searchInfo" label-width="80px">
        <el-form-item>
          <el-input v-model="searchInfo.loanNo" placeholder="出账编号"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="searchInfo.customerName" placeholder="客户姓名"></el-input>
        </el-form-item>
        <el-form-item>
          <el-date-picker
            v-model="searchInfo.timeRange"
            align="left"
            type="daterange"
            value-format="yyyy-MM-dd"
            range-separator="至"
            start-placeholder="受理日期(起)"
            end-placeholder="受理日期(终)">
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button class="btn b_button query" @click="search">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button class="btn b_button empty" @click="clearSearch">清空</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-table height="520"
      :data="tableData"
      class="common__table"
      header-cell-class-name="table-head"
      row-class-name="table-tr"
      style="width: 100%">
      <el-table-column
        v-for="item in columns" :key="item.prop"
        :prop="item.prop" :label="item.label"
        :width="item.width">
        <template slot-scope="scope">
          <el-popover width="500" trigger="hover" placement="top" v-if="item.showTemp">
              <p>{{ scope.row[item.prop] }}</p>
              <div slot="reference">
                <p class="yincan">{{ scope.row[item.prop] }}</p>
              </div>
          </el-popover>
          <span v-if="!item.showTemp">{{ scope.row[item.prop] }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="openDetail(scope.row)">投诉详情</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="btn_wrap" v-if="status === 'management'">
      <el-button type="primary" class="btn b_button query width200" @click="openUpload">批量导入</el-button>
    </div>
    <pagination :page="pageConfig" class="pagination"  @jump-page="getTabData"></pagination>
    <upload class="quota-configuration-dialog" v-if="uploadBox"  @getNewData="getTabData(1)" @close="closeUpload"></upload>
    <detail :complainInfoId="complainInfoId" v-if="showdetail" @closeDetail="showdetail = false; complainInfoId = ''"></detail>
  </div>
</template>

<script>
import pagination from "@components/pagination";
import upload from './upload/index.vue';
import detail from './detail';
import {loanApi} from './../js/server';
export default {
  data() {
    return {
      showdetail: false,
      searchInfo: {},
      complainInfoId: '',
      status: this.$route.params.status,
      titleMap: {
        management: '管理',
        query: '查询'
      },
       columns: [
        { label: '出账编号', prop: 'loanNo' },
        { label: '受理日期', prop: 'acceptDate' },
        { label: '客户姓名', prop: 'customerName' },
        { label: '合作机构', prop: 'cooperationOrg' },
        { label: '投诉来源', prop: 'source' }
      ],
      uploadBox: false,
      tableData: [],
      pageConfig: {
        account: 0, // 总条数
        pageSize: 50, // 当前多少条数据
        currentPage: 1, // 当前页
        showJumpButton: true // 显示跳转按钮
      } // 分页
    };
  },
  methods: {
    getTabData(_index) {
      this.pageConfig.currentPage = _index;
      let searchInfo = Object.assign({}, this.searchInfo, {
        currentPage: this.pageConfig.currentPage,
        pageSize: this.pageConfig.pageSize
      });
      this.$MyFetch.post(loanApi.complainInfo, searchInfo).then(data => {
        if (data.total === 0) {
          this.$message.success('查询结果为空！');
        }
        this.pageConfig.account = data.total;
        this.pageConfig.currentPage = data.current;
        this.tableData = data.records;
      }).catch(err => {
        this.$error(err.message);
      });
    },
    search() {
      if (!this.searchInfo.loanNo && !this.searchInfo.customerName && !this.searchInfo.timeRange) {
        this.$error('需至少需录入一项条件才可查询');
        return;
      }
      this.getTabData(1);
    },
    clearSearch() {
      this.searchInfo = {};
    },
    openDetail(_row) {
      this.complainInfoId = _row.complainInfoId;
      this.showdetail = true;
    },
    closeUpload() {
      this.uploadBox = false;
    },
    openUpload() {
      this.uploadBox = true;
    }
  },
  created() {
    // this.status = this.$route.params.status;
  },
  components: {
    pagination,
    upload,
    detail
  },
  watch: {
    'searchInfo.timeRange': function(_new, _old) {
      if (_new && _new instanceof Array) {
        this.searchInfo.beginAcceptDate = _new[0];
        this.searchInfo.endAcceptDate = _new[1];
      } else {
        delete this.searchInfo.beginAcceptDate;
        delete this.searchInfo.endAcceptDate;
      }
    },
    $route: function() {
      this.status = this.$route.params.status;
    }
  }
};
</script>

<style lang="less">
  .customer_complain {
    .boxShadow(0, 0);
    padding: 10px 31px ;
    min-height: 820px;
    .el-dialog__header{
      box-shadow: 0 2px 6px 0 #d0d0d0;
    }
    .el-dialog__body {
      text-align: left;
    }
    .data-box {
      height: 60px;
      border-bottom: 1px solid #d0d0d0;
      margin-bottom: 20px;
      .maintenance {
        border-left: 2px solid #538bf1;
        padding-left: 5px;
        font-family: PingFangSC-Medium;
        font-size: 16px;
        color: #333333;
        line-height: 60px;
      }
    }
    .clearfix.pagination {
      margin-top: 30px;
    }
    .btn_wrap {
      margin-top: 20px;
      text-align: center;
    }
  }
</style>
