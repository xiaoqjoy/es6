<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-05 10:15:19
 * @LastEditTime: 2019-08-19 16:25:59
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div>
    <!-- 财务初审 -->
    <div class="content">
      <!-- 新增按钮 -->
      <!-- <button class="add  button">+ 新增</button> -->
      <!-- 输入框和下拉框 -->
      <div class="b_content">
        <el-input class="select_72" v-model="loanNo" placeholder="出账编号" clearable></el-input>
        <el-input class="select_72" v-model="customerName" placeholder="客户姓名" clearable></el-input>
        <el-input class="select_72" v-model="lineidName" placeholder="合作机构" clearable></el-input>
        <el-input class="select_72" v-model="certNo" placeholder="身份证号码" clearable></el-input>
        <!-- 案件状态 -->
        <el-select v-model="ChannelValue" class="select_72" placeholder="案件状态">
          <el-option
            v-for="(item, index) in ChannelList"
            :key="index"
            :label="item.phaseName"
            :value="item.phaseNo"
          ></el-option>
        </el-select>
          <el-date-picker
            v-model="buybackDate"
            lign="left"
            type="daterange" :editable='false'
            value-format="yyyy-MM-dd"
            range-separator="至"
            start-placeholder="记账日期(起)"
            end-placeholder="记账日期(终)">
           </el-date-picker>
        <el-button class="b_button query button" @click="refer">查询</el-button>
        <el-button class="b_button empty button" @click="empty">清空</el-button>
      </div>
      <!-- 带全选的表格 -->
      <div class="table_box">
        <el-table
          :default-sort="{prop: 'date', order: 'descending'}"
          :header-cell-style="{'font-size':'12px','text-align':'center','height':'38.9px','background':'#ececec'}"
          ref="multipleTable"
          :data="for_"
          max-height="690"
          tooltip-effect="dark"
          style="width: 100%; border: 1px solid #E9E9E9;"
          @selection-change="handleSelectionChange"
          @row-click="rowCheck"
        >
          <el-table-column type="selection"></el-table-column>
          <el-table-column prop="loanNo" width="180" label="出账编号"></el-table-column>
          <el-table-column prop="customerName" width="110" label="客户姓名"></el-table-column>
          <!-- <el-table-column
                prop="certNo"
                label="身份证号码">
                <template  slot-scope="scope">
                    <div>{{scope.row.certNo | cert_no_filters}}</div>
                </template>
          </el-table-column>-->
          <el-table-column prop="inputDate" width="110" label="存款日期"></el-table-column>
          <el-table-column prop="accDate" width="110" label="记账日期"></el-table-column>
          <el-table-column prop="operatorName" width="110" label="转账人姓名"></el-table-column>
          <el-table-column prop="lineidName" width="200" label="合作机构">
            <template slot-scope="scope">
              <el-popover trigger="hover" placement="top" v-if="scope.row.lineidName">
                <p class="ellipsis">{{scope.row.lineidName}}</p>
                <div slot="reference">
                  <p class="yincan ellipsis">{{scope.row.lineidName}}</p>
                </div>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column prop="inputAmount" label="存款金额"></el-table-column>
          <el-table-column prop="transChannelName" width="200" label="扣款渠道">
            <template slot-scope="scope">
              <el-popover trigger="hover" placement="top" v-if="scope.row.transChannelName">
                <p class="ellipsis">{{scope.row.transChannelName}}</p>
                <div slot="reference">
                  <p class="yincan ellipsis">{{scope.row.transChannelName}}</p>
                </div>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column prop="phaseName" label="案件状态"></el-table-column>
          <el-table-column fixed="right" label="操作">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="detail_alert(scope.row)">还款详情</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- 分页 -->
      <pagination @jump-page="jump" :page="pageConfig" class="pagination"></pagination>
    </div>
    <!-- 测算组件 -->
    <calculate
      v-if="calculateFlag"
      @reload="reload"
      @close_calculate="close_calculate"
      :calculateDatail="calculateDatail"
    ></calculate>
  </div>
</template>

<script type="text/ecmascript-6">
import pagination from "@components/pagination"; // 分页组件
import { counterDealApi } from "@/system/adjust-accounts/counter-deal/js/server"; // 接口
import calculate from "../processed-withdraw/calculate"; // 测算组件
// import { checkingApi } from "../../../../js/server"; // 接口
export default {
  data() {
    return {
      ChannelValue: "", // 案件状态绑定值
      ChannelList: [], // 案件状态下拉
      calculateFlag: false, // 测算开关
      calculateDatail: null, // 测算详情数据
      loanNo: "", // 出账编号
      customerName: "", // 客户姓名
      lineidName: "", // 合作机构
      certNo: "", // 身份证号码
      buybackDate: "", // 记账日期
      pageConfig: {
        account: 0, // 总条数
        pageSize: 50, // 当前多少条数据
        currentPage: 1, // 当前页
        showJumpButton: true // 显示跳转按钮
      }, // 分页
      for_: [] // 渲染列表
    };
  },
  mounted() {
    this.BuybackRecoverInfos();
    this.phaseNameChannelLists({ flowNo: "payBuyBackFlow" });
  },
  methods: {
    // 案件状态下拉
    phaseNameChannelLists(res) {
      res = res || {};
      this.$MyFetch
        .post(counterDealApi.PhaseNameList, res)
        .then((data = {}) => {
          this.ChannelList = data;
        })
        .catch(err => {
          this.$error(err.message);
        });
    },
    // 测算
    detail_alert(row) {
      console.log(row);
      this.calculateDatail = row;
      this.calculateFlag = true;
    },
    // 关闭测算组件
    close_calculate() {
      this.calculateFlag = false;
    },
    // 查询按钮
    refer() {
      this.reload();
    },
    // 清空按钮
    empty() {
      this.loanNo = ""; // 出账编号
      this.customerName = ""; // 客户姓名
      this.lineidName = ""; // 合作机构
      this.certNo = ""; // 身份证号码
      this.ChannelValue = "";
      this.buybackDate = "";
    },
    // reload
    reload(pagNum) {
      let data = {
        flowNo: "payBuyBackFlow",
        phaseNos: ["0010", "0020", "0030", "0050", "0060", "1000", "2000"],
        loanNo: this.loanNo,
        customerName: this.customerName,
        lineidName: this.lineidName,
        certNo: this.certNo,
        buybackBeginDate: this.buybackDate ? this.buybackDate[0] : "",
        buybackEndDate: this.buybackDate ? this.buybackDate[1] : "",
        phaseNo: this.ChannelValue
      };
      let current = pagNum || 1;
      this.BuybackRecoverInfos(data, current);
    },
    // 代偿申请查询列表接口
    BuybackRecoverInfos(res, current) {
      res = res || {
        flowNo: "payBuyBackFlow",
        phaseNos: ["0010", "0020", "0030", "0050", "0060", "1000", "2000"]
      };
      current = current || 1;
      let url =
        counterDealApi.BuybackRecoverInfos + "?current=" + current + "&size=50";
      this.$MyFetch
        .post(url, res, { timeout: 120000 })
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
    // 分页
    jump(pageNum) {
      this.pageConfig.currentPage = pageNum;
      this.reload(pageNum);
    },
    // 选中复选框事件
    handleSelectionChange(data) {
      console.log(data);
    },
    // 行选中
    rowCheck(row, column, e) {
      this.$refs.multipleTable.toggleRowSelection(row);
    }
  },
  components: {
    calculate, // 测算组件
    pagination // 分页组件
  },
  created() {}
};
</script>
<style lang="less" scoped>
.table_box {
  height: 690px;
}
</style>
