<template>
  <div>
    <div class="content">
      <!-- 表格 -->
      <div class="tables">
        <el-table
          :default-sort = "{prop: 'date', order: 'descending'}"
          :header-cell-style="{'font-size':'12px','text-align':'center','height':'38.9px','background':'#ececec'}"
          ref="multipleTable"
          :data="for_"
          tooltip-effect="dark"
          style="width: 100%"
          @row-click="clickRow"
          @select="select"
          @selection-change="handleSelectionChange">
          <el-table-column
            type="selection">
          </el-table-column>
          <el-table-column
            prop="itemSort"
            label="序号">
          </el-table-column>
          <el-table-column
            prop="limitType"
            label="阶段">
          </el-table-column>
          <el-table-column
            prop="businessLimitCnt"
            label="业务量限制笔数">
          </el-table-column>
          <el-table-column
            prop="investigationLimitCnt"
            label="调查量限制笔数">
          </el-table-column>
            <el-table-column
            prop="statusInd"
            label="状态">
            <template slot-scope="scope">
              <span>{{scope.row.statusInd ? '有效' : '停用'}}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="createdByName"
            label="登记人员">
          </el-table-column>
            <el-table-column
            prop="createdDate"
            label="登记时间">
          </el-table-column>
          <el-table-column
            prop="updatedByName"
            label="更新人员">
          </el-table-column>
          <el-table-column
            prop="updatedDate"
            label="更新时间">
          </el-table-column>
          <el-table-column
            prop="operation"
            fixed="right"
            label="操作">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="edit_alert(scope.row)">编辑</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <pagination @jump-page='jump' :page='pageConfig' class="pagination"></pagination>
      <!-- 底部 -->
      <div class="enable">
        <el-button class="t_button dead_t" @click="invalid_fun">停用</el-button>
        <el-button class="t_button initiate_t" @click="used_fun">启用</el-button>
      </div>
    </div>
    <editBusLimited :refer="refer" :current_data='currentXqData' :list_="list"  v-if="alert_e" @clsoe_windowAlert_e='close_1_e' :current_list='currentList' />
    <promSelect v-if="isSelect" @clsoe_windowIsSelect='console_isSelect' />
    <deadStatus :fn_t='deadText' :message="message" v-if="invalid" @clsoe_windowinvalid='console_invalid' />
    <startUsing :fn_q='initiateText' :message_="message_" v-if="used" @clsoe_windowused='console_used' />
  </div>
</template>

<script type="text/ecmascript-6">
import pagination from "@components/pagination"; // 分页组件
import editBusLimited from "../busines-limited/editBusLimit/";
import promSelect from "../../person-config/prom-select/"; // 停用提示组件
import deadStatus from "../../person-config/dead-status/"; // 停用组件
import startUsing from "../../person-config/start-using/"; // 启用组件
import { configApi } from "../../js/server"; // 接口
export default {
  data() {
    return {
      pageConfig: {
        account: 0, // 总条数
        pageSize: 10, // 当前多少条数据
        currentPage: 1, // 当前页
        showJumpButton: true // 显示跳转按钮
      }, // 分页
      message: "", // 停用弹框提示
      message_: "", // 启用弹框提示
      for_: [], // 渲染列表
      list: {}, // 渲染详情
      currentXqData: null, // 传数据ID的值到编辑接口
      currentList: [], // 判断详情页面有没有改变
      alert_e: false, // 编辑业务限量
      isSelect: false, // 是否选择表格数据
      invalid: false, // 停用
      used: false, // 启用
      selectedRow: [] // 复选框是否选中
    };
  },
  methods: {
    // 分页
    jump(pageNum) {
      this.pageConfig.currentPage = pageNum;
      this.refer(this.pageConfig.currentPage);
    },
    // 打开编辑业务限量
    edit_alert(detail) {
      this.list = detail;
      this.currentXqData = detail.id;
      this.currentList = Object.assign({}, this.list);
      this.alert_e = true;
    },
    // 关闭编辑业务限量
    close_1_e() {
      this.alert_e = false;
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
    // 打开启用组件
    used_fun() {
      // 判断复选框是否选中，选中启用组件
      if (this.selectedRow.length > 0) {
        this.used = true;
      } else {
        this.isSelect = true;
      }
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
    // 选中复选框事件
    handleSelectionChange(data) {
      this.multipleSelection = data;
      if (this.multipleSelection.length > 1) {
          this.$refs.multipleTable.toggleRowSelection(this.multipleSelection[0]);
      }
      this.selectedRow = data;
    },
    // 行选中
    clickRow(row) {
      this.$refs.multipleTable.toggleRowSelection(row);
      this.message = "是否停用" + "[" + row.limitType + "]" + "的限制笔数";
      this.message_ = "是否启用" + "[" + row.limitType + "]" + "的限制笔数";
    },
    // 只能选择其中一个复选框事件
    select(selection, row) {
      if (selection.length > 1) {
        selection.shift();
      }
      this.message = "是否停用" + "[" + row.limitType + "]" + "的限制笔数";
      this.message_ = "是否启用" + "[" + row.limitType + "]" + "的限制笔数";
    },
    // 查询业务量限制列表接口
    refer(pageNum) {
      let data = {
        pageNum: pageNum, // 当前页
        pageSize: this.pageConfig.pageSize // 当前多少条数据
      };
      let url = configApi.businessLimit_list;
      this.$MyFetch
        .get(url, data)
        .then((data = {}) => {
          let for_ = data.list;
          for (let i = 0; i < for_.length; i++) {
            for_[i]["itemSort"] = data.startRow + i;
          }
          this.for_ = for_;
          this.pageConfig.account = data.total;
          this.pageConfig.currentPage = data.pageNum;
        })
        .catch(err => {
          this.$error(err.message);
        });
    },
    // 停用接口
    deadText() {
      let selectedData = this.selectedRow;
      for (let i = 0; i < selectedData.length; i++) {
        selectedData[i] = selectedData[i].id;
      }
      let data = {
        ids: [selectedData[selectedData.length - 1]],
        statusInd: false
      };
      let url = configApi.businessLimit_change;
      this.$MyFetch
        .post(url, data)
        .then((data = {}) => {
          console.log(data);
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
        statusInd: true
      };
      console.log(data.ids);
      let url = configApi.businessLimit_change;
      this.$MyFetch
        .post(url, data)
        .then((data = {}) => {
          console.log(data);
          this.refer(1);
        })
        .catch(err => {
          this.$error(err.message);
        });
    }
  },
  components: {
    pagination, // 分页组件
    editBusLimited,
    promSelect,
    deadStatus,
    startUsing
  },
  created() {
    this.refer(1);
  }
};
</script>

<style lang="less" rel="stylesheet/less" scoped>
// 中间部分
.content {
  height: 830px;
  border-radius: 4px;
  background: #fff;
  box-shadow: 1px 2px 20px #ccc;
  overflow: auto;
  /deep/.tables
    .el-table
    .el-table__body-wrapper
    .el-table__empty-block
    .el-table__empty-text {
    width: 50%;
    color: #909399;
    line-height: 60px;
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
    // /deep/ td {
    //   padding: 0;
    // }
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
  // 去掉element表格的默认全选按钮
  .tables /deep/ th .el-checkbox {
    display: none;
  }
}
</style>
