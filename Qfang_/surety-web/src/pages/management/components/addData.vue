<template>
  <el-dialog
    custom-class="add-data"
    :title="dialogTitle"
    :visible.sync="dialogVisible"
    width="410px"
    @close="close"
  >
    <el-form class="form" ref="ruleForm" :rules="rules" :model="ruleForm" label-width="86px">
      <el-form-item label="资料名称:" prop="dataName">
        <el-input class="w-240" v-model="ruleForm.dataName"></el-input>
      </el-form-item>
      <el-form-item label="状态">
        <el-radio v-model="ruleForm.radio" label="ENABLED">启用</el-radio>
        <el-radio v-model="ruleForm.radio" label="DISABLED">禁用</el-radio>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">保 存</el-button>
        <el-button @click="close(false)">取 消</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>
<script>
export default {
  name: "add-data",
  //props: ['addDataShow','row'],
  props: {
    row: {
      type: Object,
      default: false
    },
    addDataShow: {
      type: Boolean,
      default: false
    }
  },
  components: {},
  data() {
    return {
      dialogTitle: "新增资料",
      ruleForm: {
        dataName: "",
        radio: "ENABLED"
      },
      rules: {
        dataName: [{ required: true, message: "请输入名称", trigger: "change" }]
      }
    };
  },
  computed: {
    dialogVisible: {
      get: function() {
        return this.addDataShow;
      },
      set: function() {}
    }
  },
  created() {
    console.log(this.row);

    this.ruleForm.dataName = this.row.name;
    this.ruleForm.radio = this.row.status;
  },
  methods: {
    submitForm(ruleForm) {
      this.$refs[ruleForm].validate(valid => {
        if (valid) {
          this.$interface.materialSave(
            {
              id: this.row.id,
              name: this.ruleForm.dataName,
              status: this.ruleForm.radio
            },
            res => {
              let data = res.data.status;
              if (data == "C0000") {
                this.$emit("hideAddData", false);
              }
              console.log(data);
            }
          );
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    close() {
      this.$emit("hideAddData", false);
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
</style>
