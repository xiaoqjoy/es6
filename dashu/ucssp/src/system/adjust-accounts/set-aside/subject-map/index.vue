<template>
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
        prop="lineName"
        label="合作机构"
      >
      </el-table-column>
      <el-table-column
        prop="caesFeeTypeName"
        label="信贷系统费用类型"
      >
      </el-table-column>
      <el-table-column
        prop="userTypeShow"
        label="费用类型"
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
      :page="pageConfig"
      class="pagination"
      @jump-page="jump"
    ></pagination>
    <div class="text__center">
      <el-button
        class="t_button initiate_t"
        @click="derive()"
      >导出</el-button>
    </div>
    <editAuthOfficer
      v-if="alert_b"
      :compile_data="compile_data"
      :feeTypes="feeTypes"
      :refer="refer"
      @clsoe_windowAlert_b='close_1'
    />
  </div>
</template>
<script type="text/ecmascript-6">
import pagination from "@components/pagination";
import editAuthOfficer from "./editAuthOfficer"; // 编辑组件
import { checkingApi } from "../../js/server.js"; // 接口
export default {
  data() {
    return {
      tableData: [], // 渲染列表
      alert_b: false, // 打开编辑页面
      compile_data: "", // 传给编辑页面数据
      feeTypes: [], // 费用类型选择框数据
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
    editAuthOfficer
  },
  methods: {
    // 多选
    defaultSelect(selection, row) {
      console.log(selection);
      this.ids = selection;
    },
    // 全选
    all(selection) {
      console.log(selection);
      this.ids = selection;
    },
    // 分页
    jump(pageNum) {
      this.pageConfig.currentPage = pageNum;
      this.refer(this.pageConfig.currentPage);
      // this.defaultList(this.pageConfig.currentPage);
    },
    feeType() {
      let url = checkingApi.financeFeeType;
      this.$MyFetch
        .post(url)
        .then((data = {}) => {
          console.log(data);
           this.feeTypes = data;
           this.refer(1);
        })
        .catch(err => {
          this.$error(err.message);
        });
    },
    // 打开编辑页面
    compile_alert(data) {
        this.compile_data = data;
        this.alert_b = true;
    },
    // 关闭编辑页面
    close_1() {
      this.alert_b = false;
    },
    // 查询列表
    refer(pageNum) {
      let url = `${checkingApi.queryImpairmentFeeTypeMapList}?current=${pageNum}&size=${this.pageConfig.pageSize}`;
      this.$MyFetch
        .post(url)
        .then((data = {}) => {
          console.log(data);
          this.tableData = data.records;
          let userTypeShow = "";
          for (let index = 0; index < this.tableData.length; index++) {
            if (
              this.tableData[index].feeType !== null &&
              this.tableData[index].feeType !== ""
            ) {
              this.tableData[index].userTypeShow = this.feeTypes[this.feeTypes.findIndex(i => i.value === this.tableData[index].feeType)].label;
            }
            this.$set(this.tableData, "userTypeShow", userTypeShow);
          }
          this.pageConfig.account = data.total;
          this.pageConfig.currentPage = data.current;
        })
        .catch(err => {
          this.$error(err.message);
        });
    },
    // 导出接口
    // derive(pageNum) {
    //   // let data = JSON.stringify({
    //   //   startTime: this.startTime, // 查询开始时间
    //   //   endTime: this.endTime, // 查询结束时间
    //   //   queryMinCnt: this.queryMinCnt, // 最小查询量
    //   //   queryMaxCnt: this.queryMaxCnt, // 最大查询量
    //   //   userName: this.userName, // 用户姓名
    //   //   mobileNo: this.mobileNo, // 手机号码
    //   //   srcChannel: this.srcChannel // 所属公司
    //   // });
    //   let location = `${partnerApi.creditInvestRef_export}?startTime=${this.startTime}&endTime=${this.endTime}&queryMinCnt=${this.queryMinCnt}&queryMaxCnt=${this.queryMaxCnt}&userName=${this.userName}&mobileNo=${this.mobileNo}&srcChannel=${this.srcChannel}`;
    //   let iframe = document.createElement("iframe");
    //   iframe.src = location;
    //   iframe.style.display = "none";
    //   document.body.appendChild(iframe);
    //   // window.open(location);
    // },
    // 导出接口
    derive() {
      let url = checkingApi.export;
      this.$MyFetch
        .get(url)
        .then((data = {}) => {
          this.$download(data);
        }).catch(err => {
          this.confirmFn(err.message, "error");
        });
    }
  },
  mounted() {
    this.feeType();
  }
};
</script>
<style lang="less" rel="stylesheet/less" scoped>
.content {
  height: 866px;
  border-radius: 4px;
  background: #fff;
  box-shadow: 1px 2px 20px #ccc;
  overflow: hidden;
  .initiate_t {
    margin-top: 20px;
    width: 200px;
    height: 40px;
    background: #538bf1;
    font-size: 14px;
    color: #ffffff;
    letter-spacing: 1.07px;
    text-align: center;
    border: 1px solid #538bf1;
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
    margin-bottom: 100px;
    .pushObject {
      margin-left: 5px;
    }
  }
  .pagination {
    margin-right: 25px;
  }
}
</style>
