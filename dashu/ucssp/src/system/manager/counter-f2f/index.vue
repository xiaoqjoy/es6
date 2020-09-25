<template>
  <div class="counter-f2f">
    <div class="table-area">

      <!-- 详情 -->
      <face2face-detail :dialogVisible="dialogVisible" :applicationId="applicationId" @closeDialog="dialogVisible = false"></face2face-detail>

      <!-- 视频播放组件 -->
      <!-- <player></player> -->

      <!-- 详情 RL20181112000162，http://www.mjpai.cn/static/img/heartUrle.88f9612.jpg -->
      <el-dialog class="dialog" title="下载视频" :visible.sync="videoVisible" width="945px" center>
        <el-table :data="videoTableData" style="100%" ref="videoTableData" height="500" @selection-change="hangleChange" @row-click="rowClick">
          <el-table-column type="selection"></el-table-column>
          <el-table-column prop="videoId" label="视频编号"></el-table-column>
          <el-table-column prop="applicationId" label="申请编号"></el-table-column>
          <el-table-column prop="custName" label="客户姓名"></el-table-column>
          <el-table-column prop="orgName" label="合作机构"></el-table-column>
          <el-table-column prop="videoType" label="面签环节"></el-table-column>
          <!-- <el-table-column label="操作">
            <template slot-scope="scope">
              <img src="@common/img/ic_play.png" class="video-img" alt="" @click="viewVideo(scope.row.videoId)">
            </template>
          </el-table-column> -->
        </el-table>

        <div class="bottom-btn">
          <el-button class="width200 button-primary" @click="videoDownload">下载视频</el-button>
        </div>
      </el-dialog>

      <!-- 标题 -->
      <div class="info-title-selectorBefore">
        <span>面签面核任务查询</span>
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
          <el-table-column prop="authReasonDesc" label="授权原因" width="200"></el-table-column>
          <el-table-column prop="f2fTypeDesc" label="面签类型" width="200"></el-table-column>
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
          <el-table-column prop="handleMan" label="处理人" width="200"></el-table-column>
          <el-table-column label="操作" width="150" fixed="right">
            <template slot-scope="scope">
              <el-button class="button-text" @click="showDetail(scope.row.applicationId)">详情</el-button>
              <el-button class="button-text" @click="showVideoDownload(scope.row.applicationId)" v-if="scope.row.f2fSubmit">下载视频</el-button>
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
import face2faceDetail from "../../face2face/face2face-detail/index"; // 柜面面签详情组件
// import player from '@components/player/index'; // 播放视频组件
// import qs from "qs";
export default {
  name: "counter-f2f",
  components: { pagination, face2faceDetail },
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
      dialogVisible: false, // 详情的显示与隐藏

      // 视频
      videoVisible: false, // 视频的显示与隐藏
      videoTableData: [],
      selectVideo: [] // 选中的视频列表
    };
  },
  created() {
    // 获取数据列表
    // this.getList();

    // 获取剩余面签数量
    if (!this.isCpms_r_manager_0003) {
      this.getTotal();
    }

    // http://localhost:18080/manager/f2f/counter/video/download?applicationId=RL20190226000030&videoIdList=821748967682736128&videoIdList=821748890692091904
    // let list = [{videoId: "RL20181112000162"}, {videoId: "784823355669479424"}]
    // let obj = {
    //   applicationId: "11111",
    //   videoIdList: ["821748967682736128", "821748890692091904", "821748890692091904"]
    // };
    // let str = `?${obj.applicationId}`;
    //   list.forEach((item) => {
    //     str = `${str}&videoIdList=${item.videoId}`;
    //   });
    //   console.log(str);

    // 下载视频（测试）
    // let data = {
    //   applicationId: "RL20190126000825",
    //   videoIdList: ["810551855108456448", "810551785340403712"]
    // };
    // this.$MyFetch
    //   .get(baseApi.counter_f2f_video_download, data)
    //   .then(res => {
    //     console.log(res);
    //     this.download(res);
    //   })
    //   .catch(err => {
    //     // console.log('请求失败');
    //     console.error(err);
    //     this.confirmFn(err.message, "error");
    //   });
  },
  methods: {
    // 获取剩余面签数量
    getTotal() {
      this.$MyFetch
        .get(baseApi.counter_f2f_amount)
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
          .get(baseApi.counter_f2f_list, this.searchInfo)
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
        this.confirmFn("请至少输入一个查询条件", "error");
      }
    },
    // 跳转页面
    jump(pageNum) {
      this.searchInfo.pageNum = pageNum;
      this.getList();
    },
    // 显示下载视频
    showVideoDownload(applicationId) {
      this.$MyFetch
        .get(baseApi.counter_f2f_video + applicationId)
        .then(res => {
          // console.log(res);
          this.videoTableData = res;

          this.applicationId = applicationId;
          this.videoVisible = true;
        })
        .catch(err => {
          console.error(err);
          this.confirmFn(err.message, "error");
        });
    },
    // 显示详情
    showDetail(applicationId) {
      this.applicationId = applicationId;
      this.dialogVisible = true;
    },
    // 播放视频
    viewVideo(viewVideo) {
      // console.log(viewVideo);
    },
    // 选中视频
    hangleChange(val) {
      // console.log(val);
      this.selectVideo = val;
    },
    // 当某一行被点击时会触发该事件
    rowClick(row) {
      // console.log(row);

      // 判断客户信息选中的数组tableDataImportSelect是否在数组中
      let isSelect = this.selectVideo.some(item => {
        return item.videoId === row.videoId;
      });
      // 不在数组中则添加
      if (!isSelect) {
        this.selectVideo.push(row);
        this.$refs.videoTableData.toggleRowSelection(row, true); // 用于多选表格，切换某一行的选中状态
      } else {
        // 在数组中则删除
        // 计算客户信息选中的数组tableDataImportSelect的该行索引
        let i = 0;
        this.selectVideo.forEach((item, index) => {
          if (item.videoId === row.videoId) {
            i = index;
          }
        });
        this.selectVideo.splice(i, 1);
        this.$refs.videoTableData.toggleRowSelection(row, false); // 用于多选表格，切换某一行的选中状态
      }
      // console.log(this.tableDataImportSelect);
    },
    // 下载视频
    videoDownload() {
      if (this.selectVideo.length < 1) {
        this.confirmFn("请至少勾选一条数据", "error");
        return;
      }
      this.selectVideo.forEach((item) => {
        this.$MyFetch.get(`${baseApi.counter_f2f_video}${item.videoId}/url`)
          .then((res) => {
            if (res) {
              // window.open(res);
              let ele = document.createElement("iframe");
              ele.src = res;
              ele.style.display = "none";
              document.body.appendChild(ele);
            }
          });
      });
      // this.selectVideo = [{videoId: "RL20181112000162"}, {videoId: "784823355669479424"}];
      // let videoIdList = [];
      // this.selectVideo.forEach(item => {
      //   videoIdList.push(item.videoId);
      // });
      // // console.log(videoIdList);

      // let data = {
      //   applicationId: this.applicationId,
      //   videoIdList
      // };

      /* let str = "?applicationId=" + this.applicationId;
      this.selectVideo.forEach((item) => {
        str = `${str}&videoIdList=${item.videoId}`;
      });
      str += `&time=${new Date().getTime()}`;
      // console.log(str);

      this.$MyFetch
        .get(baseApi.counter_f2f_video_download + str)
        .then(res => {
          // console.log(res);
          this.$download(res);
        })
        .catch(err => {
          console.error(err);
          this.confirmFn(err.message, "error");
        }); */

      // let url = `${baseApi.counter_f2f_video_download}?applicationId=${data.applicationId}&videoIdList=${data.videoIdList}`;
      // console.log(url);
      // location.href = url; // 在原窗口打开
    }

    // 下载文件
    // download(fileInfo) {
    //   if ("msSaveBlob" in navigator) {
    //     window.navigator.msSaveBlob(fileInfo.data, fileInfo.filename);
    //   } else if ("download" in document.createElement("a")) {
    //     if (!fileInfo.data) {
    //       return;
    //     }
    //     let url = window.URL.createObjectURL(new Blob([fileInfo.data]));
    //     console.log(url);
    //     let link = document.createElement("a");
    //     link.style.display = "none";
    //     link.href = url;
    //     link.setAttribute("download", fileInfo.filename);
    //     document.body.appendChild(link);
    //     link.click();
    //   }
    // }
  }
};
</script>

<style lang="less">
</style>

<style lang="less" scoped>
.counter-f2f {
  .dialog {
    .video-img {
      width: 16px;
    }
  }
}
</style>
