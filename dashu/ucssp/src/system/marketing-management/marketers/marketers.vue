<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-05 18:10:57
 * @LastEditTime: 2019-08-16 15:36:03
 * @LastEditors: Please set LastEditors
 -->

<style lang="less" scoped>
    /deep/ .el-table::before{
        height: 0!important;
        background-color: transparent!important;
    }
    .marketers {
        width: 100%;
        height: 100%;
        position: relative;
        // 查询这行的box
        .serach_row {
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
            max-height: 600px;
            margin-top: 21px;
            overflow: hidden;
        }
        // page_box 分页
        .page_box {
            width: 100%;
        }
    }
</style>
<template>
<!-- 冲销交易-发起，复核，完成 -->
    <div class="marketers contain">
        <!-- 查询这一行 -->
        <div class="serach_row">
            <!-- 交易号 -->
            <el-input clearable class="select_72" v-model="queryDate.applicationId" placeholder="申请编号"></el-input>
            <el-input clearable class="select_72" v-model="queryDate.customerName" placeholder="借款人姓名"></el-input>
            <el-input clearable class="select_72" v-model="queryDate.custManagerName" placeholder="客户经理"></el-input>
            <el-input clearable class="select_72" v-model="queryDate.assistantName" placeholder="业务助理"></el-input>
            <el-button class="b_button query button " @click="refer(1)">查询</el-button>
            <el-button class="b_button empty button " @click="empty()">清空</el-button>
        </div>
        <!-- 带全选的表格 -->
        <div class="sponsor_table_box">
            <el-table
            v-loading="loading"
            height="600"
            :default-sort = "{prop: 'date', order: 'descending'}"
            :header-cell-style="{'font-size':'12px','text-align':'center','height':'38.9px','background':'#ececec'}"
            ref="multipleTable"
            :data="for_"
            tooltip-effect="dark"
            style="width: 100%;height:100%;overflow:auto;max-height:600px;">
            <el-table-column
                prop="applicationId"
                width="180"
                label="申请编号">
            </el-table-column>
             <el-table-column
                prop="applicationDate"
                label="申请日期">
            </el-table-column>
            <el-table-column
                prop="customerName"
                label="借款人姓名">
            </el-table-column>
                <el-table-column
                prop="certificateNum"
                width="180"
                label="借款人身份证号">
            </el-table-column>
            <el-table-column
                prop="applicationSubmitAmt"
                label="申请金额">
            </el-table-column>
            <el-table-column
                prop="orgName1"
                label="合作机构一">
            </el-table-column>
            <el-table-column
                prop="orgName2"
                label="合作机构二">
            </el-table-column>
            <el-table-column
                prop="custManagerName"
                label="客户经理">
            </el-table-column>
            <el-table-column
                prop="initialCustManagerName"
                label="初始客户经理">
            </el-table-column>
            <el-table-column
                prop="assistantName"
                label="业务助理">
            </el-table-column>
            <el-table-column
                prop="h"
                label="操作">
                <template slot-scope="scope">
                    <el-button  type="text" size="small" @click="detail_alert(scope.row)">详情</el-button>
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
        </div>
        <!-- 交易明细 -->
        <detail v-if="isdetail" @clsoe_windowDetail='close_detail' :tetail_data = "tetail_data" :title='title'></detail>
        <!-- 提示窗  -->
       <reconfirmHint v-if="reconfirmFlag" :massage="massage" :effect='effect' @close="reconfirmClose" @backFun="reconfirmBackFun"></reconfirmHint>
    </div>
</template>
<script type="text/ecmascript-6">
import reconfirmHint from "@/system/adjust-accounts/counter-deal/components/reconfirm-hint"; // 再次确认组件
import detail from "./detail"; // 原交易明细,冲销交易明细
import pagination from "@components/pagination"; // 分页条
import {marketingApi} from "../js/server"; // 接口
import "@system/adjust-accounts/counter-deal/css/myQuerySelect.less"; // 查询框样式
export default {
    name: "marketers",
    props: [
        'name'
    ],
    data() {
        return {
            loading: false,
            effect: '', // 弹框作用
            selectionDate: [], // 选择数据
            massage: '',
            reconfirmFlag: false,
            queryDate: {
                "applicationId": "",
                "assistantName": "",
                "custManagerName": "",
                "customerName": "",
                "pageNum": 1,
                "pageSize": 10
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
        },
        // 点击原交易明细
        detail_alert(res) {
            this.tetail_data = JSON.stringify(res);
            this.title = '详情';
            this.isdetail = true;
        },
        // 选择框选中
        F (data) {
            this.selectionDate = data;
            console.log(data);
        },
        jump(pageNum) { // 分页
            this.loading = true;
            this.pageConfig.currentPage = pageNum;
            this.memberExchangeEditList(this.queryDate, this.pageConfig.currentPage);
        },
        // 清空按钮
        empty() {
            this.queryDate.applicationId = '';
            this.queryDate.assistantName = '';
            this.queryDate.custManagerName = '';
            this.queryDate.customerName = '';
        },
        // 查询
        refer() {
            if (this.queryDate.applicationId || this.queryDate.assistantName || this.queryDate.custManagerName || this.queryDate.customerName) {
                this.memberExchangeEditList(this.queryDate);
            } else {
                this.$error('请至少需要输入一个查询条件');
            };
        },
        // 关闭原交易明细
        close_detail(val) {
            if (val === 'success') {
                this.empty();
                this.for_ = [];
            }
            this.isdetail = false;
        },
        memberExchangeEditList(res, current) { // 获取数据
        this.queryDate.pageNum = current || 1;
            res = res || {};
            this.loading = true;
            this.$MyFetch.post(marketingApi.memberExchangeEditList, res)
            .then((data = {}) => {
                this.loading = false;
                this.for_ = data.list;
                 // 总条数
                this.pageConfig.account = data.total || 1;
                // 当前页
                this.pageConfig.currentPage = data.pageNum || 1;
                // 一页有几条数据 pageSize
                this.pageConfig.pageSize = data.pageSize || 10;
            })
            .catch(err => {
            console.log(err);
            this.$error(err.message);
            });
        }
    },
    mounted() {
    },
    components: {
        pagination, // 分页
        detail, // 原交易明细,冲销交易明细
        reconfirmHint // 提示组件
    }
};
</script>
