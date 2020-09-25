<template>
    <div class="sponsor">
        <button class="add button " @click="add_alert()">+ 新增</button>
        <!-- 查询这一行 -->
        <div class="serach_row">
            <!-- 交易号 -->
            <div class="demo-ruleForms">
                <input class="select_72" v-model="line_id" placeholder="交易号" @focus="open_select('icoToBottom1', 'icoToTop1', 'operateOrgidSelectRef', 'ico_flag1', 'line_id')" @blur="blur_select('icoToBottom1', 'icoToTop1', 'operateOrgidSelectRef', 'ico_flag1', 'line_id')"/>
                <span :class="{'select_af':true , 'select_toTop': icoToTop1, 'select_toBottom': icoToBottom1}" ref="select_type_btn"></span>
                <div class="select_option" ref="operateOrgidSelectRef">
                    <div class="opton_item" @click="selected_fun('eq', 'line_id', 'operateOrgidSelectRef', 'ico_flag1', 'icoToBottom1', 'icoToTop1')">
                    <span>等于"{{line_id}}"</span>
                    </div>
                    <div class="opton_item" @click="selected_fun('likeRight', 'line_id', 'operateOrgidSelectRef', 'ico_flag1', 'icoToBottom1', 'icoToTop1')">
                    <span>以"{{line_id}}"开头</span>
                    </div>
                    <div class="opton_item" @click="selected_fun('like', 'line_id', 'operateOrgidSelectRef', 'ico_flag1', 'icoToBottom1', 'icoToTop1')">
                    <span>包含"{{line_id}}"</span>
                    </div>
                </div>
            </div>
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
                <el-button class="t_button dead_t button " @click="delete_fun">删除</el-button>
                <el-button class="t_button initiate_t button " @click="submit_fun">提交</el-button>
            </div>
        </div>
        <!-- 新增单笔还款 -->
        <addPriorMatch v-if="alert_" @clsoe_windowAlert='close_1'></addPriorMatch>
        <!-- 明细 -->
        <sponsorDetail v-if="alert_detail" @clsoe_windowDetail='close_2' :tetail_data = "tetail_data"></sponsorDetail>
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
                        <el-button class="t_button cancel_t button " @click="cancel_submit_fn">取消</el-button>
                        <el-button class="t_button affirm_t button " @click="affirm_submit_fun">确认</el-button>
                    </div>
                </div>
            </div>
        </div>
        <!-- 提示窗 == 删除 -->
        <div class="hint" v-if="delete_hint">
            <div class="import-message">
                <div class="dialog-mask"></div>
                <div class="dialog-box">
                    <div class="dialog-msgbox__top">
                    <span class="el-icon-close button button__close" @click="delete_close"></span>
                    </div>
                    <div class="text-center">是否删除选中的申请？</div>
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
import "@system/adjust-accounts/counter-deal/css/myQuerySelect.less"; // 查询框样式
import addPriorMatch from "../sponsor/addPriorMatch/"; // 新增单笔还款
import sponsorDetail from "../sponsor/sponsor-detail/"; // 发起-明细
import pagination from "@components/pagination"; // 分页条
// import { counterDealApi } from "../../js/server"; // 接口

export default {
    name: "mitigate-sponsor",
    data() {
        return {
            // 交易号
            line_id: '',
            // 出账编号
            loan_no: '',
            // 查询数据
            searchData: {
                "eq": {},
                "likeRight": {},
                "like": {}
            },
            // 交易号图标方向
            icoToTop1: false,
            icoToBottom1: false,
            ico_flag1: true,
            // 出账编号图标方向
            icoToTop2: false,
            icoToBottom2: false,
            ico_flag2: true,
            // 客户姓名图标方向
            icoToTop3: false,
            icoToBottom3: false,
            ico_flag3: true,
            for_: [], // 渲染数据列表
            pageConfig: {
                account: 5, // 总条数
                pageSize: 5, // 当前多少条数据
                currentPage: 1, // 当前页
                showJumpButton: true // 显示跳转按钮
            }, // 分页
            alert_: false, // 新增单笔还款
            alert_detail: false, // 明细
            tetail_data: '123', // 传给明细的数据
            submit_hint: false, // 是否提交提示
            delete_hint: false // 是否提交提示
        };
    },
    methods: {
        // 关闭提交提示窗口
        sumit_close() {
            this.submit_hint = false;
        },
        // 取消提示窗口
        cancel_submit_fn() {
            this.submit_hint = false;
        },
        // 确认提示窗口
        affirm_submit_fun() {
            this.submit_hint = false;
        },
        // 关闭删除提示窗口
        delete_close() {
            this.delete_hint = false;
        },
        // 取消删除窗口
        cancel_delete_fn() {
            this.delete_hint = false;
        },
        // 确认删除窗口
        affirm_delete_fun() {
            this.delete_hint = false;
        },
        // 点击明细
        detail_alert(res) {
            console.log(res, '明细');
            this.tetail_data = res;
            this.alert_detail = true;
        },
        // 新增
        add_alert() {
            this.alert_ = true;
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
        // 删除按钮
        delete_fun() {
            console.log('删除');
            this.delete_hint = true;
        },
        // 提交按钮
        submit_fun() {
            console.log('提交');
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
        },
        // --查询框方法开始
        // 失焦时，如果用户没有选择那三种查询方式，默认等于
        default_eq(value) {
            if (this[value] !== "") {
                console.log(this[value], 'kk');
                let flag = true;
                for (const item in this.searchData) {
                    // console.log(item);
                    for (const item2 in this.searchData[item]) {
                        // 如果这个对象里有当前的key值，开关为false，不赋默认值
                        if (item2 === value) {
                            flag = false;
                        }
                    }
                }
                if (flag) { // 赋默认值“eq”
                    this.searchData.eq[value] = this[value];
                }
            }
        },
        // input失去焦点，关闭下拉框
        blur_select(icoBottom, icoTop, selectRef, flag, value) {
            setTimeout(() => {
                // 如果用户没选择查询方式，赋默认值eq
                this.default_eq(value);
                this[icoBottom] = true;
                this[icoTop] = false;
                this.$refs[selectRef].style.display = "none";
                this[flag] = true;
            }, 200);
        },
        // input聚焦，打开下拉框
        open_select(icoBottom, icoTop, selectRef, flag, value) {
            // 清空input
            // this[value] = '';
            // 并从searchdata中清楚
            // this.filter_search_type(this.searchData, value);
            this[icoBottom] = false;
            this[icoTop] = true;
            this.$refs[selectRef].style.display = "block";
            this.$refs[selectRef].style.height = "124px";
            this[flag] = false;
        },
        // 去掉重复的查询条件
        filter_search_type(searchData, value) {
            for (const item in this.searchData) {
                    // console.log(item);
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
            // this.$refs.operateOrgidSelectRef.style.height = "0";
            this.$refs[selectRef].style.display = "none";
            this[flag] = true;
            switch (type) {
                case "eq":
                this.filter_search_type(this.searchData, value);
                this.searchData[type][value] = this[value];
                // this[value] = `等于"${this[value]}"`;
                break;
                case "likeRight":
                this.filter_search_type(this.searchData, value);
                this.searchData[type][value] = this[value];
                // this[value] = `以"${this[value]}"开头`;
                break;
                case "like":
                this.filter_search_type(this.searchData, value);
                this.searchData[type][value] = this[value];
                // this[value] = `包含"${this[value]}"`;
                break;
            }
            console.log(this.searchData, 'searchdata');
        },
        // 点击下拉箭头
        select_type_fun(icoBottom, icoTop, selectRef, flag) {
            // console.log(this.$refs.select_type_btn,'23');
            if (this[flag]) { // 展开
                this[icoBottom] = false;
                this[icoTop] = true;
                this.$refs[selectRef].style.display = "block";
                // this.$refs[selectRef].style.height = "124px";
                this[flag] = false;
            } else { // 收起
                this[icoBottom] = true;
                this[icoTop] = false;
                // this.$refs.operateOrgidSelectRef.style.height = "0";
                this.$refs[selectRef].style.display = "none";
                this[flag] = true;
            }
        }
        // --查询框方法结束
    },
    components: {
        pagination, // 分页
        addPriorMatch, // 增加
        sponsorDetail // 明细
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
        height: 550px;
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
