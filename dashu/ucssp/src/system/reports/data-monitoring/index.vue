<template>
  <div>
    <div class="content">
      <!-- 输入框和下拉框 -->
      <div class="b_content">
        <el-date-picker
          class="select_72"
          v-model="beginDate"
          type="date"
          placeholder="开始时间"
          value-format="yyyy-MM-dd"
          :clearable="false"
        ></el-date-picker>
        <el-date-picker
          class="select_72"
          v-model="endDate"
          type="date"
          placeholder="结束时间"
          value-format="yyyy-MM-dd"
          :clearable="false"
        ></el-date-picker>
        <el-select
          class="select_72"
          v-model="thirdType"
          placeholder="三方渠道"
          @change="dropDownData('variableCode', thirdType?thirdType:'*'),dropDownData('indexCode', thirdType?thirdType:'*')"
          filterable
          clearable
        >
          <el-option
            v-for="item in third_data"
            :key="item.itemno"
            :label="item.itemnoName"
            :value="item.itemno"
          ></el-option>
        </el-select>
        <el-select
          class="select_72"
          v-model="variableName"
          @change="dropDownData('indexCode', variableName?variableName:thirdType)"
          placeholder="三方变量"
          filterable
          clearable
        >
          <el-option
            v-for="item in variableName_data"
            :key="item.itemno"
            :label="item.itemnoName"
            :value="item.itemno"
          ></el-option>
        </el-select>
        <el-select
          class="select_72"
          v-model="indexCode"
          @change="dropDownData('systemCode', indexCode)"
          placeholder="指标"
          filterable
          clearable
        >
          <el-option
            v-for="item in indexCode_data"
            :key="item.itemno"
            :label="item.itemnoName"
            :value="item.itemno"
          ></el-option>
        </el-select>
        <el-select class="select_72" v-model="systemType" placeholder="业务渠道" filterable clearable>
          <el-option
            v-for="item in systemType_data"
            :key="item.itemno"
            :label="item.itemnoName"
            :value="item.itemno"
          ></el-option>
        </el-select>
        <el-button class="b_button query" @click="refer(1, 50)">查询</el-button>
        <el-button class="b_button empty" @click="empty()">清空</el-button>
        <el-button class="b_button query" @click="exportData()">导出</el-button>
        <span class="result">{{variableNameExplain}}</span>
      </div>
      <!-- 表格 -->
      <div class="tables">
        <el-table
          v-if="type === 0"
          :data="taskList">
            <el-table-column
              label="数据源"
              prop="thirdTypeName">
            </el-table-column>
            <el-table-column
              label="三方变量名"
              prop="variableName">
            </el-table-column>
            <el-table-column
              label="三方变量含义"
              prop="variableNameDesc">
            </el-table-column>
            <el-table-column
              label="监控指标"
              prop="monitorIndex">
            </el-table-column>
            <el-table-column
              label="日期"
              prop="date">
            </el-table-column>
            <el-table-column
              label="当天累计笔数"
              prop="totalNum">
            </el-table-column>
            <el-table-column
              label="分段统计周期"
              prop="statisticalPeriod">
            </el-table-column>
            <el-table-column
              label="统计节点"
              prop="statisticalNode">
            </el-table-column>
            <el-table-column
              label="指标数值"
              prop="num">
            </el-table-column>
        </el-table>
        <el-table
          v-if="type === 1 || type === 2"
          :data="taskList">
            <el-table-column
              label="业务渠道"
              prop="systemTypeName">
            </el-table-column>
            <el-table-column
              label="监控指标"
              prop="monitorIndex">
            </el-table-column>
            <el-table-column
              label="日期"
              prop="date">
            </el-table-column>
            <el-table-column
              v-if="type === 2"
              label="分公司"
              prop="branchCompany">
            </el-table-column>
            <el-table-column
              label="分段统计周期"
              prop="statisticalPeriod">
            </el-table-column>
            <el-table-column
              label="统计节点"
              prop="statisticalNode">
            </el-table-column>
            <el-table-column
              label="指标数值"
              prop="num">
            </el-table-column>
        </el-table>
      </div>
      <pagination @jump-page="jump" :page="pageConfig" class="pagination"></pagination>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import pagination from "@components/pagination"; // 分页组件
import { reportsApi } from "../js/server.js"; // 接口
export default {
  data() {
    return {
      type: 0,
      variableNameExplain: "",
      beginDate: this.getNowFormatDate(),
      endDate: this.getNowFormatDate(),
      thirdType: "",
      indexCode: "",
      variableName: "",
      systemType: "",
      switchover: "",
      taskList: [],
      third_data: [], // 三方渠道下拉框内容
      indexCode_data: [], // 指标下拉框内容
      variableName_data: [], // 三方变量下拉框内容
      systemType_data: [], // 业务渠道下拉框内容
      head_data: [],
      filiale_data: [],
      organizationId: [],
      pageConfig: {
        account: 0, // 总条数
        pageSize: 50, // 当前多少条数据
        currentPage: 1, // 当前页
        showJumpButton: true // 显示跳转按钮
      } // 分页
    };
  },
  methods: {
    jump(pageNum) {
      this.pageConfig.currentPage = pageNum;
      this.refer(this.pageConfig.currentPage, 50);
      // this.defaultList(this.pageConfig.currentPage);
    },
    empty() {
      // this.beginDate = "";
      this.thirdType = "";
      this.indexCode = "";
      this.systemType = "";
      this.variableName = "";
      this.dropDownData("thirdCode", "*");
      this.dropDownData("indexCode", "*");
      this.variableName_data = [];
      this.systemType_data = [];
    },
    // 查询下拉框里的内容
    dropDownData(codeno, parentType) {
      let url = reportsApi.getCascadeCode;
      let data = {
        codeno,
        parentType
      };
      this.$MyFetch
        .post(url, data)
        .then((data = {}) => {
          console.log(data);
          if (codeno === "thirdCode") {
            this.third_data = data;
          } else if (codeno === "variableCode") {
            this.variableName = "";
            this.variableName_data = data;
          } else if (codeno === "indexCode") {
            this.indexCode = "";
            this.indexCode_data = data;
          } else if (codeno === "systemCode") {
            this.systemType = "";
            this.systemType_data = data;
          }
        })
        .catch(err => {
          this.$error(err.message);
        });
    },
    // 获取当前日期
    getNowFormatDate() {
      var date = new Date();
      var seperator1 = "-";
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      var strDate = date.getDate();
      if (month >= 1 && month <= 9) {
        month = "0" + month;
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
      }
      var currentdate = year + seperator1 + month + seperator1 + strDate;
      return currentdate;
    },
    exportData () {
      let url = reportsApi.monitorReportexport;
      let data = {
          beginDate: this.beginDate,
          endDate: this.endDate,
          thirdType: this.thirdType,
          indexCode: this.indexCode,
          systemType: this.systemType,
          variableName: this.variableName
        };
      let loading = this.$loading({
        text: "",
        spinner: "",
        background: "transparent"
      });
      this.$MyFetch
        .post(
          url,
          data,
          "blob"
        )
        .then(res => {
          this.$download(res);
          loading.close();
        })
        .catch(err => {
          this.$error(err.message);
          loading.close();
        });
    },
    // 查询接口
    refer(page, pageSize) {
      if (new Date(this.beginDate).getTime() > new Date(this.endDate).getTime()) {
        this.$error("起始时间不能大于结束时间！");
        return false;
      }
      this.head_data = [];
      let url = reportsApi.monitorReportQuery;
      let data = {
          beginDate: this.beginDate,
          endDate: this.endDate,
          thirdType: this.thirdType,
          indexCode: this.indexCode,
          systemType: this.systemType,
          variableName: this.variableName,
          pageNum: page - 1, // 当前页
          pageSize: pageSize // 当前多少条数据
        };

      this.switchover = data.indexCode;
      this.$MyFetch
        .post(url, data)
        .then((data = {}) => {
          console.log(data);
          this.variableNameExplain = data.variableNameExplain || "";
          if (this.indexCode === "SQTZ5") {
            this.type = 1;
          } else if (this.indexCode === "SQTZ30") {
            this.type = 2;
          } else {
            this.type = 0;
          }
          this.taskList = data.content;
          this.pageConfig.account = data.totalElements;
          this.pageConfig.currentPage = data.pageNum + 1;
        })
        .catch(err => {
          this.$error(err.message);
        });
    }
  },
  components: {
    pagination
  },
  created() {
    this.dropDownData("thirdCode", "*");
    this.dropDownData("indexCode", "*");
  }
};
</script>

<style lang="less" rel="stylesheet/less" scoped>
// 中间部分
.content {
  padding: 20px;
  min-height: 850px;
  border-radius: 4px;
  background: #fff;
  box-shadow: 1px 2px 20px #ccc;
  overflow: hidden;
  // 新增按钮
  // 输入框和下拉框部分样式
  .b_content {
    text-align: left;
    // height: 40px;
    margin-left: 18px;
    // 输入框和下拉框172*40
    .select_72 {
      width: 172px;
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
    .span {
      // position: absolute;
    }
    .effective {
      left: 25.3%;
      top: 8%;
      font-size: 12px;
      color: #bbbbbb;
      letter-spacing: 1.09px;
    }
    .transverse {
      left: 35.1%;
      top: 12.5%;
      color: #bbbbbb;
      margin-right: 15px;
    }
  }
  // 表格总体样式
  .tables {
    overflow-y: auto;
    overflow-x: hidden;
    height: 641px;
    width: 97%;
    margin: 0px auto;
    border: 1px solid #d0d0d0;
    margin-top: 21px;
    border-radius: 4px;
    .editor {
      font-size: 14px;
      color: #4a90e2;
      letter-spacing: 0;
    }
    .delete {
      font-size: 14px;
      color: #f55f5f;
      letter-spacing: 0;
      margin-left: 20px;
    }
    .el-table {
      .yincan {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
    }
    /deep/.el-table {
      th {
        padding: 0px 0;
      }
    }
  }
  /deep/.tables
    .el-table
    .el-table__body-wrapper
    .el-table__empty-block
    .el-table__empty-text {
    width: 50%;
    color: #909399;
    line-height: 60px;
  }
  .pagination {
    margin: 20px 30px 0 0;
  }
  .result {
    width: 110px;
    display: inline-block;
    word-break: break-all;
    line-height: 15px;
    font-size: 14px;
    margin-left: 10px;
  }
}
</style>
