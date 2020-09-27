<template>
  <div class="content">
    <div class="accomplish">
      <!-- 查询这一行 -->
      <div class="serach_row">
        <!-- 出账编号 -->
        <div class="demo-ruleForms">
          <input
            class="select_72"
            @change="inputChange('lbLoanNo', /^[A-Z0-9]*$/g, '只允许输入大写字母和数字')"
            v-model="lbLoanNo"
            placeholder="出账编号"
            @focus="open_select('icoToBottom1', 'icoToTop1', 'lbLoanNoRef', 'ico_flag1', 'lbLoanNo')"
            @blur="blur_select('icoToBottom1', 'icoToTop1', 'lbLoanNoRef', 'ico_flag1', 'lbLoanNo')"
            ref="lbLoanNoInput"
          />
          <span
            :class="{'select_af':true , 'select_toTop': icoToTop1, 'select_toBottom': icoToBottom1}"
            ref="select_type_btn"
          ></span>
          <div class="select_option" ref="lbLoanNoRef">
            <div
              class="opton_item"
              @click="selected_fun('eq', 'lbLoanNo', 'lbLoanNoRef', 'ico_flag1', 'icoToBottom1', 'icoToTop1')"
            >
              <span>等于"{{lbLoanNo}}"</span>
            </div>
            <div
              class="opton_item"
              @click="selected_fun('likeRight', 'lbLoanNo', 'lbLoanNoRef', 'ico_flag1', 'icoToBottom1', 'icoToTop1')"
            >
              <span>以"{{lbLoanNo}}"开头</span>
            </div>
            <div
              class="opton_item"
              @click="selected_fun('like', 'lbLoanNo', 'lbLoanNoRef', 'ico_flag1', 'icoToBottom1', 'icoToTop1')"
            >
              <span>包含"{{lbLoanNo}}"</span>
            </div>
          </div>
        </div>
        <!-- 客户姓名 -->
        <div class="demo-ruleForms">
          <input
            class="select_72"
            @change="inputChange('ciCustomerName', /^[(\u4E00-\u9FA5\uf900-\ufa2d)||·]{0,15}$/g, '只允许输入汉字和“.“，最多输入15个字符')"
            v-model="ciCustomerName"
            placeholder="客户姓名"
            @focus="open_select('icoToBottom2', 'icoToTop2', 'ciCustomerNameRef', 'ico_flag2', 'ciCustomerName')"
            @blur="blur_select('icoToBottom2', 'icoToTop2', 'ciCustomerNameRef', 'ico_flag2', 'ciCustomerName')"
          />
          <span
            :class="{'select_af':true , 'select_toTop': icoToTop2, 'select_toBottom': icoToBottom2}"
            ref="select_type_btn"
          ></span>
          <div class="select_option" ref="ciCustomerNameRef">
            <div
              class="opton_item"
              @click="selected_fun('eq', 'ciCustomerName', 'ciCustomerNameRef', 'ico_flag2', 'icoToBottom2', 'icoToTop2')"
            >
              <span>等于"{{ciCustomerName}}"</span>
            </div>
            <div
              class="opton_item"
              @click="selected_fun('likeRight', 'ciCustomerName', 'ciCustomerNameRef', 'ico_flag2', 'icoToBottom2', 'icoToTop2')"
            >
              <span>以"{{ciCustomerName}}"开头</span>
            </div>
            <div
              class="opton_item"
              @click="selected_fun('like', 'ciCustomerName', 'ciCustomerNameRef', 'ico_flag2', 'icoToBottom2', 'icoToTop2')"
            >
              <span>包含"{{ciCustomerName}}"</span>
            </div>
          </div>
        </div>
        <!-- 身份证号 -->
        <div class="demo-ruleForms">
          <input
            class="select_72"
            v-model="ciCertNo"
            placeholder="身份证号"
            @focus="open_select('icoToBottom3', 'icoToTop3', 'ciCertNoRef', 'ico_flag3', 'ciCertNo')"
            @blur="blur_select('icoToBottom3', 'icoToTop3', 'ciCertNoRef', 'ico_flag3', 'ciCertNo')"
          />
          <span
            :class="{'select_af':true , 'select_toTop': icoToTop3, 'select_toBottom': icoToBottom3}"
            ref="select_type_btn"
          ></span>
          <div class="select_option" ref="ciCertNoRef">
            <div
              class="opton_item"
              @click="selected_fun('eq', 'ciCertNo', 'ciCertNoRef', 'ico_flag3', 'icoToBottom3', 'icoToTop3')"
            >
              <span>等于"{{ciCertNo}}"</span>
            </div>
            <div
              class="opton_item"
              @click="selected_fun('likeRight', 'ciCertNo', 'ciCertNoRef', 'ico_flag3', 'icoToBottom3', 'icoToTop3')"
            >
              <span>以"{{ciCertNo}}"开头</span>
            </div>
            <div
              class="opton_item"
              @click="selected_fun('like', 'ciCertNo', 'ciCertNoRef', 'ico_flag3', 'icoToBottom3', 'icoToTop3')"
            >
              <span>包含"{{ciCertNo}}"</span>
            </div>
          </div>
        </div>
        <el-date-picker
          v-model="applicationDate"
          class="repayDateCss"
          type="daterange"
          align="right"
          range-separator="至"
          value-format="yyyy-MM-dd"
          start-placeholder="提前结清日期"
          end-placeholder="提前结清日期"
        ></el-date-picker>
        <el-button class="b_button query button" @click="refer(1)">查询</el-button>
        <el-button class="b_button empty button" @click="empty()">清空</el-button>
      </div>
      <!-- 带全选的表格 -->
      <div class="table_box">
        <el-table
          :header-cell-style="{'font-size':'12px','text-align':'center','height':'38.9px','background':'#ececec'}"
          ref="multipleTable"
          max-height="625"
          :data="dataList"
          tooltip-effect="dark"
          style="width: 100%; border: 1px solid #E9E9E9;"
          @selection-change="handleSelectionChange"
        >
          <el-table-column prop="transSerialNo" width="180" label="交易号"></el-table-column>
          <el-table-column prop="loanNo" width="180" label="出账编号"></el-table-column>
          <el-table-column prop="customerName" width="100" label="客户姓名"></el-table-column>
          <el-table-column prop="lineIdName" width="200" label="放款机构">
            <template slot-scope="scope">
              <el-popover trigger="hover" placement="top" v-if="scope.row.lineIdName">
                <p class="ellipsis">{{scope.row.lineIdName}}</p>
                <div slot="reference">
                  <p class="yincan ellipsis">{{scope.row.lineIdName}}</p>
                </div>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column prop="totAmt" label="总计减免金额"></el-table-column>
          <el-table-column prop="finishDate" label="提前结清日期"></el-table-column>
          <el-table-column prop="phaseName" label="当前阶段"></el-table-column>
          <el-table-column width="140px" fixed="right" label="操作">
            <template slot-scope="scope">
              <el-button type="text" @click="detail_fun(scope.row)">明细</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <!-- 分页 -->
    <div class="page_box">
      <pagination @jump-page="jump" :page="pageConfig" class="pagination"></pagination>
    </div>
    <!-- 详情 -->
    <alertDetail v-if="alert_detail" :detailData="detailData" @close="detail_close"></alertDetail>
  </div>
</template>

<script>
import pagination from "@components/pagination"; // 分页条
import { prepaymentBreak } from "@/system/adjust-accounts/counter-deal/js/server"; // 接口
import alertDetail from "../components/alert-detail";
export default {
  data() {
    return {
      lbLoanNo: "",
      ciCustomerName: "",
      ciCertNo: "",
      applicationDate: "",
      // 出账编号图标方向
      icoToTop1: false,
      icoToBottom1: false,
      ico_flag1: true,
      // 客户姓名图标方向
      icoToTop2: false,
      icoToBottom2: false,
      ico_flag2: true,
      // 身份证图标方向
      icoToTop3: false,
      icoToBottom3: false,
      ico_flag3: true,
      // 查询数据
      searchData: {
        flowNo: "RepaymentBreakFlow",
        phaseNo: "0030",
        eq: {},
        likeRight: {},
        like: {}
      },
      // 渲染数据列表
      dataList: [],
      selectData: [],
      delete_hint: false,
      alert_detail: false, // 详情
      detailData: {
        type: "",
        loanNo: "",
        transSerialNo: ""
      }, // 传给详情的数据
      // 分页
      pageConfig: {
        account: "", // 总条数
        pageSize: 50, // 当前多少条数据
        currentPage: 1, // 当前页
        showJumpButton: true // 显示跳转按钮
      }
    };
  },
  components: {
    alertDetail,
    pagination
  },
  methods: {
    // 验证
    inputChange(value, reg, massage) {
      if (!reg.test(this[value])) {
        this[value] = "";
        this.$message(massage);
      }
    },
    // 选择框选中
    handleSelectionChange(data) {
      // 清空表格选中的提交删除接口参数
      // this.acctData = [];
      // data.forEach(element => {
      //   // 获取选中的交易号,并push到记账的参数列表去;
      //   this.acctData.push(element.trans_serial_no);
      // });
      this.selectData = data;
      console.log("handleSelectionChange", data);
    },
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
    },
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
    refer(current) {
      if (
        !this.lbLoanNo &&
        !this.ciCustomerName &&
        !this.ciCertNo &&
        !this.applicationDate
      ) {
        this.$message("请至少输入一项查询条件");
        return;
      }
      let queryData = this.searchData;
      queryData.queryDateBeg = this.applicationDate[0];
      queryData.queryDateEnd = this.applicationDate[1];
      this.referList(current, queryData);
    },

    // 提前还款-查询接口
    referList(current, params) {
      current = current || 1;
      let url =
        prepaymentBreak.queryFlowStatus + "?current=" + current + "&size=50";
      this.$MyFetch
        .post(url, params)
        .then((data = {}) => {
          this.dataList = data.records;
          // 总条数
          this.pageConfig.account = data.total || 1;
          // 当前页
          this.pageConfig.currentPage = data.current || 1;
          // 一页有几条数据 pageSize
          this.pageConfig.pageSize = data.size || 50;
        })
        .catch(err => {
          this.$error(err.message);
        });
    },
    // 清空
    empty() {
      // 出账编号
      this.lbLoanNo = "";
      // 客户姓名
      this.ciCustomerName = "";
      // 身份证号
      this.ciCertNo = "";
      // 提前结清日期
      this.applicationDate = "";
      // 查询数据
      this.searchData = {
        flowNo: "RepaymentBreakFlow",
        phaseNo: "0030",
        eq: {},
        likeRight: {},
        like: {}
      };
    },
    jump(pageNum) {
      this.referList(this.searchData, pageNum);
    },
    detail_fun(row) {
      console.log("row", row);
      this.detailData.loanNo = row.loanNo;
      this.detailData.transSerialNo = row.transSerialNo;
      this.detailData.type = "done";
      console.log("this.detailData", this.detailData);
      this.alert_detail = true;
    },
    detail_close() {
      this.alert_detail = false;
    },
    detail_save(data) {
      console.log("detail_save", data);
    }
  },
  mounted() {}
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
  .accomplish {
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
    height: 495px;
    margin-top: 21px;
    overflow: auto;
  }
  // page_box 分页
  .page_box {
    width: 100%;
    margin-top: 40px;
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
