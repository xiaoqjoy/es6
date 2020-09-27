<style lang="less" rel="stylesheet/less" scoped>
  .pagination {
    margin-top: 20px;
  }
</style>
<template>
  <div class="contain">
    <button class="add" @click="edit('add', {})">+ 新增</button>
    <el-form :inline="true" :model="form" class="demo-form-inline" ref="searchForm">
      <el-form-item label="">
        <el-select v-model="form.organizationId" filterable placeholder="所属分公司">
          <el-option v-for="oid in organizationIds" :key="oid.id" :label="oid.organizationName" :value="oid.organizationId"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="">
        <el-input v-model="form.marketTeamName" placeholder="所属团队"></el-input>
      </el-form-item>
      <el-form-item label="" prop="userId">
        <el-input v-model="form.userId" placeholder="UM账号"></el-input>
      </el-form-item>
      <el-form-item label="" prop="userName">
        <el-input v-model="form.userName" placeholder="姓名"></el-input>
      </el-form-item>
      <el-form-item label="">
        <el-input v-model="form.certificateNum" placeholder="证件号码 "></el-input>
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
        prop="organizationName"
        label="分公司">
      </el-table-column>
      <el-table-column
        prop="userId"
        label="UM账号">
      </el-table-column>
      <el-table-column
        prop="userName"
        label="姓名">
      </el-table-column>
      <el-table-column
        prop="gender"
        label="性别">
      </el-table-column>
      <el-table-column
        prop="marketTeamName"
        label="所属团队">
      </el-table-column>
      <el-table-column
        prop="postType"
        label="工种">
      </el-table-column>
      <el-table-column
        prop="postLevel"
        label="岗位级别">
      </el-table-column>
      <el-table-column
        prop="mobileTelephoneNum"
        label="联系方式">
      </el-table-column>
      <el-table-column
        prop="certificateNum"
        label="证件号码">
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
        fixed="right"
        label="操作">
        <template slot-scope="scope">
          <!-- <el-button @click="checkTransfer(scope.row)" type="text" size="small">管户移交</el-button> -->
          <el-button @click="edit('edit', scope.row)" type="text" size="small">编辑</el-button>
          <!-- <el-button @click="checkHistory(scope.row)" type="text" size="small">移交记录</el-button> -->
        </template>
      </el-table-column>
    </el-table>
    <pagination :page="pageConfig" class="pagination" @jump-page="getData"></pagination>
    <info-details v-if="details" :type="type"
      :data="row"
      :post_type="post_type"
      :post_level="post_level"
      :certificate_type="certificate_type"
      :marketingManagementTeams="marketingManagementTeams"
      :ProductTopBusinessType="ProductTopBusinessType"
      @show="showInfoDetails"
      @close="closeInfoDetails"
      @update="updateInfoDetails">
    </info-details>
  </div>
</template>

<script type="text/ecmascript-6">
import infoDetails from './info-details/info-details.vue';
import pagination from '@components/pagination';
import {marketingApi} from '../js/server.js';

export default {
  data() {
    return {
      details: false,
      history: false,
      transfer: false,
      userId: '',
      marketTeams: [],
      post_type: [],
      post_level: [],
      certificate_type: [],
      marketingManagementTeams: [],
      ProductTopBusinessType: [],
      organizationIds: {},
      loading: true,
      pageConfig: {
        account: 0,
        currentPage: 1,
        pageSize: 10,
        showJumpButton: true
      },
      tableData: [],
      form: {
        organizationId: '',
        userId: '',
        marketTeamId: '',
        userName: ''
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
    clear () {
      this.form = {
        organizationId: '',
        userId: '',
        marketTeamId: '',
        userName: ''
      };
    },
    showInfoDetails () {
      this.details = true;
    },
    closeInfoDetails () {
      this.details = false;
    },
    updateInfoDetails (oj) {
      this.getData();
    },
    getConfig () {
      this.$MyFetch.get(marketingApi.marketingManagementTeams)
        .then((data = {}) => {
          this.marketingManagementTeams = data.list;
        });

      // 工种
      this.$MyFetch.get(marketingApi.commonSetting, {categoryCode: 'post_type'})
      .then((data = {}) => {
        this.post_type = data;
        // 客户经理岗位级别
        this.$MyFetch.get(marketingApi.commonSetting, {categoryCode: 'post_level'})
        .then((data = {}) => {
            this.post_level = data;
            this.getData();
          });
      });

      // 身份证类型
      this.$MyFetch.get(marketingApi.commonSetting, {categoryCode: 'certificate_type'})
      .then((data = {}) => {
          this.certificate_type = data;
        });

      this.$MyFetch.get(marketingApi.Organizations, {statusCode: 'N'})
        .then((data = {}) => {
          this.organizationIds = data.list;
        });

      this.$MyFetch.get(marketingApi.ProductTopBusinessType)
        .then((data) => {
          this.ProductTopBusinessType = data;
        });
    },
    getData (pageNum) {
      if (!pageNum || typeof pageNum !== "number") {
        pageNum = 1;
      }
      let form = Object.assign({}, this.form, {
        pageSize: 10,
        pageNum
      });
      this.loading = true;
      this.$MyFetch.get(marketingApi.marketingManagementMembers, form)
      .then((data) => {
        this.loading = false;
        data = data || {};
        this.pageConfig.account = data.total || 0;
        this.pageConfig.currentPage = data.pageNum || 0;
        this.tableData = data.list;
        if (this.tableData) {
          let postTypeCodes = this.post_type;
          let postLevelIds = this.post_level;
          let dates = ['availableDate', 'unavailableDate'];
          for (let i = this.tableData.length - 1; i >= 0; i--) {
            if (this.tableData[i].genderTypeCode === "2") {
              this.tableData[i].gender = "女";
            } else {
              this.tableData[i].gender = "男";
            }

            postTypeCodes.forEach((postTypeCode) => {
              if (this.tableData[i].memberRole && this.tableData[i].memberRole.length > 0 && this.tableData[i].memberRole[0].postTypeCode === postTypeCode.itemCode) {
                this.tableData[i].postType = postTypeCode.itemDesc;
                this.tableData[i].postTypeCode = this.tableData[i].memberRole[0].postTypeCode;
              }
            });

            postLevelIds.forEach((postLevelId) => {
              if (this.tableData[i].postLevelId === postLevelId.itemCode) {
                this.tableData[i].postLevel = postLevelId.itemDesc;
              }
            });

            if (this.tableData[i].memberRole && this.tableData[i].memberRole.length > 0) {
              this.tableData[i].marketTeamName = this.tableData[i].memberRole[0].marketTeamName;
              this.tableData[i].organizationName = this.tableData[i].memberRole[0].organizationName;
              if (this.form.organizationId && !this.form.marketTeamId) {
                this.tableData[i].memberRole.forEach((role) => {
                  if (role.organizationId === this.form.organizationId) {
                    this.tableData[i].marketTeamName = role.marketTeamName;
                    this.tableData[i].organizationName = role.organizationName;
                    postTypeCodes.forEach((postTypeCode) => {
                      if (role.postTypeCode === postTypeCode.itemCode) {
                        this.tableData[i].postType = postTypeCode.itemDesc;
                        this.tableData[i].postTypeCode = role.postTypeCode;
                      }
                    });
                  }
                });
              }
              if (this.form.marketTeamId && !this.form.organizationId) {
                this.tableData[i].memberRole.forEach((role) => {
                  if (role.marketTeamId === this.form.marketTeamId) {
                    this.tableData[i].marketTeamName = role.marketTeamName;
                    this.tableData[i].organizationName = role.organizationName;
                    postTypeCodes.forEach((postTypeCode) => {
                      if (role.postTypeCode === postTypeCode.itemCode) {
                        this.tableData[i].postType = postTypeCode.itemDesc;
                        this.tableData[i].postTypeCode = role.postTypeCode;
                      }
                    });
                  }
                });
              }
              if (this.form.organizationId && this.form.marketTeamId) {
                this.tableData[i].memberRole.forEach((role) => {
                  if (role.organizationId === this.form.organizationId && role.marketTeamId === this.form.marketTeamId) {
                    this.tableData[i].marketTeamName = role.marketTeamName;
                    this.tableData[i].organizationName = role.organizationName;
                    postTypeCodes.forEach((postTypeCode) => {
                      if (role.postTypeCode === postTypeCode.itemCode) {
                        this.tableData[i].postType = postTypeCode.itemDesc;
                        this.tableData[i].postTypeCode = role.postTypeCode;
                      }
                    });
                  }
                });
              }
            }

            dates.forEach((date) => {
              if (this.tableData[i].memberRole && this.tableData[i].memberRole.length > 0) {
                this.tableData[i]["_" + date] = this.tableData[i].memberRole[0][date] ? this.$Moment(this.tableData[i].memberRole[0][date]).format('YYYY-MM-DD') : '';
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
    // this.getData();
    this.getConfig();
  }
};
</script>
