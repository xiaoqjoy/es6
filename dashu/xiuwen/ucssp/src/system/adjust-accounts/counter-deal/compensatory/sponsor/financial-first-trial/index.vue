<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-05 10:15:19
 * @LastEditTime: 2019-08-19 16:24:38
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div>
      <!-- 财务初审 -->
    <div class="content">
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
            max-height="620"
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
                width="160px"
                label="出账编号">
            </el-table-column>
            <el-table-column
                prop="customerName"
                label="客户姓名">
            </el-table-column>
            <el-table-column
                prop="buyDate"
                width="120px"
                label="代偿日期">
            </el-table-column>
            <el-table-column
                prop="lineidName"
                width="200px"
                label="合作机构">
                <template slot-scope="scope">
                    <el-popover trigger="hover" placement="top" v-if="scope.row.lineidName">
                        <p class="ellipsis">
                            {{scope.row.lineidName}}
                        </p>
                        <div slot="reference">
                            <p class="yincan ellipsis">
                            {{scope.row.lineidName}}
                            </p>
                        </div>
                    </el-popover>
                </template>
            </el-table-column>
            <el-table-column
                prop="orgName"
                width="200px"
                label="所属公司">
                <template slot-scope="scope">
                    <el-popover trigger="hover" placement="top" v-if="scope.row.orgName">
                        <p class="ellipsis">
                            {{scope.row.orgName}}
                        </p>
                        <div slot="reference">
                            <p class="yincan ellipsis">
                            {{scope.row.orgName}}
                            </p>
                        </div>
                    </el-popover>
                </template>
            </el-table-column>
            <el-table-column
                width="160px"
                prop="certNo"
                label="身份证号码">
                <template  slot-scope="scope">
                    <div>{{scope.row.certNo | certificateNum}}</div>
                </template>
            </el-table-column>
            <el-table-column
                prop="buySum"
                width="100"
                label="代偿合计">
            </el-table-column>
            <el-table-column
            prop="buyBankCorp"
                width="120px"
            label="代偿银行本金">
            </el-table-column>
             <el-table-column
            prop="buyBankInte"
                width="120px"
            label="代偿银行利息">
            </el-table-column>
            <el-table-column
            prop="buyBankFine"
                width="120px"
            label="代偿银行罚息">
            </el-table-column>
            <el-table-column
            prop="buyBankCompound"
                width="120px"
            label="代偿银行复利">
            </el-table-column>
            <el-table-column
            prop="buyBankInsurance"
                width="120px"
            label="代偿银行保险费">
            </el-table-column>
            <el-table-column
            prop="buyDdInsurance"
                width="120px"
            label="代垫银行保险费">
            </el-table-column>
            <el-table-column
            prop="buyDdCorp"
                width="120px"
            label="代垫本金">
            </el-table-column>
            <el-table-column
            prop="buyDdInte"
                width="120px"
            label="代垫利息">
            </el-table-column>
            <el-table-column
            prop="buyDdFine"
            label="代垫罚息">
            </el-table-column>
            <el-table-column
            prop="buyDdCompound"
            label="代垫复利">
            </el-table-column>
            <el-table-column
            prop="buyDsfFine"
                width="120px"
            label="代偿罚息">
            </el-table-column>
            <el-table-column
            prop="buyDsfCompound"
                width="120px"
            label="代偿复利">
            </el-table-column>
            <el-table-column
            prop="buyDsfConsult"
            label="代偿咨询费">
            </el-table-column>
            <el-table-column
            prop="buyDsfGuarantee"
            label="代偿管理费">
            </el-table-column>
            <el-table-column
            prop="phaseName"
            label="案件状态">
            </el-table-column>
            <el-table-column
                label="操作"
                fixed="right">
                <template slot-scope="scope">
                    <el-button  type="text" size="small" @click="detail_alert(scope.row)">测算</el-button>
                </template>
            </el-table-column>
            </el-table>
        </div>
      <pagination @jump-page="jump" :page="pageConfig" class="pagination"></pagination>
      <!-- 底部 -->
      <div class="enable">
        <el-button class="t_button upload_t button" @click="derive">批量导出</el-button>
        <el-button class="t_button state_t button" @click="import_file_fun">批量导入</el-button>
        <el-button class="t_button dead_t button" @click="back_fun">退回</el-button>
        <el-button class="t_button initiate_t button" @click="submit_fun">提交</el-button>
      </div>
    </div>
    <!-- 测算组件 -->
    <calculate v-if="calculateFlag" @reload="reload" @close_calculate="close_calculate" :calculateDatail='calculateDatail'></calculate>
    <!-- 提示窗 == 退回 -->
    <div class="hint" v-if="delete_hint">
        <div class="import-message">
            <div class="dialog-mask"></div>
            <div class="dialog-box">
                <div class="dialog-msgbox__top">
                <span class="el-icon-close button button__close" @click="delete_close"></span>
                </div>
                <div class="text-center">是否确认退回选中的申请？</div>
                  <div class="affirm_select">
                    <el-button class="t_button cancel_t button" @click="cancel_delete_fn">取消</el-button>
                    <el-button class="t_button affirm_t button" @click="affirm_delete_fun">确认</el-button>
                </div>
            </div>
        </div>
    </div>
    <!-- 提示窗 == 提交 -->
    <div class="hint" v-if="submit_hint">
        <div class="import-message">
            <div class="dialog-mask"></div>
            <div class="dialog-box">
                <div class="dialog-msgbox__top">
                <span class="el-icon-close button button__close" @click="submit_close"></span>
                </div>
                <div class="text-center">是否确认提交选中的申请？</div>
                  <div class="affirm_select">
                    <el-button class="t_button cancel_t button" @click="submit_close">取消</el-button>
                    <el-button class="t_button affirm_t button" @click="affirm_submit_fun">确认</el-button>
                </div>
            </div>
        </div>
    </div>
    <!-- 文字提示组件 -->
    <fontHint v-if="fontHintFlag" :massage="massage" @close="fontHintClose"></fontHint>
    <!-- 导入文件 -->
    <upload v-if="uploadBox" @close="closeUpload" @getFileId='getFileId' @getFileName='getFileName' @FileSaveFun='FileSaveFun'></upload>
    <!--导入 再次确认组件 -->
    <reconfirmHint v-if="tally_hint" :massage="tally_hint_massage" @close="tally_close" @backFun="affirm_tally_fun"></reconfirmHint>
  </div>
</template>

<script type="text/ecmascript-6">
import upload from './upload/index.vue'; // 导入文件
import pagination from "@components/pagination"; // 分页组件
import calculate from "../financial-first-trial/calculate"; // 测算组件
import fontHint from "@/system/adjust-accounts/counter-deal/components/font-hint"; // 文字提示组件
import { counterDealApi } from "@/system/adjust-accounts/counter-deal/js/server"; // 接口
import reconfirmHint from "@/system/adjust-accounts/counter-deal/components/reconfirm-hint"; // 再次确认组件
export default {
  data() {
    return {
      fileName: '',
      fileId: '',
      massage: "", // 提示文字
      loanNo: "", // 出账编号
      customerName: "", // 客户姓名
      lineidName: "", // 合作机构
      certNo: "", // 身份证号码
      calculateFlag: false, // 测算开关
      delete_hint: false, // 退回开关
      submit_hint: false, // 退回开关
      fontHintFlag: false, // 文字提示组件开关
      pageConfig: {
        account: 0, // 总条数
        pageSize: 50, // 当前多少条数据
        currentPage: 1, // 当前页
        showJumpButton: true // 显示跳转按钮
      }, // 分页
      transSerialNos: [], // 列表选中的交易号数组
      calculateDatail: null, // 测算详情数据
      for_: [], // 渲染列表
      uploadBox: false, // 导入文件开关
      tally_hint: false,
      tally_hint_massage: ''
    };
  },
  mounted() {
      this.buybackQueryList();
  },
  methods: {
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
            flowNo: 'buyBackFlow',
            phaseNos: ['0020', '0060'],
            loanNo: this.loanNo,
            customerName: this.customerName,
            lineidName: this.lineidName,
            certNo: this.certNo
        };
        let current = pageNum || 1;
        this.buybackQueryList(data, current);
    },
    // 代偿申请查询列表接口
    buybackQueryList(res, current) {
        res = res || {
            "flowNo": "buyBackFlow",
            "phaseNos": ["0020", '0060']
        };
        current = current || 1;
        let url = counterDealApi.buybackQueryList + "?current=" + current + "&size=50";
        this.$MyFetch.post(url, res, {timeout: 120000})
        .then((data = {}) => {
            this.for_ = data.records;
            // 总条数
            this.pageConfig.account = data.total || 1;
            // 当前页
            this.pageConfig.currentPage = data.current || 1;
            // 一页有几条数据 pageSize
            this.pageConfig.pageSize = data.size || 50;
        })
        .catch((err) => {
            console.log(err);
            this.$error(err.message);
        });
    },
    // 代偿发起-退回
     buyBackReviewReturn(res) {
       return new Promise((resolve, reject) => {
            res = res || {};
            let url = counterDealApi.buyBackReviewReturn;
            this.$MyFetch.post(url, res)
            .then((data = {}) => {
                console.log(data);
                resolve(data);
            })
            .catch((err) => {
                this.$error(err);
                reject(err);
            });
       });
    },
    // 代偿发起-财务初审-提交
     buyBackSubmitToReview(res) {
       return new Promise((resolve, reject) => {
            res = res || {};
            let url = counterDealApi.buyBackSubmitToReview;
            this.$MyFetch.post(url, res)
            .then((data = {}) => {
                console.log(data);
                resolve(data);
            })
            .catch((err) => {
                reject(err);
            });
       });
    },
    // 测算
    detail_alert(row) {
      console.log(row);
      this.calculateDatail = row;
      this.calculateFlag = true;
    },
    // 关闭测算组件
    close_calculate() {
      this.calculateFlag = false;
    },
    // 退回按钮
    back_fun() {
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
    // 关闭退回提示窗口
    delete_close() {
        this.delete_hint = false;
    },
    submit_close() {
        this.submit_hint = false;
    },
    // 取消退回窗口
    cancel_delete_fn() {
        this.delete_hint = false;
    },
    // 确认提交
    affirm_submit_fun() {
        let queryData = {
                flowNo: "buyBackFlow",
                transSerialNos: this.transSerialNos
            };
            this.buyBackSubmitToReview(queryData)
            .then((data) => {
                this.submit_hint = false;
                if (!data.result) {
                  this.massage = data.massage;
                  this.fontHintFlag = true;
                }
                this.reload();
            })
            .catch((err) => {
                this.$error(err);
                this.submit_hint = false;
                this.reload();
            });
    },
    // 确认退回窗口
    affirm_delete_fun() {
      let queryData = {
            flowNo: "buyBackFlow",
            phaseNo: '0050',
            transSerialNos: this.transSerialNos
        };
        this.buyBackReviewReturn(queryData)
        .then((data) => {
          console.log(data, "删除成功");
            this.reload();
            this.delete_hint = false;
        })
        .catch((err) => {
            console.log(err, "删除失败");
             this.reload();
            this.delete_hint = false;
        });
    },
    // 关闭文字提示组件
    fontHintClose() {
      this.fontHintFlag = false;
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
    // 关闭文件导入
    closeUpload () {
        this.uploadBox = false;
        // this.massage = '没有操作导入！！！';
        // this.fontHintFlag = true;
    },
    // 文件id
    getFileId(data) {
        this.fileId = data;
    },
    // 文件名字
    getFileName(data) {
        this.fileName = data;
    },
    // FileSaveFun
    FileSaveFun() {
        let _that = this;
        let saveData = {
            fileId: _that.fileId,
            fileName: _that.fileName
            // relatedId: _that.deleteSubmitData.batchNo
        };
        // 批量导入验证调用
        _that.batchCheckExcelBuyBackTrial(saveData)
        .then((data) => {
            if (!data.success) {
                    _that.$error(data.msg);
                } else {
                    // 批量导入更新
                    let url = counterDealApi.batchUpdateExcelBuyBackTrial;
                    this.$MyFetch
                    .post(url, saveData)
                    .then((data = {}) => {
                        this.buybackQueryList();
                        this.$message.success(data.msg);
                    })
                    .catch(err => {
                        this.$error(err.message);
                    });
                }
        })
        .catch((err) => {
            this.$error(err.message);
        });
    },
    // 批量导入验证
    batchCheckExcelBuyBackTrial(res) {
        return new Promise((resolve, reject) => {
            res = res || {};
            let url = counterDealApi.batchCheckExcelBuyBackTrial;
            this.$MyFetch
            .post(url, res)
            .then((data = {}) => {
                resolve(data);
            })
            .catch(err => {
                reject(err);
            });
        });
    },
    // 导入文件按钮
    import_file_fun() {
        this.uploadBox = true;
    },
    // 批量导出
    derive() {
        // this.tally_hint = true;
        // this.tally_hint_massage = '是否确认导出?';
        this.affirm_tally_fun();
    },
    tally_close() {
        // this.tally_hint = false;
    },
    // 确认导出
    affirm_tally_fun() {
        // this.tally_hint = false;
        this.$MyFetch
        .post(counterDealApi.exportTrialList, {})
        .then((data = {}) => {
            window.open(data.downUrl);
            if (data.msg) {
                this.$alert(data.msg, {
                confirmButtonText: '确定'
                });
            }
            // this.$message.success(JSON.stringify(data.success));
        }).catch(err => {
            this.$error(err);
        });
    }
  },
  components: {
    calculate, // 测算组件
    pagination, // 分页组件
    fontHint, // 文字提示组件
    upload, // 导入
    reconfirmHint // 再次确认组件
  },
  created() {}
};
</script>
<style lang="less" scoped>
.table_box {
    height: 620px;
}
</style>
