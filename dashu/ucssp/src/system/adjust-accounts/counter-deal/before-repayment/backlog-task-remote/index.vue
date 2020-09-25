<template>
  <div class="reserve_tast_remote_wrapper dash-board">
    <div class="data-box"><span class="maintenance">待办任务-远程</span></div>
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
      @row-click="clickRow"
      ref="cutoverTab">
        <el-table-column
          type="selection"
          width="50">
        </el-table-column>
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
        <el-table-column class-name="btn-ctrl" label="操作" width="240" fixed="right">
          <template slot-scope="scope">
            <!-- <el-button class="button-text" type="text" @click.stop="callPhone(scope.row)">拨打电话</el-button> -->
            <el-button class="button-text" type="text" @click.stop="showMark(scope.row)">备注</el-button>
            <el-button class="button-text" type="text" @click.stop="cancalCtrl(scope.row)">取消办理</el-button>
            <el-button class="button-text" type="text" @click.stop="returnCustomer(scope.row)">退回客户</el-button>
            <el-button class="button-text" type="text" @click.stop="handleFn(scope.row)">提还办理</el-button>
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
    <el-dialog
      title="备注"
      :visible.sync="dialogVisible"
      width="500px" center
      :before-close="handleClose" :close-on-click-modal='false'>
      <div>
        <el-input type="textarea" rows="5" maxlength="200" v-model="remark" placeholder=""></el-input>
      </div>
      <div slot="footer">
        <el-button type="primary" @click="remarkConfirm">确 定</el-button>
      </div>
    </el-dialog>

    <backlog-detail v-if="showDetail" :status='status' @prepaymentReload='prepaymentReload' :remotePrepay="true" :showSaveBtn="true" :detailData="detailData" @clsoe_windowDetail="showDetail = false; detailData = {};"></backlog-detail>
  </div>
</template>

<script>
import rules from '@common/js/rules.js';
import pagination from "@components/pagination"; // 分页条
import backlogDetail from './../backlog-task/backlog-detail';
import { prepayment } from "@/system/adjust-accounts/counter-deal/js/server"; // 接口
import { tools } from "@/system/adjust-accounts/counter-deal/js/tools"; // 接口
export default {
  name: 'backlog-tast-remote',
  data() {
    return {
      status: '',
      pageConfig: {
        account: 1,
        currentPage: 1,
        pageSize: 10,
        showJumpButton: true
      },
      showDetail: false,
      detailData: {},
      searchInfo: {
        loanNo: '',
        custName: '',
        certNo: '',
        lineId: '',
        flowNo: 'remotePrepayFlow',
        phaseNo: '0020'
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
      remark: '',
      transSerialNo: '',
      tableData: [],
      columnList: [
        { label: '交易号', prop: 'transSerialNo', width: '180' },
        { label: '出账编号', prop: 'loanNo', width: '180' },
        { label: '客户姓名', prop: 'custName', width: '150' },
        { label: '身份证号', prop: 'certNo', width: '200' },
        { label: '手机号码', prop: 'phone', width: '200' },
        { label: '属地客服', prop: 'custManager', width: '150' },
        { label: '邮箱', prop: 'email', width: '200', showTemp: true },
        { label: '放款机构', prop: 'lineId', width: '200', showTemp: true },
        { label: '合作模式', prop: 'collaborate', width: '200', showTemp: true },
        { label: '放款金额', prop: 'businessSum', width: '200' },
        { label: '放款日期', prop: 'putoutDate', width: '200' },
        { label: '贷款期限', prop: 'loanTerm', width: '200' },
        { label: '到期日', prop: 'maturityDateLabel', width: '200' },
        { label: '预计结清时间', prop: 'accDateLabel', width: '200' },
        { label: '总计应还金额', prop: 'totAmt', width: '200' },
        { label: '分公司', prop: 'orgId', width: '200' },
        { label: '办理状态', prop: 'subStatus', width: '200' },
        { label: '预约经办人', prop: 'orderBy', width: '200' },
        { label: '是否财务退回', prop: 'isBackByFinance', width: '200' },
        { label: '退回原因', prop: 'backReason', width: '200', showTemp: true },
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
            _v.putoutDate = tools.dateFormat(_v.putoutDate);
            _v.accDateLabel = tools.dateFormat(_v.accDate);
            _v.maturityDateLabel = tools.dateFormat(_v.maturityDate);
            _v.isBackByFinance = _v.isBackByFinance ? '是' : '否';
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
    clickRow(_row, _column, _event) {
      this.$refs.cutoverTab.toggleRowSelection(_row);
    },
    callPhone(_row) {
      let data = {
        transSerialNo: _row.transSerialNo,
        phone: _row.phone,
        type: '1'
      };
      this.$MyFetch.post(prepayment.callPhone, data).then((data = {}) => {
        // console.log(data, "打电话成功");
      })
      .catch(err => {
        this.$error(err.message);
      });
    },
    returnCustomer(_row) {
      let list = [{ transSerialNo: _row.transSerialNo }];
      this.confirmFn('确认退回客户上传凭证？', 'warning').then(() => {
        this.$MyFetch.post(prepayment.cancelCustomer, {list}).then(_data => {
          this.getTableList(this.pageConfig.currentPage);
          this.confirmFn('退回客户成功');
        }).catch(_err => {
          this.confirmFn(_err.message);
        });
      }).catch(() => {
        console.log('取消');
      });
    },
    prepaymentReload() {
      this.getTableList(this.pageConfig.currentPage);
    },
    handleFn(_row) {
      // RL20190213000004
      _row.loan_no = _row.loanNo;
      _row.trans_serial_no = _row.transSerialNo;
      _row.estimated_payoff_date = _row.accDate;
      this.status = _row.subStatus;
      this.detailData = _row;
      this.showDetail = true;
    },
    showMark(_row) {
      this.dialogVisible = true;
      this.transSerialNo = _row.transSerialNo;
      this.remark = _row.remark;
    },
    remarkConfirm() {
      let data = {
        transSerialNo: this.transSerialNo,
        remark: this.remark
      };
      this.transSerialNo = '';
      this.$MyFetch.post(prepayment.updateRemark, data).then(_data => {
        this.dialogVisible = false;
        this.getTableList(this.pageConfig.currentPage);
      }).catch(_err => {
        this.confirmFn(_err.message);
      });
    },
    handleClose(done) {
      this.remark = '';
      this.transSerialNo = '';
      done();
    },
    cancalCtrl(_row) {
      let transSerialNos = [_row.transSerialNo];
      this.confirmFn('确认取消办理', 'warning').then(() => {
        this.$MyFetch.post(prepayment.cancelOrder, {transSerialNos}).then(_data => {
          this.getTableList(this.pageConfig.currentPage);
          this.confirmFn('成功取消办理');
        }).catch(_err => {
          this.confirmFn(_err.message);
        });
      }).catch(() => {
        console.log('取消');
      });
      // console.log(transSerialNos);
    }
  },
  components: {
    pagination,
    backlogDetail
  },
  created() {
    this.getTableList(1);
  }
};
</script>

<style lang="less">
  .reserve_tast_remote_wrapper {
    // 按钮样式
    .button-primary {
      background-color: @theme;
      border: 1px solid @theme;
      color: #fff;
    }
    .button-default {
      background-color: #fff;
      border: 1px solid @theme;
      color: @theme;
    }
    .yincan {
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    .opera-btn {
      text-align: center;
      padding: 40px;
    }
    .btn-ctrl {
      .cell {
        padding: 0;
        .el-button+.el-button {
          margin-left: 0;
        }
      }
    }
    .dialog-box .dialog-box__content {
      max-height: 700px;
      overflow: scroll;
    }
  }
</style>
