<template>
  <div>
    <div class="content">
      <!-- 新增按钮 -->
      <button class="add" @click="addSponsor">+ 新增</button>
      <!-- 输入框和下拉框 -->
      <div class="b_content">
        <el-input clearable class="select_72" v-model="batchNumber" placeholder="批次号"></el-input>
        <el-button class="b_button query" @click="refer">查询</el-button>
        <el-button class="b_button empty" @click="empty">清空</el-button>
      </div>
      <!-- 表格 -->
      <div class="tables">
        <el-table
          :default-sort="{prop: 'date', order: 'descending'}"
          :header-cell-style="{'font-size':'12px','text-align':'center','height':'38.9px','background':'#ececec'}"
          ref="multipleTable"
          :data="for_"
          tooltip-effect="dark"
          style="width: 100%"
          @row-click="clickRow"
          @select="select"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection"></el-table-column>
          <el-table-column prop="related_id" label="批次号"></el-table-column>
          <el-table-column width="300" prop="file_name" label="文件名称"></el-table-column>
          <!-- <el-table-column width="350" prop="file_path" label="文件路经"></el-table-column> -->
          <el-table-column prop="created_by" label="申请人"></el-table-column>
          <el-table-column prop="created_date" label="操作日期">
            <template slot-scope="scope">
              <span>{{date_filters(scope.row.created_date)}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="phase_name" label="流程阶段"></el-table-column>
          <el-table-column prop="operation" label="操作" fixed="right">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="uploadS(scope.row)">导入代垫文件</el-button>
              <el-button type="text" size="small" @click="detailed(scope.row.related_id)">明细</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <pagination @jump-page="jump" :page="pageConfig" class="pagination"></pagination>
      <!-- 底部 -->
      <div class="enable">
        <el-button class="t_button dead_t" @click="removeShow">删除</el-button>
        <el-button class="t_button initiate_t" @click="openSubmit">提交</el-button>
      </div>
    </div>
    <upload
      v-if="uploadShow"
      @close_s="close_"
      @getFileId="getFileId"
      @getFileName="getFileName"
      @FileSaveFun="FileSaveFun"
    />
    <addBatchSponsor :refer="refer" v-if="showSponsor" @click_="clickSponsor" />
    <deleteSponsor
      :message="message"
      :deleteInterface="deleteInterface"
      :deleteInterface_="present"
      v-if="expurgate"
      @close_s="closeS"
    />
    <particulars :batchNumberIntroduced="batchNumberIntroduced" v-if="show" @close_m="close" />
  </div>
</template>

<script type="text/ecmascript-6">
import pagination from "@components/pagination"; // 分页组件
import upload from "./upload/index"; // 导入代垫文件组件
import deleteSponsor from "./deleteSponsor/index"; // 删除组件
import addBatchSponsor from "./addBatchSponsor/index"; // 新增组件
import particulars from "./particulars/index"; // 明细组件
import { checkingApi } from "../../../../js/server"; // 接口
export default {
  data() {
    return {
      uploadShow: false, // 导入代垫文件组件默认不显示
      showSponsor: false, // 新增组件默认不显示
      show: false, // 明细组件默认不显示
      batchNumber: "", // 批次号
      fileName: "", // fileName
      fileId: "", // fileId
      deleteSubmitData: "", // 选中批次号
      batchNumberIntroduced: "", // 打开明细组件带入批次号
      selectedRow: [], // 选中复选框
      expurgate: false, // 删除组件默认不显示
      interfaceJudgment: {}, // 提交接口判断文件存不存在
      pageConfig: {
        account: 0, // 总条数
        pageSize: 10, // 当前多少条数据
        currentPage: 1, // 当前页
        showJumpButton: true // 显示跳转按钮
      }, // 分页
      searchData: {
        eq: {}
      },
      for_: [] // 渲染列表
    };
  },
  methods: {
    // 提交接口
    present() {
      let selectedData = this.selectedRow;
      for (let i = 0; i < selectedData.length; i++) {
        selectedData[i] = selectedData[i].related_id;
      }
      let url = checkingApi.submitReviewa;
      let data = {
        flowNo: "batchAdvancePayFlow", // 流程名称
        relatedId:
          selectedData.length > 1 ? selectedData.slice(1) : selectedData // 批次号
      };
      this.$MyFetch
        .post(url, data)
        .then((data = {}) => {
          console.log(data);
          this.expurgate = false;
          this.confirmFn("提交成功");
          this.refer();
        })
        .catch(err => {
          this.expurgate = false;
          this.$error(err.message);
        });
    },
    // 打开提交组件
    openSubmit() {
      this.message = "是否提交选中的申请";
      if (
        this.selectedRow.length > 0 &&
        this.interfaceJudgment.file_name !== null
      ) {
        this.expurgate = true;
        console.log(this.selectedRow);
      } else {
        this.confirmFn("请先选择要提交的数据并且先导入代垫文件");
      }
    },
    // 删除接口
    deleteInterface() {
      let selectedData = this.selectedRow;
      for (let i = 0; i < selectedData.length; i++) {
        selectedData[i] = selectedData[i].related_id;
      }
      let url = checkingApi.deleteRepaya;
      let data = {
        relatedId:
          selectedData.length > 1 ? selectedData.slice(1) : selectedData
      };
      this.$MyFetch
        .post(url, data)
        .then((data = {}) => {
          console.log(data);
          this.expurgate = false;
          this.confirmFn("删除成功");
          this.refer();
        })
        .catch(err => {
          this.expurgate = false;
          this.$error(err.message);
        });
    },
    // 打开删除组件
    removeShow() {
      this.message = "是否删除选中的申请";
      if (this.selectedRow.length > 0) {
        this.expurgate = true;
        console.log(this.selectedRow);
      } else {
        this.confirmFn("请先选择要删除的数据");
      }
    },
    // 关闭删除组件
    closeS() {
      this.expurgate = false;
    },
    // 打开明细组件
    detailed(detaile) {
      this.show = true;
      this.batchNumberIntroduced = detaile;
    },
    // 关闭明细组件
    close() {
      this.show = false;
    },
    // 文件id
    getFileId(data) {
      console.log(data, "fineId");
      this.fileId = data;
    },
    // 文件名字
    getFileName(data) {
      this.fileName = data;
      console.log(data, "filename");
    },
    // 文件流接口
    FileSaveFun() {
      let _that = this;
      let queryData = {
        file_name: this.fileName,
        file_id: this.fileId,
        related_id: this.deleteSubmitData
      };
      console.log(queryData, "name id");
      this.batchRepaymentFileSave(queryData)
        .then(data => {
          _that.reload();
        })
        .catch(err => {
          _that.$error(err);
        });
    },
    // 文件流接口保存
    batchRepaymentFileSave(res) {
      return new Promise((resolve, reject) => {
        console.log(checkingApi.SingleRepaymentaa, res, "文件保存url data");
        this.$MyFetch
          .post(checkingApi.SingleRepaymentaa, res, { timeout: 120000 })
          .then((data = {}) => {
            if (data.success) {
              resolve(data);
            } else {
              reject(data.msg);
            }
          })
          .catch(err => {
            this.$error(err);
          });
      });
    },
    // 刷新页面
    reload() {
      let data = this.searchData;
      let current = this.pageConfig.currentPage;
      console.log("reload2", data, current);
      this.loanParameter(data, current);
    },
    // 毫秒格式化
    date_filters(data) {
      function change(t) {
        if (t < 10) {
          return "0" + t;
        } else {
          return t;
        }
      }
      if (data) {
        var date = new Date(data * 1000); // 时间戳为10位需*1000，时间戳为13位的话不需乘1000;
        let Y = date.getFullYear() + "-";
        let M =
          (date.getMonth() + 1 < 10
            ? "0" + (date.getMonth() + 1)
            : date.getMonth() + 1) + "-";
        let D = change(date.getDate()) + " ";
        let h = change(date.getHours()) + ":";
        let m = change(date.getMinutes()) + ":";
        let s = change(date.getSeconds());
        return Y + M + D + h + m + s;
      } else {
        return "---";
      }
    },
    // 打开新增组件
    addSponsor() {
      this.showSponsor = true;
    },
    // 关闭新增组件
    clickSponsor() {
      this.showSponsor = false;
    },
    // 发起查询列表接口
    loanParameter(res, current) {
      res = res || {};
      current = current || 1;
      let url =
        checkingApi.SingleRepaymenta + "?current=" + current + "&size=10";
      this.$MyFetch
        .post(url, res)
        .then((data = {}) => {
          this.for_ = data.records;
          // 总条数
          this.pageConfig.account = data.total || 1;
          // 当前页
          this.pageConfig.currentPage = data.current || 1;
          // 一页有几条数据 pageSize
          this.pageConfig.pageSize = data.size || 10;
        })
        .catch(err => {
          this.$error(err.message);
        });
    },
    // 查询
    refer() {
      // if (this.batchNumber === "") {
      //   this.confirmFn("请输入查询条件");
      //   this.for_ = [];
      //   this.pageConfig.account = 0;
      //   this.pageConfig.currentPage = 1;
      // } else {
      this.searchData.eq.related_id = this.batchNumber;
      this.searchData.phase_no = "0010";
      this.searchData.flow_no = "batchAdvancePayFlow";
      this.loanParameter(this.searchData);
      console.log(this.searchData);
      // }
    },
    // 清空
    empty() {
      // 批次号
      this.batchNumber = "";
    },
    // 打开导入代垫文件组件
    uploadS(detail) {
      if (detail.file_name) {
        this.confirmFn("这笔数据已经导入过代垫文件了");
      } else {
        this.deleteSubmitData = detail.related_id;
        this.uploadShow = true;
      }
    },
    // 关闭导入代垫文件组件
    close_() {
      this.uploadShow = false;
    },
    // 分页
    jump(pageNum) {
      this.loanParameter(this.searchData, pageNum);
    },
    // 只能选择其中一个复选框事件
    select(selection, row) {
      if (selection.length > 1) {
        selection.shift();
      }
      this.interfaceJudgment = row;
      console.log(this.interfaceJudgment);
    },
    // 行选中
    clickRow(row) {
      this.$refs.multipleTable.toggleRowSelection(row);
      this.interfaceJudgment = row;
    },
    // 选中复选框事件
    handleSelectionChange(data) {
      this.multipleSelection = data;
      if (this.multipleSelection.length > 1) {
        this.$refs.multipleTable.toggleRowSelection(this.multipleSelection[0]);
      }
      this.selectedRow = data;
      console.log(data);
    }
  },
  components: {
    pagination, // 分页组件
    upload,
    addBatchSponsor,
    particulars,
    deleteSponsor
  },
  created() {
    this.refer();
  }
};
</script>

<style lang="less" rel="stylesheet/less" scoped>
// 中间部分
.content {
  height: 780px;
  border-radius: 4px;
  background: #fff;
  box-shadow: 1px 2px 20px #ccc;
  overflow: auto;
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
    // height: 60px;
    margin-left: 28px;
    // 输入框和下拉框172*40
    .select_72 {
      width: 160px;
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
    width: 97%;
    margin: 0px auto;
    border: 1px solid #d0d0d0;
    margin-top: 21px;
    border-radius: 4px;
  }
  // 去掉element表格的默认全选按钮
  .tables /deep/ th .el-checkbox {
    display: none;
  }
  .pagination {
    margin-top: 40px;
    margin-right: 30px;
  }
  .enable {
    text-align: center;
    margin-top: 80px;
    margin-bottom: 20px;
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
    }
  }
}
</style>
