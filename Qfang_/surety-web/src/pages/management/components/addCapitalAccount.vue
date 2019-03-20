<template>
  <div>
    <el-dialog
      :title="dialogTitle"
      :visible.sync="dialogVisible"
      width="660px"
      :before-close="beforeClose"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
    >
      <el-form
        ref="editCapitalAccountForm"
        :model="form"
        class="add-set"
        :rules="rules"
        label-width="92px"
      >
        <el-form-item label="所属组织：" prop="orgId">
          <div class="choose-box">
            <el-input v-model="form.orgName" readonly class="width-180"></el-input>
            <el-input v-model="form.orgId" style="display:none;" class="width-210"></el-input>
            <span class="choose" @click="openTree(true)">选</span>
          </div>
        </el-form-item>
        <el-form-item label="账户类型：" prop="accountType">
          <el-select v-model="form.accountType" class="width-210" placeholder="请选择">
            <el-option
              v-for="(org,index) in accountTypeEnums"
              :key="index"
              :label="org.name"
              :value="org.value"
            >{{org.name}}</el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="银行：" prop="fundProviderId">
          <el-select v-model="form.fundProviderId" class="width-210" filterable placeholder="请选择">
            <el-option
              v-for="item in fundProviders"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="开户行：" prop="accountBank">
          <el-input v-model="form.accountBank" class="width-210"></el-input>
        </el-form-item>
        <el-form-item label="账户名称：" prop="accountName">
          <el-input v-model="form.accountName" class="width-210"></el-input>
        </el-form-item>
        <el-form-item label="账号：" prop="accountNumber">
          <el-input v-model="form.accountNumber" class="width-210"></el-input>
        </el-form-item>
        <el-form-item label="备注：">
          <el-input
            type="textarea"
            :rows="2"
            resize="none"
            placeholder="请输入内容"
            v-model="form.remark"
          ></el-input>
        </el-form-item>
        <el-form-item label="状态：">
          <el-radio v-model="form.status" label="ENABLED">启用</el-radio>
          <el-radio v-model="form.status" label="DISABLED">禁用</el-radio>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="save('editCapitalAccountForm')">保 存</el-button>
        <el-button @click="showEditCapitalAccount('editCapitalAccountForm')">取 消</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="选择组织"
      :visible.sync="orgSelectVisible"
      width="660px"
      :before-close="orgSelectBeforeClose"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
    >
      <el-tree
        :data="data"
        :props="defaultProps"
        unselectable="on"
        show-checkbox
        check-strictly
        @check="handleCurrentData"
        :render-content="renderContent"
        @node-click="handleNodeClick"
      ></el-tree>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="saveTree">保 存</el-button>
        <el-button @click="openTree(false)">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: "add-capital-account",
  props: {
    capitalAccountInfo: Object,
    editCapitalAccountShow: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      dialogTitle: "",
      orgSelectVisible: false,
      form: {},
      fundProviders: [],
      rules: {
        orgId: [{ required: true, message: "请选择", trigger: "blur" }],
        fundProviderId: [
          { required: true, message: "请选择", trigger: "blur" }
        ],
        accountType: [{ required: true, message: "请选择", trigger: "blur" }],
        accountBank: [{ required: true, message: "请输人", trigger: "blur" }],
        accountName: [{ required: true, message: "请输人", trigger: "blur" }],
        accountNumber: [{ required: true, message: "请输人", trigger: "blur" }]
      },
      defaultProps: {
        children: "children",
        label: "name"
      },
      data: [],
      accountTypeEnums: [],
      orgs: []
    };
  },
  computed: {
    dialogVisible: {
      get: function() {
        return this.editCapitalAccountShow;
      },
      set: function(v) {}
    }
  },
  created() {
    this.fundProviderPageQuery();
    this.accountTypeEnum();
    this.getTree();
  },
  watch: {
    capitalAccountInfo: {
      handler: function(val, oldVal) {
        if (val.operateType == "add") {
          val.status = "ENABLED";
          this.dialogTitle = "新增账号";
        } else {
          this.dialogTitle = "修改账号";
        }
        this.form = JSON.parse(JSON.stringify(val));
      },
      deep: true
    }
  },
  methods: {
    accountTypeEnum() {
      this.$interface.accountTypeEnum({}, res => {
        this.accountTypeEnums = res.data.result;
      });
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
          this.fundAccountSave(formName);
        }
      });
    },
    save(formName) {
      this.validateForm(formName);
    },
    fundAccountSave(formName) {
      var form = JSON.parse(JSON.stringify(this.form));
      delete form.orgName;
      delete form.operateType;
      this.$interface.fundAccountSave(form, res => {
        this.$message({
          type: "success",
          message: "操作成功!"
        });
        this.showEditCapitalAccount(formName);
      });
    },
    showEditCapitalAccount(formName) {
      this.$refs[formName].resetFields();
      this.$emit("showEditCapitalAccount", false);
    },
    beforeClose() {
      this.showEditCapitalAccount("editCapitalAccountForm");
    },
    orgSelectBeforeClose() {
      this.orgSelectVisible = false;
    },
    openTree(bool) {
      this.orgSelectVisible = bool;
    },
    saveTree() {
      var orgName = [];
      var orgId = [];
      this.orgs.forEach(function(item) {
        orgName.push(item.name);
        orgId.push(item.id);
      });
      this.form.orgId = orgId.join(",");
      this.form.orgName = orgName.join(",");
      this.openTree(false);
    },
    getTree() {
      this.$interface.queryOrgTree({}, res => {
        this.data = res.data.result;
      });
    },
    handleCurrentData(data) {
      this.orgs.push(data);
    },
    handleNodeClick(data) {
      if (!data.leaf) {
        data.leaf = 1;
      } else if (data.leaf === 1) {
        data.leaf = false;
      } else {
        return;
      }
    },
    renderContent(h, { node, data, store }) {
      let html;
      if (!data.leaf) {
        html = (
          <span>
            <i class="icon iconfont icon-jia" />
            <span>{node.label}</span>
          </span>
        );
      } else if (data.leaf === 1) {
        html = (
          <span>
            <i class="icon iconfont icon-jian" />
            <span>{node.label}</span>
          </span>
        );
      } else if (data.leaf) {
        html = (
          <span>
            <i class="icon iconfont icon-fuhao" />
            <span>{node.label}</span>
          </span>
        );
      }
      return <div>{html}</div>;
    }
  }
};
</script>

<style scoped lang="less">
.add-set {
  width: 336px;
  margin: 0 auto;

  .el-form-item {
    margin-bottom: 10px;

    .el-form-item__label,
    .el-form-item__content {
      line-height: 32px;
    }
  }

  .choose-box {
    line-height: 40px;

    .choose {
      display: inline-block;
      width: 30px;
      line-height: 30px;
      text-align: center;
      background-color: #eee;
    }
  }
}
.add-set-tree {
  .el-dialog__body {
    height: 400px;
  }
}
</style>
