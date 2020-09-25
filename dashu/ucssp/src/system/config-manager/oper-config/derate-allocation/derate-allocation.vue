<template>
  <div class="derate-page">
    <button class="add" @click="newHandler">+ 新增</button>
    <div class="tables">
      <el-table
        :default-sort = "{prop: 'date', order: 'descending'}"
        :header-cell-style="{'font-size':'12px','text-align':'center','height':'38.9px','background':'#ececec'}"
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        @row-click="rowCheck"
        @selection-change="handleSelectionChange">
        <el-table-column
          type="selection">
        </el-table-column>
        <el-table-column
          prop="itemSort"
          label="序号">
        </el-table-column>
        <el-table-column
          prop="codeLevelOne"
          label="一级编号">
        </el-table-column>
        <el-table-column
          prop="titleLevelOne"
          label="一级维度">
          <template slot-scope="scope">
            <el-popover width="500" trigger="hover" placement="top">
              <p>{{scope.row.titleLevelOne}}</p>
              <div slot="reference">
                <p class="yincan">{{scope.row.titleLevelOne}}</p>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column
          prop="codeLevelTwo"
          label="二级编号">
        </el-table-column>
        <el-table-column
          prop="titleLevelTwo"
          label="二级维度">
          <template slot-scope="scope">
            <el-popover width="500" trigger="hover" placement="top">
              <p>{{scope.row.titleLevelTwo}}</p>
              <div slot="reference">
                <p class="yincan">{{scope.row.titleLevelTwo}}</p>
              </div>
            </el-popover>
          </template>
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
          prop="checkByName"
          label="复核人">
        </el-table-column>
        <el-table-column
          prop="checkDate"
          label="复核时间">
        </el-table-column>
        <el-table-column
          fixed="right"
          prop="operation"
          label="操作">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click.stop="onEdit(scope.row)">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <pagination @jump-page="onPage" :page="pageConfig" class="pagination"></pagination>
    <div class="enable">
      <el-button class="t_button dead_t" @click="blockFn">停用</el-button>
      <el-button class="t_button initiate_t" @click="openFn">启用</el-button>
      <el-button class="t_button save_t" @click="saveFn">保存</el-button>
    </div>
    <new-dialog v-if="showNew" @close="onNewClose" />
    <edit-dialog v-if="showEdit" :item="currentItem" @close="onEditClose" />
    <!-- 停用组件 -->
    <blockUp :fn_t='doBlockFn' v-if="showBlock" @clsoe_windowinvalid='showBlock = false' />
    <!-- 启用组件 -->
    <minitab :fn_q='doOpenFn' v-if="showOpen" @clsoe_windowused='showOpen = false' />
    <!-- 复合组件 -->
    <reCheck :reexamine="doRecheckFn" v-if="showRecheck" @close_r="showRecheck = false" />
    <!-- 未选择提示 -->
    <promSelect v-if="showNoselect" @clsoe_windowIsSelect='showNoselect = false' />
    <!-- 是否保存提示 -->
    <whetherSaveX v-if="showNosave" @close="showNosave = false" @yes="doNosave(true)" @no="doNosave(false)" />
  </div>
</template>
<script>
import pagination from "@components/pagination"; // 分页组件
import NewDialog from "./components/new"; // 新增
import EditDialog from "./components/edit";
import blockUp from "../block-up/index"; // 停用组件
import minitab from "../minitab/index"; // 启用组件
import reCheck from "../reCheck/index"; // 复核组件
import promSelect from "../../person-config/prom-select/"; // 未选择提示组件
import whetherSaveX from "./components/whetherSaveX"; // 是否保存已经修改状态组件

import { configApi } from "../../js/server.js"; // 接口

export default {
  data () {
    return {
      tableData: [],
      pageConfig: {
        account: 10, // 总条数
        pageSize: 10, // 当前多少条数据
        currentPage: 1, // 当前页
        showJumpButton: true // 显示跳转按钮
      },
      selectedRow: [], // 当前选中行
      showNew: false,
      showEdit: false,

      showBlock: false,
      showOpen: false,
      showRecheck: false,
      showNoselect: false,
      showNosave: false,

      currentItem: null // 当前编辑item
    };
  },
  mounted() {
    this.loadList(1);
  },
  beforeRouteLeave(to, from, next) {
    localStorage.setItem("changeName", JSON.stringify(to.name));
    const url = `${configApi.derate_base}/derate_reason/checkModify`;
    this.$MyFetch
      .get(url)
      .then((data = {}) => {
        console.log(data);
        if (data) {
          this.showNosave = true;
        } else {
          next();
        }
      })
      .catch(err => {
        this.$error(err.message);
      });
  },
  methods: {
    onPage(pageNum) {
      this.pageConfig.currentPage = pageNum;
      this.loadList(pageNum);
    },
    rowCheck(row, column, e) {
      this.$refs.multipleTable.toggleRowSelection(row);
    },
    handleSelectionChange(data) {
      this.selectedRow = data;
    },
    onEdit(item) {
      this.currentItem = item;
      this.showEdit = true;
    },
    newHandler() {
      this.showNew = true;
    },
    onNewClose(isUpdate) {
      this.showNew = false;
      if (isUpdate) {
        this.loadList(1);
      }
    },
    onEditClose(isUpdate) {
      this.showEdit = false;
      if (isUpdate) {
        this.loadList(1);
      }
    },
    saveFn() {
      const url = `${configApi.derate_base}/derate_reason/checkModify`;
      this.$MyFetch
        .get(url)
        .then((data = {}) => {
          console.log(data);
          if (data) {
            this.showRecheck = true;
          } else {
            this.confirmFn("没有需要复核的选项", "err");
          }
        })
        .catch(err => {
          this.$error(err.message);
        });
    },
    blockFn() {
      if (this.selectedRow.length > 0) {
        this.showBlock = true;
      } else {
        this.showNoselect = true;
      }
    },
    openFn() {
      if (this.selectedRow.length > 0) {
        this.showOpen = true;
      } else {
        this.showNoselect = true;
      }
    },
    doBlockFn() {
      const ids = this.selectedRow.map((item) => {
        return item.idLevelTwo || item.idLevelOne;
      });
      const data = {
        ids,
        statusInd: false
      };
      const url = `${configApi.derate_base}/derate_reason/changeStatus`;
      this.$MyFetch
        .post(url, data)
        .then((data = {}) => {
          console.log(data);
          this.loadList(1);
        })
        .catch(err => {
          this.$error(err.message);
        });
    },
    doOpenFn() {
      const ids = this.selectedRow.map((item) => {
        return item.idLevelTwo || item.idLevelOne;
      });
      const data = {
        ids,
        statusInd: true
      };
      const url = `${configApi.derate_base}/derate_reason/changeStatus`;
      this.$MyFetch
        .post(url, data)
        .then((data = {}) => {
          console.log(data);
          this.loadList(1);
        })
        .catch(err => {
          this.$error(err.message);
        });
    },
    doRecheckFn(checkBy, checkByPwd) {
      const url = `${configApi.derate_base}/derate_reason/checkAndSave`;
      const data = {
        checkBy: checkBy,
        checkByPwd: checkByPwd
      };
      this.$MyFetch
        .post(url, data)
        .then((data = {}) => {
          console.log(data);
          this.confirmFn("复核成功", "success");
          this.loadList(1);
          this.showRecheck = false;
        })
        .catch(err => {
          this.$error(err.message);
        });
    },
    doNosave(yn) {
      if (yn) { // 是
        this.showNosave = false;
        this.showRecheck = true;
      } else { // 否
        const url = `${configApi.derate_base}/derate_reason/revokeSave`;
        this.$MyFetch
          .post(url)
          .then((data = {}) => {
            console.log(data);
            this.confirmFn("数据保存不成功", "err");
            this.$router.push({name: JSON.parse(localStorage.getItem("changeName"))});
            this.showNosave = false;
            this.loadList(1);
          })
          .catch(err => {
            this.$error(err.message);
          });
      }
    },
    loadList(pageNum) {
      const url = `${configApi.derate_base}/derate_reason/list`;
      const data = {
        pageNum: pageNum, // 当前页
        pageSize: this.pageConfig.pageSize // 当前多少条数据
      };
      this.$MyFetch.get(url, data).then((data) => {
        this.tableData = data.list.map((item, index) => ({...item, itemSort: data.startRow + index}));
        this.pageConfig.account = data.total;
        this.pageConfig.currentPage = data.pageNum;
      }).catch(err => {
        this.$error(err.message);
      });

      // setTimeout(() => {
      //   const list = [
      //     {
      //       "idLevelOne": 3015,
      //       "codeLevelOne": "A1",
      //       "titleLevelOne": "工作真实",
      //       "descLevelOne": null,
      //       "idLevelTwo": null,
      //       "codeLevelTwo": null,
      //       "titleLevelTwo": null,
      //       "descLevelTwo": null,
      //       "statusInd": false,
      //       "createdByName": "SYS",
      //       "createdDate": "2019-04-11",
      //       "checkByName": "景婷婷",
      //       "checkDate": "2019-04-19",
      //       "reEnterInd": null,
      //       "reEnterDays": null,
      //       "promptContent": null,
      //       "remarkTxt": null
      //     },
      //     {
      //       "idLevelOne": 3016,
      //       "codeLevelOne": "B1",
      //       "titleLevelOne": "工作真实",
      //       "descLevelOne": null,
      //       "idLevelTwo": null,
      //       "codeLevelTwo": null,
      //       "titleLevelTwo": null,
      //       "descLevelTwo": null,
      //       "statusInd": false,
      //       "createdByName": "SYS",
      //       "createdDate": "2019-04-11",
      //       "checkByName": "景婷婷",
      //       "checkDate": "2019-04-19",
      //       "reEnterInd": null,
      //       "reEnterDays": null,
      //       "promptContent": null,
      //       "remarkTxt": null
      //     },
      //     {
      //       "idLevelOne": 3017,
      //       "codeLevelOne": "C1",
      //       "titleLevelOne": "工作真实",
      //       "descLevelOne": null,
      //       "idLevelTwo": null,
      //       "codeLevelTwo": null,
      //       "titleLevelTwo": null,
      //       "descLevelTwo": null,
      //       "statusInd": false,
      //       "createdByName": "SYS",
      //       "createdDate": "2019-04-11",
      //       "checkByName": "景婷婷",
      //       "checkDate": "2019-04-19",
      //       "reEnterInd": null,
      //       "reEnterDays": null,
      //       "promptContent": null,
      //       "remarkTxt": null
      //     }
      //   ];
      //   this.tableData = list;
      //   this.pageConfig.account = 3;
      //   this.pageConfig.currentPage = 1;
      // }, 500);
    }
  },
  components: {
    pagination,
    NewDialog,
    EditDialog,
    blockUp,
    minitab,
    reCheck,
    promSelect,
    whetherSaveX
  }
};
</script>
<style lang="less" scoped>
.derate-page {
  height: 830px;
  border-radius: 4px;
  background: #fff;
  box-shadow: 1px 2px 20px #ccc;
  overflow: auto;
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
  /deep/.tables
    .el-table
    .el-table__body-wrapper
    .el-table__empty-block
    .el-table__empty-text {
    width: 50%;
    color: #909399;
    line-height: 60px;
  }
  .tables /deep/ th .el-checkbox {
    display: none;
  }
  .tables {
    overflow-y: auto;
    overflow-x: hidden;
    // height: 400px;
    width: 97%;
    margin: 0px auto;
    border: 1px solid #d0d0d0;
    margin-top: 21px;
    border-radius: 4px;
    .yincan{
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
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
    .save_t {
      background: #eeb352;
      font-size: 14px;
      color: #ffffff;
      letter-spacing: 1.07px;
      text-align: center;
    }
  }
}
</style>
