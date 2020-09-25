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
          <!-- 资金方 -->
          <el-select v-model="lineId" class="select_72" placeholder="资金方" clearable>
            <el-option v-for="(item, index) in lineIdList"
            :key="index"
            :label="item.itemName"
            :value="item.itemNo">
            </el-option>
        </el-select>
          <!-- 合作方 -->
          <el-select v-model="fundOrg" class="select_72" placeholder="合作方" clearable>
            <el-option v-for="(item, index) in fundOrgList"
            :key="index"
            :label="item.itemName"
            :value="item.itemNo">
            </el-option>
        </el-select>
          <!-- 姓名 -->
        <el-input class="select_72" v-model="customerName" placeholder="姓名" clearable></el-input>
          <!-- 身份证号码 -->
        <el-input class="select_72" v-model="certNo" placeholder="身份证号码" clearable></el-input>
          <!-- 扣款银行卡号 -->
        <el-input class="select_72" v-model="deductAccNo" placeholder="扣款银行卡号" clearable></el-input>
          <!-- 扣款银行 -->
         <el-select v-model="bankCode" class="select_72" placeholder="扣款银行" clearable>
            <el-option v-for="(item, index) in BankList"
            :key="index"
            :label="item.bankName"
            :value="item.bankCode">
            </el-option>
        </el-select>
          <!-- 银行预留手机号 -->
        <el-input class="select_72" v-model="phone" placeholder="银行预留手机号" clearable></el-input>
          <!-- 当前扣款渠道 -->
        <el-select v-model="oldValue" class="select_72" placeholder="当前扣款渠道" clearable>
            <el-option v-for="(item, index) in ChannelList"
            :key="index"
            :label="item.itemName"
            :value="item.itemNo">
            </el-option>
        </el-select>
          <!-- 分公司 -->
        <el-select v-model="branchCode" class="select_72" placeholder="分公司" clearable>
            <el-option v-for="(item, index) in BranchList"
            :key="index"
            :label="item.itemName"
            :value="item.itemNo">
            </el-option>
        </el-select>
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
            @row-click="rowCheck"
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
                prop="phone"
                width="150"
                label="银行预留手机号">
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
                label="入账机构">
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
                prop="fundOrgName"
                width="200"
                label="合作方">
                <template slot-scope="scope">
                    <el-popover trigger="hover" placement="top" v-if="scope.row.fundOrgName">
                        <p class="ellipsis">
                            {{scope.row.fundOrgName}}
                        </p>
                        <div slot="reference">
                            <p class="yincan ellipsis">
                            {{scope.row.fundOrgName}}
                            </p>
                        </div>
                    </el-popover>
                </template>
            </el-table-column>
            <el-table-column
                prop="lineIdName"
                width="200"
                label="资金方">
                <template slot-scope="scope">
                    <el-popover trigger="hover" placement="top" v-if="scope.row.lineIdName">
                        <p class="ellipsis">
                            {{scope.row.lineIdName}}
                        </p>
                        <div slot="reference">
                            <p class="yincan ellipsis">
                            {{scope.row.lineIdName}}
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
            </el-table>
        </div>
      <!-- 分页 -->
      <pagination @jump-page="jump" :page="pageConfig" class="pagination"></pagination>
      <!-- 底部 -->
      <div class="enable">
        <el-button class="t_button dead_t button" @click="submit_fun">修改</el-button>
        <el-button class="t_button initiate_t button" @click="import_file_fun">批量导入</el-button>
      </div>
      <!-- 导入文件 -->
      <upload v-if="uploadBox" @close="closeUpload" @getFileId='getFileId' @getFileName='getFileName' @FileSaveFun='FileSaveFun'></upload>
      <!-- 文字提示组件 -->
      <fontHint v-if="fontHintFlag" :massage="fontHintMsg" @close="fontHintClose"></fontHint>
      <!-- 修改组件 -->
      <alterHint v-if="alterHintFlag" @clsoe_windowAlert="alterHintClose" :deductChannelList='deductChannelList' @reload="reload"></alterHint>
      <reconfirmHint v-if="checkReconfirmFlag" massage="校验通过，是否确认导入？" @close="checkReconfirmClose" @backFun="checkReconfirmBackFun"></reconfirmHint>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import reconfirmHint from "@/system/adjust-accounts/counter-deal/components/reconfirm-hint"; // 再次确认组件
import pagination from "@components/pagination"; // 分页组件
import upload from './upload/index.vue'; // 导入文件
import { counterDealApi } from "@/system/adjust-accounts/counter-deal/js/server"; // 接口
import fontHint from "@/system/adjust-accounts/counter-deal/components/font-hint"; // 文字提示组件
import alterHint from "../channel-alter/alter-hint"; // 修改组件alter-hint
export default {
  name: 'channel-alter',
  data() {
    return {
      checkReconfirmFlag: false,
      fontHintFlag: false, // 文字提示开关
      fontHintMsg: '', // 文字提示内容
      alterHintFlag: false, // 修改提示开关
      loanNo: "", // 出账编号
      putoutDate: "", // 放款日期
      customerName: "", // 姓名
      certNo: "", // 身份证号码
      lineId: "", // 资金方
      fundOrg: "", // 合作方
      deductAccNo: "", // 扣款银行卡号
      bankCode: "", // 扣款银行代码
      phone: "", // 银行预留手机号
      oldValue: "", // 当前扣款渠道
      branchCode: "", // 分公司代码
      pageConfig: {
        account: 0, // 总条数
        pageSize: 30, // 当前多少条数据
        currentPage: 1, // 当前页
        showJumpButton: true // 显示跳转按钮
      }, // 分页
      for_: [], // 渲染列表
      ChannelList: [], // 扣款渠道列表
      BankList: [], // 扣款银行列表
      BranchList: [], // 分公司列表
      lineIdList: [], // 资金方列表
      fundOrgList: [], // 合作方列表
      deductChannelList: [], // 表格勾选的参数
      uploadBox: false, // 导入文件开关
      delete_hint: false // 删除开关
    };
  },
  mounted() {
    // 查询列表
    // this.QueryDeductChannelList();
    this.queryDeductChannelLists();
    this.BankCodeNameList();
    this.BranchNameList();
    this.FundOrgNameList();
    this.LineIdNameList();
  },
  methods: {
    checkReconfirmClose() {
      this.checkReconfirmFlag = false;
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
    // 扣款渠道下拉
    queryDeductChannelLists(res) {
      res = res || {codeNo: 'ThirdDeductChannel'};
      this.$MyFetch.get(counterDealApi.deductChannelLists, res)
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
    // 合作方下拉
    FundOrgNameList(res = {codeNo: "FundOrg"}) {
      this.$MyFetch.get(counterDealApi.FundOrgNameList, res)
      .then((data = {}) => {
          this.fundOrgList = data;
      })
      .catch((err) => {
          this.$error(err.message);
      });
    },
    // 资金方下拉
    LineIdNameList(res) {
      res = res || {};
      this.$MyFetch.get(counterDealApi.LineIdNameList, res)
      .then((data = {}) => {
          this.lineIdList = data;
      })
      .catch((err) => {
          this.$error(err.message);
      });
    },
    // 关闭文字提示组件
    fontHintClose() {
      this.fontHintFlag = false;
    },
    // 关闭文字提示组件alterHintClose
    alterHintClose() {
      this.alterHintFlag = false;
    },
    // 查询按钮
    refer() {
      if (!(this.fundOrg || this.lineId || this.loanNo || this.putoutDate || this.certNo || this.customerName || this.deductAccNo || this.bankCode || this.phone || this.oldValue || this.branchCode)) {
        this.$message("请输入查询条件!");
      } else {
        this.reload();
      }
    },
    // 清空按钮
    empty() {
        this.fundOrg = ''; // 资金方
        this.lineId = ''; // 合作方
        this.loanNo = ''; // 出账编号
        this.putoutDate = ''; // 出账编号
        this.certNo = ''; // 出账编号
        this.customerName = ''; // 出账编号
        this.deductAccNo = ''; // 出账编号
        this.bankCode = ''; // 出账编号
        this.phone = ''; // 出账编号
        this.oldValue = ''; // 出账编号
        this.branchCode = ''; // 出账编号
    },
    // reload
    reload(pageNum) {
        let data = {
            lineId: this.lineId,
            fundOrg: this.fundOrg,
            loanNo: this.loanNo,
            beginDate: this.date_filter(this.putoutDate)[0],
            endDate: this.date_filter(this.putoutDate)[1],
            certNo: this.certNo,
            customerName: this.customerName,
            deductAccNo: this.deductAccNo,
            bankCode: this.bankCode,
            phone: this.phone,
            oldValue: this.oldValue,
            branchCode: this.branchCode
        };
        let current = pageNum || 1;
        this.QueryDeductChannelList(data, current);
    },
    // 扣款渠道查询列表
    QueryDeductChannelList(res, current) {
        res = res || {};
        current = current || 1;
        let url = counterDealApi.QueryDeductChannelList + "?current=" + current + "&size=30";
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
    // 文件校验
     BatchCheckExcelDeductChannel(res) {
       return new Promise((resolve, reject) => {
            let url = counterDealApi.BatchCheckExcelDeductChannel;
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
    // 扣款渠道批量导入更新处理
     BatchUpdateExcelDeductChannel(res) {
       return new Promise((resolve, reject) => {
            let url = counterDealApi.BatchUpdateExcelDeductChannel;
            this.$MyFetch.post(url, res)
            .then((data = {}) => {
              if (data.success) {
                resolve(data.msg);
              } else {
                reject(data.msg);
              }
            })
            .catch((err) => {
              this.$error(err);
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
        this.deductChannelList = data;
    },
    rowCheck(row, column, e) {
      this.$refs.multipleTable.toggleRowSelection(row);
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
    // 校验通过确认
    checkReconfirmBackFun() {
      this.checkReconfirmFlag = false;
      let _that = this;
      let queryData = {
          fileId: _that.fileId,
          fileName: _that.fileName
      };
       _that.BatchUpdateExcelDeductChannel(queryData)
        .then((res) => {
          this.fontHintMsg = res;
          this.fontHintFlag = true;
        })
        .catch((err) => {
          this.fontHintMsg = err;
          this.fontHintFlag = true;
        });
    },
    // FileSaveFun
    FileSaveFun() {
        let _that = this;
        let queryData = {
            fileId: _that.fileId,
            fileName: _that.fileName
        };
        _that.BatchCheckExcelDeductChannel(queryData)
        .then((res) => {
          this.checkReconfirmFlag = true;
        })
        .catch((err) => {
            this.fontHintMsg = err;
            this.fontHintFlag = true;
        });
    },
    // 导入文件按钮
    import_file_fun() {
        this.uploadBox = true;
    },
    // 修改按钮
    submit_fun() {
        if (this.deductChannelList.length < 1) {
            this.$message("请至少选择一条数据！");
        } else {
            this.alterHintFlag = true;
        }
    }
  },
  components: {
    reconfirmHint, // 再次确认组件
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
