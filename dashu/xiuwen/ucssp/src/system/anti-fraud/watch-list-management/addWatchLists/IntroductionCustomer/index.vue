<template>
  <div class="import-message2">
    <div class="dialog-mask"></div>
    <div class="dialog-box width">
      <div class="dialog-box__top">
        <h5 class="title bg__white">引入客户</h5>
        <span class="el-icon-close button button__close" @click="close"></span>
      </div>
      <div class="dialog-box__middle content_x">
        <div class="b_content">
          <el-form
            :inline="true"
            :model="ruleForm"
            :rules="rules"
            ref="ruleForm"
            label-width="100px"
            class="demo-ruleForm"
          >
            <el-form-item label prop="khxm">
              <el-input clearable class="select_4" maxlength="80" v-model="ruleForm.khxm" value placeholder="请输入客户姓名"></el-input>
            </el-form-item>
            <el-form-item label prop="zjhm">
              <el-input clearable class="select_4" maxlength="32" v-model="ruleForm.zjhm" value placeholder="请输入证件号码"></el-input>
            </el-form-item>
            <el-button class="b_button query" @click="submitForm('ruleForm')">查询</el-button>
            <el-button class="b_button empty" @click="clear()">清空</el-button>
          </el-form>
        </div>
        <div class="tables">
          <el-table
            :default-sort="{prop: 'date', order: 'descending'}"
            :header-cell-style="{'font-size':'12px','text-align':'center','height':'38.9px','background':'#F9FAFB'}"
            ref="multipleTable"
            :data="tableData3"
            tooltip-effect="dark"
            max-height="398"
            style="width: 100%"
            @row-click="clickRow"
            @select="select"
            @selection-change="handleSelectionChange"
          >
            <el-table-column type="selection"></el-table-column>
            <el-table-column sortable prop="applicationId" label="申请编号"></el-table-column>
            <el-table-column sortable prop="custName" label="客户名称"></el-table-column>
            <el-table-column sortable prop="certificateNum" label="证件号码"></el-table-column>
          </el-table>
        </div>
      </div>
      <div class="bottom">
        <el-button class="b_bottom" @click="mislead">引入</el-button>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import "@common/css/dialog";
import rules from "@system/anti-fraud/js/rules"; // 引入校验规则
// import store from "../../../../../store";
import { fqzApi } from "../../../js/server"; // 接口
export default {
  data() {
    return {
      selectedRow: {}, // 复选框是否选中
      selectedRow_: [], // 复选框是否选中
      // 正则验证
      ruleForm: {
        khxm: "", // 客户姓名
        zjhm: "" // 证件号码
      },
      rules: {
        khxm: [{ required: true, message: "请输入客户姓名", trigger: "blur" }],
        zjhm: [
          { required: true, message: "请输入证件号码", trigger: "blur" },
          { validator: rules.identityCardRule, trigger: "change" }
        ]
      },
      tableData3: []
    };
  },
  props: ["ruleForm_", "names"],
  components: {},
  methods: {
    // 只能选择其中一个复选框事件
    select(selection, row) {
      if (selection.length > 1) {
        selection.shift();
      }
      this.selectedRow = row;
      console.log(row);
    },
    // 行选中
    clickRow(row) {
      this.$refs.multipleTable.toggleRowSelection(row);
      this.selectedRow = row;
    },
    handleSelectionChange(data) {
      this.multipleSelection = data;
      if (this.multipleSelection.length > 1) {
          this.$refs.multipleTable.toggleRowSelection(this.multipleSelection[0]);
      }
      this.selectedRow_ = data;
    },
    mislead() {
      console.log(this.selectedRow.length);
      if (this.selectedRow_.length > 0) {
        this.$emit("clsoe_windowImpont");
        this.names();
        // store.dispatch("set_nameS", true);
        if (this.selectedRow.certificateTypeCode === "Ind01") {
          this.ruleForm_.certificateNum01 = this.selectedRow.certificateNum;
        } else {
          this.ruleForm_.certificateNum = this.selectedRow.certificateNum;
        }
        this.ruleForm_.khxm = this.selectedRow.custName;
        this.ruleForm_.certificateTypeCode = this.selectedRow.certificateTypeCode;
        // this.ruleForm_.certificateNum01 = this.selectedRow.certificateNum;
        this.ruleForm_.sqbh = this.selectedRow.applicationId;
        this.ruleForm_.yddh = this.selectedRow.mobileNum;
        this.ruleForm_.dwmc = this.selectedRow.workplaceName;
        this.ruleForm_.dwdhqh = this.selectedRow.workAreaNum;
        this.ruleForm_.dwdhhm = this.selectedRow.workPhoneNum;
        this.ruleForm_.dwdz = this.selectedRow.workAddressDesc;
        this.ruleForm_.jtdz = this.selectedRow.houseAddressDesc;
      } else {
        this.confirmFn("请先选择一条你需要引入的数据", "err");
      }
    },
    // 清空文本框
    clear() {
      let fields = this.$refs["ruleForm"].fields;
      for (let i = 0; i < fields.length; i++) {
        fields[i].resetField();
      }
    },
    // 正则验证
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let data = {
            certificateNum: this.ruleForm.zjhm, // 证件号码
            custName: this.ruleForm.khxm // 客户名称
          };
          let url = `${fqzApi.watchRoll}`;
          this.$MyFetch
            .post(url, data)
            .then((data = {}) => {
              console.log(data);
              this.tableData3 = data;
            })
            .catch(err => {
              this.$error(err.message);
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 关闭引入弹窗
    close() {
      this.$emit("clsoe_windowImpont");
    }
  }
};
</script>
<style lang="less" rel="stylesheet/less" scoped>
.import-message {
  .width {
    width: 916px;
    height: 684px;
  }
  .dialog-box {
    .el-form-item {
      margin-right: 0;
    }
    .content_x {
      width: 875px;
      height: 484px;
      box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.08);
      border-radius: 4px;
      margin-left: 20px;
    }
    .dialog-box__middle {
      .b_content {
        text-align: left;
        width: 813px;
        height: 40px;
        margin-left: -16px;
        .select_4 {
          width: 160px;
          height: 40px;
          margin-left: 18px;
        }
        .b_button {
          width: 100px;
          height: 40px;
          border-radius: 4px;
          font-size: 14px;
          margin-left: 18px;
        }
        .query {
          background: #538bf1;
          color: #ffffff;
        }
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
      .tables {
        overflow-y: auto;
        overflow-x: hidden;
        height: 400px;
        width: 813px;
        margin: 0px auto;
        border: 1px solid #e5e5e5;
        margin-top: 21px;
        border-radius: 4px;
      }
      .tables /deep/ th .el-checkbox {
        display: none;
      }
    }
    .bottom {
      width: 813px;
      margin-top: 40px;
      margin: 0 58px;
      .b_bottom {
        width: 200px;
        margin-top: 40px;
        font-family: PingFangSC-Regular;
        color: #ffffff;
        font-size: 14px;
        background: #538bf1;
      }
    }
  }
}
</style>
