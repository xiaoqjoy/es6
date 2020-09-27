<style lang="less" scoped>
.sponsor-detail{
    position: relative;
    width: 100%;
    min-height: 780px;
    // margin-top: 20px;
    .all_top{
      position: fixed;
      top: 70px;
      z-index: 1000;
    }
    .top{
      margin:0 0 17px 0;
      span{
        display: inline-block;
        width: 2px;
        height: 16px;
        background: #538BF1;
      }
      p{
        display: inline-block;
        font-size: 16px;
        color: #333333;
        font-weight: 900;
      }
    }
    // .page_box {
    //     position: absolute;
    //     // bottom: 40px;
    //     right: 31px;
    // }
}
</style>
<template>
    <!-- 单笔罚息复利发起 -->
    <div class="sponsor-detail tab_view">
      <div class="top">
        <span></span>
        <p>{{$route.query.res.fileName}}</p>
      </div>
        <div class="b_content">
            <!-- 出账编号 -->
            <el-input class="select_72" placeholder="出账编号" clearable v-model="loanNo"></el-input>
            <el-input class="select_72" placeholder="客户姓名" clearable v-model="customerName"></el-input>
            <div class="referEmptyDiv" @click="getLookfor"><el-button class="b_button query button">查询</el-button></div>
            <div class="referEmptyDiv" @click="empty"><el-button class="b_button empty button">清空</el-button></div>
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
            <!-- <el-table-column
                type="selection">
            </el-table-column> -->
            <el-table-column
                prop="loanNo"
                label="出账编号">
            </el-table-column>
            <el-table-column
                prop="customerName"
                label="客户名称">
            </el-table-column>
                <el-table-column
                prop="fundOrgName"
                label="合作方">
            </el-table-column>
            <el-table-column
                prop="lineIdName"
                label="资金方">
            </el-table-column>
             <el-table-column
                prop="sterm"
                label="期次">
            </el-table-column>
             <el-table-column
                prop="payDate"
                label="应还日期">
            </el-table-column>
             <el-table-column
                prop="payFine"
                label="应还罚息">
            </el-table-column>
             <el-table-column
                prop="adjustFine"
                label="调整罚息">
            </el-table-column>
            <el-table-column
                prop="oweFine"
                label="罚息差额">
            </el-table-column>
             <el-table-column
                prop="payCompound"
                label="应还复利">
            </el-table-column>
            <el-table-column
                prop="adjustCompound"
                label="调整复利">
            </el-table-column>
            <el-table-column
                prop="oweCompound"
                label="复利差额">
            </el-table-column>
            <el-table-column
            fixed="right"
            v-if="name=='sponsorDetail'"
                label="操作">
                <template slot-scope="scope">
                    <el-button  type="text" size="small" @click="detail_alert(scope.row)">{{name=='sponsorDetail'?'编辑':'详情'}}</el-button>
                </template>
            </el-table-column>
            </el-table>
        </div>
        <!-- 分页 -->
        <div class="page_box">
            <!-- 分页条 -->
            <pagination @jump-page='jump' :page='pageConfig' class="pagination"></pagination>
        </div>
        <!-- 详情组件 -->
        <batchDetail v-if="batchDetailFlag" @close_batchDetail='close_batchDetail' :name='name' :transSerialNo='transSerialNo' :transType='transType'></batchDetail>
         <!-- 文字提示组件 -->
        <fontHint v-if="fontHintFlag" :massage="fontHintMsg" @close="fontHintClose"></fontHint>
        <!-- 确认组件 -->
        <reconfirmHint v-if="deleteReconfirmFlag" massage="是否删除选中的申请？" @close="deleteReconfirmClose" @backFun="deleteReconfirmBackFun"></reconfirmHint>
        <reconfirmHint v-if="submitReconfirmFlag" massage="是否提交选中的申请？" @close="submitReconfirmClose" @backFun="submitReconfirmBackFun"></reconfirmHint>
    </div>
</template>
<script type="text/ecmascript-6">
import batchDetail from "./batchDetail"; // 详情组件
import reconfirmHint from "@/system/adjust-accounts/counter-deal/components/reconfirm-hint"; // 再次确认组件
import pagination from "@components/pagination"; // 分页组件
import fontHint from "@/system/adjust-accounts/counter-deal/components/font-hint"; // 文字提示组件
import { counterDealApi } from "@/system/adjust-accounts/counter-deal/js/server"; // 接口

export default {
    name: "mitigate-sponsor",
    props: [
        'name' // 点击详情页面时，是否存在日期编辑
    ],
    data() {
        return {
            loanNo: '', // 出账编号
            customerName: '', // 客户姓名
            transSerialNo: '', // 业务关联号
            transType: '', // 业务类型
            batchDetailFlag: false,
            dataValue: '',
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
            } // 分页
        };
    },
    methods: {
        // 清空
        empty() {
            this.loanNo = '';
            this.customerName = '';
        },
        getLookfor() {
            this.batchDetail();
        },
        // 明细
        batchDetail(res = {"batchNo": this.$route.query.res.batchNo, "loanNo": this.loanNo, "customerName": this.customerName}, current = 1) {
            let url = counterDealApi.batchPayInteFineAdjustDetail + "?current=" + current + "&size=10";
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
        // 确认删除
        deleteReconfirmBackFun() {
            this.deleteReconfirmClose();
        },
        // 取消删除
        deleteReconfirmClose() {
            this.deleteReconfirmFlag = false;
        },
        // 确认提交
        submitReconfirmBackFun() {
            this.submitReconfirmClose();
        },
        // 取消提交
        submitReconfirmClose() {
            this.submitReconfirmFlag = false;
        },
        // 关闭文字提示组件
        fontHintClose() {
            this.fontHintFlag = false;
        },
        // 点击明细
        detail_alert(res) {
            this.transType = res.transType;
            this.transSerialNo = res.transSerialNo;
            this.batchDetailFlag = true;
        },
        // 新增
        add_alert() {
            this.alert_ = true;
        },
        // 选择框选中
        handleSelectionChange (data) {
            console.log(data);
        },
        rowCheck(row, column, e) {
            this.$refs.multipleTable.toggleRowSelection(row);
        },
        jump(pageNum) { // 分页
            let queryData = {
                "batchNo": this.$route.query.res.batchNo,
                "loanNo": this.loanNo,
                "customerName": this.customerName
            };
            this.batchDetail(queryData, pageNum);
        },
        // 删除按钮
        delete_fun() {
            this.deleteReconfirmFlag = true;
        },
        // 提交按钮
        submit_fun() {
            this.submitReconfirmFlag = true;
        },
        // 关闭明细
        close_batchDetail() {
            this.batchDetailFlag = false;
            this.batchDetail();
        }
    },
    mounted() {
        this.batchDetail();
    },
    components: {
        reconfirmHint, // 再次确认组件
        pagination, // 分页组件
        fontHint, // 文字提示组件
        batchDetail // 详情组件
    }
};
</script>
