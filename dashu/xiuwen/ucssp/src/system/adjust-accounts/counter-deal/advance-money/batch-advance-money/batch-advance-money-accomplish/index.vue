<template>
  <div>
    <div class="content">
      <!-- 输入框和下拉框 -->
      <div class="b_content">
        <el-input clearable class="select_72" v-model="batchNumber" placeholder="批次号"></el-input>
        <el-button class="b_button query" @click="refer">查询</el-button>
        <el-button class="b_button empty" @click="empty">清空</el-button>
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
          @selection-change="handleSelectionChange"
        >
          <el-table-column prop="related_id" label="批次号"></el-table-column>
          <el-table-column width="300" prop="file_name" label="文件名称"></el-table-column>
          <!-- <el-table-column width="350" prop="file_path" label="文件路径"></el-table-column> -->
          <el-table-column prop="created_by" label="申请人"></el-table-column>
          <el-table-column prop="created_date" label="操作日期">
            <template slot-scope="scope">
              <span>{{date_filters(scope.row.created_date)}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="phase_name" label="流程阶段"></el-table-column>
          <el-table-column prop="operation" fixed="right" label="操作">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="detailed(scope.row.related_id)">明细</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <particulars :batchNumberIntroduced="batchNumberIntroduced" v-if="show" @close_m="close"/>
      <pagination @jump-page="jump" :page="pageConfig" class="pagination"></pagination>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import pagination from "@components/pagination"; // 分页组件
import particulars from "../batch-advance-money-sponsor/particulars/index"; // 明细组件
import { checkingApi } from "../../../../js/server"; // 接口
export default {
  data() {
    return {
      batchNumber: "", // 批次号
      batchNumberIntroduced: "", // 打开明细组件带入批次号
      show: false, // 明细组件默认不显示
      // 查询数据
      searchData: {
        eq: {}
      },
      pageConfig: {
        account: 0, // 总条数
        pageSize: 10, // 当前多少条数据
        currentPage: 1, // 当前页
        showJumpButton: true // 显示跳转按钮
      }, // 分页
      for_: [] // 渲染列表
    };
  },
  methods: {
    // 毫秒格式化
    date_filters(data) {
      function change(t) {
        if (t < 10) {
          return "0" + t;
        } else {
          return t;
        }
      }
      if (data) {
        var date = new Date(data * 1000); // 时间戳为10位需*1000，时间戳为13位的话不需乘1000;
        let Y = date.getFullYear() + "-";
        let M =
          (date.getMonth() + 1 < 10
            ? "0" + (date.getMonth() + 1)
            : date.getMonth() + 1) + "-";
        let D = change(date.getDate()) + " ";
        let h = change(date.getHours()) + ":";
        let m = change(date.getMinutes()) + ":";
        let s = change(date.getSeconds());
        return Y + M + D + h + m + s;
      } else {
        return "---";
      }
    },
    // 打开明细组件
    detailed(detaile) {
      this.show = true;
      this.batchNumberIntroduced = detaile;
    },
    // 关闭明细组件
    close() {
      this.show = false;
    },
    // 完成查询列表接口
    loanParameter(res, current) {
      res = res || {};
      current = current || 1;
      let url =
        checkingApi.SingleRepaymenta + "?current=" + current + "&size=10";
      this.$MyFetch
        .post(url, res)
        .then((data = {}) => {
          this.for_ = data.records;
          // 总条数
          this.pageConfig.account = data.total || 1;
          // 当前页
          this.pageConfig.currentPage = data.current || 1;
          // 一页有几条数据 pageSize
          this.pageConfig.pageSize = data.size || 10;
        })
        .catch(err => {
          this.$error(err.message);
        });
    },
    // 查询
    refer() {
      // if (this.batchNumber === "") {
      //   this.confirmFn("请输入查询条件");
      //   this.pageConfig.account = 0;
      //   this.pageConfig.currentPage = 1;
      //   this.for_ = [];
      // } else {
      this.searchData.eq.related_Id = this.batchNumber;
      this.searchData.phase_no = "1000";
      this.searchData.flow_no = "batchAdvancePayFlow";
      this.loanParameter(this.searchData);
      console.log(this.searchData);
      // }
    },
    // 清空
    empty() {
      // 批次号
      this.batchNumber = "";
    },
    // 分页
    jump(pageNum) {
      this.loanParameter(this.searchData, pageNum);
    },
    // 选中复选框事件
    handleSelectionChange(data) {
      console.log(data);
    }
  },
  components: {
    pagination, // 分页组件
    particulars
  },
  created() {
    this.refer();
  }
};
</script>

<style lang="less" rel="stylesheet/less" scoped>
// 中间部分
.content {
  height: 780px;
  border-radius: 4px;
  background: #fff;
  box-shadow: 1px 2px 20px #ccc;
  overflow: auto;
  // 输入框和下拉框部分样式
  .b_content {
    margin-top: 30px;
    text-align: left;
    // height: 60px;
    margin-left: 28px;
    // 输入框和下拉框172*40
    .select_72 {
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
    }
    // 清空单独样式
    .empty {
      background: #ffffff;
      color: #538bf1;
      border: 1px solid #538bf1;
    }
  }
  // 表格总体样式
  .tables {
    overflow-y: auto;
    overflow-x: hidden;
    width: 97%;
    margin: 0px auto;
    border: 1px solid #d0d0d0;
    margin-top: 21px;
    border-radius: 4px;
  }
  // 去掉element表格的默认全选按钮
  .tables /deep/ th .el-checkbox {
    display: none;
  }
  .pagination {
    margin-bottom: 20px;
    margin-top: 40px;
    margin-right: 30px;
  }
}
</style>
