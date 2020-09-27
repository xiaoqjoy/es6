<template>
  <div class="content">
    <!-- 标题 -->
    <div class="content_top">
      <span>流程查询</span>
    </div>
    <!-- 中间部分 -->
    <div class="sponsor">
      <!-- 查询这一行 -->
      <div class="serach_row">
        <!-- 出账编号 -->
        <div class="demo-ruleForms">
          <input
            class="select_72"
            @change="certNoChange('loanNo', /^[A-Z0-9]*$/g, '只允许输入大写字母和数字')"
            v-model="loanNo"
            placeholder="出账编号"
            @focus="open_select('icoToBottom1', 'icoToTop1', 'loan_noRef', 'ico_flag1', 'loanNo')"
            @blur="blur_select('icoToBottom1', 'icoToTop1', 'loan_noRef', 'ico_flag1', 'loanNo')"
            ref="loan_noInput"
          />
          <span
            :class="{'select_af':true , 'select_toTop': icoToTop1, 'select_toBottom': icoToBottom1}"
            ref="select_type_btn"
          ></span>
          <div class="select_option" ref="loan_noRef">
            <div
              class="opton_item"
              @click="selected_fun('eq', 'loanNo', 'loan_noRef', 'ico_flag1', 'icoToBottom1', 'icoToTop1')"
            >
              <span>等于"{{loanNo}}"</span>
            </div>
            <div
              class="opton_item"
              @click="selected_fun('likeRight', 'loanNo', 'loan_noRef', 'ico_flag1', 'icoToBottom1', 'icoToTop1')"
            >
              <span>以"{{loanNo}}"开头</span>
            </div>
            <div
              class="opton_item"
              @click="selected_fun('like', 'loanNo', 'loan_noRef', 'ico_flag1', 'icoToBottom1', 'icoToTop1')"
            >
              <span>包含"{{loanNo}}"</span>
            </div>
          </div>
        </div>
        <!-- 客户姓名 -->
        <div class="demo-ruleForms">
          <input
            class="select_72"
            @change="certNoChange('customerName', /^[(\u4E00-\u9FA5\uf900-\ufa2d)||·]{0,15}$/g, '只允许输入汉字和“.“，最多输入15个字符')"
            v-model="customerName"
            placeholder="客户姓名"
            @focus="open_select('icoToBottom2', 'icoToTop2', 'customer_nameRef', 'ico_flag2', 'customerName')"
            @blur="blur_select('icoToBottom1', 'icoToTop2', 'customer_nameRef', 'ico_flag2', 'customerName')"
          />
          <span
            :class="{'select_af':true , 'select_toTop': icoToTop2, 'select_toBottom': icoToBottom2}"
            ref="select_type_btn"
          ></span>
          <div class="select_option" ref="customer_nameRef">
            <div
              class="opton_item"
              @click="selected_fun('eq', 'customerName', 'customer_nameRef', 'ico_flag2', 'icoToBottom2', 'icoToTop2')"
            >
              <span>等于"{{customerName}}"</span>
            </div>
            <div
              class="opton_item"
              @click="selected_fun('likeRight', 'customerName', 'customer_nameRef', 'ico_flag2', 'icoToBottom2', 'icoToTop2')"
            >
              <span>以"{{customerName}}"开头</span>
            </div>
            <div
              class="opton_item"
              @click="selected_fun('like', 'customerName', 'customer_nameRef', 'ico_flag2', 'icoToBottom2', 'icoToTop2')"
            >
              <span>包含"{{customerName}}"</span>
            </div>
          </div>
        </div>
        <!-- 放款机构 -->
        <div class="demo-ruleForms">
          <input
            class="select_72"
            @change="certNoChange('lineId', /^[(\u4E00-\u9FA5\uf900-\ufa2d)|-]{0,15}$/g, '只允许输入汉字，最多输入15个字符')"
            v-model="lineId"
            placeholder="放款机构"
            @focus="open_select('icoToBottom3', 'icoToTop3', 'line_idRef', 'ico_flag3', 'lineId')"
            @blur="blur_select('icoToBottom3', 'icoToTop3', 'line_idRef', 'ico_flag3', 'lineId')"
          />
          <span
            :class="{'select_af':true , 'select_toTop': icoToTop3, 'select_toBottom': icoToBottom3}"
            ref="select_type_btn"
          ></span>
          <div class="select_option" ref="line_idRef">
            <div
              class="opton_item"
              @click="selected_fun('eq', 'lineId', 'line_idRef', 'ico_flag3', 'icoToBottom3', 'icoToTop3')"
            >
              <span>等于"{{lineId}}"</span>
            </div>
            <div
              class="opton_item"
              @click="selected_fun('likeRight', 'lineId', 'line_idRef', 'ico_flag3', 'icoToBottom3', 'icoToTop3')"
            >
              <span>以"{{lineId}}"开头</span>
            </div>
            <div
              class="opton_item"
              @click="selected_fun('like', 'lineId', 'line_idRef', 'ico_flag3', 'icoToBottom3', 'icoToTop3')"
            >
              <span>包含"{{lineId}}"</span>
            </div>
          </div>
        </div>
        <!-- 身份证号 -->
        <div class="demo-ruleForms">
          <input
            class="select_72"
            v-model="certNo"
            placeholder="身份证号"
            @focus="open_select('icoToBottom4', 'icoToTop4', 'cert_noRef', 'ico_flag4', 'certNo')"
            @blur="blur_select('icoToBottom4', 'icoToTop4', 'cert_noRef', 'ico_flag4', 'certNo')"
          />
          <span
            :class="{'select_af':true , 'select_toTop': icoToTop4, 'select_toBottom': icoToBottom4}"
            ref="select_type_btn"
          ></span>
          <div class="select_option" ref="cert_noRef">
            <div
              class="opton_item"
              @click="selected_fun('eq', 'certNo', 'cert_noRef', 'ico_flag4', 'icoToBottom4', 'icoToTop4')"
            >
              <span>等于"{{certNo}}"</span>
            </div>
            <div
              class="opton_item"
              @click="selected_fun('likeRight', 'certNo', 'cert_noRef', 'ico_flag4', 'icoToBottom4', 'icoToTop4')"
            >
              <span>以"{{certNo}}"开头</span>
            </div>
            <div
              class="opton_item"
              @click="selected_fun('like', 'certNo', 'cert_noRef', 'ico_flag4', 'icoToBottom4', 'icoToTop4')"
            >
              <span>包含"{{certNo}}"</span>
            </div>
          </div>
        </div>
        <el-date-picker
          v-model="applicationDate"
          class="repayDateCss"
          type="daterange"
          align="right"
          range-separator="至"
          start-placeholder="提前还款结清日期"
          end-placeholder="提前还款结清日期"
        ></el-date-picker>
        <el-button class="b_button query button" @click="refer(1)">查询</el-button>
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
        >
          <el-table-column prop="transSerialNo" label="交易号"></el-table-column>
          <el-table-column prop="loanNo" label="出账编号"></el-table-column>
          <el-table-column prop="customerName" label="客户姓名"></el-table-column>
          <el-table-column prop="collaborate" label="合作模式"></el-table-column>
          <el-table-column prop="certNo" label="身份证号码">
            <template slot-scope="scope">
              <div>{{scope.row.certNo | certificateNum}}</div>
            </template>
          </el-table-column>
          <el-table-column prop="lineId" label="放款机构"></el-table-column>
          <!-- <el-table-column
                prop="business_sum"
                label="总计应还金额">
            </el-table-column>
            <el-table-column
                prop="totReduct"
                label="总计减免金额">
          </el-table-column>-->
          <el-table-column prop="accDate" label="提前还款日期">
            <template slot-scope="scope">
              <div>{{scope.row.accDate}}</div>
            </template>
          </el-table-column>
          <el-table-column prop="currProcess" label="办理状态"></el-table-column>
          <el-table-column prop="paySatus" label="银行扣款状态"></el-table-column>
        </el-table>
      </div>
    </div>
    <!-- 分页 -->
    <div class="page_box">
      <!-- 分页条 -->
      <pagination @jump-page="jump" :page="pageConfig" class="pagination"></pagination>
    </div>
    <!-- 详情 -->
    <!-- <successDetail v-if="alert_detail" @clsoe_windowDetail='close_2' :tetailData = "tetail_data"></successDetail> -->
  </div>
</template>

<script type="text/ecmascript-6">
import "@system/adjust-accounts/counter-deal/css/myQuerySelect.less";
import pagination from "@components/pagination"; // 分页条
// import successDetail from "./success-detail/"; // 发起-详情
import { counterDealApi } from "@/system/adjust-accounts/counter-deal/js/server"; // 接口
// import { counterDealApi } from "../../js/server"; // 接口
import "@common/css/dialog";
export default {
  data() {
    return {
      alert_detail: false, // 详情
      tetail_data: {}, // 详情data
      // 出账编号
      loanNo: "",
      // 客户姓名
      customerName: "",
      // 放款机构
      lineId: "",
      // 身份证号
      certNo: "",
      applicationDate: "",
      // 查询数据
      searchData: {
        // flow_no: "repaymentFlow",
        // phase_no: ["1000", "2000"],
        eq: {},
        likeRight: {},
        like: {}
      },
      // 出账编号图标方向
      icoToTop1: false,
      icoToBottom1: false,
      ico_flag1: true,
      // 客户姓名图标方向
      icoToTop2: false,
      icoToBottom2: false,
      ico_flag2: true,
      // 放款机构图标方向
      icoToTop3: false,
      icoToBottom3: false,
      ico_flag3: true,
      // 身份证号图标方向
      icoToTop4: false,
      icoToBottom4: false,
      ico_flag4: true,
      for_: [], // 渲染数据列表
      pageConfig: {
        account: 5, // 总条数
        pageSize: 5, // 当前多少条数据
        currentPage: 1, // 当前页
        showJumpButton: true // 显示跳转按钮
      } // 分页
    };
  },
  filters: {
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
        let D = change(date.getDate());
        return Y + M + D;
      } else {
        return "---";
      }
    }
  },
  mounted() {
    //   this.prepaymentList();
    this.refer();
  },
  computed: {},
  watch: {
    certNo(newData, oldData) {
      console.log(newData, oldData);
      if (newData.length > 18) {
        this.certNo = oldData;
      }
    }
  },
  methods: {
    // 验证
    certNoChange(value, reg, massage) {
      if (!reg.test(this[value])) {
        this[value] = "";
        this.$message(massage);
      }
    },
    // 提前还款-查询接口
    prepaymentList(res, current) {
      res = res || {
        flow_no: "repaymentFlow",
        phase_no: ["1000", "2000"]
      };
      current = current || 1;
      let url =
        counterDealApi.processQuery + "?current=" + current + "&size=10";
      console.log(url, "url");
      this.$MyFetch
        .post(url, res)
        .then((data = {}) => {
          if (data.records.length < 1) {
            this.$message("查询结果为空！");
          }
          this.for_ = data.records;
          // 总条数
          this.pageConfig.account = data.total || 1;
          // 当前页
          this.pageConfig.currentPage = data.current || 1;
          // 一页有几条数据 pageSize
          this.pageConfig.pageSize = data.size || 10;
        })
        .catch(err => {
          console.log(err);
          this.$error(err.message);
        });
    },
    // 详情
    detail_fun(rowData) {
      console.log("详情");
      this.tetail_data = rowData;
      this.alert_detail = true;
    },
    // 关闭详情
    close_2() {
      this.alert_detail = false;
    },
    // 毫秒数转成时间数组
    date_filter(list) {
      list = list || [];
      let array = [];
      list.forEach((element, index) => {
        var year = element.getFullYear();
        var month = element.getMonth() + 1;
        month = month < 10 ? "0" + month : month;
        var day = element.getDate();
        day = day < 10 ? "0" + day : day;
        var hour = element.getHours();
        hour = hour < 10 ? "0" + hour : hour;
        var minute = element.getMinutes();
        minute = minute < 10 ? "0" + minute : minute;
        var second = element.getSeconds();
        second = second < 10 ? "0" + second : second;
        let dates =
          year +
          "-" +
          month +
          "-" +
          day +
          " " +
          hour +
          ":" +
          minute +
          ":" +
          second;
        array.push(dates);
      });
      return array;
    },
    // 查询
    refer() {
      let queryData = this.searchData;
      // 加上时间
      queryData.operateStart = this.date_filter(this.applicationDate)[0];
      queryData.operateEnd = this.date_filter(this.applicationDate)[1];
      this.prepaymentList(queryData);
    },
    // 清空
    empty() {
      // 出账编号
      this.loanNo = "";
      // 客户姓名
      this.customerName = "";
      // 放款机构
      this.lineId = "";
      // 身份证号
      this.certNo = "";
      this.applicationDate = "";
      // 查询数据
      this.searchData = {
        // flow_no: "repaymentFlow",
        // phase_no: ["1000", "2000"],
        eq: {},
        likeRight: {},
        like: {}
      };
    },
    jump(pageNum) {
      // 分页
      // this.pageConfig.currentPage = pageNum;
      // this.getData(this.pageConfig.currentPage, this.pageConfig.pageSize);
      this.prepaymentList(this.searchData, pageNum);
      console.log(pageNum);
    },
    // --查询框方法开始
    // input失去焦点，关闭下拉框
    blur_select(icoBottom, icoTop, selectRef, flag, value) {
      // 清空seardata 里的value
      this.filter_search_type(this.searchData, value);
      // 默认为eq
      this.searchData.eq[value] = this[value];
      setTimeout(() => {
        this[icoBottom] = true;
        this[icoTop] = false;
        this.$refs[selectRef].style.display = "none";
        this[flag] = true;
      }, 200);
    },
    // input聚焦，打开下拉框
    open_select(icoBottom, icoTop, selectRef, flag, value) {
      this[icoBottom] = false;
      this[icoTop] = true;
      this.$refs[selectRef].style.display = "block";
      this.$refs[selectRef].style.height = "124px";
      this[flag] = false;
    },
    // 去掉重复的查询条件
    filter_search_type(searchData, value) {
      for (const item in this.searchData) {
        for (const item2 in this.searchData[item]) {
          // 如果这个对象里有当前的key值，把eq,like,likeright对象里的这个key值清空，再给对应的eq，like,likeright赋属性名
          if (item2 === value) {
            delete this.searchData[item][item2];
          }
        }
      }
    },
    // 选中
    selected_fun(type, value, selectRef, flag, icoBottom, icoTop) {
      console.log(type, value, selectRef, "选中");
      this[icoBottom] = true;
      this[icoTop] = false;
      this.$refs[selectRef].style.display = "none";
      this[flag] = true;
      switch (type) {
        case "eq":
          this.filter_search_type(this.searchData, value);
          this.searchData[type][value] = this[value];
          break;
        case "likeRight":
          this.filter_search_type(this.searchData, value);
          this.searchData[type][value] = this[value];
          break;
        case "like":
          this.filter_search_type(this.searchData, value);
          this.searchData[type][value] = this[value];
          break;
      }
      console.log(this.searchData, "searchdata");
    },
    // 点击下拉箭头
    select_type_fun(icoBottom, icoTop, selectRef, flag) {
      if (this[flag]) {
        // 展开
        this[icoBottom] = false;
        this[icoTop] = true;
        this.$refs[selectRef].style.display = "block";
        this[flag] = false;
      } else {
        // 收起
        this[icoBottom] = true;
        this[icoTop] = false;
        this.$refs[selectRef].style.display = "none";
        this[flag] = true;
      }
    }
    // --查询框方法结束
  },
  components: {
    // successDetail, // 详情
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
  //   overflow: hidden;
  padding: 0px 30px;
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
  .sponsor {
    width: 100%;
    // height: 100%;
    // padding-top: 20px;
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
    height: 625px;
    margin-top: 21px;
    overflow: auto;
  }
  // page_box 分页
  .page_box {
    width: 100%;
    margin-top: 20px;
  }
}
</style>
