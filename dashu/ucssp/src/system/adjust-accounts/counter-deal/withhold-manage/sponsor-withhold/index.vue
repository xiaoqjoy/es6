<template>
  <div>
    <div class="content" v-loading="loadingFlag">
      <!-- 输入框和下拉框 -->
      <div class="b_content">
         <!-- 批次号 -->
        <el-input class="select_72" v-model="loanNo" placeholder="批次号"></el-input>
        <div class="referEmptyDiv"><el-button class="b_button query button" @click="refer">查询</el-button></div>
        <div class="referEmptyDiv"><el-button class="b_button empty button" @click="empty">清空</el-button></div>
      </div>
      <!-- 带全选的表格 -->
        <div class="table_box">
            <el-table
            :default-sort = "{prop: 'date', order: 'descending'}"
            :header-cell-style="{'font-size':'12px','text-align':'center','height':'38.9px','background':'#ececec'}"
            ref="multipleTable"
            max-height="620"
            :data="for_"
            tooltip-effect="dark"
            style="width: 100%; border: 1px solid #E9E9E9;"
            @select-all="clickSelectAll"
            @row-click="rowCheck"
            @select="select">
            <el-table-column
                type="selection">
            </el-table-column>
            <el-table-column
                prop="batchNo"
                width="200"
                label="批次号">
            </el-table-column>
            <el-table-column
                prop="fileName"
                width="200"
                label="文件名称">
                <template slot-scope="scope">
                    <el-popover trigger="hover" placement="top" v-if="scope.row.fileName">
                        <p class="ellipsis">
                            {{scope.row.fileName}}
                        </p>
                        <div slot="reference">
                            <p class="yincan ellipsis">
                            {{scope.row.fileName}}
                            </p>
                        </div>
                    </el-popover>
                </template>
            </el-table-column>
            <el-table-column
                prop="createdBy"
                label="登记人">
            </el-table-column>
            <el-table-column
                prop="createdDate"
                label="登记时间">
            </el-table-column>
            <el-table-column
                prop="flowName"
                label="流程名称">
            </el-table-column>
            <el-table-column
                    fixed="right"
                    label="操作">
                    <template slot-scope="scope">
                        <el-button  type="text" size="small" @click="alter_alert(scope.row)">扣款</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
      <!-- 分页 -->
      <pagination @jump-page="jump" :page="pageConfig" class="pagination"></pagination>
      <!-- 底部 -->
      <div class="enable">
        <el-button class="t_button upload_t button" @click="delete_fun">删除</el-button>
        <el-button class="t_button initiate_t button" @click="import_file_fun">导入</el-button>
      </div>
      <!-- 导入文件 -->
      <upload v-if="uploadBox" @close="closeUpload" @getFileId='getFileId' @getFileName='getFileName' @FileSaveFun='FileSaveFun'></upload>
      <!-- 文字提示组件 -->
    <fontHint v-if="fontHintFlag" :massage="fontHintMsg" @close="fontHintClose"></fontHint>
    <!-- 再次确认组件 -- 扣款 -->
    <reconfirmHint v-if="reconfirmFlag" massage="是否确认扣款？" @close="reconfirmClose" @backFun="reconfirmBackFun"></reconfirmHint>
    <!-- 再次确认组件 -- 删除 -->
    <reconfirmHint v-if="deleteFlag" massage="是删除选中的申请？" @close="deleteClose" @backFun="deleteBackFun"></reconfirmHint>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import { counterDealApi } from "@/system/adjust-accounts/counter-deal/js/server"; // 接口
import pagination from "@components/pagination"; // 分页组件
import upload from './upload/index.vue'; // 导入文件
import fontHint from "@/system/adjust-accounts/counter-deal/components/font-hint"; // 文字提示组件
import reconfirmHint from "@/system/adjust-accounts/counter-deal/components/reconfirm-hint"; // 再次确认组件
export default {
  name: 'channel-alter',
  data() {
    return {
      deleteFlag: false,
      deleteData: null,
      loadingFlag: false,
      rowData: null,
      reconfirmFlag: false, // 再次确认组件开关
      fontHintFlag: false, // 文字提示开关
      fontHintMsg: '', // 文字提示内容
      loanNo: "", // 出账编号
      customerName: "", // 客户姓名
      certNo: "", // 身份证号码
      pageConfig: {
        account: 0, // 总条数
        pageSize: 30, // 当前多少条数据
        currentPage: 1, // 当前页
        showJumpButton: true // 显示跳转按钮
      }, // 分页
      for_: [], // 渲染列表
      uploadBox: false, // 导入文件开关
      submit_hint: false, // 提交开关
      delete_hint: false // 删除开关
    };
  },
  mounted() {
        this.deductManagementBatchDeductList();
  },
  methods: {
    select(selection, row) {
        if (selection.length === 0) {
                this.deleteData = '';
            } else if (selection.length === 1) {
                this.deleteData = row.batchNo;
            } else {
                selection.shift();
                this.rowCheck(row);
            }
    },
    rowCheck(row, column, e) {
      if (!this.deleteData) {
        this.$refs.multipleTable.toggleRowSelection(row);
        this.deleteData = row.batchNo;
      } else if (this.deleteData && row.batchNo === this.deleteData.batchNo) {
        this.$refs.multipleTable.clearSelection();
        this.deleteData = '';
      } else {
        this.$refs.multipleTable.clearSelection();
        this.$refs.multipleTable.toggleRowSelection(row);
        this.deleteData = row.batchNo;
      }
    },
    clickSelectAll(selection, row) {
        if (selection.length > 0) {
            selection.splice(1, selection.length);
        }
        // 单选选中的数据
        this.deleteData = selection[0].batchNo;
    },
    // 关闭文字提示组件
    fontHintClose() {
      this.fontHintFlag = false;
    },
    // 关闭再次确认组件
    reconfirmClose() {
      this.reconfirmFlag = false;
    },
    deleteClose() {
        this.deleteFlag = false;
    },
    deleteBackFun() {
        this.deleteClose();
        let queryData = {
            batchNo: this.deleteData
        };
        this.deductManagementBatchDeductDelete(queryData)
        .then((data) => {
            this.$message.success(data.msg);
            this.reload();
        })
        .catch((err) => {
            this.$error(err);
        });
    },
    // 再次确认组件点击确定执行函数
    reconfirmBackFun() {
        this.loadingFlag = true;
        this.reconfirmClose();
         let queryData = {
            batchNo: this.rowData.batchNo,
            flowNo: "deductFlow"
        };
        this.deductManagementBatchDeductPayment(queryData)
        .then((data) => {
            this.loadingFlag = false;
            this.$message.success(data.msg);
            this.reload();
        })
        .catch((err) => {
            this.loadingFlag = false;
            this.$error(err);
        });
    },
    // 查询按钮
    refer() {
        if (!(this.loanNo || this.customerName || this.certNo)) {
            this.$message("请输入查询条件!");
        } else {
            this.reload();
        }
    },
    // 清空按钮
    empty() {
        this.loanNo = ''; // 出账编号
        this.customerName = ''; // 客户姓名
        this.certNo = ''; // 身份证号码
    },
    // 扣款
    alter_alert(rowData) {
        this.reconfirmFlag = true;
        this.rowData = rowData;
    },
    // reload
    reload(pageNum) {
        this.deleteData = '';
        let data = {
            batchNo: this.loanNo,
            flowNo: "deductFlow",
            phaseNo: "0010"
        };
        let current = pageNum || 1;
        this.deductManagementBatchDeductList(data, current);
    },
    // 批量扣款列表
    deductManagementBatchDeductList(res, current) {
        res = res || {
            flowNo: "deductFlow",
            phaseNo: "0010"
        };
        current = current || 1;
        let url = counterDealApi.deductManagementBatchDeductList + "?current=" + current + "&size=30";
        this.$MyFetch.post(url, res)
        .then((data = {}) => {
            if (data.records.length < 1) {
              this.fontHintMsg = '查询结果为空'; // 文字提示内容
              this.fontHintFlag = true; // 文字提示开关
            };
            this.for_ = data.records;
            // 总条数
            this.pageConfig.account = data.total || 1;
            // 当前页
            this.pageConfig.currentPage = data.current || 1;
            // 一页有几条数据 pageSize
            this.pageConfig.pageSize = data.size || 30;
        })
        .catch((err) => {
            this.$error(err.message);
        });
    },
    // 扣款
    deductManagementBatchDeductPayment(res) {
       return new Promise((resolve, reject) => {
            res = res || {};
            let url = counterDealApi.deductManagementBatchDeductPayment;
            this.$MyFetch.post(url, res)
            .then((data = {}) => {
                resolve(data);
            })
            .catch((err) => {
                reject(err.message);
            });
       });
    },
    // 删除
    deductManagementBatchDeductDelete(res) {
       return new Promise((resolve, reject) => {
            res = res || {};
            let url = counterDealApi.deductManagementBatchDeductDelete;
            this.$MyFetch.post(url, res)
            .then((data = {}) => {
                resolve(data);
            })
            .catch((err) => {
                reject(err.message);
            });
       });
    },
    // 批量代偿发起文件校验
    deductManagementBatchCheckExcelDeduct(res) {
       return new Promise((resolve, reject) => {
            res = res || {};
            let url = counterDealApi.deductManagementBatchCheckExcelDeduct;
            this.$MyFetch.post(url, res, {timeout: 120000})
            .then((data = {}) => {
                resolve(data);
            })
            .catch((err) => {
                reject(err.message);
            });
       });
    },
    // 批量代偿发起文件保存
    deductManagementBatchDeductFileSave(res) {
       return new Promise((resolve, reject) => {
            res = res || {};
            let url = counterDealApi.deductManagementBatchDeductFileSave;
            this.$MyFetch.post(url, res, {timeout: 120000})
            .then((data = {}) => {
                resolve(data);
            })
            .catch((err) => {
                reject(err.message);
            });
       });
    },
    // 分页
    jump(pageNum) {
      this.pageConfig.currentPage = pageNum;
      this.reload(pageNum);
    },
    // 关闭文件导入
    closeUpload () {
        this.uploadBox = false;
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
        let _that = this;
        _that.loadingFlag = true;
        let queryData = {
            fileName: _that.fileName,
            fileId: _that.fileId
        };
        _that.deductManagementBatchCheckExcelDeduct(queryData)
            .then((data) => { // 文件不存在，保存
                if (!data.success) {
                    _that.loadingFlag = false;
                    _that.fontHintMsg = data.msg;
                    _that.fontHintFlag = true;
                } else {
                    let saveData = {
                        fileId: _that.fileId,
                        fileName: _that.fileName,
                        flowNo: 'deductFlow'
                    };
                    _that.deductManagementBatchDeductFileSave(saveData)
                    .then((data) => {
                        _that.reload();
                        _that.loadingFlag = false;
                        _that.fontHintMsg = data.msg;
                        _that.fontHintFlag = true;
                    })
                     .catch((err) => {
                        _that.loadingFlag = false;
                        this.$error(err);
                    });
                }
            })
            .catch((err) => {
                this.loadingFlag = false;
                this.$error(err);
            });
    },
    // 删除按钮
    delete_fun() {
        if (!this.deleteData) {
            this.$message("请选择一调数据！");
        } else {
            this.deleteFlag = true;
        }
    },
    // 导入文件按钮
    import_file_fun() {
        this.uploadBox = true;
    }
  },
  components: {
    pagination, // 分页组件
    reconfirmHint, // 再次确认组件
    fontHint, // 文字提示组件
    upload // 导入文件
  },
  created() {}
};
</script>

<style lang="less" scoped>
// 去掉element表格的默认全选按钮
/deep/ th .el-checkbox {
      display: none;
}
.referEmptyDiv {
    display: inline-block;
    margin-bottom: 20px;
    margin-left: 20px;
}
.table_box {
    height: 620px;
}
</style>
