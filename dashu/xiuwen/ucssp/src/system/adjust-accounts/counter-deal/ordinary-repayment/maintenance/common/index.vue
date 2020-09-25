<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-05 10:15:19
 * @LastEditTime: 2019-08-20 17:08:39
 * @LastEditors: Please set LastEditors
 -->
<style lang="less" scoped>
.tab_view {
    border-radius: 4px;
    background: #fff;
    box-shadow: 1px 2px 20px #ccc;
    overflow: auto;
    padding: 20px 30px;
  }
.batch-adjust-sponsor{
    position: relative;
    width: 100%;
    min-height: 820px;
    .enable{
        .background_05838E{
            background: #05838E;
            border: 1px solid #05838E;
            border-radius: 4px;
            font-size: 14px;
            color: #FFFFFF;
            text-align: center;
        }
    }
}
</style>
<template>
    <!-- 单笔罚息复利发起 -->
    <div class="batch-adjust-sponsor tab_view">
        <div class="b_content">
            <!-- 出账编号 -->
            <!-- 批次号 -->
            <div class="demo-ruleForms">
                <input class="select_72" v-model="related_id" placeholder="批次号" @focus="open_select('icoToBottom2', 'icoToTop2', 'applicationNumberSelectRef', 'ico_flag2', 'related_id')" @blur="blur_select('icoToBottom2', 'icoToTop2', 'applicationNumberSelectRef', 'ico_flag2', 'related_id')"/>
                <span :class="{'select_af':true , 'select_toTop': icoToTop2, 'select_toBottom': icoToBottom2}" ref="select_type_btn"></span>
                <div class="select_option" ref="applicationNumberSelectRef">
                    <div class="opton_item" @click="selected_fun('eq', 'related_id', 'applicationNumberSelectRef', 'ico_flag2', 'icoToBottom2', 'icoToTop2')">
                    <span>等于"{{related_id}}"</span>
                    </div>
                    <div class="opton_item" @click="selected_fun('likeRight', 'related_id', 'applicationNumberSelectRef', 'ico_flag2', 'icoToBottom2', 'icoToTop2')">
                    <span>以"{{related_id}}"开头</span>
                    </div>
                    <div class="opton_item" @click="selected_fun('like', 'related_id', 'applicationNumberSelectRef', 'ico_flag2', 'icoToBottom2', 'icoToTop2')">
                    <span>包含"{{related_id}}"</span>
                    </div>
                </div>
            </div>
            <!-- 操作人 -->
            <div class="demo-ruleForms">
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
            <!-- 申请日期 -->
            <el-date-picker
                v-model="should_repay_date"
                type="daterange"
                align="right"
                unlink-panels
                range-separator="至"
                start-placeholder="操作日期"
                end-placeholder="操作日期">
            </el-date-picker>
            <div class="referEmptyDiv"><el-button class="b_button query button" @click="refer(1)">查询</el-button></div>
            <div class="referEmptyDiv"><el-button class="b_button empty button" @click="empty">清空</el-button></div>
        </div>
        <!-- 带全选的表格 -->
        <div class="table_box">
            <el-table
            height="600"
            :default-sort = "{prop: 'date', order: 'descending'}"
            :header-cell-style="{'font-size':'12px','text-align':'center','height':'38.9px','background':'#ececec'}"
            ref="multipleTable"
            :data="for_"
            tooltip-effect="dark"
            style="width: 100%; border: 1px solid #E9E9E9;"
            @select-all="clickSelectAll"
            @row-click="rowCheck"
            @select="select">
            <el-table-column
                v-if="name!='accomplish'"
                type="selection">
            </el-table-column>
            <el-table-column
                prop="related_id"
                label="批次号">
            </el-table-column>
            <el-table-column
                prop="file_name"
                label="文件名称">
            </el-table-column>
            <el-table-column
                prop="created_by"
                label="操作人">
            </el-table-column>
            <el-table-column
                prop="created_date"
                label="操作时间">
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
        <!-- 底部 -->
        <div class="enable">
            <el-button v-if="name=='sponsor'" class="t_button upload_t button background_05838E" @click="openImportFile">导入维护本息文件</el-button>
            <el-button v-if="name=='sponsor'" class="t_button upload_t button" @click="delete_fun">删除</el-button>
            <el-button v-if="name=='sponsor'" class="t_button initiate_t button" @click="submit_fun">提交</el-button>
            <el-button v-if="name!='sponsor'&&name!='accomplish'" class="t_button upload_t button" @click="back_fun">退回</el-button>
            <el-button v-if="name!='sponsor'&&name!='accomplish'" class="t_button initiate_t button" @click="rember_fun">记账</el-button>
        </div>
        <!-- 文件导入 -->
        <!-- <importFile v-if="isimportFile" @closeImportFile='closeImportFile' @finiseImportFile='finiseImportFile'></importFile> -->
        <importFile v-if="isimportFile" @close="closeImportFile" @getFileId='getFileId' @getFileName='getFileName' @FileSaveFun='FileSaveFun'></importFile>
        <!-- 文字提示组件 -->
        <fontHint v-if="fontHintFlag" :massage="fontHintMsg" @close="fontHintClose"></fontHint>
        <!-- 弹框组件 -->
        <reconfirmHint v-if="deleteReconfirmFlag" :massage="massage" @close="deleteReconfirmClose" @backFun="deleteReconfirmBackFun"></reconfirmHint>
        <!-- 详情组件 -->
        <batchDetail v-if="batchDetailFlag" @clsoe_windowDetail='clsoe_windowDetail' :name='name' :tetail_data='tetail_data'></batchDetail>
    </div>
</template>
<script type="text/ecmascript-6">
import importFile from "./importFile"; // 新增
import reconfirmHint from "@/system/adjust-accounts/counter-deal/components/reconfirm-hint"; // 再次确认组件
import pagination from "@components/pagination"; // 分页组件
import { counterDealApi } from "@/system/adjust-accounts/counter-deal/js/server"; // 接口
import fontHint from "@/system/adjust-accounts/counter-deal/components/font-hint"; // 文字提示组件
import batchDetail from "./batchDetail"; // 详情组件
export default {
    name: "mitigate-sponsor",
    props: [
        'name'
    ],
    computed: {
        // 流程号 发起 0010 0050 复核0020 完成 1000
        phaseNoList() {
            let phaseNo = [];
            switch (this.name) {
                case "sponsor": phaseNo = '0010'; break;
                case "reCheck": phaseNo = '0020'; break;
                case "accomplish": phaseNo = '1000'; break;
            }
            return phaseNo;
        }
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
        this.transRepayment();
    },
    data() {
        return {
            related_id: '', // 批次号
            should_repay_date: '', // 申请日期
            loanTransCreated_by: '', // 操作人
            // 查询数据
            searchData: {
                "phase_no": this.phaseNoList,
                "flow_no": "advancedPrincipalInterestFlow",
                "eq": {},
                "likeRight": {},
                "like": {}
            },
            // 最终的查询的查询数据，为了不影响搜索下拉框的功能
            searchData2: {
                "phase_no": this.phaseNoList,
                "flow_no": "advancedPrincipalInterestFlow",
                "eq": {},
                "likeRight": {},
                "like": {}
            },
            // 操作人图标方向
            icoToTop1: false,
            icoToBottom1: false,
            ico_flag1: true,
            // 批次号图标方向
            icoToTop2: false,
            icoToBottom2: false,
            ico_flag2: true,
            batchDetailFlag: false,
            selectData: [],
            reConfirmTarget: '',
            data: [], // 选择数组
            fileName: '',
            fileId: '',
            createdBy: '',
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
            }, // 分页
            isimportFile: false, // 新增单笔还款
            alert_detail: true, // 明细
            tetail_data: {}, // 传给明细的数据
            massage: ''
        };
    },
    methods: {
        // 代垫后本息维护文件导入
        advancedCorpInterestMaintenanceSave(res) {
            console.log(res);
            return new Promise((resolve, reject) => {
                res = res || {};
                let url = counterDealApi.advancedCorpInterestMaintenanceSave;
                this.$MyFetch.post(url, res)
                .then((data = {}) => {
                    if (data.success) {
                        resolve(data);
                    } else {
                        reject(data.msg);
                    }
                })
                .catch((err) => {
                    this.$error(err.message);
                });
            });
        },
        // 文件名字
        getFileName(data) {
            this.fileName = data;
        },
        // 文件id
        getFileId(data) {
            this.fileId = data;
        },
        // FileSaveFun
        FileSaveFun() {
            console.log(this.fileName, this.fileId);
            let _that = this;
            let CheckData = {
                file_id: _that.fileId,
                file_name: _that.fileName
            };
            _that.advancedCorpInterestMaintenanceSave(CheckData)
            .then((data) => {
                this.transRepayment();
            })
            .catch((err) => {
                this.fontHintMsg = err;
                this.fontHintFlag = true;
            });
        },
        // 批量罚息复利列表
        transRepayment(res = {"phase_no": this.phaseNoList, "flow_no": "advancedPrincipalInterestFlow"}, current = 1) {
            let url = counterDealApi.transRepayment + "?current=" + current + "&size=10";
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
        // 代垫本息维护功能删除(支持单笔/批量)
        batchRepaymentDeleteRepay(res) {
            var relatedId = [];
            relatedId.push(this.selectData.related_id);
            return new Promise((resolve, reject) => {
                this.$MyFetch.post(counterDealApi.batchRepaymentDeleteRepay, {relatedId: relatedId})
                .then((data = {}) => {
                    if (data.result) {
                        this.transRepayment();
                    }
                })
                .catch((err) => {
                    this.$error(err.message);
                    reject(err);
                });
            });
        },
        // 关闭文字提示组件
        fontHintClose() {
            this.fontHintFlag = false;
        },
        // 点击明细
        detail_alert(res) {
            this.tetail_data = res;
            this.batchDetailFlag = true;
        },
        // 新增
        openImportFile() {
            this.isimportFile = true;
        },
        // 新增
        add_alert() {
            this.alert_ = true;
        },
        jump(pageNum) { // 分页
            let queryData = {
                "related_id": this.related_id,
                "createdBy": this.createdBy,
                "beginDate": this.date_filter(this.dataValue)[0],
                "endDate": this.date_filter(this.dataValue)[1],
                "phase_no": this.phaseNoList,
                "flow_no": "advancedPrincipalInterestFlow"
            };
            this.transRepayment(queryData, pageNum);
        },
        deleteApi() {
            this.batchRepaymentDeleteRepay();
        },
        // 确认删除
        deleteReconfirmBackFun() {
            this.deleteReconfirmClose();
            switch (this.reConfirmTarget) {
                case "delete": this.deleteApi(); break;
                case "submit": this.submitApi(); break;
                case "back": this.backApi(); break;
                case "rember": this.remberApi(); break;
            }
        },
        // 取消删除
        deleteReconfirmClose() {
            this.deleteReconfirmFlag = false;
        },
        // 代垫本息维护功能提交
        submitApi() {
            var relatedId = [];
            relatedId.push(this.selectData.related_id);
            let queryData = {
                "flowNo": "advancedPrincipalInterestFlow",
                "relatedId": relatedId
            };
            this.submitReview(queryData)
            .then((data) => {
                this.$message.success("提交成功！");
                this.transRepayment();
            }).catch((err) => {
                this.$error(err);
            });
        },
        backApi() {
            var relatedId = [];
            relatedId.push(this.selectData.related_id);
            let queryData = {
                "flowNo": "advancedPrincipalInterestFlow",
                "relatedId": relatedId
            };
            this.reviewReturn(queryData)
            .then((data) => {
                this.$message.success("退回成功！");
                this.transRepayment();
            }).catch((err) => {
                this.$error(err);
            });
            this.deleteReconfirmClose();
        },
        // 退回
        reviewReturn(res) {
            return new Promise((resolve, reject) => {
                this.$MyFetch.post(counterDealApi.batchRepaymentReviewReturn, res)
                .then((data = {}) => {
                    resolve(data);
                })
                .catch((err) => {
                    reject(err.message);
                });
            });
        },
        // 删除按钮
        delete_fun() {
            if (this.selectData.length < 1) {
                this.$message("请选择数据进行删除！");
                return;
            }
            this.reConfirmTarget = 'delete';
            this.massage = '是否删除选中的申请？';
            this.deleteReconfirmFlag = true;
        },
        remberApi() {
            this.deleteReconfirmClose();
            var relatedId = [];
            relatedId.push(this.selectData.related_id);
            let queryData = {
                "flowNo": "advancedPrincipalInterestFlow",
                "relatedId": relatedId
            };
            this.PayInteFineAdjustAccount(queryData)
            .then((data) => {
                this.$message.success("记账成功！");
                this.transRepayment();
            }).catch((err) => {
                this.$error(err);
            });
        },
        // 记账
        PayInteFineAdjustAccount(res) {
            return new Promise((resolve, reject) => {
                this.$MyFetch.post(counterDealApi.batchRepaymentBookkeep, res)
                .then((data = {}) => {
                    resolve(data);
                })
                .catch((err) => {
                    reject(err.message);
                });
            });
        },
        // 提交按钮
        submit_fun() {
            if (this.selectData.length < 1) {
                this.$message("请选择数据进行提交！");
                return;
            }
            this.reConfirmTarget = 'submit';
            this.massage = '是否提交选中的申请？';
            this.deleteReconfirmFlag = true;
        },
        // 退回按钮
        back_fun() {
            if (this.selectData.length < 1) {
                this.$message("请选择数据进行退回！");
                return;
            }
            this.reConfirmTarget = 'back';
            this.massage = '是否退回选中的申请？';
            this.deleteReconfirmFlag = true;
        },
        // 记账按钮
        rember_fun() {
            if (this.selectData.length < 1) {
                this.$message("请选择数据进行记账！");
                return;
            }
            this.reConfirmTarget = 'rember';
            this.massage = '是否提交选中的申请？';
            this.deleteReconfirmFlag = true;
        },
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
                let dates = year + '-' + month + '-' + day;
                array.push(dates);
            });
            return array;
        },
         // 清空按钮
        empty() {
            this.related_id = '';
            this.should_repay_date = '';
            this.loanTransCreated_by = '';
            // 让查询数据清空
            this.searchData = {
                "phase_no": this.phaseNoList,
                "flow_no": "advancedPrincipalInterestFlow",
                "eq": {},
                "likeRight": {},
                "like": {}
            };
            this.searchData2 = {
                "phase_no": this.phaseNoList,
                "flow_no": "advancedPrincipalInterestFlow",
                "eq": {},
                "likeRight": {},
                "like": {}
            };
        },
        // 查询
        refer(val) {
            // 查询田间不为空
            if (this.searchNone()) {
                // 由于操作人key值带".",需要转换 -- 深拷贝
                this.searchData.phase_no = this.phaseNoList;
                let searchData = JSON.parse(JSON.stringify(this.searchData));
                searchData = this.loanTransCreated_filter(searchData);
                // 加上申请日期
                searchData['file.created_date'] = this.date_filter(this.should_repay_date);
                this.searchData2 = searchData;
                this.transRepayment(searchData);
            } else {
                this.confirmFn("请输入查询条件");
            }
        },
        // 查询为空判断
        searchNone() {
            if (this.related_id !== '') {
                return true;
            } else if (this.should_repay_date !== '') {
                return true;
            } else if (this.loanTransCreated_by !== '') {
                return true;
            } else {
                return false;
            }
        },
        // 查询条件操作人过滤
        loanTransCreated_filter(data) {
            for (const item in data) {
                for (const item2 in data[item]) {
                    // 如果这个对象里有当前的key值，把eq,like,likeright对象里的这个key值清空，再给对应的eq，like,likeright赋属性名
                    if (item2 === 'loanTransCreated_by') {
                        data[item]['file.created_by'] = data[item][item2];
                        delete data[item][item2];
                    }
                }
            }
            return data;
        },
        // 关闭引入文件
        closeImportFile() {
            this.isimportFile = false;
        },
        finiseImportFile() {
            this.isimportFile = false;
            this.fontHintMsg = '出账编号XXXX未找到调整数据出账编号XXXX未找到调整数据出账编号XXXX未找到调整数据';
            this.fontHintFlag = true;
        },
        // 关闭明细
        close_2() {
            this.alert_detail = false;
        },
        // 单笔还款复核提交（支持批量/单笔）
        submitReview(res) {
            return new Promise((resolve, reject) => {
                this.$MyFetch.post(counterDealApi.batchRepaymentSubmitReview, res)
                .then((data = {}) => {
                    resolve(data);
                })
                .catch((err) => {
                    reject(err.message);
                });
            });
        },
        clickSelectAll(selection, row) {
        if (selection.length > 0) {
            selection.splice(1, selection.length);
        }
        // 单选选中的数据
        // 删除提交的参数
        this.selectData = selection[0];
        },
        select(selection, row) {
            if (selection.length === 0) {
                this.selectData = null;
            } else if (selection.length === 1) {
                this.selectData = row;
            } else {
                selection.shift();
                this.rowCheck(row);
            }
        },
        rowCheck(row, column, e) {
            if (!this.selectData) {
                this.$refs.multipleTable.toggleRowSelection(row);
                this.selectData = row;
            } else if (this.selectData && row.related_id === this.selectData.related_id) {
                this.$refs.multipleTable.clearSelection();
                this.selectData = null;
            } else {
                this.$refs.multipleTable.clearSelection();
                this.$refs.multipleTable.toggleRowSelection(row);
                this.selectData = row;
            }
            // this.$refs.multipleTable.toggleRowSelection(row);
        },
        // 关闭明细
        clsoe_windowDetail() {
            this.batchDetailFlag = false;
        },
        // 选中
        selected_fun(type, value, selectRef, flag, icoBottom, icoTop) {
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
        }
    },
    components: {
        batchDetail, // 详情组件
        reconfirmHint, // 再次确认组件
        pagination, // 分页组件
        fontHint, // 文字提示组件
        importFile // 增加
    }
};
</script>
