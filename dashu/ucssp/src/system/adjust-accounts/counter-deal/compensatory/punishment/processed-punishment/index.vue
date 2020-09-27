<template>
  <div>
    <div class="content">
      <!-- 输入框和下拉框 -->
      <div class="b_content">
        <el-form
          :inline="true"
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item prop="czbh">
            <el-input clearable class="select_72" v-model="ruleForm.czbh" placeholder="出账编号"></el-input>
          </el-form-item>
          <el-form-item prop="customerName">
            <el-input
              clearable
              class="select_72"
              v-model="ruleForm.customerName"
              placeholder="客户姓名"
            ></el-input>
          </el-form-item>
          <el-form-item prop="cooperationAgency">
            <el-input
              clearable
              class="select_72"
              v-model="ruleForm.cooperationAgency"
              placeholder="合作机构"
            ></el-input>
          </el-form-item>
          <el-form-item prop="cardNumber">
            <el-input clearable class="select_72" v-model="ruleForm.cardNumber" placeholder="身份证号码"></el-input>
          </el-form-item>
          <!-- 案件状态 -->
          <el-select clearable v-model="ChannelValue" class="select_72" placeholder="案件状态">
            <el-option
              v-for="(item, index) in ChannelList"
              :key="index"
              :label="item.phaseName"
              :value="item.phaseNo"
            ></el-option>
          </el-select>
          <el-form-item>
            <el-date-picker
              v-model="ruleForm.buybackDate"
              lign="left"
              type="daterange"
              :editable="false"
              value-format="yyyy-MM-dd"
              range-separator="至"
              start-placeholder="记账日期(起)"
              end-placeholder="记账日期(终)"
            ></el-date-picker>
          </el-form-item>
          <el-button class="b_button query" @click="compensatoryRelief()">查询</el-button>
          <el-button class="b_button empty" @click="empty">清空</el-button>
        </el-form>
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
        >
          <el-table-column width="200" prop="loanNo" label="出账编号"></el-table-column>
          <el-table-column prop="customerName" label="客户姓名"></el-table-column>
          <el-table-column width="200" prop="certNo" label="身份证号码">
            <template slot-scope="scope">
              <span>{{cert_no_filters(scope.row.certNo)}}</span>
            </template>
          </el-table-column>
          <el-table-column width="150" prop="lineidName" label="合作机构"></el-table-column>
          <el-table-column width="100" prop="accDate" label="记账日期"></el-table-column>
          <el-table-column width="100" prop="sumMoney" label="减免合计"></el-table-column>
          <el-table-column width="100" prop="buyCorp" label="减免本金"></el-table-column>
          <el-table-column width="100" prop="buyInte" label="减免利息"></el-table-column>
          <el-table-column width="100" prop="buyFine" label="减免罚息"></el-table-column>
          <el-table-column width="100" prop="buyCompound" label="减免复利"></el-table-column>
          <el-table-column width="100" prop="buyInsurance" label="减免保险费"></el-table-column>
          <el-table-column width="150" prop="buyDsfConsult" label="减免咨询费（评审费）"></el-table-column>
          <el-table-column width="150" prop="buyDsfGuarantee" label="减免管理费（担保费）"></el-table-column>
          <el-table-column width="150" prop="payMoney" label="减免资金占用费"></el-table-column>
          <el-table-column prop="phaseName" label="案件状态"></el-table-column>
        </el-table>
      </div>
      <pagination @jump-page="jump" :page="pageConfig" class="pagination"></pagination>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import pagination from "@components/pagination"; // 分页组件
import { checkingApi } from "../../../../js/server"; // 接口
export default {
  data() {
    return {
      ChannelValue: "", // 案件状态绑定值
      ChannelList: [], // 案件状态下拉
      ruleForm: {
        czbh: "", // 出账编号
        customerName: "", // 客户姓名
        cooperationAgency: "", // 合作机构
        cardNumber: "", // 身份证号码
        buybackDate: "" // 记账日期
      },
      rules: {
        czbh: [
          // { required: true, message: "减免本金不能为空", trigger: "blur" }
        ],
        customerName: [
          // { required: true, message: "减免利息不能为空", trigger: "blur" }
        ],
        cooperationAgency: [
          // { required: true, message: "合作机构不能为空", trigger: "blur" }
        ],
        cardNumber: [
          // { required: true, message: "减免罚息不能为空", trigger: "blur" }
        ]
      },
      pageConfig: {
        account: 0, // 总条数
        pageSize: 50, // 当前多少条数据
        currentPage: 1, // 当前页
        showJumpButton: true // 显示跳转按钮
      }, // 分页
      for_: [] // 渲染列表
    };
  },
  methods: {
    // 案件状态下拉
    phaseNameChannelLists(res) {
      res = res || {};
      this.$MyFetch
        .post(checkingApi.PhaseNameList, res)
        .then((data = {}) => {
          this.ChannelList = data;
        })
        .catch(err => {
          this.$error(err.message);
        });
    },
    // 身份证加密
    // cert_no_filters(data) {
    //   let reg = /^(\d{4})\d{10}(\d{4})$/g;
    //   return data.replace(reg, "$1**********$2");
    // },
    cert_no_filters(val) {
      if (val) {
        val = val.split("");
        val.splice(4, 10, "**********");
        return val.join("");
      }
    },
    // 代偿减免查询列表接口
    compensatoryRelief(current) {
      let res = {
        flowNo: "freePayBuyBackFlow",
        phaseNos: ["0010", "0020", "0050", "0060", "0030", "1000", "2000"],
        loanNo: this.ruleForm.czbh,
        customerName: this.ruleForm.customerName,
        lineidName: this.ruleForm.cooperationAgency,
        certNo: this.ruleForm.cardNumber,
        buybackBeginDate: this.ruleForm.buybackDate
          ? this.ruleForm.buybackDate[0]
          : "",
        buybackEndDate: this.ruleForm.buybackDate
          ? this.ruleForm.buybackDate[1]
          : "",
        phaseNo: this.ChannelValue
      };
      current = current || 1;
      let url = checkingApi.transPayInfob + "?current=" + current + "&size=50";
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
          console.log(err);
          this.$error(err.message);
        });
    },
    // 清空查询条件
    empty() {
      this.ruleForm.czbh = "";
      this.ruleForm.customerName = "";
      this.ruleForm.cooperationAgency = "";
      this.ruleForm.cardNumber = "";
      this.ruleForm.buybackDate = "";
      this.ChannelValue = "";
    },
    // 分页
    jump(pageNum) {
      this.pageConfig.currentPage = pageNum;
      this.compensatoryRelief(this.pageConfig.currentPage);
      console.log(pageNum);
    },
    // 选中复选框事件
    handleSelectionChange(data) {
      console.log(data);
    }
  },
  components: {
    pagination // 分页组件
  },
  created() {
    this.compensatoryRelief();
    this.phaseNameChannelLists({ flowNo: "freePayBuyBackFlow" });
  }
};
</script>

<style lang="less" rel="stylesheet/less" scoped>
// 中间部分
.content {
  height: 836px;
  border-radius: 4px;
  background: #fff;
  box-shadow: 1px 2px 20px #ccc;
  overflow: auto;
  // 新增按钮
  .add {
    width: 100px;
    height: 40px;
    border: none;
    background: #538bf1;
    border-radius: 4px;
    color: #fff;
    display: block;
    cursor: pointer;
    margin: 20px 30px;
  }
  // 输入框和下拉框部分样式
  .b_content {
    margin-top: 30px;
    text-align: left;
    // height: 60px;
    margin-left: 28px;
    // 输入框和下拉框162*40
    .select_72 {
      width: 162px;
      height: 40px;
      margin-right: 15px;
    }
    .select_722 {
      width: 240px;
      height: 40px;
      margin-right: 15px;
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
    // height: 400px;
    width: 97%;
    margin: 0px auto;
    border: 1px solid #d0d0d0;
    margin-top: 21px;
    border-radius: 4px;
  }
  .pagination {
    margin-top: 40px;
    margin-bottom: 20px;
    margin-right: 30px;
  }
  .enable {
    text-align: center;
    margin-top: 80px;
    // 停用启用公共样式
    .t_button {
      width: 200px;
      height: 40px;
    }
    .dead_t {
      background: #eeb352;
      border-radius: 4px;
      font-size: 14px;
      color: #ffffff;
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
