<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-07-03 16:20:54
 * @LastEditTime: 2019-07-03 16:20:54
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
         <!-- 案件状态 -->
         <el-select v-model="ChannelValue" class="select_72" placeholder="案件状态" clearable>
            <el-option v-for="(item, index) in ChannelList"
            :key="index"
            :label="item.phaseName"
            :value="item.phaseNo">
            </el-option>
        </el-select>
        <el-date-picker style="margin-right: 15px"
            v-model="dateRange"
            lign="left"
            type="daterange" :editable='false'
            value-format="yyyy-MM-dd"
            range-separator="至"
            start-placeholder="代偿日期(起)"
            end-placeholder="代偿日期(终)">
        </el-date-picker>
        <el-button class="b_button query button" @click="refer">查询</el-button>
        <el-button class="b_button empty button" @click="empty">清空</el-button>
      </div>
      <!-- 带全选的表格 -->
        <div class="table_box">
            <el-table
            :default-sort = "{prop: 'date', order: 'descending'}"
            :header-cell-style="{'font-size':'12px','text-align':'center','height':'38.9px','background':'#ececec'}"
            ref="multipleTable"
            max-height="690"
            :data="for_"
            v-loading='loading'
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
                width="100px"
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
            prop="deductStatusCdName"
            fixed="right"
            label="扣款状态">
            </el-table-column>
            </el-table>
        </div>
        <!-- 分页 -->
      <pagination @jump-page="jump" :page="pageConfig" class="pagination"></pagination>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import pagination from "@components/pagination"; // 分页组件
import { counterDealApi } from "@/system/adjust-accounts/counter-deal/js/server"; // 接口
// import { checkingApi } from "../../../../js/server"; // 接口
export default {
  data() {
    return {
      ChannelValue: '', // 案件状态绑定值
      ChannelList: [], // 案件状态下拉
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
      loading: false,
      dateRange: [],
      for_: [] // 渲染列表
    };
  },
  mounted() {
      this.buybackQueryList();
      this.phaseNameChannelLists({flowNo: 'buyBackFlow'});
  },
  methods: {
      // 案件状态下拉
    phaseNameChannelLists(res) {
      res = res || {};
      this.$MyFetch.post(counterDealApi.PhaseNameList, res)
      .then((data = {}) => {
          this.ChannelList = data;
      })
      .catch((err) => {
          this.$error(err.message);
      });
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
        this.ChannelValue = '';
        this.dateRange = [];
    },
    // reload
    reload(pageNum) {
        let data = {
            flowNo: 'buyBackFlow',
            phaseNos: ['0010', '0020', '0030', '0050', '0060', '1000', '2000'],
            loanNo: this.loanNo,
            customerName: this.customerName,
            lineidName: this.lineidName,
            certNo: this.certNo,
            phaseNo: this.ChannelValue,
            buybackBeginDate: this.dateRange ? this.dateRange[0] : undefined,
            buybackEndDate: this.dateRange ? this.dateRange[1] : undefined
        };
        let current = pageNum || 1;
        this.buybackQueryList(data, current);
    },
    // 代偿申请查询列表接口
    buybackQueryList(res, current) {
        res = res || {
            "flowNo": "buyBackFlow",
            "phaseNos": ['0010', '0020', '0030', '0050', '0060', '1000', '2000']
        };
        current = current || 1;
        let url = counterDealApi.buybackQueryList + "?current=" + current + "&size=50";
        this.loading = true;
        this.$MyFetch.post(url, res, {timeout: 120000})
        .then((data = {}) => {
            this.for_ = data.records;
            // 总条数
            this.pageConfig.account = data.total || 1;
            // 当前页
            this.pageConfig.currentPage = data.current || 1;
            // 一页有几条数据 pageSize
            this.pageConfig.pageSize = data.size || 10;
            this.loading = false;
        })
        .catch((err) => {
            this.loading = false;
            this.$error(err.message);
        });
    },
    // 分页
    jump(pageNum) {
        this.pageConfig.currentPage = pageNum;
        this.reload(pageNum);
    },
    // 选中复选框事件
    handleSelectionChange(data) {
      console.log(data);
    },
    // 行选中
    rowCheck(row, column, e) {
      this.$refs.multipleTable.toggleRowSelection(row);
    }
  },
  components: {
    pagination // 分页组件
  },
  created() {}
};
</script>
<style lang="less" scoped>
.table_box {
    height: 690px;
}
</style>
