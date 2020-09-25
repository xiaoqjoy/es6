<style lang="less" scoped>
    /deep/ .el-table::before{
        height: 0!important;
        background-color: transparent!important;
    }
    .sponsor {
        width: 100%;
        height: 100%;
        position: relative;
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
        margin-bottom: 20px;
    }
    // 查询这行的box
    .serach_row {
        // 输入框和下拉框172*40
        .select_72 {
            width: 160px;
            height: 40px;
            margin-right: 15px;
        }
        // 输入框和下拉框170*40
        .select_7 {
        width: 170px;
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
    .sponsor_table_box {
        width: 100%;
        // height: 550px;
        max-height: 600px;
        margin-top: 21px;
        overflow: hidden;
    }
    // page_box 分页
    .page_box {
        width: 100%;
        // margin-top: 40px;
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
</style>
<template>
<!-- 冲销交易-发起，复核，完成 -->
    <div class="sponsor">
        <button v-if="name=='chargeAgainstsponsor'" class="add button " @click="add_alert()">+ 新增</button>
        <!-- 查询这一行 -->
        <div class="serach_row">
            <!-- 交易号 -->
            <el-input class="select_72" v-model="queryDate.transSerialNo" placeholder="交易号"></el-input>
            <el-input class="select_72" v-model="queryDate.createdBy" placeholder="操作人"></el-input>
            <el-button class="b_button query button " @click="refer(1)">查询</el-button>
            <el-button class="b_button empty button " @click="empty()">清空</el-button>
        </div>
        <!-- 带全选的表格 -->
        <div class="sponsor_table_box">
            <el-table
            :default-sort = "{prop: 'date', order: 'descending'}"
            :header-cell-style="{'font-size':'12px','text-align':'center','height':'38.9px','background':'#ececec'}"
            ref="multipleTable"
            :data="for_"
            tooltip-effect="dark"
            style="width: 100%;height:100%;overflow:auto;max-height:600px;"
            @selection-change="handleSelectionChange">
            <el-table-column v-if="name!='chargeAgainstaccomplish'"
                type="selection">
            </el-table-column>
            <el-table-column
                prop="transSerialNo"
                label="交易号">
            </el-table-column>
            <el-table-column
                prop="relationTransNo"
                label="原交易号">
            </el-table-column>
            <el-table-column
                prop="accDate"
                label="记账时间">
            </el-table-column>
                <el-table-column
                prop="operateDate"
                label="操作时间">
            </el-table-column>
            <el-table-column
                prop="createdBy"
                label="操作人">
            </el-table-column>
            <el-table-column
                prop="h"
                label="操作">
                <template slot-scope="scope">
                    <el-button  type="text" size="small" @click="detail_alert(scope.row,'origin')">原交易明细</el-button>
                    <el-button  type="text" size="small" @click="detail_alert(scope.row,'sterilisation')">冲销交易明细</el-button>
                </template>
            </el-table-column>
            </el-table>
        </div>
        <!-- 分页 -->
        <div class="bottomIndex" >
            <div class="page_box" :style="{'margin-top':'40px'}">
                <!-- 分页条 -->
                <pagination @jump-page='jump' :page='pageConfig' class="pagination"></pagination>
            </div>
            <!-- 删除和提交 -->
            <div class="delete_submit">
                <div>
                    <el-button v-if="name=='chargeAgainstsponsor'" class="t_button dead_t button" @click="delete_fun">删除</el-button>
                    <el-button v-if="name=='chargeAgainstsponsor'" class="t_button initiate_t button" @click="submit_fun">提交</el-button>
                    <el-button v-if="name!='chargeAgainstsponsor' && name!='chargeAgainstaccomplish'" class="t_button dead_t button" @click="back_fun">退回</el-button>
                    <el-button v-if="name!='chargeAgainstsponsor' && name!='chargeAgainstaccomplish'" class="t_button initiate_t button" @click="rember_fun">记账</el-button>
                </div>
            </div>

        </div>
        <!-- 新增 -->
        <addPriorMatch v-if="alert_" :refer="refer" @clsoe_windowAlert='close_1'></addPriorMatch>
        <!-- 交易明细 -->
        <detail v-if="isdetail" @clsoe_windowDetail='close_detail' :tetail_data = "tetail_data" :title='title'></detail>
        <!-- 提示窗  -->
       <reconfirmHint v-if="reconfirmFlag" :massage="massage" :effect='effect' @close="reconfirmClose" @backFun="reconfirmBackFun"></reconfirmHint>
    </div>
</template>
<script type="text/ecmascript-6">
import reconfirmHint from "@/system/adjust-accounts/counter-deal/components/reconfirm-hint"; // 再次确认组件
import addPriorMatch from "../sponsor/addPriorMatch/"; // 新增单笔还款
import detail from "./detail"; // 原交易明细,冲销交易明细
import pagination from "@components/pagination"; // 分页条
import { counterDealApi } from "@/system/adjust-accounts/counter-deal/js/server"; // 接口
import "@system/adjust-accounts/counter-deal/css/myQuerySelect.less"; // 查询框样式
export default {
    name: "charge-against-sponsor",
    props: [
        'name'
    ],
    data() {
        return {
            effect: '', // 弹框作用
            selectionDate: [], // 选择数据
            massage: '',
            reconfirmFlag: false,
            queryDate: {
                flowNo: 'reversalFlow', // 调整罚息复利(intFineFlow)，减免流程（reductionFlow）,冲销 （reversalFlow）
                phaseNoList: [], // 发起：（0010 0050），复核（0030），完成（1000）
                transSerialNo: '', // 出账编号非必填
                createdBy: '' // 操作人非必填
            },
            for_: [], // 渲染数据列表
            pageConfig: {
                account: 1, // 总条数
                pageSize: 1, // 当前多少条数据
                currentPage: 1, // 当前页
                showJumpButton: true // 显示跳转按钮
            }, // 分页
            alert_: false, // 新增单笔还款
            isdetail: false, // 交易明细
            tetail_data: '', // 传给明细的数据
            title: '' // 交易明细名字
        };
    },
    methods: {
        // 关闭提交提示窗口
        reconfirmClose() {
            this.reconfirmFlag = false;
        },
        // 取消提示窗口
        reconfirmBackFun(val) {
            this.reconfirmFlag = false;
            if (val) {
                if (val === 'deleteRepay') { // 发起删除
                    this.deleteRepay();
                } else if (val === 'submitReview') { // 发起提交
                    this.submitReview();
                } else if (val === 'reviewReturn') { // 复核退回
                    this.reviewReturn();
                } else if (val === 'reversalbookKeep') { // 复核记账
                    this.reversalbookKeep();
                }
            }
        },
        // 点击原交易明细
        detail_alert(res, value) {
            if (value === "origin") {
                this.tetail_data = res.relationTransNo;
                this.title = '原交易明细';
            } else if (value === "sterilisation") {
                this.tetail_data = res.transSerialNo;
                this.title = '冲销交易明细';
            }
            // // value origin,sterilisation
            // this.tetail_data = res;
            this.isdetail = true;
        },
        // 新增
        add_alert() {
            this.alert_ = true;
        },
        // 选择框选中
        handleSelectionChange (data) {
            this.selectionDate = data;
            console.log(data);
        },
        jump(pageNum) { // 分页
            this.pageConfig.currentPage = pageNum;
            this.queryPayInteFineAdjustList(this.queryDate, this.pageConfig.currentPage);
            console.log(pageNum);
        },
        // 删除按钮
        delete_fun() {
            this.massage = '是否删除选中的申请？';
            this.reconfirmFlag = true;
            this.effect = 'deleteRepay';
        },
        deleteRepay() { // 发起删除
            var transSerialNos = this.selectionDate.map(res => {
                return res.transSerialNo;
            });
            this.$MyFetch.post(counterDealApi.deleteRepay, {transSerialNos: transSerialNos})
            .then((data = {}) => {
               if (data.result) {
                    this.$message({
                    message: "删除成功！",
                    type: 'success'
                    });
                    this.refer();
               }
            })
            .catch(err => {
                this.$error(err.message);
            });
        },
        submitReview() { // 发起提交
            var transSerialNos = this.selectionDate.map(res => {
                return res.transSerialNo;
            });
             this.$MyFetch.post(counterDealApi.submitReview, {flowNo: this.queryDate.flowNo, objectNoList: transSerialNos})
            .then((data = {}) => {
               if (data.result) {
                    this.$message({
                    message: "提交成功！",
                    type: 'success'
                    });
                    this.refer();
               }
            })
            .catch(err => {
                this.$error(err.message);
            });
        },
        reviewReturn() { // 退回
            var transSerialNos = this.selectionDate.map(res => {
                return res.transSerialNo;
            });
             this.$MyFetch.post(counterDealApi.reviewReturn, {flowNo: this.queryDate.flowNo, objectNoList: transSerialNos})
            .then((data = {}) => {
               if (data.result) {
                    this.$message({
                    message: "退回成功！",
                    type: 'success'
                    });
                    this.refer();
               }
            })
            .catch(err => {
                this.$error(err.message);
            });
        },
        // 退回按钮
        back_fun() {
            this.massage = '是否退回选中的申请？';
            this.reconfirmFlag = true;
            this.effect = 'reviewReturn';
        },
        // 记账按钮
        rember_fun() {
            this.massage = '是否记账选中的申请？';
            this.reconfirmFlag = true;
            this.effect = 'reversalbookKeep';
        },
        // 记账
        reversalbookKeep() {
            var transSerialNos = this.selectionDate.map(res => {
                return res.transSerialNo;
            });
             this.$MyFetch.post(counterDealApi.reversalbookKeep, {flowNo: this.queryDate.flowNo, objectNoList: transSerialNos})
            .then((data = {}) => {
               if (data.success) {
                    this.$message({
                    message: "记账成功！",
                    type: 'success'
                    });
                    this.refer();
               }
            })
            .catch(err => {
                this.$error(err.message);
            });
        },
        // 提交按钮
        submit_fun() {
            this.massage = '是否提交选中的申请？';
            this.reconfirmFlag = true;
            this.effect = 'submitReview';
        },
        // 清空按钮
        empty() {
            this.queryDate.transSerialNo = ''; // 出账编号(交易号)非必填
            this.queryDate.createdBy = ''; // 操作人非必填
        },
        // 查询
        refer() {
            this.queryPayInteFineAdjustList(this.queryDate);
        },
        // 关闭新增组件
        close_1(val) {
            this.alert_ = false;
        },
        // 关闭原交易明细
        close_detail() {
        this.isdetail = false;
        },
        queryPayInteFineAdjustList(res, current) { // 获取数据
            res = res || {};
            current = current || 1;
            this.$MyFetch.post(counterDealApi.queryPayInteFineAdjustList + '?current=' + current + '&size=10', res)
            .then((data = {}) => {
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
        }
    },
    mounted() {
        if (this.name === 'chargeAgainstsponsor') { // 发起
            this.queryDate.phaseNoList = ['0010', '0050'];
            this.refer();
        } else if (this.name === 'chargeAgainstreCheck') { // 复利
            this.queryDate.phaseNoList = ['0020'];
            this.refer();
        } else if (this.name === 'chargeAgainstaccomplish') { // 完成
            this.queryDate.phaseNoList = ['1000'];
            this.refer();
        }
    },
    components: {
        pagination, // 分页
        addPriorMatch, // 增加
        detail, // 原交易明细,冲销交易明细
        reconfirmHint // 提示组件
    }
};
</script>
