<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-05 10:15:19
 * @LastEditTime: 2019-08-05 10:15:19
 * @LastEditors: your name
 -->
<template>
  <div>
      <!-- 财务初审 -->
    <div class="content">
      <!-- 新增按钮 -->
      <!-- <button class="add  button">+ 新增</button> -->
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
                prop="certNo"
                width="160px"
                label="身份证号码">
                <template  slot-scope="scope">
                    <div>{{scope.row.certNo | certificateNum}}</div>
                </template>
            </el-table-column>
            <el-table-column
                prop="phaseName"
                label="案件状态">
            </el-table-column>
            <el-table-column
                prop="buySum"
                width="100px"
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
                width="120px"
            prop="buyDsfCompound"
            label="代偿复利">
            </el-table-column>
            <el-table-column
            prop="buyDsfConsult"
                width="120px"
            label="代偿咨询费">
            </el-table-column>
            <el-table-column
            prop="buyDsfGuarantee"
            label="代偿管理费">
            </el-table-column>
            <el-table-column
            prop="deductStatusCdName"
            fixed="right"
            label="扣款状态">
            </el-table-column>
            </el-table>
        </div>
      <pagination @jump-page="jump" :page="pageConfig" class="pagination"></pagination>
      <!-- 底部 -->
      <div class="enable">
        <el-button class="t_button upload_t button" @click="charge_fun">发起扣款</el-button>
        <el-button class="t_button state_t button" @click="state_fun">扣款状态查询</el-button>
        <el-button class="t_button dead_t button" @click="back_fun">退回</el-button>
        <el-button class="t_button initiate_t button" @click="tally_fun">记账</el-button>
      </div>
    </div>
    <!-- 提示窗 == 发起扣款 -->
    <div class="hint" v-if="charge_hint">
        <div class="import-message">
            <div class="dialog-mask"></div>
            <div class="dialog-box">
                <div class="dialog-msgbox__top">
                <span class="el-icon-close button button__close" @click="close_hint('charge_hint')"></span>
                </div>
                <div class="text-center">是否确认发起扣款？</div>
                  <div class="affirm_select">
                    <el-button class="t_button cancel_t button" @click="close_hint('charge_hint')">取消</el-button>
                    <el-button class="t_button affirm_t button" @click="affirm_charge_fun">确认</el-button>
                </div>
            </div>
        </div>
    </div>
    <!-- 提示窗 == 查询扣款状态 -->
    <div class="hint" v-if="state_hint">
        <div class="import-message">
            <div class="dialog-mask"></div>
            <div class="dialog-box">
                <div class="dialog-msgbox__top">
                <span class="el-icon-close button button__close" @click="close_hint('state_hint')"></span>
                </div>
                <div class="text-center">是否确认扣款状态查询？</div>
                  <div class="affirm_select">
                    <el-button class="t_button cancel_t button" @click="close_hint('state_hint')">取消</el-button>
                    <el-button class="t_button affirm_t button" @click="affirm_state_fun">确认</el-button>
                </div>
            </div>
        </div>
    </div>
    <!-- 提示窗 == 退回 -->
    <div class="hint" v-if="back_hint">
        <div class="import-message">
            <div class="dialog-mask"></div>
            <div class="dialog-box">
                <div class="dialog-msgbox__top">
                <span class="el-icon-close button button__close" @click="close_hint('back_hint')"></span>
                </div>
                <div class="text-center">是否确认退回选中的申请？</div>
                  <div class="affirm_select">
                    <el-button class="t_button cancel_t button" @click="close_hint('back_hint')">取消</el-button>
                    <el-button class="t_button affirm_t button" @click="affirm_back_fun">确认</el-button>
                </div>
            </div>
        </div>
    </div>
     <!-- 提示窗 == 记账 -->
    <div class="hint" v-if="tally_hint">
        <div class="import-message">
            <div class="dialog-mask"></div>
            <div class="dialog-box">
                <div class="dialog-msgbox__top">
                <span class="el-icon-close button button__close" @click="close_hint('tally_hint')"></span>
                </div>
                <div class="text-center">是否确认记账选中的申请？</div>
                  <div class="affirm_select">
                    <el-button class="t_button cancel_t button" @click="close_hint('tally_hint')">取消</el-button>
                    <el-button class="t_button affirm_t button" @click="affirm_tally_fun">确认</el-button>
                </div>
            </div>
        </div>
    </div>
    <!-- 成功提示组件 -->
    <successHint v-if="successHintFlag" :successHintMsg="successHintMsg" @close="close_hint('successHintFlag')"></successHint>
  </div>
</template>

<script type="text/ecmascript-6">
import pagination from "@components/pagination"; // 分页组件
import successHint from "@/system/adjust-accounts/counter-deal/components/success-hint"; // 成功提示组件
import { counterDealApi } from "@/system/adjust-accounts/counter-deal/js/server"; // 接口
export default {
  data() {
    return {
      NoPassList: [], // 记张时未扣款成功的出账编号
      passFlag: true, // 记账时判断有无扣款成功
      loanNo: "", // 出账编号
      customerName: "", // 客户姓名
      lineidName: "", // 合作机构
      certNo: "", // 身份证号码
      charge_hint: false, // 发起口扣款开关
      state_hint: false, // 查询扣款状态开关
      back_hint: false, // 退回开关
      tally_hint: false, // 记账开关
      successHintFlag: false, // 成功提示开关
      successHintMsg: '', // 成功提示文字
      pageConfig: {
        account: 10, // 总条数
        pageSize: 50, // 当前多少条数据
        currentPage: 1, // 当前页
        showJumpButton: true // 显示跳转按钮
      }, // 分页
      transSerialNos: [], // 删除接口参数
      for_: [] // 渲染列表
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
            phaseNos: ['0030'],
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
            "phaseNos": ["0030"]
        };
        current = current || 1;
        let url = counterDealApi.buybackQueryList + "?current=" + current + "&size=50";
        console.log(url, 'url');
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
                reject(err.message);
            });
       });
    },
    // 代偿发起-记账
     buyBackBookkeep(res) {
       return new Promise((resolve, reject) => {
            res = res || {};
            let url = counterDealApi.buyBackBookkeep;
            this.$MyFetch.post(url, res)
            .then((data = {}) => {
                resolve(data);
            })
            .catch((err) => {
                reject(err.message);
            });
       });
    },
    // 代偿发起-发起扣款
     buyBackDeduct(res) {
       return new Promise((resolve, reject) => {
            res = res || {};
            let url = counterDealApi.buyBackDeduct;
            this.$MyFetch.post(url, res)
            .then((data = {}) => {
                resolve(data);
            })
            .catch((err) => {
                reject(err.message);
            });
       });
    },
    // 代偿发起-查询扣款状态
     buyQueryDeductionStatus(res) {
       return new Promise((resolve, reject) => {
            res = res || {};
            let url = counterDealApi.buyQueryDeductionStatus;
            this.$MyFetch.post(url, res)
            .then((data = {}) => {
                resolve(data);
            })
            .catch((err) => {
                reject(err.message);
            });
       });
    },
    // 发起扣款按钮
    charge_fun() {
         if (this.transSerialNos.length < 1) {
            this.$message("请至少选择一条数据！");
        } else {
            this.charge_hint = true;
        }
    },
    // 扣款状态查询按钮
    state_fun() {
         if (this.transSerialNos.length < 1) {
            this.$message("请至少选择一条数据！");
        } else {
            this.state_hint = true;
        }
    },
    // 退回按钮
    back_fun() {
        if (this.transSerialNos.length < 1) {
            this.$message("请至少选择一条数据！");
        } else {
            this.back_hint = true;
        }
    },
    // 记账按钮
    tally_fun() {
         if (this.transSerialNos.length < 1) {
            this.$message("请至少选择一条数据！");
        } else {
            if (this.passFlag) {
                this.tally_hint = true;
            } else {
                this.$error("含有未扣款的数据，出账编号为：" + this.NoPassList.join("、"));
            }
        }
    },
    // 关闭弹窗
    close_hint(flag) {
      this[flag] = false;
    },
    // 确认扣款弹窗
    affirm_charge_fun() {
        let _this = this;
      this.charge_hint = false;
      // 发起扣款参数
      let buyBackDeductData = {
          transSerialNos: this.transSerialNos
      };
      this.buyBackDeduct(buyBackDeductData)
      .then((data = {}) => {
            _this.successHintFlag = true;
            _this.successHintMsg = data.message;
            _this.reload();
        })
        .catch((err) => {
           this.$error(err);
        });
    },
    // 确认扣款状态查询弹窗
    affirm_state_fun() {
        let _this = this;
        this.state_hint = false;
        // 发起扣款参数
        let queryData = {
            transSerialNos: this.transSerialNos
        };
        this.buyQueryDeductionStatus(queryData)
        .then((data = {}) => {
                _this.successHintFlag = true;
                _this.successHintMsg = data.message;
                _this.reload();
            })
            .catch((err) => {
            this.$error(err);
            });
    },
    // 确认退回弹窗
    affirm_back_fun() {
        let queryData = {
            flowNo: "buyBackFlow",
            phaseNo: '0060',
            transSerialNos: this.transSerialNos
        };
        this.buyBackReviewReturn(queryData)
        .then((data) => {
          console.log(data, "删除成功");
            this.reload();
            this.back_hint = false;
        })
        .catch((err) => {
            this.$error(err);
            this.reload();
            this.back_hint = false;
        });
    },
    // 确认记账弹窗
    affirm_tally_fun() {
        let queryData = {
            flowNo: "buyBackFlow",
            transSerialNos: this.transSerialNos
        };
        this.buyBackBookkeep(queryData)
        .then((data) => {
            this.reload();
            this.tally_hint = false;
        })
        .catch((err) => {
            this.$error(err);
            this.reload();
            this.tally_hint = false;
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
        this.NoPassList = [];
        this.passFlag = true;
        data.forEach(element => {
            this.transSerialNos.push(element.relateId);
            if (element.deductStatusCd !== '2') {
                this.passFlag = false;
                this.NoPassList.push(element.loanNo);
            }
        });
    },
    // 行选中
    rowCheck(row, column, e) {
      this.$refs.multipleTable.toggleRowSelection(row);
    }
  },
  components: {
    successHint, // 成功提示
    pagination // 分页组件
  },
  created() {}
};
</script>
<style lang="less" scoped>
.table_box {
    height: 620px;
}
</style>
