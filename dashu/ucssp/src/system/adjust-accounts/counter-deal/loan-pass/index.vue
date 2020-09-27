<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-05 10:15:19
 * @LastEditTime: 2019-08-20 17:40:24
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div>
    <div class="content">
      <!-- 新增按钮 -->
      <!-- <button class="add" @click="add_alert()">+ 新增</button> -->
      <!-- 输入框和下拉框 -->
      <div class="b_content">
        <!-- 合作机构 -->
        <div class="demo-ruleForms">
          <input class="select_72" v-model="item_name" placeholder="合作机构" @focus="open_select('icoToBottom1', 'icoToTop1', 'operateOrgidSelectRef', 'ico_flag1', 'item_name')" @blur="blur_select('icoToBottom1', 'icoToTop1', 'operateOrgidSelectRef', 'ico_flag1', 'item_name')"/>
          <span :class="{'select_af':true , 'select_toTop': icoToTop1, 'select_toBottom': icoToBottom1}" ref="select_type_btn"></span>
          <div class="select_option" ref="operateOrgidSelectRef">
            <div class="opton_item" @click="selected_fun('eq', 'item_name', 'operateOrgidSelectRef', 'ico_flag1', 'icoToBottom1', 'icoToTop1')">
              <span>等于"{{item_name}}"</span>
            </div>
            <div class="opton_item" @click="selected_fun('likeRight', 'item_name', 'operateOrgidSelectRef', 'ico_flag1', 'icoToBottom1', 'icoToTop1')">
              <span>以"{{item_name}}"开头</span>
            </div>
            <div class="opton_item" @click="selected_fun('like', 'item_name', 'operateOrgidSelectRef', 'ico_flag1', 'icoToBottom1', 'icoToTop1')">
              <span>包含"{{item_name}}"</span>
            </div>
          </div>
        </div>
        <!-- 出账编号 -->
        <div class="demo-ruleForms">
          <input class="select_72" v-model="loan_no" placeholder="出账编号" @focus="open_select('icoToBottom2', 'icoToTop2', 'applicationNumberSelectRef', 'ico_flag2', 'loan_no')" @blur="blur_select('icoToBottom2', 'icoToTop2', 'applicationNumberSelectRef', 'ico_flag2', 'loan_no')"/>
          <span :class="{'select_af':true , 'select_toTop': icoToTop2, 'select_toBottom': icoToBottom2}" ref="select_type_btn"></span>
          <div class="select_option" ref="applicationNumberSelectRef">
            <div class="opton_item" @click="selected_fun('eq', 'loan_no', 'applicationNumberSelectRef', 'ico_flag2', 'icoToBottom2', 'icoToTop2')">
              <span>等于"{{loan_no}}"</span>
            </div>
            <div class="opton_item" @click="selected_fun('likeRight', 'loan_no', 'applicationNumberSelectRef', 'ico_flag2', 'icoToBottom2', 'icoToTop2')">
              <span>以"{{loan_no}}"开头</span>
            </div>
            <div class="opton_item" @click="selected_fun('like', 'loan_no', 'applicationNumberSelectRef', 'ico_flag2', 'icoToBottom2', 'icoToTop2')">
              <span>包含"{{loan_no}}"</span>
            </div>
          </div>
        </div>
        <!-- 导入时间 -->
        <el-date-picker
          style="margin-right: 20px;"
          v-model="putout_date"
          type="daterange"
          align="right"
          unlink-panels
          range-separator="至"
          start-placeholder="放款日期"
          end-placeholder="放款日期">
        </el-date-picker>
        <div class="demo-ruleForms">
          <input class="select_72" v-model="customer_name" placeholder="客户姓名" @focus="open_select('icoToBottom3', 'icoToTop3', 'userNameSelectRef', 'ico_flag3', 'customer_name')" @blur="blur_select('icoToBottom3', 'icoToTop3', 'userNameSelectRef', 'ico_flag3', 'customer_name')"/>
          <span :class="{'select_af':true , 'select_toTop': icoToTop3, 'select_toBottom': icoToBottom3}" ref="select_type_btn"></span>
          <div class="select_option" ref="userNameSelectRef">
            <div class="opton_item" @click="selected_fun('eq', 'customer_name', 'userNameSelectRef', 'ico_flag3', 'icoToBottom3', 'icoToTop3')">
              <span>等于"{{customer_name}}"</span>
            </div>
            <div class="opton_item" @click="selected_fun('likeRight', 'customer_name', 'userNameSelectRef', 'ico_flag3', 'icoToBottom3', 'icoToTop3')">
              <span>以"{{customer_name}}"开头</span>
            </div>
            <div class="opton_item" @click="selected_fun('like', 'customer_name', 'userNameSelectRef', 'ico_flag3', 'icoToBottom3', 'icoToTop3')">
              <span>包含"{{customer_name}}"</span>
            </div>
          </div>
        </div>
        <!-- <el-input class="select_72" v-model="customer_name" placeholder="客户姓名"></el-input>  -->
        <el-button class="b_button query button " @click="refer(1)">查询</el-button>
        <el-button class="b_button empty button " @click="empty()">清空</el-button>
      </div>
      <!-- 表格 -->
      <div class="table_box">
         <el-table
          class="tables"
          :data="for_"
          :header-cell-style="{'font-size':'12px','text-align':'center','height':'38.9px','background':'#ececec'}">
          <el-table-column
            prop="loan_no"
            label="出账编号"
            width="auto">
          </el-table-column>
          <el-table-column
            prop="customer_name"
            label="客户姓名"
            width="auto">
          </el-table-column>
          <el-table-column
            prop="line_id"
            label="合作机构"
            width="auto">
          </el-table-column>
          <el-table-column
            prop="putout_date"
            label="放款日期"
            width="auto">
          </el-table-column>
          <el-table-column
            prop="cert_no"
            label="身份证号"
            width="auto">
            <template  slot-scope="scope">
              <div>{{scope.row.cert_no | certificateNum}}</div>
            </template>
          </el-table-column>
          <el-table-column
            prop="business_sum"
            label="放款金额"
            width="auto">
          </el-table-column>
          <el-table-column
            prop="created_date"
            label="数据导入时间"
            width="auto">
            <template  slot-scope="scope">
              <div>{{scope.row.created_date | date_filter}}</div>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- 分页条 -->
      <pagination @jump-page='jump' :page='pageConfig' class="pagination"></pagination>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import "@system/adjust-accounts/counter-deal/css/myQuerySelect.less";
import pagination from "@components/pagination"; // 分页条
import { counterDealApi } from "@/system/adjust-accounts/counter-deal/js/server"; // 接口
export default {
  data() {
    return {
      // 查询数据
      searchData: {
        "eq": {},
        "likeRight": {},
        "like": {}
      },
      // 合作机构图标方向
      icoToTop1: false,
      icoToBottom1: false,
      ico_flag1: true,
      // 出账编号图标方向
      icoToTop2: false,
      icoToBottom2: false,
      ico_flag2: true,
      // 客户姓名图标方向
      icoToTop3: false,
      icoToBottom3: false,
      ico_flag3: true,
      item_name: '', // 合作机构
      loan_no: '', // 申请编号
      putout_date: "", // 导入时间
      // 日期控件
      pickerOptions2: {
        shortcuts: [{
          text: '最近一周',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近一个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近三个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
            picker.$emit('pick', [start, end]);
          }
        }]
      },
      customer_name: '', // 客户姓名
      for_: [], // 渲染数据列表
      alert_: false, // 新增规则配置
      alert_d: false, // 删除规则配置
      alert_e: false, // 编辑规则配置
      compile: [], // 传给编辑页面数据
      pageConfig: {
        account: 16, // 总条数
        pageSize: 6, // 一页有几条数据
        currentPage: 1, // 当前页
        showJumpButton: true // 显示跳转按钮
      } // 分页
    };
  },
  mounted() {
    // 查询接口
    this.loanSearch(this.searchData);
  },
  filters: {
    date_filter(data) {
      function change(t) {
                if (t < 10) {
                    return "0" + t;
                } else {
                    return t;
                }
            };
            if (data) {
                var date = new Date(data * 1000); // 时间戳为10位需*1000，时间戳为13位的话不需乘1000;
                let Y = date.getFullYear() + '-';
                let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
                let D = change(date.getDate()) + ' ';
                let h = change(date.getHours()) + ':';
                let m = change(date.getMinutes()) + ':';
                let s = change(date.getSeconds());
                return Y + M + D + h + m + s;
            } else {
                return "---";
            }
    }
  },
  methods: {
    // 日期转换
    date_filter(list) {
        list = list || [];
        let array = [];
        list.forEach((element, index) => {
            var year = element.getFullYear();
            var month = element.getMonth() + 1;
                month = month < 10 ? ('0' + month) : month;
            var day = element.getDate();
                day = day < 10 ? ('0' + day) : day;
            let dates = year + '-' + month + '-' + day;
            array.push(dates);
        });
        return array;
    },
    // 放款查询接口
    loanSearch(res, current) {
      res = res || {};
      current = current || 1;
      let url = counterDealApi.LoanSearch + "?current=" + current + "&size=10";
      console.log("url,current", url, res);
      this.$MyFetch.post(url, res)
      .then((data = {}) => {
        if (data.records.length < 1) {
          this.confirmFn("暂无查询数据！");
        }
          this.for_ = data.records;
          // 总条数
          this.pageConfig.account = data.total || 1;
          // 当前页
          this.pageConfig.currentPage = data.current || 1;
          // 一页有几条数据 pageSize
          this.pageConfig.pageSize = data.size || 10;
        })
        .catch((err) => {
          this.$error(err.message);
        });
    },
    jump(pageNum) {
      // 当前页
      this.pageConfig.currentPage = pageNum;
      this.loanSearch(this.searchData, pageNum);
    },
    // 清空按钮
    empty() {
      // 让输入框里的值清空
      this.item_name = '';
      this.loan_no = '';
      this.putout_date = '';
      this.customer_name = '';
      // 让查询数据清空
      this.searchData = {
        "eq": {},
        "likeRight": {},
        "like": {}
      };
    },
    // 查询按钮
    refer() {
      // 查询田间不为空
      if (this.searchNone()) {
        this.searchData.putout_date = this.date_filter(this.putout_date);
        let data = this.searchData;
        console.log('查询', data);
        this.loanSearch(data);
      } else {
         this.confirmFn("请输入查询条件");
      }
    },
    // 查询为空判断
    searchNone() {
      if (this.item_name !== '') {
        return true;
      } else if (this.loan_no !== '') {
        return true;
      } else if (this.putout_date !== '') {
        return true;
      } else if (this.customer_name !== '') {
        return true;
      } else {
        return false;
      }
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
        console.log(type, value, selectRef, '选中');
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
        console.log(this.searchData, 'searchdata');
    },
    // 点击下拉箭头
    select_type_fun(icoBottom, icoTop, selectRef, flag) {
        if (this[flag]) { // 展开
            this[icoBottom] = false;
            this[icoTop] = true;
            this.$refs[selectRef].style.display = "block";
            this[flag] = false;
        } else { // 收起
            this[icoBottom] = true;
            this[icoTop] = false;
            this.$refs[selectRef].style.display = "none";
            this[flag] = true;
        }
    }
    // --查询框方法结束
  },
  components: {
    pagination
  }
};
</script>

<style lang="less" rel="stylesheet/less" scoped>
/* 表格的行高 */
/deep/ .el-table--enable-row-transition .el-table__body td {
  height: 60px;
}

// 中间部分
.content {
  min-height: 850px;
  border-radius: 4px;
  background: #fff;
  box-shadow: 1px 2px 20px #ccc;
  overflow: hidden;
  padding: 20px 30px;
  position: relative;
  // 分页条
  .pagination {
    position: absolute;
    bottom: 20px;
    right: 30px;
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
    margin: 20px 30px;
  }
  // 输入框和下拉框部分样式
  .b_content {
    text-align: left;
    // height: 40px;
    position: relative;
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
  // 表格的box
  .table_box {
    width: 100%;
    height: 670px;
    overflow: auto;
  }
  // // 表格总体样式
  .tables {
    overflow-y: auto;
    overflow-x: hidden;
    width: 100%;
    // height: 650px;
    // margin: 0px auto;
    border: 1px solid #d0d0d0;
    margin-top: 20px;
    border-radius: 4px;
  }
}
</style>
