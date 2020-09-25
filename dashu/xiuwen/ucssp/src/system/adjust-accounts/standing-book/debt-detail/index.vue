<template>
  <div id="audit_box">
    <div class="audit_box" id="audit_box">
      <div class="audit_top" id="audit_top" ref="auditTop">
        <div class="backAudit">
          <router-link to="/system/adjust-accounts/standing-book/standing-book-home">
            <span class="gray_font bold">贷款台账</span>
          </router-link>
          <span class="el-icon-arrow-left"></span>
          <span class="blue_font">借据详情</span>
        </div>
      </div>
      <div class="audit_bottom">
        <!-- 左侧导航栏 -->
        <div class="content_nav">
          <div
            class="nav-button"
            v-for="(item,index) in navArr"
            :key="index"
            :class="{clickNav : activeBtn == index}"
            @click="goAnchor('#anchor-'+index,index)"
          >{{item}}</div>
        </div>
        <!-- </el-col> -->
        <!-- 主内容 -->
        <!-- <el-col :span="21"> -->
        <div class="content_right_box">
          <!-- 基础信息 -->
          <div class="content_border">
            <div class="content_title_head" :class="{ content_title_on : !activeBtn }">
              <span class="content_title_headA" id="#anchor-0"></span>
              <span class="content_title_headB">基础信息</span>
            </div>
            <div class="content">
              <div class="contentItem">
                <span class="contentItemTitle">出账编号:</span>
                <span class="contentItemCon" v-html="detailList.loan_no"></span>
              </div>
              <div class="contentItem">
                <span class="contentItemTitle">分公司:</span>
                <span class="contentItemCon" v-html="detailList.operate_org_id"></span>
              </div>
              <div class="contentItem">
                <span class="contentItemTitle">货币种类:</span>
                <span class="contentItemCon" v-html="detailList.currency"></span>
              </div>
              <div class="contentItem">
                <span class="contentItemTitle">客户姓名:</span>
                <span class="contentItemCon" v-html="detailList.customer_name"></span>
              </div>
              <div class="contentItem">
                <span class="contentItemTitle">资金方:</span>
                <span class="contentItemCon" v-html="detailList.line_id"></span>
              </div>
              <div class="contentItem">
                <span class="contentItemTitle">合作方:</span>
                <span class="contentItemCon" v-html="detailList.fund_org"></span>
              </div>
              <div class="contentItem">
                <span class="contentItemTitle">证件号码:</span>
                <span class="contentItemCon">{{cert_no_filters(detailList.cert_no)}}</span>
              </div>
              <div class="contentItem">
                <span class="contentItemTitle">合作模式:</span>
                <span class="contentItemCon" v-html="detailList.collaborate"></span>
              </div>
              <div class="contentItem">
                <span class="contentItemTitle">贷款状态:</span>
                <span class="contentItemCon" v-html="detailList.loan_status"></span>
              </div>
              <!-- <div class="contentItem">
                <span class="contentItemTitle">一级产品:</span>
                <span class="contentItemCon" v-html="detailList.first_product"></span>
              </div> -->
            </div>
          </div>
          <!-- 借据信息 -->
          <div class="content_border">
            <div class="content_title_head" :class="{ content_title_on : activeBtn === 1 }">
              <span class="content_title_headA" id="#anchor-1"></span>
              <span class="content_title_headB">借据信息</span>
            </div>
            <div class="content">
              <div class="contentA">
                <div class="content_title">还款信息</div>
                <div class="contentItem">
                  <span class="contentItemTitle">出账日期:</span>
                  <span class="contentItemCon" v-html="detailList.putout_date"></span>
                </div>
                <div class="contentItem">
                  <span class="contentItemTitle">到期日期:</span>
                  <span class="contentItemCon" v-html="detailList.maturity_date"></span>
                </div>
                <div class="contentItem">
                  <span class="contentItemTitle">贷款期限:</span>
                  <span class="contentItemCon" v-html="detailList.loan_term"></span>
                </div>
                <div class="contentItem">
                  <span class="contentItemTitle">贷款方式:</span>
                  <span class="contentItemCon" v-html="detailList.return_method"></span>
                </div>
                <div class="contentItem">
                  <span class="contentItemTitle">默认还款日:</span>
                  <span class="contentItemCon" v-html="detailList.begin_date"></span>
                </div>
                <div class="contentItem" style="margin-right: 0;">
                  <span class="contentItemTitle">上次结息日:</span>
                  <span class="contentItemCon" v-html="detailList.last_inte_date"></span>
                </div>
                <div class="contentItem">
                  <span class="contentItemTitle">下次还款日:</span>
                  <span class="contentItemCon" v-html="detailList.next_pay_date"></span>
                </div>
                <div class="contentItem">
                  <span class="contentItemTitle">还款周期:</span>
                  <span class="contentItemCon" v-html="detailList.return_period"></span>
                </div>
                <!-- 830催收需求剥离出去 -->
                <!-- <div class="contentItem">
                  <span class="contentItemTitle">扣款账号:</span>
                  <span class="contentItemCon" v-html="detailList.deduct_accno"></span>
                </div>
                <div class="contentItem">
                  <span class="contentItemTitle">扣款银行:</span>
                  <span class="contentItemCon" v-html="detailList.bank_code"></span>
                </div> -->
                <div class="contentItem">
                  <span class="contentItemTitle">还款宽限日:</span>
                  <span class="contentItemCon" v-html="detailList.grace_term"></span>
                </div>
                <div class="contentItem">
                  <span class="contentItemTitle">转让日期:</span>
                  <span class="contentItemCon" v-html="detailList.transfer_date"></span>
                </div>
                <div class="contentItem">
                  <span class="contentItemTitle">债权方名称:</span>
                  <span class="contentItemCon" v-html="detailList.transfer_org"></span>
                </div>
              </div>
              <div class="contentA">
                <div class="content_title">余额信息</div>
                <div class="contentItem">
                  <span class="contentItemTitle">放款金额:</span>
                  <span class="orange" v-html="detailList.business_sum"></span>
                </div>
                <div class="contentItem">
                  <span class="contentItemTitle">正常余额:</span>
                  <span class="orange" v-html="detailList.normal_balance"></span>
                </div>
                <div class="contentItem">
                  <span class="contentItemTitle">逾期余额:</span>
                  <span class="orange" v-html="detailList.overdue_balance"></span>
                </div>
                <div class="contentItem">
                  <span class="contentItemTitle">正常利息:</span>
                  <span class="orange" v-html="detailList.normal_inte"></span>
                </div>
                <div class="contentItem">
                  <span class="contentItemTitle">逾期利息:</span>
                  <span class="orange" v-html="detailList.overdue_inte"></span>
                </div>
                <div class="contentItem">
                  <span class="contentItemTitle">罚息:</span>
                  <span class="orange" v-html="detailList.fine_inte"></span>
                </div>
                <div class="contentItem" style="margin-right: 0;">
                  <span class="contentItemTitle">复利:</span>
                  <span class="orange" v-html="detailList.compound"></span>
                </div>
              </div>
              <div class="contentA">
                <div class="content_title">利率信息</div>
                <div class="contentItem">
                  <span class="contentItemTitle">基准利率:</span>
                  <span class="contentItemCon">{{detailList.base_rate}}%</span>
                </div>
                <div class="contentItem">
                  <span class="contentItemTitle">基准月利率:</span>
                  <span class="contentItemCon">{{detailList.base_month_rate}}%</span>
                </div>
                <div class="contentItem">
                  <span class="contentItemTitle">利率模式:</span>
                  <span class="contentItemCon" v-html="detailList.rate_mode"></span>
                </div>
                <div class="contentItem">
                  <span class="contentItemTitle">利率浮动幅度:</span>
                  <span class="contentItemCon" v-html="detailList.rate_float"></span>
                </div>
                <div class="contentItem">
                  <span class="contentItemTitle">执行年利率:</span>
                  <span class="contentItemCon">{{detailList.execute_rate}}%</span>
                </div>
                <div class="contentItem">
                  <span class="contentItemTitle">基准利率代码:</span>
                  <span class="contentItemCon" v-html="detailList.rate_code"></span>
                </div>
                <div class="contentItem">
                  <span class="contentItemTitle">罚息利率:</span>
                  <span class="contentItemCon">{{detailList.fine_rate}}%</span>
                </div>
                <div class="contentItem">
                  <span class="contentItemTitle">复利利率:</span>
                  <span class="contentItemCon">{{detailList.inte_rate}}%</span>
                </div>
              </div>
              <div class="contentA">
                <div class="content_title">借据附属信息</div>
                <div class="contentItem">
                  <span class="contentItemTitle">首次本息逾期日期:</span>
                  <span class="contentItemCon" v-html="detailList.corp_first_overdue_date"></span>
                </div>
                <div class="contentItem">
                  <span class="contentItemTitle">本息逾期天数:</span>
                  <span class="contentItemCon" v-html="detailList.corp_current_overdue_days"></span>
                </div>
                <div class="contentItem">
                  <span class="contentItemTitle">首次费用逾期日期:</span>
                  <span class="contentItemCon" v-html="detailList.fee_first_overdue_date"></span>
                </div>
                <div class="contentItem">
                  <span class="contentItemTitle">费用逾期天数:</span>
                  <span class="contentItemCon" v-html="detailList.fee_current_overdue_days"></span>
                </div>
                <!-- <div class="contentItem">
                  <span class="contentItemTitle">当前逾期天数:</span>
                  <span class="contentItemCon" v-html="detailList.current_overdue_days"></span>
                </div>
                <div class="contentItem">
                  <span class="contentItemTitle">计提日期:</span>
                  <span class="contentItemCon" v-html="detailList.accrued_date"></span>
                </div> -->
              </div>
              <div class="contentA" style="border-bottom: none;">
                <div class="content_title">费用信息</div>
                <el-table
                  :default-sort="{prop: 'date', order: 'descending'}"
                  :header-cell-style="{'font-size':'12px','text-align':'center','height':'38.9px','background':'#ececec'}"
                  ref="multipleTable"
                  :data="feeInformationList"
                  tooltip-effect="dark"
                  style="width: 100%; border: 1px solid #E9E9E9;"
                  @selection-change="handleSelectionChange"
                >
                  <el-table-column prop="feeName" label="费用类型"></el-table-column>
                  <el-table-column prop="varchargeMethod" label="费用收取方式"></el-table-column>
                  <el-table-column prop="rate" label="费率">
                    <template slot-scope="scope">
                      <span>{{(scope.row.rate)}}%</span>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
              <div class="contentA" style="border-bottom: none;">
                <div class="content_title">账号信息</div>
                <el-table
                  :default-sort="{prop: 'date', order: 'descending'}"
                  :header-cell-style="{'font-size':'12px','text-align':'center','height':'38.9px','background':'#ececec'}"
                  ref="multipleTable"
                  :data="IDlist"
                  tooltip-effect="dark"
                  style="width: 100%; border: 1px solid #E9E9E9;"
                  @selection-change="handleSelectionChange"
                >
                  <el-table-column prop="name" label="账号类型"></el-table-column>
                  <el-table-column prop="accno" label="卡号"></el-table-column>
                  <el-table-column prop="code" label="所属银行"></el-table-column>
                </el-table>
              </div>
            </div>
          </div>
          <!-- 交易信息 -->
          <div class="content_border">
            <div class="content_title_head" :class="{ content_title_on : activeBtn === 2 }">
              <span class="content_title_headA" id="#anchor-2"></span>
              <span class="content_title_headB">交易信息</span>
            </div>
            <div class="content">
              <div class="contentA">
                <div class="content_title">还款计划</div>
                <el-tabs v-model="activeName" @tab-click="handleClick" class="tab">
                  <el-tab-pane label="总还款计划" name="plan1"></el-tab-pane>
                  <!-- <el-tab-pane label="客户本息还款计划" name="plan1"></el-tab-pane>
                  <el-tab-pane label="银行本息还款计划" name="plan2"></el-tab-pane> -->
                  <el-tab-pane label="客户费用计划" name="plan2"></el-tab-pane>
                  <el-tab-pane label="分润计划" name="plan3"></el-tab-pane>
                  <el-tab-pane label="银行费用计划" name="plan4"></el-tab-pane>
                </el-tabs>
                <el-button class="educe" @click="exportRepaymentPlan">导出</el-button>
                <div v-if="masterRepaymentPlan" class="table_box">
                  <el-table
                    :default-sort="{prop: 'date', order: 'descending'}"
                    :header-cell-style="{'font-size':'12px','text-align':'center','height':'38.9px','background':'#ececec'}"
                    ref="multipleTable"
                    :data="totalRepaymentPlans"
                    max-height="430"
                    tooltip-effect="dark"
                    style="width: 100%; border: 1px solid #E9E9E9;"
                    @selection-change="handleSelectionChange"
                  >
                    <el-table-column prop="sterm" label="期次"></el-table-column>
                    <el-table-column width="100" prop="payDate" label="应还日期"></el-table-column>
                    <el-table-column width="100" prop="ddDate" label="代垫日期"></el-table-column>
                    <el-table-column prop="payCorp" label="应还本金"></el-table-column>
                    <el-table-column prop="actualCorp" label="实还本金"></el-table-column>
                    <el-table-column prop="payInte" label="应还利息"></el-table-column>
                    <el-table-column prop="actualInte" label="实还利息"></el-table-column>
                    <el-table-column prop="payFine" label="应还罚息"></el-table-column>
                    <el-table-column prop="actualFine" label="实还罚息"></el-table-column>
                    <el-table-column prop="payCompound" label="应还复利"></el-table-column>
                    <el-table-column prop="actualCompound" label="实还复利"></el-table-column>
                    <el-table-column width="100" prop="ddCorp" label="应还代垫本金"></el-table-column>
                    <el-table-column width="100" prop="ddActualCorp" label="实还代垫本金"></el-table-column>
                    <el-table-column width="100" prop="ddInte" label="应还代垫利息"></el-table-column>
                    <el-table-column width="100" prop="ddActualInte" label="实还代垫利息"></el-table-column>
                    <el-table-column width="100" prop="ddFine" label="应还代垫罚息"></el-table-column>
                    <el-table-column width="100" prop="ddActualFine" label="实还代垫罚息"></el-table-column>
                    <el-table-column width="100" prop="ddCompound" label="应还代垫复利"></el-table-column>
                    <el-table-column width="100" prop="ddActualCompound" label="实还代垫复利"></el-table-column>
                    <el-table-column width="100" prop="payBankFine" label="应还银行罚息"></el-table-column>
                    <el-table-column width="100" prop="actualBankFine" label="实还银行罚息"></el-table-column>
                    <el-table-column width="100" prop="payBankCompound" label="应还银行复利"></el-table-column>
                    <el-table-column width="100" prop="actualBankCompound" label="实还银行复利"></el-table-column>
                    <el-table-column prop="payAmount" label="总应还费用"></el-table-column>
                    <el-table-column prop="actualAmount" label="总实还费用"></el-table-column>
                    <el-table-column prop="ddFlag" label="代垫状态"></el-table-column>
                    <el-table-column fixed="right" prop="payOffFlag" label="结清状态"></el-table-column>
                  </el-table>
                </div>
                <!-- <div v-if="customerRepaymentPlan" class="table_box">
                  <el-table
                    :default-sort="{prop: 'date', order: 'descending'}"
                    :header-cell-style="{'font-size':'12px','text-align':'center','height':'38.9px','background':'#ececec'}"
                    ref="multipleTable"
                    max-height="450"
                    :data="customerRepaymentList"
                    tooltip-effect="dark"
                    style="width: 100%; border: 1px solid #E9E9E9;"
                    @selection-change="handleSelectionChange"
                  >
                    <el-table-column prop="sterm" label="期次"></el-table-column>
                    <el-table-column prop="payDate" label="应还日期"></el-table-column>
                    <el-table-column prop="payCorp" label="应还本金"></el-table-column>
                    <el-table-column prop="actualCorp" label="实还本金"></el-table-column>
                    <el-table-column prop="payInte" label="应还利息"></el-table-column>
                    <el-table-column prop="actualInte" label="实还利息"></el-table-column>
                    <el-table-column prop="payFine" label="应还罚息"></el-table-column>
                    <el-table-column prop="actualFine" label="实还罚息"></el-table-column>
                    <el-table-column prop="payCompound" label="应还复利"></el-table-column>
                    <el-table-column prop="actualCompound" label="实还复利"></el-table-column>
                    <el-table-column prop="ddFlag" label="代垫状态"></el-table-column>
                    <el-table-column prop="payOffFlag" label="结清状态"></el-table-column>
                  </el-table>
                </div> -->
                <!-- <div v-if="bankRepaymentPlan" class="table_box">
                  <el-table
                    :default-sort="{prop: 'date', order: 'descending'}"
                    :header-cell-style="{'font-size':'12px','text-align':'center','height':'38.9px','background':'#ececec'}"
                    ref="multipleTable"
                    max-height="450"
                    :data="listOfBankRepayment"
                    tooltip-effect="dark"
                    style="width: 100%; border: 1px solid #E9E9E9;"
                    @selection-change="handleSelectionChange"
                  >
                    <el-table-column prop="sterm" label="期次"></el-table-column>
                    <el-table-column prop="payDate" label="应还日期"></el-table-column>
                    <el-table-column prop="payCorp" label="应还本金"></el-table-column>
                    <el-table-column prop="actualCorp" label="实还本金"></el-table-column>
                    <el-table-column prop="payInte" label="应还利息"></el-table-column>
                    <el-table-column prop="actualInte" label="实还利息"></el-table-column>
                    <el-table-column prop="payFine" label="应还银行罚息"></el-table-column>
                    <el-table-column prop="actualFine" label="实还银行罚息"></el-table-column>
                    <el-table-column prop="payCompound" label="应还银行复利"></el-table-column>
                    <el-table-column prop="actualCompound" label="实还银行复利"></el-table-column>
                    <el-table-column prop="payoffFlag" label="结清状态"></el-table-column>
                  </el-table>
                </div> -->
                <div v-if="bankExpensePlan" class="table_box">
                  <el-table
                    :default-sort="{prop: 'date', order: 'descending'}"
                    :header-cell-style="{'font-size':'12px','text-align':'center','height':'38.9px','background':'#ececec'}"
                    ref="multipleTable"
                    :data="listOfBankExpense"
                    max-height="430"
                    tooltip-effect="dark"
                    style="width: 100%; border: 1px solid #E9E9E9;"
                    @selection-change="handleSelectionChange"
                  >
                    <el-table-column prop="sterm" label="期次"></el-table-column>
                    <el-table-column prop="payDate" label="应还日期"></el-table-column>
                    <el-table-column prop="payAmount" label="应还费用"></el-table-column>
                    <el-table-column prop="actualAmount" label="实还费用"></el-table-column>
                    <el-table-column prop="feeType" label="费用类型"></el-table-column>
                    <el-table-column prop="payFine" label="应还罚息"></el-table-column>
                    <el-table-column prop="actualFine" label="实还罚息"></el-table-column>
                    <el-table-column fixed="right" prop="payoffFlag" label="结清状态"></el-table-column>
                  </el-table>
                </div>
                <div v-if="largeExpensePlan" class="table_box">
                  <el-table
                    :default-sort="{prop: 'date', order: 'descending'}"
                    :header-cell-style="{'font-size':'12px','text-align':'center','height':'38.9px','background':'#ececec'}"
                    ref="multipleTable"
                    :data="listOfMajorExpense"
                    max-height="430"
                    tooltip-effect="dark"
                    style="width: 100%; border: 1px solid #E9E9E9;"
                    @selection-change="handleSelectionChange"
                  >
                    <el-table-column prop="sterm" label="期次"></el-table-column>
                    <el-table-column prop="payDate" label="应还日期"></el-table-column>
                    <el-table-column prop="payAmount" label="应还费用"></el-table-column>
                    <el-table-column prop="actualAmount" label="实还费用"></el-table-column>
                    <el-table-column prop="feeType" label="费用类型"></el-table-column>
                    <el-table-column prop="payFine" label="应还费用罚息"></el-table-column>
                    <el-table-column prop="actualFine" label="实还费用罚息"></el-table-column>
                    <el-table-column fixed="right" prop="payoffFlag" label="结清状态"></el-table-column>
                  </el-table>
                </div>
                <div v-if="fenRunPlan" class="table_box">
                  <el-table
                    :default-sort="{prop: 'date', order: 'descending'}"
                    :header-cell-style="{'font-size':'12px','text-align':'center','height':'38.9px','background':'#ececec'}"
                    ref="multipleTable"
                    :data="fenRunplanList"
                    max-height="430"
                    tooltip-effect="dark"
                    style="width: 100%; border: 1px solid #E9E9E9;"
                    @selection-change="handleSelectionChange"
                  >
                    <el-table-column prop="sterm" label="期次"></el-table-column>
                    <el-table-column prop="payMonth" label="应还月份"></el-table-column>
                    <el-table-column prop="payAmount" label="应还费用"></el-table-column>
                    <el-table-column prop="actualAmount" label="实还费用"></el-table-column>
                    <el-table-column prop="feeType" label="费用类型"></el-table-column>
                    <el-table-column fixed="right" prop="payoffFlag" label="结清状态"></el-table-column>
                  </el-table>
                </div>
              </div>
              <div class="contentA">
                <div class="content_title">交易明细</div>
                <el-input class="inputBox" v-model="issue" placeholder="期次"></el-input>
                <el-button class="interrogate" @click="referDetail">查询</el-button>
                <el-button class="emptyB" @click="emptyDetail">清空</el-button>
                <div class="table_box">
                  <el-table
                    :default-sort="{prop: 'date', order: 'descending'}"
                    :header-cell-style="{'font-size':'12px','text-align':'center','height':'38.9px','background':'#ececec'}"
                    ref="multipleTable"
                    :data="listTransactions"
                    tooltip-effect="dark"
                    style="width: 100%; border: 1px solid #E9E9E9;"
                    @sort-change="handleSortChange"
                    @selection-change="handleSelectionChange"
                  >
                    <el-table-column width="200" prop="trans_serial_no" label="总单号"></el-table-column>
                    <el-table-column width="200" prop="bill_no" label="单据号"></el-table-column>
                    <el-table-column prop="sterm" sortable label="期次"></el-table-column>
                    <el-table-column width="100" prop="bill_type" label="单据类型"></el-table-column>
                    <el-table-column prop="bill_status" label="单据状态"></el-table-column>
                    <el-table-column width="100" sortable prop="pay_date" label="应还日期"></el-table-column>
                    <el-table-column width="100" sortable prop="acc_date" label="记账日期"></el-table-column>
                    <el-table-column prop="pay_corp" label="应还本金"></el-table-column>
                    <el-table-column prop="actual_corp" label="实还本金"></el-table-column>
                    <el-table-column prop="pay_inte" label="应还利息"></el-table-column>
                    <el-table-column prop="actual_inte" label="实还利息"></el-table-column>
                    <el-table-column prop="pay_fine" label="应还罚息"></el-table-column>
                    <el-table-column prop="actual_fine" label="实还罚息"></el-table-column>
                    <el-table-column prop="pay_compound" label="应还复利"></el-table-column>
                    <el-table-column prop="actual_compound" label="实还复利"></el-table-column>
                    <el-table-column width="100" prop="pay_bank_fine" label="应还银行罚息"></el-table-column>
                    <el-table-column width="100" prop="actual_bank_fine" label="实还银行罚息"></el-table-column>
                    <el-table-column width="100" prop="pay_bank_compound" label="应还银行复利"></el-table-column>
                    <el-table-column width="100" prop="actual_bank_compound" label="实还银行复利"></el-table-column>
                    <el-table-column width="100" prop="dd_pay_fine" label="应还代垫罚息"></el-table-column>
                    <el-table-column width="100" prop="dd_actual_fine" label="实还代垫罚息"></el-table-column>
                    <el-table-column width="100" prop="dd_pay_compound" label="应还代垫复利"></el-table-column>
                    <el-table-column width="100" prop="dd_actual_compound" label="实还代垫复利"></el-table-column>
                    <el-table-column prop="pay_amount" label="应还费用"></el-table-column>
                    <el-table-column prop="actual_amount" label="实还费用"></el-table-column>
                    <el-table-column width="100" prop="fee_type" label="费用类型"></el-table-column>
                    <el-table-column width="150" prop="acc_user" label="制单人"></el-table-column>
                    <el-table-column label="操作" fixed="right">
                      <template slot-scope="scope">
                        <el-button type="text" @click="displaySentry(scope.row)">分录信息</el-button>
                      </template>
                    </el-table-column>
                  </el-table>
                  <!-- 分页 -->
                  <div class="page_box">
                    <!-- 分页条 -->
                    <pagination @jump-page="jumpDetail" :page="pageConfigDetail" class="pagination"></pagination>
                  </div>
                </div>
              </div>
              <div class="contentA">
                <div class="content_title">交易总单</div>
                <el-input class="inputBox" v-model="numberOfSingle" placeholder="总单号"></el-input>
                <el-button class="interrogate" @click="referDetailSingle">查询</el-button>
                <el-button class="emptyB" @click="emptyNumberOfSingle">清空</el-button>
                <div class="table_box table_box_box">
                  <el-table
                    :default-sort="{prop: 'date', order: 'descending'}"
                    :header-cell-style="{'font-size':'12px','text-align':'center','height':'38.9px','background':'#ececec'}"
                    ref="multipleTable"
                    :data="tableTransactions"
                    tooltip-effect="dark"
                    style="width: 100%; border: 1px solid #E9E9E9;"
                    @selection-change="handleSelectionChange"
                    @expand-change="handleExpandChange"
                    @sort-change="handleSortChangeChange"
                    :row-class-name="tableRowClassName"
                  >
                    <el-table-column type="expand">
                      <template slot-scope="props">
                        <span>{{props.tablesTables}}</span>
                        <el-table
                          :default-sort="{prop: 'date', order: 'descending'}"
                          :header-cell-style="{'font-size':'12px','text-align':'center','height':'38.9px','background':'#ececec'}"
                          ref="multipleTable"
                          :data="totalSingleEntry[props.row.rowIndex]"
                          tooltip-effect="dark"
                          style="width: 100%; border: 1px solid #E9E9E9;"
                        >
                          <el-table-column prop="subjectNo" label="所属科目号"></el-table-column>
                          <el-table-column width="200" prop="subjectName" label="所属科目名称"></el-table-column>
                          <el-table-column prop="subSubjectNo" label="辅助科目"></el-table-column>
                          <el-table-column width="200" prop="subSubjectName" label="辅助科目名"></el-table-column>
                          <!-- <el-table-column prop="orgId" label="入账机构"></el-table-column> -->
                          <el-table-column width="120" prop="debitAmount" label="借方余额（元）"></el-table-column>
                          <el-table-column width="120" prop="creditAmount" label="贷方余额（元）"></el-table-column>
                          <el-table-column width="110" prop="accDate" label="记账日期"></el-table-column>
                        </el-table>
                      </template>
                    </el-table-column>
                    <el-table-column width="180" prop="loanNo" label="出账编号"></el-table-column>
                    <el-table-column width="250" prop="transSerialNo" label="总单号"></el-table-column>
                    <el-table-column prop="transType" label="交易类型"></el-table-column>
                    <!-- <el-table-column prop="inputAmount" label="录入金额"></el-table-column>
                    <el-table-column prop="occDate" sortable label="交易日期">
                      <template slot-scope="scope">
                        <span>{{date_filters(scope.row.occDate)}}</span>
                      </template>
                    </el-table-column> -->
                    <el-table-column prop="accDate" sortable label="记账日期">
                      <template slot-scope="scope">
                        <span>{{date_filters(scope.row.accDate)}}</span>
                      </template>
                    </el-table-column>
                    <el-table-column prop="transAmount" label="交易金额"></el-table-column>
                    <el-table-column prop="createdBy" label="操作人"></el-table-column>
                    <el-table-column width="180" prop="occDate" label="操作日期">
                      <template slot-scope="scope">
                        <span>{{date_filterss(scope.row.occDate)}}</span>
                      </template>
                    </el-table-column>
                    <el-table-column label="操作">
                      <template slot-scope="scope">
                        <el-button type="text" @click="generalList(scope.row)">交易明细</el-button>
                      </template>
                    </el-table-column>
                  </el-table>
                  <!-- 分页 -->
                  <div class="page_box">
                    <!-- 分页条 -->
                    <pagination @jump-page="jumpSingle" :page="pageConfigSingle" class="pagination"></pagination>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- 余额信息 -->
          <div class="content_border">
            <div class="content_title_head" :class="{ content_title_on : activeBtn === 3 }">
              <span class="content_title_headA" id="#anchor-3"></span>
              <span class="content_title_headB">余额信息</span>
            </div>
            <div class="content">
              <div class="contentA">
                <div class="content_title">财务科目余额信息</div>
                <el-input class="inputBox" v-model="subjectNumber" placeholder="所属科目号"></el-input>
                <el-button class="interrogate" @click="referFinancial">查询</el-button>
                <el-button class="emptyB" @click="emptyQueryInterface">清空</el-button>
                <div class="table_box">
                  <el-table
                    :default-sort="{prop: 'date', order: 'descending'}"
                    :header-cell-style="{'font-size':'12px','text-align':'center','height':'38.9px','background':'#ececec'}"
                    ref="multipleTable"
                    :data="accountBalance"
                    tooltip-effect="dark"
                    style="width: 100%; border: 1px solid #E9E9E9;"
                    @selection-change="handleSelectionChange"
                  >
                    <el-table-column prop="subject_no" label="所属科目号"></el-table-column>
                    <el-table-column width="210" prop="subject_name" label="所属科目名称"></el-table-column>
                    <el-table-column prop="sub_subject_no" label="辅助科目"></el-table-column>
                    <el-table-column prop="sub_subject_name" label="辅助科目名"></el-table-column>
                    <el-table-column prop="org_id" label="入账机构"></el-table-column>
                    <el-table-column prop="currency_name" label="币种"></el-table-column>
                    <el-table-column prop="debit_balance" label="借方余额（元）"></el-table-column>
                    <el-table-column prop="credit_balance" label="贷方余额（元）"></el-table-column>
                    <!-- <el-table-column prop="created_date" label="发生日期">
                      <template slot-scope="scope">
                        <span>{{date_filterss(scope.row.created_date)}}</span>
                      </template>
                    </el-table-column> -->
                    <!-- <el-table-column prop="loan_no" label="出账编号"></el-table-column> -->
                    <el-table-column label="操作" fixed="right">
                      <template slot-scope="scope">
                        <el-button type="text" @click="openEntryDetails(scope.row)">分录详情</el-button>
                      </template>
                    </el-table-column>
                  </el-table>
                  <!-- 分页 -->
                  <div class="page_box">
                    <!-- 分页条 -->
                    <pagination
                      @jump-page="jumpDetailFinancial"
                      :page="pageConfigFinancial"
                      class="pagination"
                    ></pagination>
                  </div>
                </div>
              </div>
              <div class="contentA">
                <div class="content_title">贷款科目余额信息</div>
                <el-input class="inputBox" v-model="queryConditions" placeholder="所属科目号"></el-input>
                <el-button class="interrogate" @click="referLoan">查询</el-button>
                <el-button class="emptyB" @click="emptyLoanAccountBalance">清空</el-button>
                <div class="table_box">
                  <el-table
                    :default-sort="{prop: 'date', order: 'descending'}"
                    :header-cell-style="{'font-size':'12px','text-align':'center','height':'38.9px','background':'#ececec'}"
                    ref="multipleTable"
                    :data="loanBalanceInformation"
                    tooltip-effect="dark"
                    style="width: 100%; border: 1px solid #E9E9E9;"
                    @selection-change="handleSelectionChange"
                  >
                    <el-table-column prop="subject_no" label="所属科目号"></el-table-column>
                    <el-table-column prop="subject_name" label="所属科目名称"></el-table-column>
                    <el-table-column prop="org_id" label="入账机构"></el-table-column>
                    <el-table-column prop="currency_name" label="币种"></el-table-column>
                    <el-table-column prop="debit_balance" label="借方余额（元）"></el-table-column>
                    <!-- <el-table-column prop="loan_no" label="出账编号"></el-table-column> -->
                    <el-table-column prop="credit_balance" label="贷方余额（元）"></el-table-column>
                    <!-- <el-table-column prop="created_date" label="发生日期">
                      <template slot-scope="scope">
                        <span>{{date_filterss(scope.row.created_date)}}</span>
                      </template>
                    </el-table-column> -->
                    <el-table-column label="操作" fixed="right">
                      <template slot-scope="scope">
                        <el-button type="text" @click="loanEntryDetails(scope.row.subject_no)">分录详情</el-button>
                      </template>
                    </el-table-column>
                  </el-table>
                  <!-- 分页 -->
                  <div class="page_box">
                    <!-- 分页条 -->
                    <pagination
                      @jump-page="jumpDetailLoan"
                      :page="pageConfigLoan"
                      class="pagination"
                    ></pagination>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <entryInformation
      :entryInformationList="entryInformationList"
      v-if="openEntry"
      @close_f="close_"
    />
    <entryDetails
      :queryJY="queryJY"
      :batchNumberIntroduced="batchNumberIntroduced"
      :auxiliaryCourse="auxiliaryCourse"
      v-if="openDetails"
      @close_x="close_xq"
    />
    <entryDetailsDK
      :queryDK="queryDK"
      :batchIntroduced="batchIntroduced"
      v-if="openLoanDetails"
      @closeLoan="close_Loann"
    />
    <transactionDetails @clockOpen="open_close" v-if="aaa" :entryInTest="totalList" :isShowDialog="isShowCredit" :iframe="true" :center="true"></transactionDetails>
  </div>
</template>

<script>
import transactionDetails from "../debt-detail/transactionDetails/index"; // 引入交易总单交易明细
import pagination from "@components/pagination"; // 分页条
import entryInformation from "./entryInformation/index"; // 分录信息组件
import entryDetails from "./entryDetails/index"; // 分录详情组件（财务科目余额信息）
import entryDetailsDK from "./entryDetailsDK/index"; // 分录详情组件（贷款科目余额信息）
import { checkingApi } from "../../js/server"; // 接口
export default {
  data() {
    return {
      aaa: false, // 交易总单明细组件默认不显示
      masterRepaymentPlan: true, // 总还款计划
      // customerRepaymentPlan: true, // 客户还款计划汇总默认显示
      // bankRepaymentPlan: false, // 银行还款计划默认不显示
      bankExpensePlan: false, // 银行费用计划默认不显示
      largeExpensePlan: false, // 大数费用计划默认不显示
      fenRunPlan: false, // 分润计划默认不显示
      openEntry: false, // 分录信息组件默认不显示
      openDetails: false, // 分录详情组件默认不显示（财务科目）
      openLoanDetails: false, // 分录详情组件默认不显示（贷款科目）
      isShowCredit: true, // 交易总单交易明细默认显示
      // creditReport: "", // 图片url
      // openTransaction: false, // 交易总单交易明细默认不显示
      pageConfigDetail: {
        account: 0, // 总条数
        pageSize: 10, // 当前多少条数据
        currentPage: 1, // 当前页
        showJumpButton: true // 显示跳转按钮
      }, // 交易明细分页
      pageConfigFinancial: {
        account: 0, // 总条数
        pageSize: 10, // 当前多少条数据
        currentPage: 1, // 当前页
        showJumpButton: true // 显示跳转按钮
      }, // 财务科目余额信息列表分页
      pageConfigLoan: {
        account: 0, // 总条数
        pageSize: 10, // 当前多少条数据
        currentPage: 1, // 当前页
        showJumpButton: true // 显示跳转按钮
      }, // 贷款科目余额信息列表分页
      pageConfigSingle: {
        account: 0, // 总条数
        pageSize: 10, // 当前多少条数据
        currentPage: 1, // 当前页
        showJumpButton: true // 显示跳转按钮
      }, // 交易总单分页
      detailList: {}, // 借据详情所有字段
      feeInformationList: [], // 费用信息列表数据
      IDlist: [{
        name: '还款卡',
        accno: '',
        code: ''
      },
      {
        name: '收款卡',
        accno: '',
        code: ''
      }], // 账号信息列表数据
      totalSingleEntry: [], // 总单分录列表
      listTransactions: [], // 交易明细渲染列表
      tableTransactions: [], // 交易总单渲染列表
      accountBalance: [], // 财务科目余额信息列表
      loanBalanceInformation: [], // 贷款科目余额信息列表
      // customerRepaymentList: [], // 客户还款计划列表
      totalRepaymentPlans: [], // 总还款计划列表
      // listOfBankRepayment: [], // 银行还款计划列表
      listOfBankExpense: [], // 银行费用计划列表
      listOfMajorExpense: [], // 大数费用计划列表
      fenRunplanList: [], // 分润计划列表
      totalList: "", // 交易总单交易号字段
      // 交易明细查询数据
      searchData: {
        eq: {}
      },
      // 财务科目余额信息列表查询数据
      searchDataFinancial: {
        eq: {}
      },
      // 贷款科目余额信息列表查询数据
      searchDataLoan: {
        eq: {}
      },
      // 交易总单查询数据
      searchDataSingle: {
        eq: {}
      },
      entryInformationList: [], // 交易明细分录信息的列表
      batchNumberIntroduced: "", // 打开财务科目余额信息的分录详情带入科目号
      auxiliaryCourse: "", // 打开财务科目余额信息的分录详情带入辅助科目
      batchIntroduced: "", // 打开贷款科目余额信息的分录详情带入科目号
      queryJY: "", // 打开财务科目余额信息的分录详情带入出账编号
      queryDK: "", // 打开贷款科目余额信息的分录详情带入出账编号
      issue: "", // 交易明细列表查询字段
      numberOfSingle: "", // 交易总单列表查询字段
      subjectNumber: "", // 财务科目余额信息列表查询字段
      queryConditions: "", // 贷款科目余额信息列表查询字段
      for_: [],
      navArr: ["基础信息", "借据信息", "交易信息", "余额信息"],
      activeBtn: 0,
      auditTopHeight: 0,
      activeName: "plan1" // tab切换
    };
  },
  components: {
    pagination, // 分页
    transactionDetails, // 交易总单明细
    entryInformation,
    entryDetails,
    entryDetailsDK
  },
  created() {
    // 动态导航栏
    if (this.navBardian) {
      this.navArr = this.navArr.concat(this.navBardian);
    }
    this.detailInterface();
    this.referDetail("");
    this.referDetailSingle("");
    // this.queryInterface();
    // this.loanAccountBalance();
    this.referFinancial();
    this.referLoan();
  },
  mounted() {
    this.repaymentPlanList("total_pay_plan"); // 总还款计划
  },
  methods: {
    tableRowClassName({row, rowIndex}) {
      row.rowIndex = rowIndex;
    },
    // 当行展开或者关闭触发的事件
    handleExpandChange(row, expandedRows) {
      if (expandedRows.length > 1) {
        expandedRows.shift();
      }
      console.log(row);
      console.log(expandedRows);
      let url = checkingApi.LoanSearchi;
      let data = {
        transSerialNo: row.transSerialNo
      };
      this.$MyFetch
        .post(url, data)
        .then((data = {}) => {
          this.totalSingleEntry.splice(row.rowIndex, 1, data);
          // this.totalSingleEntry = data;
          console.log(this.totalSingleEntry);
          console.log(data);
        })
        .catch(err => {
          this.$error(err.message);
        });
    },
    // 处理身份证掩码
    cert_no_filters(val) {
      if (val) {
        val = val.split("");
        val.splice(4, 10, "**********");
        return val.join("");
      }
    },
    // 还款计划列表总接口
    repaymentPlanList(ProjectType) {
      let url = `${checkingApi.LoanSearchc}`;
      let data = {
        loanNo: this.$route.query.loan_no, // 出账编号
        payPlanType: ProjectType // 计划类型
      };
      this.$MyFetch
        .post(url, data)
        .then((data = {}) => {
          console.log(data);
          if (ProjectType === "total_pay_plan") {
            this.totalRepaymentPlans = data.total_pay_plan;
            console.log(data);
          } else if (ProjectType === "bank_fee_plan") {
            this.listOfBankExpense = data.bank_fee_plan;
            console.log(data);
          } else if (ProjectType === "customer_fee_plan") {
            this.listOfMajorExpense = data.customer_fee_plan;
            console.log(data);
          } else {
            this.fenRunplanList = data.org_fee_info;
            console.log(data);
          }
        })
        .catch(err => {
          this.$error(err.message);
        });
        for (let i = 0; i < 10; i++) {
        this.totalSingleEntry.push([]);
      }
    },
    // 财务科目余额信息列表查询接口
    loanParameterFinancial(res, current) {
      res = res || {};
      current = current || 1;
      let url = checkingApi.LoanSearcha + "?current=" + current + "&size=10";
      this.$MyFetch
        .post(url, res)
        .then((data = {}) => {
          console.log(data);
          this.accountBalance = data.records;
          // 总条数
          this.pageConfigFinancial.account = data.total;
          // 当前页
          this.pageConfigFinancial.currentPage = data.current;
          // 一页有几条数据 pageSize
          this.pageConfigFinancial.pageSize = data.size;
        })
        .catch(err => {
          this.$error(err.message);
        });
    },
    // 财务科目余额信息列表查询
    referFinancial() {
      this.searchDataFinancial.eq.loan_no = this.$route.query.loan_no;
      this.searchDataFinancial.eq.subject_no = this.subjectNumber;
      this.loanParameterFinancial(this.searchDataFinancial);
      console.log(this.searchDataFinancial);
    },
    // 清空财务科目余额信息列表查询条件
    emptyQueryInterface() {
      this.subjectNumber = "";
    },
    // 财务科目余额信息列表查询接口
    // loanAccountBalance() {
    //   let url = `${checkingApi.LoanSearchb}`;
    //   let data = {
    //     eq: {
    //       loan_no: this.$route.query.loan_no, // 出账编号
    //       subject_no: this.queryConditions // 所属科目号
    //     }
    //   };
    //   this.$MyFetch
    //     .post(url, data)
    //     .then((data = {}) => {
    //       console.log(data);
    //       this.loanBalanceInformation = data.records;
    //     })
    //     .catch(err => {
    //       this.$error(err.message);
    //     });
    // },
    // 贷款科目余额信息列表查询接口
    loanParameterLoan(res, current) {
      res = res || {};
      current = current || 1;
      let url = checkingApi.LoanSearchb + "?current=" + current + "&size=10";
      this.$MyFetch
        .post(url, res)
        .then((data = {}) => {
          console.log(data);
          this.loanBalanceInformation = data.records;
          // 总条数
          this.pageConfigLoan.account = data.total;
          // 当前页
          this.pageConfigLoan.currentPage = data.current;
          // 一页有几条数据 pageSize
          this.pageConfigLoan.pageSize = data.size;
        })
        .catch(err => {
          this.$error(err.message);
        });
    },
    // 贷款科目余额信息列表查询
    referLoan() {
      this.searchDataLoan.eq.loan_no = this.$route.query.loan_no;
      this.searchDataLoan.eq.subject_no = this.queryConditions;
      this.loanParameterLoan(this.searchDataLoan);
      console.log(this.searchDataLoan);
    },
    // 清空贷款科目余额信息列表查询条件
    emptyLoanAccountBalance() {
      this.queryConditions = "";
    },
    // // 贷款科目余额信息列表查询接口
    // queryInterface() {
    //   let url = `${checkingApi.LoanSearcha}`;
    //   let data = {
    //     eq: {
    //       loan_no: this.$route.query.loan_no, // 出账编号
    //       subject_no: this.subjectNumber // 所属科目号
    //     }
    //   };
    //   this.$MyFetch
    //     .post(url, data)
    //     .then((data = {}) => {
    //       console.log(data);
    //       this.accountBalance = data.records;
    //     })
    //     .catch(err => {
    //       this.$error(err.message);
    //     });
    // },
    // 毫秒格式化
    date_filtersh(data) {
      function change(t) {
        if (t < 10) {
          return "0" + t;
        } else {
          return t;
        }
      }
      if (data) {
        var date = new Date(data * 1000); // 时间戳为10位需*1000，时间戳为13位的话不需乘1000;
        let Y = date.getFullYear() + "/";
        let M =
          (date.getMonth() + 1 < 10
            ? "0" + (date.getMonth() + 1)
            : date.getMonth() + 1) + "/";
        let D = change(date.getDate());
        return Y + M + D;
      } else {
        return "---";
      }
    },
    // 毫秒格式化
    date_filters(data) {
      function change(t) {
        if (t < 10) {
          return "0" + t;
        } else {
          return t;
        }
      }
      if (data) {
        var date = new Date(data); // 时间戳为10位需*1000，时间戳为13位的话不需乘1000;
        let Y = date.getFullYear() + "/";
        let M =
          (date.getMonth() + 1 < 10
            ? "0" + (date.getMonth() + 1)
            : date.getMonth() + 1) + "/";
        let D = change(date.getDate());
        return Y + M + D;
      } else {
        return "---";
      }
    },
    // 毫秒格式化有时分秒的
    date_filterss(data) {
      function change(t) {
        if (t < 10) {
          return "0" + t;
        } else {
          return t;
        }
      }
      if (data) {
        var date = new Date(data); // 时间戳为10位需*1000，时间戳为13位的话不需乘1000;
        let Y = date.getFullYear() + "-";
        let M =
          (date.getMonth() + 1 < 10
            ? "0" + (date.getMonth() + 1)
            : date.getMonth() + 1) + "-";
        let D = change(date.getDate()) + " ";
        let h = change(date.getHours()) + ":";
        let m = change(date.getMinutes()) + ":";
        let s = change(date.getSeconds());
        return Y + M + D + h + m + s;
      } else {
        return "---";
      }
    },
    // 贷款台账交易明细接口
    loanParameter(res, current) {
      res = res || {};
      current = current || 1;
      let url = checkingApi.LoanSearchw + "?current=" + current + "&size=10";
      this.$MyFetch
        .post(url, res)
        .then((data = {}) => {
          console.log(data);
          this.listTransactions = data.records;
          // 总条数
          this.pageConfigDetail.account = data.total;
          // 当前页
          this.pageConfigDetail.currentPage = data.current;
          // 一页有几条数据 pageSize
          this.pageConfigDetail.pageSize = data.size;
        })
        .catch(err => {
          this.$error(err.message);
        });
    },
    // 贷款台账交易明细查询
    referDetail(orderDate) {
      this.searchData.eq.loan_no = this.$route.query.loan_no;
      this.searchData.eq.sterm = this.issue;
      this.searchData.orderParam = orderDate;
      this.loanParameter(this.searchData);
      console.log(this.searchData);
    },
    // 交易明细的应还日期和记账日期和期次的排序
    handleSortChange(column, prop, order) {
      if (column.prop === "pay_date" && column.order === "ascending") {
        this.referDetail("payDateAsc");
      } else if (column.prop === "pay_date" && column.order === "descending") {
        this.referDetail("payDateDesc");
      } else if (column.prop === "sterm" && column.order === "ascending") {
        this.referDetail("stermAsc");
      } else if (column.prop === "sterm" && column.order === "descending") {
        this.referDetail("stermDesc");
      } else if (column.prop === "acc_date" && column.order === "ascending") {
        this.referDetail("accDateAsc");
      } else {
        this.referDetail("accDateDesc");
      }
      console.log(column);
    },
    // 清空交易明细查询条件
    emptyDetail() {
      this.issue = "";
    },
    // 打开分录信息组件
    displaySentry(detail) {
      if (detail.version_val >= 900000001) {
        this.confirmFn("历史数据请从对应的总单查看分录详情");
      } else {
        this.openEntry = true;
        let url = checkingApi.LoanSearchk;
        let data = {
          eq: {
            loan_no: this.$route.query.loan_no, // 出账编号
            bill_no: detail.bill_no // 单据交易编号
          }
        };
        this.$MyFetch
          .post(url, data)
          .then((data = {}) => {
            this.entryInformationList = data;
            console.log(data);
          })
          .catch(err => {
            this.$error(err.message);
          });
        }
    },
    // 关闭分录信息组件
    close_() {
      this.openEntry = false;
    },
    // 贷款台账交易总单接口
    loanParameterSingle(res, current) {
      res = res || {};
      current = current || 1;
      let url = checkingApi.LoanSearchz + "?current=" + current + "&size=10";
      this.$MyFetch
        .post(url, res)
        .then((data = {}) => {
          console.log(data, "请求数据");
          this.tableTransactions = data.records;
          // 总条数
          this.pageConfigSingle.account = data.total;
          // 当前页
          this.pageConfigSingle.currentPage = data.current;
          // 一页有几条数据 pageSize
          this.pageConfigSingle.pageSize = data.size;
        })
        .catch(err => {
          this.$error(err.message);
        });
    },
    // 贷款台账交易总单查询
    referDetailSingle(orderDate) {
      this.searchDataSingle.eq.loan_no = this.$route.query.loan_no;
      this.searchDataSingle.eq.trans_serial_no = this.numberOfSingle;
      this.searchDataSingle.orderDate = orderDate;
      this.loanParameterSingle(this.searchDataSingle);
    },
    // 清空交易总单查询条件
    emptyNumberOfSingle() {
      this.numberOfSingle = "";
    },
    // 关闭交易总单交易明细弹窗
    open_close() {
      this.aaa = false;
    },
    // 打开贷款台账交易总单的交易明细
    generalList (detail) {
      // this.$getCreditReport('apraud', id).then(res => {
      //   this.creditReport = res;
      // this.isShowCredit = true;
      this.aaa = true;
      this.totalList = detail.transSerialNo; // 单据交易编号
      console.log(this.totalList);
      // });
      // let url = checkingApi.LoanSearchzm;
      // let data = {
      //   eq: {
      //     // loan_no: this.$route.query.loan_no, // 出账编号
      //     trans_serial_no: detail.transSerialNo // 单据交易编号
      //   }
      // };
      // this.$MyFetch
      //   .post(url, data)
      //   .then((data = {}) => {
      //     this.totalList = data.records;
      //     console.log(data);
      //   })
      //   .catch(err => {
      //     this.$error(err.message);
      //   });
    },
    // 关闭贷款台账交易总单的交易明细
    // close_transaction() {
    //   this.openTransaction = false;
    // },
    // 交易总单的交易日期和记账日期排序
    handleSortChangeChange(column, prop, order) {
      if (column.prop === "occDate" && column.order === "ascending") {
        this.referDetailSingle("occDateAsc");
      } else if (column.prop === "occDate" && column.order === "descending") {
        this.referDetailSingle("occDateDesc");
      } else if (column.prop === "accDate" && column.order === "ascending") {
        this.referDetailSingle("accDateAsc");
      } else {
        this.referDetailSingle("accDateDesc");
      }
    },
    // 借据详情接口
    detailInterface() {
      let url = `${checkingApi.LoanSearchh}`;
      this.$MyFetch
        .get(url, this.$route.query)
        .then((data = {}) => {
          console.log(data);
          this.detailList = data;
          // TODO: 反的
          this.IDlist[0].accno = data.deduct_accno; // 还款
          this.IDlist[0].code = data.bank_code;
          this.IDlist[1].accno = data.putout_accno; // 收款
          this.IDlist[1].code = data.putout_bank_code;
          this.feeInformationList = data.feeLists;
        })
        .catch(err => {
          this.$error(err.message);
        });
    },
    // 交易明细分页
    jumpDetail(pageNum) {
      console.log(pageNum);
      this.loanParameter(this.searchData, pageNum);
    },
    // 财务科目余额信息分页
    jumpDetailFinancial(pageNum) {
      console.log(pageNum);
      this.loanParameterFinancial(this.searchDataFinancial, pageNum);
    },
    // 贷款科目余额信息分页
    jumpDetailLoan(pageNum) {
      console.log(pageNum);
      this.loanParameterLoan(this.searchDataLoan, pageNum);
    },
    // 交易总单分页
    jumpSingle(pageNum) {
      console.log(pageNum);
      this.loanParameterSingle(this.searchDataSingle, pageNum);
    },
    // 打开分录详情组件（财务科目）
    openEntryDetails(detail) {
      this.auxiliaryCourse = detail.sub_subject_no;
      this.batchNumberIntroduced = detail.subject_no;
      this.queryJY = this.$route.query.loan_no;
      this.openDetails = true;
    },
    // 关闭分录详情组件（财务科目）
    close_xq() {
      this.openDetails = false;
    },
    // 打开分录详情组件（贷款科目）
    loanEntryDetails(detail) {
      this.batchIntroduced = detail;
      this.queryDK = this.$route.query.loan_no;
      this.openLoanDetails = true;
    },
    // 关闭分录详情组件（贷款科目）
    close_Loann() {
      this.openLoanDetails = false;
    },
    // 选中复选框
    handleSelectionChange(data) {
      console.log(data);
    },
    // 固定锚链接导航
    goAnchor(selector, index) {
      this.activeBtn = index;
      document.getElementById(selector).scrollIntoView();
    },
    // tab切换
    handleClick(tab) {
      console.log(tab.name);
      if (tab.name === "plan1") {
        this.masterRepaymentPlan = true;
        // this.customerRepaymentPlan = true;
        // this.bankRepaymentPlan = false;
        this.bankExpensePlan = false;
        this.largeExpensePlan = false;
        this.fenRunPlan = false;
      } else if (tab.name === "plan2") {
        this.repaymentPlanList("customer_fee_plan"); // 大数费用计划
        this.masterRepaymentPlan = false;
        // this.customerRepaymentPlan = false;
        // this.bankRepaymentPlan = false;
        this.bankExpensePlan = false;
        this.largeExpensePlan = true;
        this.fenRunPlan = false;
        // this.repaymentPlanList("bank_fee_plan"); // 银行费用计划
        // this.masterRepaymentPlan = false;
        // // this.customerRepaymentPlan = false;
        // // this.bankRepaymentPlan = false;
        // this.bankExpensePlan = true;
        // this.largeExpensePlan = false;
        // this.fenRunPlan = false;
      } else if (tab.name === "plan3") {
        this.repaymentPlanList("org_fee_info"); // 分润计划
        this.masterRepaymentPlan = false;
        // this.customerRepaymentPlan = false;
        // this.bankRepaymentPlan = false;
        this.bankExpensePlan = false;
        this.largeExpensePlan = false;
        this.fenRunPlan = true;
        // this.repaymentPlanList("customer_fee_plan"); // 大数费用计划
        // this.masterRepaymentPlan = false;
        // // this.customerRepaymentPlan = false;
        // // this.bankRepaymentPlan = false;
        // this.bankExpensePlan = false;
        // this.largeExpensePlan = true;
        // this.fenRunPlan = false;
      } else {
        this.repaymentPlanList("bank_fee_plan"); // 银行费用计划
        this.masterRepaymentPlan = false;
        // this.customerRepaymentPlan = false;
        // this.bankRepaymentPlan = false;
        this.bankExpensePlan = true;
        this.largeExpensePlan = false;
        this.fenRunPlan = false;
        // this.repaymentPlanList("org_fee_info"); // 分润计划
        // this.masterRepaymentPlan = false;
        // // this.customerRepaymentPlan = false;
        // // this.bankRepaymentPlan = false;
        // this.bankExpensePlan = false;
        // this.largeExpensePlan = false;
        // this.fenRunPlan = true;
      }
    },
    // 点击还款计划导出按钮
    exportRepaymentPlan() {
      if (this.masterRepaymentPlan) {
        let url = checkingApi.LoanSearchaaa;
        let data = {
          parameter: this.$route.query.loan_no, // 出账编号
          type: "total_pay_plan" // 计划类型
        };
        this.$MyFetch
          .post(url, data)
          .then((data = {}) => {
            console.log(data.downUrl);
            let link = document.createElement('a');
            let url = data.downUrl;
            link.href = url;
            link.target = "blank";
            document.body.appendChild(link);
            link.click();
          })
          .catch(err => {
            this.$error(err.message);
          });
      } else if (this.bankExpensePlan) {
        let url = checkingApi.LoanSearchaaa;
        let data = {
          parameter: this.$route.query.loan_no, // 出账编号
          type: "bank_fee_plan" // 计划类型
        };
        this.$MyFetch
          .post(url, data)
          .then((data = {}) => {
            console.log(data);
            let link = document.createElement('a');
            let url = data.downUrl;
            link.href = url;
            link.target = "blank";
            document.body.appendChild(link);
            link.click();
          })
          .catch(err => {
            this.$error(err.message);
          });
      } else if (this.largeExpensePlan) {
        let url = checkingApi.LoanSearchaaa;
        let data = {
          parameter: this.$route.query.loan_no, // 出账编号
          type: "customer_fee_plan" // 计划类型
        };
        this.$MyFetch
          .post(url, data)
          .then((data = {}) => {
            console.log(data);
            let link = document.createElement('a');
            let url = data.downUrl;
            link.href = url;
            link.target = "blank";
            document.body.appendChild(link);
            link.click();
          })
          .catch(err => {
            this.$error(err.message);
          });
      } else {
        let url = checkingApi.LoanSearchaaa;
        let data = {
          parameter: this.$route.query.loan_no, // 出账编号
          type: "org_fee_info" // 计划类型
        };
        this.$MyFetch
          .post(url, data)
          .then((data = {}) => {
            console.log(data);
            let link = document.createElement('a');
            let url = data.downUrl;
            link.href = url;
            link.target = "blank";
            document.body.appendChild(link);
            link.click();
          })
          .catch(err => {
            this.$error(err.message);
          });
      }
    }
  }
};
</script>
<style lang="less" rel="stylesheet/less" scoped>
// 公共样式
/deep/.el-tabs__item {
  font-size: 12px;
}
.tab {
  height: 35px;
  line-height: 35px;
  font-size: 12px;
  color: #333333;
}
.contentItem {
  display: inline-block;
  margin-right: 60px;
  .contentItemTitle {
    display: inline-block;
    height: 40px;
    line-height: 40px;
    font-size: 14px;
    color: #666;
    letter-spacing: 0.86px;
  }
  .contentItemCon {
    display: inline-block;
    height: 40px;
    line-height: 40px;
    font-size: 14px;
    color: #000000;
    letter-spacing: 0.86px;
  }
}
.contentA {
  border-bottom: 1px solid #d0d0d0;
  padding-bottom: 10px;
  margin-right: 20px;
  /deep/ .el-tabs__nav-wrap::after {
    background-color: white;
  }
  // 清空
  .emptyB {
    width: 100px;
    height: 40px;
    border: 1px solid #538bf1;
    border-radius: 4px;
    font-size: 14px;
    color: #538bf1;
    letter-spacing: 1.07px;
    text-align: center;
  }
  // 查询
  .interrogate {
    width: 100px;
    height: 40px;
    background: #538bf1;
    border-radius: 4px;
    font-size: 14px;
    color: #ffffff;
    letter-spacing: 1.07px;
    text-align: center;
  }
  // 输入框
  .inputBox {
    width: 160px;
    height: 40px;
    border: 1px solid #d0d0d0;
    border-radius: 4px;
  }
  // 表格的行去掉border-box
  .table_box_box {
    .el-table td div {
      box-sizing:none;
    }
  }
  // 表格
  .table_box {
    width: 99%;
    // height: 100%;
    margin-top: 21px;
    // overflow: auto;
    .page_box {
      margin-top: 30px;
    }
  }
  // .table_box_huankuan {
  //   height: 500px;
  // }
  //按钮
  .educe {
    border: 1px solid #538bf1;
    border-radius: 4px;
    width: 100px;
    height: 40px;
    font-size: 14px;
    color: #538bf1;
    letter-spacing: 1.07px;
    text-align: center;
    margin-top: 20px;
  }
}
.audit_box {
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  top: 60px;
  z-index: 500;
  overflow: heidden;
  background: #f5f5f5;
  .audit_top {
    .backAudit {
      text-align: left;
      margin-left: 30px;
      margin-top: 20px;
    }
  }
  .audit_bottom {
    height: 865px;
    overflow: auto;
    padding-bottom: 400px;
    .content_nav {
      position: fixed;
      top: 115px;
      left: 0;
      width: 142px;
      border-radius: 4px;
      background: #fff;
      box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.08);
      .nav-button {
        text-align: left;
        line-height: 36px;
        text-indent: 24px;
        font-size: 14px;
        color: #333333;
        letter-spacing: -0.34px;
        cursor: pointer;
        &:hover {
          background: #eef1f6;
        }
      }
      .clickNav {
        border-left: 4px solid #538bf1;
        text-indent: 20px;
        background: #f0f8fc;
        color: #538bf1;
      }
    }
  }
}

/* 下内容 */
.audit_box {
  .audit_bottom {
    // background: #ececec;
    position: relative;
  }
  /* 下方布局 */
  .content_right_box {
    margin-top: 30px;
    margin-left: 174px;
  }
  .content {
    border-radius: 4px;
    background: #fff;
    box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.08);
    overflow: hidden;
    margin: 10px 30px 0 30px;
    padding: 6px 0 6px 22px;
  }
  .content_border {
    border-left: 2px solid #cfd7e6; // 左侧分界线
    padding-top: 10px;
    padding-bottom: 10px;
    margin-top: 10px;
    position: relative;

    &.last_padding300 {
      padding-bottom: 300px;
    }
  }

  .content_title_head {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    position: absolute;
    top: -10px;
    left: -10px;
  }
  .content_title_headA {
    border-radius: 50px;
    display: -moz-inline-box;
    display: inline-block;
    width: 17px;
    height: 17px;
    background: #cfd7e6;
    border: 4px solid #fff;
  }
  .content_title_headB {
    padding-left: 9px;
    font-weight: bold;
    font-size: 14px;
    color: #000;
  }
  .content_title_on {
    .content_title_headA {
      background: #ffffff;
      border: 4px solid #538bf1;
    }
    .content_title_headB {
      color: #538bf1;
    }
  }

  .content_bottom_border {
    margin: 0 30px;
    padding-bottom: 10px;
    border-bottom: 1px solid #d0d0d0;

    .content_title {
      margin-left: 0;
    }
  }
  /* 清浮动 */
  .clearfloat:after {
    display: block;
    clear: both;
    content: "";
    visibility: hidden;
    height: 0;
  }
  .clearfloat {
    zoom: 1;
  }
  .topology_margin {
    margin: 0 -30px;
  }
  .content_title {
    margin-top: 20px;
    margin-bottom: 15px;
    padding-bottom: 2px;
    font-size: 14px;
    color: #333333;
    letter-spacing: 0;
    text-indent: 6px;
    border-left: 2px solid #538bf1;
  }
  .content_table_wrap {
    padding: 30px;
  }
  .content_table_box {
    padding: 0 30px 0 30px;

    &:last-child {
      padding-bottom: 25px;
    }

    .content_title {
      margin-left: 0;
    }
  }

  /* 爬虫界面列表 */
  .conntent_list {
    margin-top: 20px;
    border: 1px solid #d0d0d0;
    border-bottom: none;

    .content_item {
      height: 60px;
      border-bottom: 1px solid #d0d0d0;
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: center;

      .content_item_left {
        width: 100px;
        min-width: 100px;
        line-height: 60px;
        text-align: center;
        border-right: 1px solid #d0d0d0;
      }
      .content_item_center {
        min-width: 200px;
        height: 60px;
        line-height: 60px;
        text-align: center;
        border-right: 1px solid #d0d0d0;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .content_item_right {
        padding-left: 30px;
        align-self: stretch;
        /* Firefox */
        display: -moz-box;
        -moz-box-pack: center;
        -moz-box-align: center;

        /* Safari、Opera 以及 Chrome */
        display: -webkit-box;
        -webkit-box-pack: center;
        -webkit-box-align: center;

        /* W3C */
        display: box;
        box-pack: center;
        box-align: center;
      }
    }
  }
  /* 蓝色字体 */
  .blue_font {
    font-size: 14px;
    color: #538bf1;
    letter-spacing: -0.34px;
  }
  /* 灰色字体 */
  .gray_font {
    font-size: 14px;
    color: #666;
    letter-spacing: -0.34px;
  }
  a {
    text-decoration: none;
  }
  /* 黑色字体 */
  .black_font {
    font-size: 14px;
    color: #333333;
    letter-spacing: -0.34px;
  }
  .orange {
    font-size: 14px;
    color: orange;
  }

  /* 联系人信息表格 */
  .my_table {
    width: 1186px;
    border: 1px solid #d0d0d0;
    margin: 20px;
  }

  .my_table_head {
    font-size: 12px;
    color: #666;
    letter-spacing: 0;
    text-align: center;
    border-bottom: 1px solid #d0d0d0;
    line-height: 30px;
    height: 30px;
  }
  .my_table_body > td > div {
    background: #ffffff;
    border: 1px solid #dddddd;
    border-radius: 3px;
    height: 30px;
    line-height: 30px;
    width: 70%;
    margin: 15px auto;
  }

  /* 备注汇总 */
  .content_text_wrap {
    padding-bottom: 20px;
    &:last-child {
      border: none;
    }
  }
  .content_text {
    line-height: 20px;
  }
  /*调查预约*/
  .content_top_padding {
    padding-top: 10px;
  }
  .red {
    color: #f00;
  }
}
</style>
