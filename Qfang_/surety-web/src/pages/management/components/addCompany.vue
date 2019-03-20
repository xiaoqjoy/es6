<template>
  <el-dialog
    custom-class="add-user"
    :title="dialogTitle"
    :visible.sync="dialogVisible"
    width="410px"
    :before-close="beforeClose"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
  >
    <el-form class="form" ref="addCompany" :rules="rules" :model="form" label-width="86px">
      <el-form-item label="合作城市:" prop="orgId">
        <el-select class="w-240" v-model="form.orgId" placeholder="选择合作城市">
          <el-option v-for="item in city" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="公司类型:" prop="companyType">
        <el-select class="w-240" v-model="form.companyType" placeholder="选择公司类型">
          <el-option
            v-for="item in company"
            :key="item.value"
            :label="item.name"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="公司名称:" prop="companyName">
        <el-input class="w-240" v-model="form.companyName"></el-input>
      </el-form-item>

      <el-form-item label="返佣户名:">
        <el-input class="w-240" v-model="form.rebateAccountName"></el-input>
      </el-form-item>
      <el-form-item label="返佣账号:">
        <el-input class="w-240" v-model="form.rebateAccountNumber"></el-input>
      </el-form-item>
      <el-form-item label="返佣开户行:">
        <el-input class="w-240" v-model="form.rebateAccountBank"></el-input>
      </el-form-item>
      <el-form-item label="协议到期日:">
        <el-date-picker
          class="w-240"
          v-model="form.agreementEndDate"
          type="date"
          placeholder="选择日期"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="状态">
        <el-radio v-model="form.status" label="ENABLED">启用</el-radio>
        <el-radio v-model="form.status" label="DISABLED">禁用</el-radio>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('addCompany')">保 存</el-button>
        <el-button @click="close(false)">取 消</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>
<script>
import Vuex from "vuex";
export default {
  name: "add-user",
  props: {
    addCompanyShow: {
      type: Boolean,
      default: false
    },
    companyInfo: {
      type: Object,
      default: false
    }
  },
  components: {},
  data() {
    return {
      dialogTitle: "新增公司",
      form: {},
      city: [],
      company: [
        {
          name: "中介公司",
          value: "INTERMEDIARY_COMPANY"
        },
        {
          name: "律师楼",
          value: "LAW_FIRM"
        },
        {
          name: "其他",
          value: "OTHER"
        }
      ],
      rules: {
        orgId: [
          { required: true, message: "请选择合作城市", trigger: "change" }
        ],
        companyType: [
          { required: true, message: "请选择公司类型", trigger: "change" }
        ],
        companyName: [
          { required: true, message: "请输入公司名称", trigger: "change" }
        ],
        status: [{ required: true, message: "请选择", trigger: "change" }]
      }
    };
  },
  computed: {
    dialogVisible: {
      get: function() {
        return this.addCompanyShow;
      },
      set: function(v) {}
    }
  },
  watch: {
    companyInfo: {
      handler: function(val, oldVal) {
        if (val.operateType == "add") {
          val.status = "ENABLED";
          this.dialogTitle = "新增公司";
        } else {
          this.dialogTitle = "修改公司";
        }
        this.form = JSON.parse(JSON.stringify(val));
      },
      deep: true
    }
  },
  methods: {
    submitForm(form) {
      this.$refs[form].validate(valid => {
        if (valid) {
          this.$interface.partnerSave(
            {
              agreementEndDate: this.form.date,
              companyName: this.form.companyName,
              companyType: this.form.companyType,
              id: this.form.id,
              orgId: this.form.orgId,
              rebateAccountBank: this.form.rebateAccountBank,
              rebateAccountName: this.form.rebateAccountName,
              rebateAccountNumber: this.form.rebateAccountNumber,
              agreementEndDate: this.formatDate(this.form.agreementEndDate),
              status: this.form.status
            },
            res => {
              this.$message({
                type: "success",
                message: "操作成功!"
              });
              this.close();
            }
          );
        }
      });
    },
    close() {
      this.$refs["addCompany"].resetFields();
      this.$emit("hideAddCompany", false);
    },
    beforeClose() {
      this.close();
    },
    getCity() {
      this.$interface.queryOrgTreeByPosition(
        {
          positionLinkId: this.$store.state.userInfo.positionLinkId,
          orgTypes: "CITY"
        },
        res => {
          var org = res.data.result;
          var orgs = org.concat(org[0].children);
          orgs.forEach(function(item) {
            item.children = [];
          });
          this.city = orgs;
        }
      );
    }
  },
  created() {
    this.getCity();
  }
};
</script>

<style scoped lang="less">
.w-240 {
  width: 240px;
}

.add-menu .form {
  width: 328px;
  margin: 0 auto;
}
</style>
