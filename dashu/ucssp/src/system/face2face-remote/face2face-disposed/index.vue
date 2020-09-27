<template>
  <div class="face2face-disposed">

    <!-- 详情 -->
    <face2face-detail-remote :dialogVisible="dialogVisible" :applicationId="applicationId" @closeDialog="dialogVisible = false"></face2face-detail-remote>

    <div class="table-area">
      <el-form class="search" :inline="true" :model="searchInfo" ref="searchInfo">
        <el-form-item prop="applicationId">
          <el-input class="width200" v-model.trim="searchInfo.applicationId" placeholder="申请编号" clearable></el-input>
        </el-form-item>
        <el-form-item prop="customerName">
          <el-input class="width200" v-model.trim="searchInfo.customerName" placeholder="客户姓名" clearable></el-input>
        </el-form-item>
        <el-form-item prop="idCardNo">
          <el-input class="width200" v-model.trim="searchInfo.idCardNo" placeholder="证件号码" clearable></el-input>
        </el-form-item>
        <el-form-item prop="f2fTime">
          <el-date-picker class="width200" v-model.trim="searchInfo.f2fTime" placeholder="面签日期" value-format="yyyy-MM-dd hh:mm:ss" clearable></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button class="width100" type="primary" @click="getList(true)">查询</el-button>
          <el-button class="width100" type="primary" plain @click="clearSearch">清空</el-button>
        </el-form-item>
      </el-form>

      <el-table :data="tableData" style="width: 100%" class="common__table">
        <el-table-column prop="applicationId" label="申请编号" width="200"></el-table-column>
        <el-table-column prop="customerName" label="客户姓名" width="200"></el-table-column>
        <el-table-column prop="idCardNo" label="身份证号" width="200"></el-table-column>
        <el-table-column prop="authReasonDesc" label="授权原因" width="200"></el-table-column>
        <el-table-column prop="handleMan" label="处理人" width="200"></el-table-column>
        <el-table-column prop="productName1" label="产品1" width="200"></el-table-column>
        <el-table-column prop="productId1Conclusion" label="产品1 面签结论" width="200"></el-table-column>
        <el-table-column prop="productId1DocumentId" label="产品1 档案编号" width="200">
          <template slot-scope="scope">
            <el-tooltip effect="dark" :content="scope.row.productId1DocumentId" placement="top">
              <div class="ellipsis">
                {{scope.row.productId1DocumentId}}
              </div>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column prop="productName2" label="产品2" width="200" v-if="!isXiuwen"></el-table-column>
        <el-table-column prop="productId2Conclusion" label="产品2 面签结论" width="200" v-if="!isXiuwen"></el-table-column>
        <el-table-column prop="productId2DocumentId" label="产品2 档案编号" width="200" v-if="!isXiuwen">
          <template slot-scope="scope">
            <el-tooltip effect="dark" :content="scope.row.productId2DocumentId" placement="top">
              <div class="ellipsis">
                {{scope.row.productId2DocumentId}}
              </div>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column prop="overdueInd1" label="产品1是否逾期" width="120">
          <template slot-scope="scope">
            <div>
              {{scope.row.overdueInd1 === null ? '' : scope.row.overdueInd1 ? '是': "否"}}
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="overdueInd2" label="产品2是否逾期" width="120">
          <template slot-scope="scope">
            <div>
              {{scope.row.overdueInd2 === null ? '' : scope.row.overdueInd2 ? '是': "否"}}
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="custManagerName" label="客户经理" width="200"></el-table-column>
        <el-table-column label="操作" fixed="right">
          <template slot-scope="scope">
            <el-button type="text" @click="showDetail(scope.row.applicationId)">详情</el-button>
          </template>
        </el-table-column>
      </el-table>

      <div class="pagination-page">
        <pagination @jump-page='jump' :page="{currentPage: searchInfo.pageNum,account: total,pageSize: searchInfo.pageSize,showJumpButton: true}"></pagination>
      </div>

    </div>
  </div>
</template>
<script>
import { baseApi } from "../js/server.js";
// import face2faceDetail from '../face2face-detail/index'; // 详情组件
import pagination from "@components/pagination/index"; // 分页组件
export default {
  name: "face2face-disposed",
  data() {
    return {
      // 查询信息
      searchInfo: {
        applicationId: "",
        customerName: "",
        idCardNo: "",
        f2fTime: "",
        pageNum: 1,
        pageSize: 10
      },
      // 表格信息
      tableData: [],
      total: 0, // 数据总数
      dialogVisible: false, // 详情的显示与隐藏
      applicationId: "" // 记录申请编号,
    };
  },
  components: { pagination },
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
        .get(baseApi.processed_list, this.searchInfo)
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
.face2face-disposed {
}
</style>
