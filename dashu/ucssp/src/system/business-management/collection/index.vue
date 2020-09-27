<template>
  <div>
    <div class="content">
      <!-- 输入框和下拉框 -->
      <div class="b_content">
        <el-input clearable class="select_72" v-model="application" placeholder="申请编号"></el-input>
        <el-input clearable class="select_72" v-model="customerName" placeholder="客户姓名"></el-input>
        <el-button class="b_button query" @click="refer(1)">查询</el-button>
        <el-button class="b_button empty" @click="empty">清空</el-button>
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
        >
          <el-table-column prop="taskName" label="当前阶段"></el-table-column>
          <el-table-column prop="dealByName" label="处理人"></el-table-column>
          <el-table-column prop="applicationId" label="申请编号"></el-table-column>
          <el-table-column prop="custName" label="客户姓名"></el-table-column>
          <el-table-column prop="productNameOne" label="产品1">
            <template slot-scope="scope">
              <el-popover width="500" trigger="hover" placement="top">
                <p>{{scope.row.productNameOne}}</p>
                <div slot="reference">
                  <p class="yincan">{{scope.row.productNameOne}}</p>
                </div>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column width="200" prop="productNameTwo" label="产品2">
            <template slot-scope="scope">
              <el-popover width="500" trigger="hover" placement="top">
                <p>{{scope.row.productNameTwo}}</p>
                <div slot="reference">
                  <p class="yincan">{{scope.row.productNameTwo}}</p>
                </div>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column prop="operation" fixed="right" width="250" label="操作">
            <template slot-scope="scope">
              <router-link
                v-if="scope.row.taskName === '贷款审批'? true:false"
                target="_blank"
                :to="{name:'approvalCollection', query:{appID:scope.row.applicationId, isEdit:true}}"
              >
                <el-button type="text" size="small">详情</el-button>
              </router-link>
              <router-link
                v-if="scope.row.taskName === '贷款审计'? true:false"
                target="_blank"
                :to="{name:'auditCollection', query:{appID:scope.row.applicationId, isEdit:true}}"
              >
                <el-button type="text" size="small">详情</el-button>
              </router-link>
            </template>
          </el-table-column>
        </el-table>
        <!-- <router-link
          target="_blank"
          :to="{name:'approvalCollection', query:{appID:'RL20190719000033', isEdit:true}}"
        >
          <el-button type="text" size="small">审批</el-button>
        </router-link>
        <router-link
          target="_blank"
          :to="{name:'auditCollection', query:{appID:'RL20190719000033', isEdit:true}}"
        >
          <el-button type="text" size="small">审计</el-button>
        </router-link> -->
      </div>
      <pagination @jump-page="jump" :page="pageConfig" class="pagination"></pagination>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import pagination from "@components/pagination"; // 分页组件
import { aprAudApi } from "../js/server"; // 接口aprAudApi
// import { } from "../js/server";
export default {
  data() {
    return {
      NameHandler: "",
      application: "",
      customerName: "",
      grade: "",
      serviceCenter: "",
      amount: "",
      currentGeneration: "",
      taskTime: "",
      namePartne: "",
      namePartner: "",
      partner: "",
      capital: "",
      taskGainDateStart: null,
      taskGainDateEnd: null,
      transfer: false, // 流转记录默认不显示
      conclusion: false, // 各阶段结论默认不显示
      flowList: [], // 流转记录列表
      tableConclusions: [], // 各阶段结论列表
      for_: [], // 列表
      list_grade: [], // 评分下拉框
      list_current: [], // 当前阶段下拉框
      list_serviceCenter: [], // 所属个贷服务中心
      list_partner: [], // 合作方下拉框
      list_capital: [], // 资金方下拉框
      pageConfig: {
        account: 0, // 总条数
        pageSize: 10, // 当前多少条数据
        currentPage: 1, // 当前页
        showJumpButton: true // 显示跳转按钮
      } // 分页
    };
  },
  methods: {
    handleSelectionChange() {
      console.log();
    },
    // 清空所有的查询条件
    empty() {
      this.application = "";
      this.customerName = "";
    },
    // 分页
    jump(pageNum) {
      this.pageConfig.currentPage = pageNum;
      this.refer(this.pageConfig.currentPage);
    },
    // 列表接口
    refer(pageNum) {
      if (this.application || this.customerName) {
        if (!isNaN(this.amount)) {
          let data = {
            pageNum: pageNum, // 当前页
            pageSize: this.pageConfig.pageSize, // 当前多少条数据
            applicationId: this.application, // 申请编号
            customerName: this.customerName // 客户姓名
          };
          let url = `${aprAudApi.taskList}`;
          this.$MyFetch
            .post(url, data)
            .then((data = {}) => {
              if (data.list.length < 1) {
                this.$message("查询结果为空！");
              }
              this.for_ = data.list;
              this.pageConfig.account = data.total;
              this.pageConfig.currentPage = data.pageNum;
            })
            .catch(err => {
              this.$error(err.message);
            });
        } else {
          this.$error("申请金额只能输入正整数");
        }
      } else {
        this.confirmFn("请至少输入一个查询条件");
        this.for_ = [];
        this.pageConfig.account = 0;
        this.pageConfig.currentPage = 1;
      }
    }
  },
  components: {
    pagination // 分页组件
  },
  created() {}
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
  // 输入框和下拉框部分样式
  .b_content {
    margin-top: 28px;
    // height: 70px;
    text-align: left;
    margin-left: 28px;
    .interval {
      margin-left: -14px;
    }
    // 输入框和下拉框170*40
    .select_7 {
      width: 180px;
      height: 40px;
      margin-right: 15px;
    }
    // 输入框和下拉框172*40
    .select_72 {
      width: 172px;
      height: 40px;
      margin-right: 15px;
      margin-bottom: 5px;
    }
    .el-input {
      margin-bottom: 5px;
    }
    // 查询和清空的公有样式
    .b_button {
      width: 100px;
      height: 40px;
      border-radius: 4px;
      font-size: 14px;
      // position: absolute;
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
      left: 530px;
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
    margin-top: 21px;
    border-radius: 4px;
    .el-table {
      .yincan {
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
  }
  .pagination {
    margin-bottom: 20px;
    margin-top: 40px;
    margin-right: 30px;
  }
}
</style>
