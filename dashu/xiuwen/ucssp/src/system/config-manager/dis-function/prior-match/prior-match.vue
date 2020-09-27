<template>
  <div>
    <div class="content">
      <!-- 新增按钮 -->
      <button class="add" @click="add_alert()">+ 新增</button>
      <!-- 表格 -->
      <div class="tables">
        <el-table @row-click="clickRow" :default-sort="{prop: 'date', order: 'descending'}" :header-cell-style="{'font-size':'12px','text-align':'center','height':'38.9px','background':'#F9FAFB'}" ref="multipleTable" :data="for_" tooltip-effect="dark" style="width: 100%" @select="select" @selection-change="handleSelectionChange">
          <el-table-column type="selection">
          </el-table-column>
          <el-table-column prop="itemSort" label="序号">
          </el-table-column>
          <el-table-column prop="priorityReasons" label="优先原因">
            <template slot-scope="scope">
              <span>{{(scope.row.priorityReasons === "//") ? '':scope.row.priorityReasons}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="effectiveStartDate" label="开始生效日期">
          </el-table-column>
          <el-table-column prop="effectiveEndDate" label="结束日期">
          </el-table-column>
          <el-table-column prop="statusInd" label="状态">
          </el-table-column>
          <el-table-column prop="createdByName" label="登记人员">
          </el-table-column>
          <el-table-column prop="createdDate" label="登记时间">
          </el-table-column>
          <el-table-column prop="updatedByName" label="更新人员">
          </el-table-column>
          <el-table-column prop="updatedDate" label="更新时间">
          </el-table-column>
          <el-table-column prop="operation" label="操作">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="edit_alert(scope.row)">编辑</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <pagination @jump-page='jump' :page='pageConfig' class="pagination"></pagination>
      <div class="enable">
        <el-button :fn="outage" class="t_button dead_t" @click="invalid_fun">停用</el-button>
        <el-button class="t_button initiate_t" @click="used_fun">启用</el-button>
      </div>
    </div>
    <addPriorMatch v-if="alert_" :refer="refer" @clsoe_windowAlert='close_1' />
    <editPriorMatch v-if="alert_e" :refer="refer" :compile="compile" @clsoe_windowAlert_e='close_1_e' />
    <promSelect v-if="isSelect" @clsoe_windowIsSelect='console_isSelect' />
    <deadStatus :fn_t='deadText' :refer="refer" :message="message" v-if="invalid" @clsoe_windowinvalid='console_invalid' />
    <startUsing :fn_q='initiateText' :refer="refer" :message_="message_" v-if="used" @clsoe_windowused='console_used' />
  </div>
</template>

<script type="text/ecmascript-6">
import addPriorMatch from "../prior-match/addPriorMatch/"; // 新增业务优先配置组件
import editPriorMatch from "../prior-match/editPriorMatch/"; // 编辑业务优先配置组件
import promSelect from "../../person-config/prom-select/"; // 停用提示组件
import deadStatus from "../../person-config/dead-status/"; // 停用组件
import startUsing from "./start-using"; // 启用组件
import { configApi } from "../../js/server"; // 接口
import pagination from "@components/pagination"; // 分页组件
export default {
  data() {
    return {
      message: "", // 停用弹框提示
      message_: "", // 启用弹框提示
      for_: [], // 渲染列表
      alert_: false, // 新增业务优先配置组件
      alert_e: false, // 编辑业务优先配置组件
      isSelect: false, // 是否选择表格数据
      invalid: false, // 停用
      used: false, // 启用
      selectedRow: [], // 复选框是否选中
      compile: [], // 传给编辑页面数据
      pageConfig: {
        account: 0, // 总条数
        pageSize: 10, // 当前多少条数据
        currentPage: 1, // 当前页
        showJumpButton: true // 显示跳转按钮
      } // 分页
    };
  },
  methods: {
    // 打开新增业务优先配置
    add_alert() {
      this.alert_ = true;
    },
    // 关闭新增业务优先配置
    close_1() {
      this.alert_ = false;
    },
    clickRow(row) {
      this.$refs.multipleTable.toggleRowSelection(row);
      this.message = "是否停用配置";
      this.message_ = "是否启用配置";
    },
    // 分页
    jump(pageNum) {
      this.pageConfig.currentPage = pageNum;
      this.refer(this.pageConfig.currentPage);
      // this.defaultList(this.pageConfig.currentPage);
    },
    // 打开编辑业务优先配置
    edit_alert(detail) {
      this.alert_e = true;
      this.compile = detail;
    },
    // 关闭编辑业务优先配置
    close_1_e() {
      this.alert_e = false;
    },
    // 选中复选框事件
    handleSelectionChange(data) {
      this.multipleSelection = data;
            if (this.multipleSelection.length > 1) {
                this.$refs.multipleTable.toggleRowSelection(this.multipleSelection[0]);
                console.log(this.multipleSelection[0]);
            }
      this.selectedRow = data;
    },
    // 只能选择其中一个复选框事件
    select(selection, row) {
      if (selection.length > 1) {
        selection.shift();
      }
      this.message = "是否停用配置";
      this.message_ = "是否启用配置";
    },
    // 关闭提示信息组件
    console_isSelect() {
      this.isSelect = false;
    },
    // 关闭停用组件
    console_invalid() {
      this.invalid = false;
    },
    // 关闭启用组件
    console_used() {
      this.used = false;
    },
    // 停用接口
    outage() {
      let url = configApi.businessPriority_change;
      let data = {};
      this.$MyFetch
        .post(url, data)
        .then((data = {}) => {
          console.log(data);
        })
        .catch(err => {
          this.$error(err.message);
        });
    },
    // 打开停用组件
    invalid_fun() {
      // 判断复选框是否选中，选中弹停用组件
      if (this.selectedRow.length > 0) {
        this.invalid = true;
      } else {
        this.isSelect = true;
      }
    },
    // 停用接口
    deadText() {
      let selectedData = this.selectedRow;
      for (let i = 0; i < selectedData.length; i++) {
        selectedData[i] = selectedData[i].id;
      }
      let data = {
        ids: [selectedData[selectedData.length - 1]],
        operateBy: "string",
        statusInd: false
      };
      let url = configApi.businessPriority_change;
      this.$MyFetch
        .post(url, data)
        .then((data = {}) => {
          console.log(data);
          console.log(selectedData);
          this.refer(1);
        })
        .catch(err => {
          this.$error(err.message);
        });
    },
    // 启用接口
    initiateText() {
      let selectedData = this.selectedRow;
      for (let i = 0; i < selectedData.length; i++) {
        selectedData[i] = selectedData[i].id;
      }
      let data = {
        ids: [selectedData[selectedData.length - 1]],
        operateBy: "string",
        statusInd: true
      };
      let url = configApi.businessPriority_change;
      this.$MyFetch
        .post(url, data)
        .then((data = {}) => {
          console.log(data);
          this.confirmFn("启用成功", "success");
          this.refer(1);
        })
        .catch(err => {
          this.$error(err.message);
          // this.$error("请先停用有效模块后再启用");
        });
    },
    // 打开启用组件
    used_fun() {
      // 判断复选框是否选中，选中弹启用组件
      if (this.selectedRow.length > 0) {
        this.used = true;
      } else {
        this.isSelect = true;
      }
    },
    // 查询审批业务优先配置列表接口
    refer(pageNum) {
      let url = configApi.businessPriority_list;
      let data = {
        pageNum: pageNum, // 当前页
        pageSize: this.pageConfig.pageSize // 当前多少条数据
      };
      this.$MyFetch
        .get(url, data)
        .then((data = {}) => {
          console.log(data);
          // 序号
          let forData = data.list;
          for (let i = 0; i < forData.length; i++) {
            forData[i]["itemSort"] = data.startRow + i;
          }
          this.pageConfig.account = data.total;
          this.pageConfig.currentPage = data.pageNum;
          for (let i = 0; i < forData.length; i++) {
            if (forData[i].statusInd === true) {
              forData[i].statusInd = "有效";
            } else if (forData[i].statusInd === false) {
              forData[i].statusInd = "停用";
            }
          }
          this.for_ = forData;
        })
        .catch(err => {
          this.$error(err.message);
        });
    }
  },
  components: {
    addPriorMatch,
    editPriorMatch,
    promSelect,
    deadStatus,
    startUsing,
    pagination
  },
  created() {
    this.refer(1);
  }
};
</script>

<style lang="less" rel="stylesheet/less" scoped>
// 中间部分
.content {
  // height: 830px;
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
  // 表格总体样式
  .tables {
    overflow-y: auto;
    overflow-x: hidden;
    // height: 550px;
    width: 97%;
    margin: 0px auto;
    border: 1px solid #e5e5e5;
    margin-top: 21px;
    border-radius: 4px;
  }
  .enable {
    text-align: center;
    margin-top: 30px;
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
      border: 1px solid #538bf1;
    }
  }
  // 去掉element表格的默认全选按钮
  .tables /deep/ th .el-checkbox {
    display: none;
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
    margin-right: 30px;
    margin-top: 40px;
  }
}
</style>
