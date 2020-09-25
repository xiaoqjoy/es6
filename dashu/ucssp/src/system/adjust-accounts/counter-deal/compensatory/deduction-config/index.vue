<template>
  <div class="content">
    <!-- 标题 -->
    <div class="content_top">
      <span>代偿客户扣款配置</span>
    </div>
    <!-- 中间部分 -->
    <div class="sponsor">
      <!-- 查询这一行 -->
      <div class="serach_row">
        <el-input clearable class="select_72" v-model="loanNo" placeholder="出账编号"></el-input>
        <el-input clearable class="select_72" v-model="customerName" placeholder="客户姓名"></el-input>
        <el-date-picker
          v-model="putoutDate"
          format="yyyy-MM-dd"
          value-format="yyyy-MM-dd"
          type="date"
          class="select_72"
          placeholder="放款日期"
        ></el-date-picker>
        <el-select v-model="fundOrg" class="select_72" placeholder="合作方" clearable>
          <el-option
            v-for="(item, index) in fundOrgList"
            :key="index"
            :label="item.itemName"
            :value="item.itemNo"
          ></el-option>
        </el-select>
        <el-select v-model="lineId" class="select_72" placeholder="资金方" clearable>
          <el-option
            v-for="(item, index) in lineIdList"
            :key="index"
            :label="item.itemName"
            :value="item.itemNo"
          ></el-option>
        </el-select>
        <el-date-picker
          class="select_box"
          v-model="daterange"
          type="daterange"
          align="right"
          range-separator="至"
          start-placeholder="代偿日期"
          end-placeholder="代偿日期"
          format="yyyy-MM-dd"
          value-format="yyyy-MM-dd"
        ></el-date-picker>
        <el-select clearable v-model="deductType" class="select_72" placeholder="参与批扣标识">
          <el-option
            v-for="(item, index) in deductTypeList"
            :key="index"
            :label="item.name"
            :value="item.code"
          ></el-option>
        </el-select>
        <el-button class="b_button query" @click="refer()">查询</el-button>
        <el-button class="b_button empty" @click="empty()">清空</el-button>
      </div>
      <div>
        <el-button type="success" @click="uploadBox = true">导入批扣文件</el-button>
        <el-button type="primary" @click="isJoin('1')">参与批扣</el-button>
        <el-button @click="isJoin('0')">不参与批扣</el-button>
      </div>
      <!-- 表格 -->
      <div class="table_box">
        <el-table
          ref="multipleTable"
          :data="data_list"
          tooltip-effect="dark"
          style="width: 100%"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column prop="loanNo" label="出账编号"></el-table-column>
          <el-table-column prop="customerName" label="客户姓名"></el-table-column>
          <el-table-column prop="putoutDate" label="放款日期"></el-table-column>
          <el-table-column prop="fundOrgName" label="合作方"></el-table-column>
          <el-table-column prop="lineIdName" label="资金方"></el-table-column>
          <el-table-column prop="buyDate" label="代偿日期"></el-table-column>
          <el-table-column prop="deductType" label="参与批扣" width="200">
            <template slot-scope="scope">
              <el-switch
                :width="50"
                active-value="1"
                inactive-value="0"
                v-model="scope.row.deductType"
                @change="switchChange(scope.row)"
              ></el-switch>
              <span>{{(scope.row.deductType == 1) ? '是':'否'}}</span>
            </template>
            <!-- <template slot-scope="scope">
              <el-switch
                v-model="scope.row.deductType"
                :active-value="1"
                :inactive-value="0"
                active-text="是"
                inactive-text="否"
              ></el-switch>
            </template>-->
          </el-table-column>
          <el-table-column width="228px" fixed="right" label="操作">
            <template slot-scope="scope">
              <el-button type="text" @click="handleView(scope.row)">详情</el-button>
              <el-button type="text" class="red" @click="handleDelete(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <!-- 分页 -->
    <div class="page_box">
      <!-- 分页条 -->
      <pagination @jump-page="jump" :page="pageConfig" class="pagination"></pagination>
    </div>
    <!-- 导入文件 -->
    <upload
      v-if="uploadBox"
      @close="uploadBox = false"
      @getFileId="getFileId"
      @getFileName="getFileName"
      @fileSaveFun="fileSaveFun"
    ></upload>
    <!-- 弹窗 -->
    <el-dialog
      title="详情"
      :visible.sync="isShowDialog"
      width="40%"
      :append-to-body="true"
      :center="true"
    >
      <el-table
        :header-cell-style="{'font-size':'12px','text-align':'center','height':'38.9px','background':'#ececec'}"
        ref="multipleTable"
        :data="detail_list"
        tooltip-effect="dark"
        height="300"
      >
        <el-table-column type="index" width="50" label="序号"></el-table-column>
        <el-table-column prop="updatedBy" label="修改人"></el-table-column>
        <el-table-column prop="updatedDate" label="修改时间"></el-table-column>
        <el-table-column prop="deductType" label="修改批扣标识">
          <template slot-scope="scope">
            <span>{{(scope.row.deductType == 1) ? '是':'否'}}</span>
          </template>
        </el-table-column>
        <!-- <el-table-column prop="deductChannel" label="扣款渠道"></el-table-column> -->
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="isShowDialog = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
import pagination from "@components/pagination"; // 分页组件
import upload from "./upload/index.vue"; // 导入文件
import { counterDealApi } from "../../js/server"; // 接口
export default {
  data() {
    return {
      loanNo: "", // 出账编号
      customerName: "", // 客户姓名
      putoutDate: "", // 放款日期
      fundOrg: "", // 合作方
      fundOrgList: [],
      lineId: "", // 资金方
      lineIdList: [],
      daterange: "", // 代偿日期
      deductType: "", // 参与批扣标识
      deductTypeList: [{ name: "是", code: "1" }, { name: "否", code: "0" }], // 参与批扣标识data
      pageConfig: {
        account: 0, // 总条数
        pageSize: 50, // 当前多少条数据
        currentPage: 1, // 当前页
        showJumpButton: true // 显示跳转按钮
      }, // 分页
      uploadBox: false, // 导入文件开关
      fileId: "",
      fileName: "",
      multipleSelection: [], // 多选
      data_list: [], // 渲染列表
      isShowDialog: false,
      detail_list: []
    };
  },
  created() {
    this.refer();
    this.fundOrgNameList();
    this.lineIdNameList();
  },
  methods: {
    refer(current) {
      let res = {
        loanNo: this.loanNo,
        customerName: this.customerName,
        putoutDate: this.putoutDate,
        fundOrg: this.fundOrg,
        lineId: this.lineId,
        startDate: this.daterange[0] || "",
        endDate: this.daterange[1] || "",
        deductType: this.deductType
      };
      console.log("res", res);
      current = current || 1;
      let url =
        counterDealApi.deductBuybackLists + "?current=" + current + "&size=50";
      this.$MyFetch
        .post(url, res)
        .then((data = {}) => {
          this.data_list = data.records;
          // 总条数
          this.pageConfig.account = data.total || 1;
          // 当前页
          this.pageConfig.currentPage = data.current || 1;
          // 一页有几条数据 pageSize
          this.pageConfig.pageSize = data.size || 50;
        })
        .catch(err => {
          this.$error(err.message);
        });
    },
    // 合作方下拉
    fundOrgNameList(res = { codeNo: "FundOrg" }) {
      this.$MyFetch
        .get(counterDealApi.FundOrgNameList, res)
        .then((data = {}) => {
          this.fundOrgList = data;
        })
        .catch(err => {
          this.$error(err.message);
        });
    },
    // 资金方下拉
    lineIdNameList(res) {
      res = res || {};
      this.$MyFetch
        .get(counterDealApi.LineIdNameList, res)
        .then((data = {}) => {
          this.lineIdList = data;
        })
        .catch(err => {
          this.$error(err.message);
        });
    },
    // 文件id
    getFileId(data) {
      this.fileId = data;
    },
    // 文件名字
    getFileName(data) {
      this.fileName = data;
    },
    fileSaveFun() {
      let _that = this;
      let queryData = {
        fileId: _that.fileId,
        fileName: _that.fileName
      };
      _that
        .importDeductBuybackFile(queryData)
        .then(res => {
          _that.$message({
            message: res,
            type: "success"
          });
          _that.refer();
        })
        .catch(err => {
          this.$error(err.message);
        });
    },
    // 批量代偿发起文件保存
    importDeductBuybackFile(res) {
      return new Promise((resolve, reject) => {
        res = res || {};
        let url = counterDealApi.importDeductBuybackFile;

        this.$MyFetch
          .post(url, res, { timeout: 120000 })
          .then((data = {}) => {
            resolve(data);
          })
          .catch(err => {
            reject(err);
          });
      });
    },
    // 是否参与批扣
    isJoin(type) {
      console.log("this.multipleSelection", this.multipleSelection);
      let buybackDeductInfoIds = [];
      let flag = true;
      if (this.multipleSelection.length > 0) {
        this.multipleSelection.map(item => {
          buybackDeductInfoIds.push(item.buybackDeductInfoId);
        });
      } else {
        this.$message.error("请先勾选需要操作的数据");
        flag = false;
      }

      if (!flag) {
        return;
      }
      let res = {
        deductType: type,
        buybackDeductInfoIds: buybackDeductInfoIds
      };
      this.$MyFetch
        .post(counterDealApi.deductBuybackEdit, res)
        .then((data = {}) => {
          this.refer(this.pageConfig.currentPage);
        })
        .catch(err => {
          this.$error(err.message);
        });
    },
    // 清空查询条件
    empty() {
      this.loanNo = ""; // 出账编号
      this.customerName = ""; // 客户姓名
      this.putoutDate = ""; // 放款日期
      this.fundOrg = ""; // 合作方
      this.lineId = ""; // 资金方
      this.daterange = ""; // 代偿日期
      this.deductType = ""; // 参与批扣标识
    },
    // 分页
    jump(pageNum) {
      this.pageConfig.currentPage = pageNum;
      this.refer(this.pageConfig.currentPage);
      console.log(pageNum);
    },
    switchChange(detail) {
      console.log(detail);
      let deductType = detail.deductType;
      let buybackDeductInfoIds = [];
      buybackDeductInfoIds.push(detail.buybackDeductInfoId);
      let res = {
        deductType: deductType,
        buybackDeductInfoIds: buybackDeductInfoIds
      };
      this.$MyFetch
        .post(counterDealApi.deductBuybackEdit, res)
        .then((data = {}) => {
          this.$message({
            message: "操作成功",
            type: "success"
          });
          this.refer(this.pageConfig.currentPage);
        })
        .catch(err => {
          this.$error(err.message);
        });
    },
    handleView(detail) {
      this.detail_list = [];
      this.detail_list.push(detail);
      this.isShowDialog = true;
    },
    handleDelete(detail) {
      this.$confirm("是否删除当前记录")
        .then(_ => {
          this.$MyFetch
            .post(counterDealApi.deductBuybackDel, {
              buybackDeductInfoId: detail.buybackDeductInfoId
            })
            .then((data = {}) => {
              this.$message({
                message: "删除成功",
                type: "success"
              });
              this.refer(this.pageConfig.currentPage);
            })
            .catch(err => {
              console.log(err);
              this.$error(err.message);
            });
        })
        .catch(_ => {});
    },
    // 选中复选框事件
    handleSelectionChange(data) {
      console.log(data);
      this.multipleSelection = data;
    }
  },
  components: {
    pagination, // 分页组件
    upload
  }
};
</script>

<style lang="less" rel="stylesheet/less" scoped>
.content {
  min-height: 850px;
  height: 100%;
  border-radius: 4px;
  background: #fff;
  box-shadow: 1px 2px 20px #ccc;
  //   overflow: hidden;
  padding: 0px 30px;
  .content_top {
    width: 100%;
    height: 60px;
    border-bottom: 1px solid #d0d0d0;
    display: flex;
    align-items: center;
    position: relative;
    &::before {
      content: "";
      width: 2px;
      height: 16px;
      background: #538bf1;
    }
    span {
      font-family: PingFangSC-Medium;
      font-size: 16px;
      color: #333333;
      font-weight: bold;
      margin-left: 7px;
    }
  }
  // 中间内容部分
  .sponsor {
    width: 100%;
    // height: 100%;
    // padding-top: 20px;
  }
  // 查询这行的box
  .serach_row {
    display: flex;
    flex-wrap: wrap;
    margin-top: 20px;
    // 输入框和下拉框172*40
    .select_box {
      margin-right: 15px;
      margin-bottom: 15px;
    }
    .select_72 {
      width: 150px;
      height: 40px;
      margin-right: 15px;
      margin-bottom: 15px;
      ::-webkit-input-placeholder {
        /* WebKit browsers */
        font-family: PingFangSC-Regular;
        font-size: 12px;
        color: #bbbbbb;
      }
      :-moz-placeholder {
        /* Mozilla Firefox 4 to 18 */
        font-size: 12px;
      }
      ::-moz-placeholder {
        /* Mozilla Firefox 19+ */
        font-size: 12px;
      }
      :-ms-input-placeholder {
        /* Internet Explorer 10+ */
        font-size: 12px;
      }
    }
    // 输入框和下拉框170*40
    .select_7 {
      width: 170px;
      height: 40px;
      margin-right: 15px;
      // padding-left: 15px;
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
      margin-left: 18px;
    }
    // 清空单独样式
    .empty {
      background: #ffffff;
      color: #538bf1;
      border: 1px solid #538bf1;
    }
  }
  // 表格
  .table_box {
    width: 100%;
    height: 560px;
    margin-top: 21px;
    overflow: auto;
  }
  // page_box 分页
  .page_box {
    width: 100%;
    margin-top: 20px;
  }
  .red {
    color: #f55f5f;
  }
  .el-switch .el-switch__core {
    border-radius: 15px !important;
  }
}
</style>
