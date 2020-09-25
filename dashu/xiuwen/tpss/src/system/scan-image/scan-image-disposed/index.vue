<template>
  <div class="scan-image-disposed">

    <!-- 详情 -->
    <!-- <face2face-detail :dialogVisible="dialogVisible" :applicationId="applicationId" @closeDialog="dialogVisible = false"></face2face-detail> -->
    <div class="table-area">
      <el-form class="search" :inline="true" :model="searchInfo" ref="searchInfo">
        <el-form-item prop="applicationId">
          <el-input class="width200" v-model.trim="searchInfo.applicationId" placeholder="申请编号"></el-input>
        </el-form-item>
        <el-form-item prop="custName">
          <el-input class="width200" v-model.trim="searchInfo.custName" placeholder="客户姓名"></el-input>
        </el-form-item>
        <el-form-item prop="idCardNo">
          <el-input class="width200" v-model.trim="searchInfo.idCardNo" placeholder="证件号码"></el-input>
        </el-form-item>
        <el-form-item prop="f2fTime">
          <el-date-picker class="width200" v-model.trim="searchInfo.f2fTime" placeholder="面签日期" value-format="yyyy-MM-dd hh:mm:ss"></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button class="width100 button-primary" @click="getList(true)">查询</el-button>
          <el-button class="width100 button-default" @click="clearSearch">清空</el-button>
        </el-form-item>
      </el-form>

      <div class="tableHeight">
        <el-table class="table-noWell" :data="tableData" style="100%">
          <el-table-column type="index" label="序号" width="60"></el-table-column>
          <el-table-column prop="applicationId" label="申请编号"></el-table-column>
          <el-table-column prop="custName" label="客户姓名"></el-table-column>
          <!-- <el-table-column prop="authReasonDesc" label="授权原因"></el-table-column>
          <el-table-column label="是否重签贷款资料">
            <template slot-scope="scope">无</template>
          </el-table-column> -->
          <el-table-column prop="idCardNo" label="身份证号"></el-table-column>
          <el-table-column prop="product1" label="产品ID1"></el-table-column>
          <el-table-column prop="product1F2fConclusion" label="ID1面签结论"></el-table-column>
          <el-table-column prop="product2" label="产品ID2"></el-table-column>
          <el-table-column prop="product2F2fConclusion" label="ID2面签结论"></el-table-column>
          <el-table-column prop="custManagerName" label="客户经理"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button class="button-text" @click="$showImage(scope.row.applicationId, '远程面签', {ReadOnly: '0'})">查看影像</el-button>
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
import { baseApi } from "../js/server.js";
// import face2faceDetail from '../../face2face-remote/face2face-detail/index'; // 详情组件
import pagination from "@components/pagination/index"; // 分页组件
export default {
  name: "scan-image-disposed",
  data() {
    return {
      // 查询信息
      searchInfo: {
        applicationId: "",
        custName: "",
        idCardNo: "",
        f2fTime: "", // 格式为：2018-12-05 12:00:00
        pageNum: 1,
        pageSize: 10
      },
      // 表格信息
      tableData: [],
      total: 0, // 数据总数
      dialogVisible: false, // 详情的显示与隐藏
      applicationId: "" // 申请编号id
    };
  },
  components: {
    pagination
    // face2faceDetail
  },
  created() {
    // 获取数据列表
    this.getList();
  },
  methods: {
    // 清空查询信息
    clearSearch() {
      this.$refs["searchInfo"].resetFields();
      this.getList();
    },
    // 获取数据列表（flag存在，则代表进行点击查询操作）
    getList(flag) {
      // 处理日期为null的问题
      this.searchInfo.f2fTime = this.searchInfo.f2fTime || "";

      this.$MyFetch
        .get(baseApi.image_scan_processeds, this.searchInfo)
        .then(res => {
          // console.log(res);
          this.tableData = res.list;
          this.total = res.total;

          if (flag && this.total === 0) {
            this.confirmFn("无查询结果", "error");
          }
        })
        .catch(err => {
          // console.log('请求失败');
          console.error(err);
          this.confirmFn(err.message, "error");
        });
    },
    // 分页
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
.scan-image-disposed {
}
</style>
