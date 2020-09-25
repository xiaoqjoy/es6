<template>
  <div class="reserve_tast_remote_wrapper dash-board">
    <div class="data-box"><span class="maintenance">退款任务-远程</span></div>
    <!-- 查询表单 -->
    <el-form class="search" :inline="true" :rules="searchFormRule" :model="searchInfo" ref="searchInfo">
      <el-form-item prop="loanNo">
        <el-input v-model.trim="searchInfo.loanNo" placeholder="出账编号" clearable></el-input>
      </el-form-item>
      <el-form-item prop="custName">
        <el-input v-model.trim="searchInfo.custName" maxlength="15" placeholder="客户姓名" clearable></el-input>
      </el-form-item>
      <el-form-item prop="certNo">
        <el-input v-model.trim="searchInfo.certNo" placeholder="身份证号" clearable></el-input>
      </el-form-item>
      <el-form-item prop="lineId">
        <el-input v-model.trim="searchInfo.lineId" maxlength="15" placeholder="放款机构" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-button class="width100 button-primary" @click="getTableList(1)">查询</el-button>
        <el-button class="width100 button-default" @click="clearSearch">清空</el-button>
      </el-form-item>
    </el-form>
    <div>
      <el-table
      :data="tableData"
      class="common__table"
      header-cell-class-name="table-head"
      row-class-name="table-tr"
      style="width: 100%"
      height="500"
      ref="cutoverTab">
        <el-table-column
          v-for="(item) in columnList" :key='item.label'
          :prop="item.prop"
          :label="item.label"
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
        <el-table-column class-name="btn-ctrl" label="操作" width="100" fixed="right">
          <template slot-scope="scope">
            <el-button class="button-text" type="text" @click="checkVideo(scope.row)">查看影像</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="opera-btn">
        <!-- <el-button class="width100 button-default" @click="cancalReserve">取消预约</el-button>
        <el-button class="width100 button-primary" @click="confirmReserve">提交</el-button> -->
      </div>
    </div>
    <div class="page_box">
      <pagination @jump-page='getTableList' :page='pageConfig' class="pagination"></pagination>
    </div>

  </div>
</template>

<script>
import rules from '@common/js/rules.js';
import pagination from "@components/pagination"; // 分页条
// import reserveDetail from './../repayment-reserve/reserve-detail';
import { prepayment } from "@/system/adjust-accounts/counter-deal/js/server"; // 接口
import { tools } from "@/system/adjust-accounts/counter-deal/js/tools"; // 接口
export default {
  name: 'reserve-tast-remote',
  data() {
    return {
      pageConfig: {
        account: 1,
        currentPage: 1,
        pageSize: 10,
        showJumpButton: true
      },
      showDetail: false,
      tetail_data: {},
      searchInfo: {
        loanNo: '',
        custName: '',
        certNo: '',
        lineId: '',
        flowNo: 'remotePrepayFlow',
        phaseNo: '0050'
      },
      searchFormRule: {
        loanNo: [
          { validator: rules.accountId, trigger: "blur" }
        ],
        certNo: [
          { validator: rules.identityCardRule, trigger: "blur" }
        ],
        lineId: [
          { validator: rules.chineseChart, trigger: "blur" }
        ]
      },
      dialogVisible: false,
      remarkTxt: '',
      applicationId: '',
      tableData: [],
      columnList: [
        // 交易号、出账编号、客户姓名、身份证号码、手机号码、放款金额、贷款期限、办理时间（取待办任务提交时间）、放款机构、合作模式、操作
        { label: '交易号', prop: 'transSerialNo', width: '200' },
        { label: '出账编号', prop: 'loanNo', width: '200' },
        { label: '客户姓名', prop: 'custName', width: '200' },
        { label: '身份证号码', prop: 'certNo', width: '200' },
        { label: '手机号码', prop: 'phone', width: '200' },
        { label: '放款金额', prop: 'businessSum', width: '200' },
        { label: '贷款期限', prop: 'loanTerm', width: '100' },
        { label: '办理时间', prop: 'subToPendDateLabel', width: '200' },
        { label: '放款机构', prop: 'lineId', width: '200', showTemp: true },
        { label: '合作模式', prop: 'collaborate', width: '200', showTemp: true },
        { label: '备注', prop: 'remark', width: '200', showTemp: true }
      ]
    };
  },
  methods: {
    getTableList(index) {
      this.pageConfig.currentPage = index;
      const data = Object.assign(this.searchInfo, this.pageConfig);
      this.$MyFetch.post(prepayment.queryCustInfo, data)
        .then(data => {
          if (data.records.length < 1) {
            this.$message("查询结果为空！");
          }
          data.records.forEach(_v => {
            _v.subToPendDateLabel = tools.dateFormat(_v.subToPendDate);
          });
          this.tableData = data.records;
          this.pageConfig.account = data.total || 1;
          this.pageConfig.currentPage = data.current || 1;
        }).catch(_err => {
          this.confirmFn(_err.message, 'error');
        });
    },
    clearSearch() {
      this.$refs.searchInfo.resetFields();
    },
    checkVideo(_row) {
      this.$showImage(_row.applicationId, '退款任务-远程', {ReadOnly: '0', selectProductId: _row.productId});
    }
  },
  components: {
    pagination
  },
  created() {
    this.getTableList(1);
  }
};
</script>
