<template>
  <div class="page-company">
    <div class="data-box"><span class="maintenance">{{page}}</span></div>
    <div class="b_content">
      <el-input class="interval width162" placeholder="申请编号" v-model="applicationId"></el-input>
      <el-input class="interval width162" placeholder="客户姓名" v-model="customerName"></el-input>
      <el-input class="interval width162" placeholder="身份证号码" v-model="idCardNo"></el-input>
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
      <el-date-picker
        v-model="preparedSubmitTime"
        class="interval datepickercss"
        type="datetimerange"
        value-format="yyyy-MM-dd HH:mm:ss"
        range-separator="至"
        start-placeholder="备签提交开始日期"
        end-placeholder="备签提交结束日期"
        :editable='false'
        clearable>
      </el-date-picker>
      <el-date-picker
        v-model="adjustTime"
        class="interval datepickercss"
        value-format="yyyy-MM-dd HH:mm:ss"
        type="datetimerange"
        range-separator="至"
        start-placeholder="调整开始日期"
        end-placeholder="调整结束日期"
        :editable='false'
        clearable>
      </el-date-picker>
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
      height="500"
      @row-click="clickRow"
      ref="cutoverTab">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          v-for="(item, key) in columnList" :key='key'
          :prop="item.prop"
          :label="item.label"
          :width="item.width">

        </el-table-column>
      </el-table>
    </div>
    <div class="clearfix page-wrap">
      <pagination
        :page="pageConfig"
        class="pagination"
        @jump-page="jump"
      ></pagination>
    </div>
    <div class="business-btn">
      <el-button class="b_button query width200" @click="adjustBusiness">实时业务调整</el-button>
    </div>
  </div>
</template>

<script>
import pagination from "@components/pagination";
import { remoteToC } from '../js/server';
import { baseApi } from '@common/js/server';
export default {
  name: 'counter-remote-counter',
  data() {
    return {
      page: '远程面签任务调单池',
      serviceId: '',
      serviceIdList: [],
      applicationId: '',
      customerName: '',
      idCardNo: '',
      preparedSubmitTime: [],
      adjustTime: [],
      tableData: [],
      columnList: [
        { label: '申请编号', prop: 'applicationId' },
        { label: '客户姓名', prop: 'customerName' },
        { label: '身份证号码', prop: 'idCardNo' },
        { label: '产品一', prop: 'productId1' },
        { label: '产品二', prop: 'productId2' },
        { label: '个贷服务中心', prop: 'serviceName' },
        { label: '备签提交时间', prop: 'preparedSubmitTime' },
        { label: '调整时间', prop: 'cutoverTime' }
      ],
      pageConfig: {
        account: 0, // 总条数
        pageSize: 10, // 当前多少条数据
        currentPage: 1, // 当前页
        showJumpButton: true // 显示跳转按钮
      } // 分页
    };
  },
  created() {
    this.getTabData(1);
    this.getserviceIdList();
  },
  mounted() {
    // console.log(1);
    // console.log(this.$route);
  },
  methods: {
    clickRow(_row, _column, _event) {
      this.$refs.cutoverTab.toggleRowSelection(_row);
    },
    getTabData(_pageNum) {
      let data = {
        applicationId: this.applicationId,
        customerName: this.customerName,
        idCardNo: this.idCardNo,
        serviceId: this.serviceId,
        pageNum: _pageNum,
        pageSize: this.pageConfig.pageSize
      };
      if (this.preparedSubmitTime instanceof Array) {
        data.preparedSubmitStartTime = this.preparedSubmitTime[0];
        data.preparedSubmitEndTime = this.preparedSubmitTime[1];
      }
      if (this.adjustTime instanceof Array) {
        data.cutoverStartTime = this.adjustTime[0];
        data.cutoverEndTime = this.adjustTime[1];
      }
      this.$MyFetch.post(remoteToC.pool, data)
        .then(_data => {
          _data = _data || {};
          // 后端接口给的开始时间和结束时间是分开的字段，前端需要做下处理;
          let tableData = _data.list;
          // tableData = [
          //   {applicationId: '111', customerName: 'aaaa'},
          //   {applicationId: '222', customerName: 'bbb'},
          //   {applicationId: '333', customerName: 'cccc'}
          // ];
          this.tableData = tableData;
          this.pageConfig.account = _data.total;
          this.pageConfig.currentPage = _data.pageNum;
        }).catch(_err => {
          this.$error(_err.message);
        });
    },
    empty() {
      this.initParm();
      this.getTabData(1);
    },
    adjustBusiness() {
      let applicationIds = [];
      this.$lodash.each(this.$refs.cutoverTab.selection, (_e, _i) => {
        applicationIds.push(_e.applicationId);
      });
      if (!applicationIds.length) {
        this.$error('请至少选中一条数据');
        return;
      }
      this.$confirm('确认将选中业务调整至柜面面签？')
        .then(() => {
          this.$MyFetch.put(remoteToC.cutover, { applicationIds }).then(_data => {
            this.$confirm(`${applicationIds.length}笔业务调整成功`);
            if (this.tableData.length === 1 && this.pageConfig.currentPage > 1) {
              // 当前页表格数据只有一条并且当前页数大于1的时候，当前页数－1
              this.pageConfig.currentPage--;
            }
            this.getTabData(this.pageConfig.currentPage);
          }).catch(_err => {
            this.$confirm(_err.message);
          });
        });
    },
    initParm() {
      this.serviceId = '';
      this.applicationId = '';
      this.customerName = '';
      this.idCardNo = '';
      this.preparedSubmitTime = [];
      this.adjustTime = [];
    },
    // 分页
    jump(pageNum) {
      this.pageConfig.currentPage = pageNum;
      this.getTabData(this.pageConfig.currentPage);
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
  computed: {
    routerName() {
      return this.$route.name;
    }
  },
  components: {
    pagination
  }
};
</script>

<style lang="less" rel="stylesheet/less" scoped>
  .page-company {
    position: relative;
    min-height: 820px;
    .boxShadow(0, 0);
    padding: 20px 31px;
    .clearfix.page-wrap {
      position: relative;
      height: 75px;
    }
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
