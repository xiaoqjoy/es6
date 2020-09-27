<template>
  <div class="lawyer-letter-search">
    <div class="data-box">
      <span class="maintenance">律师函查询</span>
    </div>
    <div class="b_content">
      <el-form :inline="true" ref="searchForm" :model="searchInfo" label-width="80px">
        <el-form-item>
          <el-input v-model="searchInfo.putoutNo" placeholder="出账编号"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="searchInfo.fileidPdf" placeholder="律师函编号"></el-input>
        </el-form-item>
        <el-form-item>
          <el-select clearable v-model="searchInfo.sendflag" placeholder="发函状态">
            <el-option
              v-for="item in stateList"
              :key="item.key"
              :label="item.value"
              :value="item.key"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-date-picker
            v-model="searchInfo.timeRange"
            align="left"
            type="daterange"
            value-format="yyyy-MM-dd"
            range-separator="至"
            start-placeholder="创建时间(起)"
            end-placeholder="创建时间(终)"
          ></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-input v-model="searchInfo.custName" placeholder="发函对象"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="searchInfo.channel" placeholder="发函申请单位"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button class="btn b_button query" @click="search">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button class="btn b_button empty" @click="clearSearch">清空</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-table
      height="520"
      :data="tableData"
      class="common__table"
      header-cell-class-name="table-head"
      row-class-name="table-tr"
      style="width: 100%"
    >
      <el-table-column prop="putoutNo" label="出账编号"></el-table-column>
      <el-table-column prop="fileidPdf" label="律师函编号"></el-table-column>
      <el-table-column prop="sendTime" label="创建时间"></el-table-column>
      <el-table-column prop="custName" label="发函对象"></el-table-column>
      <el-table-column prop="channel" label="发函申请单位"></el-table-column>
      <el-table-column prop="bankName" label="出借人"></el-table-column>
      <el-table-column prop="mode" label="模式"></el-table-column>
      <el-table-column prop="createdBy" label="操作人"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="downLoadItem(scope.row)">律师函下载</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination :page="pageConfig" class="pagination" @jump-page="getTabData"></pagination>
  </div>
</template>

<script>
import pagination from "@components/pagination";
import { lawyerApi } from "../js/server"; // 接口
import { userInfo } from '../../../common/js/localStorage';
export default {
  data() {
    return {
      author: "",
      isCharge: false,
      searchInfo: {
        putoutNo: "",
        fileidPdf: "",
        sendflag: "",
        timeRange: "",
        custName: "",
        channel: ""
      },
      stateList: [{ key: "1", value: "已完成" }],
      tableData: [],
      pageConfig: {
        account: 0, // 总条数
        pageSize: 50, // 当前多少条数据
        currentPage: 1, // 当前页
        showJumpButton: true // 显示跳转按钮
      }
    };
  },
  components: {
    pagination
  },
  methods: {
    search() {
      if (
        !this.searchInfo.putoutNo &&
        !this.searchInfo.fileidPdf &&
        !this.searchInfo.sendflag &&
        !this.searchInfo.timeRange &&
        !this.searchInfo.custName &&
        !this.searchInfo.channel
      ) {
        this.$error("需至少需录入一项条件才可查询");
        return;
      }
      this.getTabData(1);
    },
    clearSearch() {
      this.searchInfo = {};
    },
    getTabData(page) {
      this.pageConfig.currentPage = page;
      let params = JSON.parse(JSON.stringify(this.searchInfo));
      // params.sendflag = params.sendflag ? params.sendflag : "0";
      params.author = this.isCharge ? "" : this.author;
      params.sendflag = "1";
      params.pageNum = this.pageConfig.currentPage;
      params.pageSize = this.pageConfig.pageSize;
      params.sendTimeStart = params.timeRange ? params.timeRange[0] : "";
      params.sendTimeEnd = params.timeRange ? params.timeRange[1] : "";
      delete params.timeRange;
      this.$MyFetch
        .post(lawyerApi.vaguelySearch, params)
        .then((res = {}) => {
          this.tableData = res.list;
          this.tableData.map(item => {
            item.sendTime = new Date(item.sendTime).normalizeTime().strTime;
          });
          this.pageConfig.account = res.pages.rowNumers;
        })
        .catch(err => {
          this.$message.error(err.message);
        });
    },
    downLoadItem(row) {
      this.$MyFetch.get(lawyerApi.downloadfile, {
        fileId: row.fileidPdf
      }, 'blob')
        .then((res) => {
          console.log("downLoadItem", res);
          let data = res;
          data.filename = row.putoutNo + row.custName + row.sendTime + ".pdf";
          this.$download(data);
        })
        .catch((e) => {
          this.$error(e.message);
        });
    }
  },
  mounted() {
    let userData = JSON.parse(userInfo.getUserInfo());
    let role = userData ? userData.role : [];
    this.isCharge = role.some(v => {
      return v.roleId === 'ellesignature_0001';
    });
    this.author = userData.userId;
  }
};
</script>
<style scoped lang="less">
.lawyer-letter-search {
  .boxShadow(0, 0);
  padding: 10px 31px;
  min-height: 820px;
  .el-dialog__header {
    box-shadow: 0 2px 6px 0 #d0d0d0;
  }
  .el-dialog__body {
    text-align: left;
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
  .clearfix.pagination {
    margin-top: 30px;
  }
  .btn_wrap {
    margin-top: 20px;
    text-align: center;
  }
}
</style>
