<template>
  <div>
    <div class="content">
      <!-- 输入框和下拉框 -->
      <div class="b_content">
        <!-- 批次号 -->
        <div class="demo-ruleForms">
            <input class="select_72" @change="certNoChange('batchNo', /^[A-Z0-9]*$/g, '只允许输入大写字母和数字')" v-model="batchNo" placeholder="批次号" @focus="open_select('icoToBottom1', 'icoToTop1', 'batchNoRef', 'ico_flag1', 'batchNo')" @blur="blur_select('icoToBottom1', 'icoToTop1', 'batchNoRef', 'ico_flag1', 'batchNo')" ref="batchNoInput" />
            <span :class="{'select_af':true , 'select_toTop': icoToTop1, 'select_toBottom': icoToBottom1}" ref="select_type_btn"></span>
            <div class="select_option" ref="batchNoRef">
                <div class="opton_item" @click="selected_fun('eq', 'batchNo', 'batchNoRef', 'ico_flag1', 'icoToBottom1', 'icoToTop1')">
                <span>等于"{{batchNo}}"</span>
                </div>
                <div class="opton_item" @click="selected_fun('likeRight', 'batchNo', 'batchNoRef', 'ico_flag1', 'icoToBottom1', 'icoToTop1')">
                <span>以"{{batchNo}}"开头</span>
                </div>
                <div class="opton_item" @click="selected_fun('like', 'batchNo', 'batchNoRef', 'ico_flag1', 'icoToBottom1', 'icoToTop1')">
                <span>包含"{{batchNo}}"</span>
                </div>
            </div>
        </div>
        <!-- 申请人 -->
        <div class="demo-ruleForms">
            <input class="select_72" @change="certNoChange('operateId', /^[a-zA-Z0-9]{0,15}$/g, '[a-zA-Z0-9]，最多输入15个字符')" v-model="operateId" placeholder="申请人" @focus="open_select('icoToBottom2', 'icoToTop2', 'operateIdRef', 'ico_flag2', 'operateId')" @blur="blur_select('icoToBottom1', 'icoToTop2', 'operateIdRef', 'ico_flag2', 'operateId')"/>
            <span :class="{'select_af':true , 'select_toTop': icoToTop2, 'select_toBottom': icoToBottom2}" ref="select_type_btn"></span>
            <div class="select_option" ref="operateIdRef">
                <div class="opton_item" @click="selected_fun('eq', 'operateId', 'operateIdRef', 'ico_flag2', 'icoToBottom2', 'icoToTop2')">
                <span>等于"{{operateId}}"</span>
                </div>
                <div class="opton_item" @click="selected_fun('likeRight', 'operateId', 'operateIdRef', 'ico_flag2', 'icoToBottom2', 'icoToTop2')">
                <span>以"{{operateId}}"开头</span>
                </div>
                <div class="opton_item" @click="selected_fun('like', 'operateId', 'operateIdRef', 'ico_flag2', 'icoToBottom2', 'icoToTop2')">
                <span>包含"{{operateId}}"</span>
                </div>
            </div>
        </div>
        <el-date-picker
            v-model="applicationDate"
            class="repayDateCss"
            type="daterange"
            align="right"
            range-separator="至"
            start-placeholder="申请日期"
            end-placeholder="申请日期">
        </el-date-picker>
        <el-button class="b_button query button" @click="refer">查询</el-button>
        <el-button class="b_button empty button" @click="empty">清空</el-button>
      </div>
      <!-- 带全选的表格 -->
        <div class="table_box">
            <el-table
            :default-sort = "{prop: 'date', order: 'descending'}"
            :header-cell-style="{'font-size':'12px','text-align':'center','height':'38.9px','background':'#ececec'}"
            ref="multipleTable"
            :data="for_"
            tooltip-effect="dark"
            style="width: 100%; border: 1px solid #E9E9E9;"
            @select-all="clickSelectAll"
            @select="select"
            @row-click="rowCheck">
            <el-table-column
                type="selection">
            </el-table-column>
            <el-table-column
                prop="batchNo"
                width="180"
                label="批次号">
            </el-table-column>
            <el-table-column
                prop="fileName"
                width="200"
                label="文件名称">
                <template slot-scope="scope">
                    <el-popover trigger="hover" placement="top" v-if="scope.row.fileName">
                        <p class="ellipsis">
                            {{scope.row.fileName}}
                        </p>
                        <div slot="reference">
                            <p class="yincan ellipsis">
                            {{scope.row.fileName}}
                            </p>
                        </div>
                    </el-popover>
                </template>
            </el-table-column>
            <el-table-column
                prop="applyBy"
                width="180"
                label="申请人">
            </el-table-column>
            <el-table-column
                prop="applyTime"
                width="180"
                label="申请时间">
            </el-table-column>
            <el-table-column
                prop="phaseName"
                label="当前阶段">
            </el-table-column>
            <el-table-column
                label="操作" fixed="right">
                <template slot-scope="scope">
                    <el-button  type="text" size="small" @click="detail_alert(scope.row)">明细</el-button>
                </template>
            </el-table-column>
            </el-table>
        </div>
      <!-- 分页 -->
      <pagination @jump-page="jump" :page="pageConfig" class="pagination"></pagination>
      <!-- 明细 -->
        <sponsorDetail v-if="alert_detail" @clsoe_windowDetail='close_2' :tetail_data = "tetail_data"></sponsorDetail>
      <!-- 文字提示组件 -->
    <fontHint v-if="fontHintFlag" :massage="fontHintMsg" @close="fontHintClose"></fontHint>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import pagination from "@components/pagination"; // 分页组件
import sponsorDetail from "../accomplish/sponsor-detail/"; // 发起-明细
import { counterDealApi } from "@/system/adjust-accounts/counter-deal/js/server"; // 接口
import fontHint from "@/system/adjust-accounts/counter-deal/components/font-hint"; // 文字提示组件
export default {
  data() {
    return {
      deleteSubmitData: null,
      alert_detail: false, // 明细
      tetail_data: '123', // 传给明细的数据
      fontHintFlag: false, // 文字提示开关
      fontHintMsg: '', // 文字提示内容
      batchNo: "", // 批次号
      operateId: "", // 操作人
      applicationDate: '',
       // 批次号图标方向
      icoToTop1: false,
      icoToBottom1: false,
      ico_flag1: true,
      // 申请人图标方向
      icoToTop2: false,
      icoToBottom2: false,
      ico_flag2: true,
      // 查询数据
      searchData: {
        "flowNo": "batchPrepaymentFlow",
        "phaseNo": ["0030"],
        "eq": {},
        "likeRight": {},
        "like": {}
      },
      pageConfig: {
        account: 0, // 总条数
        pageSize: 10, // 当前多少条数据
        currentPage: 1, // 当前页
        showJumpButton: true // 显示跳转按钮
      }, // 分页
      for_: [], // 渲染列表
      transSerialNos: [], // 删除接口参数
      alert_: false // 新增单笔还款
    };
  },
  mounted() {
      this.batchPrepaymentTransRepayment();
  },
  methods: {
    // 毫秒数转成时间数组
    date_filter(list) {
        list = list || [];
        let array = [];
        list.forEach((element, index) => {
            var year = element.getFullYear();
            var month = element.getMonth() + 1;
                month = month < 10 ? ('0' + month) : month;
            var day = element.getDate();
                day = day < 10 ? ('0' + day) : day;
            var hour = element.getHours();
                hour = hour < 10 ? ('0' + hour) : hour;
            var minute = element.getMinutes();
                minute = minute < 10 ? ('0' + minute) : minute;
            var second = element.getSeconds();
                second = second < 10 ? ('0' + second) : second;
            let dates = year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second;
            array.push(dates);
        });
        return array;
    },
    // 点击明细
    detail_alert(res) {
        this.tetail_data = res;
        this.alert_detail = true;
    },
    // 关闭明细
    close_2() {
        this.alert_detail = false;
    },
    // 关闭文字提示组件
    fontHintClose() {
      this.fontHintFlag = false;
    },
    // 查询按钮
    refer() {
        this.reload();
    },
    // 清空按钮
    empty() {
        this.batchNo = '';
        this.operateId = '';
        this.applicationDate = '';
        this.searchData = {
            "flowNo": "batchPrepaymentFlow",
            "phaseNo": ["0030"],
            "eq": {},
            "likeRight": {},
            "like": {}
        };
    },
    // reload
    reload(pageNum) {
        let queryData = this.searchData;
        // 加上时间
        queryData.operateStart = this.date_filter(this.applicationDate)[0];
        queryData.operateEnd = this.date_filter(this.applicationDate)[1];
        let current = pageNum || 1;
        this.deleteSubmitData = null;
        this.batchPrepaymentTransRepayment(queryData, current);
    },
    // 代偿申请查询列表接口
    batchPrepaymentTransRepayment(res, current) {
        res = res || {
            "flowNo": "batchPrepaymentFlow",
            "phaseNo": ["0030"]
        };
        current = current || 1;
        let url = counterDealApi.batchPrepaymentTransRepayment + "?current=" + current + "&size=10";
        this.$MyFetch.post(url, res)
        .then((data = {}) => {
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
    // 分页
    jump(pageNum) {
      this.pageConfig.currentPage = pageNum;
      this.reload(pageNum);
    },
    clickSelectAll(selection, row) {
        if (selection.length > 0) {
            selection.splice(1, selection.length);
        }
        // 单选选中的数据
        this.deleteSubmitData = selection[0];
    },
    select(selection, row) {
      if (selection.length === 0) {
                this.deleteSubmitData = null;
            } else if (selection.length === 1) {
                this.deleteSubmitData = row;
            } else {
                selection.shift();
                this.rowCheck(row);
            }
    },
    rowCheck(row, column, e) {
      if (!this.deleteSubmitData) {
        this.$refs.multipleTable.toggleRowSelection(row);
        this.deleteSubmitData = row;
      } else if (this.deleteSubmitData && row.batchNo === this.deleteSubmitData.batchNo) {
        this.$refs.multipleTable.clearSelection();
        this.deleteSubmitData = null;
      } else {
        this.$refs.multipleTable.clearSelection();
        this.$refs.multipleTable.toggleRowSelection(row);
        this.deleteSubmitData = row;
      }
    },
    // 关闭新增组件
    close_1() {
    this.alert_ = false;
    },
    // 验证
    certNoChange(value, reg, massage) {
          if (!reg.test(this[value])) {
              this[value] = '';
              this.$message(massage);
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
    //  --查询框方法结束
  },
  components: {
    pagination, // 分页组件
    sponsorDetail, // 明细
    fontHint // 文字提示组件
  },
  created() {}
};
</script>
<style lang="less" scoped>
// 去掉element表格的默认全选按钮
/deep/ th .el-checkbox {
      display: none;
}
</style>
