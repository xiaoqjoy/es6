<template>
  <div class="page-role-detail">
    <div class="dialog-mask"></div>
    <div class="dialog-box">
      <div class="dialog-box__top bg__white">
        <h5 class="title">角色详情</h5>
        <span class="el-icon-close button button__close" @click="close"></span>
      </div>
      <div class="dialog-box__middle">
        <el-table
          :data="tableData"
          border
          class="common__table"
          header-cell-class-name="table-head"
          row-class-name="table-tr"
          style="width: 100%">
          <el-table-column
            prop="systemName"
            label="系统">
          </el-table-column>
          <el-table-column
            class-name="vertical__top"
            label="菜单">
            <template  slot-scope="scope">
              <tree class="tree-box" :tree-data="scope.row.menu"></tree>
            </template>
          </el-table-column>
          <el-table-column
            prop="certificateNum"
            label="url">
            <template  slot-scope="scope">
              <ul class="url-list">
                <li class="item" v-for="(item, index) in scope.row.page" :key="index">{{item.pageName}}:{{item.pageUrlVal}}</li>
              </ul>
            </template>
          </el-table-column>
        </el-table>
        <pagination :page="pageConfig" class="pagination" @jump-page="getTableData"></pagination>
      </div>
      <div class="padding-20 bg__white"></div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import '@common/css/dialog';
  import tree from './tree';
  import pagination from '@components/pagination';
  import api from '../../js/server/server';
  export default{
    props: ['roleId'],
    data() {
      return {
        tableData: [],
        pageConfig: {
          account: 1,
          currentPage: 1,
          pageSize: 10,
          showJumpButton: false
        }
      };
    },
    created() {
      this.getTableData(1);
    },
    components: {
      tree,
      pagination
    },
    methods: {
      close() {
        this.$emit('close');
      },
      getTableData(num) {
        this.$MyFetch.get(api.role.queryRoleMenu + '/' + this.roleId + '/MenusAndPages', {pageSize: 10, pageNum: num})
          .then((data = {}) => {
            console.log(data);
            this.tableData = [...data.list];
            this.pageConfig.account = data.total ? data.total : 1;
          })
          .catch(err => {
            this.confirmFn(err.message);
          });
      }
    }
  };
</script>
<style lang="less" rel="stylesheet/less" scoped>
  .page-role-detail{
    .dialog-box{
      width: 700px;
      padding: 0;
      .dialog-box__middle{
        min-height:265px;
        max-height: 400px;
        overflow-y: auto;
        padding: 18px 42px 30px;
        .demo-form-inline{
          margin-right: -31px;
          font-size: 0;
          .form__item{
            width: 50%;
            padding-right: 31px;
            margin-right: 0;
            /deep/ .el-form-item__content{
              width: 100%;
            }
            /deep/ .el-form-item__label{
              padding-bottom: 7px;
            }
          }
        }
        .bottom__btn-box{
          display: block;
          margin: 10px 31px 0 0;
          text-align: center;
        }
      }
      /deep/.el-table.common__table .table-tr td{
        border-bottom: 1px solid @border-line
      }
      /deep/.el-table.common__table .table-tr:last-child td{
        border-bottom: none;
      }
      .tree-box{
        padding: 10px 0;
        text-align: left;
      }
      .url-list{
        .item{
          border-bottom: 1px solid @line-color;
          padding: 10px 0;
        }
        .item:last-child{
          border:none;
        }
      }
      .pagination{
        margin-top: 20px;
      }
      .padding-20{
        height: 30px;
        margin-top: -10px;
        position: relative;
      }
      /deep/.vertical__top{
        vertical-align: top;
      }
      /deep/ .el-table th>.cell{
        line-height: 40px;
      }
    }
  }
</style>
