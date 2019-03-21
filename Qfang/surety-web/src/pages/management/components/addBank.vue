<template>
  <el-dialog
    :title="dialogTitle"
    :visible.sync="dialogVisible"
    width="540px"
    :before-close="beforeClose"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
  >
    <el-form ref="addBankForm" class="add-bank" :model="form" :rules="rules" label-width="92px">
      <el-form-item label="银行名称：" prop="name">
        <el-input v-model="form.name" class="width-240"></el-input>
      </el-form-item>
      <el-form-item label="简称：" prop="simpleName">
        <el-input v-model="form.simpleName" class="width-240"></el-input>
      </el-form-item>
      <el-form-item label="排序：" prop="order">
        <el-input v-model="form.order" class="width-240"></el-input>
      </el-form-item>
      <el-form-item label="LOGO：" prop="name">
        <el-upload
          class="upload-demo"
          :disabled="isUpLoad"
          action="/web-surety/security/open/file/upload"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :on-success="handleSuccess"
          :file-list="fileList"
          list-type="picture"
        >
          <el-button size="small" type="success">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
      </el-form-item>
      <el-form-item label="状态：">
        <el-radio v-model="form.status" label="ENABLED">启用</el-radio>
        <el-radio v-model="form.status" label="DISABLED">禁用</el-radio>
      </el-form-item>
      <el-form-item label="业务范围：" prop="fundTypes">
        <el-checkbox-group v-model="form.fundTypes">
          <el-checkbox label="CASH">现金</el-checkbox>
          <el-checkbox label="AMOUNT">额度</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="save('addBankForm')">保 存</el-button>
      <el-button @click="showEditBank('addBankForm')">取 消</el-button>
    </span>
  </el-dialog>
</template>
<script>
export default {
  name: "add-menu",
  props: {
    bankEditInfo: Object,
    editBankShow: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      isUpLoad: false,
      form: {
        name: "", // 名称
        simpleName: "", // 简称
        order: "", // 排序 integer
        logoUrl: "", // 银行logo图片Url
        fundTypes: [], // 资金类型串，用,隔开
        status: "" //状态
      },
      fileList: [],
      rules: {
        name: [
          { required: true, message: "请输入", trigger: "blur" },
          { min: 1, max: 20, message: "长度在 1 到 20 个字符", trigger: "blur" }
        ],
        simpleName: [
          { required: true, message: "请输入", trigger: "blur" },
          { min: 1, max: 20, message: "长度在 1 到 20 个字符", trigger: "blur" }
        ],
        order: [
          { required: true, message: "请输入", trigger: "blur" },
          { min: 1, max: 20, message: "长度在 1 到 20 个字符", trigger: "blur" }
        ],
        fundTypes: [{ required: true, message: "请输入", trigger: "blur" }]
      },
      dialogTitle: "",
      size: "300x300"
    };
  },
  computed: {
    dialogVisible: {
      get: function() {
        return this.editBankShow;
      },
      set: function(v) {}
    }
  },
  watch: {
    bankEditInfo: {
      handler: function(val, oldVal) {
        if (val.operateType == "add") {
          val.status = "ENABLED";
          this.dialogTitle = "新增资方";
        } else {
          this.dialogTitle = "修改资方";
        }
        this.initform(JSON.parse(JSON.stringify(val)));
      },
      deep: true
    }
  },
  created() {},
  methods: {
    initform(form) {
      // 业务范围
      if (form.fundTypes) {
        form.fundTypes = form.fundTypes.split(",");
      } else {
        form.fundTypes = [];
      }
      if (form.logoUrl) {
        this.fileList = [{ url: form.logoUrl.replace("{size}", this.size) }];
      } else {
        this.fileList = [];
      }
      this.form = form;
    },
    validateForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.fundProviderSave(formName);
        }
      });
    },
    save(formName) {
      this.validateForm(formName);
    },
    fundProviderSave(formName) {
      this.form.fundTypes = this.form.fundTypes.join(",");
      this.form.logoUrl = this.fileList[0].url.replace(this.size, "{size}");
      this.form.fundProviderType = "HEAD";
      this.$interface.fundProviderSave(this.form, res => {
        this.$message({
          type: "success",
          message: "操作成功!"
        });
        this.showEditBank(formName);
      });
    },
    showEditBank(formName) {
      this.$refs[formName].resetFields();
      this.$emit("showEditBank", false);
    },
    beforeClose() {
      this.showEditBank("addBankForm");
    },
    handleSuccess(response, file, fileList) {
      var that = this;
      fileList.forEach(function(item) {
        var suretyFile = {
          name: item.response.result.fileName,
          url: item.response.result.url.replace("{size}", that.size)
        };
        that.fileList = [suretyFile];
        that.isUpLoad = true;
        return;
      });
    },
    handleRemove(file, fileList) {
      var that = this;
      fileList.forEach(function(item) {
        that.fileList.forEach(function(o, index) {
          if (item.response.result.url === o.url) {
            that.fileList.splice(index, 1);
            that.form.logoUrl = "";
          }
        });
      });
    },
    handlePreview(file) {
      console.log(file);
    }
  }
};
</script>

<style scoped lang="less">
.add-bank {
  width: 332px;
  margin: 0 auto;

  .el-form-item {
    margin-bottom: 10px;

    .el-form-item__label,
    .el-form-item__content {
      line-height: 32px;

      .upload-demo {
        width: 240px !important;
      }
    }
  }
}
</style>
