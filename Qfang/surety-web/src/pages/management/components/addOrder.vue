<template>
  <el-dialog
    custom-class="add-order"
    :title="dialogTitle"
    :visible.sync="dialogVisible"
    width="440px"
    :before-close="beforeClose"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
  >
    <el-form class="form" ref="ruleForm" :rules="rules" :model="ruleForm" label-width="110px">
      <el-form-item label="城市:" prop="orgId">
        <el-select class="w-240" v-model="ruleForm.orgId" @change="orgChange" placeholder="选择城市">
          <el-option v-for="item in orgs" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="业务类型:" prop="businessTypeId">
        <el-select class="w-240" v-model="ruleForm.businessTypeId" placeholder="选择业务类型">
          <el-option
            v-for="item in businessType"
            :key="item.id"
            :label="item.businessName"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="出赎楼款银行:" prop="redeemFundProviderId">
        <el-select
          class="w-240"
          v-model="ruleForm.redeemFundProviderId"
          filterable
          placeholder="选择银行"
        >
          <el-option v-for="item in Banks" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="原贷款银行:" prop="previousFundProviderId">
        <el-select
          class="w-240"
          v-model="ruleForm.previousFundProviderId"
          filterable
          placeholder="选择银行"
        >
          <el-option v-for="item in Banks" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="指令有效期:" prop="validityType">
        <div class="heigth-42">
          <el-radio v-model="ruleForm.validityType" label="WORK_DAY">工作日</el-radio>
          <el-input
            v-show="ruleForm.validityType==='WORK_DAY'"
            v-model="ruleForm.dayCount"
            class="width-60"
          ></el-input>
        </div>
        <div class="heigth-42">
          <el-radio v-model="ruleForm.validityType" label="NATURAL_DAY">自然日</el-radio>
          <el-input
            v-show="ruleForm.validityType==='NATURAL_DAY'"
            v-model="ruleForm.dayCount"
            class="width-60"
          ></el-input>
        </div>
        <div>
          <el-radio v-model="ruleForm.validityType" label="PERMANENT">长期有效</el-radio>
        </div>
      </el-form-item>
      <el-form-item label="状态:">
        <el-radio v-model="ruleForm.status" label="ENABLED">启用</el-radio>
        <el-radio v-model="ruleForm.status" label="DISABLED">禁用</el-radio>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button>
        <el-button @click="close(false)">取 消</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>
<script>
export default {
  name: "add-order",
  props: {
    orderInfo: {
      type: Object,
      default: false
    },
    addOrderShow: {
      type: Boolean,
      default: false
    }
  },
  components: {},
  data() {
    return {
      dialogTitle: "新增指令",
      ruleForm: {},
      orgs: [],
      businessType: [],
      Banks: [],
      rules: {
        orgId: [{ required: true, message: "请选择", trigger: "change" }],
        businessTypeId: [
          { required: true, message: "请选择", trigger: "change" }
        ],
        redeemFundProviderId: [
          { required: true, message: "请选择", trigger: "change" }
        ],
        previousFundProviderId: [
          { required: true, message: "请选择", trigger: "change" }
        ],
        validityType: [{ required: true, message: "请选择", trigger: "change" }]
      }
    };
  },
  computed: {
    dialogVisible: {
      get: function() {
        return this.addOrderShow;
      },
      set: function() {}
    }
  },
  created() {
    if (this.orderInfo.operateType === "add") {
      this.orderInfo.status = "ENABLED";
      this.dialogTitle = "新增指令";
    } else {
      this.dialogTitle = "编辑指令";
    }
    this.ruleForm = this.orderInfo;
    this.queryOrgTreeByPosition();
    this.fundProviderPageQuery();
  },
  methods: {
    orgChange() {
      this.queryBusinessTypeAllName(this.ruleForm.orgId);
    },
    queryOrgTreeByPosition() {
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
          this.orgs = orgs;
        }
      );
    },
    queryBusinessTypeAllName(orgId) {
      this.$interface.queryBusinessTypeAllName({ orgId: orgId }, res => {
        this.businessType = res.data.result;
      });
    },
    fundProviderPageQuery() {
      this.$interface.fundProviderPageQuery({ pageSize: 10000 }, res => {
        this.Banks = res.data.result.itemList;
      });
    },
    submitForm(ruleForm) {
      this.$refs[ruleForm].validate(valid => {
        if (valid) {
          var ruleForm = JSON.parse(JSON.stringify(this.ruleForm));
          var param = {
            id: ruleForm.id,
            orgId: ruleForm.orgId,
            businessTypeId: ruleForm.businessTypeId,
            redeemFundProviderId: ruleForm.redeemFundProviderId,
            previousFundProviderId: ruleForm.previousFundProviderId,
            validityType: ruleForm.validityType,
            dayCount: Number(ruleForm.dayCount),
            status: ruleForm.status
          };
          this.$interface.commandSave(param, res => {
            let data = res.data.status;
            if (data == "C0000") {
              this.$message({
                type: "success",
                message: "操作成功!"
              });
              this.$emit("hideAddOrder", false);
            }
            console.log(data);
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    close() {
      this.$emit("hideAddOrder", false);
    },
    beforeClose() {
      this.close();
    }
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
.heigth-42 {
  height: 42px;
  line-height: 42px;
}
</style>
