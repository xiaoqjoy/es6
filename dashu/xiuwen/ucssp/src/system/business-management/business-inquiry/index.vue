<template>
  <div>
    <div class="content">
      <!-- 输入框和下拉框 -->
      <div class="b_content">
        <el-input clearable class="select_72" v-model="NameHandler" placeholder="处理人姓名"></el-input>
        <el-input clearable class="select_72" v-model="application" placeholder="申请编号"></el-input>
        <el-input clearable class="select_72" v-model="customerName" placeholder="客户姓名"></el-input>
        <el-select clearable class="select_72" v-model="grade" placeholder="评分">
          <el-option
            v-for="item in list_grade"
            :key="item.riskLevelCode"
            :label="item.riskLevelName"
            :value="item.riskLevelCode"
          ></el-option>
        </el-select>
        <el-input clearable class="select_72" v-model="amount" placeholder="申请金额"></el-input>
        <el-select clearable class="select_72" v-model="currentGeneration" placeholder="当前阶段">
          <el-option
            v-for="item in list_current"
            :key="item.taskCode"
            :label="item.taskName"
            :value="item.taskCode"
          ></el-option>
        </el-select>
        <el-date-picker
          v-model="taskGainDateStart"
          class="select_7"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="任务获取开始时间">
        </el-date-picker>
        <span class="interval">至</span>
        <el-date-picker
          v-model="taskGainDateEnd"
          class="select_7"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="任务获取结束时间">
        </el-date-picker>
        <el-select clearable class="select_72" v-model="serviceCenter" placeholder="所属个贷服务中心">
          <el-option
            v-for="item in list_serviceCenter"
            :key="item.serviceId"
            :label="item.serviceName"
            :value="item.serviceId"
          ></el-option>
        </el-select>
        <el-select clearable class="select_72" v-model="partner" placeholder="合作方名称">
          <el-option
            v-for="item in list_partner"
            :key="item.codeValue"
            :label="item.codeText"
            :value="item.codeValue"
          ></el-option>
        </el-select>
        <el-select clearable class="select_72" v-model="capital" placeholder="资金方名称">
          <el-option
            v-for="item in list_capital"
            :key="item.codeValue"
            :label="item.codeText"
            :value="item.codeValue"
          ></el-option>
        </el-select>
        <el-button class="b_button query" @click="refer(1)">查询</el-button>
        <el-button class="b_button empty" @click="empty">清空</el-button>
      </div>
      <!-- 表格 -->
      <div class="tables">
        <el-table
          :default-sort="{prop: 'date', order: 'descending'}"
          :header-cell-style="{'font-size':'12px','text-align':'center','height':'38.9px','background':'#F9FAFB'}"
          ref="multipleTable"
          :data="for_"
          tooltip-effect="dark"
          style="width: 100%"
          @selection-change="handleSelectionChange"
        >
          <el-table-column prop="taskName" label="当前阶段"></el-table-column>
          <el-table-column width="150" prop="dealByName" label="处理人"></el-table-column>
          <el-table-column width="160" prop="applicationId" label="申请编号"></el-table-column>
          <el-table-column width="150" prop="custName" label="客户姓名"></el-table-column>
          <el-table-column width="200" prop="productNameOne" label="产品1">
            <template slot-scope="scope">
              <el-popover width="500" trigger="hover" placement="top">
                <p>{{scope.row.productNameOne}}</p>
                <div slot="reference">
                  <p class="yincan">{{scope.row.productNameOne}}</p>
                </div>
              </el-popover>
            </template>
          </el-table-column>
          <!-- <el-table-column width="200" prop="productNameTwo" label="产品2">
            <template slot-scope="scope">
              <el-popover width="500" trigger="hover" placement="top">
                <p>{{scope.row.productNameTwo}}</p>
                <div slot="reference">
                  <p class="yincan">{{scope.row.productNameTwo}}</p>
                </div>
              </el-popover>
            </template>
          </el-table-column> -->
          <el-table-column prop="switchHighScoreInd" label="是否超分贷">
            <template slot-scope="scope">
              <span>{{scope.row.switchHighScoreInd ? '是' : '否'}}</span>
            </template>
          </el-table-column>
          <el-table-column width="150" prop="riskLevel" label="评分"></el-table-column>
          <el-table-column prop="applicationPurposeAmt" label="申请金额"></el-table-column>
          <el-table-column width="100" prop="claimTime" label="任务获取时间"></el-table-column>
          <el-table-column width="100" prop="firstOperateTime" label="开始操作时间"></el-table-column>
          <el-table-column width="100" prop="operateDuration" label="操作时间差"></el-table-column>
          <el-table-column width="200" prop="serviceName" label="所属个贷服务中心"></el-table-column>
          <el-table-column prop="operation" fixed="right" width="250" label="操作">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="alert_l(scope.row)">流转记录</el-button>
              <el-button type="text" size="small" @click="alert_g(scope.row)">各阶段结论</el-button>
              <router-link
                v-if="scope.row.taskName === '贷款审批'? true:false"
                target="_blank"
                :to="{name:'approval-pending-start', query:{appID:scope.row.applicationId, isEdit:true}}"
              >
                <el-button type="text" size="small">详情</el-button>
              </router-link>
              <router-link
                v-if="scope.row.taskName === '贷款审计'? true:false"
                target="_blank"
                :to="{name:'audit-pending-start', query:{appID:scope.row.applicationId, isEdit:true}}"
              >
                <el-button type="text" size="small">详情</el-button>
              </router-link>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <pagination @jump-page="jump" :page="pageConfig" class="pagination"></pagination>
    </div>
    <transferRecord :flowList_="flowList" v-if="transfer" @close_transfer="transfer_"/>
    <conclusionStage
      :tableConclusions_="tableConclusions"
      v-if="conclusion"
      @close_conclusion="conclusion_"
    />
  </div>
</template>

<script type="text/ecmascript-6">
import pagination from "@components/pagination"; // 分页组件
import transferRecord from "../business-inquiry/transferRecord/index"; // 流转记录组件
import conclusionStage from "../business-inquiry/conclusionStage/index"; // 各阶段结论组件
import { configApi } from "../js/server"; // 接口
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
    // 打开各阶段结论组件
    alert_g(detail) {
      let url = `${configApi.apprDecision}/${detail.applicationId}`;
      this.$MyFetch
        .get(url)
        .then((data = {}) => {
          console.log(data);
          for (let i = 0; i < data.length; i++) {
            data[i].decisionAndOpinion = data[i].decisionAndOpinion.replace(/\n/g, "<br/>");
          };
          this.tableConclusions = data;
        })
        .catch(err => {
          this.$error(err.message);
        });
      this.conclusion = true;
    },
    // 关闭各阶段结论组件
    conclusion_() {
      this.conclusion = false;
    },
    // 打开流转记录组件
    alert_l(detail) {
      let url = `${configApi.apprRecord}/${detail.applicationId}`;
      this.$MyFetch
        .get(url)
        .then((data = {}) => {
          console.log(data);
          this.flowList = data;
        })
        .catch(err => {
          this.$error(err.message);
        });
      this.transfer = true;
    },
    // 关闭流转记录
    transfer_() {
      this.transfer = false;
    },
    // 评分下拉框
    scoreBox() {
      let url = configApi.appronRisklevel;
      this.$MyFetch
        .get(url)
        .then((data = {}) => {
          console.log(data);
          this.list_grade = data;
        })
        .catch(err => {
          this.$error(err.message);
        });
    },
    // 当前阶段下拉框
    dropStage() {
      let url = configApi.appronTask;
      this.$MyFetch
        .get(url)
        .then((data = {}) => {
          console.log(data);
          this.list_current = data;
        })
        .catch(err => {
          this.$error(err.message);
        });
    },
    // 所属个贷服务中心下拉框
    serviceCenter_() {
      let url = configApi.appronService;
      this.$MyFetch
        .get(url)
        .then((data = {}) => {
          console.log(data);
          this.list_serviceCenter = data;
        })
        .catch(err => {
          this.$error(err.message);
        });
    },
    // 合作方下拉框
    partnerBox() {
      let url = `${configApi.partner}`;
      this.$MyFetch
        .get(url)
        .then((data = {}) => {
          console.log(data);
          this.list_partner = data;
        })
        .catch(err => {
          this.$error(err.message);
        });
    },
    // 资金方下拉框
    fundBox() {
      let url = `${configApi.found}`;
      this.$MyFetch
        .get(url)
        .then((data = {}) => {
          console.log(data);
          this.list_capital = data;
        })
        .catch(err => {
          this.$error(err.message);
        });
    },
    // 清空所有的查询条件
    empty() {
      this.application = "";
      this.customerName = "";
      this.NameHandler = "";
      this.amount = "";
      this.grade = "";
      this.serviceCenter = "";
      this.currentGeneration = "";
      this.submissionTime = "";
      this.taskTime = "";
      this.partner = "";
      this.capital = "";
      this.taskGainDateStart = "";
      this.taskGainDateEnd = "";
    },
    // 分页
    jump(pageNum) {
      this.pageConfig.currentPage = pageNum;
      this.refer(this.pageConfig.currentPage);
    },
    // 列表接口
    refer(pageNum) {
      if (
        this.NameHandler ||
        this.application ||
        this.customerName ||
        this.grade ||
        this.amount ||
        this.currentGeneration ||
        this.taskGainDateStart ||
        this.taskGainDateEnd ||
        this.serviceCenter ||
        this.partner ||
        this.capital
      ) {
        if (!isNaN(this.amount)) {
          let data = {
            pageNum: pageNum, // 当前页
            pageSize: this.pageConfig.pageSize, // 当前多少条数据
            operatorName: this.NameHandler, // 处理人姓名
            applicationId: this.application, // 申请编号
            customerName: this.customerName, // 客户姓名
            riskLevel: this.grade, // 评分
            applicationSubmitAmt: this.amount, // 申请金额
            taskCode: this.currentGeneration, // 当前阶段
            serviceId: this.serviceCenter, // 所属个贷服务中心
            orgId: this.partner, // 合作方名称
            fundingPartyId: this.capital, // 资金方名称
            taskGainDateStart: this.taskGainDateStart,
            taskGainDateEnd: this.taskGainDateEnd
          };
          let url = `${configApi.appronTheWay}`;
          this.$MyFetch
            .post(url, data)
            .then((data = {}) => {
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
    pagination, // 分页组件
    transferRecord, // 流转记录组件
    conclusionStage // 各阶段结论组件
  },
  created() {
    this.scoreBox();
    this.dropStage();
    this.serviceCenter_();
    this.partnerBox();
    this.fundBox();
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
