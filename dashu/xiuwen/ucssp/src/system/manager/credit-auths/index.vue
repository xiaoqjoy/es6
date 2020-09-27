<template>
  <div class="credit-auths">
    <div class="table-area">

      <!-- 标题 -->
      <div class="info-title-selectorBefore">
        <span>征信授权任务查询</span>
      </div>

      <!-- 查询表单 -->
      <el-form class="search" :inline="true" :model="searchInfo" ref="searchInfo">
        <el-form-item prop="applicationId">
          <el-input v-model.trim="searchInfo.applicationId" placeholder="申请编号" clearable></el-input>
        </el-form-item>
        <el-form-item prop="customerName">
          <el-input v-model.trim="searchInfo.customerName" placeholder="客户姓名" clearable></el-input>
        </el-form-item>
        <el-form-item prop="certificateNum">
          <el-input v-model.trim="searchInfo.certificateNum" placeholder="证件号码" clearable></el-input>
        </el-form-item>
        <el-form-item prop="authStartTime">
          <el-date-picker v-model.trim="searchInfo.authStartTime" align="left" type="date" placeholder="授权开始时间" value-format="yyyy-MM-dd hh:mm:ss" clearable></el-date-picker>
        </el-form-item>
        <el-form-item prop="authEndTime">
          <el-date-picker v-model.trim="searchInfo.authEndTime" align="left" type="date" placeholder="授权结束时间" value-format="yyyy-MM-dd hh:mm:ss" clearable></el-date-picker>
        </el-form-item>
        <el-form-item prop="authSubmitStartTime">
          <el-date-picker v-model.trim="searchInfo.authSubmitStartTime" align="left" type="date" placeholder="授权提交开始时间" value-format="yyyy-MM-dd hh:mm:ss" clearable></el-date-picker>
        </el-form-item>
        <el-form-item prop="authSubmitEndTime">
          <el-date-picker v-model.trim="searchInfo.authSubmitEndTime" align="left" type="date" placeholder="授权提交结束时间" value-format="yyyy-MM-dd hh:mm:ss" clearable></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button class="width100 button-primary" @click="getList(true)">查询</el-button>
          <el-button class="width100 button-default" @click="clearSearch">清空</el-button>
        </el-form-item>
      </el-form>

      <!-- 表格数据 -->
      <div class="tableHeight">
        <el-table class="table-noWell common__table" :data="tableData" style="width: 100%">
          <el-table-column type="index" label="序号" width="60"></el-table-column>
          <el-table-column prop="applicationId" label="申请编号" width="200"></el-table-column>
          <el-table-column prop="custName" label="客户姓名" width="200"></el-table-column>
          <el-table-column prop="certificateNum" label="证件号码" width="200">
            <template slot-scope="scope">
              <span>{{scope.row.certificateNum | certificateNum}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="productId" label="产品名称" width="200">
            <template slot-scope="scope">
              <p v-for="item in scope.row.productCreditVoList" :key="item.productId">{{item.productId || '无'}}</p>
            </template>
          </el-table-column>
          <el-table-column prop="orgName" label="合作机构" width="200">
            <template slot-scope="scope">
              <p v-for="item in scope.row.productCreditVoList" :key="item.productId">{{item.orgName || '无'}}</p>
            </template>
          </el-table-column>
          <el-table-column prop="reportSourceCode" label="信用报告来源" width="200"></el-table-column>
          <el-table-column prop="reportSourceOrg" label="信用报告提供机构" width="200"></el-table-column>
          <el-table-column prop="custManagerName" label="客户经理" width="200"></el-table-column>
          <el-table-column prop="electronicAuthInd" label="是否电子授权" width="200"></el-table-column>
          <el-table-column prop="rollbackInd" label="是否回退" width="200">
            <template slot-scope="scope">
              <p v-for="item in scope.row.productCreditVoList" :key="item.productId">{{item.rollbackInd ? '是' : '否'}}</p>
            </template>
          </el-table-column>
          <el-table-column prop="currentStatus" label="当前状态" width="200">
            <template slot-scope="scope">
              <span>{{scope.row.currentStatus ? '征信授权完成' : '待征信授权'}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="handlerName" label="提交人" width="200">
            <template slot-scope="scope">
              <p v-for="item in scope.row.productCreditVoList" :key="item.productId">{{item.handlerName || '无'}}</p>
            </template>
          </el-table-column>
          <el-table-column prop="createTime" label="授权开始时间" width="200">
            <template slot-scope="scope">
              <p v-for="item in scope.row.productCreditVoList" :key="item.productId">{{item.createTime || '无'}}</p>
            </template>
          </el-table-column>
          <el-table-column prop="handleTime" label="授权提交时间" width="200">
            <template slot-scope="scope">
              <p v-for="item in scope.row.productCreditVoList" :key="item.productId">{{item.handleTime || '无'}}</p>
            </template>
          </el-table-column>
          <el-table-column label="操作" fixed="right">
            <template slot-scope="scope">
              <el-button class="button-text" @click="$showImage(scope.row.applicationId, '征信授权',{ReadOnly: '0'})">查看详情</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <div class="pagination-page">
        <pagination @jump-page='jump' :page="{currentPage: searchInfo.pageNum,account: total,pageSize: searchInfo.pageSize,showJumpButton: true}"></pagination>
      </div>
    </div>

  </div>
</template>

<script>
import { baseApi } from "../js/server";
import pagination from "@components/pagination/index"; // 分页组件
export default {
  name: "credit-auths",
  components: { pagination },
  data() {
    return {
      // 查询信息
      searchInfo: {
        applicationId: "",
        customerName: "",
        certificateNum: "",
        authStartTime: "",
        authEndTime: "",
        authSubmitStartTime: "",
        authSubmitEndTime: "",
        pageNum: 1,
        pageSize: 10
      },
      // 表格信息
      tableData: [],
      total: 0, // 数据总数
      applicationId: "", // 申请编号
      // 详情
      dialogVisible: false, // 详情的显示与隐藏
      detailTableData: []
    };
  },
  created() {
    // 获取数据列表
    // this.getList();
  },
  methods: {
    // 清空查询信息
    clearSearch() {
      this.$refs["searchInfo"].resetFields();
      // this.getList();
      // 清空表格信息
      this.tableData = [];
    },
    // 获取数据列表（flag存在，则代表进行点击查询操作）
    getList(flag) {
      if (
        this.searchInfo.applicationId ||
        this.searchInfo.customerName ||
        this.searchInfo.certificateNum ||
        this.searchInfo.authStartTime ||
        this.searchInfo.authEndTime ||
        this.searchInfo.authSubmitStartTime ||
        this.searchInfo.authSubmitEndTime
      ) {
        // 处理日期为null的问题
        this.searchInfo.authStartTime = this.searchInfo.authStartTime || "";
        this.searchInfo.authEndTime = this.searchInfo.authEndTime || "";
        this.searchInfo.authSubmitStartTime =
          this.searchInfo.authSubmitStartTime || "";
        this.searchInfo.authSubmitEndTime =
          this.searchInfo.authSubmitEndTime || "";

        this.$MyFetch
          .get(baseApi.credit_auths, this.searchInfo)
          .then(res => {
            // console.log(res);
            this.tableData = res.list;

            // 添加当前状态字段
            this.tableData.forEach(item => {
              let currentStatus = item.productCreditVoList.every(v => {
                return v.uploadInd;
              });
              Object.assign(item, { currentStatus });
            });

            this.total = res.total;

            if (flag && this.total === 0) {
              this.confirmFn("无查询结果", "error");
            }
          })
          .catch(err => {
            console.error(err);
            this.confirmFn(err.message, "error");
          });
      } else {
        this.confirmFn('请至少输入一个查询条件', 'error');
      }
    },
    // 跳转页面
    jump(pageNum) {
      this.searchInfo.pageNum = pageNum;
      this.getList();
    }
  }
};
</script>

<style lang="less">
</style>

<style lang="less" scoped>
.credit-auths {
}
</style>
