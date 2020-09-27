<style lang="less" rel="stylesheet/less" scoped>
.FieldManagement {
  position: relative;
  min-height: 820px;
  .boxShadow(0, 0);
  padding: 20px 31px;
  .btn__add {
    /deep/ .el-icon-plus {
      line-height: 1.2;
      font-weight: 600;
    }
    margin-bottom: 20px;
  }
  .pagination {
    margin-top: 20px;
    // position: absolute;
    // bottom: 100px;
    // right: 31px;
  }
  .common__table {
    /deep/.el-table__body-wrapper {
      max-height: 550px;
      overflow-y: auto;
    }
  }
  .btn-area {
    margin-top: 20px;
    // position: absolute;
    // width: 100%;
    // bottom: 40px;
    // left: 0;
    text-align: center;
  }
  .b_button {
    width: 100px;
    height: 40px;
    border-radius: 4px;
    font-size: 14px;
  }
  .query {
    background: #538bf1;
    color: #ffffff;
    margin-left: 18px;
  }
   .empty {
      background: #ffffff;
      color: #538bf1;
      border: 1px solid #538bf1;
    }
}
</style>
<template>
  <div class="FieldManagement">
    <!-- 顶岗管理 -->
    <el-form :inline="true" :model="queryData" ref="checkForm" class="demo-form-inline" :rules="customerRule">
      <el-form-item prop="userId">
        <el-input v-model="queryData.userId" placeholder="用户编号" class="width200" maxlength="50"></el-input>
      </el-form-item>
      <el-form-item prop="applicationId">
        <el-input v-model="queryData.applicationId" placeholder="申请编号" class="width200" maxlength="50"></el-input>
      </el-form-item>
      <el-form-item prop="taskDefKey">
        <el-select
          v-model="queryData.taskDefKey"
          collapse-tags
          clearable
          class="width200"
          placeholder="流程环节"
        >
          <el-option v-for="(item,i) in taskDefKey" :key='i' :label="item.taskName" :value="item.taskCode"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop="orgId">
        <el-select
          v-model="queryData.orgId"
          collapse-tags
          clearable
          class="width200"
          placeholder="合作方"
        >
          <el-option v-for="(item,i) in orgId" :key='i' :label="item.codeText" :value="item.codeValue"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop="fundingPartyId">
        <el-select
          v-model="queryData.fundingPartyId"
          collapse-tags
          clearable
          class="width200"
          placeholder="资金方"
        >
          <el-option v-for="(item,i) in fundingPartyId" :key='i' :label="item.codeText" :value="item.codeValue"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button class="b_button query button" @click="checkData">查询</el-button>
        <!-- <el-button type="primary" @click="checkData" class="button width100 button__blue">查询</el-button> -->
      </el-form-item>
      <el-form-item>
        <el-button class="b_button empty button" @click="reset('checkForm')">清除</el-button>
        <!-- <el-button type="primary" @click="reset('checkForm')" class="button button__border-blue width100">清除</el-button> -->
      </el-form-item>
    </el-form>
    <el-table
      :data="tableData"
      class="common__table"
      header-cell-class-name="table-head"
      row-class-name="table-tr"
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection"></el-table-column>
      <el-table-column prop="userId" label="用户编号"></el-table-column>
      <el-table-column prop="userName" label="用户姓名"></el-table-column>
      <el-table-column prop="custName" label="客户姓名"></el-table-column>
      <el-table-column width="150" prop="authReason" label="授权原因"></el-table-column>
      <el-table-column prop="applicationId" label="申请编号"></el-table-column>
      <el-table-column prop="taskName" label="流程环节"></el-table-column>
      <el-table-column prop="productNameOne" label="产品1"></el-table-column>
      <el-table-column prop="productNameTwo" label="产品2"></el-table-column>
    </el-table>
    <pagination :page="pageConfig" class="pagination" @jump-page="queryApi"></pagination>
    <div class="btn-area">
      <el-button class="button__width-200 empty button" @click="getCallInfo">顶岗</el-button>
      <el-button class="button__width-200 query button" @click="openDg()">顶岗记录</el-button>
    </div>
    <transition name="fade"></transition>
    <!-- 顶岗记录 -->
    <history v-if="historyV"></history>
    <!-- 顶岗 -->
    <field v-if="fieldV" :isfield='isfield' @getparent='getparent'></field>
  </div>
</template>
<script type="text/ecmascript-6">
import pagination from "@components/pagination";
import api from "../js/server/server";
import history from "./history";
import field from "./field";
import myRules from '@common/js/rules.js';
export default {
  data() {
    return {
      historyV: false, // 顶岗记录
      fieldV: false, // 顶岗
      isfield: [], // 选择顶岗的人员
      tableData: [], // 部门级联 数据关系字典
      // 绑定的查询值
      queryData: {
        userId: "",
        userName: "",
        applicationId: "",
        taskDefKey: [], // 流程环节
        orgId: [], // 合作方
        fundingPartyId: [] // 资金方
      },
      currentCheck: null, // 存放当前查询的条件
      pageConfig: {
        account: 1,
        currentPage: 1,
        pageSize: 10,
        showJumpButton: true
      },
      taskDefKey: [], // 流程环节,
      fundingPartyId: [], // 资金方
      orgId: [], // 合作方
      applicationId: "",
      params: {
        userId: "", //	String	是	50	用户编号
        userName: "",
        applicationId: "", //	String	是	50	申请编号
        taskCode: "", //	String	是	50	流程环节
        fundingPartyId: "", //	String	是	50	资金方
        orgId: "", //	String	是	50	合作方
        pageNum: "", //	int	是	50	页码
        pageSize: "" //	int	是	50	页大
      },
      customerRule: {
          fundingPartyId: [],
          orgId: [],
          taskDefKey: [],
          applicationId: [
            { validator: myRules.nameRule3, trigger: 'blur' }
          ],
          userId: [
            { validator: myRules.nameRule3, trigger: 'blur' }
          ]
        }
    };
  },
  created() {
    this.getflow(); // 获取流程环节
    this.foundList(); // 资金方
    this.partnerList(); // 合作方
  },
  methods: {
    getparent() { // 重新调用接口
      this.fieldV = false;
      this.checkData();
    },
    handleSelectionChange(val) {
       this.isfield = [...val];
      },
    getCallInfo() {
      if (this.isfield.length) {
        var fie = true;
        this.isfield.map(res => {
          if (res.taskCode === this.isfield[0].taskCode) {
          } else {
            fie = false;
          }
        });
        if (fie) {
          this.fieldV = true;
        } else {
          this.confirmFn("不同流程环节无法进行顶岗操作");
        }
      } else {
        this.confirmFn("请选择需要顶岗的人员");
      }
    },
    openDg() {
      this.historyV = true;
    },
    closeDg(update) {
      if (update && !!this.currentCheck) {
        this.queryApi(1);
      }
    },
    reset(formName) {
      this.$refs[formName].resetFields();
    },
    // 获取流程环节
    getflow() {
      this.$MyFetch.get(api.user.getflow)
      .then((data = {}) => {
        this.taskDefKey = data;
      })
      .catch((err) => {
        this.$error(err.message);
      });
    },
    // 资金方
    foundList() {
       this.$MyFetch.get(api.user.foundList)
        .then((data = {}) => {
          this.fundingPartyId = data;
        })
        .catch((err) => {
          this.$error(err.message);
        });
    },
    // 合作方
    partnerList() {
      this.$MyFetch.get(api.user.partnerList)
        .then((data = {}) => {
          this.orgId = data;
        })
        .catch((err) => {
          this.$error(err.message);
        });
    },
    // 按钮点击查询
    checkData() {
      if (
        !this.queryData.userId &&
        this.queryData.taskDefKey.length === 0 &&
        this.queryData.orgId.length === 0 &&
        this.queryData.fundingPartyId.length === 0 &&
        !this.queryData.applicationId
      ) {
        this.confirmFn("请输入查询条件", "error");
      } else {
        this.currentCheck = {
          userId: this.queryData.userId, //	String	是	50	用户编号
          applicationId: this.queryData.applicationId, //	String	是	50	申请编号
          taskCode: this.queryData.taskDefKey, //	String	是	50	流程环节
          fundingPartyId: this.queryData.fundingPartyId, //	String	是	50	资金方
          orgId: this.queryData.orgId //	String	是	50	合作方
        };
        this.queryApi(1);
      }
    },
    queryApi(pageNum) {
      this.currentCheck = Object.assign(this.currentCheck, {
        pageNum: pageNum,
        pageSize: 10
      });
        this.$MyFetch.get(api.user.businessList, this.currentCheck)
        .then((data = {}) => {
          if (data.list) {
            if (data.list.length) {
              data.list.forEach(v => {
                let departmentName = "";
                if (v.department) {
                  v.department.forEach(p => {
                    departmentName += p.departmentName + ",";
                  });
                  departmentName = departmentName.slice(0, -1);
                }
                v.departmentName = !departmentName ? "/" : departmentName;
              });
              this.tableData = [...data.list];
            } else {
              this.confirmFn("未查询到相关记录");
              this.tableData = [];
            }
          }
          this.pageConfig.account = data.total || 0;
          this.pageConfig.currentPage = pageNum;
        })
        .catch((err) => {
          this.$error(err.message);
        });
    }
  },
  components: {
    pagination,
    history,
    field
  }
};
</script>
