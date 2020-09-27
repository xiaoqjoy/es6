<template>
  <div>
    <div class="content">
      <!-- 输入框和下拉框 -->
      <div class="b_content">
        <el-input
          class="select_72"
          v-model="newApplicationId"
          placeholder="新申请编号"
          clearable
        ></el-input>
        <el-input
          class="select_72"
          v-model="custName"
          placeholder="客户名称"
          clearable
        ></el-input>
        <el-input
          class="select_72"
          v-model="certificateNum"
          placeholder="证件编号"
          clearable
        ></el-input>
        <!-- <span class="span effective">生效日期</span> -->
        <el-date-picker
          v-model="applyDate"
          class="select_7"
          type="datetime"
          value-format="yyyy-MM-dd HH:mm:ss"
          placeholder="申请时间"
        >
        </el-date-picker>
        <el-input
          class="select_72"
          v-model="applicationId"
          placeholder="原申请编号"
          clearable
        ></el-input>
        <el-button
          class="b_button query"
          @click="refer(1,true)"
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
        >
          <el-table-column
            prop="newApplicationId"
            label="新申请编码"
          >
          </el-table-column>
          <el-table-column
            prop="authReason"
            label="授权原因"
          >
          </el-table-column>
          <el-table-column
            prop="custName"
            label="客户姓名"
          >
          </el-table-column>
          <el-table-column
            prop="certificateNum"
            label="身份证号"
          >
          </el-table-column>
          <el-table-column
            prop="mobileNum"
            label="手机号码"
            width="180"
          >
          </el-table-column>
          <el-table-column
            prop="custmanager"
            label="客户经理"
          >
          </el-table-column>
          <el-table-column
            prop="applyDate"
            label="申请时间"
          >
          </el-table-column>
          <el-table-column
            prop="applicationId"
            label="原申请编号"
          >
          </el-table-column>
          <el-table-column
            prop="remarkTxt"
            label="备注"
          >
          </el-table-column>
        </el-table>
      </div>
      <pagination
        @jump-page='jump'
        :page='pageConfig'
        class="pagination"
      ></pagination>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import pagination from "@components/pagination"; // 分页组件
import { configApi } from "../../js/server.js"; // 接口
export default {
  data() {
    return {
      newApplicationId: "", // 新申请编号
      applicationId: "", // 原申请编号
      applyDate: "", // 申请时间
      certificateNum: "", // 身份证号码
      custName: "", // 客户姓名
      for_: [
      ], // 渲染数据列表
      pageConfig: {
        account: 0, // 总条数
        pageSize: 10, // 当前多少条数据
        currentPage: 1, // 当前页
        showJumpButton: true // 显示跳转按钮
      } // 分页
    };
  },
  methods: {
    // 分页
    jump(pageNum) {
      this.pageConfig.currentPage = pageNum;
      this.refer(this.pageConfig.currentPage);
      // this.defaultList(this.pageConfig.currentPage);
    },
    // 情空查询条件
    empty() {
      this.newApplicationId = ""; // 新申请编号
      this.applicationId = ""; // 原申请编号
      this.applyDate = ""; // 申请时间
      this.certificateNum = ""; // 身份证号码
      this.custName = "";// 客户姓名
    },
    // 查询档案制作
    refer(pageNum) {
      let url = configApi.specialBusiness_done;
      let data = {
        newApplicationId: this.newApplicationId, // 新申请编号
        applicationId: this.applicationId, // 原申请编号
        applyDate: this.applyDate, // 申请时间
        certificateNum: this.certificateNum, // 身份证号码
        custName: this.custName, // 客户姓名
        orderBy: "",
        pageNum: pageNum, // 当前页
        pageSize: this.pageConfig.pageSize // 当前多少条数据
      };
      this.$MyFetch
        .get(url, data)
        .then((data = {}) => {
          console.log(data);
          this.for_ = data.list;
          this.pageConfig.account = data.total;
          this.pageConfig.currentPage = data.pageNum;
        })
        .catch(err => {
          this.$message.error(err.message);
        });
    }
  },
  components: {
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
  padding-top: 20px;
  min-height: 800px;
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
    text-align: left;
    margin-left: 28px;
    // 输入框和下拉框170*40
    .select_7 {
      width: 170px;
      height: 40px;
      margin-right: 15px;
      // margin-bottom: 20px;
    }
    // 输入框和下拉框172*40
    .select_72 {
      width: 172px;
      height: 40px;
      margin-right: 15px;
      // margin-bottom: 20px;
    }
    // 查询和清空的公有样式
    .b_button {
      width: 100px;
      height: 40px;
      border-radius: 4px;
      font-size: 14px;
      // margin-bottom: 20px;
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
    .span {
      position: absolute;
    }
    .effective {
      left: 25.3%;
      top: 8%;
      font-size: 12px;
      color: #bbbbbb;
      letter-spacing: 1.09px;
    }
    .transverse {
      left: 35.1%;
      top: 12.5%;
      color: #bbbbbb;
    }
  }
  // 表格总体样式
  .tables {
    overflow-y: auto;
    overflow-x: hidden;
    min-height: 600px;
    width: 97%;
    margin: 0px auto;
    border: 1px solid #d0d0d0;
    margin-top: 21px;
    border-radius: 4px;
    .editor {
      font-size: 14px;
      color: #4a90e2;
      letter-spacing: 0;
    }
    .delete {
      font-size: 14px;
      color: #f55f5f;
      letter-spacing: 0;
      margin-left: 20px;
    }
  }
  .pagination {
    margin: 70px 30px 20px 0;
  }
}
</style>
