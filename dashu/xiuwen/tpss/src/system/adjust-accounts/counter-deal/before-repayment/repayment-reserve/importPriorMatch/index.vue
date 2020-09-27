<style lang="less" rel="stylesheet/less" scoped>
// 公共样式
.margin_r_60 {
  margin-right: 60px;
}
// 弹窗总box
.drop_loan {
  .dialog-mask {
    z-index: 1000;
  }
  .dialog-box {
    height: 870px;
    width: 1200px;
    padding: 0px;
    .dialog-box__top {
      margin: 0px;
    }
    .title_type {
      text-align: center;
      background: #fff;
      font-size: 18px;
      color: #333;
      letter-spacing: 1.3px;
      padding-left: 20px;
      font-weight: normal;
      font-family: PingFangSC-Regular;
    }
    .dialog-box__middle-form {
      // height: 720px;
      // overflow-y: auto;
      // 中间内容区域
      .form__block {
        height: 650px;
        padding: 20px 30px;
        box-shadow: 0 1px 10px 0 rgba(0, 0, 0, 0.05);
      }
      // 按钮部分
      .form__bottom {
        left: 50%;
        padding-bottom: 30px;
        background-color: rgba(255, 255, 255);
        .add {
          width: 200px;
        }
      }
    }
  }
  /*表单区块*/
  .dialog-box__middle-form {
    .form__bottom {
      text-align: center;
      padding-bottom: 20px;
    }
  }
  // 弹窗下部分
  .complete-product {
    width: 100%;
    background: #fff;
    // height: 720px;
    // 输入框和下拉框部分样式
    .b_content {
      text-align: left;
      height: 40px;
      // margin-left: 28px;
      // margin-top: 20px;
      // 输入框和下拉框170*40
      .select_7 {
        width: 170px;
        height: 40px;
        margin-right: 15px;
      }
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
      .span {
        position: absolute;
      }
      .effective {
        left: 25.3%;
        top: 8%;
        font-size: 12px;
        color: #bbbbbb;
        letter-spacing: 1.09px;
      }
      .transverse {
        left: 35.1%;
        top: 12.5%;
        color: #bbbbbb;
      }
    }
    // 表格
    .table_box {
        width: 100%;
        height: 531px;
        margin-top: 21px;
        overflow: auto;
    }
    // 分页
    .pagination {
      margin: 30px 0;
      padding-right: 30px;
    }
  }
}
</style>
<template>
  <div class="drop_loan">
    <div class="dialog-mask"></div>
    <div class="dialog-box">
      <!-- 弹窗上部分 -->
      <div class="dialog-box__top">
        <h5 class="title_type">引入</h5>
        <span class="el-icon-close button button__close" @click="close"></span>
      </div>
      <!-- 弹窗下部分 -->
      <div class="complete-product">
        <div class="dialog-box__middle-form">
          <!-- 内容区 -->
            <div class="form__block bg__white border__radius-5" >
              <!-- 输入框和下拉框 -->
              <div class="b_content">
                <!-- 客户姓名 -->
                <div class="demo-ruleForms">
                    <input class="select_72" v-model="customer_name" @change="certNoChange('customer_name', /^[(\u4E00-\u9FA5\uf900-\ufa2d)||·]{0,15}$/g, '只允许输入汉字和“.“，最多输入15个字符')" placeholder="客户姓名" @focus="open_select('icoToBottom2', 'icoToTop2', 'customer_nameRef', 'ico_flag2', 'customer_name')" @blur="blur_select('icoToBottom1', 'icoToTop2', 'customer_nameRef', 'ico_flag2', 'customer_name')"/>
                    <span :class="{'select_af':true , 'select_toTop': icoToTop2, 'select_toBottom': icoToBottom2}" ref="select_type_btn"></span>
                    <div class="select_option" ref="customer_nameRef">
                        <div class="opton_item" @click="selected_fun('eq', 'customer_name', 'customer_nameRef', 'ico_flag2', 'icoToBottom2', 'icoToTop2')">
                        <span>等于"{{customer_name}}"</span>
                        </div>
                        <div class="opton_item" @click="selected_fun('likeRight', 'customer_name', 'customer_nameRef', 'ico_flag2', 'icoToBottom2', 'icoToTop2')">
                        <span>以"{{customer_name}}"开头</span>
                        </div>
                        <div class="opton_item" @click="selected_fun('like', 'customer_name', 'customer_nameRef', 'ico_flag2', 'icoToBottom2', 'icoToTop2')">
                        <span>包含"{{customer_name}}"</span>
                        </div>
                    </div>
                </div>
                <!-- 出账编号 -->
                <div class="demo-ruleForms">
                    <input class="select_72" v-model="loan_no" @change="certNoChange('loan_no', /^[A-Z0-9]*$/g, '只允许输入大写字母和数字')" placeholder="出账编号" @focus="open_select('icoToBottom1', 'icoToTop1', 'loan_noRef', 'ico_flag1', 'loan_no')" @blur="blur_select('icoToBottom1', 'icoToTop1', 'loan_noRef', 'ico_flag1', 'loan_no')" ref="loan_noInput" />
                    <span :class="{'select_af':true , 'select_toTop': icoToTop1, 'select_toBottom': icoToBottom1}" ref="select_type_btn"></span>
                    <div class="select_option" ref="loan_noRef">
                        <div class="opton_item" @click="selected_fun('eq', 'loan_no', 'loan_noRef', 'ico_flag1', 'icoToBottom1', 'icoToTop1')">
                        <span>等于"{{loan_no}}"</span>
                        </div>
                        <div class="opton_item" @click="selected_fun('likeRight', 'loan_no', 'loan_noRef', 'ico_flag1', 'icoToBottom1', 'icoToTop1')">
                        <span>以"{{loan_no}}"开头</span>
                        </div>
                        <div class="opton_item" @click="selected_fun('like', 'loan_no', 'loan_noRef', 'ico_flag1', 'icoToBottom1', 'icoToTop1')">
                        <span>包含"{{loan_no}}"</span>
                        </div>
                    </div>
                </div>
                <!-- 放款机构 -->
                <div class="demo-ruleForms">
                    <input class="select_72" v-model="line_id" @change="certNoChange('line_id', /^[\u4E00-\u9FA5\uf900-\ufa2d]{0,15}$/g, '只允许输入汉字，最多输入15个字符')" placeholder="放款机构" @focus="open_select('icoToBottom3', 'icoToTop3', 'line_idRef', 'ico_flag3', 'line_id')" @blur="blur_select('icoToBottom3', 'icoToTop3', 'line_idRef', 'ico_flag3', 'line_id')"/>
                    <span :class="{'select_af':true , 'select_toTop': icoToTop3, 'select_toBottom': icoToBottom3}" ref="select_type_btn"></span>
                    <div class="select_option" ref="line_idRef">
                        <div class="opton_item" @click="selected_fun('eq', 'line_id', 'line_idRef', 'ico_flag3', 'icoToBottom3', 'icoToTop3')">
                        <span>等于"{{line_id}}"</span>
                        </div>
                        <div class="opton_item" @click="selected_fun('likeRight', 'line_id', 'line_idRef', 'ico_flag3', 'icoToBottom3', 'icoToTop3')">
                        <span>以"{{line_id}}"开头</span>
                        </div>
                        <div class="opton_item" @click="selected_fun('like', 'line_id', 'line_idRef', 'ico_flag3', 'icoToBottom3', 'icoToTop3')">
                        <span>包含"{{line_id}}"</span>
                        </div>
                    </div>
                </div>
                <!-- 身份证号 -->
                <div class="demo-ruleForms">
                    <input class="select_72" v-model="cert_no" placeholder="身份证号" @focus="open_select('icoToBottom4', 'icoToTop4', 'cert_noRef', 'ico_flag4', 'cert_no')" @blur="blur_select('icoToBottom4', 'icoToTop4', 'cert_noRef', 'ico_flag4', 'cert_no')" ref="cert_noInput" />
                    <span :class="{'select_af':true , 'select_toTop': icoToTop4, 'select_toBottom': icoToBottom4}" ref="select_type_btn"></span>
                    <div class="select_option" ref="cert_noRef">
                        <div class="opton_item" @click="selected_fun('eq', 'loan_no', 'loan_noRef', 'ico_flag4', 'icoToBottom4', 'icoToTop1')">
                        <span>等于"{{cert_no}}"</span>
                        </div>
                        <div class="opton_item" @click="selected_fun('likeRight', 'cert_no', 'cert_noRef', 'ico_flag4', 'icoToBottom4', 'icoToTop4')">
                        <span>以"{{cert_no}}"开头</span>
                        </div>
                        <div class="opton_item" @click="selected_fun('like', 'cert_no', 'cert_noRef', 'ico_flag4', 'icoToBottom4', 'icoToTop4')">
                        <span>包含"{{cert_no}}"</span>
                        </div>
                    </div>
                </div>
                <!-- <el-input class="select_72" v-model="customer_name" placeholder="客户姓名"></el-input>
                <el-input class="select_72" v-model="loan_no" placeholder="出账编号"></el-input>
                <el-input class="select_72" v-model="line_id" placeholder="还款期次"></el-input> -->
                <!-- <el-date-picker
                  v-model="value1"
                  class="select_7"
                  type="date"
                  value-format="yyyy-MM-dd"
                  placeholder="应还日期">
                </el-date-picker> -->
                <el-button class="b_button query button " @click="refer(1)">查询</el-button>
                <el-button class="b_button empty button " @click="empty()">清空</el-button>
              </div>
              <!-- 带全选的表格 -->
              <div class="table_box">
                  <el-table
                  :default-sort = "{prop: 'date', order: 'descending'}"
                  :header-cell-style="{'font-size':'12px','text-align':'center','height':'38.9px','background':'#F9FAFB'}"
                  ref="multipleTable"
                  :data="for_"
                  tooltip-effect="dark"
                  style="width: 100%; border: 1px solid #E9E9E9;"
                  @select="select"
                  @select-all="clickSelectAll"
                  @row-click="rowCheck">
                    <el-table-column
                        type="selection">
                    </el-table-column>
                    <el-table-column
                        prop="loan_no"
                        label="出账编号">
                    </el-table-column>
                    <el-table-column
                        prop="customer_name"
                        label="客户姓名">
                    </el-table-column>
                    <el-table-column
                        prop="business_sum"
                        label="放款金额">
                    </el-table-column>
                        <el-table-column
                        prop="line_id"
                        label="放款机构">
                    </el-table-column>
                    <el-table-column
                        prop="cert_no"
                        label="身份证号码">
                         <template  slot-scope="scope">
                            <div>{{scope.row.cert_no | certificateNum}}</div>
                        </template>
                    </el-table-column>
                        <el-table-column
                        prop="putout_date"
                        label="放款日期">
                    </el-table-column>
                    <el-table-column
                        prop="loan_term"
                        label="贷款期限">
                    </el-table-column>
                    <el-table-column
                        prop="loan_status"
                        label="是否逾期">
                    </el-table-column>
                  </el-table>
              </div>
            </div>
            <!-- 分页条 -->
            <pagination @jump-page='jump' :page='pageConfig' class="pagination"></pagination>
            <div class="form__bottom">
              <el-button class="add finish button " type="primary" @click="finish()">确认</el-button>
            </div>
        </div>
      </div>
    </div>
    <!-- <composite v-if="alert_" :save="save" :refer="refer" @clsoe_windowused='close_1' /> -->
    <!-- <stateOfPreservation v-if="alert_1" @clsoe_windowused='close_2' /> -->
  </div>
</template>
<script type="text/ecmascript-6">
import "@common/css/dialog";
import "@system/adjust-accounts/counter-deal/css/myQuerySelect.less";
import pagination from "@components/pagination"; // 分页条
import { counterDealApi } from "@/system/adjust-accounts/counter-deal/js/server"; // 接口
// import { counterDealApi } from "../../../js/server"; // 接口
export default {
  data() {
    return {
      customer_name: '', // 客户姓名
      loan_no: '', // 出账编号
      line_id: '', // 放款机构
      cert_no: '', // 身份证号
      // 查询数据
      searchData: {
        "eq": {},
        "likeRight": {},
        "like": {}
      },
      // 出账编号图标方向
      icoToTop1: false,
      icoToBottom1: false,
      ico_flag1: true,
      // 客户姓名图标方向
      icoToTop2: false,
      icoToBottom2: false,
      ico_flag2: true,
      // 放款期次图标方向
      icoToTop3: false,
      icoToBottom3: false,
      ico_flag3: true,
      // 身份证号图标方向
      icoToTop4: false,
      icoToBottom4: false,
      ico_flag4: true,
      pageConfig: {
          account: 2, // 总条数
          pageSize: 2, // 当前多少条数据
          currentPage: 1, // 当前页
          showJumpButton: true // 显示跳转按钮
      }, // 分页
      selectedData: {}, // 单选选择的那条数据
      form: {
        guarantee_name: "",
        certificate_type_code: "",
        contact_num: "",
        house_area_num: ""
      },
      for_: [] // 渲染数据列表
    };
  },
  mounted() {
    // 提前还款-预约引入接口
    // this.prepaymentImport();
  },
  watch: {
      cert_no(newData, oldData) {
          console.log(newData, oldData);
          if (newData.length > 18) {
              this.cert_no = oldData;
          }
      }
  },
  methods: {
      // 验证
     certNoChange(value, reg, massage) {
          if (!reg.test(this[value])) {
              this[value] = '';
              this.$message(massage);
          }
    },
    // 提前还款-预约引入接口
    prepaymentImport(res, current) {
        res = res || {};
        current = current || 1;
        let url = counterDealApi.prepaymentImport + "?current=" + current + "&size=10";
        console.log('url:', url, 'data:', res);
        this.$MyFetch.post(url, res)
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
        .catch((err) => {
            console.log(err);
            this.$error(err.message);
        });
    },
    jump(pageNum) { // 分页
        console.log(pageNum, '选中');
        // 当前页
        this.pageConfig.currentPage = pageNum;
        console.log(this.searchData);
        this.prepaymentImport(this.searchData, pageNum);
    },
    clickSelectAll(selection, row) {
      if (selection.length > 0) {
        selection.splice(1, selection.length);
      }
      console.log("12", selection);
      // 单选选中的数据
      this.selectedData = selection[0];
      console.log("点击all，selecteddata", this.selectedData);
    },
    select(selection, row) {
      if (selection.length === 0) {
                this.selectedData = '';
            } else if (selection.length === 1) {
                this.selectedData = row;
            } else {
                selection.shift();
                this.rowCheck(row);
            }
    },
    rowCheck(row, column, e) {
      console.log(row);
      if (!this.selectedData) {
        this.$refs.multipleTable.toggleRowSelection(row);
        this.selectedData = row;
      } else if (this.selectedData && row.loan_no === this.selectedData.loan_no) {
        this.$refs.multipleTable.clearSelection();
        this.selectedData = '';
      } else {
        this.$refs.multipleTable.clearSelection();
        this.$refs.multipleTable.toggleRowSelection(row);
        this.selectedData = row;
      }
    },
    // 清空按钮
    empty() {
      this.loan_no = '';
      this.line_id = '';
      this.cert_no = '';
      this.customer_name = '';
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
      console.log('查询', this.searchData);
      this.prepaymentImport(this.searchData);
      } else {
         this.$message('请输入查询条件');
      }
    },
    // 查询为空判断
    searchNone() {
      if (this.loan_no !== '') {
        return true;
      } else if (this.line_id !== '') {
        return true;
      } else if (this.cert_no !== '') {
        return true;
      } else if (this.customer_name !== '') {
        return true;
      } else {
        return false;
      }
    },
    // 关闭弹窗
    close() {
      this.$emit("clsoe_windowAlert2");
    },
    // 保存
    finish() {
      console.log(this.selectedData.loan_no);
      this.$emit("trialData", this.selectedData.loan_no);
      this.$emit("clsoe_windowAlert2");
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
        this.$refs[selectRef].style.display = "none";
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
            this.$refs[selectRef].style.display = "none";
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
    pagination // 分页
  }
};
</script>
