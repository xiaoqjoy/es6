<template>
  <div class="content">
    <!-- 标题 -->
    <div class="content_top">
      <span>贷款台账</span>
    </div>
    <!-- 中间部分 -->
    <div class="sponsor">
      <!-- 查询这一行 -->
      <div class="serach_row">
        <el-input clearable class="select_72" v-model="loan_no" placeholder="出账编号"></el-input>
        <el-input clearable class="select_72" v-model="customer_name" placeholder="客户姓名"></el-input>
        <el-input clearable class="select_72" v-model="cert_no" placeholder="身份证号"></el-input>
        <el-button class="b_button query button" @click="refer()">查询</el-button>
        <el-button class="b_button empty button" @click="empty()">清空</el-button>
      </div>
      <!-- 带全选的表格 -->
      <div class="table_box">
        <el-table
          :default-sort="{prop: 'date', order: 'descending'}"
          :header-cell-style="{'font-size':'12px','text-align':'center','height':'38.9px','background':'#ececec'}"
          ref="multipleTable"
          :data="for_"
          tooltip-effect="dark"
          style="width: 100%; border: 1px solid #E9E9E9;"
          @selection-change="handleSelectionChange"
        >
          <el-table-column prop="sterm" label="当前期次"></el-table-column>
          <el-table-column width="200" prop="loan_no" label="出账编号"></el-table-column>
          <el-table-column prop="customer_name" label="客户姓名"></el-table-column>
          <el-table-column width="200" prop="cert_no" label="证件号码">
            <template slot-scope="scope">
              <span>{{cert_no_filters(scope.row.cert_no)}}</span>
            </template>
          </el-table-column>
          <el-table-column width="200" prop="customer_id" label="客户编号"></el-table-column>
          <el-table-column prop="business_sum" label="贷款本金"></el-table-column>
          <el-table-column prop="loan_term" label="贷款期限"></el-table-column>
          <el-table-column width="150" prop="fund_org" label="合作机构"></el-table-column>
          <el-table-column width="150" prop="operate_org_id" label="分公司"></el-table-column>
          <el-table-column prop="loan_status" label="贷款状态"></el-table-column>
          <el-table-column width="180" prop="finish_date" label="结清日期">
            <template slot-scope="scope">
              <span>{{date_filters(scope.row.finish_date)}}</span>
            </template>
          </el-table-column>
          <el-table-column width="200" prop="product_id" label="产品编号"></el-table-column>
          <el-table-column label="操作" fixed="right">
            <template slot-scope="scope">
              <router-link :to="{name:'debt-detail',query:{loan_no:scope.row.loan_no}}">
                <el-button type="text">借据详情</el-button>
              </router-link>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- 分页 -->
      <div class="page_box">
        <!-- 分页条 -->
        <pagination @jump-page="jump" :page="pageConfig" class="pagination"></pagination>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import "@system/adjust-accounts/counter-deal/css/myQuerySelect.less";
import pagination from "@components/pagination"; // 分页条
import { checkingApi } from "../../js/server"; // 接口
export default {
  data() {
    return {
      // 出账编号
      loan_no: "",
      // 客户姓名
      customer_name: "",
      // 身份证号
      cert_no: "",
      // 查询数据
      searchData: {
        eq: {}
      },
      for_: [], // 渲染数据列表
      pageConfig: {
        account: 0, // 总条数
        pageSize: 10, // 当前多少条数据
        currentPage: 1, // 当前页
        showJumpButton: true // 显示跳转按钮
      } // 分页
    };
  },
  computed: {},
  created() {
    // this.loanParameter();
  },
  methods: {
    // 处理身份证掩码
    cert_no_filters(val) {
      if (val) {
        val = val.split("");
        val.splice(4, 10, "**********");
        return val.join("");
      }
    },
    // // 处理身份证掩码
    // cert_no_filters(data) {
    //   let reg = /(\w{6})\w*(\w{4})/g;
    //   if (data) {
    //     return data.replace(reg, "$1********$2");
    //   }
    // },
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
        var date = new Date(data); // 时间戳为10位需*1000，时间戳为13位的话不需乘1000;
        let Y = date.getFullYear() + "/";
        let M =
          (date.getMonth() + 1 < 10
            ? "0" + (date.getMonth() + 1)
            : date.getMonth() + 1) + "/";
        let D = change(date.getDate());
        return Y + M + D;
      } else {
        return "---";
      }
    },
    // 贷款台账查询接口
    loanParameter(res, current) {
      res = res || {};
      current = current || 1;
      let url = checkingApi.LoanSearch + "?current=" + current + "&size=10";
      this.$MyFetch
        .post(url, res)
        .then((data = {}) => {
          console.log(data, "请求数据");
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
    // 选择框选中
    handleSelectionChange(data) {
      console.log(data);
    },
    // 查询
    refer() {
      if (
        this.loan_no === "" &&
        this.customer_name === "" &&
        this.cert_no === ""
      ) {
        this.confirmFn("请至少选择一个查询条件输入");
        this.for_ = [];
        this.pageConfig.account = 0;
        this.pageConfig.currentPage = 1;
      } else {
        this.searchData.eq.loan_no = this.loan_no;
        this.searchData.eq.customer_name = this.customer_name;
        this.searchData.eq.cert_no = this.cert_no;
        this.loanParameter(this.searchData);
        console.log(this.searchData);
      }
    },
    // 清空
    empty() {
      // 出账编号
      this.loan_no = "";
      // 客户姓名
      this.customer_name = "";
      // 身份证号
      this.cert_no = "";
    },
    jump(pageNum) {
      this.loanParameter(this.searchData, pageNum);
    }
  },
  components: {
    pagination // 分页
  }
};
</script>

<style lang="less" rel="stylesheet/less" scoped>
// 中间部分
.content {
  min-height: 850px;
  height: 100%;
  border-radius: 4px;
  background: #fff;
  box-shadow: 1px 2px 20px #ccc;
  overflow: auto;
  padding: 0px 30px;
  position: relative;
  .content_top {
    width: 100%;
    height: 60px;
    border-bottom: 1px solid #d0d0d0;
    display: flex;
    align-items: center;
    position: relative;
    &::before {
      content: "";
      width: 2px;
      height: 16px;
      background: #538bf1;
    }
    span {
      font-family: PingFangSC-Medium;
      font-size: 16px;
      color: #333333;
      font-weight: bold;
      margin-left: 7px;
    }
  }
  // 中间内容部分
  // 提示窗
  .hint {
    .import-message {
      .dialog-box {
        width: 340px;
        height: 170px;
        .dialog-msgbox__top {
          height: 40px;
          .button__close {
            position: absolute;
            top: -5px;
            right: -5px;
            width: 42px;
            height: 42px;
            line-height: 42px;
            border-radius: 50%;
            font-size: 16px;
            text-align: center;
            color: #666;
            font-weight: 600;
          }
        }
        .text-center {
          font-family: PingFangSC-Regular;
          font-size: 14px;
          color: #333333;
          letter-spacing: 1.07px;
          text-align: center;
        }
        // 确认选择
        .affirm_select {
          width: 100%;
          display: flex;
          justify-content: center;
          margin-top: 40px;
          .t_button {
            width: 100px;
            height: 40px;
          }
          .cancel_t {
            // 取消
            background: #f8f8f8;
            border: 1px solid #dddddd;
            font-size: 14px;
            color: #666;
            letter-spacing: 1.07px;
            text-align: center;
          }
          .affirm_t {
            // 确认
            background: #538bf1;
            font-size: 14px;
            color: #ffffff;
            letter-spacing: 1.07px;
            text-align: center;
          }
        }
      }
    }
  }
  .sponsor {
    width: 100%;
    // height: 100%;
    padding-top: 20px;
  }
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
    // margin: 20px 30px;
  }
  // 查询这行的box
  .serach_row {
    margin-top: 20px;
    // 输入框和下拉框172*40
    .select_72 {
      width: 160px;
      height: 40px;
      margin-right: 15px;
      ::-webkit-input-placeholder {
        /* WebKit browsers */
        font-family: PingFangSC-Regular;
        font-size: 12px;
        color: #bbbbbb;
      }
      :-moz-placeholder {
        /* Mozilla Firefox 4 to 18 */
        font-size: 12px;
      }
      ::-moz-placeholder {
        /* Mozilla Firefox 19+ */
        font-size: 12px;
      }
      :-ms-input-placeholder {
        /* Internet Explorer 10+ */
        font-size: 12px;
      }
    }
    // 输入框和下拉框170*40
    .select_7 {
      width: 170px;
      height: 40px;
      margin-right: 15px;
      // padding-left: 15px;
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
      margin-left: 18px;
    }
    // 清空单独样式
    .empty {
      background: #ffffff;
      color: #538bf1;
      border: 1px solid #538bf1;
    }
  }
  // 表格
  .table_box {
    width: 100%;
    margin-top: 21px;
    overflow: auto;
  }
  // page_box 分页
  .page_box {
    width: 100%;
    margin-top: 40px;
    margin-bottom: 20px;
  }
  // 删除和提交按钮
  .delete_submit {
    width: 100%;
    display: flex;
    justify-content: center;
    margin-top: 30px;
    // 删除提交公共样式
    .t_button {
      width: 200px;
      height: 40px;
    }
    .dead_t {
      border: 1px solid #538bf1;
      font-size: 14px;
      color: #538bf1;
      letter-spacing: 1.07px;
      text-align: center;
    }
    .initiate_t {
      background: #538bf1;
      font-size: 14px;
      color: #ffffff;
      letter-spacing: 1.07px;
      text-align: center;
    }
  }
}
</style>
