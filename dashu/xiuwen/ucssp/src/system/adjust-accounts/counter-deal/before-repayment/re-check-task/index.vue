<template>
    <div class="content">
      <!-- 标题 -->
      <div class="content_top">
        <span>待复核任务</span>
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
            <el-button class="b_button query button" @click="refer(1)">查询</el-button>
            <el-button class="b_button empty button" @click="empty()">清空</el-button>
        </div>
        <!-- 带全选的表格 -->
        <div class="table_box">
            <el-table
            :default-sort = "{prop: 'date', order: 'descending'}"
            :header-cell-style="{'font-size':'12px','text-align':'center','height':'38.9px','background':'#ececec'}"
            ref="multipleTable"
            :data="for_"
            max-height="560"
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
                label="交易号">
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
                label="总计应还金额">
            </el-table-column>
            <el-table-column
                prop="totReduct"
                label="总计减免金额">
            </el-table-column>
            <el-table-column
                prop="estimated_payoff_date"
                width="200"
                label="提前结清日期">
                <template  slot-scope="scope">
                    <div>{{scope.row.estimated_payoff_date | date_filters}}</div>
                </template>
            </el-table-column>
            <el-table-column
                width="208px"
                fixed="right"
                label="操作">
                <template slot-scope="scope">
                    <el-button  type="text" @click="back_fun(scope.row)">退回</el-button>
                    <el-button  type="text" @click="$showImage(scope.row.apply_no, '待复核任务', {ReadOnly: '0', selectProductId: scope.row.productId})">查看影像</el-button>
                    <el-button  type="text" @click="detail_alert(scope.row)">详情</el-button>
                </template>
            </el-table-column>
            </el-table>
        </div>
        <!-- 分页 -->
        <div class="page_box">
            <!-- 分页条 -->
            <pagination @jump-page='jump' :page='pageConfig' class="pagination"></pagination>
        </div>
        <!-- 详情 -->
        <reCheckDetail v-if="alert_detail" @clsoe_windowDetail='close_2' :tetailData="tetail_data" @reload="prepaymentList"></reCheckDetail>
        <!-- 删除和提交 -->
        <div class="tally_submit">
            <div>
                <el-button class="t_button tally_t button" @click="tally_fun">记账</el-button>
            </div>
        </div>
        <!-- 提示窗 == 退回 -->
        <div class="hint" v-if="back_hint">
            <div class="import-message">
                <div class="dialog-mask"></div>
                <div class="dialog-box dialog-box-back">
                    <div class="dialog-box__top">
                        <h5 class="title_type">退回</h5>
                        <span class="el-icon-close button button__close" @click="back_close"></span>
                    </div>
                    <div class="back_hint_con">
                        <div class="charge_hint">
                            <span>出账编号: &nbsp;</span>
                            <i>{{ back_data.loan_no }}</i>
                        </div>
                        <div class="back_cause">
                            <div class="back_cause_top"><span>退回原因:</span></div>
                            <div class="back_cause_con">
                                <textarea name="" id="" placeholder="请输入" ref="backCause"></textarea>
                            </div>
                            <div class="back_cause_bom"><span>{{ back_cause }}</span></div>
                        </div>
                    </div>
                     <div class="affirm_select">
                        <el-button class="t_button back_t button" @click="affirm_back_fun">确认</el-button>
                    </div>
                </div>
            </div>
        </div>
        <!--记账 再次确认组件 -->
        <reconfirmHint v-if="tally_hint" massage="是否对选中的申请进行记账？" @close="tally_close" @backFun="affirm_tally_fun"></reconfirmHint>
        <!-- 提示窗 == 发送邮件 -->
         <div class="hint" v-if="email_flag">
            <div class="import-message">
                <div class="dialog-mask" style=" z-index: 1111;"></div>
                <div class="dialog-box" v-loading='loading' style="width: 456px; height: 285px; z-index: 1111;">
                    <div class="dialog-msgbox__top dialog-msgbox__top2">
                        <span class="dialog-font2">发送邮件</span>
                        <span class="el-icon-close button button__close" @click="email_close"></span>
                    </div>
                    <el-form :model="writeInfo" :rules="rules" ref="writeInfo">
                        <div class="email_info">
                        <div class="email_item">
                            <span class="item_left">收件人</span>
                            <!-- <input type="text" class="text" v-model="writeInfo.toAddress"> -->
                            <el-form-item prop="toAddress">
                                <el-input v-model="writeInfo.toAddress"></el-input>
                            </el-form-item>
                        </div>
                        <div class="email_item">
                            <span class="item_left">抄送至</span>
                            <!-- <input type="text" class="text" v-model="toCarBonCopy"> -->
                                <el-form-item prop="toCarBonCopy">
                                    <el-input v-model="writeInfo.toCarBonCopy"></el-input>
                                </el-form-item>
                        </div>
                        </div>
                    </el-form>
                    <div class="email_affirm">
                        <el-button class="t_button t_email button" @click="emailFinish">确认</el-button>
                    </div>
                </div>
            </div>
        </div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
import "@system/adjust-accounts/counter-deal/css/myQuerySelect.less";
import "@common/css/dialog";
import pagination from "@components/pagination"; // 分页条
import reCheckDetail from "./re-check-detail/"; // 发起-详情
import { counterDealApi } from "@/system/adjust-accounts/counter-deal/js/server"; // 接口
import reportValidator from "@/system/adjust-accounts/counter-deal/js/reportRules"; // 验证
import reconfirmHint from "@/system/adjust-accounts/counter-deal/components/reconfirm-hint"; // 再次确认组件
export default {
  data() {
    return {
      email_flag: false, // e-mail开关
        loading: false,
        writeInfo: {
            toCarBonCopy: '', // 收件人
            toAddress: '' // 发送人
        },
        rules: {
           toCarBonCopy: [
               { trigger: 'blur', validator: reportValidator.emailRuls }
           ],
           toAddress: [
               { required: true, trigger: 'blur', message: '请填写' },
               { trigger: 'blur', validator: reportValidator.emailRuls }
           ]
        },
       // 退回原因
       back_cause: "",
       // 退回参数
       back_data: "",
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
        "phase_no": ["0030"],
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
      acctData: [], // 记账接口参数
      pageConfig: {
        account: 5, // 总条数
        pageSize: 5, // 当前多少条数据
        currentPage: 1, // 当前页
        showJumpButton: true // 显示跳转按钮
      }, // 分页
      alert_detail: false, // 详情
      tetail_data: {}, // 传给详情的数据
      back_hint: false, // 退回开关
      tally_hint: false // 记账开关
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
                let D = change(date.getDate()) + ' ';
                return Y + M + D;
            } else {
                return "---";
            }
        }
    },
  mounted() {
      this.prepaymentList();
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
      // 关闭邮件提示
      email_close() {
        this.email_flag = false;
        this.file = "";
        this.fileName = "";
        this.fileId = '';
    },
    // 邮件保存按钮
    emailFinish() {
        let _that = this;
        this.$refs.writeInfo.validate((valid) => {
            if (valid) {
                // 调用退回接口
                let rollbackData = {
                    phaseNo: '0030',
                    flowNo: "repaymentFlow",
                    trans_serial_no: this.back_data.trans_serial_no,
                    reasion: this.$refs.backCause.value
                };
                this.rollback(rollbackData)
                .then((data) => {
                    this.prepaymentListReload();
                    // 发送邮件
                    let queryData = {
                        // attachFilesName: _that.fileName,
                        // attachFiles: _that.fileId,
                        loanNo: _that.back_data.loan_no,
                        emailType: 'BACK', // 邮件流程
                        toAddress: _that.writeInfo.toAddress, // 发件人
                        toCarBonCopy: _that.writeInfo.toCarBonCopy // 收件人
                    };
                    this.prepaymentSendEMail(queryData)
                    .then((data) => {
                        // _that.reload();
                        _that.$message(data.message);
                        _that.email_close();
                        _that.back_close();
                    })
                    .catch((err) => {
                        _that.$message.error(err);
                        _that.email_close();
                        _that.back_close();
                    });
                })
                .catch((err) => {
                    this.$error(err);
                    this.email_close();
                });
            }
        });
    },
    // 验证
    certNoChange(value, reg, massage) {
          if (!reg.test(this[value])) {
              this[value] = '';
              this.$message(massage);
          }
    },
    // 发送邮件
    prepaymentSendEMail(res) {
        return new Promise((resolve, reject) => {
            this.$MyFetch.post(counterDealApi.prepaymentSendEMail, res)
                .then((data = {}) => {
                    resolve(data);
                })
                .catch((err) => {
                    console.log(err);
                    this.$error(err.message);
                    reject(err);
                });
        });
    },
    // 提前还款-查询接口
    prepaymentList(res, current) {
        res = res || {
            "flow_no": "repaymentFlow",
            "phase_no": ["0030"]
        };
        current = current || 1;
        let url = counterDealApi.prepaymentList + "?current=" + current + "&size=10";
        console.log(url, 'url');
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
    // 查询刷新函数
    prepaymentListReload() {
        let data = this.searchData;
        let current = this.pageConfig.currentPage;
        this.prepaymentList(data, current);
    },
    // 提前还款-退回接口
    rollback(res) {
        return new Promise((resolve, reject) => {
            this.$MyFetch.post(counterDealApi.rollback, res)
            .then((data = {}) => {
                resolve(data);
            })
            .catch((err) => {
                reject(err.message);
            });
        });
    },
    // 提前还款-记账接口
    reviewAcct(res) {
        return new Promise((resolve, reject) => {
            this.$MyFetch.post(counterDealApi.reviewAcct, res)
            .then((data = {}) => {
                resolve(data);
            })
            .catch((err) => {
                reject(err.message);
            });
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
    //  --查询框方法结束
    // 关闭退回提示窗口
    back_close() {
        this.back_hint = false;
    },
    // 确认提退回窗口
    affirm_back_fun() {
        // 验证不能为空
        if (this.$refs.backCause.value === "") {
            this.back_cause = "“退回原因”不能为空，数据保存不成功！";
        } else {
            this.back_cause = "";
            // this.$message("提前还款申请审核不通过,请发送邮件通知！");
            // this.email_flag = true;
            // 调用退回接口
            let data = {
                phaseNo: '0030',
                flowNo: "repaymentFlow",
                trans_serial_no: this.back_data.trans_serial_no,
                reasion: this.$refs.backCause.value
            };
            this.rollback(data)
            .then((data) => {
                this.prepaymentListReload();
            })
             .catch((err) => {
                 this.$error(err);
            });
            // 关闭退回弹窗
           this.back_hint = false;
        }
    },
    // 关闭记账提示窗口
    tally_close() {
        this.tally_hint = false;
    },
    // 确认记账窗口
    affirm_tally_fun() {
        let _that = this;
        this.tally_hint = false;
        // 记账
        let reviewAcctData = {
            trans_serial_no: _that.acctData
        };
        _that.reviewAcct(reviewAcctData)
        .then((data) => {
            _that.prepaymentListReload();
        })
        .catch((err) => {
            _that.$error(err);
        });
    },
    // 详情
    detail_alert(rowData) {
        console.log(rowData, '详情');
        this.tetail_data = rowData;
        this.alert_detail = true;
    },
    look_video(data) {
        console.log("影像查询", data);
    },
    // 子页面关闭详情函数
    close_2() {
        this.alert_detail = false;
    },
    // 关闭新增组件
    close_1() {
    this.alert_ = false;
    },
    // 选择框选中
    handleSelectionChange (data) {
        // 清空表格选中的提交删除接口参数
        this.acctData = [];
        data.forEach(element => {
            // 获取选中的交易号,并push到记账的参数列表去;
            this.acctData.push(element.trans_serial_no);
        });
        console.log(data, this.acctData);
    },
    rowCheck(row, column, e) {
      this.$refs.multipleTable.toggleRowSelection(row);
    },
    // 查询
    refer() {
      // 加上身份证
    //   this.searchData.eq.cert_no = this.cert_no;
      this.prepaymentList(this.searchData);
    },
    // 清空
    empty() {
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
        "phase_no": ["0030"],
        "eq": {},
        "likeRight": {},
        "like": {}
      };
    },
    // 记账
    tally_fun() {
        console.log("记账");
        if (!this.acctData[0]) {
            this.$message('请至少选择一条数据记账');
        } else {
            this.tally_hint = true;
        }
    },
    // 退回
    back_fun(rowData) {
        this.back_data = rowData;
        this.back_hint = true;
    },
    jump(pageNum) { // 分页
        console.log(pageNum);
        this.prepaymentList(this.searchData, pageNum);
    }
  },
  components: {
    reCheckDetail, // 详情
    reconfirmHint,
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
    .sponsor {
        width: 100%;
        // height: 100%;
        // padding-top: 20px;
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
        height: 560px;
        margin-top: 21px;
        overflow: auto;
    }
    // page_box 分页
    .page_box {
        width: 100%;
        margin-top: 30px;
    }
    // 删除和提交按钮
    .tally_submit {
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
        .tally_t {
            background: #538bf1;
            font-size: 14px;
            color: #ffffff;
            letter-spacing: 1.07px;
            text-align: center;
        }
    }
}
</style>
