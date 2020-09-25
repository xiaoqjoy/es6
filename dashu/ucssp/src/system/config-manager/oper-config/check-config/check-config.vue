<template>
  <div>
    <div class="content">
      <!-- 新增按钮 -->
      <button class="add" @click="add_alert()">+ 新增</button>
      <!-- 输入框和下拉框 -->
      <!-- <div class="b_content"> -->
      <!-- </div> -->
      <!-- 表格 -->
      <div class="tables">
        <el-table height="630"
          :default-sort = "{prop: 'date', order: 'descending'}"
          :header-cell-style="{'font-size':'12px','text-align':'center','height':'38.9px','background':'#ececec'}"
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
            type="index"
            label="序号" width="50px">
          </el-table-column>
          <el-table-column
            prop="codeLevelOne"
            label="一级编号" width="80px">
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
            prop="codeLevelThree"
            label="三级编号">
          </el-table-column>
            <el-table-column
            prop="titleLevelThree"
            label="三级维度">
            <template slot-scope="scope">
              <el-popover width="500" trigger="hover" placement="top">
                <p>{{scope.row.titleLevelThree}}</p>
                <div slot="reference">
                  <p class="yincan">{{scope.row.titleLevelThree}}</p>
                </div>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column
            prop="statusInd"
            label="状态" width="80px">
            <template slot-scope="scope">
              <span>{{scope.row.statusInd ? '有效' : '停用'}}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="createdByName"
            label="登记人员" width="100px">
          </el-table-column>
          <el-table-column
            prop="createdDate"
            label="登记时间" width="120px">
          </el-table-column>
          <el-table-column
            width="150"
            prop="checkByName"
            label="复核人">
          </el-table-column>
          <el-table-column
            prop="checkDate"
            label="复核时间" width="120px">
          </el-table-column>
          <el-table-column
            fixed="right"
            prop="operation"
            label="操作" width="80px">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click.stop="edit_alert(scope.row)">编辑</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <pagination @jump-page='cause' :page='pageConfig' class="pagination"></pagination>
      <div class="enable">
        <el-button class="t_button dead_t" @click="trigger(false)">停用</el-button>
        <el-button class="t_button initiate_t" @click="trigger(true)">启用</el-button>
        <el-button class="t_button save_t" @click="save">保存</el-button>
      </div>
    </div>
    <addCheckConfig :cause_x="cause" v-if="alert_" @clsoe_windowAlert='close_1' />
    <editCheckConfig :cause_x="cause" :current_list='currentList' :list_="list" v-if="alert_e" @clsoe_windowAlert_e='close_1_e' />
    <reCheck :reexamine="reexamine" v-if="reveal" @close_r="close_" />
    <whetherSaveX :cause_="cause_" :cause_x="cause" :msg="msg" v-if="toSaveH" @clsoe_sf='console_s' />
  </div>
</template>

<script type="text/ecmascript-6">
import pagination from "@components/pagination"; // 分页组件
import addCheckConfig from "../check-config/addCheckConfig/"; // 新增电核勾选配置组件
import editCheckConfig from "../check-config/editCheckConfig/"; // 编辑电核勾选配置组件
import reCheck from "../reCheck/index"; // 复核组件
import whetherSaveX from "../check-config/whetherSaveX/"; // 是否保存已经修改状态组件
import { configApi } from "../../js/server.js"; // 接口
export default {
  data() {
    return {
      msg: "是否保存电核勾选配置修改？",
      value3: "phone_check_code_salary",
      for_: [], // 渲染列表
      list: [], // 渲染详情
      currentList: [], // 判断详情页面有没有改变
      alert_: false, // 新增电核勾选配置组件
      alert_e: false, // 编辑电核勾选配置组件
      toSaveH: false, // 是否保存默认为不显示
      reveal: false, // 复核默认为不显示
      selectedRow: [], // 复选框是否选中
      sign: 0, // 用于记录路由跳转到login被拦截的次数，别问我为什么这么做……我改得好累
      pageConfig: {
        account: 0, // 总条数
        pageSize: 10, // 当前多少条数据
        currentPage: 1, // 当前页
        showJumpButton: true // 显示跳转按钮
      } // 分页
    };
  },
  // computed: {
  //   toSaveH() {
  //     return this.$store.getters.toSaveH;
  //   }
  // },
  methods: {
    // 关闭是否保存组件
    console_s(_refresh) {
      this.toSaveH = false;
      _refresh && this.cause(1);
    },
    // 复核接口
    reexamine(checkBy, checkByPwd) {
      let data = {
        checkBy: checkBy,
        checkByPwd: checkByPwd
      };
      let url = `${
        configApi.levelone_checkAndSave
      }/phone_check_code/checkAndSave`;
      this.$MyFetch.post(url, data)
        .then((data = {}) => {
          this.confirmFn("复核成功", "success");
          this.cause(1);
          this.reveal = false;
        }).catch(err => {
          this.$error(err.message);
        });
    },
    // 打开复核组件
    save() {
      let url = `${
        configApi.levelone_checkModify
      }/phone_check_code/checkModify`;
      this.$MyFetch.get(url)
        .then((data) => {
          this.reveal = !!data;
          !this.reveal && this.confirmFn("没有需要复核的选项", "err");
        }).catch(err => {
          this.$error(err.message);
        });
    },
    // 关闭复核组件
    close_() {
      this.reveal = false;
    },
    cause(pageNum) {
      let url = configApi.getThreeList.replace('{configType}', 'phone_check_code');
      let data = {
        pageNum: pageNum, // 当前页
        pageSize: this.pageConfig.pageSize // 当前多少条数据
      };
      this.$MyFetch
        .get(url, data)
        .then((data = {}) => {
          this.for_ = data.list;
          this.pageConfig.account = data.total;
          this.pageConfig.currentPage = data.pageNum;
        })
        .catch(err => {
          this.$error(err.message);
        });
    },
    cause_(pageNum) {
      let url = `${
        configApi.levelone_levelTwo
      }/${"phone_check_code_self_employed"}/list`;
      let data = {
        pageNum: pageNum, // 当前页
        pageSize: this.pageConfig.pageSize // 当前多少条数据
      };
      this.$MyFetch
        .get(url, data)
        .then((data = {}) => {
          this.for_ = data.list;
          this.pageConfig.account = data.total;
          this.pageConfig.currentPage = data.pageNum;
        })
        .catch(err => {
          this.$error(err.message);
        });
    },
    trigger(_status) {
      let list = [];
      if (!this.selectedRow.length) {
        this.$message.error('请选择需要处理的信息');
        return;
      }
      this.selectedRow.forEach(ele => {
        ele.idLevelThree && list.push(ele.idLevelThree);
        ele.idLevelTwo && list.push(ele.idLevelTwo);
        ele.idLevelOne && list.push(ele.idLevelOne);
      });
      this.$confirm('是否保存已修改的状态？', '', {
          dangerouslyUseHTMLString: true,
          confirmButtonText: '是',
          cancelButtonText: '否',
          showClose: false,
          showCancelButton: true,
          type: 'warning',
          customClass: 'tips__save'
        }).then(() => {
          this.transfer(list, _status);
        }).catch(() => {
          this.$emit("clsoe_windowAlert");
        });
    },
    transfer(list, _status) {
      let data = {
        ids: list,
        statusInd: _status,
        levelThreeInd: true
      };
      let url = configApi.levelone_changeStatus + '/phone_check_code_salary/changeStatus';
      this.$MyFetch.post(url, data)
        .then(_data => {
          _status && this.confirmFn('启用成功');
          !_status && this.confirmFn('停用成功');
          this.cause(1);
        }).catch(_err => {
          this.$error(_err.message);
        });
    },
    // 打开新增电核勾选配置
    add_alert() {
      this.alert_ = true;
    },
    // 关闭新增电核勾选配置
    close_1() {
      this.alert_ = false;
    },
    // 打开编辑电核勾选配置
    edit_alert(detail) {
      this.list = detail;
      this.currentList = Object.assign({}, this.list);
      this.alert_e = true;
    },
    // 关闭编辑电核勾选配置
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
    }
    // isChange() {
    //   let url = `${
    //     configApi.levelone_checkModify
    //   }/${"phone_check_code"}/checkModify`;
    //   this.$MyFetch
    //     .get(url)
    //     .then((data = {}) => {
    //       console.log(data);
    //       if (data) {
    //         this.toSaveH = true;
    //       } else {
    //         this.$emit("jump");
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
    to.name === 'login' && this.sign++;
    if (this.sign > 2) {
      next();
      return;
    }
    let url = `${
      configApi.levelone_checkModify
    }/${"phone_check_code"}/checkModify`;
    this.$MyFetch
      .get(url)
      .then((data = {}) => {
        console.log(data);
        if (data) {
          this.toSaveH = true;
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
    addCheckConfig,
    editCheckConfig,
    whetherSaveX,
    reCheck
  },
  created() {
    this.cause(1);
  }
};
</script>

<style lang="less" rel="stylesheet/less" scoped>
// 中间部分
.content {
  height: 860px;
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
    // display: block;
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
    border: 1px solid #d0d0d0;
    // margin-top: 15px;
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
    /deep/ .el-collapse {
      border-top: #ebeef5;
      border-bottom: #ebeef5;
    }
    // /deep/ td {
    //   padding: 0;
    // }
  }
  .pagination {
    margin-top: 30px;
    margin-right: 30px;
  }
  // 停用启用公共样式
  .enable {
    text-align: center;
    margin-top: 20px;
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
