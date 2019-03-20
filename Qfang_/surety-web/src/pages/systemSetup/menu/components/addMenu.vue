<template>
  <el-dialog
    custom-class="add-menu"
    :title="dialogTitle"
    :visible.sync="dialogVisible"
    width="540px"
    :before-close="handleClose"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
  >
    <el-form class="form" ref="menuForm" :model="form" :rules="rules" label-width="92px">
      <el-form-item label="名称：" prop="name">
        <el-input class="width-240" v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="上级菜单：">
        <el-select class="width-240" v-model="form.parentId" placeholder="请选择">
          <el-option
            v-for="parent in menuDetail.parentMenus"
            :key="parent.id"
            :label="parent.name"
            :value="parent.id"
          >{{parent.name}}</el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="save('menuForm')">保 存</el-button>
      <el-button @click="close('menuForm')">取 消</el-button>
    </span>
  </el-dialog>
</template>
<script>
export default {
  name: "add-menu",
  props: {
    menuDetail: Object,
    addMenuShow: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      dialogTitle: "新增菜单",
      form: {},
      rules: {
        name: [
          {
            required: true,
            message: "请输入名称",
            trigger: "blur"
          },
          {
            min: 1,
            max: 20,
            message: "长度在 1 到 20 个字符",
            trigger: "blur"
          }
        ],
        parentId: [
          {
            required: true,
            message: "请选择",
            trigger: "blur"
          }
        ]
      }
    };
  },
  computed: {
    dialogVisible: {
      get: function() {
        return this.addMenuShow;
      },
      set: function(v) {}
    }
  },
  watch: {
    menuDetail: {
      handler: function(val, oldVal) {
        var menuDetail = JSON.stringify(val.menu);
        if (menuDetail == "{}") {
          this.dialogTitle = "新增菜单";
          this.form = {
            id: "",
            name: "",
            parentId: "" // 父级菜单ID
          };
        } else {
          this.dialogTitle = "修改菜单";
          this.form = JSON.parse(menuDetail);
        }
      },
      deep: true
    }
  },
  methods: {
    validateForm(formName) {
      var b = false;
      this.$refs[formName].validate(valid => {
        if (valid) {
          b = true;
        } else {
          b = false;
        }
      });
      return b;
    },
    save(formName) {
      var that = this;
      var parent = {};
      this.menuDetail.parentMenus.forEach(function(item) {
        if (item.id == that.form.parentId) {
          parent = item;
        }
      });
      var form = {
        id: this.form.id || "",
        name: this.form.name,
        order: this.form.id ? this.form.order : parent.childrenOrder,
        parentId: this.form.parentId,
        parentName: parent.name
      };
      if (this.validateForm(formName)) {
        this.$interface.saveAuthType(form, res => {
          this.$message({
            type: "success",
            message: "操作成功!"
          });
          that.close(formName);
        });
      }
    },
    close(formName) {
      this.$refs[formName].resetFields();
      this.$emit("showAddMenu", false);
    },
    handleClose(done) {
      this.close("menuForm");
    }
  }
};
</script>

<style scoped lang="less">
.add-menu .form {
  width: 332px;
  margin: 0 auto;
}
</style>
