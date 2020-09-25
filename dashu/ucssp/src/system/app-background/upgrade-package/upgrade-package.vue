<template>
  <div class="page-company">
    <div class="data-box"><span class="maintenance">升级包管理</span></div>
    <el-button type="primary" class="button button__blue btn__add width100" icon="el-icon-plus" @click="add_alert()">新增</el-button>
    <div class="tables">
    <el-table :default-sort="{prop: 'date', order: 'descending'}"
          :header-cell-style="{'font-size':'12px','text-align':'center','height':'38.9px','background':'#ececec'}"
          ref="multipleTable"
          :data="tableData"
          tooltip-effect="dark"
          style="width: 100%">
      <el-table-column prop="upgradePackageName" label="升级包名称">
      </el-table-column>
      <el-table-column prop="versionNum" label="版本号" width="200">
      </el-table-column>
      <el-table-column prop="sendingDttm" label="发布时间" width="200">
      </el-table-column>
      <el-table-column prop="apkUrl" label="URL" width="500">
        <template slot-scope="scope">
              <el-popover width="200" trigger="hover" placement="top">
                <p>{{scope.row.apkUrl}}</p>
                <div slot="reference">
                  <p class="yincan">{{scope.row.apkUrl}}</p>
                </div>
              </el-popover>
            </template>
      </el-table-column>
      <el-table-column prop="sysTypeShow" label="类型" width="200">
      </el-table-column>
      <el-table-column label="是否强制更新" width="200">
        <template slot-scope="scope">
          <el-switch :width=50 v-model="scope.row.isCompelUpdateInd" @change="compile(scope.row)">
          </el-switch>
          <span>{{(scope.row.isCompelUpdateInd === true) ? '是':'否'}}</span>
        </template>
      </el-table-column>
    </el-table>
    </div>
    <pagination :page="pageConfig" class="pagination" @jump-page="jump"></pagination>
    <newlyIncreased v-if="alert_" :systemtype="systemtype" :refer="refer" @clsoe_windowAlert='close_1' />
  </div>
</template>
<script type="text/ecmascript-6">
import pagination from "@components/pagination";
//   import addCompany from './add_company';
import { configApi } from "../js/server.js";
import newlyIncreased from "./newly-increased";
export default {
  data() {
    return {
      tableData: [], // 列表数据
      alert_: false, // 打开新增页面
      systemtype: [],
      pageConfig: {
        account: 0, // 总条数
        pageSize: 10, // 当前多少条数据
        currentPage: 1, // 当前页
        showJumpButton: true // 显示跳转按钮
      } // 分页
    };
  },
  components: {
    pagination,
    newlyIncreased
  },
  methods: {
    // 分页
    jump(pageNum) {
      this.pageConfig.currentPage = pageNum;
      this.refer(this.pageConfig.currentPage);
      // this.defaultList(this.pageConfig.currentPage);
    },
    add_alert() {
      this.alert_ = true;
    },
    close_1() {
      this.alert_ = false;
    },
    // 下拉框数据查询
    drop_down() {
      let data = {
        confType: "dict"
      };
      let url = configApi.config_init;
      this.$MyFetch
        .post(url, data)
        .then((data = {}) => {
         this.systemtype = data.dict.select_uppackage_sys;
         this.refer(1);
        })
        .catch(err => {
          this.$error(err.message);
        });
    },
    // 查询列表
    refer(pageNum) {
      let data = {
        pageNum: pageNum, // 当前页
        pageSize: this.pageConfig.pageSize // 当前多少条数据
      };
      let url = configApi.upgradePackage_list;
      this.$MyFetch
        .post(url, data)
        .then((data = {}) => {
          this.tableData = data.list;
          let sysTypeShow = "";
          for (let index = 0; index < this.tableData.length; index++) {
            if (
              this.tableData[index].sysType !== null &&
              this.tableData[index].sysType !== ""
            ) {
              sysTypeShow = this.systemtype[this.systemtype.findIndex(i => i.value === this.tableData[index].sysType)].show;
              this.$set(this.tableData[index], "sysTypeShow", sysTypeShow);
            }
          }
          console.log(data);
          this.pageConfig.account = data.total;
          this.pageConfig.currentPage = data.pageNum;
        })
        .catch(err => {
          this.$error(err.message);
        });
    },
    compile(data1) {
      console.log(data1);
      let data = {
        id: data1.id,
        upgradePackageName: data1.upgradePackageName,
        versionNum: data1.versionNum,
        versionDesc: data1.versionDesc,
        sendingDttm: data1.sendingDttm,
        isCompelUpdateInd: data1.isCompelUpdateInd,
        apkUrl: data1.apkUrl,
        sysType: data1.sysType
      };
      let url = configApi.upgradePackage_update;
      this.$MyFetch
        .post(url, data)
        .then((data = {}) => {
        })
        .catch(err => {
          this.$error(err.message);
        });
    }
  },
  mounted() {
    this.drop_down();
  }
};
</script>
<style lang="less" rel="stylesheet/less" scoped>
.page-company {
  position: relative;
  min-height: 869px;
  .boxShadow(0, 0);
  padding: 0px 30px 20px 30px;
  .btn__add {
    /deep/ .el-icon-plus {
      line-height: 1.2;
      font-weight: 600;
    }
    margin-bottom: 20px;
  }
  .pagination {
    // position: absolute;
    bottom: 20px;
    right: 31px;
  }
  .common__table {
    /deep/.el-table__body-wrapper {
      max-height: 550px;
      overflow-y: auto;
    }
  }
  .data-box {
    height: 60px;
    border-bottom: 1px solid #d0d0d0;
    margin-bottom: 20px;
    .maintenance {
      border-left: 2px solid #538bf1;
      padding-left: 5px;
      font-family: PingFangSC-Medium;
      font-size: 16px;
      color: #333333;
      line-height: 60px;
    }
  }
  .el-table {
    .el-table__body-wrapper {
      .el-table__body {
        .el-table__row {
          .el-switch {
            height: 30px;
            opacity: 1;
          }
        }
      }
    }
  }
  .tables {
    overflow-y: auto;
    overflow-x: hidden;
    min-height: 600px;
    // width: 97%;
    margin: 0px auto;
    border: 1px solid #d0d0d0;
    border-radius: 4px;
    margin-bottom: 20px;
    .pushObject {
      margin-left: 5px;
    }
    .el-table {
      .yincan{
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
    }
  }
}
</style>
