<template>
  <div class="import-message">
    <div class="dialog-mask"></div>
    <div class="dialog-box">
      <div class="dialog-box__top">
        <h5 class="title bg__white">引入客户信息</h5>
        <span class="el-icon-close button button__close" @click="close"></span>
      </div>
      <div class="dialog-box__middle">
        <div class="top">
          <el-form :inline="true" :model="formInline" class="demo-form-inline" ref="ruleForm" :rules="rules">
            <el-form-item prop="custName">
              <el-input v-model="formInline.custName" placeholder="客户名称"></el-input>
            </el-form-item>
            <el-form-item prop="certificateNum">
              <el-input v-model="formInline.certificateNum" placeholder="证件编号" ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" class="button" @click="submitForm('ruleForm')">查询</el-button>
            </el-form-item>
          </el-form>
        </div>
        <div class="middle">
          <el-table
            :data="tableData"
            border
            style="width: 100%"
            cell-class-name="dialog__table__td"
            header-cell-class-name="dialog__table__th"
            height="320px"
            @row-click="rowClick"
            class="dialog__table">
            <el-table-column
              label="申请编号"
            >
              <template slot-scope="scope">
                <el-checkbox
                  class="check__box"
                  :key="scope.$index"
                  @change="checkboxChangeHandler(scope.$index)"
                  v-model="scope.row.isSelect"></el-checkbox>
                <span class="help-box"></span>
                <span>{{ scope.row.applicationId }}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="custName"
              label="客户姓名"
            >
            </el-table-column>
            <el-table-column
              prop="certificateNum"
              label="身份证">
            </el-table-column>
          </el-table>
        </div>
        <pagination :page="pageConfig" class="pagination" @jump-page="jump"></pagination>
        <div class="bottom">
          <el-button type="warning" class="hidden">重置</el-button>
          <el-button type="primary" @click="importInfo">引入</el-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import {spareApi} from '../../js/server.js';
  import '@common/css/dialog';
  import pagination from '@components/pagination';
  import rules from '@common/js/rules';
  export default{
    data() {
      return {
        input6: '',
        input7: '',
        formInline: {
          certificateNum: '',
          custName: ''
        },
        currentQuery: {
          certificateNum: '',
          custName: ''
        },
        tableData: [],
        rules: {
          certificateNum: [
            { validator: rules.identityCardRule }
          ]
        },
        currentData: null,
        openDg: false,
        pageConfig: {
          account: 0,
          currentPage: 1,
          pageSize: 10,
          showJumpButton: true
        }
      };
    },
    methods: {
      close() {
        this.$emit('close');
      },
      checkboxChangeHandler(index) {
        this.tableData.forEach((val, num) => {
          if (num !== index) {
            this.tableData[num].isSelect = false;
          } else if (this.tableData[num].isSelect) {
            this.currentData = Object.assign({}, this.tableData[num]);
          } else {
            this.currentData = null;
          }
        });
      },
      submitForm(formName) {
        if (!this.formInline.certificateNum && !this.formInline.custName) {
          this.confirmFn('请输入查询条件！', 'error');
          return;
        }
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.currentQuery = Object.assign(this.currentQuery, this.formInline);
            this.getTableData(1, this.currentQuery);
          } else {
            return false;
          }
        });
      },
      getTableData(currentPage, query) {
        var data = Object.assign({ pageNum: currentPage, pageSize: 10 }, query);
        this.$MyFetch.post(spareApi.solving.importInfo.getTableData, data)
          .then((data = {}) => {
            data.list = data.list instanceof Array ? data.list : [];
            data.list.forEach((v, index) => {
              v.isSelect = false;
              v.index = index;
            });
            this.tableData = [...data.list];
            if (data.list.length < 1) {
              this.confirmFn('未查询到相关数据！');
            }
            this.pageConfig.currentPage = data.pageNum;
            this.pageConfig.account = data.total;
          })
          .catch((err) => {
            console.log(err);
          });
      },
      jump(num) {
        this.getTableData(num, this.currentQuery);
      },
      importInfo() {
        if (!this.currentData) {
          this.confirmFn('请选择引入的信息！');
        } else {
          this.$MyFetch.get(spareApi.solving.importInfo.import + this.currentData.applicationId)
            .then((data = {}) => {
              this.confirmFn('导入成功！', 'success');
              this.close();
            })
            .catch((err) => {
              this.confirmFn(err.message, 'error');
            });
        }
      },
      rowClick(obj) {
        if (obj.isSelect) {
          this.tableData.forEach((v) => {
            this.$set(v, 'isSelect', false);
          });
        } else {
          this.tableData.forEach((v) => {
            this.$set(v, 'isSelect', false);
          });
          this.$set(obj, 'isSelect', true);
          this.currentData = Object.assign(obj);
        }
      }
    },
    created() {},
    components: {
      pagination
    }
  };
</script>
<style lang="less" rel="stylesheet/less" scoped>
  .import-message{
    .dialog-box{
      width: 945px;
      padding-bottom: 0;
      .dialog-box__middle{
        position: relative;
        height: 566px;
      }
      .dialog-box__middle /deep/ .el-checkbox{
        position: absolute;
        left: 30px;
      }
    }
    .pagination{
      margin:20px 0;
    }
    .help-box{
      position: absolute;
      display: inline-block;
      height: 30px;
      width: 30px;
      left: 20px;
      z-index: 10;
    }
  }
</style>
