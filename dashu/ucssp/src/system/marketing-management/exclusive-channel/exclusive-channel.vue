<style lang="less" rel="stylesheet/less" scoped>
  .container {
    margin-top: 0!important;
  }
  .pagination {
    margin-top: 20px;
  }
</style>
<template>
  <div class="contain">
    <button class="add" @click="edit('add', {})">+ 新增</button>
    <el-form :inline="true" :model="form" class="demo-form-inline">
      <el-form-item label="">
        <el-input v-model="form.exclusiveChannelId" placeholder="渠道编号"></el-input>
      </el-form-item>
      <el-form-item label="">
        <el-input v-model="form.channelName" placeholder="渠道名称"></el-input>
      </el-form-item>
      <el-form-item label="">
        <el-input v-model="form.corporateRepresentativeName" placeholder="法人代表"></el-input>
      </el-form-item>
      <el-form-item label="">
        <el-select v-model="form.exclusiveChannelTypeCode" placeholder="渠道类型">
          <el-option v-for="setting in exclusive_channel_type" :key="setting.itemCode" :label="setting.itemDesc" :value="setting.itemCode"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="">
        <el-select v-model="form.organizationId" filterable placeholder="所属分公司"
        :disabled="!isAdmin">
          <el-option v-for="oid in organizationIds" :key="oid.id" :label="oid.organizationName" :value="oid.organizationId"></el-option>
        </el-select>
      </el-form-item>
      <button type="button" @click="getData" class="add check">查询</button>
      <button type="button" @click="clear" class="add check clear">清空</button>
    </el-form>
    <el-table
      v-loading="loading"
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="exclusiveChannelId"
        label="渠道编号">
      </el-table-column>
      <el-table-column
        prop="channelName"
        label="渠道名称">
      </el-table-column>
      <el-table-column
        prop="corporateRepresentativeName"
        label="法人代表">
      </el-table-column>
      <el-table-column
        prop="_cooperateStartDate"
        sortable
        label="合作起始时间">
      </el-table-column>
      <el-table-column
        prop="rejectApplicationStatus"
        label="进件状态">
      </el-table-column>
      <el-table-column
        prop="organizationName"
        label="所属分公司">
      </el-table-column>
      <el-table-column
        prop="depositAmt"
        label="保证金">
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作">
        <template slot-scope="scope">
          <el-button @click="edit('edit', scope.row)" type="text" size="small">详情</el-button>
          <el-button @click="showQrCode(scope.row)" type="text" size="small">专属二维码</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination :page="pageConfig" class="pagination" @jump-page="getData"></pagination>
    <info-details v-if="details" :type= "type"
      :exclusive_channel_type="exclusive_channel_type"
      :agency_type="agency_type"
      :industry_type="industry_type"
      :organization_certificate_type="organization_certificate_type"
      :organizationIds="organizationIds"
      :organizationId="organizationId"
      :isAdmin="isAdmin"
      :data="row"
      @close="closeInfoDetails"
      @update="updateInfoDetails">
    </info-details>
    <qr-code v-if="qrCode"
      :row = "row"
      @close="closeQrCode"></qr-code>
  </div>
</template>

<script type="text/ecmascript-6">
import infoDetails from './info-details/info-details.vue';
import qrCode from './qr-code/qr-code.vue';
import {marketingApi} from '../js/server.js';
import mixin from '../js/mixin.js';
import pagination from '@components/pagination';

export default {
  mixins: [mixin],
  data() {
    return {
      qrCode: false,
      details: false,
      type: "",
      row: {},
      tableData: [],
      exclusive_channel_type: [],
      agency_type: [],
      industry_type: [],
      organization_certificate_type: [],
      organizationIds: [],
      organizationId: '',
      loading: true,
      pageConfig: {
        account: 0,
        currentPage: 1,
        pageSize: 10,
        showJumpButton: true
      },
      form: {
        exclusiveChannelId: '',
        channelName: '',
        corporateRepresentativeName: '',
        exclusiveChannelTypeCode: '',
        organizationId: '',
        orderBy: ''
      }
    };
  },
  components: {
    infoDetails,
    qrCode,
    pagination
  },
  methods: {
    closeQrCode () {
      this.qrCode = false;
    },
    showQrCode(row) {
      this.row = row;
      // this.userId = this.form.userId;
      // this.marketTeamId = row.team.marketTeamId || "";
      // this.organizationId = row.team.organizationId || "";
      this.qrCode = true;
    },
    edit (type, row) {
      this.type = type;
      this.row = row;
      this.details = true;
    },
    closeInfoDetails () {
      this.details = false;
    },
    updateInfoDetails (obj) {
      this.getData();
    },
    clear () {
      let form = Object.assign({}, this.form, {
        exclusiveChannelId: '',
        channelName: '',
        corporateRepresentativeName: '',
        exclusiveChannelTypeCode: '',
        orderBy: ''
      });
      if (this.isAdmin) {
        form.organizationId = "";
      }
      this.form = form;
    },
    getConfig () {
      // 专属渠道类型
      this.$MyFetch.get(marketingApi.commonSetting, {categoryCode: 'exclusive_channel_type'})
      .then((data = {}) => {
          this.exclusive_channel_type = data;
        });
      // 代理商类型
      this.$MyFetch.get(marketingApi.commonSetting, {categoryCode: 'agency_type'})
      .then((data = {}) => {
          this.agency_type = data;
        });
      // 行业类型
      this.$MyFetch.get(marketingApi.commonSetting, {categoryCode: 'industry_type'})
      .then((data = {}) => {
          this.industry_type = data;
        });
      // 公司证件类型
      this.$MyFetch.get(marketingApi.commonSetting, {categoryCode: 'organization_certificate_type'})
      .then((data = {}) => {
          this.organization_certificate_type = data;
        });
      this.$MyFetch.get(marketingApi.Organizations, {statusCode: 'N'})
        .then((data = {}) => {
          this.organizationIds = data.list;
          if (!this.isAdmin && this.userInfo.organizationId) {
            this.organizationId = this.userInfo.organizationId;
            this.$set(this.form, "organizationId", this.userInfo.organizationId);
          }
          // 获取所属分公司列表后才进行渲染表格
          this.getData();
      });
    },
    getData (pageNum) {
      if (!pageNum || typeof pageNum !== "number") {
        pageNum = this.pageConfig.currentPage;
      }
      let form = Object.assign({}, this.form, {
        pageSize: this.pageConfig.pageSize,
        pageNum
      });
      if (!this.isAdmin && this.userInfo.organizationId) {
        form = Object.assign({}, form, {
          organizationId: this.userInfo.organizationId || ''
        });
      }
      this.loading = true;
      this.$MyFetch.get(marketingApi.ExclusiveChannels, form)
      .then((data) => {
        this.loading = false;
        data = data || {};
        this.pageConfig.account = data.total || 0;
        this.pageConfig.currentPage = data.pageNum || 0;
        this.tableData = data.list;
        if (this.tableData) {
          let dates = ['cooperateStartDate'];
          for (let i = this.tableData.length - 1; i >= 0; i--) {
            dates.forEach((date) => {
              this.tableData[i]["_" + date] = this.tableData[i][date] ? this.$Moment(this.tableData[i][date]).format('YYYY-MM-DD') : '';
            });
            this.organizationIds.forEach((organizationId) => {
              if (this.tableData[i].organizationId === organizationId.organizationId) {
                this.tableData[i].organizationName = organizationId.organizationName;
              }
            });

            switch (this.tableData[i].rejectApplicationStatusCode) {
              case 'N':
                this.tableData[i].rejectApplicationStatus = "正常进件";
                break;
              case 'U':
                this.tableData[i].rejectApplicationStatus = "停用进件";
                break;
            }
          }
        }
      })
      .catch((err) => {
        this.$error(err.message);
      });
    }
  },
  mounted() {
    this.getConfig();
  }
};
</script>
