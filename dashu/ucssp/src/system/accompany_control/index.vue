<template>
  <div class="accompany-page">
    <el-button type="primary" class="button button__blue btn__add width100" icon="el-icon-plus" @click="openAddAccompany()">新增</el-button>
    <el-table
      :data="tableList"
      class="common__table"
      header-cell-class-name="table-head"
      row-class-name="table-tr"
      style="width: 100%">
      <el-table-column
        type="index"
        label="序号">
      </el-table-column>
      <el-table-column
        prop="addressDesc"
        label="陪查地址">
      </el-table-column>
      <el-table-column
        label="联系人1">
        <template slot-scope="scope">
          <span>{{ (scope.row.accompanyPersonList.length > 0) ? scope.row.accompanyPersonList[0].accompanyPersonName : '/'}}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="联系方式1">
        <template slot-scope="scope">
          <span>{{ (scope.row.accompanyPersonList.length > 0) ? scope.row.accompanyPersonList[0].accompanyPersonNum : '/'}}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="联系人2">
        <template slot-scope="scope">
          <span>{{ (scope.row.accompanyPersonList.length > 1) ? scope.row.accompanyPersonList[1].accompanyPersonName : '/'}}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="联系方式2">
        <template slot-scope="scope">
          <span>{{ (scope.row.accompanyPersonList.length > 1) ? scope.row.accompanyPersonList[1].accompanyPersonNum : '/'}}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="操作">
        <template  slot-scope="scope">
          <span class="button cursor__pointer font__blue btn__operate" @click="openAddAccompany(scope.row)" >详情</span>
          <span class="button cursor__pointer font__red btn__operate" @click="deleteDetail(scope.row)">删除</span>
        </template>
      </el-table-column>
    </el-table>
    <pagination :page="pageConfig" class="pagination" @jump-page="getTableList"></pagination>
    <transition name="fade">
      <add-accompany
        :accompany-id="currentAccompanyId"
        v-if="addAccompanyDg"
        @close="closeAddAccompany"></add-accompany>
    </transition>
  </div>
</template>
<script type="text/ecmascript-6">
  import pagination from '@components/pagination';
  import addAccompany from './addAccompany';
  import api from './js/server/index';
  export default{
    data() {
      return {
        api: api,
        currentAccompanyId: '',
        tableList: [],
        pageConfig: {
          account: 1,
          currentPage: 1,
          pageSize: 10,
          showJumpButton: true
        },
        addAccompanyDg: false
      };
    },
    created() {
      this.getTableList(1);
    },
    methods: {
      getTableList(index) {
        this.$MyFetch.get(api.getTableList, {pageSize: 10, pageNum: index})
          .then(data => {
            this.tableList = data.list;
            this.pageConfig.account = data.total;
            this.pageConfig.currentPage = data.pageNum;
          });
      },
      openAddAccompany(obj = '') {
        this.currentAccompanyId = obj.accompanyId;
        this.addAccompanyDg = true;
      },
      closeAddAccompany(update = false) {
        if (update) {
          this.getTableList(1);
        }
        this.addAccompanyDg = false;
      },
      deleteDetail(obj) {
        this.confirmFn('是否确认删除该数据？', 'warning')
          .then(() => {
            this.$MyFetch.post(api.delete, {accompanyId: obj.accompanyId})
              .then(data => {
                this.confirmFn('删除成功！', 'success');
                this.getTableList(1);
              })
              .catch(err => {
                this.confirmFn(err.message, 'error');
              });
          })
          .catch(err => {
            console.log(err);
          });
      }
    },
    components: {
      pagination,
      addAccompany
    }
  };
</script>
<style lang="less" rel="stylesheet/less" scoped>
  .accompany-page{
    min-height: 820px;
    .boxShadow(0,0);
    padding: 20px 31px;
    .btn__add{
      /deep/ .el-icon-plus{
        line-height: 1.2;
        font-weight: 600;
      }
      margin-bottom: 20px;
    }
    .pagination{
      position:absolute;
      bottom: 40px;
      right: 31px;
    }
    .common__table{
      /deep/.el-table__body-wrapper{
        max-height: 550px;
        overflow-y: auto;
      }
    }
    .btn__operate{
      height: 40px;
      width: 40px;
      line-height: 40px;
      border-radius: 50%;
    }
  }
</style>
