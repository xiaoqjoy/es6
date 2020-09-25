<template>
    <div class="sponsor">
        <!-- 查询这一行 -->
        <div class="serach_row">
            <el-input class="select_72" v-model="charge_num" placeholder="出账编号"></el-input>
            <el-date-picker
            v-model="should_repay_date"
            class="select_7"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="应还日期">
            </el-date-picker>
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
            @selection-change="handleSelectionChange">
            <el-table-column
                type="selection">
            </el-table-column>
            <el-table-column
                prop="a"
                label="交易号">
            </el-table-column>
            <el-table-column
                prop="b"
                label="总金额">
            </el-table-column>
            <el-table-column
                prop="c"
                label="出账编号">
            </el-table-column>
                <el-table-column
                prop="d"
                label="申请时间">
            </el-table-column>
            <el-table-column
                prop="e"
                label="申请人">
            </el-table-column>
            <el-table-column
                prop="h"
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
                <el-button class="t_button dead_t button " @click="retrun_fun">退回</el-button>
                <el-button class="t_button initiate_t button " @click="tally_fun">记账</el-button>
            </div>
        </div>
        <!-- 明细 -->
        <reCheckDetail v-if="alert_detail" @clsoe_windowDetail='close_2' :tetail_data = "tetail_data"></reCheckDetail>
        <!-- 提示窗 == 记账 -->
        <div class="hint" v-if="submit_hint">
            <div class="import-message">
                <div class="dialog-mask"></div>
                <div class="dialog-box">
                    <div class="dialog-msgbox__top">
                    <span class="el-icon-close button button__close" @click="sumit_close"></span>
                    </div>
                    <div class="text-center">是否对选中的申请进行记账？</div>
                     <div class="affirm_select">
                        <el-button class="t_button cancel_t button " @click="cancel_submit_fn">取消</el-button>
                        <el-button class="t_button affirm_t button " @click="affirm_submit_fun">确认</el-button>
                    </div>
                </div>
            </div>
        </div>
        <!-- 提示窗 == 退回 -->
        <div class="hint" v-if="delete_hint">
            <div class="import-message">
                <div class="dialog-mask"></div>
                <div class="dialog-box">
                    <div class="dialog-msgbox__top">
                    <span class="el-icon-close button button__close" @click="delete_close"></span>
                    </div>
                    <div class="text-center">是否退回选中的申请？</div>
                     <div class="affirm_select">
                        <el-button class="t_button cancel_t button " @click="cancel_delete_fn">取消</el-button>
                        <el-button class="t_button affirm_t button " @click="affirm_delete_fun">确认</el-button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script type="text/ecmascript-6">
import reCheckDetail from "../re-check/re-check-detail/"; // 复核-明细
import pagination from "@components/pagination"; // 分页条
export default {
    name: "mitigate-re-check",
    data() {
        return {
            charge_num: '', // 出账编号
            should_repay_date: '', // 应还日期
            for_: [
                {
                a: 'ddf5454',
                b: 'ddf54dd54',
                c: 'ddf5ddd454',
                d: 'ddf5454',
                e: 'ddf5454',
                f: 'ddf5ddd454',
                g: 'ddf5法国队454',
                h: 'ddf5454'
                },
                {
                a: '123345',
                b: '123345',
                c: '123345',
                d: '123345',
                e: '123345',
                f: '123345',
                g: '123345',
                h: '123345'
                },
                {
                a: 'ddf5454',
                b: 'ddf5454',
                c: 'ddf5454',
                d: 'ddf5454',
                e: 'ddf5454',
                f: 'ddf5454',
                g: 'ddf5454',
                h: 'ddf5454'
                },
                {
                a: '123345',
                b: '123345',
                c: '123345',
                d: '123345',
                e: '123345',
                f: '123345',
                g: '123345',
                h: '123345'
                },
                {
                a: 'ddf5454',
                b: 'ddf5454',
                c: 'ddf5454',
                d: 'ddf5454',
                e: 'ddf5454',
                f: 'ddf5454',
                g: 'ddf5454',
                h: 'ddf5454'
                },
                {
                a: '123345',
                b: '123345',
                c: '123345',
                d: '123345',
                e: '123345',
                f: '123345',
                g: '123345',
                h: '123345'
                }
            ], // 渲染数据列表
            pageConfig: {
                account: 5, // 总条数
                pageSize: 2, // 当前多少条数据
                currentPage: 1, // 当前页
                showJumpButton: true // 显示跳转按钮
            }, // 分页
            alert_: false, // 新增单笔还款
            alert_detail: false, // 明细
            tetail_data: '123', // 传给明细的数据
            submit_hint: false, // 记账提示
            delete_hint: false // 退回提示
        };
    },
    methods: {
        // 关闭记账提示窗口
        sumit_close() {
            this.submit_hint = false;
        },
        // 取消记账提示窗口
        cancel_submit_fn() {
            this.submit_hint = false;
        },
        // 确认记账提示窗口
        affirm_submit_fun() {
            this.submit_hint = false;
        },
        // 关闭退回提示窗口
        delete_close() {
            this.delete_hint = false;
        },
        // 取消退回提示窗口
        cancel_delete_fn() {
            this.delete_hint = false;
        },
        // 确认退回提示窗口
        affirm_delete_fun() {
            this.delete_hint = false;
        },
        // 点击明细
        detail_alert(res) {
            console.log(res, '明细');
            this.tetail_data = res;
            this.alert_detail = true;
        },
        // 选择框选中
        handleSelectionChange (data) {
            console.log(data);
        },
        jump(pageNum) { // 分页
            // this.pageConfig.currentPage = pageNum;
            // this.getData(this.pageConfig.currentPage, this.pageConfig.pageSize);
            console.log(pageNum);
        },
        // 退回按钮
        retrun_fun() {
            console.log('退回');
            this.delete_hint = true;
        },
        // 记账按钮
        tally_fun() {
            console.log('记账');
            this.submit_hint = true;
        },
        // 清空按钮
        empty() {
            this.charge_num = '';
            this.should_repay_date = '';
        },
        // 关闭新增组件
        close_1() {
        this.alert_ = false;
        },
        // 关闭明细
        close_2() {
        this.alert_detail = false;
        }
    },
    components: {
        pagination, // 分页
        reCheckDetail // 明细
    }
};
</script>
<style lang="less" scoped>
    // 提示窗
    .hint {
        .import-message {
            .dialog-box {
                width: 340px;
                height: 170px;
                .dialog-msgbox__top {
                height:40px;
                .button__close {
                position: absolute;
                top: -5px;
                right: -5px;
                width: 42px;
                height: 42px;
                line-height: 42px;
                border-radius: 50%;
                font-size: 16px;
                text-align: center;
                color: #666;
                font-weight: 600;
                }
                }
                .text-center{
                font-family: PingFangSC-Regular;
                font-size: 14px;
                color: #333333;
                letter-spacing: 1.07px;
                text-align: center;
                }
                // 确认选择
                .affirm_select {
                    width: 100%;
                    display: flex;
                    justify-content: center;
                    margin-top: 40px;
                    .t_button {
                        width: 100px;
                        height: 40px;
                    }
                    .cancel_t { // 取消
                        background: #F8F8F8;
                        border: 1px solid #DDDDDD;
                        font-size: 14px;
                        color: #666;
                        letter-spacing: 1.07px;
                        text-align: center;
                    }
                    .affirm_t { // 确认
                        background: #538BF1;
                        font-size: 14px;
                        color: #ffffff;
                        letter-spacing: 1.07px;
                        text-align: center;
                    }
                }
            }
        }
    }
    .sponsor {
        width: 100%;
        height: 100%;
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
        height: 590px;
        margin-top: 21px;
        overflow: hidden;
    }
    // page_box 分页
    .page_box {
        width: 100%;
        margin-top: 40px;
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
