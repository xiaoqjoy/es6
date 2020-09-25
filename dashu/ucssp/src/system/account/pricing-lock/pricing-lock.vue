<template>
  <div class="page-company">
    <div class="data-box"><span class="maintenance">定价锁开关配置</span></div>
    <el-button
      type="primary"
      class="button button__blue btn__add width100"
      icon="el-icon-plus"
      @click="add_alert()"
    >新增</el-button>
    <!-- 输入框和下拉框 -->
    <div class="b_content">
      <el-select
        class="select_72"
        v-model="company"
        placeholder="分公司"
        filterable
        clearable
      >
      <el-option
          v-for="item in filiale"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
      </el-option>
      </el-select>
      <el-select
        class="select_72"
        v-model="pricing"
        placeholder="定价锁开关"
        clearable
      >
        <el-option
          v-for="item in pricing_lock"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
      <el-button
        class="b_button query"
        @click="refer(1)"
      >查询</el-button>
      <el-button
        class="b_button empty"
        @click="empty()"
      >清空</el-button>
    </div>
    <!-- 表格 -->
    <el-table
      :data="tableData"
      class="common__table"
      header-cell-class-name="table-head"
      row-class-name="table-tr"
      style="width: 100%"
      height="500"
    >
      <el-table-column
        prop="subcompanyName"
        label="分公司（营销机构）"
      >
      </el-table-column>
      <el-table-column
        prop="pricingSwitch"
        label="定价锁开关"
      >
        <template slot-scope="scope">
          <span>{{scope.row.pricingSwitch ? '开':'关'}}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="updatedName"
        label="更新人"
      >
        <!-- <template slot-scope="scope">
          <span>{{(scope.row.statusCode === 'U') ? '停用':'正常'}}</span>
        </template> -->
      </el-table-column>
      <el-table-column
        prop="updatedDate"
        label="更新时间"
      >

      </el-table-column>
      <el-table-column
        prop="messageState"
        label="操作"
      >
        <template slot-scope="scope">
          <el-button
            type="text"
            size="small"
            @click="compile_alert(scope.row)"
          >编辑</el-button>
          <el-button
            class="red"
            type="text"
            size="small"
            @click="edit_alert(scope.row)"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
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
      v-if="alert"
      :refer="refer"
      :compile_data="compile_data"
      @clsoe_windowAlert='close_2'
    />
    <deleted
      v-if="alert_c"
      :refer="refer"
      :deleted="deleted"
      @clsoe_windowAlert_c='close_3'
    />
  </div>
</template>
<script type="text/ecmascript-6">
import pagination from "@components/pagination";
//   import addCompany from './add_company';
import { accountApi } from "../js/server.js";
import newlyIncreased from "./newly-increased";
import deleted from "./deleted";
import compile from "./compile";
export default {
  data() {
    return {
      company: "", // 分公司
      pricing: "", // 定价锁
      tableData: [],
      alert_: false, // 默认关闭新增页面
      alert: false, // 默认关闭编辑页面
      alert_c: false, // 默认关闭删除页面
      compile_data: "", // 传入编辑页的数据
      edit_data: "", // 删除的数据
      delete_id: "", // 删除的数据id
      pageConfig: {
        account: 0, // 总条数
        pageSize: 10, // 当前多少条数据
        currentPage: 1, // 当前页
        showJumpButton: true // 显示跳转按钮
      }, // 分页
      filiale: [], // 分公司下拉数据
      pricing_lock: [
        {
          value: "true",
          label: "开"
        },
        {
          value: "false",
          label: "关"
        }
      ]
    };
  },
  components: {
    pagination,
    newlyIncreased,
    compile,
    deleted
  },
  methods: {
    add_alert() {
      this.alert_ = true;
    },
    // 新增
    close_1() {
      this.alert_ = false;
    },
    // 编辑
    close_2() {
      this.alert = false;
    },
    // 删除
    close_3() {
      this.alert_c = false;
    },
    // 删除
    edit_alert(data) {
      this.delete_id = data.id;
      // this.edit_data = data;
      this.alert_c = true;
    },
    // refer() {
    //   console.log("cx");
    // },
    // 删除接口
    deleted() {
      let data = {
        id: this.delete_id
      };
      let url = accountApi.pricing_lock_controller.pricingLock_delete;
      this.$MyFetch
        .post(url, data)
        .then((data = {}) => {
          console.log(data);
          this.refer(1);
          this.alert_c = false;
        })
        .catch(err => {
          this.$error(err.message);
        });
    },
    // 编辑
    compile_alert(data) {
      // this.compile_data = data
      let url = `${accountApi.pricing_lock_controller.pricing_pricingLock}/${
        data.id
      }/pricingLock`;
      this.$MyFetch
        .get(url)
        .then((data1 = {}) => {
          console.log(data1);
          this.compile_data = data1;
          console.log(this.compile_data);
          this.alert = true;
        })
        .catch(err => {
          this.$error(err.message);
        });
    },
    // 清空按钮
    empty() {
      this.company = "";
      this.pricing = "";
      this.refer(1);
    },
    // 分页
    jump(pageNum) {
      this.pageConfig.currentPage = pageNum;
      this.refer(this.pageConfig.currentPage);
      // this.defaultList(this.pageConfig.currentPage);
    },
    drop_down() {
      let url = accountApi.pricing_lock_controller.common_subcompanies;
      this.$MyFetch
        .get(url)
        .then((data = {}) => {
          console.log(data);
          // 分公司下拉框内容
          for (let i = 0; i < data.length; i++) {
            this.filiale.push({
              value: data[i].subcompanyId,
              label: data[i].subcompanyName
            });
          }
        })
        .catch(err => {
          this.$error(err.message);
        });
    },
    // 查询列表
    refer(pageNum) {
      let data = {
        pageNum: pageNum, // 当前页
        pageSize: this.pageConfig.pageSize, // 当前多少条数据
        subcompanyId: this.company, // 分公司
        pricingSwitch: this.pricing // 定价锁开关
      };
      console.log(data);
      let url = accountApi.pricing_lock_controller.pricingLock_list;
      this.$MyFetch
        .get(url, data)
        .then((data = {}) => {
          console.log(data);
          this.tableData = data.list;
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
    this.refer(1);
  }
};
</script>
<style lang="less" rel="stylesheet/less" scoped>
.page-company {
  position: relative;
  min-height: 820px;
  .boxShadow(0, 0);
  padding: 20px 31px;
  .btn__add {
    /deep/ .el-icon-plus {
      line-height: 1.2;
      font-weight: 600;
    }
    margin-bottom: 20px;
  }
  .pagination {
    position: absolute;
    bottom: 20px;
    right: 31px;
  }
  .common__table {
    /deep/.el-table__body-wrapper {
      max-height: 550px;
      overflow-y: auto;
      .red {
        color: #f55f5f;
      }
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
  .b_content {
    text-align: left;
    height: 60px;
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
      border: 1px solid #538bf1;
    }
    // 清空单独样式
    .empty {
      background: #ffffff;
      color: #538bf1;
      border: 1px solid #538bf1;
    }
  }
}
</style>
