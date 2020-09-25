<template>
  <div class="import-message2">
    <div class="dialog-mask"></div>
    <div class="dialog-box width">
      <div class="dialog-box__top">
        <h5 class="title bg__white">引入渠道</h5>
        <span class="el-icon-close button button__close" @click="close"></span>
      </div>
      <div class="dialog-box__middle content_x">
        <div class="b_content">
          <el-form
            :inline="true"
            :model="ruleForm"
            ref="ruleForm"
            label-width="100px"
            class="demo-ruleForm"
          >
            <el-form-item label>
              <el-select
                class="select_4"
                @change="select_"
                placeholder="渠道分类"
                v-model="ruleForm.qdfl"
              >
                <el-option
                  v-for="item in channelClassifications"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label prop="qdmc">
              <el-input clearable class="select_4" maxlength="200" v-model="ruleForm.qdmc" value placeholder="请输入渠道名称"></el-input>
            </el-form-item>
            <el-form-item label prop="ssfgs">
              <el-input clearable class="select_4" maxlength="20" v-model="ruleForm.ssfgs" value placeholder="请输入所属分公司"></el-input>
            </el-form-item>
            <el-button class="b_button query" @click="submitForm('ruleForm')">查询</el-button>
            <el-button class="b_button empty" @click="clear">清空</el-button>
          </el-form>
        </div>
        <div class="tables">
          <el-table
            v-if="showHidden_1"
            :default-sort="{prop: 'date', order: 'descending'}"
            :header-cell-style="{'font-size':'12px','text-align':'center','height':'38.9px','background':'#F9FAFB'}"
            ref="multipleTable"
            :data="tableData1"
            tooltip-effect="dark"
            max-height="398"
            style="width: 100%"
            @row-click="clickRow"
            @select="select"
            @selection-change="handleSelectionChange"
          >
            <el-table-column type="selection"></el-table-column>
            <el-table-column sortable type="index" label="序号"></el-table-column>
            <el-table-column sortable prop="channelName" label="渠道名称"></el-table-column>
            <el-table-column sortable prop="corporateRepresentativeName" label="法人代表"></el-table-column>
            <el-table-column sortable prop="certificateTypeCode" label="证件类型">
              <!-- <template slot-scope="scope">
                <span>{{scope.row.statusInd ? '有效' : '停用'}}</span>
              </template> -->
            </el-table-column>
            <el-table-column sortable prop="certificateNum" label="证件号码"></el-table-column>
            <el-table-column sortable prop="organizationName" label="所属分公司"></el-table-column>
            <el-table-column sortable prop="addressTxt" label="单位地址"></el-table-column>
          </el-table>
          <el-table
            v-if="showHidden_2"
            :default-sort="{prop: 'date', order: 'descending'}"
            :header-cell-style="{'font-size':'12px','text-align':'center','height':'38.9px','background':'#F9FAFB'}"
            ref="multipleTable"
            :data="tableData2"
            tooltip-effect="dark"
            style="width: 100%"
            @row-click="clickRow"
            @select="select"
            @selection-change="handleSelectionChange"
          >
            <el-table-column type="selection"></el-table-column>
            <el-table-column sortable type="index" label="序号"></el-table-column>
            <el-table-column sortable prop="channelName" label="渠道名称"></el-table-column>
            <el-table-column sortable prop="corporateRepresentativeName" label="法人代表"></el-table-column>
            <el-table-column sortable prop="certificateTypeCode" label="证件类型"></el-table-column>
            <el-table-column sortable prop="certificateNum" label="证件号码"></el-table-column>
            <el-table-column sortable prop="organizationName" label="所属分公司"></el-table-column>
            <el-table-column sortable prop="addressTxt" label="单位地址"></el-table-column>
          </el-table>
          <el-table
            v-if="showHidden_3"
            :default-sort="{prop: 'date', order: 'descending'}"
            :header-cell-style="{'font-size':'12px','text-align':'center','height':'38.9px','background':'#F9FAFB'}"
            ref="multipleTable"
            :data="tableData3"
            tooltip-effect="dark"
            style="width: 100%"
            @row-click="clickRow"
            @select="select"
            @selection-change="handleSelectionChange"
          >
            <el-table-column type="selection"></el-table-column>
            <el-table-column sortable type="index" label="序号"></el-table-column>
            <el-table-column sortable prop="channelName" label="渠道名称"></el-table-column>
            <el-table-column sortable prop="certificateTypeCode" label="证件类型"></el-table-column>
            <el-table-column sortable prop="certificateNum" label="证件号码"></el-table-column>
            <el-table-column sortable prop="organizationName" label="所属分公司"></el-table-column>
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
import { fqzApi } from "../../../js/server"; // 接口
export default {
  data() {
    return {
      list_input: [], // 证件类型下拉框数据
      selectedRow: {}, // 复选框是否选中
      selectedRow_: [], // 复选框是否选中
      // 正则验证
      ruleForm: {
        qdfl: "0",
        qdmc: "",
        ssfgs: ""
      },
      // rules: {
      //   qdmc: [{ required: true, message: "请输入渠道名称", trigger: "blur" }],
      //   ssfgs: [
      //     { required: true, message: "请输入所属分公司", trigger: "blur" }
      //   ]
      // },
      checkFlag: true,
      showHidden_1: true,
      showHidden_2: false,
      showHidden_3: false,
      channelClassifications: [
        {
          value: "0",
          label: "合作渠道"
        },
        {
          value: "1",
          label: "其他渠道—公司"
        },
        {
          value: "2",
          label: "其他渠道—个人"
        }
      ],
      tableData1: [],
      tableData2: [],
      tableData3: []
    };
  },
  props: ["blacklistIntroduces"],
  components: {},
  created() {
    this.submitForm();
    this.get_data();
  },
  methods: {
    // 证件类型下拉选项数据
    get_data() {
      let data = {
        codenoList: ["CertType"]
      };
      let url = fqzApi.getCodeLibrary;
      this.$MyFetch
        .post(url, data)
        .then((data = {}) => {
          this.list_input = data.CertType;
          console.log(this.list_input);
        })
        .catch(err => {
          this.$error(err.message);
        });
    },
    handleSelectionChange(data) {
      this.multipleSelection = data;
      if (this.multipleSelection.length > 1) {
          this.$refs.multipleTable.toggleRowSelection(this.multipleSelection[0]);
      }
      this.selectedRow_ = data;
    },
    // 行选中
    clickRow(row) {
      this.$refs.multipleTable.toggleRowSelection(row);
      this.selectedRow = row;
      for (var i = 0; i < this.list_input.length; i++) {
        if (this.selectedRow.certificateTypeCode === this.list_input[i].id) {
          this.selectednpmRow.certificateTypeCode = this.list_input[i].name;
        }
      }
    },
    // 只能选择其中一个复选框事件
    select(selection, row) {
      if (selection.length > 1) {
        selection.shift();
      }
      this.selectedRow = row;
      for (var i = 0; i < this.list_input.length; i++) {
        if (this.selectedRow.certificateTypeCode === this.list_input[i].id) {
          this.selectednpmRow.certificateTypeCode = this.list_input[i].name;
        }
      }
      console.log(row);
    },
    // 清空文本框
    clear() {
      let fields = this.$refs["ruleForm"].fields;
      for (let i = 0; i < fields.length; i++) {
        fields[i].resetField();
      }
    },
    mislead() {
      // debugger;
      // if (this.ruleForm.qdfl === "0") {
      //   this.ruleForm.qdfl = "合作渠道";
      // } else if (this.ruleForm.qdfl === "1") {
      //   this.ruleForm.qdfl = "其他渠道-公司";
      // } else {
      //   this.ruleForm.qdfl = "其他渠道-个人";
      // }
      if (this.selectedRow_.length > 0) {
        if (this.ruleForm.qdfl === "0") {
          this.ruleForm.qdfl = "合作渠道";
        } else if (this.ruleForm.qdfl === "1") {
          this.ruleForm.qdfl = "其他渠道-公司";
        } else {
          this.ruleForm.qdfl = "其他渠道-个人";
        }
        this.$emit("clsoe_windowIsQd");
        this.blacklistIntroduces.legalRepresentative = this.selectedRow.corporateRepresentativeName;
        this.blacklistIntroduces.documenTtype = this.selectedRow.certificateTypeCode;
        this.blacklistIntroduces.iDNumber = this.selectedRow.certificateNum;
        this.blacklistIntroduces.branchCompany = this.selectedRow.organizationName;
        this.blacklistIntroduces.unitAddress = this.selectedRow.addressTxt;
        this.blacklistIntroduces.channelName = this.selectedRow.channelName;
        this.blacklistIntroduces.channelNumber = this.selectedRow.channelId;
        this.blacklistIntroduces.channelClassification = this.ruleForm.qdfl;
      } else {
        this.confirmFn("请先选择一条你需要引入的数据", "err");
      }
    },
    // 正则验证
    submitForm(formName) {
      // this.$refs[formName].validate(valid => {
      //   if (valid) {
      console.log("submit!");
      let data = {
        channelName: this.ruleForm.qdmc,
        organizationName: this.ruleForm.ssfgs,
        queryType: this.ruleForm.qdfl
      };
      let url = `${fqzApi.channelBlack}`;
      this.$MyFetch
        .post(url, data)
        .then((data = {}) => {
          for (var i = 0; i < this.list_input.length; i++) {
            for (var k = 0; k < data.length; k++) {
              if (data[k].certificateTypeCode === this.list_input[i].id) {
                data[k].certificateTypeCode = this.list_input[i].name;
              }
            }
          };
          console.log(data);
          if (this.ruleForm.qdfl === "0") {
            this.tableData1 = data;
          } else if (this.ruleForm.qdfl === "1") {
            this.tableData2 = data;
          } else {
            this.tableData3 = data;
          }
        })
        .catch(err => {
          this.$error(err.message);
        });
      // } else {
      //   console.log("error submit!!");
      //   return false;
      // }
      // });
    },
    // 关闭弹窗
    close() {
      this.$emit("clsoe_windowIsQd");
    },
    select_(val) {
      if (val === "0") {
        this.showHidden_1 = true;
        this.showHidden_2 = false;
        this.showHidden_3 = false;
      } else if (val === "1") {
        this.showHidden_1 = false;
        this.showHidden_2 = true;
        this.showHidden_3 = false;
      } else {
        this.showHidden_1 = false;
        this.showHidden_2 = false;
        this.showHidden_3 = true;
      }
      this.submitForm();
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
