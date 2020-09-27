<template>
    <div class="content">
      <!-- 标题 -->
      <div class="content_top">
        <span>退回任务</span>
      </div>
      <!-- 中间部分 -->
      <div class="sponsor">
        <!-- 查询这一行 -->
        <div class="serach_row">
            <!-- 出账编号 -->
            <div class="demo-ruleForms">
                <input class="select_72" @change="certNoChange('loan_no', /^[A-Z0-9]*$/g, '只允许输入大写字母和数字')" v-model="loan_no" placeholder="出账编号" @focus="open_select('icoToBottom1', 'icoToTop1', 'loan_noRef', 'ico_flag1', 'loan_no')" @blur="blur_select('icoToBottom1', 'icoToTop1', 'loan_noRef', 'ico_flag1', 'loan_no')" ref="loan_noInput" />
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
            <!-- 客户姓名 -->
            <div class="demo-ruleForms">
                <input class="select_72" @change="certNoChange('customer_name', /^[(\u4E00-\u9FA5\uf900-\ufa2d)||·]{0,15}$/g, '只允许输入汉字和“.“，最多输入15个字符')" v-model="customer_name" placeholder="客户姓名" @focus="open_select('icoToBottom2', 'icoToTop2', 'customer_nameRef', 'ico_flag2', 'customer_name')" @blur="blur_select('icoToBottom1', 'icoToTop2', 'customer_nameRef', 'ico_flag2', 'customer_name')"/>
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
            <!-- 放款机构 -->
            <div class="demo-ruleForms">
                <input class="select_72" @change="certNoChange('line_id', /^[(\u4E00-\u9FA5\uf900-\ufa2d)|-]{0,15}$/g, '只允许输入汉字，最多输入15个字符')" v-model="line_id" placeholder="放款机构" @focus="open_select('icoToBottom3', 'icoToTop3', 'line_idRef', 'ico_flag3', 'line_id')" @blur="blur_select('icoToBottom3', 'icoToTop3', 'line_idRef', 'ico_flag3', 'line_id')"/>
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
               <input class="select_72" v-model="cert_no" placeholder="身份证号" @focus="open_select('icoToBottom4', 'icoToTop4', 'cert_noRef', 'ico_flag4', 'cert_no')" @blur="blur_select('icoToBottom4', 'icoToTop4', 'cert_noRef', 'ico_flag4', 'cert_no')"/>
                <span :class="{'select_af':true , 'select_toTop': icoToTop4, 'select_toBottom': icoToBottom4}" ref="select_type_btn"></span>
                <div class="select_option" ref="cert_noRef">
                    <div class="opton_item" @click="selected_fun('eq', 'cert_no', 'cert_noRef', 'ico_flag4', 'icoToBottom4', 'icoToTop4')">
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
            <!-- <el-input class="select_72" v-model="chargeNum" placeholder="出账编号"></el-input>
            <el-input class="select_72" v-model="userName" placeholder="客户姓名"></el-input>
            <el-input class="select_72" v-model="loanOrganization" placeholder="放款机构"></el-input>
            <el-input class="select_72" v-model="cardNum" placeholder="身份证号"></el-input> -->
            <el-button class="b_button query button" @click="refer(1)">查询</el-button>
            <el-button class="b_button empty button" @click="empty()">清空</el-button>
        </div>
        <!-- 带全选的表格 -->
        <div class="table_box">
            <el-table
            :default-sort = "{prop: 'date', order: 'descending'}"
            :header-cell-style="{'font-size':'12px','text-align':'center','height':'38.9px','background':'#F9FAFB'}"
            ref="multipleTable"
            max-height="580"
            :data="for_"
            tooltip-effect="dark"
            style="width: 100%; border: 1px solid #E9E9E9;"
            @selection-change="handleSelectionChange"
            @row-click="rowCheck">
            <el-table-column
                type="selection">
            </el-table-column>
            <el-table-column
                prop="trans_serial_no"
                width="180"
                label="单据号">
            </el-table-column>
            <el-table-column
                prop="loan_no"
                width="180"
                label="出账编号">
            </el-table-column>
            <el-table-column
            prop="customer_name"
                width="100"
            label="客户姓名">
            </el-table-column>
            <el-table-column
                prop="collaborate"
                width="200"
                label="合作模式">
                <template slot-scope="scope">
                    <el-popover trigger="hover" placement="top" v-if="scope.row.collaborate">
                        <p class="ellipsis">
                            {{scope.row.collaborate}}
                        </p>
                        <div slot="reference">
                            <p class="yincan ellipsis">
                            {{scope.row.collaborate}}
                            </p>
                        </div>
                    </el-popover>
                </template>
            </el-table-column>
            <el-table-column
                prop="cert_no"
                width="180"
                label="身份证号码">
                <template  slot-scope="scope">
                    <div>{{scope.row.cert_no | certificateNum}}</div>
                </template>
            </el-table-column>
            <el-table-column
                prop="line_id"
                width="200"
                label="放款机构">
                <template slot-scope="scope">
                    <el-popover trigger="hover" placement="top" v-if="scope.row.line_id">
                        <p class="ellipsis">
                            {{scope.row.line_id}}
                        </p>
                        <div slot="reference">
                            <p class="yincan ellipsis">
                            {{scope.row.line_id}}
                            </p>
                        </div>
                    </el-popover>
                </template>
            </el-table-column>
            <el-table-column
                prop="business_sum"
                width="100"
                label="总计应还金额">
            </el-table-column>
            <el-table-column
                prop="totReduct"
                width="100"
                label="总计减免金额">
            </el-table-column>
            <el-table-column
                prop="estimated_payoff_date"
                width="110"
                label="提前还款日期">
                <template  slot-scope="scope">
                    <div>{{scope.row.estimated_payoff_date | date_filters}}</div>
                </template>
            </el-table-column>
            <el-table-column
                prop="h"
                width="228px"
                fixed="right"
                label="操作">
                <template slot-scope="scope">
                    <el-button  type="text" @click="back_fun(scope.row)">退回原因</el-button>
                    <el-button  type="text" @click="$showImage(scope.row.apply_no, '退回任务', {selectProductId: scope.row.productId})">上传影像</el-button>
                    <!-- <el-button  type="text" @click="submit_fun(scope.row)">提交</el-button> -->
                </template>
            </el-table-column>
            </el-table>
        </div>
      </div>
        <!-- 分页 -->
        <div class="page_box">
            <!-- 分页条 -->
            <pagination @jump-page='jump' :page='pageConfig' class="pagination"></pagination>
        </div>
        <!-- 删除和提交 -->
        <div class="delete_submit">
            <div>
                <el-button class="t_button initiate_t button" @click="submit_fun()">提交</el-button>
            </div>
        </div>
         <!-- 提示窗 == 提交 -->
        <div class="hint" v-if="submit_hint">
            <div class="import-message">
                <div class="dialog-mask"></div>
                <div class="dialog-box">
                    <div class="dialog-msgbox__top">
                    <span class="el-icon-close button button__close" @click="sumit_close"></span>
                    </div>
                    <div class="text-center">是否提交选中的申请？</div>
                     <div class="affirm_select">
                        <el-button class="t_button cancel_t button" @click="cancel_submit_fn">取消</el-button>
                        <el-button class="t_button affirm_t button" @click="affirm_submit_fun">确认</el-button>
                    </div>
                </div>
            </div>
        </div>
        <!-- 提示窗 == 退回原因 -->
        <div class="hint" v-if="back_hint">
            <div class="import-message">
                <div class="dialog-mask"></div>
                <div class="dialog-box" style="width: 600px; height: auto;">
                    <div class="dialog-msgbox__top dialog-msgbox__top2">
                        <span class="dialog-font2">退回原因</span>
                        <span class="el-icon-close button button__close" @click="back_close"></span>
                    </div>
                    <div class="back_info">
                        <span class="backInfo_item">
                            <b class="backInfo_title">出账编号:&nbsp;&nbsp;</b><i class="backInfo_data">{{ backInfo.loan_no }}</i>
                        </span>
                        <span class="backInfo_item">
                            <b class="backInfo_title">客户姓名:&nbsp;&nbsp;</b><i class="backInfo_data">{{ backInfo.customer_name }}</i>
                        </span>
                        <span class="backInfo_item" style="margin-top: 20px;">
                            <b class="backInfo_title">操作时间:&nbsp;&nbsp;</b><i class="backInfo_data">{{ backInfo.updated_date | date_filters }}</i>
                        </span>
                        <span class="backInfo_item" style="margin-top: 20px;">
                            <b class="backInfo_title">退回原因:&nbsp;&nbsp;</b><i class="backInfo_data">{{ backInfo.phase_opinion }}</i>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
import pagination from "@components/pagination"; // 分页条
import "@common/css/dialog";
import "@system/adjust-accounts/counter-deal/css/myQuerySelect.less";
  import { counterDealApi } from "@/system/adjust-accounts/counter-deal/js/server"; // 接口
export default {
  data() {
    return {
      // 提交提示窗显示开关
      submit_hint: false,
      // 提交接口参数
      submitData: [],
      // 退回提示窗显示开关
      back_hint: false,
      // 退回信息
      backInfo: {},
      // 出账编号
      loan_no: '',
      // 客户姓名
      customer_name: '',
      // 放款机构
      line_id: '',
      // 身份证号
      cert_no: '',
      // 查询数据
      searchData: {
        "flow_no": "repaymentFlow",
        "phase_no": ["0050"],
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
        pageSize: 2, // 当前多少条数据
        currentPage: 1, // 当前页
        showJumpButton: true // 显示跳转按钮
      } // 分页
    };
  },
  filters: {
     // 日期转换
    date_filters(data) {
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
            let D = change(date.getDate());
            return Y + M + D;
        } else {
            return "---";
        }
    }
  },
  mounted() {
      this.prepaymentList();
  },
  computed: {
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
    // 提前还款-退回查询接口
    prepaymentList(res, current) {
        res = res || {
            "flow_no": "repaymentFlow",
            "phase_no": ["0050"]
        };
        current = current || 1;
        let url = counterDealApi.prepaymentList + "?current=" + current + "&size=10";
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
            this.$error(err.message);
        });
    },
    // 提前还款-提交接口
    submitPrepayment(res) {
        return new Promise((resolve, reject) => {
            this.$MyFetch.post(counterDealApi.submitPrepayment, res)
            .then((data = {}) => {
                resolve(data);
            })
            .catch((err) => {
                reject(err);
            });
        });
    },
    // 提前还款-退回原因接口
    rollbackReason(res) {
        this.$MyFetch.post(counterDealApi.rollbackReason, res)
        .then((data = {}) => {
            this.backInfo = data;
        })
        .catch((err) => {
            console.log(err);
            this.$error(err.message);
        });
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
    },
    // --查询框方法结束
    // 上传影像
    upload_image_fun() {
        console.log("上传影像");
    },
    // 提交
    submit_fun() {
        if (this.submitData.length < 1) {
            this.$message("请选择一条数据！");
        } else {
            this.submit_hint = true;
        }
    },
    // 关闭提交提示窗口
    sumit_close() {
        this.submit_hint = false;
    },
    // 取消提交窗口
    cancel_submit_fn() {
        this.submit_hint = false;
    },
    // 确认提交窗口
    affirm_submit_fun() {
        let _this = this;
        this.submit_hint = false;
        let queryData = {
            "flowNo": "repaymentFlow",
            "objectNoList": _this.submitData
        };
        _this.submitPrepayment(queryData)
        .then((data) => {
            _this.prepaymentList(_this.searchData, _this.pageConfig.currentPage);
        })
        .catch((err) => {
            _this.$error(err.message);
        });
    },
    // 退回原因
    back_fun(data) {
        console.log("提交", data);
        let res = {
            "trans_serial_no": data.trans_serial_no
        };
        this.rollbackReason(res);
        this.back_hint = true;
    },
    // 关闭退回原因提示窗口
    back_close() {
        this.back_hint = false;
    },
    // 选择框选中
    handleSelectionChange (data) {
       // 清空表格选中的提交删除接口参数
        this.submitData = [];
        data.forEach(element => {
            // 获取选中的交易号,并push到删除提交的参数列表去;
            this.submitData.push(element.trans_serial_no);
        });
    },
    rowCheck(row, column, e) {
      this.$refs.multipleTable.toggleRowSelection(row);
    },
    // 查询
    refer() {
        // 加上身份证
        // this.searchData.eq.cert_no = this.cert_no;
        this.prepaymentList(this.searchData);
    },
    // 清空
    empty() {
      console.log("清空");
      // 出账编号
      this.loan_no = '';
      // 客户姓名
      this.customer_name = '';
      // 放款机构
      this.line_id = '';
      // 身份证号
      this.cert_no = '';
      // 查询数据
      this.searchData = {
        "flow_no": "repaymentFlow",
        "phase_no": ["0050"],
        "eq": {},
        "likeRight": {},
        "like": {}
      };
    },
    jump(pageNum) { // 分页
        this.prepaymentList(this.searchData, pageNum);
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
//   overflow: hidden;
  padding: 0px 30px;
  position: relative;
  .content_top {
    width: 100%;
    height: 60px;
    border-bottom: 1px solid #E5E5E5;
    display: flex;
    align-items: center;
    position: relative;
    &::before {
      content: "";
      width: 2px;
      height: 16px;
      background: #538BF1;
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
    }
    // 查询这行的box
    .serach_row {
        margin-top: 20px;
        // 输入框和下拉框172*40
        .select_72 {
            width: 160px;
            height: 40px;
            margin-right: 15px;
            ::-webkit-input-placeholder { /* WebKit browsers */
                font-family: PingFangSC-Regular;
                font-size: 12px;
                color: #BBBBBB;
            }
            :-moz-placeholder { /* Mozilla Firefox 4 to 18 */
                font-size: 12px;
            }
            ::-moz-placeholder { /* Mozilla Firefox 19+ */
                font-size: 12px;
            }
            :-ms-input-placeholder { /* Internet Explorer 10+ */
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
        height: 580px;
        margin-top: 21px;
        overflow: auto;
    }
    // page_box 分页
    .page_box {
        width: 100%;
        margin-top: 20px;
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
