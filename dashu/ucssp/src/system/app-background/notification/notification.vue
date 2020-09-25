<template>
  <div class="page-company">
    <div class="data-box"><span class="maintenance">消息推送</span></div>
    <el-button
      type="primary"
      class="button button__blue btn__add width100"
      icon="el-icon-plus"
      @click="add_alert()"
    >新增</el-button>
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
        prop="messageType"
        label="消息类型"
      >
      </el-table-column>
      <el-table-column
        prop="messageContent"
        label="消息内容"
      >
      </el-table-column>
      <el-table-column
        prop="pushObject"
        label="推送对象"
      >
      </el-table-column>
      <el-table-column label="时间段" width="400">
        <template slot-scope="scope">
          <span>{{scope.row.timeSectionStartDttm}}</span>至
          <span>{{scope.row.timeSectionEndDttm}}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="messageState"
        label="消息状态"
      >
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <span
            class="cursor__pointer font__blue"
            @click="compile(scope.row)"
          >编辑</span>
        </template>
      </el-table-column>
    </el-table>
    </div>
    <pagination
      :page="pageConfig"
      class="pagination"
      @jump-page="jump"
    ></pagination>
    <newlyIncreased
      v-if="alert_"
      :refer="refer"
      @clsoe_windowAlert='close_1'
    />
    <compile
      v-if="alert_c"
      :refer="refer"
      :compile_data="compile_data"
      @clsoe_windowAlert_c='close_2'
    />
  </div>
</template>
<script type="text/ecmascript-6">
import pagination from "@components/pagination";
import { configApi } from "../js/server.js";
import newlyIncreased from "./newly-increased";
import compile from "./compile";
export default {
  data() {
    return {
      tableData: [], // 列表数据
      alert_: false, // 打开新增页面
      alert_c: false, // 打开编辑页面
      compile_data: "", // 传给编辑页面数据
      role: [], // 消息类型下拉内容
      contact_num: [], // 推送对象下拉内容
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
    newlyIncreased,
    compile
  },
  methods: {
    // 分页
    jump(pageNum) {
      this.pageConfig.currentPage = pageNum;
      this.refer(this.pageConfig.currentPage);
      // this.defaultList(this.pageConfig.currentPage);
    },
    // 打开编辑页面
    compile(data) {
      console.log(data);
      this.compile_data = data;
      this.alert_c = true;
    },
    add_alert() {
      this.alert_ = true;
    },
    close_1() {
      this.alert_ = false;
    },
    close_2() {
      this.alert_c = false;
    },
    drop_down() {
      let data = {
        confType: "dict"
      };
      let url = configApi.config_init;
      this.$MyFetch
        .post(url, data)
        .then((data = {}) => {
          console.log(data);
          for (let i = 0; i < data.dict.select_app_message_type.length; i++) {
            this.role.push({
              value: data.dict.select_app_message_type[i].value,
              label: data.dict.select_app_message_type[i].show
            });
          }
          for (let i = 0; i < data.dict.select_app_message_object.length; i++) {
            this.contact_num.push({
              value: data.dict.select_app_message_object[i].value,
              label: data.dict.select_app_message_object[i].show
            });
          }
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
      let url = configApi.appMessage_list;
      this.$MyFetch
        .post(url, data)
        .then((data = {}) => {
          console.log(data);
          this.tableData = data.list;
          if (this.tableData.length > 0) {
            for (let i = 0; i < this.tableData.length; i++) {
              this.tableData[i].messageType = this.role[this.role.findIndex(index => index.value === this.tableData[i].messageType)].label;
              this.tableData[i].pushObject = this.contact_num[this.contact_num.findIndex(index => index.value === this.tableData[i].pushObject)].label;
            }
          }
          this.pageConfig.account = data.total;
          this.pageConfig.currentPage = data.pageNum;
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
  .tables {
    overflow-y: auto;
    overflow-x: hidden;
    min-height: 540px;
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
