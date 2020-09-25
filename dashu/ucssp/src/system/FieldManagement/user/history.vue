<template>
  <div class="field">
    <!-- 顶岗 -->
    <div class="dialog-mask"></div>
    <div class="dialog-box">
      <div class="dialog-box__top">
        <h5 class="title bg__white">顶岗记录</h5>
        <span class="el-icon-close button button__close" @click="close"></span>
      </div>
      <div class="dialog-box__middle">
        <div class="middle">
          <!-- 顶岗记录 -->
          <el-table
            :data="tableData"
            border
            style="width: 100%"
            cell-class-name="dialog__table__td"
            header-cell-class-name="dialog__table__th"
            height="420px"
            @row-click="rowClick"
            class="dialog__table"
          >
            <el-table-column label="申请编号">
              <template slot-scope="scope">
                <span>{{ scope.row.applicationId }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="taskName" label="流程环节"></el-table-column>
            <el-table-column prop="oldUserId" label="原操作用户编号"></el-table-column>
            <el-table-column prop="oldUserName" label="原操作用户姓名"></el-table-column>
            <el-table-column prop="takeOverUserId" label="现操作用户编号"></el-table-column>
            <el-table-column prop="takeOverUserName"  label="现操作用户姓名"></el-table-column>
            <el-table-column  width="98%" label="顶岗时间">
              <template slot-scope="scope">
                <span>{{ scope.row.takeOverTime }}</span>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <pagination :page="pageConfig" class="pagination" @jump-page="jump"></pagination>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">

import api from "../js/server/server";
import pagination from "@components/pagination";
import rules from "@common/js/rules";
export default {
  data() {
    return {
      input6: "",
      input7: "",
      formInline: {
        certificateNum: "",
        custName: ""
      },
      currentQuery: {
        certificateNum: "",
        custName: ""
      },
      tableData: [],
      rules: {
        certificateNum: [{ validator: rules.identityCardRule }]
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
      this.$parent.historyV = false;
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.currentQuery = Object.assign(this.currentQuery, this.formInline);
          this.getTableData(1, this.currentQuery);
        } else {
          return false;
        }
      });
    },
    getTableData(currentPage) {
      var data = Object.assign({ pageNum: currentPage, pageSize: 10 }, {});
      this.$MyFetch.get(api.user.historyList, data)
        .then((data = {}) => {
          if (data.list) {
              data.list.forEach((v, index) => {
                v.isSelect = false;
                v.index = index;
              });
              this.tableData = [...data.list];
            }
            this.pageConfig.currentPage = data.pageNum || currentPage;
            this.pageConfig.account = data.total || 0;
        })
        .catch((err) => {
          this.$error(err.message);
        });
    },
    jump(num) {
      this.getTableData(num, this.currentQuery);
    },
    rowClick(obj) {
      if (obj.isSelect) {
        this.tableData.forEach(v => {
          this.$set(v, "isSelect", false);
        });
      } else {
        this.tableData.forEach(v => {
          this.$set(v, "isSelect", false);
        });
        this.$set(obj, "isSelect", true);
        this.currentData = Object.assign(obj);
      }
    }
  },
  created() {
    this.getTableData(1, this.currentQuery);
  },
  components: {
    pagination
  }
};
</script>
<style lang="less" rel="stylesheet/less" scoped>
@import "../../../common/css/dialog";
.field {
  .dialog-box {
    width: 945px;
    padding-bottom: 0;
    .dialog-box__middle {
      height: 566px;
    }
  }
  .pagination {
    margin: 20px 0;
  }
}
</style>
