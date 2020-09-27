<template>
  <div>
    <div class="content">
      <!-- 表格 -->
      <div class="tables">
        <el-table
          :default-sort="{prop: 'date', order: 'descending'}"
          :header-cell-style="{'font-size':'12px','text-align':'center','height':'38.9px','background':'#ececec'}"
          ref="multipleTable"
          :data="tableData"
          tooltip-effect="dark"
          style="width: 100%"
        >
          <el-table-column
            prop="loanLevelDesc"
            label="贷款分类级别"
          >
          </el-table-column>
          <el-table-column
            prop="prinIntMigrationrate"
            label="本息迁徙率（%）"
          >
          </el-table-column>
          <el-table-column
            prop="prinIntFeeMigrationrate"
            label="本息费迁徙率（%）"
          >
          </el-table-column>
          <el-table-column
            prop="prinIntLossRate"
            label="本息损失率（%）"
          >
          </el-table-column>
           <el-table-column
            prop="prinIntFeeLossRate"
            label="本息费损失率（%）"
          >
          </el-table-column>
          <el-table-column
            prop="updatedBy"
            label="维护人"
          >
          </el-table-column>
          <el-table-column
            prop="updatedDate"
            label="维护日期"
          >
          </el-table-column>
          <el-table-column
            prop="createdDate"
            label="操作"
          >
            <template slot-scope="scope">
              <el-button
                type="text"
                size="small"
                @click="compile_alert(scope.row)"
              >编辑</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <pagination
        @jump-page='jump'
        :page='pageConfig'
        class="pagination"
      ></pagination>
    </div>
    <editAuthOfficer
      v-if="alert_b"
      :compile_data="compile_data"
      :refer="refer"
      @clsoe_windowAlert_b='close_2'
    />
  </div>
</template>

<script type="text/ecmascript-6">
import editAuthOfficer from "./editAuthOfficer/"; // 编辑组件
import pagination from "@components/pagination"; // 分页组件
import { checkingApi } from "../../js/server.js"; // 接口
export default {
  data() {
    return {
      tableData: [], // 渲染列表
      alert_b: false, // 编辑页面
      compile_data: "", // 传给编辑页面数据
      pageConfig: {
        account: 0, // 总条数
        pageSize: 10, // 当前多少条数据
        currentPage: 1, // 当前页
        showJumpButton: true // 显示跳转按钮
      } // 分页
    };
  },
  methods: {
    // 分页
    jump(pageNum) {
      this.pageConfig.currentPage = pageNum;
      this.refer(this.pageConfig.currentPage);
      // this.defaultList(this.pageConfig.currentPage);
    },
    // 打开编辑页面
    compile_alert(data) {
      this.compile_data = data;
      this.alert_b = true;
    },
    // 关闭编辑页面
    close_2() {
      this.alert_b = false;
    },
    // 查询消息列表接口
    refer(pageNum) {
      let url = `${checkingApi.queryPrivisionConfigList}?current=${pageNum}&size${this.pageConfig.pageSize}`;
      this.$MyFetch
        .post(url)
        .then((data = {}) => {
          console.log(data);
          this.tableData = data.records;
          this.pageConfig.account = data.total;
          this.pageConfig.currentPage = data.current;
        })
        .catch(err => {
          this.$error(err.message);
        });
    }
  },
  components: {
    editAuthOfficer, // 编辑
    pagination // 分页
  },
  mounted() {
    this.refer(1);
  }
};
</script>

<style lang="less" rel="stylesheet/less" scoped>
/deep/ .el-tabs__nav-wrap {
  -webkit-box-shadow: 1px 2px 20px #ccc;
  box-shadow: 1px 2px 20px #ccc;
  padding-left: 30px;
  padding-top: 10px;
  border-radius: 4px;
}
/deep/ .el-tabs__nav-wrap .el-tabs__item.is-active {
  font-family: PingFangSC-Semibold;
  font-size: 18px;
  color: #538bf1;
  letter-spacing: 1.38px;
}
/deep/ .el-tabs__nav-wrap .el-tabs__item.is-active .el-tabs__item {
  font-family: PingFangSC-Regular;
  font-size: 16px;
  color: #333333;
  letter-spacing: 1.22px;
  text-align: center;
}
// 中间部分
.content {
  height: 866px;
  border-radius: 4px;
  background: #fff;
  box-shadow: 1px 2px 20px #ccc;
  overflow: hidden;
  // 新增按钮
  .add {
    width: 100px;
    height: 40px;
    border: none;
    background: #538bf1;
    border-radius: 4px;
    color: #fff;
    display: block;
    cursor: pointer;
    margin: 20px 30px;
  }
  // 输入框和下拉框部分样式
  .b_content {
    margin-top: 30px;
    text-align: left;
    height: 60px;
    margin-left: 28px;
    // 输入框和下拉框172*40
    .select_72 {
      width: 172px;
      height: 40px;
      margin-right: 15px;
    }
    // 查询和清空的公有样式
    .b_button {
      width: 100px;
      height: 40px;
      border-radius: 4px;
      font-size: 14px;
    }
    // 查询单独样式
    .query {
      background: #538bf1;
      color: #ffffff;
    }
    // 清空单独样式
    .empty {
      background: #ffffff;
      color: #538bf1;
      border: 1px solid #538bf1;
    }
  }
  // 表格总体样式
  .tables {
    overflow-y: auto;
    overflow-x: hidden;
    height: 630px;
    width: 97%;
    margin: 0px auto;
    border: 1px solid #d0d0d0;
    margin-top: 21px;
    border-radius: 4px;
    margin-bottom: 165px;
    .pushObject {
      margin-left: 5px;
    }
  }
  .b_check {
    margin-left: 25px;
  }
  // 停用启用公共样式
  .t_button {
    width: 200px;
    height: 40px;
  }
  .dead_t {
    border: 1px solid #538bf1;
    font-size: 14px;
    color: #538bf1;
    letter-spacing: 1.07px;
    text-align: center;
  }
  .initiate_t {
    background: #538bf1;
    font-size: 14px;
    color: #ffffff;
    letter-spacing: 1.07px;
    text-align: center;
    border: 1px solid #538bf1;
  }
  // 去掉element表格的默认全选按钮
  .tables /deep/ th .el-checkbox {
    display: none;
  }
  .text__center {
    margin-top: 20px;
  }
  .pagination {
    margin-right: 30px;
  }
}
// .tables {
//     /deep/.el-table__body-wrapper {
//       height: 550px;
//       overflow-y: auto;
//     }
//   }
</style>
