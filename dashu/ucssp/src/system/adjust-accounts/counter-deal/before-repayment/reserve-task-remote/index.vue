<template>
  <div class="reserve_tast_remote_wrapper dash-board">
    <div class="data-box"><span class="maintenance">预约任务-远程</span></div>
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
          width="55">
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
        <el-table-column class-name="btn-ctrl" label="操作" width="100" fixed="right">
          <template slot-scope="scope">
            <!-- <el-button class="button-text" type="text" @click.stop="callPhone(scope.row)">拨打电话</el-button> -->
            <!-- <el-button class="button-text" type="text" @click.stop="checkPhoneRecord(scope.row)">查询录音</el-button> -->
            <el-button class="button-text" type="text" @click.stop="openDetail(scope.row)">详情</el-button>
            <el-button class="button-text" type="text" @click.stop="showMark(scope.row)">备注</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="opera-btn">
        <el-button class="width100 button-default" @click="cancalReserve">取消预约</el-button>
        <el-button class="width100 button-primary" @click="confirmReserve">提交</el-button>
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

    <reserve-detail v-if="showDetail" :tetailData="tetail_data" @clsoe_windowDetail="showDetail = false; tetail_data = {};" @reload="getTableList(pageConfig.currentPage);"></reserve-detail>
  </div>
</template>

<script>
import rules from '@common/js/rules.js';
import pagination from "@components/pagination"; // 分页条
import reserveDetail from './../repayment-reserve/reserve-detail';
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
        phaseNo: '0010'
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
      loanNo: '',
      tableData: [],
      columnList: [
        { label: '交易号', prop: 'transSerialNo', width: '200' },
        { label: '出账编号', prop: 'loanNo', width: '200' },
        { label: '客户姓名', prop: 'custName', width: '200' },
        { label: '身份证号', prop: 'certNo', width: '200' },
        { label: '手机号码', prop: 'phone', width: '200' },
        { label: '邮箱', prop: 'email', width: '200' },
        { label: '属地客服', prop: 'custManager', width: '150' },
        { label: '放款机构', prop: 'lineId', width: '200', showTemp: true },
        { label: '合作模式', prop: 'collaborate', width: '200' },
        { label: '预约发起时间', prop: 'orderBeginTimeLabel', width: '200' },
        { label: '预约办理时间', prop: 'orderOprateTimeLabel', width: '200' },
        { label: '预计结清时间', prop: 'accDateLabel', width: '200' },
        { label: '总计应还金额', prop: 'totAmt', width: '200' },
        { label: '分公司', prop: 'orgId', width: '200' },
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
            _v.orderBeginTimeLabel = tools.dateFormat(_v.orderBeginTime);
            _v.orderOprateTimeLabel = tools.dateFormat(_v.orderOprateTime);
            _v.accDateLabel = tools.dateFormat(_v.accDate);
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
    // callPhone(_row) {
    //   let data = {
    //     transSerialNo: _row.transSerialNo,
    //     phone: _row.phone,
    //     type: '1'
    //   };
    //   this.$MyFetch.post(prepayment.callPhone, data).then((data = {}) => {
    //     // console.log(data, "打电话成功");
    //   })
    //   .catch(err => {
    //     this.$error(err.message);
    //   });
    // },
    // checkPhoneRecord(_row) {
    //   let router = this.$router.resolve({
    //     name: 'phoneRecord',
    //     query: {
    //       transSerialNo: _row.transSerialNo,
    //       appOrAud: true,
    //       phoneCheckPersonnelId: '呼号人员',
    //       from: 'case-preRepayment'
    //     }
    //   });
    //   window.open(router.href, "_blank");
    // },
    showMark(_row) {
      this.dialogVisible = true;
      this.transSerialNo = _row.transSerialNo;
      this.remark = _row.remark;
    },
    openDetail(_row) {
      _row.estimated_payoff_date = _row.orderOprateTime;
      _row.loan_no = _row.loanNo;
      if (_row.accDate) {
        _row.estimated_payoff_date = _row.accDate;
      }
      this.tetail_data = _row;
      this.showDetail = true;
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
      this.loanNo = '';
      done();
    },
    cancalReserve() {
      let transSerialNos = this.mutilList();
      if (!transSerialNos.length) {
        return;
      }
      this.confirmFn('确认取消预约吗？', 'warning').then(() => {
        // console.log(true);
        this.$MyFetch.post(prepayment.cancelOrder, {transSerialNos}).then(_data => {
          this.confirmFn('成功取消预约');
          this.getTableList(1);
        }).catch(_err => {
          this.confirmFn(_err.message);
        });
      }).catch(() => {
        console.log('取消');
      });
    },
    confirmReserve() {
      let transSerialNos = this.mutilList(true);
      if (!transSerialNos.length) {
        return;
      }
      let caculate = [];
      transSerialNos.forEach(_v => {
        if (_v.indexOf('RL') >= 0) {
          caculate.push(_v);
        }
      });
      let arryStr = caculate.join('，');
      if (arryStr.indexOf('RL') >= 0) {
        this.confirmFn(`${arryStr}未试算`, 'error');
        return;
      }
      let data = {
        transSerialNos,
        flowNo: 'remotePrepayFlow',
        phaseNo: '0010'
      };
      this.$MyFetch.post(prepayment.subToPendFlow, data).then(_data => {
        if (_data) {
          this.confirmFn('成功提交');
          this.getTableList(1);
        }
      }).catch(_err => {
        this.confirmFn(_err.message);
      });
    },
    mutilList(check, confirm) {
      let loanNos = this.$refs.cutoverTab.selection.map(_v => {
        let totAmt = parseInt(_v.totAmt);
        if (check && totAmt === 0) {
          // loanNos.push(_v.loanNo);
          return _v.loanNo;
        }
        return _v.transSerialNo;
        // if (!check) {
        //   loanNos.push(_v.transSerialNo);
        // }
      });
      if (!loanNos.length) {
        this.$error('请先选择需要提交的申请');
      }
      return loanNos;
    }
  },
  components: {
    pagination,
    reserveDetail
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
  }
</style>
