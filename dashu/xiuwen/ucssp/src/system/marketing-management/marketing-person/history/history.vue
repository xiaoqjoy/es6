<style lang="less" rel="stylesheet/less" scoped>
  .drop_loan{
    .dialog-box{
      width: 916px;
      background: #fff;
      .title_type {
        text-align: center;
        background: #fff;
        font-size: 18px;
        letter-spacing: 1.3px;
        padding-left: 20px;
        font-weight: bold;
      }
      .complete-product {
        margin: 20px 30px;
        min-height: 628px;
      }
    }
  }
  .pagination {
    margin-top: 20px;
  }
</style>
<template>
  <div class="drop_loan">
    <div class="dialog-mask"></div>
    <div class="dialog-box">
      <div class="dialog-box__top">
        <h5 class="title_type">历史记录</h5>
        <span class="el-icon-close button button__close" @click="close"></span>
      </div>
      <div class="complete-product">
        <el-table
        :data="tableData"
        style="width: 100%">
          <el-table-column
            prop="marketTeamId"
            label="营销团队">
          </el-table-column>
          <el-table-column
            prop="postType"
            label="工种">
          </el-table-column>
          <el-table-column
            prop="availableDate"
            label="生效日期">
          </el-table-column>
          <el-table-column
            prop="unavailableDate"
            label="终止日期">
          </el-table-column>
          <el-table-column
            prop="takeOverUserName"
            label="接管客户经理">
          </el-table-column>
        </el-table>
        <pagination :page="pageConfig" class="pagination" @jump-page="getData"></pagination>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import '@common/css/dialog';
  import pagination from '@components/pagination';
  import {marketingApi} from '../../js/server.js';
  export default{
    props: {
      userId: String,
      post_type: Array,
      post_level: Array
    },
    data() {
      return {
        id: '10021',
        pageConfig: {
          account: 0,
          currentPage: 1,
          pageSize: 10,
          showJumpButton: true
        },
        tableData: [
          {
            marketTeamId: '',
            marketTeamName: '',
            postTypeCode: '',
            postTypeName: '',
            availableDate: '',
            unavailableDate: '',
            takeOverUserName: ''
          }
        ]
      };
    },
    components: {
      pagination
    },
    methods: {
      close() {
        this.$emit('close');
      },
      getData(pageNum) {
        if (!pageNum || typeof pageNum !== "number") {
          pageNum = this.pageConfig.currentPage;
        }
        let form = Object.assign({}, this.form, {
          pageSize: this.pageConfig.pageSize,
          pageNum
        });
        this.$MyFetch.get(marketingApi.marketingManagementMemberHistory.replace("{userId}", this.userId), form)
        .then((data) => {
          data = data || {};
          this.pageConfig.account = data.total || 0;
          this.pageConfig.currentPage = data.pageNum || 0;
          this.tableData = data.list;
          if (this.tableData) {
            let dates = ['availableDate', 'unavailableDate'];
            for (let i = this.tableData.length - 1; i >= 0; i--) {
              dates.forEach((date) => {
                this.tableData[i][date] = this.tableData[i][date] ? this.$Moment(this.tableData[i][date]).format('YYYY-MM-DD') : '';
              });

              this.post_type.forEach((postTypeCode) => {
                this.tableData[i].postType = postTypeCode.itemDesc;
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
      this.getData();
    }
  };
</script>
