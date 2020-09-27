<template>
    <!-- 单笔罚息复利完成 -->
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
            style="width: 100%; border: 1px solid #E9E9E9;">
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
        <!-- <div class="enable">
            <el-button class="t_button upload_t button" @click="delete_fun">删除</el-button>
            <el-button class="t_button initiate_t button" @click="submit_fun">提交</el-button>
        </div> -->
        <!-- 明细 -->
        <sponsorDetail v-if="alert_detail" @clsoe_windowDetail='close_2' :tetail_data = "tetail_data"></sponsorDetail>
        <!-- 文字提示组件 -->
        <fontHint v-if="fontHintFlag" :massage="fontHintMsg" @close="fontHintClose"></fontHint>
    </div>
</template>
<script type="text/ecmascript-6">
import sponsorDetail from "../sponsor/sponsor-detail/"; // 发起-明细
import pagination from "@components/pagination"; // 分页组件
import { counterDealApi } from "@/system/adjust-accounts/counter-deal/js/server"; // 接口
import fontHint from "@/system/adjust-accounts/counter-deal/components/font-hint"; // 文字提示组件

export default {
    name: "mitigate-sponsor",
    data() {
        return {
            loanNo: '',
            createdBy: '',
            fontHintFlag: false,
            fontHintMsg: '暂无数据',
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
        queryPayInteFineAdjustList(res = {"phaseNoList": ["1000"], "transType": 30, "flowNo": "intFineFlow"}, current = 1) {
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
        jump(pageNum) { // 分页
           let queryData = {
                "loanNo": this.loanNo,
                "createdBy": this.createdBy,
                "phaseNoList": ["1000"],
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
                "phaseNoList": ["1000"],
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
        pagination, // 分页组件
        fontHint, // 文字提示组件
        sponsorDetail // 明细
    }
};
</script>
<style lang="less" scoped>
</style>
