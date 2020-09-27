<template>
  <div>
    <!-- 单笔代扣 -->
    <div class="content">
      <!-- 输入框和下拉框 -->
      <div class="b_content">
        <div class="referEmptyDiv"><el-button class="b_button query button" @click="refer('add')">+ 新增</el-button></div>
      </div>
      <!-- 带全选的表格 -->
        <div class="table_box">
            <el-table
            :default-sort = "{prop: 'date', order: 'descending'}"
            :header-cell-style="{'font-size':'12px','text-align':'center','height':'38.9px','background':'#ececec'}"
            ref="multipleTable"
            max-height="680"
            :data="for_"
            tooltip-effect="dark"
            style="width: 100%; border: 1px solid #E9E9E9;"
            @selection-change="handleSelectionChange"
            @row-click="rowCheck">
            <el-table-column
                prop="loanNo"
                width="180"
                label="合作方">
            </el-table-column>
            <el-table-column
                prop="putoutDate"
                width="110"
                label="资金方">
            </el-table-column>
            <el-table-column
                prop="customerName"
                width="110"
                label="分公司名称">
            </el-table-column>
            <el-table-column
                prop="certNo"
                width="200"
                label="合作模式">
            </el-table-column>
            <el-table-column
                prop="deductAccNo"
                width="210"
                label="扣款提醒">
            </el-table-column>
            <el-table-column
                prop="bankName"
                width="200"
                label="机构对接人">
            </el-table-column>
            <el-table-column
                prop="oldValueName"
                width="200"
                label="扣款发送邮箱">
            </el-table-column>
            <el-table-column
                prop="branchName"
                width="200"
                label="扣款回盘邮箱">
            </el-table-column>
            <el-table-column
                prop="branchName"
                width="200"
                label="我司扣款发送邮箱">
            </el-table-column>
            <el-table-column
                prop="branchName"
                width="200"
                label="我司扣款回盘邮箱">
            </el-table-column>
            <el-table-column
                prop="branchName"
                width="200"
                label="合作方联系人">
            </el-table-column>
            <el-table-column
                prop="branchName"
                width="200"
                label="扣款金额拆分">
            </el-table-column>
             <el-table-column
                prop="branchName"
                width="200"
                label="对接模式">
            </el-table-column>
            <el-table-column
                    width="140px"
                    fixed="right"
                    label="操作">
                    <template slot-scope="scope">
                        <el-button  type="text" size="small" @click="alter_alert('edit', scope.row)">编辑</el-button>
                        <el-button style="color:#E16767!important;"  type="text" size="small" @click="getBackFun(scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
      <!-- 分页 -->
      <pagination @jump-page="jump" :page="pageConfig" class="pagination"></pagination>
      <!-- 文字提示组件 -->
    <fontHint v-if="fontHintFlag" :massage="fontHintMsg" @close="fontHintClose"></fontHint>
    <!-- 再次确认组件 -->
    <reconfirmHint v-if="reconfirmFlag" massage="是否确认删除该条数据？" @close="reconfirmClose" @backFun="reconfirmBackFun"></reconfirmHint>
    <!-- 新增 -->
    <addPriorMatch v-if="alert_" @clsoe_windowAlert='close_1' @querySearch='querySearch' :alert_Msg='alert_Msg'></addPriorMatch>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import addPriorMatch from "./addPriorMatch/"; // 新增
import { counterDealApi } from "@/system/adjust-accounts/counter-deal/js/server"; // 接口
import pagination from "@components/pagination"; // 分页组件
import fontHint from "@/system/adjust-accounts/counter-deal/components/font-hint"; // 文字提示组件
import reconfirmHint from "@/system/adjust-accounts/counter-deal/components/reconfirm-hint"; // 再次确认组件
export default {
  name: 'channel-alter',
  data() {
    return {
      alert_: false,
      alert_Msg: '', // 判断是新增还是编辑
      reconfirmFlag: false, // 再次确认组件开关
      fontHintFlag: false, // 文字提示开关
      fontHintMsg: '', // 文字提示内容
      loanNo: "", // 出账编号
      customerName: "", // 客户姓名
      certNo: "", // 身份证号码
      deductAccNo: "", // 扣款银行卡号
      pageConfig: {
        account: 0, // 总条数
        pageSize: 10, // 当前多少条数据
        currentPage: 1, // 当前页
        showJumpButton: true // 显示跳转按钮
      }, // 分页
      for_: [{}], // 渲染列表
      ChannelList: [], // 扣款银行列表
      transSerialNos: [], // 删除接口参数
      submit_hint: false, // 提交开关
      delete_hint: false // 删除开关
    };
  },
  mounted() {
        this.ChannelListApi({}); // 渠道列表接口
        // this.deductManagementSingleDeductList();
  },
  methods: {
      // 渠道列表
    ChannelListApi(res) {
      this.$MyFetch.get(counterDealApi.ChannelList, res)
      .then((data = {}) => {
          this.ChannelList = data;
          })
      .catch((err) => {
          this.$error(err.message);
      });
    },
    // 关闭文字提示组件
    fontHintClose() {
      this.fontHintFlag = false;
    },
    // 关闭再次确认组件
    reconfirmClose() {
      this.reconfirmFlag = false;
    },
    // 再次确认组件点击确定执行函数
    reconfirmBackFun() {
      console.log('点击确定了');
      this.reconfirmFlag = false;
    },
    // 再次确认组件点击确定执行函数
    getBackFun() {
      this.reconfirmFlag = true;
    },
    // 查询按钮
    refer(add) {
       this.alert_ = true;
       this.alert_Msg = add;
    },
    // 编辑
    alter_alert(edit, val) {
      this.alert_ = true;
      this.alert_Msg = edit;
    },
    // 清空按钮
    empty() {
        this.loanNo = ''; // 出账编号
        this.customerName = ''; // 客户姓名
        this.deductAccNo = ''; // 扣款银行卡号
        this.certNo = ''; // 身份证号码
    },
    // reload
    reload(pageNum) {
        let data = {
            loanNo: this.loanNo,
            customerName: this.customerName,
            deductAccNo: this.deductAccNo,
            certNo: this.certNo
        };
        let current = pageNum || 1;
        this.deductManagementSingleDeductList(data, current);
    },
    alterMsg(msg) {
        this.fontHintMsg = msg; // 文字提示内容
        this.fontHintFlag = true; // 文字提示开关
    },
    // 单笔代扣查询列表
    deductManagementSingleDeductList(res, current) {
        res = res || {};
        current = current || 1;
        let url = counterDealApi.deductManagementSingleDeductList + "?current=" + current + "&size=10";
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
            this.pageConfig.pageSize = data.size || 10;
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
    // 批量代偿发起文件校验
     CheckBuybackFile(res) {
       return new Promise((resolve, reject) => {
            res = res || {};
            let url = counterDealApi.CheckBuybackFile;
            this.$MyFetch.post(url, res, {timeout: 120000})
            .then((data = {}) => {
                resolve(data);
            })
            .catch((err) => {
                this.$error(err);
                reject(err);
            });
       });
    },
    // 批量代偿发起文件保存
     CheckBuybackFileSave(res) {
       return new Promise((resolve, reject) => {
            res = res || {};
            let url = counterDealApi.CheckBuybackFileSave;
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
    // 关闭新增组件
    close_1() {
    this.alert_ = false;
    },
    querySearch() {
    }
  },
  components: {
    pagination, // 分页组件
    reconfirmHint, // 再次确认组件
    fontHint, // 文字提示组件
    addPriorMatch // 新增
  }
};
</script>

<style lang="less" scoped>
.referEmptyDiv {
    display: inline-block;
    margin-bottom: 20px;
}
.table_box {
  height: 680px;
}
</style>
