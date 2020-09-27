<template>
  <div>
    <div class="content">
      <button
        class="add"
        @click="add_alert()"
      >+ 新增</button>
      <!-- 输入框和下拉框 -->
      <div class="b_content">
        <el-input
          class="select_72"
          v-model="ModelConfig"
          placeholder="模型名称"
          clearable
        ></el-input>
        <el-button
          class="b_button query"
          @click="refer(1)"
        >查询</el-button>
        <el-button
          class="b_button empty"
          @click="empty()"
        >清空</el-button>
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
          @row-click="clickRow"
        >
          <el-table-column type="selection">
          </el-table-column>
          <el-table-column
            prop="itemSort"
            label="序号"
          >
          </el-table-column>
          <el-table-column
            prop="modelName"
            label="模型名称"
          >
          </el-table-column>
          <el-table-column
            prop="roleId"
            label="角色"
          >
          </el-table-column>
          <el-table-column
            prop="statusInd"
            label="状态"
          >
          </el-table-column>
          <el-table-column
            prop="createdByName"
            label="登记人员"
          >
          </el-table-column>
          <el-table-column
            prop="createdDate"
            label="登记时间"
          >
          </el-table-column>
          <el-table-column
            prop="updatedByName"
            label="更新人员"
          >
          </el-table-column>
          <el-table-column
            prop="updatedDate"
            label="更新时间"
          >
          </el-table-column>
          <el-table-column
            prop="operation"
            label="操作"
          >
            <template slot-scope="scope">
              <el-button
                type="text"
                size="small"
                @click="edit_alert(scope.row)"
              >编辑</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- 全选按钮 -->
      <!-- <el-checkbox class="b_check" @change="toggleSelection(for_, checkFlag)">全选</el-checkbox> -->
      <pagination
        @jump-page='jump'
        :page='pageConfig'
        class="pagination"
      ></pagination>
      <div class="text__center">
        <el-button
          class="t_button dead_t"
          @click="invalid_fun"
        >停用</el-button>
        <el-button
          class="t_button initiate_t"
          @click="used_fun"
        >启用</el-button>
      </div>
    </div>
    <addModelConfig
      v-if="alert_"
      :refer="refer"
      @clsoe_windowAlert='close_1'
    />
    <editModelConfig
      v-if="alert_e"
      :lists="lists"
      :refer="refer"
      @clsoe_windowAlert_e='close_1_e'
    />
    <promSelect
      v-if="isSelect"
      @clsoe_windowIsSelect='console_isSelect'
    />
    <deadStatus
      :fn_t='deadText'
      v-if="invalid"
      :message="parentmsg"
      @clsoe_windowinvalid='console_invalid'
    />
    <startUsing
      :fn_q='initiateText'
      v-if="used"
      :message="parentmsg"
      @clsoe_windowused='console_used'
    />
  </div>
</template>

<script type="text/ecmascript-6">
import "@common/css/dialog";
import addModelConfig from "../model-config/addModelConfig/"; // 新增模型配置组件
import editModelConfig from "../model-config/editModelConfig/"; // 编辑模型配置组件
import promSelect from "../../person-config/prom-select/"; // 停用提示组件
import deadStatus from "./block-up/"; // 停用组件
import startUsing from "./enabled/"; // 启用组件
import pagination from "@components/pagination"; // 分页组件
import { configApi } from "../../js/server"; // 接口
export default {
  data() {
    return {
      for_: [], // 渲染列表
      alert_: false, // 新增模型配置
      alert_e: false, // 编辑模型配置
      checkFlag: true, // 是否全选标记
      isSelect: false, // 是否选择表格数据
      invalid: false, // 停用
      used: false, // 启用
      selectedRow: [], // 复选框是否选中
      ModelConfig: "",
      date: "",
      role: [], // 角色模型
      parentmsg: [], // 传入启用停用组件的数据
      lists: [], // 编辑页数据
      // itemSort: "", // 序号
      pageConfig: {
        account: 0, // 总条数
        pageSize: 10, // 当前多少条数据
        currentPage: 1, // 当前页
        showJumpButton: true // 显示跳转按钮
      } // 分页
    };
  },
  methods: {
    // 打开新增模型配置
    add_alert() {
      this.alert_ = true;
    },
    // 关闭新增模型配置
    close_1() {
      this.alert_ = false;
    },
    // 分页
    jump(pageNum) {
      this.pageConfig.currentPage = pageNum;
      this.refer(this.pageConfig.currentPage, true);
      // this.defaultList(this.pageConfig.currentPage);
    },
    clickRow(row) {
      this.$refs.multipleTable.toggleRowSelection(row);
    },
    // 打开编辑模型配置
    edit_alert(detail) {
      console.log(detail);
      let id = detail.id;
      let url = `${configApi.aprModelInfo_detail}/${id}`;
      if (id !== "") {
        this.$MyFetch
          .get(url)
          .then((data = {}) => {
            this.lists = data;
            this.alert_e = true;
          })
          .catch(err => {
            this.$error(err.message);
          });
      }
    },
    // 关闭编辑模型配置
    close_1_e() {
      this.alert_e = false;
    },
    // 关闭提示信息组件
    console_isSelect() {
      this.isSelect = false;
    },
    // 关闭启用组件
    console_used() {
      this.used = false;
    },
    // 表格全选功能
    toggleSelection(rows, checkFlag) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row, checkFlag);
        });
      }
      this.checkFlag = !this.checkFlag;
    },
    // 关闭停用组件
    console_invalid() {
      this.invalid = false;
    },
    // 选中复选框事件
    handleSelectionChange(data) {
      this.selectedRow = data;
      console.log(data);
      this.parentmsg = [data[0]];
      for (let i = 0; i < data.length; i++) {
        if (this.parentmsg.indexOf(data[i]) === -1) {
          this.parentmsg.push(data[i]);
        }
      }
    },
    // 打开停用组件
    invalid_fun() {
      // 判断复选框是否选中，选中弹批量失效
      if (this.selectedRow.length > 0) {
        this.invalid = true;
      } else {
        this.isSelect = true;
      }
    },
    // 打开启用组件
    used_fun() {
      // 判断复选框是否选中，选中弹批量失效
      if (this.selectedRow.length > 0) {
        this.used = true;
      } else {
        this.isSelect = true;
      }
    },
    // 调取模型角色接口
    role_a() {
      return new Promise((resolve, reject) => {
        let url = configApi.modeler_rolecpms;
        this.$MyFetch
          .get(url)
          .then((dataj = {}) => {
            resolve(dataj);
          })
          .catch(err => {
            this.$error(err.message);
          });
      });
    },
    // 停用接口
    deadText() {
      let selectedData = this.selectedRow;
      for (let i = 0; i < selectedData.length; i++) {
        selectedData[i] = selectedData[i].id;
      }
      let data = {
        ids: selectedData,
        operateBy: "string",
        statusInd: false
      };
      let url = configApi.aprModelInfo_change;
      this.$MyFetch
        .post(url, data)
        .then((data = {}) => {
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
      console.log(selectedData);
      let data = {
        ids: selectedData,
        operateBy: "string",
        statusInd: true
      };
      let url = configApi.aprModelInfo_change;
      this.$MyFetch
        .post(url, data)
        .then((data = {}) => {
          this.refer(1);
        })
        .catch(err => {
          this.$error(err.message);
        });
    },
    // 查询模型配置列表接口
    refer(pageNum, id) {
      this.role_a().then(dataj => {
        console.log(dataj);
        if (this.ModelConfig !== "") {
          this.date = this.ModelConfig;
        }
        console.log(this.ModelConfig);
        console.log(this.date);
        let data1 = {
          modelName: id ? this.date : this.ModelConfig,
          pageNum: pageNum, // 当前页
          pageSize: this.pageConfig.pageSize // 当前多少条数据
        };
        console.log(data1);
        let url = configApi.aprModelInfo_list;
        this.$MyFetch
          .get(url, data1)
          .then((data = {}) => {
            let forData = data.list;
            this.pageConfig.account = data.total;
            this.pageConfig.currentPage = data.pageNum;
            for (let i = 0; i < forData.length; i++) {
              // 序号
              forData[i]["itemSort"] = data.startRow + i;
              if (forData[i].roleId === dataj[0].roleId) {
                forData[i].roleId = dataj[0].roleName;
              } else if (forData[i].roleId === dataj[1].roleId) {
                forData[i].roleId = dataj[1].roleName;
              }
              if (forData[i].statusInd === true) {
                forData[i].statusInd = "有效";
              } else if (forData[i].statusInd === false) {
                forData[i].statusInd = "停用";
              }
            }
            this.for_ = forData;
            console.log(this.for_);
          })
          .catch(err => {
            this.$error(err.message);
          });
      });
    },
    empty() {
      this.ModelConfig = "";
    }
  },
  components: {
    addModelConfig, // 新增模型配置组件
    editModelConfig,
    promSelect,
    deadStatus,
    startUsing,
    pagination
  },
  mounted() {
    this.refer(1);
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
  height: 830px;
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
    // margin-top: 30px;
    text-align: left;
    height: 40px;
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
    height: 530px;
    width: 97%;
    margin: 0px auto;
    border: 1px solid #d0d0d0;
    margin-top: 21px;
    border-radius: 4px;
    margin-bottom: 30px;
  }
  .b_check {
    margin-left: 25px;
  }
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
  .text__center {
    margin-top: 20px;
  }
  .pagination {
    margin-right: 30px;
  }
}
/deep/.el-table__body-wrapper .el-table__body .el-table__row td {
      padding: 7px 0;
    }
</style>
