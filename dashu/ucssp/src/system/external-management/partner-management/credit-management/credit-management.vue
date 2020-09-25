<template>
  <div class="page-company">
    <!-- 输入框和下拉框 -->
    <div class="b_content">
      <el-date-picker
        class="time"
        type="datetime"
        placeholder="查询开始时间"
        v-model="startTime"
        value-format="yyyy-MM-dd HH:mm:ss"
      ></el-date-picker>
      <el-date-picker
        class="time"
        type="datetime"
        placeholder="查询结束时间"
        v-model="endTime"
        value-format="yyyy-MM-dd HH:mm:ss"
      ></el-date-picker>
      <el-input
        class="select_72"
        v-model="queryMinCnt"
        placeholder="最小查询量"
        clearable
      ></el-input>
      <el-input
        class="select_72"
        v-model="queryMaxCnt"
        placeholder="最大查询量"
        clearable
      ></el-input>
      <el-input
        class="select_72"
        v-model="userName"
        placeholder="用户姓名"
        clearable
      ></el-input>
      <el-input
        class="select_72"
        v-model="mobileNo"
        placeholder="手机号码"
        clearable
      ></el-input>
      <el-input
        class="select_72"
        v-model="srcChannel"
        placeholder="所属公司"
        clearable
      ></el-input>
      <el-button
        class="b_button query"
        @click="refer_f(1)"
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
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        @select="defaultSelect"
        @select-all="all"
      >
        <el-table-column
          prop="userName"
          label="用户姓名"
        >
        </el-table-column>
        <el-table-column
          prop="mobileNo"
          label="客户手机"
        >
        </el-table-column>
        <el-table-column
          prop="certNo"
          label="身份证号码"
        >
        </el-table-column>
        <el-table-column
          prop="queryCnt"
          label="查询量"
        >
        </el-table-column>
        <el-table-column
          prop="status"
          label="状态"
        >
        </el-table-column>
        <el-table-column
          prop="srcChannel"
          label="所属公司"
        >
        </el-table-column>
        <el-table-column
          prop="srcUmName"
          label="所属客户经理"
        >
        </el-table-column>
        <el-table-column
          prop="srcCompany"
          label="所属分公司"
        >
        </el-table-column>
      </el-table>
    </div>
    <pagination
      :page="pageConfig"
      class="pagination"
      @jump-page="jump"
    ></pagination>
    <div class="text__center">
      <el-button
        class="t_button initiate_t"
        @click="derive(pageConfig.currentPage)"
      >导出</el-button>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import pagination from "@components/pagination";
import { partnerApi } from "../../js/server.js";
export default {
  data() {
    return {
      startTime: null, // 查询开始时间
      endTime: null, // 查询结束时间
      queryMinCnt: "", // 最小查询量
      queryMaxCnt: "", // 最大查询量
      userName: "", // 用户姓名
      mobileNo: "", // 手机号码
      srcChannel: "", // 所属公司
      ids: "",
      tableData: [],
      alert: false, // 默认关闭调整页面
      alert_t: false, // 默认关闭恢复页面
      compile_data: "", // 传入调整页的数据
      edit_data: "", // 删除的数据
      pageConfig: {
        account: 0, // 总条数
        pageSize: 10, // 当前多少条数据
        currentPage: 1, // 当前页
        showJumpButton: true // 显示跳转按钮
      }, // 分页
      pricing_lock: [], // 个贷处理中心下拉框数据
      filiale_data: [] // 分公司下拉框数据
    };
  },
  components: {
    pagination
  },
  methods: {
    // 多选
    defaultSelect(selection, row) {
      console.log(selection);
      this.ids = selection;
    },
    // 全选
    all(selection) {
      console.log(selection);
      this.ids = selection;
    },
    // 分页
    jump(pageNum) {
      this.pageConfig.currentPage = pageNum;
      this.refer(this.pageConfig.currentPage);
      // this.defaultList(this.pageConfig.currentPage);
    },
    // 查询前判断
    refer_f(pageNum) {
      if (
        this.startTime !== null || // 查询开始时间
        this.endTime !== null || // 查询结束时间
        this.queryMinCnt !== "" || // 最小查询量
        this.queryMaxCnt !== "" || // 最大查询量
        this.userName !== "" || // 用户姓名
        this.mobileNo !== "" || // 手机号码
        this.srcChannel !== "" // 所属公司
      ) {
        if (this.startTime === null || this.endTime === null) {
          this.refer(pageNum);
        } else if (this.startTime <= this.endTime) {
          this.refer(pageNum);
        } else {
          this.$message({
            message: "查询失败,请输入正确的查询区间",
            type: "warning"
          });
        }
        if (this.queryMinCnt === "" || this.queryMaxCnt === "") {
          this.refer(pageNum);
        } else if (this.queryMinCnt <= this.queryMaxCnt) {
          this.refer(pageNum);
        } else {
          this.$message({
            message: "最小查询量要小于等于最大查询量",
            type: "warning"
          });
        }
      } else {
        this.$error("请输入查询条件");
      }
    },
    // 查询列表
    refer(pageNum) {
      let data = {
        startTime: this.startTime, // 查询开始时间
        endTime: this.endTime, // 查询结束时间
        queryMinCnt: this.queryMinCnt, // 最小查询量
        queryMaxCnt: this.queryMaxCnt, // 最大查询量
        userName: this.userName, // 用户姓名
        mobileNo: this.mobileNo, // 手机号码
        srcChannel: this.srcChannel, // 所属公司
        pageNum: pageNum, // 当前页
        pageSize: this.pageConfig.pageSize // 当前多少条数据
      };
      console.log(data);
      let url = partnerApi.creditInvestRef_getPage;
      console.log(url);
      this.$MyFetch
        .post(url, data)
        .then((data = {}) => {
          this.tableData = data.creditInvestPage.list;
          let url = partnerApi.initDataDict;
          this.$MyFetch
            .post(url)
            .then((data = {}) => {
              console.log(data.dict);
              console.log(this.tableData);
            })
            .catch(err => {
              this.$error(err.message);
            });
          this.pageConfig.account = data.creditInvestPage.total;
          this.pageConfig.currentPage = data.creditInvestPage.pageNum;
        })
        .catch(err => {
          this.$error(err.message);
        });
    },
    // 清空
    empty() {
      this.startTime = null; // 查询开始时间
      this.endTime = null; // 查询结束时间
      this.queryMinCnt = ""; // 最小查询量
      this.queryMaxCnt = ""; // 最大查询量
      this.userName = ""; // 用户姓名
      this.mobileNo = ""; // 手机号码
      this.srcChannel = ""; // 所属公司
    },
    // 导出接口
    // derive(pageNum) {
    //   // let data = JSON.stringify({
    //   //   startTime: this.startTime, // 查询开始时间
    //   //   endTime: this.endTime, // 查询结束时间
    //   //   queryMinCnt: this.queryMinCnt, // 最小查询量
    //   //   queryMaxCnt: this.queryMaxCnt, // 最大查询量
    //   //   userName: this.userName, // 用户姓名
    //   //   mobileNo: this.mobileNo, // 手机号码
    //   //   srcChannel: this.srcChannel // 所属公司
    //   // });
    //   let location = `${partnerApi.creditInvestRef_export}?startTime=${this.startTime}&endTime=${this.endTime}&queryMinCnt=${this.queryMinCnt}&queryMaxCnt=${this.queryMaxCnt}&userName=${this.userName}&mobileNo=${this.mobileNo}&srcChannel=${this.srcChannel}`;
    //   let iframe = document.createElement("iframe");
    //   iframe.src = location;
    //   iframe.style.display = "none";
    //   document.body.appendChild(iframe);
    //   // window.open(location);
    // },
    derive() {
      let data = {
        startTime: this.startTime, // 查询开始时间
        endTime: this.endTime, // 查询结束时间
        queryMinCnt: this.queryMinCnt, // 最小查询量
        queryMaxCnt: this.queryMaxCnt, // 最大查询量
        userName: this.userName, // 用户姓名
        mobileNo: this.mobileNo, // 手机号码
        srcChannel: this.srcChannel // 所属公司
      };
      let url = partnerApi.creditInvestRef_export;
      console.log(data);
      this.$MyFetch.get(url, data).then((data = {}) => {
        this.$download(data);
      }).catch(err => {
        this.confirmFn(err.message, "error");
      });
    }
  }
};
</script>
<style lang="less" rel="stylesheet/less" scoped>
.page-company {
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
  }
  .common__table {
    /deep/.el-table__body-wrapper {
      height: 550px;
      overflow-y: auto;
    }
  }
  .data-box {
    height: 60px;
    border-bottom: 1px solid #d0d0d0;
    margin-bottom: 20px;
    .maintenance {
      border-left: 2px solid #538bf1;
      padding-left: 5px;
      font-family: PingFangSC-Medium;
      font-size: 16px;
      color: #333333;
      line-height: 60px;
    }
  }
  .b_content {
    text-align: left;
    height: 40px;
    // 输入框和下拉框172*40
    .select_72 {
      width: 172px;
      height: 40px;
      margin-right: 15px;
    }
    .import_80 {
      width: 80px;
      height: 40px;
      margin-right: 15px;
    }
    /deep/.time {
      width: 160px;
      height: 40px;
      margin-right: 15px;
    }
    // 查询和清空的公有样式
    .b_button {
      width: 100px;
      height: 40px;
      border-radius: 4px;
      font-size: 14px;
    }
    // 查询单独样式
    .query {
      background: #538bf1;
      color: #ffffff;
      border: 1px solid #538bf1;
    }
    // 清空单独样式
    .empty {
      background: #ffffff;
      color: #538bf1;
      border: 1px solid #538bf1;
    }
  }
  .initiate_t {
    margin-top: 20px;
    width: 200px;
    height: 40px;
    background: #538bf1;
    font-size: 14px;
    color: #ffffff;
    letter-spacing: 1.07px;
    text-align: center;
    border: 1px solid #538bf1;
  }
}
.tables {
  overflow-y: auto;
  overflow-x: hidden;
  min-height: 630px;
  // width: 97%;
  margin: 0px auto;
  border: 1px solid #d0d0d0;
  margin-top: 21px;
  border-radius: 4px;
  margin-bottom: 40px;
  .pushObject {
    margin-left: 5px;
  }
}
</style>
