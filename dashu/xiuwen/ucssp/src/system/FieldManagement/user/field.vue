<template>
  <div class="field">
    <!-- 顶岗 -->
    <div class="dialog-mask"></div>
    <div class="dialog-box">
      <div class="dialog-box__top">
        <h5 class="title bg__white">顶岗</h5>
        <span class="el-icon-close button button__close" @click="close"></span>
      </div>
      <div class="dialog-box__middle">
        <div class="top">
          <el-form :inline="true" :model="formInline" class="demo-form-inline" ref="ruleForm" :rules="rules">
            <el-form-item prop="custName">
              <el-input v-model="formInline.userId" placeholder="用户编号" maxlength="50"></el-input>
            </el-form-item>
            <el-form-item prop="certificateNum">
              <el-input v-model="formInline.userName" placeholder="用户姓名" maxlength="50"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button class="b_button query" @click="submitForm('ruleForm')">查询</el-button>
            </el-form-item>
            <el-form-item class="el-form-item__content">
              <el-button class="b_button empty button"  @click="reset('ruleForm')">清除</el-button>
            </el-form-item>
          </el-form>
        </div>
        <!-- 顶岗-->
        <div class="middle">
          <el-table
            :data="tableData"
            border
            style="width: 100%"
            cell-class-name="dialog__table__td"
            header-cell-class-name="dialog__table__th"
            height="320px"
            class="dialog__table"
          >
            <el-table-column label="用户编号">
              <template slot-scope="scope">
                <el-checkbox
                  @change="checkboxChangeHandler(scope.$index)"
                  v-model="scope.row.isSelect"
                ></el-checkbox>
                <span>{{ scope.row.userId }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="userName" label="用户姓名"></el-table-column>
            <el-table-column prop="roleName" label="角色"></el-table-column>
          </el-table>
        </div>
        <pagination :page="pageConfig" class="pagination" @jump-page="jump"></pagination>
        <div class="bottom">
          <el-button type="primary" @click="importInfo">确认</el-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import api from "../js/server/server.js";
import pagination from "@components/pagination";
import rules from "@common/js/rules";
export default {
  data() {
    return {
      input6: "",
      input7: "",
      formInline: {
        userId: "",
        userName: "",
        takeOverItem: []
      },
      tableData: [],
      rules: {
        certificateNum: [{ validator: rules.nameRule }]
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
  props: ['isfield'],
  methods: {
    close() {
      this.$parent.fieldV = false;
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
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.getTableData(1, this.formInline);
        } else {
          return false;
        }
      });
    },
    getTableData(currentPage, query) {
      var data = Object.assign({ pageNum: currentPage, pageSize: 10 }, query);
        if (
          !data.userId &&
          !data.userName
        ) {
          this.confirmFn("请输入查询条件", "error");
        } else {
          this.$MyFetch.post(api.user.userList, data)
          .then((data = {}) => {
            if (data.list.length) {
                if (data.list) {
                  data.list.forEach((v, index) => {
                    v.isSelect = false;
                    v.index = index;
                  });
                  this.tableData = [...data.list];
                }
                this.pageConfig.currentPage = data.pageNum;
                this.pageConfig.account = data.total || 0;
              } else {
                this.confirmFn("该用户角色不匹配");
              }
          })
          .catch((err) => {
            this.$error(err.message);
          });
          }
    },
    jump(num) {
      this.getTableData(num, this.formInline);
    },
    reset(formName) {
      this.formInline.userId = '';
      this.formInline.userName = '';
    },
    importInfo() {
      if (!this.currentData) {
        this.confirmFn("请选择引入的信息！");
      } else {
        var array = {roleId: this.currentData.roleId, userId: this.currentData.userId, userName: this.currentData.userName, departmentId: this.currentData.departmentId, departmentName: this.currentData.departmentName};
        var trueArray = Object.assign(this.formInline, array);
        if (trueArray.userId === "OPS") {
          // ops调用
           this.$MyFetch.post(api.user.opsList, {takeOverItem: trueArray.takeOverItem})
            .then((data = {}) => {
              this.confirmFn('顶岗成功！', "success");
              this.$emit('getparent');
            })
            .catch((err) => {
              this.$error(err.message);
              this.$emit('getparent');
            });
        } else {
          // 确认顶岗
         this.$MyFetch.post(api.user.confirmList, trueArray)
          .then((data = {}) => {
            this.confirmFn('顶岗成功！', "success");
            this.$emit('getparent');
          })
          .catch((err) => {
            this.$error(err.message);
            this.$emit('getparent');
          });
        }
      }
    }
  },
  created() {
    var array = [];
    this.isfield.forEach(res => {
      array.push({applicationId: res.applicationId, oldUserId: res.userId, taskCode: res.taskCode, custName: res.custName});
    });
    this.formInline.takeOverItem = [...array];
  },
  components: {
    pagination
  }
};
</script>
<style lang="less" rel="stylesheet/less" scoped>
@import "../../../common/css/dialog";
.dialog-box .el-form-item__content .el-button--primary.is-plain{
  background: #fff;
  color: #409EFF;
}
.dialog-box .el-form-item__content .el-button--primary.is-plain:hover{
  background: #409EFF;
  color: #fff;
}
.field {
  .dialog-box {
    width: 945px;
    padding-bottom: 0;
    .dialog-box__middle {
      height: 566px;
    }
    .dialog-box__middle /deep/ .el-checkbox {
      position: absolute;
      left: 30px;
      top: 16px;
    }
  }
  .pagination {
    margin: 20px 0;
  }
  .b_button {
    width: 100px;
    height: 40px;
    border-radius: 4px;
    font-size: 14px;
  }
  .query {
    background: #538bf1;
    color: #ffffff;
    margin-left: 18px;
  }
   .empty {
      background: #ffffff;
      color: #538bf1;
      border: 1px solid #538bf1;
    }
}
</style>
