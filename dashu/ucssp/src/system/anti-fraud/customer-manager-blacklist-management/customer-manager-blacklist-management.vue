<template>
  <div>
    <div class="content">
      <!-- 新增 -->
      <button class="add" @click="add_alert()">+ 新增</button>
      <!-- 输入框和下拉框 -->
      <div class="b_content">
        <el-form
          :inline="true"
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label prop="name">
            <el-input clearable class="select_8" maxlength="80" v-model="ruleForm.name" placeholder="姓名"></el-input>
          </el-form-item>
          <el-form-item label prop="zjhm">
            <el-input clearable class="select_2" maxlength="32" v-model="ruleForm.zjhm" placeholder="证件号码"></el-input>
          </el-form-item>
          <el-form-item label prop="yxrybm">
            <el-input clearable class="select_4" maxlength="40" v-model="ruleForm.yxrybm" placeholder="营销人员编码"></el-input>
          </el-form-item>
          <el-form-item label prop="ssyxdw">
            <el-input clearable class="select_4" maxlength="20" v-model="ruleForm.ssyxdw" placeholder="所属营销单位"></el-input>
          </el-form-item>
          <el-form-item label prop="qzxz">
            <el-select clearable class="select_2" v-model="ruleForm.qzxz" placeholder="欺诈性质">
              <el-option
                v-for="item in list_qz"
                :key="item.name"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label prop="djr">
            <el-input clearable class="select_8" maxlength="20" v-model="ruleForm.djr" placeholder="登记人"></el-input>
          </el-form-item>
          <el-form-item label prop="zt">
            <el-select clearable class="select_2" v-model="ruleForm.zt" placeholder="状态">
              <el-option
                v-for="item in state_"
                :key="item.name"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label prop="sgzmdsj">
            <el-date-picker
              class="select_4 select_s"
              v-model="ruleForm.sgzmdsj"
              type="date"
              format="yyyy/MM/dd"
              value-format="yyyy/MM/dd"
              placeholder="上关注名单时间"
            ></el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button class="b_button query" @click="refer(1)">查询</el-button>
            <el-button class="b_button empty" @click="clear()">清空</el-button>
          </el-form-item>
        </el-form>
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
          @selection-change="handleSelectionChange"
          @row-click="rowCheck"
        >
          <el-table-column type="selection"></el-table-column>
          <el-table-column sortable prop="customername" label="姓名"></el-table-column>
          <el-table-column sortable prop="certtype" label="证件类型"></el-table-column>
          <el-table-column width="200" sortable prop="certid" label="证件号码"></el-table-column>
          <el-table-column sortable width="120" prop="saleserialno" label="营销人员编码"></el-table-column>
          <el-table-column sortable width="180" prop="salebelongorg" label="所属营销单位"></el-table-column>
          <el-table-column sortable prop="fraudtype" label="欺诈性质"></el-table-column>
          <el-table-column sortable width="130" prop="begindate" label="上关注名单时间"></el-table-column>
          <el-table-column sortable width="140" prop="stopbegindate" label="停止进件开始时间"></el-table-column>
          <el-table-column sortable width="140" prop="stopenddate" label="停止进件结束时间"></el-table-column>
          <el-table-column sortable prop="inputuserid" label="登记人"></el-table-column>
          <el-table-column width="180" sortable prop="updatedate" label="更新时间"></el-table-column>
          <el-table-column prop="operation" fixed="right" label="操作">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="xq(scope.row)">详情</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- <el-checkbox class="b_check" @change="toggleSelection(for_, checkFlag)">全选</el-checkbox> -->
    </div>
    <pagination @jump-page="jump" :page="pageConfig" class="pagination"></pagination>
    <!-- 底部 -->
    <div class="bottom">
      <el-button class="b_bottom color" @click="import_fun">批量导入</el-button>
      <el-button class="b_bottom color_1" @click="invalid_fun">批量失效</el-button>
    </div>
    <!-- 引入组件 -->
    <addManagerBlacklist :refreshList="refreshList" v-if="alert_" @clsoe_windowAlert="close_1"/>
    <introductionList :fn_s="saveText_s" v-if="import_s" @clsoe_windowImport_s="close_import"/>
    <failedPopover :urlF="url_s" v-if="import_f" @clsoe_windowImport_f="close_import_f"/>
    <failureList :fn="saveText" v-if="invalid" @clsoe_windowinvalid="console_invalid"/>
    <hint v-if="isSelect" @clsoe_windowIsSelect="console_isSelect"/>
    <xq
      :refreshList="refreshList"
      :current_data="currentXqData"
      v-if="details"
      :list_s="list"
      :current_list="currentList"
    />
  </div>
</template>

<script type="text/ecmascript-6">
import pagination from "@components/pagination"; // 分页组件
import addManagerBlacklist from "./addManagerBlacklist"; // 新增组件
import introductionList from "../watch-list-management/introductionList"; // 批量导入组件
import failedPopover from "../watch-list-management/failedPopover"; // 批量导入模板有误组件
import failureList from "../watch-list-management/failureList"; // 批量失效组件
import hint from "../watch-list-management/hint"; // 批量失效提示组件
import xq from "../watch-list-management/details_alert/ListOfManagers"; // 详情组件
import { fqzApi } from "../../anti-fraud/js/server.js"; // 接口
import "@common/css/dialog";
import rules from "@system/anti-fraud/js/rules"; // 引入校验规则
export default {
  data() {
    return {
      ruleForm: {
        name: "",
        yxrybm: "",
        ssyxdw: "",
        zjhm: "",
        qzxz: "",
        zt: "",
        djr: "",
        sgzmdsj: ""
      }, // 查询表单控件
      rules: {
        zjhm: [
          { validator: rules.identityCardRule, trigger: "change" }
          // { required: true, message: "请输入证件号码", trigger: "blur" }
        ]
      },
      pageConfig: {
        account: 0, // 总条数
        pageSize: 10, // 当前多少条数据
        currentPage: 1, // 当前页
        showJumpButton: true // 显示跳转按钮
      }, // 分页
      alert_: false, // 新增客户经理黑名单弹窗
      import_s: false, // 批量导入
      import_f: false, // 批量导入模板有错
      url_s: "", // 批量导入模板有错
      invalid: false, // 批量失效
      details: false, // 详情
      // checkFlag: true, // 是否全选的标记
      isSelect: false, // 是否选择表格数据
      selectedRow: [], // 复选框是否选中
      list_qz: [], // 欺诈性质下拉框
      state_: [], // 状态下拉框
      for_: [], // 接口表格数组
      list: {}, // 详情
      currentList: [], // 判断详情页面有没有改变
      currentXqData: null // 传数据ID的值到更新接口
    };
  },
  components: {
    pagination, // 分页组件
    addManagerBlacklist, // 新增客户经理黑名单组件
    introductionList, // 批量导入组件
    failedPopover, // 批量导入模板有错提示框
    failureList, // 批量失效组件
    hint, // 提示框组件
    xq // 详情组件
  },
  methods: {
    // 批量导入
    saveText_s(file) {
      // 导入接口
      let data = new FormData();
      data.append("customertype", "5"); // 客户类型
      // data.append("inputuserid", "chenjinlong"); // 录入人
      // data.append("inputorgid", "大数金融"); // 录入机构
      data.append("file", file); // 文件
      // data.append(
      //   "main",
      //   JSON.stringify({
      //     sourceID: "string",
      //     transID: "string",
      //     transTime: "string",
      //     transType: "string"
      //   })
      // );
      let url = fqzApi.importExcel;
      this.$MyFetch
        .post(url, data)
        .then((data = {}) => {
          console.log(data);
          this.url_s = data.FILEURL;
          if (data.FILEURL) {
            this.import_f = true;
            this.import_s = false;
          } else if (data.HANDLECOUNT) {
            this.confirmFn("成功导入" + data.HANDLECOUNT + "条数据", "success");
            this.import_s = false;
            this.refreshList(1);
          } else if (data.ERRORMSG) {
            this.confirmFn(data.ERRORMSG);
          }
        })
        .catch(err => {
          this.$error(err.message);
        });
    },
    // 批量失效接口
    saveText(text) {
      let selectedData = this.selectedRow;
      for (let i = 0; i < selectedData.length; i++) {
        selectedData[i] = selectedData[i].serialno;
      }
      let data = {
        // insertsystem: "afs", // 新增操作系统
        updatesystem: "afs", // 更新操作系统
        customertype: "5", // 客户类型
        updateuserid: "chenjinlong", // 操作人
        cancelreason: text, // 失效原因
        serialnolist: selectedData, // 数据编号列表
        main: {
          sourceID: "string",
          transID: "string",
          transTime: "string",
          transType: "string"
        }
      };
      let url = fqzApi.failure;
      this.$MyFetch
        .post(url, data)
        .then((data = {}) => {
          this.invalid = false;
          this.confirmFn("失效成功", "success");
          this.refreshList(1);
        })
        .catch(err => {
          this.$error(err.message);
        });
    },
    // 清空查询文本框
    clear() {
      let fields = this.$refs["ruleForm"].fields;
      for (let i = 0; i < fields.length; i++) {
        fields[i].resetField();
      }
    },
    // 关闭批量导入模板错误组件
    close_import_f() {
      this.import_f = false;
    },
    // 关闭新增组件
    close_1() {
      this.alert_ = false;
    },
    // 打开新增组件
    add_alert() {
      this.alert_ = true;
      console.log(this.alert_);
    },
    // 关闭批量导入组件
    close_import() {
      this.import_s = false;
    },
    // 打开批量导入组件
    import_fun() {
      this.import_s = true;
    },
    // 关闭批量失效组件
    console_invalid() {
      this.invalid = false;
    },
    // 关闭提示信息组件
    console_isSelect() {
      this.isSelect = false;
    },
    // 打开批量失效组件
    invalid_fun() {
      // 判断复选框是否选中，选中弹批量失效
      if (this.selectedRow.length > 0) {
        this.invalid = true;
      } else {
        this.isSelect = true;
      }
    },
    // 详情接口
    xq(detail) {
      this.details = !this.details;
      // 详情页面
      let data = {
        serialno: detail.serialno, // 数据ID
        customertype: detail.customertype, // 客户类型
        main: {
          sourceID: detail.customertype,
          transID: detail.customertype,
          transTime: detail.customertype,
          transType: detail.customertype
        }
      };
      this.currentXqData = data.serialno;
      let url = fqzApi.getblacklistInfo;
      this.$MyFetch
        .post(url, data)
        .then((data = {}) => {
          this.list = data;
          if (this.list.certtype === "Ind01") {
            this.list.certtype = "身份证";
          }
          if (this.list.denyreason === "01") {
            this.list.denyreason = "政策禁入";
          } else if (this.list.denyreason === "02") {
            this.list.denyreason = "贷款黑中介";
          }
          if (this.list.fraudtype === "1") {
            this.list.fraudtype = "确认";
          } else if (this.list.fraudtype === "2") {
            this.list.fraudtype = "疑似";
          }
          this.currentList = Object.assign({}, this.list);
        })
        .catch(err => {
          this.$error(err.message);
        });
    },
    // 表格全选功能
    // toggleSelection(rows, checkFlag) {
    //   if (rows) {
    //     rows.forEach(row => {
    //       this.$refs.multipleTable.toggleRowSelection(row, checkFlag);
    //     });
    //   }
    //   this.checkFlag = !this.checkFlag;
    // },
    // 分页
    jump(pageNum) {
      this.pageConfig.currentPage = pageNum;
      this.refer(this.pageConfig.currentPage);
    },
    // 下拉选项接口
    get_data() {
      let data = {
        codenoList: ["CheatOrNot", "InvalidOReffective"]
      };
      let url = fqzApi.getCodeLibrary;
      this.$MyFetch
        .post(url, data)
        .then((data = {}) => {
          this.list_qz = data.CheatOrNot;
          this.state_ = data.InvalidOReffective;
        })
        .catch(err => {
          this.$error(err.message);
        });
    },
    // 刷新列表方法
    refreshList(pageNum) {
      if (
        this.ruleForm.name ||
        this.ruleForm.yxrybm ||
        this.ruleForm.ssyxdw ||
        this.ruleForm.zjhm ||
        this.ruleForm.qzxz ||
        this.ruleForm.zt ||
        this.ruleForm.djr ||
        this.ruleForm.sgzmdsj
      ) {
        let data = {
          customertype: "5", // 客户类型
          customername: this.ruleForm.name, // 客户姓名
          certid: this.ruleForm.zjhm, // 证件号码
          saleserialno: this.ruleForm.yxrybm, // 营销人员编码
          salebelongorg: this.ruleForm.ssyxdw, // 所属营销单位
          fraudtype: this.ruleForm.qzxz, // 欺诈性质
          inputuserid: this.ruleForm.djr, // 登记人
          status1: this.ruleForm.zt, // 状态
          begindate: this.ruleForm.sgzmdsj, // 上关注名单时间
          main: {
            sourceID: "string",
            transID: "string",
            transTime: "string",
            transType: "string"
          }
        };
        // 分页接口
        let url = `${fqzApi.getblacklistList}/${pageNum}/${
          this.pageConfig.pageSize
        }`;
        this.$MyFetch
          .post(url, data)
          .then((data = {}) => {
            let forData = data.list;
            this.pageConfig.account = data.total;
            this.pageConfig.currentPage = data.pageNum;
            // for (let i = 0; i < forData.length; i++) {
            //   if (parseInt(forData[i].status1) === 1) {
            //     forData[i].status1 = "是";
            //   } else if (parseInt(forData[i].status1) === 0) {
            //     forData[i].status1 = "否";
            //   }
            // }
            this.for_ = forData;
          })
          .catch(err => {
            this.$error(err.message);
          });
      } else {
        this.for_ = [];
        this.pageConfig.account = 0;
        this.pageConfig.currentPage = 1;
      }
    },
    // 查询接口
    refer(pageNum) {
      if (
        this.ruleForm.name ||
        this.ruleForm.yxrybm ||
        this.ruleForm.ssyxdw ||
        this.ruleForm.zjhm ||
        this.ruleForm.qzxz ||
        this.ruleForm.zt ||
        this.ruleForm.djr ||
        this.ruleForm.sgzmdsj
      ) {
        // 正则验证
        // this.$refs["ruleForm"].validate(valid => {
        //   if (valid) {
        //     console.log("验证通过了");
        // 渲染表格的内容
        let data = {
          customertype: "5", // 客户类型
          customername: this.ruleForm.name, // 客户姓名
          certid: this.ruleForm.zjhm, // 证件号码
          saleserialno: this.ruleForm.yxrybm, // 营销人员编码
          salebelongorg: this.ruleForm.ssyxdw, // 所属营销单位
          fraudtype: this.ruleForm.qzxz, // 欺诈性质
          inputuserid: this.ruleForm.djr, // 登记人
          status1: this.ruleForm.zt, // 状态
          begindate: this.ruleForm.sgzmdsj, // 上关注名单时间
          main: {
            sourceID: "string",
            transID: "string",
            transTime: "string",
            transType: "string"
          }
        };
        // 分页接口
        let url = `${fqzApi.getblacklistList}/${pageNum}/${
          this.pageConfig.pageSize
        }`;
        this.$MyFetch
          .post(url, data)
          .then((data = {}) => {
            let forData = data.list;
            this.pageConfig.account = data.total;
            this.pageConfig.currentPage = data.pageNum;
            // for (let i = 0; i < forData.length; i++) {
            //   if (parseInt(forData[i].status1) === 1) {
            //     forData[i].status1 = "是";
            //   } else if (parseInt(forData[i].status1) === 0) {
            //     forData[i].status1 = "否";
            //   }
            // }
            this.for_ = forData;
          })
          .catch(err => {
            this.$error(err.message);
          });
      } else {
        this.for_ = [];
        this.pageConfig.account = 0;
        this.pageConfig.currentPage = 1;
        this.confirmFn("请至少选择一个查询条件");
      }
      //     } else {
      //       console.log("error submit!!");
      //       return false;
      //     }
      //   });
    },
    // 选择复选框事件
    handleSelectionChange(data) {
      this.selectedRow = data;
    },
    // 行选中
    rowCheck(row, column, e) {
      this.$refs.multipleTable.toggleRowSelection(row);
    }
  },
  created() {
    this.get_data();
  },
  mounted() {}
};
</script>

<style lang="less" rel="stylesheet/less" scoped>
// 反欺诈系统黑名单主页面的公共样式
.anti-fraud-index {
  text-align: center;
  padding-top: 200px;
  // 中间部分
  .content {
    min-height: 620px;
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
      text-align: left;
      // height: 40px;
      margin-left: 28px;
      // 输入框和下拉框120*40
      .select_2 {
        width: 120px;
        height: 40px;
        margin-right: 15px;
      }
      // 输入框和下拉框140*40
      .select_4 {
        width: 140px;
        height: 40px;
        margin-right: 15px;
      }
      // 查询页面上关注名单时间特殊样式
      .select_s {
        width: 160px;
      }
      // 输入框和下拉框
      .select_8 {
        width: 100px;
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
    /deep/.tables
    .el-table
    .el-table__body-wrapper
    .el-table__empty-block
    .el-table__empty-text {
      width: 50%;
      color: #909399;
      line-height: 60px;
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
    // 全选按钮样式
    // .b_check {
    //   margin-right: 94%;
    //   margin-top: 25px;
    // }
    // 去掉element表格的默认全选按钮
    // .tables /deep/ th .el-checkbox {
    //   display: none;
    // }
  }
  .pagination {
    margin-top: 20px;
  }
  // 底部的样式
  .bottom {
    margin-bottom: 20px;
    // 批量导入/批量失效/导出excel单独样式
    .b_bottom {
      width: 200px;
      margin-top: 40px;
      font-family: PingFangSC-Regular;
      color: #ffffff;
      font-size: 14px;
    }
    // 批量导入单独样式
    .color {
      background: #05838e;
    }
    // 批量失效单独样式
    .color_1 {
      background: #eeb352;
    }
  }
}
</style>
