<style lang="less" rel="stylesheet/less" scoped>
  .transfer-box {
    padding-top: 20px;
    /deep/ thead {
      .el-checkbox {
        display: none;
      }
    }
  }
  .pagination {
    margin-top: 20px;
  }
  .drop_loan{
    .dialog-box{
      width: 945px;
      background: #fff;
      .dialog-box__top {
        margin-bottom: 0;
      }
      .el-input {
        width: 170px;
      }
      .clear {
        margin-left: 16px;
      }
      .title_type {
        text-align: center;
        background: #fff;
        font-size: 18px;
        letter-spacing: 1.3px;
        padding-left: 20px;
        font-weight: bold;
      }
      .mgtop {
        margin-top: 20px;
      }
      .el-form-item {
        // width: 28%;
        margin-right: 22px;
      }
      .el-form-item .el-select {
        width: 245px;
      }
      .dialog-box__middle{
        height: 495px;
        .middle{
          .el-select{
            display: block;
          }
          .el-textarea__inner{
            background: #E5E5E5;
          }
        }
      }
      .dialog-box__middle-1200{
        height: 442px;
        overflow-y: auto;
        margin: 0 20px;
        padding: 25px 30px;
        box-shadow:  0 1px 10px 0 rgba(0,0,0,0.05);
        .dialog-box__middle-top{
          padding: 20px 0;
          border-bottom: 1px solid  #E5E5E5;
          .title{
            font-size: 16px;
            .icon__gan{
              margin-right: 10px;
            }
          }
        }
      }
      .dialog-box__middle-form{
        overflow-y: auto;
        padding: 0 20px;
        .form__block{
          padding: 20px 30px;
          // margin-bottom: 20px;
          box-shadow:  0 1px 10px 0 rgba(0,0,0,0.05);
          .dialog-box__middle-top{
            padding-bottom: 20px;
            border-bottom: 1px solid  #E9E9E9;
            .title{
              font-size: 16px;
              .icon__gan{
                margin-right: 10px;
              }
            }
          }
        }
        .demo-form-inline {
          margin-bottom: 0;
        }
        .message__list{
          display: inline-block;
          white-space: nowrap;
          margin-right: 60px;
          margin-bottom: 20px;
          .item{
            margin-right: 60px;
            font-size: 0;
            .title{
              display: inline-block;
              margin-right: 5px;
              font-size: 14px;
              color: #666;
            }
            .content{
              font-size: 14px;
              display: inline-block;
            }
          }
          .item:last-child{
            margin-right: 0;
          }
        }
        .form__bottom {
          left: 50%;
          padding-bottom: 30px;
          background-color: rgba(255, 255, 255);
          text-align: center;
          padding-bottom: 20px;
          margin-top: 20px;
          .add {
            width: 200px;
            height: 41px;
          }
        }
      }
    }
  }
</style>
<template>
  <div class="drop_loan">
    <div class="dialog-mask"></div>
    <div class="dialog-box">
      <div class="dialog-box__top">
        <h5 class="title_type">管户移交</h5>
        <span class="el-icon-close button button__close" @click="close"></span>
      </div>
      <div class="transfer-box">
        <div class="dialog-box__middle-form">
          <el-form :inline="true" :model="searchForm" class="demo-form-inline" ref="searchForm">
            <el-form-item label="" prop="userId">
              <el-input v-model="searchForm.userId" placeholder="营销人员编码"></el-input>
            </el-form-item>
            <el-form-item label="" prop="userName">
              <el-input v-model="searchForm.userName" placeholder="姓名"></el-input>
            </el-form-item>
            <el-form-item label="" prop="certificateNum">
              <el-input v-model="searchForm.certificateNum" placeholder="身份证号"></el-input>
            </el-form-item>
            <el-form-item>
              <button type="button" @click="getData" class="add check">查询</button>
              <button type="button" @click="clear" class="add check clear">清空</button>
            </el-form-item>
          </el-form>
          <el-table
          ref="singleTable"
          :data="tableData"
          style="width: 100%">
            <el-table-column width="44">
              <template slot-scope="scope">
                <el-checkbox v-model="scope.row.isSelect" @change="check(scope)"></el-checkbox>
              </template>
            </el-table-column>
            <el-table-column
              prop="userId"
              label="营销人员编码">
            </el-table-column>
            <el-table-column
              prop="userName"
              label="姓名">
            </el-table-column>
            <el-table-column
              prop="certificateNum"
              label="身份证号码">
            </el-table-column>
            <el-table-column
              prop="marketTeamName"
              label="所属营销单位">
            </el-table-column>
            <el-table-column
              prop="postType"
              label="工种">
            </el-table-column>
          </el-table>
          <pagination :page="pageConfig" class="pagination" @jump-page="getData"></pagination>
          <div class="form__bottom">
            <el-button class="add finish" type="primary" size="large" @click="finish">完成</el-button>
          </div>
        </div>
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
      rowProp: Object,
      post_type: Array
    },
    data() {
      return {
        id: '10021',
        checkbox: false,
        pageConfig: {
          account: 0,
          currentPage: 1,
          pageSize: 10,
          showJumpButton: true
        },
        searchForm: {
          userId: '',
          userName: '',
          certificateNum: ''
        },
        form: {
          userId: '',
          userName: '',
          certNum: '',
          belongTo: '',
          postType: ''
        },
        tableData: [],
        row: {}
      };
    },
    components: {
      pagination
    },
    methods: {
      close() {
        this.$emit('close');
      },
      clear () {
        this.$refs.searchForm.resetFields();
      },
      postTypeFormatter(row, column, cellValue, index) {
        for (var i = 0; i < this.post_type.length; i++) {
          if (row.postTypeCode === this.post_type[i].itemCode) {
            return (this.post_type[i].itemDesc);
          }
        }
      },
      finish() {
        let form = {
          currentMarketTeamId: this.row.marketTeamId,
          currentMemberUserId: this.row.userId,
          memberRoleId: this.rowProp.team.id
        };
        this.$MyFetch.put(marketingApi.marketingManagementMembertakeOverCustomer, form)
        .then((data) => {
          this.$emit("finish", this.row);
        }).catch((e) => {
          this.$error(e.message);
        });
      },
      check(obj) {
        let index = obj.$index;
        this.$set(this.tableData, index, Object.assign({}, this.tableData[index], {
          isSelect: true,
          takeOverUserId: this.tableData[index].userId,
          takeOverUserName: this.tableData[index].userName,
          postTypeCode: this.tableData[index].codeVal
        }));
        this.row = this.tableData[index];
        this.tableData.forEach((data, i) => {
          if (i !== index) {
            this.$set(this.tableData, i, Object.assign({}, this.tableData[i], {isSelect: false}));
          }
        });
      },
      getData(pageNum) {
        if (!pageNum || typeof pageNum !== "number") {
          pageNum = this.pageConfig.currentPage;
        }
        let form = Object.assign({}, this.searchForm, {
          postTypeCodeList: ['CM', 'EC'],
          pageSize: this.pageConfig.pageSize,
          organizationId: this.rowProp.team.organizationId,
          pageNum
        });
        this.$MyFetch.get(marketingApi.marketingManagementMemberAvailable, form)
        .then((data) => {
          data = data || {};
          this.pageConfig.account = data.total || 0;
          this.pageConfig.currentPage = data.pageNum || 0;
          this.tableData = data.list;
          if (this.tableData) {
            for (let i = this.tableData.length - 1; i >= 0; i--) {
              this.post_type.forEach((type) => {
                if (type.itemCode === this.tableData[i].postTypeCode) {
                  this.tableData[i].postType = type.itemDesc;
                }
              });
              this.$set(this.tableData, i, Object.assign({}, this.tableData[i], {isSelect: false}));
            }
          }
          this.pageConfig.account = data.total;
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
