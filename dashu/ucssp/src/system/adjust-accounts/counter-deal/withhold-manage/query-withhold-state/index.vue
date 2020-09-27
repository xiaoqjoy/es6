<template>
  <div>
    <!-- 单笔代扣 -->
    <div class="content">
      <!-- 输入框和下拉框 -->
      <div class="b_content">
         <!-- 出账编号 -->
        <el-input class="select_72" v-model="loanNo" placeholder="出账编号" clearable></el-input>
         <!-- 姓名 -->
        <el-input class="select_72" v-model="customerName" placeholder="姓名" clearable></el-input>
         <!-- 扣款日期 -->
        <el-date-picker
          class="select_72"
          v-model="businessDate"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="扣款日期">
        </el-date-picker>
        <div class="referEmptyDiv"><el-button class="b_button query button" @click="refer">查询</el-button></div>
        <div class="referEmptyDiv"><el-button class="b_button empty button" @click="empty">清空</el-button></div>
      </div>
      <!-- 带全选的表格 -->
        <div class="table_box">
            <el-table
            :default-sort = "{prop: 'date', order: 'descending'}"
            :header-cell-style="{'font-size':'12px','text-align':'center','height':'38.9px','background':'#ececec'}"
            ref="multipleTable"
            max-height="680"
            :data="for_"
            tooltip-effect="dark"
            style="width: 100%; border: 1px solid #E9E9E9;">
            <el-table-column
                prop="loanNo"
                label="出账编号">
            </el-table-column>
            <el-table-column
                prop="sterm"
                label="期次">
            </el-table-column>
            <el-table-column
                prop="customerName"
                label="姓名">
            </el-table-column>
            <el-table-column
                prop="deductDt"
                label="扣款日期">
            </el-table-column>
            <el-table-column
                prop="deductSucAmt"
                label="扣款成功金额">
            </el-table-column>
            <el-table-column
                prop="deductResult"
                label="扣款结果">
            </el-table-column>
            </el-table>
        </div>
      <!-- 分页 -->
      <pagination @jump-page="jump" :page="pageConfig" class="pagination"></pagination>
      <!-- 文字提示组件 -->
    <fontHint v-if="fontHintFlag" :massage="fontHintMsg" @close="fontHintClose"></fontHint>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import { counterDealApi } from "@/system/adjust-accounts/counter-deal/js/server"; // 接口
import pagination from "@components/pagination"; // 分页组件
import fontHint from "@/system/adjust-accounts/counter-deal/components/font-hint"; // 文字提示组件
export default {
  name: 'channel-alter',
  data() {
    return {
      fontHintFlag: false, // 文字提示开关
      fontHintMsg: '', // 文字提示内容
      loanNo: "", // 出账编号
      customerName: "", // 客户姓名
      businessDate: "", // 扣款日期
      pageConfig: {
        account: 0, // 总条数
        pageSize: 30, // 当前多少条数据
        currentPage: 1, // 当前页
        showJumpButton: true // 显示跳转按钮
      }, // 分页
      for_: [] // 渲染列表
    };
  },
  mounted() {
        // this.deductManagementQureyBatchDeductStatus();
  },
  methods: {
    // 关闭文字提示组件
    fontHintClose() {
      this.fontHintFlag = false;
    },
    // 查询按钮
    refer() {
         if (!(this.loanNo || this.customerName || this.businessDate)) {
            this.$message("请输入查询条件!");
        } else {
            this.reload();
        }
    },
    // 清空按钮
    empty() {
        this.loanNo = ''; // 出账编号
        this.customerName = ''; // 客户姓名
        this.businessDate = '';
    },
    // reload
    reload(pageNum) {
        let data = {
            loanNo: this.loanNo,
            customerName: this.customerName,
            deductDt: this.businessDate
        };
        let current = pageNum || 1;
        this.deductManagementQureyBatchDeductStatus(data, current);
    },
    // 单笔代扣查询列表
    deductManagementQureyBatchDeductStatus(res, current) {
        res = res || {};
        current = current || 1;
        let url = counterDealApi.deductManagementQureyBatchDeductStatus + "?current=" + current + "&size=30";
        this.$MyFetch.post(url, res)
        .then((data = {}) => {
          if (data.records.length < 1) {
              this.fontHintMsg = '查询结果为空'; // 文字提示内容
              this.fontHintFlag = true; // 文字提示开关
            };
            this.for_ = data.records;
            // 总条数
            this.pageConfig.account = data.total || 1;
            // 当前页
            this.pageConfig.currentPage = data.current || 1;
            // 一页有几条数据 pageSize
            this.pageConfig.pageSize = data.size || 30;
        })
        .catch((err) => {
            this.$error(err.message);
        });
    },
    // 分页
    jump(pageNum) {
      this.pageConfig.currentPage = pageNum;
      this.reload(pageNum);
    }
  },
  components: {
    pagination, // 分页组件
    fontHint // 文字提示组件
  },
  created() {}
};
</script>

<style lang="less" scoped>
.referEmptyDiv {
    display: inline-block;
    margin-bottom: 20px;
    margin-left: 20px;
}
.table_box {
  height: 680px;
}
</style>
