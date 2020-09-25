<template>
  <div>
    <div class="content">
      <!-- 输入框和下拉框 -->
      <div class="b_content">
        <el-select class="select_72" v-model="value3" @change="defaultList_"  placeholder="岗位类型">
            <el-option v-for="item in list_input"
                :key="item.name"
                :label="item.name"
                :value="item.id">
            </el-option>
        </el-select>
        <el-input clearable class="select_72" v-model="yhbh"  placeholder="用户编号"></el-input>
        <el-input clearable class="select_72" v-model="yhmc"  placeholder="用户名称"></el-input>
        <el-button class="b_button query" @click="refer(1)">查询</el-button>
        <el-button class="b_button empty" @click="empty">清空</el-button>
      </div>
      <!-- 表格 -->
      <div class="tables">
        <el-table
          :default-sort = "{prop: 'date', order: 'descending'}"
          :header-cell-style="{'font-size':'12px','text-align':'center','height':'38.9px','background':'#F9FAFB'}"
          ref="multipleTable"
          :data="for_"
          tooltip-effect="dark"
          style="width: 100%">
          <el-table-column
            prop="itemSort"
            label="序号">
          </el-table-column>
          <el-table-column
            prop="userId"
            label="用户编号">
          </el-table-column>
          <el-table-column
            prop="userName"
            label="用户名称">
          </el-table-column>
          <el-table-column
            prop="dailyPeakVal"
            label="日峰值">
          </el-table-column>
          <el-table-column
            prop="onlineStatus"
            label="状态">
            <template slot-scope="scope">
              <span>{{scope.row.onlineStatus ? '在职' : '休假'}}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="takeOverUserId"
            label="对接人编号">
          </el-table-column>
            <el-table-column
            prop="takeOverUserName"
            label="对接人">
          </el-table-column>
          <el-table-column
            prop="effectiveStartDate"
            label="开始生效日期">
          </el-table-column>
          <el-table-column
            prop="effectiveEndDate"
            label="结束日期">
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
    </div>
    <editStaffStatus :contactName="contactName" :refer="defaultList_" :list_="list" :current_list='currentList' :current_data='currentXqData' v-if="alert_e" @clsoe_windowAlert_e='close_1_e' />
  </div>
</template>

<script type="text/ecmascript-6">
import pagination from "@components/pagination"; // 分页组件
import editStaffStatus from "../staff-status/editStaffStatus/"; // 编辑人员状态配置组件
import { configApi } from "../../js/server"; // 接口
export default {
  data() {
    return {
      value3: "approveRole", // 岗位类型
      contactName: [], // 对接人姓名下拉框
      yhbh: "", // 用户编号
      yhmc: "", // 用户名称
      for_: [], // 渲染列表
      list: {}, // 渲染详情
      currentList: [], // 判断详情页面有没有改变
      currentXqData: null, // 传数据ID的值到编辑接口
      alert_e: false, // 编辑人员状态配置组件
      pageConfig: {
        account: 0, // 总条数
        pageSize: 10, // 当前多少条数据
        currentPage: 1, // 当前页
        showJumpButton: true // 显示跳转按钮
      }, // 分页
      list_input: [
        { name: "审批岗", id: "approveRole" },
        { name: "审计岗", id: "auditRole" }
      ]
    };
  },
  methods: {
    // 分页
    jump(pageNum) {
      this.pageConfig.currentPage = pageNum;
      this.refer(this.pageConfig.currentPage);
      this.defaultList(this.pageConfig.currentPage);
    },
    // 关闭人员状态配置配置
    close_1_e() {
      this.alert_e = false;
    },
    defaultList_() {
      this.defaultList(1);
    },
    // 默认显示审批岗的所有在职人员
    defaultList(pageNum) {
      let data = {
        roleCode: this.value3, // 角色
        userId: this.yhbh, // 用户编码
        userName: this.yhmc, // 用户名称
        pageNum: pageNum, // 当前页
        pageSize: this.pageConfig.pageSize // 当前多少条数据
      };
      this.$MyFetch
        .get(configApi.approver_list, data)
        .then((data = {}) => {
          let for_ = data.list;
          for (let i = 0; i < for_.length; i++) {
            for_[i]["itemSort"] = data.startRow + i;
          }
          this.for_ = for_;
          this.pageConfig.account = data.total;
          this.pageConfig.currentPage = data.pageNum;
          console.log(this.for_);
        })
        .catch(err => {
          this.$error(err.message);
        });
    },
    // 查询接口
    refer(pageNum) {
      if (this.yhbh || this.yhmc) {
        let data = {
          roleCode: this.value3, // 角色
          userId: this.yhbh, // 用户编码
          userName: this.yhmc, // 用户名称
          pageNum: pageNum, // 当前页
          pageSize: this.pageConfig.pageSize // 当前多少条数据
        };
        this.$MyFetch
          .get(configApi.approver_list, data)
          .then((data = {}) => {
            let for_ = data.list;
            for (let i = 0; i < for_.length; i++) {
              for_[i]["itemSort"] = data.startRow + i;
            }
            this.for_ = for_;
            this.pageConfig.account = data.total;
            this.pageConfig.currentPage = data.pageNum;
            console.log(data);
          })
          .catch(err => {
            this.$error(err.message);
          });
      }
    },
    // 打开编辑人员管理状态
    edit_alert(detail) {
      console.log(detail);
      this.list = detail;
      this.currentXqData = detail.id;
      this.currentList = Object.assign({}, this.list);
      this.alert_e = true;
      let data = {
        roleId: detail.roleId,
        userId: detail.userId
      };
      // debugger;
      let url = configApi.approver_takeOverUsers;
      this.$MyFetch
        .get(url, data)
        .then((data = {}) => {
          console.log(data);
          this.contactName = data;
        })
        .catch(err => {
          this.$error(err.message);
        });
    },
    empty() {
      this.yhbh = "";
      this.yhmc = "";
    }
  },
  components: {
    pagination, // 分页组件
    editStaffStatus
  },
  created() {
    this.defaultList(1);
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
  // 输入框和下拉框部分样式
  .b_content {
    margin-top: 30px;
    text-align: left;
    // height: 60px;
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
    // height: 400px;
    width: 97%;
    margin: 0px auto;
    border: 1px solid #e5e5e5;
    margin-top: 21px;
    border-radius: 4px;
    // /deep/ td {
    //   padding: 0;
    // }
  }
  .pagination {
    margin-bottom: 20px;
    margin-top: 40px;
    margin-right: 30px;
  }
}
</style>
