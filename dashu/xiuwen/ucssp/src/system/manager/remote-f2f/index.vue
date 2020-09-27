<template>
  <div class="remoter-f2f">
    <div class="table-area">

      <!-- 详情 -->
      <face2face-detail-remote :dialogVisible="dialogVisible" :applicationId="applicationId" @closeDialog="dialogVisible = false"></face2face-detail-remote>

      <!-- 标题 -->
      <div class="info-title-selectorBefore">
        <span>远程面签任务查询</span>
        <p v-if="!isCpms_r_manager_0003">
          剩余面签数量：
          <span class="theme">{{totalNum}}</span>
          <i class="el-icon-refresh theme" :class="{rotateAnim: isRefresh}" @click="refresh" title="刷新数量"></i>
        </p>
      </div>

      <!-- 查询表单 -->
      <el-form class="search" :inline="true" :model="searchInfo" ref="searchInfo">
        <el-form-item prop="applicationId">
          <el-input v-model.trim="searchInfo.applicationId" placeholder="申请编号" clearable></el-input>
        </el-form-item>
        <el-form-item prop="customerName">
          <el-input v-model.trim="searchInfo.customerName" placeholder="客户姓名" clearable></el-input>
        </el-form-item>
        <el-form-item prop="idCardNo">
          <el-input v-model.trim="searchInfo.idCardNo" placeholder="证件号码" clearable></el-input>
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
          <el-table-column prop="customerName" label="客户姓名" width="200"></el-table-column>
          <el-table-column prop="subcompanyName" label="分公司" width="200"></el-table-column>
          <el-table-column prop="serviceName" label="个贷服务中心" width="200"></el-table-column>
          <el-table-column prop="idNo" label="身份证号码" width="200">
            <template slot-scope="scope">
              <span>{{scope.row.idNo | certificateNum}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="faceCheckConclusion" label="面核结论" width="200"></el-table-column>
          <el-table-column prop="product1" label="产品ID1" width="200"></el-table-column>
          <el-table-column prop="product2" label="产品ID2" width="200" v-if="!isXiuwen"></el-table-column>
          <el-table-column prop="customerManager" label="客户经理" width="200"></el-table-column>
          <el-table-column prop="currentTaskName" label="当前阶段" width="200"></el-table-column>
          <el-table-column prop="rejectReason" label="否决原因" width="200"></el-table-column>
          <el-table-column prop="handleMan" label="处理人" width="200"></el-table-column>
          <el-table-column label="操作" fixed="right" width="150">
            <template slot-scope="scope">
              <el-button class="button-text" @click="showDetail(scope.row.applicationId)">详情</el-button>
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
import { baseApi } from '../js/server';
import pagination from "@components/pagination/index"; // 分页组件
import face2faceDetail from '../../face2face-remote/face2face-detail/index'; // 远程面签详情组件
export default {
  name: "remoter-f2f",
  components: {pagination, face2faceDetail},
  data() {
    return {
      isRefresh: false, // 是否需要刷新
      totalNum: 0, // 剩余面签数量

      // 查询信息
      searchInfo: {
        applicationId: "",
        customerName: "",
        idCardNo: "",
        pageNum: 1,
        pageSize: 10
      },
      // 表格信息
      tableData: [],
      total: 0, // 数据总数
      applicationId: "", // 申请编号

      // 详情
      dialogVisible: false // 详情的显示与隐藏
    };
  },
  created() {
    // 获取数据列表
    // this.getList();

    // 获取剩余面签数量
    if (!this.isCpms_r_manager_0003) {
      this.getTotal();
    }
  },
  methods: {
    // 获取剩余面签数量
    getTotal() {
      this.$MyFetch
        .get(baseApi.remoter_f2f_amount)
        .then(res => {
          // console.log(res);
          this.totalNum = res;
        })
        .catch(err => {
          // console.log('请求失败');
          console.error(err);
          this.confirmFn(err.message, "error");
        });
    },
    // 刷新剩余面签数量
    refresh() {
      this.isRefresh = true;
      setTimeout(() => {
        this.getTotal();
        this.isRefresh = false;
      }, 500);
    },

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
        this.searchInfo.idCardNo
      ) {
        this.$MyFetch
        .get(baseApi.remoter_f2f_list, this.searchInfo)
        .then(res => {
          // console.log(res);
          this.tableData = res.list;
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
    },
    // 显示详情
    showDetail(applicationId) {
      this.applicationId = applicationId;
      this.dialogVisible = true;
    }
  }
};
</script>

<style lang="less">

</style>

<style lang="less" scoped>
.remoter-f2f {

}
</style>
