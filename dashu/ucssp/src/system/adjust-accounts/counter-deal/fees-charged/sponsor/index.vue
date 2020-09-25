<template>
    <div class="sponsor">
        <button class="add button " @click="add_alert()">+ 新增</button>
        <!-- 查询这一行 -->
        <div class="serach_row">
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
            <!-- 申请人 -->
            <div class="demo-ruleForms">
                <input class="select_72" v-model="loanTransCreated_by" placeholder="申请人" @focus="open_select('icoToBottom1', 'icoToTop1', 'operateOrgidSelectRef', 'ico_flag1', 'loanTransCreated_by')" @blur="blur_select('icoToBottom1', 'icoToTop1', 'operateOrgidSelectRef', 'ico_flag1', 'loanTransCreated_by')"/>
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
                start-placeholder="申请日期"
                end-placeholder="申请日期">
            </el-date-picker>
            <el-button class="b_button query button " @click="refer(1)">查询</el-button>
            <el-button class="b_button empty button " @click="empty()">清空</el-button>
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
            @select="select"
            @row-click="rowCheck">
            <el-table-column
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
                label="申请人">
            </el-table-column>
                <el-table-column
                prop="created_date"
                label="申请时间">
                <template  slot-scope="scope">
                    <div>{{scope.row.created_date | date_filters}}</div>
                </template>
            </el-table-column>
            <el-table-column
                prop="phase_name"
                label="流程阶段">
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
                <el-button class="t_button import_file button " @click="import_file_fun">导入还款文件</el-button>
                <el-button class="t_button dead_t button " @click="delete_fun">删除</el-button>
                <el-button class="t_button initiate_t button " @click="submit_fun">提交</el-button>
            </div>
        </div>
        <!-- 新增单笔还款 -->
        <addPriorMatch v-if="alert_" @clsoe_windowAlert='close_1' @reload='reload'></addPriorMatch>
        <!-- 导入文件 -->
        <upload v-if="uploadBox" @close="closeUpload" @getFileId='getFileId' @getFileName='getFileName' @FileSaveFun='FileSaveFun'></upload>
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
import addPriorMatch from "../sponsor/addPriorMatch/"; // 新增单笔还款
import upload from './upload/index.vue'; // 导入文件
import sponsorDetail from "../sponsor/sponsor-detail/"; // 发起-明细
import pagination from "@components/pagination"; // 分页条
import { counterDealApi } from "@/system/adjust-accounts/counter-deal/js/server"; // 接口
export default {
    name: "fees-charged-sponsor",
    data() {
        return {
            related_id: '', // 批次号
            should_repay_date: '', // 申请日期
            loanTransCreated_by: '', // 申请人
            // 查询数据
            searchData: {
                "phase_no": "0010",
                "flow_no": "feeFlow",
                "eq": {},
                "likeRight": {},
                "like": {}
            },
            // 最终的查询的查询数据，为了不影响搜索下拉框的功能
            searchData2: {
                "phase_no": "0010",
                "flow_no": "feeFlow",
                "eq": {},
                "likeRight": {},
                "like": {}
            },
            // 申请人图标方向
            icoToTop1: false,
            icoToBottom1: false,
            ico_flag1: true,
            // 出账编号图标方向
            icoToTop2: false,
            icoToBottom2: false,
            ico_flag2: true,
            for_: [], // 渲染数据列表
            deleteSubmitData: null, // 删除提交接口参数
            fileId: "", // fileId
            fileName: "", // fileName
            pageConfig: {
                account: 5, // 总条数
                pageSize: 5, // 当前多少条数据
                currentPage: 1, // 当前页
                showJumpButton: true // 显示跳转按钮
            }, // 分页
            alert_: false, // 新增单笔还款
            uploadBox: false, // 导入文件 显示开关
            alert_detail: false, // 明细
            tetail_data: '123', // 传给明细的数据
            submit_hint: false, // 是否提交提示
            delete_hint: false // 是否提交提示
        };
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
    methods: {
        // 一般还款查询总单接口
        transRepayment(res, current) {
            res = res || {
                "phase_no": "0010",
                "flow_no": "feeFlow"
            };
            current = current || 1;
            let url = counterDealApi.transRepayment + "?current=" + current + "&size=10";
            console.log(url, 'url');
            this.$MyFetch.post(url, res)
            .then((data = {}) => {
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
        batchRepaymentDeleteRepay(res) {
            return new Promise((resolve, reject) => {
                this.$MyFetch.post(counterDealApi.batchRepaymentDeleteRepay, res)
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
        // 单笔还款提交（支持批量/单笔)
        batchRepaymentSubmitReview(res) {
            return new Promise((resolve, reject) => {
                this.$MyFetch.post(counterDealApi.batchRepaymentSubmitReview, res)
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
        // 文件下载保存
        partnerFeeFileSave(res) {
            return new Promise((resolve, reject) => {
                this.$MyFetch.post(counterDealApi.partnerFeeFileSave, res, {timeout: 120000})
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
        // 刷新页面
        reload() {
            let data = this.searchData2;
            let current = this.pageConfig.currentPage;
            this.deleteSubmitData = null;
            this.transRepayment(data, current);
        },
        // 关闭文件导入
        closeUpload () {
            this.uploadBox = false;
        },
        // 文件名字
        getFileName(data) {
            this.fileName = data;
            console.log(data, "filename");
        },
        // 文件id
        getFileId(data) {
            console.log(data, "fineId");
            this.fileId = data;
        },
        // FileSaveFun
        FileSaveFun() {
            let _that = this;
            let queryData = {
                file_name: this.fileName,
                file_id: this.fileId,
                related_id: this.deleteSubmitData.related_id
            };
            this.partnerFeeFileSave(queryData)
                .then((data) => {
                   _that.reload();
                })
                .catch((err) => {
                    this.$error(err);
                });
        },
        // 关闭提交提示窗口
        sumit_close() {
            this.submit_hint = false;
        },
        // 取消提示窗口
        cancel_submit_fn() {
            this.submit_hint = false;
        },
        // 确认提交窗口
        affirm_submit_fun() {
            this.submit_hint = false;
            let submitData = {
                relatedId: [this.deleteSubmitData.related_id],
                "flowNo": "feeFlow"
            };
            console.log(submitData);
            // 单笔还款提交复核接口方法
            this.batchRepaymentSubmitReview(submitData)
                .then((res) => {
                    this.reload();
                })
                .catch((err) => {
                    console.log(err);
                });
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
            // 调用删除接口
            let deleteData = {
                relatedId: [this.deleteSubmitData.related_id]
            };
            console.log(deleteData);
            this.batchRepaymentDeleteRepay(deleteData)
                .then((data) => {
                    console.log("刷新");
                    this.reload();
                })
                .catch((err) => {
                    console.log(err);
                });
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
        clickSelectAll(selection, row) {
            if (selection.length > 0) {
                selection.splice(1, selection.length);
            }
            // 单选选中的数据
            // 删除提交的参数
            this.deleteSubmitData = selection[0];
            console.log(this.deleteSubmitData);
        },
        select(selection, row) {
          if (selection.length === 0) {
                this.deleteSubmitData = null;
            } else if (selection.length === 1) {
                this.deleteSubmitData = row;
            } else {
                selection.shift();
                this.rowCheck(row);
            }
        },
        rowCheck(row, column, e) {
          if (!this.deleteSubmitData) {
            this.$refs.multipleTable.toggleRowSelection(row);
            this.deleteSubmitData = row;
          } else if (this.deleteSubmitData && row.related_id === this.deleteSubmitData.related_id) {
            this.$refs.multipleTable.clearSelection();
            this.deleteSubmitData = null;
          } else {
            this.$refs.multipleTable.clearSelection();
            this.$refs.multipleTable.toggleRowSelection(row);
            this.deleteSubmitData = row;
          }
        },
        jump(pageNum) { // 分页
            this.pageConfig.currentPage = pageNum;
            this.transRepayment(this.searchData2, this.pageConfig.currentPage);
            console.log(this.pageConfig.pageSize, this.searchData2);
        },
        // 导入文件按钮
        import_file_fun() {
            console.log(Boolean(this.deleteSubmitData), this.deleteSubmitData);
            if (!this.deleteSubmitData) {
                this.$message("请选择一条数据");
            } else {
                 if (this.deleteSubmitData.file_name !== null || this.deleteSubmitData.file_name) {
                    this.$message("您已导入过文件，不能重复导入！");
                } else {
                    this.uploadBox = true;
                }
            }
        },
        // 删除按钮
        delete_fun() {
            if (!this.deleteSubmitData) {
                this.$message("请选择一条数据");
            } else {
                this.delete_hint = true;
            }
        },
        // 提交按钮
        submit_fun() {
            console.log('提交', this.deleteSubmitData);
            if (!(this.deleteSubmitData)) {
                this.$message("请选择一条数据");
            } else {
                if (this.deleteSubmitData.file_name !== null || this.deleteSubmitData.file_name) {
                    this.submit_hint = true;
                } else {
                    this.$message("请导入还款文件");
                }
            }
        },
        // 毫秒数转成时间
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
        // 查询条件申请人过滤
        loanTransCreated_filter(data) {
            // console.log(data);
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
        // 查询按钮
        refer() {
            // 由于申请人key值带".",需要转换 -- 深拷贝
            let searchData = JSON.parse(JSON.stringify(this.searchData));
            searchData = this.loanTransCreated_filter(searchData);
            // 加上申请日期
            searchData['file.created_date'] = this.date_filter(this.should_repay_date);
            console.log(searchData, 'searchdata---');
            this.searchData2 = searchData;
            this.transRepayment(searchData);
        },
        // 清空按钮
        empty() {
            this.related_id = '';
            this.should_repay_date = '';
            this.loanTransCreated_by = '';
            // 让查询数据清空
            this.searchData = {
                "phase_no": "0010",
                "flow_no": "feeFlow",
                "eq": {},
                "likeRight": {},
                "like": {}
            };
            this.searchData2 = {
                "phase_no": "0010",
                "flow_no": "feeFlow",
                "eq": {},
                "likeRight": {},
                "like": {}
            };
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
        upload // 导入文件
    }
};
</script>
<style lang="less" scoped>
// 去掉element表格的默认全选按钮
/deep/ th .el-checkbox {
      display: none;
}
</style>
