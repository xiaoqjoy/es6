<template>
    <div class="sponsor">
        <button class="add button" @click="add_alert()">+ 新增</button>
        <!-- 查询这一行 -->
        <div class="serach_row">
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
            <!-- 导入日期 -->
            <el-date-picker
                v-model="should_repay_date"
                class="repayDateCss"
                type="daterange"
                align="right"
                range-separator="至"
                start-placeholder="操作日期"
                end-placeholder="操作日期">
            </el-date-picker>
            <!-- 操作人 -->
            <div class="demo-ruleForms" style="margin-left: 20px;">
                <input class="select_72" v-model="loanTransCreated_by" placeholder="操作人" @focus="open_select('icoToBottom1', 'icoToTop1', 'operateOrgidSelectRef', 'ico_flag1', 'loanTransCreated_by')" @blur="blur_select('icoToBottom1', 'icoToTop1', 'operateOrgidSelectRef', 'ico_flag1', 'loanTransCreated_by')"/>
                <span :class="{'select_af':true , 'select_toTop': icoToTop1, 'select_toBottom': icoToBottom1}" ref="select_type_btn"></span>
                <div class="select_option" ref="operateOrgidSelectRef">
                    <div class="opton_item" @click="selected_fun('eq', 'loanTransCreated_by', 'operateOrgidSelectRef', 'ico_flag1', 'icoToBottom1', 'icoToTop1')">
                    <span>等于"{{loanTransCreated_by}}"</span>
                    </div>
                    <div class="opton_item" @click="selected_fun('likeRight', 'loanTransCreated_by', 'operateOrgidSelectRef', 'ico_flag1', 'icoToBottom1', 'icoToTop1')">
                    <span>以"{{loanTransCreated_by}}"开头</span>
                    </div>
                    <div class="opton_item" @click="selected_fun('like', 'loanTransCreated_by', 'operateOrgidSelectRef', 'ico_flag1', 'icoToBottom1', 'icoToTop1')">
                    <span>包含"{{loanTransCreated_by}}"</span>
                    </div>
                </div>
            </div>
            <el-button class="b_button query button" @click="refer">查询</el-button>
            <el-button class="b_button empty button" @click="empty()">清空</el-button>
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
                prop="input_amount"
                label="录入总金额">
            </el-table-column>
            <el-table-column
                prop="trans_amount"
                label="记账总金额">
            </el-table-column>
            <el-table-column
                prop="trans_channel"
                width="200"
                label="扣款渠道">
                <template slot-scope="scope">
                    <el-popover trigger="hover" placement="top" v-if="scope.row.trans_channel">
                        <p class="ellipsis">
                            {{scope.row.trans_channel}}
                        </p>
                        <div slot="reference">
                            <p class="yincan ellipsis">
                            {{scope.row.trans_channel}}
                            </p>
                        </div>
                    </el-popover>
                </template>
            </el-table-column>
            <el-table-column
                prop="phase_name"
                label="当前阶段">
            </el-table-column>
            <el-table-column
                prop="created_by"
                width="150"
                label="操作人">
            </el-table-column>
            <el-table-column
            width="180"
            prop="created_date"
            label="操作日期">
            <template  slot-scope="scope">
                <div>{{scope.row.created_date | date_filters}}</div>
            </template>
            </el-table-column>
            <el-table-column
                fixed="right"
                label="操作">
                <template slot-scope="scope">
                    <el-button  type="text" size="small" @click="detail_alert(scope.row)">明细</el-button>
                </template>
            </el-table-column>
            </el-table>
        </div>
        <!-- 分页 -->
        <div class="page_box">
            <!-- 分页条 -->
            <pagination @jump-page='jump' :page='pageConfig' class="pagination"></pagination>
        </div>
        <!-- 删除和提交 -->
        <div class="delete_submit">
            <div>
                <el-button class="t_button dead_t button" @click="delete_fun">删除</el-button>
                <el-button class="t_button initiate_t button" @click="submit_fun">提交</el-button>
            </div>
        </div>
        <!-- 新增单笔还款 -->
        <addPriorMatch v-if="alert_" @clsoe_windowAlert='close_1' @querySearch='querySearch'></addPriorMatch>
        <!-- 明细 -->
        <sponsorDetail v-if="alert_detail" @clsoe_windowDetail='close_2' :tetail_data = "tetail_data"></sponsorDetail>
    <!--提交 再次确认组件 -->
    <reconfirmHint v-if="submit_hint" massage="是否提交选中的申请？" @close="sumit_close" @backFun="affirm_submit_fun"></reconfirmHint>
    <!--删除 再次确认组件 -->
    <reconfirmHint v-if="delete_hint" massage="是否删除选中的申请？" @close="delete_close" @backFun="affirm_delete_fun"></reconfirmHint>
    </div>
</template>
<script type="text/ecmascript-6">
import addPriorMatch from "../sponsor/addPriorMatch/"; // 新增单笔还款
import sponsorDetail from "../sponsor/sponsor-detail/"; // 发起-明细
import pagination from "@components/pagination"; // 分页条
import "@system/adjust-accounts/counter-deal/css/myQuerySelect.less"; // 查询框样式
import { counterDealApi } from "../../../js/server"; // 接口
import reconfirmHint from "@/system/adjust-accounts/counter-deal/components/reconfirm-hint"; // 再次确认组件
export default {
    name: "single-sponsor",
    data() {
        return {
            loan_no: '', // 出账编号
            should_repay_date: '', // 申请日期
            loanTransCreated_by: '', // 操作人
            // 查询数据
            searchData: {
                "phase_no": "0010",
                "flow_no": "normalPayFlow",
                "eq": {},
                "likeRight": {},
                "like": {}
            },
            // 操作人图标方向
            icoToTop1: false,
            icoToBottom1: false,
            ico_flag1: true,
            // 出账编号图标方向
            icoToTop2: false,
            icoToBottom2: false,
            ico_flag2: true,
            for_: [], // 渲染数据列表
            deleteData: {
                "transSerialNos": []
            }, // 删除接口参数
            submitData: {
                "flowNo": "normalPayFlow",
                "objectNoList": []
            }, // 提交接口参数
            pageConfig: {
                account: 5, // 总条数
                pageSize: 2, // 当前多少条数据
                currentPage: 1, // 当前页
                showJumpButton: true // 显示跳转按钮
            }, // 分页
            alert_: false, // 新增单笔还款
            alert_detail: false, // 明细
            tetail_data: {}, // 传给明细的数据
            submit_hint: false, // 提交开关
            delete_hint: false // 删除开关
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
    mounted() {
        // 一般还款查询总单接口
        // this.SingleRepayment({
        //     "phase_no": "0010",
        //     "flow_no": "normalPayFlow"
        // });
        this.querySearch();
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
        // 一般还款查询总单接口
        SingleRepayment(res, current) {
            res = res || {
                "phase_no": "0010",
                "flow_no": "normalPayFlow"
            };
            current = current || 1;
            let url = counterDealApi.SingleRepayment + "?current=" + current + "&size=10";
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
        // 一般还款总单删除(支持单笔/批量)
        deleteRepay(res) {
            return new Promise((resolve, reject) => {
                this.$MyFetch.post(counterDealApi.deleteRepay, res)
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
        // 单笔还款提交复核（支持批量/单笔)
        submitReview(res) {
            return new Promise((resolve, reject) => {
                this.$MyFetch.post(counterDealApi.submitReview, res)
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
        // 关闭提交提示窗口
        sumit_close() {
            this.submit_hint = false;
        },
        // 关闭删除提示窗口
        delete_close() {
            this.delete_hint = false;
        },
        // 确认提交窗口
        affirm_submit_fun() {
            this.submit_hint = false;
            let submitData = this.submitData;
            // 单笔还款提交复核接口方法
            this.submitReview(submitData)
                .then((res) => {
                    this.querySearch();
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        // 确认删除窗口
        affirm_delete_fun() {
            this.delete_hint = false;
            // 调用删除接口
            let deleteData = this.deleteData;
            this.deleteRepay(deleteData)
                .then((data) => {
                    this.querySearch();
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        // 点击明细
        detail_alert(res) {
            this.tetail_data = res;
            this.alert_detail = true;
        },
        // 新增
        add_alert() {
            this.alert_ = true;
        },
        // 表格选择框选中
        handleSelectionChange (data) {
            console.log(data);
            // 清空删除的参数
            this.deleteData = {"transSerialNos": []};
            // 清空提交的参数
            this.submitData.objectNoList = [];
            data.forEach(element => {
                let obj = {};
                // 获取选中的交易号,并push到删除提交的参数列表去;
                obj.transSerialNo = element.trans_serial_no;
                this.deleteData.transSerialNos.push(element.trans_serial_no);
                this.submitData.objectNoList.push(element.trans_serial_no);
            });
        },
        rowCheck(row, column, e) {
          this.$refs.multipleTable.toggleRowSelection(row);
        },
        jump(pageNum) { // 分页
            // 当前页
            this.pageConfig.currentPage = pageNum;
            let searchData = JSON.parse(JSON.stringify(this.searchData));
            searchData = this.loanTransCreated_filter(searchData);
            this.SingleRepayment(searchData, pageNum);
        },
        // 删除按钮
        delete_fun() {
            if (!this.deleteData.transSerialNos[0]) {
                this.$message('请至少选择一条数据删除');
            } else {
                this.delete_hint = true;
            }
        },
        // 提交按钮
        submit_fun() {
            if (!this.submitData.objectNoList[0]) {
                this.$message('请至少选择一条数据提交');
            } else {
                this.submit_hint = true;
            }
        },
        // 查询条件操作人过滤
        loanTransCreated_filter(data) {
            for (const item in data) {
                for (const item2 in data[item]) {
                    // 如果这个对象里有当前的key值，把eq,like,likeright对象里的这个key值清空，再给对应的eq，like,likeright赋属性名
                    if (item2 === 'loanTransCreated_by') {
                        data[item]['loanTrans.created_by'] = data[item][item2];
                        delete data[item][item2];
                    }
                }
            }
            return data;
        },
        // 查询按钮
        refer() {
            // 加上时间
           this.searchData.created_date = this.date_filter(this.should_repay_date);
            // 由于操作人key值带".",需要转换 -- 深拷贝
           let searchData = JSON.parse(JSON.stringify(this.searchData));
            searchData = this.loanTransCreated_filter(searchData);
           this.SingleRepayment(searchData);
        },
        // 清空按钮
        empty() {
            this.loan_no = '';
            this.should_repay_date = '';
            this.loanTransCreated_by = '';
            // 让查询数据清空
            this.searchData = {
                "phase_no": "0010",
                "flow_no": "normalPayFlow",
                "eq": {},
                "likeRight": {},
                "like": {}
            };
        },
        // 关闭新增组件
        close_1() {
        this.alert_ = false;
        },
        // 子页面重新请求接口
        querySearch() {
            // 一般还款查询总单接口
            this.SingleRepayment({
                "phase_no": "0010",
                "flow_no": "normalPayFlow"
            });
        },
        // 关闭明细
        close_2() {
        this.alert_detail = false;
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
        pagination, // 分页
        addPriorMatch, // 增加
        sponsorDetail, // 明细
        reconfirmHint // 确认提交
    }
};
</script>
<style lang="less" scoped>
.repayDateCss {
   /deep/ .el-range-input::-ms-clear{
        display: none;
    }
}
</style>
