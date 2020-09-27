<template>
  <div>
    <div class="content">
      <!-- 输入框和下拉框 -->
      <div class="b_content">
        <el-input clearable class="select_72" v-model="czbh" placeholder="出账编号"></el-input>
        <el-input clearable class="select_72" v-model="jyh" placeholder="交易号"></el-input>
        <el-date-picker
          class="select_722"
          v-model="sqsj"
          type="daterange"
          range-separator="至"
          start-placeholder="操作日期"
          end-placeholder="操作日期"
          format="yyyy-MM-dd"
          value-format="yyyy-MM-dd"
        ></el-date-picker>
        <el-button class="b_button query" @click="refer">查询</el-button>
        <el-button class="b_button empty" @click="empty">清空</el-button>
      </div>
      <!-- 表格 -->
      <div class="tables">
        <el-table
          :default-sort="{prop: 'date', order: 'descending'}"
          :header-cell-style="{'font-size':'12px','text-align':'center','height':'38.9px','background':'#ececec'}"
          ref="multipleTable"
          :data="for_"
          tooltip-effect="dark"
          style="width: 100%"
          @selection-change="handleSelectionChange"
          @row-click="rowCheck"
        >
          <el-table-column type="selection"></el-table-column>
          <el-table-column prop="trans_serial_no" label="交易号"></el-table-column>
          <el-table-column prop="loan_no" label="出账编号"></el-table-column>
          <el-table-column prop="trans_amount" label="垫付总金额"></el-table-column>
          <el-table-column prop="created_by" label="申请人"></el-table-column>
          <el-table-column prop="created_date" label="操作日期">
            <template slot-scope="scope">
              <span>{{date_filters(scope.row.created_date)}}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" fixed="right">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="detailed(scope.row)">明细</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <pagination @jump-page="jump" :page="pageConfig" class="pagination"></pagination>
      <!-- 底部 -->
      <div class="enable">
        <el-button class="t_button dead_t" @click="removeShow">退回</el-button>
        <el-button class="t_button initiate_t" @click="openSubmit">记账</el-button>
      </div>
    </div>
    <particulars :tableConclusions_="tableConclusions" v-if="show" @close_m="close"/>
    <returned
      v-if="expurgate"
      :message="message"
      :deleteInterface="deleteInterface"
      :deleteInterface_="present"
      @close_s="closeS"
    />
  </div>
</template>

<script type="text/ecmascript-6">
import pagination from "@components/pagination"; // 分页组件
import particulars from "../single-advance-money-sponsor/particulars/index"; // 明细组件
import returned from "../single-advance-money-re-check/returned/index"; // 退回组件
import { checkingApi } from "../../../../js/server"; // 接口
export default {
  data() {
    return {
      message: "",
      show: false, // 明细组件默认不显示
      expurgate: false, // 退回组件默认不显示
      czbh: "", // 出账编号
      jyh: "", // 交易号
      selectedRow: [], // 选中复选框
      sqsj: "", // 申请时间
      tableConclusions: [], // 明细列表
      // 查询数据
      searchData: {
        eq: {}
      },
      pageConfig: {
        account: 0, // 总条数
        pageSize: 10, // 当前多少条数据
        currentPage: 1, // 当前页
        showJumpButton: true // 显示跳转按钮
      }, // 分页
      for_: [] // 渲染列表
    };
  },
  methods: {
    // 记账接口
    present() {
      let selectedData = this.selectedRow;
      for (let i = 0; i < selectedData.length; i++) {
        selectedData[i] = selectedData[i].trans_serial_no;
      }
      let url = checkingApi.transPayInfo;
      let data = {
        flowNo: "advancePayFlow", // 流程名称
        objectNoList: selectedData // 交易号
      };
      this.$MyFetch
        .post(url, data)
        .then((data = {}) => {
          console.log(data);
          this.expurgate = false;
          this.confirmFn("记账成功");
          this.refer();
        })
        .catch(err => {
          this.expurgate = false;
          this.$error(err.message);
        });
    },
    // 打开记账组件
    openSubmit() {
      this.message = "是否对选中的申请进行记账";
      if (this.selectedRow.length > 0) {
        this.expurgate = true;
        console.log(this.selectedRow);
      } else {
        this.confirmFn("请先选择要记账的数据");
      }
    },
    // 退回接口
    deleteInterface() {
      let selectedData = this.selectedRow;
      for (let i = 0; i < selectedData.length; i++) {
        selectedData[i] = selectedData[i].trans_serial_no;
      }
      let url = checkingApi.reviewReturn;
      let data = {
        flowNo: "advancePayFlow", // 流程名称
        objectNoList: selectedData // 交易号
      };
      this.$MyFetch
        .post(url, data)
        .then((data = {}) => {
          console.log(data);
          this.expurgate = false;
          this.confirmFn("退回成功");
          this.refer();
        })
        .catch(err => {
          this.expurgate = false;
          this.$error(err.message);
        });
    },
    // 打开退回组件
    removeShow() {
      this.message = "是否退回选中的申请";
      if (this.selectedRow.length > 0) {
        this.expurgate = true;
        console.log(this.selectedRow);
      } else {
        this.confirmFn("请先选择要退回的数据");
      }
    },
    // 关闭退回组件
    closeS() {
      this.expurgate = false;
    },
    // 打开明细组件
    detailed(detaile) {
      this.show = true;
      let url = checkingApi.ChannelList;
      let data = {
        eq: {
          trans_serial_no: detaile.trans_serial_no
        }
      };
      this.$MyFetch
        .post(url, data)
        .then((data = {}) => {
          console.log(data);
          this.tableConclusions = data.records;
        })
        .catch(err => {
          this.$error(err.message);
        });
    },
    // 关闭明细组件
    close() {
      this.show = false;
    },
    // 毫秒格式化
    date_filters(data) {
      function change(t) {
        if (t < 10) {
          return "0" + t;
        } else {
          return t;
        }
      }
      if (data) {
        var date = new Date(data * 1000); // 时间戳为10位需*1000，时间戳为13位的话不需乘1000;
        let Y = date.getFullYear() + "-";
        let M =
          (date.getMonth() + 1 < 10
            ? "0" + (date.getMonth() + 1)
            : date.getMonth() + 1) + "-";
        let D = change(date.getDate()) + " ";
        let h = change(date.getHours()) + ":";
        let m = change(date.getMinutes()) + ":";
        let s = change(date.getSeconds());
        return Y + M + D + h + m + s;
      } else {
        return "---";
      }
    },
    // 复核查询列表接口
    loanParameter(res, current) {
      res = res || {};
      current = current || 1;
      let url =
        checkingApi.SingleRepayment + "?current=" + current + "&size=10";
      this.$MyFetch
        .post(url, res)
        .then((data = {}) => {
          this.for_ = data.records;
          // 总条数
          this.pageConfig.account = data.total || 1;
          // 当前页
          this.pageConfig.currentPage = data.current || 1;
          // 一页有几条数据 pageSize
          this.pageConfig.pageSize = data.size || 10;
        })
        .catch(err => {
          this.$error(err.message);
        });
    },
    // 查询
    refer() {
      // if (this.czbh === "" && this.jyh === "" && this.sqsj === "") {
      //   this.confirmFn("请至少选择一个查询条件输入");
      //   this.pageConfig.account = 0;
      //   this.pageConfig.currentPage = 1;
      //   this.for_ = [];
      // } else {
        this.searchData.eq.loan_no = this.czbh;
        this.searchData.eq.trans_serial_no = this.jyh;
        this.searchData.created_date = this.sqsj || [];
        this.searchData.phase_no = "0020";
        this.searchData.flow_no = "advancePayFlow";
        this.loanParameter(this.searchData);
        console.log(this.searchData);
      // }
    },
    // 分页
    jump(pageNum) {
      this.loanParameter(this.searchData, pageNum);
    },
    // 清空
    empty() {
      // 出账编号
      this.czbh = "";
      // 交易号
      this.jyh = "";
      // 申请时间
      this.sqsj = "";
    },
    // 选中复选框事件
    handleSelectionChange(data) {
      this.selectedRow = data;
      // console.log(data);
      // for (var i = 0; i < data.length; i++) {
      //   this.selectedRow[i] = data[i].trans_serial_no;
      // }
      // console.log(this.selectedRow);
    },
    // 行选中
    rowCheck(row, column, e) {
      this.$refs.multipleTable.toggleRowSelection(row);
    }
  },
  components: {
    pagination, // 分页组件
    particulars,
    returned
  },
  created() {
    this.refer();
  }
};
</script>

<style lang="less" rel="stylesheet/less" scoped>
// 中间部分
.content {
  height: 780px;
  border-radius: 4px;
  background: #fff;
  box-shadow: 1px 2px 20px #ccc;
  overflow: auto;
  // 输入框和下拉框部分样式
  .b_content {
    margin-top: 30px;
    text-align: left;
    // height: 60px;
    margin-left: 28px;
    // 输入框和下拉框172*40
    .select_72 {
      width: 160px;
      height: 40px;
      margin-right: 15px;
    }
    .select_722 {
      width: 240px;
      height: 40px;
      margin-right: 15px;
      /deep/.el-date-editor {
        width: 18%;
      }
      /deep/.el-range-separator {
        width: 18%;
      }
    }
    // 查询和清空的公有样式
    .b_button {
      width: 100px;
      height: 40px;
      border-radius: 4px;
      font-size: 14px;
    }
    // 查询单独样式
    .query {
      background: #538bf1;
      color: #ffffff;
    }
    // 清空单独样式
    .empty {
      background: #ffffff;
      color: #538bf1;
      border: 1px solid #538bf1;
    }
  }
  // 表格总体样式
  .tables {
    overflow-y: auto;
    overflow-x: hidden;
    width: 97%;
    margin: 0px auto;
    border: 1px solid #d0d0d0;
    margin-top: 21px;
    border-radius: 4px;
  }
  .pagination {
    margin-top: 40px;
    margin-right: 30px;
  }
  .enable {
    text-align: center;
    margin-top: 80px;
    margin-bottom: 20px;
    // 停用启用公共样式
    .t_button {
      width: 200px;
      height: 40px;
    }
    .dead_t {
      border: 1px solid #538bf1;
      font-size: 14px;
      color: #538bf1;
      letter-spacing: 1.07px;
      text-align: center;
    }
    .initiate_t {
      background: #538bf1;
      font-size: 14px;
      color: #ffffff;
      letter-spacing: 1.07px;
      text-align: center;
    }
  }
}
</style>
