<template>
  <el-dialog
    :title="dialogTitle"
    :visible.sync="dialogVisible"
    width="660px"
    :before-close="beforeClose"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
  >
    <el-form
      ref="editProgrammeForm"
      :model="form"
      class="add-programme"
      :rules="rules"
      label-width="92px"
    >
      <el-row>
        <el-col :span="12">
          <el-form-item label="规则名称：" prop="ruleName">
            <el-input v-model="form.ruleName" class="width-170"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="资金方：" prop="fundProviderId">
            <el-select v-model="form.fundProviderId" class="width-170" filterable placeholder="请选择">
              <el-option
                v-for="item in fundProviders"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="生效日期：" prop="effectiveDate">
            <el-date-picker
              class="width-170"
              v-model="form.effectiveDate"
              type="date"
              :editable="false"
              placeholder="请选择"
            ></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="失效日期：" prop="expirationDate">
            <el-date-picker
              class="width-170"
              v-model="form.expirationDate"
              type="date"
              :editable="false"
              placeholder="请选择"
            ></el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="利率：" prop="rate">
            <el-input v-model="form.rate" class="width-170"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="通道费率：">
            <el-input v-model="form.channelRate" class="width-170"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="保险费：" prop="insuranceType">
            <el-select
              v-model="form.insuranceType"
              @change="insuranceTypeChange()"
              class="width-170"
              placeholder="请选择"
            >
              <el-option label="无" value="NONE"></el-option>
              <el-option label="分段费率" value="SECTION"></el-option>
              <el-option label="固定费率" value="FIXD"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row class="insurance-type">
        <el-input
          v-show="insuranceTypeStatus === 'FIXD'"
          v-model="form.fixInsuranceRate"
          class="width-170"
        ></el-input>
        <el-button
          v-show="insuranceTypeStatus === 'SECTION'"
          type="success"
          class="add-section-insurance-rate-json"
          @click="addSectionInsuranceRateJson(null)"
        >+ 新增</el-button>
        <el-table
          v-show="insuranceTypeStatus === 'SECTION'"
          :data="sectionInsuranceRateJson"
          border
          class="insurance-type-table"
        >
          <el-table-column label="起止天数" align="center">
            <template slot-scope="scope">
              <el-input v-model="scope.row.min"></el-input>
            </template>
          </el-table-column>
          <el-table-column label="终止天数" align="center">
            <template slot-scope="scope">
              <el-input v-model="scope.row.max"></el-input>
            </template>
          </el-table-column>
          <el-table-column label="费率" align="center">
            <template slot-scope="scope">
              <el-input v-model="scope.row.rate"></el-input>
            </template>
          </el-table-column>
          <el-table-column class-name="table-operate-btn" label="操作" align="center" width="120">
            <template slot-scope="scope">
              <span type="text" @click="addSectionInsuranceRateJson(scope)">删除</span>
            </template>
          </el-table-column>
        </el-table>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="备注：">
            <el-input
              type="textarea"
              :rows="2"
              resize="none"
              placeholder="请输入内容"
              v-model="form.remark"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="save('editProgrammeForm')">保 存</el-button>
      <el-button @click="showEditProgramme('editProgrammeForm')">取 消</el-button>
    </span>
  </el-dialog>
</template>
<script>
export default {
  name: "add-Programme",
  props: {
    programmeInfo: Object,
    editProgrammeShow: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      insuranceTypeStatus: "",
      sectionInsuranceRateJson: [{ min: "", max: "", rate: "" }],
      dialogTitle: "",
      form: {
        ruleName: "", // 资金方案名称， 模糊查询
        fundProviderId: "", // 资金方id
        effectiveDate: "", // 生效日期
        expirationDate: "", // 失效日期
        rate: "", // 利率
        channelRate: "", // 通道费率
        insuranceType: "", // 保险费类型
        fixInsuranceRate: "", // 保险费固定费率
        sectionInsuranceRateJson: "", // 保险费分段费率json串
        remark: "",
        status: ""
      },
      fundProviders: [],
      rules: {
        ruleName: [{ required: true, message: "请输入", trigger: "blur" }],
        fundProviderId: [
          { required: true, message: "请选择", trigger: "blur" }
        ],
        effectiveDate: [{ required: true, message: "请选择", trigger: "blur" }],
        expirationDate: [
          { required: true, message: "请选择", trigger: "blur" }
        ],
        rate: [{ required: true, message: "请输入", trigger: "blur" }],
        channelRate: [{ required: true, message: "请输人", trigger: "blur" }],
        insuranceType: [
          { required: true, message: "请输选择", trigger: "blur" }
        ]
      }
    };
  },
  computed: {
    dialogVisible: {
      get: function() {
        return this.editProgrammeShow;
      },
      set: function(v) {}
    }
  },
  created() {
    this.fundProviderPageQuery();
  },
  watch: {
    programmeInfo: {
      handler: function(val, oldVal) {
        if (val.operateType == "add") {
          this.dialogTitle = "新增方案";
        } else {
          this.dialogTitle = "修改方案";
        }
        this.form = JSON.parse(JSON.stringify(val));
        this.insuranceTypeChange(this.form.sectionInsuranceRateJson);
      },
      deep: true
    }
  },
  methods: {
    insuranceTypeChange(sectionInsuranceRateJson) {
      if (this.form.insuranceType === "NONE") {
        this.insuranceTypeStatus = "NONE";
      } else if (this.form.insuranceType === "SECTION") {
        this.insuranceTypeStatus = "SECTION";
      } else if (this.form.insuranceType === "FIXD") {
        this.insuranceTypeStatus = "FIXD";
      }
      if (sectionInsuranceRateJson) {
        this.sectionInsuranceRateJson = JSON.parse(sectionInsuranceRateJson);
      }
    },
    addSectionInsuranceRateJson(row) {
      var obj = { min: "", max: "", rate: "" };
      if (row) {
        this.sectionInsuranceRateJson.splice(row.$index, 1);
      } else {
        this.sectionInsuranceRateJson.push(obj);
      }
    },
    fundProviderPageQuery() {
      this.$interface.fundProviderPageQuery(
        { fundProviderType: "HEAD" },
        res => {
          this.fundProviders = res.data.result.itemList;
        }
      );
    },
    validateForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.fundRuleSaveFundRule(formName);
        }
      });
    },
    save(formName) {
      this.validateForm(formName);
    },
    fundRuleSaveFundRule(formName) {
      var form = JSON.parse(JSON.stringify(this.form));
      form.effectiveDate = this.formatDate(form.effectiveDate);
      form.expirationDate = this.formatDate(form.effectiveDate);
      form.sectionInsuranceRateJson = JSON.stringify(
        this.sectionInsuranceRateJson
      );
      form.channelRate = Number(form.channelRate);
      form.fixInsuranceRate = Number(form.fixInsuranceRate);
      form.rate = Number(form.rate);
      form.status = form.status || "ENABLED";
      this.$interface.fundRuleSaveFundRule(form, res => {
        this.$message({
          type: "success",
          message: "操作成功!"
        });
        this.showEditProgramme(formName);
      });
    },
    showEditProgramme(formName) {
      this.$refs[formName].resetFields();
      this.$emit("showEditProgramme", false);
    },
    beforeClose() {
      this.showEditProgramme("editProgrammeForm");
    }
  }
};
</script>

<style lang="less">
.add-programme {
  width: 540px;
  margin: 0 auto;

  .el-form-item {
    margin-bottom: 10px;

    .el-form-item__label,
    .el-form-item__content {
      line-height: 32px;

      .width-170 {
        width: 170px !important;
      }
    }
  }
  .insurance-type {
    padding-left: 92px;
    margin-bottom: 10px;
    .add-section-insurance-rate-json {
      margin-bottom: 10px;
    }
    .insurance-type-table {
      .el-input__inner {
        height: 22px;
        line-height: 22px;
      }
    }
  }
  .add-section-insurance-rate-json {
    margin-bottom: 10px;
  }
  .insurance-type-table {
    .el-input__inner {
      height: 22px !important;
      line-height: 22px !important;
    }
  }
}
</style>
