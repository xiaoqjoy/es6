<template>
    <!-- 单笔罚息复利复核 -->
    <div class="sponsor">
        <!-- 查询这一行 -->
        <div class="b_content">
            <!-- 出账编号 -->
            <el-input class="select_72" placeholder="出账编号" v-model="loanNo" clearable></el-input>
            <el-input class="select_72" placeholder="操作人" v-model="createdBy" clearable></el-input>
            <div class="referEmptyDiv"><el-button class="b_button query button" @click="refer">查询</el-button></div>
            <div class="referEmptyDiv"><el-button class="b_button empty button" @click="empty">清空</el-button></div>
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
            @row-click="rowCheck"
            @selection-change="handleSelectionChange">
            <el-table-column
                type="selection">
            </el-table-column>
            <el-table-column
                width="180"
                prop="loanNo"
                label="出账编号">
            </el-table-column>
            <el-table-column
                prop="inputAmount"
                label="录入总金额">
            </el-table-column>
                <el-table-column
                prop="transAmount"
                label="减免总金额">
            </el-table-column>
            <!-- <el-table-column
                prop=""
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
            </el-table-column> -->
            <el-table-column
                prop="phaseName"
                label="当前阶段">
            </el-table-column>
            <el-table-column
                prop="createdBy"
                width="150"
                label="操作人">
            </el-table-column>
            <el-table-column
                width="180"
                prop="operateDate"
                label="操作时间">
            </el-table-column>
            <el-table-column
            fixed="right"
                label="操作">
                <template slot-scope="scope">
                    <el-button  type="text" size="small" @click="detail_alert(scope.row)">交易明细</el-button>
                </template>
            </el-table-column>
            </el-table>
        </div>
        <!-- 分页 -->
        <div class="page_box">
            <!-- 分页条 -->
            <pagination @jump-page='jump' :page='pageConfig' class="pagination"></pagination>
        </div>
        <!-- 底部 -->
        <div class="enable">
            <el-button class="t_button upload_t button" @click="delete_fun">退回</el-button>
            <el-button class="t_button initiate_t button" @click="submit_fun">记账</el-button>
        </div>
        <!-- 明细 -->
        <sponsorDetail v-if="alert_detail" @clsoe_windowDetail='close_2' :tetail_data = "tetail_data"></sponsorDetail>
        <!-- 文字提示组件 -->
        <fontHint v-if="fontHintFlag" :massage="fontHintMsg" @close="fontHintClose"></fontHint>
        <!-- 确认组件 -->
        <reconfirmHint v-if="deleteReconfirmFlag" massage="是否退回选中的申请？" @close="deleteReconfirmClose" @backFun="deleteReconfirmBackFun"></reconfirmHint>
        <reconfirmHint v-if="submitReconfirmFlag" massage="是否对选中的申进行记账？" @close="submitReconfirmClose" @backFun="submitReconfirmBackFun"></reconfirmHint>
    </div>
</template>
<script type="text/ecmascript-6">
import sponsorDetail from "../sponsor/sponsor-detail/"; // 发起-明细
import reconfirmHint from "@/system/adjust-accounts/counter-deal/components/reconfirm-hint"; // 再次确认组件
import pagination from "@components/pagination"; // 分页组件
import { counterDealApi } from "@/system/adjust-accounts/counter-deal/js/server"; // 接口
import fontHint from "@/system/adjust-accounts/counter-deal/components/font-hint"; // 文字提示组件

export default {
    name: "mitigate-sponsor",
    data() {
        return {
            transSerialNoList: [],
            loanNo: '',
            createdBy: '',
            fontHintFlag: false,
            fontHintMsg: '暂无数据',
            deleteReconfirmFlag: false,
            submitReconfirmFlag: false,
            for_: [], // 渲染数据列表
            pageConfig: {
                account: 1, // 总条数
                pageSize: 5, // 当前多少条数据
                currentPage: 1, // 当前页
                showJumpButton: true // 显示跳转按钮
            }, // 分页
            alert_detail: false, // 明细
            tetail_data: {} // 传给明细的数据
        };
    },
    mounted() {
        this.queryPayInteFineAdjustList();
    },
    methods: {
        // 查询总单接口
        queryPayInteFineAdjustList(res = {"phaseNoList": ["0020"], "transType": 30, "flowNo": "intFineFlow"}, current = 1) {
            let url = counterDealApi.queryPayInteFineAdjustList + "?current=" + current + "&size=10";
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
        // 退回
        reviewReturn(res) {
            return new Promise((resolve, reject) => {
                this.$MyFetch.post(counterDealApi.reviewReturn, res)
                .then((data = {}) => {
                    resolve(data);
                })
                .catch((err) => {
                    reject(err.message);
                });
            });
        },
        // 记账
        PayInteFineAdjustAccount(res) {
            return new Promise((resolve, reject) => {
                this.$MyFetch.post(counterDealApi.PayInteFineAdjustAccount, res)
                .then((data = {}) => {
                    resolve(data);
                })
                .catch((err) => {
                    reject(err.message);
                });
            });
        },
        // 退回按钮
        delete_fun() {
            if (this.transSerialNoList.length < 1) {
                this.$message("请选择数据进行退回！");
                return;
            }
            this.deleteReconfirmFlag = true;
        },
        // 记账按钮
        submit_fun() {
            if (this.transSerialNoList.length < 1) {
                this.$message("请选择数据进行记账！");
                return;
            }
            this.submitReconfirmFlag = true;
        },
        // 确认退回
        deleteReconfirmBackFun() {
            let queryData = {
                "flowNo": "intFineFlow",
                "objectNoList": this.transSerialNoList
            };
            this.reviewReturn(queryData)
            .then((data) => {
                this.$message.success("退回成功！");
                this.refer();
            }).catch((err) => {
                this.$error(err);
            });
            this.deleteReconfirmClose();
        },
        // 取消退回
        deleteReconfirmClose() {
            this.deleteReconfirmFlag = false;
        },
        // 确认记账
        submitReconfirmBackFun() {
            let queryData = {
                "flowNo": "intFineFlow",
                "transSerialNoList": this.transSerialNoList
            };
            this.PayInteFineAdjustAccount(queryData)
            .then((data) => {
                this.$message.success("记账成功！");
                this.refer();
            }).catch((err) => {
                this.$error(err);
            });
            this.submitReconfirmClose();
        },
        // 取消记账
        submitReconfirmClose() {
            this.submitReconfirmFlag = false;
        },
        // 关闭文字提示组件
        fontHintClose() {
            this.fontHintFlag = false;
        },
        // 点击明细
        detail_alert(res) {
            console.log(res, '明细');
            this.tetail_data = res;
            this.alert_detail = true;
        },
         // 选择框选中
        handleSelectionChange (data) {
            // 清空表格选中的提交删除接口参数
            this.transSerialNoList = [];
            data.forEach(element => {
                // 获取选中的交易号,并push到删除提交的参数列表去;
                this.transSerialNoList.push(element.transSerialNo);
            });
            console.log(data, this.transSerialNoList);
        },
        rowCheck(row, column, e) {
            this.$refs.multipleTable.toggleRowSelection(row);
        },
        jump(pageNum) { // 分页
            let queryData = {
                "loanNo": this.loanNo,
                "createdBy": this.createdBy,
                "phaseNoList": ["0020"],
                "flowNo": "intFineFlow",
                "transType": 30
            };
            this.queryPayInteFineAdjustList(queryData, pageNum);
        },
        // 清空按钮
        empty() {
            this.loanNo = '';
            this.createdBy = '';
        },
        // 查询
        refer() {
            // if (!(this.loanNo || this.createdBy)) {
            //     this.$message("请输入查询条件！");
            //     return;
            // }
            let queryData = {
                "loanNo": this.loanNo,
                "createdBy": this.createdBy,
                "phaseNoList": ["0020"],
                "flowNo": "intFineFlow",
                "transType": 30
            };
            this.queryPayInteFineAdjustList(queryData);
        },
        // 关闭明细
        close_2() {
            this.alert_detail = false;
        }
    },
    components: {
        reconfirmHint, // 再次确认组件
        pagination, // 分页组件
        fontHint, // 文字提示组件
        sponsorDetail // 明细
    }
};
</script>
<style lang="less" scoped>
</style>
