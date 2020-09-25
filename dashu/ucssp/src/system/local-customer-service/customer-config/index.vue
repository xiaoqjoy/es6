<template>
  <div class="customer_config">
    <div class="b_content">
      <el-form :inline="true" ref="searchForm" :model="searchInfo" label-width="80px">
        <el-form-item>
          <el-input v-model="searchInfo.applicationId" placeholder="申请编号"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="searchInfo.customerName" placeholder="借款人姓名"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="searchInfo.custServiceName" maxlength="15" placeholder="属地客服"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button class="btn b_button query" @click="search">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button class="btn b_button empty" @click="clearSearch">清空</el-button>
        </el-form-item>
        <el-form-item v-show="showExchangeBtn()">
          <el-button class="btn query" @click="exchangeCustomer">属地客服置换</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-table height="600"
      :data="tableData"
      v-loading="tableLoading"
      class="common__table"
      header-cell-class-name="table-head"
      row-class-name="table-tr"
      style="width: 100%">
      <el-table-column
        v-for="item in columns" :key="item.label"
        :prop="item.prop" :label="item.label" :width="item.width">
        <template slot-scope="scope">
          <el-popover width="500" trigger="hover" placement="top" v-if="item.showTemp">
              <p>{{ scope.row[item.prop] }}</p>
              <div slot="reference">
                <p class="yincan">{{ scope.row[item.prop] }}</p>
              </div>
          </el-popover>
          <span v-if="!item.showTemp">{{ scope.row[item.prop] }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="openDetail(scope.row)">详情</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination :page="pageConfig" class="pagination"  @jump-page="getTabData"></pagination>
    <detail v-if="detailVisable" @closeDetail="closeDetailCtl" :detailVisable='detailVisable' :detaiInfo="detaiInfo"></detail>
    <div class="exchange_customer">
      <el-dialog
        title="属地客服置换" :visible="exchangeVisable"
        width="520px" center :close-on-click-modal="false"
        :before-close="exchangeDialogClose">
        <div>
          <el-form ref="exchangeCustomerCom" :rules="exchangeRule"
          :model="exchangeCustomerForm" :inline="true"
          label-width="80px" label-position="top">
            <el-form-item label="原属地客服" prop="oldCustServiceId">
              <el-select v-model="exchangeCustomerForm.oldCustServiceId" placeholder="请选择" filterable>
                <el-option filterable v-for="item in localCustemService"
                  :key="item.itemCode" :label="item.itemDesc"
                  :value="item.itemCode">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="新属地客服" prop="newCustServiceId">
              <el-select v-model="exchangeCustomerForm.newCustServiceId" placeholder="请选择" filterable>
                <el-option filterable v-for="item in localCustemService"
                  :key="item.itemCode" :label="item.itemDesc"
                  :value="item.itemCode">
                </el-option>
              </el-select>
            </el-form-item>
          </el-form>
        </div>
        <div slot="footer">
          <el-button class="btn b_button query" @click="exchangeConfirm">确 定</el-button>
          <el-button class="btn b_button empty" @click="exchangeDialogClose">取 消</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import {customerConfigApi} from './../js/server';
import pagination from "@components/pagination";
import detail from './detail';
export default {
  name: 'customer-servie-config',
  data() {
    return {
      msg: 'xxx',
      detailVisable: false,
      exchangeVisable: false,
      searchInfo: {
        applicationId: '',
        custServiceName: '',
        customerName: ''
      },
      tableData: [],
      localCustemService: [],
      detaiInfo: {},
      exchangeCustomerForm: {
        oldCustServiceId: '',
        newCustServiceId: ''
      },
      tableLoading: false,
      exchangeRule: {
        oldCustServiceId: [
          {required: true, message: '请选择原属地客服', trigger: 'change'}
        ],
        newCustServiceId: [
          {required: true, message: '请选择新属地客服', trigger: 'change'}
        ]
      },
      columns: [
        { label: '申请编号', prop: 'applicationId' },
        { label: '申请日期', prop: 'applicationDate' },
        { label: '借款人姓名', prop: 'customerName' },
        { label: '借款人身份证号', prop: 'certificateNum' },
        { label: '合作机构一', prop: 'orgName1' },
        { label: '合作机构二', prop: 'orgName2' },
        { label: '属地客服', prop: 'custServiceName' },
        { label: '初始属地客服', prop: 'initialCustServiceName' }
      ],
      pageConfig: {
        account: 0, // 总条数
        pageSize: 10, // 当前多少条数据
        currentPage: 1, // 当前页
        showJumpButton: true // 显示跳转按钮
      } // 分页
    };
  },
  methods: {
    getTabData(_index) {
      this.pageConfig.currentPage = _index;
      let searchInfo = Object.assign({}, this.searchInfo, {
        pageNum: this.pageConfig.currentPage,
        pageSize: this.pageConfig.pageSize
      });
      this.tableLoading = true;
      this.$MyFetch.post(customerConfigApi.list, searchInfo).then(data => {
        this.pageConfig.account = data.total;
        this.pageConfig.currentPage = data.pageNum;
        if (data.total === 0) {
          this.$message.success('未查询到结果');
        }
        this.tableLoading = false;
        this.tableData = data.list;
      }).catch(err => {
        this.tableLoading = false;
        this.$error(err.message);
      });
    },
    clearSearch() {
      this.searchInfo = {
        applicationId: '',
        custServiceName: '',
        customerName: ''
      };
    },
    search() {
      if (!this.searchInfo.applicationId && !this.searchInfo.custServiceName && !this.searchInfo.customerName) {
        this.$error('请输入至少一项进行查询');
        return;
      }
      this.getTabData(1);
    },
    openDetail(_row) {
      if (_row.custServiceId) {
        _row.oldCustServiceId = _row.initialCustServiceId;
      }
      _row.newCustServiceId = _row.custServiceId;
      this.detaiInfo = _row;
      this.detailVisable = true;
    },
    closeDetailCtl({reflash} = {reflash: false}) {
      this.detailVisable = false;
      if (reflash) {
        this.getTabData(1);
      }
    },
    exchangeCustomer() {
      this.exchangeVisable = true;
    },
    exchangeDialogClose() {
      this.exchangeCustomerForm = {
        oldCustServiceId: '',
        newCustServiceId: ''
      };
      this.exchangeVisable = false;
    },
    exchangeConfirm() {
      this.$refs.exchangeCustomerCom.validate(_v => {
        if (!_v) return;
        let loading = this.$loading({
          text: "",
          spinner: "",
          background: 'transparent'
        });
        this.$MyFetch
          .post(customerConfigApi.exchangeSave, this.exchangeCustomerForm).then(_data => {
            loading.close();
            this.confirmFn('调整成功');
            this.exchangeVisable = false;
          }).catch(_err => {
            loading.close();
            this.$error(_err.message);
          });
      });
    },
    // 获取属地客服
    getUserList(roles = [], subCompanyId) {
      this.$MyFetch.post(customerConfigApi.userInfoList, {roles}).then(_data => {
        this.localCustemService = _data;
      }).catch(_err => {
        this.$error(_err.message);
      });
    },
    showExchangeBtn() {
      let roles = JSON.parse(localStorage.getItem('DSFUserInfo')).role;
      let role = roles.find(_item => {
        return _item.roleId === 'cpms_r_cc_0003';
      });
      return role;
    }
  },
  mounted() {
    this.getUserList(['cpms_r_cc_0001']);
  },
  components: {
    pagination,
    detail
  }
};
</script>

<style lang="less">
  .customer_config {
    .boxShadow(0, 0);
    padding: 20px 31px;
    min-height: 820px;
    .clearfix.pagination {
      margin-top: 50px;
    }
  }
</style>
