<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-07-03 16:20:54
 * @LastEditTime: 2019-08-19 16:26:19
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div>
    <div class="content">
      <!-- 新增按钮 -->
      <button class="add  button" @click="add_alert()">+ 新增</button>
      <!-- 输入框和下拉框 -->
      <div class="b_content">
        <el-input class="select_72" v-model="loanNo" placeholder="出账编号" clearable></el-input>
        <el-input class="select_72" v-model="customerName" placeholder="客户姓名" clearable></el-input>
        <el-input class="select_72" v-model="lineidName" placeholder="合作机构" clearable></el-input>
        <el-input class="select_72" v-model="certNo" placeholder="身份证号码" clearable></el-input>
        <el-button class="b_button query button" @click="refer">查询</el-button>
        <el-button class="b_button empty button" @click="empty">清空</el-button>
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
            @selection-change="handleSelectionChange"
            @row-click="rowCheck">
            <el-table-column
                type="selection">
            </el-table-column>
            <el-table-column
                prop="loanNo"
                width="180"
                label="出账编号">
            </el-table-column>
            <el-table-column
                prop="customerName"
                width="110"
                label="客户姓名">
            </el-table-column>
            <!-- <el-table-column
                prop="certNo"
                label="身份证号码">
                <template  slot-scope="scope">
                    <div>{{scope.row.certNo | certificateNum}}</div>
                </template>
            </el-table-column> -->
            <el-table-column
                prop="inputDate"
                width="110"
                label="存款日期">
            </el-table-column>
            <el-table-column
                prop="accDate"
                width="110"
                label="记账日期">
            </el-table-column>
            <el-table-column
                prop="operatorName"
                width="110"
                label="转账人姓名">
            </el-table-column>
            <el-table-column
                prop="lineidName"
                label="合作机构">
            </el-table-column>
            <el-table-column
                prop="inputAmount"
                label="存款金额">
            </el-table-column>
            <el-table-column
                prop="transChannelName"
                width="200"
                label="扣款渠道">
                <template slot-scope="scope">
                    <el-popover trigger="hover" placement="top" v-if="scope.row.transChannelName">
                        <p class="ellipsis">
                            {{scope.row.transChannelName}}
                        </p>
                        <div slot="reference">
                            <p class="yincan ellipsis">
                            {{scope.row.transChannelName}}
                            </p>
                        </div>
                    </el-popover>
                </template>
            </el-table-column>
            <el-table-column
                prop="phaseName"
                fixed="right"
                label="案件状态">
            </el-table-column>
            </el-table>
        </div>
      <!-- 分页 -->
      <pagination @jump-page="jump" :page="pageConfig" class="pagination"></pagination>
      <!-- 底部 -->
      <div class="enable">
        <el-button class="t_button upload_t button" @click="import_file_fun">批量导入</el-button>
        <el-button class="t_button dead_t button" @click="delete_fun">删除</el-button>
        <el-button class="t_button initiate_t button" @click="submit_fun">提交</el-button>
      </div>
      <!-- 新增单笔还款 -->
      <addPriorMatch v-if="alert_" @clsoe_windowAlert='close_1' @reload='reload'></addPriorMatch>
      <!-- 导入文件 -->
      <upload v-if="uploadBox" @close="closeUpload" @getFileId='getFileId' @getFileName='getFileName' @FileSaveFun='FileSaveFun'></upload>
      <!-- 文字提示组件 -->
      <fontHint v-if="fontHintFlag" :massage="fontHintMsg" @close="fontHintClose"></fontHint>
      <!-- 提示窗 == 提交 -->
      <div class="hint" v-if="submit_hint">
          <div class="import-message">
              <div class="dialog-mask"></div>
              <div class="dialog-box">
                  <div class="dialog-msgbox__top">
                  <span class="el-icon-close button button__close" @click="sumit_close"></span>
                  </div>
                  <div class="text-center">是否确认提交选中的申请？</div>
                    <div class="affirm_select">
                      <el-button class="t_button cancel_t button" @click="cancel_submit_fn">取消</el-button>
                      <el-button class="t_button affirm_t button" @click="affirm_submit_fun">确认</el-button>
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
                  <div class="text-center">是否确认删除选中的申请？</div>
                    <div class="affirm_select">
                      <el-button class="t_button cancel_t button" @click="cancel_delete_fn">取消</el-button>
                      <el-button class="t_button affirm_t button" @click="affirm_delete_fun">确认</el-button>
                  </div>
              </div>
          </div>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import pagination from "@components/pagination"; // 分页组件
import addPriorMatch from "../apply-for-withdraw/addPriorMatch/"; // 新增单笔还款
import upload from './upload/index.vue'; // 导入文件
import { counterDealApi } from "@/system/adjust-accounts/counter-deal/js/server"; // 接口
import fontHint from "@/system/adjust-accounts/counter-deal/components/font-hint"; // 文字提示组件
export default {
  data() {
    return {
      fontHintFlag: false, // 文字提示开关
      fontHintMsg: '', // 文字提示内容
      loanNo: "", // 出账编号
      customerName: "", // 客户姓名
      lineidName: "", // 合作机构
      certNo: "", // 身份证号码
      pageConfig: {
        account: 0, // 总条数
        pageSize: 50, // 当前多少条数据
        currentPage: 1, // 当前页
        showJumpButton: true // 显示跳转按钮
      }, // 分页
      for_: [], // 渲染列表
      transSerialNos: [], // 删除接口参数
      alert_: false, // 新增单笔还款
      uploadBox: false, // 导入文件开关
      submit_hint: false, // 提交开关
      delete_hint: false // 删除开关
    };
  },
  mounted() {
      this.BuybackRecoverInfos();
  },
  methods: {
    // 关闭文字提示组件
    fontHintClose() {
      this.fontHintFlag = false;
    },
    // 查询按钮
    refer() {
        this.reload();
    },
    // 清空按钮
    empty() {
        this.loanNo = ''; // 出账编号
        this.customerName = ''; // 客户姓名
        this.lineidName = ''; // 合作机构
        this.certNo = ''; // 身份证号码
    },
    // reload
    reload(pageNum) {
        let data = {
            flowNo: 'payBuyBackFlow',
            phaseNos: ['0010', "0050"],
            loanNo: this.loanNo,
            customerName: this.customerName,
            lineidName: this.lineidName,
            certNo: this.certNo
        };
        let current = pageNum || 1;
        this.BuybackRecoverInfos(data, current);
    },
    // 代偿申请查询列表接口
    BuybackRecoverInfos(res, current) {
        res = res || {
            "flowNo": "payBuyBackFlow",
            "phaseNos": ["0010", "0050"]
        };
        current = current || 1;
        let url = counterDealApi.BuybackRecoverInfos + "?current=" + current + "&size=50";
        console.log(url, 'url');
        this.$MyFetch.post(url, res, {timeout: 120000})
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
    // 代偿（发起，减免，收回）-删除
     buyBackDelete(res) {
       return new Promise((resolve, reject) => {
            res = res || {};
            let url = counterDealApi.buyBackDelete;
            this.$MyFetch.post(url, res)
            .then((data = {}) => {
                console.log(data);
                resolve(data);
            })
            .catch((err) => {
                reject(err.message);
            });
       });
    },
    // 代偿发起-提交
     buyBackSubmitToFinancialAudit(res) {
       return new Promise((resolve, reject) => {
            res = res || {};
            let url = counterDealApi.buyBackSubmitToFinancialAudit;
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
     CheckBuybackFile(res) {
       return new Promise((resolve, reject) => {
            res = res || {};
            let url = counterDealApi.CheckBuybackFile;
            this.$MyFetch.post(url, res, {timeout: 120000})
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
    // 批量代偿发起文件保存
     CheckBuybackFileSave(res) {
       return new Promise((resolve, reject) => {
            res = res || {};
            let url = counterDealApi.CheckBuybackFileSave;
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
    // 选中复选框事件
    handleSelectionChange(data) {
        // 清空删除的参数
        this.transSerialNos = [];
        data.forEach(element => {
            this.transSerialNos.push(element.relateId);
        });
    },
    // 行选中
    rowCheck(row, column, e) {
      this.$refs.multipleTable.toggleRowSelection(row);
    },
    // 新增
    add_alert() {
        this.alert_ = true;
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
            fileId: _that.fileId,
            fileName: _that.fileName,
            fileType: 'payBuyBack'
        };
        _that.CheckBuybackFile(queryData)
            .then((data) => { // 文件不存在，保存
                let saveData = {
                    fileId: _that.fileId,
                    fileName: _that.fileName,
                    fileType: 'payBuyBack',
                    flowNo: 'payBuyBackFlow'
                };
                _that.CheckBuybackFileSave(saveData)
                .then((data) => {
                    _that.reload();
                })
                .catch((err) => {
                    _that.$error(err);
                });
            })
            .catch((err) => {
                this.fontHintMsg = err;
                this.fontHintFlag = true;
            });
    },
    // 关闭新增组件
    close_1() {
    this.alert_ = false;
    },
    // 导入文件按钮
    import_file_fun() {
        this.uploadBox = true;
    },
    // 删除按钮
    delete_fun() {
        if (this.transSerialNos.length < 1) {
            this.$message("请至少选择一条数据！");
        } else {
            this.delete_hint = true;
        }
    },
    // 提交按钮
    submit_fun() {
        if (this.transSerialNos.length < 1) {
            this.$message("请至少选择一条数据！");
        } else {
            this.submit_hint = true;
        }
    },
    // 关闭提交提示窗口
    sumit_close() {
        this.submit_hint = false;
    },
    // 关闭删除提示窗口
    delete_close() {
        this.delete_hint = false;
    },
    // 取消提交窗口
    cancel_submit_fn() {
        this.submit_hint = false;
    },
    // 确认提交窗口
    affirm_submit_fun() {
        let queryData = {
            flowNo: "payBuyBackFlow",
            transSerialNos: this.transSerialNos
        };
        this.buyBackSubmitToFinancialAudit(queryData)
        .then((data) => {
            this.reload();
            this.submit_hint = false;
        })
        .catch((err) => {
            this.$error(err);
            this.reload();
            this.submit_hint = false;
        });
    },
    // 取消删除窗口
    cancel_delete_fn() {
        this.delete_hint = false;
    },
    // 确认删除窗口
    affirm_delete_fun() {
        let queryData = {
            transSerialNos: this.transSerialNos
        };
        this.buyBackDelete(queryData)
        .then((data) => {
            this.reload();
            this.delete_hint = false;
        })
        .catch((err) => {
            this.$error(err);
            this.reload();
            this.delete_hint = false;
        });
    }
  },
  components: {
    addPriorMatch, // 增加
    pagination, // 分页组件
    fontHint,
    upload // 导入文件
  },
  created() {}
};
</script>
