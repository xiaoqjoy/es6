<style lang="less" rel="stylesheet/less" scoped>
  .pagination {
    margin-top: 20px;
  }
</style>
<template>
  <div class="contain">
    <button class="add" @click="edit('add', {})">+ 新增</button>
    <el-form :inline="true" :model="form" :rules="rules" class="demo-form-inline">
      <el-form-item label="">
        <el-select v-model="form.organizationId" filterable placeholder="所属分公司">
          <el-option v-for="oid in organizationIds" :key="oid.id" :label="oid.organizationName" :value="oid.organizationId"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="">
        <el-input v-model="form.marketTeamName" placeholder="团队名称"></el-input>
      </el-form-item>
      <el-form-item label="">
        <el-input v-model="form.marketTeamId" placeholder="团队编号"></el-input>
      </el-form-item>
      <el-form-item label="">
        <el-input v-model="form.teamLeaderUserName" filterable placeholder="团队长"></el-input>
      </el-form-item>
      <el-form-item label="" prop="availableDate">
        <el-input v-model="form.availableDate" placeholder="请输入生效日期"></el-input>
      </el-form-item>
      <el-form-item>
        <button type="button" @click="getData" class="add check">查询</button>
        <button type="button" @click="clear" class="add check clear">清空</button>
      </el-form-item>
    </el-form>
    <el-table
      v-loading="loading"
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="marketTeamId"
        label="团队代码">
      </el-table-column>
      <el-table-column
        prop="marketTeamName"
        label="团队名称">
      </el-table-column>
      <el-table-column
        prop="teamLeaderUserName"
        label="团队长">
      </el-table-column>
      <el-table-column
        prop="teamLeaderPostLevel"
        label="岗位级别">
      </el-table-column>
      <el-table-column
        prop="mobileTelephoneNum"
        label="联系电话">
      </el-table-column>
      <el-table-column
        prop="_availableDate"
        sortable
        label="生效日期">
      </el-table-column>
      <el-table-column
        prop="_unavailableDate"
        sortable
        label="终止日期">
      </el-table-column>
      <el-table-column
        prop="_updatedDate"
        sortable
        label="维护日期">
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作">
        <template slot-scope="scope">
          <el-button @click="edit('edit', scope.row)" type="text" size="small">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination :page="pageConfig" class="pagination" @jump-page="getData"></pagination>
    <info-details v-if="details" :type="type"
    :data="row"
    :team_leader_post_level="team_leader_post_level"
    :certificate_type="certificate_type"
    :organizationIds="organizationIds"
    :teamLeaderUserIds="teamLeaderUserIds"
    @close="closeInfoDetails"
    @update="updateInfoDetails">
    </info-details>
  </div>
</template>

<script type="text/ecmascript-6">
import infoDetails from './info-details/info-details.vue';
import {marketingApi} from '../js/server.js';
import pagination from '@components/pagination';

export default {
  data() {
    let checkAvailableDate = (rule, value, callback) => {
      if (value && !/^[0-9-]+$/.test(value)) {
        return callback(new Error("请输入以-分隔的日期格式"));
      }
      callback();
    };
    return {
      details: false,
      type: "",
      row: {},
      marketingManagementTeams: [],
      organizationIds: [],
      team_leader_post_level: [],
      certificate_type: [],
      teamLeaderUserIds: [],
      tableData: [],
      loading: true,
      pageConfig: {
        account: 0,
        currentPage: 1,
        pageSize: 10,
        showJumpButton: true
      },
      form: {
        organizationId: '',
        marketTeamId: '',
        marketTeamName: '',
        teamLeaderUserName: '',
        availableDate: ''
      },
      rules: {
        availableDate: [
          { validator: checkAvailableDate, trigger: 'blur' }
        ]
      }
    };
  },
  components: {
    infoDetails,
    pagination
  },
  methods: {
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
      this.form = {
        organizationId: '',
        marketTeamId: '',
        marketTeamName: '',
        teamLeaderUserName: '',
        availableDate: ''
      };
    },
    getConfig() {
      this.$MyFetch.get(marketingApi.marketingManagementTeams)
      .then((data = {}) => {
        this.marketingManagementTeams = data.list;
      });

      this.$MyFetch.get(marketingApi.UserAuthorizationSystem, {roleIdList: ['cpms_r_mm_0003']})
        .then((data) => {
          this.teamLeaderUserIds = data.list;
        });

      this.$MyFetch.get(marketingApi.Organizations, {statusCode: 'N'})
        .then((data = {}) => {
          this.organizationIds = data.list;
        });

      // 团队长岗位级别
      this.$MyFetch.get(marketingApi.commonSetting, {categoryCode: 'team_leader_post_level'})
      .then((data = {}) => {
          this.team_leader_post_level = data;

          this.getData();
        });

      // 身份证类型
      this.$MyFetch.get(marketingApi.commonSetting, {categoryCode: 'certificate_type'})
      .then((data = {}) => {
          this.certificate_type = data;
        });
    },
    getData (pageNum) {
      if (!pageNum || typeof pageNum !== "number") {
        pageNum = 1;
      }
     /*  if (this.form.availableDate) {
        this.form.availableDate = this.$Moment(this.form.availableDate).format('YYYY-MM-DD');
      } */
      let form = Object.assign({}, this.form, {
        pageSize: 10,
        pageNum
      });
      this.loading = true;
      this.$MyFetch.get(marketingApi.marketingManagementTeams, form)
      .then((data) => {
        this.loading = false;
        data = data || {};
        this.pageConfig.account = data.total || 0;
        this.pageConfig.currentPage = data.pageNum || 0;
        this.tableData = data.list;
        if (this.tableData) {
          let dates = ['updatedDate', 'availableDate', 'unavailableDate'];
          for (let i = this.tableData.length - 1; i >= 0; i--) {
            dates.forEach((date) => {
              this.tableData[i]["_" + date] = this.tableData[i][date] ? this.$Moment(this.tableData[i][date]).format('YYYY-MM-DD') : '';
            });

            this.team_leader_post_level.forEach((leader) => {
              if (leader.itemCode === this.tableData[i].teamLeaderPostLevelCd) {
                this.tableData[i].teamLeaderPostLevel = leader.itemDesc;
              }
            });
          }
        }
      })
      .catch((e) => {
        this.$error(e.message);
      });
    }
  },
  mounted() {
    this.getConfig();
    this.getData();
  }
};
</script>
