<template>
  <div class="scan-image-undisposed">
    <div class="table-area">

      <!-- 详情 -->
      <!-- <face2face-detail :dialogVisible="dialogVisible" :applicationId="applicationId" @closeDialog="dialogVisible = false"></face2face-detail> -->
      <el-form class="search" :inline="true" :model="searchInfo" ref="searchInfo">
        <el-form-item prop="applicationId">
          <el-input class="width200" v-model.trim="searchInfo.applicationId" placeholder="申请编号" clearable></el-input>
        </el-form-item>
        <el-form-item prop="custName">
          <el-input class="width200" v-model.trim="searchInfo.custName" placeholder="客户姓名" clearable></el-input>
        </el-form-item>
        <el-form-item prop="idCardNo">
          <el-input class="width200" v-model.trim="searchInfo.idCardNo" placeholder="证件号码" clearable></el-input>
        </el-form-item>
        <el-form-item prop="f2fTime">
          <el-date-picker class="width200" v-model.trim="searchInfo.f2fTime" placeholder="面签日期" value-format="yyyy-MM-dd hh:mm:ss" clearable></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button class="width100 button-primary" @click="getList(true)">查询</el-button>
          <el-button class="width100 button-default" @click="clearSearch">清空</el-button>
        </el-form-item>
      </el-form>

      <div class="tableHeight">
        <el-table class="table-noWell common__table" :data="tableData" style="100%">
          <el-table-column type="index" label="序号" width="60"></el-table-column>
          <el-table-column prop="applicationId" label="申请编号" width="200"></el-table-column>
          <el-table-column prop="custName" label="客户姓名" width="200"></el-table-column>
          <!-- <el-table-column prop="authReasonDesc" label="授权原因"></el-table-column>
          <el-table-column label="是否重签贷款资料">
            <template slot-scope="scope">无</template>
          </el-table-column> -->
          <el-table-column prop="idCardNo" label="身份证号" width="200"></el-table-column>
          <el-table-column prop="product1" label="产品ID1" width="200"></el-table-column>
          <el-table-column prop="product1F2fConclusion" label="ID1面签结论" width="200"></el-table-column>
          <el-table-column prop="product2" label="产品ID2" width="200" v-if="!isXiuwen"></el-table-column>
          <el-table-column prop="product2F2fConclusion" label="ID2面签结论" width="200" v-if="!isXiuwen"></el-table-column>
          <el-table-column prop="custManagerName" label="客户经理" width="200"></el-table-column>
          <el-table-column label="操作" fixed="right">
            <template slot-scope="scope">
              <el-button class="button-text" @click="$showImage(scope.row.applicationId, '远程面签')">影像扫描</el-button>
              <el-button class="button-text" @click="submitImage(scope.row.applicationId)">提交</el-button>
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
// import face2faceDetail from '../../face2face-remote/face2face-detail/index'; // 详情组件
import pagination from "@components/pagination/index"; // 分页组件
import { baseApi } from "../js/server.js";

export default {
  name: "face2face-undisposed",
  components: {
    // face2faceDetail,
    pagination
  },
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
      tableData: [], // 表格信息
      total: 0, // 面签待处理总数
      applicationId: "", // 当前面核面签选中的申请编号id

      dialogVisible: false // 详情的显示与隐藏
    };
  },
  created() {
    // 查询面签待处理列表
    // this.getList();
  },
  watch: {

  },
  methods: {
    // 清空查询信息
    clearSearch() {
      this.$refs["searchInfo"].resetFields();
      this.getList();
    },
    // 查询面签待处理列表（flag存在，则代表进行点击查询操作）
    getList(flag) {
      // 处理日期为null的问题
      this.searchInfo.f2fTime = this.searchInfo.f2fTime || "";

      this.$MyFetch
        .get(baseApi.image_scan_pendings, this.searchInfo)
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
    },
    // 影像提交
    submitImage(applicationId) {
      // console.log(baseApi.image_scan_submit + applicationId + '/submit');

      this.confirmFn('影像资料是否已扫描上传完成', 'warning').then(() => {
        this.$MyFetch
          .post(baseApi.image_scan_submit + applicationId + '/submit')
          .then(res => {
            this.confirmFn('影像提交成功', 'success');

            this.$router.push({name: "scan-image-disposed"});
          })
          .catch(err => {
            console.error(err);
            this.confirmFn(err.message, 'error');
          });
      });
    }
  }
};
</script>

<style lang="less">
.scan-image-undisposed {
  .call-number {
    .el-dialog .el-dialog__body {
      background-color: #fff;
      text-align: center;
    }
  }
}
</style>

<style lang="less" scoped>
.scan-image-undisposed {
  .call-number {
    text-align: center;
    .call-content {
      margin-top: -20px;
      p {
        margin-bottom: 25px;
        &:nth-child(2) {
          border-bottom: 1px solid #eee;
          padding-bottom: 25px;
        }
      }
    }
    .call-btn {
      .el-button {
        &:first-child {
          background-color: @green;
        }
      }
    }
  }
}
</style>
