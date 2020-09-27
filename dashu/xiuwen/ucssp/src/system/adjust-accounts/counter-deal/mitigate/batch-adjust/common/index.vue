<style lang="less" scoped>
.batch-adjust-sponsor{
    position: relative;
    width: 100%;
    min-height: 820px;
    // .page_box {
    //     position: absolute;
    //     bottom: 100px;
    //     right: 31px;
    // }
    .enable{
        // position: absolute;
        // width: 100%;
        // bottom: 40px;
        // left: 0;
        // text-align: center;
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
            <el-input class="select_72" v-model="batchNo" placeholder="批次号" clearable></el-input>
            <el-input class="select_72" v-model="createdBy" placeholder="操作人" clearable></el-input>
            <el-date-picker style="vertical-align:top;" v-model="dataValue" type="daterange" start-placeholder="操作日期" end-placeholder="操作日期" :default-time="['00:00:00', '23:59:59']"></el-date-picker>
            <div class="referEmptyDiv"><el-button class="b_button query button" @click="refer(1)">查询</el-button></div>
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
            @select-all="clickSelectAll"
            @row-click="rowCheck"
            @select="select">
            <el-table-column
                v-if="name!='accomplish'"
                type="selection">
            </el-table-column>
            <el-table-column
                prop="batchNo"
                label="批次号">
            </el-table-column>
            <el-table-column
                prop="fileName"
                label="文件名称">
            </el-table-column>
                <el-table-column
                prop="createdBy"
                label="操作人">
            </el-table-column>
            <el-table-column
                prop="operateDate"
                label="操作时间">
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
            <el-button v-if="name=='sponsor'" class="t_button upload_t button background_05838E" @click="openImportFile">导入还款文件</el-button>
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
    </div>
</template>
<script type="text/ecmascript-6">
import importFile from "./importFile"; // 新增
import reconfirmHint from "@/system/adjust-accounts/counter-deal/components/reconfirm-hint"; // 再次确认组件
import pagination from "@components/pagination"; // 分页组件
import { counterDealApi } from "@/system/adjust-accounts/counter-deal/js/server"; // 接口
import fontHint from "@/system/adjust-accounts/counter-deal/components/font-hint"; // 文字提示组件

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
                case "sponsor": phaseNo = ["0010", "0050"]; break;
                case "reCheck": phaseNo = ["0020"]; break;
                case "accomplish": phaseNo = ["1000"]; break;
            }
            return phaseNo;
        }
    },
    mounted() {
        this.refer();
    },
    data() {
        return {
            selectData: [],
            reConfirmTarget: '',
            data: [], // 选择数组
            fileName: '',
            fileId: '',
            batchNo: '',
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
        // 批量罚息复利导入校验
        batchPayInteFineAdjustCheck(res) {
            return new Promise((resolve, reject) => {
                res = res || {};
                let url = counterDealApi.batchPayInteFineAdjustCheck;
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
        // 批量罚息复利导入
        batchPayInteFineAdjustImport(res) {
            return new Promise((resolve, reject) => {
                res = res || {};
                let url = counterDealApi.batchPayInteFineAdjustImport;
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
                fileId: _that.fileId,
                fileName: _that.fileName
            };
            _that.batchPayInteFineAdjustCheck(CheckData)
            .then((data) => {
                let ImportData = {
                    fileId: _that.fileId,
                    fileName: _that.fileName,
                    flowNo: "batchInteFineFlow"
                };
                _that.batchPayInteFineAdjustImport(ImportData)
                .then((data) => {
                    _that.refer();
                })
                .catch((err) => {
                    _that.fontHintMsg = err;
                    _that.fontHintFlag = true;
                });
            })
            .catch((err) => {
                this.fontHintMsg = err;
                this.fontHintFlag = true;
            });
        },
        // 批量罚息复利列表
        batchQueryPayInteFineAdjustList(res = {"phaseNoList": this.phaseNoList, "flowNo": "batchInteFineFlow"}, current = 1) {
            let url = counterDealApi.batchQueryPayInteFineAdjustList + "?current=" + current + "&size=10";
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
        // 一般还款总单删除(支持单笔/批量)
        batchRepaymentDeleteRepay(res) {
            var relatedId = [];
            relatedId.push(this.selectData.batchNo);
            return new Promise((resolve, reject) => {
                this.$MyFetch.post(counterDealApi.batchRepaymentDeleteRepay, {relatedId: relatedId})
                .then((data = {}) => {
                    if (data.result) {
                        this.batchQueryPayInteFineAdjustList();
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
            let routerBefore = '/system/adjust-accounts/counter-deal/mitigate/batch-adjust';
            var pathRouter = '';
            if (this.$route.path === routerBefore + '/re-check') {
                pathRouter = routerBefore + '/re-check-detail';
            } else if (this.$route.path === routerBefore + '/sponsor') {
                pathRouter = routerBefore + '/sponsor-detail';
            } else if (this.$route.path === routerBefore + '/accomplish') {
                pathRouter = routerBefore + '/accomplish-detail';
            }
            this.$router.push({path: pathRouter, query: {'res': res}});
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
                "batchNo": this.batchNo,
                "createdBy": this.createdBy,
                "beginDate": this.date_filter(this.dataValue)[0],
                "endDate": this.date_filter(this.dataValue)[1],
                "phaseNoList": this.phaseNoList,
                "flowNo": "batchInteFineFlow"
            };
            this.batchQueryPayInteFineAdjustList(queryData, pageNum);
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
        submitApi() {
            var objectNoList = [];
            objectNoList.push(this.selectData.batchNo);
            let queryData = {
                "flowNo": "batchInteFineFlow",
                "objectNoList": objectNoList
            };
            this.submitReview(queryData)
            .then((data) => {
                this.$message.success("提交成功！");
                this.refer();
            }).catch((err) => {
                this.$error(err);
            });
        },
        backApi() {
            var objectNoList = [];
            objectNoList.push(this.selectData.batchNo);
            let queryData = {
                "flowNo": "batchInteFineFlow",
                "objectNoList": objectNoList
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
            let queryData = {
                "flowNo": "batchInteFineFlow",
                "batchNo": this.selectData.batchNo
            };
            this.PayInteFineAdjustAccount(queryData)
            .then((data) => {
                this.$message.success("记账成功！");
                this.refer();
            }).catch((err) => {
                this.$error(err);
            });
        },
        // 记账
        PayInteFineAdjustAccount(res) {
            return new Promise((resolve, reject) => {
                this.$MyFetch.post(counterDealApi.batchPayInteFineAdjustAccount, res)
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
            this.batchNo = '';
            this.createdBy = '';
            this.dataValue = '';
        },
        // 查询
        refer(val) {
            let queryData = {
                "batchNo": this.batchNo,
                "createdBy": this.createdBy,
                "beginDate": this.date_filter(this.dataValue)[0],
                "endDate": this.date_filter(this.dataValue)[1],
                "phaseNoList": this.phaseNoList,
                "flowNo": "batchInteFineFlow"
            };
            if (val === 1) {
                if (this.batchNo || this.createdBy || this.date_filter(this.dataValue)[0] || this.date_filter(this.dataValue)[1]) {
                    this.batchQueryPayInteFineAdjustList(queryData);
                } else {
                    this.for_ = [];
                }
            } else {
                this.batchQueryPayInteFineAdjustList(queryData);
            };
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
                this.$MyFetch.post(counterDealApi.submitReview, res)
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
            } else if (this.selectData && row.batchNo === this.selectData.batchNo) {
                this.$refs.multipleTable.clearSelection();
                this.selectData = null;
            } else {
                this.$refs.multipleTable.clearSelection();
                this.$refs.multipleTable.toggleRowSelection(row);
                this.selectData = row;
            }
            // this.$refs.multipleTable.toggleRowSelection(row);
        }
    },
    components: {
        reconfirmHint, // 再次确认组件
        pagination, // 分页组件
        fontHint, // 文字提示组件
        importFile // 增加
    }
};
</script>
