<template>
  <div>
    <div class="content">
      <button class="add" @click="add_alert()">+ 新增</button>
      <!-- 输入框和下拉框 -->
      <div class="b_content">
        <el-select class="select_72" v-model="value1"  placeholder="审批类型">
            <el-option v-for="item in approve_input"
                :key="item.name"
                :label="item.name"
                :value="item.name">
            </el-option>
        </el-select>
        <el-select class="select_72" v-model="value2"  placeholder="业务类型">
            <el-option v-for="item in business_input"
                :key="item.name"
                :label="item.name"
                :value="item.name">
            </el-option>
        </el-select>
        <el-button class="b_button query">查询</el-button>
        <el-button class="b_button empty">清空</el-button>
      </div>
      <!-- 表格 -->
      <div class="tables">
        <el-table
          :default-sort = "{prop: 'date', order: 'descending'}"
          :header-cell-style="{'font-size':'12px','text-align':'center','height':'38.9px','background':'#F9FAFB'}"
          ref="multipleTable"
          :data="tableData"
          tooltip-effect="dark"
          style="width: 100%">
          <el-table-column
            sortable
            prop="ywxz"
            label="业务小组">
          </el-table-column>
          <el-table-column
            sortable
            prop="yhmc"
            label="用户名称">
          </el-table-column>
          <el-table-column
            sortable
            prop="kssxrq"
            label="开始生效日期">
          </el-table-column>
            <el-table-column
            sortable
            prop="jsrq"
            label="结束日期">
          </el-table-column>
          <el-table-column
            prop="operation"
            label="操作">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="edit_alert()">编辑</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <pagination @jump-page='jump' :page='pageConfig' class="pagination"></pagination>
    </div>
    <addConfigGroup v-if="alert_" @clsoe_windowAlert='close_1' />
    <editConfigGroup v-if="alert_e" @clsoe_windowAlert_e='close_1_e' />
  </div>
</template>

<script type="text/ecmascript-6">
import pagination from "@components/pagination"; // 分页组件
import addConfigGroup from "../config-group/addConfigGroup/"; // 新增配置分组组件
import editConfigGroup from "../config-group/editConfigGroup/"; // 编辑配置分组组件
export default {
  data() {
    return {
      value1: "",
      value2: "",
      alert_: false, // 新增配置分组
      alert_e: false, // 编辑配置分组
      pageConfig: {
        account: 0, // 总条数
        pageSize: 10, // 当前多少条数据
        currentPage: 1, // 当前页
        showJumpButton: true // 显示跳转按钮
      }, // 分页
      tableData: [
        {
          ywxz: "1",
          yhmc: "1",
          kssxrq: "1",
          jsrq: "1"
        }
      ],
      approve_input: [
        {name: "审批分组"},
        {name: "审批不分组"}
      ],
      business_input: [
        {name: "业务分组"},
        {name: "业务不分组"}
      ]
    };
  },
  methods: {
    // 分页
    jump(pageNum) {
      this.pageConfig.currentPage = pageNum;
    },
    // 打开新增配置分组
    add_alert() {
      this.alert_ = true;
    },
    // 关闭新增授配置分组
    close_1() {
      this.alert_ = false;
    },
    // 打开编辑配置分组
    edit_alert() {
      this.alert_e = true;
    },
    // 关闭编辑配置分组
    close_1_e() {
      this.alert_e = false;
    }
  },
  components: {
    pagination, // 分页组件
    addConfigGroup, // 新增授权人员组件
    editConfigGroup
  }
};
</script>

<style lang="less" rel="stylesheet/less" scoped>
/deep/ .el-tabs__nav-wrap {
  -webkit-box-shadow: 1px 2px 20px #ccc;
  box-shadow: 1px 2px 20px #ccc;
  padding-left: 30px;
  padding-top: 10px;
  border-radius: 4px;
}
/deep/ .el-tabs__nav-wrap .el-tabs__item.is-active {
  font-family: PingFangSC-Semibold;
  font-size: 18px;
  color: #538bf1;
  letter-spacing: 1.38px;
}
/deep/ .el-tabs__nav-wrap .el-tabs__item.is-active .el-tabs__item {
  font-family: PingFangSC-Regular;
  font-size: 16px;
  color: #333333;
  letter-spacing: 1.22px;
  text-align: center;
}
// 中间部分
.content {
  height: 780px;
  border-radius: 4px;
  background: #fff;
  box-shadow: 1px 2px 20px #ccc;
  overflow: hidden;
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
    height: 60px;
    margin-left: 28px;
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
  }
  // 表格总体样式
  .tables {
    overflow-y: auto;
    overflow-x: hidden;
    height: 400px;
    width: 1622px;
    margin: 0px auto;
    border: 1px solid #e5e5e5;
    margin-top: 21px;
    border-radius: 4px;
  }
  .pagination {
    margin-top: 40px;
    margin-right: 30px;
  }
  // 去掉element表格的默认全选按钮
  .tables /deep/ th .el-checkbox {
    display: none;
  }
}
</style>
