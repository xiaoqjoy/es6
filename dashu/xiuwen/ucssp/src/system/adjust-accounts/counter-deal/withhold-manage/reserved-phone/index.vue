<template>
  <div>
    <div class="content">
      <!-- 输入框和下拉框 -->
      <div class="b_content">
          <!-- 出账编号 -->
        <el-input class="select_72" v-model="loanNo" placeholder="出账编号" clearable></el-input>
          <!-- 发放日期 -->
          <el-date-picker
            v-model="putoutDate"
            class="repayDateCss"
            type="daterange"
            align="right"
            range-separator="至"
            start-placeholder="发放日期"
            end-placeholder="发放日期">
        </el-date-picker>
          <!-- 姓名 -->
        <el-input class="select_72" v-model="customerName" placeholder="姓名" clearable></el-input>
          <!-- 身份证号码 -->
        <el-input class="select_72" v-model="certNo" placeholder="身份证号码" clearable></el-input>
          <!-- 扣款银行卡号 -->
        <el-input class="select_72" v-model="deductAccNo" placeholder="扣款银行卡号" clearable></el-input>
          <!-- 扣款银行 -->
         <el-select v-model="bankCode" class="select_72" placeholder="扣款银行" clearable>
            <el-option v-for="item in BankList"
            :key="item.bankCode"
            :label="item.bankName"
            :value="item.bankCode">
            </el-option>
        </el-select>
          <!-- 当前扣款渠道 -->
        <el-select v-model="oldValue" class="select_72" placeholder="当前扣款渠道">
            <el-option v-for="item in ChannelList"
            :key="item.itemNo"
            :label="item.itemName"
            :value="item.itemNo">
            </el-option>
        </el-select>
          <!-- 分公司 -->
        <el-select v-model="branchCode" class="select_72" placeholder="分公司">
            <el-option v-for="item in BranchList"
            :key="item.itemNo"
            :label="item.itemName"
            :value="item.itemNo">
            </el-option>
        </el-select>
         <!-- 合作模式 -->
        <el-select v-model="collaborate" class="select_72" placeholder="合作模式">
            <el-option v-for="item in CollaborateList"
            :key="item.itemNo"
            :label="item.itemName"
            :value="item.itemNo">
            </el-option>
        </el-select>
         <!-- 银行预留手机号 -->
        <el-input class="select_72" v-model="phone" placeholder="银行预留手机号"></el-input>
        <div class="referEmptyDiv"><el-button class="b_button query button" @click="refer">查询</el-button></div>
        <div class="referEmptyDiv"><el-button class="b_button empty button" @click="empty">清空</el-button></div>
      </div>
      <!-- 带全选的表格 -->
        <div class="table_box">
            <el-table
            :default-sort = "{prop: 'date', order: 'descending'}"
            :header-cell-style="{'font-size':'12px','text-align':'center','height':'38.9px','background':'#ececec'}"
            ref="multipleTable"
            max-height="555"
            :data="for_"
            tooltip-effect="dark"
            style="width: 100%; border: 1px solid #E9E9E9;"
            @selection-change="handleSelectionChange">
            <el-table-column
                type="selection">
            </el-table-column>
            <el-table-column
                prop="loanNo"
                width="180"
                label="出账编号">
            </el-table-column>
            <el-table-column
                prop="putoutDate"
                width="110"
                label="发放日期">
            </el-table-column>
            <el-table-column
                prop="customerName"
                width="110"
                label="姓名">
            </el-table-column>
            <el-table-column
                prop="certNo"
                width="180"
                label="身份证号码">
                <template  slot-scope="scope">
                    <div>{{scope.row.certNo | certificateNum}}</div>
                </template>
            </el-table-column>
            <el-table-column
                prop="deductAccNo"
                width="210"
                label="扣款银行卡号">
            </el-table-column>
            <el-table-column
                prop="bankName"
                width="200"
                label="扣款银行">
                <template slot-scope="scope">
                    <el-popover trigger="hover" placement="top" v-if="scope.row.bankName">
                        <p class="ellipsis">
                            {{scope.row.bankName}}
                        </p>
                        <div slot="reference">
                            <p class="yincan ellipsis">
                            {{scope.row.bankName}}
                            </p>
                        </div>
                    </el-popover>
                </template>
            </el-table-column>
            <el-table-column
                prop="oldValueName"
                width="200"
                label="当前扣款渠道">
                <template slot-scope="scope">
                    <el-popover trigger="hover" placement="top" v-if="scope.row.oldValueName">
                        <p class="ellipsis">
                            {{scope.row.oldValueName}}
                        </p>
                        <div slot="reference">
                            <p class="yincan ellipsis">
                            {{scope.row.oldValueName}}
                            </p>
                        </div>
                    </el-popover>
                </template>
            </el-table-column>
            <el-table-column
                prop="branchName"
                width="200"
                label="分公司">
                <template slot-scope="scope">
                    <el-popover trigger="hover" placement="top" v-if="scope.row.branchName">
                        <p class="ellipsis">
                            {{scope.row.branchName}}
                        </p>
                        <div slot="reference">
                            <p class="yincan ellipsis">
                            {{scope.row.branchName}}
                            </p>
                        </div>
                    </el-popover>
                </template>
            </el-table-column>
            <el-table-column
                prop="collaborateName"
                width="110"
                label="合作模式">
            </el-table-column>
            <el-table-column
                prop="phone"
                width="150"
                label="银行预留手机号">
            </el-table-column>
            <el-table-column
                    fixed="right"
                    label="操作">
                    <template slot-scope="scope">
                        <el-button  type="text" size="small" @click="alter_alert(scope.row)">修改</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
      <!-- 分页 -->
      <pagination @jump-page="jump" :page="pageConfig" class="pagination"></pagination>
      <!-- 底部 -->
      <!-- <div class="enable">
        <el-button class="t_button upload_t button" @click="import_file_fun">批量导入</el-button>
      </div> -->
      <!-- 导入文件 -->
      <upload v-if="uploadBox" @close="closeUpload" @getFileId='getFileId' @getFileName='getFileName' @FileSaveFun='FileSaveFun'></upload>
      <!-- 文字提示组件 -->
    <fontHint v-if="fontHintFlag" :massage="fontHintMsg" @close="fontHintClose"></fontHint>
    <!-- 修改组件 -->
    <alterHint v-if="alterHintFlag" :rowData="rowData" @clsoe_windowAlert="alterHintClose" @reload="reload"></alterHint>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import pagination from "@components/pagination"; // 分页组件
import upload from './upload/index.vue'; // 导入文件
import { counterDealApi } from "@/system/adjust-accounts/counter-deal/js/server"; // 接口
import fontHint from "@/system/adjust-accounts/counter-deal/components/font-hint"; // 文字提示组件
import alterHint from "../reserved-phone/alter-hint"; // 修改组件alter-hint
export default {
  name: 'channel-alter',
  data() {
    return {
      rowData: {}, // 修改行数据
      fontHintFlag: false, // 文字提示开关
      alterHintFlag: false, // 修改组件开关
      fontHintMsg: '', // 文字提示内容
      loanNo: "", // 出账编号
      putoutDate: "", // 发放日期
      customerName: "", // 姓名
      certNo: "", // 身份证号码
      deductAccNo: "", // 扣款银行卡号
      bankCode: "", // 扣款银行
      oldValue: "", // 当前扣款渠道
      branchCode: "", // 分公司
      collaborate: "", // 合作模式
      phone: "", // 银行预留手机号
      pageConfig: {
        account: 0, // 总条数
        pageSize: 30, // 当前多少条数据
        currentPage: 1, // 当前页
        showJumpButton: true // 显示跳转按钮
      }, // 分页
      for_: [], // 渲染列表
      CollaborateList: [], // 合作模式
      ChannelList: [], // 扣款渠道列表
      BankList: [], // 扣款银行列表
      BranchList: [], // 分公司列表
      transSerialNos: [], // 删除接口参数
      uploadBox: false, // 导入文件开关
      submit_hint: false, // 提交开关
      delete_hint: false // 删除开关
    };
  },
  mounted() {
      // 查询列表
        // this.BanksReservePhoneList();
        this.queryDeductChannelLists();
        this.BankCodeNameList();
        this.BranchNameList();
        this.CollaborateNameList();
  },
  methods: {
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
    // 合作模式下拉
    CollaborateNameList(res) {
      this.$MyFetch.get(counterDealApi.CollaborateNameList, res)
      .then((data = {}) => {
          this.CollaborateList = data;
          })
      .catch((err) => {
          this.$error(err.message);
      });
    },
    // 扣款渠道下拉
    queryDeductChannelLists(res) {
      res = res || {};
      this.$MyFetch.get(counterDealApi.queryDeductChannelLists, res)
      .then((data = {}) => {
          this.ChannelList = data;
      })
      .catch((err) => {
          this.$error(err.message);
      });
    },
    // 扣款银行下拉
    BankCodeNameList(res) {
      res = res || {};
      this.$MyFetch.get(counterDealApi.BankCodeNameList, res)
      .then((data = {}) => {
          this.BankList = data;
      })
      .catch((err) => {
          this.$error(err.message);
      });
    },
    // 分公司
    BranchNameList(res) {
      res = res || {};
      this.$MyFetch.get(counterDealApi.BranchNameList, res)
      .then((data = {}) => {
          this.BranchList = data;
      })
      .catch((err) => {
          this.$error(err.message);
      });
    },
    // 关闭文字提示组件
    fontHintClose() {
      this.fontHintFlag = false;
    },
    // 关闭修改组件
    alterHintClose() {
      this.alterHintFlag = false;
    },
    // 查询按钮
    refer() {
         if (!(this.loanNo || this.putoutDate || this.customerName || this.certNo || this.deductAccNo || this.bankCode || this.oldValue || this.branchCode || this.collaborate || this.phone)) {
            this.$message("请输入查询条件!");
        } else {
            this.reload();
        }
    },
    // 清空按钮
    empty() {
        this.loanNo = ""; // 出账编号
        this.putoutDate = ""; // 发放日期
        this.customerName = ""; // 姓名
        this.certNo = ""; // 身份证号码
        this.deductAccNo = ""; // 扣款银行卡
        this.bankCode = ""; // 扣款银行
        this.oldValue = ""; // 当前扣款渠道
        this.branchCode = ""; // 分公司
        this.collaborate = ""; // 合作模式
        this.phone = ""; // 银行预留手机号
    },
    // 修改
    alter_alert(rowData) {
        console.log(rowData);
        this.rowData = rowData;
        this.alterHintFlag = true;
    },
    // reload
    reload(pageNum) {
        let data = {
            loanNo: this.loanNo, // 出账编号
            beginDate: this.date_filter(this.putoutDate)[0],
            endDate: this.date_filter(this.putoutDate)[1],
            customerName: this.customerName, // 姓名
            certNo: this.certNo, // 身份证号码
            deductAccNo: this.deductAccNo, // 扣款银行卡号
            bankCode: this.bankCode, // 扣款银行
            oldValue: this.oldValue, // 当前扣款渠道
            branchCode: this.branchCode, // 分公司
            collaborate: this.collaborate, // 合作模式
            phone: this.phone // 银行预留手机号
        };
        let current = pageNum || 1;
        this.BanksReservePhoneList(data, current);
    },
    // 银行预留手机号管理支持分页
    BanksReservePhoneList(res, current) {
        res = res || {};
        current = current || 1;
        let url = counterDealApi.BanksReservePhoneList + "?current=" + current + "&size=30";
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
                this.$error(err);
                reject(err);
            });
       });
    },
    // 批量文件校验
     BatchCheckExcelBanksReservePhone(res) {
       return new Promise((resolve, reject) => {
            res = res || {};
            let url = counterDealApi.BatchCheckExcelBanksReservePhone;
            this.$MyFetch.post(url, res)
            .then((data = {}) => {
                if (data.success) {
                    resolve(data);
                } else {
                    reject(data.msg);
                }
            })
            .catch((err) => {
                this.$error(err);
            });
       });
    },
    // 批量文件保存
     BatchUpdateExcelBanksReservePhone(res) {
       return new Promise((resolve, reject) => {
            res = res || {};
            let url = counterDealApi.BatchUpdateExcelBanksReservePhone;
            this.$MyFetch.post(url, res)
            .then((data = {}) => {
                if (data.success) {
                    resolve(data.msg);
                }
            })
            .catch((err) => {
                reject(err);
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
        let queryData = {
            fileName: _that.fileName,
            fileId: _that.fileId
        };
        _that.BatchCheckExcelBanksReservePhone(queryData)
            .then((data) => { // 文件校验通过
                _that.BatchUpdateExcelBanksReservePhone(queryData)
                .then((data) => {
                    _that.reload();
                    _that.fontHintMsg = data;
                    _that.fontHintFlag = true;
                })
                .catch((err) => {
                    _that.$$error(err);
                });
            })
            .catch((err) => { // 文件校验不通过
                 _that.fontHintMsg = err;
                _that.fontHintFlag = true;
            });
    },
    // 导入文件按钮
    import_file_fun() {
        this.uploadBox = true;
    },
    // 提交按钮
    submit_fun() {
        this.alterHintFlag = true;
    }
  },
  components: {
    pagination, // 分页组件
    fontHint, // 文字提示组件
    alterHint, // 修改组件
    upload // 导入文件
  },
  created() {}
};
</script>

<style lang="less" scoped>
.referEmptyDiv {
    display: inline-block;
    margin-bottom: 20px;
    margin-left: 20px;
}
.repayDateCss {
  width: 250px;
  margin-right: 15px;
  margin-bottom: 20px;
   /deep/ .el-range-input::-ms-clear{
        display: none;
    }
}
</style>
