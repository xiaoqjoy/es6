<template>
  <div>
    <div class="content">
      <!-- 新增按钮 -->
      <button class="add" @click="add_alert()">+ 新增</button>
      <!-- 表格 -->
      <div class="tables">
        <el-table
          :default-sort = "{prop: 'date', order: 'descending'}"
          :header-cell-style="{'font-size':'12px','text-align':'center','height':'38.9px','background':'#F9FAFB'}"
          ref="multipleTable"
          :data="for_"
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
            label="编号">
          </el-table-column>
          <el-table-column
            prop="titleLevelOne"
            label="审计退回原因">
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
              <el-button type="text" size="small" @click="edit_alert(scope.row)">编辑</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <pagination @jump-page='jump' :page='pageConfig' class="pagination"></pagination>
      <div class="enable">
        <el-button class="t_button dead_t" @click="invalid_fun">停用</el-button>
        <el-button class="t_button initiate_t" @click="used_fun">启用</el-button>
        <el-button class="t_button save_t" @click="save">保存</el-button>
      </div>
    </div>
    <addBackAllocation :cause_x="cause" :systemNum="systemNum" v-if="alert_" @clsoe_windowAlert='close_1' />
    <editBackAllocation :cause_x="cause" :current_list='currentList' :list_="list" v-if="alert_e" @clsoe_windowAlert_e='close_1_e' />
    <promSelect v-if="isSelect" @clsoe_windowIsSelect='console_isSelect' />
    <blockUp :fn_t='deadText' v-if="invalid" @clsoe_windowinvalid='console_invalid' />
    <minitab :fn_q='initiateText' v-if="used" @clsoe_windowused='console_used' />
    <reCheck :reexamine="reexamine" v-if="reveal" @close_r="close_" />
    <whetherSaveX :cause_x="cause" :msg="msg" v-if="toSaveT" @clsoe_sf='console_s' />
  </div>
</template>

<script type="text/ecmascript-6">
import pagination from "@components/pagination"; // 分页组件
import addBackAllocation from "../back-allocation/addBackAllocation/"; // 新增退回原因配置组件
import editBackAllocation from "../back-allocation/editBackAllocation/"; // 编辑退回原因配置组件
import promSelect from "../../person-config/prom-select/"; // 停用提示组件
import blockUp from "../block-up/index"; // 停用组件
import minitab from "../minitab/index"; // 启用组件
import reCheck from "../reCheck/index"; // 复核组件
import whetherSaveX from "../back-allocation/whetherSaveX/index"; // 是否保存已经修改状态组件
import { configApi } from "../../js/server.js"; // 接口
export default {
  data() {
    return {
      msg: "是否保存退回原因配置修改？",
      for_: [], // 渲染列表
      list: [], // 渲染详情
      currentList: [], // 判断详情页面有没有改变
      systemNum: "", // 新增页面带入系统编号
      alert_: false, // 新增退回原因配置组件
      alert_e: false, // 编辑退回原因配置组件
      isSelect: false, // 是否选择表格数据
      invalid: false, // 停用
      used: false, // 启用
      toSaveT: false, // 是否保存默认不显示
      reveal: false, // 复核默认为不显示
      selectedRow: [], // 复选框是否选中
      pageConfig: {
        account: 0, // 总条数
        pageSize: 10, // 当前多少条数据
        currentPage: 1, // 当前页
        showJumpButton: true // 显示跳转按钮
      } // 分页
    };
  },
  // computed: {
  //   toSaveT() {
  //     return this.$store.getters.toSaveT;
  //   }
  // },
  methods: {
    // 关闭是否保存组件
    console_s() {
      this.toSaveT = false;
    },
    // 复核接口
    reexamine(checkBy, checkByPwd) {
      let data = {
        checkBy: checkBy,
        checkByPwd: checkByPwd
      };
      let url = `${
        configApi.levelone_checkAndSave
      }/${"aud_return_reason"}/checkAndSave`;
      this.$MyFetch
        .post(url, data)
        .then((data = {}) => {
          console.log(data);
          this.confirmFn("复核成功", "success");
          this.cause(1);
          this.reveal = false;
        })
        .catch(err => {
          this.$error(err.message);
        });
    },
    // 打开复核组件
    save() {
      let url = `${
        configApi.levelone_checkModify
      }/${"aud_return_reason"}/checkModify`;
      this.$MyFetch
        .get(url)
        .then((data = {}) => {
          console.log(data);
          if (data) {
            this.reveal = true;
          } else {
            this.confirmFn("没有需要复核的选项", "err");
          }
        })
        .catch(err => {
          this.$error(err.message);
        });
    },
    // 关闭复核组件
    close_() {
      this.reveal = false;
    },
    // 分页
    jump(pageNum) {
      this.pageConfig.currentPage = pageNum;
      this.cause(this.pageConfig.currentPage);
    },
    cause(pageNum) {
      let url = `${
        configApi.levelone_levelOne
      }/${"aud_return_reason"}/levelOne/list`;
      let data = {
        pageNum: pageNum, // 当前页
        pageSize: this.pageConfig.pageSize // 当前多少条数据
      };
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
        if (selectedData[i].idLevelTwo) {
          selectedData[i] = selectedData[i].idLevelTwo;
        } else {
          selectedData[i] = selectedData[i].idLevelOne;
        }
      }
      let data = {
        ids: selectedData,
        statusInd: false
      };
      let url = `${
        configApi.levelone_changeStatus
      }/${"aud_return_reason"}/changeStatus`;
      this.$MyFetch
        .post(url, data)
        .then((data = {}) => {
          console.log(data);
          this.cause(1);
        })
        .catch(err => {
          this.$error(err.message);
        });
    },
    // 启用接口
    initiateText() {
      let selectedData = this.selectedRow;
      for (let i = 0; i < selectedData.length; i++) {
        if (selectedData[i].idLevelTwo) {
          selectedData[i] = selectedData[i].idLevelTwo;
        } else {
          selectedData[i] = selectedData[i].idLevelOne;
        }
      }
      let data = {
        ids: selectedData,
        statusInd: true
      };
      console.log(data.ids);
      let url = `${
        configApi.levelone_changeStatus
      }/${"aud_return_reason"}/changeStatus`;
      this.$MyFetch
        .post(url, data)
        .then((data = {}) => {
          console.log(data);
          this.cause(1);
        })
        .catch(err => {
          this.$error(err.message);
        });
    },
    // 打开新增退回原因配置
    add_alert() {
      this.alert_ = true;
      let url = `${
        configApi.operationConfig_newLevel
      }/${"aud_return_reason"}/newLevelOneRecordNum`;
      this.$MyFetch
        .get(url)
        .then((data = {}) => {
          console.log(data);
          this.systemNum = data;
        })
        .catch(err => {
          this.$error(err.message);
        });
    },
    // 关闭新增退回原因配置
    close_1() {
      this.alert_ = false;
    },
    // 打开编辑退回原因配置
    edit_alert(detail) {
      this.list = detail;
      this.currentList = Object.assign({}, this.list);
      this.alert_e = true;
    },
    // 关闭编辑退回原因配置
    close_1_e() {
      this.alert_e = false;
    },
    // 选中复选框事件
    handleSelectionChange(data) {
      this.selectedRow = data;
    },
    // 行选中
    rowCheck(row, column, e) {
      this.$refs.multipleTable.toggleRowSelection(row);
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
      // 判断复选框是否选中，选中弹启用组件
      if (this.selectedRow.length > 0) {
        this.used = true;
      } else {
        this.isSelect = true;
      }
    }
    // isChange() {
    //   let url = `${
    //     configApi.levelone_checkModify
    //   }/${"aud_return_reason"}/checkModify`;
    //   this.$MyFetch
    //     .get(url)
    //     .then((data = {}) => {
    //       console.log(data);
    //       if (data) {
    //         this.toSaveT = true;
    //         // this.$emit('jump');
    //       } else {
    //         this.$emit('jump');
    //       }
    //     })
    //     .catch(err => {
    //       this.$error(err.message);
    //     });
    // },
  },
  // 路由跳转触发是否保存事件
  beforeRouteLeave(to, from, next) {
    localStorage.setItem("changeName", JSON.stringify(to.name));
    let url = `${
      configApi.levelone_checkModify
    }/${"aud_return_reason"}/checkModify`;
    this.$MyFetch
      .get(url)
      .then((data = {}) => {
        console.log(data);
        if (data) {
          this.toSaveT = true;
          // this.$emit('jump');
        } else {
          next();
        }
      })
      .catch(err => {
        this.$error(err.message);
      });
    // this.confirmFn('确认要离开了！', 'warning')
    //   .then(() => {
    //     next();
    //   })
    //   .catch(() => {
    //     this.confirmFn('还不想离开');
    //   });
  },
  components: {
    pagination, // 分页组件
    addBackAllocation,
    editBackAllocation,
    promSelect,
    whetherSaveX,
    reCheck,
    blockUp,
    minitab
  },
  created() {
    this.cause(1);
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
    border: 1px solid #e5e5e5;
    margin-top: 21px;
    border-radius: 4px;
    .el-table {
      .yincan{
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
    }
    .headline_t {
      height: 40px;
      border: 0px;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
      line-height: 40px;
    }
    // /deep/ td {
    //   padding: 0;
    // }
    /deep/ .el-collapse {
      border-top: #ebeef5;
      border-bottom: #ebeef5;
    }
  }
  .pagination {
    margin-top: 40px;
    margin-right: 30px;
  }
  // 停用启用公共样式
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
  // 去掉element表格的默认全选按钮
  .tables /deep/ th .el-checkbox {
    display: none;
  }
}
</style>
