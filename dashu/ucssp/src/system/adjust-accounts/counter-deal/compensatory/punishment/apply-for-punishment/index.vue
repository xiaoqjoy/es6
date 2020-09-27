<template>
  <div>
    <div class="content">
      <!-- 新增按钮 -->
      <button class="add" @click="showAdd">+ 新增</button>
      <el-form
        :inline="true"
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <!-- 输入框和下拉框 -->
        <div class="b_content">
          <el-form-item prop="czbh">
            <el-input clearable class="select_72" v-model="ruleForm.czbh" placeholder="出账编号"></el-input>
          </el-form-item>
          <el-form-item prop="customerName">
            <el-input clearable class="select_72" v-model="ruleForm.customerName" placeholder="客户姓名"></el-input>
          </el-form-item>
          <el-form-item prop="cardNumber">
            <el-input clearable class="select_72" v-model="ruleForm.cardNumber" placeholder="身份证号码"></el-input>
          </el-form-item>
          <el-button class="b_button query" @click="compensatoryRelief()">查询</el-button>
          <el-button class="b_button empty" @click="empty">清空</el-button>
        </div>
      </el-form>
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
      <!-- 底部 -->
      <div class="enable">
        <el-button class="t_button import_t" @click="batchImport">批量导入</el-button>
        <el-button class="t_button dead_t" @click="openDelete">删除</el-button>
        <el-button class="t_button initiate_t" @click="openSubmit">提交</el-button>
      </div>
    </div>
    <addApplyForPunishment
      :compensatoryRelief="compensatoryRelief"
      v-if="showIf"
      @close_add="close_addApp"
    />
    <deletedAndSubmitted
      :deleteInterface="deleteInterface"
      :deleteInterface_="present"
      :message="message"
      v-if="showDelete"
      @close_delete="close_deleteApp"
    />
    <batch-import v-if="showBatch" @close="closeBatch"></batch-import>
  </div>
</template>

<script type="text/ecmascript-6">
import pagination from "@components/pagination"; // 分页组件
import addApplyForPunishment from "./addApplyForPunishment/index"; // 引入新增组件
import deletedAndSubmitted from "./deletedAndSubmitted/index"; // 引入删除和提交组件
import batchImport from "./batchImport";
import { checkingApi } from "../../../../js/server"; // 接口
export default {
  data() {
    return {
      message: "", // 删除和提交组件头部的提示
      ruleForm: {
        czbh: "", // 出账编号
        customerName: "", // 客户姓名
        cardNumber: "" // 身份证号码
      },
      rules: {
        czbh: [
          // { required: true, message: "减免本金不能为空", trigger: "blur" }
        ],
        customerName: [
          // { required: true, message: "减免利息不能为空", trigger: "blur" }
        ],
        cardNumber: [
          // { required: true, message: "减免罚息不能为空", trigger: "blur" }
        ]
      },
      showIf: false, // 新增组件默认不显示
      showDelete: false, // 删除和提交组件默认不显示
      selectedRow: [], // 选中复选框
      pageConfig: {
        account: 0, // 总条数
        pageSize: 50, // 当前多少条数据
        currentPage: 1, // 当前页
        showJumpButton: true // 显示跳转按钮
      }, // 分页
      for_: [], // 渲染列表
      showBatch: false
    };
  },
  methods: {
    // 身份证加密
    // cert_no_filters(data) {
    //   let reg = /^(\d{4})\d{10}(\d{4})$/g;
    //   return data.replace(reg, "$1**********$2");
    // },
    closeBatch() {
      this.compensatoryRelief();
      this.showBatch = false;
    },
    cert_no_filters(val) {
      if (val) {
        val = val.split("");
        val.splice(4, 10, "**********");
        return val.join("");
      }
    },
    // 删除接口
    deleteInterface() {
      let selectedData = this.selectedRow;
      for (let i = 0; i < selectedData.length; i++) {
        selectedData[i] = selectedData[i].relateId;
      }
      let url = checkingApi.transPayInfoe;
      let data = {
        transSerialNos: selectedData
      };
      this.$MyFetch
        .post(url, data)
        .then((data = {}) => {
          console.log(data);
          this.showDelete = false;
          this.compensatoryRelief();
          this.confirmFn("删除成功");
        })
        .catch(err => {
          this.$error(err.message);
        });
    },
    batchImport() {
      this.showBatch = true;
    },
    // 打开删除组件
    openDelete() {
      this.message = "是否确认删除选中的申请";
      if (this.selectedRow.length > 0) {
        this.showDelete = true;
      } else {
        this.confirmFn("请先选择要删除的数据");
      }
    },
    // 关闭删除组件
    close_deleteApp() {
      this.showDelete = false;
    },
    // 提交接口
    present() {
      let selectedData = this.selectedRow;
      for (let i = 0; i < selectedData.length; i++) {
        selectedData[i] = selectedData[i].relateId;
      }
      let url = checkingApi.transPayInfof;
      let data = {
        flowNo: "freePayBuyBackFlow",
        transSerialNos: selectedData
      };
      this.$MyFetch
        .post(url, data)
        .then((data = {}) => {
          this.confirmFn("提交成功");
          this.showDelete = false;
          this.compensatoryRelief();
        })
        .catch(err => {
          this.$error(err.message);
        });
    },
    // 打开提交组件
    openSubmit() {
      this.message = "是否提交选中的申请";
      if (this.selectedRow.length > 0) {
        this.showDelete = true;
      } else {
        this.confirmFn("请先选择要提交的数据");
      }
    },
    // 清空查询条件
    empty() {
      this.ruleForm.czbh = "";
      this.ruleForm.customerName = "";
      this.ruleForm.cardNumber = "";
    },
    // 代偿减免查询列表接口
    compensatoryRelief(current) {
      let res = {
        flowNo: "freePayBuyBackFlow",
        phaseNos: ["0010", "0050"],
        loanNo: this.ruleForm.czbh,
        customerName: this.ruleForm.customerName,
        certNo: this.ruleForm.cardNumber
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
    // 打开新增组件
    showAdd() {
      this.showIf = true;
    },
    // 关闭新增组件
    close_addApp() {
      this.showIf = false;
    },
    // 分页
    jump(pageNum) {
      this.pageConfig.currentPage = pageNum;
      this.compensatoryRelief(this.pageConfig.currentPage);
      console.log(pageNum);
    },
    // 选中复选框事件
    handleSelectionChange(data) {
      this.selectedRow = data;
    },
    // 行选中
    rowCheck(row, column, e) {
      this.$refs.multipleTable.toggleRowSelection(row);
    }
  },
  components: {
    pagination, // 分页组件
    addApplyForPunishment, // 新增组件
    deletedAndSubmitted, // 删除和提交组件
    batchImport
  },
  created() {
    this.compensatoryRelief();
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
    margin-right: 30px;
  }
  .enable {
    text-align: center;
    margin-top: 15px;
    margin-bottom: 20px;
    // 停用启用公共样式
    .t_button {
      width: 200px;
      height: 40px;
    }
    .import_t {
      background: #05838e;
      border: 1px solid #05838e;
      border-radius: 4px;
      font-size: 14px;
      color: #ffffff;
      letter-spacing: 1.07px;
      text-align: center;
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
